// HTTP tuning shared by `server.mjs` (npm start) and `src/instrumentation.ts`
// (any other way of starting Next, e.g. a hosting panel running `next start`).
// Both apply the same two fixes inside the Node process that serves requests:
//
// 1. `Vary` is reduced to standard negotiation values. The App Router appends
//    `Vary: rsc, next-router-state-tree, next-router-prefetch,
//    next-router-segment-prefetch` to every response and Hostinger CDN refuses
//    to cache anything that varies on custom request headers
//    (`x-hcdn-cache-status: DYNAMIC`), so public HTML never reached the edge.
//    Next already keys RSC variants on the `_rsc` search param (see
//    `experimental.validateRSCRequestHeaders`), so dropping the names is safe.
//
// 2. `keepAliveTimeout` is raised above the idle timeout of the reverse proxy
//    in front of the app. Node's default is 5 s; a proxy that reuses an idle
//    upstream connection a moment after Node closed it gets ECONNRESET and
//    reports the request as failed (502 / "server connectivity" in Search
//    Console). 65 s is the value AWS and Google Cloud recommend for the same
//    reason; `headersTimeout` must stay above it.
//
// 3. A heap guard for hosts that start Next without `--max-old-space-size`.
//    V8 then assumes a multi-GB heap and collects lazily; on a plan with a
//    hard memory cap the container is killed before V8 feels any pressure,
//    which Googlebot sees as a dead origin. The guard forces a collection
//    when live heap passes a soft limit. `npm start` passes the flag itself,
//    in which case V8 already collects early and the guard stays off.
import { readFileSync } from "node:fs";
import { Server, ServerResponse } from "node:http";
import path from "node:path";
import v8 from "node:v8";
import vm from "node:vm";

const ROUTER_VARY = new Set([
  "rsc",
  "next-router-state-tree",
  "next-router-prefetch",
  "next-router-segment-prefetch",
  "next-url",
]);

export const DEFAULT_KEEP_ALIVE_TIMEOUT_MS = 65_000;

export function keepAliveTimeoutMs(env = process.env) {
  const value = Number.parseInt(env.KEEP_ALIVE_TIMEOUT_MS || "", 10);
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_KEEP_ALIVE_TIMEOUT_MS;
}

/** Keep standard negotiation values (e.g. Accept-Encoding), drop router ones. */
export function publicVary(value) {
  const values = Array.isArray(value) ? value : [value];
  const kept = [];
  for (const entry of values) {
    for (const part of String(entry).split(",")) {
      const name = part.trim();
      if (!name || ROUTER_VARY.has(name.toLowerCase())) continue;
      if (!kept.some((seen) => seen.toLowerCase() === name.toLowerCase())) kept.push(name);
    }
  }
  return kept;
}

function sanitizeVary(res) {
  const current = res.getHeader("vary");
  if (current === undefined) return;
  const kept = publicVary(current);
  if (kept.length === 0) res.removeHeader("vary");
  else res.setHeader("vary", kept.join(", "));
}

function sanitizeHeaderBag(headers) {
  if (!headers) return headers;
  if (Array.isArray(headers)) {
    // Raw [name, value, name, value, ...] form.
    const out = [];
    for (let i = 0; i + 1 < headers.length; i += 2) {
      const name = headers[i];
      if (String(name).toLowerCase() === "vary") {
        const kept = publicVary(headers[i + 1]);
        if (kept.length === 0) continue;
        out.push(name, kept.join(", "));
      } else {
        out.push(name, headers[i + 1]);
      }
    }
    return out;
  }
  for (const name of Object.keys(headers)) {
    if (name.toLowerCase() !== "vary") continue;
    const kept = publicVary(headers[name]);
    if (kept.length === 0) delete headers[name];
    else headers[name] = kept.join(", ");
  }
  return headers;
}

const tunedServers = new WeakSet();

/** Idempotent per server instance. Returns true the first time it applies. */
export function tuneHttpServer(server, keepAliveMs = keepAliveTimeoutMs()) {
  if (!server || typeof server !== "object" || tunedServers.has(server)) return false;
  if (!("keepAliveTimeout" in server)) return false;
  tunedServers.add(server);
  server.keepAliveTimeout = keepAliveMs;
  server.headersTimeout = keepAliveMs + 1_000;
  return true;
}

const HOOKED = Symbol.for("gaf.server-tuning.hooked");
const BUILD_HEADER = "x-gaf-build";
let cachedBuildLabel;

/**
 * Identifies the running build from outside: `GAF_BUILD_LABEL`, else
 * `.next/BUILD_ID` (the commit hash, see `generateBuildId` in next.config).
 * Lets `curl -I` confirm which deploy answered a request.
 */
export function buildLabel(env = process.env, root = process.cwd()) {
  if (cachedBuildLabel !== undefined) return cachedBuildLabel;
  let label = env.GAF_BUILD_LABEL || "";
  if (!label) {
    try {
      label = readFileSync(path.join(root, ".next", "BUILD_ID"), "utf8").trim();
    } catch {
      label = "unknown";
    }
  }
  cachedBuildLabel = label;
  return label;
}

/**
 * Patch `writeHead` on a ServerResponse prototype so every response, however
 * the server was created, gets the public Vary header, the build label, and
 * tunes its server on first use. Idempotent; returns true the first time it
 * installs.
 */
export function installResponseHooks(proto = ServerResponse.prototype) {
  if (proto[HOOKED]) return false;
  Object.defineProperty(proto, HOOKED, { value: true, enumerable: false });
  const writeHead = proto.writeHead;
  proto.writeHead = function tunedWriteHead(statusCode, reasonOrHeaders, maybeHeaders) {
    tuneHttpServer(this.socket?.server);
    sanitizeVary(this);
    if (!this.hasHeader(BUILD_HEADER)) this.setHeader(BUILD_HEADER, buildLabel());
    if (maybeHeaders !== undefined) {
      return writeHead.call(this, statusCode, reasonOrHeaders, sanitizeHeaderBag(maybeHeaders));
    }
    if (reasonOrHeaders !== undefined && typeof reasonOrHeaders !== "string") {
      return writeHead.call(this, statusCode, sanitizeHeaderBag(reasonOrHeaders));
    }
    return writeHead.call(this, statusCode, reasonOrHeaders);
  };
  return true;
}

export const DEFAULT_HEAP_SOFT_LIMIT_MB = 384;
export const HEAP_GUARD_INTERVAL_MS = 15_000;
const HEAP_GUARD_LOG_EVERY_MS = 10 * 60_000;
const MB = 1024 * 1024;

/**
 * Decide whether the guard is needed. When Node already runs with a heap
 * limit close to the soft limit (e.g. `--max-old-space-size=512` from
 * `npm start`), V8 collects on its own and the guard is redundant.
 */
export function heapGuardConfig(env = process.env, heapLimitBytes = v8.getHeapStatistics().heap_size_limit) {
  const parsed = Number.parseInt(env.GAF_HEAP_SOFT_LIMIT_MB || "", 10);
  const softLimitMb = Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_HEAP_SOFT_LIMIT_MB;
  const softLimitBytes = softLimitMb * MB;
  return {
    enabled: env.GAF_HEAP_GUARD !== "off" && heapLimitBytes > softLimitBytes * 2,
    softLimitBytes,
    intervalMs: HEAP_GUARD_INTERVAL_MS,
  };
}

/** Expose V8's gc() without restarting the process with --expose-gc. */
export function exposeGc() {
  if (typeof globalThis.gc === "function") return globalThis.gc;
  v8.setFlagsFromString("--expose-gc");
  return vm.runInNewContext("gc");
}

/**
 * One guard check. Collects when live heap is above the soft limit; logs at
 * most once per ten minutes so a sustained crawl does not flood the host log.
 * Returns true when a collection ran.
 */
export function heapGuardTick(state, { memoryUsage = process.memoryUsage, now = Date.now, log = console.warn } = {}) {
  const used = memoryUsage().heapUsed;
  if (used <= state.softLimitBytes) return false;
  state.gc();
  state.collections += 1;
  const after = memoryUsage().heapUsed;
  const at = now();
  if (at - state.lastLogAt >= HEAP_GUARD_LOG_EVERY_MS) {
    state.lastLogAt = at;
    log(
      `[gaf] heap ${Math.round(used / MB)} MB exceeded the ${Math.round(state.softLimitBytes / MB)} MB soft limit; ` +
        `collected to ${Math.round(after / MB)} MB (${state.collections} collections so far)`,
    );
  }
  return true;
}

/**
 * Start the periodic guard. Returns the state (with `stop()`) or null when
 * the configuration says it is not needed. The timer is unref'd so it never
 * keeps the process alive.
 */
export function installHeapGuard(config = heapGuardConfig(), hooks = {}) {
  if (!config.enabled) return null;
  const state = {
    softLimitBytes: config.softLimitBytes,
    gc: hooks.gc || exposeGc(),
    collections: 0,
    lastLogAt: -Infinity,
    timer: null,
    stop() {
      if (state.timer) clearInterval(state.timer);
      state.timer = null;
    },
  };
  state.timer = setInterval(() => heapGuardTick(state, hooks), config.intervalMs);
  state.timer.unref();
  return state;
}

/**
 * Tune HTTP servers that already exist in this process (Next's `next start`
 * opens its listener before instrumentation runs). Returns how many it tuned.
 */
export function tuneActiveHttpServers(keepAliveMs = keepAliveTimeoutMs()) {
  const getHandles = process._getActiveHandles;
  if (typeof getHandles !== "function") return 0;
  let tuned = 0;
  for (const handle of getHandles.call(process)) {
    if (handle instanceof Server && tuneHttpServer(handle, keepAliveMs)) tuned += 1;
  }
  return tuned;
}

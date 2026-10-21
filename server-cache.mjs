// Origin HTML cache for `server.mjs` (npm start).
//
// Every public page in this app is rendered on demand (`force-dynamic`, locale
// read from a request header the proxy sets), and the Hostinger CDN in front
// of it answers HTML with `x-hcdn-cache-status: DYNAMIC`, so each crawler hit
// used to be a full React render inside one Node process. A treatment page is
// ~1 MB of HTML and takes a couple of seconds on the hosting plan; a dozen
// parallel Googlebot fetches queued behind each other pushed time-to-first-byte
// past 10 s, which Search Console records as "server connectivity" failures
// and the reverse proxy turns into 502s.
//
// This module sits in front of Next's request handler and:
//
// - serves anonymous GET/HEAD responses for public paths from a cache keyed by
//   path + query (locale lives in the path), fresh for `freshMs` and then
//   stale-while-revalidate for `staleMs`, persisted on disk under
//   `.next/cache/gaf-html` so a restart or redeploy does not start cold;
// - renders a miss on the client's own request and records the response as it
//   streams out (Next's own compression and headers are stored unchanged), so a
//   miss never depends on the process reaching its own port; concurrent
//   requests for the same URL wait for that one render (single flight);
// - refreshes stale entries in the background through a loopback request
//   when the host allows self-connections, and on the request itself when it
//   does not;
// - limits how many renders run at once so a crawl burst is answered in order
//   instead of every request finishing late together, and skips renders whose
//   client already went away;
// - keys everything on the build id plus a fingerprint of `content/`, so a
//   deploy or a CMS edit invalidates the whole cache at once.
//
// Requests that carry a `gaf_*` cookie (CMS session or preview edition), an
// Authorization header, or target /cms, /api, /_next pass straight through.
import { createHash } from "node:crypto";
import { mkdirSync, promises as fsp, readdirSync, readFileSync, statSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import zlib from "node:zlib";

const MB = 1024 * 1024;

export const DEFAULT_FRESH_MS = 60 * 60_000;
export const DEFAULT_STALE_MS = 7 * 24 * 60 * 60_000;
export const DEFAULT_NOT_FOUND_FRESH_MS = 60 * 60_000;
export const DEFAULT_MEMORY_BYTES = 64 * MB;
export const DEFAULT_DISK_BYTES = 768 * MB;
export const DEFAULT_RENDER_CONCURRENCY = 2;
export const MAX_BODY_BYTES = 4 * MB;
const CONTENT_SWEEP_MS = 60_000;
const DISK_SWEEP_MS = 10 * 60_000;
// Loopback budgets: a quick self-probe at boot, a short connect timeout for
// background refreshes (hosts that block self-connections fail fast instead
// of holding a render slot), and a generous render budget once connected.
const LOOPBACK_PROBE_MS = 5_000;
const LOOPBACK_CONNECT_MS = 3_000;
const LOOPBACK_RENDER_MS = 120_000;
const MAX_QUERY_LENGTH = 200;
const MAX_QUERY_PARAMS = 4;

const TRACKING_PARAM = /^(utm_|fbclid$|gclid$|gbraid$|wbraid$|msclkid$|mc_cid$|mc_eid$|_ga$|_gl$|ref$|yclid$|igshid$|si$)/i;
const STATIC_FILE = /\.(?!xml$|txt$)[a-z0-9]{1,8}$/i;
const STORABLE_STATUS = new Set([200, 404]);
const STORABLE_TYPE = /^(text\/(html|xml|plain)|application\/(xml|json|rss\+xml))/i;
// Hop-by-hop or per-response headers that must not be replayed from cache.
const DROPPED_HEADERS = new Set([
  "connection",
  "keep-alive",
  "transfer-encoding",
  "content-length",
  "content-encoding",
  "date",
  "age",
  "set-cookie",
  "x-gaf-cache",
  "x-gaf-build",
  "etag",
]);

function envInt(env, name, fallback) {
  const value = Number.parseInt(env[name] || "", 10);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

/** Read every cache knob from the environment with the defaults above. */
export function htmlCacheConfig(env = process.env) {
  return {
    enabled: env.GAF_HTML_CACHE !== "off",
    freshMs: envInt(env, "GAF_HTML_FRESH_S", DEFAULT_FRESH_MS / 1000) * 1000,
    staleMs: envInt(env, "GAF_HTML_STALE_S", DEFAULT_STALE_MS / 1000) * 1000,
    notFoundFreshMs: envInt(env, "GAF_HTML_404_FRESH_S", DEFAULT_NOT_FOUND_FRESH_MS / 1000) * 1000,
    memoryBytes: envInt(env, "GAF_HTML_MEMORY_MB", DEFAULT_MEMORY_BYTES / MB) * MB,
    diskBytes: envInt(env, "GAF_HTML_DISK_MB", DEFAULT_DISK_BYTES / MB) * MB,
    renderConcurrency: Math.max(1, envInt(env, "GAF_RENDER_CONCURRENCY", DEFAULT_RENDER_CONCURRENCY)),
    // Set to "off" on hosts known to refuse self-connections to skip the probe.
    loopback: env.GAF_HTML_LOOPBACK !== "off",
  };
}

/**
 * Decide whether a request may be answered from (and stored in) the cache.
 * Returns null when it must go straight to Next.
 */
export function cacheKeyFor(req) {
  if (req.method !== "GET" && req.method !== "HEAD") return null;
  const headers = req.headers || {};
  if (headers.authorization) return null;
  if (headers["x-gaf-render"]) return null;
  const cookie = headers.cookie;
  if (cookie && /(?:^|;\s*)gaf_[a-z_]*=/i.test(cookie)) return null;
  let url;
  try {
    url = new URL(req.url || "/", "http://gaf.local");
  } catch {
    return null;
  }
  const pathname = url.pathname;
  if (pathname.startsWith("/cms") || pathname.startsWith("/api") || pathname.startsWith("/_next/")) return null;
  // Static files (images, fonts, uploads) are streamed by Next directly;
  // only .xml and .txt documents (sitemaps, robots) are worth caching here.
  if (pathname.startsWith("/uploads/") || STATIC_FILE.test(pathname)) return null;
  const params = [];
  for (const [name, value] of url.searchParams) {
    if (TRACKING_PARAM.test(name)) continue;
    params.push([name, value]);
  }
  if (params.length > MAX_QUERY_PARAMS) return null;
  params.sort(([a, av], [b, bv]) => (a < b ? -1 : a > b ? 1 : av < bv ? -1 : av > bv ? 1 : 0));
  const query = new URLSearchParams(params).toString();
  if (query.length > MAX_QUERY_LENGTH) return null;
  return query ? `${pathname}?${query}` : pathname;
}

/** Headers worth storing with a cached body. */
export function storableHeaders(headers) {
  const out = {};
  for (const [name, value] of Object.entries(headers)) {
    const lower = name.toLowerCase();
    if (DROPPED_HEADERS.has(lower) || value === undefined) continue;
    out[lower] = Array.isArray(value) ? value.join(", ") : String(value);
  }
  return out;
}

/** Whether a rendered response may be cached at all. */
export function isStorable(status, headers, bodyLength) {
  if (!STORABLE_STATUS.has(status)) return false;
  if (headers["set-cookie"]) return false;
  const type = headers["content-type"];
  if (!type || !STORABLE_TYPE.test(Array.isArray(type) ? type[0] : type)) return false;
  const control = String(headers["cache-control"] || "");
  if (/\b(no-store|private)\b/i.test(control)) return false;
  return bodyLength <= MAX_BODY_BYTES;
}

/**
 * Fingerprint of the editable content directory. Any add, remove or edit
 * changes it, and with it the cache generation.
 */
export function contentFingerprint(root) {
  const hash = createHash("sha1");
  let files = 0;
  const walk = (dir) => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!entry.isFile()) continue;
      try {
        const stat = statSync(full);
        hash.update(`${full}\0${stat.size}\0${Math.floor(stat.mtimeMs)}\n`);
        files += 1;
      } catch {
        // Removed between readdir and stat; the next sweep sees the new state.
      }
    }
  };
  walk(root);
  hash.update(String(files));
  return hash.digest("hex").slice(0, 16);
}

/** Bounded-by-bytes LRU for compressed bodies. */
export class ByteLru {
  constructor(maxBytes) {
    this.maxBytes = maxBytes;
    this.bytes = 0;
    this.entries = new Map();
  }

  get(key) {
    const hit = this.entries.get(key);
    if (!hit) return undefined;
    this.entries.delete(key);
    this.entries.set(key, hit);
    return hit;
  }

  set(key, entry) {
    const existing = this.entries.get(key);
    if (existing) {
      this.bytes -= existing.body.length;
      this.entries.delete(key);
    }
    if (entry.body.length > this.maxBytes) return entry;
    this.entries.set(key, entry);
    this.bytes += entry.body.length;
    while (this.bytes > this.maxBytes) {
      const oldest = this.entries.keys().next().value;
      if (oldest === undefined) break;
      this.bytes -= this.entries.get(oldest).body.length;
      this.entries.delete(oldest);
    }
    return entry;
  }

  delete(key) {
    const existing = this.entries.get(key);
    if (!existing) return false;
    this.bytes -= existing.body.length;
    return this.entries.delete(key);
  }

  clear() {
    this.entries.clear();
    this.bytes = 0;
  }

  get size() {
    return this.entries.size;
  }
}

/**
 * Two-lane render limiter: foreground misses first, background
 * revalidations only when nothing is waiting in front of a client.
 */
export class RenderLimiter {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.active = 0;
    this.foreground = [];
    this.background = [];
  }

  acquire(background = false) {
    return new Promise((resolve) => {
      (background ? this.background : this.foreground).push(resolve);
      this.pump();
    });
  }

  release() {
    this.active -= 1;
    this.pump();
  }

  pump() {
    while (this.active < this.concurrency) {
      const next = this.foreground.shift() || this.background.shift();
      if (!next) return;
      this.active += 1;
      next();
    }
  }

  get waiting() {
    return this.foreground.length + this.background.length;
  }

  /** Every slot busy, or renders already queued behind them. */
  get saturated() {
    return this.active >= this.concurrency || this.waiting > 0;
  }
}

/**
 * Tee a response: wrap `res.write`/`res.end` so the body Next streams to the
 * client is also collected, then settle with the status, headers and body on
 * `finish`, or with `aborted: true` when the socket closes first. Bodies
 * above the storable limit are dropped (body null) but still streamed.
 */
function recordResponse(res, resolve) {
  const chunks = [];
  let length = 0;
  let oversized = false;
  let settled = false;
  const collect = (chunk, encoding) => {
    if (oversized || chunk === undefined || chunk === null) return;
    // Next writes Route Handler bodies (robots, sitemaps, static-route HTML) as
    // Uint8Array chunks; stringifying those would store "60,63,120,…" instead
    // of the bytes.
    const buffer = Buffer.isBuffer(chunk)
      ? chunk
      : ArrayBuffer.isView(chunk)
        ? Buffer.copyBytesFrom(chunk)
        : Buffer.from(String(chunk), typeof encoding === "string" ? encoding : "utf8");
    length += buffer.length;
    if (length > MAX_BODY_BYTES * 4) {
      oversized = true;
      chunks.length = 0;
      return;
    }
    chunks.push(buffer);
  };
  const write = res.write;
  const end = res.end;
  res.write = function (chunk, encoding, callback) {
    collect(chunk, encoding);
    return write.call(this, chunk, encoding, callback);
  };
  res.end = function (chunk, encoding, callback) {
    if (typeof chunk !== "function") collect(chunk, encoding);
    return end.call(this, chunk, encoding, callback);
  };
  const settle = (aborted) => {
    if (settled) return;
    settled = true;
    resolve({
      status: res.statusCode,
      headers: res.getHeaders(),
      body: aborted || oversized ? null : Buffer.concat(chunks),
      aborted,
    });
  };
  res.once("finish", () => settle(false));
  res.once("close", () => settle(!res.writableFinished));
  res.once("error", () => settle(true));
}

const gzipAsync = (buffer) => new Promise((resolve, reject) => zlib.gzip(buffer, (err, out) => (err ? reject(err) : resolve(out))));
const gunzipAsync = (buffer) => new Promise((resolve, reject) => zlib.gunzip(buffer, (err, out) => (err ? reject(err) : resolve(out))));

function clientAcceptsGzip(req) {
  const accept = req.headers?.["accept-encoding"];
  return typeof accept === "string" && /\bgzip\b/i.test(accept);
}

/**
 * Serialize an entry as: 4-byte big-endian JSON length, JSON metadata, body.
 */
export function encodeEntry(entry) {
  const meta = Buffer.from(
    JSON.stringify({
      status: entry.status,
      headers: entry.headers,
      encoding: entry.encoding,
      storedAt: entry.storedAt,
      freshMs: entry.freshMs,
      key: entry.key,
    }),
  );
  const prefix = Buffer.alloc(4);
  prefix.writeUInt32BE(meta.length, 0);
  return Buffer.concat([prefix, meta, entry.body]);
}

export function decodeEntry(buffer) {
  if (buffer.length < 4) return null;
  const metaLength = buffer.readUInt32BE(0);
  if (metaLength <= 0 || 4 + metaLength > buffer.length) return null;
  try {
    const meta = JSON.parse(buffer.subarray(4, 4 + metaLength).toString());
    return { ...meta, body: buffer.subarray(4 + metaLength) };
  } catch {
    return null;
  }
}

/** Fresh, stale (serve and revalidate) or expired (ignore). */
export function entryState(entry, now, staleMs) {
  const age = now - entry.storedAt;
  if (age <= entry.freshMs) return "fresh";
  if (age <= entry.freshMs + staleMs) return "stale";
  return "expired";
}

export class HtmlCache {
  constructor(options) {
    const config = { ...htmlCacheConfig(options.env || process.env), ...options };
    this.config = config;
    this.dir = options.dir;
    this.contentDir = options.contentDir;
    this.buildId = options.buildId || "dev";
    this.log = options.log || console.log;
    this.now = options.now || Date.now;
    this.memory = new ByteLru(config.memoryBytes);
    this.limiter = new RenderLimiter(config.renderConcurrency);
    this.inflight = new Map();
    this.generation = this.computeGeneration();
    this.stats = { hit: 0, stale: 0, miss: 0, coalesced: 0, bypass: 0, skipped: 0, stored: 0, errors: 0 };
    this.timers = [];
    this.origin = null;
    // null until the loopback probe has run; background refreshes need true.
    this.loopbackOk = null;
    this.ready = null;
    if (this.dir) {
      try {
        mkdirSync(this.dir, { recursive: true });
      } catch (error) {
        this.log(`[gaf] html cache: disk tier disabled (${error.message})`);
        this.dir = null;
      }
    }
  }

  computeGeneration() {
    const content = this.contentDir ? contentFingerprint(this.contentDir) : "none";
    return `${this.buildId}:${content}`;
  }

  /**
   * Call once the HTTP server is listening. Starts the content and disk
   * sweeps and probes the loopback address; background refreshes and warming
   * only run when that probe succeeds (some hosts do not let the app connect
   * to its own port, and a miss must never wait on that).
   */
  start(server) {
    const address = server.address();
    if (address && typeof address === "object") {
      const host = address.address === "0.0.0.0" || address.address === "::" ? "127.0.0.1" : address.address;
      this.origin = { host, port: address.port };
    }
    if (this.contentDir) {
      const sweep = setInterval(() => this.refreshGeneration(), CONTENT_SWEEP_MS);
      sweep.unref();
      this.timers.push(sweep);
    }
    if (this.dir) {
      const sweep = setInterval(() => {
        this.sweepDisk().catch((error) => this.log(`[gaf] html cache: disk sweep failed (${error.message})`));
      }, DISK_SWEEP_MS);
      sweep.unref();
      this.timers.push(sweep);
      this.sweepDisk().catch(() => {});
    }
    this.ready = this.probeLoopback();
    return this;
  }

  stop() {
    for (const timer of this.timers) clearInterval(timer);
    this.timers = [];
  }

  /** One quick self-request; decides whether background refreshes are possible. */
  async probeLoopback() {
    if (!this.origin || !this.config.loopback) {
      this.loopbackOk = false;
      if (this.origin) this.log("[gaf] html cache: loopback disabled (GAF_HTML_LOOPBACK=off); stale pages are refreshed on request");
      return false;
    }
    try {
      await this.fetchFromOrigin({ url: "/robots.txt", headers: { host: `${this.origin.host}:${this.origin.port}` } }, LOOPBACK_PROBE_MS);
      this.loopbackOk = true;
    } catch (error) {
      this.loopbackOk = false;
      this.log(`[gaf] html cache: loopback to ${this.origin.host}:${this.origin.port} unavailable (${error.message}); ` +
        "stale pages are refreshed on request instead of in the background");
    }
    return this.loopbackOk;
  }

  refreshGeneration() {
    const next = this.computeGeneration();
    if (next === this.generation) return false;
    this.generation = next;
    this.memory.clear();
    this.log(`[gaf] html cache: content changed, generation ${next}`);
    return true;
  }

  fileFor(key) {
    const hash = createHash("sha1").update(`${this.generation}\n${key}`).digest("hex");
    return path.join(this.dir, `${hash}.bin`);
  }

  async read(key) {
    const hit = this.memory.get(key);
    if (hit && hit.generation === this.generation) return hit;
    if (hit) this.memory.delete(key);
    if (!this.dir) return undefined;
    try {
      const entry = decodeEntry(await fsp.readFile(this.fileFor(key)));
      if (!entry || entry.key !== key) return undefined;
      entry.generation = this.generation;
      if (entryState(entry, this.now(), this.config.staleMs) === "expired") return undefined;
      this.memory.set(key, entry);
      return entry;
    } catch {
      return undefined;
    }
  }

  async write(key, entry) {
    entry.generation = this.generation;
    this.memory.set(key, entry);
    this.stats.stored += 1;
    if (!this.dir) return;
    const file = this.fileFor(key);
    const tmp = `${file}.${process.pid}.${Math.random().toString(36).slice(2)}.tmp`;
    try {
      await fsp.writeFile(tmp, encodeEntry(entry));
      await fsp.rename(tmp, file);
    } catch (error) {
      await fsp.rm(tmp, { force: true }).catch(() => {});
      this.log(`[gaf] html cache: disk tier disabled, could not persist ${key} (${error.message})`);
      this.dir = null;
    }
  }

  /** Drop expired files, then the oldest ones until the disk tier fits its cap. */
  async sweepDisk() {
    if (!this.dir) return { removed: 0, bytes: 0 };
    const names = await fsp.readdir(this.dir);
    const now = this.now();
    const files = [];
    for (const name of names) {
      const full = path.join(this.dir, name);
      try {
        const stat = await fsp.stat(full);
        if (!stat.isFile()) continue;
        files.push({ full, size: stat.size, mtimeMs: stat.mtimeMs, tmp: name.endsWith(".tmp") });
      } catch {
        // Already gone.
      }
    }
    let removed = 0;
    let bytes = 0;
    const keep = [];
    for (const file of files) {
      const dead = file.tmp
        ? now - file.mtimeMs > 60_000
        : now - file.mtimeMs > this.config.freshMs + this.config.staleMs;
      if (dead) {
        await fsp.rm(file.full, { force: true }).catch(() => {});
        removed += 1;
      } else {
        keep.push(file);
        bytes += file.size;
      }
    }
    keep.sort((a, b) => a.mtimeMs - b.mtimeMs);
    for (const file of keep) {
      if (bytes <= this.config.diskBytes) break;
      await fsp.rm(file.full, { force: true }).catch(() => {});
      bytes -= file.size;
      removed += 1;
    }
    return { removed, bytes };
  }

  /**
   * Express-style entry point: answers from cache or renders through `next`.
   * `next(req, res)` is Next's request handler. A miss is rendered on this
   * very request (the response is recorded as it streams to the client), so
   * the cache never depends on reaching its own port.
   */
  async handle(req, res, next) {
    const key = cacheKeyFor(req);
    if (key === null) {
      this.stats.bypass += 1;
      return next(req, res);
    }
    try {
      const entry = await this.read(key);
      if (entry) {
        const state = entryState(entry, this.now(), this.config.staleMs);
        if (state === "fresh") {
          this.stats.hit += 1;
          return this.send(req, res, entry, "HIT");
        }
        if (state === "stale" && (this.loopbackOk || this.limiter.saturated)) {
          // Serve stale and refresh in the background when the loopback
          // works; when it does not, still prefer stale while renders are
          // queued, and otherwise fall through to render now.
          this.stats.stale += 1;
          if (this.loopbackOk) this.revalidate(key, req).catch(() => {});
          return this.send(req, res, entry, "STALE");
        }
      }
      const pending = this.inflight.get(key);
      if (pending) {
        const result = await pending;
        if (result.entry) {
          this.stats.coalesced += 1;
          return this.send(req, res, result.entry, "HIT");
        }
      }
    } catch (error) {
      this.stats.errors += 1;
      this.log(`[gaf] html cache: ${key} read failed, rendering (${error.message})`);
    }
    if (res.headersSent || res.writableEnded || req.destroyed) return undefined;
    this.stats.miss += 1;
    return this.renderThrough(key, req, res, next);
  }

  /**
   * Render the client's own request through Next inside the limiter and
   * record the response. Concurrent requests for the same key wait on the
   * promise registered in `inflight` and are served from the stored entry.
   */
  renderThrough(key, req, res, next) {
    const run = (async () => {
      await this.limiter.acquire(false);
      try {
        if (req.destroyed || res.writableEnded) return { entry: null, abandoned: true };
        res.setHeader("x-gaf-cache", "MISS");
        // Next renders a HEAD fully but writes no body, so there would be
        // nothing to store. Node already decided from the original method
        // that this response carries no body on the wire, so rendering it as
        // a GET gives the recorder the document while the client still gets
        // headers only (monitors and `curl -I` then warm the cache too).
        if (req.method === "HEAD" && res._hasBody === false) req.method = "GET";
        const recorded = await new Promise((resolve) => {
          recordResponse(res, resolve);
          next(req, res);
        });
        if (req.method !== "GET" || recorded.aborted || !recorded.body) return { entry: null };
        if (!isStorable(recorded.status, recorded.headers, recorded.body.length)) {
          this.stats.skipped += 1;
          return { entry: null };
        }
        const entry = await this.entryFrom(key, recorded.status, recorded.headers, recorded.body);
        await this.write(key, entry);
        return { entry };
      } finally {
        this.limiter.release();
      }
    })();
    this.inflight.set(key, run);
    run.finally(() => {
      if (this.inflight.get(key) === run) this.inflight.delete(key);
    });
    return run.then(() => undefined);
  }

  async entryFrom(key, status, headers, body) {
    const gzipped = /\bgzip\b/i.test(String(headers["content-encoding"] || ""));
    const entry = {
      key,
      status,
      headers: storableHeaders(headers),
      encoding: gzipped ? "gzip" : "identity",
      body,
      storedAt: this.now(),
      freshMs: status === 404 ? this.config.notFoundFreshMs : this.config.freshMs,
    };
    if (!gzipped && body.length > 0) {
      entry.body = await gzipAsync(body);
      entry.encoding = "gzip";
    }
    return entry;
  }

  /** Background refresh of a stale key through the loopback (only when it works). */
  async revalidate(key, req) {
    if (this.inflight.has(key)) return;
    const run = (async () => {
      await this.limiter.acquire(true);
      try {
        const response = await this.fetchFromOrigin(req, LOOPBACK_RENDER_MS);
        if (!isStorable(response.status, response.headers, response.body.length)) return { entry: null };
        const entry = await this.entryFrom(key, response.status, response.headers, response.body);
        await this.write(key, entry);
        return { entry };
      } catch (error) {
        this.log(`[gaf] html cache: background refresh of ${key} failed (${error.message})`);
        if (/ECONNREFUSED|EHOSTUNREACH|timed out/.test(error.message)) this.loopbackOk = false;
        return { entry: null };
      } finally {
        this.limiter.release();
      }
    })();
    this.inflight.set(key, run);
    run.finally(() => {
      if (this.inflight.get(key) === run) this.inflight.delete(key);
    });
    await run;
  }

  /** Loopback GET to the same server, marked so it bypasses the cache. */
  fetchFromOrigin(req, timeoutMs) {
    if (!this.origin) return Promise.reject(new Error("no loopback address"));
    const headers = {
      host: req.headers.host || `${this.origin.host}:${this.origin.port}`,
      "accept-encoding": "gzip",
      accept: req.headers.accept || "text/html,*/*",
      "user-agent": req.headers["user-agent"] || "gaf-origin-cache",
      "x-gaf-render": "1",
    };
    for (const name of ["x-forwarded-host", "x-forwarded-proto", "x-forwarded-for", "accept-language"]) {
      if (req.headers[name]) headers[name] = req.headers[name];
    }
    return new Promise((resolve, reject) => {
      const request = http.request(
        { host: this.origin.host, port: this.origin.port, method: "GET", path: req.url, headers },
        (response) => {
          const chunks = [];
          let length = 0;
          response.on("data", (chunk) => {
            length += chunk.length;
            if (length > MAX_BODY_BYTES * 4) {
              response.destroy(new Error("response too large"));
              return;
            }
            chunks.push(chunk);
          });
          response.on("end", () => {
            resolve({ status: response.statusCode || 500, headers: response.headers, body: Buffer.concat(chunks) });
          });
          response.on("error", reject);
        },
      );
      // Short connect budget, longer render budget once connected. A kept-alive
      // socket from the agent pool is already connected when handed over.
      request.setTimeout(LOOPBACK_CONNECT_MS, () => request.destroy(new Error("loopback connect timed out")));
      request.on("socket", (socket) => {
        const connected = () => {
          request.setTimeout(timeoutMs, () => request.destroy(new Error("loopback render timed out")));
        };
        if (socket.connecting) socket.once("connect", connected);
        else connected();
      });
      request.on("error", reject);
      request.end();
    });
  }

  async send(req, res, entry, status) {
    if (res.headersSent || res.writableEnded) return;
    const headers = { ...entry.headers };
    headers.date = new Date(this.now()).toUTCString();
    headers.age = String(Math.max(0, Math.floor((this.now() - entry.storedAt) / 1000)));
    headers["x-gaf-cache"] = status;
    let body = entry.body;
    if (entry.encoding === "gzip") {
      if (clientAcceptsGzip(req)) {
        headers["content-encoding"] = "gzip";
      } else {
        body = await gunzipAsync(entry.body);
      }
    }
    const vary = headers.vary ? headers.vary.split(",").map((part) => part.trim()).filter(Boolean) : [];
    if (!vary.some((part) => part.toLowerCase() === "accept-encoding")) vary.push("Accept-Encoding");
    headers.vary = vary.join(", ");
    headers["content-length"] = String(body.length);
    res.writeHead(entry.status, headers);
    if (req.method === "HEAD") return res.end();
    return res.end(body);
  }

  /** Render a list of paths in the background (hub pages after boot); loopback only. */
  async warm(paths) {
    if (this.ready) await this.ready;
    if (!this.loopbackOk) return;
    for (const pathname of paths) {
      const fake = { method: "GET", url: pathname, headers: { host: `${this.origin.host}:${this.origin.port}` } };
      const key = cacheKeyFor(fake);
      if (key === null) continue;
      const existing = await this.read(key);
      if (existing && entryState(existing, this.now(), this.config.staleMs) === "fresh") continue;
      await this.revalidate(key, fake);
    }
  }
}

const ATTACHED = Symbol.for("gaf.html-cache.attached");

/**
 * Put the cache in front of every `request` listener already on `server`
 * (Next's own handler under `next start`, or the handler `server.mjs`
 * registered). Idempotent per server; returns the cache or null when the
 * server was already wrapped. Starts the cache (loopback origin, sweeps) once
 * the server is listening and warms the hub pages.
 */
export function attachHtmlCache(server, cache, { warm = WARM_PATHS, log = console.log } = {}) {
  if (!server || server[ATTACHED]) return null;
  const originals = server.listeners("request");
  if (originals.length === 0) return null;
  Object.defineProperty(server, ATTACHED, { value: cache, enumerable: false });
  server.removeAllListeners("request");
  const next = (req, res) => {
    for (const listener of originals) listener.call(server, req, res);
  };
  server.on("request", (req, res) => {
    cache.handle(req, res, next).catch((error) => {
      log(`[gaf] html cache: request failed (${error.message})`);
      if (!res.headersSent) res.writeHead(500).end();
      else res.destroy();
    });
  });
  const begin = () => {
    cache.start(server);
    if (warm.length) cache.warm(warm).catch(() => {});
  };
  if (server.listening) begin();
  else server.once("listening", begin);
  return cache;
}

function readBuildId(root) {
  try {
    return readFileSync(path.join(root, ".next", "BUILD_ID"), "utf8").trim();
  } catch {
    return "unknown";
  }
}

/** Build an HtmlCache rooted at a project directory, honouring the env knobs. */
export function createHtmlCache(root, options = {}) {
  const config = htmlCacheConfig(options.env || process.env);
  if (!config.enabled) return null;
  return new HtmlCache({
    dir: path.join(root, ".next", "cache", "gaf-html"),
    contentDir: path.join(root, "content"),
    buildId: readBuildId(root),
    ...options,
  });
}

/**
 * For hosts that run `next start`: find the HTTP server Next already opened
 * (it listens before instrumentation runs) and wrap it. Returns how many
 * servers were wrapped.
 */
export function installHtmlCacheOnActiveServers(root, options = {}) {
  const getHandles = process._getActiveHandles;
  if (typeof getHandles !== "function") return 0;
  let installed = 0;
  for (const handle of getHandles.call(process)) {
    if (!(handle instanceof http.Server) || handle[ATTACHED]) continue;
    const cache = createHtmlCache(root, options);
    if (!cache) return 0;
    if (attachHtmlCache(handle, cache, options)) installed += 1;
  }
  return installed;
}

/** Constructor names of the process's active handles, for the boot log. */
export function describeActiveHandles() {
  const getHandles = process._getActiveHandles;
  if (typeof getHandles !== "function") return "unavailable";
  const counts = new Map();
  for (const handle of getHandles.call(process)) {
    const name = handle?.constructor?.name || typeof handle;
    counts.set(name, (counts.get(name) || 0) + 1);
  }
  return [...counts].map(([name, count]) => (count > 1 ? `${name}×${count}` : name)).join(", ") || "none";
}

export const INSTALL_RETRY_MS = 15_000;
const INSTALL_POLL_MS = 250;

/**
 * `installHtmlCacheOnActiveServers`, then keep looking for a little while in
 * case the host's start command opens its listener after instrumentation
 * ran. Always logs the outcome so a boot log says why the cache is or is not
 * active. Resolves with the number of servers wrapped.
 */
export function installHtmlCacheWithRetry(root, options = {}) {
  const log = options.log || console.log;
  const env = options.env || process.env;
  const config = htmlCacheConfig(env);
  if (!config.enabled) {
    log("[gaf] html cache off (GAF_HTML_CACHE=off)");
    return Promise.resolve(0);
  }
  const timeoutMs = options.retryMs ?? INSTALL_RETRY_MS;
  const started = Date.now();
  const attempt = () => installHtmlCacheOnActiveServers(root, options);
  const report = (installed) => {
    const waited = Date.now() - started;
    log(
      `[gaf] ${describeHtmlCache({ config })} (attached to the next start listener` +
        `${waited >= INSTALL_POLL_MS ? ` after ${waited} ms` : ""})`,
    );
    return installed;
  };
  const first = attempt();
  if (first > 0) return Promise.resolve(report(first));
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      const installed = attempt();
      if (installed > 0) {
        clearInterval(timer);
        resolve(report(installed));
        return;
      }
      if (Date.now() - started >= timeoutMs) {
        clearInterval(timer);
        log(
          `[gaf] html cache: no listening http server found within ${Math.round(timeoutMs / 1000)} s; ` +
            `misses are not cached. Active handles: ${describeActiveHandles()}`,
        );
        resolve(0);
      }
    }, INSTALL_POLL_MS);
    timer.unref();
  });
}

export function describeHtmlCache(cache) {
  if (!cache) return "html cache off";
  const { freshMs, staleMs, renderConcurrency } = cache.config;
  return `html cache on: fresh ${Math.round(freshMs / 60_000)} min, stale ${Math.round(staleMs / 3_600_000)} h, ${renderConcurrency} concurrent renders`;
}

export const WARM_PATHS = [
  "/",
  "/doctors",
  "/hospitals",
  "/costs",
  "/blogs",
  "/treatments",
  "/ar",
  "/ar/doctors",
  "/ar/hospitals",
  "/ar/costs",
  "/ar/blogs",
  "/ar/treatments",
  "/sitemap.xml",
  "/robots.txt",
];

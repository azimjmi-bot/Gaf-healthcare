/**
 * Cloudflare Workers entry logic, kept free of the generated OpenNext bundle
 * so it can be unit-tested with fake buckets. `src/worker.ts` wires it to
 * `.open-next/worker.js` and is the Worker's `main`.
 *
 * Responsibilities, in request order:
 *
 * 1. Install the R2 content backend once per isolate, before the first
 *    `await`, so the server bundle's `contentStorage()` never has to choose a
 *    default (`GAF_STORAGE=r2` makes that choice an error anyway).
 * 2. Serve `/uploads/*` from the static bucket. Media is never part of the
 *    deployed assets, so an upload or deletion is visible on the next
 *    request without a deploy and without Next enumerating `public/`.
 * 3. Hydrate every content group the request can read, answering 503 when
 *    that is not possible, then check whether another isolate has published
 *    newer content. Only then is the request handed to Next.
 */
import { COST_ARTICLES_KEY } from "@/data/cost-articles/asset";
import { CATALOG_SEED_KEY } from "@/lib/catalog-seed";
import { setContentStorage } from "@/lib/storage";
import {
  contentTypeFor,
  EDITION_GROUPS,
  R2ContentStorage,
  StorageHydrationError,
  type AssetFetcherLike,
  type EditionGroup,
  type R2BucketLike,
  type R2ObjectBodyLike,
  type R2ObjectLike,
} from "@/lib/storage/r2";

export interface ExecutionContextLike {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException?(): void;
}

/** Bindings declared in wrangler.jsonc. Other bindings pass through untouched. */
export interface WorkerEnv {
  CONTENT: R2BucketLike;
  STATIC: R2BucketLike;
  ASSETS: AssetFetcherLike;
  /**
   * Staging Worker only. Exactly `"off"` marks every response this runtime
   * returns with `X-Robots-Tag: noindex, nofollow`. Any other value, including
   * unset, leaves indexing headers untouched so Hostinger and a future
   * production Worker keep their existing behavior.
   */
  GAF_INDEXING?: string;
  [binding: string]: unknown;
}

/** Response header added only when `GAF_INDEXING` is exactly `"off"`. */
export const STAGING_ROBOTS_TAG = "noindex, nofollow";

/** Statuses that must not carry a body. */
const NULL_BODY_STATUS = new Set([101, 204, 205, 304]);

/**
 * Copy the response and set the staging robots header.
 *
 * The copy is made at the Worker boundary, after Next and the upload cache
 * have stored their own response. Headers are copied into a new `Headers`
 * object so an immutable or already-cached header list is left unchanged,
 * and the HTML or object body is not rewritten.
 */
export function withStagingRobots(response: Response, env: WorkerEnv): Response {
  if (env.GAF_INDEXING !== "off") return response;
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", STAGING_ROBOTS_TAG);
  return new Response(NULL_BODY_STATUS.has(response.status) ? null : response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export type FetchHandler<Env = WorkerEnv> = (
  request: Request,
  env: Env,
  ctx: ExecutionContextLike,
) => Promise<Response>;

/** The CMS-only groups: `ai-generations.json` is read by `/api/cms/ai/*` alone. */
const CMS_ONLY_GROUPS: readonly EditionGroup[] = ["cms"];
const PUBLIC_GROUPS: readonly EditionGroup[] = EDITION_GROUPS.filter((group) => !CMS_ONLY_GROUPS.includes(group));

/**
 * Files the renderer reads at request time that ship with the deploy as
 * Worker assets, keyed by storage key (docs/content-storage.md §3.7): the
 * Arabic radiation stylesheet, the static doctor/hospital catalog, and the
 * packed cost-article corpus. `scripts/cloudflare/post-build.mjs` copies the
 * last two under `/_gaf/`. `/_gaf/*` is routed to this Worker
 * (`run_worker_first`) and answered 404 below, so those files are readable
 * through the ASSETS binding but not from the web.
 */
export const ASSET_KEYS: Record<string, string> = {
  "public/ar-ro-directory.css": "/ar-ro-directory.css",
  [CATALOG_SEED_KEY]: `/_gaf/${CATALOG_SEED_KEY}`,
  [COST_ARTICLES_KEY]: `/_gaf/${COST_ARTICLES_KEY}`,
};

const PRIVATE_ASSETS_PATH = "/_gaf/";

const UPLOADS_PATH = "/uploads/";
const UPLOAD_CACHE_CONTROL = "public, max-age=60";

/** True when Cookie contains a gaf_cms pair, wherever it sits in the header. */
function hasCmsCookie(request: Request): boolean {
  const header = request.headers.get("cookie");
  if (!header) return false;
  return header.split(";").some((part) => part.trim().startsWith("gaf_cms="));
}

/**
 * How many document renders one isolate may run at once.
 *
 * A Workers isolate multiplexes requests and keeps every in-flight render
 * reachable, so garbage collection cannot free it. The capped workload stays
 * inside a 120 MiB heap at 8 concurrent documents (peak usedSize about 106).
 * The hreflang check opens 12 sitemap URLs and fetches the Arabic and English
 * documents together — 24 renders — and a fresh 120 MiB isolate then dies in
 * the cost pages with a mark-compact that frees nothing (about 108 → 106).
 * Eight is the largest concurrency that workload already survived. Further
 * requests wait; their response bytes are unchanged. HEAD is exempt because
 * OpenNext revalidation calls this worker again while a render still holds
 * its slot, and counting that call would deadlock.
 *
 * Waiting is a same-request timer, not a shared waiter queue. workerd cancels
 * a promise that one request resolves from inside another request, which
 * turned the queue into hung 500s under the 24-wide crawl. An Arabic URL is
 * rewritten to its unprefixed path as a second fetch; that subrequest does
 * not take a slot, or the eight parents wait forever on their own rewrites.
 *
 * The second fetch is recognised by `CF-Worker`, which Cloudflare sets on a
 * Worker subrequest and removes from visitor traffic. `x-gaf-path`,
 * `x-gaf-locale`, `rsc`, and `next-url` are ordinary request headers. A
 * visitor can send them, so they do not open the gate on their own.
 */
export const MAX_INFLIGHT_RENDERS = 8;

/**
 * Cloudflare adds this on a Worker `fetch()` subrequest and overwrites a
 * visitor-supplied value at the edge. `wrangler dev` does not strip it.
 */
export const CF_WORKER_HEADER = "cf-worker";

/** A Worker subrequest, as opposed to a visitor request. */
export function isWorkerSubrequest(request: Request) {
  const worker = request.headers.get(CF_WORKER_HEADER);
  return Boolean(worker && worker.trim());
}

/**
 * OpenNext's locale rewrite and its other in-worker continuations. The
 * continuation headers are necessary but not sufficient: without `CF-Worker`
 * they are just client input.
 */
function isRenderSubrequest(request: Request) {
  if (!isWorkerSubrequest(request)) return false;
  const headers = request.headers;
  if (headers.has("x-gaf-path") || headers.has("x-middleware-subrequest") || headers.has("x-isr")) {
    return true;
  }
  for (const key of headers.keys()) {
    if (
      key.startsWith("x-middleware-request-") ||
      key.startsWith("x-middleware-response-") ||
      key.startsWith("x-opennext-") ||
      key.startsWith("x-open-next-")
    ) {
      return true;
    }
  }
  return false;
}

function waitForSlot(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * `next.config` attaches this Cache-Control to `/` only. OpenNext carries a
 * locale-home rewrite out as a second fetch of `/`, so that directive is
 * appended to `/ar` (and the other locale homes). The English homepage is
 * meant to keep both values. A locale home is not: the proxy already set
 * the public HTML policy, and that is the header the baseline records.
 */
const ENGLISH_HOME_CACHE = "public, max-age=0, s-maxage=120, stale-while-revalidate=600";
const LOCALE_HOME = /^\/(ar|fr|ru|sw)$/;

function restoreLocaleHomeCache(pathname: string, response: Response) {
  if (!LOCALE_HOME.test(pathname)) return response;
  const current = response.headers.get("cache-control");
  if (!current?.includes(ENGLISH_HOME_CACHE)) return response;
  const restored = current
    .replace(`, ${ENGLISH_HOME_CACHE}`, "")
    .replace(`${ENGLISH_HOME_CACHE}, `, "")
    .trim();
  if (!restored || restored === current) return response;
  const headers = new Headers(response.headers);
  headers.set("cache-control", restored);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function createRenderGate(limit: number, onPeak?: (peak: number) => void) {
  let inflight = 0;
  let peak = 0;
  return async function withRenderSlot<T>(run: () => Promise<T>): Promise<T> {
    while (inflight >= limit) await waitForSlot(15);
    inflight += 1;
    if (inflight > peak) {
      peak = inflight;
      onPeak?.(peak);
    }
    try {
      return await run();
    } finally {
      inflight -= 1;
    }
  };
}

/**
 * Groups to hydrate before `pathname` is routed.
 *
 * Every public page can read every published edition: the language switcher
 * and hreflang block ask whether the Arabic (or any future published locale)
 * equivalent exists, and Arabic pages overlay the English catalog. So public
 * traffic hydrates all editions; what it never loads is the CMS-only group.
 * The CMS itself can read anything, including the AI history.
 */
export function groupsForRequest(pathname: string): readonly EditionGroup[] {
  if (pathname === "/cms" || pathname.startsWith("/cms/") || pathname.startsWith("/api/cms/")) {
    return EDITION_GROUPS;
  }
  return PUBLIC_GROUPS;
}

/** Deploy-time files the Worker reads itself (`ASSET_KEYS`) and must not serve. */
export function isPrivateAssetPath(pathname: string) {
  return pathname === PRIVATE_ASSETS_PATH.slice(0, -1) || pathname.startsWith(PRIVATE_ASSETS_PATH);
}

export function isUploadPath(pathname: string) {
  return pathname.startsWith(UPLOADS_PATH) && pathname.length > UPLOADS_PATH.length;
}

/** `/uploads/articles/x.webp` → `uploads/articles/x.webp`, or null when it is not a clean key. */
export function uploadKeyFor(pathname: string): string | null {
  if (!isUploadPath(pathname)) return null;
  let decoded: string;
  try {
    decoded = decodeURIComponent(pathname.slice(1));
  } catch {
    return null;
  }
  const segments = decoded.split("/");
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) return null;
  return decoded;
}

function hasBody(object: R2ObjectBodyLike | R2ObjectLike | null): object is R2ObjectBodyLike {
  return object !== null && "arrayBuffer" in object;
}

function hydrationUnavailable(error: unknown, log: (message: string) => void) {
  const message = error instanceof Error ? error.message : String(error);
  const cause = error instanceof Error && error.cause instanceof Error ? ` (cause: ${error.cause.message})` : "";
  log(`${message}${cause}`);
  return new Response("Content storage is unavailable. Please retry shortly.", {
    status: 503,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "retry-after": "10",
    },
  });
}

export type WorkerRuntimeOptions = {
  /** Replaces `caches.default`; tests pass their own, production uses the platform's. */
  cache?: () => CacheLike | undefined;
  log?: (message: string) => void;
  versionCheckIntervalMs?: number;
};

export interface CacheLike {
  match(request: Request): Promise<Response | undefined>;
  put(request: Request, response: Response): Promise<void>;
  delete(request: Request | string): Promise<boolean>;
}

function platformCache(): CacheLike | undefined {
  const storage = (globalThis as { caches?: { default?: CacheLike } }).caches;
  return storage?.default;
}

/**
 * Build the Worker handler around `next`, the fetch handler exported by the
 * generated OpenNext worker. One runtime, and so one storage, per isolate.
 */
export function createWorker(next: FetchHandler, options: WorkerRuntimeOptions = {}) {
  const log = options.log ?? ((message: string) => console.error(`[gaf] ${message}`));
  const cacheFor = options.cache ?? platformCache;
  let storage: R2ContentStorage | undefined;
  let envForNext: WorkerEnv | undefined;
  /** Hosts this isolate has served `/uploads/*` on; a deletion purges each. */
  const origins = new Set<string>();

  function purgeUpload(bucketKey: string) {
    const cache = cacheFor();
    if (!cache) return;
    for (const origin of origins) {
      void cache.delete(`${origin}/${bucketKey}`).catch((error: unknown) => {
        log(`cache purge failed for /${bucketKey}: ${error instanceof Error ? error.message : String(error)}`);
      });
    }
  }

  function install(env: WorkerEnv) {
    if (storage && envForNext) return { storage, envForNext };
    storage = new R2ContentStorage({
      content: env.CONTENT,
      static: env.STATIC,
      assets: env.ASSETS,
      assetKeys: ASSET_KEYS,
      versionCheckIntervalMs: options.versionCheckIntervalMs,
      log,
      onStaticChange: (bucketKey, kind) => {
        if (kind === "delete") purgeUpload(bucketKey);
      },
    });
    setContentStorage(storage);
    // Next's image optimizer resolves `/`-rooted sources through ASSETS; make
    // it see media that lives only in the static bucket.
    envForNext = { ...env, ASSETS: assetsWithUploads(env) };
    return { storage, envForNext };
  }

  const withRenderSlot = createRenderGate(MAX_INFLIGHT_RENDERS, (peak) => {
    log(`render gate in-flight peak ${peak}/${MAX_INFLIGHT_RENDERS}`);
  });

  async function renderDocument(
    request: Request,
    active: R2ContentStorage,
    nextEnv: WorkerEnv,
    ctx: ExecutionContextLike,
  ) {
    const url = new URL(request.url);
    try {
      await Promise.all(groupsForRequest(url.pathname).map((group) => active.ensureHydrated(group)));
    } catch (error) {
      if (error instanceof StorageHydrationError) return hydrationUnavailable(error, log);
      throw error;
    }
    await active.refreshIfStale();
    return next(request, nextEnv, ctx);
  }

  async function serveUpload(request: Request, env: WorkerEnv, ctx: ExecutionContextLike, url: URL) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405, headers: { allow: "GET, HEAD" } });
    }
    origins.add(url.origin);
    const cache = request.method === "GET" && !hasCmsCookie(request) ? cacheFor() : undefined;
    let response = cache ? await cache.match(request) : undefined;
    if (!response) {
      response = await uploadResponse(env.STATIC, url.pathname);
      if (response.ok && cache) ctx.waitUntil(cache.put(request, response.clone()));
    }
    if (request.method === "HEAD") return new Response(null, response);
    const etag = response.headers.get("etag");
    if (response.ok && etag && request.headers.get("if-none-match") === etag) {
      return new Response(null, { status: 304, headers: response.headers });
    }
    return response;
  }

  return {
    async fetch(request: Request, env: WorkerEnv, ctx: ExecutionContextLike): Promise<Response> {
      const { storage, envForNext } = install(env);
      const url = new URL(request.url);

      if (isUploadPath(url.pathname)) return withStagingRobots(await serveUpload(request, env, ctx, url), env);
      if (isPrivateAssetPath(url.pathname)) {
        return withStagingRobots(
          new Response("Not Found", { status: 404, headers: { "cache-control": "no-store" } }),
          env,
        );
      }

      // Uploads and the private asset 404 are answered above and do not take a
      // render slot. HEAD stays outside the gate; see MAX_INFLIGHT_RENDERS.
      // A Worker subrequest that continues a render already holds a slot.
      // Waiting for another slot deadlocks the parent.
      const subrequest = isRenderSubrequest(request);
      const response =
        request.method === "HEAD" || subrequest
          ? await renderDocument(request, storage, envForNext, ctx)
          : await withRenderSlot(() => renderDocument(request, storage, envForNext, ctx));
      return withStagingRobots(restoreLocaleHomeCache(url.pathname, response), env);
    },
    /** For tests and diagnostics. */
    storage: () => storage,
  };
}

/** The response for `/uploads/...` straight from the bucket (no cache lookup). */
export async function uploadResponse(bucket: R2BucketLike, pathname: string): Promise<Response> {
  const key = uploadKeyFor(pathname);
  if (!key) return new Response("Not Found", { status: 404, headers: { "cache-control": "no-store" } });
  const object = await bucket.get(key);
  if (!hasBody(object)) {
    return new Response("Not Found", { status: 404, headers: { "cache-control": "no-store" } });
  }
  const body = await object.arrayBuffer();
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": object.httpMetadata?.contentType ?? contentTypeFor(key),
      "content-length": String(body.byteLength),
      "cache-control": UPLOAD_CACHE_CONTROL,
      etag: `"${object.etag}"`,
    },
  });
}

/** `env.ASSETS` plus the static bucket for `/uploads/*`, for the image optimizer. */
export function assetsWithUploads(env: WorkerEnv): AssetFetcherLike {
  return {
    async fetch(input: string | URL | Request) {
      const url = new URL(input instanceof Request ? input.url : String(input));
      if (isUploadPath(url.pathname)) return uploadResponse(env.STATIC, url.pathname);
      return env.ASSETS.fetch(input);
    },
  };
}

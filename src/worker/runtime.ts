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
 * 3. Serve `/sitemap-{locale}.xml` from the build-time file under `/_gaf/`
 *    when that asset shipped. Building the English catalog inside a request
 *    exceeds the Worker CPU limit (Cloudflare error 1102). The file is not a
 *    public asset; `/_gaf/*` stays 404.
 * 4. Serve a cached public HTML document when this isolate already knows the
 *    content generation and the edge cache has that document. Tracking
 *    parameters share one entry. CMS, API, enquiry, and authenticated
 *    responses are never stored. A request that had to wait for a render
 *    slot checks the cache again before rendering.
 * 5. Serve `/_next/image` outside the document render slots, with its own
 *    small concurrency limit and a cache of successful image bytes.
 * 6. Hydrate every content group a document can read, answering 503 when
 *    that is not possible, then check whether another isolate has published
 *    newer content. Only then is the request handed to Next. A document that
 *    cannot obtain a render slot within the queue bound answers 503 instead
 *    of waiting with no bytes.
 */
import { COST_ARTICLES_KEY } from "@/data/cost-articles/asset";
import { CATALOG_SEED_KEY } from "@/lib/catalog-seed";
import { SITEMAP_HEADERS } from "@/lib/i18n/sitemap-xml";
import { setContentStorage, type ContentStorage } from "@/lib/storage";
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
  /**
   * How long a document may wait for a render slot, in milliseconds.
   * Unset uses {@link DEFAULT_RENDER_QUEUE_TIMEOUT_MS}. Invalid values do too.
   */
  GAF_RENDER_QUEUE_MS?: string;
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
/**
 * The Worker answers the request itself, so the origin's HTTP-to-HTTPS
 * redirect no longer runs. Send each plain-HTTP request to the same host
 * and path on HTTPS. www stays on www.
 */
export function sameHostHttpsRedirect(request: Request): Response | null {
  const url = new URL(request.url);
  if (url.protocol !== "http:") return null;
  url.protocol = "https:";
  return new Response(null, {
    status: 301,
    headers: {
      location: url.toString(),
      "cache-control": "public, max-age=300",
    },
  });
}

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

/**
 * Locale sitemaps packed by `scripts/cloudflare/pack-sitemaps.ts` into the
 * private asset tree. Absent on a build that skipped the packer, in which
 * case the request falls through to the Next route.
 */
const BAKED_SITEMAP = /^\/sitemap-(en|ar|fr|ru|sw)\.xml$/;

export function bakedSitemapAssetPath(pathname: string): string | null {
  const match = BAKED_SITEMAP.exec(pathname);
  if (!match) return null;
  return `/_gaf/sitemaps/${match[1]}.xml`;
}

const UPLOADS_PATH = "/uploads/";
const UPLOAD_CACHE_CONTROL = "public, max-age=60";

/** True when Cookie contains a gaf_cms pair, wherever it sits in the header. */
function hasCmsCookie(request: Request): boolean {
  const header = request.headers.get("cookie");
  if (!header) return false;
  return header.split(";").some((part) => part.trim().startsWith("gaf_cms="));
}

/** CMS edition selection changes the editor, so it must not share a public cache entry. */
function hasCmsEditionCookie(request: Request): boolean {
  const header = request.headers.get("cookie");
  if (!header) return false;
  return header.split(";").some((part) => part.trim().startsWith("gaf_cms_edition="));
}

/**
 * Shared-cache lifetime for public HTML. Matches `PUBLIC_HTML_CACHE` in
 * `src/proxy.ts` (`s-maxage=300`). The Cache API ignores `s-maxage` and
 * refuses `max-age=0`, so the stored copy uses `max-age` of this many
 * seconds. The visitor still receives the Cache-Control Next set.
 */
export const PUBLIC_HTML_SHARED_TTL_SECONDS = 300;

const HTML_CACHE_KEY_ORIGIN = "https://gaf-html-cache.internal/";

/**
 * Parameters that identify a campaign or click and do not change the document.
 * Anything else, including `page`, `hospital`, `treatment`, and `doctor`,
 * stays in the cache key and in the URL Next renders.
 */
const TRACKING_PARAMS = new Set([
  "_ga",
  "_gl",
  "dclid",
  "epik",
  "fbclid",
  "gad_campaignid",
  "gad_source",
  "gbraid",
  "gclid",
  "gclsrc",
  "igshid",
  "li_fat_id",
  "mc_cid",
  "mc_eid",
  "msclkid",
  "ncid",
  "pk_campaign",
  "pk_cid",
  "pk_content",
  "pk_kwd",
  "pk_medium",
  "pk_source",
  "rb_clickid",
  "sccid",
  "srsltid",
  "ttclid",
  "twclid",
  "wbraid",
  "yclid",
]);

export function isTrackingParam(name: string): boolean {
  const key = name.toLowerCase();
  if (key.startsWith("utm_") || key.startsWith("hsa_") || key.startsWith("mtm_")) return true;
  return TRACKING_PARAMS.has(key);
}

/** Same origin, path, and content parameters. Tracking parameters are removed. */
export function normalizedPublicUrl(input: URL): URL {
  const next = new URL(input.href);
  const kept: [string, string][] = [];
  for (const [key, value] of next.searchParams) {
    if (!isTrackingParam(key)) kept.push([key, value]);
  }
  kept.sort((a, b) => (a[0] === b[0] ? (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0) : a[0] < b[0] ? -1 : 1));
  next.search = "";
  for (const [key, value] of kept) next.searchParams.append(key, value);
  next.hash = "";
  return next;
}

function isEnquiryPath(pathname: string): boolean {
  return pathname === "/consult" || pathname.endsWith("/consult");
}

function isUncacheablePath(pathname: string): boolean {
  const path = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  if (path === "/cms" || path.startsWith("/cms/")) return true;
  if (path === "/api" || path.startsWith("/api/")) return true;
  return isEnquiryPath(path);
}

/** Next's image optimizer. It is not an HTML document and must not take a document slot. */
export const IMAGE_OPTIMIZER_PATH = "/_next/image";

export function isImageOptimizerPath(pathname: string): boolean {
  return pathname === IMAGE_OPTIMIZER_PATH;
}

/** A full document navigation. RSC payloads, prefetches, images, and subrequests are not HTML cache entries. */
export function isCacheableDocumentRequest(request: Request): boolean {
  if (request.method !== "GET") return false;
  if (isRenderSubrequest(request)) return false;
  const headers = request.headers;
  if (headers.has("authorization")) return false;
  if (hasCmsCookie(request) || hasCmsEditionCookie(request)) return false;
  for (const name of ["rsc", "next-router-prefetch", "next-router-segment-prefetch", "next-router-state-tree", "next-url"]) {
    if (headers.has(name)) return false;
  }
  const url = new URL(request.url);
  if (isImageOptimizerPath(url.pathname)) return false;
  return !isUncacheablePath(url.pathname);
}

/**
 * Cache key for one optimized image. Parameter order does not create a second
 * entry. The source, width, and quality stay in the query, so different sizes
 * stay distinct. Hostname stays distinct too.
 */
export function imageOptimizerCacheRequest(input: URL): Request {
  const next = new URL(input.href);
  const entries = [...next.searchParams.entries()];
  entries.sort((a, b) => (a[0] === b[0] ? (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0) : a[0] < b[0] ? -1 : 1));
  next.search = "";
  for (const [key, value] of entries) next.searchParams.append(key, value);
  next.hash = "";
  return new Request(next.toString(), { method: "GET" });
}

/** Path of the source image, when the optimizer query carries a site path. */
export function optimizedImageSource(input: URL): string | null {
  const raw = input.searchParams.get("url");
  if (!raw || !raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\")) return null;
  try {
    const decoded = decodeURIComponent(raw);
    if (!decoded.startsWith("/") || decoded.startsWith("//") || decoded.includes("..")) return null;
    return decoded;
  } catch {
    return null;
  }
}

function isCacheableHtmlResponse(response: Response): boolean {
  if (response.status !== 200) return false;
  if (response.headers.has("set-cookie")) return false;
  const type = response.headers.get("content-type") ?? "";
  if (!type.toLowerCase().includes("text/html")) return false;
  const cacheControl = response.headers.get("cache-control") ?? "";
  if (!/\bpublic\b/i.test(cacheControl)) return false;
  if (/\b(?:private|no-store|no-cache)\b/i.test(cacheControl)) return false;
  return true;
}

export function isCompleteHtmlDocument(body: string): boolean {
  const trimmed = body.trim();
  if (trimmed.length < 15) return false;
  const start = trimmed.slice(0, 64).toLowerCase();
  const opens = start.startsWith("<!doctype html") || start.startsWith("<html");
  return opens && trimmed.toLowerCase().endsWith("</html>");
}

/** Cache key. Hostname, path, content query, and content generation each stay distinct. */
export function publicHtmlCacheRequest(page: URL, generation: string): Request {
  const key = new URL(HTML_CACHE_KEY_ORIGIN);
  key.searchParams.set("origin", page.origin);
  key.searchParams.set("path", page.pathname);
  key.searchParams.set("query", page.search.startsWith("?") ? page.search.slice(1) : page.search);
  key.searchParams.set("generation", generation);
  return new Request(key.toString(), { method: "GET" });
}

function withNormalizedUrl(request: Request, url: URL): Request {
  if (url.href === request.url) return request;
  return new Request(url, request);
}

function copyResponse(response: Response, mutate: (headers: Headers) => void): Response {
  const headers = new Headers(response.headers);
  mutate(headers);
  return new Response(NULL_BODY_STATUS.has(response.status) ? null : response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function presentCachedHtml(cached: Response): Response {
  return copyResponse(cached, (headers) => {
    const original = headers.get("x-gaf-stored-cache-control");
    headers.delete("x-gaf-stored-cache-control");
    if (original) headers.set("cache-control", original);
    headers.set("x-gaf-html-cache", "hit");
  });
}

function boundedQueueTimeout(configured: number | undefined): number {
  if (configured === undefined) return DEFAULT_RENDER_QUEUE_TIMEOUT_MS;
  if (!Number.isFinite(configured) || configured < 0) return DEFAULT_RENDER_QUEUE_TIMEOUT_MS;
  return Math.min(MAX_RENDER_QUEUE_TIMEOUT_MS, Math.floor(configured));
}

async function storePublicHtml(
  cache: CacheLike,
  key: Request,
  response: Response,
  log: (message: string) => void,
  stillCurrent: () => boolean,
  remember: (url: string) => void,
): Promise<void> {
  try {
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (!isCompleteHtmlDocument(new TextDecoder().decode(bytes))) return;
    if (!stillCurrent()) return;
    const headers = new Headers(response.headers);
    headers.set("x-gaf-stored-cache-control", headers.get("cache-control") ?? "");
    headers.set("cache-control", `public, max-age=${PUBLIC_HTML_SHARED_TTL_SECONDS}`);
    headers.set("x-gaf-html-cache", "hit");
    headers.delete("set-cookie");
    await cache.put(key, new Response(bytes, { status: 200, headers }));
    if (!stillCurrent()) {
      await cache.delete(key);
      return;
    }
    remember(key.url);
  } catch (error) {
    log(`html cache write failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function renderBusyResponse(): Response {
  return new Response("The page is busy. Please retry shortly.", {
    status: 503,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "retry-after": RENDER_QUEUE_RETRY_AFTER,
    },
  });
}

function imageBusyResponse(): Response {
  return new Response("The image is busy. Please retry shortly.", {
    status: 503,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "retry-after": RENDER_QUEUE_RETRY_AFTER,
    },
  });
}

function imageCacheTtlSeconds(source: string | null): number {
  if (source?.startsWith("/uploads/")) return UPLOAD_IMAGE_CACHE_TTL_SECONDS;
  return PUBLIC_IMAGE_CACHE_TTL_SECONDS;
}

function isCacheableImageResponse(response: Response): boolean {
  if (response.status !== 200) return false;
  if (response.headers.has("set-cookie")) return false;
  const type = response.headers.get("content-type") ?? "";
  return type.toLowerCase().startsWith("image/");
}

function presentCachedImage(cached: Response): Response {
  return copyResponse(cached, (headers) => {
    const original = headers.get("x-gaf-stored-cache-control");
    headers.delete("x-gaf-stored-cache-control");
    if (original) headers.set("cache-control", original);
    else headers.delete("cache-control");
    headers.set("x-gaf-image-cache", "hit");
  });
}

function withoutBody(response: Response): Response {
  return new Response(null, { status: response.status, statusText: response.statusText, headers: response.headers });
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
 * requests wait, but only until the render-queue timeout. After that they
 * receive a 503 with Retry-After instead of hanging with no bytes. HEAD is
 * exempt because OpenNext revalidation calls this worker again while a render
 * still holds its slot, and counting that call would deadlock.
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
 * How many image optimizations one isolate may run at once.
 *
 * This is separate from {@link MAX_INFLIGHT_RENDERS}. An optimized image holds
 * the source bytes and the encoded output, and a page asks for several sizes.
 * Two keeps that work off the document gate: eight documents already approached
 * the 120 MiB heap, so images must not take those slots or add an unbounded
 * ninth decode. Further image requests wait only until the same queue timeout,
 * then receive a 503 that is not cached.
 */
export const MAX_INFLIGHT_IMAGE_RENDERS = 2;

/**
 * How long a cached optimized image is kept. Static sources follow the public
 * HTML lifetime. Upload sources follow the upload cache so a replaced file
 * cannot linger as a derivative for longer than the original bytes.
 */
export const PUBLIC_IMAGE_CACHE_TTL_SECONDS = PUBLIC_HTML_SHARED_TTL_SECONDS;
export const UPLOAD_IMAGE_CACHE_TTL_SECONDS = 60;
/** Matches the CMS upload limit. Larger optimizer output is served and not stored. */
const MAX_CACHED_IMAGE_BYTES = 8 * 1024 * 1024;

/**
 * How long a visitor document waits for a render slot before a 503.
 * The render itself is not cancelled; only the silent queue is bounded.
 * `GAF_RENDER_QUEUE_MS` overrides this, capped at {@link MAX_RENDER_QUEUE_TIMEOUT_MS}.
 * Image optimization uses the same wait so a saturated image gate cannot hang.
 */
export const DEFAULT_RENDER_QUEUE_TIMEOUT_MS = 2000;
export const MAX_RENDER_QUEUE_TIMEOUT_MS = 10_000;
export const RENDER_QUEUE_RETRY_AFTER = "2";

export function parseRenderQueueTimeout(value: string, fallback: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return fallback;
  return Math.min(MAX_RENDER_QUEUE_TIMEOUT_MS, Math.floor(parsed));
}

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

function createRenderGate(limit: number, timeoutMs: () => number, onPeak?: (peak: number) => void) {
  let inflight = 0;
  let peak = 0;
  return async function withRenderSlot<T>(run: () => Promise<T>, onBusy: () => T | Promise<T>): Promise<T> {
    const deadline = Date.now() + timeoutMs();
    while (inflight >= limit) {
      const remaining = deadline - Date.now();
      if (remaining <= 0) return onBusy();
      await waitForSlot(Math.min(15, remaining));
    }
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

async function serveBakedSitemap(
  assets: AssetFetcherLike,
  request: Request,
  assetPath: string,
): Promise<Response | null> {
  if (request.method !== "GET" && request.method !== "HEAD") return null;
  let asset: Response;
  try {
    asset = await assets.fetch(new URL(assetPath, "https://assets.local"));
  } catch {
    return null;
  }
  if (!asset.ok) return null;
  const xml = await asset.text();
  if (!xml.includes("<urlset") && !xml.includes("<sitemapindex")) return null;
  const headers = new Headers(SITEMAP_HEADERS);
  if (request.method === "HEAD") return new Response(null, { status: 200, headers });
  return new Response(xml, { status: 200, headers });
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

/**
 * What the request path needs from whichever backend `install` built.
 * Production and staging use `R2ContentStorage`. The preview entry can
 * supply a packed snapshot instead. The loose hydrate method is not replaced.
 */
export interface WorkerContent extends ContentStorage {
  ensureHydrated(group: EditionGroup): Promise<void>;
  refreshIfStale(): Promise<void>;
  contentGeneration(): string | null;
  ensureContentGeneration(): Promise<string>;
  isHydrated(group: EditionGroup): boolean;
}

export type WorkerRuntimeOptions = {
  /** Replaces `caches.default`; tests pass their own, production uses the platform's. */
  cache?: () => CacheLike | undefined;
  log?: (message: string) => void;
  versionCheckIntervalMs?: number;
  /** Overrides {@link DEFAULT_RENDER_QUEUE_TIMEOUT_MS} when the env binding is unset. */
  renderQueueTimeoutMs?: number;
  /**
   * Preview entry only. When omitted, the Worker installs `R2ContentStorage`
   * exactly as production and staging do.
   */
  createContent?: (
    env: WorkerEnv,
    hooks: {
      log: (message: string) => void;
      versionCheckIntervalMs?: number;
      onContentPublished?: (groups: readonly EditionGroup[]) => void;
      onStaticChange?: (bucketKey: string, kind: "put" | "delete") => void;
    },
  ) => WorkerContent;
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
  let storage: WorkerContent | undefined;
  let envForNext: WorkerEnv | undefined;
  /** Hosts this isolate has served `/uploads/*` on; a deletion purges each. */
  const origins = new Set<string>();
  /** Public HTML cache keys this isolate has stored. A publish deletes them. */
  const htmlCacheKeys = new Set<string>();
  /** Optimizer cache keys for each `/uploads/...` source this isolate has stored. */
  const imageCacheKeys = new Map<string, Set<string>>();
  let renderQueueTimeoutMs = boundedQueueTimeout(options.renderQueueTimeoutMs);

  function purgeHtmlCache() {
    const cache = cacheFor();
    const keys = [...htmlCacheKeys];
    htmlCacheKeys.clear();
    if (!cache) return;
    for (const key of keys) {
      void cache.delete(key).catch((error: unknown) => {
        log(`html cache purge failed: ${error instanceof Error ? error.message : String(error)}`);
      });
    }
  }

  function purgeUpload(bucketKey: string) {
    const cache = cacheFor();
    if (!cache) return;
    const forget = (key: string) => {
      void cache.delete(key).catch((error: unknown) => {
        log(`cache purge failed for ${key}: ${error instanceof Error ? error.message : String(error)}`);
      });
    };
    for (const origin of origins) forget(`${origin}/${bucketKey}`);
    const derived = imageCacheKeys.get(`/${bucketKey}`);
    if (!derived) return;
    imageCacheKeys.delete(`/${bucketKey}`);
    for (const key of derived) forget(key);
  }

  function rememberOptimizedImage(source: string | null, cacheUrl: string) {
    if (!source?.startsWith("/uploads/")) return;
    const keys = imageCacheKeys.get(source) ?? new Set<string>();
    keys.add(cacheUrl);
    imageCacheKeys.set(source, keys);
  }

  function install(env: WorkerEnv) {
    if (storage && envForNext) return { storage, envForNext };
    const hooks = {
      log,
      versionCheckIntervalMs: options.versionCheckIntervalMs,
      onContentPublished: () => purgeHtmlCache(),
      onStaticChange: (bucketKey: string) => {
        // A replacement at the same key must drop the previous bytes. A delete
        // does too. Remembered optimizer entries for that upload are included.
        purgeUpload(bucketKey);
      },
    };
    storage = options.createContent
      ? options.createContent(env, hooks)
      : new R2ContentStorage({
          content: env.CONTENT,
          static: env.STATIC,
          assets: env.ASSETS,
          assetKeys: ASSET_KEYS,
          versionCheckIntervalMs: options.versionCheckIntervalMs,
          log,
          onContentPublished: hooks.onContentPublished,
          onStaticChange: hooks.onStaticChange,
        });
    setContentStorage(storage);
    // Next's image optimizer resolves `/`-rooted sources through ASSETS; make
    // it see media that lives only in the static bucket.
    envForNext = { ...env, ASSETS: assetsWithUploads(env) };
    return { storage, envForNext };
  }

  const withRenderSlot = createRenderGate(
    MAX_INFLIGHT_RENDERS,
    () => renderQueueTimeoutMs,
    (peak) => {
      log(`render gate in-flight peak ${peak}/${MAX_INFLIGHT_RENDERS}`);
    },
  );
  const withImageSlot = createRenderGate(
    MAX_INFLIGHT_IMAGE_RENDERS,
    () => renderQueueTimeoutMs,
    (peak) => {
      log(`image gate in-flight peak ${peak}/${MAX_INFLIGHT_IMAGE_RENDERS}`);
    },
  );

  async function renderDocument(
    request: Request,
    active: WorkerContent,
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
    try {
      await active.refreshIfStale();
    } catch (error) {
      if (error instanceof StorageHydrationError) return hydrationUnavailable(error, log);
      throw error;
    }
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
      if (!env.STATIC) {
        return new Response("Not Found", { status: 404, headers: { "cache-control": "no-store" } });
      }
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

  async function readHtmlCache(normalized: URL): Promise<Response | undefined> {
    const cache = cacheFor();
    if (!cache || !storage) return undefined;
    try {
      await storage.refreshIfStale();
      const generation = await storage.ensureContentGeneration();
      const hit = await cache.match(publicHtmlCacheRequest(normalized, generation));
      return hit ? presentCachedHtml(hit) : undefined;
    } catch (error) {
      if (error instanceof StorageHydrationError) throw error;
      log(`html cache read failed: ${error instanceof Error ? error.message : String(error)}`);
      return undefined;
    }
  }

  async function readImageCache(page: URL): Promise<Response | undefined> {
    const cache = cacheFor();
    if (!cache) return undefined;
    try {
      const hit = await cache.match(imageOptimizerCacheRequest(page));
      return hit ? presentCachedImage(hit) : undefined;
    } catch (error) {
      log(`image cache read failed: ${error instanceof Error ? error.message : String(error)}`);
      return undefined;
    }
  }

  async function storeOptimizedImage(page: URL, response: Response): Promise<Response> {
    const bytes = new Uint8Array(await response.arrayBuffer());
    const headers = new Headers(response.headers);
    headers.delete("set-cookie");
    headers.set("content-length", String(bytes.byteLength));
    headers.set("x-gaf-image-cache", "miss");
    const live = new Response(bytes, { status: response.status, statusText: response.statusText, headers });
    const cache = cacheFor();
    const source = optimizedImageSource(page);
    if (!cache || bytes.byteLength === 0 || bytes.byteLength > MAX_CACHED_IMAGE_BYTES) return live;
    const key = imageOptimizerCacheRequest(page);
    try {
      const storedHeaders = new Headers(headers);
      storedHeaders.set("x-gaf-stored-cache-control", response.headers.get("cache-control") ?? "");
      storedHeaders.set("cache-control", `public, max-age=${imageCacheTtlSeconds(source)}`);
      storedHeaders.set("x-gaf-image-cache", "hit");
      await cache.put(key, new Response(bytes, { status: 200, headers: storedHeaders }));
      rememberOptimizedImage(source, key.url);
    } catch (error) {
      log(`image cache write failed: ${error instanceof Error ? error.message : String(error)}`);
    }
    return live;
  }

  /**
   * Image optimization never takes a document slot and never reads the HTML
   * cache. The optimizer still receives the visitor's URL unchanged.
   */
  async function serveOptimizedImage(
    request: Request,
    nextEnv: WorkerEnv,
    ctx: ExecutionContextLike,
    page: URL,
  ): Promise<Response> {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405, headers: { allow: "GET, HEAD", "cache-control": "no-store" } });
    }
    const privateRequest = request.headers.has("authorization");
    if (!privateRequest) {
      const cached = await readImageCache(page);
      if (cached) return request.method === "HEAD" ? withoutBody(cached) : cached;
    }
    return withImageSlot(
      async () => {
        if (!privateRequest) {
          const again = await readImageCache(page);
          if (again) return request.method === "HEAD" ? withoutBody(again) : again;
        }
        const rendered = await next(request, nextEnv, ctx);
        if (request.method === "HEAD") return withoutBody(rendered);
        if (privateRequest || !isCacheableImageResponse(rendered)) {
          return copyResponse(rendered, (headers) => headers.set("x-gaf-image-cache", "miss"));
        }
        return storeOptimizedImage(page, rendered);
      },
      () => {
        log(`image queue timed out after ${renderQueueTimeoutMs}ms`);
        return imageBusyResponse();
      },
    );
  }

  async function renderCacheableDocument(
    request: Request,
    active: WorkerContent,
    nextEnv: WorkerEnv,
    ctx: ExecutionContextLike,
    normalized: URL,
  ): Promise<Response> {
    const reused = await readHtmlCache(normalized);
    if (reused) return reused;
    const generation = active.contentGeneration();
    const rendered = await renderDocument(withNormalizedUrl(request, normalized), active, nextEnv, ctx);
    const restored = restoreLocaleHomeCache(normalized.pathname, rendered);
    const marked = copyResponse(restored, (headers) => headers.set("x-gaf-html-cache", "miss"));
    const cache = cacheFor();
    if (cache && generation && active.contentGeneration() === generation && isCacheableHtmlResponse(marked)) {
      await storePublicHtml(
        cache,
        publicHtmlCacheRequest(normalized, generation),
        marked.clone(),
        log,
        () => active.contentGeneration() === generation,
        (stored) => htmlCacheKeys.add(stored),
      );
    }
    return marked;
  }

  return {
    async fetch(request: Request, env: WorkerEnv, ctx: ExecutionContextLike): Promise<Response> {
      const redirect = sameHostHttpsRedirect(request);
      if (redirect) return withStagingRobots(redirect, env);
      const { storage, envForNext } = install(env);
      const url = new URL(request.url);

      if (isUploadPath(url.pathname)) return withStagingRobots(await serveUpload(request, env, ctx, url), env);
      if (isPrivateAssetPath(url.pathname)) {
        return withStagingRobots(
          new Response("Not Found", { status: 404, headers: { "cache-control": "no-store" } }),
          env,
        );
      }

      const bakedPath = bakedSitemapAssetPath(url.pathname);
      if (bakedPath) {
        const baked = await serveBakedSitemap(env.ASSETS, request, bakedPath);
        if (baked) return withStagingRobots(baked, env);
      }

      if (typeof env.GAF_RENDER_QUEUE_MS === "string") {
        renderQueueTimeoutMs = parseRenderQueueTimeout(env.GAF_RENDER_QUEUE_MS, renderQueueTimeoutMs);
      }
      if (isImageOptimizerPath(url.pathname)) {
        return withStagingRobots(await serveOptimizedImage(request, envForNext, ctx, url), env);
      }

      // Uploads, images, and the private asset 404 are answered above and do
      // not take a document slot. HEAD stays outside the gate; see
      // MAX_INFLIGHT_RENDERS. A Worker subrequest that continues a render
      // already holds a slot. Waiting for another slot deadlocks the parent.
      const cacheable = isCacheableDocumentRequest(request);
      const normalized = cacheable ? normalizedPublicUrl(url) : url;
      if (cacheable) {
        try {
          const hit = await readHtmlCache(normalized);
          if (hit) return withStagingRobots(hit, env);
        } catch (error) {
          if (error instanceof StorageHydrationError) return withStagingRobots(hydrationUnavailable(error, log), env);
          throw error;
        }
      }

      const subrequest = isRenderSubrequest(request);
      if (request.method === "HEAD" || subrequest) {
        const rendered = await renderDocument(
          cacheable ? withNormalizedUrl(request, normalized) : request,
          storage,
          envForNext,
          ctx,
        );
        return withStagingRobots(restoreLocaleHomeCache(url.pathname, rendered), env);
      }
      const rendered = await withRenderSlot(
        () =>
          cacheable
            ? renderCacheableDocument(request, storage, envForNext, ctx, normalized)
            : renderDocument(request, storage, envForNext, ctx).then((response) =>
                restoreLocaleHomeCache(url.pathname, response),
              ),
        () => {
          log(`render queue timed out after ${renderQueueTimeoutMs}ms`);
          return renderBusyResponse();
        },
      );
      return withStagingRobots(rendered, env);
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
      if (isUploadPath(url.pathname)) {
        if (!env.STATIC) return new Response("Not Found", { status: 404, headers: { "cache-control": "no-store" } });
        return uploadResponse(env.STATIC, url.pathname);
      }
      return env.ASSETS.fetch(input);
    },
  };
}

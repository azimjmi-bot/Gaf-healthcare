/**
 * Final security / equivalence coverage for the Next no-store 404 exception.
 */
import assert from "node:assert/strict";
import test from "node:test";
import { contentStorage, flushContentWrites, setContentStorage } from "@/lib/storage";
import { FakeR2Bucket } from "@/lib/storage/fake-r2-bucket";
import { MANIFEST_KEY, type ContentManifest } from "@/lib/storage/r2";
import { COST_ARTICLES_KEY } from "@/data/cost-articles/asset";
import { CATALOG_SEED_KEY } from "@/lib/catalog-seed";
import {
  DEFAULT_NEGATIVE_CACHE_TTL_SECONDS,
  MAX_NEGATIVE_CACHE_TTL_SECONDS,
  decideNegativeCache,
  isNegativeCacheEnabled,
  parseNegativeCacheTtlSeconds,
} from "@/worker/negative-cache";
import { createWorker, type CacheLike, type ExecutionContextLike, type WorkerEnv } from "@/worker/runtime";

const NEXT_404_CC = "private, no-cache, no-store, max-age=0, must-revalidate";

const CONTENT = {
  "content/cms.json": '{"articles":[]}',
  "content/catalog-cms.json": "{}",
  "content/curated-treatments.json": '{"treatments":[]}',
  "content/ar/cms.json": '{"articles":[]}',
  "content/ar/catalog-cms.json": "{}",
  "content/fr/cms.json": "{}",
  "content/fr/catalog-cms.json": "{}",
  "content/ru/cms.json": "{}",
  "content/ru/catalog-cms.json": "{}",
  "content/sw/cms.json": "{}",
  "content/sw/catalog-cms.json": "{}",
  "content/ai-generations.json": '{"generations":[]}',
};

function seededContent() {
  const bucket = new FakeR2Bucket(CONTENT);
  const manifest: ContentManifest = {
    version: 1,
    generatedAt: "2026-10-20T00:00:00.000Z",
    keys: Object.keys(CONTENT),
  };
  bucket.seed(MANIFEST_KEY, JSON.stringify(manifest));
  return bucket;
}

class FakeCache implements CacheLike {
  readonly store = new Map<string, Response>();
  async match(request: Request) {
    const hit = this.store.get(request.url);
    return hit ? hit.clone() : undefined;
  }
  async put(request: Request, response: Response) {
    this.store.set(request.url, response);
  }
  async delete(request: Request | string) {
    const url = typeof request === "string" ? request : request.url;
    return this.store.delete(url);
  }
}

function ctx() {
  const pending: Promise<unknown>[] = [];
  return {
    waitUntil: (p: Promise<unknown>) => void pending.push(p),
    settle: async () => void (await Promise.allSettled(pending)),
  } as ExecutionContextLike & { settle(): Promise<void> };
}

function assets() {
  return {
    async fetch(input: string | URL | Request) {
      const url = new URL(input instanceof Request ? input.url : String(input));
      if (url.pathname === `/_gaf/${CATALOG_SEED_KEY}`) return new Response("{}", { status: 200 });
      if (url.pathname === `/_gaf/${COST_ARTICLES_KEY}`) return new Response("{}", { status: 200 });
      if (url.pathname === "/ar-ro-directory.css") return new Response(".x{}", { status: 200 });
      return new Response("Not Found", { status: 404 });
    },
  };
}

function makeEnv(overrides: Partial<WorkerEnv> = {}): WorkerEnv {
  return {
    CONTENT: seededContent(),
    STATIC: new FakeR2Bucket(),
    ASSETS: assets(),
    GAF_NEGATIVE_CACHE: "1",
    GAF_NEGATIVE_CACHE_TTL: "120",
    ...overrides,
  } as WorkerEnv;
}

const html404 = (label: string, headers: Record<string, string> = {}) => {
  const body = `<!DOCTYPE html><html><head><link rel="canonical" href="https://gaf.healthcare/${label}"/><meta name="robots" content="noindex"/></head><body>${label}</body></html>`;
  return new Response(body, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": NEXT_404_CC,
      "cdn-cache-control": "public, s-maxage=300, stale-while-revalidate=86400",
      "x-robots-tag": "noindex",
      "x-gaf-locale": "en",
      ...headers,
    },
  });
};

test("no-store exception is status-404-only across Cache-Control combinations", () => {
  const combos = [
    NEXT_404_CC,
    "PRIVATE, NO-STORE",
    "no-store, private, max-age=0",
    "public, s-maxage=60",
    null,
    "max-age=0, must-revalidate, no-cache, no-store, private",
  ];
  for (const cacheControl of combos) {
    const ok = decideNegativeCache({
      enabled: true,
      status: 404,
      contentType: "TEXT/HTML; charset=UTF-8",
      cacheControl,
      hasSetCookie: false,
      authorization: false,
      cmsCookie: false,
      ttlSeconds: 120,
    });
    assert.equal(ok.cache, true, String(cacheControl));
  }
  for (const status of [200, 301, 302, 308, 401, 403, 410, 429, 500, 502, 503]) {
    assert.equal(
      decideNegativeCache({
        enabled: true,
        status,
        contentType: "text/html",
        cacheControl: NEXT_404_CC,
        hasSetCookie: false,
        authorization: false,
        cmsCookie: false,
      }).cache,
      false,
      `status ${status}`,
    );
  }
});

test("auth, Set-Cookie, and non-HTML still block the no-store exception", () => {
  const base = {
    enabled: true,
    status: 404,
    contentType: "text/html",
    cacheControl: NEXT_404_CC,
    hasSetCookie: false,
    authorization: false,
    cmsCookie: false,
  };
  assert.equal(decideNegativeCache({ ...base, authorization: true }).reason, "authenticated");
  assert.equal(decideNegativeCache({ ...base, cmsCookie: true }).reason, "authenticated");
  assert.equal(decideNegativeCache({ ...base, hasSetCookie: true }).reason, "set-cookie");
  assert.equal(decideNegativeCache({ ...base, contentType: "application/json" }).reason, "non-html");
  assert.equal(decideNegativeCache({ ...base, contentType: null }).reason, "non-html");
});

test("application TTL policy enforces default 120 and max 300 independent of Cache API", () => {
  assert.equal(parseNegativeCacheTtlSeconds(undefined), DEFAULT_NEGATIVE_CACHE_TTL_SECONDS);
  assert.equal(parseNegativeCacheTtlSeconds("120"), 120);
  assert.equal(parseNegativeCacheTtlSeconds("301"), MAX_NEGATIVE_CACHE_TTL_SECONDS);
  assert.equal(parseNegativeCacheTtlSeconds("99999"), MAX_NEGATIVE_CACHE_TTL_SECONDS);
  const decision = decideNegativeCache({
    enabled: true,
    status: 404,
    contentType: "text/html",
    cacheControl: NEXT_404_CC,
    hasSetCookie: false,
    authorization: false,
    cmsCookie: false,
    ttlSeconds: parseNegativeCacheTtlSeconds("999"),
  });
  assert.deepEqual(decision, { cache: true, ttlSeconds: 300 });
  assert.equal(isNegativeCacheEnabled("TRUE"), false);
  assert.equal(isNegativeCacheEnabled("1"), true);
});

test("cached 404 HIT is equivalent to original for status, SEO headers, and body", async () => {
  setContentStorage(undefined);
  const cache = new FakeCache();
  const bodyLabel = "equiv-missing";
  const worker = createWorker(async () => html404(bodyLabel), {
    log: () => {},
    versionCheckIntervalMs: 0,
    cache: () => cache,
  });
  const env = makeEnv();
  const missCtx = ctx();
  const miss = await worker.fetch(new Request("https://gaf.healthcare/treatments/equiv-missing"), env, missCtx);
  await missCtx.settle();
  assert.equal(miss.status, 404);
  assert.equal(miss.headers.get("x-gaf-html-cache"), "miss");

  const hit = await worker.fetch(new Request("https://gaf.healthcare/treatments/equiv-missing"), env, ctx());
  assert.equal(hit.status, 404);
  assert.equal(hit.headers.get("x-gaf-html-cache"), "hit");

  // Equivalence: client-visible SEO / cache semantics match the original miss.
  assert.equal(hit.headers.get("content-type"), miss.headers.get("content-type"));
  assert.equal(hit.headers.get("cache-control"), miss.headers.get("cache-control"));
  assert.equal(hit.headers.get("x-robots-tag"), miss.headers.get("x-robots-tag"));
  assert.equal(hit.headers.get("cdn-cache-control"), miss.headers.get("cdn-cache-control"));
  assert.equal(hit.headers.get("x-gaf-locale"), miss.headers.get("x-gaf-locale"));
  const missText = await miss.text();
  const hitText = await hit.text();
  assert.equal(hitText, missText);
  assert.equal(hitText.length, missText.length);
  assert.match(hitText, /rel="canonical"/);
  assert.match(hitText, /noindex/);
  assert.equal(hit.headers.get("set-cookie"), null);

  const stored = [...cache.store.values()][0];
  assert.equal(stored.status, 404);
  assert.equal(stored.headers.get("cache-control"), "public, max-age=120");
  assert.equal(stored.headers.get("x-gaf-stored-cache-control"), NEXT_404_CC);
});

test("Set-Cookie and Authorization responses are not stored even with Next no-store 404", async () => {
  setContentStorage(undefined);
  const cache = new FakeCache();
  const worker = createWorker(
    async (request) => {
      if (request.headers.has("authorization")) return html404("authed");
      return new Response(await html404("cookied").text(), {
        status: 404,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": NEXT_404_CC,
          "set-cookie": "session=1",
        },
      });
    },
    { log: () => {}, versionCheckIntervalMs: 0, cache: () => cache },
  );
  const env = makeEnv();
  const a = ctx();
  await worker.fetch(new Request("https://gaf.healthcare/blogs/sec-a", { headers: { authorization: "Bearer x" } }), env, a);
  await a.settle();
  const b = ctx();
  await worker.fetch(new Request("https://gaf.healthcare/blogs/sec-b"), env, b);
  await b.settle();
  assert.equal(cache.store.size, 0);
});

test("same-isolate unpublish and republish advance generation and never serve stale status", async () => {
  setContentStorage(undefined);
  const cache = new FakeCache();
  let state: "missing" | "live" = "missing";
  const worker = createWorker(
    async () => {
      if (state === "missing") return html404("gone");
      return new Response(
        `<!DOCTYPE html><html><head><link rel="canonical" href="https://gaf.healthcare/blogs/lifecycle"/><meta name="robots" content="index"/></head><body>live</body></html>`,
        {
          status: 200,
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "public, s-maxage=300, stale-while-revalidate=86400",
          },
        },
      );
    },
    { log: () => {}, versionCheckIntervalMs: 0, cache: () => cache },
  );
  const env = makeEnv();

  const miss404 = ctx();
  assert.equal((await worker.fetch(new Request("https://gaf.healthcare/blogs/lifecycle"), env, miss404)).status, 404);
  await miss404.settle();
  assert.equal((await worker.fetch(new Request("https://gaf.healthcare/blogs/lifecycle"), env, ctx())).headers.get("x-gaf-html-cache"), "hit");

  state = "live";
  contentStorage().write("content/cms.json", JSON.stringify({ articles: [{ slug: "lifecycle", title: "Live" }] }));
  await flushContentWrites();
  await new Promise((r) => setImmediate(r));
  const live = await worker.fetch(new Request("https://gaf.healthcare/blogs/lifecycle"), env, ctx());
  assert.equal(live.status, 200);
  assert.equal(live.headers.get("x-gaf-html-cache"), "miss");

  // Unpublish again.
  state = "missing";
  contentStorage().write("content/cms.json", JSON.stringify({ articles: [] }));
  await flushContentWrites();
  await new Promise((r) => setImmediate(r));
  const gone = ctx();
  const again404 = await worker.fetch(new Request("https://gaf.healthcare/blogs/lifecycle"), env, gone);
  assert.equal(again404.status, 404);
  assert.equal(again404.headers.get("x-gaf-html-cache"), "miss");
  await gone.settle();
  assert.equal((await worker.fetch(new Request("https://gaf.healthcare/blogs/lifecycle"), env, ctx())).headers.get("x-gaf-html-cache"), "hit");
});

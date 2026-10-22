import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { contentStorage, flushContentWrites, setContentStorage } from "@/lib/storage";
import { FakeR2Bucket } from "@/lib/storage/fake-r2-bucket";
import { GROUP_LAYOUT, MANIFEST_KEY, type ContentManifest } from "@/lib/storage/r2";
import { COST_ARTICLES_KEY } from "@/data/cost-articles/asset";
import { CATALOG_SEED_KEY } from "@/lib/catalog-seed";
import {
  ASSET_KEYS,
  assetsWithUploads,
  MAX_INFLIGHT_RENDERS,
  createWorker,
  groupsForRequest,
  isPrivateAssetPath,
  STAGING_ROBOTS_TAG,
  uploadKeyFor,
  type CacheLike,
  type ExecutionContextLike,
  type WorkerEnv,
} from "@/worker/runtime";

const CONTENT = {
  "content/cms.json": '{"articles":[]}',
  "content/catalog-cms.json": "{}",
  "content/curated-treatments.json": '{"treatments":[]}',
  "content/ar/cms.json": '{"articles":[]}',
  "content/ar/catalog-cms.json": "{}",
  "content/ar/articles/alpha.json": '{"slug":"alpha"}',
  "content/fr/cms.json": "{}",
  "content/fr/catalog-cms.json": "{}",
  "content/ru/cms.json": "{}",
  "content/ru/catalog-cms.json": "{}",
  "content/sw/cms.json": "{}",
  "content/sw/catalog-cms.json": "{}",
  "content/ai-generations.json": '{"generations":[]}',
};

function seededContent(objects: Record<string, string> = CONTENT) {
  const bucket = new FakeR2Bucket(objects);
  const manifest: ContentManifest = { version: 1, generatedAt: "2026-10-20T00:00:00.000Z", keys: Object.keys(objects) };
  bucket.seed(MANIFEST_KEY, JSON.stringify(manifest));
  return bucket;
}

const STYLESHEET = ".ar-ro{direction:rtl}";
const CATALOG = JSON.stringify({ doctors: [{ slug: "dr-a" }], hospitals: [{ slug: "h-a" }] });
const CATALOG_PATH = `/_gaf/${CATALOG_SEED_KEY}`;
const COST_ARTICLES_PATH = `/_gaf/${COST_ARTICLES_KEY}`;
const DEPLOY_ASSETS = {
  "/ar-ro-directory.css": STYLESHEET,
  [CATALOG_PATH]: CATALOG,
  [COST_ARTICLES_PATH]: "{}",
};
function fakeAssets(files: Record<string, string> = DEPLOY_ASSETS) {
  const calls: string[] = [];
  return {
    calls,
    async fetch(input: string | URL | Request) {
      const url = new URL(input instanceof Request ? input.url : String(input));
      calls.push(url.pathname);
      const body = files[url.pathname];
      if (body === undefined) return new Response("Not Found", { status: 404 });
      return new Response(body, { status: 200, headers: { etag: `"asset-${body.length}"` } });
    },
  };
}

class FakeCache implements CacheLike {
  readonly store = new Map<string, Response>();
  readonly deleted: string[] = [];
  async match(request: Request) {
    const hit = this.store.get(request.url);
    return hit ? hit.clone() : undefined;
  }
  async put(request: Request, response: Response) {
    this.store.set(request.url, response);
  }
  async delete(request: Request | string) {
    const url = typeof request === "string" ? request : request.url;
    this.deleted.push(url);
    return this.store.delete(url);
  }
}

function makeEnv(overrides: Partial<WorkerEnv> = {}): WorkerEnv & { STATIC: FakeR2Bucket; CONTENT: FakeR2Bucket } {
  return {
    CONTENT: seededContent(),
    STATIC: new FakeR2Bucket(),
    ASSETS: fakeAssets(),
    ...overrides,
  } as WorkerEnv & { STATIC: FakeR2Bucket; CONTENT: FakeR2Bucket };
}

function ctx() {
  const pending: Promise<unknown>[] = [];
  const context: ExecutionContextLike & { settle(): Promise<void> } = {
    waitUntil: (promise) => void pending.push(promise),
    settle: async () => void (await Promise.allSettled(pending)),
  };
  return context;
}

type Seen = { url: string; env: WorkerEnv };
function nextStub(status = 200) {
  const seen: Seen[] = [];
  const handler = async (request: Request, env: WorkerEnv) => {
    seen.push({ url: request.url, env });
    return new Response(`next:${new URL(request.url).pathname}`, { status });
  };
  return { seen, handler };
}

const quiet = { log: () => {}, versionCheckIntervalMs: 0 };

afterEach(() => setContentStorage(undefined));

// --------------------------------------------------------------- policy

test("public requests hydrate every edition but not the CMS-only group; CMS requests hydrate all", () => {
  assert.deepEqual([...groupsForRequest("/")], ["en", "ar", "fr", "ru", "sw"]);
  assert.deepEqual([...groupsForRequest("/ar/doctors/india")], ["en", "ar", "fr", "ru", "sw"]);
  assert.deepEqual([...groupsForRequest("/sitemap-en.xml")], ["en", "ar", "fr", "ru", "sw"]);
  assert.deepEqual([...groupsForRequest("/api/consult")], ["en", "ar", "fr", "ru", "sw"]);
  assert.deepEqual([...groupsForRequest("/cms")], ["en", "ar", "fr", "ru", "sw", "cms"]);
  assert.deepEqual([...groupsForRequest("/cms/articles/1")], ["en", "ar", "fr", "ru", "sw", "cms"]);
  assert.deepEqual([...groupsForRequest("/api/cms/ai/generate")], ["en", "ar", "fr", "ru", "sw", "cms"]);
  assert.deepEqual([...groupsForRequest("/cmsx")], ["en", "ar", "fr", "ru", "sw"], "prefix match is on path segments");
});

test("upload keys are the decoded path without the leading slash and never escape the prefix", () => {
  assert.equal(uploadKeyFor("/uploads/articles/1-a.webp"), "uploads/articles/1-a.webp");
  assert.equal(uploadKeyFor("/uploads/treatments/x%20y.png"), "uploads/treatments/x y.png");
  assert.equal(uploadKeyFor("/uploads/"), null);
  assert.equal(uploadKeyFor("/uploads/../content/cms.json"), null);
  assert.equal(uploadKeyFor("/uploads/articles//x.webp"), null);
  assert.equal(uploadKeyFor("/uploads/%zz"), null);
  assert.equal(uploadKeyFor("/images/x.webp"), null);
});

test("the seed script's edition layout matches the backend's", async () => {
  const seed = (await import("../../scripts/cloudflare/seed-r2.mjs")) as { GROUP_LAYOUT: typeof GROUP_LAYOUT };
  assert.deepEqual(seed.GROUP_LAYOUT, GROUP_LAYOUT);
});

// --------------------------------------------------------- initialisation

test("storage is installed before routing, is the storage the app sees, and loads the stylesheet asset", async () => {
  const env = makeEnv();
  const next = nextStub();
  const worker = createWorker(next.handler, quiet);
  const response = await worker.fetch(new Request("https://staging.example/blogs/x"), env, ctx());
  assert.equal(await response.text(), "next:/blogs/x");
  const storage = worker.storage();
  assert.ok(storage);
  assert.equal(contentStorage(), storage, "setContentStorage() ran before Next was called");
  for (const group of ["en", "ar", "fr", "ru", "sw"] as const) assert.ok(storage.isHydrated(group), group);
  assert.equal(storage.isHydrated("cms"), false, "the AI history is not loaded for public traffic");
  assert.equal(storage.read("public/ar-ro-directory.css"), STYLESHEET, "ar-ro-directory.css came from the ASSETS binding");
  assert.equal(storage.read(CATALOG_SEED_KEY), CATALOG, "the static catalog came from the ASSETS binding, not a bucket");
  assert.deepEqual(
    Object.keys(ASSET_KEYS).sort(),
    ["public/ar-ro-directory.css", CATALOG_SEED_KEY, COST_ARTICLES_KEY].sort(),
  );
  assert.deepEqual(
    (env.ASSETS as ReturnType<typeof fakeAssets>).calls.sort(),
    ["/ar-ro-directory.css", CATALOG_PATH, COST_ARTICLES_PATH].sort(),
  );
  assert.equal(env.CONTENT.calls.some((c) => c.key === CATALOG_SEED_KEY), false, "the catalog is never fetched from R2");
  assert.equal(env.CONTENT.calls.filter((c) => c.key === MANIFEST_KEY).length, 1, "one manifest read per isolate");

  const second = await worker.fetch(new Request("https://staging.example/api/cms/ai/history"), env, ctx());
  assert.equal(second.status, 200);
  assert.ok(storage.isHydrated("cms"), "a CMS request adds the CMS-only group");
  assert.equal(worker.storage(), storage, "one storage per isolate");
});

test("an unseeded or incomplete bucket is a 503 with Retry-After, and Next is never called", async () => {
  const logged: string[] = [];
  const next = nextStub();
  const empty = makeEnv({ CONTENT: new FakeR2Bucket() });
  const worker = createWorker(next.handler, { log: (m) => logged.push(m), versionCheckIntervalMs: 0 });
  const response = await worker.fetch(new Request("https://staging.example/"), empty, ctx());
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("retry-after"), "10");
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(next.seen.length, 0);
  assert.match(logged.join("\n"), /\.manifest\.json is missing; the bucket has not been seeded/);

  const partialObjects: Record<string, string> = { ...CONTENT };
  delete partialObjects["content/ar/articles/alpha.json"];
  const partialBucket = new FakeR2Bucket(partialObjects);
  partialBucket.seed(MANIFEST_KEY, JSON.stringify({ version: 1, generatedAt: "", keys: Object.keys(CONTENT) }));
  const partial = createWorker(next.handler, quiet);
  const partialResponse = await partial.fetch(new Request("https://staging.example/"), makeEnv({ CONTENT: partialBucket }), ctx());
  assert.equal(partialResponse.status, 503, "a manifest key missing from the bucket refuses the whole site");
  assert.equal(next.seen.length, 0);

  // Once the bucket is complete the same isolate recovers without a restart.
  partialBucket.seed("content/ar/articles/alpha.json", '{"slug":"alpha"}');
  const recovered = await partial.fetch(new Request("https://staging.example/"), makeEnv({ CONTENT: partialBucket }), ctx());
  assert.equal(recovered.status, 200);
});

test("a missing stylesheet or catalog asset or an unreachable bucket is also a 503, not an empty page", async () => {
  const next = nextStub();
  const noCss = createWorker(next.handler, quiet);
  const response = await noCss.fetch(new Request("https://staging.example/"), makeEnv({ ASSETS: fakeAssets({}) }), ctx());
  assert.equal(response.status, 503);

  const noCatalog = createWorker(next.handler, quiet);
  const onlyCss = fakeAssets({ "/ar-ro-directory.css": STYLESHEET });
  const missingCatalog = await noCatalog.fetch(new Request("https://staging.example/doctors"), makeEnv({ ASSETS: onlyCss }), ctx());
  assert.equal(missingCatalog.status, 503, "a deploy without the catalog asset never renders an empty directory");
  assert.equal(next.seen.length, 0);

  const flaky = seededContent();
  flaky.failNext("get", new Error("R2 timeout"));
  const down = createWorker(next.handler, quiet);
  assert.equal((await down.fetch(new Request("https://staging.example/"), makeEnv({ CONTENT: flaky }), ctx())).status, 503);
  assert.equal(next.seen.length, 0);
  assert.equal((await down.fetch(new Request("https://staging.example/"), makeEnv({ CONTENT: flaky }), ctx())).status, 200, "retries succeed");
});

test("a flush in one isolate is picked up by another on its next request", async () => {
  const content = seededContent();
  const envA = makeEnv({ CONTENT: content });
  const envB = makeEnv({ CONTENT: content });
  const a = createWorker(nextStub().handler, quiet);
  const b = createWorker(nextStub().handler, quiet);
  await a.fetch(new Request("https://staging.example/"), envA, ctx());
  await b.fetch(new Request("https://staging.example/"), envB, ctx());

  setContentStorage(a.storage());
  contentStorage().write("content/cms.json", '{"articles":[{"slug":"new"}]}');
  await flushContentWrites();

  assert.equal(b.storage()!.read("content/cms.json"), '{"articles":[]}', "B still holds its copy");
  await b.fetch(new Request("https://staging.example/blogs"), envB, ctx());
  assert.equal(b.storage()!.read("content/cms.json"), '{"articles":[{"slug":"new"}]}', "B re-hydrated English after the version check");
});

// ------------------------------------------------------------------ media

test("/_gaf/* (the Worker's own deploy-time files) is 404 from the web without touching Next or the buckets", async () => {
  const next = nextStub();
  const worker = createWorker(next.handler, quiet);
  const env = makeEnv();
  for (const path of [`/_gaf/${CATALOG_SEED_KEY}`, "/_gaf/", "/_gaf", "/_gaf/anything.json"]) {
    const response = await worker.fetch(new Request(`https://staging.example${path}`), env, ctx());
    assert.equal(response.status, 404, path);
    assert.equal(response.headers.get("cache-control"), "no-store");
  }
  assert.equal(next.seen.length, 0);
  assert.equal(env.CONTENT.calls.length, 0, "no hydration for a path that is never a page");
  assert.ok(isPrivateAssetPath("/_gaf/x") && !isPrivateAssetPath("/_gafx") && !isPrivateAssetPath("/doctors"));
});

test("/uploads/* is served from the static bucket with immutable caching, ETag, HEAD and 304", async () => {
  const env = makeEnv();
  const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47]);
  await env.STATIC.put("uploads/articles/1-cover.png", png, { httpMetadata: { contentType: "image/png" } });
  const cache = new FakeCache();
  const next = nextStub();
  const worker = createWorker(next.handler, { ...quiet, cache: () => cache });
  const context = ctx();

  const response = await worker.fetch(new Request("https://staging.example/uploads/articles/1-cover.png"), env, context);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "image/png");
  assert.equal(response.headers.get("cache-control"), "public, max-age=31536000, immutable");
  assert.equal(response.headers.get("content-length"), "4");
  const etag = response.headers.get("etag");
  assert.ok(etag && etag.startsWith('"') && etag.endsWith('"'));
  assert.deepEqual([...new Uint8Array(await response.arrayBuffer())], [...png]);
  assert.equal(next.seen.length, 0, "Next never sees media requests");
  assert.equal(worker.storage()!.isHydrated("en"), false, "serving media does not require content hydration");
  assert.equal(env.CONTENT.calls.length, 0, "the content bucket was not touched");
  await context.settle();
  assert.equal(cache.store.size, 1, "the response was stored in the edge cache");

  const head = await worker.fetch(new Request("https://staging.example/uploads/articles/1-cover.png", { method: "HEAD" }), env, ctx());
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");
  assert.equal(head.headers.get("etag"), etag);

  const conditional = await worker.fetch(
    new Request("https://staging.example/uploads/articles/1-cover.png", { headers: { "if-none-match": etag! } }),
    env,
    ctx(),
  );
  assert.equal(conditional.status, 304);

  const missing = await worker.fetch(new Request("https://staging.example/uploads/articles/nope.webp"), env, ctx());
  assert.equal(missing.status, 404);
  assert.equal(missing.headers.get("cache-control"), "no-store", "a 404 is never cached, so a fresh upload is visible at once");

  const post = await worker.fetch(new Request("https://staging.example/uploads/articles/1-cover.png", { method: "POST" }), env, ctx());
  assert.equal(post.status, 405);
});

test("an upload written through storage is served on the next request, and a deletion purges the cache", async () => {
  const env = makeEnv();
  const cache = new FakeCache();
  const worker = createWorker(nextStub().handler, { ...quiet, cache: () => cache });
  await worker.fetch(new Request("https://staging.example/cms/media"), env, ctx());

  setContentStorage(worker.storage());
  const bytes = new Uint8Array([1, 2, 3]);
  contentStorage().write("public/uploads/articles/1700000000-new.webp", bytes);
  await flushContentWrites();

  const context = ctx();
  const served = await worker.fetch(new Request("https://staging.example/uploads/articles/1700000000-new.webp"), env, context);
  assert.equal(served.status, 200);
  assert.equal(served.headers.get("content-type"), "image/webp");
  assert.deepEqual([...new Uint8Array(await served.arrayBuffer())], [1, 2, 3]);
  await context.settle();
  assert.equal(cache.store.size, 1);

  contentStorage().remove("public/uploads/articles/1700000000-new.webp");
  await flushContentWrites();
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(cache.deleted, ["https://staging.example/uploads/articles/1700000000-new.webp"]);
  assert.equal(cache.store.size, 0);
  const gone = await worker.fetch(new Request("https://staging.example/uploads/articles/1700000000-new.webp"), env, ctx());
  assert.equal(gone.status, 404);
});

test("Next's image optimizer sees uploads through the ASSETS fetcher it is given", async () => {
  const env = makeEnv();
  await env.STATIC.put("uploads/treatments/hero.webp", new Uint8Array([7]), { httpMetadata: { contentType: "image/webp" } });
  const next = nextStub();
  const worker = createWorker(next.handler, quiet);
  await worker.fetch(new Request("https://staging.example/"), env, ctx());
  const envForNext = next.seen[0].env;
  assert.notEqual(envForNext.ASSETS, env.ASSETS);
  assert.equal(envForNext.CONTENT, env.CONTENT, "other bindings pass through untouched");

  const upload = await envForNext.ASSETS.fetch("https://staging.example/uploads/treatments/hero.webp");
  assert.equal(upload.status, 200);
  assert.equal(upload.headers.get("content-type"), "image/webp");
  const asset = await envForNext.ASSETS.fetch(new URL("https://staging.example/ar-ro-directory.css"));
  assert.equal(await asset.text(), STYLESHEET, "everything else still comes from the real assets");

  const direct = assetsWithUploads(makeEnv());
  assert.equal((await direct.fetch("https://staging.example/uploads/none.webp")).status, 404);
});

test("a locale home drops the English homepage cache directive leaked by the rewrite fetch", async () => {
  const env = makeEnv();
  const publicCache = "public, s-maxage=300, stale-while-revalidate=86400";
  const englishHome = "public, max-age=0, s-maxage=120, stale-while-revalidate=600";
  const doubled = `${publicCache}, ${englishHome}`;
  const handler = async (request: Request) => {
    const path = new URL(request.url).pathname;
    const cache = path === "/" || path === "/ar" ? doubled : publicCache;
    return new Response("ok", {
      status: 200,
      headers: { "cache-control": cache, "cdn-cache-control": publicCache },
    });
  };
  const worker = createWorker(handler, quiet);
  const arabic = await worker.fetch(new Request("https://staging.example/ar"), env, ctx());
  assert.equal(arabic.headers.get("cache-control"), publicCache);
  assert.equal(arabic.headers.get("cdn-cache-control"), publicCache);
  assert.equal(await arabic.text(), "ok");
  const english = await worker.fetch(new Request("https://staging.example/"), env, ctx());
  assert.equal(english.headers.get("cache-control"), doubled);
  const cost = await worker.fetch(new Request("https://staging.example/ar/costs/india"), env, ctx());
  assert.equal(cost.headers.get("cache-control"), publicCache);
});

test("a document GET waits once eight renders are in flight, and HEAD does not take a slot", async () => {
  const env = makeEnv();
  let started = 0;
  let inflight = 0;
  let peak = 0;
  let release: () => void = () => {};
  const hold = new Promise<void>((resolve) => {
    release = resolve;
  });
  const handler = async (request: Request) => {
    started += 1;
    inflight += 1;
    peak = Math.max(peak, inflight);
    const rewrite = request.headers.has("x-gaf-path");
    if (request.method !== "HEAD" && !rewrite) await hold;
    inflight -= 1;
    return new Response(`body:${request.method}:${new URL(request.url).pathname}`, {
      status: 200,
      headers: { "x-rendered": request.method },
    });
  };
  const worker = createWorker(handler, quiet);
  const gets = Array.from({ length: MAX_INFLIGHT_RENDERS + 4 }, (_, index) =>
    worker.fetch(new Request(`https://staging.example/costs/page-${index}`), env, ctx()),
  );
  await new Promise<void>((resolve) => {
    const check = () => {
      if (started >= MAX_INFLIGHT_RENDERS) resolve();
      else setTimeout(check, 5);
    };
    check();
  });
  assert.equal(started, MAX_INFLIGHT_RENDERS, "queued GETs have not entered Next");
  assert.equal(peak, MAX_INFLIGHT_RENDERS);
  assert.equal(inflight, MAX_INFLIGHT_RENDERS);

  const head = await worker.fetch(
    new Request("https://staging.example/costs/revalidate", { method: "HEAD" }),
    env,
    ctx(),
  );
  assert.equal(head.status, 200);
  assert.equal(head.headers.get("x-rendered"), "HEAD");
  assert.equal(await head.text(), "body:HEAD:/costs/revalidate");
  assert.equal(started, MAX_INFLIGHT_RENDERS + 1, "HEAD ran while every GET slot was held");
  assert.equal(inflight, MAX_INFLIGHT_RENDERS, "HEAD did not keep a render slot");

  const spoofed = worker.fetch(
    new Request("https://staging.example/blogs/spoofed", {
      headers: { "x-gaf-path": "/ar/blogs/spoofed", "x-gaf-locale": "ar" },
    }),
    env,
    ctx(),
  );
  await new Promise((resolve) => setTimeout(resolve, 40));
  assert.equal(started, MAX_INFLIGHT_RENDERS + 1, "x-gaf-path alone does not enter Next while the gate is full");

  const rewrite = await worker.fetch(
    new Request("https://staging.example/blogs/rewritten", {
      headers: { "cf-worker": "gaf-healthcare-staging.example.com", "x-gaf-path": "/blogs/rewritten" },
    }),
    env,
    ctx(),
  );
  assert.equal(rewrite.status, 200);
  assert.equal(await rewrite.text(), "body:GET:/blogs/rewritten");
  assert.equal(started, MAX_INFLIGHT_RENDERS + 2, "a Worker rewrite subrequest ran while every slot was held");
  assert.equal(inflight, MAX_INFLIGHT_RENDERS, "a Worker rewrite subrequest did not keep a render slot");

  const workerOnly = worker.fetch(
    new Request("https://staging.example/blogs/from-worker", { headers: { "cf-worker": "example.com" } }),
    env,
    ctx(),
  );
  await new Promise((resolve) => setTimeout(resolve, 40));
  assert.equal(started, MAX_INFLIGHT_RENDERS + 2, "CF-Worker without a continuation header does not skip the gate");

  release();
  const spoofedResponse = await spoofed;
  assert.equal(await spoofedResponse.text(), "body:GET:/blogs/spoofed");
  await workerOnly;
  const responses = await Promise.all(gets);
  assert.equal(responses.length, MAX_INFLIGHT_RENDERS + 4);
  const bodies = await Promise.all(responses.map((response) => response.text()));
  assert.deepEqual(
    bodies,
    Array.from({ length: MAX_INFLIGHT_RENDERS + 4 }, (_, index) => `body:GET:/costs/page-${index}`),
  );
  assert.equal(inflight, 0);
});

// ------------------------------------------------ staging indexing header

const ROBOTS_TXT = [
  "User-Agent: *",
  "Allow: /",
  "",
  "Host: gaf.healthcare",
  "Sitemap: https://gaf.healthcare/sitemap.xml",
  "Sitemap: https://gaf.healthcare/sitemap-ar.xml",
  "",
].join("\n");

const SITEMAP_XML = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  "<url><loc>https://gaf.healthcare/costs/cabg</loc></url>",
  "<url><loc>https://gaf.healthcare/ar/costs/cabg</loc></url>",
  "</urlset>",
].join("");

const ENGLISH_HTML =
  '<html><head><link rel="canonical" href="https://gaf.healthcare/costs/cabg"/></head><body>English</body></html>';
const ARABIC_HTML =
  '<html><head><link rel="canonical" href="https://gaf.healthcare/ar/costs/cabg"/></head><body>Arabic</body></html>';

function stagingDocuments(request: Request) {
  const path = new URL(request.url).pathname;
  if (path === "/robots.txt") {
    return new Response(ROBOTS_TXT, {
      status: 200,
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
    });
  }
  if (path === "/sitemap.xml") {
    return new Response(SITEMAP_XML, {
      status: 200,
      headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, s-maxage=300" },
    });
  }
  if (path === "/ar/costs/cabg") {
    return new Response(ARABIC_HTML, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, s-maxage=300, stale-while-revalidate=86400",
        "x-gaf-locale": "ar",
      },
    });
  }
  if (path === "/costs/old") {
    return new Response(null, {
      status: 301,
      headers: { location: "https://gaf.healthcare/costs/cabg", "cache-control": "public, max-age=3600" },
    });
  }
  return new Response(ENGLISH_HTML, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, s-maxage=300, stale-while-revalidate=86400",
      "x-gaf-locale": "en",
    },
  });
}

test("GAF_INDEXING=off adds noindex at the response boundary and leaves bodies, canonicals, and stored objects unchanged", async () => {
  const env = makeEnv({ GAF_INDEXING: "off" });
  const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47]);
  await env.STATIC.put("uploads/articles/1-cover.png", png, { httpMetadata: { contentType: "image/png" } });
  const contentBefore = env.CONTENT.text("content/cms.json");
  const cache = new FakeCache();
  const held: Response[] = [];
  const worker = createWorker(
    async (request) => {
      const response = stagingDocuments(request);
      held.push(response);
      return response;
    },
    { ...quiet, cache: () => cache },
  );
  const context = ctx();

  const english = await worker.fetch(new Request("https://staging.example/costs/cabg"), env, ctx());
  assert.equal(english.status, 200);
  assert.equal(english.headers.get("x-robots-tag"), STAGING_ROBOTS_TAG);
  assert.equal(english.headers.get("content-type"), "text/html; charset=utf-8");
  assert.equal(english.headers.get("cache-control"), "public, s-maxage=300, stale-while-revalidate=86400");
  assert.equal(english.headers.get("x-gaf-locale"), "en");
  assert.equal(await english.text(), ENGLISH_HTML);
  assert.equal(held[0].headers.get("x-robots-tag"), null, "the response Next cached has no staging header");
  assert.equal(ENGLISH_HTML.includes("https://gaf.healthcare/costs/cabg"), true);

  const arabic = await worker.fetch(new Request("https://staging.example/ar/costs/cabg"), env, ctx());
  assert.equal(arabic.headers.get("x-robots-tag"), STAGING_ROBOTS_TAG);
  assert.equal(arabic.headers.get("x-gaf-locale"), "ar");
  const arabicBody = await arabic.text();
  assert.equal(arabicBody, ARABIC_HTML);
  assert.equal(arabicBody.includes("https://gaf.healthcare/ar/costs/cabg"), true);
  assert.equal(held[1].headers.get("x-robots-tag"), null);

  const robots = await worker.fetch(new Request("https://staging.example/robots.txt"), env, ctx());
  assert.equal(robots.status, 200);
  assert.equal(robots.headers.get("x-robots-tag"), STAGING_ROBOTS_TAG);
  assert.equal(robots.headers.get("content-type"), "text/plain; charset=utf-8");
  assert.equal(await robots.text(), ROBOTS_TXT);

  const sitemap = await worker.fetch(new Request("https://staging.example/sitemap.xml"), env, ctx());
  assert.equal(sitemap.status, 200);
  assert.equal(sitemap.headers.get("x-robots-tag"), STAGING_ROBOTS_TAG);
  assert.equal(sitemap.headers.get("content-type"), "application/xml; charset=utf-8");
  const sitemapBody = await sitemap.text();
  assert.equal(sitemapBody, SITEMAP_XML);
  assert.equal(sitemapBody.includes("https://gaf.healthcare/costs/cabg"), true);
  assert.equal(sitemapBody.includes("https://gaf.healthcare/ar/costs/cabg"), true);

  const redirect = await worker.fetch(new Request("https://staging.example/costs/old"), env, ctx());
  assert.equal(redirect.status, 301);
  assert.equal(redirect.headers.get("location"), "https://gaf.healthcare/costs/cabg");
  assert.equal(redirect.headers.get("cache-control"), "public, max-age=3600");
  assert.equal(redirect.headers.get("x-robots-tag"), STAGING_ROBOTS_TAG);
  assert.equal(await redirect.text(), "");

  const unavailable = await createWorker(async () => new Response("should not run"), quiet).fetch(
    new Request("https://staging.example/"),
    makeEnv({ GAF_INDEXING: "off", CONTENT: new FakeR2Bucket() }),
    ctx(),
  );
  assert.equal(unavailable.status, 503);
  assert.equal(unavailable.headers.get("x-robots-tag"), STAGING_ROBOTS_TAG);
  assert.equal(unavailable.headers.get("retry-after"), "10");
  assert.equal(unavailable.headers.get("cache-control"), "no-store");
  assert.equal(unavailable.headers.get("content-type"), "text/plain; charset=utf-8");
  assert.equal(await unavailable.text(), "Content storage is unavailable. Please retry shortly.");

  const hidden = await worker.fetch(new Request("https://staging.example/_gaf/secret.json"), env, ctx());
  assert.equal(hidden.status, 404);
  assert.equal(hidden.headers.get("x-robots-tag"), STAGING_ROBOTS_TAG);
  assert.equal(hidden.headers.get("cache-control"), "no-store");
  assert.equal(await hidden.text(), "Not Found");

  const upload = await worker.fetch(new Request("https://staging.example/uploads/articles/1-cover.png"), env, context);
  assert.equal(upload.status, 200);
  assert.equal(upload.headers.get("x-robots-tag"), STAGING_ROBOTS_TAG);
  assert.equal(upload.headers.get("content-type"), "image/png");
  assert.equal(upload.headers.get("cache-control"), "public, max-age=31536000, immutable");
  const etag = upload.headers.get("etag");
  assert.ok(etag);
  assert.deepEqual([...new Uint8Array(await upload.arrayBuffer())], [...png]);
  const notModified = await worker.fetch(
    new Request("https://staging.example/uploads/articles/1-cover.png", { headers: { "if-none-match": etag } }),
    env,
    ctx(),
  );
  assert.equal(notModified.status, 304);
  assert.equal(notModified.headers.get("x-robots-tag"), STAGING_ROBOTS_TAG);
  assert.equal(notModified.headers.get("etag"), etag);
  assert.equal(await notModified.text(), "");
  const rejected = await worker.fetch(
    new Request("https://staging.example/uploads/articles/1-cover.png", { method: "POST" }),
    env,
    ctx(),
  );
  assert.equal(rejected.status, 405);
  assert.equal(rejected.headers.get("x-robots-tag"), STAGING_ROBOTS_TAG);
  assert.equal(rejected.headers.get("allow"), "GET, HEAD");
  assert.equal(await rejected.text(), "Method Not Allowed");
  await context.settle();
  const cached = cache.store.get("https://staging.example/uploads/articles/1-cover.png");
  assert.ok(cached);
  assert.equal(cached.headers.get("x-robots-tag"), null, "the edge cache stores the upload without the staging header");
  assert.equal(cached.headers.get("content-type"), "image/png");
  assert.deepEqual([...new Uint8Array(await cached.arrayBuffer())], [...png]);
  const stored = await env.STATIC.get("uploads/articles/1-cover.png");
  assert.ok(stored && "arrayBuffer" in stored);
  assert.deepEqual([...new Uint8Array(await stored.arrayBuffer())], [...png]);
  assert.equal(env.CONTENT.text("content/cms.json"), contentBefore);
  assert.equal(contentBefore?.includes("X-Robots-Tag"), false);
});

test("without GAF_INDEXING=off the runtime leaves indexing headers, status, and bodies as Next returned them", async () => {
  for (const indexing of [undefined, "on"] as const) {
    const env = makeEnv(indexing === undefined ? {} : { GAF_INDEXING: indexing });
    const held: Response[] = [];
    const worker = createWorker(
      async (request) => {
        const response = stagingDocuments(request);
        held.push(response);
        return response;
      },
      quiet,
    );
    const english = await worker.fetch(new Request("https://staging.example/costs/cabg"), env, ctx());
    assert.equal(english.headers.get("x-robots-tag"), null, indexing ?? "absent");
    assert.equal(english.status, 200);
    assert.equal(english.headers.get("content-type"), "text/html; charset=utf-8");
    assert.equal(english.headers.get("x-gaf-locale"), "en");
    assert.equal(await english.text(), ENGLISH_HTML);
    assert.equal(held[0].headers.get("x-robots-tag"), null);

    const arabic = await worker.fetch(new Request("https://staging.example/ar/costs/cabg"), env, ctx());
    assert.equal(arabic.headers.get("x-robots-tag"), null);
    assert.equal(await arabic.text(), ARABIC_HTML);

    const robots = await worker.fetch(new Request("https://staging.example/robots.txt"), env, ctx());
    assert.equal(robots.headers.get("x-robots-tag"), null);
    assert.equal(await robots.text(), ROBOTS_TXT);

    const sitemap = await worker.fetch(new Request("https://staging.example/sitemap.xml"), env, ctx());
    assert.equal(sitemap.headers.get("x-robots-tag"), null);
    assert.equal(await sitemap.text(), SITEMAP_XML);

    const redirect = await worker.fetch(new Request("https://staging.example/costs/old"), env, ctx());
    assert.equal(redirect.status, 301);
    assert.equal(redirect.headers.get("location"), "https://gaf.healthcare/costs/cabg");
    assert.equal(redirect.headers.get("x-robots-tag"), null);

    const hidden = await worker.fetch(new Request("https://staging.example/_gaf/secret.json"), env, ctx());
    assert.equal(hidden.status, 404);
    assert.equal(hidden.headers.get("x-robots-tag"), null);
    assert.equal(hidden.headers.get("cache-control"), "no-store");
  }
});

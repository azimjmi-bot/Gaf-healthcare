/**
 * Cross-isolate publication safety for P1 negative cache.
 *
 * Two Worker instances share one Cache API while keeping separate storage
 * handles — the same shape as two Cloudflare isolates of one script.
 * Isolate B publishes (new generation); Isolate A must not serve the old
 * `.404` for that path after it observes the new generation.
 */
import assert from "node:assert/strict";
import test from "node:test";
import { contentStorage, flushContentWrites, setContentStorage } from "@/lib/storage";
import { FakeR2Bucket } from "@/lib/storage/fake-r2-bucket";
import { GROUP_LAYOUT, MANIFEST_KEY, type ContentManifest } from "@/lib/storage/r2";
import { COST_ARTICLES_KEY } from "@/data/cost-articles/asset";
import { CATALOG_SEED_KEY } from "@/lib/catalog-seed";
import { createWorker, type CacheLike, type ExecutionContextLike, type WorkerEnv } from "@/worker/runtime";

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

function seededContent(objects: Record<string, string> = CONTENT) {
  const bucket = new FakeR2Bucket(objects);
  const manifest: ContentManifest = {
    version: 1,
    generatedAt: "2026-10-20T00:00:00.000Z",
    keys: Object.keys(objects),
  };
  bucket.seed(MANIFEST_KEY, JSON.stringify(manifest));
  return bucket;
}

class SharedCache implements CacheLike {
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

function pageDocument(label: string) {
  return `<!DOCTYPE html><html><head><link rel="canonical" href="https://staging.example${label}"/><meta name="robots" content="noindex"/></head><body>${label}</body></html>`;
}

function ctx() {
  const pending: Promise<unknown>[] = [];
  const context: ExecutionContextLike & { settle(): Promise<void> } = {
    waitUntil: (promise) => void pending.push(promise),
    settle: async () => void (await Promise.allSettled(pending)),
  };
  return context;
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

function makeEnv(content: FakeR2Bucket): WorkerEnv {
  return {
    CONTENT: content,
    STATIC: new FakeR2Bucket(),
    ASSETS: assets(),
    GAF_NEGATIVE_CACHE: "1",
    GAF_NEGATIVE_CACHE_TTL: "120",
  } as WorkerEnv;
}

test("cross-isolate: Isolate B publish advances generation so Isolate A cannot HIT stale .404", async () => {
  const shared = new SharedCache();
  const content = seededContent();
  const published = new Set<string>();

  function handler(locale: "en" | "ar") {
    return async (request: Request) => {
      const path = new URL(request.url).pathname;
      const key = path;
      if (!published.has(key)) {
        return new Response(pageDocument(`${locale}-missing`), {
          status: 404,
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
            "x-robots-tag": "noindex",
          },
        });
      }
      return new Response(pageDocument(`${locale}-live`), {
        status: 200,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, s-maxage=300, stale-while-revalidate=86400",
        },
      });
    };
  }

  // Isolate A — caches the 404.
  const isolateA = createWorker(handler("en"), {
    log: () => {},
    versionCheckIntervalMs: 0,
    cache: () => shared,
  });
  const envA = makeEnv(content);
  const missCtx = ctx();
  const miss = await isolateA.fetch(new Request("https://staging.example/blogs/cross-iso-en"), envA, missCtx);
  assert.equal(miss.status, 404);
  await missCtx.settle();
  assert.equal([...shared.store.keys()].some((k) => k.includes(".404")), true);

  // Isolate B — same Cache + same R2, publishes content and bumps generation.
  setContentStorage(undefined);
  const isolateB = createWorker(handler("en"), {
    log: () => {},
    versionCheckIntervalMs: 0,
    cache: () => shared,
  });
  const envB = makeEnv(content);
  // Touch isolate B so its storage installs against the shared bucket.
  await isolateB.fetch(new Request("https://staging.example/"), envB, ctx());
  published.add("/blogs/cross-iso-en");
  contentStorage().write(
    "content/cms.json",
    JSON.stringify({ articles: [{ slug: "cross-iso-en", title: "Live", status: "published" }] }),
  );
  await flushContentWrites();
  await new Promise((r) => setImmediate(r));

  // Isolate A again — must observe new generation (interval 0) and miss the old .404.
  const afterCtx = ctx();
  const after = await isolateA.fetch(new Request("https://staging.example/blogs/cross-iso-en"), envA, afterCtx);
  assert.equal(after.status, 200, "newly published page must not stay hidden behind Isolate A's old 404");
  assert.equal(after.headers.get("x-gaf-html-cache"), "miss");
  assert.equal(await after.text(), pageDocument("en-live"));
  await afterCtx.settle();
});

test("cross-isolate: Arabic path is independent and also recovers after publish", async () => {
  const shared = new SharedCache();
  const content = seededContent();
  let live = false;
  const handler = async () => {
    if (!live) {
      return new Response(pageDocument("ar-missing"), {
        status: 404,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
        },
      });
    }
    return new Response(pageDocument("ar-live"), {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, s-maxage=300, stale-while-revalidate=86400",
      },
    });
  };

  const isolateA = createWorker(handler, { log: () => {}, versionCheckIntervalMs: 0, cache: () => shared });
  const env = makeEnv(content);
  const missCtx = ctx();
  assert.equal(
    (await isolateA.fetch(new Request("https://staging.example/ar/blogs/cross-iso-ar"), env, missCtx)).status,
    404,
  );
  await missCtx.settle();

  setContentStorage(undefined);
  const isolateB = createWorker(handler, { log: () => {}, versionCheckIntervalMs: 0, cache: () => shared });
  await isolateB.fetch(new Request("https://staging.example/ar"), makeEnv(content), ctx());
  live = true;
  contentStorage().write("content/ar/cms.json", JSON.stringify({ articles: [{ slug: "cross-iso-ar" }] }));
  await flushContentWrites();
  await new Promise((r) => setImmediate(r));

  const after = await isolateA.fetch(new Request("https://staging.example/ar/blogs/cross-iso-ar"), env, ctx());
  assert.equal(after.status, 200);
  assert.equal(after.headers.get("x-gaf-html-cache"), "miss");
});

// Silence unused import lint for GROUP_LAYOUT in some bundlers.
void GROUP_LAYOUT;

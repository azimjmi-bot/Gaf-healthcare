/**
 * Lab-only microbench for P1 negative cache (FakeCache + synthetic hydrate delay).
 * Not a production probe. Does not enable Cloudflare settings.
 */
import { performance } from "node:perf_hooks";
import { createWorker } from "../src/worker/runtime.ts";
import { FakeR2Bucket } from "../src/lib/storage/fake-r2-bucket.ts";
import { MANIFEST_KEY } from "../src/lib/storage/r2.ts";
import { setContentStorage } from "../src/lib/storage/index.ts";
import { CATALOG_SEED_KEY } from "../src/lib/catalog-seed.ts";
import { COST_ARTICLES_KEY } from "../src/data/cost-articles/asset.ts";

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

function seeded() {
  const bucket = new FakeR2Bucket(CONTENT);
  bucket.seed(
    MANIFEST_KEY,
    JSON.stringify({ version: 1, generatedAt: "2026-10-20T00:00:00.000Z", keys: Object.keys(CONTENT) }),
  );
  return bucket;
}

class FakeCache {
  store = new Map();
  async match(req) {
    const hit = this.store.get(req.url);
    return hit ? hit.clone() : undefined;
  }
  async put(req, res) {
    this.store.set(req.url, res);
  }
  async delete(req) {
    const url = typeof req === "string" ? req : req.url;
    return this.store.delete(url);
  }
}

function ctx() {
  const pending = [];
  return {
    waitUntil: (p) => pending.push(p),
    settle: async () => {
      await Promise.allSettled(pending);
    },
  };
}

function page(label) {
  return `<!DOCTYPE html><html><body>${label}</body></html>`;
}

async function run(enabled, cold) {
  setContentStorage(undefined);
  const cache = new FakeCache();
  let renders = 0;
  let hydrateMs = 0;
  const hydrateDelay = cold ? 40 : 8;
  const worker = createWorker(
    async () => {
      renders += 1;
      const t0 = performance.now();
      await new Promise((r) => setTimeout(r, hydrateDelay));
      hydrateMs += performance.now() - t0;
      return new Response(page("bench"), {
        status: 404,
        headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, s-maxage=60" },
      });
    },
    { log: () => {}, versionCheckIntervalMs: 0, cache: () => cache },
  );

  const env = {
    CONTENT: seeded(),
    STATIC: new FakeR2Bucket(),
    ASSETS: {
      async fetch(input) {
        const url = new URL(typeof input === "string" ? input : input.url);
        if (url.pathname === `/_gaf/${CATALOG_SEED_KEY}`) return new Response("{}", { status: 200 });
        if (url.pathname === `/_gaf/${COST_ARTICLES_KEY}`) return new Response("{}", { status: 200 });
        if (url.pathname === "/ar-ro-directory.css") return new Response(".x{}", { status: 200 });
        return new Response("Not Found", { status: 404 });
      },
    },
    ...(enabled ? { GAF_NEGATIVE_CACHE: "1" } : {}),
  };

  const r2Reads = () => env.CONTENT.calls.filter((c) => c.op === "get").length;
  const beforeR2 = r2Reads();
  const c0 = ctx();
  const tMiss0 = performance.now();
  await worker.fetch(new Request("https://gaf.healthcare/treatments/bench-404"), env, c0);
  await c0.settle();
  const firstMiss = performance.now() - tMiss0;
  const afterFirstR2 = r2Reads() - beforeR2;

  const times = [];
  for (let i = 0; i < 25; i++) {
    const t0 = performance.now();
    await worker.fetch(new Request("https://gaf.healthcare/treatments/bench-404"), env, ctx());
    times.push(performance.now() - t0);
  }
  times.sort((a, b) => a - b);
  const mem = process.memoryUsage();
  return {
    enabled,
    cold,
    firstMissMs: +firstMiss.toFixed(2),
    repeatP50Ms: +times[Math.floor(times.length * 0.5)].toFixed(2),
    repeatP95Ms: +times[Math.floor(times.length * 0.95)].toFixed(2),
    renders,
    hydrateMsTotal: +hydrateMs.toFixed(2),
    r2GetsFirstMiss: afterFirstR2,
    r2GetsAfterRepeats: r2Reads() - beforeR2,
    cacheEntries: cache.store.size,
    rssMB: +(mem.rss / 1024 / 1024).toFixed(1),
    heapUsedMB: +(mem.heapUsed / 1024 / 1024).toFixed(1),
  };
}

const rows = [];
for (const cold of [true, false]) {
  rows.push(await run(false, cold));
  rows.push(await run(true, cold));
}
console.log(JSON.stringify({ note: "lab FakeCache synthetic hydrate; not production TTFB", rows }, null, 2));

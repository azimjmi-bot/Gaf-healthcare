import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { test } from "node:test";
import { clearCachedJsonFiles } from "@/lib/cms/json-file-cache";
import { loadCms, saveCms } from "@/lib/cms/store";
import { setContentStorage } from "@/lib/storage";
import { FakeR2Bucket } from "@/lib/storage/fake-r2-bucket";
import { planPreviewPacks } from "@/lib/storage/pack-preview-cli";
import {
  openPreviewPackCache,
  previewPackCacheRequest,
  PREVIEW_PACK_CACHE_NAME,
  type PackCache,
} from "@/lib/storage/packed-preview-cache";
import {
  buildPreviewPacks,
  PREVIEW_MANIFEST_KEY,
  PREVIEW_VERSION_KEY,
  type EditionFile,
} from "@/lib/storage/packed-edition";
import { PackedPreviewStorage } from "@/lib/storage/packed-preview-storage";

const encoder = new TextEncoder();
const CMS = `${JSON.stringify({ settings: { blogTitle: "Original title" }, articles: [{ slug: "note" }] })}\n`;
const REPLACEMENT = `${JSON.stringify({ settings: { blogTitle: "Replacement title" }, articles: [{ slug: "note" }] })}\n`;

class MemoryPackCache implements PackCache {
  private readonly entries = new Map<string, { body: Uint8Array; headers: Headers }>();
  readonly lookups: string[] = [];

  async match(request: Request): Promise<Response | undefined> {
    this.lookups.push(request.url);
    const stored = this.entries.get(request.url);
    if (!stored) return undefined;
    return new Response(stored.body.slice(), { headers: new Headers(stored.headers) });
  }

  async put(request: Request, response: Response): Promise<void> {
    this.entries.set(request.url, {
      body: new Uint8Array(await response.arrayBuffer()),
      headers: new Headers(response.headers),
    });
  }

  async delete(request: Request): Promise<boolean> {
    return this.entries.delete(request.url);
  }

  clear() {
    this.entries.clear();
  }

  forget(url: string) {
    this.entries.delete(url);
  }

  size() {
    return this.entries.size;
  }

  urls() {
    return [...this.entries.keys()];
  }

  bytes() {
    let total = 0;
    for (const entry of this.entries.values()) total += entry.body.byteLength;
    return total;
  }
}

class BrokenPackCache implements PackCache {
  async match(): Promise<Response | undefined> {
    throw new Error("cache match down");
  }

  async put(): Promise<void> {
    throw new Error("cache put down");
  }

  async delete(): Promise<boolean> {
    throw new Error("cache delete down");
  }
}

function edition(stamp: string, cms: string, arabic: string) {
  const groups = new Map<string, EditionFile[]>([
    ["en", [{ key: "content/cms.json", bytes: encoder.encode(cms) }]],
    ["ar", [{ key: "content/ar/articles/one.json", bytes: encoder.encode(arabic) }]],
  ]);
  const built = buildPreviewPacks({ groups, stamp, generatedAt: "2026-11-05T00:00:00.000Z" });
  return built;
}

function seed(bucket: FakeR2Bucket, objects: Map<string, Uint8Array>) {
  for (const key of bucket.keys()) bucket.unseed(key);
  for (const [key, bytes] of objects) bucket.seed(key, bytes);
}

function storage(bucket: FakeR2Bucket, packCache: PackCache | null, sharedPackCache = false) {
  return new PackedPreviewStorage({
    bucket,
    packCache,
    sharedPackCache,
    versionCheckIntervalMs: 0,
    log() {},
  });
}

test("pack cache keys are content-addressed and are not public Worker URLs", () => {
  const sha = "ab".repeat(32);
  const request = previewPackCacheRequest(sha, "content/.packs/en.pack");
  const url = new URL(request.url);
  assert.equal(url.host, "pack-cache.gaf-healthcare-preview.internal");
  assert.equal(url.pathname, `/v1/${sha}/content/.packs/en.pack`);
  assert.equal(request.method, "GET");
  assert.doesNotMatch(request.url, /workers\.dev|gaf\.healthcare/);
  assert.equal(PREVIEW_PACK_CACHE_NAME, "gaf-preview-packs");
  assert.throws(() => previewPackCacheRequest(sha, PREVIEW_VERSION_KEY), /refused/);
  assert.throws(() => previewPackCacheRequest(sha, PREVIEW_MANIFEST_KEY), /refused/);
  assert.throws(() => previewPackCacheRequest("short", "content/.packs/en.pack"), /sha256/);
});

test("two isolates in one location share packed bytes and the second skips pack downloads", async () => {
  const cache = new MemoryPackCache();
  const built = edition("stamp-1", CMS, '{"slug":"one"}\n');
  const bucket = new FakeR2Bucket();
  seed(bucket, built.objects);
  const first = storage(bucket, cache);
  const firstStarted = performance.now();
  await first.ensureHydrated("en");
  const firstHydrateMs = performance.now() - firstStarted;
  await first.refreshIfStale();
  const versionBytes = built.objects.get(PREVIEW_VERSION_KEY)!.byteLength;
  const manifestBytes = built.objects.get(PREVIEW_MANIFEST_KEY)!.byteLength;
  let stored = 0;
  for (const bytes of built.objects.values()) stored += bytes.byteLength;

  assert.equal(first.stats.r2Gets, built.manifest.packs.length + 3);
  assert.equal(first.stats.r2Bytes, stored);
  assert.equal(first.stats.cacheMisses, built.manifest.packs.length);
  assert.equal(first.stats.cachePuts, built.manifest.packs.length);
  assert.equal(first.stats.cacheHits, 0);
  assert.equal(cache.bytes(), built.packBytes);
  assert.ok(cache.urls().every((url) => url.includes("/content/.packs/") && !url.includes(".version.json") && !url.includes(".manifest.json")));

  const getsBeforeSecond = bucket.calls.filter((call) => call.op === "get").length;
  const second = storage(bucket, cache);
  const secondStarted = performance.now();
  await second.ensureHydrated("en");
  const secondHydrateMs = performance.now() - secondStarted;
  const layoutGets = second.stats.r2Gets;
  const layoutBytes = second.stats.r2Bytes;
  await second.refreshIfStale();

  assert.equal(layoutGets, 2);
  assert.equal(layoutBytes, versionBytes + manifestBytes);
  assert.equal(second.stats.r2Gets, 3);
  assert.equal(second.stats.r2Bytes, versionBytes + manifestBytes);
  assert.equal(second.stats.cacheHits, built.manifest.packs.length);
  assert.equal(second.stats.cacheMisses, 0);
  assert.equal(second.read("content/cms.json"), first.read("content/cms.json"));
  assert.match(second.read("content/ar/articles/one.json") ?? "", /"one"/);
  assert.equal(second.heldBytes(), first.heldBytes());
  assert.equal(second.logicalBytes(), first.logicalBytes());
  const secondGets = bucket.calls.filter((call) => call.op === "get").slice(getsBeforeSecond);
  assert.deepEqual(secondGets.map((call) => call.key), [PREVIEW_VERSION_KEY, PREVIEW_MANIFEST_KEY, PREVIEW_VERSION_KEY]);
  assert.equal(bucket.calls.some((call) => call.key === "content/cms.json" || call.op === "list"), false);
  assert.ok(secondHydrateMs >= 0 && firstHydrateMs >= 0);
});

test("a version change loads the new packs and does not reuse the previous hashes", async () => {
  const cache = new MemoryPackCache();
  const bucket = new FakeR2Bucket();
  seed(bucket, edition("stamp-1", CMS, '{"slug":"one"}\n').objects);
  const current = storage(bucket, cache);
  await current.ensureHydrated("en");
  const previousLookups = cache.lookups.length;
  seed(bucket, edition("stamp-2", REPLACEMENT, '{"slug":"two"}\n').objects);
  await current.refreshIfStale();
  assert.match(current.read("content/cms.json") ?? "", /Replacement title/);
  assert.match(current.read("content/ar/articles/one.json") ?? "", /"two"/);
  const fresh = storage(bucket, cache);
  await fresh.ensureHydrated("en");
  assert.equal(fresh.stats.cacheHits, 2);
  assert.match(fresh.read("content/cms.json") ?? "", /Replacement title/);
  const lookedUp = cache.lookups.slice(previousLookups).join("\n");
  const previous = edition("stamp-1", CMS, '{"slug":"one"}\n');
  for (const pack of previous.manifest.packs) {
    assert.equal(lookedUp.includes(pack.sha256), false);
  }
});

test("a missing cache entry falls back to that R2 object only", async () => {
  const cache = new MemoryPackCache();
  const built = edition("stamp-1", CMS, '{"slug":"one"}\n');
  const bucket = new FakeR2Bucket();
  seed(bucket, built.objects);
  await storage(bucket, cache).ensureHydrated("en");
  const en = built.manifest.packs.find((pack) => pack.id === "en")!;
  cache.forget(previewPackCacheRequest(en.sha256, en.objectKey).url);
  const getsBefore = bucket.calls.filter((call) => call.op === "get").length;
  const next = storage(bucket, cache);
  await next.ensureHydrated("en");
  assert.equal(next.stats.cacheHits, built.manifest.packs.length - 1);
  assert.equal(next.stats.cacheMisses, 1);
  assert.match(next.read("content/cms.json") ?? "", /Original title/);
  const keys = bucket.calls.filter((call) => call.op === "get").slice(getsBefore).map((call) => call.key);
  assert.deepEqual(keys, [PREVIEW_VERSION_KEY, PREVIEW_MANIFEST_KEY, en.objectKey]);
});

test("corrupt cached bytes are rejected and the pack is fetched from R2", async () => {
  const cache = new MemoryPackCache();
  const built = edition("stamp-1", CMS, '{"slug":"one"}\n');
  const bucket = new FakeR2Bucket();
  seed(bucket, built.objects);
  const first = storage(bucket, cache);
  await first.ensureHydrated("en");
  const en = built.manifest.packs.find((pack) => pack.id === "en")!;
  const request = previewPackCacheRequest(en.sha256, en.objectKey);
  await cache.put(request, new Response(new Uint8Array([1, 2, 3, 4]), { headers: { "x-gaf-r2-etag": '"stale"' } }));
  const next = storage(bucket, cache);
  await next.ensureHydrated("en");
  assert.equal(next.stats.cacheRejected, 1);
  assert.equal(next.stats.cacheHits, built.manifest.packs.length - 1);
  assert.equal(next.read("content/cms.json"), first.read("content/cms.json"));
  const repaired = await cache.match(request);
  assert.ok(repaired);
  assert.equal(repaired.headers.get("x-gaf-r2-etag"), bucket.etag(en.objectKey));
  const repairedBytes = new Uint8Array(await repaired.arrayBuffer());
  assert.equal(repairedBytes.byteLength, built.objects.get(en.objectKey)!.byteLength);
});

test("a failed R2 fetch after a version change does not keep the previous snapshot", async () => {
  const cache = new MemoryPackCache();
  const bucket = new FakeR2Bucket();
  const previous = edition("stamp-1", CMS, '{"slug":"one"}\n');
  seed(bucket, previous.objects);
  const current = storage(bucket, cache);
  await current.ensureHydrated("en");
  assert.match(current.read("content/cms.json") ?? "", /Original title/);
  const next = edition("stamp-2", REPLACEMENT, '{"slug":"two"}\n');
  seed(bucket, next.objects);
  bucket.unseed("content/.packs/en.pack");
  await assert.rejects(current.refreshIfStale(), /content\/\.packs\/en\.pack is missing/);
  assert.equal(current.isHydrated("en"), false);
  assert.throws(() => current.read("content/cms.json"), /will not fall back/);
  const fresh = storage(bucket, cache);
  await assert.rejects(fresh.ensureHydrated("en"), /content\/\.packs\/en\.pack is missing/);
  assert.equal(fresh.isHydrated("en"), false);
  assert.equal(fresh.stats.cacheHits, 0);
  const lookedUp = cache.lookups.join("\n");
  for (const pack of previous.manifest.packs) assert.equal(lookedUp.includes(`/v1/${pack.sha256}/`), true);
  const afterFailure = cache.lookups.slice(cache.lookups.length - next.manifest.packs.length).join("\n");
  for (const pack of previous.manifest.packs) assert.equal(afterFailure.includes(pack.sha256), false);
});

test("cache eviction falls back to R2 and still hydrates", async () => {
  const cache = new MemoryPackCache();
  const built = edition("stamp-1", CMS, '{"slug":"one"}\n');
  const bucket = new FakeR2Bucket();
  seed(bucket, built.objects);
  await storage(bucket, cache).ensureHydrated("en");
  cache.clear();
  assert.equal(cache.size(), 0);
  const next = storage(bucket, cache);
  await next.ensureHydrated("en");
  assert.equal(next.stats.cacheHits, 0);
  assert.equal(next.stats.cacheMisses, built.manifest.packs.length);
  assert.equal(next.stats.r2Gets, 2 + built.manifest.packs.length);
  assert.match(next.read("content/cms.json") ?? "", /Original title/);
  assert.equal(next.stats.r2Lists, 0);
  assert.equal(cache.size(), built.manifest.packs.length);
});

test("cache read and write failures fall back to R2 without failing hydration", async () => {
  const built = edition("stamp-1", CMS, '{"slug":"one"}\n');
  const bucket = new FakeR2Bucket();
  seed(bucket, built.objects);
  const broken = storage(bucket, new BrokenPackCache());
  await broken.ensureHydrated("en");
  assert.match(broken.read("content/cms.json") ?? "", /Original title/);
  assert.equal(broken.stats.cacheHits, 0);
  assert.equal(broken.stats.cacheErrors, built.manifest.packs.length * 2);
  assert.equal(broken.stats.r2Gets, 2 + built.manifest.packs.length);
  assert.equal(await openPreviewPackCache(), null);
  const unavailable = storage(bucket, null, true);
  await unavailable.ensureHydrated("en");
  assert.equal(unavailable.stats.cacheErrors, 0);
  assert.equal(unavailable.stats.cacheHits, 0);
  assert.match(unavailable.read("content/cms.json") ?? "", /Original title/);
});

test("a cached pack etag lets the next isolate save without a pack download", async () => {
  const cache = new MemoryPackCache();
  const bucket = new FakeR2Bucket();
  seed(bucket, edition("stamp-1", CMS, '{"slug":"one"}\n').objects);
  const first = storage(bucket, cache);
  await first.ensureHydrated("en");
  const second = storage(bucket, cache);
  await second.ensureHydrated("en");
  assert.equal(second.stats.cacheHits, 2);
  assert.equal(second.stats.r2Gets, 2);
  setContentStorage(second);
  clearCachedJsonFiles();
  const loaded = loadCms("en");
  saveCms({ ...loaded, settings: { ...loaded.settings, blogTitle: "Packed title" } });
  await second.flush();
  const third = storage(bucket, cache);
  await third.ensureHydrated("en");
  assert.equal(third.stats.r2Gets, 2);
  assert.equal(third.stats.cacheHits, 2);
  assert.match(third.read("content/cms.json") ?? "", /Packed title/);
  assert.equal(loadCms.length, 0);
  assert.equal(saveCms.length, 1);
});

test("real packed editions: a second isolate reads version and manifest only", async () => {
  const planned = planPreviewPacks(path.join(process.cwd(), "content"), "stage-4-1", "2026-11-05T07:00:00.000Z");
  const bucket = new FakeR2Bucket();
  seed(bucket, planned.objects);
  const versionBytes = planned.objects.get(PREVIEW_VERSION_KEY)!.byteLength;
  const manifestBytes = planned.objects.get(PREVIEW_MANIFEST_KEY)!.byteLength;
  let storedBytes = 0;
  for (const bytes of planned.objects.values()) storedBytes += bytes.byteLength;

  const uncached = new PackedPreviewStorage({ bucket, versionCheckIntervalMs: 0, log() {} });
  const uncachedStarted = performance.now();
  await uncached.ensureHydrated("en");
  const uncachedHydrateMs = performance.now() - uncachedStarted;
  await uncached.refreshIfStale();

  const cache = new MemoryPackCache();
  const first = storage(bucket, cache);
  const heapBefore = process.memoryUsage().heapUsed;
  const firstStarted = performance.now();
  await first.ensureHydrated("en");
  const firstHydrateMs = performance.now() - firstStarted;
  await first.refreshIfStale();

  const second = storage(bucket, cache);
  const secondStarted = performance.now();
  await second.ensureHydrated("en");
  const secondHydrateMs = performance.now() - secondStarted;
  const layoutGets = second.stats.r2Gets;
  const layoutBytes = second.stats.r2Bytes;
  await second.refreshIfStale();
  const heapAfter = process.memoryUsage().heapUsed;

  assert.equal(uncached.stats.r2Gets, planned.manifest.packs.length + 3);
  assert.equal(uncached.stats.r2Bytes, storedBytes);
  assert.equal(first.stats.r2Gets, planned.manifest.packs.length + 3);
  assert.equal(first.stats.r2Bytes, storedBytes);
  assert.equal(first.stats.cachePuts, planned.manifest.packs.length);
  assert.equal(layoutGets, 2);
  assert.equal(layoutBytes, versionBytes + manifestBytes);
  assert.equal(second.stats.r2Gets, 3);
  assert.equal(second.stats.r2Bytes, versionBytes + manifestBytes);
  assert.equal(second.stats.cacheHits, planned.manifest.packs.length);
  assert.equal(second.heldBytes(), uncached.heldBytes());
  assert.equal(second.logicalBytes(), uncached.logicalBytes());
  assert.equal(cache.bytes(), planned.packBytes);
  assert.equal(bucket.calls.filter((call) => call.op === "list").length, 0);

  const measurement = {
    generatedAt: "2026-11-05T07:00:00.000Z",
    livePreviewBefore: {
      note: "Measured on gaf-healthcare-preview version 22aca032-b6e4-4d98-9a97-c9f90578c879 before this experiment. One cold homepage hydration is 8 pack/manifest/version bodies plus one conditional version recheck.",
      r2GetsPerHydration: 9,
      r2BytesPerHydration: 4654772,
      smokeGetObjectRequests: 74,
      smokeBytesTransferred: 35156441,
      coldHomepageWallMs: 8081,
    },
    localSimulation: {
      packCount: planned.manifest.packs.length,
      fileCount: planned.fileCount,
      rawBytes: planned.rawBytes,
      withoutCache: {
        r2Gets: uncached.stats.r2Gets,
        r2Bytes: uncached.stats.r2Bytes,
        hydrateMs: Math.round(uncachedHydrateMs),
        heldBytes: uncached.heldBytes(),
        logicalBytes: uncached.logicalBytes(),
      },
      firstIsolateFillsCache: {
        r2Gets: first.stats.r2Gets,
        r2Bytes: first.stats.r2Bytes,
        cacheMisses: first.stats.cacheMisses,
        cachePuts: first.stats.cachePuts,
        hydrateMs: Math.round(firstHydrateMs),
      },
      secondIsolateReusesCache: {
        r2Gets: second.stats.r2Gets,
        r2Bytes: second.stats.r2Bytes,
        cacheHits: second.stats.cacheHits,
        hydrateMs: Math.round(secondHydrateMs),
        heldBytes: second.heldBytes(),
        cacheBytes: cache.bytes(),
      },
      heapUsedDeltaBytes: heapAfter - heapBefore,
    },
  };
  const artifactDir = "/opt/cursor/artifacts";
  mkdirSync(artifactDir, { recursive: true });
  writeFileSync(path.join(artifactDir, "packed-cache-measurement.json"), `${JSON.stringify(measurement, null, 2)}\n`);
  console.log(`packed-cache measurement ${JSON.stringify(measurement.localSimulation)}`);
});

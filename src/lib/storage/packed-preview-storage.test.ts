import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { test } from "node:test";
import { clearCachedJsonFiles } from "@/lib/cms/json-file-cache";
import { loadCms, saveCms } from "@/lib/cms/store";
import { contentStorage, setContentStorage } from "@/lib/storage";
import { FakeR2Bucket } from "@/lib/storage/fake-r2-bucket";
import { planPreviewPacks, runPackPreview } from "@/lib/storage/pack-preview-cli";
import { planPreviewStatic, runPreviewStaticSeed } from "@/lib/storage/preview-static-cli";
import {
  assertPreviewRuntime,
  assertPreviewTarget,
  buildPreviewPacks,
  PREVIEW_BUCKET_NAME,
  PREVIEW_MANIFEST_KEY,
  PREVIEW_STATIC_BUCKET_NAME,
  PREVIEW_VERSION_KEY,
  PreviewPackError,
  sha256Hex,
  unpackEdition,
  validatePreviewPack,
  type EditionFile,
} from "@/lib/storage/packed-edition";
import { PackedPreviewStorage } from "@/lib/storage/packed-preview-storage";
import { GROUP_LAYOUT, R2ContentStorage, type EditionGroup } from "@/lib/storage/r2";
import { DEFAULT_RENDER_QUEUE_TIMEOUT_MS, MAX_INFLIGHT_RENDERS, PUBLIC_HTML_SHARED_TTL_SECONDS, createWorker } from "@/worker/runtime";

const CMS = `${JSON.stringify({
  settings: { blogTitle: "Original title" },
  articles: [{ slug: "note" }],
})}\n`;

function fixturePacks() {
  const groups = new Map<string, EditionFile[]>([
    ["en", [{ key: "content/cms.json", bytes: new TextEncoder().encode(CMS) }]],
    ["ar", [{ key: "content/ar/articles/one.json", bytes: new TextEncoder().encode('{"slug":"one"}\n') }]],
  ]);
  const built = buildPreviewPacks({ groups, stamp: "stamp-1", generatedAt: "2026-11-05T00:00:00.000Z" });
  const bucket = new FakeR2Bucket();
  for (const [key, bytes] of built.objects) bucket.seed(key, bytes);
  return { built, bucket };
}

function storageFor(bucket: FakeR2Bucket) {
  return new PackedPreviewStorage({ bucket, log() {} });
}

test("render limits and production hydration source stay unchanged", () => {
  assert.equal(MAX_INFLIGHT_RENDERS, 8);
  assert.equal(DEFAULT_RENDER_QUEUE_TIMEOUT_MS, 2000);
  assert.equal(PUBLIC_HTML_SHARED_TTL_SECONDS, 300);
  const r2 = readFileSync(path.join(process.cwd(), "src/lib/storage/r2.ts"), "utf8");
  const worker = readFileSync(path.join(process.cwd(), "src/worker.ts"), "utf8");
  const runtime = readFileSync(path.join(process.cwd(), "src/worker/runtime.ts"), "utf8");
  const production = readFileSync(path.join(process.cwd(), "wrangler.production.jsonc"), "utf8");
  const staging = readFileSync(path.join(process.cwd(), "wrangler.jsonc"), "utf8");
  assert.match(r2, /private async hydrate\(group: EditionGroup\)/);
  assert.doesNotMatch(r2, /packed-preview|gaf-content-preview|gaf-content-packs-v1/);
  assert.doesNotMatch(worker, /worker-preview|packed-edition|createContent|gaf-content-preview/);
  assert.match(runtime, /new R2ContentStorage\(/);
  assert.doesNotMatch(runtime, /packed-preview|gaf-content-preview|gaf-content-packs-v1/);
  assert.match(production, /"bucket_name": "gaf-content-production"/);
  assert.match(production, /"bucket_name": "gaf-static-production"/);
  assert.doesNotMatch(production, /gaf-content-preview|gaf-healthcare-preview/);
  assert.match(staging, /"bucket_name": "gaf-content-staging"/);
  assert.match(staging, /"bucket_name": "gaf-static-staging"/);
  assert.doesNotMatch(staging, /gaf-content-preview|gaf-healthcare-preview/);
  assert.equal(loadCms.length, 0);
  assert.equal(saveCms.length, 1);
});

function previewRuntimeEnv(content: FakeR2Bucket, staticBucket: FakeR2Bucket) {
  return {
    CONTENT: content,
    STATIC: staticBucket,
    GAF_STORAGE: "r2",
    GAF_CONTENT_PACK: "preview",
    GAF_PREVIEW_BUCKET: PREVIEW_BUCKET_NAME,
    GAF_PREVIEW_STATIC_BUCKET: PREVIEW_STATIC_BUCKET_NAME,
  };
}

test("preview config binds CONTENT and STATIC only to the preview buckets", () => {
  const preview = JSON.parse(
    readFileSync(path.join(process.cwd(), "wrangler.preview.jsonc"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'])\/\/.*$/gm, "$1"),
  );
  assertPreviewTarget(preview);
  assert.deepEqual(
    preview.r2_buckets.map((bucket: { binding: string; bucket_name: string }) => [bucket.binding, bucket.bucket_name]),
    [
      ["CONTENT", PREVIEW_BUCKET_NAME],
      ["STATIC", PREVIEW_STATIC_BUCKET_NAME],
    ],
  );
  assert.equal(preview.routes, undefined);
  assert.equal(preview.custom_domain, undefined);
  assert.throws(
    () => assertPreviewTarget({ ...preview, name: "gaf-healthcare-production" }),
    /gaf-healthcare-preview/,
  );
  assert.throws(
    () =>
      assertPreviewTarget({
        ...preview,
        r2_buckets: [{ binding: "CONTENT", bucket_name: "gaf-content-production" }],
      }),
    /gaf-content-production|exactly CONTENT and STATIC/,
  );
  assert.throws(
    () =>
      assertPreviewTarget({
        ...preview,
        r2_buckets: [
          { binding: "CONTENT", bucket_name: "gaf-content-preview" },
          { binding: "STATIC", bucket_name: "gaf-static-staging" },
        ],
      }),
    /gaf-static-staging|gaf-static-preview/,
  );
  assert.throws(
    () =>
      assertPreviewTarget({
        ...preview,
        r2_buckets: [
          ...preview.r2_buckets,
          { binding: "NEXT_INC_CACHE_R2_BUCKET", bucket_name: "gaf-static-preview" },
        ],
      }),
    /exactly CONTENT and STATIC/,
  );
  const bucket = { get() {} };
  assert.throws(
    () =>
      assertPreviewRuntime({
        ...previewRuntimeEnv(bucket as FakeR2Bucket, bucket as FakeR2Bucket),
        NEXT_INC_CACHE_R2_BUCKET: bucket,
      }),
    /NEXT_INC_CACHE/,
  );
  assert.throws(() => assertPreviewRuntime({ GAF_CONTENT_PACK: "r2", GAF_PREVIEW_BUCKET: PREVIEW_BUCKET_NAME }), /GAF_CONTENT_PACK/);
  assert.doesNotThrow(() => assertPreviewRuntime(previewRuntimeEnv(bucket as FakeR2Bucket, bucket as FakeR2Bucket)));
});

test("packs round-trip source bytes and reject a broken layout", () => {
  const { built } = fixturePacks();
  const checked = validatePreviewPack({
    manifestBytes: built.objects.get(PREVIEW_MANIFEST_KEY)!,
    versionBytes: built.objects.get(PREVIEW_VERSION_KEY)!,
    packBytes: built.objects,
  });
  assert.equal(checked.files.size, 2);
  assert.equal(new TextDecoder().decode(checked.files.get("content/cms.json")!), CMS);
  assert.equal(unpackEdition(built.objects.get("content/.packs/en.pack")!).length, 1);

  const corrupt = new Map(built.objects);
  const flipped = new Uint8Array(built.objects.get("content/.packs/en.pack")!);
  flipped[0] ^= 0xff;
  corrupt.set("content/.packs/en.pack", flipped);
  assert.throws(
    () =>
      validatePreviewPack({
        manifestBytes: built.objects.get(PREVIEW_MANIFEST_KEY)!,
        versionBytes: built.objects.get(PREVIEW_VERSION_KEY)!,
        packBytes: corrupt,
      }),
    /checksum mismatch/,
  );

  const missing = new Map(built.objects);
  missing.delete("content/.packs/ar.pack");
  assert.throws(
    () =>
      validatePreviewPack({
        manifestBytes: built.objects.get(PREVIEW_MANIFEST_KEY)!,
        versionBytes: built.objects.get(PREVIEW_VERSION_KEY)!,
        packBytes: missing,
      }),
    /is missing/,
  );

  const version = JSON.parse(new TextDecoder().decode(built.objects.get(PREVIEW_VERSION_KEY)!));
  version.groups.en = "other-stamp";
  assert.throws(
    () =>
      validatePreviewPack({
        manifestBytes: built.objects.get(PREVIEW_MANIFEST_KEY)!,
        versionBytes: new TextEncoder().encode(JSON.stringify(version)),
        packBytes: built.objects,
      }),
    /stamp does not match/,
  );
  assert.equal(sha256Hex(built.objects.get("content/.packs/en.pack")!), built.manifest.packs.find((pack) => pack.id === "en")?.sha256);
});

test("packed hydration serves synchronous CMS reads and saves without loose R2 gets", async () => {
  const { bucket } = fixturePacks();
  const storage = storageFor(bucket);
  await storage.ensureHydrated("en");
  await storage.ensureHydrated("ar");
  setContentStorage(storage);
  clearCachedJsonFiles();
  const loaded = loadCms("en");
  assert.equal(loaded.settings.blogTitle, "Original title");
  assert.equal(loaded.articles[0]?.slug, "note");
  const next = { ...loaded, settings: { ...loaded.settings, blogTitle: "Packed title" } };
  const saved = saveCms(next);
  assert.equal(saved, next);
  assert.match(storage.read("content/cms.json") ?? "", /Packed title/);
  await storage.flush();
  const again = storageFor(bucket);
  await again.ensureHydrated("en");
  setContentStorage(again);
  clearCachedJsonFiles();
  assert.equal(loadCms("en").settings.blogTitle, "Packed title");
  assert.equal(bucket.calls.filter((call) => call.op === "list").length, 0);
  assert.equal(bucket.calls.some((call) => call.key === "content/cms.json"), false);
  const looseGroups = ["en", "ar", "fr", "ru", "sw"] as const;
  const looseReads = 2 + looseGroups.reduce((total, group) => total + GROUP_LAYOUT[group].keys.length + GROUP_LAYOUT[group].prefixes.length, 0);
  assert.ok(storage.stats.r2Gets < looseReads);
  assert.equal(storage.stats.r2Lists, 0);
});

test("a stale pack etag rejects the save and does not keep the outdated edit", async () => {
  const { bucket, built } = fixturePacks();
  const storage = storageFor(bucket);
  await storage.ensureHydrated("en");
  setContentStorage(storage);
  const loaded = loadCms("en");
  saveCms({ ...loaded, settings: { ...loaded.settings, blogTitle: "Should not stick" } });
  const packKey = "content/.packs/en.pack";
  bucket.seed(packKey, built.objects.get(packKey)!);
  await assert.rejects(storage.flush(), StorageConflictErrorName);
  assert.match(storage.read("content/cms.json") ?? "", /Original title/);
  assert.doesNotMatch(storage.read("content/cms.json") ?? "", /Should not stick/);
});

function StorageConflictErrorName(error: unknown) {
  return error instanceof Error && error.name === "StorageConflictError";
}

test("missing and corrupt packs fail closed without reading loose objects", async () => {
  const empty = storageFor(new FakeR2Bucket());
  await assert.rejects(empty.ensureHydrated("en"), /preview pack: content\/\.manifest\.json is missing/);
  assert.equal(empty.stats.r2Lists, 0);

  const { bucket, built } = fixturePacks();
  const flipped = new Uint8Array(built.objects.get("content/.packs/en.pack")!);
  flipped[flipped.length - 1] ^= 0xff;
  bucket.seed("content/.packs/en.pack", flipped);
  const broken = storageFor(bucket);
  await assert.rejects(broken.ensureHydrated("en"), /checksum mismatch|corrupt/);
  assert.throws(() => broken.read("content/cms.json"), /will not fall back/);
  assert.equal(bucket.calls.some((call) => call.key === "content/cms.json"), false);

  const refreshBucket = new FakeR2Bucket();
  for (const [key, bytes] of fixturePacks().built.objects) refreshBucket.seed(key, bytes);
  const refreshing = new PackedPreviewStorage({ bucket: refreshBucket, versionCheckIntervalMs: 0, log() {} });
  await refreshing.ensureHydrated("en");
  refreshBucket.seed(
    PREVIEW_VERSION_KEY,
    JSON.stringify({
      groups: { en: "changed", ar: "stamp-1" },
      updatedAt: "2026-11-05T00:00:01.000Z",
      source: PREVIEW_BUCKET_NAME,
    }),
  );
  refreshBucket.unseed("content/.packs/en.pack");
  await assert.rejects(refreshing.refreshIfStale(), /missing|preview pack/);
  assert.throws(() => refreshing.read("content/cms.json"), /will not fall back/);
  assert.equal(refreshBucket.calls.some((call) => call.key === "content/cms.json"), false);
});

test("the pack command dry-runs unless the preview bucket is confirmed", async () => {
  await assert.rejects(runPackPreview([]), /pass --config/);
  const root = mkdtempSync(path.join(tmpdir(), "gaf-pack-"));
  const content = path.join(root, "content");
  const configPath = path.join(root, "wrangler.preview.jsonc");
  try {
    writeFileSync(configPath, readFileSync(path.join(process.cwd(), "wrangler.preview.jsonc")));
    const { mkdirSync } = await import("node:fs");
    mkdirSync(content, { recursive: true });
    writeFileSync(path.join(content, "cms.json"), CMS);
    const puts: string[] = [];
    const plan = await runPackPreview(["--config", configPath, "--content", content, "--stamp", "fixed", "--dry-run"], {
      contentRoot: content,
      stamp: "fixed",
      now: "2026-11-05T00:00:00.000Z",
      uploader: async (bucket, key) => {
        puts.push(`${bucket}/${key}`);
      },
    });
    assert.equal(puts.length, 0);
    assert.equal(plan.bucket, PREVIEW_BUCKET_NAME);
    assert.equal(plan.fileCount, 1);
    assert.ok(plan.packBytes > 0);
    assert.equal(plan.rawBytes, new TextEncoder().encode(CMS).byteLength);
    await assert.rejects(
      runPackPreview(["--config", configPath, "--content", content, "--stamp", "fixed", "--upload"], {
        uploader: async (bucket, key) => {
          puts.push(`${bucket}/${key}`);
        },
        env: {},
      }),
      /GAF_PREVIEW_PACK_CONFIRM/,
    );
    assert.equal(puts.length, 0);
    await runPackPreview(["--config", configPath, "--content", content, "--stamp", "fixed", "--upload"], {
      uploader: async (bucket, key) => {
        if (bucket !== PREVIEW_BUCKET_NAME) throw new Error(`wrong bucket ${bucket}`);
        puts.push(key);
      },
      env: { GAF_PREVIEW_PACK_CONFIRM: PREVIEW_BUCKET_NAME },
    });
    assert.deepEqual(puts.sort(), ["content/.manifest.json", "content/.packs/en.pack", "content/.version.json"]);
    const bad = path.join(root, "wrangler.production.jsonc");
    writeFileSync(bad, readFileSync(path.join(process.cwd(), "wrangler.production.jsonc")));
    await assert.rejects(runPackPreview(["--config", bad, "--dry-run"]), PreviewPackError);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("the default worker still hydrates loose objects and the preview hook does not", async () => {
  const loose = new FakeR2Bucket({
    "content/.manifest.json": JSON.stringify({ version: 1, generatedAt: "", keys: ["content/cms.json"] }),
    "content/.version.json": JSON.stringify({ groups: { en: "s" }, updatedAt: "" }),
    "content/cms.json": CMS,
  });
  const assets = { async fetch() { return new Response("asset", { status: 200 }); } };
  const production = createWorker(async () => new Response("next"));
  const response = await production.fetch(
    new Request("https://gaf.healthcare/"),
    { CONTENT: loose, STATIC: new FakeR2Bucket(), ASSETS: assets, GAF_STORAGE: "r2" },
    { waitUntil() {} },
  );
  assert.equal(response.status, 200);
  assert.equal(loose.calls.some((call) => call.key === "content/cms.json"), true);
  assert.equal(loose.calls.some((call) => call.key?.includes(".packs/")), false);

  const groups = new Map<string, EditionFile[]>([
    ["en", [{ key: "content/cms.json", bytes: new TextEncoder().encode(CMS) }]],
    ["ar", [{ key: "content/ar/cms.json", bytes: new TextEncoder().encode(CMS) }]],
    ["fr", [{ key: "content/fr/cms.json", bytes: new TextEncoder().encode(CMS) }]],
    ["ru", [{ key: "content/ru/cms.json", bytes: new TextEncoder().encode(CMS) }]],
    ["sw", [{ key: "content/sw/cms.json", bytes: new TextEncoder().encode(CMS) }]],
  ]);
  const built = buildPreviewPacks({ groups, stamp: "stamp-1", generatedAt: "2026-11-05T00:00:00.000Z" });
  const bucket = new FakeR2Bucket();
  for (const [key, bytes] of built.objects) bucket.seed(key, bytes);
  let seen = "";
  const preview = createWorker(
    async () => {
      seen = contentStorage().read("content/cms.json") ?? "";
      return new Response("next");
    },
    {
      createContent(env) {
        assertPreviewRuntime(env);
        return new PackedPreviewStorage({
          bucket: env.CONTENT,
          staticBucket: env.STATIC,
          log() {},
        });
      },
    },
  );
  const staticBucket = new FakeR2Bucket();
  const previewEnv = {
    ...previewRuntimeEnv(bucket, staticBucket),
    ASSETS: assets,
  };
  setContentStorage(undefined);
  const previewResponse = await preview.fetch(new Request("https://preview.example/"), previewEnv, { waitUntil() {} });
  assert.equal(previewResponse.status, 200);
  assert.match(seen, /Original title/);
  assert.equal(bucket.calls.some((call) => call.key === "content/cms.json"), false);
  assert.equal(bucket.calls.filter((call) => call.op === "list").length, 0);
});

test("preview uploads use STATIC object keys and leave unrelated objects in place", async () => {
  const { bucket } = fixturePacks();
  const staticBucket = new FakeR2Bucket();
  staticBucket.seed("uploads/articles/existing.webp", new Uint8Array([9]));
  const storage = new PackedPreviewStorage({ bucket, staticBucket, log() {} });
  await storage.ensureHydrated("en");
  const bytes = new Uint8Array([1, 2, 3]);
  storage.write("public/uploads/articles/1-x.webp", bytes);
  assert.equal(storage.write.length, 2);
  assert.deepEqual([...(storage.readBytes("public/uploads/articles/1-x.webp") ?? [])], [...bytes]);
  await storage.flush();
  assert.deepEqual(staticBucket.keys(), ["uploads/articles/1-x.webp", "uploads/articles/existing.webp"]);
  const stored = await staticBucket.get("uploads/articles/1-x.webp");
  assert.equal(stored && "arrayBuffer" in stored ? stored.httpMetadata?.contentType : "", "image/webp");
  assert.equal(bucket.calls.some((call) => call.key?.startsWith("uploads/")), false);
  assert.equal(bucket.calls.some((call) => call.op === "put"), false);
  assert.equal(staticBucket.calls.some((call) => call.op === "delete"), false);

  const png = new Uint8Array([137, 80, 78, 71]);
  await staticBucket.put("uploads/articles/cover.png", png, { httpMetadata: { contentType: "image/png" } });
  const assets = { async fetch() { return new Response("asset", { status: 200 }); } };
  const preview = createWorker(async () => new Response("next"), {
    createContent(env) {
      assertPreviewRuntime(env);
      return new PackedPreviewStorage({ bucket: env.CONTENT, staticBucket: env.STATIC, log() {} });
    },
  });
  const response = await preview.fetch(
    new Request("https://preview.example/uploads/articles/cover.png"),
    { ...previewRuntimeEnv(bucket, staticBucket), ASSETS: assets },
    { waitUntil() {} },
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "image/png");
  assert.equal(response.headers.get("cache-control"), "public, max-age=60");
  assert.deepEqual([...(new Uint8Array(await response.arrayBuffer()))], [...png]);
});

test("the static seed dry-runs unless the preview static bucket is confirmed", async () => {
  await assert.rejects(runPreviewStaticSeed([]), /pass --config/);
  const root = mkdtempSync(path.join(tmpdir(), "gaf-static-"));
  const uploads = path.join(root, "uploads", "articles");
  const configPath = path.join(root, "wrangler.preview.jsonc");
  try {
    const { mkdirSync } = await import("node:fs");
    mkdirSync(uploads, { recursive: true });
    writeFileSync(path.join(uploads, "one.webp"), "webp");
    writeFileSync(configPath, readFileSync(path.join(process.cwd(), "wrangler.preview.jsonc")));
    const puts: string[] = [];
    const plan = await runPreviewStaticSeed(["--config", configPath, "--uploads", path.join(root, "uploads"), "--dry-run"], {
      uploadsRoot: path.join(root, "uploads"),
      uploader: async (bucket, key) => {
        puts.push(`${bucket}/${key}`);
      },
    });
    assert.equal(puts.length, 0);
    assert.equal(plan.bucket, PREVIEW_STATIC_BUCKET_NAME);
    assert.equal(plan.fileCount, 1);
    assert.equal(plan.objects[0]?.key, "uploads/articles/one.webp");
    assert.equal(plan.objects[0]?.contentType, "image/webp");
    await assert.rejects(
      runPreviewStaticSeed(["--config", configPath, "--uploads", path.join(root, "uploads"), "--upload"], {
        uploader: async () => {
          puts.push("uploaded");
        },
        env: {},
      }),
      /GAF_PREVIEW_STATIC_CONFIRM/,
    );
    assert.equal(puts.length, 0);
    const kept = new Map<string, Uint8Array>([["uploads/articles/keep.webp", new Uint8Array([7])]]);
    await runPreviewStaticSeed(["--config", configPath, "--uploads", path.join(root, "uploads"), "--upload"], {
      uploader: async (bucket, key, body) => {
        if (bucket !== PREVIEW_STATIC_BUCKET_NAME) throw new Error(`wrong bucket ${bucket}`);
        kept.set(key, body);
      },
      env: { GAF_PREVIEW_STATIC_CONFIRM: PREVIEW_STATIC_BUCKET_NAME },
    });
    assert.deepEqual([...kept.keys()].sort(), ["uploads/articles/keep.webp", "uploads/articles/one.webp"]);
    const bad = path.join(root, "wrangler.production.jsonc");
    writeFileSync(bad, readFileSync(path.join(process.cwd(), "wrangler.production.jsonc")));
    await assert.rejects(runPreviewStaticSeed(["--config", bad, "--dry-run"]), PreviewPackError);
    const live = planPreviewStatic(path.join(process.cwd(), "public", "uploads"));
    assert.ok(live.fileCount > 0);
    assert.ok(live.directories.every((directory) => directory.startsWith("public/uploads/")));
    assert.ok(live.objects.every((object) => object.key.startsWith("uploads/")));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("cold packed hydration fetches fewer bytes than loose object hydration", async () => {
  const contentRoot = path.join(process.cwd(), "content");
  const planned = planPreviewPacks(contentRoot, "measure", "2026-11-05T00:00:00.000Z");
  const packedBucket = new FakeR2Bucket();
  for (const [key, bytes] of planned.objects) packedBucket.seed(key, bytes);
  const packed = new PackedPreviewStorage({ bucket: packedBucket, log() {} });
  const heapBefore = process.memoryUsage().heapUsed;
  const started = performance.now();
  await packed.ensureHydrated("en");
  for (const id of planned.manifest.packs.map((pack) => pack.id)) {
    if (id === "en" || id === "ar" || id === "fr" || id === "ru" || id === "sw" || id === "cms") {
      await packed.ensureHydrated(id as EditionGroup);
    }
  }
  const packedMs = performance.now() - started;
  const heapAfterPacked = process.memoryUsage().heapUsed;

  const looseBucket = new FakeR2Bucket();
  looseBucket.seed(
    "content/.manifest.json",
    JSON.stringify({ version: 1, generatedAt: "", keys: planned.manifest.keys }),
  );
  looseBucket.seed("content/.version.json", JSON.stringify({ groups: planned.version.groups, updatedAt: planned.version.updatedAt }));
  for (const pack of planned.manifest.packs) {
    for (const file of unpackEdition(planned.objects.get(pack.objectKey)!)) looseBucket.seed(file.key, file.bytes);
  }
  const loose = new R2ContentStorage({ content: looseBucket, static: new FakeR2Bucket(), log() {} });
  const looseStarted = performance.now();
  for (const id of planned.manifest.packs.map((pack) => pack.id)) {
    if (id === "en" || id === "ar" || id === "fr" || id === "ru" || id === "sw" || id === "cms") {
      await loose.ensureHydrated(id as EditionGroup);
    }
  }
  const looseMs = performance.now() - looseStarted;
  const looseGets = looseBucket.calls.filter((call) => call.op === "get").length;
  const looseLists = looseBucket.calls.filter((call) => call.op === "list").length;
  const measurement = {
    files: planned.fileCount,
    rawBytes: planned.rawBytes,
    packBytes: planned.packBytes,
    ratio: Number((planned.packBytes / planned.rawBytes).toFixed(4)),
    packedR2Gets: packed.stats.r2Gets,
    packedR2Lists: packed.stats.r2Lists,
    packedBytesFetched: packed.stats.r2Bytes,
    inflateMs: Math.round(packed.stats.inflateMs),
    snapshotPackMs: Math.round(packed.stats.snapshotPackMs),
    packedHydrateMs: Math.round(packedMs),
    packedHeldBytes: packed.heldBytes(),
    packedLogicalBytes: packed.logicalBytes(),
    packedHeapDelta: heapAfterPacked - heapBefore,
    looseR2Gets: looseGets,
    looseR2Lists: looseLists,
    looseHydrateMs: Math.round(looseMs),
    looseHeldBytes: loose.heldBytes(),
    looseLogicalBytes: loose.logicalBytes(),
    routingReadyMs: Math.round(packed.stats.hydrateMs),
    note: "Local FakeR2 comparison of the content/ tree. No production or staging bucket was contacted. Heap delta is process.heapUsed around the packed hydrate, not a Worker isolate peak.",
  };
  console.log(JSON.stringify(measurement));
  const artifactDir = "/opt/cursor/artifacts";
  try {
    writeFileSync(path.join(artifactDir, "packed-preview-measurement.json"), `${JSON.stringify(measurement, null, 2)}\n`);
  } catch {
    // The measurement is also in the test log.
  }
  assert.equal(packed.stats.r2Lists, 0);
  assert.ok(packed.stats.r2Gets < looseGets);
  assert.ok(packed.stats.r2Bytes < planned.rawBytes);
  assert.equal(packed.logicalBytes(), planned.rawBytes);
  assert.ok(packed.heldBytes() < planned.rawBytes / 2);
  assert.ok(packed.heldBytes() <= loose.heldBytes());
  for (const key of planned.manifest.keys) {
    const packedBytes = packed.readBytes(key);
    const looseBytes = loose.readBytes(key);
    assert.ok(packedBytes && looseBytes);
    assert.equal(Buffer.compare(packedBytes, looseBytes), 0, key);
  }
});

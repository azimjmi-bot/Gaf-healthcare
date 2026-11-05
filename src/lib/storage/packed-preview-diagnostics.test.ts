import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { FakeR2Bucket } from "@/lib/storage/fake-r2-bucket";
import {
  emptyPreviewHydrationSample,
  PREVIEW_DIAGNOSTIC_HEADER,
  previewDiagnosticLogLine,
  previewDiagnosticValue,
  previewHtmlCache,
  withPreviewDiagnostic,
  type PreviewHydrationSample,
} from "@/lib/storage/packed-preview-diagnostics";
import { buildPreviewPacks, PREVIEW_MANIFEST_KEY, PREVIEW_VERSION_KEY, type EditionFile } from "@/lib/storage/packed-edition";
import { previewPackCacheRequest, type PackCache } from "@/lib/storage/packed-preview-cache";
import { PackedPreviewStorage } from "@/lib/storage/packed-preview-storage";
import { DEFAULT_RENDER_QUEUE_TIMEOUT_MS, MAX_INFLIGHT_RENDERS, PUBLIC_HTML_SHARED_TTL_SECONDS } from "@/worker/runtime";

const encoder = new TextEncoder();

class MemoryPackCache implements PackCache {
  private readonly entries = new Map<string, { body: Uint8Array; headers: Headers }>();

  async match(request: Request): Promise<Response | undefined> {
    const stored = this.entries.get(request.url);
    if (!stored) return undefined;
    return new Response(stored.body.slice(), { headers: new Headers(stored.headers) });
  }

  async put(request: Request, response: Response): Promise<void> {
    this.entries.set(request.url, { body: new Uint8Array(await response.arrayBuffer()), headers: new Headers(response.headers) });
  }

  async delete(request: Request): Promise<boolean> {
    return this.entries.delete(request.url);
  }
}

function edition() {
  const groups = new Map<string, EditionFile[]>([
    ["en", [{ key: "content/cms.json", bytes: encoder.encode('{"settings":{"blogTitle":"Original title"}}\n') }]],
    ["ar", [{ key: "content/ar/articles/one.json", bytes: encoder.encode('{"slug":"one"}\n') }]],
  ]);
  const built = buildPreviewPacks({ groups, stamp: "stamp-1", generatedAt: "2026-11-05T00:00:00.000Z" });
  const bucket = new FakeR2Bucket();
  for (const [key, bytes] of built.objects) bucket.seed(key, bytes);
  return { built, bucket };
}

function open(bucket: FakeR2Bucket, cache: PackCache | null) {
  return new PackedPreviewStorage({ bucket, packCache: cache, versionCheckIntervalMs: 0, log() {} });
}

async function observe(storage: PackedPreviewStorage, html: "hit" | "miss" | "none") {
  const before = storage.hydrationSample();
  const isolateHydrated = storage.isHydrated("en");
  await storage.ensureHydrated("en");
  await storage.refreshIfStale();
  return previewDiagnosticValue({ isolateHydrated, before, after: storage.hydrationSample(), htmlCache: html });
}

function field(value: string, name: string): string {
  const match = value.split(";").find((part) => part.startsWith(`${name}=`));
  assert.ok(match, name);
  return match.slice(name.length + 1);
}

test("the diagnostic names the ten measurements and carries no bucket or checksum", () => {
  const before = emptyPreviewHydrationSample();
  const after: PreviewHydrationSample = {
    ...before,
    versionReads: 2,
    manifestReads: 1,
    packHits: 6,
    packMisses: 0,
    packRejected: 1,
    packErrors: 0,
    packReads: 1,
    packBytes: 250,
    inflateMs: 12.4,
    snapshotMs: 20.2,
    hydrateMs: 40.2,
    versionCheckMs: 3.4,
  };
  const value = previewDiagnosticValue({ isolateHydrated: false, before, after, htmlCache: "miss" });
  assert.equal(
    value,
    "isolate=cold;version_r2=2;manifest_r2=1;pack_hits=6;pack_misses=0;pack_rejected=1;pack_r2=1;pack_bytes=250;inflate_ms=12;snapshot_ms=20;hydrate_ms=43;html=miss",
  );
  assert.equal(previewDiagnosticLogLine(value), `preview diag ${value}`);
  assert.equal(previewHtmlCache("hit"), "hit");
  assert.equal(previewHtmlCache("miss"), "miss");
  assert.equal(previewHtmlCache(null), "none");
  assert.doesNotMatch(value, /gaf-content|gaf-static|workers\.dev|pack-cache|[a-f0-9]{64}/);
  const response = withPreviewDiagnostic(new Response("page", { headers: { "x-gaf-html-cache": "miss" } }), value);
  assert.equal(response.headers.get(PREVIEW_DIAGNOSTIC_HEADER), value);
  assert.equal(response.headers.get("x-gaf-html-cache"), "miss");
  const empty = withPreviewDiagnostic(new Response(null, { status: 304 }), value);
  assert.equal(empty.status, 304);
  assert.equal(empty.headers.get(PREVIEW_DIAGNOSTIC_HEADER), value);
});

test("a cold isolate reports pack downloads and a warm isolate reports only the version recheck", async () => {
  const { built, bucket } = edition();
  const cache = new MemoryPackCache();
  const first = open(bucket, cache);
  const cold = await observe(first, "miss");
  let packBytes = 0;
  for (const [key, bytes] of built.objects) {
    if (key.startsWith("content/.packs/")) packBytes += bytes.byteLength;
  }
  assert.equal(field(cold, "isolate"), "cold");
  assert.equal(field(cold, "version_r2"), "2");
  assert.equal(field(cold, "manifest_r2"), "1");
  assert.equal(field(cold, "pack_hits"), "0");
  assert.equal(field(cold, "pack_misses"), String(built.manifest.packs.length));
  assert.equal(field(cold, "pack_r2"), String(built.manifest.packs.length));
  assert.equal(field(cold, "pack_bytes"), String(packBytes));
  assert.equal(field(cold, "html"), "miss");
  assert.ok(Number(field(cold, "hydrate_ms")) >= Number(field(cold, "inflate_ms")));
  assert.ok(Number(field(cold, "hydrate_ms")) >= Number(field(cold, "snapshot_ms")));

  const warm = await observe(first, "hit");
  assert.equal(field(warm, "isolate"), "warm");
  assert.equal(field(warm, "version_r2"), "1");
  assert.equal(field(warm, "manifest_r2"), "0");
  assert.equal(field(warm, "pack_hits"), "0");
  assert.equal(field(warm, "pack_misses"), "0");
  assert.equal(field(warm, "pack_r2"), "0");
  assert.equal(field(warm, "pack_bytes"), "0");
  assert.equal(field(warm, "inflate_ms"), "0");
  assert.equal(field(warm, "snapshot_ms"), "0");
  assert.equal(field(warm, "html"), "hit");
  assert.equal(bucket.calls.some((call) => call.key === "content/cms.json"), false);
  assert.equal(built.objects.has(PREVIEW_VERSION_KEY), true);
  assert.equal(built.objects.has(PREVIEW_MANIFEST_KEY), true);
});

test("a new isolate reuses cached packs and a corrupt entry is rejected then fetched", async () => {
  const { built, bucket } = edition();
  const cache = new MemoryPackCache();
  const first = open(bucket, cache);
  await first.ensureHydrated("en");
  const second = open(bucket, cache);
  const reused = await observe(second, "miss");
  assert.equal(field(reused, "isolate"), "cold");
  assert.equal(field(reused, "pack_hits"), String(built.manifest.packs.length));
  assert.equal(field(reused, "pack_misses"), "0");
  assert.equal(field(reused, "pack_r2"), "0");
  assert.equal(field(reused, "pack_bytes"), "0");
  assert.equal(field(reused, "manifest_r2"), "1");
  assert.equal(field(reused, "version_r2"), "2");

  const en = built.manifest.packs.find((pack) => pack.id === "en")!;
  await cache.put(
    previewPackCacheRequest(en.sha256, en.objectKey),
    new Response(new Uint8Array([1, 2, 3]), { headers: { "x-gaf-r2-etag": '"bad"' } }),
  );
  const third = open(bucket, cache);
  const repaired = await observe(third, "miss");
  assert.equal(field(repaired, "pack_rejected"), "1");
  assert.equal(field(repaired, "pack_hits"), String(built.manifest.packs.length - 1));
  assert.equal(field(repaired, "pack_r2"), "1");
  assert.equal(Number(field(repaired, "pack_bytes")), built.objects.get(en.objectKey)!.byteLength);
});

test("diagnostics stay on the preview entry and the render limits stay put", () => {
  assert.equal(MAX_INFLIGHT_RENDERS, 8);
  assert.equal(DEFAULT_RENDER_QUEUE_TIMEOUT_MS, 2000);
  assert.equal(PUBLIC_HTML_SHARED_TTL_SECONDS, 300);
  const preview = readFileSync(path.join(process.cwd(), "src/worker-preview.ts"), "utf8");
  const worker = readFileSync(path.join(process.cwd(), "src/worker.ts"), "utf8");
  const runtime = readFileSync(path.join(process.cwd(), "src/worker/runtime.ts"), "utf8");
  const production = readFileSync(path.join(process.cwd(), "wrangler.production.jsonc"), "utf8");
  const staging = readFileSync(path.join(process.cwd(), "wrangler.jsonc"), "utf8");
  assert.match(preview, /x-gaf-preview-diag|PREVIEW_DIAGNOSTIC_HEADER|previewDiagnosticValue/);
  assert.match(preview, /sharedPackCache: true/);
  assert.doesNotMatch(preview, /singleflight/);
  assert.doesNotMatch(worker, /x-gaf-preview-diag|previewDiagnosticValue|packed-preview-diagnostics/);
  assert.doesNotMatch(runtime, /x-gaf-preview-diag|previewDiagnosticValue|packed-preview-diagnostics/);
  assert.doesNotMatch(production, /x-gaf-preview-diag|gaf-content-preview/);
  assert.doesNotMatch(staging, /x-gaf-preview-diag|gaf-content-preview/);
});

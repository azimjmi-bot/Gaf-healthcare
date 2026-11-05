import { PreviewPackError, sha256Hex, type PreviewPackRecord } from "@/lib/storage/packed-edition";

/**
 * Colocation cache for immutable preview packs.
 *
 * `caches.open` is Cloudflare's Cache API: one named cache per data centre,
 * shared by every isolate there, and never used to answer a visitor request.
 * Pack URLs are synthetic and content-addressed, so a version change selects
 * a different key. `content/.version.json` is not stored here; every
 * hydration reads it from R2. The manifest is not stored here either, so the
 * hashes that select those keys always come from R2.
 *
 * A miss, a bad entry, or a cache outage falls through to R2. R2 remains the
 * authority. This module does not open a Durable Object or a second bucket.
 */
export const PREVIEW_PACK_CACHE_NAME = "gaf-preview-packs";
const CACHE_ORIGIN = "https://pack-cache.gaf-healthcare-preview.internal";
const ETAG_HEADER = "x-gaf-r2-etag";
const CACHE_CONTROL = "public, max-age=604800";

export interface PackCache {
  match(request: Request): Promise<Response | undefined>;
  put(request: Request, response: Response): Promise<void>;
  delete(request: Request): Promise<boolean | void>;
}

export function previewPackCacheRequest(sha256: string, objectKey: string): Request {
  if (!/^[a-f0-9]{64}$/.test(sha256)) throw new PreviewPackError("preview pack cache key is not a sha256");
  if (!objectKey.startsWith("content/.packs/") || objectKey.includes("..")) {
    throw new PreviewPackError(`preview pack cache refused ${objectKey}`);
  }
  const path = objectKey.split("/").map((part) => encodeURIComponent(part)).join("/");
  return new Request(`${CACHE_ORIGIN}/v1/${sha256}/${path}`, { method: "GET" });
}

export async function openPreviewPackCache(): Promise<PackCache | null> {
  try {
    const cachesGlobal = (globalThis as { caches?: { open?: (name: string) => Promise<PackCache> } }).caches;
    if (!cachesGlobal?.open) return null;
    return await cachesGlobal.open(PREVIEW_PACK_CACHE_NAME);
  } catch {
    return null;
  }
}

export function packCacheResponse(bytes: Uint8Array, etag: string): Response {
  return new Response(bytes.slice(), {
    status: 200,
    headers: {
      "cache-control": CACHE_CONTROL,
      "content-type": "application/octet-stream",
      [ETAG_HEADER]: etag,
    },
  });
}

export type CachedPackResult =
  | { status: "miss" }
  | { status: "rejected" }
  | { status: "hit"; bytes: Uint8Array; etag: string };

/** A content-addressed pack, or a miss/rejection that the caller refetches from R2. */
export async function readCachedPack(
  cache: PackCache,
  pack: Pick<PreviewPackRecord, "sha256" | "objectKey">,
): Promise<CachedPackResult> {
  const request = previewPackCacheRequest(pack.sha256, pack.objectKey);
  const response = await cache.match(request);
  if (!response) return { status: "miss" };
  const bytes = new Uint8Array(await response.arrayBuffer());
  const etag = response.headers.get(ETAG_HEADER);
  if (!etag || sha256Hex(bytes) !== pack.sha256) {
    try {
      await cache.delete(request);
    } catch {
      // The caller refetches from R2 either way.
    }
    return { status: "rejected" };
  }
  return { status: "hit", bytes, etag };
}

export async function writeCachedPack(
  cache: PackCache,
  pack: Pick<PreviewPackRecord, "sha256" | "objectKey">,
  bytes: Uint8Array,
  etag: string,
): Promise<void> {
  if (sha256Hex(bytes) !== pack.sha256) throw new PreviewPackError(`refusing to cache ${pack.objectKey} under the wrong hash`);
  await cache.put(previewPackCacheRequest(pack.sha256, pack.objectKey), packCacheResponse(bytes, etag));
}

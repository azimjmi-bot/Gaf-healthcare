import { deflateRawSync, inflateRawSync } from "node:zlib";
import { notifyContentReplaced } from "@/lib/storage/index";
import {
  contentTypeFor,
  formatPublicContentGeneration,
  groupForKey,
  StorageHydrationError,
  type AssetFetcherLike,
  type EditionGroup,
  type R2BucketLike,
  type R2ObjectBodyLike,
  type R2ObjectLike,
} from "@/lib/storage/r2";
import { normaliseKey, parentKey, StorageConflictError, StorageKeyError, StorageVersionError, type ContentStorage } from "@/lib/storage/types";
import {
  packEdition,
  PREVIEW_BUCKET_NAME,
  PREVIEW_MANIFEST_KEY,
  PREVIEW_VERSION_KEY,
  PreviewPackError,
  sha256Hex,
  validatePreviewPack,
  type PreviewPackManifest,
  type PreviewPackRecord,
  type PreviewVersionDocument,
} from "@/lib/storage/packed-edition";
import {
  openPreviewPackCache,
  readCachedPack,
  writeCachedPack,
  type PackCache,
} from "@/lib/storage/packed-preview-cache";
import { type PreviewHydrationSample } from "@/lib/storage/packed-preview-diagnostics";

/**
 * In-memory content snapshot filled from preview packs before Next.js routes.
 * Reads and writes stay synchronous. A flush rewrites the affected pack and
 * refuses to publish when the pack etag is no longer the one this isolate
 * hydrated, so a stale snapshot cannot overwrite a newer pack.
 *
 * A failed validation throws. This class never reads loose content keys and
 * never opens any bucket other than the one it was given.
 *
 * When a pack cache is configured, only validated pack bodies are stored,
 * under their manifest SHA-256. The version document and manifest are always
 * read from R2, and a cache miss or cache error falls through to R2.
 */

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const UPLOADS_PREFIX = "public/uploads/";
const EDITION_IDS = new Set<EditionGroup>(["en", "ar", "fr", "ru", "sw", "cms"]);
/** Same threshold as the loose snapshot: bodies at or above this size are deflated in memory. */
const PACK_THRESHOLD = 1024;

type Body = { packed: true; data: Uint8Array; size: number } | { packed: false; data: Uint8Array };

function copyBytes(bytes: Uint8Array): Uint8Array {
  return new Uint8Array(bytes);
}

function packBody(bytes: Uint8Array): Body {
  if (bytes.byteLength < PACK_THRESHOLD) return { packed: false, data: copyBytes(bytes) };
  return { packed: true, data: new Uint8Array(deflateRawSync(bytes)), size: bytes.byteLength };
}

function unpackBody(body: Body): Uint8Array {
  return body.packed ? new Uint8Array(inflateRawSync(body.data)) : copyBytes(body.data);
}

function copyBody(body: Body): Body {
  return body.packed ? { packed: true, data: copyBytes(body.data), size: body.size } : { packed: false, data: copyBytes(body.data) };
}

function asEdition(id: string): EditionGroup | null {
  return EDITION_IDS.has(id as EditionGroup) ? (id as EditionGroup) : null;
}

type SnapshotEntry = { body: Body; etag: string };
type PackState = { id: string; objectKey: string; etag: string };

export type PackedPreviewStats = {
  r2Gets: number;
  r2Puts: number;
  r2Lists: number;
  r2Bytes: number;
  inflateMs: number;
  /** Time spent deflating individual files into the in-memory snapshot. */
  snapshotPackMs: number;
  hydrateMs: number;
  /** Pack bodies reused from the colo cache. Version and manifest reads stay on R2. */
  cacheHits: number;
  cacheMisses: number;
  cachePuts: number;
  /** Cached bytes whose hash or etag did not match the R2 manifest. */
  cacheRejected: number;
  cacheErrors: number;
  /** R2 reads of the version document, including a conditional match with no body. */
  versionReads: number;
  manifestReads: number;
  /** Pack objects fetched from R2. Version and manifest reads are not included. */
  packReads: number;
  packBytes: number;
  /** Time in the version recheck outside a full layout reload. */
  versionCheckMs: number;
};

export type PackedPreviewStorageOptions = {
  bucket: R2BucketLike;
  /** CMS media. Keys `public/uploads/**` map here as `uploads/**`. */
  staticBucket?: R2BucketLike;
  assets?: AssetFetcherLike;
  assetKeys?: Record<string, string>;
  versionCheckIntervalMs?: number;
  log?: (message: string) => void;
  onContentPublished?: (groups: readonly EditionGroup[]) => void;
  onStaticChange?: (bucketKey: string, kind: "put" | "delete") => void;
  /**
   * Preview only. When set, pack bodies are reused from this colo-local cache.
   * Tests pass a shared fake. The preview Worker sets {@link sharedPackCache}
   * instead and opens the named Cache API cache on first hydration.
   */
  packCache?: PackCache | null;
  /** Open `gaf-preview-packs` on first hydration. Ignored when `packCache` is set. */
  sharedPackCache?: boolean;
};

function hasBody(object: R2ObjectBodyLike | R2ObjectLike | null): object is R2ObjectBodyLike {
  return object !== null && typeof (object as R2ObjectBodyLike).arrayBuffer === "function";
}

function jsonBytes(value: unknown): Uint8Array {
  return encoder.encode(`${JSON.stringify(value, null, 2)}\n`);
}

export class PackedPreviewStorage implements ContentStorage {
  readonly kind = "packed-preview";
  readonly stats: PackedPreviewStats = {
    r2Gets: 0,
    r2Puts: 0,
    r2Lists: 0,
    r2Bytes: 0,
    inflateMs: 0,
    snapshotPackMs: 0,
    hydrateMs: 0,
    cacheHits: 0,
    cacheMisses: 0,
    cachePuts: 0,
    cacheRejected: 0,
    cacheErrors: 0,
    versionReads: 0,
    manifestReads: 0,
    packReads: 0,
    packBytes: 0,
    versionCheckMs: 0,
  };
  private readonly bucket: R2BucketLike;
  private readonly staticBucket?: R2BucketLike;
  private readonly assets?: AssetFetcherLike;
  private readonly assetKeys: Map<string, string>;
  private readonly versionCheckIntervalMs: number;
  private readonly log: (message: string) => void;
  private readonly onContentPublished?: (groups: readonly EditionGroup[]) => void;
  private readonly onStaticChange?: (bucketKey: string, kind: "put" | "delete") => void;
  private readonly injectedPackCache: PackCache | null;
  private readonly sharedPackCache: boolean;
  private packCachePromise: Promise<PackCache | null> | null = null;
  private staticTail: Promise<void> = Promise.resolve();

  private readonly entries = new Map<string, SnapshotEntry>();
  private readonly committed = new Map<string, SnapshotEntry>();
  private readonly packs = new Map<string, PackState>();
  private readonly keyPack = new Map<string, string>();
  private readonly hydrated = new Set<EditionGroup>();
  private readonly assetEntries = new Map<string, SnapshotEntry>();
  private manifest: PreviewPackManifest | null = null;
  private manifestEtag: string | null = null;
  private versionDocument: PreviewVersionDocument | null = null;
  private versionEtag: string | null = null;
  private versionBaselined = false;
  private loading: Promise<void> | null = null;
  private assetsLoaded = false;
  private readonly dirtyPacks = new Set<string>();
  private readonly dirtyGroups = new Set<EditionGroup>();
  private running: Promise<void> | null = null;
  private readonly failures: Error[] = [];
  private lastVersionCheck = 0;
  private versionCheck: Promise<void> | null = null;
  private closed = false;

  constructor(options: PackedPreviewStorageOptions) {
    this.bucket = options.bucket;
    this.staticBucket = options.staticBucket;
    this.assets = options.assets;
    this.assetKeys = new Map(Object.entries(options.assetKeys ?? {}));
    this.versionCheckIntervalMs = options.versionCheckIntervalMs ?? 1000;
    this.log = options.log ?? ((message) => console.warn(`[gaf] ${message}`));
    this.onContentPublished = options.onContentPublished;
    this.onStaticChange = options.onStaticChange;
    this.injectedPackCache = options.packCache ?? null;
    this.sharedPackCache = options.sharedPackCache === true;
  }

  read(key: string): string | null {
    const bytes = this.readBytes(key);
    return bytes === null ? null : decoder.decode(bytes);
  }

  readBytes(key: string): Uint8Array | null {
    const normalised = normaliseKey(key);
    this.assertReady(normalised);
    const entry = this.entries.get(normalised);
    return entry ? unpackBody(entry.body) : null;
  }

  list(prefix: string): string[] {
    const base = normaliseKey(prefix);
    this.assertReady(`${base}/placeholder.json`);
    return [...this.entries.keys()].filter((key) => parentKey(key) === base).sort();
  }

  version(key: string): string | null {
    const normalised = normaliseKey(key);
    this.assertReady(normalised);
    return this.entries.get(normalised)?.etag ?? null;
  }

  write(key: string, data: string | Uint8Array): void {
    const normalised = normaliseKey(key);
    if (this.assetKeys.has(normalised)) throw new StorageKeyError(`${key} (a Worker asset is read-only)`);
    if (normalised.startsWith(UPLOADS_PREFIX)) {
      this.assertReady(normalised);
      this.uploadObjectKey(normalised);
      if (!this.staticBucket) {
        throw new PreviewPackError("preview static bucket is missing; refusing to store media in a content pack");
      }
      const bytes = typeof data === "string" ? encoder.encode(data) : copyBytes(data);
      this.entries.set(normalised, { body: packBody(bytes), etag: sha256Hex(bytes) });
      this.enqueueStatic(normalised, "put", bytes);
      return;
    }
    this.assertReady(normalised);
    const packId = this.packFor(normalised);
    const bytes = typeof data === "string" ? encoder.encode(data) : copyBytes(data);
    this.entries.set(normalised, { body: packBody(bytes), etag: sha256Hex(bytes) });
    this.keyPack.set(normalised, packId);
    this.dirtyPacks.add(packId);
    this.schedule();
  }

  remove(key: string): void {
    const normalised = normaliseKey(key);
    if (this.assetKeys.has(normalised)) throw new StorageKeyError(`${key} (a Worker asset is read-only)`);
    if (normalised.startsWith(UPLOADS_PREFIX)) {
      this.assertReady(normalised);
      this.uploadObjectKey(normalised);
      if (!this.staticBucket) {
        throw new PreviewPackError("preview static bucket is missing; refusing to store media in a content pack");
      }
      this.entries.delete(normalised);
      this.enqueueStatic(normalised, "delete");
      return;
    }
    this.assertReady(normalised);
    const packId = this.keyPack.get(normalised) ?? this.packFor(normalised);
    this.entries.delete(normalised);
    this.keyPack.delete(normalised);
    this.dirtyPacks.add(packId);
    this.schedule();
  }

  async flush(): Promise<void> {
    while (this.running || this.dirtyPacks.size > 0) {
      if (!this.running) this.schedule();
      if (this.running) await this.running;
    }
    for (;;) {
      const tail = this.staticTail;
      await tail;
      if (this.staticTail === tail) break;
    }
    if (this.failures.length > 0) {
      const first = this.failures[0];
      this.failures.length = 0;
      throw first;
    }
    if (this.dirtyGroups.size > 0) await this.publishVersion();
  }

  isHydrated(group: EditionGroup) {
    return this.hydrated.has(group);
  }

  /** Counters for the preview diagnostic. Cumulative for this isolate. */
  hydrationSample(): PreviewHydrationSample {
    return {
      versionReads: this.stats.versionReads,
      manifestReads: this.stats.manifestReads,
      packHits: this.stats.cacheHits,
      packMisses: this.stats.cacheMisses,
      packRejected: this.stats.cacheRejected,
      packErrors: this.stats.cacheErrors,
      packReads: this.stats.packReads,
      packBytes: this.stats.packBytes,
      inflateMs: this.stats.inflateMs,
      snapshotMs: this.stats.snapshotPackMs,
      hydrateMs: this.stats.hydrateMs,
      versionCheckMs: this.stats.versionCheckMs,
    };
  }

  ensureHydrated(group: EditionGroup): Promise<void> {
    if (this.closed) {
      return Promise.reject(new StorageHydrationError(group, "preview pack: snapshot was rejected and will not fall back to loose objects"));
    }
    if (this.hydrated.has(group) && this.hydrated.size > 0 && this.manifest) return Promise.resolve();
    if (!this.loading) {
      this.loading = this.loadLayout(group).finally(() => {
        this.loading = null;
      });
    }
    return this.loading.then(() => {
      if (!this.hydrated.has(group)) {
        throw new StorageHydrationError(group, `preview pack: layout has no pack for "${group}"`);
      }
    });
  }

  contentGeneration(): string | null {
    if (!this.versionBaselined || !this.manifest) return null;
    return this.manifest.generation;
  }

  async ensureContentGeneration(): Promise<string> {
    await this.ensureHydrated("en");
    const generation = this.contentGeneration();
    if (!generation) throw new StorageHydrationError("en", "preview pack: version document is missing");
    return generation;
  }

  refreshIfStale(): Promise<void> {
    if (this.hydrated.size === 0) return Promise.resolve();
    if (this.versionCheck) return this.versionCheck;
    if (Date.now() - this.lastVersionCheck < this.versionCheckIntervalMs) return Promise.resolve();
    this.versionCheck = this.checkVersion().finally(() => {
      this.versionCheck = null;
    });
    return this.versionCheck;
  }

  heldBytes(): number {
    let total = 0;
    for (const entry of this.entries.values()) total += entry.body.data.byteLength;
    return total;
  }

  logicalBytes(): number {
    let total = 0;
    for (const entry of this.entries.values()) total += entry.body.packed ? entry.body.size : entry.body.data.byteLength;
    return total;
  }

  private packFor(key: string): string {
    const existing = this.keyPack.get(key);
    if (existing) return existing;
    const group = groupForKey(key);
    if (!group || !this.packs.has(group)) {
      throw new PreviewPackError(`preview pack layout has no edition for ${key}`);
    }
    return group;
  }

  private assertReady(key: string) {
    if (this.closed) {
      throw new StorageHydrationError("en", "preview pack: snapshot was rejected and will not fall back to loose objects");
    }
    if (this.assetKeys.has(key)) {
      if (!this.assetsLoaded) {
        throw new StorageHydrationError("en", `preview pack: ${key} was read before the Worker assets were loaded`);
      }
      return;
    }
    const group = groupForKey(key);
    if (group && !this.hydrated.has(group)) {
      throw new StorageHydrationError(group, `preview pack: ${key} was read before the packed snapshot was hydrated`);
    }
  }

  private uploadObjectKey(storageKey: string): string {
    const objectKey = storageKey.slice("public/".length);
    const parts = objectKey.split("/");
    if (!objectKey.startsWith("uploads/") || parts.some((part) => part === "" || part === "." || part === "..")) {
      throw new StorageKeyError(storageKey);
    }
    return objectKey;
  }

  private restoreStatic(storageKey: string) {
    const committed = this.committed.get(storageKey);
    if (committed) this.entries.set(storageKey, { body: copyBody(committed.body), etag: committed.etag });
    else this.entries.delete(storageKey);
  }

  private enqueueStatic(storageKey: string, kind: "put" | "delete", bytes?: Uint8Array) {
    const objectKey = this.uploadObjectKey(storageKey);
    const bucket = this.staticBucket;
    if (!bucket) {
      throw new PreviewPackError("preview static bucket is missing; refusing to store media in a content pack");
    }
    const contentType = contentTypeFor(storageKey);
    this.staticTail = this.staticTail.then(async () => {
      try {
        if (kind === "delete") {
          await bucket.delete(objectKey);
          this.committed.delete(storageKey);
          this.onStaticChange?.(objectKey, "delete");
          return;
        }
        const known = this.committed.get(storageKey);
        const result = await bucket.put(objectKey, bytes ?? new Uint8Array(), {
          onlyIf: known ? { etagMatches: known.etag } : { etagDoesNotExist: true },
          httpMetadata: { contentType },
        });
        if (result === null) {
          this.restoreStatic(storageKey);
          throw new StorageConflictError(storageKey);
        }
        const current = this.entries.get(storageKey);
        if (current) {
          const stored = { body: copyBody(current.body), etag: result.etag };
          this.entries.set(storageKey, stored);
          this.committed.set(storageKey, { body: copyBody(stored.body), etag: result.etag });
        }
        this.onStaticChange?.(objectKey, "put");
      } catch (error) {
        this.failures.push(error instanceof Error ? error : new Error(String(error)));
      }
    });
  }

  private schedule() {
    if (this.running) return;
    const task = this.drain().finally(() => {
      if (this.running === task) this.running = null;
      if (this.dirtyPacks.size > 0 && this.failures.length === 0) this.schedule();
    });
    this.running = task;
  }

  private async drain() {
    while (this.dirtyPacks.size > 0) {
      const ids = [...this.dirtyPacks];
      this.dirtyPacks.clear();
      try {
        for (const id of ids) await this.putPack(id);
        await this.putManifest(this.manifest!);
      } catch (error) {
        const wrapped = error instanceof Error ? error : new Error(String(error));
        this.failures.push(wrapped);
        return;
      }
    }
  }

  private filesForPack(id: string) {
    const files = [];
    for (const [key, packId] of this.keyPack) {
      if (packId !== id) continue;
      const entry = this.entries.get(key);
      if (!entry) continue;
      files.push({ key, bytes: unpackBody(entry.body) });
    }
    return files;
  }

  private async putPack(id: string) {
    const state = this.packs.get(id);
    if (!state) throw new PreviewPackError(`preview pack ${id} disappeared from the layout`);
    const files = this.filesForPack(id);
    const packed = packEdition(files);
    this.stats.r2Puts += 1;
    const result = await this.bucket.put(state.objectKey, packed, {
      onlyIf: { etagMatches: state.etag },
      httpMetadata: { contentType: "application/octet-stream" },
    });
    if (result === null) {
      this.restoreCommitted();
      await this.reloadOrClose("en");
      throw new StorageConflictError(state.objectKey);
    }
    state.etag = result.etag;
    await this.rememberValidatedPack({ sha256: sha256Hex(packed), objectKey: state.objectKey }, packed, result.etag);
    this.rememberPack(id, files.map((file) => file.key));
    const group = asEdition(id);
    if (group) this.dirtyGroups.add(group);
    this.commitEntries();
  }

  private rememberPack(id: string, keys: string[]) {
    for (const [key, packId] of [...this.keyPack]) {
      if (packId === id) this.keyPack.delete(key);
    }
    for (const key of keys) this.keyPack.set(key, id);
  }

  private commitEntries() {
    this.committed.clear();
    for (const [key, entry] of this.entries) this.committed.set(key, { body: copyBody(entry.body), etag: entry.etag });
  }

  private restoreCommitted() {
    this.entries.clear();
    this.keyPack.clear();
    for (const [key, entry] of this.committed) {
      this.entries.set(key, { body: copyBody(entry.body), etag: entry.etag });
      const group = groupForKey(key);
      if (group) this.keyPack.set(key, group);
    }
  }

  private async putManifest(manifest: PreviewPackManifest) {
    const rebuilt = this.rebuildManifest(manifest);
    this.stats.r2Puts += 1;
    const result = await this.bucket.put(PREVIEW_MANIFEST_KEY, jsonBytes(rebuilt), {
      onlyIf: this.manifestEtag ? { etagMatches: this.manifestEtag } : { etagDoesNotExist: true },
      httpMetadata: { contentType: "application/json; charset=utf-8" },
    });
    if (result === null) {
      this.restoreCommitted();
      await this.reloadOrClose("en");
      throw new StorageConflictError(PREVIEW_MANIFEST_KEY);
    }
    this.manifest = rebuilt;
    this.manifestEtag = result.etag;
  }

  private rebuildManifest(previous: PreviewPackManifest): PreviewPackManifest {
    const packs = previous.packs.map((pack) => {
      const files = this.filesForPack(pack.id)
        .sort((a, b) => (a.key < b.key ? -1 : 1))
        .map((file) => ({ key: file.key, bytes: file.bytes.byteLength, sha256: sha256Hex(file.bytes) }));
      const rawBytes = files.reduce((total, file) => total + file.bytes, 0);
      return { ...pack, fileCount: files.length, rawBytes, files };
    });
    // Checksums of the compressed objects are filled by putPack via the bucket etag.
    // The manifest checksum is the hash of the bytes just written; recompute from a fresh pack.
    const withChecksums = packs.map((pack) => {
      const packed = packEdition(this.filesForPack(pack.id));
      return { ...pack, packBytes: packed.byteLength, sha256: sha256Hex(packed) };
    });
    const keys = withChecksums.flatMap((pack) => pack.files.map((file) => file.key)).sort();
    return { ...previous, packs: withChecksums, keys };
  }

  private async publishVersion() {
    if (!this.manifest || !this.versionDocument) {
      throw new StorageVersionError("preview pack snapshot is not hydrated");
    }
    const groups = [...this.dirtyGroups];
    this.dirtyGroups.clear();
    const stamp = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    try {
      const rebuilt = this.rebuildManifest(this.manifest);
      const nextGroups = { ...this.versionDocument.groups };
      for (const group of groups) nextGroups[group] = stamp;
      const packs = rebuilt.packs.map((pack) => (groups.includes(pack.id as EditionGroup) ? { ...pack, stamp } : pack));
      const nextVersion: PreviewVersionDocument = {
        groups: nextGroups,
        updatedAt: new Date().toISOString(),
        source: PREVIEW_BUCKET_NAME,
      };
      const nextManifest: PreviewPackManifest = {
        ...rebuilt,
        packs,
        stamp,
        generation: formatPublicContentGeneration({ groups: nextGroups, updatedAt: nextVersion.updatedAt }),
      };
      this.stats.r2Puts += 1;
      const manifestResult = await this.bucket.put(PREVIEW_MANIFEST_KEY, jsonBytes(nextManifest), {
        onlyIf: this.manifestEtag ? { etagMatches: this.manifestEtag } : { etagDoesNotExist: true },
        httpMetadata: { contentType: "application/json; charset=utf-8" },
      });
      if (manifestResult === null) {
        await this.reloadOrClose("en");
        throw new StorageConflictError(PREVIEW_MANIFEST_KEY);
      }
      this.stats.r2Puts += 1;
      const versionResult = await this.bucket.put(PREVIEW_VERSION_KEY, jsonBytes(nextVersion), {
        onlyIf: this.versionEtag ? { etagMatches: this.versionEtag } : { etagDoesNotExist: true },
        httpMetadata: { contentType: "application/json; charset=utf-8" },
      });
      if (versionResult === null) {
        await this.reloadOrClose("en");
        throw new StorageConflictError(PREVIEW_VERSION_KEY);
      }
      this.manifest = nextManifest;
      this.manifestEtag = manifestResult.etag;
      this.versionDocument = nextVersion;
      this.versionEtag = versionResult.etag;
      this.onContentPublished?.(groups);
    } catch (error) {
      for (const group of groups) this.dirtyGroups.add(group);
      const message = error instanceof Error ? error.message : String(error);
      this.log(`could not publish preview version: ${message}`);
      if (error instanceof StorageHydrationError || error instanceof PreviewPackError) throw error;
      throw new StorageVersionError(message, { cause: error });
    }
  }

  private async checkVersion() {
    const started = performance.now();
    const hydrateBefore = this.stats.hydrateMs;
    try {
      const object = await this.readObject(
        PREVIEW_VERSION_KEY,
        this.versionEtag ? { onlyIf: { etagDoesNotMatch: this.versionEtag } } : undefined,
      );
      if (!object) return;
      const next = JSON.parse(decoder.decode(object.bytes)) as PreviewVersionDocument;
      const changed = [...this.hydrated].filter((group) => next.groups[group] && next.groups[group] !== this.versionDocument?.groups[group]);
      if (changed.length === 0) {
        this.versionEtag = object.etag;
        this.versionDocument = next;
        return;
      }
      await this.loadLayout(changed[0]);
      this.onContentPublished?.(changed);
    } catch (error) {
      this.failClosed();
      if (error instanceof StorageHydrationError || error instanceof PreviewPackError) throw error;
      this.log(`preview version check failed: ${error instanceof Error ? error.message : String(error)}`);
      throw new StorageHydrationError("en", "preview pack: version check failed", { cause: error });
    } finally {
      const layoutMs = this.stats.hydrateMs - hydrateBefore;
      this.stats.versionCheckMs += Math.max(0, performance.now() - started - layoutMs);
      this.lastVersionCheck = Date.now();
    }
  }

  private async reloadOrClose(group: EditionGroup) {
    try {
      await this.loadLayout(group);
    } catch (error) {
      this.failClosed();
      throw error;
    }
  }

  private failClosed() {
    this.closed = true;
    this.entries.clear();
    this.committed.clear();
    this.packs.clear();
    this.keyPack.clear();
    this.hydrated.clear();
    this.manifest = null;
    this.versionDocument = null;
  }

  private async loadLayout(group: EditionGroup) {
    const started = performance.now();
    try {
    let manifestObject;
    let versionObject;
    try {
      versionObject = await this.readObject(PREVIEW_VERSION_KEY);
      manifestObject = await this.readObject(PREVIEW_MANIFEST_KEY);
      await this.loadAssets(group);
    } catch (error) {
      if (error instanceof StorageHydrationError) throw error;
      throw new StorageHydrationError(group, "preview pack: bucket unreachable", { cause: error });
    }
    if (!versionObject) throw new StorageHydrationError(group, `preview pack: ${PREVIEW_VERSION_KEY} is missing`);
    if (!manifestObject) throw new StorageHydrationError(group, `preview pack: ${PREVIEW_MANIFEST_KEY} is missing`);
    const packBytes = new Map<string, Uint8Array>();
    packBytes.set(PREVIEW_MANIFEST_KEY, manifestObject.bytes);
    packBytes.set(PREVIEW_VERSION_KEY, versionObject.bytes);
    let parsed: PreviewPackManifest;
    try {
      parsed = JSON.parse(decoder.decode(manifestObject.bytes)) as PreviewPackManifest;
    } catch (error) {
      throw new StorageHydrationError(group, "preview pack: manifest is not JSON", { cause: error });
    }
    if (!parsed.packs) throw new StorageHydrationError(group, "preview pack: manifest has no pack layout");
    this.packs.clear();
    const cacheable: PreviewPackRecord[] = [];
    for (const pack of parsed.packs) {
      const cached = await this.takeCachedPack(pack);
      if (cached) {
        packBytes.set(pack.objectKey, cached.bytes);
        this.packs.set(pack.id, { id: pack.id, objectKey: pack.objectKey, etag: cached.etag });
        continue;
      }
      const object = await this.readObject(pack.objectKey);
      if (!object) throw new StorageHydrationError(group, `preview pack: ${pack.objectKey} is missing`);
      packBytes.set(pack.objectKey, object.bytes);
      this.packs.set(pack.id, { id: pack.id, objectKey: pack.objectKey, etag: object.etag });
      if (sha256Hex(object.bytes) === pack.sha256) cacheable.push(pack);
    }
    let validated;
    try {
      validated = validatePreviewPack({
        manifestBytes: manifestObject.bytes,
        versionBytes: versionObject.bytes,
        packBytes,
      });
    } catch (error) {
      this.failClosed();
      const message = error instanceof Error ? error.message : String(error);
      throw new StorageHydrationError(group, `preview pack: ${message}`, { cause: error });
    }
    for (const pack of cacheable) {
      const bytes = packBytes.get(pack.objectKey);
      const state = this.packs.get(pack.id);
      if (bytes && state) await this.rememberValidatedPack(pack, bytes, state.etag);
    }
    this.stats.inflateMs += validated.inflateMs;
    const packStarted = performance.now();
    const previous = new Map([...this.entries].map(([key, entry]) => [key, entry.etag]));
    this.entries.clear();
    this.committed.clear();
    this.keyPack.clear();
    for (const [key, bytes] of validated.files) {
      const entry = { body: packBody(bytes), etag: sha256Hex(bytes) };
      this.entries.set(key, entry);
      this.committed.set(key, { body: copyBody(entry.body), etag: entry.etag });
      const owner = validated.manifest.packs.find((pack) => pack.files.some((file) => file.key === key));
      if (!owner) throw new StorageHydrationError(group, `preview pack: ${key} has no owning pack`);
      this.keyPack.set(key, owner.id);
      const old = previous.get(key);
      if (old && old !== entry.etag) notifyContentReplaced(key);
    }
    this.stats.snapshotPackMs += performance.now() - packStarted;
    this.applyAssets();
    this.manifest = validated.manifest;
    this.manifestEtag = manifestObject.etag;
    this.versionDocument = validated.version;
    this.versionEtag = versionObject.etag;
    this.versionBaselined = true;
    this.hydrated.clear();
    for (const pack of validated.manifest.packs) {
      if (pack.id === "en" || pack.id === "ar" || pack.id === "fr" || pack.id === "ru" || pack.id === "sw" || pack.id === "cms") {
        this.hydrated.add(pack.id);
      }
    }
    this.closed = false;
    // The layout just read the version document. A check in the same interval
    // would repeat that GET. Failures throw before this line and leave the clock at 0.
    this.lastVersionCheck = Date.now();
    } finally {
      this.stats.hydrateMs += performance.now() - started;
    }
  }

  private async loadAssets(group: EditionGroup) {
    if (this.assetsLoaded || this.assetKeys.size === 0) return;
    if (!this.assets) throw new StorageHydrationError(group, "preview pack: asset keys configured without an assets binding");
    for (const [key, path] of this.assetKeys) {
      const response = await this.assets.fetch(new URL(path, "https://assets.invalid").toString());
      if (!response.ok) throw new StorageHydrationError(group, `preview pack: asset ${path} → ${response.status}`);
      const bytes = new Uint8Array(await response.arrayBuffer());
      this.assetEntries.set(key, { body: packBody(bytes), etag: response.headers.get("etag") ?? `asset:${bytes.byteLength}` });
    }
    this.assetsLoaded = true;
  }

  private applyAssets() {
    for (const [key, entry] of this.assetEntries) {
      this.entries.set(key, { body: copyBody(entry.body), etag: entry.etag });
      this.committed.set(key, { body: copyBody(entry.body), etag: entry.etag });
    }
  }

  private async packCache(): Promise<PackCache | null> {
    if (this.injectedPackCache) return this.injectedPackCache;
    if (!this.sharedPackCache) return null;
    if (!this.packCachePromise) this.packCachePromise = openPreviewPackCache();
    return this.packCachePromise;
  }

  /** A hash-matching cached pack, or null when the cache is off, empty, or unusable. */
  private async takeCachedPack(pack: PreviewPackRecord): Promise<{ bytes: Uint8Array; etag: string } | null> {
    const cache = await this.packCache();
    if (!cache) return null;
    try {
      const hit = await readCachedPack(cache, pack);
      if (hit.status === "hit") {
        this.stats.cacheHits += 1;
        return { bytes: hit.bytes, etag: hit.etag };
      }
      if (hit.status === "rejected") this.stats.cacheRejected += 1;
      else this.stats.cacheMisses += 1;
      return null;
    } catch (error) {
      this.stats.cacheErrors += 1;
      this.log(`preview pack cache read failed for ${pack.objectKey}: ${error instanceof Error ? error.message : String(error)}`);
      return null;
    }
  }

  private async rememberValidatedPack(pack: Pick<PreviewPackRecord, "sha256" | "objectKey">, bytes: Uint8Array, etag: string) {
    const cache = await this.packCache();
    if (!cache) return;
    try {
      await writeCachedPack(cache, pack, bytes, etag);
      this.stats.cachePuts += 1;
    } catch (error) {
      this.stats.cacheErrors += 1;
      this.log(`preview pack cache write failed for ${pack.objectKey}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async readObject(key: string, options?: { onlyIf?: { etagDoesNotMatch?: string } }) {
    if (key.startsWith("content/") && !key.startsWith("content/.manifest.json") && !key.startsWith("content/.version.json") && !key.startsWith("content/.packs/")) {
      throw new PreviewPackError(`preview pack hydration refused a loose read of ${key}`);
    }
    this.stats.r2Gets += 1;
    if (key === PREVIEW_VERSION_KEY) this.stats.versionReads += 1;
    else if (key === PREVIEW_MANIFEST_KEY) this.stats.manifestReads += 1;
    else if (key.startsWith("content/.packs/")) this.stats.packReads += 1;
    const object = await this.bucket.get(key, options);
    if (!object) return null;
    if (!hasBody(object)) return null;
    const bytes = new Uint8Array(await object.arrayBuffer());
    this.stats.r2Bytes += bytes.byteLength;
    if (key.startsWith("content/.packs/")) this.stats.packBytes += bytes.byteLength;
    return { bytes, etag: object.etag };
  }
}

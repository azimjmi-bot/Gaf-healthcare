import { deflateRawSync, inflateRawSync } from "node:zlib";

import { notifyContentReplaced } from "@/lib/storage/index";
import {
  normaliseKey,
  parentKey,
  StorageConflictError,
  StorageKeyError,
  type ContentStorage,
} from "@/lib/storage/types";

/*
 * Structural subset of the Workers R2 binding API that this backend uses.
 * Declared here so the application's TypeScript config does not need the
 * Workers runtime globals (which conflict with the DOM lib Next relies on),
 * and so tests can supply an in-memory implementation.
 */
export interface R2ObjectLike {
  key: string;
  etag: string;
  size: number;
  httpMetadata?: { contentType?: string };
}
export interface R2ObjectBodyLike extends R2ObjectLike {
  arrayBuffer(): Promise<ArrayBuffer>;
}
export interface R2ListResultLike {
  objects: R2ObjectLike[];
  truncated: boolean;
  cursor?: string;
}
export interface R2BucketLike {
  get(
    key: string,
    options?: { onlyIf?: { etagDoesNotMatch?: string } },
  ): Promise<R2ObjectBodyLike | R2ObjectLike | null>;
  put(
    key: string,
    value: ArrayBuffer | Uint8Array | string,
    options?: {
      onlyIf?: { etagMatches?: string; etagDoesNotExist?: boolean };
      httpMetadata?: { contentType?: string };
    },
  ): Promise<R2ObjectLike | null>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; cursor?: string; limit?: number }): Promise<R2ListResultLike>;
}
export interface AssetFetcherLike {
  fetch(input: string | URL | Request): Promise<Response>;
}

/** Editions the Worker hydrates independently (docs/content-storage.md §3.1). */
export type EditionGroup = "en" | "ar" | "fr" | "ru" | "sw" | "cms";
export const EDITION_GROUPS: readonly EditionGroup[] = ["en", "ar", "fr", "ru", "sw", "cms"];

/**
 * Which keys belong to which group. `keys` are fetched individually; a
 * `prefix` is listed so per-slug files added later are discovered without a
 * deploy. English has no prefix: its per-slug directory does not exist.
 */
export const GROUP_LAYOUT: Record<EditionGroup, { keys: string[]; prefixes: string[] }> = {
  en: {
    keys: ["content/cms.json", "content/catalog-cms.json", "content/curated-treatments.json"],
    prefixes: [],
  },
  ar: {
    keys: ["content/ar/cms.json", "content/ar/catalog-cms.json"],
    prefixes: ["content/ar/articles/", "content/ar/treatments/"],
  },
  fr: { keys: ["content/fr/cms.json", "content/fr/catalog-cms.json"], prefixes: [] },
  ru: { keys: ["content/ru/cms.json", "content/ru/catalog-cms.json"], prefixes: [] },
  sw: { keys: ["content/sw/cms.json", "content/sw/catalog-cms.json"], prefixes: [] },
  cms: { keys: ["content/ai-generations.json"], prefixes: [] },
};

/** Group a content key belongs to, or null for keys outside the content tree. */
export function groupForKey(key: string): EditionGroup | null {
  for (const group of EDITION_GROUPS) {
    const layout = GROUP_LAYOUT[group];
    if (layout.keys.includes(key)) return group;
    if (layout.prefixes.some((prefix) => key.startsWith(prefix))) return group;
  }
  return null;
}

/** Object written by the seeding step; hydration refuses a bucket without it. */
export const MANIFEST_KEY = "content/.manifest.json";
/** Rewritten after every successful flush so other isolates notice. */
export const VERSION_KEY = "content/.version.json";

export type ContentManifest = {
  version: 1;
  generatedAt: string;
  /** Every content key the seed wrote; hydration of a group requires all of its keys. */
  keys: string[];
};

type VersionDocument = { groups: Partial<Record<EditionGroup, string>>; updatedAt: string };

/** Thrown when a group cannot be brought into memory; the Worker answers 503. */
export class StorageHydrationError extends Error {
  readonly group: EditionGroup;
  constructor(group: EditionGroup, message: string, options?: { cause?: unknown }) {
    super(`content storage: cannot hydrate "${group}": ${message}`, options);
    this.name = "StorageHydrationError";
    this.group = group;
  }
}

/**
 * How an object is held in the isolate. Content is kept deflated: the 30 MB
 * of JSON the editions add up to is ~5 MB packed, and the live set would not
 * fit the 128 MiB isolate otherwise (the parsed copies the stores cache are
 * the same data again). `inflateRawSync` is native in workerd (nodejs_compat)
 * and Node, and runs in single-digit milliseconds per megabyte; reads are
 * rare anyway because the stores re-read only when `version()` changes.
 * Objects under `PACK_THRESHOLD` are kept as they are.
 */
type Body = { packed: true; data: Uint8Array; size: number } | { packed: false; data: Uint8Array };
type Entry = { body: Body; etag: string; contentType?: string };
type Target = { kind: "content" | "static"; bucket: R2BucketLike; key: string } | { kind: "asset" };
type Op =
  | { kind: "put"; bytes: Uint8Array; body: Body; contentType: string; target: Exclude<Target, { kind: "asset" }> }
  | { kind: "delete"; target: Exclude<Target, { kind: "asset" }> };

const PACK_THRESHOLD = 1024;

function pack(bytes: Uint8Array): Body {
  if (bytes.byteLength < PACK_THRESHOLD) return { packed: false, data: bytes };
  return { packed: true, data: new Uint8Array(deflateRawSync(bytes)), size: bytes.byteLength };
}

/** A fresh copy the caller may keep or mutate. */
function unpack(body: Body): Uint8Array {
  return body.packed ? new Uint8Array(inflateRawSync(body.data)) : body.data.slice();
}

function logicalSize(body: Body) {
  return body.packed ? body.size : body.data.byteLength;
}
type KeyQueue = { ops: Op[]; running: Promise<void> | null };

export type R2ContentStorageOptions = {
  content: R2BucketLike;
  /** Media uploads. Keys `public/uploads/**` map here as `uploads/**`. */
  static: R2BucketLike;
  /** Worker assets; used for the few files the renderer reads that ship with the deploy. */
  assets?: AssetFetcherLike;
  /**
   * Storage key → asset path, loaded from `assets` on first hydration. These
   * keys are read-only and part of the deploy, never objects in a bucket.
   */
  assetKeys?: Record<string, string>;
  /** How often, at most, a request may check `.version.json` for changes elsewhere. */
  versionCheckIntervalMs?: number;
  /** Parallel `get` calls during hydration. */
  concurrency?: number;
  log?: (message: string) => void;
  /** Called after a media object was durably written or deleted (cache purges). */
  onStaticChange?: (bucketKey: string, kind: "put" | "delete") => void;
};

const UPLOADS_PREFIX = "public/uploads/";
const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function contentTypeFor(key: string) {
  const ext = key.slice(key.lastIndexOf(".") + 1).toLowerCase();
  const types: Record<string, string> = {
    json: "application/json; charset=utf-8",
    webp: "image/webp",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    svg: "image/svg+xml",
    avif: "image/avif",
    css: "text/css; charset=utf-8",
    xml: "application/xml; charset=utf-8",
  };
  return types[ext] ?? "application/octet-stream";
}

function hasBody(object: R2ObjectBodyLike | R2ObjectLike | null): object is R2ObjectBodyLike {
  return object !== null && typeof (object as R2ObjectBodyLike).arrayBuffer === "function";
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, worker));
  return results;
}

/**
 * R2-backed `ContentStorage` for the Workers deployment.
 *
 * Reads are synchronous and come from an in-isolate map that
 * `ensureHydrated(group)` fills from R2 before the request is handed to the
 * framework. Writes are applied to the map immediately (so the request that
 * saved sees its own write) and persisted with an ETag-conditional `put`;
 * `flush()` awaits those puts, rolls the map back to the last committed
 * state on failure and rejects, so a route never acknowledges a save that is
 * not in the bucket. See docs/content-storage.md §3.
 */
export class R2ContentStorage implements ContentStorage {
  readonly kind = "r2";
  private readonly content: R2BucketLike;
  private readonly staticBucket: R2BucketLike;
  private readonly assets?: AssetFetcherLike;
  private readonly assetKeys: Map<string, string>;
  private readonly versionCheckIntervalMs: number;
  private readonly concurrency: number;
  private readonly log: (message: string) => void;
  private readonly onStaticChange?: (bucketKey: string, kind: "put" | "delete") => void;

  /** What readers see: committed objects plus optimistic local writes. */
  private readonly entries = new Map<string, Entry>();
  /** What the bucket is known to hold (etag used as the write precondition). */
  private readonly committed = new Map<string, Entry>();
  private readonly hydrated = new Set<EditionGroup>();
  private readonly hydrating = new Map<EditionGroup, Promise<void>>();
  private manifest: ContentManifest | null = null;
  private manifestLoad: Promise<ContentManifest> | null = null;
  private assetsLoaded = false;
  private assetsLoad: Promise<void> | null = null;
  private versionBaseline: Promise<void> | null = null;

  private pendingCounter = 0;
  private readonly queues = new Map<string, KeyQueue>();
  private readonly inFlight = new Set<Promise<void>>();
  private readonly failures: Error[] = [];
  private readonly dirtyGroups = new Set<EditionGroup>();

  private versionEtag: string | null = null;
  private versionDocument: VersionDocument = { groups: {}, updatedAt: "" };
  private versionBaselined = false;
  private lastVersionCheck = 0;
  private versionCheck: Promise<void> | null = null;

  constructor(options: R2ContentStorageOptions) {
    this.content = options.content;
    this.staticBucket = options.static;
    this.assets = options.assets;
    this.assetKeys = new Map(Object.entries(options.assetKeys ?? {}).map(([key, path]) => [normaliseKey(key), path]));
    this.versionCheckIntervalMs = options.versionCheckIntervalMs ?? 1000;
    this.concurrency = options.concurrency ?? 16;
    this.log = options.log ?? ((message) => console.warn(`[gaf] ${message}`));
    this.onStaticChange = options.onStaticChange;
  }

  // ---------------------------------------------------------------- reads

  read(key: string): string | null {
    const bytes = this.readBytes(key);
    return bytes === null ? null : decoder.decode(bytes);
  }

  readBytes(key: string): Uint8Array | null {
    const normalised = normaliseKey(key);
    this.resolve(normalised);
    this.assertHydratedFor(normalised);
    const entry = this.entries.get(normalised);
    return entry ? unpack(entry.body) : null;
  }

  list(prefix: string): string[] {
    const base = normaliseKey(prefix);
    this.assertHydratedFor(`${base}/`);
    return [...this.entries.keys()].filter((key) => parentKey(key) === base).sort();
  }

  version(key: string): string | null {
    const normalised = normaliseKey(key);
    this.resolve(normalised);
    this.assertHydratedFor(normalised);
    return this.entries.get(normalised)?.etag ?? null;
  }

  // --------------------------------------------------------------- writes

  write(key: string, data: string | Uint8Array): void {
    const normalised = normaliseKey(key);
    const target = this.resolve(normalised);
    if (target.kind === "asset") throw new StorageKeyError(`${key} (a Worker asset is read-only)`);
    this.assertHydratedFor(normalised);
    const bytes = typeof data === "string" ? encoder.encode(data) : data.slice();
    const body = pack(bytes);
    const contentType = contentTypeFor(normalised);
    this.pendingCounter += 1;
    this.entries.set(normalised, { body, etag: `pending:${this.pendingCounter}`, contentType });
    this.enqueue(normalised, { kind: "put", bytes, body, contentType, target });
  }

  remove(key: string): void {
    const normalised = normaliseKey(key);
    const target = this.resolve(normalised);
    if (target.kind === "asset") throw new StorageKeyError(`${key} (a Worker asset is read-only)`);
    this.entries.delete(normalised);
    this.enqueue(normalised, { kind: "delete", target });
  }

  async flush(): Promise<void> {
    // Wait for everything queued so far, including work queued while waiting.
    while (this.inFlight.size > 0) {
      await Promise.allSettled([...this.inFlight]);
    }
    if (this.failures.length > 0) {
      const first = this.failures[0];
      this.failures.length = 0;
      throw first;
    }
    if (this.dirtyGroups.size > 0) await this.publishVersion();
  }

  // ----------------------------------------------------------- hydration

  /** True once `group` has been loaded in this isolate. */
  isHydrated(group: EditionGroup) {
    return this.hydrated.has(group);
  }

  /**
   * Bring `group` into memory. Rejects with `StorageHydrationError` when the
   * bucket is unreachable, the manifest is missing, or any manifest key of
   * the group is absent: an empty or half-seeded bucket is an error, never an
   * empty CMS. Concurrent callers share one load.
   */
  ensureHydrated(group: EditionGroup): Promise<void> {
    if (this.hydrated.has(group)) return Promise.resolve();
    return this.rehydrate(group);
  }

  /** Load `group` even if it is already held, replacing changed objects in place. */
  private rehydrate(group: EditionGroup): Promise<void> {
    const running = this.hydrating.get(group);
    if (running) return running;
    const task = this.hydrate(group).finally(() => this.hydrating.delete(group));
    this.hydrating.set(group, task);
    return task;
  }

  /**
   * Re-hydrate any already-loaded group another isolate has changed since
   * this one last looked, at most once per `versionCheckIntervalMs`. Cheap:
   * one conditional GET that usually returns "not modified".
   */
  refreshIfStale(): Promise<void> {
    if (this.hydrated.size === 0) return Promise.resolve();
    if (this.versionCheck) return this.versionCheck;
    if (Date.now() - this.lastVersionCheck < this.versionCheckIntervalMs) return Promise.resolve();
    this.versionCheck = this.checkVersion().finally(() => {
      this.versionCheck = null;
    });
    return this.versionCheck;
  }

  /** Keys currently held, for diagnostics and tests. */
  keys(): string[] {
    return [...this.entries.keys()].sort();
  }

  /** Bytes actually held in the map (packed), for the memory gate. */
  heldBytes(): number {
    let total = 0;
    for (const entry of this.entries.values()) total += entry.body.data.byteLength;
    return total;
  }

  /** Bytes the held objects would occupy unpacked. */
  logicalBytes(): number {
    let total = 0;
    for (const entry of this.entries.values()) total += logicalSize(entry.body);
    return total;
  }

  // ------------------------------------------------------------ internals

  private resolve(key: string): Target {
    if (key.startsWith("content/")) return { kind: "content", bucket: this.content, key };
    if (key.startsWith(UPLOADS_PREFIX)) {
      return { kind: "static", bucket: this.staticBucket, key: key.slice("public/".length) };
    }
    if (this.assetKeys.has(key)) return { kind: "asset" };
    throw new StorageKeyError(`${key} (not under content/ or public/uploads/)`);
  }

  /**
   * A content key read before its group was hydrated is a Worker bug (the
   * entry hydrates every group a request can touch before routing it), and
   * answering `null` would be exactly the silent empty content this backend
   * exists to prevent. The same goes for an asset key read before the assets
   * were loaded. Uploads are exempt: they are never hydrated.
   */
  private assertHydratedFor(key: string) {
    if (this.assetKeys.has(key) && !this.assetsLoaded) {
      const error = new StorageHydrationError("en", `${key} was read before the Worker assets were loaded`);
      this.log(error.message);
      throw error;
    }
    const group = groupForKey(key);
    if (group && !this.hydrated.has(group)) {
      const error = new StorageHydrationError(group, `${key} was read before the group was hydrated`);
      this.log(error.message);
      throw error;
    }
  }

  private restoreCommitted(key: string) {
    const committed = this.committed.get(key);
    if (committed) this.entries.set(key, committed);
    else this.entries.delete(key);
  }

  private enqueue(key: string, op: Op) {
    let queue = this.queues.get(key);
    if (!queue) {
      queue = { ops: [], running: null };
      this.queues.set(key, queue);
    }
    queue.ops.push(op);
    if (!queue.running) {
      const task = this.drain(key, queue).finally(() => {
        this.inFlight.delete(task);
        if (this.queues.get(key) === queue) this.queues.delete(key);
      });
      queue.running = task;
      this.inFlight.add(task);
    }
  }

  private async drain(key: string, queue: KeyQueue) {
    while (queue.ops.length > 0) {
      const op = queue.ops.shift()!;
      try {
        await this.perform(key, op);
      } catch (error) {
        // Later ops on this key were based on a state that no longer holds.
        queue.ops.length = 0;
        this.restoreCommitted(key);
        this.failures.push(error instanceof Error ? error : new Error(String(error)));
        if (error instanceof StorageConflictError) await this.refetch(key, op.target);
      }
    }
    queue.running = null;
  }

  private async perform(key: string, op: Op) {
    const known = this.committed.get(key);
    if (op.kind === "put") {
      const result = await op.target.bucket.put(op.target.key, op.bytes, {
        onlyIf: known ? { etagMatches: known.etag } : { etagDoesNotExist: true },
        httpMetadata: { contentType: op.contentType },
      });
      if (result === null) throw new StorageConflictError(key);
      const entry: Entry = { body: op.body, etag: result.etag, contentType: op.contentType };
      this.committed.set(key, entry);
      // Promote the optimistic copy only if no newer local write replaced it.
      const current = this.entries.get(key);
      if (current && current.body === op.body) this.entries.set(key, entry);
    } else {
      await op.target.bucket.delete(op.target.key);
      this.committed.delete(key);
    }
    const group = groupForKey(key);
    if (group) this.dirtyGroups.add(group);
    if (op.target.kind === "static") this.onStaticChange?.(op.target.key, op.kind);
  }

  /** After a conflict, pick up what the bucket actually holds so the isolate is not left stale. */
  private async refetch(key: string, target: Exclude<Target, { kind: "asset" }>) {
    if (target.kind !== "content") return;
    try {
      const entry = await this.fetchObject(target.bucket, target.key);
      if (entry) {
        this.committed.set(key, entry);
        this.entries.set(key, entry);
      } else {
        this.committed.delete(key);
        this.entries.delete(key);
      }
      notifyContentReplaced(key);
    } catch (error) {
      this.log(`refetch after conflict failed for ${key}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async publishVersion() {
    const groups = [...this.dirtyGroups];
    this.dirtyGroups.clear();
    // One stamp for this flush. A retry keeps it, so a lost race does not
    // invent a second generation for the same write.
    const stamp = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    try {
      for (let attempt = 0; attempt < 4; attempt++) {
        const next: VersionDocument = {
          groups: { ...this.versionDocument.groups },
          updatedAt: new Date().toISOString(),
        };
        for (const group of groups) next.groups[group] = stamp;
        const result = await this.content.put(VERSION_KEY, encoder.encode(JSON.stringify(next)), {
          // Unconditional put let a later isolate replace the whole document
          // and drop the other isolate's group stamp, so that group stayed
          // stale everywhere else. Match the etag we last read, or create the
          // object only when it is still absent.
          onlyIf: this.versionEtag ? { etagMatches: this.versionEtag } : { etagDoesNotExist: true },
          httpMetadata: { contentType: contentTypeFor(VERSION_KEY) },
        });
        if (result === null) {
          await this.reloadVersionForMerge();
          continue;
        }
        this.versionDocument = next;
        this.versionEtag = result.etag;
        return;
      }
      throw new Error("version document changed repeatedly");
    } catch (error) {
      // The content write itself succeeded and was acknowledged; only the
      // staleness broadcast failed. Keep the groups dirty so the next flush retries.
      for (const group of groups) this.dirtyGroups.add(group);
      this.log(`could not publish ${VERSION_KEY}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /** Pick up a version document another isolate wrote, so our stamp merges onto it. */
  private async reloadVersionForMerge() {
    const object = await this.content.get(VERSION_KEY);
    if (!hasBody(object)) {
      this.versionEtag = null;
      return;
    }
    this.versionDocument = JSON.parse(decoder.decode(new Uint8Array(await object.arrayBuffer()))) as VersionDocument;
    this.versionEtag = object.etag;
  }

  private async checkVersion() {
    try {
      const object = await this.content.get(
        VERSION_KEY,
        this.versionEtag ? { onlyIf: { etagDoesNotMatch: this.versionEtag } } : undefined,
      );
      if (!hasBody(object)) return; // never written, or unchanged since we last looked
      const next = JSON.parse(decoder.decode(new Uint8Array(await object.arrayBuffer()))) as VersionDocument;
      const stale = EDITION_GROUPS.filter(
        (group) =>
          this.hydrated.has(group) &&
          next.groups[group] !== undefined &&
          next.groups[group] !== this.versionDocument.groups[group],
      );
      this.versionEtag = object.etag;
      this.versionDocument = next;
      for (const group of stale) await this.rehydrate(group);
    } catch (error) {
      // A failed check leaves the current copy in place; the next request tries again.
      this.log(`version check failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      this.lastVersionCheck = Date.now();
    }
  }

  private async fetchObject(bucket: R2BucketLike, bucketKey: string): Promise<Entry | null> {
    const object = await bucket.get(bucketKey);
    if (!hasBody(object)) return null;
    return {
      body: pack(new Uint8Array(await object.arrayBuffer())),
      etag: object.etag,
      contentType: object.httpMetadata?.contentType,
    };
  }

  private async listAll(prefix: string): Promise<string[]> {
    const keys: string[] = [];
    let cursor: string | undefined;
    do {
      const page = await this.content.list({ prefix, cursor, limit: 1000 });
      for (const object of page.objects) keys.push(object.key);
      cursor = page.truncated ? page.cursor : undefined;
    } while (cursor);
    return keys;
  }

  /** One manifest read per isolate, even when several groups hydrate at once. */
  private loadManifest(group: EditionGroup): Promise<ContentManifest> {
    if (this.manifest) return Promise.resolve(this.manifest);
    if (!this.manifestLoad) {
      this.manifestLoad = this.readManifest(group).finally(() => {
        this.manifestLoad = null;
      });
    }
    return this.manifestLoad;
  }

  private async readManifest(group: EditionGroup): Promise<ContentManifest> {
    const entry = await this.fetchObject(this.content, MANIFEST_KEY);
    if (!entry) throw new StorageHydrationError(group, `${MANIFEST_KEY} is missing; the bucket has not been seeded`);
    let parsed: ContentManifest;
    try {
      parsed = JSON.parse(decoder.decode(unpack(entry.body))) as ContentManifest;
    } catch (error) {
      throw new StorageHydrationError(group, `${MANIFEST_KEY} is not valid JSON`, { cause: error });
    }
    if (parsed.version !== 1 || !Array.isArray(parsed.keys)) {
      throw new StorageHydrationError(group, `${MANIFEST_KEY} has an unsupported shape`);
    }
    this.manifest = parsed;
    return parsed;
  }

  /** Record the version document once so the first check does not look like "everything changed". */
  private baselineVersion(): Promise<void> {
    if (this.versionBaselined) return Promise.resolve();
    if (!this.versionBaseline) {
      this.versionBaseline = this.readVersionBaseline().finally(() => {
        this.versionBaseline = null;
      });
    }
    return this.versionBaseline;
  }

  private async readVersionBaseline() {
    const object = await this.content.get(VERSION_KEY);
    if (hasBody(object)) {
      this.versionDocument = JSON.parse(decoder.decode(new Uint8Array(await object.arrayBuffer()))) as VersionDocument;
      this.versionEtag = object.etag;
    }
    this.versionBaselined = true;
  }

  private loadAssets(group: EditionGroup): Promise<void> {
    if (this.assetsLoaded || this.assetKeys.size === 0) return Promise.resolve();
    if (!this.assetsLoad) {
      this.assetsLoad = this.readAssets(group).finally(() => {
        this.assetsLoad = null;
      });
    }
    return this.assetsLoad;
  }

  private async readAssets(group: EditionGroup) {
    if (!this.assets) throw new StorageHydrationError(group, "asset keys configured without an assets binding");
    for (const [key, path] of this.assetKeys) {
      const response = await this.assets.fetch(new URL(path, "https://assets.invalid").toString());
      if (!response.ok) throw new StorageHydrationError(group, `asset ${path} → ${response.status}`);
      const bytes = new Uint8Array(await response.arrayBuffer());
      const entry: Entry = { body: pack(bytes), etag: response.headers.get("etag") ?? `asset:${bytes.byteLength}` };
      this.entries.set(key, entry);
      this.committed.set(key, entry);
    }
    this.assetsLoaded = true;
  }

  private async hydrate(group: EditionGroup) {
    const layout = GROUP_LAYOUT[group];
    let manifest: ContentManifest;
    try {
      manifest = await this.loadManifest(group);
      await this.baselineVersion();
      await this.loadAssets(group);
    } catch (error) {
      if (error instanceof StorageHydrationError) throw error;
      throw new StorageHydrationError(group, "bucket unreachable", { cause: error });
    }

    let keys: string[];
    try {
      const listed = (await Promise.all(layout.prefixes.map((prefix) => this.listAll(prefix)))).flat();
      keys = [...new Set([...layout.keys, ...listed])];
    } catch (error) {
      throw new StorageHydrationError(group, "listing the bucket failed", { cause: error });
    }

    const required = manifest.keys.filter((key) => groupForKey(key) === group);
    const listedSet = new Set(keys);
    const unlisted = required.filter((key) => !listedSet.has(key));
    if (unlisted.length > 0) {
      throw new StorageHydrationError(group, `${unlisted.length} manifest key(s) missing from the bucket, e.g. ${unlisted[0]}`);
    }

    let fetched: (Entry | null)[];
    try {
      fetched = await mapLimit(keys, this.concurrency, (key) => this.fetchObject(this.content, key));
    } catch (error) {
      throw new StorageHydrationError(group, "reading objects failed", { cause: error });
    }

    const next = new Map<string, Entry>();
    keys.forEach((key, index) => {
      const entry = fetched[index];
      if (entry) next.set(key, entry);
    });
    const unreadable = required.filter((key) => !next.has(key));
    if (unreadable.length > 0) {
      throw new StorageHydrationError(group, `${unreadable.length} manifest key(s) could not be read, e.g. ${unreadable[0]}`);
    }

    // Swap the group's keys; synchronous readers see either the old or the new set.
    const wasHydrated = this.hydrated.has(group);
    const replaced: string[] = [];
    for (const key of [...this.committed.keys()]) {
      if (groupForKey(key) === group && !next.has(key) && !this.queues.has(key)) {
        this.committed.delete(key);
        this.entries.delete(key);
        replaced.push(key);
      }
    }
    for (const [key, entry] of next) {
      if (this.queues.has(key)) continue; // a local write is in flight; keep the optimistic copy
      const current = this.committed.get(key);
      if (!current || current.etag !== entry.etag) {
        this.committed.set(key, entry);
        this.entries.set(key, entry);
        if (current) replaced.push(key);
      }
    }
    this.hydrated.add(group);
    if (wasHydrated) for (const key of replaced) notifyContentReplaced(key);
  }
}

import { createHash } from "node:crypto";
import { deflateRawSync, inflateRawSync } from "node:zlib";
import { formatPublicContentGeneration, type EditionGroup } from "@/lib/storage/r2";

/**
 * Packed public editions for the isolated preview Worker. `src/worker.ts`
 * does not import this module. Production and staging still hydrate one R2
 * object per content key. `src/worker-preview.ts` is the only entry that
 * loads these packs, and only from the `gaf-content-preview` bucket.
 *
 * The bytes inside a pack are the file bytes, so a reader sees the same
 * content the loose objects hold. The manifest names every pack; hydration
 * follows that list instead of assuming a fixed set of editions.
 */

export const PACK_FORMAT = "gaf-edition-pack-v1";
const MAGIC = [0x47, 0x41, 0x46, 0x50]; // GAFP

export type EditionFile = { key: string; bytes: Uint8Array };

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function packEdition(files: readonly EditionFile[]): Uint8Array {
  const sorted = [...files].sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
  let size = 4 + 1 + 4;
  const encoded = sorted.map((file) => {
    const key = encoder.encode(file.key);
    if (key.byteLength > 0xffff) throw new Error(`edition key is too long: ${file.key}`);
    size += 2 + key.byteLength + 4 + file.bytes.byteLength;
    return key;
  });
  const raw = new Uint8Array(size);
  const view = new DataView(raw.buffer);
  raw.set(MAGIC, 0);
  raw[4] = 1;
  view.setUint32(5, sorted.length);
  let offset = 9;
  sorted.forEach((file, index) => {
    const key = encoded[index];
    view.setUint16(offset, key.byteLength);
    offset += 2;
    raw.set(key, offset);
    offset += key.byteLength;
    view.setUint32(offset, file.bytes.byteLength);
    offset += 4;
    raw.set(file.bytes, offset);
    offset += file.bytes.byteLength;
  });
  return deflateRawSync(raw);
}

export function unpackEdition(packed: Uint8Array): EditionFile[] {
  const raw = inflateRawSync(packed);
  if (raw.byteLength < 9 || raw[0] !== MAGIC[0] || raw[1] !== MAGIC[1] || raw[2] !== MAGIC[2] || raw[3] !== MAGIC[3]) {
    throw new Error("edition pack magic mismatch");
  }
  if (raw[4] !== 1) throw new Error(`edition pack version ${raw[4]} is not supported`);
  const view = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);
  const count = view.getUint32(5);
  const files: EditionFile[] = [];
  let offset = 9;
  for (let index = 0; index < count; index += 1) {
    const keyLength = view.getUint16(offset);
    offset += 2;
    const key = decoder.decode(raw.subarray(offset, offset + keyLength));
    offset += keyLength;
    const bodyLength = view.getUint32(offset);
    offset += 4;
    const bytes = raw.subarray(offset, offset + bodyLength);
    offset += bodyLength;
    files.push({ key, bytes: new Uint8Array(bytes) });
  }
  if (offset !== raw.byteLength) throw new Error("edition pack length mismatch");
  return files;
}

/** Manifest format written for the preview bucket. Production manifests stay `{ version: 1, keys }`. */
export const PREVIEW_PACK_FORMAT = "gaf-content-packs-v1";
/** The only R2 bucket a preview pack may name. */
export const PREVIEW_BUCKET_NAME = "gaf-content-preview";
/** Wrangler binding for the preview content bucket. The bucket name, not a second binding, keeps it off production. */
export const PREVIEW_BUCKET_BINDING = "CONTENT";
/** The only static bucket the preview Worker may bind, under the existing STATIC name. */
export const PREVIEW_STATIC_BUCKET_NAME = "gaf-static-preview";
export const PREVIEW_STATIC_BINDING = "STATIC";
export const PREVIEW_WORKER_NAME = "gaf-healthcare-preview";
/** Env value that arms packed hydration. Any other value keeps the loose path. */
export const PREVIEW_CONTENT_MODE = "preview";
export const PREVIEW_MANIFEST_KEY = "content/.manifest.json";
export const PREVIEW_VERSION_KEY = "content/.version.json";

const FORBIDDEN_BUCKET_NAMES = [
  "gaf-content-production",
  "gaf-content-staging",
  "gaf-static-production",
  "gaf-static-staging",
];

export type PreviewPackFile = { key: string; bytes: number; sha256: string };

export type PreviewPackRecord = {
  id: string;
  objectKey: string;
  /** Stamp shared with `version.groups[id]`. Packs move independently. */
  stamp: string;
  fileCount: number;
  rawBytes: number;
  packBytes: number;
  sha256: string;
  files: PreviewPackFile[];
};

export type PreviewPackManifest = {
  format: typeof PREVIEW_PACK_FORMAT;
  generatedAt: string;
  stamp: string;
  generation: string;
  packs: PreviewPackRecord[];
  keys: string[];
};

export type PreviewVersionDocument = {
  groups: Record<string, string>;
  updatedAt: string;
  source: typeof PREVIEW_BUCKET_NAME;
};

export class PreviewPackError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PreviewPackError";
  }
}

export function sha256Hex(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

export function packObjectKey(id: string): string {
  if (!/^[a-z][a-z0-9-]{0,31}$/.test(id)) throw new PreviewPackError(`preview pack id "${id}" is not a safe object name`);
  return `content/.packs/${id}.pack`;
}

export type PreviewWranglerConfig = {
  name?: string;
  r2_buckets?: { binding?: string; bucket_name?: string }[];
  vars?: Record<string, unknown>;
  routes?: unknown;
  route?: unknown;
  custom_domain?: unknown;
};

/**
 * Refuse every target that is not the isolated preview Worker, its content
 * pack bucket, and its static bucket. There is no default config.
 */
export function assertPreviewTarget(config: PreviewWranglerConfig): void {
  const errors: string[] = [];
  if (config.name !== PREVIEW_WORKER_NAME) errors.push(`worker name must be ${PREVIEW_WORKER_NAME}`);
  if (config.routes || config.route || config.custom_domain) errors.push("preview config must not set routes or a custom domain");
  const vars = config.vars ?? {};
  if (vars.GAF_CONTENT_PACK !== PREVIEW_CONTENT_MODE) errors.push('GAF_CONTENT_PACK must be "preview"');
  if (vars.GAF_PREVIEW_BUCKET !== PREVIEW_BUCKET_NAME) errors.push(`GAF_PREVIEW_BUCKET must be ${PREVIEW_BUCKET_NAME}`);
  if (vars.GAF_PREVIEW_STATIC_BUCKET !== PREVIEW_STATIC_BUCKET_NAME) {
    errors.push(`GAF_PREVIEW_STATIC_BUCKET must be ${PREVIEW_STATIC_BUCKET_NAME}`);
  }
  if (vars.GAF_STORAGE !== "r2") errors.push('GAF_STORAGE must be "r2"');
  const buckets = config.r2_buckets ?? [];
  const content = buckets.filter((bucket) => bucket.binding === PREVIEW_BUCKET_BINDING);
  const staticBuckets = buckets.filter((bucket) => bucket.binding === PREVIEW_STATIC_BINDING);
  if (buckets.length !== 2 || content.length !== 1 || staticBuckets.length !== 1) {
    errors.push("preview config must bind exactly CONTENT and STATIC");
  }
  if (content[0]?.bucket_name !== PREVIEW_BUCKET_NAME) {
    errors.push(`CONTENT binding must be ${PREVIEW_BUCKET_NAME}`);
  }
  if (staticBuckets[0]?.bucket_name !== PREVIEW_STATIC_BUCKET_NAME) {
    errors.push(`STATIC binding must be ${PREVIEW_STATIC_BUCKET_NAME}`);
  }
  const mentioned = JSON.stringify(config);
  for (const name of FORBIDDEN_BUCKET_NAMES) {
    if (mentioned.includes(name)) errors.push(`refusing forbidden bucket ${name}`);
  }
  if (mentioned.includes("gaf-healthcare-production") || mentioned.includes("gaf-healthcare-staging")) {
    errors.push("refusing a config that names the production or staging Worker");
  }
  if (errors.length > 0) throw new PreviewPackError(errors.join("; "));
}

function isBucket(value: unknown): boolean {
  return Boolean(value) && typeof value === "object" && typeof (value as { get?: unknown }).get === "function";
}

export function assertPreviewRuntime(env: {
  GAF_CONTENT_PACK?: unknown;
  GAF_PREVIEW_BUCKET?: unknown;
  GAF_PREVIEW_STATIC_BUCKET?: unknown;
  CONTENT?: unknown;
  STATIC?: unknown;
  NEXT_INC_CACHE_R2_BUCKET?: unknown;
  [binding: string]: unknown;
}): void {
  const errors: string[] = [];
  if (env.GAF_CONTENT_PACK !== PREVIEW_CONTENT_MODE) errors.push('GAF_CONTENT_PACK must be "preview"');
  if (env.GAF_PREVIEW_BUCKET !== PREVIEW_BUCKET_NAME) errors.push(`GAF_PREVIEW_BUCKET must be ${PREVIEW_BUCKET_NAME}`);
  if (env.GAF_PREVIEW_STATIC_BUCKET !== PREVIEW_STATIC_BUCKET_NAME) {
    errors.push(`GAF_PREVIEW_STATIC_BUCKET must be ${PREVIEW_STATIC_BUCKET_NAME}`);
  }
  if (!isBucket(env.CONTENT)) errors.push("binding CONTENT is missing");
  if (!isBucket(env.STATIC)) errors.push("binding STATIC is missing");
  if (env.NEXT_INC_CACHE_R2_BUCKET) errors.push("refusing inherited NEXT_INC_CACHE_R2_BUCKET binding");
  if (errors.length > 0) throw new PreviewPackError(`preview pack environment: ${errors.join("; ")}`);
}

function fileRecord(file: EditionFile): PreviewPackFile {
  return { key: file.key, bytes: file.bytes.byteLength, sha256: sha256Hex(file.bytes) };
}

function generationFor(groups: Record<string, string>): string {
  return formatPublicContentGeneration({ groups: groups as Partial<Record<EditionGroup, string>>, updatedAt: "" });
}

/**
 * Build one deflated pack per non-empty group. Empty groups are omitted so
 * the manifest, not a fixed edition list, is the layout.
 */
export function buildPreviewPacks(input: {
  groups: ReadonlyMap<string, readonly EditionFile[]>;
  stamp: string;
  generatedAt: string;
}): {
  manifest: PreviewPackManifest;
  version: PreviewVersionDocument;
  objects: Map<string, Uint8Array>;
  rawBytes: number;
  packBytes: number;
  fileCount: number;
} {
  if (!input.stamp) throw new PreviewPackError("preview pack stamp is empty");
  const packs: PreviewPackRecord[] = [];
  const objects = new Map<string, Uint8Array>();
  const keys: string[] = [];
  let rawBytes = 0;
  let packBytes = 0;
  let fileCount = 0;
  const ids = [...input.groups.keys()].filter((id) => (input.groups.get(id)?.length ?? 0) > 0).sort();
  for (const id of ids) {
    const files = input.groups.get(id) ?? [];
    const packed = packEdition(files);
    const roundTrip = unpackEdition(packed);
    if (roundTrip.length !== files.length) throw new PreviewPackError(`preview pack ${id} round-trip count mismatch`);
    const byKey = new Map(files.map((file) => [file.key, file.bytes]));
    for (const file of roundTrip) {
      const source = byKey.get(file.key);
      if (!source || source.byteLength !== file.bytes.byteLength || sha256Hex(source) !== sha256Hex(file.bytes)) {
        throw new PreviewPackError(`preview pack ${id} round-trip mismatch for ${file.key}`);
      }
    }
    const recordFiles = [...files].sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0)).map(fileRecord);
    const raw = recordFiles.reduce((total, file) => total + file.bytes, 0);
    const record: PreviewPackRecord = {
      id,
      objectKey: packObjectKey(id),
      stamp: input.stamp,
      fileCount: recordFiles.length,
      rawBytes: raw,
      packBytes: packed.byteLength,
      sha256: sha256Hex(packed),
      files: recordFiles,
    };
    packs.push(record);
    objects.set(record.objectKey, packed);
    for (const file of recordFiles) keys.push(file.key);
    rawBytes += raw;
    packBytes += packed.byteLength;
    fileCount += recordFiles.length;
  }
  keys.sort();
  const groups: Record<string, string> = {};
  for (const pack of packs) groups[pack.id] = input.stamp;
  const version: PreviewVersionDocument = {
    groups,
    updatedAt: input.generatedAt,
    source: PREVIEW_BUCKET_NAME,
  };
  const manifest: PreviewPackManifest = {
    format: PREVIEW_PACK_FORMAT,
    generatedAt: input.generatedAt,
    stamp: input.stamp,
    generation: generationFor(groups),
    packs,
    keys,
  };
  const encoder = new TextEncoder();
  objects.set(PREVIEW_MANIFEST_KEY, encoder.encode(`${JSON.stringify(manifest, null, 2)}\n`));
  objects.set(PREVIEW_VERSION_KEY, encoder.encode(`${JSON.stringify(version, null, 2)}\n`));
  const checked = validatePreviewPack({
    manifestBytes: objects.get(PREVIEW_MANIFEST_KEY)!,
    versionBytes: objects.get(PREVIEW_VERSION_KEY)!,
    packBytes: objects,
  });
  if (checked.files.size !== fileCount) throw new PreviewPackError("preview pack self-check file count mismatch");
  return { manifest, version, objects, rawBytes, packBytes, fileCount };
}

function asRecord(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new PreviewPackError(`${label} is not an object`);
  return value as Record<string, unknown>;
}

/**
 * Inflate every pack named by the manifest and refuse the snapshot unless
 * checksums, file counts, paths, and the version stamp all agree.
 * `packBytes` must contain the manifest's pack objects. Extra keys are ignored
 * so a caller can pass the manifest and version objects in the same map.
 */
export function validatePreviewPack(input: {
  manifestBytes: Uint8Array;
  versionBytes: Uint8Array;
  packBytes: ReadonlyMap<string, Uint8Array>;
}): {
  files: Map<string, Uint8Array>;
  manifest: PreviewPackManifest;
  version: PreviewVersionDocument;
  inflateMs: number;
} {
  let manifest: PreviewPackManifest;
  let version: PreviewVersionDocument;
  try {
    manifest = JSON.parse(new TextDecoder().decode(input.manifestBytes)) as PreviewPackManifest;
    version = JSON.parse(new TextDecoder().decode(input.versionBytes)) as PreviewVersionDocument;
  } catch (error) {
    throw new PreviewPackError(`preview pack metadata is not JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
  if (manifest.format !== PREVIEW_PACK_FORMAT) {
    throw new PreviewPackError(`preview pack manifest format "${String(manifest.format)}" is not ${PREVIEW_PACK_FORMAT}`);
  }
  if (!manifest.stamp || typeof manifest.stamp !== "string") throw new PreviewPackError("preview pack manifest stamp is missing");
  if (!Array.isArray(manifest.packs) || !Array.isArray(manifest.keys)) {
    throw new PreviewPackError("preview pack manifest layout is incomplete");
  }
  const versionRecord = asRecord(version, "preview version document");
  if (versionRecord.source !== PREVIEW_BUCKET_NAME) {
    throw new PreviewPackError("preview version document is not marked for gaf-content-preview");
  }
  const groups = asRecord(version.groups, "preview version groups");
  const groupIds = Object.keys(groups).sort();
  const packIds = manifest.packs.map((pack) => pack.id).sort();
  if (groupIds.join("\n") !== packIds.join("\n")) {
    throw new PreviewPackError("preview version groups do not match the pack layout");
  }
  for (const id of groupIds) {
    const pack = manifest.packs.find((candidate) => candidate.id === id);
    if (!pack || groups[id] !== pack.stamp) {
      throw new PreviewPackError(`preview pack ${id} stamp does not match the version document`);
    }
  }
  if (manifest.generation !== generationFor(version.groups)) {
    throw new PreviewPackError("preview pack generation does not match the version document");
  }

  const files = new Map<string, Uint8Array>();
  const seenObjects = new Set<string>();
  let inflateMs = 0;
  for (const pack of manifest.packs) {
    if (seenObjects.has(pack.objectKey)) throw new PreviewPackError(`preview pack object ${pack.objectKey} is repeated`);
    seenObjects.add(pack.objectKey);
    if (pack.objectKey !== packObjectKey(pack.id)) throw new PreviewPackError(`preview pack ${pack.id} object key is not the layout key`);
    const packed = input.packBytes.get(pack.objectKey);
    if (!packed) throw new PreviewPackError(`preview pack object ${pack.objectKey} is missing`);
    if (sha256Hex(packed) !== pack.sha256) throw new PreviewPackError(`preview pack ${pack.id} checksum mismatch`);
    if (packed.byteLength !== pack.packBytes) throw new PreviewPackError(`preview pack ${pack.id} compressed size mismatch`);
    let unpacked: EditionFile[];
    const started = performance.now();
    try {
      unpacked = unpackEdition(packed);
    } catch (error) {
      throw new PreviewPackError(
        `preview pack ${pack.id} is corrupt: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
    inflateMs += performance.now() - started;
    if (unpacked.length !== pack.fileCount || unpacked.length !== pack.files.length) {
      throw new PreviewPackError(`preview pack ${pack.id} file count mismatch`);
    }
    const expected = [...pack.files].sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
    const actual = [...unpacked].sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
    let raw = 0;
    for (let index = 0; index < expected.length; index += 1) {
      const want = expected[index];
      const got = actual[index];
      if (!got || got.key !== want.key) throw new PreviewPackError(`preview pack ${pack.id} path mismatch at ${want.key}`);
      if (got.bytes.byteLength !== want.bytes || sha256Hex(got.bytes) !== want.sha256) {
        throw new PreviewPackError(`preview pack ${pack.id} file checksum mismatch for ${want.key}`);
      }
      if (files.has(got.key)) throw new PreviewPackError(`preview pack path ${got.key} is in more than one pack`);
      files.set(got.key, new Uint8Array(got.bytes));
      raw += got.bytes.byteLength;
    }
    if (raw !== pack.rawBytes) throw new PreviewPackError(`preview pack ${pack.id} raw size mismatch`);
  }
  const listed = [...files.keys()].sort();
  const declared = [...manifest.keys].sort();
  if (listed.join("\n") !== declared.join("\n")) throw new PreviewPackError("preview pack manifest keys do not match the files inside the packs");
  return { files, manifest, version, inflateMs };
}

/** In-process preview. It serves packed files and does not talk to R2. */
export function createPackedPreviewWorker(packs: ReadonlyMap<string, Uint8Array>) {
  const files = new Map<string, Uint8Array>();
  for (const packed of packs.values()) {
    for (const file of unpackEdition(packed)) files.set(file.key, file.bytes);
  }
  return {
    fileCount: files.size,
    async fetch(request: Request): Promise<Response> {
      const key = new URL(request.url).searchParams.get("key");
      if (!key) return new Response("missing key", { status: 400 });
      const bytes = files.get(key);
      if (!bytes) return new Response("Not Found", { status: 404, headers: { "cache-control": "no-store" } });
      return new Response(bytes.slice(), {
        status: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "content-length": String(bytes.byteLength),
          "x-gaf-pack-preview": "1",
        },
      });
    },
  };
}

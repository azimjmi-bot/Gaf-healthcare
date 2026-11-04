import { deflateRawSync, inflateRawSync } from "node:zlib";

/**
 * Preview-only pack of one public edition. The production Worker does not
 * import this module and still hydrates one R2 object per content key.
 *
 * A cold public request today lists the bucket and gets every key. One pack
 * per edition replaces those gets. The bytes inside the pack are the file
 * bytes, so a reader sees the same content the loose objects hold.
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

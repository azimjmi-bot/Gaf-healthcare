import { deflateRawSync, inflateRawSync } from "node:zlib";

const MAGIC = [0x47, 0x41, 0x46, 0x43]; // "GAFC"

/**
 * One deflated JSON document per article, with a slug index in front.
 * The Worker keeps this container (a few megabytes) and inflates only the
 * article a request asked for.
 */
export function encodeCostArticlePack(articles: Record<string, unknown>): Uint8Array {
  const encoder = new TextEncoder();
  const blobs = Object.entries(articles).map(([slug, article]) => ({
    name: encoder.encode(slug),
    body: deflateRawSync(encoder.encode(JSON.stringify(article))),
  }));
  let size = 8;
  for (const blob of blobs) size += 2 + blob.name.length + 4 + blob.body.length;
  const out = new Uint8Array(size);
  const view = new DataView(out.buffer);
  out.set(MAGIC, 0);
  view.setUint32(4, blobs.length);
  let offset = 8;
  for (const blob of blobs) {
    view.setUint16(offset, blob.name.length);
    offset += 2;
    out.set(blob.name, offset);
    offset += blob.name.length;
    view.setUint32(offset, blob.body.length);
    offset += 4;
    out.set(blob.body, offset);
    offset += blob.body.length;
  }
  return out;
}

/** Slug to the deflated-JSON span. A file without the magic header yields nothing. */
export function indexCostArticlePack(bytes: Uint8Array): Map<string, [number, number]> {
  const spans = new Map<string, [number, number]>();
  if (bytes.length < 8 || MAGIC.some((byte, index) => bytes[index] !== byte)) return spans;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const count = view.getUint32(4);
  const decoder = new TextDecoder();
  let offset = 8;
  for (let i = 0; i < count; i += 1) {
    if (offset + 2 > bytes.length) return new Map();
    const nameLength = view.getUint16(offset);
    offset += 2;
    if (offset + nameLength + 4 > bytes.length) return new Map();
    const slug = decoder.decode(bytes.subarray(offset, offset + nameLength));
    offset += nameLength;
    const bodyLength = view.getUint32(offset);
    offset += 4;
    if (offset + bodyLength > bytes.length) return new Map();
    spans.set(slug, [offset, offset + bodyLength]);
    offset += bodyLength;
  }
  return spans;
}

export function inflatePackedArticle(bytes: Uint8Array, span: [number, number]): unknown {
  const json = new TextDecoder().decode(inflateRawSync(bytes.subarray(span[0], span[1])));
  return JSON.parse(json);
}

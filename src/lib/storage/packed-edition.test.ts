import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { test } from "node:test";
import { GROUP_LAYOUT, groupForKey, type EditionGroup } from "@/lib/storage/r2";
import { createPackedPreviewWorker, packEdition, unpackEdition, type EditionFile } from "@/lib/storage/packed-edition";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const PUBLIC_GROUPS = ["en", "ar", "fr", "ru", "sw"] as const;

function walk(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".")) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else if (entry.endsWith(".json")) found.push(full);
  }
  return found;
}

test("a packed preview serves the same bytes as the loose content files", async () => {
  const byGroup = new Map<EditionGroup, EditionFile[]>();
  for (const group of PUBLIC_GROUPS) byGroup.set(group, []);
  let rawBytes = 0;
  for (const full of walk(CONTENT_ROOT)) {
    const key = path.relative(CONTENT_ROOT, full).split(path.sep).join("/");
    const storageKey = `content/${key}`;
    const group = groupForKey(storageKey);
    if (!group || group === "cms") continue;
    const bytes = new Uint8Array(readFileSync(full));
    rawBytes += bytes.byteLength;
    byGroup.get(group)?.push({ key: storageKey, bytes });
  }

  const packs = new Map<string, Uint8Array>();
  let packBytes = 0;
  const packStarted = performance.now();
  for (const [group, files] of byGroup) {
    const packed = packEdition(files);
    packs.set(group, packed);
    packBytes += packed.byteLength;
    const roundTrip = unpackEdition(packed);
    assert.equal(roundTrip.length, files.length, group);
    const original = new Map(files.map((file) => [file.key, file.bytes]));
    for (const file of roundTrip) {
      const source = original.get(file.key);
      assert.ok(source, file.key);
      assert.equal(file.bytes.byteLength, source.byteLength, file.key);
      assert.equal(Buffer.compare(file.bytes, source), 0, file.key);
    }
  }
  const packMs = performance.now() - packStarted;

  const preview = createPackedPreviewWorker(packs);
  const unpackStarted = performance.now();
  let compared = 0;
  for (const files of byGroup.values()) {
    for (const file of files) {
      const response = await preview.fetch(new Request(`https://preview.gaf.invalid/content?key=${encodeURIComponent(file.key)}`));
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("x-gaf-pack-preview"), "1");
      const served = new Uint8Array(await response.arrayBuffer());
      assert.equal(Buffer.compare(served, file.bytes), 0, file.key);
      compared += 1;
    }
  }
  const previewMs = performance.now() - unpackStarted;

  const fileGets = [...byGroup.values()].reduce((total, files) => total + files.length, 0);
  const listCalls = PUBLIC_GROUPS.reduce((total, group) => total + GROUP_LAYOUT[group].prefixes.length, 0);
  const looseReads = 1 + 1 + listCalls + fileGets + 3;
  const packedReads = PUBLIC_GROUPS.length + 1 + 3;
  assert.ok(packedReads < looseReads);
  assert.equal(compared, fileGets);
  assert.equal(preview.fileCount, fileGets);

  const measurement = {
    files: fileGets,
    rawBytes,
    packBytes,
    packMs: Math.round(packMs),
    previewServeMs: Math.round(previewMs),
    looseColdReads: looseReads,
    packedColdReads: packedReads,
    note: "Read counts are derived from R2ContentStorage.hydrate, not a live R2 trace. packMs and previewServeMs are local CPU and copy time. No production bucket was read.",
  };
  console.log(JSON.stringify(measurement));
  const missing = await preview.fetch(new Request("https://preview.gaf.invalid/content?key=content/ai-generations.json"));
  assert.equal(missing.status, 404);
});

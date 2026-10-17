import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, utimesSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { invalidateCachedJsonFile, readCachedJsonFile } from "@/lib/cms/json-file-cache";

function tempStore(contents: string) {
  const dir = mkdtempSync(join(tmpdir(), "gaf-json-cache-"));
  const path = join(dir, "store.json");
  writeFileSync(path, contents);
  return { dir, path };
}

test("readCachedJsonFile parses once while the file is unchanged", () => {
  const { dir, path } = tempStore('{"n":1}');
  try {
    let loads = 0;
    const load = () => {
      loads += 1;
      return JSON.parse(readFileSync(path, "utf8")) as { n: number };
    };
    const first = readCachedJsonFile(path, load);
    const second = readCachedJsonFile(path, load);
    assert.equal(loads, 1);
    assert.equal(first, second);
    assert.equal(first.n, 1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("readCachedJsonFile re-reads when the file changes on disk", () => {
  const { dir, path } = tempStore('{"n":1}');
  try {
    const load = () => JSON.parse(readFileSync(path, "utf8")) as { n: number };
    assert.equal(readCachedJsonFile(path, load).n, 1);
    writeFileSync(path, '{"n":2,"padding":"changes the size"}');
    assert.equal(readCachedJsonFile(path, load).n, 2);
    // Same size, newer mtime: a save from another process that only edits text.
    writeFileSync(path, '{"n":3,"padding":"changes the size"}');
    const later = new Date(Date.now() + 5_000);
    utimesSync(path, later, later);
    assert.equal(readCachedJsonFile(path, load).n, 3);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("invalidateCachedJsonFile forces the next read to parse again", () => {
  const { dir, path } = tempStore('{"n":1}');
  try {
    let loads = 0;
    const load = () => {
      loads += 1;
      return { n: loads };
    };
    readCachedJsonFile(path, load);
    readCachedJsonFile(path, load);
    assert.equal(loads, 1);
    invalidateCachedJsonFile(path);
    assert.equal(readCachedJsonFile(path, load).n, 2);
    assert.equal(loads, 2);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

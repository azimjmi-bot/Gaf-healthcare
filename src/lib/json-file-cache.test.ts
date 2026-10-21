import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, utimesSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, test } from "node:test";
import { clearCachedJsonFiles, invalidateCachedJsonFile, readCachedJsonFile } from "@/lib/cms/json-file-cache";
import { FsContentStorage } from "@/lib/storage/fs";
import { setContentStorage } from "@/lib/storage";

const KEY = "content/store.json";

/** A temp root with the file-system backend pointed at it, as production is at the checkout. */
function tempStore(contents: string) {
  const dir = mkdtempSync(join(tmpdir(), "gaf-json-cache-"));
  const path = join(dir, KEY);
  mkdirSync(join(dir, "content"));
  writeFileSync(path, contents);
  setContentStorage(new FsContentStorage(dir));
  clearCachedJsonFiles();
  return { dir, path };
}

afterEach(() => {
  setContentStorage(undefined);
  clearCachedJsonFiles();
});

test("readCachedJsonFile parses once while the file is unchanged", () => {
  const { dir, path } = tempStore('{"n":1}');
  try {
    let loads = 0;
    const load = () => {
      loads += 1;
      return JSON.parse(readFileSync(path, "utf8")) as { n: number };
    };
    const first = readCachedJsonFile(KEY, load);
    const second = readCachedJsonFile(KEY, load);
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
    assert.equal(readCachedJsonFile(KEY, load).n, 1);
    writeFileSync(path, '{"n":2,"padding":"changes the size"}');
    assert.equal(readCachedJsonFile(KEY, load).n, 2);
    // Same size, newer mtime: a save from another process that only edits text.
    writeFileSync(path, '{"n":3,"padding":"changes the size"}');
    const later = new Date(Date.now() + 5_000);
    utimesSync(path, later, later);
    assert.equal(readCachedJsonFile(KEY, load).n, 3);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("readCachedJsonFile treats a missing key as its own version and notices when it appears", () => {
  const { dir, path } = tempStore('{"n":1}');
  try {
    rmSync(path);
    let loads = 0;
    const load = () => {
      loads += 1;
      return { n: loads };
    };
    assert.equal(readCachedJsonFile(KEY, load).n, 1);
    assert.equal(readCachedJsonFile(KEY, load).n, 1, "a missing file is cached as missing, not re-parsed every read");
    writeFileSync(path, '{"n":9}');
    assert.equal(readCachedJsonFile(KEY, load).n, 2, "the file appearing is a version change");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("invalidateCachedJsonFile forces the next read to parse again", () => {
  const { dir } = tempStore('{"n":1}');
  try {
    let loads = 0;
    const load = () => {
      loads += 1;
      return { n: loads };
    };
    readCachedJsonFile(KEY, load);
    readCachedJsonFile(KEY, load);
    assert.equal(loads, 1);
    invalidateCachedJsonFile(KEY);
    assert.equal(readCachedJsonFile(KEY, load).n, 2);
    assert.equal(loads, 2);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

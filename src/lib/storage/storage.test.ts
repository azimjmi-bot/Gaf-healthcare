import assert from "node:assert/strict";
import { mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { FsContentStorage } from "@/lib/storage/fs";
import { MemoryContentStorage } from "@/lib/storage/memory";
import { contentStorage, setContentStorage } from "@/lib/storage";
import { exerciseBackend } from "@/lib/storage/backend-contract";
import { normaliseKey, StorageKeyError } from "@/lib/storage/types";

function tempRoot() {
  const dir = mkdtempSync(path.join(os.tmpdir(), "gaf-storage-"));
  return { dir, cleanup: () => rmSync(dir, { recursive: true, force: true }) };
}

test("the file-system and memory backends behave identically", async () => {
  const { dir, cleanup } = tempRoot();
  try {
    await exerciseBackend(new FsContentStorage(dir));
    await exerciseBackend(new MemoryContentStorage());
  } finally {
    cleanup();
  }
});

test("file-system writes are atomic and leave no temporary files behind", () => {
  const { dir, cleanup } = tempRoot();
  try {
    const storage = new FsContentStorage(dir);
    storage.write("content/deep/er/cms.json", "one");
    storage.write("content/deep/er/cms.json", "two");
    assert.deepEqual(readdirSync(path.join(dir, "content/deep/er")), ["cms.json"]);
    assert.equal(storage.read("content/deep/er/cms.json"), "two");
  } finally {
    cleanup();
  }
});

test("file-system version changes when the file is replaced out of process", () => {
  const { dir, cleanup } = tempRoot();
  try {
    const storage = new FsContentStorage(dir);
    storage.write("content/cms.json", "short");
    const before = storage.version("content/cms.json");
    // A deploy or another process writing the file directly.
    writeFileSync(path.join(dir, "content/cms.json"), "a longer body");
    assert.notEqual(storage.version("content/cms.json"), before);
  } finally {
    cleanup();
  }
});

test("a failing write throws and leaves the previous content in place", async () => {
  const storage = new MemoryContentStorage({ "content/cms.json": "before" });
  storage.failNextWrite(new Error("disk full"));
  assert.throws(() => storage.write("content/cms.json", "after"), /disk full/);
  assert.equal(storage.read("content/cms.json"), "before");
  storage.write("content/cms.json", "after");
  assert.equal(storage.read("content/cms.json"), "after");
  await storage.flush();
});

test("a deferred persistence failure surfaces from flush()", async () => {
  const storage = new MemoryContentStorage();
  storage.failNextFlush(new Error("bucket unavailable"));
  storage.write("content/cms.json", "x");
  await assert.rejects(storage.flush(), /bucket unavailable/);
  await storage.flush();
});

test("GAF_STORAGE selects the backend and refuses backends that do not ship yet", () => {
  const previous = process.env.GAF_STORAGE;
  try {
    delete process.env.GAF_STORAGE;
    setContentStorage(undefined);
    const fs = contentStorage();
    assert.equal(fs.kind, "fs");
    assert.equal((fs as FsContentStorage).root, process.cwd());
    assert.equal(contentStorage(), fs, "the default is created once per process");

    process.env.GAF_STORAGE = "memory";
    setContentStorage(undefined);
    assert.equal(contentStorage().kind, "memory");

    process.env.GAF_STORAGE = "r2";
    setContentStorage(undefined);
    assert.throws(() => contentStorage(), /GAF_STORAGE="r2" requires the Workers entry/);

    process.env.GAF_STORAGE = "kv";
    setContentStorage(undefined);
    assert.throws(() => contentStorage(), /GAF_STORAGE="kv" is not available/);
  } finally {
    if (previous === undefined) delete process.env.GAF_STORAGE;
    else process.env.GAF_STORAGE = previous;
    setContentStorage(undefined);
  }
});

test("normaliseKey accepts root-relative POSIX paths only", () => {
  assert.equal(normaliseKey("content/cms.json"), "content/cms.json");
  assert.equal(normaliseKey("public/uploads/articles/a-b.webp"), "public/uploads/articles/a-b.webp");
  assert.throws(() => normaliseKey("content//cms.json"), StorageKeyError);
  assert.throws(() => normaliseKey("./content/cms.json"), StorageKeyError);
});

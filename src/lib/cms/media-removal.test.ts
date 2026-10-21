import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { clearCachedJsonFiles } from "@/lib/cms/json-file-cache";
import { deleteCmsMediaRecord } from "@/lib/cms/media-removal";
import { cmsKey, loadCms, saveCms } from "@/lib/cms/store";
import type { CmsStore, MediaItem } from "@/lib/cms/types";
import { FakeR2Bucket } from "@/lib/storage/fake-r2-bucket";
import { MemoryContentStorage } from "@/lib/storage/memory";
import { MANIFEST_KEY, R2ContentStorage, type ContentManifest } from "@/lib/storage/r2";
import { flushContentWrites, setContentStorage } from "@/lib/storage";
import { normaliseKey, StorageKeyError } from "@/lib/storage/types";

function media(id: string, url: string): MediaItem {
  return { id, url, name: id, alt: "", addedAt: "2026-01-01T00:00:00.000Z" };
}

function seedStore(storage: { write(key: string, data: string): void }, rows: MediaItem[]) {
  const store: CmsStore = {
    settings: {
      defaultAuthor: "",
      postsPerPage: 12,
      blogEyebrow: "",
      blogTitle: "",
      blogLede: "",
    },
    categories: [],
    tags: [],
    media: rows,
    articles: [],
  };
  storage.write(cmsKey("en"), `${JSON.stringify(store)}\n`);
}

class RemoveFails extends MemoryContentStorage {
  override remove(key: string): void {
    normaliseKey(key);
    throw new Error("disk full");
  }
}

beforeEach(() => {
  clearCachedJsonFiles();
});

afterEach(() => {
  setContentStorage(undefined);
  clearCachedJsonFiles();
});

test("a CMS upload delete removes the object before the catalog row", async () => {
  const storage = new MemoryContentStorage();
  setContentStorage(storage);
  const url = "/uploads/articles/1700000000-scan.webp";
  storage.write(`public${url}`, new Uint8Array([1, 2, 3]));
  seedStore(storage, [media("keep", "/uploads/articles/other.webp"), media("drop", url)]);
  storage.write("public/uploads/articles/other.webp", new Uint8Array([9]));

  const result = await deleteCmsMediaRecord("en", "drop");
  await flushContentWrites();

  assert.deepEqual(result, { ok: true });
  assert.equal(storage.readBytes(`public${url}`), null);
  assert.deepEqual([...(storage.readBytes("public/uploads/articles/other.webp") ?? [])], [9]);
  assert.deepEqual(loadCms("en").media.map((item) => item.id), ["keep"]);
});

test("a missing upload still drops the catalog row", async () => {
  const storage = new MemoryContentStorage();
  setContentStorage(storage);
  seedStore(storage, [media("gone", "/uploads/articles/already-deleted.webp")]);

  const result = await deleteCmsMediaRecord("en", "gone");
  await flushContentWrites();

  assert.deepEqual(result, { ok: true });
  assert.deepEqual(loadCms("en").media, []);
});

test("an external media URL drops only the catalog row", async () => {
  const storage = new MemoryContentStorage();
  setContentStorage(storage);
  seedStore(storage, [media("ext", "https://cdn.example/photo.webp")]);

  const result = await deleteCmsMediaRecord("en", "ext");
  await flushContentWrites();

  assert.deepEqual(result, { ok: true });
  assert.deepEqual(loadCms("en").media, []);
  assert.deepEqual(storage.keys(), [cmsKey("en")]);
});

test("an upload URL with a parent segment keeps the catalog row and the object", async () => {
  const storage = new MemoryContentStorage();
  setContentStorage(storage);
  const url = "/uploads/articles/../../content/cms.json";
  seedStore(storage, [media("bad", url), media("keep", "/uploads/articles/kept.webp")]);
  storage.write("public/uploads/articles/kept.webp", new Uint8Array([4]));
  const before = storage.read(cmsKey("en"));

  await assert.rejects(deleteCmsMediaRecord("en", "bad"), (error: unknown) => {
    assert.ok(error instanceof StorageKeyError);
    return true;
  });

  assert.equal(storage.read(cmsKey("en")), before);
  assert.deepEqual(loadCms("en").media.map((item) => item.id), ["bad", "keep"]);
  assert.deepEqual([...(storage.readBytes("public/uploads/articles/kept.webp") ?? [])], [4]);
});

test("a synchronous remove failure does not save the catalog deletion", async () => {
  const storage = new RemoveFails();
  setContentStorage(storage);
  const url = "/uploads/articles/1700000000-scan.webp";
  storage.write(`public${url}`, new Uint8Array([1, 2, 3]));
  seedStore(storage, [media("drop", url)]);
  const before = storage.read(cmsKey("en"));

  await assert.rejects(deleteCmsMediaRecord("en", "drop"), /disk full/);

  assert.equal(storage.read(cmsKey("en")), before);
  assert.deepEqual([...(storage.readBytes(`public${url}`) ?? [])], [1, 2, 3]);
  assert.deepEqual(loadCms("en").media.map((item) => item.id), ["drop"]);
});

test("a failed durable delete leaves the upload and the catalog row in place", async () => {
  const content = new FakeR2Bucket();
  const manifest: ContentManifest = {
    version: 1,
    generatedAt: "2026-10-21T00:00:00.000Z",
    keys: [cmsKey("en")],
  };
  const uploads = new FakeR2Bucket();
  const storage = new R2ContentStorage({
    content,
    static: uploads,
    versionCheckIntervalMs: 0,
    log: () => {},
  });
  setContentStorage(storage);
  content.seed(MANIFEST_KEY, JSON.stringify(manifest));
  content.seed(cmsKey("en"), `${JSON.stringify({ articles: [] })}\n`);
  await storage.ensureHydrated("en");
  const url = "/uploads/articles/1700000000-scan.webp";
  storage.write(`public${url}`, new Uint8Array([7, 7]));
  saveCms({ ...loadCms("en"), media: [media("drop", url)] }, "en");
  await flushContentWrites();
  assert.deepEqual(uploads.keys(), ["uploads/articles/1700000000-scan.webp"]);

  uploads.failNext("delete", new Error("static bucket unavailable"));
  await assert.rejects(deleteCmsMediaRecord("en", "drop"), /static bucket unavailable/);

  assert.deepEqual(uploads.keys(), ["uploads/articles/1700000000-scan.webp"]);
  assert.deepEqual(loadCms("en").media.map((item) => item.id), ["drop"]);
  const stored = JSON.parse(content.text(cmsKey("en"))!) as CmsStore;
  assert.deepEqual(stored.media.map((item) => item.id), ["drop"]);
});

test("an unknown media id does not write", async () => {
  const storage = new MemoryContentStorage();
  setContentStorage(storage);
  seedStore(storage, [media("keep", "/uploads/articles/kept.webp")]);
  const before = storage.read(cmsKey("en"));

  assert.deepEqual(await deleteCmsMediaRecord("en", "missing"), { ok: false, status: 404 });
  assert.deepEqual(await deleteCmsMediaRecord("en", undefined), { ok: false, status: 404 });
  assert.equal(storage.read(cmsKey("en")), before);
});

import assert from "node:assert/strict";
import { StorageKeyError, type ContentStorage } from "@/lib/storage/types";

/**
 * The behaviour every `ContentStorage` backend must share. Test files run it
 * against each implementation so a new backend cannot drift from the
 * file-system one that production uses.
 */
export async function exerciseBackend(storage: ContentStorage) {
  assert.equal(storage.read("content/missing.json"), null);
  assert.equal(storage.readBytes("content/missing.json"), null);
  assert.equal(storage.version("content/missing.json"), null);
  assert.deepEqual(storage.list("content/nowhere"), []);
  storage.remove("content/missing.json");

  storage.write("content/cms.json", '{"a":1}\n');
  assert.equal(storage.read("content/cms.json"), '{"a":1}\n');
  const first = storage.version("content/cms.json");
  assert.ok(first);

  storage.write("content/ar/articles/b.json", '{"slug":"b"}');
  storage.write("content/ar/articles/a.json", '{"slug":"a"}');
  storage.write("content/ar/articles/notes.txt", "x");
  assert.deepEqual(storage.list("content/ar/articles"), [
    "content/ar/articles/a.json",
    "content/ar/articles/b.json",
    "content/ar/articles/notes.txt",
  ]);
  // Object stores have no directories: a prefix lists objects, not nested prefixes.
  assert.ok(
    !storage.list("content/ar").some((key) => key === "content/ar/articles" || key.startsWith("content/ar/articles/")),
    "list() reports objects directly under the prefix only",
  );

  await new Promise((resolve) => setTimeout(resolve, 5));
  storage.write("content/cms.json", '{"a":2}\n');
  assert.equal(storage.read("content/cms.json"), '{"a":2}\n');
  assert.notEqual(storage.version("content/cms.json"), first);

  const bytes = new Uint8Array([0x52, 0x49, 0x46, 0x46, 0, 255]);
  storage.write("public/uploads/articles/x.webp", bytes);
  assert.deepEqual([...(storage.readBytes("public/uploads/articles/x.webp") ?? [])], [...bytes]);

  storage.remove("content/ar/articles/notes.txt");
  assert.deepEqual(storage.list("content/ar/articles"), [
    "content/ar/articles/a.json",
    "content/ar/articles/b.json",
  ]);

  for (const bad of ["/etc/passwd", "../outside", "content/../../x", "content\\x", "", "C:/x"]) {
    assert.throws(() => storage.read(bad), StorageKeyError, bad);
    assert.throws(() => storage.write(bad, "x"), StorageKeyError, bad);
  }

  await storage.flush();
  assert.equal(storage.read("content/cms.json"), '{"a":2}\n');
  assert.ok(storage.version("content/cms.json"));
}

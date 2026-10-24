import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { arrayView, lazyArray } from "@/lib/array-view";
import { CATALOG_SEED_KEY, CatalogUnavailableError, withCatalogSeed } from "@/lib/catalog-seed";
import { setContentStorage } from "@/lib/storage";
import { MemoryContentStorage } from "@/lib/storage/memory";

const SEED = JSON.stringify({
  doctors: [{ slug: "dr-a", hospitalSlug: "h-a" }],
  hospitals: [{ slug: "h-a", name: "Hospital A" }],
});

afterEach(() => setContentStorage(undefined));

test("a missing catalog file throws; there is no empty catalog", () => {
  setContentStorage(new MemoryContentStorage());
  assert.throws(
    () => withCatalogSeed((seed) => seed.doctors.length),
    (error: unknown) =>
      error instanceof CatalogUnavailableError && error.message.includes(CATALOG_SEED_KEY) && error.message.includes("missing"),
  );
});

test("malformed JSON and a file without the two arrays throw with the reason", () => {
  const storage = new MemoryContentStorage();
  setContentStorage(storage);
  storage.write(CATALOG_SEED_KEY, "{ not json");
  assert.throws(() => withCatalogSeed(() => 1), /not valid JSON/);

  for (const bad of ['{"doctors":[]}', '{"hospitals":[{}]}', '{"doctors":[],"hospitals":[]}', "[]", "null"]) {
    storage.write(CATALOG_SEED_KEY, bad);
    assert.throws(() => withCatalogSeed(() => 1), /expected `doctors` and `hospitals` arrays/, bad);
  }
});

test("a storage read failure is reported as a catalog failure with the cause attached", () => {
  const storage = new MemoryContentStorage();
  storage.write(CATALOG_SEED_KEY, SEED);
  setContentStorage({
    ...storage,
    kind: "broken",
    read() {
      throw new Error("disk on fire");
    },
  } as unknown as MemoryContentStorage);
  assert.throws(
    () => withCatalogSeed(() => 1),
    (error: unknown) =>
      error instanceof CatalogUnavailableError &&
      /could not be read: disk on fire/.test(error.message) &&
      (error.cause as Error).message === "disk on fire",
  );
});

test("nested builders share one parsed seed, and the seed is released when the outermost returns", () => {
  const storage = new MemoryContentStorage();
  storage.write(CATALOG_SEED_KEY, SEED);
  let reads = 0;
  const counting = Object.create(storage) as MemoryContentStorage;
  counting.read = (key: string) => {
    reads += 1;
    return storage.read(key);
  };
  setContentStorage(counting);

  const seen: unknown[] = [];
  const result = withCatalogSeed((outer) => {
    seen.push(outer);
    return withCatalogSeed((inner) => {
      seen.push(inner);
      return inner.hospitals[0].name;
    });
  });
  assert.equal(result, "Hospital A");
  assert.equal(seen[0], seen[1], "the inner call reused the outer call's parsed object");
  assert.equal(reads, 1, "one read and parse for both");

  withCatalogSeed((again) => {
    assert.notEqual(again, seen[0], "after the scope closed the seed was not retained");
  });
  assert.equal(reads, 2);
});

test("lazyArray builds once, forwards array behaviour, and does not remember a failed build", () => {
  let builds = 0;
  let fail = true;
  const rows = lazyArray(() => {
    builds += 1;
    if (fail) throw new Error("not yet");
    return [{ slug: "b" }, { slug: "a" }];
  });

  assert.throws(() => rows.length, /not yet/);
  assert.throws(() => rows.find((r) => r.slug === "a"), /not yet/);
  assert.equal(builds, 2, "every access retried while the build failed");

  fail = false;
  assert.equal(rows.length, 2);
  assert.equal(rows.find((r) => r.slug === "a")?.slug, "a");
  assert.deepEqual([...rows].map((r) => r.slug), ["b", "a"]);
  assert.deepEqual(rows.map((r) => r.slug).sort(), ["a", "b"]);
  assert.equal(Array.isArray(rows), true);
  assert.equal(JSON.stringify(rows), '[{"slug":"b"},{"slug":"a"}]');
  assert.equal(0 in rows, true);
  assert.equal(5 in rows, false);
  assert.equal(builds, 3, "built exactly once after the build succeeded");
});

test("arrayView resolves rows on each access", () => {
  let current = [1];
  const view = arrayView(() => current);
  assert.equal(view.length, 1);
  current = [1, 2, 3];
  assert.equal(view.length, 3);
  assert.deepEqual(Object.keys(view), ["0", "1", "2"]);
});

import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { clearCachedJsonFiles, readCachedJsonFile } from "@/lib/cms/json-file-cache";
import { cmsKey, loadCms, readCms, saveCms } from "@/lib/cms/store";
import { exerciseBackend } from "@/lib/storage/backend-contract";
import { FakeR2Bucket } from "@/lib/storage/fake-r2-bucket";
import { flushContentWrites, onContentReplaced, setContentStorage } from "@/lib/storage";
import {
  groupForKey,
  MANIFEST_KEY,
  R2ContentStorage,
  StorageHydrationError,
  VERSION_KEY,
  type ContentManifest,
} from "@/lib/storage/r2";
import { StorageConflictError, StorageKeyError } from "@/lib/storage/types";

const EN_KEYS = {
  "content/cms.json": JSON.stringify({ articles: [{ slug: "en-one", status: "published", publishedAt: "2026-01-01" }] }),
  "content/catalog-cms.json": JSON.stringify({ hospitalsDeleted: [] }),
  "content/curated-treatments.json": JSON.stringify({ treatments: [] }),
};
const AR_KEYS = {
  "content/ar/cms.json": JSON.stringify({ articles: [] }),
  "content/ar/catalog-cms.json": JSON.stringify({}),
  "content/ar/articles/alpha.json": JSON.stringify({ slug: "alpha", status: "published", publishedAt: "2026-01-02" }),
  "content/ar/articles/beta.json": JSON.stringify({ slug: "beta", status: "published", publishedAt: "2026-01-03" }),
  "content/ar/treatments/proton.json": JSON.stringify({ slug: "proton", translation: { status: "published", name: "x" } }),
};

function manifestFor(keys: string[]): string {
  const manifest: ContentManifest = { version: 1, generatedAt: "2026-10-20T00:00:00.000Z", keys };
  return JSON.stringify(manifest);
}

function seededBucket(extra: Record<string, string> = {}) {
  const objects = { ...EN_KEYS, ...AR_KEYS, ...extra };
  const bucket = new FakeR2Bucket(objects);
  bucket.seed(MANIFEST_KEY, manifestFor(Object.keys(objects)));
  return bucket;
}

function isolate(content: FakeR2Bucket, staticBucket = new FakeR2Bucket(), options: Partial<ConstructorParameters<typeof R2ContentStorage>[0]> = {}) {
  return new R2ContentStorage({ content, static: staticBucket, versionCheckIntervalMs: 0, log: () => {}, ...options });
}

afterEach(() => {
  setContentStorage(undefined);
  clearCachedJsonFiles();
});

// ------------------------------------------------------------ hydration

test("hydration refuses a bucket without a manifest, with a missing manifest key, or that is unreachable", async () => {
  const empty = isolate(new FakeR2Bucket());
  await assert.rejects(empty.ensureHydrated("en"), (error: unknown) => {
    assert.ok(error instanceof StorageHydrationError);
    assert.match(error.message, /manifest.*missing.*not been seeded/);
    return true;
  });
  assert.throws(() => empty.read("content/cms.json"), /read before the group was hydrated/, "nothing was loaded, and reading is refused rather than empty");

  const partial = new FakeR2Bucket(EN_KEYS);
  partial.seed(MANIFEST_KEY, manifestFor([...Object.keys(EN_KEYS), "content/ar/cms.json", "content/ar/articles/gone.json"]));
  await isolate(partial).ensureHydrated("en"); // English is complete
  await assert.rejects(isolate(partial).ensureHydrated("ar"), /manifest key\(s\) missing from the bucket, e\.g\. content\/ar\/articles\/gone\.json/);
  const explicitMissing = new FakeR2Bucket({ ...EN_KEYS, "content/ar/articles/alpha.json": "{}" });
  explicitMissing.seed(MANIFEST_KEY, manifestFor([...Object.keys(EN_KEYS), "content/ar/cms.json", "content/ar/articles/alpha.json"]));
  await assert.rejects(isolate(explicitMissing).ensureHydrated("ar"), /manifest key\(s\) could not be read, e\.g\. content\/ar\/cms\.json/);

  const flaky = seededBucket();
  flaky.failNext("get", new Error("network down"));
  await assert.rejects(isolate(flaky).ensureHydrated("en"), /bucket unreachable/);
  const flakyList = seededBucket();
  flakyList.failNext("list", new Error("list exploded"));
  await assert.rejects(isolate(flakyList).ensureHydrated("ar"), /listing the bucket failed/);
});

test("editions hydrate independently and an English isolate never reads Arabic objects", async () => {
  const bucket = seededBucket();
  const storage = isolate(bucket);
  await Promise.all([storage.ensureHydrated("en"), storage.ensureHydrated("en"), storage.ensureHydrated("en")]);
  assert.equal(bucket.calls.filter((c) => c.op === "get" && c.key === MANIFEST_KEY).length, 1, "concurrent callers share one load");
  assert.ok(storage.isHydrated("en"));
  assert.equal(storage.isHydrated("ar"), false);
  assert.equal(storage.read("content/cms.json"), EN_KEYS["content/cms.json"]);
  // An unhydrated group is refused loudly: `null` or `[]` here would be the silent empty CMS.
  assert.throws(() => storage.read("content/ar/cms.json"), /cannot hydrate "ar".*read before the group was hydrated/);
  assert.throws(() => storage.list("content/ar/articles"), /read before the group was hydrated/);
  assert.throws(() => storage.version("content/ar/cms.json"), /read before the group was hydrated/);
  assert.throws(() => storage.write("content/ar/cms.json", "{}"), /read before the group was hydrated/);
  assert.deepEqual(bucket.calls.filter((c) => c.key?.startsWith("content/ar/")), [], "no Arabic object was fetched");

  await storage.ensureHydrated("ar");
  assert.deepEqual(storage.list("content/ar/articles"), ["content/ar/articles/alpha.json", "content/ar/articles/beta.json"]);
  assert.deepEqual(storage.list("content/ar/treatments"), ["content/ar/treatments/proton.json"]);
  assert.equal(storage.version("content/ar/cms.json"), bucket.etag("content/ar/cms.json"), "version() is the R2 etag");
  assert.equal(storage.heldBytes() > 0, true);
});

test("groupForKey maps every content key to one edition group", () => {
  assert.equal(groupForKey("content/cms.json"), "en");
  assert.equal(groupForKey("content/ar/articles/x.json"), "ar");
  assert.equal(groupForKey("content/ar/treatments/x.json"), "ar");
  assert.equal(groupForKey("content/fr/cms.json"), "fr");
  assert.equal(groupForKey("content/ai-generations.json"), "cms");
  assert.equal(groupForKey("public/uploads/articles/x.webp"), null);
});

// ------------------------------------------------------------ contract

test("the R2 backend satisfies the shared backend contract", async () => {
  // Seeded with the explicit keys only, so the contract starts from empty per-slug directories.
  const objects = { ...EN_KEYS, "content/ar/cms.json": "{}", "content/ar/catalog-cms.json": "{}" };
  const content = new FakeR2Bucket(objects);
  content.seed(MANIFEST_KEY, manifestFor(Object.keys(objects)));
  const staticBucket = new FakeR2Bucket();
  const storage = isolate(content, staticBucket);
  await Promise.all([storage.ensureHydrated("en"), storage.ensureHydrated("ar")]);
  await exerciseBackend(storage);
  assert.deepEqual(staticBucket.keys(), ["uploads/articles/x.webp"], "uploads land in the static bucket without the public/ prefix");
  assert.equal(content.text("content/cms.json"), '{"a":2}\n');
  const written = content.keys().filter((k) => k.startsWith("content/ar/articles/"));
  assert.ok(written.includes("content/ar/articles/a.json") && written.includes("content/ar/articles/b.json"));
  assert.ok(!written.includes("content/ar/articles/notes.txt"), "the removed object is gone from the bucket");
});

// ------------------------------------------------------------ durability

test("a write is visible immediately, durable after flush, and version() becomes the bucket etag", async () => {
  const bucket = seededBucket();
  const storage = isolate(bucket);
  await storage.ensureHydrated("en");
  const before = storage.version("content/cms.json");
  storage.write("content/cms.json", '{"articles":[]}');
  assert.equal(storage.read("content/cms.json"), '{"articles":[]}', "the writer sees its own write before flush");
  assert.notEqual(storage.version("content/cms.json"), before);
  assert.notEqual(bucket.text("content/cms.json"), '{"articles":[]}', "not durable yet");
  await storage.flush();
  assert.equal(bucket.text("content/cms.json"), '{"articles":[]}');
  assert.equal(storage.version("content/cms.json"), bucket.etag("content/cms.json"));
  assert.ok(bucket.text(VERSION_KEY)?.includes('"en"'), "the version document names the changed group");
});

test("a failed put rejects flush, rolls the isolate back, and leaves the shared read view on the previous store", async () => {
  const bucket = seededBucket();
  const storage = isolate(bucket);
  await storage.ensureHydrated("en");
  setContentStorage(storage);
  clearCachedJsonFiles();
  assert.equal(readCms("en").articles[0]?.slug, "en-one");

  const store = loadCms("en");
  store.articles.push({ ...store.articles[0], slug: "lost" });
  bucket.failNext("put", new Error("R2 put: internal error"));
  saveCms(store, "en");
  assert.equal(loadCms("en").articles.length, 2, "optimistic until flush");
  await assert.rejects(flushContentWrites(), /R2 put: internal error/);

  assert.deepEqual(loadCms("en").articles.map((a) => a.slug), ["en-one"], "rolled back to the committed object");
  assert.equal(readCms("en").articles.length, 1);
  assert.equal(storage.version(cmsKey("en")), bucket.etag(cmsKey("en")));
  assert.equal(bucket.text(VERSION_KEY), null, "nothing was published for a failed save");

  // A later save still works.
  const retry = loadCms("en");
  retry.articles.push({ ...retry.articles[0], slug: "second-try" });
  saveCms(retry, "en");
  await flushContentWrites();
  assert.deepEqual(JSON.parse(bucket.text(cmsKey("en"))!).articles.map((a: { slug: string }) => a.slug), ["en-one", "second-try"]);
});

test("a rollback on one key does not disturb a successful write to another", async () => {
  const bucket = seededBucket();
  const storage = isolate(bucket);
  await storage.ensureHydrated("en");
  storage.write("content/catalog-cms.json", '{"ok":true}');
  bucket.failNext("put", new Error("boom"));
  storage.write("content/cms.json", "x"); // this put is the next one issued, so it is the one that fails
  await assert.rejects(storage.flush(), /boom/);
  assert.equal(bucket.text("content/catalog-cms.json"), '{"ok":true}', "the other key's write is durable");
  assert.equal(bucket.text("content/cms.json"), EN_KEYS["content/cms.json"], "the failed key kept its committed object");
  for (const key of ["content/cms.json", "content/catalog-cms.json"]) {
    assert.equal(storage.read(key), bucket.text(key), key);
    assert.equal(storage.version(key), bucket.etag(key), key);
  }
  await storage.flush();
});

// ------------------------------------------------------------ conflicts

test("an ETag conflict rejects flush with StorageConflictError and the loser re-reads the winner's content", async () => {
  const bucket = seededBucket();
  const a = isolate(bucket);
  const b = isolate(bucket);
  await a.ensureHydrated("en");
  await b.ensureHydrated("en");

  a.write("content/cms.json", '{"from":"a"}');
  await a.flush();

  b.write("content/cms.json", '{"from":"b"}');
  assert.equal(b.read("content/cms.json"), '{"from":"b"}');
  await assert.rejects(b.flush(), (error: unknown) => {
    assert.ok(error instanceof StorageConflictError);
    assert.equal(error.key, "content/cms.json");
    return true;
  });
  assert.equal(bucket.text("content/cms.json"), '{"from":"a"}', "the bucket kept the first writer");
  assert.equal(b.read("content/cms.json"), '{"from":"a"}', "the loser now holds the winner's object");
  assert.equal(b.version("content/cms.json"), bucket.etag("content/cms.json"));

  // Re-applying on top of the fresh copy succeeds.
  b.write("content/cms.json", '{"from":"b","after":"a"}');
  await b.flush();
  assert.equal(bucket.text("content/cms.json"), '{"from":"b","after":"a"}');
});

test("two isolates racing on the same key: exactly one put wins, the other conflicts", async () => {
  const bucket = seededBucket();
  const a = isolate(bucket);
  const b = isolate(bucket);
  await a.ensureHydrated("en");
  await b.ensureHydrated("en");

  // Hold both puts until both have been issued, then release them together.
  let release!: () => void;
  const gate = new Promise<void>((resolve) => (release = resolve));
  let issued = 0;
  bucket.beforePut = async (key) => {
    if (key !== "content/cms.json") return;
    issued += 1;
    if (issued === 2) release();
    await gate;
  };
  a.write("content/cms.json", "A");
  b.write("content/cms.json", "B");
  const results = await Promise.allSettled([a.flush(), b.flush()]);
  bucket.beforePut = null;
  const outcomes = results.map((r) => r.status).sort();
  assert.deepEqual(outcomes, ["fulfilled", "rejected"]);
  const loser = results[0].status === "rejected" ? results[0] : (results[1] as PromiseRejectedResult);
  assert.ok(loser.reason instanceof StorageConflictError);
  const winnerText = bucket.text("content/cms.json");
  assert.ok(winnerText === "A" || winnerText === "B");
  assert.equal(a.read("content/cms.json"), winnerText);
  assert.equal(b.read("content/cms.json"), winnerText);
});

test("writes to one key from the same isolate are serialised; the last one is what the bucket holds", async () => {
  const bucket = seededBucket();
  const storage = isolate(bucket);
  await storage.ensureHydrated("en");
  storage.write("content/cms.json", "1");
  storage.write("content/cms.json", "2");
  storage.write("content/cms.json", "3");
  storage.write("content/catalog-cms.json", "c");
  assert.equal(storage.read("content/cms.json"), "3");
  await storage.flush();
  assert.equal(bucket.text("content/cms.json"), "3");
  assert.equal(bucket.text("content/catalog-cms.json"), "c");
  assert.equal(storage.version("content/cms.json"), bucket.etag("content/cms.json"));
  assert.equal(bucket.calls.filter((c) => c.op === "put" && c.key === "content/cms.json").length, 3, "each write is its own conditional put");
});

// ------------------------------------------------------------ invalidation

test("another isolate's flush is picked up by refreshIfStale, re-parsed once, and announced to listeners", async () => {
  const bucket = seededBucket();
  const a = isolate(bucket);
  const b = isolate(bucket);
  await a.ensureHydrated("en");
  await a.ensureHydrated("ar");
  await b.ensureHydrated("en");

  const replaced: string[] = [];
  const stop = onContentReplaced((key) => replaced.push(key));
  try {
    let parses = 0;
    const load = () => {
      parses += 1;
      return JSON.parse(a.read("content/cms.json") ?? "{}") as { from?: string };
    };
    setContentStorage(a);
    clearCachedJsonFiles();
    readCachedJsonFile("content/cms.json", load);
    readCachedJsonFile("content/cms.json", load);
    assert.equal(parses, 1);

    await a.refreshIfStale();
    assert.equal(parses, 1, "nothing changed: no re-hydration, no re-parse");
    const arGets = bucket.calls.filter((c) => c.op === "get" && c.key?.startsWith("content/ar/")).length;

    b.write("content/cms.json", '{"from":"b"}');
    await b.flush();

    await a.refreshIfStale();
    assert.equal(a.read("content/cms.json"), '{"from":"b"}');
    assert.equal(readCachedJsonFile("content/cms.json", load).from, "b");
    assert.equal(parses, 2, "re-parsed exactly once for one change");
    assert.deepEqual(replaced, ["content/cms.json"]);
    assert.equal(
      bucket.calls.filter((c) => c.op === "get" && c.key?.startsWith("content/ar/")).length,
      arGets,
      "only the changed group (en) was re-hydrated",
    );
  } finally {
    stop();
  }
});

test("concurrent version stamps merge so neither isolate's group is dropped", async () => {
  const bucket = seededBucket();
  const writerEn = isolate(bucket);
  const writerAr = isolate(bucket);
  const watcher = isolate(bucket);
  await writerEn.ensureHydrated("en");
  await writerAr.ensureHydrated("ar");
  await watcher.ensureHydrated("en");
  await watcher.ensureHydrated("ar");

  // Hold the version puts until both isolates have issued one, then let the
  // compare-and-swap resolve. The loser reloads and merges its group.
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  let versionPuts = 0;
  bucket.beforePut = async (key) => {
    if (key !== VERSION_KEY) return;
    versionPuts += 1;
    if (versionPuts === 2) {
      bucket.beforePut = null;
      release();
    }
    await gate;
  };

  const enBody = '{"articles":[{"slug":"from-en"}]}';
  const arBody = '{"articles":[{"slug":"from-ar"}]}';
  writerEn.write("content/cms.json", enBody);
  writerAr.write("content/ar/cms.json", arBody);
  await Promise.all([writerEn.flush(), writerAr.flush()]);

  const published = JSON.parse(bucket.text(VERSION_KEY)!) as { groups: Record<string, string> };
  assert.ok(published.groups.en, "the English group stamp is in the version document");
  assert.ok(published.groups.ar, "the Arabic group stamp is in the version document");
  await watcher.refreshIfStale();
  assert.equal(watcher.read("content/cms.json"), enBody);
  assert.equal(watcher.read("content/ar/cms.json"), arBody);
});

test("a failed version broadcast does not fail the save and is retried on the next flush", async () => {
  const bucket = seededBucket();
  const storage = isolate(bucket);
  await storage.ensureHydrated("en");
  storage.write("content/cms.json", "x");
  // First put is the content object (succeeds); the next put call is the version document.
  const originalPut = bucket.put.bind(bucket);
  let versionPuts = 0;
  bucket.put = async (key, value, options) => {
    if (key === VERSION_KEY && versionPuts++ === 0) throw new Error("version put failed");
    return originalPut(key, value, options);
  };
  await storage.flush();
  assert.equal(bucket.text("content/cms.json"), "x", "the save itself is durable and acknowledged");
  assert.equal(bucket.text(VERSION_KEY), null);
  storage.write("content/catalog-cms.json", "y");
  await storage.flush();
  const published = JSON.parse(bucket.text(VERSION_KEY)!) as { groups: Record<string, string> };
  assert.ok(published.groups.en, "the dirty group was republished");
});

// ------------------------------------------------------------ keys outside content/

test("uploads go to the static bucket, assets are read-only Worker files, anything else is refused", async () => {
  const content = seededBucket();
  const staticBucket = new FakeR2Bucket();
  const css = "body{direction:rtl}";
  const assets = {
    fetch: async (input: string | URL | Request) =>
      String(input).endsWith("/ar-ro-directory.css") ? new Response(css, { headers: { etag: '"css-1"' } }) : new Response("nope", { status: 404 }),
  };
  const storage = isolate(content, staticBucket, { assets, assetKeys: { "public/ar-ro-directory.css": "/ar-ro-directory.css" } });
  await storage.ensureHydrated("en");

  assert.equal(storage.read("public/ar-ro-directory.css"), css);
  assert.equal(storage.version("public/ar-ro-directory.css"), '"css-1"');
  assert.throws(() => storage.write("public/ar-ro-directory.css", "x"), StorageKeyError);
  assert.deepEqual(content.keys().filter((k) => k.includes("ar-ro-directory")), [], "the stylesheet is never an R2 object");

  storage.write("public/uploads/articles/1-x.webp", new Uint8Array([1, 2, 3]));
  storage.remove("public/uploads/articles/old.webp");
  await storage.flush();
  assert.deepEqual(staticBucket.keys(), ["uploads/articles/1-x.webp"]);
  assert.deepEqual([...(storage.readBytes("public/uploads/articles/1-x.webp") ?? [])], [1, 2, 3]);

  assert.throws(() => storage.read("public/robots.txt"), StorageKeyError);
  assert.throws(() => storage.write("next.config.mjs", "x"), StorageKeyError);
});

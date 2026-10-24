import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { clearCachedJsonFiles } from "@/lib/cms/json-file-cache";
import {
  cmsKey,
  editionArticles,
  editionArticlesKey,
  getPublishedBySlug,
  loadCms,
  readCms,
  saveCms,
} from "@/lib/cms/store";
import type { Article } from "@/lib/cms/types";
import { MemoryContentStorage } from "@/lib/storage/memory";
import { flushContentWrites, setContentStorage } from "@/lib/storage";

function article(overrides: Partial<Article> & { slug: string }): Article {
  return {
    id: `id-${overrides.slug}`,
    title: overrides.slug,
    excerpt: "",
    date: "2026-01-01",
    publishedAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    author: "",
    category: "",
    tags: [],
    image: "",
    imageAlt: "",
    status: "published",
    featured: false,
    seoTitle: "",
    seoDescription: "",
    canonical: "",
    ogImage: "",
    allowIndex: true,
    blocks: [],
    relatedLinks: [],
    ...overrides,
  };
}

let storage: MemoryContentStorage;

beforeEach(() => {
  storage = new MemoryContentStorage();
  setContentStorage(storage);
  clearCachedJsonFiles();
});

afterEach(() => {
  setContentStorage(undefined);
  clearCachedJsonFiles();
});

test("editions map to the same keys the files have always had", () => {
  assert.equal(cmsKey("en"), "content/cms.json");
  assert.equal(cmsKey("ar"), "content/ar/cms.json");
  assert.equal(editionArticlesKey("ar"), "content/ar/articles");
});

test("a missing store yields the edition defaults instead of throwing", () => {
  const en = loadCms("en");
  assert.deepEqual(en.articles, []);
  assert.equal(en.settings.defaultAuthor, "GAF Healthcare clinical desk");
  const ar = loadCms("ar");
  assert.deepEqual(ar.articles, []);
  assert.equal(ar.settings.defaultAuthor, "");
  assert.deepEqual(storage.keys(), [], "a read must never create content");
});

test("malformed JSON and a store without an articles array fall back to defaults", () => {
  storage.write(cmsKey("en"), '{"settings": {"postsPerPage": 5}, "articles": [');
  assert.deepEqual(loadCms("en").articles, []);
  assert.equal(loadCms("en").settings.postsPerPage, 12);

  storage.write(cmsKey("en"), '{"settings": {"postsPerPage": 5}}');
  assert.equal(loadCms("en").settings.postsPerPage, 12, "no articles array means the file is not trusted");
});

test("a partial store is merged over the defaults", () => {
  storage.write(
    cmsKey("en"),
    JSON.stringify({ settings: { postsPerPage: 7 }, articles: [article({ slug: "one" })] }),
  );
  const store = loadCms("en");
  assert.equal(store.settings.postsPerPage, 7);
  assert.equal(store.settings.blogEyebrow, "Desk");
  assert.deepEqual(store.categories, []);
  assert.deepEqual(store.media, []);
  assert.equal(store.articles.length, 1);
});

test("save then reload returns the saved content through both loaders", async () => {
  const before = readCms("en");
  assert.equal(before.articles.length, 0);

  const store = loadCms("en");
  store.articles.push(article({ slug: "saved" }));
  store.settings.postsPerPage = 3;
  saveCms(store, "en");
  await flushContentWrites();

  assert.equal(loadCms("en").articles[0]?.slug, "saved");
  const after = readCms("en");
  assert.notEqual(after, before, "the shared cached copy is invalidated by a save");
  assert.equal(after.settings.postsPerPage, 3);
  assert.equal(readCms("en"), after, "repeat reads share one parsed copy while the version is unchanged");
  assert.ok(storage.read(cmsKey("en"))?.endsWith("}\n"), "files keep their pretty-printed, newline-terminated form");
});

test("the shared read view notices a write made outside saveCms", () => {
  storage.write(cmsKey("ar"), JSON.stringify({ articles: [article({ slug: "first" })] }));
  assert.equal(readCms("ar").articles[0]?.slug, "first");
  // A deploy or another process replacing the file bumps the backend version.
  storage.write(cmsKey("ar"), JSON.stringify({ articles: [article({ slug: "second" })] }));
  assert.equal(readCms("ar").articles[0]?.slug, "second");
});

test("editions are isolated: saving one never touches the other", async () => {
  storage.write(cmsKey("ar"), JSON.stringify({ articles: [article({ slug: "arabic" })] }));
  const en = loadCms("en");
  en.articles.push(article({ slug: "english" }));
  saveCms(en, "en");
  await flushContentWrites();
  assert.deepEqual(storage.keys(), [cmsKey("en"), cmsKey("ar")].sort());
  assert.deepEqual(editionArticles("ar").map((a) => a.slug), ["arabic"]);
  assert.deepEqual(editionArticles("en").map((a) => a.slug), ["english"]);
});

test("per-slug Arabic article files win over cms.json rows and tolerate broken neighbours", () => {
  storage.write(
    cmsKey("ar"),
    JSON.stringify({
      articles: [article({ slug: "shared", title: "from cms.json" }), article({ slug: "only-in-cms" })],
    }),
  );
  storage.write(`${editionArticlesKey("ar")}/shared.json`, JSON.stringify(article({ slug: "shared", title: "from file" })));
  storage.write(`${editionArticlesKey("ar")}/only-in-file.json`, JSON.stringify(article({ slug: "only-in-file" })));
  storage.write(`${editionArticlesKey("ar")}/broken.json`, "{ not json");
  storage.write(`${editionArticlesKey("ar")}/no-slug.json`, JSON.stringify({ title: "x" }));
  storage.write(`${editionArticlesKey("ar")}/README.md`, "ignored");

  const slugs = editionArticles("ar").map((a) => a.slug).sort();
  assert.deepEqual(slugs, ["only-in-cms", "only-in-file", "shared"]);
  assert.equal(getPublishedBySlug("shared", "ar")?.title, "from file");
  assert.deepEqual(editionArticles("en").map((a) => a.slug), [], "English never reads the Arabic directory");
});

test("the per-slug directory is parsed once per version and re-read when any file changes", () => {
  const dir = editionArticlesKey("ar");
  storage.write(`${dir}/a.json`, JSON.stringify(article({ slug: "a", title: "A1" })));
  storage.write(`${dir}/b.json`, JSON.stringify(article({ slug: "b" })));

  const first = getPublishedBySlug("a", "ar");
  assert.equal(first?.title, "A1");
  assert.equal(getPublishedBySlug("a", "ar"), first, "an unchanged directory serves the same parsed objects");

  storage.write(`${dir}/a.json`, JSON.stringify(article({ slug: "a", title: "A2" })));
  assert.equal(getPublishedBySlug("a", "ar")?.title, "A2", "rewriting one file invalidates the directory");

  storage.write(`${dir}/c.json`, JSON.stringify(article({ slug: "c" })));
  assert.deepEqual(editionArticles("ar").map((a) => a.slug).sort(), ["a", "b", "c"], "adding a file is seen");

  storage.remove(`${dir}/b.json`);
  assert.deepEqual(editionArticles("ar").map((a) => a.slug).sort(), ["a", "c"], "removing a file is seen");
});

test("a failed write leaves the previous content and the shared read view intact", async () => {
  storage.write(cmsKey("en"), JSON.stringify({ articles: [article({ slug: "kept" })] }));
  const cached = readCms("en");

  const store = loadCms("en");
  store.articles.push(article({ slug: "lost" }));
  storage.failNextWrite(new Error("EACCES: permission denied"));
  assert.throws(() => saveCms(store, "en"), /EACCES/);

  assert.deepEqual(loadCms("en").articles.map((a) => a.slug), ["kept"]);
  assert.equal(readCms("en"), cached, "the cache is only invalidated after a successful write");
  await flushContentWrites();
});

test("a deferred persistence failure is reported by flushContentWrites, as a route would see it", async () => {
  const store = loadCms("en");
  store.articles.push(article({ slug: "queued" }));
  storage.failNextFlush(new Error("R2 put failed"));
  saveCms(store, "en");
  await assert.rejects(flushContentWrites(), /R2 put failed/);
  await flushContentWrites();
});

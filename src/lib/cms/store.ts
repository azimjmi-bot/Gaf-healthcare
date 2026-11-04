import type { CmsEdition } from "@/lib/cms/edition";
import { invalidateCachedJsonFile, readCachedJsonDirectory, readCachedJsonFile } from "@/lib/cms/json-file-cache";
import type { Article, CmsStore } from "@/lib/cms/types";
import { newId, slugify } from "@/lib/cms/types";
import { contentStorage } from "@/lib/storage";

/** Storage key of an edition's settings-and-articles store. */
export function cmsKey(edition: CmsEdition = "en") {
  return edition === "en" ? "content/cms.json" : `content/${edition}/cms.json`;
}

function fallbackStore(edition: CmsEdition = "en"): CmsStore {
  const localized = edition !== "en";
  return {
    settings: {
      defaultAuthor: localized ? "" : "GAF Healthcare clinical desk",
      postsPerPage: 12,
      blogEyebrow: localized ? "" : "Desk",
      blogTitle: localized ? "" : "Planning notes, not a magazine.",
      blogLede:
        localized
          ? ""
          : "Short essays on radiation techniques, when travel is justified, and the records we ask for before anyone books a ticket.",
    },
    categories: [],
    tags: [],
    media: [],
    articles: [],
  };
}

export function loadCms(edition: CmsEdition = "en"): CmsStore {
  try {
    const raw = contentStorage().read(cmsKey(edition));
    if (raw === null) return fallbackStore(edition);
    const data = JSON.parse(raw) as CmsStore;
    if (!Array.isArray(data.articles)) return fallbackStore(edition);
    return {
      ...fallbackStore(edition),
      ...data,
      settings: { ...fallbackStore(edition).settings, ...data.settings },
      categories: data.categories ?? [],
      tags: data.tags ?? [],
      media: data.media ?? [],
      articles: data.articles ?? [],
    };
  } catch {
    return fallbackStore(edition);
  }
}

/**
 * Shared, read-only view of the store for rendering. `loadCms` stays the
 * loader for CMS write paths, which mutate the returned object before saving.
 */
export function readCms(edition: CmsEdition = "en"): CmsStore {
  return readCachedJsonFile(cmsKey(edition), () => loadCms(edition));
}

/**
 * Persist the store. Synchronous and atomic on the file-system backend; a
 * route that calls this awaits `flushContentWrites()` before responding so a
 * backend with asynchronous persistence can still fail the request.
 */
export function saveCms(store: CmsStore, edition: CmsEdition = "en") {
  const key = cmsKey(edition);
  contentStorage().write(key, `${JSON.stringify(store, null, 2)}\n`);
  invalidateCachedJsonFile(key);
  return store;
}

/** Storage prefix of an edition's one-file-per-slug articles. */
export function editionArticlesKey(edition: CmsEdition) {
  return `content/${edition}/articles`;
}

/**
 * Arabic (and other locale) articles can live as one JSON file per slug under
 * `content/<edition>/articles/`. That keeps a long translation from rewriting
 * the settings file, and a file wins over a same-slug row in cms.json.
 */
function articlesFromDirectory(edition: CmsEdition): Article[] {
  if (edition === "en") return [];
  return readCachedJsonDirectory(editionArticlesKey(edition), () => loadArticlesFromDirectory(edition));
}

function loadArticlesFromDirectory(edition: CmsEdition): Article[] {
  const storage = contentStorage();
  const rows: Article[] = [];
  for (const key of storage.list(editionArticlesKey(edition))) {
    if (!key.endsWith(".json")) continue;
    try {
      const raw = storage.read(key);
      if (raw === null) continue;
      const parsed = JSON.parse(raw) as Article;
      if (parsed && typeof parsed.slug === "string") rows.push(parsed);
    } catch {
      // A half-written translation must not take the edition down.
    }
  }
  return rows;
}

export function editionArticles(edition: CmsEdition = "en"): Article[] {
  const merged = new Map<string, Article>();
  for (const article of readCms(edition).articles) merged.set(article.slug, article);
  for (const article of articlesFromDirectory(edition)) merged.set(article.slug, article);
  return [...merged.values()];
}

export function publishedArticles(edition: CmsEdition = "en") {
  return editionArticles(edition)
    .filter((a) => a.status === "published")
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getArticleBySlug(slug: string, edition: CmsEdition = "en") {
  return editionArticles(edition).find((a) => a.slug === slug && a.status !== "trash");
}

export function getPublishedBySlug(slug: string, edition: CmsEdition = "en") {
  return publishedArticles(edition).find((a) => a.slug === slug);
}

export function uniqueSlug(store: CmsStore, base: string, ignoreId?: string) {
  const root = slugify(base) || "note";
  let slug = root;
  let n = 2;
  while (store.articles.some((a) => a.slug === slug && a.id !== ignoreId && a.status !== "trash")) {
    slug = `${root}-${n}`;
    n += 1;
  }
  return slug;
}

export function blankArticle(store: CmsStore): Article {
  const now = new Date();
  return {
    id: newId("art"),
    slug: uniqueSlug(store, "untitled-note"),
    title: "",
    excerpt: "",
    date: now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
    publishedAt: now.toISOString(),
    updatedAt: now.toISOString(),
    author: store.settings.defaultAuthor,
    category: store.categories[0] || "Planning",
    tags: [],
    image: "",
    imageAlt: "",
    status: "draft",
    featured: false,
    seoTitle: "",
    seoDescription: "",
    canonical: "",
    ogImage: "",
    allowIndex: true,
    blocks: [{ id: newId("p"), type: "paragraph", text: "" }],
    relatedLinks: [],
  };
}

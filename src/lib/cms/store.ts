import { mkdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import type { CmsEdition } from "@/lib/cms/edition";
import type { Article, CmsStore } from "@/lib/cms/types";
import { newId, slugify } from "@/lib/cms/types";

function cmsFile(edition: CmsEdition = "en") {
  return edition === "ar"
    ? join(process.cwd(), "content/ar/cms.json")
    : join(process.cwd(), "content/cms.json");
}

function fallbackStore(): CmsStore {
  return {
    settings: {
      defaultAuthor: "GAF Healthcare clinical desk",
      postsPerPage: 12,
      blogEyebrow: "Desk",
      blogTitle: "Planning notes, not a magazine.",
      blogLede:
        "Short essays on radiation techniques, when travel is justified, and the records we ask for before anyone books a ticket.",
    },
    categories: [],
    tags: [],
    media: [],
    articles: [],
  };
}

export function loadCms(edition: CmsEdition = "en"): CmsStore {
  try {
    const raw = readFileSync(cmsFile(edition), "utf8");
    const data = JSON.parse(raw) as CmsStore;
    if (!Array.isArray(data.articles)) return fallbackStore();
    return {
      ...fallbackStore(),
      ...data,
      settings: { ...fallbackStore().settings, ...data.settings },
      categories: data.categories ?? [],
      tags: data.tags ?? [],
      media: data.media ?? [],
      articles: data.articles ?? [],
    };
  } catch {
    return fallbackStore();
  }
}

export function saveCms(store: CmsStore, edition: CmsEdition = "en") {
  const file = cmsFile(edition);
  mkdirSync(dirname(file), { recursive: true });
  const tmp = `${file}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(store, null, 2)}\n`);
  renameSync(tmp, file);
  return store;
}

export function publishedArticles(edition: CmsEdition = "en") {
  return loadCms(edition)
    .articles.filter((a) => a.status === "published")
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getArticleBySlug(slug: string, edition: CmsEdition = "en") {
  return loadCms(edition).articles.find((a) => a.slug === slug && a.status !== "trash");
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

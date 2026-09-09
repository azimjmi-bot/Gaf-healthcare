export type ArticleStatus = "draft" | "published" | "scheduled" | "trash";

export type ArticleBlock =
  | { id: string; type: "paragraph"; text: string }
  | { id: string; type: "heading"; level: 2 | 3 | 4; text: string }
  | { id: string; type: "quote"; text: string; cite?: string }
  | { id: string; type: "list"; style: "ul" | "ol"; items: string[] }
  | { id: string; type: "image"; src: string; alt: string; caption?: string }
  | { id: string; type: "html"; html: string }
  | { id: string; type: "separator" }
  | { id: string; type: "button"; label: string; href: string };

export type RelatedLink = { label: string; href: string };

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  status: ArticleStatus;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  canonical: string;
  ogImage: string;
  allowIndex: boolean;
  blocks: ArticleBlock[];
  relatedLinks: RelatedLink[];
};

export type MediaItem = {
  id: string;
  url: string;
  name: string;
  alt: string;
  addedAt: string;
};

export type CmsSettings = {
  defaultAuthor: string;
  postsPerPage: number;
  blogEyebrow: string;
  blogTitle: string;
  blogLede: string;
};

export type CmsStore = {
  settings: CmsSettings;
  categories: string[];
  tags: string[];
  media: MediaItem[];
  articles: Article[];
};

export function emptyParagraph(): ArticleBlock {
  return { id: newId("p"), type: "paragraph", text: "" };
}

export function newId(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

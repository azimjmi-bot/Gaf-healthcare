import { editionFromLocale } from "@/lib/cms/edition";
import { getPublishedBySlug, loadCms, publishedArticles } from "@/lib/cms/store";
import type { Article, ArticleBlock } from "@/lib/cms/types";
import type { AppLocale } from "@/lib/i18n/languages";
import { stripMarkdown } from "@/lib/markdown";
import { getSpecialty } from "@/lib/taxonomy";

export type BlogPost = Article;

export type BlogDirectoryFilters = {
  q?: string;
  specialty?: string;
  subspecialty?: string;
  /** Legacy listing query. Exact category, or a specialty name/slug. */
  category?: string;
};

const CATEGORY_SPECIALTY_SLUG: Record<string, string> = {
  "Proton therapy": "radiation-oncology",
  Stereotactic: "radiation-oncology",
  Brachytherapy: "radiation-oncology",
  Planning: "radiation-oncology",
};

export const BLOG_SUBSPECIALTY_TOPICS = [
  "Breast Cancer",
  "Prostate Cancer",
  "Colon Cancer",
  "Knee Replacement",
  "Proton Therapy",
  "Brachytherapy",
  "Stereotactic",
  "DCIS",
] as const;

function unique(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

export function listPublishedPosts(locale: AppLocale = "en") {
  return publishedArticles(editionFromLocale(locale));
}

export function blogSearchableText(post: Article, locale: AppLocale = "en") {
  return [post.title, post.excerpt, post.category, ...post.tags, ...(post.keywords ?? [])]
    .join(" ")
    .toLocaleLowerCase(locale);
}

export function blogSpecialtySlug(post: Article) {
  return getSpecialty(post.category)?.slug || CATEGORY_SPECIALTY_SLUG[post.category] || "";
}

export function postMatchesSubspecialty(post: Article, subspecialty: string, locale: AppLocale = "en") {
  const needle = subspecialty.trim().toLocaleLowerCase(locale);
  if (!needle) return true;
  if (post.category.toLocaleLowerCase(locale) === needle) return true;
  if (post.tags.some((tag) => tag.toLocaleLowerCase(locale) === needle)) return true;
  return blogSearchableText(post, locale).includes(needle);
}

export function filterPublishedPosts(locale: AppLocale, filters: BlogDirectoryFilters = {}) {
  const q = (filters.q || "").trim().toLocaleLowerCase(locale);
  const specialty = (filters.specialty || "").trim();
  const subspecialty = (filters.subspecialty || "").trim();
  const category = (filters.category || "").trim();
  const categorySpecialty = category ? getSpecialty(category)?.slug || CATEGORY_SPECIALTY_SLUG[category] || "" : "";

  return listPublishedPosts(locale).filter((post) => {
    if (q && !blogSearchableText(post, locale).includes(q)) return false;
    if (specialty && blogSpecialtySlug(post) !== specialty) return false;
    if (subspecialty && !postMatchesSubspecialty(post, subspecialty, locale)) return false;
    if (!specialty && category) {
      if (categorySpecialty) {
        if (blogSpecialtySlug(post) !== categorySpecialty && post.category !== category) return false;
      } else if (post.category !== category) {
        return false;
      }
    }
    return true;
  });
}

export function blogDirectoryFacets(locale: AppLocale = "en") {
  const posts = listPublishedPosts(locale);
  const specialtySlugs = unique(posts.map(blogSpecialtySlug)).sort((a, b) => a.localeCompare(b));
  const fromTopics = BLOG_SUBSPECIALTY_TOPICS.filter((topic) =>
    posts.some((post) => postMatchesSubspecialty(post, topic, locale)),
  );
  const fromCategories = unique(posts.map((post) => post.category).filter((category) => !getSpecialty(category)));
  const subspecialties = unique([...fromTopics, ...fromCategories]).sort((a, b) => a.localeCompare(b));
  return { specialtySlugs, subspecialties };
}

export function getPost(slug: string, locale: AppLocale = "en") {
  return getPublishedBySlug(slug, editionFromLocale(locale));
}

export function blogSettings(locale: AppLocale = "en") {
  return loadCms(editionFromLocale(locale)).settings;
}

export function faqsFromArticleBlocks(blocks: ArticleBlock[]) {
  const faqs: { q: string; a: string }[] = [];
  let inFaq = false;
  let question = "";
  for (const block of blocks) {
    if (block.type === "heading" && /frequently asked questions/i.test(block.text)) {
      inFaq = true;
      continue;
    }
    if (!inFaq) continue;
    if (block.type === "heading" && block.level === 2) break;
    if (block.type === "heading") {
      question = block.text;
      continue;
    }
    if (block.type === "paragraph" && question) {
      const answer = stripMarkdown(block.text);
      if (answer) faqs.push({ q: question, a: answer });
      question = "";
    }
  }
  return faqs;
}

const CTA_HREF = /(?:\/consult\?|https:\/\/wa\.me\/)/i;

export function articleCtaCount(blocks: ArticleBlock[]) {
  let count = 0;
  for (const block of blocks) {
    if (block.type === "button" && CTA_HREF.test(block.href)) count += 1;
    if (block.type === "paragraph") {
      const matches = block.text.match(/\[[^\]]+\]\((\/consult\?|https:\/\/wa\.me\/)[^)]*\)/g);
      count += matches?.length ?? 0;
    }
  }
  return count;
}

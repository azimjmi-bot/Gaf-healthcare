import { editionFromLocale } from "@/lib/cms/edition";
import { getPublishedBySlug, loadCms, publishedArticles } from "@/lib/cms/store";
import type { Article, ArticleBlock } from "@/lib/cms/types";
import type { AppLocale } from "@/lib/i18n/languages";
import { stripMarkdown } from "@/lib/markdown";

export type BlogPost = Article;

export function listPublishedPosts(locale: AppLocale = "en") {
  return publishedArticles(editionFromLocale(locale));
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

import { editionFromLocale } from "@/lib/cms/edition";
import { getPublishedBySlug, loadCms, publishedArticles } from "@/lib/cms/store";
import type { Article } from "@/lib/cms/types";
import type { AppLocale } from "@/lib/i18n/languages";

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

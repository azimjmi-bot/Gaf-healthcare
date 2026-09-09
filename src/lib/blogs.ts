import { getPublishedBySlug, loadCms, publishedArticles } from "@/lib/cms/store";
import type { Article } from "@/lib/cms/types";

export type BlogPost = Article;

export function listPublishedPosts() {
  return publishedArticles();
}

export function getPost(slug: string) {
  return getPublishedBySlug(slug);
}

export function blogSettings() {
  return loadCms().settings;
}

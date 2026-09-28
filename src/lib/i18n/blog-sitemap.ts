import type { MetadataRoute } from "next";
import { listPublishedPosts } from "@/lib/blogs";
import type { AppLocale } from "@/lib/i18n/languages";
import { LOCALES, isTargetLocale } from "@/lib/i18n/languages";
import { localeIsPublished as targetLocaleIsPublished } from "@/lib/i18n/locale-gating";
import { sitemapIndexXml, sitemapXml } from "@/lib/i18n/sitemap-xml";
import { SITE_URL, absoluteUrl } from "@/lib/seo-url";

export function isLocaleLive(locale: AppLocale) {
  return !isTargetLocale(locale) || targetLocaleIsPublished(locale);
}

export function sitemapEntry(
  path: string,
  locale: AppLocale,
  opts: {
    lastModified?: Date | string;
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority?: number;
    images?: string[];
  } = {},
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path, locale),
    lastModified: opts.lastModified ? new Date(opts.lastModified) : new Date(),
    changeFrequency: opts.changeFrequency ?? "weekly",
    priority: opts.priority ?? 0.6,
    ...(opts.images?.length ? { images: opts.images } : {}),
  };
}

function blogAssetUrl(src?: string) {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  return new URL(src, SITE_URL).toString();
}

function blogPostImages(post: {
  image?: string;
  ogImage?: string;
  blocks?: { type: string; src?: string }[];
}) {
  const seen = new Set<string>();
  const images: string[] = [];
  for (const src of [
    post.image,
    post.ogImage,
    ...(post.blocks ?? []).flatMap((block) => (block.type === "image" && block.src ? [block.src] : [])),
  ]) {
    const url = blogAssetUrl(src);
    if (!url || seen.has(url)) continue;
    seen.add(url);
    images.push(url);
  }
  return images;
}

export function postTimestamp(post: { updatedAt?: string; publishedAt?: string; date?: string }) {
  return post.updatedAt || post.publishedAt || post.date;
}

export function blogPostSitemapOpts(post: {
  updatedAt?: string;
  publishedAt?: string;
  date?: string;
  featured?: boolean;
  image?: string;
  ogImage?: string;
  blocks?: { type: string; src?: string }[];
}) {
  const lastModified = postTimestamp(post);
  const ageMs = lastModified ? Date.now() - Date.parse(String(lastModified)) : Number.POSITIVE_INFINITY;
  const recent = Number.isFinite(ageMs) && ageMs < 1000 * 60 * 60 * 24 * 60;
  return {
    lastModified,
    changeFrequency: (recent ? "weekly" : "monthly") as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: post.featured || recent ? 0.7 : 0.55,
    images: blogPostImages(post),
  };
}

export function publishedIndexablePosts(locale: AppLocale) {
  return listPublishedPosts(locale)
    .filter((post) => post.allowIndex)
    .slice()
    .sort((a, b) => {
      const left = Date.parse(String(postTimestamp(a) || "")) || 0;
      const right = Date.parse(String(postTimestamp(b) || "")) || 0;
      return right - left;
    });
}

export function dedupeSitemap(urls: MetadataRoute.Sitemap) {
  const seen = new Set<string>();
  return urls.filter((row) => {
    if (seen.has(row.url)) return false;
    seen.add(row.url);
    return true;
  });
}

/** Dedicated article sitemap so new blog posts are crawlable without the 7k-URL English index. */
export function buildBlogSitemap(locale: AppLocale = "en"): MetadataRoute.Sitemap {
  if (locale !== "en" && !isLocaleLive(locale)) return [];
  const posts = publishedIndexablePosts(locale);
  if (posts.length === 0) return [];
  const newest = postTimestamp(posts[0]);
  const urls: MetadataRoute.Sitemap = [
    sitemapEntry("/blogs", locale, {
      lastModified: newest,
      changeFrequency: "weekly",
      priority: locale === "en" ? 0.7 : 0.6,
    }),
  ];
  for (const post of posts) {
    urls.push(sitemapEntry(`/blogs/${post.slug}`, locale, blogPostSitemapOpts(post)));
  }
  return dedupeSitemap(urls);
}

/**
 * Child-sitemap index. Do not call buildLocaleSitemap() here: that loads the
 * 7k-URL English catalog and is what made /sitemap.xml take ~13s, which is
 * long enough for Google Search Console to mark the file "Couldn't fetch".
 */
export function buildSitemapIndex(): { loc: string; lastModified?: string }[] {
  const blogs = buildBlogSitemap("en");
  const newestBlog = blogs[0]?.lastModified;
  const lastModified =
    newestBlog instanceof Date ? newestBlog.toISOString() : newestBlog ? String(newestBlog) : undefined;
  const files: { loc: string; lastModified?: string }[] = [{ loc: absoluteUrl("/sitemap-en.xml"), lastModified }];
  for (const locale of LOCALES) {
    if (locale === "en") continue;
    if (!isLocaleLive(locale)) continue;
    files.push({ loc: absoluteUrl(`/sitemap-${locale}.xml`) });
  }
  if (blogs.length > 0) {
    files.push({ loc: absoluteUrl("/sitemap-blogs.xml"), lastModified });
  }
  return files;
}

export function blogSitemapDocument() {
  return sitemapXml(buildBlogSitemap("en"));
}

export function sitemapIndexDocument() {
  return sitemapIndexXml(buildSitemapIndex());
}

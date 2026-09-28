import { blogSitemapDocument } from "@/lib/i18n/blog-sitemap";
import { sitemapResponse } from "@/lib/i18n/sitemap-xml";

export const revalidate = 300;

export function GET() {
  return sitemapResponse(blogSitemapDocument());
}

import { sitemapIndexDocument } from "@/lib/i18n/blog-sitemap";
import { sitemapResponse } from "@/lib/i18n/sitemap-xml";

export const revalidate = 300;

/** Yoast/RankMath URL still submitted in Google Search Console. */
export function GET() {
  return sitemapResponse(sitemapIndexDocument());
}

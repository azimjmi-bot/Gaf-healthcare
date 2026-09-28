import { localeSitemapXml } from "@/lib/i18n/sitemap-entries";
import { sitemapResponse } from "@/lib/i18n/sitemap-xml";

export const revalidate = 300;

export function GET() {
  return sitemapResponse(localeSitemapXml("ru"));
}

import { buildLocaleSitemap, sitemapXml } from "@/lib/i18n/sitemap-entries";

export function GET() {
  return new Response(sitemapXml(buildLocaleSitemap("ru")), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

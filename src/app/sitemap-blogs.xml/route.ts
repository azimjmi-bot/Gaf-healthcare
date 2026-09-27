import { buildBlogSitemap, sitemapXml } from "@/lib/i18n/sitemap-entries";

export function GET() {
  return new Response(sitemapXml(buildBlogSitemap("en")), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}

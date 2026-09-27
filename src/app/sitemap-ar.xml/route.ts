import { buildLocaleSitemap, sitemapXml } from "@/lib/i18n/sitemap-entries";

export const dynamic = "force-dynamic";

export function GET() {
  const xml = sitemapXml(buildLocaleSitemap("ar"));
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}

import { buildSitemapIndex, sitemapIndexXml } from "@/lib/i18n/sitemap-entries";

export const dynamic = "force-dynamic";

export function GET() {
  return new Response(sitemapIndexXml(buildSitemapIndex()), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}

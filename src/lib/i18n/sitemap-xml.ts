import type { MetadataRoute } from "next";

/**
 * Crawl-file headers. Hostinger's CDN otherwise treats these as DYNAMIC and
 * Googlebot times out the same way Lighthouse used to time out /robots.txt.
 */
export const SITEMAP_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
  "X-Content-Type-Options": "nosniff",
};

export function sitemapResponse(xml: string) {
  return new Response(xml, { headers: SITEMAP_HEADERS });
}

export function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function sitemapXml(entries: MetadataRoute.Sitemap) {
  const hasImages = entries.some((row) => row.images?.length);
  const ns = hasImages
    ? 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'
    : 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
  const body = entries
    .map((row) => {
      const last = row.lastModified instanceof Date ? row.lastModified.toISOString() : row.lastModified;
      const frequency = row.changeFrequency ? `<changefreq>${row.changeFrequency}</changefreq>` : "";
      const priority = row.priority !== undefined ? `<priority>${row.priority}</priority>` : "";
      const images = (row.images ?? [])
        .map((src) => `<image:image><image:loc>${escapeXml(src)}</image:loc></image:image>`)
        .join("");
      return `<url><loc>${escapeXml(row.url)}</loc>${last ? `<lastmod>${last}</lastmod>` : ""}${frequency}${priority}${images}</url>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset ${ns}>${body}</urlset>`;
}

export function sitemapIndexXml(files: { loc: string; lastModified?: Date | string }[]) {
  const body = files
    .map((row) => {
      const last = row.lastModified instanceof Date ? row.lastModified.toISOString() : row.lastModified;
      return `<sitemap><loc>${escapeXml(row.loc)}</loc>${last ? `<lastmod>${last}</lastmod>` : ""}</sitemap>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`;
}

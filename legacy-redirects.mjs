/**
 * Permanent redirects for URLs of the previous sites on this domain that have
 * a real successor here. Imported by next.config.mjs; patterns use Next's
 * path-to-regexp syntax. Old URLs without a successor are answered 410 by
 * src/proxy.ts (see src/lib/legacy-urls.ts).
 *
 * Order matters: Next applies the first matching redirect.
 *
 * Singular /doctor|/hospital|/blog paths map entity→entity (same slug under the
 * plural section). Unknown slugs 404 at the destination. Multi-segment leftovers
 * under those prefixes are 410 in the proxy — never dump them on section hubs.
 */
export const legacyRedirects = [
  // WordPress (core and Yoast) sitemap names still submitted or remembered by
  // Search Console: wp-sitemap.xml, wp-sitemap-posts-post-1.xml,
  // post-sitemap.xml, page-sitemap.xml, post-sitemap2.xml, …
  { source: "/wp-sitemap:suffix(.*)", destination: "/sitemap.xml", permanent: true },
  {
    source: "/:name([a-z0-9_-]+)-sitemap:page(\\d*)\\.xml",
    destination: "/sitemap.xml",
    permanent: true,
  },
  // Common hyphenated guess for the sitemap index (robots advertises underscore).
  { source: "/sitemap-index.xml", destination: "/sitemap.xml", permanent: true },
  // Old WordPress content sections — entity-level where the slug maps 1:1.
  { source: "/doctor", destination: "/doctors", permanent: true },
  { source: "/doctor/:slug", destination: "/doctors/:slug", permanent: true },
  { source: "/doctors2", destination: "/doctors", permanent: true },
  { source: "/hospital", destination: "/hospitals", permanent: true },
  { source: "/hospital/:slug", destination: "/hospitals/:slug", permanent: true },
  { source: "/hospital_country/india", destination: "/hospitals/India", permanent: true },
  { source: "/hospital_country/:path*", destination: "/hospitals", permanent: true },
  { source: "/specialities/:path+", destination: "/specialties", permanent: true },
  { source: "/treatments_detail", destination: "/treatments", permanent: true },
  { source: "/blog", destination: "/blogs", permanent: true },
  { source: "/blog/:slug", destination: "/blogs/:slug", permanent: true },
];

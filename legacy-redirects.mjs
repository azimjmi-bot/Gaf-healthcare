/**
 * Permanent redirects for URLs of the previous sites on this domain that have
 * a real successor here. Imported by next.config.mjs; patterns use Next's
 * path-to-regexp syntax. Old URLs without a successor are answered 410 by
 * src/proxy.ts (see src/lib/legacy-urls.ts).
 *
 * Order matters: Next applies the first matching redirect. next.config
 * redirects run before the proxy, so singular `/doctor|/hospital|/blog/:slug`
 * entity checks live in `src/lib/legacy-entity.ts` (proxy) — not here — so
 * unknown slugs can 410 without bouncing through the plural route.
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
  // Old WordPress section hubs (entity slugs are resolved in the proxy).
  { source: "/doctor", destination: "/doctors", permanent: true },
  { source: "/doctors2", destination: "/doctors", permanent: true },
  { source: "/hospital", destination: "/hospitals", permanent: true },
  { source: "/hospital_country/india", destination: "/hospitals/India", permanent: true },
  { source: "/hospital_country/:path*", destination: "/hospitals", permanent: true },
  { source: "/specialities/:path+", destination: "/specialties", permanent: true },
  { source: "/treatments_detail", destination: "/treatments", permanent: true },
  { source: "/blog", destination: "/blogs", permanent: true },
  // Approved Batch J/K equivalents (2026-11-21): orphan plural slugs → live catalogue profiles.
  { source: "/doctors/dr-meet-kumar", destination: "/doctors/dr-meet-kumar-1", permanent: true },
  { source: "/doctors/dr-mohd-qaleem", destination: "/doctors/dr-mohd-qaleem-1", permanent: true },
  { source: "/doctors/dr-vineet-goel", destination: "/doctors/dr-vineet-goel-1", permanent: true },
  {
    source: "/hospitals/wockhardt-hospital-mumbai",
    destination: "/hospitals/wockhardt-hospital",
    permanent: true,
  },
  // Verified nested → flat treatment successor (SEO migration forensic PR #44).
  // Clinical + search-intent equivalent; destination is the live curated page.
  {
    source: "/treatments/cardiology/pacemaker-implantation",
    destination: "/treatments/pacemaker-implantation-in-india",
    permanent: true,
  },
];

/**
 * Leftovers from the sites that lived on gaf.healthcare before this app.
 *
 * The previous WordPress install (still reachable at
 * gafhealthcare.ocpwebserver.com) published a wp-sitemap.xml full of theme
 * demo content — WooCommerce shop, portfolio, "pages/*" layouts, category and
 * tag archives — and WordPress system paths that bots keep probing. None of
 * it has a successor here, so the proxy answers 410 Gone from a static string
 * instead of rendering the App Router not-found page (~240 KB, full layout)
 * for every hit. Old URLs that do have a successor are 301s in
 * `legacy-redirects.mjs`.
 *
 * This module is imported by src/proxy.ts, so it must stay dependency-free.
 */
const GONE_FIRST_SEGMENTS = new Set([
  // WordPress core
  "wp-admin",
  "wp-content",
  "wp-includes",
  "wp-json",
  "feed",
  "comments",
  "author",
  "category",
  "tag",
  "type",
  "sample-page",
  // WooCommerce demo shop
  "shop",
  "shop-2",
  "product",
  "product-category",
  "product-tag",
  "cart",
  "cart-2",
  "checkout",
  "checkout-2",
  "my-account",
  "my-account-2",
  // Theme demo layouts
  "pages",
  "portfolio",
  "portfolio-category",
  "portfolios",
  "classic",
  "modern",
  "modern-sidebar",
  "standard-post",
  "video-post",
  "audio-post",
  "gallery-post",
  "terms-and-conditions",
]);

/**
 * Approved Batch J/K retirements (2026-11-21): confirmed-obsolete plural
 * doctor/hospital paths with no current catalogue equivalent. Tata Memorial
 * and the four verified 301 sources are intentionally absent.
 */
const LEGACY_GONE_EXACT_PATHS = new Set([
  "/doctors/dr-dhruv-zutshi",
  "/doctors/dr-gazi-osman",
  "/doctors/dr-imran-khan-fortis",
  "/doctors/dr-khaled-omar",
  "/doctors/dr-krishna-s-iyer",
  "/doctors/dr-nandini-baruah",
  "/doctors/dr-neel-shah",
  "/doctors/dr-omar-maqbool",
  "/doctors/dr-pawanindra-lal",
  "/doctors/dr-prafulla-kumar-singh",
  "/doctors/dr-prem-kumar-arora",
  "/doctors/dr-rahul-jain-plastic-surgeon",
  "/doctors/dr-rakesh-kumar-general-surgery",
  "/doctors/dr-roopesh-khanna-j",
  "/doctors/dr-sachin-mittal",
  "/doctors/dr-shaik-javed-hussain",
  "/doctors/dr-shiv-choudhary",
  "/doctors/dr-sriharish-vankayalapati",
  "/doctors/dr-subramanian-iyer",
  "/doctors/dr-suman-lal",
  "/doctors/dr-vikas-choudhary",
  "/doctors/dr-yugal-kishore-mishra",
  "/hospitals/apollo-hospitals-jubilee-hills-hyderabad",
  "/hospitals/apollo-hospitals-new-delhi",
  "/hospitals/best-hospitals-for-knee-replacement-in-india",
  "/hospitals/best-hospitals-for-tavi-procedure-in-india-for-international-patients",
  "/hospitals/burjeel-hospital-advanced-surgery-dubai",
  "/hospitals/fortis-escorts-heart-institute-new-delhi",
  "/hospitals/fortis-escorts-hospital-faridabad",
  "/hospitals/fortis-memorial-research-institute-gurgaon",
  "/hospitals/gleneagles-global-hospitals-mumbai",
  "/hospitals/hcg-cancer-centre-bangalore",
  "/hospitals/kings-college-hospital-dubai",
  "/hospitals/kokilaben-dhirubhai-ambani-hospital-mumbai",
  "/hospitals/manipal-hospitals-bengaluru",
  "/hospitals/manipal-hospitals-dwarka-delhi",
  "/hospitals/medanta-the-medicity",
  "/hospitals/metro-hospital-heart-institute-noida-sector-12",
  "/hospitals/shalby-hospital-jaipur",
  "/hospitals/sims-hospital-vadapalani-chennai",
]);

function normalizeLegacyPathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname || "/";
}

export function isLegacyGonePath(pathname: string): boolean {
  const normalized = normalizeLegacyPathname(pathname);
  if (LEGACY_GONE_EXACT_PATHS.has(normalized) || LEGACY_GONE_EXACT_PATHS.has(normalized.toLowerCase())) {
    return true;
  }
  const parts = normalized.split("/").filter(Boolean);
  const first = parts[0];
  if (!first) return false;
  if (first.startsWith("wp-")) return true;
  if (/\.php$/i.test(normalized)) return true;
  // WordPress exposes an RSS feed under every post, page and archive.
  if (parts[parts.length - 1] === "feed") return true;
  // Multi-segment singular leftovers. Single-segment entity slugs are resolved
  // in `legacy-entity.ts` (301 when known, 410 when unknown).
  if ((first === "doctor" || first === "hospital" || first === "blog") && parts.length > 2) {
    return true;
  }
  return GONE_FIRST_SEGMENTS.has(first);
}

/**
 * WordPress content queries. Unknown IDs must not soft-404 as the homepage.
 * Live routes use `page`, not `p` / `page_id`.
 */
export function isLegacyWordpressQuery(searchParams: URLSearchParams): boolean {
  return searchParams.has("p") || searchParams.has("page_id");
}

export const LEGACY_GONE_HTML = [
  "<!doctype html>",
  '<html lang="en"><head><meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1">',
  '<meta name="robots" content="noindex">',
  "<title>Page removed — GAF Healthcare</title>",
  "<style>body{font:16px/1.5 system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem;color:#1f2937}</style>",
  "</head><body>",
  "<h1>This page has been removed</h1>",
  "<p>It belonged to an earlier version of gaf.healthcare and no longer exists.</p>",
  '<p><a href="/">Go to the GAF Healthcare homepage</a> · <a href="/doctors">Find a doctor</a> · <a href="/hospitals">Browse hospitals</a></p>',
  "</body></html>",
].join("");

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

export function isLegacyGonePath(pathname: string): boolean {
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];
  if (!first) return false;
  if (first.startsWith("wp-")) return true;
  if (/\.php$/i.test(pathname)) return true;
  // WordPress exposes an RSS feed under every post, page and archive.
  if (parts[parts.length - 1] === "feed") return true;
  return GONE_FIRST_SEGMENTS.has(first);
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

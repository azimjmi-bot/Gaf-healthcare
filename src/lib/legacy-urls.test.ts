import assert from "node:assert/strict";
import { test } from "node:test";
import { LEGACY_GONE_HTML, isLegacyGonePath } from "./legacy-urls";

test("old WordPress sitemap entries without a successor are gone", () => {
  for (const path of [
    "/product/wall-clock",
    "/product-category/furniture",
    "/product-tag/wood",
    "/shop",
    "/shop-2",
    "/cart",
    "/checkout-2",
    "/my-account",
    "/portfolio/book-cover",
    "/portfolio-category/branding",
    "/portfolios/masonry-detailed-portfolio-2-columns",
    "/pages/about-classic",
    "/pages/privacy-policy",
    "/category/general",
    "/tag/business",
    "/type/audio",
    "/author/gafhealthcare",
    "/sample-page",
    "/classic",
    "/modern-sidebar",
    "/standard-post",
    "/video-post",
    "/terms-and-conditions",
  ]) {
    assert.equal(isLegacyGonePath(path), true, path);
  }
});

test("WordPress system paths are gone", () => {
  for (const path of [
    "/wp-json",
    "/wp-json/wp/v2/posts",
    "/wp-content/uploads/2021/01/logo.png",
    "/wp-includes/js/jquery/jquery.min.js",
    "/wp-admin",
    "/wp-login.php",
    "/xmlrpc.php",
    "/wp-cron.php",
    "/feed",
    "/comments/feed",
    "/blog/feed",
    "/category/general/feed",
  ]) {
    assert.equal(isLegacyGonePath(path), true, path);
  }
});

test("current site paths are never treated as gone", () => {
  for (const path of [
    "/",
    "/doctors",
    "/doctors/India/Delhi-NCR/Radiation-Oncology",
    "/doctors/dr-naresh-trehan",
    "/hospitals/India",
    "/treatments/breast-cancer-treatment-in-india",
    "/specialties",
    "/costs/gamma-knife",
    "/blogs",
    "/blogs/breast-cancer-treatment-by-stage",
    "/consult",
    "/kenya/treatment-in-india",
    "/ar/doctors/India",
    "/cms/login",
    "/api/cms/login",
    "/sitemap.xml",
    "/sitemap_index.xml",
    "/sitemap-en.xml",
    "/robots.txt",
    "/_next/static/chunks/main.js",
  ]) {
    assert.equal(isLegacyGonePath(path), false, path);
  }
});

test("the 410 body is small, noindex and links back into the site", () => {
  assert.ok(LEGACY_GONE_HTML.length < 1024);
  assert.match(LEGACY_GONE_HTML, /name="robots" content="noindex"/);
  assert.match(LEGACY_GONE_HTML, /href="\/"/);
});

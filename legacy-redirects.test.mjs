import assert from "node:assert/strict";
import { test } from "node:test";
import { createRequire } from "node:module";
import { legacyRedirects } from "./legacy-redirects.mjs";

const require = createRequire(import.meta.url);
// Next's own copy, so the patterns are checked by the same matcher that
// compiles next.config.mjs redirects.
const { match, compile } = require("next/dist/compiled/path-to-regexp");

const matchers = legacyRedirects.map((rule) => ({
  rule,
  match: match(rule.source, { decode: decodeURIComponent, sensitive: false }),
  toDestination: compile(rule.destination, { validate: false }),
}));

function resolve(pathname) {
  for (const { rule, match: matchPath, toDestination } of matchers) {
    const found = matchPath(pathname);
    if (found) return { destination: toDestination(found.params), permanent: rule.permanent };
  }
  return null;
}

test("every legacy redirect is permanent and compiles", () => {
  for (const rule of legacyRedirects) {
    assert.equal(rule.permanent, true, rule.source);
    assert.ok(rule.source.startsWith("/"), rule.source);
    assert.ok(rule.destination.startsWith("/"), rule.destination);
  }
});

test("old WordPress sitemap names fold into the current sitemap", () => {
  for (const path of [
    "/wp-sitemap.xml",
    "/wp-sitemap-posts-post-1.xml",
    "/wp-sitemap-taxonomies-category-1.xml",
    "/post-sitemap.xml",
    "/post-sitemap2.xml",
    "/page-sitemap.xml",
    "/category-sitemap.xml",
    "/post_tag-sitemap.xml",
    "/sitemap-index.xml",
  ]) {
    assert.deepEqual(resolve(path), { destination: "/sitemap.xml", permanent: true }, path);
  }
  for (const path of ["/sitemap.xml", "/sitemap_index.xml", "/sitemap-en.xml", "/sitemap-ar.xml", "/sitemap-blogs.xml"]) {
    assert.equal(resolve(path), null, path);
  }
});

test("old content section hubs still redirect; entity slugs are left for the proxy", () => {
  assert.equal(resolve("/doctor").destination, "/doctors");
  assert.equal(resolve("/doctors2").destination, "/doctors");
  assert.equal(resolve("/hospital").destination, "/hospitals");
  assert.equal(resolve("/hospital_country/india").destination, "/hospitals/India");
  assert.equal(resolve("/specialities/cancer/blood-cancer").destination, "/specialties");
  assert.equal(resolve("/specialities/ayurveda/abhyangam").destination, "/specialties");
  assert.equal(resolve("/treatments_detail").destination, "/treatments");
  assert.equal(resolve("/blog").destination, "/blogs");
  // Single-segment entity paths are resolved in src/lib/legacy-entity.ts so
  // unknown slugs can 410 without an intermediate plural hop.
  assert.equal(resolve("/doctor/dr-naresh-trehan"), null);
  assert.equal(resolve("/hospital/fortis-gurgaon"), null);
  assert.equal(resolve("/blog/breast-cancer-surgery-in-india"), null);
  assert.equal(resolve("/doctor/a/b"), null);
  assert.equal(resolve("/hospital/a/b"), null);
  assert.equal(resolve("/blog/2020/01/post"), null);
});

test("live routes are not caught by legacy redirects", () => {
  for (const path of [
    "/doctors",
    "/doctors/dr-naresh-trehan",
    "/doctors/India/Delhi-NCR",
    "/hospitals",
    "/hospitals/India/Chennai",
    "/specialties",
    "/treatments",
    "/treatments/breast-cancer-treatment-in-india",
    "/blogs",
    "/blogs/breast-cancer-treatment-by-stage",
    "/costs",
  ]) {
    assert.equal(resolve(path), null, path);
  }
});

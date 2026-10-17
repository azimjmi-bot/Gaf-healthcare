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
  ]) {
    assert.deepEqual(resolve(path), { destination: "/sitemap.xml", permanent: true }, path);
  }
  for (const path of ["/sitemap.xml", "/sitemap_index.xml", "/sitemap-en.xml", "/sitemap-ar.xml", "/sitemap-blogs.xml"]) {
    assert.equal(resolve(path), null, path);
  }
});

test("old content sections land on their successor", () => {
  assert.equal(resolve("/doctor/dr-naresh-trehan").destination, "/doctors/dr-naresh-trehan");
  assert.equal(resolve("/doctor/dr-inderjit-singh-parmar-2").destination, "/doctors");
  assert.equal(resolve("/doctor/doctor-3").destination, "/doctors");
  assert.equal(resolve("/doctors2").destination, "/doctors");
  assert.equal(resolve("/hospital/apollo-hospital").destination, "/hospitals");
  assert.equal(resolve("/hospital/rgcirc-hospital").destination, "/hospitals");
  assert.equal(resolve("/hospital_country/india").destination, "/hospitals/India");
  assert.equal(resolve("/specialities/cancer/blood-cancer").destination, "/specialties");
  assert.equal(resolve("/specialities/ayurveda/abhyangam").destination, "/specialties");
  assert.equal(resolve("/treatments_detail").destination, "/treatments");
  assert.equal(resolve("/blog").destination, "/blogs");
  assert.equal(resolve("/blog/some-old-post").destination, "/blogs");
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

import test from "node:test";
import assert from "node:assert/strict";
import { listPublishedPosts } from "@/lib/blogs";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { localePageState } from "@/lib/i18n/locale-publication";

const SHORT_BLOGS = [
  "imrt-vs-3d-crt",
  "when-proton-is-worth-the-flight",
  "srs-sbrt-and-a-short-stay",
  "brachytherapy-travel-logistics",
  "records-before-you-book-ebrt",
];

test("Arabic blog index publishes the translated articles and keeps English copy out of the title", () => {
  assert.equal(localePageState("ar", "/blogs"), "published");
  assert.equal(localePageState("en", "/blogs"), "published");
  const arabic = listPublishedPosts("ar");
  assert.ok(arabic.length >= SHORT_BLOGS.length);
  for (const slug of SHORT_BLOGS) {
    const post = arabic.find((row) => row.slug === slug);
    assert.ok(post, slug);
    assert.match(post.title, /[\u0600-\u06FF]/, slug);
    assert.match(post.excerpt, /[\u0600-\u06FF]/, slug);
    assert.equal(post.blocks.length, 3, slug);
    assert.doesNotMatch(post.title, /\bthe\b/i);
  }
});

test("Arabic treatment pages follow reviewed Arabic translations only", () => {
  const rows = publishedCuratedTreatments("ar");
  if (rows.length === 0) {
    assert.equal(localePageState("ar", "/treatments"), "missing");
    return;
  }
  assert.equal(localePageState("ar", "/treatments"), "published");
  for (const row of rows) {
    const copy = row.translations.ar;
    assert.equal(copy?.status, "published", row.slug);
    assert.match(copy?.name ?? "", /[\u0600-\u06FF]/, row.slug);
    assert.match(copy?.editorialBody ?? "", /[\u0600-\u06FF]/, row.slug);
  }
});

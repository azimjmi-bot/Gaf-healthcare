import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { orthopedicsArticles } from "./orthopedics";

const expectedSlugs = [
  "total-knee-replacement",
  "robotic-knee-replacement",
  "partial-knee-replacement",
  "revision-knee-replacement",
  "total-hip-replacement",
  "revision-hip-replacement",
  "hip-resurfacing",
  "shoulder-replacement",
  "acl-reconstruction-anterior-cruciate-ligament",
  "pcl-reconstruction-posterior-cruciate-ligament",
  "meniscus-repair",
  "rotator-cuff-repair",
  "arthroscopic-surgery",
  "fracture-fixation",
  "orif-open-reduction-and-internal-fixation",
  "non-union-repair",
  "carpal-tunnel-release",
  "tendon-repair",
  "hand-reconstruction",
  "ankle-replacement",
  "bunion-surgery",
  "achilles-repair",
];
const citySlugs = ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"];
const countries = [
  "India",
  "Turkey",
  "Thailand",
  "United Arab Emirates",
  "Singapore",
  "Germany",
  "United Kingdom",
  "United States",
];

test("all active Orthopedics procedures have long-form articles", () => {
  assert.deepEqual(
    orthopedicsArticles.map((article) => article.slug).sort(),
    expectedSlugs.sort(),
  );
  assert.equal(new Set(orthopedicsArticles.map((article) => article.seoTitle)).size, orthopedicsArticles.length);
  assert.equal(
    new Set(orthopedicsArticles.map((article) => article.seoDescription)).size,
    orthopedicsArticles.length,
  );
});

test("every Orthopedics article has complete city, comparison, FAQ and image coverage", () => {
  for (const article of orthopedicsArticles) {
    assert.deepEqual(
      article.cities.map((city) => city.citySlug),
      citySlugs,
      `${article.slug}: city coverage`,
    );
    assert.ok(article.cities.every((city) => city.page), `${article.slug}: city page copy`);
    assert.deepEqual(
      article.destinations.map((row) => row.country),
      countries,
      `${article.slug}: destination coverage`,
    );
    assert.ok(article.faqs.length >= 10 && article.faqs.length <= 15, `${article.slug}: FAQ count`);
    assert.equal(article.figures?.length, 3, `${article.slug}: image count`);
    for (const figure of article.figures ?? []) {
      assert.ok(figure.src.endsWith(".webp"), `${article.slug}: WebP required`);
      assert.ok(figure.alt.length >= 35, `${article.slug}: meaningful image alt`);
      assert.ok(existsSync(join(process.cwd(), "public", figure.src)), `${article.slug}: missing ${figure.src}`);
    }
  }
});

test("Orthopedics metadata does not duplicate the layout brand suffix", () => {
  for (const article of orthopedicsArticles) {
    assert.doesNotMatch(article.seoTitle, /GAF Healthcare/);
    for (const city of article.cities) {
      assert.doesNotMatch(city.page!.seoTitle, /GAF Healthcare/);
      assert.match(city.page!.heading, new RegExp(city.page!.seoTitle.split(" Cost in ")[0]));
    }
  }
});

test("Orthopedics copy retains cost tokens and never invents city tariffs", () => {
  for (const article of orthopedicsArticles) {
    assert.match(article.seoDescription, /\[INDIA_COST\]/);
    for (const city of article.cities) {
      assert.equal(city.costRange, undefined);
      assert.match(city.costNote, /\[INDIA_COST\]|planning band|tariff/i);
    }
  }
});

import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { MEDICAL_ONCOLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";
import { getCostArticle } from "./index";
import { medicalOncologyArticles } from "./medical-oncology";

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

test("all active Medical Oncology procedures have long-form articles", () => {
  assert.deepEqual(
    medicalOncologyArticles.map((article) => article.slug).sort(),
    MEDICAL_ONCOLOGY_PROCEDURES.map((name) => toSlug(name)).sort(),
  );
  assert.equal(
    new Set(medicalOncologyArticles.map((article) => article.seoTitle)).size,
    medicalOncologyArticles.length,
  );
  assert.equal(
    new Set(medicalOncologyArticles.map((article) => article.seoDescription)).size,
    medicalOncologyArticles.length,
  );
});

test("every Medical Oncology article has complete city, comparison, FAQ and image coverage", () => {
  for (const article of medicalOncologyArticles) {
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
    assert.ok(article.inclusions.length > 0, `${article.slug}: inclusions`);
    assert.ok(article.exclusions.length > 0, `${article.slug}: exclusions`);
    assert.ok(article.costDrivers.length > 0, `${article.slug}: cost drivers`);
    assert.ok(article.questionsToAsk.length >= 20, `${article.slug}: quote checklist`);
    assert.ok(
      article.topicSections?.some((section) => /side effect|risk|consideration/i.test(section.heading)),
      `${article.slug}: side effects`,
    );
    for (const figure of article.figures ?? []) {
      assert.ok(figure.src.endsWith(".webp"), `${article.slug}: WebP required`);
      assert.ok(figure.alt.length >= 50, `${article.slug}: meaningful image alt`);
      assert.ok(existsSync(join(process.cwd(), "public", figure.src)), `${article.slug}: missing ${figure.src}`);
    }
  }
});

test("Medical Oncology metadata does not duplicate the layout brand suffix", () => {
  for (const article of medicalOncologyArticles) {
    assert.doesNotMatch(article.seoTitle, /GAF Healthcare/);
    assert.match(article.seoTitle, /Cost in India/);
    for (const city of article.cities) {
      assert.doesNotMatch(city.page!.seoTitle, /GAF Healthcare/);
      assert.match(city.page!.heading, new RegExp(city.page!.seoTitle.split(" Cost in ")[0]));
    }
  }
});

test("Medical Oncology copy retains cost tokens and never invents city tariffs", () => {
  for (const article of medicalOncologyArticles) {
    assert.match(article.seoDescription, /\[INDIA_COST\]/);
    assert.match(article.heroSubtitle ?? "", /\[INDIA_COST\]/);
    assert.match(article.answer.join(" "), /\[INDIA_COST\]/);
    assert.match(article.indiaCost.join(" "), /\[INDIA_COST\]/);
    for (const city of article.cities) {
      assert.equal(city.costRange, undefined);
      assert.match(city.costNote, /\[INDIA_COST\]|planning band|tariff/i);
      assert.doesNotMatch(city.costNote, /\$\d/);
    }
  }
});

test("Medical Oncology articles are registered in the cost-article index", () => {
  assert.equal(getCostArticle("chemotherapy")?.procedure, "Chemotherapy");
  assert.equal(getCostArticle("immunotherapy")?.procedure, "Immunotherapy");
  assert.equal(getCostArticle("car-t-cell-therapy")?.procedure, "CAR-T Cell Therapy");
  assert.equal(getCostArticle("dendritic-cell-therapy")?.procedure, "Dendritic Cell Therapy");
});

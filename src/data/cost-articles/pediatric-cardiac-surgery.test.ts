import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { asdClosure } from "./asd-closure-atrial-septal-defect";
import { pediatricCardiacSurgeryArticles } from "./pediatric-cardiac-surgery";

const articles = [asdClosure, ...pediatricCardiacSurgeryArticles];
const expectedSlugs = [
  "asd-closure-atrial-septal-defect",
  "vsd-closure-ventricular-septal-defect",
  "tof-repair-tetralogy-of-fallot",
  "glenn-procedure",
  "fontan-procedure",
  "arterial-switch-operation",
  "pda-closure-patent-ductus-arteriosus",
  "norwood-procedure",
  "coarctation-repair",
  "avsd-repair-atrioventricular-septal-defect",
  "tapvc-repair-total-anomalous-pulmonary-venous-connection",
  "pediatric-heart-transplantation",
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

test("all active pediatric cardiac procedures have long-form articles", () => {
  assert.deepEqual(
    articles.map((article) => article.slug).sort(),
    expectedSlugs.sort(),
  );
  assert.equal(new Set(articles.map((article) => article.seoTitle)).size, articles.length);
  assert.equal(new Set(articles.map((article) => article.seoDescription)).size, articles.length);
});

test("every pediatric cardiac article has complete city, comparison, FAQ and image coverage", () => {
  for (const article of articles) {
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

test("pediatric cardiac metadata does not duplicate the layout brand suffix", () => {
  for (const article of articles) {
    assert.doesNotMatch(article.seoTitle, /GAF Healthcare/);
    for (const city of article.cities) {
      assert.doesNotMatch(city.page!.seoTitle, /GAF Healthcare/);
      assert.match(city.page!.heading, new RegExp(city.page!.seoTitle.split(" Cost in ")[0]));
    }
  }
});

test("copy retains dynamic cost tokens and never invents city tariffs", () => {
  for (const article of articles) {
    assert.match(article.seoDescription, /\[INDIA_COST\]/);
    for (const city of article.cities) {
      assert.equal(city.costRange, undefined);
      assert.match(city.costNote, /\[INDIA_COST\]|planning band|tariff/i);
    }
  }
});

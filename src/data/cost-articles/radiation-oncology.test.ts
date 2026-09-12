import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { RADIATION_PROCEDURES, toSlug } from "../../lib/taxonomy";
import { getCostArticle } from "./index";
import { radiationOncologyArticles } from "./radiation-oncology";

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

const cityTariffSlugs = new Set(["external-beam-radiotherapy-ebrt", "3d-conformal-radiotherapy-3d-crt"]);

test("all active Radiation Oncology procedures have long-form articles", () => {
  assert.deepEqual(
    radiationOncologyArticles.map((article) => article.slug).sort(),
    RADIATION_PROCEDURES.map((name) => toSlug(name)).sort(),
  );
  assert.equal(
    new Set(radiationOncologyArticles.map((article) => article.seoTitle)).size,
    radiationOncologyArticles.length,
  );
  assert.equal(
    new Set(radiationOncologyArticles.map((article) => article.seoDescription)).size,
    radiationOncologyArticles.length,
  );
});

test("every Radiation Oncology article has complete city, comparison, FAQ and image coverage", () => {
  for (const article of radiationOncologyArticles) {
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
    assert.ok(article.questionsToAsk.length > 0, `${article.slug}: quote checklist`);
    assert.ok(
      article.topicSections?.some((section) => /side effect|risk/i.test(section.heading)),
      `${article.slug}: side effects`,
    );
    for (const figure of article.figures ?? []) {
      assert.ok(figure.src.endsWith(".webp"), `${article.slug}: WebP required`);
      assert.ok(figure.alt.length >= 35, `${article.slug}: meaningful image alt`);
      assert.ok(existsSync(join(process.cwd(), "public", figure.src)), `${article.slug}: missing ${figure.src}`);
    }
  }
});

test("Radiation Oncology metadata does not duplicate the layout brand suffix", () => {
  for (const article of radiationOncologyArticles) {
    assert.doesNotMatch(article.seoTitle, /GAF Healthcare/);
    assert.match(article.seoTitle, /Cost in India/);
    for (const city of article.cities) {
      assert.doesNotMatch(city.page!.seoTitle, /GAF Healthcare/);
      assert.match(city.page!.heading, new RegExp(city.page!.seoTitle.split(" Cost in ")[0]));
    }
  }
});

test("Radiation Oncology copy retains cost tokens and labels city tariffs honestly", () => {
  for (const article of radiationOncologyArticles) {
    assert.match(article.seoDescription, /\[INDIA_COST\]/);
    assert.match(article.heroSubtitle ?? "", /\[INDIA_COST\]/);
    assert.match(article.answer.join(" "), /\[INDIA_COST\]/);
    assert.match(article.indiaCost.join(" "), /\[INDIA_COST\]/);
    for (const city of article.cities) {
      assert.match(city.costNote, /\[INDIA_COST\]|planning band|planning estimate|tariff/i);
      if (cityTariffSlugs.has(article.slug)) {
        assert.match(city.costRange ?? "", /\$\d/);
        assert.match(city.costNote, /planning estimate|planning band/i);
      } else {
        assert.equal(city.costRange, undefined, `${article.slug} ${city.citySlug}: invented city tariff`);
        assert.doesNotMatch(city.costNote, /\$\d/);
      }
    }
  }
});

test("Radiation Oncology articles are registered in the cost-article index", () => {
  assert.equal(getCostArticle("external-beam-radiotherapy-ebrt")?.procedure, "External Beam Radiotherapy (EBRT)");
  assert.equal(getCostArticle("intensity-modulated-radiotherapy-imrt")?.procedure, "Intensity-Modulated Radiotherapy (IMRT)");
  assert.equal(getCostArticle("proton-beam-therapy")?.procedure, "Proton Beam Therapy");
  assert.equal(getCostArticle("total-body-irradiation-tbi")?.procedure, "Total Body Irradiation (TBI)");
  assert.equal(getCostArticle("plaque-brachytherapy")?.procedure, "Plaque Brachytherapy");
});

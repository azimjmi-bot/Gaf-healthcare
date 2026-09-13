import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { PULMONOLOGY_PROCEDURES } from "../../lib/taxonomy";
import { getTreatment } from "../../lib/treatments";
import { getCostArticle } from "./index";
import {
  PULMONOLOGY_PILOT_PROCEDURES,
  pulmonologyArticles,
  pulmonologyArticlesBySlug,
} from "./pulmonology";

function countWords(value: unknown): number {
  if (typeof value === "string") {
    return value.match(/[A-Za-z0-9]+(?:['’–-][A-Za-z0-9]+)*/g)?.length ?? 0;
  }
  if (Array.isArray(value)) return value.reduce((sum, item) => sum + countWords(item), 0);
  if (value && typeof value === "object") {
    return Object.values(value).reduce((sum, item) => sum + countWords(item), 0);
  }
  return 0;
}

test("starts with Bronchoscopy as the representative CMS-backed Pulmonology guide", () => {
  assert.equal(PULMONOLOGY_PROCEDURES.length, 15);
  assert.deepEqual(PULMONOLOGY_PILOT_PROCEDURES, ["Bronchoscopy"]);
  assert.equal(pulmonologyArticles.length, 1);
  const article = pulmonologyArticles[0];
  assert.equal(article.procedure, "Bronchoscopy");
  assert.equal(getTreatment(article.slug)?.specialtySlug, "pulmonology");
  assert.equal(getCostArticle(article.slug), article);
  assert.equal(pulmonologyArticlesBySlug[article.slug], article);
});

test("pilot provides long-form respiratory content and extractable answers", () => {
  const article = pulmonologyArticles[0];
  const body = Object.fromEntries(
    Object.entries(article).filter(
      ([key]) => !["cities", "destinations", "figures", "seoTitle", "seoDescription"].includes(key),
    ),
  );
  assert.ok(countWords(body) >= 2_000 && countWords(body) <= 3_400);
  assert.ok(countWords(article.answer) >= 100 && countWords(article.answer) <= 150);
  assert.match(article.answer.join(" "), /Planning Range ≠ Final Hospital Quotation/);
  assert.equal(article.costDrivers.length, 10);
  assert.equal(article.faqs.length, 12);
  assert.ok(article.questionsToAsk.length >= 20);
  assert.equal(article.cities.length, 5);
  assert.equal(article.destinations.length, 8);
  assert.equal(article.fullPathway?.stages.length, 12);
  assert.equal(article.journey.length, 12);
  assert.match(JSON.stringify(article), /bronchoalveolar lavage/i);
  assert.match(JSON.stringify(article), /pneumothorax/i);
  assert.doesNotMatch(JSON.stringify(article), /\bbest (?:doctor|hospital|pulmonologist)|success rate|\d+(?:\.\d+)?%/i);
});

test("pilot ships three optimized WebP infographics", () => {
  const article = pulmonologyArticles[0];
  assert.equal(article.figures?.length, 3);
  for (const figure of article.figures ?? []) {
    assert.match(figure.src, /^\/images\/cost\/pulmonology\/bronchoscopy-(?:anatomy|procedure|recovery)\.webp$/);
    assert.ok(figure.alt.length >= 120);
    const file = join(process.cwd(), "public", figure.src);
    assert.ok(existsSync(file));
    const bytes = readFileSync(file);
    assert.equal(bytes.subarray(0, 4).toString("ascii"), "RIFF");
    assert.equal(bytes.subarray(8, 12).toString("ascii"), "WEBP");
    assert.ok(bytes.length < 120_000);
  }
});

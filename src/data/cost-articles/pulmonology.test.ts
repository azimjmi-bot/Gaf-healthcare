import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
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

test("publishes every active CMS-backed Pulmonology guide after the Bronchoscopy pilot", () => {
  assert.equal(PULMONOLOGY_PROCEDURES.length, 15);
  assert.deepEqual(PULMONOLOGY_PILOT_PROCEDURES, ["Bronchoscopy"]);
  assert.equal(pulmonologyArticles.length, 15);
  assert.deepEqual(
    pulmonologyArticles.map((article) => article.procedure),
    [...PULMONOLOGY_PROCEDURES],
  );
  assert.equal(pulmonologyArticles[0].procedure, "Bronchoscopy");
  for (const article of pulmonologyArticles) {
    assert.equal(getTreatment(article.slug)?.specialtySlug, "pulmonology");
    assert.equal(getCostArticle(article.slug), article);
    assert.equal(pulmonologyArticlesBySlug[article.slug], article);
  }
});

test("all guides provide long-form respiratory content and extractable answers", () => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const article of pulmonologyArticles) {
    const body = Object.fromEntries(
      Object.entries(article).filter(
        ([key]) =>
          !["cities", "destinations", "figures", "seoTitle", "seoDescription"].includes(key),
      ),
    );
    const bodyWords = countWords(body);
    assert.ok(bodyWords >= 2_000 && bodyWords <= 3_400, `${article.slug}: ${bodyWords} words`);
    const answerWords = countWords(article.answer);
    assert.ok(answerWords >= 100 && answerWords <= 150, `${article.slug}: ${answerWords} quick-answer words`);
    assert.match(article.answer.join(" "), /Planning Range ≠ Final Hospital Quotation/);
    assert.match(article.heading, /Cost in India$/);
    assert.ok(article.seoTitle.length <= 70, `${article.slug}: title too long`);
    assert.ok(article.seoDescription.length <= 170, `${article.slug}: description too long`);
    assert.ok(!titles.has(article.seoTitle), `${article.slug}: duplicate title`);
    assert.ok(!descriptions.has(article.seoDescription), `${article.slug}: duplicate description`);
    titles.add(article.seoTitle);
    descriptions.add(article.seoDescription);
    assert.equal(article.costDrivers.length, 10);
    assert.ok(article.faqs.length >= 10 && article.faqs.length <= 15);
    assert.ok(article.questionsToAsk.length >= 20);
    assert.equal(article.cities.length, 5);
    assert.equal(article.destinations.length, 8);
    assert.equal(article.fullPathway?.stages.length, 12);
    assert.equal(article.journey.length, 12);
    assert.equal(article.documents.length, 8);
    assert.equal(article.approachComparison?.rows.length, 4);
    assert.equal(article.topicSections?.length, 4);
    const text = JSON.stringify(article);
    assert.match(text, /pneumothorax|airway|pleural|transplant/i);
    assert.match(text, /may be considered/i);
    assert.doesNotMatch(
      text,
      /\bbest (?:doctor|hospital|pulmonologist)|success rate|\d+(?:\.\d+)?%|guaranteed (?:success|outcome|cure)/i,
    );
  }
});

test("all guides ship three unique optimized WebP infographics", () => {
  const directory = join(process.cwd(), "public/images/cost/pulmonology");
  const expected = new Set<string>();
  for (const article of pulmonologyArticles) {
    assert.equal(article.figures?.length, 3);
    assert.deepEqual(article.figures?.map((figure) => figure.after), ["overview", "how", "journey"]);
    for (const figure of article.figures ?? []) {
      assert.match(
        figure.src,
        new RegExp(`^/images/cost/pulmonology/${article.slug}-(?:anatomy|procedure|recovery)\\.webp$`),
      );
      assert.ok(figure.alt.length >= 120, `${figure.src}: alt too short`);
      assert.ok(!expected.has(figure.src), `${figure.src}: duplicate`);
      expected.add(figure.src);
      const file = join(process.cwd(), "public", figure.src);
      assert.ok(existsSync(file));
      const bytes = readFileSync(file);
      assert.equal(bytes.subarray(0, 4).toString("ascii"), "RIFF");
      assert.equal(bytes.subarray(8, 12).toString("ascii"), "WEBP");
      assert.ok(bytes.length < 120_000, `${figure.src}: too large`);
    }
  }
  assert.equal(expected.size, 45);
  assert.equal(readdirSync(directory).length, 45);
});

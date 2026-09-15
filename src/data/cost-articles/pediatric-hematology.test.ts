import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { PEDIATRIC_HEMATOLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";
import { getCostArticle } from "./index";
import {
  PEDIATRIC_HEMATOLOGY_NEW_PROCEDURES,
  pediatricHematologyArticles,
  pediatricHematologyArticlesBySlug,
} from "./pediatric-hematology";

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

const PREVIOUSLY_COVERED = PEDIATRIC_HEMATOLOGY_PROCEDURES.filter(
  (procedure) =>
    !PEDIATRIC_HEMATOLOGY_NEW_PROCEDURES.includes(
      procedure as (typeof PEDIATRIC_HEMATOLOGY_NEW_PROCEDURES)[number],
    ),
);

const specificity: Record<string, RegExp[]> = {
  "Pediatric Bone Marrow Transplantation": [
    /paediatric transplant unit|children’s-unit|children's-unit|pediatric isolation/i,
    /parent (?:who can stay|rooming-in|bed)/i,
    /weight-based/i,
    /adult (?:transplant )?floor/i,
    /late-effect|vaccination|growth/i,
  ],
  "Matched Sibling Donor Transplant": [
    /HLA-identical|fully HLA-matched|high-resolution/i,
    /donor (?:child|advocate)/i,
    /sibling (?:donor|harvest|marrow)/i,
    /haploidentical/i,
    /two-patient|both children/i,
  ],
  "Hematopoietic Stem Cell Transplantation": [
    /graft source/i,
    /cord/i,
    /cell dose per kilogram|CD34|nucleated-cell/i,
    /marrow harvest/i,
    /peripheral-blood/i,
  ],
};

test("exports exactly the three Pediatric Hematology-owned procedure articles", () => {
  assert.equal(pediatricHematologyArticles.length, 3);
  assert.deepEqual(
    pediatricHematologyArticles.map((article) => article.procedure).sort(),
    [...PEDIATRIC_HEMATOLOGY_NEW_PROCEDURES].sort(),
  );
  assert.equal(Object.keys(pediatricHematologyArticlesBySlug).length, 3);
  for (const article of pediatricHematologyArticles) {
    assert.equal(pediatricHematologyArticlesBySlug[article.slug], article);
  }
});

test("all ten Pediatric Hematology procedures resolve to one long-form article", () => {
  for (const procedure of PEDIATRIC_HEMATOLOGY_PROCEDURES) {
    assert.equal(getCostArticle(toSlug(procedure))?.procedure, procedure);
  }
  for (const procedure of PREVIOUSLY_COVERED) {
    assert.ok(getCostArticle(toSlug(procedure)));
    assert.equal(
      pediatricHematologyArticlesBySlug[toSlug(procedure)],
      undefined,
      `${procedure} must keep its existing Hematology or Medical Oncology article`,
    );
  }
});

test("each article has unique tokenized metadata and pediatric specialist labels", () => {
  assert.equal(
    new Set(pediatricHematologyArticles.map((article) => article.seoTitle)).size,
    pediatricHematologyArticles.length,
  );
  assert.equal(
    new Set(pediatricHematologyArticles.map((article) => article.seoDescription)).size,
    pediatricHematologyArticles.length,
  );
  for (const article of pediatricHematologyArticles) {
    assert.match(article.seoTitle, /Cost in India/);
    assert.doesNotMatch(article.seoTitle, /GAF Healthcare/);
    assert.match(article.seoDescription, /\[INDIA_COST\]/);
    assert.match(article.heroSubtitle ?? "", /\[INDIA_COST\]/);
    assert.match(article.answer.join(" "), /\[INDIA_COST\]/);
    assert.match(article.indiaCost.join(" "), /\[INDIA_COST\]/);
    assert.match(article.doctorHeading, /Pediatric hematologist/i);
    assert.match(article.cityDoctorHeading ?? "", /Pediatric hematologist/i);
    assert.match(article.hospitalHeading, /Hospitals for/i);
  }
});

test("each national article is a 2,000–3,000 word long-form guide", () => {
  const NOT_RENDERED = new Set(["slug", "lastUpdated", "seoTitle", "seoDescription", "alt"]);
  const countWords = (value: unknown): number => {
    if (typeof value === "string") {
      return value.match(/[A-Za-z0-9]+(?:['’–-][A-Za-z0-9]+)*/g)?.length ?? 0;
    }
    if (Array.isArray(value)) {
      return value.reduce((total: number, item) => total + countWords(item), 0);
    }
    if (value && typeof value === "object") {
      return Object.entries(value).reduce(
        (total, [key, item]) => (NOT_RENDERED.has(key) ? total : total + countWords(item)),
        0,
      );
    }
    return 0;
  };
  for (const article of pediatricHematologyArticles) {
    const { cities: _cities, destinations: _destinations, ...national } = article;
    const words = countWords(national);
    assert.ok(words >= 2_000 && words <= 3_000, `${article.slug} has ${words} rendered words`);
    const quickAnswer = article.answer.join(" ");
    const quickWords = quickAnswer.trim().split(/\s+/).length;
    assert.ok(quickWords >= 100 && quickWords <= 180, `${article.slug}: ${quickWords} Quick Answer words`);
    assert.match(quickAnswer, /Planning Range ≠ Final Hospital Quotation/);
  }
});

test("clinical copy stays procedure-specific and medically safe", () => {
  for (const article of pediatricHematologyArticles) {
    const text = JSON.stringify(article);
    for (const expected of specificity[article.procedure]) {
      assert.match(text, expected, `${article.slug}: missing ${expected}`);
    }
    assert.match(text, /individual/i);
    assert.doesNotMatch(text, /\b\d+(?:\.\d+)?%\b/);
    assert.doesNotMatch(
      text,
      /\bbest (?:doctor|surgeon|hospital|facility)|success rate|100% success|guaranteed success|cure rate|pain[- ]free|risk[- ]free\b/i,
    );
    assert.doesNotMatch(text, /\bwill cure\b|\bguarantee[sd]?\b/i);
  }
});

test("uses five meaningful city overlays without invented tariffs", () => {
  for (const article of pediatricHematologyArticles) {
    assert.deepEqual(article.cities.map((city) => city.citySlug), citySlugs);
    assert.equal(new Set(article.cities.map((city) => JSON.stringify(city.page))).size, 5);
    for (const city of article.cities) {
      assert.equal(city.costRange, undefined);
      assert.equal(city.stay, undefined);
      assert.match(city.costNote, /national planning range/i);
      assert.doesNotMatch(JSON.stringify(city), /[$€£]\s?\d/);
      assert.ok(city.page);
      assert.equal(city.page!.faqs.length, 5);
    }
  }
});

test("each article has the required destination comparison", () => {
  for (const article of pediatricHematologyArticles) {
    assert.deepEqual(
      article.destinations.map((destination) => destination.country),
      countries,
    );
    assert.match(article.destinations[0].stay, /\[STAY\]/);
    assert.match(article.destinations.at(-1)?.context ?? "", /\[US_COST\]/);
  }
});

test("each article has 10-15 FAQs, 20+ quote questions and three WebP figures", () => {
  for (const article of pediatricHematologyArticles) {
    assert.equal(article.faqs.length, 12);
    assert.ok(article.questionsToAsk.length >= 20);
    assert.equal(new Set(article.questionsToAsk).size, article.questionsToAsk.length);
    assert.equal(article.figures?.length, 3);
    assert.equal(
      article.figures?.[0]?.src,
      `/images/cost/pediatric-hematology/${article.slug}-illustration.webp`,
    );
    assert.deepEqual(
      article.figures?.map((figure) => figure.src),
      [
        `/images/cost/pediatric-hematology/${article.slug}-illustration.webp`,
        `/images/cost/pediatric-hematology/${article.slug}-pathway.webp`,
        `/images/cost/pediatric-hematology/${article.slug}-recovery.webp`,
      ],
    );
    for (const figure of article.figures ?? []) {
      assert.match(figure.src, /\.webp$/);
      assert.ok(figure.alt.length >= 55);
      assert.match(figure.alt, /pediatric hematology/i);
      assert.ok(
        existsSync(join(process.cwd(), "public", figure.src)),
        `${article.slug}: missing ${figure.src}`,
      );
    }
  }
});

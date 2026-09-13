import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { costsFilterPath } from "../../lib/catalog-links";
import { GYNECOLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";
import {
  GYNECOLOGY_EXCLUSIVE_PROCEDURES,
  GYNECOLOGY_PILOT_PROCEDURES,
  gynecologyArticles,
  gynecologyArticlesBySlug,
} from "./gynecology";

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

test("publishes exactly the laparoscopic hysterectomy pilot and preserves ownership", () => {
  assert.equal(GYNECOLOGY_PROCEDURES.length, 16);
  assert.equal(GYNECOLOGY_EXCLUSIVE_PROCEDURES.length, 15);
  assert.ok(!GYNECOLOGY_EXCLUSIVE_PROCEDURES.includes("Radical Hysterectomy" as never));
  assert.deepEqual(GYNECOLOGY_PILOT_PROCEDURES, ["Laparoscopic Hysterectomy"]);
  assert.equal(gynecologyArticles.length, 1);
  assert.equal(gynecologyArticles[0].procedure, "Laparoscopic Hysterectomy");
  assert.equal(
    gynecologyArticlesBySlug["laparoscopic-hysterectomy"],
    gynecologyArticles[0],
  );
  assert.equal(gynecologyArticlesBySlug[toSlug("Radical Hysterectomy")], undefined);
});

test("pilot uses complete CostArticle fields and a useful answer-first guide", () => {
  const article = gynecologyArticles[0];
  assert.equal(article.slug, "laparoscopic-hysterectomy");
  assert.match(article.heading, /^Laparoscopic Hysterectomy Cost in India$/);
  assert.match(article.seoTitle, /Laparoscopic Hysterectomy Cost in India/);
  assert.match(article.seoDescription, /\[INDIA_COST\]/);
  assert.match(article.heroSubtitle ?? "", /\[INDIA_COST\]/);
  assert.notEqual(article.heading, article.seoTitle);
  assert.notEqual(article.heroSubtitle, article.seoDescription);

  const quickAnswer = article.answer.join(" ");
  const quickWords = quickAnswer.trim().split(/\s+/).length;
  assert.ok(quickWords >= 100 && quickWords <= 150, `Quick Answer has ${quickWords} words`);
  assert.match(quickAnswer, /Planning Range ≠ Final Hospital Quotation/);

  const text = JSON.stringify(article);
  assert.match(text, /\[INDIA_COST\]/);
  assert.match(text, /\[US_COST\]/);
  assert.match(text, /\[STAY\]/);
  assert.ok((article.introduction ?? []).length >= 4);
  assert.ok((article.costComponents ?? []).length >= 6);
  assert.ok(article.inclusions.length >= 6);
  assert.ok(article.exclusions.length >= 5);
  assert.ok(article.costDrivers.length >= 8);
  assert.ok((article.topicSections ?? []).length >= 5);
  assert.ok((article.fullPathway?.stages ?? []).length >= 10);
  assert.ok(article.journey.length >= 12);
  assert.ok(article.documents.length >= 8);
  assert.ok((article.whyIndia ?? []).length >= 3);
  assert.ok(article.questionsToAsk.length >= 20);
  assert.equal(new Set(article.questionsToAsk).size, article.questionsToAsk.length);
  assert.equal(article.faqs.length, 12);
});

test("national article is a 2,000–3,000 word long-form guide", () => {
  const { cities: _cities, destinations: _destinations, ...national } =
    gynecologyArticles[0];
  const countWords = (value: unknown): number => {
    if (typeof value === "string") {
      return value.match(/[A-Za-z0-9]+(?:['’–-][A-Za-z0-9]+)*/g)?.length ?? 0;
    }
    if (Array.isArray(value)) {
      return value.reduce((total, item) => total + countWords(item), 0);
    }
    if (value && typeof value === "object") {
      return Object.values(value).reduce(
        (total, item) => total + countWords(item),
        0,
      );
    }
    return 0;
  };
  const words = countWords(national);
  assert.ok(words >= 2_000 && words <= 3_000, `national article has ${words} words`);
});

test("clinical copy explains scope, alternatives, pathology, safety and recovery", () => {
  const text = JSON.stringify(gynecologyArticles[0]);
  for (const expected of [
    /uterus/i,
    /cervix/i,
    /fallopian tubes/i,
    /ovarian conservation/i,
    /total.*uterus.*cervix/i,
    /does not.*ovaries/i,
    /carbon dioxide/i,
    /uterine vessels/i,
    /pedicles/i,
    /conversion.*abdominal incision|open conversion/i,
    /vaginal hysterectomy/i,
    /robotic hysterectomy/i,
    /open abdominal hysterectomy/i,
    /histopathology/i,
    /bladder/i,
    /ureters/i,
    /bowel/i,
    /venous thromboembolism/i,
    /vaginal-cuff/i,
    /individual/i,
    /fitness to fly/i,
  ]) {
    assert.match(text, expected);
  }
  assert.doesNotMatch(text, /\b\d+(?:\.\d+)?%\b/);
  assert.doesNotMatch(
    text,
    /\bbest (?:doctor|surgeon|hospital|facility)|success rate|100% success|guaranteed success|pain[- ]free|risk[- ]free\b/i,
  );
  assert.doesNotMatch(text, /always suitable|is automatically safer/i);
});

test("uses five meaningful city overlays without invented tariffs or capabilities", () => {
  const article = gynecologyArticles[0];
  assert.deepEqual(article.cities.map((city) => city.citySlug), citySlugs);
  assert.equal(new Set(article.cities.map((city) => JSON.stringify(city.page))).size, 5);
  for (const city of article.cities) {
    assert.equal(city.costRange, undefined);
    assert.equal(city.stay, undefined);
    assert.match(city.costNote, /national planning range/i);
    assert.doesNotMatch(JSON.stringify(city), /[$€£]\s?\d/);
    assert.ok(city.page);
    assert.ok(city.page.intro.length >= 5);
    assert.equal(city.page.faqs.length, 5);
    assert.ok(`${city.ecosystem} ${city.logistics}`.split(/\s+/).length >= 100);
    const gate = `${city.ecosystem} ${city.page.hospitalDiscussion.join(" ")}`;
    assert.match(gate, /exact live CMS relationships/);
    assert.match(gate, /cards must remain empty/);
    assert.match(gate, /catalog gap/);
    assert.doesNotMatch(gate, /performs \d+|cases per year|24\/7 capability/i);
  }
});

test("uses the exact eight-destination inventory and restrained comparisons", () => {
  const article = gynecologyArticles[0];
  assert.deepEqual(article.destinations.map((row) => row.country), countries);
  assert.equal(article.destinations.length, 8);
  assert.match(JSON.stringify(article.destinations), /\[US_COST\]/);
  for (const destination of article.destinations) {
    assert.ok(destination.stay);
    assert.ok(destination.context.length >= 70);
  }
});

test("uses the existing pretty cost route convention", () => {
  assert.equal(
    costsFilterPath({
      destination: "India",
      specialty: "Gynecology",
      procedure: "Laparoscopic Hysterectomy",
    }),
    "/costs/India/Gynecology/Laparoscopic-Hysterectomy",
  );
  assert.equal(
    costsFilterPath({
      destination: "India",
      city: "Mumbai",
      specialty: "Gynecology",
      procedure: "Laparoscopic Hysterectomy",
    }),
    "/costs/India/Mumbai/Gynecology/Laparoscopic-Hysterectomy",
  );
});

test("declares and ships exactly three descriptive WebP figures", () => {
  const article = gynecologyArticles[0];
  assert.equal(article.figures?.length, 3);
  assert.deepEqual(
    article.figures?.map((figure) => figure.src),
    [
      "/images/cost/gynecology/laparoscopic-hysterectomy-anatomy.webp",
      "/images/cost/gynecology/laparoscopic-hysterectomy-procedure.webp",
      "/images/cost/gynecology/laparoscopic-hysterectomy-recovery.webp",
    ],
  );
  const directory = join(process.cwd(), "public/images/cost/gynecology");
  for (const figure of article.figures ?? []) {
    assert.ok(figure.alt.length >= 120);
    assert.match(figure.src, /\.webp$/);
    const path = join(process.cwd(), "public", figure.src);
    assert.ok(existsSync(path), `missing ${figure.src}`);
    const bytes = readFileSync(path);
    assert.equal(bytes.subarray(0, 4).toString("ascii"), "RIFF");
    assert.equal(bytes.subarray(8, 12).toString("ascii"), "WEBP");
  }
  assert.deepEqual(
    readdirSync(directory).sort(),
    [
      "laparoscopic-hysterectomy-anatomy.webp",
      "laparoscopic-hysterectomy-procedure.webp",
      "laparoscopic-hysterectomy-recovery.webp",
    ],
  );
});

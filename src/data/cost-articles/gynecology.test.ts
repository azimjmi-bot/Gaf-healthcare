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
import { getCostArticle } from "./index";

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

const specificity: Record<string, RegExp[]> = {
  "Laparoscopic Hysterectomy": [/total means uterus plus cervix/i, /uterine vessels and pedicles/i, /open conversion/i],
  "Robotic Hysterectomy": [/console/i, /not an autonomous surgeon|not.*guaranteed superior/i, /docking/i],
  "Vaginal Hysterectomy": [/vaginal route/i, /prolapse compartments/i, /apical support/i],
  "Abdominal Hysterectomy": [/laparotomy/i, /open recovery|longer than minimally invasive/i, /vertical midline/i],
  "Laparoscopic Myomectomy": [/FIGO/i, /cavity relationship/i, /layered uterine repair/i],
  "Robotic Myomectomy": [/FIGO/i, /console/i, /does not promise fertility|not guarantee fertility/i],
  "Hysteroscopic Myomectomy": [/fluid.*deficit|fluid overload/i, /perforation/i, /staged resection/i],
  "Endometriosis Surgery": [/superficial/i, /deep/i, /endometrioma/i, /ovarian reserve/i],
  "Hysteroscopic Polypectomy": [/direct vision/i, /polyp.*base/i, /pathology/i],
  "Ovarian Cyst Surgery": [/cystectomy/i, /ovarian preservation|preserving ovarian/i, /torsion.*emergency/i],
  Oophorectomy: [/unilateral/i, /bilateral/i, /surgical menopause/i],
  "Salpingo-Oophorectomy": [/explicitly includes both tube and ovary|tube and ovary together/i, /genetics/i, /risk reduction/i],
  "Pelvic Organ Prolapse Surgery": [/anterior/i, /apical/i, /posterior/i, /pessary/i, /mesh.*consent/i],
  "Pelvic Floor Repair": [/cystocele/i, /rectocele/i, /perineal/i, /defecatory/i],
  "Gynecologic Cancer Surgery": [/type and stage/i, /frozen section/i, /nodes/i, /debulk|cytoreduction/i, /additional therapy/i],
};

test("publishes all 15 exclusive procedures and preserves shared ownership", () => {
  assert.equal(GYNECOLOGY_PROCEDURES.length, 16);
  assert.equal(GYNECOLOGY_EXCLUSIVE_PROCEDURES.length, 15);
  assert.ok(!GYNECOLOGY_EXCLUSIVE_PROCEDURES.includes("Radical Hysterectomy" as never));
  assert.deepEqual(GYNECOLOGY_PILOT_PROCEDURES, ["Laparoscopic Hysterectomy"]);
  assert.equal(gynecologyArticles.length, 15);
  assert.deepEqual(
    gynecologyArticles.map((article) => article.procedure).sort(),
    [...GYNECOLOGY_EXCLUSIVE_PROCEDURES].sort(),
  );
  assert.equal(gynecologyArticlesBySlug[toSlug("Radical Hysterectomy")], undefined);
  for (const article of gynecologyArticles) {
    assert.equal(gynecologyArticlesBySlug[article.slug], article);
    assert.equal(getCostArticle(article.slug), article);
  }
});

test("every article has unique metadata and complete long-form fields", () => {
  for (const field of ["slug", "seoTitle", "seoDescription", "heading", "heroSubtitle"] as const) {
    assert.equal(new Set(gynecologyArticles.map((article) => article[field])).size, 15);
  }
  for (const article of gynecologyArticles) {
    assert.match(article.heading, /Cost in India$/);
    assert.match(article.seoDescription, /\[INDIA_COST\]/);
    assert.match(article.heroSubtitle ?? "", /\[INDIA_COST\]/);
    const quickAnswer = article.answer.join(" ");
    const quickWords = quickAnswer.trim().split(/\s+/).length;
    assert.ok(quickWords >= 100 && quickWords <= 150, `${article.slug}: ${quickWords} Quick Answer words`);
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
  }
});

test("every national article is a 2,000–3,000 word long-form guide", () => {
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
  for (const article of gynecologyArticles) {
    const { cities: _cities, destinations: _destinations, ...national } = article;
    const words = countWords(national);
    assert.ok(words >= 2_000 && words <= 3_000, `${article.slug} has ${words} words`);
  }
});

test("clinical copy explains scope, alternatives, pathology, safety and recovery", () => {
  for (const article of gynecologyArticles) {
    const text = JSON.stringify(article);
    for (const expected of specificity[article.procedure]) {
      assert.match(text, expected, `${article.slug}: missing ${expected}`);
    }
    assert.match(text, /individual/i);
    assert.match(text, /pathology/i);
    assert.doesNotMatch(text, /\b\d+(?:\.\d+)?%\b/);
    assert.doesNotMatch(text, /\bbest (?:doctor|surgeon|hospital|facility)|success rate|100% success|guaranteed success|pain[- ]free|risk[- ]free\b/i);
  }
});

test("uses five meaningful city overlays without invented tariffs or capabilities", () => {
  for (const article of gynecologyArticles) {
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
  }
});

test("uses the exact eight-destination inventory and restrained comparisons", () => {
  for (const article of gynecologyArticles) {
    assert.deepEqual(article.destinations.map((row) => row.country), countries);
    assert.equal(article.destinations.length, 8);
    assert.match(JSON.stringify(article.destinations), /\[US_COST\]/);
    for (const destination of article.destinations) {
      assert.ok(destination.stay);
      assert.ok(destination.context.length >= 70);
    }
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

test("declares and ships exactly 45 unique descriptive WebP figures", () => {
  const directory = join(process.cwd(), "public/images/cost/gynecology");
  const sources = new Set<string>();
  for (const article of gynecologyArticles) {
    assert.equal(article.figures?.length, 3);
    assert.deepEqual(article.figures?.map((figure) => figure.src), [
      `/images/cost/gynecology/${article.slug}-anatomy.webp`,
      `/images/cost/gynecology/${article.slug}-procedure.webp`,
      `/images/cost/gynecology/${article.slug}-recovery.webp`,
    ]);
    for (const figure of article.figures ?? []) {
      assert.ok(figure.alt.length >= 120);
      assert.ok(!sources.has(figure.src));
      sources.add(figure.src);
      const path = join(process.cwd(), "public", figure.src);
      assert.ok(existsSync(path), `missing ${figure.src}`);
      const bytes = readFileSync(path);
      assert.equal(bytes.subarray(0, 4).toString("ascii"), "RIFF");
      assert.equal(bytes.subarray(8, 12).toString("ascii"), "WEBP");
    }
  }
  assert.equal(sources.size, 45);
  const files = readdirSync(directory);
  assert.equal(files.length, 45);
  assert.ok(files.every((file) => file.endsWith(".webp")));
});

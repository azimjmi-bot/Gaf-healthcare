import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import {
  BARIATRIC_PROCEDURES,
  toSlug,
} from "../../lib/taxonomy";
import {
  bariatricSurgeryArticles,
  bariatricSurgeryArticlesBySlug,
} from "./bariatric-surgery";
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
  "Sleeve Gastrectomy": [/greater.curvature/i, /staple.line/i, /reflux/i],
  "Gastric Bypass (Roux-en-Y)": [/dumping/i, /micronutrient/i, /internal hernia/i],
  "Mini Gastric Bypass (OAGB/MGB)": [/one.anastomosis/i, /bile reflux/i, /bypass length/i],
  "Gastric Balloon": [/temporary/i, /intolerance/i, /removal/i],
  "Endoscopic Sleeve Gastroplasty (ESG)": [/full.thickness/i, /suture/i, /not surgery/i],
  "Metabolic Surgery for Type 2 Diabetes": [/HbA1c/i, /hypoglycaemia/i, /actual named operation/i],
  "Gastric Sleeve Revision Surgery": [/adhesion/i, /leak/i, /altered.anatomy/i],
  "SADI-S Surgery": [/duodeno.ileal/i, /protein.calorie malnutrition/i, /fat.soluble vitamin/i],
  "Duodenal Switch (BPD/DS)": [/biliopancreatic limb/i, /protein.calorie malnutrition/i, /common channel/i],
  "Gastric Banding (Lap-Band)": [/slippage/i, /erosion/i, /port/i],
  "Gastric Band Removal": [/slippage/i, /erosion/i, /staged conversion/i],
};

function articleText(article: (typeof bariatricSurgeryArticles)[number]): string {
  return JSON.stringify(article);
}

function wordCount(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

test("exports exactly all 11 active Bariatric Surgery articles and slug lookup", () => {
  assert.equal(bariatricSurgeryArticles.length, 11);
  assert.deepEqual(
    bariatricSurgeryArticles.map((article) => article.procedure).sort(),
    [...BARIATRIC_PROCEDURES].sort(),
  );
  assert.deepEqual(
    bariatricSurgeryArticles.map((article) => article.slug).sort(),
    BARIATRIC_PROCEDURES.map(toSlug).sort(),
  );
  assert.equal(Object.keys(bariatricSurgeryArticlesBySlug).length, 11);
  for (const article of bariatricSurgeryArticles) {
    assert.equal(bariatricSurgeryArticlesBySlug[article.slug], article);
    assert.equal(getCostArticle(article.slug), article);
  }
});

test("metadata, H1 and subtitles are unique, answer-first and tokenized", () => {
  for (const field of ["slug", "seoTitle", "seoDescription", "heading", "heroSubtitle"] as const) {
    assert.equal(
      new Set(bariatricSurgeryArticles.map((article) => article[field])).size,
      bariatricSurgeryArticles.length,
      `${field} must be unique`,
    );
  }

  for (const article of bariatricSurgeryArticles) {
    assert.match(article.heading, /Cost in India/);
    assert.match(article.seoDescription, /\[INDIA_COST\]/);
    assert.match(article.heroSubtitle ?? "", /\[INDIA_COST\]/);
    assert.match(article.answer[0], /\[INDIA_COST\]/);
    assert.match(article.answer.join(" "), /national/i);
    assert.match(article.indiaCost.join(" "), /\[INDIA_COST\]/);
    assert.ok(
      wordCount(article.answer.join(" ")) >= 100 &&
        wordCount(article.answer.join(" ")) <= 180,
      `${article.slug}: answer-first copy should be about 100–150 words`,
    );
  }
});

test("every article has five materially distinct city overlays and an exact CMS gate", () => {
  for (const article of bariatricSurgeryArticles) {
    assert.deepEqual(
      article.cities.map((city) => city.citySlug),
      citySlugs,
      `${article.slug}: city coverage`,
    );
    assert.equal(
      new Set(article.cities.map((city) => JSON.stringify(city.page))).size,
      5,
      `${article.slug}: city overlays must differ`,
    );

    for (const city of article.cities) {
      assert.equal(city.costRange, undefined, `${article.slug}/${city.citySlug}: city tariff`);
      assert.equal(city.stay, undefined, `${article.slug}/${city.citySlug}: city stay`);
      assert.ok(city.page, `${article.slug}/${city.citySlug}: page copy`);
      assert.match(city.costNote, /\[INDIA_COST\]/);
      assert.match(city.costNote, /national planning range/i);
      assert.doesNotMatch(city.costNote, /[$€£]\s?\d/);
      assert.match(city.page!.subtitle ?? "", /national planning range/i);
      assert.ok(city.page!.intro.length >= 5);
      assert.ok(city.page!.costExplanation.length >= 3);
      assert.ok(city.page!.medicalTourism.length >= 3);
      assert.ok(city.page!.hospitalDiscussion.length >= 2);
      assert.equal(city.page!.faqs.length, 5);

      const gate = `${city.ecosystem} ${city.page!.hospitalDiscussion.join(" ")}`;
      assert.match(gate, /exact CMS entity|exactly tag|exact live CMS/i);
      assert.match(gate, /cards must remain empty/i);
      assert.match(gate, /catalog gap/i);
    }
  }
});

test("country inventory and substantive planning sections are complete", () => {
  const activeProcedures = new Set<string>(BARIATRIC_PROCEDURES);
  for (const article of bariatricSurgeryArticles) {
    assert.deepEqual(
      article.destinations.map((destination) => destination.country),
      countries,
      `${article.slug}: destination inventory`,
    );
    assert.equal(article.destinations.length, 8);
    assert.match(article.destinations[0].stay, /\[STAY\]/);
    assert.match(article.destinations.at(-1)?.context ?? "", /\[US_COST\]/);
    assert.ok(article.costComponents && article.costComponents.length >= 5);
    assert.ok(article.costDrivers.length >= 5);
    assert.ok(article.inclusions.length >= 5);
    assert.ok(article.exclusions.length >= 5);
    assert.ok(article.whyIndia && article.whyIndia.length >= 3);
    assert.ok(article.documents.length >= 7);
    assert.ok(article.journey.length >= 10);
    assert.ok((article.fullPathway?.stages.length ?? 0) >= 6);
    assert.ok(article.topicSections?.some((section) => /nutrition/i.test(section.heading)));
    assert.ok(article.topicSections?.some((section) => /risk|recovery/i.test(section.heading)));
    assert.ok(article.relatedProcedures.length >= 3);
    assert.ok(
      article.relatedProcedures.every((procedure) => activeProcedures.has(procedure)),
      `${article.slug}: related procedures must already exist in Bariatric taxonomy`,
    );
  }
});

test("clinical and quotation content is unique, direct and procedure-specific", () => {
  for (const field of [
    "costDrivers",
    "inclusions",
    "exclusions",
    "overview",
    "fullPathway",
    "documents",
  ] as const) {
    assert.equal(
      new Set(
        bariatricSurgeryArticles.map((article) => JSON.stringify(article[field])),
      ).size,
      bariatricSurgeryArticles.length,
      `${field} must differ by procedure`,
    );
  }

  for (const article of bariatricSurgeryArticles) {
    assert.ok(article.questionsToAsk.length >= 20, `${article.slug}: quote questions`);
    assert.equal(new Set(article.questionsToAsk).size, article.questionsToAsk.length);
    assert.ok(article.questionsToAsk.every((question) => question.endsWith("?")));
    assert.ok(article.faqs.length >= 10 && article.faqs.length <= 15);
    assert.equal(article.faqs.length, 12);
    assert.ok(article.faqs.every((faq) => faq.q.endsWith("?") && faq.a.length >= 40));

    const text = articleText(article);
    assert.match(text, /hydration/i);
    assert.match(text, /protein/i);
    assert.match(text, /liquid/i);
    assert.match(text, /pur[eé]ed/i);
    assert.match(text, /individual/i);
    assert.match(text, /BMI/i);
    assert.match(text, /no single|universal BMI|BMI alone|BMI.*not enough/i);
    for (const expected of specificity[article.procedure]) {
      assert.match(text, expected, `${article.slug}: missing ${expected}`);
    }
  }
});

test("balloon and ESG are endoscopic, while removals and revisions are altered-anatomy care", () => {
  for (const slug of ["gastric-balloon", "endoscopic-sleeve-gastroplasty-esg"]) {
    const text = articleText(bariatricSurgeryArticlesBySlug[slug]);
    assert.match(text, /endoscop/i);
    assert.match(text, /not surgery/i);
  }

  for (const slug of ["gastric-sleeve-revision-surgery", "gastric-band-removal"]) {
    const text = articleText(bariatricSurgeryArticlesBySlug[slug]);
    assert.match(text, /altered.anatomy/i);
    assert.match(text, /adhesion/i);
  }
});

test("each article declares the three required WebP figures and files exist", () => {
  for (const article of bariatricSurgeryArticles) {
    assert.equal(article.figures?.length, 3, `${article.slug}: figure count`);
    assert.deepEqual(
      article.figures?.map((figure) => figure.after),
      ["overview", "how", "journey"],
    );
    assert.deepEqual(
      article.figures?.map((figure) => figure.src),
      [
        `/images/cost/bariatric-surgery/${article.slug}-illustration.webp`,
        "/images/cost/bariatric-surgery/bariatric-treatment-pathway.webp",
        "/images/cost/bariatric-surgery/bariatric-nutrition-follow-up.webp",
      ],
    );
    for (const figure of article.figures ?? []) {
      assert.match(figure.src, /\.webp$/);
      assert.ok(figure.alt.length >= 55);
      assert.ok(
        existsSync(join(process.cwd(), "public", figure.src)),
        `${article.slug}: missing ${figure.src}`,
      );
    }
  }
});

test("copy contains no city tariffs, rankings, outcome claims or numerical rates", () => {
  for (const article of bariatricSurgeryArticles) {
    const text = articleText(article);
    assert.match(text, /\[INDIA_COST\]/);
    assert.match(text, /\[US_COST\]/);
    assert.match(text, /\[STAY\]/);
    assert.doesNotMatch(
      text,
      /Delhi NCR.{0,80}[$€£]\s?\d|Mumbai.{0,80}[$€£]\s?\d|Bengaluru.{0,80}[$€£]\s?\d|Chennai.{0,80}[$€£]\s?\d|Hyderabad.{0,80}[$€£]\s?\d/i,
    );
    assert.doesNotMatch(text, /\b\d+(?:\.\d+)?%\b/);
    assert.doesNotMatch(
      text,
      /\bbest (?:doctor|surgeon|hospital|centre)|success rate|mortality rate|cases per year|guaranteed (?:weight|result|outcome)\b/i,
    );
  }
});

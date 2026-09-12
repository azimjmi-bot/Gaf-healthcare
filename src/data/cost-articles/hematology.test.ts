import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import {
  HEMATOLOGY_PROCEDURES,
  MEDICAL_ONCOLOGY_PROCEDURES,
  toSlug,
} from "../../lib/taxonomy";
import {
  hematologyArticles,
  hematologyExclusiveArticles,
  hematologyExclusiveArticlesBySlug,
} from "./hematology";
import { getCostArticle } from "./index";

const expectedProcedures = HEMATOLOGY_PROCEDURES.filter(
  (procedure) =>
    !MEDICAL_ONCOLOGY_PROCEDURES.includes(
      procedure as (typeof MEDICAL_ONCOLOGY_PROCEDURES)[number],
    ),
);
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

test("exports exactly the six Hematology-only active procedure articles", () => {
  assert.equal(hematologyExclusiveArticles.length, 6);
  assert.deepEqual(
    hematologyExclusiveArticles.map((article) => article.procedure).sort(),
    [...expectedProcedures].sort(),
  );
  assert.deepEqual(
    hematologyExclusiveArticles.map((article) => article.slug).sort(),
    expectedProcedures.map(toSlug).sort(),
  );
  assert.equal(Object.keys(hematologyExclusiveArticlesBySlug).length, 6);
  for (const article of hematologyExclusiveArticles) {
    assert.equal(hematologyExclusiveArticlesBySlug[article.slug], article);
  }
});

test("all ten active Hematology procedures resolve to one long-form article", () => {
  assert.deepEqual(
    hematologyArticles.map((article) => article.procedure).sort(),
    [...HEMATOLOGY_PROCEDURES].sort(),
  );
  assert.equal(new Set(hematologyArticles.map((article) => article.slug)).size, 10);
  for (const procedure of HEMATOLOGY_PROCEDURES) {
    assert.equal(getCostArticle(toSlug(procedure))?.procedure, procedure);
  }
});

test("each article has unique tokenized metadata and Hematology specialist labels", () => {
  assert.equal(
    new Set(hematologyExclusiveArticles.map((article) => article.seoTitle)).size,
    hematologyExclusiveArticles.length,
  );
  assert.equal(
    new Set(hematologyExclusiveArticles.map((article) => article.seoDescription)).size,
    hematologyExclusiveArticles.length,
  );

  for (const article of hematologyExclusiveArticles) {
    assert.match(article.seoTitle, /Cost in India/);
    assert.doesNotMatch(article.seoTitle, /GAF Healthcare/);
    assert.match(article.seoDescription, /\[INDIA_COST\]/);
    assert.match(article.heroSubtitle ?? "", /\[INDIA_COST\]/);
    assert.match(article.answer.join(" "), /\[INDIA_COST\]/);
    assert.match(article.indiaCost.join(" "), /\[INDIA_COST\]/);
    assert.match(article.doctorHeading, /Hematologist/i);
    assert.match(article.cityDoctorHeading ?? "", /Hematologist/i);
    assert.match(article.hospitalHeading, /Hematology/i);
  }
});

test("each article has five substantive city overlays without invented city tariffs", () => {
  for (const article of hematologyExclusiveArticles) {
    assert.deepEqual(
      article.cities.map((city) => city.citySlug),
      citySlugs,
      `${article.slug}: city coverage`,
    );
    assert.equal(
      new Set(article.cities.map((city) => city.page?.intro.join(" "))).size,
      5,
      `${article.slug}: city overlays must differ`,
    );

    for (const city of article.cities) {
      assert.equal(city.costRange, undefined, `${article.slug} ${city.citySlug}: city tariff`);
      assert.match(city.costNote, /\[INDIA_COST\]/);
      assert.match(city.costNote, /planning range/i);
      assert.match(city.costNote, /not a guaranteed package/i);
      assert.doesNotMatch(city.costNote, /\$\d/);
      assert.ok(city.page, `${article.slug} ${city.citySlug}: city page`);
      assert.match(city.page!.seoDescription, /\[INDIA_COST\]/);
      assert.match(city.page!.subtitle ?? "", /not a .*tariff|not a final hospital quotation/i);
      assert.equal(city.page!.faqs.length, 5);
    }
  }
});

test("each article has the required destination comparison and planning disclaimer", () => {
  for (const article of hematologyExclusiveArticles) {
    assert.deepEqual(
      article.destinations.map((destination) => destination.country),
      countries,
      `${article.slug}: countries`,
    );
    assert.equal(article.destinations.length, 8);
    assert.match(article.destinationNote ?? "", /planning information/i);
    assert.match(article.destinationNote ?? "", /can change the final amount/i);
    assert.match(article.destinations[0].stay, /\[STAY\]/);
    assert.match(article.destinations.at(-1)?.context ?? "", /\[US_COST\]/);
  }
});

test("clinical, quote and record content is procedure-specific and substantial", () => {
  const fields = [
    "inclusions",
    "exclusions",
    "costDrivers",
    "documents",
    "fullPathway",
    "topicSections",
  ] as const;

  for (const field of fields) {
    assert.equal(
      new Set(
        hematologyExclusiveArticles.map((article) =>
          JSON.stringify(article[field]),
        ),
      ).size,
      hematologyExclusiveArticles.length,
      `${field} must differ by procedure`,
    );
  }

  for (const article of hematologyExclusiveArticles) {
    assert.ok(article.inclusions.length >= 5, `${article.slug}: inclusions`);
    assert.ok(article.exclusions.length >= 5, `${article.slug}: exclusions`);
    assert.ok(article.costDrivers.length >= 5, `${article.slug}: cost drivers`);
    assert.ok(article.documents.length >= 5, `${article.slug}: records`);
    assert.ok(
      (article.fullPathway?.stages.length ?? 0) >= 6,
      `${article.slug}: timeline`,
    );
    assert.ok(
      article.topicSections?.some((section) => /risk|safety/i.test(section.heading)),
      `${article.slug}: risks`,
    );
    assert.match(
      article.overview.recovery.join(" "),
      /urgent|fever|bleeding|infection|breathing/i,
      `${article.slug}: safety-net advice`,
    );
    assert.ok(article.questionsToAsk.length >= 20, `${article.slug}: quote questions`);
    assert.equal(
      new Set(article.questionsToAsk).size,
      article.questionsToAsk.length,
      `${article.slug}: duplicate quote questions`,
    );
  }
});

test("each article has 10-15 direct-answer FAQs", () => {
  for (const article of hematologyExclusiveArticles) {
    assert.ok(
      article.faqs.length >= 10 && article.faqs.length <= 15,
      `${article.slug}: FAQ count`,
    );
    assert.equal(article.faqs.length, 12);
    for (const faq of article.faqs) {
      assert.ok(faq.q.endsWith("?"), `${article.slug}: question punctuation`);
      assert.ok(faq.a.length >= 45, `${article.slug}: direct answer`);
    }
  }
});

test("figure paths use one procedure illustration and two shared Hematology figures", () => {
  const uniqueIllustrations = new Set<string>();
  for (const article of hematologyExclusiveArticles) {
    assert.equal(article.figures?.length, 3, `${article.slug}: figure count`);
    assert.deepEqual(
      article.figures?.map((figure) => figure.src),
      [
        `/images/cost/hematology/${article.slug}-illustration.webp`,
        "/images/cost/hematology/hematology-treatment-pathway.webp",
        "/images/cost/hematology/hematology-international-journey.webp",
      ],
    );
    uniqueIllustrations.add(article.figures![0].src);
    for (const figure of article.figures ?? []) {
      assert.match(figure.src, /\.webp$/);
      assert.ok(figure.alt.length >= 55, `${article.slug}: meaningful alt`);
      assert.ok(
        existsSync(join(process.cwd(), "public", figure.src)),
        `${article.slug}: missing ${figure.src}`,
      );
    }
  }
  assert.equal(uniqueIllustrations.size, 6);
});

import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { NEPHROLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";
import { costsFilterPath } from "../../lib/catalog-links";
import { parsePrettyCatalogSegments } from "../../lib/pretty-catalog-path";
import {
  NEPHROLOGY_EXCLUSIVE_PROCEDURES,
  nephrologyArticles,
  nephrologyArticlesBySlug,
} from "./nephrology";
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

const SHARED = [
  "Kidney Transplantation",
  "Living Donor Kidney Transplantation",
  "Deceased Donor Kidney Transplantation",
  "ABO-Incompatible Kidney Transplantation",
  "Plasmapheresis",
] as const;

const specificity: Record<string, RegExp[]> = {
  Hemodialysis: [/dialyzer/i, /not peritoneal dialysis/i, /annual planning/i],
  "Peritoneal Dialysis": [/CAPD or APD|CAPD/i, /not hemodialysis/i, /peritonitis/i],
  "Continuous Renal Replacement Therapy (CRRT)": [/ICU/i, /not maintenance HD/i, /poor first international/i],
  "Sustained Low-Efficiency Dialysis (SLED)": [/hybrid/i, /not CRRT/i, /6–12 hours/i],
  "Dialysis Catheter Placement": [/not permcath insertion by another name/i, /temporary/i, /ultrasound/i],
  "AV Fistula Creation": [/artery to a vein|anastomos/i, /not dialysis access management/i, /maturation/i],
  "Dialysis Access Management": [/not first-time AV fistula/i, /fistuloplasty|stenosis/i, /salvage/i],
  "Percutaneous Renal Biopsy": [/native kidney/i, /not a transplant graft biopsy/i, /immunofluorescence/i],
  "Kidney Transplant Graft Biopsy": [/allograft/i, /not a native/i, /Banff/i],
  "CAPD Catheter Insertion": [/not the peritoneal-dialysis therapy slug/i, /exit site/i, /few CMS clinicians/i],
  "Central Venous Catheter (Permcath) Insertion": [/tunnelled/i, /not non-tunnelled/i, /cavo-atrial|cuff/i],
  "Paired Kidney Exchange (Swap Transplant)": [/incompatible/i, /not the Kidney Transplantation operation/i, /Urology/i],
  "Kidney Transplant Evaluation and Follow-up": [/not Kidney Transplantation/i, /HLA/i, /shared Urology/i],
};

test("exports every exclusive Nephrology article without replacing shared slugs", () => {
  assert.equal(nephrologyArticles.length, 13);
  assert.deepEqual(
    nephrologyArticles.map((article) => article.procedure).sort(),
    [...NEPHROLOGY_EXCLUSIVE_PROCEDURES].sort(),
  );
  for (const name of SHARED) {
    assert.ok(!NEPHROLOGY_EXCLUSIVE_PROCEDURES.includes(name as never));
    assert.ok(!nephrologyArticlesBySlug[toSlug(name)]);
  }
  for (const article of nephrologyArticles) {
    assert.equal(nephrologyArticlesBySlug[article.slug], article);
    assert.equal(getCostArticle(article.slug), article);
  }
  assert.equal(getCostArticle("kidney-transplantation"), undefined);
  assert.equal(getCostArticle("plasmapheresis")?.procedure, "Plasmapheresis");
  for (const name of NEPHROLOGY_EXCLUSIVE_PROCEDURES) {
    assert.ok(getCostArticle(toSlug(name)), `missing article for ${name}`);
  }
  assert.equal(NEPHROLOGY_PROCEDURES.length, 18);
});

test("metadata, H1, subtitles and clinical blocks are unique and direct", () => {
  for (const field of ["slug", "seoTitle", "seoDescription", "heading", "heroSubtitle"] as const) {
    assert.equal(
      new Set(nephrologyArticles.map((article) => article[field])).size,
      nephrologyArticles.length,
      `${field} must be unique`,
    );
  }
  for (const article of nephrologyArticles) {
    assert.match(article.heading, /Cost in India/);
    assert.match(article.heroSubtitle ?? "", /\[INDIA_COST\]/);
    assert.ok((article.heroSubtitle ?? "").length < 500);
    assert.match(article.answer.join(" "), /Planning Range ≠ Final Hospital Quotation/);
    assert.match(article.indiaCost.join(" "), /\[INDIA_COST\]/);
    assert.doesNotMatch(article.seoTitle, /GAF Healthcare/);
    assert.ok(article.costDrivers.length >= 5);
    assert.ok(article.inclusions.length >= 5);
    assert.ok(article.exclusions.length >= 5);
    assert.ok(article.questionsToAsk.length >= 20);
    assert.equal(article.faqs.length, 12);
    assert.equal(new Set(article.questionsToAsk).size, article.questionsToAsk.length);
  }
});

test("all pages use exact country and city inventories without invented city prices", () => {
  for (const article of nephrologyArticles) {
    assert.deepEqual(article.destinations.map((row) => row.country), countries);
    assert.deepEqual(article.cities.map((row) => row.citySlug), citySlugs);
    assert.equal(new Set(article.cities.map((row) => JSON.stringify(row.page))).size, 5);
    for (const city of article.cities) {
      assert.equal(city.costRange, undefined);
      assert.equal(city.stay, undefined);
      assert.match(city.costNote, /national planning range/i);
      assert.doesNotMatch(city.costNote, /[$€£]\s?\d/);
      assert.ok(city.page!.intro.length >= 5);
      assert.equal(city.page!.faqs.length, 5);
      const gate = `${city.ecosystem} ${city.page!.hospitalDiscussion.join(" ")}`;
      assert.match(gate, /exact live CMS|exact CMS/i);
      assert.match(gate, /cards must remain empty/i);
      assert.match(gate, /catalog gap/i);
    }
  }
});

test("clinical copy is procedure-specific and medically restrained", () => {
  const knownNames = new Set<string>(NEPHROLOGY_EXCLUSIVE_PROCEDURES);
  for (const article of nephrologyArticles) {
    const text = JSON.stringify(article);
    for (const expected of specificity[article.procedure]) {
      assert.match(text, expected, `${article.slug}: missing ${expected}`);
    }
    assert.match(text, /individual/i);
    assert.doesNotMatch(text, /\b\d+(?:\.\d+)?%\b/);
    assert.doesNotMatch(
      text,
      /\bbest (?:doctor|surgeon|hospital|facility)|success rate|100% success|guaranteed success\b/i,
    );
    assert.ok(article.relatedProcedures.length >= 2);
    for (const related of article.relatedProcedures) {
      assert.ok(knownNames.has(related), `${article.slug}: unknown related ${related}`);
    }
  }
});

test("parenthesis Nephrology names stay in one pretty-path segment", () => {
  const crrt = costsFilterPath({
    destination: "India",
    specialty: "Nephrology",
    procedure: "Continuous Renal Replacement Therapy (CRRT)",
  });
  assert.equal(crrt, "/costs/India/Nephrology/Continuous-Renal-Replacement-Therapy-(CRRT)");
  assert.deepEqual(parsePrettyCatalogSegments(crrt.split("/").slice(2)), {
    destination: "India",
    specialty: "Nephrology",
    procedure: "Continuous Renal Replacement Therapy (CRRT)",
  });
  const swap = costsFilterPath({
    destination: "India",
    city: "Mumbai",
    specialty: "Nephrology",
    procedure: "Paired Kidney Exchange (Swap Transplant)",
  });
  assert.equal(
    swap,
    "/costs/India/Mumbai/Nephrology/Paired-Kidney-Exchange-(Swap-Transplant)",
  );
});

test("each exclusive procedure declares three unique, descriptive WebP figures", () => {
  const allSources = new Set<string>();
  for (const article of nephrologyArticles) {
    assert.equal(article.figures?.length, 3);
    assert.deepEqual(
      article.figures?.map((figure) => figure.src),
      [
        `/images/cost/nephrology/${article.slug}-anatomy.webp`,
        `/images/cost/nephrology/${article.slug}-procedure.webp`,
        `/images/cost/nephrology/${article.slug}-recovery.webp`,
      ],
    );
    for (const figure of article.figures ?? []) {
      assert.match(figure.src, /\.webp$/);
      assert.ok(figure.alt.length >= 70);
      assert.ok(!allSources.has(figure.src));
      allSources.add(figure.src);
      assert.ok(existsSync(join(process.cwd(), "public", figure.src)), `missing ${figure.src}`);
    }
  }
  assert.equal(allSources.size, 39);
});

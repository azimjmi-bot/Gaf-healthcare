import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { SURGICAL_GASTROENTEROLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";
import { costsFilterPath } from "../../lib/catalog-links";
import { parsePrettyCatalogSegments } from "../../lib/pretty-catalog-path";
import {
  SURGICAL_GASTRO_EXCLUSIVE_PROCEDURES,
  surgicalGastroenterologyArticles,
  surgicalGastroenterologyArticlesBySlug,
} from "./surgical-gastroenterology";
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
  "Liver Resection (Hepatectomy)",
  "Gastrectomy",
  "Esophagectomy",
  "Sleeve Gastrectomy",
] as const;

const specificity: Record<string, RegExp[]> = {
  "Liver Transplantation": [/MELD|PELD/i, /immunosuppression/i, /living-donor and deceased-donor/i],
  "Living Donor Liver Transplantation": [/donor hepatectomy/i, /not deceased-donor/i, /volumetry/i],
  "Deceased Donor Liver Transplantation": [/allocation/i, /not living-donor/i, /wait-list/i],
  "Pediatric Liver Transplantation": [/biliary atresia|Kasai/i, /paediatric ICU/i, /not an adult transplant list/i],
  "Liver Retransplantation": [/failed .*graft|second graft/i, /not a first transplant/i, /hostile abdomen/i],
  "Whipple Procedure (Pancreaticoduodenectomy)": [/pancreatic head/i, /not the surgical-oncology Whipple/i, /delayed gastric emptying/i],
  "Distal Pancreatectomy": [/left of the portal vein/i, /not a Whipple/i, /spleen/i],
  Pancreatectomy: [/not the surgical-oncology pancreatic-surgery/i, /total pancreatectomy/i, /central/i],
  "Biliary Reconstruction": [/hepaticojejunostomy/i, /not a routine cholecystectomy/i, /not ERCP stenting/i],
  "Gallbladder Cancer Surgery": [/liver-bed|IVb/i, /not a simple laparoscopic cholecystectomy/i, /incidental/i],
  "Bile Duct Cancer Surgery": [/cholangiocarcinoma|Bismuth/i, /not ERCP stenting/i, /future-liver remnant/i],
  "Anti-Reflux Surgery (Nissen Fundoplication)": [/manometry and pH/i, /not endoscopic POEM/i, /360/i],
  "Hiatal Hernia Surgery": [/para-oesophageal|hiatus/i, /not a groin hernia/i, /no verified clinician cards/i],
  "Heller Myotomy for Achalasia": [/achalasia/i, /not POEM/i, /no verified clinician cards/i],
  "Colorectal Cancer Surgery": [/colon or rectum/i, /not the named LAR/i, /stoma/i],
  "Colorectal Resection": [/diverticular|IBD/i, /not automatically a cancer operation/i, /Hartmann/i],
  "Low Anterior Resection (LAR)": [/sphincter/i, /not APR/i, /diverting ileostomy/i],
  "Abdominoperineal Resection (APR)": [/permanent .*colostomy/i, /not LAR/i, /perineal/i],
  "Total Mesorectal Excision (TME)": [/mesorectal/i, /plane, not a consumer upgrade/i, /LAR or APR/i],
  "Ostomy / Stoma Surgery": [/appliance/i, /not automatically a reversal/i, /ileostomy versus colostomy/i],
  "Gastric Bypass Surgery": [/not the Bariatric Surgery Roux-en-Y/i, /pouch/i, /vitamin/i],
};

test("exports every exclusive Surgical Gastroenterology article without replacing shared slugs", () => {
  assert.equal(surgicalGastroenterologyArticles.length, 21);
  assert.deepEqual(
    surgicalGastroenterologyArticles.map((article) => article.procedure).sort(),
    [...SURGICAL_GASTRO_EXCLUSIVE_PROCEDURES].sort(),
  );
  for (const name of SHARED) {
    assert.ok(!SURGICAL_GASTRO_EXCLUSIVE_PROCEDURES.includes(name as never));
  }
  for (const article of surgicalGastroenterologyArticles) {
    assert.equal(surgicalGastroenterologyArticlesBySlug[article.slug], article);
    assert.equal(getCostArticle(article.slug), article);
  }
  assert.equal(getCostArticle("liver-resection-hepatectomy")?.procedure, "Liver Resection (Hepatectomy)");
  assert.equal(getCostArticle("gastrectomy")?.procedure, "Gastrectomy");
  assert.equal(getCostArticle("esophagectomy")?.procedure, "Esophagectomy");
  assert.equal(getCostArticle("whipple-procedure")?.procedure, "Whipple Procedure");
  assert.equal(getCostArticle("gastric-bypass-roux-en-y")?.procedure, "Gastric Bypass (Roux-en-Y)");
  assert.ok(!surgicalGastroenterologyArticlesBySlug["liver-resection-hepatectomy"]);
  assert.ok(!surgicalGastroenterologyArticlesBySlug["whipple-procedure"]);
  assert.ok(!surgicalGastroenterologyArticlesBySlug["gastric-bypass-roux-en-y"]);
  assert.ok(!surgicalGastroenterologyArticlesBySlug["sleeve-gastrectomy"]);
  for (const name of SURGICAL_GASTROENTEROLOGY_PROCEDURES) {
    assert.ok(getCostArticle(toSlug(name)), `missing article for ${name}`);
  }
});

test("metadata, H1, subtitles and clinical blocks are unique and direct", () => {
  for (const field of ["slug", "seoTitle", "seoDescription", "heading", "heroSubtitle"] as const) {
    assert.equal(
      new Set(surgicalGastroenterologyArticles.map((article) => article[field])).size,
      surgicalGastroenterologyArticles.length,
      `${field} must be unique`,
    );
  }
  for (const article of surgicalGastroenterologyArticles) {
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
  for (const article of surgicalGastroenterologyArticles) {
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
  const knownNames = new Set<string>(SURGICAL_GASTRO_EXCLUSIVE_PROCEDURES);
  for (const article of surgicalGastroenterologyArticles) {
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

test("slash and parenthesis Surgical Gastroenterology names stay in one pretty-path segment", () => {
  const ostomy = costsFilterPath({
    destination: "India",
    specialty: "Surgical Gastroenterology",
    procedure: "Ostomy / Stoma Surgery",
  });
  assert.equal(ostomy, "/costs/India/Surgical-Gastroenterology/Ostomy-Stoma-Surgery");
  assert.deepEqual(parsePrettyCatalogSegments(ostomy.split("/").slice(2)), {
    destination: "India",
    specialty: "Surgical Gastroenterology",
    procedure: "Ostomy / Stoma Surgery",
  });
  const whipple = costsFilterPath({
    destination: "India",
    city: "Mumbai",
    specialty: "Surgical Gastroenterology",
    procedure: "Whipple Procedure (Pancreaticoduodenectomy)",
  });
  assert.equal(
    whipple,
    "/costs/India/Mumbai/Surgical-Gastroenterology/Whipple-Procedure-(Pancreaticoduodenectomy)",
  );
});

test("each exclusive procedure declares three unique, descriptive WebP figures", () => {
  const allSources = new Set<string>();
  for (const article of surgicalGastroenterologyArticles) {
    assert.equal(article.figures?.length, 3);
    assert.deepEqual(
      article.figures?.map((figure) => figure.src),
      [
        `/images/cost/surgical-gastroenterology/${article.slug}-anatomy.webp`,
        `/images/cost/surgical-gastroenterology/${article.slug}-procedure.webp`,
        `/images/cost/surgical-gastroenterology/${article.slug}-recovery.webp`,
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
  assert.equal(allSources.size, 63);
});

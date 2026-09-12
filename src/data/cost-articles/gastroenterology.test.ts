import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { GASTROENTEROLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";
import { costsFilterPath } from "../../lib/catalog-links";
import { parsePrettyCatalogSegments } from "../../lib/pretty-catalog-path";
import { gastroenterologyArticles, gastroenterologyArticlesBySlug } from "./gastroenterology";
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
  "Upper GI Endoscopy (Gastroscopy)": [/oesophagus|esophagus/i, /duodenum/i, /not examine the colon/i],
  Colonoscopy: [/polyp/i, /bowel prep|preparation/i, /delayed bleeding/i],
  ERCP: [/pancreatitis/i, /papilla/i, /not a first-line look at the stomach/i],
  "Endoscopic Ultrasound (EUS)": [/echoendoscope|FNA|FNB/i, /pancrea/i, /not a replacement for colonoscopy/i],
  "Capsule Endoscopy": [/swallowable/i, /retention/i, /cannot take biopsies/i],
  Enteroscopy: [/balloon/i, /jejunum|ileum|small-bowel/i, /not a first screening/i],
  "Biliary Stenting": [/plastic versus metal|plastic or metal/i, /PTBD/i, /does not remove every stone/i],
  "Bile Duct Stone Removal": [/sphincterotomy/i, /choledocholithiasis|gallbladder-removal/i, /cholangioscopy/i],
  Cholangioscopy: [/direct(?:ly)? inside the bile duct|SpyGlass|direct-vision/i, /not a first ERCP/i, /lithotripsy/i],
  "Peroral Endoscopic Myotomy (POEM)": [/achalasia/i, /submucosal tunnel/i, /not a fundoplication/i],
  "G-POEM": [/pyloromyotomy|gastroparesis/i, /not oesophageal POEM|not esophageal POEM/i, /emptying/i],
  "Z-POEM": [/Zenker/i, /cricopharyngeal/i, /not oesophageal achalasia/i],
  "Endoscopic Mucosal Resection (EMR)": [/lift/i, /snare/i, /not ESD/i],
  "Endoscopic Submucosal Dissection (ESD)": [/en-bloc/i, /submucosa/i, /not EMR/i],
  "STER (Submucosal Tunneling Endoscopic Resection)": [/submucosal tumour|GIST/i, /not ESD/i, /tunnel/i],
  "Endoscopic Hemostasis": [/clip/i, /not variceal band ligation/i, /rebleeding/i],
  "Variceal Band Ligation": [/portal hypertension/i, /not the same CMS procedure as generic/i, /beta-blocker/i],
  "Foreign Body Removal": [/airway/i, /not a diagnostic gastroscopy/i, /battery|sharp/i],
  "Liver Biopsy": [/percutaneous/i, /not a transjugular/i, /coagulation/i],
  "Transjugular Liver Biopsy": [/hepatic vein/i, /not a percutaneous/i, /not a TIPS/i],
  "PTBD (Percutaneous Transhepatic Biliary Drainage)": [/percutaneous/i, /not ERCP/i, /external bag|drain/i],
  "Esophageal Manometry": [/Chicago|high-resolution/i, /does not treat/i, /not pH-impedance/i],
  "Anorectal Manometry": [/sphincter/i, /not a colonoscopy/i, /biofeedback/i],
  "Bariatric / Metabolic Endoscopy": [/not the Bariatric Surgery sheet/i, /ESG|Gastric Balloon/i, /not promised/i],
};

test("exports every Gastroenterology article without replacing ESG or gastric balloon", () => {
  assert.equal(gastroenterologyArticles.length, GASTROENTEROLOGY_PROCEDURES.length);
  assert.deepEqual(
    gastroenterologyArticles.map((article) => article.procedure).sort(),
    [...GASTROENTEROLOGY_PROCEDURES].sort(),
  );
  for (const article of gastroenterologyArticles) {
    assert.equal(gastroenterologyArticlesBySlug[article.slug], article);
    assert.equal(getCostArticle(article.slug), article);
  }
  assert.equal(getCostArticle("endoscopic-sleeve-gastroplasty-esg")?.procedure, "Endoscopic Sleeve Gastroplasty (ESG)");
  assert.equal(getCostArticle("gastric-balloon")?.procedure, "Gastric Balloon");
  assert.ok(!gastroenterologyArticlesBySlug["endoscopic-sleeve-gastroplasty-esg"]);
  assert.ok(!gastroenterologyArticlesBySlug["gastric-balloon"]);
});

test("metadata, H1, subtitles and clinical blocks are unique and direct", () => {
  for (const field of ["slug", "seoTitle", "seoDescription", "heading", "heroSubtitle"] as const) {
    assert.equal(
      new Set(gastroenterologyArticles.map((article) => article[field])).size,
      gastroenterologyArticles.length,
      `${field} must be unique`,
    );
  }
  for (const article of gastroenterologyArticles) {
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
  for (const article of gastroenterologyArticles) {
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
  const knownNames = new Set<string>(GASTROENTEROLOGY_PROCEDURES);
  for (const article of gastroenterologyArticles) {
    const text = JSON.stringify(article);
    for (const expected of specificity[article.procedure]) {
      assert.match(text, expected, `${article.slug}: missing ${expected}`);
    }
    assert.match(text, /individual/i);
    assert.doesNotMatch(text, /\b\d+(?:\.\d+)?%\b/);
    assert.doesNotMatch(
      text,
      /\bbest (?:doctor|gastroenterologist|hospital|facility)|success rate|100% success|guaranteed success\b/i,
    );
    assert.ok(article.relatedProcedures.length >= 2);
    for (const related of article.relatedProcedures) {
      assert.ok(knownNames.has(related), `${article.slug}: unknown related ${related}`);
    }
  }
});

test("slash and parenthesis GI names stay in one pretty-path segment", () => {
  const metabolic = costsFilterPath({
    destination: "India",
    specialty: "Gastroenterology",
    procedure: "Bariatric / Metabolic Endoscopy",
  });
  assert.equal(metabolic, "/costs/India/Gastroenterology/Bariatric-Metabolic-Endoscopy");
  assert.deepEqual(parsePrettyCatalogSegments(metabolic.split("/").slice(2)), {
    destination: "India",
    specialty: "Gastroenterology",
    procedure: "Bariatric / Metabolic Endoscopy",
  });
  const ptbd = costsFilterPath({
    destination: "India",
    city: "Chennai",
    specialty: "Gastroenterology",
    procedure: "PTBD (Percutaneous Transhepatic Biliary Drainage)",
  });
  assert.equal(ptbd, "/costs/India/Chennai/Gastroenterology/PTBD-(Percutaneous-Transhepatic-Biliary-Drainage)");
});

test("each procedure declares three unique, descriptive WebP figures", () => {
  const allSources = new Set<string>();
  for (const article of gastroenterologyArticles) {
    assert.equal(article.figures?.length, 3);
    assert.deepEqual(
      article.figures?.map((figure) => figure.src),
      [
        `/images/cost/gastroenterology/${article.slug}-anatomy.webp`,
        `/images/cost/gastroenterology/${article.slug}-procedure.webp`,
        `/images/cost/gastroenterology/${article.slug}-recovery.webp`,
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
  assert.equal(allSources.size, GASTROENTEROLOGY_PROCEDURES.length * 3);
});

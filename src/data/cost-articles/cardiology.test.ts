import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { CARDIOLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";
import { costsFilterPath } from "../../lib/catalog-links";
import { parsePrettyCatalogSegments } from "../../lib/pretty-catalog-path";
import { cardiologyArticles, cardiologyArticlesBySlug } from "./cardiology";
import { getCostArticle } from "./index";

const exclusiveProcedures = CARDIOLOGY_PROCEDURES.filter(
  (name) => name !== "TAVR/TAVI (Transcatheter Aortic Valve Replacement)",
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

const specificity: Record<string, RegExp[]> = {
  "Coronary Angioplasty & Stenting": [/drug-eluting/i, /stent thrombosis/i, /restenosis/i],
  "Coronary Angiography": [/diagnostic/i, /same-sitting PCI/i, /FFR|IVUS|OCT/i],
  "Atrial Fibrillation Ablation": [/pulmonary vein/i, /cryoballoon/i, /anticoagul/i],
  "Pacemaker Implantation": [/single-chamber/i, /dual-chamber/i, /pneumothorax/i],
  MitraClip: [/edge-to-edge/i, /transoesophageal|TOE/i, /regurgitation/i],
  "ICD Implantation (Implantable Cardioverter-Defibrillator)": [
    /defibrillat/i,
    /inappropriate shocks/i,
    /subcutaneous ICD/i,
  ],
  "CTO Angioplasty (Chronic Total Occlusion)": [/retrograde/i, /collateral/i, /perforation/i],
  "Radiofrequency Ablation": [/cavotricuspid/i, /heart block/i, /AF-ablation pathway/i],
  "Balloon Mitral Valvotomy": [/Wilkins/i, /Inoue/i, /commissure/i],
  "CRT/CRT-D Implantation": [/coronary sinus/i, /dyssynchrony/i, /CRT-D/i],
  "ASD Device Closure": [/occluder/i, /atrial septal/i, /erosion|embolization/i],
  "Peripheral Angioplasty": [/runoff/i, /drug-coated/i, /iliac|femoropopliteal/i],
  "Carotid Artery Stenting": [/embolic-protection/i, /endarterectomy/i, /hyperperfusion/i],
  "Leadless Pacemaker Implantation": [/capsule/i, /femoral vein/i, /right ventricle/i],
};

test("exports every exclusive Cardiology article without replacing TAVR", () => {
  assert.equal(cardiologyArticles.length, 14);
  assert.deepEqual(
    cardiologyArticles.map((article) => article.procedure).sort(),
    [...exclusiveProcedures].sort(),
  );
  assert.deepEqual(
    cardiologyArticles.map((article) => article.slug).sort(),
    exclusiveProcedures.map(toSlug).sort(),
  );
  for (const article of cardiologyArticles) {
    assert.equal(cardiologyArticlesBySlug[article.slug], article);
    assert.equal(getCostArticle(article.slug), article);
  }
  const tavr = getCostArticle("tavr-tavi-transcatheter-aortic-valve-replacement");
  assert.equal(tavr?.procedure, "TAVR/TAVI (Transcatheter Aortic Valve Replacement)");
  assert.ok(!cardiologyArticlesBySlug["tavr-tavi-transcatheter-aortic-valve-replacement"]);
});

test("metadata, H1, subtitles and clinical blocks are unique and direct", () => {
  for (const field of ["slug", "seoTitle", "seoDescription", "heading", "heroSubtitle"] as const) {
    assert.equal(
      new Set(cardiologyArticles.map((article) => article[field])).size,
      cardiologyArticles.length,
      `${field} must be unique`,
    );
  }
  for (const article of cardiologyArticles) {
    assert.match(article.heading, /Cost in India/);
    assert.match(article.heroSubtitle ?? "", /\[INDIA_COST\]/);
    assert.ok((article.heroSubtitle ?? "").length < 500, `${article.slug}: subtitle should stay short`);
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
  for (const article of cardiologyArticles) {
    assert.deepEqual(article.destinations.map((row) => row.country), countries);
    assert.deepEqual(article.cities.map((row) => row.citySlug), citySlugs);
    assert.equal(new Set(article.cities.map((row) => JSON.stringify(row.page))).size, 5);
    for (const city of article.cities) {
      assert.equal(city.costRange, undefined);
      assert.equal(city.stay, undefined);
      assert.match(city.costNote, /national planning range/i);
      assert.doesNotMatch(city.costNote, /[$€£]\s?\d/);
      assert.ok(city.page);
      assert.ok(city.page!.intro.length >= 5);
      assert.ok(city.page!.medicalTourism.length >= 3);
      assert.equal(city.page!.faqs.length, 5);
      const gate = `${city.ecosystem} ${city.page!.hospitalDiscussion.join(" ")}`;
      assert.match(gate, /exact live CMS|exact CMS/i);
      assert.match(gate, /cards must remain empty|leave cards empty/i);
      assert.match(gate, /catalog gap/i);
    }
  }
});

test("clinical copy is procedure-specific and medically restrained", () => {
  const knownNames = new Set<string>(CARDIOLOGY_PROCEDURES);
  for (const article of cardiologyArticles) {
    const text = JSON.stringify(article);
    for (const expected of specificity[article.procedure]) {
      assert.match(text, expected, `${article.slug}: missing ${expected}`);
    }
    assert.match(text, /individual/i);
    assert.doesNotMatch(text, /\b\d+(?:\.\d+)?%\b/);
    assert.doesNotMatch(
      text,
      /\bbest (?:doctor|surgeon|cardiologist|hospital|facility)|success rate|100% success|guaranteed success\b/i,
    );
    assert.ok(article.relatedProcedures.length >= 2);
    for (const related of article.relatedProcedures) {
      assert.ok(knownNames.has(related), `${article.slug}: unknown related ${related}`);
    }
  }
});

test("ampersand procedure names stay in one pretty-path segment", () => {
  const path = costsFilterPath({
    destination: "India",
    city: "Delhi NCR",
    specialty: "Cardiology",
    procedure: "Coronary Angioplasty & Stenting",
  });
  assert.equal(path, "/costs/India/Delhi-NCR/Cardiology/Coronary-Angioplasty-Stenting");
  assert.doesNotMatch(path, /&/);
  assert.deepEqual(parsePrettyCatalogSegments(path.split("/").slice(2)), {
    destination: "India",
    city: "Delhi NCR",
    specialty: "Cardiology",
    procedure: "Coronary Angioplasty & Stenting",
  });
});

test("each procedure declares three unique, descriptive WebP figures", () => {
  const allSources = new Set<string>();
  for (const article of cardiologyArticles) {
    assert.equal(article.figures?.length, 3);
    assert.deepEqual(article.figures?.map((figure) => figure.after), ["overview", "how", "journey"]);
    assert.deepEqual(
      article.figures?.map((figure) => figure.src),
      [
        `/images/cost/cardiology/${article.slug}-anatomy.webp`,
        `/images/cost/cardiology/${article.slug}-procedure.webp`,
        `/images/cost/cardiology/${article.slug}-recovery.webp`,
      ],
    );
    for (const figure of article.figures ?? []) {
      assert.match(figure.src, /\.webp$/);
      assert.ok(figure.alt.length >= 70);
      assert.ok(!allSources.has(figure.src), `${figure.src} reused across procedures`);
      allSources.add(figure.src);
      assert.ok(existsSync(join(process.cwd(), "public", figure.src)), `missing ${figure.src}`);
    }
  }
  assert.equal(allSources.size, 42);
});

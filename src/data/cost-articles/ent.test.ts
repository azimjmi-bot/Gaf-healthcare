import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { ENT_PROCEDURES, toSlug } from "../../lib/taxonomy";
import { costsFilterPath } from "../../lib/catalog-links";
import { parsePrettyCatalogSegments } from "../../lib/pretty-catalog-path";
import { entArticles, entArticlesBySlug } from "./ent";
import { getCostArticle } from "./index";

const exclusiveProcedures = ENT_PROCEDURES.filter(
  (name) => name !== "Rhinoplasty" && name !== "Transoral Robotic Surgery (TORS)",
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
  Septoplasty: [/deviated/i, /turbinate/i, /septal perforation/i],
  "FESS (Functional Endoscopic Sinus Surgery)": [/ostia|ostium/i, /polyp/i, /cerebrospinal-fluid leak|CSF/i],
  "Balloon Sinuplasty": [/ostium|ostia/i, /dilation/i, /not a substitute for FESS/i],
  Tympanoplasty: [/perforat/i, /graft/i, /ossicul/i],
  Mastoidectomy: [/cholesteatoma/i, /canal-wall/i, /facial-nerve/i],
  "Stapedectomy / Stapedotomy": [/otosclerosis/i, /fenestra|piston/i, /oval window/i],
  "Cochlear Implantation": [/electrode/i, /mapping/i, /not a BAHA/i],
  "BAHA Implantation (Bone Anchored Hearing Aid)": [/osseointegrat/i, /soft-band/i, /not a cochlear implant/i],
  Tonsillectomy: [/secondary bleeding/i, /palatine/i, /adenoidectomy/i],
  Adenoidectomy: [/nasopharynx/i, /not a tonsillectomy/i, /velopharyngeal/i],
  "Sleep Apnea Surgery": [/CPAP/i, /sleep study/i, /not a guaranteed cure/i],
  "Vocal Cord Surgery": [/stroboscop/i, /phonomicrosurgery/i, /not the same CMS procedure as microlaryngeal/i],
  "Microlaryngeal Surgery": [/suspension laryngoscopy/i, /microscope/i, /not a promise of voice/i],
  "Thyroid Surgery": [/recurrent.?laryngeal/i, /parathyroid/i, /hemithyroidectomy|lobectomy/i],
  "Head & Neck Cancer Surgery": [/tumour board/i, /not a single named resection/i, /reconstruction/i],
  "Skull Base Surgery": [/cerebrospinal-fluid leak|CSF/i, /endonasal/i, /neurosurgery/i],
};

test("exports every exclusive ENT article without replacing Rhinoplasty or TORS", () => {
  assert.equal(entArticles.length, 16);
  assert.deepEqual(
    entArticles.map((article) => article.procedure).sort(),
    [...exclusiveProcedures].sort(),
  );
  for (const article of entArticles) {
    assert.equal(entArticlesBySlug[article.slug], article);
    assert.equal(getCostArticle(article.slug), article);
  }
  assert.equal(getCostArticle("rhinoplasty")?.procedure, "Rhinoplasty");
  assert.ok(!entArticlesBySlug.rhinoplasty);
  assert.equal(getCostArticle("transoral-robotic-surgery-tors"), undefined);
});

test("metadata, H1, subtitles and clinical blocks are unique and direct", () => {
  for (const field of ["slug", "seoTitle", "seoDescription", "heading", "heroSubtitle"] as const) {
    assert.equal(
      new Set(entArticles.map((article) => article[field])).size,
      entArticles.length,
      `${field} must be unique`,
    );
  }
  for (const article of entArticles) {
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
  for (const article of entArticles) {
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
  const knownNames = new Set<string>(ENT_PROCEDURES);
  for (const article of entArticles) {
    const text = JSON.stringify(article);
    for (const expected of specificity[article.procedure]) {
      assert.match(text, expected, `${article.slug}: missing ${expected}`);
    }
    assert.match(text, /individual/i);
    assert.doesNotMatch(text, /\b\d+(?:\.\d+)?%\b/);
    assert.doesNotMatch(
      text,
      /\bbest (?:doctor|surgeon|ENT|hospital|facility)|success rate|100% success|guaranteed success\b/i,
    );
    assert.ok(article.relatedProcedures.length >= 2);
    for (const related of article.relatedProcedures) {
      assert.ok(knownNames.has(related), `${article.slug}: unknown related ${related}`);
    }
  }
});

test("ampersand and slash ENT names stay in one pretty-path segment", () => {
  const headNeck = costsFilterPath({
    destination: "India",
    specialty: "ENT",
    procedure: "Head & Neck Cancer Surgery",
  });
  assert.equal(headNeck, "/costs/India/ENT/Head-Neck-Cancer-Surgery");
  assert.deepEqual(parsePrettyCatalogSegments(headNeck.split("/").slice(2)), {
    destination: "India",
    specialty: "ENT",
    procedure: "Head & Neck Cancer Surgery",
  });
  const stapes = costsFilterPath({
    destination: "India",
    city: "Chennai",
    specialty: "ENT",
    procedure: "Stapedectomy / Stapedotomy",
  });
  assert.equal(stapes, "/costs/India/Chennai/ENT/Stapedectomy-Stapedotomy");
});

test("each procedure declares three unique, descriptive WebP figures", () => {
  const allSources = new Set<string>();
  for (const article of entArticles) {
    assert.equal(article.figures?.length, 3);
    assert.deepEqual(
      article.figures?.map((figure) => figure.src),
      [
        `/images/cost/ent/${article.slug}-anatomy.webp`,
        `/images/cost/ent/${article.slug}-procedure.webp`,
        `/images/cost/ent/${article.slug}-recovery.webp`,
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
  assert.equal(allSources.size, 48);
});

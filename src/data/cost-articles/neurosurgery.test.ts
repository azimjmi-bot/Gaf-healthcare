import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { NEUROSURGERY_PROCEDURES, toSlug } from "../../lib/taxonomy";
import { costsFilterPath } from "../../lib/catalog-links";
import { parsePrettyCatalogSegments } from "../../lib/pretty-catalog-path";
import {
  NEUROSURGERY_EXCLUSIVE_PROCEDURES,
  neurosurgeryArticles,
  neurosurgeryArticlesBySlug,
} from "./neurosurgery";
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
  "Gamma Knife",
  "CyberKnife",
  "Stereotactic Radiosurgery (SRS)",
  "Spinal Tumor Surgery",
  "Skull Base Surgery",
] as const;

const specificity: Record<string, RegExp[]> = {
  "Brain Tumor Surgery": [/craniotomy/i, /not glioma, meningioma or pituitary/i, /neuronavigation/i],
  "Glioma Surgery": [/eloquent/i, /5-ALA|fluorescence/i, /not the umbrella brain-tumour/i],
  "Meningioma Surgery": [/dural origin|dura/i, /not glioma/i, /Gamma Knife/i],
  "Pituitary Tumor Surgery": [/transsphenoidal/i, /diabetes insipidus/i, /not open skull-base surgery by default/i],
  "Endoscopic Brain Surgery": [/ventricle/i, /not ETV by itself/i, /conversion to craniotomy/i],
  "Endoscopic Skull Base Surgery": [/endonasal|nasoseptal/i, /not the ENT Skull Base/i, /CSF leak/i],
  "Stereotactic Brain Biopsy": [/not tumour resection/i, /non-diagnostic/i, /frame or frameless/i],
  "Aneurysm Clipping": [/clip/i, /not coiling/i, /ruptured or unruptured/i],
  "Aneurysm Coiling": [/coil/i, /not clipping/i, /few coiling-only clinicians/i],
  "AVM Surgery": [/nidus/i, /not embolization/i, /Spetzler-Martin/i],
  "AVM Embolization": [/no verified clinician cards/i, /not open AVM surgery/i, /stages/i],
  "Stroke Thrombectomy": [/large-vessel/i, /not cerebral bypass/i, /poor first international experiment/i],
  "Cerebral Bypass": [/STA-MCA|moyamoya/i, /not stroke thrombectomy/i, /no verified clinician cards/i],
  "Deep Brain Stimulation": [/pulse generator|IPG/i, /not a cure/i, /Neurology filter also lists/i],
  "Epilepsy Surgery": [/video-EEG/i, /not a promise of seizure freedom/i, /SEEG/i],
  "Stereotactic Brain Surgery": [/not SRS, Gamma Knife or CyberKnife/i, /payload/i],
  "Hydrocephalus Surgery": [/ventriculoperitoneal|VP shunt/i, /not ETV/i],
  "Endoscopic Third Ventriculostomy (ETV)": [/third ventricle/i, /not a VP shunt/i, /no verified clinician cards/i],
  "Chiari Surgery": [/foramen magnum/i, /not a cosmetic cranioplasty/i, /syrinx/i],
  "Craniosynostosis Surgery": [/fused.*suture|suture/i, /not a cosmetic cranioplasty brochure/i, /helmet/i],
};

test("exports every exclusive Neurosurgery article without replacing shared slugs", () => {
  assert.equal(neurosurgeryArticles.length, 20);
  assert.deepEqual(
    neurosurgeryArticles.map((article) => article.procedure).sort(),
    [...NEUROSURGERY_EXCLUSIVE_PROCEDURES].sort(),
  );
  for (const name of SHARED) {
    assert.ok(!NEUROSURGERY_EXCLUSIVE_PROCEDURES.includes(name as never));
  }
  for (const article of neurosurgeryArticles) {
    assert.equal(neurosurgeryArticlesBySlug[article.slug], article);
    assert.equal(getCostArticle(article.slug), article);
  }
  assert.equal(getCostArticle("gamma-knife")?.procedure, "Gamma Knife");
  assert.equal(getCostArticle("cyberknife")?.procedure, "CyberKnife");
  assert.equal(getCostArticle("stereotactic-radiosurgery-srs")?.procedure, "Stereotactic Radiosurgery (SRS)");
  assert.equal(getCostArticle("spinal-tumor-surgery")?.procedure, "Spinal Tumor Surgery");
  assert.equal(getCostArticle("skull-base-surgery")?.procedure, "Skull Base Surgery");
  assert.ok(!neurosurgeryArticlesBySlug["gamma-knife"]);
  assert.ok(!neurosurgeryArticlesBySlug["cyberknife"]);
  assert.ok(!neurosurgeryArticlesBySlug["stereotactic-radiosurgery-srs"]);
  assert.ok(!neurosurgeryArticlesBySlug["spinal-tumor-surgery"]);
  assert.ok(!neurosurgeryArticlesBySlug["skull-base-surgery"]);
  for (const name of NEUROSURGERY_PROCEDURES) {
    assert.ok(getCostArticle(toSlug(name)), `missing article for ${name}`);
  }
});

test("metadata, H1, subtitles and clinical blocks are unique and direct", () => {
  for (const field of ["slug", "seoTitle", "seoDescription", "heading", "heroSubtitle"] as const) {
    assert.equal(
      new Set(neurosurgeryArticles.map((article) => article[field])).size,
      neurosurgeryArticles.length,
      `${field} must be unique`,
    );
  }
  for (const article of neurosurgeryArticles) {
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
  for (const article of neurosurgeryArticles) {
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
  const knownNames = new Set<string>(NEUROSURGERY_EXCLUSIVE_PROCEDURES);
  for (const article of neurosurgeryArticles) {
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

test("parenthesis Neurosurgery names stay in one pretty-path segment", () => {
  const etv = costsFilterPath({
    destination: "India",
    specialty: "Neurosurgery",
    procedure: "Endoscopic Third Ventriculostomy (ETV)",
  });
  assert.equal(etv, "/costs/India/Neurosurgery/Endoscopic-Third-Ventriculostomy-(ETV)");
  assert.deepEqual(parsePrettyCatalogSegments(etv.split("/").slice(2)), {
    destination: "India",
    specialty: "Neurosurgery",
    procedure: "Endoscopic Third Ventriculostomy (ETV)",
  });
  const city = costsFilterPath({
    destination: "India",
    city: "Mumbai",
    specialty: "Neurosurgery",
    procedure: "Endoscopic Third Ventriculostomy (ETV)",
  });
  assert.equal(
    city,
    "/costs/India/Mumbai/Neurosurgery/Endoscopic-Third-Ventriculostomy-(ETV)",
  );
});

test("each exclusive procedure declares three unique, descriptive WebP figures", () => {
  const allSources = new Set<string>();
  for (const article of neurosurgeryArticles) {
    assert.equal(article.figures?.length, 3);
    assert.deepEqual(
      article.figures?.map((figure) => figure.src),
      [
        `/images/cost/neurosurgery/${article.slug}-anatomy.webp`,
        `/images/cost/neurosurgery/${article.slug}-procedure.webp`,
        `/images/cost/neurosurgery/${article.slug}-recovery.webp`,
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
  assert.equal(allSources.size, 60);
});

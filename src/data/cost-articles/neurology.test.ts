import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { NEUROLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";
import { costsFilterPath } from "../../lib/catalog-links";
import { parsePrettyCatalogSegments } from "../../lib/pretty-catalog-path";
import {
  NEUROLOGY_EXCLUSIVE_PROCEDURES,
  neurologyArticles,
  neurologyArticlesBySlug,
} from "./neurology";
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
const SHARED = ["Deep Brain Stimulation", "Stroke Thrombectomy"] as const;

const specificity: Record<string, RegExp[]> = {
  EEG: [/outpatient recording/i, /scalp electrodes/i, /not prolonged Video EEG/i],
  "Video EEG": [/synchronizes.*video/i, /1–5 nights/i, /medication reduction/i],
  "Electromyography (EMG)": [/needle muscle examination/i, /Nerve Conduction Study uses surface/i, /motor-unit/i],
  "Nerve Conduction Study": [/surface stimulation/i, /not needle EMG/i, /conduction velocity/i],
  "Evoked Potentials": [/visual, auditory and somatosensory/i, /different pathways/i, /signal averaging|average/i],
  "Lumbar Puncture": [/CSF sampling/i, /not a neurosurgical lumbar drain/i, /post-dural puncture headache/i],
  "IV Thrombolysis": [/hyperacute/i, /alteplase or tenecteplase/i, /not elective medical travel/i, /haemorrhage/i],
  "Transcranial Doppler (TCD)": [/intracranial/i, /cranial acoustic windows/i, /Carotid Doppler is an extracranial/i],
  "Carotid Doppler": [/extracranial neck/i, /0 doctor mappings/i, /cards remain empty/i],
  "MRI-Guided Focused Ultrasound (MRgFUS)": [/incisionless thalamotomy/i, /not Deep Brain Stimulation/i, /few exact cards/i],
  "Botulinum Toxin Therapy": [/chronic migraine/i, /dystonia/i, /spasticity/i, /total units/i],
  Plasmapheresis: [/per-session/i, /central-line|central access/i, /Guillain–Barré|GBS/i, /myasthenia/i],
  "IVIG (Intravenous Immunoglobulin)": [/weight.*dose/i, /total grams/i, /renal/i, /thromb/i],
  "Nerve and Muscle Biopsy": [/exact tissue/i, /neuropathology/i, /no cards/i],
  "Vagus Nerve Stimulation (VNS)": [/left cervical vagus/i, /not resective epilepsy surgery/i, /one exact CMS card/i],
  "Sleep Study (Polysomnography)": [/overnight.*sleep-laboratory/i, /airflow.*breathing effort/i, /not a pulmonology airway procedure/i],
  "Migraine Nerve Block": [/occipital or pericranial/i, /not Botulinum Toxin/i, /local anaesthetic/i],
};

test("exports exactly 17 exclusive Neurology articles and preserves shared Neurosurgery slugs", () => {
  assert.equal(NEUROLOGY_PROCEDURES.length, 19);
  assert.equal(neurologyArticles.length, 17);
  assert.deepEqual(
    neurologyArticles.map((article) => article.procedure).sort(),
    [...NEUROLOGY_EXCLUSIVE_PROCEDURES].sort(),
  );
  for (const name of SHARED) {
    assert.ok(!NEUROLOGY_EXCLUSIVE_PROCEDURES.includes(name as never));
    assert.ok(!neurologyArticlesBySlug[toSlug(name)]);
    assert.equal(getCostArticle(toSlug(name))?.procedure, name);
  }
  for (const article of neurologyArticles) {
    assert.equal(neurologyArticlesBySlug[article.slug], article);
    assert.equal(getCostArticle(article.slug), article);
  }
  for (const name of NEUROLOGY_PROCEDURES) {
    assert.ok(getCostArticle(toSlug(name)), `missing indexed article for ${name}`);
  }
});

test("metadata, H1, subtitles and complete editorial blocks are unique and direct", () => {
  for (const field of ["slug", "seoTitle", "seoDescription", "heading", "heroSubtitle"] as const) {
    assert.equal(new Set(neurologyArticles.map((article) => article[field])).size, 17, `${field} must be unique`);
  }
  for (const article of neurologyArticles) {
    assert.match(article.heading, /Cost in India/);
    assert.match(article.heroSubtitle ?? "", /\[INDIA_COST\]/);
    assert.ok((article.heroSubtitle ?? "").length < 500);
    assert.match(article.answer.join(" "), /Planning Range ≠ Final Hospital Quotation/);
    assert.match(article.indiaCost.join(" "), /\[INDIA_COST\]/);
    assert.doesNotMatch(article.seoTitle, /GAF Healthcare/);
    assert.ok(article.costComponents!.length >= 6);
    assert.ok(article.costDrivers.length >= 5);
    assert.ok(article.inclusions.length >= 6);
    assert.ok(article.exclusions.length >= 6);
    assert.equal(article.fullPathway!.stages.length, 8);
    assert.equal(article.journey.length, 12);
    assert.ok(article.documents.length >= 8);
    assert.ok(article.questionsToAsk.length >= 20);
    assert.equal(new Set(article.questionsToAsk).size, article.questionsToAsk.length);
    assert.equal(article.faqs.length, 12);
    assert.equal(article.whyIndia!.length, 3);
  }
});

test("all pages use exact country and city inventories without invented city tariffs", () => {
  for (const article of neurologyArticles) {
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
  const known = new Set<string>(NEUROLOGY_EXCLUSIVE_PROCEDURES);
  for (const article of neurologyArticles) {
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
      assert.ok(known.has(related), `${article.slug}: unknown related procedure ${related}`);
    }
  }
});

test("Neurology routes consolidate nationally and retain city context", () => {
  const emg = costsFilterPath({
    destination: "India",
    specialty: "Neurology",
    procedure: "Electromyography (EMG)",
  });
  assert.equal(emg, "/costs/India/Neurology/Electromyography-(EMG)");
  assert.deepEqual(parsePrettyCatalogSegments([
    "India",
    "Neurology",
    "Electromyography-(EMG)",
  ]), {
    destination: "India",
    specialty: "Neurology",
    procedure: "Electromyography (EMG)",
  });
  const sleep = costsFilterPath({
    destination: "India",
    city: "Mumbai",
    specialty: "Neurology",
    procedure: "Sleep Study (Polysomnography)",
  });
  assert.equal(sleep, "/costs/India/Mumbai/Neurology/Sleep-Study-(Polysomnography)");
  assert.deepEqual(parsePrettyCatalogSegments(sleep.split("/").slice(2)), {
    destination: "India",
    city: "Mumbai",
    specialty: "Neurology",
    procedure: "Sleep Study (Polysomnography)",
  });
});

test("each exclusive procedure declares three unique existing WebP figures", () => {
  const allSources = new Set<string>();
  for (const article of neurologyArticles) {
    assert.equal(article.figures?.length, 3);
    assert.deepEqual(
      article.figures?.map((figure) => figure.src),
      [
        `/images/cost/neurology/${article.slug}-anatomy.webp`,
        `/images/cost/neurology/${article.slug}-procedure.webp`,
        `/images/cost/neurology/${article.slug}-recovery.webp`,
      ],
    );
    for (const figure of article.figures ?? []) {
      assert.match(figure.src, /\.webp$/);
      assert.ok(figure.alt.length >= 70);
      assert.ok(!allSources.has(figure.src));
      allSources.add(figure.src);
      const path = join(process.cwd(), "public", figure.src);
      assert.ok(existsSync(path), `missing ${figure.src}`);
    }
  }
  assert.equal(allSources.size, 51);
});

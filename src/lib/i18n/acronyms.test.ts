import test from "node:test";
import assert from "node:assert/strict";
import { CITIES, COUNTRIES, SPECIALTIES } from "@/lib/taxonomy";
import { TAXONOMY_AR } from "@/lib/i18n/taxonomy-ar";
import { MEDICAL_PHRASE_AR } from "@/lib/i18n/medical-phrases";
import { medicalPhrase } from "@/lib/i18n/medical-phrases";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { PROCEDURE_TERM_ALIASES, canonicalTermKey } from "@/lib/i18n/term-aliases";
import { carriesAcronym, latinAcronym } from "@/lib/i18n/acronyms";

/** Cities, countries and specialties are names, not procedures. */
const NOT_A_PROCEDURE = new Set([...CITIES, ...COUNTRIES, ...SPECIALTIES].map((r) => r.name));

test("the short form is read off the English label, not guessed", () => {
  assert.equal(latinAcronym("Stereotactic Radiosurgery (SRS)"), "SRS");
  assert.equal(latinAcronym("TURP (Transurethral Resection of the Prostate)"), "TURP");
  assert.equal(latinAcronym("MRI-Guided Focused Ultrasound (MRgFUS)"), "MRgFUS");
  assert.equal(latinAcronym("TAVR/TAVI (Transcatheter Aortic Valve Replacement)"), "TAVR/TAVI");
  assert.equal(latinAcronym("LVAD Implantation"), "LVAD");

  // An expansion in brackets is not a short form, and neither is a word.
  assert.equal(latinAcronym("Liver Resection (Hepatectomy)"), null);
  assert.equal(latinAcronym("ABO-Incompatible Kidney Transplantation"), null);
  assert.equal(latinAcronym("Mastectomy"), null);
  // A route or a region says nothing about which procedure this is.
  assert.equal(latinAcronym("IV Thrombolysis"), null);
  assert.equal(latinAcronym("GI (Gastrointestinal) Radiation Oncology"), null);
});

test("every Arabic procedure name keeps the Latin short form its English label declares", () => {
  const missing: string[] = [];
  for (const table of [TAXONOMY_AR, MEDICAL_PHRASE_AR]) {
    for (const [en, ar] of Object.entries(table)) {
      if (NOT_A_PROCEDURE.has(en)) continue;
      if (!carriesAcronym(en, ar)) missing.push(`${en} => ${ar}`);
    }
  }
  assert.deepEqual(missing, []);
});

test("a spelling variant resolves to the canonical term rather than its own reading", () => {
  for (const [alias, canonical] of Object.entries(PROCEDURE_TERM_ALIASES)) {
    assert.equal(canonicalTermKey(alias), canonical);
    assert.ok(TAXONOMY_AR[canonical], `${canonical} has no Arabic of its own`);
    assert.equal(
      TAXONOMY_AR[alias],
      undefined,
      `${alias} still carries an Arabic reading that can drift from ${canonical}`,
    );
    assert.equal(taxonomyLabel(alias, "ar"), TAXONOMY_AR[canonical]);
    assert.equal(medicalPhrase(alias, "ar"), TAXONOMY_AR[canonical]);
  }
});

test("the three SBRT spellings read as one term", () => {
  const readings = new Set(
    [
      "Stereotactic Body Radiotherapy (SBRT)",
      "Stereotactic Body Radiation Therapy (SBRT)",
      "Stereotactic Body Radiation Therapy",
    ].map((name) => taxonomyLabel(name, "ar")),
  );
  assert.deepEqual([...readings], ["العلاج الإشعاعي التجسيمي للجسم (SBRT)"]);
});

test("IMRT is intensity-modulated in both languages", () => {
  assert.equal(
    taxonomyLabel("Intensity-Modulated Radiotherapy (IMRT)", "ar"),
    "العلاج الإشعاعي المعدل الشدة (IMRT)",
  );
  // The image-guided reading belongs to IGRT and nothing else.
  assert.equal(
    taxonomyLabel("Image-Guided Radiotherapy (IGRT)", "ar"),
    "العلاج الإشعاعي الموجّه بالصور (IGRT)",
  );
  assert.equal(TAXONOMY_AR["Image-Guided Radiation Therapy (IMRT)"], undefined);
  assert.equal(MEDICAL_PHRASE_AR["Image-Guided Radiation Therapy (IMRT)"], undefined);
});

test("aliasing changes nothing for English", () => {
  for (const alias of Object.keys(PROCEDURE_TERM_ALIASES)) {
    assert.equal(taxonomyLabel(alias, "en"), alias);
    assert.equal(medicalPhrase(alias, "en"), alias);
  }
});

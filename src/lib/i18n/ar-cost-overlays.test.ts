import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { arabicCostProcedureMetadata } from "@/lib/i18n/ar-cost-content";
import {
  PSEO_LOCKED_KEYS,
  pickTreatmentPatch,
  translationStatus,
} from "@/lib/cms/catalog-types";
import { catalogSpecialtyName, costsFilterPath } from "@/lib/catalog-links";
import { localePageState, localePathIsPublished } from "@/lib/i18n/locale-publication";
import { treatmentsForLocale } from "@/lib/locale-catalog";
import { catalogTreatments } from "@/lib/treatments";

const cms = JSON.parse(
  readFileSync(join(process.cwd(), "content/ar/catalog-cms.json"), "utf8"),
) as {
  treatmentOverrides: Record<
    string,
    {
      status?: string;
      summary: string;
      notes: string;
      stay: string;
      includes: string[];
      conditions: string[];
    }
  >;
};

test("Arabic cost overlays cover every pathway with reviewed planning copy", () => {
  const localized = treatmentsForLocale("ar");
  assert.equal(catalogTreatments.length, 380);
  assert.equal(Object.keys(cms.treatmentOverrides).length, 380);
  assert.equal(localized.length, 380);

  for (const treatment of catalogTreatments) {
    const patch = cms.treatmentOverrides[treatment.slug];
    assert.ok(patch, treatment.slug);
    assert.equal(translationStatus(patch), "published", treatment.slug);
    assert.match(patch.summary, /[\u0600-\u06FF]/, `${treatment.slug} summary`);
    assert.match(patch.summary, /GAF Healthcare/, `${treatment.slug} brand`);
    assert.match(patch.summary, /الهند/, `${treatment.slug} country`);
    assert.match(patch.summary, /البلد والمدينة والتخصص والإجراء/, `${treatment.slug} hierarchy`);
    assert.match(patch.notes, /ليست عرض سعر/, `${treatment.slug} estimate caveat`);
    assert.doesNotMatch(patch.stay, /[A-Za-z]/, `${treatment.slug} stay`);
    assert.ok(patch.includes.length >= 5, `${treatment.slug} inclusions`);
    assert.ok(patch.includes.every((value) => /[\u0600-\u06FF]/.test(value)), treatment.slug);
    assert.ok(patch.conditions.every((value) => /[\u0600-\u06FF]/.test(value)), treatment.slug);
  }
});

test("Arabic cost overlays preserve every pSEO identity and relationship field", () => {
  const locked = new Set<string>(PSEO_LOCKED_KEYS);
  const localized = new Map(treatmentsForLocale("ar").map((row) => [row.slug, row]));

  for (const english of catalogTreatments) {
    const patch = pickTreatmentPatch(cms.treatmentOverrides[english.slug]) as Record<string, unknown>;
    for (const key of Object.keys(patch)) {
      assert.equal(locked.has(key), false, `${english.slug} leaked locked key ${key}`);
    }
    assert.equal("name" in patch, false, `${english.slug} translated its URL identity`);
    assert.equal("category" in patch, false, `${english.slug} translated its specialty identity`);
    assert.equal("hospitalSlugs" in patch, false, `${english.slug} rewrote hospital relationships`);

    const arabic = localized.get(english.slug);
    assert.ok(arabic, english.slug);
    assert.equal(arabic.slug, english.slug);
    assert.equal(arabic.name, english.name);
    assert.equal(arabic.specialtySlug, english.specialtySlug);
    assert.deepEqual(arabic.specialtySlugs, english.specialtySlugs);
    assert.equal(arabic.procedureSlug, english.procedureSlug);
    assert.deepEqual(arabic.hospitalSlugs, english.hospitalSlugs);
    assert.equal(arabic.usRange, english.usRange);
    assert.equal(arabic.partnerRange, english.partnerRange);
  }
});

test("Arabic costs publish the reviewed hierarchy without inventing city prices", () => {
  assert.equal(localePathIsPublished("ar", "/costs"), true);
  assert.equal(localePathIsPublished("ar", "/costs/India"), true);
  assert.equal(localePathIsPublished("ar", "/costs/India/Delhi-NCR"), true);
  assert.equal(localePathIsPublished("ar", "/costs/India/Cardiac-Surgery"), true);

  for (const treatment of catalogTreatments) {
    const specialty = catalogSpecialtyName(treatment);
    const national = costsFilterPath({
      destination: "India",
      specialty,
      procedure: treatment.name,
    });
    assert.equal(localePathIsPublished("ar", national), true, national);
  }

  assert.equal(
    localePageState(
      "ar",
      "/costs/India/Delhi-NCR/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)",
    ),
    "noindex",
  );
});

test("Arabic procedure metadata is localized, canonical and search-specific", () => {
  const path =
    "/costs/India/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)";
  const metadata = arabicCostProcedureMetadata({
    destination: "India",
    specialty: "Cardiac Surgery",
    procedure: "CABG (Coronary Artery Bypass Grafting)",
  });
  assert.match(String(metadata.title), /تكلفة طعم مجازة الشريان التاجي/);
  assert.match(String(metadata.description), /السجلات/);
  assert.equal(metadata.alternates?.canonical, `https://gaf.healthcare/ar${path}`);
  assert.deepEqual(
    Object.keys((metadata.alternates as { languages: object }).languages).sort(),
    ["ar", "en", "x-default"],
  );
  assert.ok(metadata.keywords?.includes("تكلفة العلاج في الهند"));
});

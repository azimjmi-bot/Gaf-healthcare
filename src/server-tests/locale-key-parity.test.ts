import assert from "node:assert/strict";
import test from "node:test";
import { TARGET_LOCALES, type TargetLocale } from "@/lib/i18n/languages";
import { localeIsPublished } from "@/lib/i18n/locale-gating";
import { UI_MESSAGE_FIELDS } from "@/lib/i18n/messages";
import { HOME_EXTRA_CATALOGS, UI_CATALOGS } from "@/lib/i18n/ui-catalogs";

const ENGLISH_KEYS = Object.keys(UI_MESSAGE_FIELDS);

/**
 * Keys added or reworked in the Phase 1 string-extraction pass. Listed by hand
 * so that removing one is a deliberate edit rather than a silent regression:
 * each replaced a literal that used to render English on an Arabic page.
 */
const EXTRACTED_IN_PHASE_1 = [
  // accreditation-seals.tsx
  "seals.label",
  "seals.jci",
  "seals.nabh",
  "seals.nabl",
  // site-footer.tsx
  "footer.offices",
  // consult-form.tsx
  "consult.name",
  "consult.email",
  "consult.phone",
  "consult.country",
  "consult.treatment",
  "consult.treatmentPlaceholder",
  "consult.treatmentUnsure",
  "consult.hospital",
  "consult.hospitalPlaceholder",
  "consult.hospitalOpen",
  "consult.timeline",
  "consult.timelinePlaceholder",
  "consult.timelineUrgent",
  "consult.timelineNear",
  "consult.timelinePlan",
  "consult.timelineExplore",
  "consult.notes",
  "consult.notesPlaceholder",
  "consult.consent",
  "consult.submit",
  "consult.submitting",
  "consult.successEyebrow",
  "consult.successTitle",
  "consult.successBody",
  "consult.successAgain",
  // consult-form.tsx, keyed to the codes returned by /api/consult
  "consult.error.invalidRequest",
  "consult.error.name",
  "consult.error.email",
  "consult.error.phone",
  "consult.error.selection",
  "consult.error.consent",
  "consult.error.submit",
  "consult.error.unknown",
];

test("English is the key list every locale is measured against", () => {
  assert.ok(ENGLISH_KEYS.length > 0);
  const duplicates = ENGLISH_KEYS.filter((key, i) => ENGLISH_KEYS.indexOf(key) !== i);
  assert.deepEqual(duplicates, [], "a repeated key silently shadows the earlier value");
  const blank = ENGLISH_KEYS.filter((key) => !UI_MESSAGE_FIELDS[key].trim());
  assert.deepEqual(blank, [], "English is the fallback, so it may not be empty");
});

test("every extracted string has an English and an Arabic value", () => {
  const missingEnglish = EXTRACTED_IN_PHASE_1.filter((key) => !UI_MESSAGE_FIELDS[key]?.trim());
  assert.deepEqual(missingEnglish, []);

  const missingArabic = EXTRACTED_IN_PHASE_1.filter((key) => !UI_CATALOGS.ar[key]?.trim());
  assert.deepEqual(missingArabic, [], "an /ar page would render this key blank");
});

/**
 * Arabic is the one published target locale, so it is the one held to full
 * parity. Anything short of that renders an empty string on a live page — the
 * catalog deliberately does not fall back to English.
 */
test("Arabic covers every English key", () => {
  const missing = ENGLISH_KEYS.filter((key) => !UI_CATALOGS.ar[key]?.trim());
  assert.deepEqual(missing, [], "these keys render blank on /ar");
});

test("no locale defines a key English does not have", () => {
  for (const locale of TARGET_LOCALES) {
    const orphans = Object.keys(UI_CATALOGS[locale]).filter(
      (key) => !(key in UI_MESSAGE_FIELDS),
    );
    assert.deepEqual(orphans, [], `${locale} has keys no English source defines`);
  }
});

/**
 * ru, fr and sw are unpublished and knowingly partial. What they may not do is
 * regress: the counts below are a ratchet, not a target.
 */
test("unpublished locales keep the coverage they have", () => {
  const floors: Record<Exclude<TargetLocale, "ar">, number> = { ru: 85, fr: 85, sw: 85 };
  for (const [locale, floor] of Object.entries(floors) as [Exclude<TargetLocale, "ar">, number][]) {
    assert.equal(localeIsPublished(locale), false, `${locale} is not published`);
    const translated = Object.values(UI_CATALOGS[locale]).filter((v) => v.trim()).length;
    assert.ok(
      translated >= floor,
      `${locale} dropped from ${floor} to ${translated} translated keys`,
    );
  }
});

test("the home-page extras carry the same keys in every locale", () => {
  const reference = Object.keys(HOME_EXTRA_CATALOGS.ar).sort();
  assert.ok(reference.length > 0);
  for (const locale of TARGET_LOCALES) {
    assert.deepEqual(
      Object.keys(HOME_EXTRA_CATALOGS[locale]).sort(),
      reference,
      `${locale} home extras do not line up with Arabic`,
    );
  }
});

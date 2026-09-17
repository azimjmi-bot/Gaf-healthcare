import assert from "node:assert/strict";
import test from "node:test";
import {
  blankCuratedTreatment,
  normalizeCuratedTreatment,
  uniqueCuratedTreatmentSlug,
  validateTreatmentForSave,
} from "@/lib/cms/curated-treatment-store";
import { blankTreatmentTranslation } from "@/lib/cms/curated-treatment-types";
import { localePathIsPublished } from "@/lib/i18n/locale-publication";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { LOCALES } from "@/lib/i18n/languages";

test("a curated Treatment stores shared relationships once", () => {
  const treatment = blankCuratedTreatment({ treatments: [] });
  treatment.slug = "gamma-knife-radiosurgery";
  treatment.baseName = "Gamma Knife Radiosurgery";
  treatment.specialtySlug = "radiation-oncology";
  treatment.destinationSlugs = ["india", "singapore", "india"];
  treatment.doctorSlugs = ["doctor-a", "doctor-b"];
  treatment.hospitalSlugs = ["hospital-a"];
  treatment.translations.en = {
    ...blankTreatmentTranslation(),
    status: "published",
    name: "Gamma Knife Radiosurgery",
    shortDescription: "A focused radiosurgery treatment.",
    overview: "A patient-focused overview.",
  };
  treatment.translations.ar = {
    ...blankTreatmentTranslation(),
    name: "الجراحة الإشعاعية بسكين غاما",
  };

  const normalized = normalizeCuratedTreatment(treatment);
  assert.deepEqual(normalized.destinationSlugs, ["india", "singapore"]);
  assert.equal(normalized.doctorSlugs.length, 2);
  assert.equal(Object.keys(normalized.translations).length, 2);
  assert.equal(normalized.slug, "gamma-knife-radiosurgery");
});

test("publishing rejects incomplete core and language records", () => {
  const treatment = blankCuratedTreatment({ treatments: [] });
  treatment.status = "published";
  const incomplete = validateTreatmentForSave(treatment);
  assert.ok(incomplete.some((error) => error.includes("Base name")));
  assert.ok(incomplete.some((error) => error.includes("specialty")));
  assert.ok(incomplete.some((error) => error.includes("language version")));

  treatment.baseName = "Gamma Knife Radiosurgery";
  treatment.slug = "gamma-knife-radiosurgery";
  treatment.specialtySlug = "radiation-oncology";
  treatment.translations.en = {
    ...blankTreatmentTranslation(),
    status: "published",
    name: "Gamma Knife Radiosurgery",
    shortDescription: "A focused radiosurgery treatment.",
    overview: "A detailed overview for patients.",
  };
  assert.deepEqual(validateTreatmentForSave(treatment), []);
});

test("slug uniqueness covers current and historical canonical slugs", () => {
  const treatment = blankCuratedTreatment({ treatments: [] });
  treatment.slug = "ivf";
  treatment.previousSlugs = ["in-vitro-fertilisation"];
  const store = { treatments: [treatment] };
  assert.equal(uniqueCuratedTreatmentSlug(store, "ivf"), "ivf-2");
  assert.equal(
    uniqueCuratedTreatmentSlug(store, "in-vitro-fertilisation"),
    "in-vitro-fertilisation-2",
  );
});

test("Treatment directory is canonical but no filter or combination routes exist", () => {
  for (const locale of LOCALES) {
    assert.equal(localePathIsPublished(locale, "/treatments"), true);
    assert.equal(
      localePathIsPublished(locale, "/treatments/india/cardiology/ivf"),
      false,
    );
    const entries = buildLocaleSitemap(locale);
    const directoryUrl =
      locale === "en"
        ? "https://gaf.healthcare/treatments"
        : `https://gaf.healthcare/${locale}/treatments`;
    assert.equal(
      entries.filter((entry) => entry.url === directoryUrl).length,
      1,
    );
    assert.ok(
      entries.every(
        (entry) =>
          !entry.url.includes("?") &&
          !entry.url.match(/\/treatments\/[^/]+\/[^/]+/),
      ),
    );
  }
});

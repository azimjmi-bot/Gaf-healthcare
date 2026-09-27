import assert from "node:assert/strict";
import test from "node:test";
import {
  applyCuratedTreatmentPatch,
  blankCuratedTreatment,
  normalizeCuratedTreatment,
  publishedCuratedTreatments,
  uniqueCuratedTreatmentSlug,
  validateTreatmentForSave,
} from "@/lib/cms/curated-treatment-store";
import { blankTreatmentTranslation } from "@/lib/cms/curated-treatment-types";
import { localePathIsPublished } from "@/lib/i18n/locale-publication";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { LOCALES } from "@/lib/i18n/languages";
import {
  treatmentEditorialBody,
  treatmentEditorialBodyForDisplay,
} from "@/lib/curated-treatment-editorial";

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
    editorialBody: "## Treatment overview\n\nA patient-focused overview.",
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
    editorialBody: "## Treatment overview\n\nA detailed overview for patients.",
  };
  assert.deepEqual(validateTreatmentForSave(treatment), []);
});

test("Save recreates a missing Treatment instead of 404ing", () => {
  const store = { treatments: [] };
  const id = "099c61a5-a4e5-4227-9711-500eb3636730";
  const { treatment, created, errors } = applyCuratedTreatmentPatch(store, id, {
    baseName: "Breast Cancer Treatment in India",
    slug: "breast-cancer-treatment-in-india",
    specialtySlug: "surgical-oncology",
    status: "published",
  });
  assert.equal(created, true);
  assert.equal(treatment.id, id);
  assert.equal(treatment.status, "draft");
  assert.equal(treatment.translations.en?.name, "Breast Cancer Treatment in India");
  assert.equal(store.treatments[0]?.id, id);
  assert.ok(
    errors.some((error) => error.includes("Publish at least one language version")),
  );
});

test("the unified editor preserves legacy structured editorial content", () => {
  const translation = {
    ...blankTreatmentTranslation(),
    fullDescription: "Introductory context.",
    overview: "Existing overview.",
    recovery: "Existing recovery guidance.",
  };
  const migrated = treatmentEditorialBody(translation, "en");
  assert.match(migrated, /^Introductory context\./);
  assert.match(migrated, /## Treatment Overview\n\nExisting overview\./);
  assert.match(migrated, /## Recovery\n\nExisting recovery guidance\./);

  translation.editorialBody = "## One article\n\nNew editorial copy.";
  assert.equal(
    treatmentEditorialBody(translation, "en"),
    translation.editorialBody,
  );
});

test("the public article removes a duplicate leading Treatment title", () => {
  const translation = {
    ...blankTreatmentTranslation(),
    name: "Breast Cancer Treatment in India",
    editorialBody:
      "# Breast Cancer Treatment in India\n\n## Treatment overview\n\nPatient guidance.",
  };
  assert.equal(
    treatmentEditorialBodyForDisplay(translation, "en"),
    "## Treatment overview\n\nPatient guidance.",
  );

  translation.editorialBody =
    "## A different clinical heading\n\nDistinct content.";
  assert.equal(
    treatmentEditorialBodyForDisplay(translation, "en"),
    translation.editorialBody,
  );
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
    // The directory is only live where something is published in it. English
    // keeps its index; a target locale with an empty store 404s rather than
    // serving an empty shell.
    const directoryLive = locale === "en" || publishedCuratedTreatments(locale).length > 0;
    assert.equal(localePathIsPublished(locale, "/treatments"), directoryLive);
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
      directoryLive ? 1 : 0,
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

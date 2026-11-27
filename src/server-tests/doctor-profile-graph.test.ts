import assert from "node:assert/strict";
import { test } from "node:test";
import { getSpecialtyPage } from "@/data/specialty-pages";
import {
  doctorRelatedTreatmentsHeading,
  doctorSpecialtyCostLink,
  relatedCuratedTreatments,
} from "@/lib/doctor-discovery";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { lowercaseCatalogPath } from "@/lib/i18n/path";
import { doctorsForLocale } from "@/lib/locale-catalog";
import { buildSpecialtyPageData, specialtyPageMeetsQualityThreshold } from "@/lib/specialty-page";

test("doctorRelatedTreatmentsHeading is specialty-aware and reserves radiation heading for Radiation Oncology", () => {
  const enDoctors = doctorsForLocale("en");
  const radOnc = enDoctors.find((d) => d.specialtySlug === "radiation-oncology");
  const cardio = enDoctors.find((d) => d.specialtySlug === "cardiology");
  const medOnc = enDoctors.find((d) => d.specialtySlug === "medical-oncology");
  assert.ok(radOnc && cardio && medOnc);

  assert.equal(doctorRelatedTreatmentsHeading(radOnc), "Related radiation treatments");
  assert.equal(doctorRelatedTreatmentsHeading(cardio), `Related ${cardio.specialty} treatments`);
  assert.equal(doctorRelatedTreatmentsHeading(medOnc), `Related ${medOnc.specialty} treatments`);
  assert.ok(!doctorRelatedTreatmentsHeading(cardio).toLowerCase().includes("radiation"));
});

test("doctorSpecialtyCostLink never points to a noindex cost page across all 2,602 EN doctors", () => {
  const enDoctors = doctorsForLocale("en");
  assert.ok(enDoctors.length >= 2600);

  const enSitemapPaths = new Set(buildLocaleSitemap("en").map((entry) => new URL(entry.url).pathname));
  let cityCount = 0;
  let nationalFallbackCount = 0;

  for (const doctor of enDoctors) {
    const link = doctorSpecialtyCostLink(doctor);
    assert.ok(
      enSitemapPaths.has(lowercaseCatalogPath(link.href)),
      `${doctor.slug} (${doctor.city} / ${doctor.specialty}) resolved to unlisted cost path ${link.href}`,
    );

    const profile = getSpecialtyPage("india", doctor.specialtySlug);
    if (profile) {
      const cityScope = link.scope === "city" ? doctor.citySlug : undefined;
      const data = buildSpecialtyPageData(profile, cityScope);
      assert.ok(
        data && profile.allowIndex && profile.status === "published" && specialtyPageMeetsQualityThreshold(data),
        `${doctor.slug} cost link ${link.href} failed quality threshold`,
      );
    }

    if (link.scope === "city") cityCount += 1;
    if (link.scope === "national") nationalFallbackCount += 1;
  }

  assert.ok(cityCount > 2000, `expected >2000 city-level links, got ${cityCount}`);
  assert.ok(nationalFallbackCount > 200, `expected >200 national fallbacks, got ${nationalFallbackCount}`);

  const puneMedOnc = enDoctors.find(
    (d) => d.citySlug === "pune" && d.specialtySlug === "medical-oncology",
  );
  assert.ok(puneMedOnc);
  const puneLink = doctorSpecialtyCostLink(puneMedOnc);
  assert.equal(puneLink.scope, "national");
  assert.equal(lowercaseCatalogPath(puneLink.href), "/costs/india/medical-oncology");
});

test("relatedCuratedTreatments emits published /treatments/* links matching doctor, cost, or specialty", () => {
  const enDoctors = doctorsForLocale("en");
  const enTreatments = publishedCuratedTreatments("en");
  const enPublishedSlugs = new Set(enTreatments.map((t) => t.slug));
  const arPublishedSlugs = new Set(publishedCuratedTreatments("ar").map((t) => t.slug));

  let doctorsWithTreatmentLinks = 0;
  for (const doctor of enDoctors) {
    const links = relatedCuratedTreatments(doctor, "en");
    if (links.length > 0) doctorsWithTreatmentLinks += 1;
    for (const link of links) {
      assert.ok(enPublishedSlugs.has(link.slug), `unexpected unpublished treatment ${link.slug}`);
      assert.equal(link.href, `/treatments/${link.slug}`);
    }
  }
  assert.ok(
    doctorsWithTreatmentLinks > 1800,
    `expected >1800 doctors with curated treatment links, got ${doctorsWithTreatmentLinks}`,
  );

  // Verify direct doctorSlugs priority
  const directTreatment = enTreatments.find((t) => t.doctorSlugs.length > 0);
  assert.ok(directTreatment);
  const directDoctor = enDoctors.find((d) => directTreatment.doctorSlugs.includes(d.slug));
  assert.ok(directDoctor);
  const directLinks = relatedCuratedTreatments(directDoctor, "en");
  assert.ok(directLinks.some((row) => row.slug === directTreatment.slug));

  // Verify AR safety: only returns AR-published curated treatments
  const arDoctors = doctorsForLocale("ar");
  const sampleAr = arDoctors.slice(0, 50);
  for (const doctor of sampleAr) {
    for (const link of relatedCuratedTreatments(doctor, "ar")) {
      assert.ok(arPublishedSlugs.has(link.slug));
    }
  }
});

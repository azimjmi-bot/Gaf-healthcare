import assert from "node:assert/strict";
import test from "node:test";
import {
  listBaseSpecialtyPages,
  listSpecialtyPageCandidates,
} from "../data/specialty-pages";
import { CITIES, SPECIALTIES } from "../lib/taxonomy";
import { getCostArticle, hasCostArticle } from "../data/cost-articles";
import { costsFilterPath } from "../lib/catalog-links";
import {
  buildSpecialtyPageData,
  listPublishedSpecialtyPages,
  specialtyPageMeetsQualityThreshold,
} from "../lib/specialty-page";

// Infertility & IVF and Dentistry are wired for costs and specialty hubs but
// have no ginger-catalog doctor seeds yet.
const TAXONOMY_ONLY_SPECIALTY_SLUGS = new Set<string>();
const SPECIALTIES_WITHOUT_DOCTOR_SEED = new Set(["infertility-ivf", "dentistry"]);

test("discovers relationship-qualified specialty-country CMS candidates", () => {
  const candidates = listSpecialtyPageCandidates();
  const expected = SPECIALTIES.filter(
    (specialty) => !SPECIALTIES_WITHOUT_DOCTOR_SEED.has(specialty.slug),
  );
  assert.equal(candidates.length, expected.length);
  assert.ok(candidates.every((profile) => profile.countrySlug === "india"));
  for (const slug of expected.map((specialty) => specialty.slug)) {
    assert.ok(
      candidates.some((profile) => profile.specialtySlug === slug),
      slug,
    );
  }
});

test("publishes every article-qualified country profile through one builder", () => {
  const profiles = listBaseSpecialtyPages();
  const expectedProfiles = SPECIALTIES.filter(
    (specialty) => !TAXONOMY_ONLY_SPECIALTY_SLUGS.has(specialty.slug),
  );
  assert.equal(profiles.length, expectedProfiles.length);
  assert.ok(profiles.some((profile) => profile.specialtySlug === "dentistry"));
  assert.ok(profiles.some((profile) => profile.specialtySlug === "infertility-ivf"));
  assert.equal(
    profiles.filter((profile) => profile.status === "published").length,
    25,
  );
  for (const profile of profiles) {
    const data = buildSpecialtyPageData(profile);
    assert.ok(data, profile.specialtySlug);
    const doctorBacked = !SPECIALTIES_WITHOUT_DOCTOR_SEED.has(profile.specialtySlug);
    assert.equal(
      specialtyPageMeetsQualityThreshold(data),
      profile.status === "published" && doctorBacked,
      profile.specialtySlug,
    );
    assert.equal(
      data.pricingGroups.flatMap((group) => group.rows).length,
      data.procedures.length,
    );
    if (doctorBacked) {
      assert.ok(data.pricingGroups.length > 0);
      assert.equal(
        data.longFormArticleCoverage >= 0.9,
        profile.status === "published",
      );
    } else {
      assert.equal(profile.status, "published", profile.specialtySlug);
      assert.ok(profile.pricingGroups.length > 0, profile.specialtySlug);
      assert.equal(data.doctors.length, 0, profile.specialtySlug);
    }
  }
});

test("only doctor-backed, data-sufficient cities pass the authority-page gate", () => {
  const indiaCities = CITIES.filter((city) => city.countrySlug === "india");
  for (const profile of listBaseSpecialtyPages().filter(
    (candidate) =>
      candidate.status === "published" &&
      !SPECIALTIES_WITHOUT_DOCTOR_SEED.has(candidate.specialtySlug),
  )) {
    const country = buildSpecialtyPageData(profile);
    assert.ok(country, profile.specialtySlug);
    assert.ok(country.cities.length > 0, profile.specialtySlug);
    const qualifiedSlugs = new Set(country.cities.map((city) => city.slug));
    for (const city of country.cities) {
      const data = buildSpecialtyPageData(profile, city.slug);
      assert.ok(data, `${profile.specialtySlug}/${city.slug}`);
      assert.equal(
        specialtyPageMeetsQualityThreshold(data),
        true,
        `${profile.specialtySlug}/${city.slug}`,
      );
      assert.ok(data.cityUniqueness?.meetsThreshold);
      assert.ok(
        (data.cityUniqueness?.estimatedInformationShare ?? 0) >= 0.25,
      );
      assert.ok(
        (data.cityUniqueness?.estimatedInformationShare ?? 1) <= 0.35,
      );
      assert.ok(data.doctors.length >= 3);
      assert.ok(data.hospitals.length >= 3);
      assert.ok(data.longFormArticleCoverage >= 0.9);
      if (!data.hasCitySpecificPricing) {
        assert.equal(data.cityPricedProcedureCount, 0);
        assert.ok(
          data.pricingGroups
            .flatMap((group) => group.rows)
            .every((row) => row.cityRange === undefined),
        );
      }
    }
    for (const city of indiaCities.filter(
      (candidate) => !qualifiedSlugs.has(candidate.slug),
    )) {
      const data = buildSpecialtyPageData(profile, city.slug);
      assert.ok(data, `${profile.specialtySlug}/${city.slug}`);
      assert.equal(
        specialtyPageMeetsQualityThreshold(data),
        false,
        `${profile.specialtySlug}/${city.slug}`,
      );
    }
  }
});

test("published specialty index cards keep the displayed fields and counts", () => {
  const cards = listPublishedSpecialtyPages();
  const displayed = cards.map((data) => ({
    key: `${data.country.slug}/${data.specialty.slug}`,
    country: data.country.name,
    specialty: data.specialty.name,
    introAnswer: data.profile.introAnswer,
    careItems: data.profile.terminology.careItems,
    practitioners: data.profile.terminology.practitioners,
    procedures: data.procedures.length,
    hospitals: data.hospitals.length,
    doctors: data.doctors.length,
    cities: data.cities.length,
    citySlugs: data.cities.map((city) => city.slug),
    path: costsFilterPath({ destination: data.country.name, specialty: data.specialty.name }),
  }));
  assert.deepEqual(
    displayed.map(({ key, procedures, hospitals, doctors, cities, citySlugs }) => ({
      key,
      procedures,
      hospitals,
      doctors,
      cities,
      citySlugs,
    })),
    [
      { key: "india/radiation-oncology", procedures: 15, hospitals: 22, doctors: 70, cities: 3, citySlugs: ["delhi-ncr", "chennai", "hyderabad"] },
      { key: "india/surgical-oncology", procedures: 30, hospitals: 27, doctors: 130, cities: 4, citySlugs: ["delhi-ncr", "mumbai", "chennai", "hyderabad"] },
      { key: "india/medical-oncology", procedures: 18, hospitals: 29, doctors: 86, cities: 4, citySlugs: ["delhi-ncr", "mumbai", "chennai", "hyderabad"] },
      { key: "india/hematology", procedures: 10, hospitals: 22, doctors: 38, cities: 2, citySlugs: ["delhi-ncr", "hyderabad"] },
      { key: "india/pediatric-hematology", procedures: 10, hospitals: 12, doctors: 21, cities: 2, citySlugs: ["delhi-ncr", "chennai"] },
      { key: "india/cardiac-surgery", procedures: 15, hospitals: 29, doctors: 92, cities: 5, citySlugs: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"] },
      { key: "india/pediatric-cardiac-surgery", procedures: 12, hospitals: 13, doctors: 26, cities: 2, citySlugs: ["delhi-ncr", "hyderabad"] },
      { key: "india/cardiology", procedures: 15, hospitals: 31, doctors: 237, cities: 5, citySlugs: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"] },
      { key: "india/bariatric-surgery", procedures: 11, hospitals: 11, doctors: 30, cities: 1, citySlugs: ["delhi-ncr"] },
      { key: "india/cosmetic-surgery", procedures: 15, hospitals: 28, doctors: 74, cities: 5, citySlugs: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"] },
      { key: "india/ent", procedures: 18, hospitals: 32, doctors: 103, cities: 5, citySlugs: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"] },
      { key: "india/gastroenterology", procedures: 24, hospitals: 30, doctors: 153, cities: 5, citySlugs: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"] },
      { key: "india/surgical-gastroenterology", procedures: 25, hospitals: 29, doctors: 107, cities: 5, citySlugs: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"] },
      { key: "india/urology", procedures: 26, hospitals: 32, doctors: 137, cities: 5, citySlugs: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"] },
      { key: "india/spine-surgery", procedures: 16, hospitals: 25, doctors: 63, cities: 4, citySlugs: ["delhi-ncr", "mumbai", "chennai", "hyderabad"] },
      { key: "india/pulmonology", procedures: 15, hospitals: 30, doctors: 112, cities: 5, citySlugs: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"] },
      { key: "india/pediatric-orthopaedic", procedures: 15, hospitals: 13, doctors: 13, cities: 1, citySlugs: ["delhi-ncr"] },
      { key: "india/orthopedics", procedures: 22, hospitals: 31, doctors: 208, cities: 5, citySlugs: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"] },
      { key: "india/ophthalmology", procedures: 25, hospitals: 28, doctors: 102, cities: 4, citySlugs: ["delhi-ncr", "mumbai", "bengaluru", "hyderabad"] },
      { key: "india/gynecology", procedures: 16, hospitals: 30, doctors: 187, cities: 4, citySlugs: ["delhi-ncr", "mumbai", "bengaluru", "hyderabad"] },
      { key: "india/neurosurgery", procedures: 25, hospitals: 29, doctors: 98, cities: 4, citySlugs: ["delhi-ncr", "mumbai", "chennai", "hyderabad"] },
      { key: "india/neurology", procedures: 19, hospitals: 32, doctors: 111, cities: 5, citySlugs: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"] },
      { key: "india/nephrology", procedures: 18, hospitals: 30, doctors: 107, cities: 5, citySlugs: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"] },
    ],
  );
  for (const card of displayed) {
    assert.equal(card.country, "India");
    assert.ok(card.introAnswer.length > 40, card.key);
    assert.ok(card.careItems.length > 0, card.key);
    assert.ok(card.practitioners.length > 0, card.key);
    assert.match(card.path, /^\/costs\//);
  }
  for (const data of cards) {
    assert.ok(
      data.procedures.every((procedure) => hasCostArticle(procedure.slug) === Boolean(getCostArticle(procedure.slug))),
    );
    assert.ok(data.pricingGroups.flatMap((group) => group.rows).every((row) => row.cityRange === undefined));
  }
  assert.equal(cards.length, 23);
});

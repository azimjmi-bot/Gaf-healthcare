import assert from "node:assert/strict";
import test from "node:test";
import {
  getSpecialtyPage,
  listSpecialtyPageCandidates,
} from "../data/specialty-pages";
import {
  buildSpecialtyPageData,
  specialtyPageMeetsQualityThreshold,
} from "../lib/specialty-page";

const pilotSlugs = [
  "radiation-oncology",
  "medical-oncology",
  "pulmonology",
];

const qualifiedCitySlugs: Record<string, string[]> = {
  "radiation-oncology": ["delhi-ncr", "chennai", "hyderabad"],
  "medical-oncology": ["delhi-ncr", "mumbai", "chennai", "hyderabad"],
  pulmonology: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"],
};

test("discovers relationship-qualified specialty-country CMS candidates", () => {
  const candidates = listSpecialtyPageCandidates();
  assert.ok(candidates.length >= pilotSlugs.length);
  assert.ok(candidates.every((profile) => profile.countrySlug === "india"));
  for (const slug of pilotSlugs) {
    assert.ok(
      candidates.some((profile) => profile.specialtySlug === slug),
      slug,
    );
  }
});

test("publishes three data-qualified country profiles through one builder", () => {
  for (const specialtySlug of pilotSlugs) {
    const profile = getSpecialtyPage("india", specialtySlug);
    assert.ok(profile, specialtySlug);
    const data = buildSpecialtyPageData(profile);
    assert.ok(data, specialtySlug);
    assert.equal(specialtyPageMeetsQualityThreshold(data), true, specialtySlug);
    assert.equal(data.procedures.length, data.pricedProcedureCount);
    assert.ok(data.pricingGroups.length > 0);
    assert.ok(data.longFormArticleCoverage >= 0.9);
  }
});

test("only doctor-backed, data-sufficient cities pass the authority-page gate", () => {
  for (const specialtySlug of pilotSlugs) {
    const profile = getSpecialtyPage("india", specialtySlug);
    assert.ok(profile, specialtySlug);
    const country = buildSpecialtyPageData(profile);
    assert.ok(country, specialtySlug);
    assert.deepEqual(
      country.cities.map((city) => city.slug),
      qualifiedCitySlugs[specialtySlug],
      specialtySlug,
    );
    for (const city of country.cities) {
      const data = buildSpecialtyPageData(profile, city.slug);
      assert.ok(data, `${specialtySlug}/${city.slug}`);
      assert.equal(
        specialtyPageMeetsQualityThreshold(data),
        true,
        `${specialtySlug}/${city.slug}`,
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
  }
});

test("city pages fail closed when doctor-backed hospital depth is insufficient", () => {
  const rejectedCitySlugs: Record<string, string[]> = {
    "radiation-oncology": ["mumbai", "bengaluru"],
    "medical-oncology": ["bengaluru"],
  };
  for (const [specialtySlug, citySlugs] of Object.entries(rejectedCitySlugs)) {
    const profile = getSpecialtyPage("india", specialtySlug);
    assert.ok(profile, specialtySlug);
    for (const citySlug of citySlugs) {
      const data = buildSpecialtyPageData(profile, citySlug);
      assert.ok(data, `${specialtySlug}/${citySlug}`);
      assert.equal(
        specialtyPageMeetsQualityThreshold(data),
        false,
        `${specialtySlug}/${citySlug}`,
      );
    }
  }
});

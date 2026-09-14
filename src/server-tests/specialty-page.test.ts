import assert from "node:assert/strict";
import test from "node:test";
import {
  listBaseSpecialtyPages,
  listSpecialtyPageCandidates,
} from "../data/specialty-pages";
import { CITIES, SPECIALTIES } from "../lib/taxonomy";
import {
  buildSpecialtyPageData,
  specialtyPageMeetsQualityThreshold,
} from "../lib/specialty-page";

test("discovers relationship-qualified specialty-country CMS candidates", () => {
  const candidates = listSpecialtyPageCandidates();
  assert.equal(candidates.length, SPECIALTIES.length);
  assert.ok(candidates.every((profile) => profile.countrySlug === "india"));
  for (const slug of SPECIALTIES.map((specialty) => specialty.slug)) {
    assert.ok(
      candidates.some((profile) => profile.specialtySlug === slug),
      slug,
    );
  }
});

test("publishes every article-qualified country profile through one builder", () => {
  const profiles = listBaseSpecialtyPages();
  assert.equal(profiles.length, SPECIALTIES.length);
  assert.equal(
    profiles.filter((profile) => profile.status === "published").length,
    20,
  );
  for (const profile of profiles) {
    const data = buildSpecialtyPageData(profile);
    assert.ok(data, profile.specialtySlug);
    assert.equal(
      specialtyPageMeetsQualityThreshold(data),
      profile.status === "published",
      profile.specialtySlug,
    );
    assert.equal(
      data.pricingGroups.flatMap((group) => group.rows).length,
      data.procedures.length,
    );
    assert.ok(data.pricingGroups.length > 0);
    assert.equal(
      data.longFormArticleCoverage >= 0.9,
      profile.status === "published",
    );
  }
});

test("only doctor-backed, data-sufficient cities pass the authority-page gate", () => {
  const indiaCities = CITIES.filter((city) => city.countrySlug === "india");
  for (const profile of listBaseSpecialtyPages().filter(
    (candidate) => candidate.status === "published",
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

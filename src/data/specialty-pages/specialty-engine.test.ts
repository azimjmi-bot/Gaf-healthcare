import assert from "node:assert/strict";
import test from "node:test";
import { medicalOncologyIndiaProfile } from "./medical-oncology";
import { pulmonologyIndiaProfile } from "./pulmonology";
import { radiationOncologyIndiaProfile } from "./radiation-oncology";
import {
  CITIES,
  MEDICAL_ONCOLOGY_PROCEDURES,
  PULMONOLOGY_PROCEDURES,
  RADIATION_PROCEDURES,
  toSlug,
} from "../../lib/taxonomy";
import type { SpecialtyPageProfile } from "./types";

const profiles = [
  radiationOncologyIndiaProfile,
  medicalOncologyIndiaProfile,
  pulmonologyIndiaProfile,
] satisfies SpecialtyPageProfile[];

function assertCompleteProfile(
  profile: SpecialtyPageProfile,
  expectedProcedures: readonly string[],
) {
  const expected = expectedProcedures.map(toSlug).sort();
  const grouped = profile.treatmentGroups
    .flatMap((group) => group.procedureSlugs)
    .sort();
  const priced = profile.pricingGroups
    .flatMap((group) => group.procedureSlugs)
    .sort();
  assert.deepEqual(grouped, expected);
  assert.deepEqual(priced, expected);
  assert.equal(new Set(grouped).size, grouped.length);
  assert.equal(new Set(priced).size, priced.length);
  assert.ok(profile.overview.length >= 2);
  assert.ok(profile.selection.length >= 2);
  assert.ok(profile.treatmentProcess.length >= 5);
  assert.ok(profile.recordsRequired.length >= 5);
  assert.ok(profile.faqs.length >= 8);
  assert.ok(profile.cityFaqQuestions.length >= 3);
}

test("ships three published profiles through one specialty page contract", () => {
  assertCompleteProfile(
    radiationOncologyIndiaProfile,
    RADIATION_PROCEDURES,
  );
  assertCompleteProfile(
    medicalOncologyIndiaProfile,
    MEDICAL_ONCOLOGY_PROCEDURES,
  );
  assertCompleteProfile(pulmonologyIndiaProfile, PULMONOLOGY_PROCEDURES);
  for (const profile of profiles) {
    assert.equal(profile.countrySlug, "india");
    assert.equal(profile.status, "published");
    assert.equal(profile.allowIndex, true);
  }
});

test("discovers researched city editorials without a page-engine city list", () => {
  const expectedCities = CITIES.filter((city) => city.countrySlug === "india")
    .map((city) => city.slug)
    .sort();
  for (const profile of profiles) {
    assert.deepEqual(
      profile.cityEditorials.map((city) => city.citySlug).sort(),
      expectedCities,
      profile.specialtySlug,
    );
    for (const city of profile.cityEditorials) {
      assert.ok(city.introduction.length > 0);
      assert.ok(city.whyCity.length > 0);
      assert.ok(city.planning.length > 0);
      assert.ok(city.logistics.length > 0);
      assert.ok(city.faqExtras.length > 0);
    }
  }
});

test("keeps specialty terminology, pathways and pricing bases distinct", () => {
  assert.equal(
    medicalOncologyIndiaProfile.terminology.careItem,
    "therapy",
  );
  assert.equal(
    pulmonologyIndiaProfile.terminology.careItem,
    "respiratory service",
  );
  assert.notDeepEqual(
    medicalOncologyIndiaProfile.treatmentProcess,
    pulmonologyIndiaProfile.treatmentProcess,
  );
  assert.match(
    medicalOncologyIndiaProfile.pricingGroups[0].basis,
    /cycle|regimen/i,
  );
  assert.match(
    pulmonologyIndiaProfile.pricingGroups[0].basis,
    /per /i,
  );
});

test("contains no fabricated rankings, guarantees or city prices", () => {
  const text = JSON.stringify(profiles);
  assert.doesNotMatch(
    text,
    /\bworld-class|number one|guaranteed (?:cure|success|outcome)|100% success|zero risk\b/i,
  );
  assert.doesNotMatch(text, /\$\d/);
  assert.match(text, /qualified medical oncologist/i);
  assert.match(text, /qualified respiratory/i);
});

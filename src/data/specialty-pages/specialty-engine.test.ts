import assert from "node:assert/strict";
import test from "node:test";
import { treatments } from "../../lib/treatments";
import { SPECIALTIES } from "../../lib/taxonomy";
import { bariatricSurgeryIndiaProfile } from "./bariatric-surgery";
import { cardiacSurgeryIndiaProfile } from "./cardiac-surgery";
import { cardiologyIndiaProfile } from "./cardiology";
import { cosmeticSurgeryIndiaProfile } from "./cosmetic-surgery";
import { entIndiaProfile } from "./ent";
import { gastroenterologyIndiaProfile } from "./gastroenterology";
import { gynecologyIndiaProfile } from "./gynecology";
import { hematologyIndiaProfile } from "./hematology";
import { medicalOncologyIndiaProfile } from "./medical-oncology";
import { nephrologyIndiaProfile } from "./nephrology";
import { neurologyIndiaProfile } from "./neurology";
import { neurosurgeryIndiaProfile } from "./neurosurgery";
import { ophthalmologyIndiaProfile } from "./ophthalmology";
import { orthopedicsIndiaProfile } from "./orthopedics";
import { pediatricCardiacSurgeryIndiaProfile } from "./pediatric-cardiac-surgery";
import { pediatricHematologyIndiaProfile } from "./pediatric-hematology";
import { pediatricOrthopaedicIndiaProfile } from "./pediatric-orthopaedic";
import { pulmonologyIndiaProfile } from "./pulmonology";
import { radiationOncologyIndiaProfile } from "./radiation-oncology";
import { spineSurgeryIndiaProfile } from "./spine-surgery";
import { surgicalGastroenterologyIndiaProfile } from "./surgical-gastroenterology";
import { surgicalOncologyIndiaProfile } from "./surgical-oncology";
import { urologyIndiaProfile } from "./urology";
import {
  CITIES,
  MEDICAL_ONCOLOGY_PROCEDURES,
  PULMONOLOGY_PROCEDURES,
  RADIATION_PROCEDURES,
  toSlug,
} from "../../lib/taxonomy";
import type { SpecialtyPageProfile } from "./types";

const factoryProfiles = [
  surgicalOncologyIndiaProfile,
  hematologyIndiaProfile,
  pediatricHematologyIndiaProfile,
  cardiacSurgeryIndiaProfile,
  pediatricCardiacSurgeryIndiaProfile,
  cardiologyIndiaProfile,
  bariatricSurgeryIndiaProfile,
  cosmeticSurgeryIndiaProfile,
  entIndiaProfile,
  gastroenterologyIndiaProfile,
  surgicalGastroenterologyIndiaProfile,
  urologyIndiaProfile,
  spineSurgeryIndiaProfile,
  pediatricOrthopaedicIndiaProfile,
  orthopedicsIndiaProfile,
  ophthalmologyIndiaProfile,
  gynecologyIndiaProfile,
  neurosurgeryIndiaProfile,
  neurologyIndiaProfile,
  nephrologyIndiaProfile,
] satisfies SpecialtyPageProfile[];

const profiles = [
  ...factoryProfiles,
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

test("ships every catalog specialty through one complete page contract", () => {
  assertCompleteProfile(
    radiationOncologyIndiaProfile,
    RADIATION_PROCEDURES,
  );
  assertCompleteProfile(
    medicalOncologyIndiaProfile,
    MEDICAL_ONCOLOGY_PROCEDURES,
  );
  assertCompleteProfile(pulmonologyIndiaProfile, PULMONOLOGY_PROCEDURES);
  for (const profile of factoryProfiles) {
    assertCompleteProfile(
      profile,
      treatments
        .filter((treatment) =>
          treatment.specialtySlugs.includes(profile.specialtySlug),
        )
        .map((treatment) => treatment.name),
    );
  }
  assert.deepEqual(
    profiles.map((profile) => profile.specialtySlug).sort(),
    SPECIALTIES.map((specialty) => specialty.slug).sort(),
  );
  for (const profile of profiles) {
    assert.equal(profile.countrySlug, "india");
  }
  const heldForArticleDepth = new Set([
    "surgical-oncology",
    "pediatric-hematology",
    "urology",
  ]);
  for (const profile of profiles) {
    assert.equal(
      profile.status,
      heldForArticleDepth.has(profile.specialtySlug) ? "draft" : "published",
    );
    assert.equal(profile.allowIndex, !heldForArticleDepth.has(profile.specialtySlug));
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
  assert.equal(
    new Set(profiles.map((profile) => profile.terminology.practitioner)).size,
    profiles.length,
  );
});

test("contains no fabricated rankings, guarantees or city prices", () => {
  const text = JSON.stringify(profiles);
  assert.doesNotMatch(
    text,
    /\bworld-class|number one|guaranteed (?:cure|success|outcome)|100% success|zero risk\b/i,
  );
  assert.doesNotMatch(text, /\$\d/);
  assert.doesNotMatch(text, /\[(?:INDIA_COST|US_COST|STAY)\]/);
  assert.match(text, /qualified medical oncologist/i);
  assert.match(text, /qualified respiratory/i);
  assert.match(text, /catalog relationship does not guarantee/i);
});

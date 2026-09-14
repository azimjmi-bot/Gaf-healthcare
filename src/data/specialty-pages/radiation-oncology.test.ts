import assert from "node:assert/strict";
import test from "node:test";
import { radiationOncologyIndiaProfile as profile } from "./radiation-oncology";
import { catalogTreatments } from "../../lib/treatments";
import { RADIATION_PROCEDURES, SPECIALTIES, toSlug } from "../../lib/taxonomy";

function countWords(value: unknown): number {
  if (typeof value === "string") {
    return value.match(/[A-Za-z0-9]+(?:['’–-][A-Za-z0-9]+)*/g)?.length ?? 0;
  }
  if (Array.isArray(value)) return value.reduce((sum, item) => sum + countWords(item), 0);
  if (value && typeof value === "object") {
    return Object.values(value).reduce((sum, item) => sum + countWords(item), 0);
  }
  return 0;
}

const radiationTreatments = catalogTreatments.filter(
  (treatment) => treatment.specialtySlug === "radiation-oncology",
);
const validProcedureSlugs = new Set(radiationTreatments.map((treatment) => treatment.slug));

test("defines a published, indexable Radiation Oncology India specialty entity", () => {
  assert.equal(profile.specialtySlug, "radiation-oncology");
  assert.equal(profile.countrySlug, "india");
  assert.equal(profile.status, "published");
  assert.equal(profile.allowIndex, true);
  assert.equal(profile.lastReviewed, "2026-09-14");
  assert.ok(profile.seoTitle.length <= 70);
  assert.ok(profile.seoDescription.length >= 140 && profile.seoDescription.length <= 165);
  assert.match(profile.introAnswer, /external beams|internal sources/i);
  assert.doesNotMatch(JSON.stringify(profile), /\$\d/);
});

test("groups all 15 CMS-defined Radiation Oncology procedures exactly once", () => {
  assert.equal(RADIATION_PROCEDURES.length, 15);
  assert.equal(radiationTreatments.length, 15);
  const grouped = profile.treatmentGroups.flatMap((group) => group.procedureSlugs);
  assert.equal(grouped.length, 15);
  assert.equal(new Set(grouped).size, 15);
  assert.deepEqual(
    [...new Set(grouped)].sort(),
    RADIATION_PROCEDURES.map(toSlug).sort(),
  );
});

test("uses only existing procedure and specialty relationships", () => {
  const relatedProcedureSlugs = [
    ...profile.conditions.flatMap((condition) => condition.procedureSlugs),
    ...profile.technologies.flatMap((technology) => technology.procedureSlugs),
  ];
  for (const slug of relatedProcedureSlugs) {
    assert.ok(validProcedureSlugs.has(slug), `unknown Radiation procedure slug: ${slug}`);
  }
  const specialtySlugs = new Set(SPECIALTIES.map((specialty) => specialty.slug));
  for (const slug of profile.relatedSpecialtySlugs) {
    assert.ok(specialtySlugs.has(slug), `unknown related specialty: ${slug}`);
  }
});

test("provides substantive specialty-level clinical, cost and travel content", () => {
  const words = countWords(profile);
  assert.ok(words >= 2_500 && words <= 3_500, `${words} editorial words`);
  assert.ok(profile.overview.length >= 2);
  assert.ok(profile.conditions.length >= 10);
  assert.equal(profile.treatmentProcess.length, 9);
  assert.ok(profile.costFactors.length >= 10);
  assert.ok(profile.technologies.length >= 10);
  assert.ok(profile.recordsRequired.length >= 8);
  assert.ok(profile.faqs.length >= 15 && profile.faqs.length <= 18);
  assert.match(JSON.stringify(profile), /planning estimate/i);
  assert.match(JSON.stringify(profile), /not a quotation/i);
});

test("avoids unsupported rankings, guarantees and universal treatment claims", () => {
  const text = JSON.stringify(profile);
  assert.doesNotMatch(
    text,
    /\bbest (?:doctor|hospital|treatment)|world-class|guaranteed (?:cure|success|outcome)|100%|zero risk/i,
  );
  assert.match(text, /No technique is universally preferable/i);
  assert.match(text, /must be decided by a qualified radiation oncologist/i);
});

import assert from "node:assert/strict";
import test from "node:test";
import { DENTISTRY_PROCEDURES, getSpecialty, toSlug } from "../../lib/taxonomy";
import { dentistryArticlesBySlug } from "../cost-articles/dentistry";
import { dentistryIndiaProfile } from "./dentistry";

test("Dentistry specialty profile exists with 16 procedures", () => {
  const specialty = getSpecialty("Dentistry");
  assert.ok(specialty);
  assert.equal(specialty?.slug, "dentistry");
  assert.equal(DENTISTRY_PROCEDURES.length, 16);
  assert.equal(dentistryIndiaProfile.specialtySlug, "dentistry");
});

test("Dentistry specialty profile is published with full article coverage", () => {
  assert.equal(dentistryIndiaProfile.status, "published");
  assert.equal(dentistryIndiaProfile.allowIndex, true);
  const grouped = dentistryIndiaProfile.treatmentGroups.flatMap((group) => group.procedureSlugs);
  assert.equal(grouped.length, 16);
  for (const name of DENTISTRY_PROCEDURES) {
    const slug = toSlug(name);
    assert.ok(grouped.includes(slug), slug);
    assert.ok(dentistryArticlesBySlug[slug], `missing cost article for ${slug}`);
  }
});

test("Dentistry terminology uses dentist language", () => {
  assert.equal(dentistryIndiaProfile.terminology.practitioner, "dentist");
  assert.equal(dentistryIndiaProfile.terminology.careItem, "dental procedure");
  assert.ok(dentistryIndiaProfile.cityEditorials.length >= 5);
});

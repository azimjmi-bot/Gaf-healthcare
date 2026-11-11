import assert from "node:assert/strict";
import test from "node:test";
import { INFERTILITY_IVF_PROCEDURES, getSpecialty, toSlug } from "../../lib/taxonomy";
import { costArticles } from "../cost-articles";
import { infertilityArticlesBySlug } from "../cost-articles/infertility-ivf";
import { baseSpecialtyProfileFor } from "./base-profiles";
import { infertilityIvfIndiaProfile } from "./infertility-ivf";

test("Infertility & IVF specialty profile exists with 25 procedures", () => {
  const specialty = getSpecialty("Infertility & IVF");
  assert.ok(specialty);
  assert.equal(specialty?.slug, "infertility-ivf");
  assert.equal(INFERTILITY_IVF_PROCEDURES.length, 25);
  assert.equal(infertilityIvfIndiaProfile.specialtySlug, "infertility-ivf");
});

test("Infertility & IVF specialty profile is published with full article coverage", () => {
  assert.equal(infertilityIvfIndiaProfile.status, "published");
  assert.equal(infertilityIvfIndiaProfile.allowIndex, true);
  const grouped = infertilityIvfIndiaProfile.treatmentGroups.flatMap(
    (group) => group.procedureSlugs,
  );
  assert.equal(grouped.length, 25);
  for (const name of INFERTILITY_IVF_PROCEDURES) {
    const slug = toSlug(name);
    assert.ok(grouped.includes(slug), slug);
    assert.ok(costArticles[slug], `missing cost article for ${slug}`);
  }
  assert.equal(Object.keys(infertilityArticlesBySlug).length, 23);
  assert.ok(!infertilityArticlesBySlug["varicocele-surgery"]);
  assert.ok(!infertilityArticlesBySlug["endometriosis-surgery"]);
});

test("Infertility & IVF terminology uses fertility specialist language", () => {
  assert.equal(infertilityIvfIndiaProfile.terminology.practitioner, "fertility specialist");
  assert.equal(infertilityIvfIndiaProfile.terminology.practitioners, "fertility specialists");
  assert.equal(infertilityIvfIndiaProfile.terminology.careItem, "fertility procedure");
  assert.equal(infertilityIvfIndiaProfile.terminology.careItems, "fertility procedures");
  assert.ok(infertilityIvfIndiaProfile.cityEditorials.length >= 5);
  assert.deepEqual(infertilityIvfIndiaProfile.relatedSpecialtySlugs, [
    "gynecology",
    "urology",
  ]);
});

test("baseSpecialtyProfileFor returns published Infertility & IVF profile", () => {
  const profile = baseSpecialtyProfileFor("infertility-ivf");
  assert.ok(profile);
  assert.equal(profile?.status, "published");
  assert.equal(profile?.allowIndex, true);
});

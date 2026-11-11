import assert from "node:assert/strict";
import test from "node:test";
import { catalogSpecialties } from "../lib/catalog-options";
import { dentistryArticlesBySlug } from "../data/cost-articles/dentistry";
import { DENTISTRY_COST } from "../lib/treatment-cost-ranges";
import {
  DENTISTRY_PROCEDURES,
  PROCEDURES,
  SPECIALTIES,
  getSpecialty,
  toSlug,
} from "../lib/taxonomy";

test("SPECIALTIES includes Dentistry", () => {
  assert.ok(SPECIALTIES.some((specialty) => specialty.name === "Dentistry"));
  assert.ok(getSpecialty("Dentistry"));
  assert.equal(getSpecialty("Dentistry")?.slug, "dentistry");
});

test("PROCEDURES registers 16 dentistry-linked procedures", () => {
  assert.equal(DENTISTRY_PROCEDURES.length, 16);
  const dentistry = PROCEDURES.filter((procedure) =>
    procedure.specialtySlugs.includes("dentistry"),
  );
  assert.equal(dentistry.length, 16);
  assert.deepEqual(
    dentistry.map((procedure) => procedure.name).sort(),
    [...DENTISTRY_PROCEDURES].sort(),
  );
});

test("catalogSpecialties includes Dentistry", () => {
  assert.ok(catalogSpecialties.includes("Dentistry"));
});

test("DENTISTRY_COST covers all 16 procedures", () => {
  for (const name of DENTISTRY_PROCEDURES) {
    const cost = DENTISTRY_COST[name];
    assert.ok(cost, name);
    assert.match(cost.us, /^\$/);
    assert.match(cost.partner, /^\$/);
    assert.doesNotMatch(cost.us + cost.partner, /₹/);
    assert.ok(cost.stay.length > 0);
  }
});

test("cost articles are registered for all 16 dentistry slugs", () => {
  for (const name of DENTISTRY_PROCEDURES) {
    const slug = toSlug(name);
    assert.ok(dentistryArticlesBySlug[slug], slug);
    assert.equal(dentistryArticlesBySlug[slug]?.procedure, name);
  }
});

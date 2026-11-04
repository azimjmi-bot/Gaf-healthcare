import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { afterEach, test } from "node:test";
import { CATALOG_SEED_KEY, CatalogUnavailableError } from "@/lib/catalog-seed";
import { catalogDoctors, doctors, getDoctor } from "@/lib/doctors";
import { catalogHospitals, getHospital, hospitals } from "@/lib/hospitals";
import { setContentStorage } from "@/lib/storage";
import { MemoryContentStorage } from "@/lib/storage/memory";

/*
 * The exported arrays are built on first access, so this file runs the
 * failure case first (nothing has been built yet in this process) and the
 * success case second. node:test gives each file its own process.
 */

afterEach(() => setContentStorage(undefined));

test("with no catalog in storage the exported arrays throw on access instead of being empty", () => {
  setContentStorage(new MemoryContentStorage());
  assert.throws(() => catalogHospitals.length, CatalogUnavailableError);
  assert.throws(() => catalogDoctors.length, CatalogUnavailableError);
  assert.throws(() => getHospital("fortis-gurgaon"), CatalogUnavailableError);
  assert.throws(() => getDoctor("dr-anil-kumar-anand"), CatalogUnavailableError);
  assert.throws(() => [...doctors], CatalogUnavailableError);
});

test("the real catalog loads through the default file-system backend and matches the file", () => {
  const file = JSON.parse(readFileSync(CATALOG_SEED_KEY, "utf8")) as {
    doctors: { slug: string; name: string; hospitalSlug: string }[];
    hospitals: { slug: string; name: string }[];
  };

  assert.equal(catalogHospitals.length, file.hospitals.length);
  assert.deepEqual(
    catalogHospitals.map((h) => h.slug),
    file.hospitals.map((h) => h.slug),
    "hospital order is the file's order",
  );
  assert.equal(catalogDoctors.length, file.doctors.length);
  assert.deepEqual(
    catalogDoctors.map((d) => d.slug),
    file.doctors.map((d) => d.slug),
    "doctor order is the file's order",
  );
  assert.equal(hospitals, catalogHospitals);
  assert.equal(doctors, catalogDoctors);

  const first = getDoctor(file.doctors[0].slug);
  assert.ok(first);
  assert.equal(first.name, file.doctors[0].name);
  assert.equal(first.hospitalName, getHospital(file.doctors[0].hospitalSlug)?.name, "doctors were built after their hospitals");
  assert.ok(first.procedureSlugs.length > 0);

  const slugs = new Set(catalogDoctors.map((d) => d.slug));
  assert.equal(slugs.size, catalogDoctors.length, "no duplicate doctor slugs");

  // Once built, the arrays stay built: a storage swap does not rebuild or empty them.
  setContentStorage(new MemoryContentStorage());
  assert.equal(catalogDoctors.length, file.doctors.length);
  assert.equal(catalogHospitals[0].slug, file.hospitals[0].slug);
});

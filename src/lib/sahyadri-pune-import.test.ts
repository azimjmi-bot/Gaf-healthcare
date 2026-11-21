import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { catalogDoctors } from "@/lib/doctors";
import { catalogHospitals } from "@/lib/hospitals";
import { SPECIALTIES } from "@/lib/taxonomy";

const ginger = JSON.parse(readFileSync(join(process.cwd(), "src/data/ginger-catalog.json"), "utf8")) as {
  doctors: { slug: string; hospitalSlug: string; specialty: string; city: string; name: string }[];
  hospitals: { slug: string; city: string; name: string }[];
};

const cms = JSON.parse(readFileSync(join(process.cwd(), "content/ar/catalog-cms.json"), "utf8")) as {
  doctorOverrides: Record<string, { status?: string; name?: string; bio?: string }>;
  hospitalOverrides: Record<string, { status?: string; name?: string; bio?: string }>;
};

const SAHYADRI = "sahyadri-super-speciality-hospital-";
const specialtyNames = new Set(SPECIALTIES.map((row) => row.name));

test("Sahyadri Pune ships three independent campus hospitals", () => {
  const rows = catalogHospitals.filter((row) => row.slug.startsWith(SAHYADRI));
  assert.equal(rows.length, 3);
  assert.deepEqual(
    rows.map((row) => row.slug).sort(),
    [
      "sahyadri-super-speciality-hospital-deccan-gymkhana",
      "sahyadri-super-speciality-hospital-hadapsar",
      "sahyadri-super-speciality-hospital-nagar-road",
    ],
  );
  for (const row of rows) {
    assert.equal(row.city, "Pune");
    assert.equal(row.citySlug, "pune");
    assert.equal(row.countrySlug, "india");
    assert.match(row.bio, /Manipal Hospitals/);
    assert.match(row.bio, /independent|separately|own hospital/i);
    const overlay = cms.hospitalOverrides[row.slug];
    assert.ok(overlay, row.slug);
    assert.equal(overlay.status, "published");
    assert.match(overlay.bio || "", /[\u0600-\u06FF]/);
    assert.match(overlay.name || "", /[\u0600-\u06FF]/);
  }
});

test("Sahyadri eligible doctors stay inside existing GAF specialties and Pune", () => {
  const rows = catalogDoctors.filter((row) => row.hospitalSlug.startsWith(SAHYADRI));
  assert.equal(rows.length, 110);
  for (const row of rows) {
    assert.equal(row.city, "Pune");
    assert.equal(row.citySlug, "pune");
    assert.ok(specialtyNames.has(row.specialty), row.specialty);
    assert.ok(row.hospitalSlug.startsWith(SAHYADRI));
    assert.ok(row.bio.length > 200);
    assert.doesNotMatch(row.bio, /world-renowned|cutting-edge|guaranteed outcome/i);
    const overlay = cms.doctorOverrides[row.slug];
    assert.ok(overlay, row.slug);
    assert.equal(overlay.status, "published");
    assert.match(overlay.name || "", /[\u0600-\u06FF]/);
    assert.match(overlay.bio || "", /GAF Healthcare/);
  }
  const byHospital = Object.fromEntries(
    [...new Set(rows.map((row) => row.hospitalSlug))].map((slug) => [
      slug,
      rows.filter((row) => row.hospitalSlug === slug).length,
    ]),
  );
  assert.ok(byHospital["sahyadri-super-speciality-hospital-nagar-road"] > 0);
  assert.ok(byHospital["sahyadri-super-speciality-hospital-hadapsar"] > 0);
  assert.ok(byHospital["sahyadri-super-speciality-hospital-deccan-gymkhana"] > 0);
});

test("eligibility CSV records exclusions outside GAF taxonomy", () => {
  const csv = readFileSync(join(process.cwd(), "docs/sahyadri-pune-eligibility.csv"), "utf8");
  assert.match(csv, /eligible/);
  assert.match(csv, /,YES,/);
  assert.match(csv, /,NO,/);
  assert.match(csv, /specialty_not_in_gaf_taxonomy/);
  const yes = csv.split("\n").filter((line) => line.includes(",YES,")).length;
  const no = csv.split("\n").filter((line) => line.includes(",NO,")).length;
  assert.equal(yes, 110);
  assert.equal(no, 81);
  assert.equal(ginger.doctors.filter((row) => row.hospitalSlug.startsWith(SAHYADRI)).length, 110);
  assert.equal(ginger.hospitals.filter((row) => row.slug.startsWith(SAHYADRI)).length, 3);
});

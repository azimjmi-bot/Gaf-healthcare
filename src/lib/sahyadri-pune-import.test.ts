import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { catalogDoctors, doctorsForHospital } from "@/lib/doctors";
import { catalogHospitals } from "@/lib/hospitals";
import { listHospitalLandings } from "@/lib/pseo";
import { SPECIALTIES } from "@/lib/taxonomy";

const ginger = JSON.parse(readFileSync(join(process.cwd(), "src/data/ginger-catalog.json"), "utf8")) as {
  doctors: {
    slug: string;
    hospitalSlug: string;
    hospitalSlugs?: string[];
    specialty: string;
    city: string;
    name: string;
    proceduresExpertise: string[];
    image?: string;
  }[];
  hospitals: { slug: string; city: string; name: string; specialty?: string }[];
};

const cms = JSON.parse(readFileSync(join(process.cwd(), "content/ar/catalog-cms.json"), "utf8")) as {
  doctorOverrides: Record<string, { status?: string; name?: string; bio?: string; proceduresExpertise?: string[]; affiliations?: string[] }>;
  hospitalOverrides: Record<string, { status?: string; name?: string; bio?: string; focus?: string }>;
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
    assert.ok(row.hospitalSlugs.includes(row.hospitalSlug));
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

test("doctor procedures are evidence-mapped rather than specialty defaults", () => {
  const rows = catalogDoctors.filter((row) => row.hospitalSlug.startsWith(SAHYADRI));
  const audit = readFileSync(join(process.cwd(), "docs/sahyadri-pune-doctor-procedure-audit.csv"), "utf8");
  assert.match(audit, /mapping_status/);
  assert.match(audit, /no_specific_procedure_evidence|verified|partially_verified/);
  const empty = rows.filter((row) => row.procedures.length === 0);
  const withProcs = rows.filter((row) => row.procedures.length > 0);
  assert.ok(empty.length >= 1, "some doctors retain specialty only when evidence is absent");
  assert.ok(withProcs.length >= 90);
  // Specialty-default Orthopedics trio must not appear on every Orthopedics doctor.
  const ortho = rows.filter((row) => row.specialty === "Orthopedics");
  const allHaveKneeAclFracture = ortho.every((row) =>
    ["Total Knee Replacement", "ACL Reconstruction (Anterior Cruciate Ligament)", "Fracture Fixation"].every(
      (name) => row.procedures.includes(name),
    ),
  );
  assert.equal(allHaveKneeAclFracture, false);
});

test("Sahyadri campuses do not inherit the full specialty/procedure catalogue", () => {
  const rows = catalogHospitals.filter((row) => row.slug.startsWith(SAHYADRI));
  for (const row of rows) {
    assert.ok(row.specialties.length > 0);
    assert.ok(row.specialties.length < 25, `${row.slug} specialties ${row.specialties.length}`);
    assert.ok(row.procedures.length < 200, `${row.slug} procedures ${row.procedures.length}`);
    assert.notEqual(row.specialty, "Radiation Oncology");
    assert.ok(row.specialty.length > 0, "faculty-majority primary specialty assigned");
    assert.notEqual(row.specialtySlug, "radiation-oncology");
    // Primary specialty must be one of the faculty specialties.
    assert.ok(row.specialties.includes(row.specialty));
  }
  const puneHospitalLandings = listHospitalLandings().filter((row) => row.citySlug === "pune");
  assert.ok(puneHospitalLandings.length < 400, `inflated facets: ${puneHospitalLandings.length}`);
});

test("multi-campus doctors have structured hospitalSlugs and reciprocal faculty lists", () => {
  const multi = ginger.doctors.filter(
    (row) => row.hospitalSlug.startsWith(SAHYADRI) && (row.hospitalSlugs?.length || 0) > 1,
  );
  assert.equal(multi.length, 23);
  for (const seed of multi) {
    const doctor = catalogDoctors.find((row) => row.slug === seed.slug);
    assert.ok(doctor, seed.slug);
    assert.deepEqual(doctor!.hospitalSlugs.slice().sort(), (seed.hospitalSlugs || []).slice().sort());
    for (const hospitalSlug of doctor!.hospitalSlugs) {
      const faculty = doctorsForHospital(hospitalSlug);
      assert.ok(
        faculty.some((row) => row.slug === doctor!.slug),
        `${doctor!.slug} missing from faculty of ${hospitalSlug}`,
      );
    }
  }
});

test("doctor images use verified local assets or approved empty fallback", () => {
  const rows = catalogDoctors.filter((row) => row.hospitalSlug.startsWith(SAHYADRI));
  const withImage = rows.filter((row) => row.image);
  assert.ok(withImage.length >= 100);
  for (const row of withImage) {
    assert.match(row.image || "", /^\/doctors\/sahyadri\//);
    assert.ok(existsSync(join(process.cwd(), "public", (row.image || "").replace(/^\//, ""))), row.image);
    assert.ok((row.imageAlt || "").includes(row.name.split(" ").slice(-1)[0]) || (row.imageAlt || "").length > 10);
  }
  for (const row of catalogHospitals.filter((h) => h.slug.startsWith(SAHYADRI))) {
    // Approved fallback: empty image uses HospitalCampusVisual placeholder.
    assert.equal(row.image || "", "");
  }
  const imageAudit = readFileSync(join(process.cwd(), "docs/sahyadri-pune-image-audit.csv"), "utf8");
  assert.match(imageAudit, /verified_image|approved_fallback|source_unavailable/);
});

test("Arabic overlays stay aligned with remapped procedures and multi-campus affiliations", () => {
  const rows = catalogDoctors.filter((row) => row.hospitalSlug.startsWith(SAHYADRI));
  for (const row of rows) {
    const overlay = cms.doctorOverrides[row.slug];
    assert.ok(overlay);
    assert.equal((overlay.proceduresExpertise || []).length, row.proceduresExpertise.length);
    if (row.hospitalSlugs.length > 1) {
      assert.ok((overlay.affiliations || []).length >= row.hospitalSlugs.length);
    }
  }
  for (const hospital of catalogHospitals.filter((row) => row.slug.startsWith(SAHYADRI))) {
    const overlay = cms.hospitalOverrides[hospital.slug];
    assert.ok(overlay?.focus);
    assert.doesNotMatch(overlay.focus || "", /علاج الأورام بالإشعاع · جراحة الأورام · علاج الأورام الطبي · أمراض الدم · جراحة القلب/);
  }
});

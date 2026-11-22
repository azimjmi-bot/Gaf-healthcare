import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { catalogDoctors, doctorsForHospital } from "@/lib/doctors";
import { featureBar, heroLede, infrastructure, whyChoose } from "@/lib/hospital-profile";
import {
  catalogHospitals,
  isFacultyAffiliatedCampus,
  isManipalBanerCampus,
  MANIPAL_BANER_SLUG,
} from "@/lib/hospitals";
import { hospitalJsonLd, hospitalMetadata } from "@/lib/seo";
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
  doctorOverrides: Record<
    string,
    { status?: string; name?: string; bio?: string; proceduresExpertise?: string[]; affiliations?: string[] }
  >;
  hospitalOverrides: Record<string, { status?: string; name?: string; bio?: string; focus?: string }>;
};

const specialtyNames = new Set(SPECIALTIES.map((row) => row.name));
const ELIGIBLE = [
  "dr-aniket-payagude",
  "dr-balaji-nalwad",
  "dr-bhavana-mangal",
  "dr-borde-mandar-deepak",
  "dr-chinmay-kumbhar",
  "dr-gaurav-chamania",
  "dr-girija-ghate",
] as const;

test("Manipal Baner ships as an independent Pune faculty-affiliated campus", () => {
  const row = catalogHospitals.find((hospital) => hospital.slug === MANIPAL_BANER_SLUG);
  assert.ok(row);
  assert.equal(row!.city, "Pune");
  assert.equal(row!.citySlug, "pune");
  assert.equal(row!.countrySlug, "india");
  assert.equal(isManipalBanerCampus(row!.slug), true);
  assert.equal(isFacultyAffiliatedCampus(row!.slug), true);
  assert.equal(row!.serviceLineEvidence, "faculty-affiliated");
  assert.equal(row!.specialty, "");
  assert.equal(row!.specialtySlug, "");
  assert.match(row!.focus, /Affiliated faculty specialties/);
  assert.equal(row!.icu, "");
  assert.match(row!.bio, /Baner-Mhalunge Main Road/);
  assert.match(row!.bio, /independent|separately|own/i);
  assert.doesNotMatch(row!.bio, /Sahyadri Super Speciality Hospital, Nagar Road is/);
  const overlay = cms.hospitalOverrides[MANIPAL_BANER_SLUG];
  assert.ok(overlay);
  assert.equal(overlay.status, "published");
  assert.match(overlay.bio || "", /[\u0600-\u06FF]/);
  assert.match(overlay.name || "", /[\u0600-\u06FF]/);
});

test("Manipal Baner page-3 eligible doctors stay inside existing GAF specialties", () => {
  const rows = catalogDoctors.filter((row) => row.hospitalSlug === MANIPAL_BANER_SLUG);
  assert.equal(rows.length, 7);
  assert.deepEqual(rows.map((row) => row.slug).sort(), [...ELIGIBLE].sort());
  for (const row of rows) {
    assert.equal(row.city, "Pune");
    assert.equal(row.citySlug, "pune");
    assert.ok(specialtyNames.has(row.specialty), row.specialty);
    assert.ok(row.hospitalSlugs.includes(MANIPAL_BANER_SLUG));
    assert.ok(row.bio.length > 200);
    assert.doesNotMatch(row.bio, /world-renowned|cutting-edge|guaranteed outcome/i);
    const overlay = cms.doctorOverrides[row.slug];
    assert.ok(overlay, row.slug);
    assert.equal(overlay.status, "published");
    assert.match(overlay.name || "", /[\u0600-\u06FF]/);
    assert.match(overlay.bio || "", /GAF Healthcare/);
  }
  assert.equal(doctorsForHospital(MANIPAL_BANER_SLUG).length, 7);
});

test("eligibility CSV records page-3 exclusions outside GAF taxonomy", () => {
  const csv = readFileSync(join(process.cwd(), "docs/manipal-baner-page3-eligibility.csv"), "utf8");
  assert.match(csv, /eligible/);
  assert.match(csv, /,YES,/);
  assert.match(csv, /,NO,/);
  assert.match(csv, /specialty_not_in_gaf_taxonomy/);
  const yes = csv.split("\n").filter((line) => line.includes(",YES,")).length;
  const no = csv.split("\n").filter((line) => line.includes(",NO,")).length;
  assert.equal(yes, 7);
  assert.equal(no, 3);
  assert.equal(ginger.doctors.filter((row) => row.hospitalSlug === MANIPAL_BANER_SLUG).length, 7);
  assert.equal(ginger.hospitals.filter((row) => row.slug === MANIPAL_BANER_SLUG).length, 1);
});

test("Manipal Baner doctor procedures are evidence-mapped rather than specialty defaults", () => {
  const rows = catalogDoctors.filter((row) => row.hospitalSlug === MANIPAL_BANER_SLUG);
  const audit = readFileSync(join(process.cwd(), "docs/manipal-baner-page3-doctor-procedure-audit.csv"), "utf8");
  assert.match(audit, /mapping_status/);
  assert.match(audit, /no_specific_procedure_evidence|verified|partially_verified/);
  const empty = rows.filter((row) => row.procedures.length === 0);
  assert.ok(empty.some((row) => row.slug === "dr-chinmay-kumbhar"));
  const payagude = rows.find((row) => row.slug === "dr-aniket-payagude");
  assert.ok(payagude);
  assert.ok(payagude!.procedures.includes("Colorectal Cancer Surgery"));
  assert.ok(!payagude!.procedures.includes("Upper GI Endoscopy (Gastroscopy)"));
});

test("Manipal Baner public copy distinguishes faculty relationships from campus services", () => {
  const row = catalogHospitals.find((hospital) => hospital.slug === MANIPAL_BANER_SLUG);
  assert.ok(row);
  const meta = hospitalMetadata(row!);
  assert.match(String(meta.title), /independent Manipal Hospitals campus/i);
  assert.doesNotMatch(String(meta.title), /oncology, ENT and GI hospital/i);
  assert.match(String(meta.description), /Affiliated faculty specialties/i);
  const jsonLd = hospitalJsonLd(row!);
  assert.match(String(jsonLd.description), /verified affiliated faculty/i);
  assert.ok(whyChoose(row!, 7).some((card) => /Faculty-linked specialties/i.test(card.title)));
  assert.ok(!whyChoose(row!, 7).some((card) => /ICU and theatres/i.test(card.title)));
  assert.ok(featureBar(row!).every((item) => !/Advanced ICU/i.test(item.label)));
  assert.match(heroLede(row!), /Baner/);
  assert.ok(infrastructure(row!).some((item) => /Independent campus record/i.test(item.title)));
});

test("Manipal Baner images use verified assets or empty avatar fallback", () => {
  const rows = ginger.doctors.filter((row) => row.hospitalSlug === MANIPAL_BANER_SLUG);
  for (const row of rows) {
    if (row.slug === "dr-borde-mandar-deepak") {
      assert.equal(row.image || "", "");
      continue;
    }
    assert.match(row.image || "", /^\/doctors\/manipal-baner\//);
    assert.equal(existsSync(join(process.cwd(), "public", row.image!.replace(/^\//, ""))), true, row.image);
  }
  const hospital = ginger.hospitals.find((row) => row.slug === MANIPAL_BANER_SLUG);
  assert.ok(hospital);
  assert.equal((hospital as { image?: string }).image || "", "");
  const imageAudit = readFileSync(join(process.cwd(), "docs/manipal-baner-page3-image-audit.csv"), "utf8");
  assert.match(imageAudit, /avatar_fallback/);
  assert.match(imageAudit, /verified_imported/);
});

test("Sahyadri Pune inventory is unchanged by Manipal Baner import", () => {
  const sahyadri = catalogDoctors.filter((row) =>
    row.hospitalSlug.startsWith("sahyadri-super-speciality-hospital-"),
  );
  assert.equal(sahyadri.length, 110);
  assert.equal(
    catalogHospitals.filter((row) => row.slug.startsWith("sahyadri-super-speciality-hospital-")).length,
    3,
  );
});

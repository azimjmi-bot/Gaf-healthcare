import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { catalogDoctors, doctorsForHospital } from "@/lib/doctors";
import { featureBar, heroLede, infrastructure, whyChoose } from "@/lib/hospital-profile";
import {
  catalogHospitals,
  isFacultyAffiliatedCampus,
  isLokmanyaCampus,
  isManipalBanerCampus,
  LOKMANYA_PUNE_SLUGS,
  MANIPAL_BANER_SLUG,
} from "@/lib/hospitals";
import { hospitalJsonLd, hospitalMetadata } from "@/lib/seo";
import { SPECIALTIES, getProcedure } from "@/lib/taxonomy";

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
    bio: string;
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
const report = JSON.parse(
  readFileSync(join(process.cwd(), "docs/manipal-lokmanya-import-report.json"), "utf8"),
) as {
  manipal: { baner_faculty_after: number; new_records_added: number; excluded: number };
  lokmanya: { faculty_after: number; new_records_added: number; excluded: number };
};

function affiliated(slug: string, hospitalSlug: string) {
  const row = ginger.doctors.find((doctor) => doctor.slug === slug);
  if (!row) return false;
  const slugs = row.hospitalSlugs?.length ? row.hospitalSlugs : [row.hospitalSlug];
  return slugs.includes(hospitalSlug);
}

test("Lokmanya Pune campuses ship as independent faculty-affiliated records", () => {
  for (const slug of LOKMANYA_PUNE_SLUGS) {
    const row = catalogHospitals.find((hospital) => hospital.slug === slug);
    assert.ok(row, slug);
    assert.equal(row!.city, "Pune");
    assert.equal(row!.citySlug, "pune");
    assert.equal(row!.countrySlug, "india");
    assert.equal(isLokmanyaCampus(row!.slug), true);
    assert.equal(isFacultyAffiliatedCampus(row!.slug), true);
    assert.equal(row!.serviceLineEvidence, "faculty-affiliated");
    assert.equal(row!.specialty, "");
    assert.match(row!.focus, /Affiliated faculty specialties/);
    assert.equal(row!.icu, "");
    assert.match(row!.bio, /independent|separately|own/i);
    const overlay = cms.hospitalOverrides[slug];
    assert.ok(overlay, slug);
    assert.equal(overlay.status, "published");
    assert.match(overlay.bio || "", /[\u0600-\u06FF]/);
    assert.match(overlay.name || "", /[\u0600-\u06FF]/);
  }
});

test("Manipal Baner full-directory faculty stays inside existing GAF specialties", () => {
  const rows = catalogDoctors.filter((row) =>
    (row.hospitalSlugs?.length ? row.hospitalSlugs : [row.hospitalSlug]).includes(MANIPAL_BANER_SLUG),
  );
  assert.equal(rows.length, report.manipal.baner_faculty_after);
  assert.ok(rows.length >= 61);
  for (const row of rows) {
    assert.equal(row.city, "Pune");
    assert.ok(specialtyNames.has(row.specialty), `${row.slug} ${row.specialty}`);
    assert.ok(row.bio.length > 160);
    assert.doesNotMatch(row.bio, /world-renowned|guaranteed outcome/i);
    const overlay = cms.doctorOverrides[row.slug];
    assert.ok(overlay, row.slug);
    assert.equal(overlay.status, "published");
    assert.match(overlay.name || "", /[\u0600-\u06FF]/);
    assert.match(overlay.bio || "", /GAF Healthcare/);
    for (const procedure of row.procedures) {
      assert.ok(getProcedure(procedure), `${row.slug} ${procedure}`);
    }
  }
  assert.equal(doctorsForHospital(MANIPAL_BANER_SLUG).length, rows.length);
  assert.equal(isManipalBanerCampus(MANIPAL_BANER_SLUG), true);
});

test("Lokmanya faculty stays inside existing GAF specialties with campus OPD evidence", () => {
  const rows = catalogDoctors.filter((row) =>
    (row.hospitalSlugs?.length ? row.hospitalSlugs : [row.hospitalSlug]).some(isLokmanyaCampus),
  );
  assert.equal(rows.length, report.lokmanya.faculty_after);
  assert.ok(rows.length >= 39);
  for (const row of rows) {
    assert.equal(row.city, "Pune");
    assert.ok(specialtyNames.has(row.specialty), `${row.slug} ${row.specialty}`);
    assert.ok(row.hospitalSlugs.some(isLokmanyaCampus));
    const overlay = cms.doctorOverrides[row.slug];
    assert.ok(overlay, row.slug);
    assert.equal(overlay.status, "published");
    assert.match(overlay.bio || "", /GAF Healthcare/);
    for (const procedure of row.procedures) {
      assert.ok(getProcedure(procedure), `${row.slug} ${procedure}`);
    }
  }
  for (const slug of LOKMANYA_PUNE_SLUGS) {
    assert.ok(doctorsForHospital(slug).length > 0, slug);
  }
});

test("eligibility CSV covers Manipal and Lokmanya discoveries with exclusions", () => {
  const csv = readFileSync(join(process.cwd(), "docs/manipal-lokmanya-eligibility.csv"), "utf8");
  assert.match(csv, /manipal-baner/);
  assert.match(csv, /lokmanya/);
  assert.match(csv, /,YES,/);
  assert.match(csv, /,NO,/);
  assert.match(csv, /specialty_not_in_gaf_taxonomy/);
  const manipalNo = csv.split("\n").filter((line) => line.startsWith("manipal-baner,") && line.includes(",NO,")).length;
  const lokNo = csv.split("\n").filter((line) => line.startsWith("lokmanya,") && line.includes(",NO,")).length;
  assert.equal(manipalNo, report.manipal.excluded);
  assert.equal(lokNo, report.lokmanya.excluded);
});

test("multi-campus merges append Baner/Lokmanya without duplicating people", () => {
  assert.equal(affiliated("dr-abhijit-agashe", MANIPAL_BANER_SLUG), true);
  assert.equal(affiliated("dr-abhijit-agashe", "sahyadri-super-speciality-hospital-deccan-gymkhana"), true);
  assert.equal(affiliated("dr-kannan-subramanian", MANIPAL_BANER_SLUG), true);
  assert.equal(affiliated("dr-shashikant-apte", MANIPAL_BANER_SLUG), true);
  assert.equal(affiliated("dr-mangesh-udar", MANIPAL_BANER_SLUG), true);
  assert.equal(affiliated("dr-tushar-deore", MANIPAL_BANER_SLUG), true);
  assert.equal(affiliated("dr-rakshit-ahuja", "lokmanya-hospital-sb-road"), true);
  assert.equal(affiliated("dr-hemant-sant", "lokmanya-hospital-sb-road"), true);
  assert.equal(affiliated("dr-nikhil-likhate", "lokmanya-hospital-sb-road"), true);
  assert.equal(ginger.doctors.filter((row) => row.slug === "dr-mangesh-u-udar").length, 0);
  assert.equal(ginger.doctors.filter((row) => row.slug === "dr-tushar-j-deore").length, 0);
  assert.equal(ginger.doctors.filter((row) => row.slug === "dr-nikhil-s-likhate").length, 0);
});

test("faculty-affiliated hospital copy and SEO stay noindex-safe for new campuses", () => {
  for (const slug of [MANIPAL_BANER_SLUG, ...LOKMANYA_PUNE_SLUGS]) {
    const row = catalogHospitals.find((hospital) => hospital.slug === slug);
    assert.ok(row, slug);
    const meta = hospitalMetadata(row!);
    assert.match(String(meta.description), /Affiliated faculty specialties/i);
    assert.doesNotMatch(String(meta.title), /oncology, ENT and GI hospital/i);
    const jsonLd = hospitalJsonLd(row!);
    assert.match(String(jsonLd.description), /verified affiliated faculty/i);
    assert.ok(whyChoose(row!, doctorsForHospital(slug).length).some((card) => /Faculty-linked specialties/i.test(card.title)));
    assert.ok(featureBar(row!).every((item) => !/Advanced ICU/i.test(item.label)));
    assert.match(heroLede(row!), /independent/i);
    assert.ok(infrastructure(row!).some((item) => /Independent campus record/i.test(item.title)));
  }
});

test("doctor images use verified assets or empty avatar fallback", () => {
  const imageAudit = readFileSync(join(process.cwd(), "docs/manipal-lokmanya-image-audit.csv"), "utf8");
  assert.match(imageAudit, /verified_imported|avatar_fallback/);
  const rows = ginger.doctors.filter((row) => {
    const slugs = row.hospitalSlugs?.length ? row.hospitalSlugs : [row.hospitalSlug];
    return slugs.includes(MANIPAL_BANER_SLUG) || slugs.some((slug) => slug.startsWith("lokmanya-"));
  });
  for (const row of rows) {
    if (!row.image) continue;
    assert.match(row.image, /^\/doctors\/(manipal-baner|lokmanya|sahyadri)\//);
    assert.equal(existsSync(join(process.cwd(), "public", row.image.replace(/^\//, ""))), true, row.image);
  }
});

test("Sahyadri Pune inventory count remains 110 primary affiliations", () => {
  const sahyadri = catalogDoctors.filter((row) =>
    row.hospitalSlug.startsWith("sahyadri-super-speciality-hospital-"),
  );
  assert.equal(sahyadri.length, 110);
  assert.equal(
    catalogHospitals.filter((row) => row.slug.startsWith("sahyadri-super-speciality-hospital-")).length,
    3,
  );
});

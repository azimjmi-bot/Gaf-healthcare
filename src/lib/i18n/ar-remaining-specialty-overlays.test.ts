import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { doctorsPath } from "@/lib/catalog-links";
import { PSEO_LOCKED_KEYS, pickDoctorPatch, translationStatus } from "@/lib/cms/catalog-types";
import { catalogDoctors } from "@/lib/doctors";
import { localePageState, localePathIsPublished } from "@/lib/i18n/locale-publication";
import { TAXONOMY_AR } from "@/lib/i18n/taxonomy-ar";
import { doctorsForLocale } from "@/lib/locale-catalog";
import { doctorProfilePageJsonLd } from "@/lib/seo";

const SPECIALTIES = {
  "Cosmetic Surgery": 74,
  ENT: 103,
  Gastroenterology: 153,
  "Surgical Gastroenterology": 107,
  Urology: 137,
  "Spine Surgery": 63,
  Pulmonology: 112,
  "Pediatric Orthopaedic": 13,
  Orthopedics: 208,
  Ophthalmology: 102,
  Gynecology: 187,
  Neurology: 111,
  Nephrology: 107,
} as const;

type Specialty = keyof typeof SPECIALTIES;
type Patch = {
  status?: string;
  name: string;
  title: string;
  bio: string;
  imageAlt: string;
  qualifications: string;
  experience: string;
  proceduresExpertise: string[];
  specializations: string[];
  education: string[];
  affiliations: string[];
  memberships: string[];
  awards: string[];
  research: string[];
};

const cms = JSON.parse(
  readFileSync(join(process.cwd(), "content/ar/catalog-cms.json"), "utf8"),
) as { doctorOverrides: Record<string, Patch> };
const specialtyNames = new Set<string>(Object.keys(SPECIALTIES));
const source = catalogDoctors.filter((doctor) => specialtyNames.has(doctor.specialty));
const localized = doctorsForLocale("ar").filter((doctor) => specialtyNames.has(doctor.specialty));

test("Arabic overlays comprehensively cover the remaining requested doctor specialties", () => {
  assert.equal(source.length, 1477);
  assert.equal(localized.length, source.length);

  for (const [specialty, expected] of Object.entries(SPECIALTIES)) {
    assert.equal(
      source.filter((doctor) => doctor.specialty === specialty).length,
      expected,
      specialty,
    );
    assert.equal(
      localized.filter((doctor) => doctor.specialty === specialty).length,
      expected,
      `Arabic ${specialty}`,
    );
  }

  for (const doctor of source) {
    const specialty = doctor.specialty as Specialty;
    const label = TAXONOMY_AR[specialty];
    const patch = cms.doctorOverrides[doctor.slug];
    assert.ok(patch, `missing Arabic overlay for ${doctor.slug}`);
    assert.equal(translationStatus(patch), "published", doctor.slug);
    assert.match(patch.name, /[\u0600-\u06ff]/, `${doctor.slug} name`);
    assert.doesNotMatch(patch.name, /[A-Za-z]/, `${doctor.slug} name`);
    assert.ok(patch.title.includes(label), `${doctor.slug} title`);
    assert.match(patch.qualifications, /[\u0600-\u06ff]/, `${doctor.slug} qualifications`);
    assert.doesNotMatch(
      patch.qualifications,
      /\b(?:MBBS|MD|MS|DM|DNB|MCh|MRCP|FRCP|FRCS|FACC|FESC|FACS|FICO|FRCOphth)\b/i,
      doctor.slug,
    );
    assert.ok(patch.bio.length >= 420, `${doctor.slug} bio is too short`);
    assert.ok(patch.bio.includes("GAF Healthcare"), `${doctor.slug} missing brand`);
    assert.ok(patch.bio.includes("الهند"), `${doctor.slug} missing country`);
    assert.ok(patch.bio.includes(label), `${doctor.slug} missing specialty`);
    assert.match(patch.bio, /البلد والمدينة والتخصص والإجراء|الهند \//, doctor.slug);
    assert.match(
      patch.bio,
      /الصور السريرية|تنظير الأنف|التنظير|تحليل البول|الرنين|وظائف الرئة|صور العظام|صور المفاصل|حدة البصر|التصوير النسائي|تخطيط الدماغ|وظائف الكلى/,
      `${doctor.slug} missing records-first context`,
    );
    assert.ok(patch.imageAlt.includes(`دليل GAF Healthcare لـ${label} في الهند`), doctor.slug);
    assert.ok(
      patch.proceduresExpertise.length > 0,
      `${doctor.slug} missing procedures`,
    );
    if (doctor.procedures.length === 0) {
      assert.deepEqual(patch.proceduresExpertise, [label], doctor.slug);
    }
    assert.ok(
      patch.proceduresExpertise.every((value) => /[\u0600-\u06ff]/.test(value)),
      doctor.slug,
    );
    assert.ok(patch.specializations.every((value) => /[\u0600-\u06ff]/.test(value)), doctor.slug);
    for (const value of [
      ...patch.education,
      ...patch.affiliations,
      ...patch.memberships,
      ...patch.awards,
      ...patch.research,
    ]) {
      assert.match(value, /[\u0600-\u06ff]/, doctor.slug);
      assert.doesNotMatch(value, /[A-Za-z]{2,}/, `${doctor.slug}: ${value}`);
    }
  }
});

test("Arabic remaining-specialty overlays preserve pSEO identities and source relationships", () => {
  const locked = new Set<string>(PSEO_LOCKED_KEYS);
  const localizedBySlug = new Map(localized.map((doctor) => [doctor.slug, doctor]));

  for (const english of source) {
    const patch = pickDoctorPatch(cms.doctorOverrides[english.slug]) as Record<string, unknown>;
    for (const key of Object.keys(patch)) {
      assert.equal(locked.has(key), false, `${english.slug} leaked locked key ${key}`);
    }
    const arabic = localizedBySlug.get(english.slug);
    assert.ok(arabic, english.slug);
    assert.equal(arabic.slug, english.slug);
    assert.equal(arabic.citySlug, english.citySlug);
    assert.equal(arabic.countrySlug, english.countrySlug);
    assert.equal(arabic.specialtySlug, english.specialtySlug);
    assert.deepEqual(arabic.procedureSlugs, english.procedureSlugs);
    assert.deepEqual(arabic.treatmentSlugs, english.treatmentSlugs);
    assert.equal(arabic.hospitalSlug, english.hospitalSlug);
  }
});

test("requested remaining Arabic profiles and eligible pSEO facets publish at stable routes", () => {
  for (const specialty of Object.keys(SPECIALTIES)) {
    assert.equal(
      localePathIsPublished("ar", `/doctors/India/${specialty.replaceAll(" ", "-")}`),
      true,
      specialty,
    );
  }
  for (const doctor of localized) {
    assert.equal(localePathIsPublished("ar", `/doctors/${doctor.slug}`), true, doctor.slug);
    assert.notEqual(
      localePageState(
        "ar",
        doctorsPath({
          destination: doctor.country,
          city: doctor.city,
          specialty: doctor.specialty,
        }),
      ),
      "missing",
      `${doctor.slug} city-specialty facet`,
    );
    for (const procedure of doctor.procedures) {
      assert.notEqual(
        localePageState(
          "ar",
          doctorsPath({
            destination: doctor.country,
            city: doctor.city,
            specialty: doctor.specialty,
            procedure,
          }),
        ),
        "missing",
        `${doctor.slug}: ${procedure}`,
      );
    }
  }
});

test("Arabic JSON-LD keeps one stable entity identity for every remaining specialty", () => {
  for (const specialty of Object.keys(SPECIALTIES) as Specialty[]) {
    const arabic = localized.find((doctor) => doctor.specialty === specialty);
    const english = source.find((doctor) => doctor.slug === arabic?.slug);
    assert.ok(arabic);
    assert.ok(english);
    const graph = doctorProfilePageJsonLd(arabic, "ar", { english });
    const physician = graph.mainEntity as Record<string, unknown>;
    assert.equal(physician["@id"], `https://gaf.healthcare/doctors/${english.slug}#person`);
    assert.equal(physician.name, arabic.name);
    assert.equal(physician.alternateName, english.name);
    assert.equal(physician.medicalSpecialty, TAXONOMY_AR[specialty]);
    assert.equal(graph.inLanguage, "ar");
    assert.equal(graph.url, `https://gaf.healthcare/ar/doctors/${english.slug}`);
  }
});

test("Arabic remaining-specialty bios are unique and avoid ranking claims", () => {
  const patches = source.map((doctor) => cms.doctorOverrides[doctor.slug]);
  assert.equal(new Set(patches.map((patch) => patch.bio)).size, patches.length);
  for (const patch of patches) {
    assert.doesNotMatch(patch.bio, /الأفضل|رقم واحد|الأشهر عالميًا|نتيجة مضمونة/);
  }
});

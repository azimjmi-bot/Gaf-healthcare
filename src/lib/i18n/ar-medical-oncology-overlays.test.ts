import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import catalog from "@/data/ginger-catalog.json";
import names from "@/data/medical-oncologist-names-ar.json";
import { doctorsPath } from "@/lib/catalog-links";
import { PSEO_LOCKED_KEYS, pickDoctorPatch, translationStatus } from "@/lib/cms/catalog-types";
import { catalogDoctors } from "@/lib/doctors";
import { localePageState, localePathIsPublished } from "@/lib/i18n/locale-publication";
import { doctorsForLocale } from "@/lib/locale-catalog";
import { doctorMetadata } from "@/lib/seo";

const cms = JSON.parse(
  readFileSync(join(process.cwd(), "content/ar/catalog-cms.json"), "utf8"),
) as {
  doctorOverrides: Record<
    string,
    {
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
    }
  >;
};

const source = catalogDoctors.filter((doctor) => doctor.specialty === "Medical Oncology");
const rawSource = catalog.doctors.filter((doctor) => doctor.specialty === "Medical Oncology");
const localized = doctorsForLocale("ar").filter((doctor) => doctor.specialty === "Medical Oncology");
const nameMap = names as Record<string, string>;

test("Arabic overlays cover every medical oncologist with substantive SEO and GEO copy", () => {
  assert.equal(source.length, 86);
  assert.equal(rawSource.length, 86);
  assert.equal(Object.keys(nameMap).length, source.length);
  assert.equal(localized.length, source.length);

  for (const doctor of source) {
    const patch = cms.doctorOverrides[doctor.slug];
    assert.ok(patch, `missing Arabic overlay for ${doctor.slug}`);
    assert.equal(translationStatus(patch), "published", doctor.slug);
    assert.equal(patch.name, nameMap[doctor.slug], doctor.slug);
    assert.match(patch.name, /[\u0600-\u06FF]/, `${doctor.slug} name`);
    assert.doesNotMatch(patch.name, /[A-Za-z]/, `${doctor.slug} name`);
    assert.match(patch.title, /علاج الأورام الطبي/, `${doctor.slug} title`);
    assert.match(patch.qualifications, /[\u0600-\u06FF]/, `${doctor.slug} qualifications`);
    assert.doesNotMatch(
      patch.qualifications,
      /\b(?:MBBS|MD|DM|DNB|MRCP|FRCP|ECMO|ESMO)\b/i,
      doctor.slug,
    );
    assert.ok(patch.bio.length >= 420, `${doctor.slug} bio is too short`);
    assert.ok(patch.bio.includes("GAF Healthcare"), `${doctor.slug} missing brand`);
    assert.ok(patch.bio.includes("الهند"), `${doctor.slug} missing country`);
    assert.ok(patch.bio.includes("علاج الأورام الطبي"), `${doctor.slug} missing specialty`);
    assert.ok(
      patch.bio.includes("البلد والمدينة والتخصص والإجراء") ||
        patch.bio.includes("الهند /"),
      `${doctor.slug} missing pSEO hierarchy`,
    );
    assert.match(
      patch.bio,
      /الخزعة|المؤشرات الحيوية|التحاليل|التصوير/,
      `${doctor.slug} missing records-first context`,
    );
    assert.match(patch.imageAlt, /دليل GAF Healthcare لعلاج الأورام الطبي في الهند/, doctor.slug);
    assert.ok(patch.proceduresExpertise.length > 0, `${doctor.slug} missing procedures`);
    assert.ok(
      patch.proceduresExpertise.every((value) => /[\u0600-\u06FF]/.test(value)),
      doctor.slug,
    );
    assert.ok(patch.specializations.every((value) => /[\u0600-\u06FF]/.test(value)), doctor.slug);
    for (const value of [
      ...patch.education,
      ...patch.affiliations,
      ...patch.memberships,
      ...patch.awards,
      ...patch.research,
    ]) {
      assert.match(value, /[\u0600-\u06FF]/, doctor.slug);
      assert.doesNotMatch(value, /[A-Za-z]{2,}/, `${doctor.slug}: ${value}`);
    }
  }
});

test("Arabic medical-oncology profiles preserve pSEO identity and relationships", () => {
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

test("Arabic medical-oncology profiles and pSEO facets publish at stable routes", () => {
  assert.equal(localePathIsPublished("ar", "/doctors/India/Medical-Oncology"), true);
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

test("Arabic medical-oncology metadata uses specialty-specific search terms", () => {
  const doctor = localized[0];
  assert.ok(doctor);
  const metadata = doctorMetadata(doctor, "ar");
  assert.ok(metadata.keywords?.includes("علاج الأورام الطبي الهند"));
  assert.ok(metadata.keywords?.includes("علاج الأورام الطبي في الهند"));
  assert.equal(metadata.keywords?.includes("علاج الأورام بالإشعاع في الهند"), false);
});

test("Arabic medical-oncology bios are unique and avoid ranking claims", () => {
  const patches = source.map((doctor) => cms.doctorOverrides[doctor.slug]);
  assert.equal(new Set(patches.map((patch) => patch.bio)).size, patches.length);
  for (const patch of patches) {
    assert.doesNotMatch(patch.bio, /الأفضل|رقم واحد|الأشهر عالميًا/);
  }
});

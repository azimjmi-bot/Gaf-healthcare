import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, test } from "node:test";
import { applyCatalogLayer, catalogCmsIsCached, catalogCmsKey, clearCatalogCmsCache } from "@/lib/cms/catalog-store";
import { DOCTOR_OVERLAY_KEYS, translationStatus } from "@/lib/cms/catalog-types";
import type { Doctor } from "@/lib/doctors";
import { campusLocation, designationLabel, experienceBadge, keyProcedureLabels, listingBio } from "@/lib/doctor-profile";
import { medicalPhrase } from "@/lib/i18n/medical-phrases";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import type { AppLocale } from "@/lib/i18n/languages";
import { localePathIsPublished } from "@/lib/i18n/locale-publication";
import { radiationProcedurePatch } from "@/lib/i18n/ar-radiation-procedure";
import {
  DOCTOR_PROFILE_CACHE_MAX,
  clearLocaleCatalogCache,
  doctorProfileCacheSize,
  doctorsForLocale,
  getDoctorForLocale,
  hospitalsForLocale,
  inspectLocaleDoctorIndex,
  treatmentsForLocale,
} from "@/lib/locale-catalog";
import { doctorMetadata, doctorProfilePageJsonLd } from "@/lib/seo";
import { contentStorage, setContentStorage } from "@/lib/storage";
import { MemoryContentStorage } from "@/lib/storage/memory";

const CMS_PATH = join(process.cwd(), "content/ar/catalog-cms.json");

type Patch = Record<string, unknown> & {
  status?: string;
  name?: string;
  title?: string;
  bio?: string;
  education?: string[];
  research?: string[];
};

function hasText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

/** Independent copy of the publication rule, so the test is not the implementation. */
function publishedPatch(patch: Record<string, unknown> | undefined) {
  return Boolean(
    patch && translationStatus(patch) === "published" && hasText(patch.name) && hasText(patch.title) && hasText(patch.bio),
  );
}

function readArabicCms() {
  return JSON.parse(readFileSync(CMS_PATH, "utf8")) as {
    doctorOverrides: Record<string, Patch>;
    doctorsAdded?: { slug: string }[];
    doctorsDeleted?: string[];
  };
}

/** Same projection as `doctorCardData` in `src/components/doctor-card.tsx`. */
function cardFields(doctor: Doctor, locale: AppLocale) {
  return {
    slug: doctor.slug,
    name: doctor.name,
    title: doctor.title,
    featured: Boolean(doctor.featured),
    specialty: taxonomyLabel(doctor.specialty, locale),
    experience: experienceBadge(doctor),
    designation: designationLabel(doctor),
    qualifications: doctor.qualifications,
    education: doctor.education.filter(Boolean).slice(0, 3),
    hospitalSlug: doctor.hospitalSlug,
    hospitalName: doctor.hospitalName,
    location: campusLocation(doctor, undefined, locale),
    bio: listingBio(doctor),
    procedures: keyProcedureLabels(doctor).map((item) => medicalPhrase(item, locale)),
    image: doctor.image,
    imageAlt: doctor.imageAlt,
  };
}

function baselineSlugs() {
  const cms = readArabicCms();
  const gone = new Set(cms.doctorsDeleted ?? []);
  const slugs: string[] = [];
  for (const doctor of doctorsForLocale("en")) {
    if (gone.has(doctor.slug)) continue;
    if (!publishedPatch(cms.doctorOverrides[doctor.slug])) continue;
    slugs.push(doctor.slug);
  }
  for (const extra of cms.doctorsAdded ?? []) {
    if (gone.has(extra.slug) || slugs.includes(extra.slug)) continue;
    if (!publishedPatch(extra as unknown as Record<string, unknown>)) continue;
    slugs.push(extra.slug);
  }
  return slugs;
}

function fullDoctor(slug: string, cms = readArabicCms(), englishDoctors = doctorsForLocale("en")) {
  const english = englishDoctors.find((row) => row.slug === slug);
  assert.ok(english, slug);
  const layered = applyCatalogLayer(
    [english],
    cms.doctorsDeleted ?? [],
    { [slug]: cms.doctorOverrides[slug] },
    [],
    DOCTOR_OVERLAY_KEYS,
  )[0];
  assert.ok(layered, slug);
  const campus = hospitalsForLocale("ar").find((hospital) => hospital.slug === layered.hospitalSlug);
  if (campus && campus.name !== layered.hospitalName) return { ...layered, hospitalName: campus.name };
  return layered;
}

describe("arabic doctor catalogue index", { concurrency: 1 }, () => {
  test("the filesystem backend serves the published Arabic slug set unchanged", () => {
    assert.equal(contentStorage().kind, "fs");
    const slugs = doctorsForLocale("ar").map((doctor) => doctor.slug);
    assert.deepEqual(slugs, baselineSlugs());
    assert.equal(slugs.length, 2305);
    assert.equal(new Set(slugs).size, slugs.length);
    assert.equal(hospitalsForLocale("ar").length, 37);
    assert.equal(treatmentsForLocale("ar").length, 380);
    for (const locale of ["fr", "ru", "sw"] as const) {
      assert.equal(doctorsForLocale(locale).length, 0);
    }
  });

  test("list rows keep the card fields and drop long-form profile fields", () => {
    const cms = readArabicCms();
    const englishDoctors = doctorsForLocale("en");
    const campus = new Map(hospitalsForLocale("ar").map((hospital) => [hospital.slug, hospital.name]));
    const index = inspectLocaleDoctorIndex("ar");
    assert.equal(index.retainsDoctorOverrides, false);
    assert.equal(index.longFormEntries, 0);
    assert.ok(index.bioChars < 600_000, `list bios retained ${index.bioChars} chars`);
    const fileBios = Object.values(cms.doctorOverrides).reduce((sum, patch) => sum + (patch.bio?.length ?? 0), 0);
    assert.ok(fileBios > 1_500_000);
    assert.ok(index.bioChars < fileBios / 2);

    for (const slim of doctorsForLocale("ar")) {
      const english = englishDoctors.find((row) => row.slug === slim.slug);
      assert.ok(english, slim.slug);
      const layered = applyCatalogLayer(
        [english],
        cms.doctorsDeleted ?? [],
        { [slim.slug]: cms.doctorOverrides[slim.slug] },
        [],
        DOCTOR_OVERLAY_KEYS,
      )[0]!;
      const campusName = campus.get(layered.hospitalSlug);
      const full = campusName && campusName !== layered.hospitalName ? { ...layered, hospitalName: campusName } : layered;
      assert.equal(slim.bio.length <= 220, true, slim.slug);
      assert.deepEqual(cardFields(slim, "ar"), cardFields(full, "ar"), slim.slug);
      assert.equal(listingBio(slim), listingBio(full), slim.slug);
      assert.deepEqual(keyProcedureLabels(slim), keyProcedureLabels(full), slim.slug);
      assert.deepEqual(slim.education, full.education.filter(Boolean).slice(0, 3), slim.slug);
      assert.deepEqual(slim.research, []);
      assert.deepEqual(slim.awards, []);
      assert.deepEqual(slim.affiliations, []);
      assert.deepEqual(slim.memberships, []);
      assert.deepEqual(slim.specializations, []);
      if (full.bio.length > 220) assert.notEqual(slim.bio, full.bio, slim.slug);
    }
  });

  test("profile pages still resolve the full biography, metadata, and JSON-LD", () => {
    const slugs = doctorsForLocale("ar").map((doctor) => doctor.slug);
    const samples = [slugs[0]!, slugs[1]!, slugs[40]!, slugs.at(-1)!];
    const longest = Object.entries(readArabicCms().doctorOverrides).sort(
      (a, b) => (b[1].bio?.length ?? 0) - (a[1].bio?.length ?? 0),
    )[0]!;
    if (!samples.includes(longest[0])) samples.push(longest[0]);

    for (const slug of samples) {
      const full = fullDoctor(slug);
      const profile = getDoctorForLocale(slug, "ar");
      assert.ok(profile, slug);
      assert.equal(profile.bio, full.bio, slug);
      assert.ok(profile.bio.length > 220, slug);
      assert.deepEqual(profile.education, full.education, slug);
      assert.deepEqual(profile.research, full.research, slug);
      assert.deepEqual(profile.awards, full.awards, slug);
      assert.deepEqual(profile.affiliations, full.affiliations, slug);
      assert.deepEqual(profile.memberships, full.memberships, slug);
      assert.deepEqual(profile.specializations, full.specializations, slug);
      assert.deepEqual(profile.proceduresExpertise, full.proceduresExpertise, slug);
      assert.equal(profile.name, full.name);
      assert.equal(profile.hospitalName, full.hospitalName);
      const english = doctorsForLocale("en").find((row) => row.slug === slug);
      assert.deepEqual(
        doctorProfilePageJsonLd(profile, "ar", { english }),
        doctorProfilePageJsonLd(full, "ar", { english }),
      );
      assert.deepEqual(doctorMetadata(profile, "ar"), doctorMetadata(full, "ar"));
      assert.equal(localePathIsPublished("ar", `/doctors/${slug}`), true);
    }
  });

  test("draft and unknown profiles stay unpublished", () => {
    const published = new Set(doctorsForLocale("ar").map((doctor) => doctor.slug));
    const missing = doctorsForLocale("en").find((doctor) => !published.has(doctor.slug));
    if (missing) {
      assert.equal(getDoctorForLocale(missing.slug, "ar"), undefined);
      assert.equal(localePathIsPublished("ar", `/doctors/${missing.slug}`), false);
    }
    assert.equal(getDoctorForLocale("not-a-real-doctor", "ar"), undefined);
    assert.equal(localePathIsPublished("ar", "/doctors/not-a-real-doctor"), false);

    const [publishedSlug, draftSlug] = doctorsForLocale("en").slice(0, 2).map((doctor) => doctor.slug);
    assert.ok(publishedSlug && draftSlug);
    const secret = "مسودة سرية لا يجوز نشرها";
    const storage = new MemoryContentStorage();
    storage.write(
      catalogCmsKey("ar"),
      JSON.stringify({
        doctorOverrides: {
          [publishedSlug]: {
            status: "published",
            name: "د. منشور",
            title: "لقب منشور",
            bio: `${"سيرة منشورة ".repeat(40)}نهاية`,
            qualifications: "مؤهل",
            experience: "١٠ سنوات",
            education: ["سطر ١", "سطر ٢", "سطر ٣", "سطر ٤"],
            research: ["بحث طويل لا يظهر في القائمة"],
            proceduresExpertise: ["إجراء منشور"],
            imageAlt: "وصف الصورة",
            languages: "العربية",
          },
          [draftSlug]: {
            status: "draft",
            name: "د. مسودة",
            title: "لقب مسودة",
            bio: secret,
          },
          "broken-shape": "not-a-patch",
          [doctorsForLocale("en")[2]!.slug]: {
            status: "published",
            name: "",
            title: "بلا اسم",
            bio: "سيرة بلا اسم",
          },
        },
      }),
    );
    setContentStorage(storage);
    clearLocaleCatalogCache();
    clearCatalogCmsCache();
    try {
      const rows = doctorsForLocale("ar");
      assert.deepEqual(rows.map((doctor) => doctor.slug), [publishedSlug]);
      assert.equal(rows.some((doctor) => doctor.bio.includes(secret) || doctor.name.includes("مسودة")), false);
      assert.equal(getDoctorForLocale(draftSlug, "ar"), undefined);
      assert.equal(localePathIsPublished("ar", `/doctors/${draftSlug}`), false);
      const profile = getDoctorForLocale(publishedSlug, "ar");
      assert.ok(profile);
      assert.match(profile.bio, /سيرة منشورة/);
      assert.deepEqual(profile.research, ["بحث طويل لا يظهر في القائمة"]);
      assert.equal(profile.education.length, 4);
      assert.equal(rows[0]!.education.length, 3);
      assert.deepEqual(rows[0]!.research, []);
      assert.equal(catalogCmsIsCached("ar"), false);
      radiationProcedurePatch("External Beam Radiotherapy (EBRT)");
      assert.equal(catalogCmsIsCached("ar"), false);
    } finally {
      setContentStorage(undefined);
      clearLocaleCatalogCache();
      clearCatalogCmsCache();
    }
  });

  test("a missing or malformed catalogue fails without throwing", () => {
    const storage = new MemoryContentStorage();
    setContentStorage(storage);
    clearLocaleCatalogCache();
    try {
      assert.deepEqual(doctorsForLocale("ar"), []);
      assert.equal(getDoctorForLocale(doctorsForLocale("en")[0]!.slug, "ar"), undefined);
      assert.doesNotThrow(() => hospitalsForLocale("ar"));
      assert.doesNotThrow(() => treatmentsForLocale("ar"));

      storage.write(catalogCmsKey("ar"), "{");
      clearLocaleCatalogCache();
      assert.doesNotThrow(() => doctorsForLocale("ar"));
      assert.deepEqual(doctorsForLocale("ar"), []);
      assert.equal(getDoctorForLocale("anything", "ar"), undefined);

      storage.write(catalogCmsKey("ar"), "null");
      clearLocaleCatalogCache();
      assert.deepEqual(doctorsForLocale("ar"), []);
    } finally {
      setContentStorage(undefined);
      clearLocaleCatalogCache();
    }
  });

  test("the profile cache evicts and stays at its cap", () => {
    clearLocaleCatalogCache();
    const slugs = doctorsForLocale("ar").slice(0, DOCTOR_PROFILE_CACHE_MAX + 12).map((doctor) => doctor.slug);
    assert.ok(slugs.length > DOCTOR_PROFILE_CACHE_MAX);
    for (const slug of slugs) {
      assert.ok(getDoctorForLocale(slug, "ar"), slug);
    }
    assert.equal(doctorProfileCacheSize(), DOCTOR_PROFILE_CACHE_MAX);
    assert.ok(getDoctorForLocale(slugs.at(-1)!, "ar"));
    assert.equal(doctorProfileCacheSize(), DOCTOR_PROFILE_CACHE_MAX);
    const shape = inspectLocaleDoctorIndex("ar");
    assert.equal(shape.retainsDoctorOverrides, false);
    assert.equal(shape.longFormEntries, 0);
    assert.equal(shape.profileCacheMax, DOCTOR_PROFILE_CACHE_MAX);
  });
});

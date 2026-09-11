import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { pickHospitalPatch, PSEO_LOCKED_KEYS } from "../cms/catalog-types";
import { taxonomyLabel } from "./taxonomy-labels";

const cms = JSON.parse(readFileSync(join(process.cwd(), "content/ar/catalog-cms.json"), "utf8")) as {
  hospitalOverrides: Record<
    string,
    {
      bio: string;
      summary: string;
      languages: string;
      focus: string;
      icu: string;
      imageAlt: string;
      slug?: string;
      city?: string;
      specialties?: string[];
      procedureSlugs?: string[];
    }
  >;
};

const ginger = JSON.parse(readFileSync(join(process.cwd(), "src/data/ginger-catalog.json"), "utf8")) as {
  hospitals: { slug: string; name: string; city: string; bio: string }[];
};

test("Arabic overlays cover all 37 partner hospitals", () => {
  assert.equal(ginger.hospitals.length, 37);
  for (const hospital of ginger.hospitals) {
    const patch = cms.hospitalOverrides[hospital.slug];
    assert.ok(patch, `missing overlay for ${hospital.slug}`);
    assert.match(patch.bio, /[\u0600-\u06FF]/);
    assert.ok(patch.bio.length > 120, `${hospital.slug} bio too short`);
    assert.match(patch.imageAlt, /GAF Healthcare/);
    assert.ok(patch.summary.length > 80);
    assert.ok(patch.languages.includes("الإنجليزية"));
    assert.ok(patch.imageAlt.includes("GAF Healthcare"));
    assert.ok(patch.imageAlt.includes(hospital.name));
  }
});

test("Arabic hospital bios are original GAF copy, not Ginger English", () => {
  const banned = [
    /world-renowned/i,
    /cutting-edge/i,
    /compassionate/i,
    /thousand-bed JCI campus/,
    /International patients get the same tumour-board/,
    /a desk that answers/,
    /You meet the named consultant on camera/,
  ];
  for (const [slug, patch] of Object.entries(cms.hospitalOverrides)) {
    for (const re of banned) {
      assert.equal(re.test(patch.bio), false, `${slug} copied Ginger phrasing`);
    }
    assert.notEqual(patch.bio, ginger.hospitals.find((h) => h.slug === slug)?.bio);
    assert.match(patch.bio, /[\u0600-\u06FF]/);
  }
});

test("hospital overlays never rewrite pSEO identity keys", () => {
  const locked = new Set<string>(PSEO_LOCKED_KEYS);
  for (const patch of Object.entries(cms.hospitalOverrides)) {
    const kept = pickHospitalPatch(patch[1]);
    for (const key of Object.keys(kept)) {
      assert.equal(locked.has(key), false, `${patch[0]} leaked locked key ${key}`);
    }
    assert.equal("slug" in kept, false);
    assert.equal("city" in kept, false);
    assert.equal("country" in kept, false);
    assert.equal("specialties" in kept, false);
    assert.equal("procedureSlugs" in kept, false);
  }
});

test("Arabic hospital overlays keep unique bios per campus", () => {
  const bios = Object.values(cms.hospitalOverrides).map((row) => row.bio);
  assert.equal(new Set(bios).size, bios.length);
});

test("eye campuses overlay ophthalmology-only focus", () => {
  assert.equal(cms.hospitalOverrides["dr-agarwals-eye-hospital"].focus, "طب العيون");
  assert.equal(cms.hospitalOverrides["the-sight-avenue-eye-hospital"].focus, "طب العيون");
  assert.match(cms.hospitalOverrides["dr-agarwals-eye-hospital"].icu, /عيون/);
  assert.match(cms.hospitalOverrides["fortis-gurgaon"].focus, /علاج الأورام بالإشعاع/);
});

test("hospital taxonomy labels stay English as routing keys", () => {
  assert.equal(taxonomyLabel("Delhi NCR", "ar"), "دلهي إن سي آر");
  assert.equal(taxonomyLabel("India", "ar"), "الهند");
  assert.equal(taxonomyLabel("Radiation Oncology", "ar"), "علاج الأورام بالإشعاع");
  assert.equal(taxonomyLabel("Ophthalmology", "ar"), "طب العيون");
});

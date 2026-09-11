import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { pickDoctorPatch, PSEO_LOCKED_KEYS } from "../cms/catalog-types";
import { taxonomyLabel } from "./taxonomy-labels";

const cms = JSON.parse(readFileSync(join(process.cwd(), "content/ar/catalog-cms.json"), "utf8")) as {
  doctorOverrides: Record<
    string,
    {
      name: string;
      title: string;
      bio: string;
      experience: string;
      specializations?: string[];
      proceduresExpertise?: string[];
      slug?: string;
      city?: string;
      specialty?: string;
    }
  >;
};

const ginger = JSON.parse(readFileSync(join(process.cwd(), "src/data/ginger-catalog.json"), "utf8")) as {
  doctors: { slug: string; specialty: string; bio: string; city?: string }[];
};

test("Arabic overlays cover all 70 radiation oncologists", () => {
  const ro = ginger.doctors.filter((d) => d.specialty === "Radiation Oncology");
  assert.equal(ro.length, 70);
  for (const doctor of ro) {
    const patch = cms.doctorOverrides[doctor.slug];
    assert.ok(patch, `missing overlay for ${doctor.slug}`);
    assert.match(patch.name, /^د\./);
    assert.match(patch.title, /علاج الأورام بالإشعاع|أخصائي|استشار/);
    assert.match(patch.experience, /سنة/);
    assert.match(patch.bio, /GAF Healthcare/);
    assert.match(patch.bio, /علاج الأورام بالإشعاع|إشعاع/);
    assert.ok(patch.proceduresExpertise && patch.proceduresExpertise.length > 0);
  }
});

test("Arabic bios are original GAF copy, not Ginger English", () => {
  const banned = [
    /world-renowned/i,
    /cutting-edge/i,
    /compassionate/i,
    /Patients are contoured/,
    /Peer review happens before anyone books a flight/,
    /Travelling patients meet him on camera first/,
  ];
  for (const [slug, patch] of Object.entries(cms.doctorOverrides)) {
    for (const re of banned) {
      assert.equal(re.test(patch.bio), false, `${slug} copied Ginger phrasing`);
    }
    assert.notEqual(patch.bio, ginger.doctors.find((d) => d.slug === slug)?.bio);
  }
});

test("overlays never rewrite pSEO identity keys", () => {
  const locked = new Set<string>(PSEO_LOCKED_KEYS);
  for (const patch of Object.values(cms.doctorOverrides)) {
    const kept = pickDoctorPatch(patch);
    for (const key of Object.keys(kept)) {
      assert.equal(locked.has(key), false, `locked key leaked: ${key}`);
    }
    assert.equal("slug" in kept, false);
    assert.equal("city" in kept, false);
    assert.equal("specialty" in kept, false);
    assert.equal("procedureSlugs" in kept, false);
  }
});

test("Arabic radiation procedure aliases resolve for directory cards", () => {
  assert.equal(taxonomyLabel("Intensity-Modulated Radiation Therapy", "ar").includes("شدة"), true);
  assert.equal(taxonomyLabel("Stereotactic Body Radiation Therapy (SBRT)", "ar").includes("تجسيمي"), true);
  assert.equal(taxonomyLabel("Radiation Oncology", "ar"), "علاج الأورام بالإشعاع");
  assert.equal(taxonomyLabel("Delhi NCR", "ar"), "دلهي إن سي آر");
  assert.equal(taxonomyLabel("India", "ar"), "الهند");
});

test("Arabic overlays keep unique bios per doctor", () => {
  const bios = Object.values(cms.doctorOverrides).map((row) => row.bio);
  assert.equal(new Set(bios).size, bios.length);
});

import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CMS_FILE = join(process.cwd(), "content/ar/catalog-cms.json");
const GENERATORS: { command: string; args: string[] }[] = [
  { command: "node", args: ["scripts/generate-ar-ro-overlays.mjs"] },
  { command: "npx", args: ["tsx", "scripts/generate-ar-surgical-oncology-overlays.ts"] },
  { command: "npx", args: ["tsx", "scripts/generate-ar-medical-oncology-overlays.ts"] },
  {
    command: "npx",
    args: ["tsx", "scripts/generate-ar-cardiac-hematology-neurosurgery-overlays.ts"],
  },
  {
    command: "npx",
    args: ["tsx", "scripts/generate-ar-remaining-specialty-overlays.ts"],
  },
  { command: "npx", args: ["tsx", "scripts/generate-ar-cost-overlays.ts"] },
  { command: "node", args: ["scripts/generate-ar-hospital-overlays.mjs"] },
];

function runGenerators(cmsPath: string) {
  for (const generator of GENERATORS) {
    execFileSync(generator.command, generator.args, {
      cwd: process.cwd(),
      stdio: "pipe",
      env: { ...process.env, CATALOG_CMS_PATH: cmsPath },
    });
  }
}

type Cms = {
  doctorOverrides: Record<string, { status?: string }>;
  hospitalOverrides: Record<string, { status?: string }>;
  treatmentOverrides: Record<string, { status?: string }>;
};

/**
 * These generators rebuild each patch from scratch, so anything they forget to
 * carry over is silently dropped. Losing status would send every reviewed
 * translation back to draft, which means a 404 on live entity pages or
 * removal of reviewed cost pathways, and nothing else in the suite would
 * notice.
 *
 * Work on a temp copy via CATALOG_CMS_PATH so parallel suite members that
 * read content/ar/catalog-cms.json never see a half-rewritten live file.
 */
test("regenerating the Arabic overlays changes nothing when the source has not", () => {
  const directory = mkdtempSync(join(tmpdir(), "gaf-ar-overlay-idempotent-"));
  const isolated = join(directory, "catalog-cms.json");
  try {
    const before = readFileSync(CMS_FILE, "utf8");
    writeFileSync(isolated, before);
    runGenerators(isolated);
    assert.equal(readFileSync(isolated, "utf8"), before, "regeneration is not idempotent");
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("regenerating preserves the review status of every existing record", () => {
  const directory = mkdtempSync(join(tmpdir(), "gaf-ar-overlay-status-"));
  const isolated = join(directory, "catalog-cms.json");
  try {
    const cms = JSON.parse(readFileSync(CMS_FILE, "utf8")) as Cms;
    const doctorSlug = Object.keys(cms.doctorOverrides)[0];
    const hospitalSlug = Object.keys(cms.hospitalOverrides)[0];
    const doctorCount = Object.keys(cms.doctorOverrides).length;
    cms.doctorOverrides[doctorSlug].status = "draft";
    cms.hospitalOverrides[hospitalSlug].status = "reviewed";
    writeFileSync(isolated, `${JSON.stringify(cms, null, 2)}\n`);

    runGenerators(isolated);

    const after = JSON.parse(readFileSync(isolated, "utf8")) as Cms;
    assert.equal(after.doctorOverrides[doctorSlug].status, "draft");
    assert.equal(after.hospitalOverrides[hospitalSlug].status, "reviewed");

    const untouched = Object.entries(after.doctorOverrides).filter(
      ([slug]) => slug !== doctorSlug,
    );
    // Pin to the live catalog size (currently 2400 after dentistry/fertility),
    // not a stale absolute from before those overlays shipped.
    assert.equal(untouched.length, doctorCount - 1);
    assert.equal(Object.keys(after.doctorOverrides).length, doctorCount);
    for (const [slug, patch] of untouched) {
      assert.equal(patch.status, "published", slug);
    }
    for (const [slug, patch] of Object.entries(after.hospitalOverrides)) {
      if (slug === hospitalSlug) continue;
      assert.equal(patch.status, "published", slug);
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("cost regeneration preserves review status without mutating the live catalog", () => {
  const directory = mkdtempSync(join(tmpdir(), "gaf-ar-cost-generator-"));
  const isolated = join(directory, "catalog-cms.json");
  try {
    const cms = JSON.parse(readFileSync(CMS_FILE, "utf8")) as Cms;
    const treatmentSlug = Object.keys(cms.treatmentOverrides)[0];
    cms.treatmentOverrides[treatmentSlug].status = "reviewed";
    writeFileSync(isolated, `${JSON.stringify(cms, null, 2)}\n`);

    execFileSync("npx", ["tsx", "scripts/generate-ar-cost-overlays.ts"], {
      cwd: process.cwd(),
      env: { ...process.env, CATALOG_CMS_PATH: isolated },
      stdio: "pipe",
    });

    const after = JSON.parse(readFileSync(isolated, "utf8")) as Cms;
    assert.equal(after.treatmentOverrides[treatmentSlug].status, "reviewed");
    assert.equal(Object.keys(after.treatmentOverrides).length, 419);
    for (const [slug, patch] of Object.entries(after.treatmentOverrides)) {
      if (slug === treatmentSlug) continue;
      assert.equal(patch.status, "published", slug);
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

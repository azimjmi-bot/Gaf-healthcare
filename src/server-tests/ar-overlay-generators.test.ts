import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CMS_FILE = join(process.cwd(), "content/ar/catalog-cms.json");
const GENERATORS = [
  "scripts/generate-ar-ro-overlays.mjs",
  "scripts/generate-ar-hospital-overlays.mjs",
];

function runGenerators() {
  for (const script of GENERATORS) {
    execFileSync("node", [script], { cwd: process.cwd(), stdio: "pipe" });
  }
}

type Cms = {
  doctorOverrides: Record<string, { status?: string }>;
  hospitalOverrides: Record<string, { status?: string }>;
};

/**
 * These generators rebuild each patch from scratch, so anything they forget to
 * carry over is silently dropped. Losing status would send every reviewed
 * translation back to draft, which means a 404 on 107 live pages, and nothing
 * else in the suite would notice.
 *
 * Both tests restore the file in a finally block, so a failure cannot leave
 * the working tree dirty.
 */
test("regenerating the Arabic overlays changes nothing when the source has not", () => {
  const before = readFileSync(CMS_FILE, "utf8");
  try {
    runGenerators();
    assert.equal(readFileSync(CMS_FILE, "utf8"), before, "regeneration is not idempotent");
  } finally {
    writeFileSync(CMS_FILE, before);
  }
});

test("regenerating preserves the review status of every existing record", () => {
  const before = readFileSync(CMS_FILE, "utf8");
  try {
    const cms = JSON.parse(before) as Cms;
    const doctorSlug = Object.keys(cms.doctorOverrides)[0];
    const hospitalSlug = Object.keys(cms.hospitalOverrides)[0];
    cms.doctorOverrides[doctorSlug].status = "draft";
    cms.hospitalOverrides[hospitalSlug].status = "reviewed";
    writeFileSync(CMS_FILE, `${JSON.stringify(cms, null, 2)}\n`);

    runGenerators();

    const after = JSON.parse(readFileSync(CMS_FILE, "utf8")) as Cms;
    assert.equal(after.doctorOverrides[doctorSlug].status, "draft");
    assert.equal(after.hospitalOverrides[hospitalSlug].status, "reviewed");

    const untouched = Object.entries(after.doctorOverrides).filter(
      ([slug]) => slug !== doctorSlug,
    );
    assert.equal(untouched.length, 69);
    for (const [slug, patch] of untouched) {
      assert.equal(patch.status, "published", slug);
    }
    for (const [slug, patch] of Object.entries(after.hospitalOverrides)) {
      if (slug === hospitalSlug) continue;
      assert.equal(patch.status, "published", slug);
    }
  } finally {
    writeFileSync(CMS_FILE, before);
  }
});

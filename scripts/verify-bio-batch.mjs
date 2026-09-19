#!/usr/bin/env node
// Post-write verification: resolves every doctor through the same merge the site uses,
// with and without the CMS overlay, and asserts that `bio` is the only field that differs.
// Read-only.

import { readFileSync } from "node:fs";

const catalog = JSON.parse(readFileSync("src/data/ginger-catalog.json", "utf8"));
const cms = JSON.parse(readFileSync("content/catalog-cms.json", "utf8"));

// Mirrors PSEO_LOCKED_KEYS in src/lib/cms/catalog-types.ts.
const PSEO_LOCKED_KEYS = [
  "slug", "citySlug", "countrySlug", "specialty", "specialtySlug", "specialtySlugs",
  "procedureSlug", "procedureSlugs", "treatmentSlugs", "hospitalSlug", "hospitalName",
  "city", "country", "specialties", "procedures",
];
// Mirrors DOCTOR_OVERLAY_KEYS in the same file.
const DOCTOR_OVERLAY_KEYS = [
  "bio", "image", "imageAlt", "name", "title", "qualifications", "experience", "languages",
  "specializations", "proceduresExpertise", "education", "affiliations", "memberships",
  "awards", "research",
];

function pickOverlay(patch, allowedKeys) {
  if (!patch) return {};
  const locked = new Set(PSEO_LOCKED_KEYS);
  const out = {};
  for (const key of allowedKeys) {
    if (locked.has(key)) continue;
    if (!Object.prototype.hasOwnProperty.call(patch, key)) continue;
    if (patch[key] === undefined) continue;
    out[key] = patch[key];
  }
  return out;
}

let mismatches = 0;
let changed = 0;
let identical = 0;

for (const seed of catalog.doctors) {
  const base = { ...seed };
  const overlay = pickOverlay(cms.doctorOverrides[seed.slug], DOCTOR_OVERLAY_KEYS);
  const merged = { ...base, ...overlay, slug: base.slug };

  const differing = [];
  for (const key of new Set([...Object.keys(base), ...Object.keys(merged)])) {
    if (JSON.stringify(base[key]) !== JSON.stringify(merged[key])) differing.push(key);
  }

  if (differing.length === 0) {
    identical += 1;
    continue;
  }
  if (differing.length === 1 && differing[0] === "bio") {
    changed += 1;
    continue;
  }
  mismatches += 1;
  console.error(`FAIL ${seed.slug}: fields differing = ${differing.join(", ")}`);
}

console.log(`resolved ${catalog.doctors.length} doctors`);
console.log(`  bio-only changes: ${changed}`);
console.log(`  untouched:        ${identical}`);
console.log(`  unexpected diffs: ${mismatches}`);

const locked = new Set(PSEO_LOCKED_KEYS);
const leaked = Object.entries(cms.doctorOverrides).flatMap(([slug, patch]) =>
  Object.keys(patch).filter((key) => locked.has(key)).map((key) => `${slug}.${key}`),
);
console.log(`  pSEO-locked keys present in overrides: ${leaked.length ? leaked.join(", ") : "NONE"}`);

process.exit(mismatches || leaked.length ? 1 : 0);

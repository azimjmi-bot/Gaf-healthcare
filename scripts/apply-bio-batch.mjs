#!/usr/bin/env node
// Writes approved doctor bios from a review report into content/catalog-cms.json.
// Writes exactly one key per doctor: doctorOverrides["<slug>"].bio. Nothing else.
//
// Usage: node scripts/apply-bio-batch.mjs <report.md> [--dry-run]

import { readFileSync, writeFileSync } from "node:fs";

const [reportPath, ...flags] = process.argv.slice(2);
const dryRun = flags.includes("--dry-run");
if (!reportPath) {
  console.error("usage: node scripts/apply-bio-batch.mjs <report.md> [--dry-run]");
  process.exit(2);
}

const CMS_PATH = "content/catalog-cms.json";
const report = readFileSync(reportPath, "utf8");

const proposals = [];
for (const section of report.split(/^## /m).slice(1)) {
  const slug = section.match(/\*\*Slug:\*\* `([^`]+)`/)?.[1];
  if (!slug) continue;
  const bio = section.split("### Proposed BIO")[1]?.split("\n**Word count:**")[0]?.trim();
  if (!bio || bio.startsWith("NOT GENERATED")) {
    console.log(`skip ${slug} (flagged, no bio proposed)`);
    continue;
  }
  const words = bio.split(/\s+/).filter(Boolean).length;
  if (words < 200 || words > 300) {
    console.error(`abort: ${slug} is ${words} words, outside 200-300`);
    process.exit(1);
  }
  proposals.push({ slug, bio, words });
}

const before = readFileSync(CMS_PATH, "utf8");
const cms = JSON.parse(before);
const untouched = JSON.parse(before);

for (const { slug, bio, words } of proposals) {
  const existing = cms.doctorOverrides[slug];
  if (existing && Object.keys(existing).some((key) => key !== "bio")) {
    console.error(`abort: ${slug} already carries non-bio overrides: ${Object.keys(existing)}`);
    process.exit(1);
  }
  cms.doctorOverrides[slug] = { bio };
  console.log(`${dryRun ? "would set" : "set"} doctorOverrides["${slug}"].bio (${words} words)`);
}

// Guard: every top-level key other than doctorOverrides must be byte-identical.
for (const key of Object.keys(untouched)) {
  if (key === "doctorOverrides") continue;
  if (JSON.stringify(cms[key]) !== JSON.stringify(untouched[key])) {
    console.error(`abort: top-level key "${key}" changed`);
    process.exit(1);
  }
}
// Guard: every override written contains the single key "bio".
for (const [slug, patch] of Object.entries(cms.doctorOverrides)) {
  const keys = Object.keys(patch);
  if (keys.length !== 1 || keys[0] !== "bio") {
    console.error(`abort: ${slug} override has keys ${keys}, expected only "bio"`);
    process.exit(1);
  }
}

if (dryRun) {
  console.log(`\ndry run: ${proposals.length} bios would be written. No file modified.`);
  process.exit(0);
}

writeFileSync(CMS_PATH, `${JSON.stringify(cms, null, 2)}\n`);
console.log(`\nwrote ${proposals.length} bio overrides to ${CMS_PATH}`);

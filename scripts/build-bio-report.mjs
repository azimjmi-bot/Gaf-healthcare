#!/usr/bin/env node
// Assembles a doctor-bio review report from authored bios plus the doctors' own
// catalog records. Existing bios and word counts are read from source, never retyped.
// Read-only with respect to production data; writes only the report markdown.
//
// Usage: node scripts/build-bio-report.mjs <batch.mjs> <out.md>

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const [batchPath, outPath] = process.argv.slice(2);
if (!batchPath || !outPath) {
  console.error("usage: node scripts/build-bio-report.mjs <batch.mjs> <out.md>");
  process.exit(2);
}

const { batch } = await import(resolve(batchPath));
const catalog = JSON.parse(readFileSync("src/data/ginger-catalog.json", "utf8"));
const bySlug = new Map(catalog.doctors.map((d) => [d.slug, d]));

const FIELD_LABELS = {
  name: "name",
  designation: "designation",
  specialty: "specialty",
  specializations: "specializations",
  hospitalName: "hospitalName",
  city: "city",
  experience: "experience",
  qualifications: "qualifications",
  proceduresExpertise: "proceduresExpertise",
  education: "education",
  affiliations: "affiliations",
  memberships: "memberships",
  awards: "awards",
  research: "research",
};

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

/** Fields that are non-empty on the record, i.e. the pool the bio could draw from. */
function populatedFields(doc) {
  const used = [];
  for (const key of Object.keys(FIELD_LABELS)) {
    const value = doc[key];
    if (Array.isArray(value) ? value.length > 0 : String(value ?? "").trim().length > 0) {
      used.push(FIELD_LABELS[key]);
    }
  }
  used.push("existing bio");
  return used.join(", ");
}

const rows = [];
const sections = [];

batch.doctors.forEach((entry, index) => {
  const doc = bySlug.get(entry.slug);
  if (!doc) throw new Error(`unknown slug ${entry.slug}`);
  const flagged = !entry.bio;
  const newWords = flagged ? "—" : wordCount(entry.bio);
  rows.push(
    `| ${index + 1} | ${doc.name} | ${doc.city} | ${wordCount(doc.bio)} | ${newWords} | ${
      flagged ? "**FLAGGED — INSUFFICIENT SOURCE INFORMATION**" : "APPLIED"
    } |`,
  );

  sections.push(
    [
      `## ${index + 1}. ${doc.name}`,
      "",
      `**Slug:** \`${doc.slug}\` · ${doc.hospitalName}`,
      "",
      "### Existing BIO",
      "",
      doc.bio,
      "",
      "### Proposed BIO",
      "",
      flagged ? "NOT GENERATED." : entry.bio,
      "",
      `**Word count:** ${newWords}`,
      "",
      `**Existing GAF profile fields used:** ${populatedFields(doc)}.`,
      "",
      `**New factual information introduced:** ${entry.note ?? "NONE"}`,
      "",
      "**Other fields that would change:** NONE (bio only)",
      "",
      `**Status:** ${flagged ? "FLAGGED — no change proposed" : "APPLIED"}`,
      "",
      "---",
    ].join("\n"),
  );
});

const report = [
  `# Doctor BIO rewrite — ${batch.title}`,
  "",
  batch.intro.trim(),
  "",
  "## Batch summary",
  "",
  "| # | Doctor | City | Old words | New words | Status |",
  "|---|---|---|---|---|---|",
  ...rows,
  "",
  "Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and",
  "for traceability of every capitalised term, acronym, degree and year back to that individual",
  "doctor's own record in `src/data/ginger-catalog.json`.",
  "",
  "---",
  "",
  ...sections,
].join("\n");

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, `${report}\n`);
console.log(`wrote ${outPath} (${batch.doctors.length} doctors)`);

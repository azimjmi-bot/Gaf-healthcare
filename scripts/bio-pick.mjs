#!/usr/bin/env node
// Lists the next doctors to process for a specialty, ordered by how much
// non-procedure substance their own record carries, and dumps their full records.
// Read-only.
//
// Usage: node scripts/bio-pick.mjs "<specialty>" [count] [offset]

import { readFileSync } from "node:fs";

const [specialty, countArg, offsetArg] = process.argv.slice(2);
const count = Number(countArg ?? 12);
const offset = Number(offsetArg ?? 0);

const catalog = JSON.parse(readFileSync("src/data/ginger-catalog.json", "utf8"));
const cms = JSON.parse(readFileSync("content/catalog-cms.json", "utf8"));
const done = new Set(Object.keys(cms.doctorOverrides ?? {}));

// Reviewed and deliberately left unchanged; see docs/doctor-bio-rewrite/flagged.json.
const FLAGGED = new Set(
  Object.keys(JSON.parse(readFileSync("docs/doctor-bio-rewrite/flagged.json", "utf8"))),
);

const SUBSTANCE = ["education", "affiliations", "memberships", "awards", "research"];
const substance = (d) => SUBSTANCE.reduce((n, k) => n + (d[k]?.length ?? 0), 0);

const pool = catalog.doctors
  .filter((d) => d.specialty === specialty && !done.has(d.slug) && !FLAGGED.has(d.slug))
  .filter((d) => substance(d) >= 8)
  .sort((a, b) => substance(b) - substance(a));

console.log(`${specialty}: ${pool.length} remaining, showing ${offset}..${offset + count}`);

// The stored bio is GAF platform boilerplate for these records, so it is only dumped on
// request; the structured fields are what the rewrite draws on.
const FIELDS = [
  "slug", "name", "experience", "qualifications", "designation", "hospitalName", "city",
  "specializations", "proceduresExpertise", "education", "affiliations", "memberships",
  "awards", "research",
  ...(process.argv.includes("--bio") ? ["bio"] : []),
];

for (const d of pool.slice(offset, offset + count)) {
  console.log("=".repeat(88), `| substance = ${substance(d)}`);
  for (const key of FIELDS) {
    const value = d[key];
    if (Array.isArray(value)) {
      if (value.length) {
        console.log(`${key}:`);
        for (const item of value) console.log(`   - ${item}`);
      }
    } else if (String(value ?? "").trim()) {
      console.log(`${key}: ${value}`);
    }
  }
}

import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { MEDICAL_PHRASE_AR } from "@/lib/i18n/medical-phrases";
import { TAXONOMY_AR } from "@/lib/i18n/taxonomy-ar";

const ROOT = process.cwd();
const glossary = JSON.parse(readFileSync(join(ROOT, "i18n/glossary.json"), "utf8")) as {
  counts: { terms: number; unresolved: number };
  unresolved: { en: string; kind: string; candidates: { ar: string }[] }[];
  terms: {
    en: string;
    ar: string;
    category: string;
    sources: string[];
    forms?: Record<string, string>;
    note?: string;
  }[];
};
const doNotTranslate = JSON.parse(readFileSync(join(ROOT, "i18n/do-not-translate.json"), "utf8")) as {
  patterns: { id: string; regex: string }[];
  categories: Record<string, { entries: string[] }>;
};

/**
 * The glossary is a reference, so being out of date is the one thing it cannot
 * be: a translator reading a stale entry has no way to tell. Rebuilding is
 * cheap, and this fails the moment a source table moves without it.
 */
test("the committed glossary matches the tables it is built from", () => {
  execFileSync("npx", ["tsx", "scripts/build-glossary.ts", "--check"], {
    cwd: ROOT,
    stdio: "pipe",
    env: { ...process.env, NODE_OPTIONS: "--conditions react-server" },
  });
});

test("every approved pair in the source tables reaches the glossary", () => {
  // A term kept deliberately in two registers holds its second reading under
  // `forms`, so both count as present.
  const known = new Set(
    glossary.terms.flatMap((term) =>
      [term.ar, ...Object.values(term.forms ?? {})].map((ar) => `${term.en}::${ar}`),
    ),
  );
  const unresolved = new Set(
    glossary.unresolved.flatMap((row) => row.candidates.map((candidate) => candidate.ar)),
  );
  const missing: string[] = [];
  for (const table of [TAXONOMY_AR, MEDICAL_PHRASE_AR]) {
    for (const [en, ar] of Object.entries(table)) {
      // A term the glossary records as unresolved is present, just undecided.
      if (known.has(`${en}::${ar}`) || unresolved.has(ar)) continue;
      missing.push(`${en} -> ${ar}`);
    }
  }
  assert.deepEqual(missing, []);
});

test("nothing is silently resolved: both readings survive a conflict", () => {
  for (const row of glossary.unresolved) {
    assert.ok(row.candidates.length >= 2, `${row.en} is listed as unresolved with one candidate`);
    assert.ok(["meaning", "style"].includes(row.kind), `${row.en} has kind ${row.kind}`);
    const distinct = new Set(row.candidates.map((candidate) => candidate.ar));
    assert.equal(distinct.size, row.candidates.length, `${row.en} lists the same Arabic twice`);
  }
  // A conflicted term must not also appear as though it were settled.
  const settled = new Set(glossary.terms.map((term) => term.en));
  for (const row of glossary.unresolved) {
    if (row.en.startsWith('"')) continue; // A multi-key concept clash, not one key.
    assert.ok(!settled.has(row.en), `${row.en} is both settled and unresolved`);
  }
});

test("every glossary term names a source that exists", () => {
  for (const term of glossary.terms) {
    assert.ok(term.sources.length > 0, `${term.en} has no source`);
    assert.ok(term.ar.trim().length > 0, `${term.en} has no Arabic`);
    assert.ok(/[\u0600-\u06FF]/.test(term.ar), `${term.en} has no Arabic script: ${term.ar}`);
  }
});

test("do-not-translate covers the marks and credentials a patient checks", () => {
  const all = new Set(Object.values(doNotTranslate.categories).flatMap((row) => row.entries));
  for (const required of ["JCI", "NABH", "NABL", "MBBS", "DNB", "GAF Healthcare", "IMRT", "SBRT"]) {
    assert.ok(all.has(required), `${required} is missing from do-not-translate.json`);
  }
  for (const pattern of doNotTranslate.patterns) {
    assert.doesNotThrow(() => new RegExp(pattern.regex), `${pattern.id} is not a valid regex`);
  }
});

/**
 * Doctor names are transliterated rather than left in Latin, so listing one as
 * do-not-translate would contradict the glossary entry that spells it out.
 */
test("a name the glossary transliterates is not also marked do-not-translate", () => {
  const dnt = new Set(Object.values(doNotTranslate.categories).flatMap((row) => row.entries));
  const transliterated = glossary.terms.filter((term) => term.category === "person-name");
  assert.ok(transliterated.length > 0, "the glossary carries transliterated names");
  for (const term of transliterated) {
    assert.ok(!dnt.has(term.en), `${term.en} is both transliterated and do-not-translate`);
  }
});

/**
 * Collects every approved English-to-Arabic pair the codebase already holds
 * into /i18n/glossary.json and /i18n/glossary.md.
 *
 * Nothing here is authored. Each pair is read out of a table a reviewer signed
 * off on, or derived by running the real display code once in English and once
 * in Arabic and lining the two up. Where a term is translated two different
 * ways, the builder records both and marks the entry unresolved rather than
 * choosing; picking silently is how a glossary stops being trustworthy.
 *
 *   npm run glossary:build          rewrite the files
 *   npm run glossary:build -- --check   fail if they are out of date
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { TAXONOMY_AR } from "@/lib/i18n/taxonomy-ar";
import { MEDICAL_PHRASE_AR } from "@/lib/i18n/medical-phrases";
import { BLURB_AR, PEOPLE_AR } from "@/lib/i18n/hospital-copy";
import { SPECIALTY_BLURB, SPECIALTY_PEOPLE } from "@/lib/hospital-profile";
import { CITIES, COUNTRIES, PROCEDURES, SPECIALTIES } from "@/lib/taxonomy";
import {
  AFFILIATION_RULES,
  AIRPORT,
  AWARD_RULES,
  CITY_AR,
  EDUCATION_RULES,
  LANG_CITY,
  NAMES,
  ORG,
  PHRASE,
  ROLE_WORDS,
  TITLE_RULES,
} from "../scripts/ar-overlay-tables.mjs";

const ROOT = process.cwd();
const OUT_DIR = join(ROOT, "i18n");

type Term = {
  en: string;
  ar: string;
  category: string;
  sources: string[];
  note?: string;
  forms?: Record<string, string>;
};

type Conflict = {
  en: string;
  category: string;
  kind: "meaning" | "style";
  candidates: { ar: string; sources: string[] }[];
  question: string;
};

const terms = new Map<string, Term>();
const conflicts: Conflict[] = [];
/** Keys that turned out to have more than one reading, so they stay out of the tables. */
const contested = new Set<string>();

/** Records a pair, or a conflict when the same key already holds other Arabic. */
function record(category: string, en: string, ar: string, source: string, extra?: Partial<Term>) {
  const en_ = en.trim();
  const ar_ = ar.trim();
  if (!en_ || !ar_) return;
  const key = `${category}::${en_}`;
  if (contested.has(key)) {
    const open = conflicts.find((c) => c.en === en_ && c.category === category);
    const candidate = open?.candidates.find((c) => c.ar === ar_);
    if (candidate) candidate.sources.push(source);
    else open?.candidates.push({ ar: ar_, sources: [source] });
    return;
  }
  const existing = terms.get(key);
  if (!existing) {
    terms.set(key, { en: en_, ar: ar_, category, sources: [source], ...extra });
    return;
  }
  if (existing.ar === ar_) {
    if (!existing.sources.includes(source)) existing.sources.push(source);
    return;
  }
  // Once a key has two readings it stops being settled. Leaving it in the
  // tables as well would show a translator one answer while the disagreement
  // sits in a section they may not have read.
  terms.delete(key);
  contested.add(key);
  const hit = conflicts.find((c) => c.en === en_ && c.category === category);
  const target = hit ?? {
    en: en_,
    category,
    kind: "style" as const,
    candidates: [{ ar: existing.ar, sources: [...existing.sources] }],
    question: "",
  };
  const candidate = target.candidates.find((c) => c.ar === ar_);
  if (candidate) candidate.sources.push(source);
  else target.candidates.push({ ar: ar_, sources: [source] });
  if (!hit) conflicts.push(target);
}

// ---------------------------------------------------------------- taxonomy

const COUNTRY_NAMES = new Set(COUNTRIES.map((row) => row.name));
const CITY_NAMES = new Set(CITIES.map((row) => row.name));
const SPECIALTY_NAMES = new Set(SPECIALTIES.map((row) => row.name));
const PROCEDURE_NAMES = new Set(PROCEDURES.map((row) => row.name));

function taxonomyCategory(en: string) {
  if (COUNTRY_NAMES.has(en)) return "country";
  if (CITY_NAMES.has(en)) return "city";
  if (SPECIALTY_NAMES.has(en)) return "specialty";
  if (PROCEDURE_NAMES.has(en)) return "procedure";
  return "clinical-phrase";
}

for (const [en, ar] of Object.entries(TAXONOMY_AR)) {
  record(taxonomyCategory(en), en, ar, "src/lib/i18n/taxonomy-ar.ts");
}

// ------------------------------------------------------- display phrases

const LANGUAGE_NAMES = new Set([
  "English", "Hindi", "Tamil", "Telugu", "Kannada", "Marathi",
  "Urdu", "Bengali", "Punjabi", "Malayalam", "Gujarati", "Marwadi",
]);

for (const [en, ar] of Object.entries(MEDICAL_PHRASE_AR)) {
  const category = LANGUAGE_NAMES.has(en) ? "language" : taxonomyCategory(en);
  record(category, en, ar, "src/lib/i18n/medical-phrases.ts");
}

for (const [en, ar] of Object.entries(PHRASE as Record<string, string>)) {
  record(taxonomyCategory(en), en, ar, "scripts/ar-overlay-tables.mjs");
}

// ------------------------------------------------- organisations, places

for (const [en, ar] of Object.entries(ORG as Record<string, string>)) {
  // The acronym-only rows map a token to itself; that belongs in
  // do-not-translate, not in a glossary of translations.
  if (en === ar) continue;
  record("organisation", en, ar, "scripts/ar-overlay-tables.mjs");
}

for (const [en, ar] of Object.entries(CITY_AR as Record<string, string>)) {
  record("city", en, ar, "scripts/ar-overlay-tables.mjs");
}

for (const [city, ar] of Object.entries(AIRPORT as Record<string, string>)) {
  record("airport", `${city} international airport`, ar, "scripts/ar-overlay-tables.mjs", {
    note: "Used in travel copy; the English side is descriptive, not a catalog key.",
  });
}

for (const [city, ar] of Object.entries(LANG_CITY as Record<string, string>)) {
  record("ward-languages", `Languages spoken on the ward in ${city}`, ar, "scripts/ar-overlay-tables.mjs");
}

// ----------------------------------------------------------- person names

for (const [en, ar] of Object.entries(NAMES as Record<string, string>)) {
  record("person-name", en, ar, "scripts/ar-overlay-tables.mjs", {
    note: "Transliteration, not translation.",
  });
}

// ------------------------------------------------------ ranks and titles

type TitleRule = { en: string; male: string; female: string };
for (const rule of TITLE_RULES as TitleRule[]) {
  record("job-title", rule.en, rule.male, "scripts/ar-overlay-tables.mjs", {
    forms: { masculine: rule.male, feminine: rule.female },
  });
}
for (const role of Object.values(ROLE_WORDS as Record<string, TitleRule>)) {
  record("job-title", role.en, role.male, "scripts/ar-overlay-tables.mjs", {
    forms: { masculine: role.male, feminine: role.female },
  });
}

// ------------------------------------------- credential and award phrases

type Rule = { en: string; ar: string };
for (const rule of EDUCATION_RULES as Rule[]) {
  record("credential-phrase", rule.en, rule.ar, "scripts/ar-overlay-tables.mjs");
}
for (const rule of AWARD_RULES as Rule[]) {
  record("award-phrase", rule.en, rule.ar, "scripts/ar-overlay-tables.mjs");
}
for (const rule of AFFILIATION_RULES as Rule[]) {
  record("credential-phrase", rule.en, rule.ar, "scripts/ar-overlay-tables.mjs");
}

// -------------------------------------------- practitioner nouns, blurbs

for (const [slug, ar] of Object.entries(PEOPLE_AR)) {
  const en = SPECIALTY_PEOPLE[slug];
  if (!en) continue;
  record("practitioner-noun", en.one, ar.one, "src/lib/i18n/hospital-copy.ts", {
    forms: { singular: ar.one, plural: ar.many },
    note: `Plural in English: ${en.many}`,
  });
}

for (const [slug, ar] of Object.entries(BLURB_AR)) {
  const en = SPECIALTY_BLURB[slug];
  if (!en) continue;
  record("specialty-blurb", en, ar, "src/lib/i18n/hospital-copy.ts");
}

// ---------------------------------------------------------- house labels
//
// Derived by running the display code once per locale and pairing by position,
// so the English side is whatever the site actually shows rather than a gloss.

async function houseLabels() {
  const { hospitals } = await import("@/lib/data");
  const {
    featureBarLocalized,
    internationalServicesLocalized,
    whyChooseLocalized,
  } = await import("@/lib/i18n/hospital-copy");

  const eye = hospitals.find((h) => /eye|netralaya|ophthal/i.test(h.name) || /eye/i.test(h.slug));
  const samples = [hospitals[0], eye].filter(Boolean) as typeof hospitals;

  const pair = (en: string, ar: string, category: string) => {
    // Bodies interpolate hospital data; only fixed strings belong in a glossary.
    if (/\d/.test(en) || /\d/.test(ar)) return;
    record(category, en, ar, "src/lib/i18n/hospital-copy.ts");
  };

  for (const hospital of samples) {
    const enWhy = whyChooseLocalized(hospital, 4, "en");
    const arWhy = whyChooseLocalized(hospital, 4, "ar");
    enWhy.forEach((row, i) => arWhy[i] && pair(row.title, arWhy[i].title, "house-label"));

    const enBar = featureBarLocalized(hospital, "en");
    const arBar = featureBarLocalized(hospital, "ar");
    enBar.forEach((row, i) => arBar[i] && pair(row.label, arBar[i].label, "house-label"));
  }

  const enSvc = internationalServicesLocalized("en");
  const arSvc = internationalServicesLocalized("ar");
  enSvc.forEach((row, i) => {
    const other = arSvc[i];
    if (!other) return;
    if (typeof row === "string" && typeof other === "string") pair(row, other, "house-label");
    else if (typeof row === "object" && typeof other === "object") {
      const a = row as Record<string, string>;
      const b = other as Record<string, string>;
      for (const field of ["title", "label", "name"]) {
        if (a[field] && b[field]) pair(a[field], b[field], "house-label");
      }
    }
  });
}

// ------------------------------------------------------ conflict triage
//
// A qualifier in the English key ("(radiation management aspect)") legitimately
// earns different Arabic. A bare key with two readings does not.

/**
 * Two English keys can name one thing — "Image-Guided Radiotherapy (IGRT)" and
 * "Image-Guided Radiation Therapy (IGRT)" are the same procedure spelled two
 * ways, and both are in the catalog. Where those disagree in Arabic the reader
 * sees one procedure under two names, which the per-key check above cannot see
 * because the keys differ.
 *
 * Only spelling variants are collapsed. A descriptive qualifier such as
 * "(supportive role in multidisciplinary cancer care)" genuinely narrows the
 * term and is left alone.
 */
function sameConceptDivergence() {
  const concept = (en: string) =>
    en
      // Acronyms go before the lowercasing that would make them
      // indistinguishable from a descriptive parenthetical.
      .replace(/\s*\([A-Z0-9-]{2,}\)/g, " ")
      .toLowerCase()
      .replace(/radiation therapy|radiotherapy/g, "radiotherapy")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

  const groups = new Map<string, Term[]>();
  for (const term of terms.values()) {
    // Procedures and clinical phrases share a namespace: the same treatment is
    // a catalog procedure under one spelling and a display phrase under another.
    if (term.category !== "procedure" && term.category !== "clinical-phrase") continue;
    const key = concept(term.en);
    groups.set(key, [...(groups.get(key) ?? []), term]);
  }

  for (const [key, rows] of groups) {
    if (rows.length < 2) continue;
    if (new Set(rows.map((row) => row.ar)).size < 2) continue;
    const category = rows[0].category;
    const byArabic = new Map<string, string[]>();
    for (const row of rows) {
      byArabic.set(row.ar, [...(byArabic.get(row.ar) ?? []), ...row.sources]);
    }
    const stripAcronym = (value: string) => value.replace(/\s*\([A-Z0-9-]+\)\s*$/, "").trim();
    const style = new Set([...byArabic.keys()].map(stripAcronym)).size === 1;
    conflicts.push({
      en: rows.map((row) => `"${row.en}"`).join(" / "),
      category,
      kind: style ? "style" : "meaning",
      candidates: [...byArabic].map(([ar, sources]) => ({ ar, sources })),
      question: style
        ? "One spelling of this procedure keeps the Latin acronym in the Arabic and the other drops it. Which house style do you want?"
        : "These English keys name the same procedure but read differently in Arabic. Which is correct, and should the duplicate English key be retired?",
    });
  }
}

/**
 * Divergences that have been looked at and kept.
 *
 * Two readings of one English term is usually a mistake, but not always: a
 * filter chip and a doctor's profile are different registers, and forcing them
 * to share a string makes one of them read badly. An entry here moves the term
 * out of the unresolved pile and into the glossary carrying both readings, so
 * the next reader sees a decision rather than an open question.
 *
 * The accepted readings are listed in full. If the Arabic on either side
 * changes, the acceptance stops applying and the term goes back to unresolved,
 * because what was approved is no longer what is there.
 */
const ACCEPTED_DIVERGENCE: {
  en: string;
  why: string;
  forms: Record<string, string>;
}[] = [
  {
    en: "Lung Cancer Surgery",
    why:
      "Deliberate. The facet and filter register names the operation; the profile register says what " +
      "the radiation oncologist actually does with it. Do not collapse these into one string.",
    forms: {
      "taxonomyLabel() — facets, filters, breadcrumbs": "جراحة سرطان الرئة",
      "medicalPhrase() — doctor profiles": "جراحة سرطان الرئة — التنسيق الإشعاعي",
    },
  },
];

/** Moves reviewed divergences into the glossary as settled multi-form terms. */
function acceptReviewedDivergence() {
  for (const accepted of ACCEPTED_DIVERGENCE) {
    const index = conflicts.findIndex((c) => c.en === accepted.en);
    if (index === -1) continue;
    const conflict = conflicts[index];
    const found = new Set(conflict.candidates.map((c) => c.ar));
    const approved = new Set(Object.values(accepted.forms));
    if (found.size !== approved.size || [...found].some((ar) => !approved.has(ar))) continue;
    conflicts.splice(index, 1);
    terms.set(`${conflict.category}::${conflict.en}`, {
      en: conflict.en,
      ar: Object.values(accepted.forms)[0],
      category: conflict.category,
      sources: conflict.candidates.flatMap((c) => c.sources),
      note: accepted.why,
      forms: accepted.forms,
    });
  }
}

function triage() {
  for (const conflict of conflicts) {
    if (conflict.question) continue;
    const arabics = conflict.candidates.map((c) => c.ar);
    const [shortest, longest] = [...arabics].sort((a, b) => a.length - b.length).slice(0, 1)
      .concat([...arabics].sort((a, b) => b.length - a.length)[0]);
    // Same wording, one side carrying a parenthesised Latin acronym.
    const stripAcronym = (value: string) => value.replace(/\s*\([A-Z0-9-]+\)\s*$/, "").trim();
    if (new Set(arabics.map(stripAcronym)).size === 1) {
      conflict.kind = "style";
      conflict.question =
        "Same wording; the versions disagree on whether the Latin acronym is kept in the Arabic. Which house style do you want?";
      continue;
    }
    conflict.kind = "meaning";
    conflict.question =
      longest && shortest && longest.startsWith(shortest)
        ? "One version adds a qualifier the English key does not carry. Should the qualifier stay, and if so should it be in the English key too?"
        : "The two versions do not say the same thing. Which is correct for this term?";
  }
}

// ---------------------------------------------------------------- output

function buildJson() {
  const ordered = [...terms.values()].sort(
    (a, b) => a.category.localeCompare(b.category) || a.en.localeCompare(b.en),
  );
  const byCategory: Record<string, number> = {};
  for (const term of ordered) byCategory[term.category] = (byCategory[term.category] ?? 0) + 1;

  return {
    sourceLocale: "en",
    locale: "ar",
    about:
      "Approved English-to-Arabic terminology, consolidated from the tables the site already ships. " +
      "Rebuild with `npm run glossary:build`. Terms are not authored here: change the source table and rebuild.",
    counts: { terms: ordered.length, categories: byCategory, unresolved: conflicts.length },
    unresolved: conflicts
      .slice()
      .sort((a, b) => a.en.localeCompare(b.en))
      .map((c) => ({
        en: c.en,
        category: c.category,
        kind: c.kind,
        question: c.question,
        candidates: c.candidates.map((candidate) => ({
          ar: candidate.ar,
          sources: [...new Set(candidate.sources)].sort(),
        })),
      })),
    terms: ordered.map((term) => ({
      en: term.en,
      ar: term.ar,
      category: term.category,
      ...(term.forms ? { forms: term.forms } : {}),
      ...(term.note ? { note: term.note } : {}),
      sources: [...new Set(term.sources)].sort(),
    })),
  };
}

const CATEGORY_TITLES: Record<string, string> = {
  airport: "Airports",
  "award-phrase": "Awards and honours",
  city: "Cities",
  "clinical-phrase": "Clinical phrases",
  country: "Countries",
  "credential-phrase": "Qualifications and training",
  "house-label": "House labels",
  "job-title": "Ranks and job titles",
  language: "Languages",
  organisation: "Professional bodies",
  "person-name": "Doctor names",
  "practitioner-noun": "What to call a practitioner",
  procedure: "Procedures",
  specialty: "Specialties",
  "specialty-blurb": "Specialty blurbs",
  "ward-languages": "Languages on the ward",
};

function buildMarkdown(data: ReturnType<typeof buildJson>) {
  const lines: string[] = [];
  lines.push("# Arabic glossary");
  lines.push("");
  lines.push(
    "Every English term this site already has an approved Arabic rendering for, in one place. " +
      "Use it when writing new Arabic copy so the same thing is called the same thing on every page.",
  );
  lines.push("");
  lines.push(
    "This file is generated from the tables the site ships (`npm run glossary:build`). " +
      "Editing it changes nothing on its own — change the source table listed against the term and rebuild. " +
      "Terms you need that are not here belong in [glossary_gaps.md](./glossary_gaps.md).",
  );
  lines.push("");
  lines.push(`**${data.counts.terms} terms.** ${data.counts.unresolved} need a decision before use.`);
  lines.push("");

  if (data.unresolved.length) {
    lines.push("## Unresolved");
    lines.push("");
    lines.push(
      "These English terms are translated more than one way in the codebase today. " +
        "Nothing has been picked for you: both readings are live, and choosing wrongly would change what a page says.",
    );
    lines.push("");
    for (const row of data.unresolved) {
      lines.push(`### ${row.en}`);
      lines.push("");
      lines.push(`*${row.kind === "meaning" ? "The two differ in meaning" : "A style difference"} — ${row.question}*`);
      lines.push("");
      lines.push("| Arabic | Used by |");
      lines.push("| --- | --- |");
      for (const candidate of row.candidates) {
        lines.push(`| ${candidate.ar} | ${candidate.sources.map((s) => `\`${s}\``).join(", ")} |`);
      }
      lines.push("");
    }
  }

  const grouped = new Map<string, typeof data.terms>();
  for (const term of data.terms) {
    grouped.set(term.category, [...(grouped.get(term.category) ?? []), term]);
  }
  for (const [category, rows] of [...grouped].sort((a, b) =>
    (CATEGORY_TITLES[a[0]] ?? a[0]).localeCompare(CATEGORY_TITLES[b[0]] ?? b[0]),
  )) {
    lines.push(`## ${CATEGORY_TITLES[category] ?? category} (${rows.length})`);
    lines.push("");
    const hasForms = rows.some((row) => row.forms);
    lines.push(hasForms ? "| English | Arabic | Other forms |" : "| English | Arabic |");
    lines.push(hasForms ? "| --- | --- | --- |" : "| --- | --- |");
    for (const row of rows) {
      const en = row.en.replace(/\|/g, "\\|");
      const ar = row.ar.replace(/\|/g, "\\|");
      if (hasForms) {
        const forms = row.forms
          ? Object.entries(row.forms)
              .map(([name, value]) => `${name}: ${value}`)
              .join("<br>")
          : "";
        lines.push(`| ${en} | ${ar} | ${forms} |`);
      } else {
        lines.push(`| ${en} | ${ar} |`);
      }
    }
    lines.push("");
  }
  return `${lines.join("\n").trimEnd()}\n`;
}

/**
 * What must survive translation untouched.
 *
 * The starting point is the vocabulary check:latin-leakage already forgives,
 * because that list is the site's working answer to "which Latin words on an
 * Arabic page are correct?". It is derived from the catalog rather than kept by
 * hand, so this reads the same data rather than copying a snapshot of it.
 *
 * Doctor names are deliberately absent. They are not left in Latin, they are
 * transliterated, and the approved spellings are in the glossary.
 */
async function buildDoNotTranslate() {
  const { doctors, hospitals } = await import("@/lib/data");

  const credentials = new Set<string>();
  for (const doctor of doctors) {
    for (const token of String(doctor.qualifications ?? "").split(/[^A-Za-z0-9.()&-]+/)) {
      const clean = token.replace(/[.()]+$/, "").trim();
      if (!/^[A-Z0-9.&-]{2,}$/.test(clean)) continue;
      // Two letters minimum, so a graduation year or a bed count does not
      // become a credential. Dotted forms like M.B.B.S. are kept: a patient
      // checking a degree may well see it written that way.
      if ((clean.match(/[A-Z]/g) ?? []).length < 2) continue;
      credentials.add(clean);
    }
  }

  const accreditations = new Set<string>();
  for (const hospital of hospitals) {
    for (const part of String(hospital.accreditation ?? "").split(/[·,]/)) {
      const clean = part.trim();
      if (clean) accreditations.add(clean);
    }
  }

  const procedureAcronyms = new Set<string>();
  for (const procedure of PROCEDURES) {
    const match = procedure.name.match(/\(([A-Z0-9][A-Za-z0-9 /-]*)\)/);
    if (match && /^[A-Z0-9-]+$/.test(match[1])) procedureAcronyms.add(match[1]);
  }

  const bodies = new Set<string>();
  for (const [en, ar] of Object.entries(ORG as Record<string, string>)) {
    if (en === ar) bodies.add(en);
    // "…(ASTRO)" keeps its acronym inside the Arabic, so the acronym travels.
    for (const inner of ar.match(/\(([A-Z]{2,})\)/g) ?? []) bodies.add(inner.slice(1, -1));
  }

  const sorted = (values: Iterable<string>) => [...new Set(values)].sort((a, b) => a.localeCompare(b));

  return {
    about:
      "Strings that must appear unchanged in Arabic copy. Rebuild with `npm run glossary:build`. " +
      "Doctor names are not here: they are transliterated, and the approved spellings are in glossary.json.",
    patterns: [
      { id: "url", regex: "https?://\\S+", note: "Links are addresses, not prose. Never localise a path or a domain." },
      { id: "email", regex: "[\\w.%+-]+@[\\w.-]+\\.[A-Za-z]{2,}", note: "Mailbox names are literal." },
      {
        id: "phone",
        regex: "\\+\\d[\\d\\s()-]{7,}\\d",
        note: "Keep the digits Western and the country code intact so the number stays diallable.",
      },
      { id: "slug", regex: "/[a-z0-9-]+(/[a-z0-9-]+)*", note: "URL slugs stay Latin in both languages." },
    ],
    categories: {
      brand: {
        note: "The company name, in any position, including inside Arabic sentences.",
        source: "scripts/check-latin-leakage.ts",
        entries: ["GAF Healthcare", "GAF", "Pvt", "Ltd", "Inc"],
      },
      contact: {
        note: "Reachable addresses. Changing a character makes them wrong, not translated.",
        source: "src/components, src/lib",
        entries: ["care@gaf.healthcare", "gaf.healthcare", "+91 90443 46292"],
      },
      accreditation: {
        note: "Accreditation marks are the awarding body's name and are recognised in Latin.",
        source: "hospital.accreditation in src/data/ginger-catalog.json",
        entries: sorted(accreditations),
      },
      credentials: {
        note:
          "Medical degrees, diplomas and fellowships as they appear in doctor qualification fields. " +
          "A patient checking a credential is looking for these letters.",
        source: "doctor.qualifications in src/data/ginger-catalog.json",
        entries: sorted(credentials),
      },
      procedureAcronyms: {
        note:
          "Procedure acronyms. The Arabic name may carry the acronym in brackets; whether it does is a " +
          "house-style question recorded in glossary.json, but the letters themselves never change.",
        source: "src/lib/taxonomy.ts",
        entries: sorted(procedureAcronyms),
      },
      professionalBodies: {
        note: "Societies and associations that are cited by acronym in memberships.",
        source: "scripts/ar-overlay-tables.mjs",
        entries: sorted(bodies),
      },
      hospitals: {
        note: "Partner campus names. A patient shows this name at a reception desk.",
        source: "hospital.name in src/data/ginger-catalog.json",
        entries: sorted(hospitals.map((hospital) => hospital.name)),
      },
      platforms: {
        note: "Third-party products whose names are the same everywhere.",
        source: "scripts/check-latin-leakage.ts",
        entries: ["Google", "YouTube", "WhatsApp", "Maps"],
      },
      currencies: {
        note: "Currency codes. Prices are quoted in Western digits alongside them.",
        source: "scripts/check-latin-leakage.ts",
        entries: ["AED", "EUR", "INR", "SAR", "USD"],
      },
      languageNames: {
        note:
          "A language switcher names each language in that language, so the English option reading " +
          '"English" on an Arabic page is correct rather than a leak.',
        source: "scripts/check-latin-leakage.ts",
        entries: ["English"],
      },
    },
  };
}

async function main() {
  await houseLabels();
  sameConceptDivergence();
  acceptReviewedDivergence();
  triage();
  const data = buildJson();
  const json = `${JSON.stringify(data, null, 2)}\n`;
  const markdown = buildMarkdown(data);

  const doNotTranslate = await buildDoNotTranslate();
  const files: [string, string][] = [
    [join(OUT_DIR, "glossary.json"), json],
    [join(OUT_DIR, "glossary.md"), markdown],
    [join(OUT_DIR, "do-not-translate.json"), `${JSON.stringify(doNotTranslate, null, 2)}\n`],
  ];

  if (process.argv.includes("--check")) {
    let stale = false;
    for (const [path, want] of files) {
      const got = existsSync(path) ? readFileSync(path, "utf8") : "";
      if (got !== want) {
        console.error(`  stale: ${path.replace(`${ROOT}/`, "")}`);
        stale = true;
      }
    }
    if (stale) {
      console.error("\nA source table changed without the glossary being rebuilt. Run: npm run glossary:build");
      process.exit(1);
    }
    console.log(`Glossary is current: ${data.counts.terms} terms, ${data.counts.unresolved} unresolved.`);
    return;
  }

  mkdirSync(OUT_DIR, { recursive: true });
  for (const [path, contents] of files) writeFileSync(path, contents);
  console.log(`Wrote ${data.counts.terms} terms across ${Object.keys(data.counts.categories).length} categories.`);
  for (const [category, n] of Object.entries(data.counts.categories).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(4)}  ${category}`);
  }
  const dntTotal = Object.values(doNotTranslate.categories).reduce((n, c) => n + c.entries.length, 0);
  console.log(`\nDo-not-translate: ${dntTotal} entries across ${Object.keys(doNotTranslate.categories).length} categories, plus ${doNotTranslate.patterns.length} patterns.`);
  console.log(`\nUnresolved: ${data.counts.unresolved}`);
  for (const row of data.unresolved) console.log(`  [${row.kind}] ${row.en}`);
}

void main();

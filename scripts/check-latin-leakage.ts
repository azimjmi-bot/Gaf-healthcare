/**
 * How much Latin text an Arabic page actually serves.
 *
 * "Never serve English on an /ar/ URL" is the rule, but it cannot be enforced
 * as "no Latin characters": a hospital is called Apollo, a doctor is called
 * Kushal Narang, and IMRT is IMRT in every language. Transliterating those
 * would make the page worse. What matters is the residue after the names are
 * accounted for — an untranslated button, a stray label, a template that
 * reached for the English catalog.
 *
 * So every Latin word is classified against vocabulary drawn from the catalog
 * itself rather than from a list somebody maintains by hand, and what survives
 * that is reported per page as a leak.
 *
 *   BASE_URL=http://127.0.0.1:43117 npm run check:latin-leakage
 *
 * Only published Arabic pages are measured. A noindex page is not something a
 * reader or a crawler is being offered, so its English is a Phase 3 problem,
 * not a live one.
 */
import { doctors, hospitals } from "@/lib/data";
import { treatments } from "@/lib/treatments";
import { CITIES, COUNTRIES, PROCEDURES, SPECIALTIES } from "@/lib/taxonomy";
import { localePathIsPublished } from "@/lib/i18n/locale-publication";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

// --base wins so a one-off run can point somewhere else, but BASE_URL is what
// the other QA scripts read and what qa:i18n sets for all of them at once.
const BASE =
  process.argv[process.argv.indexOf("--base") + 1]?.startsWith("http")
    ? process.argv[process.argv.indexOf("--base") + 1]
    : (process.env.BASE_URL ?? "http://127.0.0.1:43127");

/**
 * A ratchet, not a target.
 *
 * Zero is where this has to end up, but the residue today is real untranslated
 * content — degree strings like "MBBS, DNB, FRCR" and fellowship lines on the
 * doctor profiles — and it will come down as those fields get translated, not
 * as a side effect of anything else. Failing on any leak at all would mean the
 * check is red on every run and therefore tells nobody anything. Failing when
 * the number rises catches the thing that actually matters: a page that was
 * Arabic yesterday serving English today, or a newly published page bringing
 * English with it.
 *
 * Lower it whenever the run reports headroom. It was last raised from 4,675
 * when the Phase 3 gates published 113 facet pages: the doctor facets bring
 * 938 words and the hospital facets 44, and every one of those is a degree
 * string or a hospital name already leaking on the profile pages. The facet
 * templates themselves introduced no English.
 */
const LEAKAGE_BUDGET = 5657;

/**
 * English words that can never be a name, whatever the catalog says.
 *
 * Without this, "Fellowship in Brachytherapy" sitting untranslated in a
 * qualifications field would teach the vocabulary that "in" is a proper noun,
 * and the metric would then quietly forgive every English preposition on the
 * site. A stoplist keeps the vocabulary to the thing it is for: names.
 */
const NEVER_A_NAME = new Set(
  `a an the and or but if of in on at to for with from by as is are was were be been
   has have had this that these those it its not no when where which who whom whose
   will would can could may might should all both each more most other some such than
   too very we you your our their his her they them he she`.split(/\s+/),
);

/**
 * Words that are names rather than prose: they read the same in Arabic and
 * carry no translation obligation. Everything here is derived from the data so
 * that a new hospital does not silently become a leak.
 */
function knownVocabulary() {
  const words = new Set<string>();
  const remember = (word: string) => {
    const lower = word.toLowerCase();
    if (word.length > 1 && !NEVER_A_NAME.has(lower)) words.add(lower);
  };
  const add = (value: string | undefined) => {
    for (const word of (value ?? "").split(/[^A-Za-z0-9'’&/-]+/)) {
      remember(word);
      // A page reading "TAVR/TAVI" is two words to the scanner below but one
      // catalog token here, so the halves have to be known by themselves or a
      // name would be reported as a leak on the strength of its slash.
      if (word.includes("/")) for (const half of word.split("/")) remember(half);
    }
  };

  for (const h of hospitals) {
    add(h.name);
    add(h.city);
    add(h.country);
    add(h.accreditation);
  }
  for (const d of doctors) {
    add(d.name);
    add(d.hospitalName);
    add(d.title);
    add(d.city);
    add(d.specialty);
    for (const p of d.procedures ?? []) add(p);
  }
  for (const t of treatments) add(t.name);
  for (const row of [...CITIES, ...COUNTRIES, ...SPECIALTIES, ...PROCEDURES]) add(row.name);

  // The brand, the platforms it links to, the units a price is quoted in, and
  // the contact details, which are addresses rather than prose.
  for (const fixed of [
    "GAF Healthcare Pvt Ltd Inc",
    "Google YouTube WhatsApp Maps",
    "USD INR EUR SAR AED",
    "care gaf healthcare com",
    // A language switcher names each language in that language, so the English
    // option reading "English" on an Arabic page is the correct behaviour.
    "English",
  ]) {
    add(fixed);
  }
  return words;
}

/** Visible prose only: no scripts (JSON-LD included), styles or markup. */
function visibleText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;|&#\d+;/gi, " ");
}

type PageReport = {
  path: string;
  arabicWords: number;
  latinWords: number;
  leaks: Map<string, number>;
};

function analyse(path: string, html: string, known: Set<string>): PageReport {
  const text = visibleText(html);
  const arabicWords = (text.match(/[\u0600-\u06FF]+/g) ?? []).length;
  const latin = text.match(/\b[A-Za-z][A-Za-z'’-]*\b/g) ?? [];
  const leaks = new Map<string, number>();
  for (const word of latin) {
    if (word.length < 2) continue;
    if (known.has(word.toLowerCase())) continue;
    leaks.set(word, (leaks.get(word) ?? 0) + 1);
  }
  return { path, arabicWords, latinWords: latin.length, leaks };
}

/**
 * Every Arabic page the site currently offers to a crawler.
 *
 * Read off sitemap-ar.xml rather than reassembled here. This list used to be
 * hand-written and it silently stopped being complete the moment a new page
 * type was published: opening the doctor facet gate added 57 pages that the
 * scan simply did not know about. The sitemap is the site's own answer to the
 * same question, so taking it from there cannot drift again.
 */
function publishedArabicPaths() {
  return buildLocaleSitemap("ar")
    .map((row) => decodeURIComponent(new URL(row.url).pathname).replace(/^\/ar/, "") || "/")
    .filter((path) => localePathIsPublished("ar", path));
}

async function main() {
  const known = knownVocabulary();
  const paths = publishedArabicPaths();
  const reports: PageReport[] = [];

  for (const path of paths) {
    const res = await fetch(`${BASE}/ar${path === "/" ? "" : path}`);
    if (!res.ok) {
      console.error(`  ! ${path} returned ${res.status}`);
      continue;
    }
    reports.push(analyse(path, await res.text(), known));
  }

  const totals = reports.reduce(
    (acc, r) => ({
      arabic: acc.arabic + r.arabicWords,
      latin: acc.latin + r.latinWords,
      leaks: acc.leaks + [...r.leaks.values()].reduce((a, b) => a + b, 0),
    }),
    { arabic: 0, latin: 0, leaks: 0 },
  );

  const withLeaks = reports.filter((r) => r.leaks.size > 0);
  const vocabulary = new Map<string, number>();
  for (const r of withLeaks) {
    for (const [word, n] of r.leaks) vocabulary.set(word, (vocabulary.get(word) ?? 0) + n);
  }

  const pageType = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 0) return "home";
    if (segments.length === 1) return `${segments[0]} index`;
    if (segments[0] === "hospitals" && segments[2] === "doctors") return "hospital faculty";
    // A facet is addressed by taxonomy terms rather than by a slug, and the
    // first of those is always the destination country.
    if (segments[1] === "India") return `${segments[0]} facet`;
    return `${segments[0]} profile`;
  };

  console.log(`Published Arabic pages measured: ${reports.length}`);
  console.log(`Arabic words:                    ${totals.arabic}`);
  console.log(`Latin words (all):               ${totals.latin}`);
  console.log(`Latin words outside vocabulary:  ${totals.leaks}`);
  console.log(`Pages carrying a leak:           ${withLeaks.length} of ${reports.length}`);

  const byType = new Map<string, { pages: number; leaks: number }>();
  for (const r of reports) {
    const key = pageType(r.path);
    const row = byType.get(key) ?? { pages: 0, leaks: 0 };
    row.pages += 1;
    row.leaks += [...r.leaks.values()].reduce((a, b) => a + b, 0);
    byType.set(key, row);
  }
  console.log("\nBy page type:");
  for (const [type, row] of [...byType].sort((a, b) => b[1].leaks - a[1].leaks)) {
    const perPage = (row.leaks / row.pages).toFixed(1);
    console.log(
      `  ${String(row.leaks).padStart(5)}  across ${String(row.pages).padStart(3)} ${type.padEnd(18)} (${perPage} per page)`,
    );
  }

  if (vocabulary.size) {
    console.log(`\nLeaked words by frequency (${vocabulary.size} distinct):`);
    for (const [word, n] of [...vocabulary].sort((a, b) => b[1] - a[1])) {
      console.log(`  ${String(n).padStart(5)}  ${word}`);
    }
    // Worst pages per type rather than overall: the doctor profiles leak an
    // order of magnitude more than anything else, so a single ranked list is
    // just the profiles and hides whatever the other page types are doing.
    const total = (r: PageReport) => [...r.leaks.values()].reduce((a, b) => a + b, 0);
    console.log("\nWorst pages, by type:");
    for (const [type] of [...byType].sort((a, b) => b[1].leaks - a[1].leaks)) {
      const worst = withLeaks
        .filter((r) => pageType(r.path) === type)
        .sort((a, b) => total(b) - total(a))
        .slice(0, 5);
      if (worst.length === 0) continue;
      console.log(`  ${type}`);
      for (const r of worst) {
        console.log(
          `    ${String(total(r)).padStart(4)}  /ar${r.path}   ${[...r.leaks.keys()].slice(0, 8).join(", ")}`,
        );
      }
    }
  }

  if (totals.leaks > LEAKAGE_BUDGET) {
    console.error(
      `\nFAIL: ${totals.leaks} leaked words, ${totals.leaks - LEAKAGE_BUDGET} over the budget of ${LEAKAGE_BUDGET}.` +
        "\nSomething newly published is serving English, or something translated stopped being translated.",
    );
    process.exit(1);
  }
  if (totals.leaks < LEAKAGE_BUDGET) {
    console.log(
      `\nUnder budget by ${LEAKAGE_BUDGET - totals.leaks}. Lower LEAKAGE_BUDGET to ${totals.leaks} to hold the ground.`,
    );
  }
  process.exit(0);
}

void main();

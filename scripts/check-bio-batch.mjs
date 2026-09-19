#!/usr/bin/env node
// Validates a proposed doctor-bio batch against each doctor's own catalog record.
// Read-only: never writes to content/ or src/data/.
//
// Usage: node scripts/check-bio-batch.mjs docs/doctor-bio-rewrite/batch-01-radiation-oncology.md

import { readFileSync } from "node:fs";

const reportPath = process.argv[2];
if (!reportPath) {
  console.error("usage: node scripts/check-bio-batch.mjs <report.md>");
  process.exit(2);
}

const catalog = JSON.parse(readFileSync("src/data/ginger-catalog.json", "utf8"));
const bySlug = new Map(catalog.doctors.map((d) => [d.slug, d]));
const report = readFileSync(reportPath, "utf8");

const MIN_WORDS = 200;
const MAX_WORDS = 300;

/** Words shared across medical English that carry no doctor-specific fact. */
const COMMON = new Set(
  `a an and the of in at on for with to from as is are was were he she his her him they their
   dr doctor his profile records recorded listed lists also alongside together both where which
   that this those these than then more most than over under between across within into out
   before after now still one two three several many few each other another same distinct
   separate further part strand thread side range scope focus practice work works working
   clinical technical academic professional experience years year specialty specialities
   specializations member memberships membership society societies association associations
   committee council board editorial faculty speaker panelist president secretary joint
   national international india indian united states kingdom cancer cancers tumour tumours
   tumor tumors oncology oncologist oncologists radiation radiotherapy radiosurgery therapy
   treatment treatments technique techniques modality modalities beam external internal source
   target targets site sites disease diseases patient patients family families care team teams
   hospital hospitals hospitalname institute institutes centre center college university
   medical medicine surgery surgical head neck breast lung prostate brain skin bone soft tissue
   gastrointestinal hepatobiliary thoracic gynaecological gynecological genitourinary
   musculoskeletal paediatric pediatric geriatric palliative adult adults child children
   metastases metastatic advanced locally solid conditioning adjuvant chemotherapy immunotherapy
   drug given primary recurrence chance reduce setting rather single course sessions compressed
   safely moves how what when why who whom whose it its there here about above below during
   through throughout including include includes included such not no nor but or if so because
   since while until upon against along among around behind beyond despite except inside
   outside per plus toward towards via without have has had having do does did done be been
   being can could may might must shall should will would went goes going come comes came
   completed complete completes took take takes taken made make makes making held hold holds
   holding served serve serves serving sits sit sat published publish publishes publishing
   presented present presents presenting received receive receives receiving awarded award
   awards recognition recognitions honour honours honor honors trained train trains training
   studied study studies studying earned earn earns worked associated association covers cover
   covered covering spans span spanned spanning runs run ran running forms form formed forming
   places place placed placing directs direct directed delivering delivered deliver delivers
   uses use used using address addresses addressed addressing matters matter shapes shape
   deal deals dealing consistent places placement sealed directly compact defined sharply
   smaller small large larger established highly conventional conformal focused guided
   image intensity modulated stereotactic body total irradiation precision proton beam
   brachytherapy intracavitary interstitial intraoperative plaque functional adaptive gated
   hypofractionation hypofractionated chemoradiation chemoradiotherapy outcomes outcome
   comparisons comparison versus alone concurrent postoperative irradiated carcinoma
   dissertation thesis poster oral paper papers publication publications peer reviewed journal
   journals conference conferences congress meeting meetings masterclass symposia symposium
   forum forums chapter chapters zone north south east west sector fellowship fellowships
   scholarship grant grants travel fellow diploma degree degrees qualification qualifications
   postgraduate graduate honours gold medal certification certified certifications credentials
   consultant consultants senior principal director head department consults consulting
   investigator investigators phase study studies trial trials multi institutional
   role roles interests interest areas area first second third best top rising star stars
   day week month time times number numbers new old current previous previously earlier later
   recently mechanically extends extend extended extension beyond well much less least
   he's she's does not much matter its english hindi kannada tamil telugu marathi
   families travelling travel outside sizeable substantial amount office
   sparse thin flagged review manual recommendation status ready word words count counts
   technically internationally clinically academically day-to-day beyond alongside`
    .split(/\s+/)
    .filter(Boolean),
);

function sourceText(doc) {
  const parts = [];
  for (const value of Object.values(doc)) {
    if (Array.isArray(value)) parts.push(value.join(" "));
    else parts.push(String(value));
  }
  return parts.join(" ").toLowerCase();
}

/** Terms that must be traceable: proper nouns, acronyms, degrees, years. */
function claimTerms(bio) {
  const terms = new Set();
  for (const match of bio.matchAll(/\b[A-Z][A-Za-z.'&-]{1,}\b/g)) terms.add(match[0]);
  for (const match of bio.matchAll(/\b[A-Z]{2,}\b/g)) terms.add(match[0]);
  for (const match of bio.matchAll(/\b(19|20)\d{2}\b/g)) terms.add(match[0]);
  return [...terms];
}

function normalize(term) {
  return term.replace(/[.'&-]/g, "").toLowerCase();
}

const sections = report.split(/^## /m).slice(1);
let failures = 0;
let checked = 0;
let flagged = 0;

for (const section of sections) {
  const slugMatch = section.match(/\*\*Slug:\*\* `([^`]+)`/);
  if (!slugMatch) continue;
  const slug = slugMatch[1];
  const doc = bySlug.get(slug);
  if (!doc) {
    console.error(`FAIL ${slug}: not found in ginger-catalog.json`);
    failures += 1;
    continue;
  }

  const proposed = section.split("### Proposed BIO")[1]?.split("\n**Word count:**")[0]?.trim();
  if (!proposed || proposed.startsWith("NOT GENERATED")) {
    console.log(`FLAG ${slug}: no bio proposed (insufficient source information)`);
    flagged += 1;
    continue;
  }

  checked += 1;
  const words = proposed.split(/\s+/).filter(Boolean).length;
  const claimed = Number(section.match(/\*\*Word count:\*\* (\d+)/)?.[1] ?? 0);
  const haystack = sourceText(doc);
  const normalizedHaystack = normalize(haystack);

  const problems = [];
  if (words < MIN_WORDS || words > MAX_WORDS) {
    problems.push(`length ${words} outside ${MIN_WORDS}-${MAX_WORDS}`);
  }
  if (Math.abs(words - claimed) > 3) {
    problems.push(`reported word count ${claimed} does not match actual ${words}`);
  }

  const untraceable = claimTerms(proposed).filter((term) => {
    if (COMMON.has(term.toLowerCase())) return false;
    const n = normalize(term);
    if (n.length < 3) return false;
    return !normalizedHaystack.includes(n) && !haystack.includes(term.toLowerCase());
  });
  if (untraceable.length) {
    problems.push(`terms absent from this doctor's record: ${untraceable.join(", ")}`);
  }

  if (problems.length) {
    failures += 1;
    console.error(`FAIL ${slug} (${words} words)`);
    for (const problem of problems) console.error(`     - ${problem}`);
  } else {
    console.log(`PASS ${slug} (${words} words)`);
  }
}

console.log(`\n${checked} bios checked, ${flagged} flagged for manual review, ${failures} failing.`);
process.exit(failures ? 1 : 0);

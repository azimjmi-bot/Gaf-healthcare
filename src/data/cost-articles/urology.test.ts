import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { costsFilterPath } from "../../lib/catalog-links";
import { UROLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";
import { getTreatment } from "../../lib/treatments";
import { getCostArticle } from "./index";
import {
  UROLOGY_EXCLUSIVE_PROCEDURES,
  UROLOGY_PILOT_PROCEDURES,
  UROLOGY_SHARED,
  urologyArticles,
  urologyArticlesBySlug,
} from "./urology";

const citySlugs = ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"];
const countries = [
  "India",
  "Turkey",
  "Thailand",
  "United Arab Emirates",
  "Singapore",
  "Germany",
  "United Kingdom",
  "United States",
];

/** Procedure-specific clinical vocabulary that a generic template could not produce. */
const specificity: Record<string, RegExp[]> = {
  "PCNL (Percutaneous Nephrolithotomy)": [/staghorn/i, /nephrostomy/i, /mini-PCNL/i, /Hounsfield/i],
  "RIRS (Retrograde Intrarenal Surgery)": [/flexible ureteroscope/i, /access sheath/i, /dusting/i, /pre-stent/i],
  Ureteroscopy: [/semi-rigid/i, /impacted/i, /obstructed.*infected|infected.*obstructed/i, /alpha-blocker/i],
  "ESWL (Extracorporeal Shock Wave Lithotripsy)": [/shock wave/i, /skin-to-stone/i, /steinstrasse/i, /per session/i],
  Pyeloplasty: [/ureteropelvic junction/i, /crossing (blood )?vessel/i, /Anderson-Hynes|dismembered/i, /MAG3|DTPA/i],
  "Radical Nephrectomy": [/Gerota/i, /renal vein/i, /vena cava/i, /partial nephrectomy/i],
  "TURP (Transurethral Resection of the Prostate)": [/resectoscope/i, /bipolar/i, /TUR syndrome/i, /retrograde ejaculation/i],
  "HoLEP (Holmium Laser Enucleation)": [/enucleat/i, /morcellat/i, /capsule/i, /stress (incontinence|leakage)/i],
  "GreenLight Laser Surgery": [/photoselective/i, /vaporiz/i, /532/i, /no tissue/i],
  "TURBT (Transurethral Resection of Bladder Tumor)": [/detrusor/i, /non-muscle-invasive/i, /BCG/i, /re-staging/i],
  "Bladder Reconstruction": [/augmentation cystoplasty/i, /neobladder/i, /self-catheteris/i, /mucus/i],
  "Urinary Diversion": [/ileal conduit/i, /stoma/i, /appliance/i, /Indiana pouch/i],
  "Kidney Transplantation": [/iliac/i, /immunosuppress/i, /authorisation committee/i, /Transplantation of Human Organs/i],
  "Living Donor Kidney Transplantation": [/donor nephrectomy/i, /near relative/i, /laparoscopic/i, /two operations|pair of operations/i],
  "Deceased Donor Kidney Transplantation": [/cold storage|cold-ischaemia/i, /registry|registries/i, /delayed graft function/i, /domestic wait-list/i],
  "ABO-Incompatible Kidney Transplantation": [/plasma exchange/i, /rituximab/i, /titre/i, /accommodation/i],
  Urethroplasty: [/buccal/i, /bulbar/i, /anastomotic/i, /spongiofibrosis|scar/i],
  "VIU (Visual Internal Urethrotomy)": [/urethrotome/i, /cold-knife|cold knife/i, /recurrence/i, /self-dilatation/i],
  "Urinary Tract Reconstruction": [/Boari/i, /psoas hitch/i, /ileal ureter/i, /fistula/i],
  "Hypospadias Repair": [/urethral plate/i, /chordee/i, /fistula/i, /circumcision/i],
  "Pediatric Urological Surgery": [/vesicoureteral reflux/i, /orchidopexy/i, /undescended testis/i, /posterior urethral valve/i],
  "Penile Implant": [/three-piece/i, /malleable/i, /reservoir/i, /infection/i],
  "Varicocele Surgery": [/microsurgical/i, /hydrocele/i, /semen analysis/i, /subinguinal/i],
};

function countWords(value: unknown): number {
  if (typeof value === "string") {
    return value.match(/[A-Za-z0-9]+(?:['’–-][A-Za-z0-9]+)*/g)?.length ?? 0;
  }
  if (Array.isArray(value)) return value.reduce((sum, item) => sum + countWords(item), 0);
  if (value && typeof value === "object") {
    return Object.values(value).reduce((sum, item) => sum + countWords(item), 0);
  }
  return 0;
}

function webpDimensions(bytes: Buffer): [number, number] {
  assert.equal(bytes.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(bytes.subarray(8, 12).toString("ascii"), "WEBP");
  const chunk = bytes.subarray(12, 16).toString("ascii");
  if (chunk === "VP8 ") {
    assert.deepEqual([...bytes.subarray(23, 26)], [0x9d, 0x01, 0x2a]);
    return [bytes.readUInt16LE(26) & 0x3fff, bytes.readUInt16LE(28) & 0x3fff];
  }
  if (chunk === "VP8L") {
    const bits = bytes.readUInt32LE(21);
    return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
  }
  if (chunk === "VP8X") {
    return [bytes.readUIntLE(24, 3) + 1, bytes.readUIntLE(27, 3) + 1];
  }
  throw new Error(`Unsupported WebP chunk ${chunk}`);
}

test("publishes all 23 urology-owned procedures and leaves surgical-oncology sheets alone", () => {
  assert.equal(UROLOGY_PROCEDURES.length, 26);
  assert.equal(UROLOGY_EXCLUSIVE_PROCEDURES.length, 23);
  assert.deepEqual(UROLOGY_PILOT_PROCEDURES, ["PCNL (Percutaneous Nephrolithotomy)"]);
  assert.equal(urologyArticles.length, 23);
  assert.equal(urologyArticles[0].procedure, UROLOGY_PILOT_PROCEDURES[0]);
  assert.deepEqual(
    urologyArticles.map((article) => article.procedure).sort(),
    [...UROLOGY_EXCLUSIVE_PROCEDURES].sort(),
  );
  for (const name of UROLOGY_SHARED) {
    const slug = toSlug(name);
    assert.equal(getTreatment(slug)?.specialtySlug, "surgical-oncology");
    assert.equal(urologyArticlesBySlug[slug], undefined);
    const owner = getCostArticle(slug);
    assert.ok(!owner || !urologyArticles.includes(owner), `${slug} must not resolve to a urology guide`);
  }
  for (const article of urologyArticles) {
    assert.equal(getTreatment(article.slug)?.specialtySlug, "urology", `${article.slug} is not urology-owned`);
    assert.equal(urologyArticlesBySlug[article.slug], article);
    assert.equal(getCostArticle(article.slug), article);
  }
});

test("national guides have unique metadata, an H1 ending in Cost in India and ~2,000–3,000 body words", () => {
  for (const field of ["slug", "seoTitle", "seoDescription", "heading", "heroSubtitle"] as const) {
    assert.equal(new Set(urologyArticles.map((article) => article[field])).size, 23, field);
  }
  for (const article of urologyArticles) {
    const body = Object.fromEntries(
      Object.entries(article).filter(([key]) => !["cities", "destinations", "figures", "seoTitle", "seoDescription"].includes(key)),
    );
    const words = countWords(body);
    assert.ok(words >= 2_000 && words <= 3_200, `${article.slug}: ${words} body words`);
    assert.match(article.heading, /Cost in India$/);
    assert.match(article.seoDescription, /\[INDIA_COST\]/);
    assert.ok(article.seoTitle.length <= 70, `${article.slug}: seoTitle ${article.seoTitle.length} chars`);
    assert.ok(article.seoDescription.length <= 170, `${article.slug}: seoDescription ${article.seoDescription.length} chars`);
    assert.notEqual(article.heading, article.seoTitle);
    assert.ok(article.heroSubtitle && countWords(article.heroSubtitle) <= 40);
    const text = JSON.stringify(article);
    for (const token of ["[INDIA_COST]", "[US_COST]", "[STAY]"]) assert.ok(text.includes(token), token);
    for (const expected of specificity[article.procedure]) {
      assert.match(text, expected, `${article.slug}: missing ${expected}`);
    }
    assert.ok(article.inclusions.length >= 6);
    assert.ok(article.exclusions.length >= 6);
    assert.equal(article.costDrivers.length, 10);
    assert.ok((article.topicSections ?? []).length >= 4);
    assert.ok((article.approachComparison?.rows.length ?? 0) >= 3);
    assert.equal(article.fullPathway?.stages.length, 12);
    assert.equal(article.journey.length, 12);
    assert.equal(article.documents.length, 8);
    assert.ok((article.whyIndia ?? []).length >= 2);
    assert.equal(article.relatedProcedures.length, 3);
  }
});

test("Quick Answer is answer-first, states the planning-range rule and stays within 100–150 words", () => {
  for (const article of urologyArticles) {
    const quick = article.answer.join(" ");
    const words = countWords(quick);
    assert.ok(words >= 100 && words <= 150, `${article.slug}: ${words} Quick Answer words`);
    assert.match(quick, new RegExp(`^${article.procedure.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} in India`));
    assert.match(quick, /Planning Range ≠ Final Hospital Quotation/);
    assert.match(quick, /\[INDIA_COST\]/);
    assert.match(quick, /\[US_COST\]/);
    assert.match(quick, /\[STAY\]/);
    assert.match(article.answer[0], /per (operation|session|procedure|transplant episode)/);
  }
});

test("five unique city overlays with exact-CMS gating and no invented city tariff", () => {
  for (const article of urologyArticles) {
    assert.deepEqual(article.cities.map((city) => city.citySlug), citySlugs);
    assert.equal(new Set(article.cities.map((city) => JSON.stringify(city.page))).size, 5);
    for (const city of article.cities) {
      assert.equal(city.costRange, undefined);
      assert.equal(city.stay, undefined);
      assert.match(city.costNote, /national planning range/i);
      assert.doesNotMatch(JSON.stringify(city), /[$€£]\s?\d/);
      assert.ok(city.page);
      assert.equal(city.page.intro.length, 5);
      assert.equal(city.page.faqs.length, 5);
      assert.ok(countWords(`${city.ecosystem} ${city.logistics}`) >= 120, `${article.slug}/${city.citySlug} lacks local copy`);
      const gate = `${city.ecosystem} ${city.page.hospitalDiscussion.join(" ")}`;
      assert.match(gate, /exact live CMS relationships/);
      assert.match(gate, /cards must remain empty/);
      assert.match(gate, /catalog gap/);
      assert.doesNotMatch(gate, /cases per year|always available|guaranteed/i);
    }
  }
});

test("eight destinations, 10+ FAQs, 15+ quote questions and a subspecialty section", () => {
  for (const article of urologyArticles) {
    assert.deepEqual(article.destinations.map((destination) => destination.country), countries);
    assert.match(JSON.stringify(article.destinations), /\[US_COST\]/);
    assert.ok(article.questionsToAsk.length >= 15);
    assert.equal(new Set(article.questionsToAsk).size, article.questionsToAsk.length);
    assert.ok(article.faqs.length >= 10 && article.faqs.length <= 15, `${article.slug}: ${article.faqs.length} FAQs`);
    assert.equal(new Set(article.faqs.map((faq) => faq.q)).size, article.faqs.length);
    assert.ok(article.faqs.every(({ a }) => countWords(a) >= 10));
    assert.ok(article.topicSections?.some((section) => section.id === "subspecialty"));
    assert.ok(article.topicSections?.some((section) => section.id === "risks"));
  }
});

test("avoids outcome promises, rankings and unsupported numeric claims", () => {
  const text = JSON.stringify(urologyArticles);
  assert.doesNotMatch(text, /\b\d+(?:\.\d+)?%/);
  assert.doesNotMatch(
    text,
    /\bbest (?:doctor|surgeon|hospital|facility|urologist|implant)|success rate|100%|guaranteed (?:success|outcome|cure|result)|risk[- ]free|painless\b/i,
  );
  assert.doesNotMatch(text, /\uFFFD/);
  assert.match(text, /no outcome is promised/i);
  assert.match(text, /may be considered/i);
});

test("uses one national procedure canonical and preserves city procedure routes", () => {
  assert.equal(
    costsFilterPath({ destination: "India", specialty: "Urology", procedure: "PCNL (Percutaneous Nephrolithotomy)" }),
    "/costs/India/Urology/PCNL-(Percutaneous-Nephrolithotomy)",
  );
  assert.equal(
    costsFilterPath({ destination: "India", city: "Chennai", specialty: "Urology", procedure: "Kidney Transplantation" }),
    "/costs/India/Chennai/Urology/Kidney-Transplantation",
  );
});

test("declares and ships exactly 69 unique optimized 1200x675 WebPs with descriptive alt text", () => {
  const expected: string[] = [];
  const sources = new Set<string>();
  for (const article of urologyArticles) {
    const files = ["anatomy", "procedure", "recovery"].map((kind) => `${article.slug}-${kind}.webp`);
    expected.push(...files);
    assert.deepEqual(
      article.figures?.map((figure) => figure.src),
      files.map((file) => `/images/cost/urology/${file}`),
    );
    assert.deepEqual(article.figures?.map((figure) => figure.after), ["overview", "how", "journey"]);
    for (const figure of article.figures ?? []) {
      assert.ok(figure.alt.length >= 120, `${figure.src} alt too short`);
      assert.equal(figure.fit, "contain");
      assert.ok(!sources.has(figure.src));
      sources.add(figure.src);
    }
  }
  assert.equal(sources.size, 69);

  const directory = join(process.cwd(), "public/images/cost/urology");
  assert.ok(existsSync(directory));
  assert.deepEqual(readdirSync(directory).sort(), expected.sort());
  for (const file of expected) {
    const bytes = readFileSync(join(directory, file));
    assert.deepEqual(webpDimensions(bytes), [1200, 675]);
    assert.ok(bytes.length < 120_000, `${file} is not sufficiently optimized`);
  }
});

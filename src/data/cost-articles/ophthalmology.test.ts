import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { costsFilterPath } from "../../lib/catalog-links";
import { OPHTHALMOLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";
import {
  OPHTHALMOLOGY_EXCLUSIVE_PROCEDURES,
  OPHTHALMOLOGY_PILOT_PROCEDURES,
  ophthalmologyArticles,
  ophthalmologyArticlesBySlug,
} from "./ophthalmology";

const citySlugs = [
  "delhi-ncr",
  "mumbai",
  "bengaluru",
  "chennai",
  "hyderabad",
];
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

function countWords(value: unknown): number {
  if (typeof value === "string") {
    return value.match(/[A-Za-z0-9]+(?:['’–-][A-Za-z0-9]+)*/g)?.length ?? 0;
  }
  if (Array.isArray(value)) {
    return value.reduce((sum, item) => sum + countWords(item), 0);
  }
  if (value && typeof value === "object") {
    return Object.values(value).reduce(
      (sum, item) => sum + countWords(item),
      0,
    );
  }
  return 0;
}

function webpDimensions(bytes: Buffer): [number, number] {
  assert.equal(bytes.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(bytes.subarray(8, 12).toString("ascii"), "WEBP");
  const chunk = bytes.subarray(12, 16).toString("ascii");
  if (chunk === "VP8 ") {
    assert.deepEqual([...bytes.subarray(23, 26)], [0x9d, 0x01, 0x2a]);
    return [
      bytes.readUInt16LE(26) & 0x3fff,
      bytes.readUInt16LE(28) & 0x3fff,
    ];
  }
  if (chunk === "VP8L") {
    const bits = bytes.readUInt32LE(21);
    return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
  }
  if (chunk === "VP8X") {
    return [
      bytes.readUIntLE(24, 3) + 1,
      bytes.readUIntLE(27, 3) + 1,
    ];
  }
  throw new Error(`Unsupported WebP chunk ${chunk}`);
}

test("publishes one pilot from a 24-item exclusive Ophthalmology inventory", () => {
  assert.equal(OPHTHALMOLOGY_PROCEDURES.length, 25);
  assert.equal(OPHTHALMOLOGY_EXCLUSIVE_PROCEDURES.length, 24);
  assert.ok(
    !OPHTHALMOLOGY_EXCLUSIVE_PROCEDURES.includes("Blepharoplasty" as never),
  );
  assert.deepEqual(OPHTHALMOLOGY_PILOT_PROCEDURES, ["Cataract Surgery"]);
  assert.equal(ophthalmologyArticles.length, 1);
  assert.equal(ophthalmologyArticles[0].procedure, "Cataract Surgery");
  assert.equal(
    ophthalmologyArticlesBySlug[toSlug("Cataract Surgery")],
    ophthalmologyArticles[0],
  );
  assert.equal(
    ophthalmologyArticlesBySlug[toSlug("Blepharoplasty")],
    undefined,
  );
});

test("Cataract Surgery is a complete 2,000–3,000 word national guide", () => {
  const article = ophthalmologyArticles[0];
  const { cities: _cities, destinations: _destinations, ...national } = article;
  const words = countWords(national);
  assert.ok(words >= 2_000 && words <= 3_000, `${words} national words`);
  assert.equal(article.heading, "Cataract Surgery Cost in India");
  assert.match(article.seoTitle, /Per-Eye Lens & Care Guide/);
  assert.match(article.seoDescription, /\[INDIA_COST\].*per eye/i);
  assert.notEqual(article.heading, article.seoTitle);
  assert.ok(article.heroSubtitle);
  assert.doesNotMatch(article.heroSubtitle, /Cataract Surgery Cost in India/);

  const text = JSON.stringify(article);
  for (const token of ["[INDIA_COST]", "[US_COST]", "[STAY]"]) {
    assert.ok(text.includes(token));
  }
  for (const expected of [
    /per eye/i,
    /right eye.*left eye|left eye.*right eye/i,
    /separate dates|scheduled separately/i,
    /ophthalmologist/i,
    /day care|day-care/i,
    /slit-lamp/i,
    /refraction/i,
    /dilation/i,
    /intraocular-pressure|IOP/i,
    /retina/i,
    /optical biometry/i,
    /keratometry/i,
    /cataract density/i,
    /ocular comorbidity/i,
    /phacoemulsification/i,
    /manual small-incision/i,
    /femtosecond/i,
    /monofocal/i,
    /toric/i,
    /multifocal/i,
    /trifocal/i,
    /EDOF/i,
    /posterior-capsule/i,
    /combined surgery/i,
    /drops/i,
    /eye shield|shield/i,
    /urgent/i,
  ]) {
    assert.match(text, expected);
  }
  assert.ok(article.inclusions.length >= 6);
  assert.ok(article.exclusions.length >= 5);
  assert.ok(article.costDrivers.length >= 10);
  assert.ok((article.topicSections ?? []).length >= 5);
  assert.ok((article.fullPathway?.stages ?? []).length >= 12);
  assert.ok(article.journey.length >= 12);
  assert.ok(article.documents.length >= 8);
  assert.ok((article.whyIndia ?? []).length >= 3);
  assert.ok(article.relatedProcedures.length >= 4);
});

test("Quick Answer is answer-first, cautious and within 100–150 words", () => {
  const article = ophthalmologyArticles[0];
  const quick = article.answer.join(" ");
  const words = countWords(quick);
  assert.ok(words >= 100 && words <= 150, `${words} Quick Answer words`);
  assert.match(quick, /^Cataract Surgery in India is typically planned/i);
  assert.match(quick, /Planning Range ≠ Final Hospital Quotation/);
  assert.match(quick, /per eye/i);
});

test("uses five unique local overlays with exact-CMS gating and no city tariff", () => {
  const article = ophthalmologyArticles[0];
  assert.deepEqual(
    article.cities.map((city) => city.citySlug),
    citySlugs,
  );
  assert.equal(
    new Set(article.cities.map((city) => JSON.stringify(city.page))).size,
    5,
  );
  for (const city of article.cities) {
    assert.equal(city.costRange, undefined);
    assert.equal(city.stay, undefined);
    assert.match(city.costNote, /national per-eye planning range/i);
    assert.doesNotMatch(JSON.stringify(city), /[$€£]\s?\d/);
    assert.ok(city.page);
    assert.equal(city.page.intro.length, 5);
    assert.equal(city.page.faqs.length, 5);
    assert.ok(
      countWords(`${city.ecosystem} ${city.logistics}`) >= 120,
      `${city.citySlug} lacks meaningful local/logistics copy`,
    );
    const gate = `${city.ecosystem} ${city.page.hospitalDiscussion.join(" ")}`;
    assert.match(gate, /exact live CMS relationships/);
    assert.match(gate, /cards must remain empty/);
    assert.match(gate, /catalog gap/);
    assert.doesNotMatch(gate, /cases per year|always available|guaranteed/i);
  }
});

test("uses eight restrained destination rows and complete planning tools", () => {
  const article = ophthalmologyArticles[0];
  assert.deepEqual(
    article.destinations.map((destination) => destination.country),
    countries,
  );
  assert.equal(article.destinations.length, 8);
  assert.match(JSON.stringify(article.destinations), /\[US_COST\]/);
  assert.ok(article.questionsToAsk.length >= 20);
  assert.equal(
    new Set(article.questionsToAsk).size,
    article.questionsToAsk.length,
  );
  assert.equal(article.faqs.length, 12);
  assert.ok(
    article.faqs.every(
      ({ a }) => countWords(a) >= 14 && !/^(yes|no)[,.]?$/i.test(a),
    ),
  );
});

test("avoids outcome promises, rankings and unsupported numeric claims", () => {
  const text = JSON.stringify(ophthalmologyArticles[0]);
  assert.doesNotMatch(text, /\b\d+(?:\.\d+)?%\b/);
  assert.doesNotMatch(
    text,
    /\bbest (?:doctor|surgeon|hospital|facility|lens)|success rate|perfect vision|20\/20|100%|guaranteed (?:success|vision|outcome)|risk[- ]free\b/i,
  );
  assert.match(text, /does not promise|cannot be promised|no visual outcome is promised/i);
});

test("uses the existing pretty cost route convention", () => {
  assert.equal(
    costsFilterPath({
      destination: "India",
      specialty: "Ophthalmology",
      procedure: "Cataract Surgery",
    }),
    "/costs/India/Ophthalmology/Cataract-Surgery",
  );
  assert.equal(
    costsFilterPath({
      destination: "India",
      city: "Chennai",
      specialty: "Ophthalmology",
      procedure: "Cataract Surgery",
    }),
    "/costs/India/Chennai/Ophthalmology/Cataract-Surgery",
  );
});

test("declares and ships exactly three optimized 1200x675 WebPs", () => {
  const article = ophthalmologyArticles[0];
  const expected = [
    "cataract-surgery-anatomy.webp",
    "cataract-surgery-procedure.webp",
    "cataract-surgery-recovery.webp",
  ];
  assert.deepEqual(
    article.figures?.map((figure) => figure.src),
    expected.map((file) => `/images/cost/ophthalmology/${file}`),
  );
  for (const figure of article.figures ?? []) {
    assert.ok(figure.alt.length >= 140);
  }

  const directory = join(
    process.cwd(),
    "public/images/cost/ophthalmology",
  );
  assert.ok(existsSync(directory));
  assert.deepEqual(readdirSync(directory).sort(), expected.sort());
  for (const file of expected) {
    const bytes = readFileSync(join(directory, file));
    assert.deepEqual(webpDimensions(bytes), [1200, 675]);
    assert.ok(bytes.length < 250_000, `${file} is not sufficiently optimized`);
  }
});

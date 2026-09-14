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
import { cosmeticSurgeryArticlesBySlug } from "./cosmetic-surgery";
import { getCostArticle } from "./index";

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

const specificity: Record<string, RegExp[]> = {
  "Cataract Surgery": [/per eye/i, /monofocal/i, /posterior-capsule/i],
  "Phacoemulsification Cataract Surgery": [/ultrasound/i, /capsular bag/i, /IOL/i],
  "Femto Laser Cataract Surgery": [/docking/i, /capsulotomy/i, /does not replace the operating surgeon/i],
  "LASIK Eye Surgery": [/hinged corneal flap/i, /excimer/i, /tomography/i],
  "SMILE Eye Surgery": [/lenticule/i, /small incision/i, /without a LASIK flap/i],
  "ICL (Implantable Collamer Lens)": [/phakic/i, /behind the iris/i, /natural lens remains|natural lens retained/i],
  "Corneal Transplantation": [/full-thickness/i, /donor button|donor tissue/i, /sutures/i],
  DMEK: [/Descemet membrane/i, /endothelium/i, /stroma retained|retaining.*stroma/i],
  DSEK: [/stromal-endothelial/i, /donor disc/i, /air or gas/i],
  DALK: [/stroma/i, /endothelium retained|retaining.*endothelium/i, /Descemet/i],
  "Glaucoma Surgery": [/umbrella/i, /optic nerve/i, /laser.*trabeculectomy.*tube|laser.*bleb.*drainage device/i],
  "Laser Glaucoma Surgery": [/outpatient laser/i, /SLT|trabecular laser/i, /not trabeculectomy/i],
  Trabeculectomy: [/filtering bleb/i, /scleral flap/i, /antifibrotic/i],
  "Glaucoma Drainage Device / Valve Implantation": [/tube-and-plate|tube.*plate/i, /valved/i, /non-valved/i],
  Vitrectomy: [/pars plana/i, /vitreous/i, /gas or silicone oil/i],
  "Retinal Detachment Surgery": [/retinal breaks/i, /scleral buckle/i, /reattach/i],
  "Intravitreal Anti-VEGF Injection": [/per injection/i, /OCT/i, /ongoing injections|ongoing schedule/i],
  "Macular Hole Surgery": [/macular OCT/i, /membrane peel/i, /gas/i],
  "Pediatric Cataract Surgery": [/visual development/i, /amblyopia/i, /general anaesthesia/i],
  "Squint / Strabismus Surgery": [/alignment measurements/i, /recessed, resected|recession.*resection/i, /extraocular/i],
  "Oculoplastic Surgery": [/functional/i, /eyelids, orbit and lacrimal|eyelid.*orbit.*lacrimal/i, /cosmetic Blepharoplasty/i],
  "Eyelid Reconstruction Surgery": [/anterior and posterior lamellae/i, /flap or graft/i, /corneal protection|protect the cornea/i],
  "Dacryocystorhinostomy (DCR) / Tear Duct Surgery": [/lacrimal sac/i, /nasal cavity/i, /external versus endoscopic/i],
  "Corneal Cross-Linking (C3R)": [/riboflavin/i, /ultraviolet A|UVA/i, /stabilize progression, not provide refractive correction/i],
};

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

test("publishes all 24 exclusive Ophthalmology procedures and preserves shared ownership", () => {
  assert.equal(OPHTHALMOLOGY_PROCEDURES.length, 25);
  assert.equal(OPHTHALMOLOGY_EXCLUSIVE_PROCEDURES.length, 24);
  assert.ok(
    !OPHTHALMOLOGY_EXCLUSIVE_PROCEDURES.includes("Blepharoplasty" as never),
  );
  assert.deepEqual(OPHTHALMOLOGY_PILOT_PROCEDURES, ["Cataract Surgery"]);
  assert.equal(ophthalmologyArticles.length, 24);
  assert.equal(ophthalmologyArticles[0].procedure, "Cataract Surgery");
  assert.deepEqual(
    ophthalmologyArticles.map((article) => article.procedure).sort(),
    [...OPHTHALMOLOGY_EXCLUSIVE_PROCEDURES].sort(),
  );
  assert.equal(
    ophthalmologyArticlesBySlug[toSlug("Blepharoplasty")],
    undefined,
  );
  for (const article of ophthalmologyArticles) {
    assert.equal(ophthalmologyArticlesBySlug[article.slug], article);
    assert.equal(getCostArticle(article.slug), article);
  }
  const blepharoplastySlug = toSlug("Blepharoplasty");
  assert.equal(
    getCostArticle(blepharoplastySlug),
    cosmeticSurgeryArticlesBySlug[blepharoplastySlug],
  );
});

test("all national guides have unique metadata and 2,000–3,000 words", () => {
  for (const field of ["slug", "seoTitle", "seoDescription", "heading", "heroSubtitle"] as const) {
    assert.equal(new Set(ophthalmologyArticles.map((article) => article[field])).size, 24);
  }
  for (const article of ophthalmologyArticles) {
    const { cities: _cities, destinations: _destinations, ...national } = article;
    const words = countWords(national);
    assert.ok(words >= 2_000 && words <= 3_000, `${article.slug}: ${words} national words`);
    assert.match(article.heading, /Cost in India$/);
    assert.match(article.seoDescription, /\[INDIA_COST\]/);
    assert.notEqual(article.heading, article.seoTitle);
    assert.ok(article.heroSubtitle);
    const text = JSON.stringify(article);
    for (const token of ["[INDIA_COST]", "[US_COST]", "[STAY]"]) assert.ok(text.includes(token));
    for (const expected of specificity[article.procedure]) {
      assert.match(text, expected, `${article.slug}: missing ${expected}`);
    }
    assert.ok(article.inclusions.length >= 6);
    assert.ok(article.exclusions.length >= 5);
    assert.ok(article.costDrivers.length >= 10);
    assert.ok((article.topicSections ?? []).length >= 5);
    assert.ok((article.fullPathway?.stages ?? []).length >= 12);
    assert.ok(article.journey.length >= 12);
    assert.ok(article.documents.length >= 8);
    assert.ok((article.whyIndia ?? []).length >= 3);
    assert.ok(article.relatedProcedures.length >= 3);
  }
});

test("Quick Answer is answer-first, cautious and within 100–150 words", () => {
  for (const article of ophthalmologyArticles) {
    const quick = article.answer.join(" ");
    const words = countWords(quick);
    assert.ok(words >= 100 && words <= 150, `${article.slug}: ${words} Quick Answer words`);
    assert.match(quick, new RegExp(`^${article.procedure.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} in India`));
    assert.match(quick, /Planning Range ≠ Final Hospital Quotation/);
    assert.match(quick, /per eye|per injection|per course/i);
  }
});

test("uses five unique local overlays with exact-CMS gating and no city tariff", () => {
  for (const article of ophthalmologyArticles) {
    assert.deepEqual(article.cities.map((city) => city.citySlug), citySlugs);
    assert.equal(new Set(article.cities.map((city) => JSON.stringify(city.page))).size, 5);
    for (const city of article.cities) {
      assert.equal(city.costRange, undefined);
      assert.equal(city.stay, undefined);
      assert.match(city.costNote, /national .*planning range/i);
      assert.doesNotMatch(JSON.stringify(city), /[$€£]\s?\d/);
      assert.ok(city.page);
      assert.equal(city.page.intro.length, 5);
      assert.equal(city.page.faqs.length, 5);
      assert.ok(
        countWords(`${city.ecosystem} ${city.logistics}`) >= 120,
        `${article.slug}/${city.citySlug} lacks meaningful local copy`,
      );
      const gate = `${city.ecosystem} ${city.page.hospitalDiscussion.join(" ")}`;
      assert.match(gate, /exact live CMS relationships/);
      assert.match(gate, /cards must remain empty/);
      assert.match(gate, /catalog gap/);
      assert.doesNotMatch(gate, /cases per year|always available|guaranteed/i);
    }
  }
});

test("uses eight destinations, 12 FAQs and complete quote questions", () => {
  for (const article of ophthalmologyArticles) {
    assert.deepEqual(
      article.destinations.map((destination) => destination.country),
      countries,
    );
    assert.match(JSON.stringify(article.destinations), /\[US_COST\]/);
    assert.ok(article.questionsToAsk.length >= 20);
    assert.equal(new Set(article.questionsToAsk).size, article.questionsToAsk.length);
    assert.equal(article.faqs.length, 12);
    assert.ok(article.faqs.every(({ a }) => countWords(a) >= 10));
  }
});

test("avoids outcome promises, rankings and unsupported numeric claims", () => {
  const text = JSON.stringify(ophthalmologyArticles);
  assert.doesNotMatch(text, /\b\d+(?:\.\d+)?%\b/);
  assert.doesNotMatch(
    text,
    /\bbest (?:doctor|surgeon|hospital|facility|lens)|success rate|perfect vision|20\/20|100%|guaranteed (?:success|vision|outcome)|risk[- ]free\b/i,
  );
  assert.doesNotMatch(text, /\uFFFD/);
  assert.match(text, /does not promise|cannot be promised|no outcome is promised/i);
});

test("uses canonical national sheets and keeps differentiated city routes", () => {
  assert.equal(
    costsFilterPath({
      destination: "India",
      specialty: "Ophthalmology",
      procedure: "Cataract Surgery",
    }),
    "/costs/cataract-surgery",
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
  assert.equal(
    costsFilterPath({
      destination: "India",
      specialty: "Ophthalmology",
      procedure: "ICL (Implantable Collamer Lens)",
    }),
    "/costs/icl-implantable-collamer-lens",
  );
  assert.equal(
    costsFilterPath({
      destination: "India",
      specialty: "Ophthalmology",
      procedure: "Glaucoma Drainage Device / Valve Implantation",
    }),
    "/costs/glaucoma-drainage-device-valve-implantation",
  );
});

test("declares and ships exactly 72 unique optimized 1200x675 WebPs", () => {
  const expected: string[] = [];
  const sources = new Set<string>();
  for (const article of ophthalmologyArticles) {
    const files = ["anatomy", "procedure", "recovery"].map(
      (kind) => `${article.slug}-${kind}.webp`,
    );
    expected.push(...files);
    assert.deepEqual(
      article.figures?.map((figure) => figure.src),
      files.map((file) => `/images/cost/ophthalmology/${file}`),
    );
    for (const figure of article.figures ?? []) {
      assert.ok(figure.alt.length >= 120);
      assert.ok(!sources.has(figure.src));
      sources.add(figure.src);
    }
  }
  assert.equal(sources.size, 72);

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

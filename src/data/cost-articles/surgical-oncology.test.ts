import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { costsFilterPath } from "../../lib/catalog-links";
import { SURGICAL_ONCOLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";
import { treatments } from "../../lib/treatments";
import {
  SURGICAL_ONCOLOGY_NEW_PROCEDURES,
  SURGICAL_ONCOLOGY_PILOT_PROCEDURES,
  surgicalOncologyArticles,
  surgicalOncologyArticlesBySlug,
} from "./surgical-oncology";
import { getCostArticle } from "./index";

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

/** Procedures that already had a long-form article before this bundle existed. */
const PREVIOUSLY_COVERED = [
  "Breast-Conserving Surgery (Lumpectomy)",
  "Mastectomy",
  "Nipple-Sparing Mastectomy",
  "Oncoplastic Breast Surgery",
  "Breast Reconstruction",
  "Sentinel Lymph Node Biopsy",
  "Esophagectomy",
  "Gastrectomy",
  "Colectomy",
  "Rectal Cancer Surgery",
  "Liver Resection (Hepatectomy)",
  "Whipple Procedure",
  "Pancreatic Surgery",
  "Cytoreductive Surgery",
  "Cytoreductive Surgery with HIPEC",
  "PIPAC",
  "Ovarian Cancer Cytoreductive Surgery",
];

const specificity: Record<string, RegExp[]> = {
  "Thyroidectomy for Thyroid Cancer": [
    /recurrent laryngeal nerve/i,
    /parathyroid/i,
    /lobectomy/i,
    /radioiodine/i,
    /lifelong thyroid hormone replacement/i,
  ],
  "Neck Dissection": [
    /levels? one to five|node levels/i,
    /selective/i,
    /modified radical/i,
    /chyle leak/i,
    /shoulder/i,
  ],
  "Oral Cancer Surgery": [
    /margin/i,
    /mandibulectomy/i,
    /free flap|free tissue/i,
    /tracheostomy/i,
    /speech and swallow/i,
  ],
  "Lung Cancer Surgery": [
    /lobectomy/i,
    /segmentectomy/i,
    /mediastinal/i,
    /air leak/i,
    /pulmonary function/i,
  ],
  "Partial Nephrectomy": [
    /remnant/i,
    /warm-ischaemia|ischemia|clamped/i,
    /collecting system/i,
    /radical nephrectomy/i,
  ],
  "Radical Prostatectomy": [
    /neurovascular|nerve-sparing/i,
    /continence/i,
    /seminal vesicle/i,
    /PSA/i,
  ],
  "Radical Cystectomy": [
    /ileal conduit/i,
    /neobladder/i,
    /stoma/i,
    /TURBT/i,
  ],
  "Radical Hysterectomy": [
    /parametri/i,
    /ureter/i,
    /fertility-sparing|trachelectomy/i,
    /cervical/i,
  ],
  Lobectomy: [
    /anatomical lobe|entire lobe/i,
    /which lobe/i,
    /sleeve/i,
    /remaining lung/i,
  ],
  "VATS Lung Surgery": [
    /video-assisted|keyhole/i,
    /ports/i,
    /conversion to open/i,
    /stapler/i,
  ],
  "Robotic Thoracic Surgery": [
    /console/i,
    /platform/i,
    /undock/i,
    /not itself an indication|robot in the building/i,
  ],
  "Transoral Robotic Surgery (TORS)": [
    /oropharyn/i,
    /base of tongue|tonsil/i,
    /through the mouth/i,
    /HPV/i,
  ],
  "Microvascular Free Flap Reconstruction": [
    /donor site/i,
    /anastomos/i,
    /fibula|forearm|thigh/i,
    /two-team|two surgical teams/i,
  ],
};

test("only adds surgical oncology procedures that had no long-form article", () => {
  assert.equal(SURGICAL_ONCOLOGY_NEW_PROCEDURES.length, 13);
  assert.deepEqual(SURGICAL_ONCOLOGY_PILOT_PROCEDURES, ["Thyroidectomy for Thyroid Cancer"]);
  assert.equal(surgicalOncologyArticles.length, 13);
  assert.deepEqual(
    surgicalOncologyArticles.map((article) => article.procedure).sort(),
    [...SURGICAL_ONCOLOGY_NEW_PROCEDURES].sort(),
  );
  for (const procedure of SURGICAL_ONCOLOGY_NEW_PROCEDURES) {
    assert.ok(
      SURGICAL_ONCOLOGY_PROCEDURES.includes(procedure as never),
      `${procedure}: not a catalog surgical oncology procedure`,
    );
    const treatment = treatments.find((row) => row.slug === toSlug(procedure));
    assert.ok(treatment, `${procedure}: missing treatment entity`);
    assert.ok(treatment.specialtySlugs.includes("surgical-oncology"));
  }
  for (const procedure of PREVIOUSLY_COVERED) {
    assert.equal(
      surgicalOncologyArticlesBySlug[toSlug(procedure)],
      undefined,
      `${procedure}: already covered elsewhere and must not be duplicated`,
    );
  }
  for (const article of surgicalOncologyArticles) {
    assert.equal(surgicalOncologyArticlesBySlug[article.slug], article);
    assert.equal(getCostArticle(article.slug), article);
  }
  for (const procedure of SURGICAL_ONCOLOGY_PROCEDURES) {
    assert.ok(getCostArticle(toSlug(procedure)), `${procedure}: still missing a long-form guide`);
  }
});

test("does not duplicate pulmonology airway and pleural procedures", () => {
  const pulmonologySlugs = treatments
    .filter((row) => row.specialtySlugs.includes("pulmonology"))
    .map((row) => row.slug);
  for (const article of surgicalOncologyArticles) {
    assert.ok(!pulmonologySlugs.includes(article.slug), `${article.slug}: owned by pulmonology`);
  }
  const lung = surgicalOncologyArticlesBySlug["lung-cancer-surgery"];
  assert.ok(lung);
  // The resection page must reference airway staging rather than restate it.
  assert.ok(lung.relatedProcedures.includes("EBUS (Endobronchial Ultrasound)"));
  assert.ok(lung.relatedProcedures.includes("Bronchoscopy"));
  assert.match(JSON.stringify(lung), /separate earlier procedure/i);
  // Access route is the one place where these operations genuinely diverge.
  const accessSlugs = new Set(["lung-cancer-surgery", "vats-lung-surgery", "robotic-thoracic-surgery"]);
  for (const article of surgicalOncologyArticles) {
    if (accessSlugs.has(article.slug)) {
      assert.ok((article.accessComparison?.rows ?? []).length >= 3, article.slug);
    } else {
      assert.equal(article.accessComparison, undefined, article.slug);
    }
  }
});

test("every article has unique metadata and complete long-form fields", () => {
  for (const field of ["slug", "seoTitle", "seoDescription", "heading", "heroSubtitle"] as const) {
    assert.equal(new Set(surgicalOncologyArticles.map((article) => article[field])).size, 13, field);
  }
  for (const article of surgicalOncologyArticles) {
    assert.match(article.heading, /Cost in India$/);
    assert.match(article.seoDescription, /\[INDIA_COST\]/);
    assert.match(article.heroSubtitle ?? "", /\[INDIA_COST\]/);
    const quickAnswer = article.answer.join(" ");
    const quickWords = quickAnswer.trim().split(/\s+/).length;
    assert.ok(quickWords >= 100 && quickWords <= 150, `${article.slug}: ${quickWords} Quick Answer words`);
    assert.match(quickAnswer, /Planning Range ≠ Final Hospital Quotation/);
    const text = JSON.stringify(article);
    assert.match(text, /\[INDIA_COST\]/);
    assert.match(text, /\[US_COST\]/);
    assert.match(text, /\[STAY\]/);
    assert.ok((article.introduction ?? []).length >= 4);
    assert.ok((article.costComponents ?? []).length >= 6);
    assert.ok(article.inclusions.length >= 6);
    assert.ok(article.exclusions.length >= 5);
    assert.ok(article.costDrivers.length >= 8);
    assert.ok((article.topicSections ?? []).length >= 5);
    assert.ok(article.journey.length >= 12);
    assert.ok(article.documents.length >= 8);
    assert.ok((article.whyIndia ?? []).length >= 3);
    assert.ok(article.questionsToAsk.length >= 20);
    assert.equal(new Set(article.questionsToAsk).size, article.questionsToAsk.length);
    assert.equal(article.faqs.length, 12);
    assert.equal(new Set(article.faqs.map((faq) => faq.q)).size, 12);
  }
});

test("every national article is a 2,000–3,000 word long-form guide", () => {
  /**
   * Counts what a reader actually sees on the national page. Alt text, SEO metadata and
   * the slug are excluded because they never render as body copy, and city overlays and
   * the destination table are counted on their own pages.
   */
  const NOT_RENDERED = new Set(["slug", "lastUpdated", "seoTitle", "seoDescription", "alt"]);
  const countWords = (value: unknown): number => {
    if (typeof value === "string") {
      return value.match(/[A-Za-z0-9]+(?:['’–-][A-Za-z0-9]+)*/g)?.length ?? 0;
    }
    if (Array.isArray(value)) {
      return value.reduce((total: number, item) => total + countWords(item), 0);
    }
    if (value && typeof value === "object") {
      return Object.entries(value).reduce(
        (total, [key, item]) => (NOT_RENDERED.has(key) ? total : total + countWords(item)),
        0,
      );
    }
    return 0;
  };
  for (const article of surgicalOncologyArticles) {
    const { cities: _cities, destinations: _destinations, ...national } = article;
    const words = countWords(national);
    assert.ok(words >= 2_000 && words <= 3_000, `${article.slug} has ${words} rendered words`);
  }
});

test("clinical copy stays procedure-specific, cancer-aware and medically safe", () => {
  for (const article of surgicalOncologyArticles) {
    const text = JSON.stringify(article);
    for (const expected of specificity[article.procedure]) {
      assert.match(text, expected, `${article.slug}: missing ${expected}`);
    }
    assert.match(text, /histopathology|pathology/i);
    assert.match(text, /multidisciplinary/i);
    assert.match(text, /individual/i);
    assert.doesNotMatch(text, /\b\d+(?:\.\d+)?%\b/);
    assert.doesNotMatch(
      text,
      /\bbest (?:doctor|surgeon|hospital|facility)|success rate|100% success|guaranteed success|cure rate|pain[- ]free|risk[- ]free\b/i,
    );
    assert.doesNotMatch(text, /\bwill cure\b|\bguarantee[sd]?\b/i);
  }
});

test("uses five meaningful city overlays without invented tariffs or capabilities", () => {
  for (const article of surgicalOncologyArticles) {
    assert.deepEqual(article.cities.map((city) => city.citySlug), citySlugs);
    assert.equal(new Set(article.cities.map((city) => JSON.stringify(city.page))).size, 5);
    for (const city of article.cities) {
      assert.equal(city.costRange, undefined);
      assert.equal(city.stay, undefined);
      assert.match(city.costNote, /national planning range/i);
      assert.doesNotMatch(JSON.stringify(city), /[$€£]\s?\d/);
      assert.ok(city.page);
      assert.ok(city.page.intro.length >= 5);
      assert.equal(city.page.faqs.length, 5);
      assert.ok(`${city.ecosystem} ${city.logistics}`.split(/\s+/).length >= 100);
      const gate = `${city.ecosystem} ${city.page.hospitalDiscussion.join(" ")}`;
      assert.match(gate, /exact live CMS relationships/);
      assert.match(gate, /cards must remain empty/);
      assert.match(gate, /catalog gap/);
      assert.doesNotMatch(gate, /performs \d+|cases per year|24\/7 capability/i);
    }
  }
});

test("uses the exact eight-destination inventory and restrained comparisons", () => {
  for (const article of surgicalOncologyArticles) {
    assert.deepEqual(article.destinations.map((row) => row.country), countries);
    assert.match(JSON.stringify(article.destinations), /\[US_COST\]/);
    for (const destination of article.destinations) {
      assert.ok(destination.stay);
      assert.ok(destination.context.length >= 70);
    }
  }
});

test("uses one national canonical and preserves city procedure routes", () => {
  assert.equal(
    costsFilterPath({
      destination: "India",
      specialty: "Surgical Oncology",
      procedure: "Thyroidectomy for Thyroid Cancer",
    }),
    "/costs/thyroidectomy-for-thyroid-cancer",
  );
  assert.equal(
    costsFilterPath({
      destination: "India",
      city: "Mumbai",
      specialty: "Surgical Oncology",
      procedure: "Lung Cancer Surgery",
    }),
    "/costs/India/Mumbai/Surgical-Oncology/Lung-Cancer-Surgery",
  );
});

test("declares and ships unique descriptive WebP figures for every new guide", () => {
  const directory = join(process.cwd(), "public/images/cost/surgical-oncology");
  const sources = new Set<string>();
  for (const article of surgicalOncologyArticles) {
    assert.equal(article.figures?.length, 3);
    assert.deepEqual(article.figures?.map((figure) => figure.src), [
      `/images/cost/surgical-oncology/${article.slug}-anatomy.webp`,
      `/images/cost/surgical-oncology/${article.slug}-procedure.webp`,
      `/images/cost/surgical-oncology/${article.slug}-recovery.webp`,
    ]);
    for (const figure of article.figures ?? []) {
      assert.ok(figure.alt.length >= 120, `${figure.src}: alt too short`);
      assert.ok(figure.caption, `${figure.src}: missing caption`);
      assert.ok(!sources.has(figure.src));
      sources.add(figure.src);
      const path = join(process.cwd(), "public", figure.src);
      assert.ok(existsSync(path), `missing ${figure.src}`);
      const bytes = readFileSync(path);
      assert.equal(bytes.subarray(0, 4).toString("ascii"), "RIFF");
      assert.equal(bytes.subarray(8, 12).toString("ascii"), "WEBP");
    }
  }
  assert.equal(sources.size, surgicalOncologyArticles.length * 3);
  const files = readdirSync(directory);
  assert.equal(files.length, surgicalOncologyArticles.length * 3);
  assert.ok(files.every((file) => file.endsWith(".webp")));
});

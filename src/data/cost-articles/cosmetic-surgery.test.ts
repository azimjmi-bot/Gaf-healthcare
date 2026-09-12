import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { COSMETIC_PROCEDURES, toSlug } from "../../lib/taxonomy";
import { mapCosmeticProcedures, mapDoctorProcedures } from "../../lib/procedure-map";
import {
  cosmeticSurgeryArticles,
  cosmeticSurgeryArticlesBySlug,
} from "./cosmetic-surgery";
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

const specificity: Record<string, RegExp[]> = {
  Rhinoplasty: [/sept/i, /open or closed/i, /breathing/i],
  Liposuction: [/cannula/i, /subcutaneous/i, /fluid shifts/i],
  "Breast Augmentation": [/implant/i, /capsular contracture/i, /surveillance/i],
  "Tummy Tuck": [/abdominoplasty/i, /fascial/i, /umbilic/i],
  "Breast Reduction": [/pedicle/i, /nipple/i, /breastfeeding/i],
  Facelift: [/SMAS/i, /deep.plane/i, /facial nerve/i],
  "Hair Transplant": [/follicular/i, /donor/i, /graft/i],
  "Breast Lift": [/mastopexy|lift/i, /nipple/i, /Wise.pattern/i],
  Blepharoplasty: [/ocular|eye/i, /lid/i, /vision/i],
  "Gynecomastia Surgery": [/gland/i, /endocrine/i, /hematoma/i],
  "Brazilian Butt Lift": [/subcutaneous.only/i, /fat embolism/i, /gluteal fascia/i],
  "Fat Transfer": [/small aliquots/i, /fat necrosis/i, /retention/i],
  Otoplasty: [/cartilage/i, /antihelical/i, /chondritis/i],
  "Neck Lift": [/platysma/i, /submental/i, /neck swelling/i],
  "Arm Lift": [/brachioplasty/i, /lymphatic/i, /hand swelling/i],
};

test("exports every active Cosmetic Surgery article and slug lookup", () => {
  assert.equal(cosmeticSurgeryArticles.length, 15);
  assert.deepEqual(
    cosmeticSurgeryArticles.map((article) => article.procedure).sort(),
    [...COSMETIC_PROCEDURES].sort(),
  );
  assert.deepEqual(
    cosmeticSurgeryArticles.map((article) => article.slug).sort(),
    COSMETIC_PROCEDURES.map(toSlug).sort(),
  );
  for (const article of cosmeticSurgeryArticles) {
    assert.equal(cosmeticSurgeryArticlesBySlug[article.slug], article);
    assert.equal(getCostArticle(article.slug), article);
  }
});

test("metadata, H1, subtitles and clinical blocks are unique and direct", () => {
  for (const field of ["slug", "seoTitle", "seoDescription", "heading", "heroSubtitle"] as const) {
    assert.equal(
      new Set(cosmeticSurgeryArticles.map((article) => article[field])).size,
      cosmeticSurgeryArticles.length,
      `${field} must be unique`,
    );
  }
  for (const article of cosmeticSurgeryArticles) {
    assert.match(article.heading, /Cost in India/);
    assert.match(article.heroSubtitle ?? "", /\[INDIA_COST\]/);
    assert.match(article.answer.join(" "), /Planning Range ≠ Final Hospital Quotation/);
    assert.match(article.indiaCost.join(" "), /\[INDIA_COST\]/);
    assert.ok(article.costDrivers.length >= 5);
    assert.ok(article.inclusions.length >= 5);
    assert.ok(article.exclusions.length >= 5);
    assert.ok(article.questionsToAsk.length >= 20);
    assert.equal(article.faqs.length, 12);
    assert.equal(new Set(article.questionsToAsk).size, article.questionsToAsk.length);
  }
});

test("all pages use exact country and city inventories without invented city prices", () => {
  for (const article of cosmeticSurgeryArticles) {
    assert.deepEqual(article.destinations.map((row) => row.country), countries);
    assert.deepEqual(article.cities.map((row) => row.citySlug), citySlugs);
    assert.equal(new Set(article.cities.map((row) => JSON.stringify(row.page))).size, 5);
    for (const city of article.cities) {
      assert.equal(city.costRange, undefined);
      assert.equal(city.stay, undefined);
      assert.match(city.costNote, /national planning range/i);
      assert.doesNotMatch(city.costNote, /[$€£]\s?\d/);
      assert.ok(city.page);
      assert.ok(city.page!.intro.length >= 5);
      assert.ok(city.page!.medicalTourism.length >= 3);
      assert.equal(city.page!.faqs.length, 5);
      const gate = `${city.ecosystem} ${city.page!.hospitalDiscussion.join(" ")}`;
      assert.match(gate, /exact live CMS|exact CMS/i);
      assert.match(gate, /cards must remain empty|leave cards empty/i);
      assert.match(gate, /catalog gap/i);
    }
  }
});

test("clinical copy is procedure-specific and medically restrained", () => {
  for (const article of cosmeticSurgeryArticles) {
    const text = JSON.stringify(article);
    for (const expected of specificity[article.procedure]) {
      assert.match(text, expected, `${article.slug}: missing ${expected}`);
    }
    assert.match(text, /individual/i);
    assert.match(text, /realistic/i);
    assert.match(text, /revision/i);
    assert.doesNotMatch(text, /\b\d+(?:\.\d+)?%\b/);
    assert.doesNotMatch(
      text,
      /\bbest (?:doctor|surgeon|hospital|facility)|success rate|100% success|perfect results?\b/i,
    );
  }
});

test("cosmetic mappings require procedure evidence and separate butt from breast augmentation", () => {
  assert.deepEqual(mapDoctorProcedures("Cosmetic Surgery", ["Plastic surgeon"]), []);
  assert.deepEqual(mapCosmeticProcedures(["Butt augmentation"], false), []);
  assert.deepEqual(mapCosmeticProcedures(["Breast augmentation with silicone implants"], false), [
    "Breast Augmentation",
  ]);
});

test("each procedure declares three unique, descriptive WebP figures", () => {
  const allSources = new Set<string>();
  for (const article of cosmeticSurgeryArticles) {
    assert.equal(article.figures?.length, 3);
    assert.deepEqual(article.figures?.map((figure) => figure.after), ["overview", "how", "journey"]);
    assert.deepEqual(
      article.figures?.map((figure) => figure.src),
      [
        `/images/cost/cosmetic-surgery/${article.slug}-anatomy.webp`,
        `/images/cost/cosmetic-surgery/${article.slug}-procedure.webp`,
        `/images/cost/cosmetic-surgery/${article.slug}-recovery.webp`,
      ],
    );
    for (const figure of article.figures ?? []) {
      assert.match(figure.src, /\.webp$/);
      assert.ok(figure.alt.length >= 70);
      assert.ok(!allSources.has(figure.src), `${figure.src} reused across procedures`);
      allSources.add(figure.src);
      assert.ok(existsSync(join(process.cwd(), "public", figure.src)), `missing ${figure.src}`);
    }
  }
  assert.equal(allSources.size, 45);
});

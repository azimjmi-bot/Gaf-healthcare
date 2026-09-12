import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { CARDIAC_SURGERY_PROCEDURES, toSlug } from "../../lib/taxonomy";
import {
  cardiacSurgeryArticles,
  cardiacSurgeryArticlesBySlug,
} from "./cardiac-surgery";
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
  "CABG (Coronary Artery Bypass Grafting)": [/internal thoracic/i, /radial artery/i, /off-pump/i],
  "Heart Valve Replacement": [/mechanical/i, /bioprosthetic|biological|tissue valve/i, /vitamin-K|VKA/i],
  "Heart Valve Repair": [/annuloplasty/i, /chord/i, /conversion to replacement/i],
  "Heart Transplant Surgery": [/allocation/i, /donor/i, /immunosuppression/i],
  "Aortic Root Replacement": [/coronary button/i, /valve-sparing/i, /composite/i],
  "Mitral Valve Repair": [/neochord|artificial chord/i, /systolic anterior motion/i, /annuloplasty/i],
  "Aortic Valve Replacement": [/prosthesis-patient mismatch/i, /mechanical/i, /tissue/i],
  "TAVR/TAVI (Transcatheter Aortic Valve Replacement)": [/Heart Team/i, /transfemoral/i, /pacemaker/i],
  "Aortic Aneurysm Surgery": [/spinal-cord/i, /endovascular/i, /organ protection|visceral protection/i],
  "Minimally Invasive Cardiac Surgery": [/underlying operation/i, /conversion to (full )?sternotomy/i, /mini-thoracotomy/i],
  "Robotic Cardiac Surgery": [/console/i, /bedside/i, /conversion to open/i],
  "LVAD Implantation": [/driveline/i, /controller/i, /bridge to transplant|destination therapy/i],
  "Redo CABG": [/adhesion/i, /re-entry/i, /patent graft/i],
  "Double Valve Replacement": [/two prosthes/i, /two valve/i, /longer bypass/i],
  "Congenital Heart Surgery": [/individual|anatomy-specific/i, /staged/i, /biventricular/i],
};

function completeText(article: (typeof cardiacSurgeryArticles)[number]): string {
  return JSON.stringify(article);
}

test("exports exactly the 15 active Cardiac Surgery articles and slug lookup", () => {
  assert.equal(cardiacSurgeryArticles.length, 15);
  assert.deepEqual(
    cardiacSurgeryArticles.map((article) => article.procedure).sort(),
    [...CARDIAC_SURGERY_PROCEDURES].sort(),
  );
  assert.deepEqual(
    cardiacSurgeryArticles.map((article) => article.slug).sort(),
    CARDIAC_SURGERY_PROCEDURES.map(toSlug).sort(),
  );
  assert.equal(Object.keys(cardiacSurgeryArticlesBySlug).length, cardiacSurgeryArticles.length);
  for (const article of cardiacSurgeryArticles) {
    assert.equal(cardiacSurgeryArticlesBySlug[article.slug], article);
    assert.equal(getCostArticle(article.slug), article);
  }
});

test("metadata, H1s and short hero subtitles are unique and retain catalog tokens", () => {
  for (const field of ["slug", "seoTitle", "seoDescription", "heading", "heroSubtitle"] as const) {
    assert.equal(
      new Set(cardiacSurgeryArticles.map((article) => article[field])).size,
      cardiacSurgeryArticles.length,
      `${field} must be unique`,
    );
  }

  for (const article of cardiacSurgeryArticles) {
    assert.match(article.heading, /Cost in India/);
    assert.match(article.seoDescription, /\[INDIA_COST\]/);
    assert.match(article.heroSubtitle ?? "", /\[INDIA_COST\]/);
    assert.ok((article.heroSubtitle ?? "").length < 500, `${article.slug}: subtitle should stay short`);
    assert.match(article.answer[0], /\[INDIA_COST\]/, `${article.slug}: direct Quick Answer`);
    assert.match(article.indiaCost.join(" "), /\[INDIA_COST\]/);
    assert.doesNotMatch(article.seoTitle, /GAF Healthcare/);
  }
});

test("every article has five materially distinct city overlays without city tariffs", () => {
  for (const article of cardiacSurgeryArticles) {
    assert.deepEqual(
      article.cities.map((city) => city.citySlug),
      citySlugs,
      `${article.slug}: city inventory`,
    );
    const renderedCityCopy = article.cities.map((city) => JSON.stringify(city.page));
    assert.equal(new Set(renderedCityCopy).size, 5, `${article.slug}: city pages must differ`);

    for (const city of article.cities) {
      assert.equal(city.costRange, undefined, `${article.slug}/${city.citySlug}: invented city range`);
      assert.equal(city.stay, undefined, `${article.slug}/${city.citySlug}: invented city stay`);
      assert.ok(city.page, `${article.slug}/${city.citySlug}: missing long-form overlay`);
      assert.match(city.costNote, /\[INDIA_COST\]/);
      assert.doesNotMatch(city.costNote, /\$\s?\d/);
      assert.match(city.page!.subtitle ?? "", /\[INDIA_COST\]/);
      assert.ok(city.page!.intro.length >= 5);
      assert.ok(city.page!.costExplanation.length >= 3);
      assert.ok(city.page!.medicalTourism.length >= 3);
      assert.ok(city.page!.hospitalDiscussion.length >= 2);
      assert.ok(city.page!.faqs.length >= 5);
      assert.match(
        `${city.ecosystem} ${city.page!.hospitalDiscussion.join(" ")}`,
        /exact|exactly|live catalog|live procedure/i,
      );
      assert.match(
        `${city.ecosystem} ${city.page!.hospitalDiscussion.join(" ")}`,
        /remain empty|leave.*empty|cards must remain empty/i,
      );
    }
  }
});

test("every article has exact country coverage and complete planning sections", () => {
  for (const article of cardiacSurgeryArticles) {
    assert.deepEqual(
      article.destinations.map((destination) => destination.country),
      countries,
      `${article.slug}: country inventory`,
    );
    assert.ok(article.costComponents && article.costComponents.length >= 5, `${article.slug}: cost components`);
    assert.ok(article.costDrivers.length >= 5, `${article.slug}: cost drivers`);
    assert.ok(article.inclusions.length >= 5, `${article.slug}: inclusions`);
    assert.ok(article.exclusions.length >= 5, `${article.slug}: exclusions`);
    assert.ok(article.whyIndia && article.whyIndia.length >= 3, `${article.slug}: why India`);
    assert.ok(article.documents.length >= 7, `${article.slug}: patient records`);
    assert.ok(article.journey.length >= 10, `${article.slug}: international journey`);
    assert.ok(article.relatedProcedures.length >= 4, `${article.slug}: related procedures`);
    assert.ok(article.topicSections?.some((section) => /risk|recovery/i.test(section.heading)));
  }
});

test("FAQs and quotation checklists are direct, complete and procedure-specific", () => {
  for (const article of cardiacSurgeryArticles) {
    assert.ok(
      article.faqs.length >= 10 && article.faqs.length <= 15,
      `${article.slug}: expected 10–15 FAQs`,
    );
    assert.ok(article.questionsToAsk.length >= 20, `${article.slug}: expected at least 20 questions`);
    assert.ok(article.questionsToAsk.every((question) => question.endsWith("?")));
    assert.ok(article.faqs.every((faq) => faq.q.endsWith("?") && faq.a.length >= 40));

    const text = completeText(article);
    for (const expected of specificity[article.procedure]) {
      assert.match(text, expected, `${article.slug}: missing ${expected}`);
    }
  }
});

test("TAVR is a catheter-based Heart Team pathway, and valve anticoagulation is responsible", () => {
  const tavr = cardiacSurgeryArticlesBySlug["tavr-tavi-transcatheter-aortic-valve-replacement"];
  const tavrText = completeText(tavr);
  assert.match(tavrText, /catheter/i);
  assert.match(tavrText, /without open-heart|not open surgery/i);
  assert.match(tavrText, /Heart Team/i);
  assert.match(tavrText, /pacemaker/i);

  for (const slug of [
    "heart-valve-replacement",
    "aortic-valve-replacement",
    "double-valve-replacement",
  ]) {
    const text = completeText(cardiacSurgeryArticlesBySlug[slug]);
    assert.match(text, /mechanical/i);
    assert.match(text, /tissue|bioprosthetic|biological/i);
    assert.match(text, /VKA|vitamin-K-antagonist/i);
    assert.match(text, /lifelong/i);
  }
});

test("every article declares the required three WebP figures and each file exists", () => {
  for (const article of cardiacSurgeryArticles) {
    assert.equal(article.figures?.length, 3, `${article.slug}: figure count`);
    assert.deepEqual(
      article.figures?.map((figure) => figure.after),
      ["overview", "how", "journey"],
    );
    assert.equal(
      article.figures?.[0].src,
      `/images/cost/cardiac-surgery/${article.slug}-illustration.webp`,
    );
    assert.equal(
      article.figures?.[1].src,
      "/images/cost/cardiac-surgery/cardiac-surgery-care-pathway.webp",
    );
    assert.equal(
      article.figures?.[2].src,
      "/images/cost/cardiac-surgery/cardiac-surgery-international-journey.webp",
    );

    for (const figure of article.figures ?? []) {
      assert.ok(figure.src.endsWith(".webp"));
      assert.ok(figure.alt.length >= 35);
      assert.ok(
        existsSync(join(process.cwd(), "public", figure.src)),
        `${article.slug}: missing ${figure.src}`,
      );
    }
  }
});

test("copy uses cost tokens and contains no editorial city prices, rankings or outcomes", () => {
  for (const article of cardiacSurgeryArticles) {
    const text = completeText(article);
    assert.match(text, /\[INDIA_COST\]/);
    assert.match(text, /\[US_COST\]/);
    assert.match(text, /\[STAY\]/);
    assert.doesNotMatch(text, /Delhi NCR.{0,80}\$\d|Mumbai.{0,80}\$\d|Bengaluru.{0,80}\$\d|Chennai.{0,80}\$\d|Hyderabad.{0,80}\$\d/i);
    assert.doesNotMatch(text, /\b\d+(?:\.\d+)?%\b/);
    assert.doesNotMatch(text, /\bbest (?:doctor|surgeon|hospital)|success rate|cases per year\b/i);
  }
});



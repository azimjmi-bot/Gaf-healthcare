import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  applyCuratedTreatmentPatch,
  blankCuratedTreatment,
  loadCuratedTreatments,
  normalizeCuratedTreatment,
  publishedCuratedTreatments,
  uniqueCuratedTreatmentSlug,
  validateTreatmentForSave,
} from "@/lib/cms/curated-treatment-store";
import {
  blankTreatmentTranslation,
  type CuratedTreatmentStore,
} from "@/lib/cms/curated-treatment-types";
import { localePathIsPublished } from "@/lib/i18n/locale-publication";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { LOCALES } from "@/lib/i18n/languages";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import {
  splitTreatmentQuickAnswer,
  treatmentBodyLocation,
  treatmentEditorialBody,
  treatmentEditorialBodyForDisplay,
} from "@/lib/curated-treatment-editorial";

test("a curated Treatment stores shared relationships once", () => {
  const treatment = blankCuratedTreatment({ treatments: [] });
  treatment.slug = "gamma-knife-radiosurgery";
  treatment.baseName = "Gamma Knife Radiosurgery";
  treatment.specialtySlug = "radiation-oncology";
  treatment.destinationSlugs = ["india", "singapore", "india"];
  treatment.doctorSlugs = ["doctor-a", "doctor-b"];
  treatment.hospitalSlugs = ["hospital-a"];
  treatment.translations.en = {
    ...blankTreatmentTranslation(),
    status: "published",
    name: "Gamma Knife Radiosurgery",
    shortDescription: "A focused radiosurgery treatment.",
    editorialBody: "## Treatment overview\n\nA patient-focused overview.",
  };
  treatment.translations.ar = {
    ...blankTreatmentTranslation(),
    name: "الجراحة الإشعاعية بسكين غاما",
  };

  const normalized = normalizeCuratedTreatment(treatment);
  assert.deepEqual(normalized.destinationSlugs, ["india", "singapore"]);
  assert.equal(normalized.doctorSlugs.length, 2);
  assert.equal(Object.keys(normalized.translations).length, 2);
  assert.equal(normalized.slug, "gamma-knife-radiosurgery");
});

test("publishing rejects incomplete core and language records", () => {
  const treatment = blankCuratedTreatment({ treatments: [] });
  treatment.status = "published";
  const incomplete = validateTreatmentForSave(treatment);
  assert.ok(incomplete.some((error) => error.includes("Base name")));
  assert.ok(incomplete.some((error) => error.includes("specialty")));
  assert.ok(incomplete.some((error) => error.includes("language version")));

  treatment.baseName = "Gamma Knife Radiosurgery";
  treatment.slug = "gamma-knife-radiosurgery";
  treatment.specialtySlug = "radiation-oncology";
  treatment.translations.en = {
    ...blankTreatmentTranslation(),
    status: "published",
    name: "Gamma Knife Radiosurgery",
    shortDescription: "A focused radiosurgery treatment.",
    editorialBody: "## Treatment overview\n\nA detailed overview for patients.",
  };
  assert.deepEqual(validateTreatmentForSave(treatment), []);
});

test("the published breast cancer page is complete and internally linked", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "breast-cancer-treatment-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.match(body, /\/costs\/India\/Surgical-Oncology\/Lumpectomy/);
  assert.match(body, /\/costs\/India\/Delhi-NCR\/Surgical-Oncology\/Mastectomy/);
  assert.match(body, /\/uploads\/treatments\/breast-cancer-local-vs-systemic\.png/);
  assert.match(body, /\/uploads\/treatments\/breast-cancer-surgery-options\.png/);
  assert.match(body, /\/uploads\/treatments\/breast-cancer-treatment-sequence\.png/);
  assert.match(body, /\/uploads\/treatments\/breast-cancer-international-pathway\.png/);
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(
    /^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm,
  );
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  assert.equal(publishedCuratedTreatments("ar").length, 0);
});

test("the published prostate cancer page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "prostate-cancer-treatment-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$7,000–\$18,000/);
  assert.match(body, /\$1,000–\$6,000\+/);
  assert.match(body, /\$6,500–\$14,500/);
  assert.match(body, /\$1,000–\$4,500/);
  assert.match(body, /\/blogs\/prostate-cancer-treatment-options-india/);
  assert.match(body, /\/blogs\/prostate-cancer-treatment-without-surgery/);
  assert.match(body, /\/blogs\/robotic-prostatectomy-in-india/);
  assert.match(body, /\/blogs\/radiation-therapy-for-prostate-cancer/);
  assert.match(body, /\/blogs\/brachytherapy-for-prostate-cancer/);
  assert.match(body, /\/blogs\/prostate-cancer-diet/);
  assert.match(body, /\/blogs\/prostate-cancer-recurrence-after-surgery/);
  assert.match(body, /\/blogs\/active-surveillance-prostate-cancer/);
  assert.match(body, /\/blogs\/prostate-cancer-diagnosis-psa-mri-biopsy-psma-pet/);
  assert.match(body, /\/blogs\/prostate-cancer-symptoms/);
  assert.match(body, /\/blogs\/gleason-score-grade-group-prostate-cancer/);
  assert.match(body, /\/blogs\/prostate-cancer-stages-1-to-4/);
  assert.match(body, /\/blogs\/lutetium-177-psma-therapy-in-india/);
  assert.match(body, /\/blogs\/psma-pet-scan-for-prostate-cancer/);
  assert.match(body, /\/blogs\/hormone-therapy-for-prostate-cancer/);
  assert.match(body, /\/costs\/India\/Surgical-Oncology\/Radical-Prostatectomy/);
  assert.match(body, /\/costs\/India\/Delhi-NCR\/Surgical-Oncology\/Radical-Prostatectomy/);
  assert.match(body, /\/doctors\/India\/Mumbai\/Surgical-Oncology\/Radical-Prostatectomy/);
  assert.match(body, /\/hospitals\/India\/Bengaluru\/Surgical-Oncology/);
  assert.match(body, /\/uploads\/treatments\/prostate-anatomy-male-pelvis\.webp/);
  assert.match(body, /\/uploads\/treatments\/prostate-cancer-staging-body\.webp/);
  assert.match(body, /\/uploads\/treatments\/prostate-treatment-pathways-body\.webp/);
  assert.match(body, /\/uploads\/treatments\/prostate-radiation-anatomy\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(
    /^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm,
  );
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.equal(qa.quickAnswer?.items.length, 5);
  assert.match(qa.quickAnswer?.items[3]?.answer ?? "", /\$7,000–\$18,000/);
  assert.equal(
    treatmentBodyLocation(treatment.category, treatment.subspecialty, treatment.translations.en!.name),
    "Prostate",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/prostate-cancer-treatment-in-india"),
  );
});

test("the published colon cancer page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "colon-cancer-treatment-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$7,000–\$18,000/);
  assert.match(body, /\$8,000–\$20,000/);
  assert.match(body, /\$1,500–\$8,000\+/);
  assert.match(body, /\$15,000–\$45,000/);
  assert.match(body, /article-quick-answer|Quick Answer: Colon Cancer Treatment in India/);
  assert.match(body, /Stage 0:/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Surgical-Oncology\/Colectomy/);
  assert.match(body, /\/costs\/India\/Delhi-NCR\/Surgical-Oncology\/Colectomy/);
  assert.match(body, /\/costs\/India\/Surgical-Gastroenterology\/Colorectal-Cancer-Surgery/);
  assert.match(body, /\/costs\/India\/Gastroenterology\/Colonoscopy/);
  assert.match(body, /\/costs\/India\/Medical-Oncology\/Immunotherapy/);
  assert.match(body, /\/doctors\/India\/Mumbai\/Surgical-Oncology\/Colectomy/);
  assert.match(body, /\/hospitals\/India\/Bengaluru\/Surgical-Oncology/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Surgical-Oncology/Colectomy",
    "/doctors/India/Mumbai/Surgical-Oncology/Colectomy",
    "/hospitals/India/Bengaluru/Surgical-Oncology",
    "/costs/India/Delhi-NCR/Surgical-Oncology/Colectomy",
    "/costs/India/Surgical-Gastroenterology/Colorectal-Cancer-Surgery",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.match(body, /\/treatments\/prostate-cancer-treatment-in-india/);
  assert.match(body, /\/blogs\/colon-cancer-surgery-in-india/);
  assert.match(body, /\/blogs\/stage-1-colon-cancer-treatment-in-india/);
  assert.match(body, /\/blogs\/stage-2-colon-cancer-treatment-in-india/);
  assert.match(body, /\/blogs\/stage-3-colon-cancer-treatment-in-india/);
  assert.match(body, /\/blogs\/stage-4-colon-cancer-treatment-in-india/);
  assert.match(body, /\/blogs\/colon-cancer-chemotherapy-in-india/);
  assert.match(body, /\/blogs\/colon-cancer-immunotherapy-in-india/);
  assert.match(body, /\/blogs\/colon-cancer-targeted-therapy-in-india/);
  assert.match(body, /\/uploads\/treatments\/colon-anatomy-body\.webp/);
  assert.match(body, /\/uploads\/treatments\/colon-staging-body\.webp/);
  assert.match(body, /\/uploads\/treatments\/colon-surgery-clinic\.webp/);
  assert.match(body, /\/uploads\/treatments\/colon-liver-mets-body\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(
    /^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm,
  );
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.ok((qa.quickAnswer?.items.length ?? 0) >= 1);
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /stage and molecular/i);
  assert.match(qa.quickAnswer?.items[0]?.answer ?? "", /Stage 0:/);
  assert.match(qa.quickAnswer?.items[0]?.answer ?? "", /Stage IV:/);
  assert.equal(
    treatmentBodyLocation(treatment.category, treatment.subspecialty, treatment.translations.en!.name),
    "Colon",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/colon-cancer-treatment-in-india"),
  );
});

test("the published pancreatic cancer page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "pancreatic-cancer-treatment-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$14,000–\$32,000/);
  assert.match(body, /\$9,000–\$22,000/);
  assert.match(body, /\$1,500–\$8,000\+/);
  assert.match(body, /\$15,000–\$45,000/);
  assert.match(body, /article-quick-answer|Quick Answer: Pancreatic Cancer Treatment in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Surgical-Oncology\/Whipple-Procedure/);
  assert.match(body, /\/costs\/India\/Delhi-NCR\/Surgical-Oncology\/Whipple-Procedure/);
  assert.match(body, /\/costs\/India\/Surgical-Gastroenterology\/Whipple-Procedure-\(Pancreaticoduodenectomy\)/);
  assert.match(body, /\/costs\/India\/Surgical-Gastroenterology\/Distal-Pancreatectomy/);
  assert.match(body, /\/costs\/India\/Gastroenterology\/Endoscopic-Ultrasound-\(EUS\)/);
  assert.match(body, /\/costs\/India\/Gastroenterology\/ERCP/);
  assert.match(body, /\/costs\/India\/Medical-Oncology\/Chemotherapy/);
  assert.match(body, /\/doctors\/India\/Mumbai\/Surgical-Oncology\/Whipple-Procedure/);
  assert.match(body, /\/hospitals\/India\/Bengaluru\/Surgical-Oncology/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Surgical-Oncology/Whipple-Procedure",
    "/doctors/India/Mumbai/Surgical-Oncology/Whipple-Procedure",
    "/hospitals/India/Bengaluru/Surgical-Oncology",
    "/costs/India/Delhi-NCR/Surgical-Oncology/Whipple-Procedure",
    "/costs/India/Surgical-Gastroenterology/Whipple-Procedure-(Pancreaticoduodenectomy)",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.match(body, /\/treatments\/colon-cancer-treatment-in-india/);
  assert.match(body, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.match(body, /\/treatments\/prostate-cancer-treatment-in-india/);
  assert.match(body, /\/treatments\/whipple-surgery-in-india/);
  assert.match(body, /\/blogs\/colon-cancer-immunotherapy-in-india/);
  assert.match(body, /\/uploads\/treatments\/pancreas-anatomy-body\.webp/);
  assert.match(body, /\/uploads\/treatments\/pancreas-resectability-body\.webp/);
  assert.match(body, /\/uploads\/treatments\/pancreas-clinic\.webp/);
  assert.match(body, /\/uploads\/treatments\/pancreas-liver-mets-body\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(
    /^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm,
  );
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.equal(qa.quickAnswer?.items.length, 5);
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /What is pancreatic cancer treatment in India/i);
  assert.match(qa.quickAnswer?.items[2]?.answer ?? "", /\$14,000–\$32,000/);
  assert.equal(
    treatmentBodyLocation(treatment.category, treatment.subspecialty, treatment.translations.en!.name),
    "Pancreas",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/pancreatic-cancer-treatment-in-india"),
  );
  const colon = store.treatments.find((row) => row.slug === "colon-cancer-treatment-in-india");
  assert.match(
    colon?.translations.en?.editorialBody ?? "",
    /\/treatments\/pancreatic-cancer-treatment-in-india/,
  );
});

test("the published Whipple surgery page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "whipple-surgery-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$14,000–\$32,000/);
  assert.match(body, /\$9,000–\$22,000/);
  assert.match(body, /\$1,500–\$8,000\+/);
  assert.match(body, /article-quick-answer|Quick Answer: Whipple Surgery in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Surgical-Oncology\/Whipple-Procedure/);
  assert.match(body, /\/costs\/India\/Delhi-NCR\/Surgical-Oncology\/Whipple-Procedure/);
  assert.match(body, /\/costs\/India\/Surgical-Gastroenterology\/Whipple-Procedure-\(Pancreaticoduodenectomy\)/);
  assert.match(body, /\/costs\/India\/Surgical-Gastroenterology\/Distal-Pancreatectomy/);
  assert.match(body, /\/costs\/India\/Gastroenterology\/Endoscopic-Ultrasound-\(EUS\)/);
  assert.match(body, /\/doctors\/India\/Mumbai\/Surgical-Oncology\/Whipple-Procedure/);
  assert.match(body, /\/hospitals\/India\/Bengaluru\/Surgical-Oncology/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Surgical-Oncology/Whipple-Procedure",
    "/doctors/India/Mumbai/Surgical-Oncology/Whipple-Procedure",
    "/hospitals/India/Bengaluru/Surgical-Oncology",
    "/costs/India/Delhi-NCR/Surgical-Oncology/Whipple-Procedure",
    "/costs/India/Surgical-Gastroenterology/Whipple-Procedure-(Pancreaticoduodenectomy)",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.match(body, /\/treatments\/pancreatic-cancer-treatment-in-india/);
  assert.match(body, /\/treatments\/colon-cancer-treatment-in-india/);
  assert.match(body, /\/blogs\/colon-cancer-immunotherapy-in-india/);
  assert.match(body, /\/uploads\/treatments\/whipple-anatomy-body\.webp/);
  assert.match(body, /\/uploads\/treatments\/whipple-resection-organs\.webp/);
  assert.match(body, /\/uploads\/treatments\/whipple-reconstruction\.webp/);
  assert.match(body, /\/uploads\/treatments\/whipple-clinic\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(
    /^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm,
  );
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.equal(qa.quickAnswer?.items.length, 4);
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /What is Whipple surgery/i);
  assert.match(qa.quickAnswer?.items[3]?.answer ?? "", /\$14,000–\$32,000/);
  assert.equal(
    treatmentBodyLocation(treatment.category, treatment.subspecialty, treatment.translations.en!.name),
    "Pancreas",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/whipple-surgery-in-india"));
});

test("the published HIPEC surgery page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "hipec-surgery-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$18,000–\$40,000/);
  assert.match(body, /\$10,000–\$24,000/);
  assert.match(body, /\$1,500–\$8,000\+/);
  assert.match(body, /article-quick-answer|Quick Answer: What Is HIPEC Surgery/);
  assert.match(body, /local emergency department/);
  assert.match(body, /PRODIGE 7/);
  assert.match(body, /Why Choose India for HIPEC Treatment/);
  assert.match(body, /\/costs\/India\/Surgical-Oncology\/Cytoreductive-Surgery-with-HIPEC/);
  assert.match(body, /\/costs\/India\/Delhi-NCR\/Surgical-Oncology\/Cytoreductive-Surgery-with-HIPEC/);
  assert.match(body, /\/costs\/India\/Surgical-Oncology\/Cytoreductive-Surgery/);
  assert.match(body, /\/doctors\/India\/Mumbai\/Surgical-Oncology\/Cytoreductive-Surgery-with-HIPEC/);
  assert.match(body, /\/hospitals\/India\/Bengaluru\/Surgical-Oncology/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC",
    "/doctors/India/Mumbai/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC",
    "/hospitals/India/Bengaluru/Surgical-Oncology",
    "/costs/India/Delhi-NCR/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC",
    "/costs/India/Surgical-Oncology/Cytoreductive-Surgery",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.match(body, /\/treatments\/colon-cancer-treatment-in-india/);
  assert.match(body, /\/treatments\/pancreatic-cancer-treatment-in-india/);
  assert.match(body, /\/blogs\/stage-4-colon-cancer-treatment-in-india/);
  assert.match(body, /\/blogs\/colon-cancer-chemotherapy-in-india/);
  assert.match(body, /\/uploads\/treatments\/hipec-peritoneum-body\.webp/);
  assert.match(body, /\/uploads\/treatments\/hipec-cytoreduction\.webp/);
  assert.match(body, /\/uploads\/treatments\/hipec-heated-chemo\.webp/);
  assert.match(body, /\/uploads\/treatments\/hipec-clinic\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(
    /^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm,
  );
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.ok((qa.quickAnswer?.items.length ?? 0) >= 1);
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /HIPEC surgery is a two-part cancer treatment/i);
  assert.equal(
    treatmentBodyLocation(treatment.category, treatment.subspecialty, treatment.translations.en!.name),
    "Peritoneum",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/hipec-surgery-in-india"));
  const colon = store.treatments.find((row) => row.slug === "colon-cancer-treatment-in-india");
  assert.match(colon?.translations.en?.editorialBody ?? "", /\/treatments\/hipec-surgery-in-india/);
});

test("the published cervical cancer page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "cervical-cancer-treatment-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$5,000–\$12,000/);
  assert.match(body, /\$6,000–\$14,000/);
  assert.match(body, /\$1,000–\$6,000\+/);
  assert.match(body, /\$5,500–\$13,000/);
  assert.match(body, /\$1,500–\$8,000\+/);
  assert.match(body, /\$15,000–\$45,000/);
  assert.match(body, /article-quick-answer|Quick Answer: What is the treatment for cervical cancer in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /KEYNOTE-A18/);
  assert.match(body, /\/costs\/India\/Gynecology\/Gynecologic-Cancer-Surgery/);
  assert.match(body, /\/costs\/India\/Delhi-NCR\/Gynecology\/Gynecologic-Cancer-Surgery/);
  assert.match(body, /\/costs\/India\/Surgical-Oncology\/Radical-Hysterectomy/);
  assert.match(body, /\/costs\/India\/Radiation-Oncology\/Brachytherapy/);
  assert.match(body, /\/costs\/India\/Radiation-Oncology\/IMRT/);
  assert.match(body, /\/costs\/India\/Radiation-Oncology\/EBRT/);
  assert.match(body, /\/doctors\/India\/Mumbai\/Gynecology\/Gynecologic-Cancer-Surgery/);
  assert.match(body, /\/hospitals\/India\/Bengaluru\/Gynecology/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Gynecology/Gynecologic-Cancer-Surgery",
    "/doctors/India/Mumbai/Gynecology/Gynecologic-Cancer-Surgery",
    "/hospitals/India/Bengaluru/Gynecology",
    "/costs/India/Delhi-NCR/Gynecology/Gynecologic-Cancer-Surgery",
    "/costs/India/Surgical-Oncology/Radical-Hysterectomy",
    "/costs/India/Radiation-Oncology/Intracavitary-Brachytherapy",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.match(body, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.match(body, /\/treatments\/hipec-surgery-in-india/);
  assert.match(body, /\/uploads\/treatments\/cervical-anatomy-body\.webp/);
  assert.match(body, /\/uploads\/treatments\/cervical-figo-spread\.webp/);
  assert.match(body, /\/uploads\/treatments\/cervical-brachytherapy\.webp/);
  assert.match(body, /\/uploads\/treatments\/cervical-clinic\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(
    /^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm,
  );
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.ok((qa.quickAnswer?.items.length ?? 0) >= 1);
  assert.match(
    qa.quickAnswer?.items[0]?.question ?? "",
    /What is the treatment for cervical cancer in India/i,
  );
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Cervix",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/cervical-cancer-treatment-in-india"));
  const breast = store.treatments.find((row) => row.slug === "breast-cancer-treatment-in-india");
  assert.match(
    breast?.translations.en?.editorialBody ?? "",
    /\/treatments\/cervical-cancer-treatment-in-india/,
  );
  const hipec = store.treatments.find((row) => row.slug === "hipec-surgery-in-india");
  assert.match(
    hipec?.translations.en?.editorialBody ?? "",
    /\/treatments\/cervical-cancer-treatment-in-india/,
  );
});

test("the published ovarian cancer page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "ovarian-cancer-treatment-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$8,000–\$20,000/);
  assert.match(body, /\$18,000–\$40,000/);
  assert.match(body, /\$1,500–\$8,000\+/);
  assert.match(body, /\$8,000–\$30,000/);
  assert.match(body, /\$2,000–\$7,000/);
  assert.match(
    body,
    /article-quick-answer|Quick Answer: Ovarian Cancer Treatment in India/,
  );
  assert.match(body, /local emergency department/);
  assert.match(body, /OVHIPEC-1/);
  assert.match(body, /\/costs\/India\/Surgical-Oncology\/Ovarian-Cancer-Cytoreductive-Surgery/);
  assert.match(body, /\/costs\/India\/Delhi-NCR\/Surgical-Oncology\/Ovarian-Cancer-Cytoreductive-Surgery/);
  assert.match(body, /\/costs\/India\/Surgical-Oncology\/Cytoreductive-Surgery-with-HIPEC/);
  assert.match(body, /\/costs\/India\/Surgical-Oncology\/PIPAC/);
  assert.match(body, /\/costs\/India\/Medical-Oncology\/Precision-Oncology/);
  assert.match(body, /\/doctors\/India\/Mumbai\/Surgical-Oncology\/Ovarian-Cancer-Cytoreductive-Surgery/);
  assert.match(body, /\/hospitals\/India\/Bengaluru\/Gynecology/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Surgical-Oncology/Ovarian-Cancer-Cytoreductive-Surgery",
    "/doctors/India/Mumbai/Surgical-Oncology/Ovarian-Cancer-Cytoreductive-Surgery",
    "/hospitals/India/Bengaluru/Gynecology",
    "/costs/India/Delhi-NCR/Surgical-Oncology/Ovarian-Cancer-Cytoreductive-Surgery",
    "/costs/India/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC",
    "/costs/India/Medical-Oncology/Precision-Oncology",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.match(body, /\/treatments\/cervical-cancer-treatment-in-india/);
  assert.match(body, /\/treatments\/hipec-surgery-in-india/);
  assert.match(body, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.match(body, /\/uploads\/treatments\/ovarian-anatomy-body\.webp/);
  assert.match(body, /\/uploads\/treatments\/ovarian-peritoneal-spread\.webp/);
  assert.match(body, /\/uploads\/treatments\/ovarian-cytoreduction\.webp/);
  assert.match(body, /\/uploads\/treatments\/ovarian-clinic\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(
    /^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm,
  );
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.ok((qa.quickAnswer?.items.length ?? 0) >= 1);
  assert.match(
    qa.quickAnswer?.items[0]?.question ?? "",
    /Ovarian cancer treatment in India typically involves surgery and chemotherapy/i,
  );
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Ovary",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/ovarian-cancer-treatment-in-india"),
  );
  const cervical = store.treatments.find((row) => row.slug === "cervical-cancer-treatment-in-india");
  assert.match(
    cervical?.translations.en?.editorialBody ?? "",
    /\/treatments\/ovarian-cancer-treatment-in-india/,
  );
  const hipec = store.treatments.find((row) => row.slug === "hipec-surgery-in-india");
  assert.match(
    hipec?.translations.en?.editorialBody ?? "",
    /\/treatments\/ovarian-cancer-treatment-in-india/,
  );
});

test("the published knee replacement page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "knee-replacement-surgery-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$5,500–\$12,000/);
  assert.match(body, /\$7,000–\$15,000/);
  assert.match(body, /\$4,500–\$10,000/);
  assert.match(body, /\$9,000–\$18,000/);
  assert.match(body, /\$6,000–\$13,000/);
  assert.match(body, /4–7 nights/);
  assert.match(
    body,
    /article-quick-answer|Quick Answer: Knee Replacement Surgery in India/,
  );
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Total-Knee-Replacement/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Robotic-Knee-Replacement/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Partial-Knee-Replacement/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Revision-Knee-Replacement/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Total-Hip-Replacement/);
  assert.match(body, /\/blogs\/knee-replacement-surgery-in-india/);
  assert.match(body, /\/uploads\/treatments\/knee-oa-anatomy\.webp/);
  assert.match(body, /\/uploads\/treatments\/knee-tkr-implants\.webp/);
  assert.match(body, /\/uploads\/treatments\/knee-robotic\.webp/);
  assert.match(body, /\/uploads\/treatments\/knee-physio\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Orthopedics/Total-Knee-Replacement",
    "/doctors/India/Mumbai/Orthopedics/Total-Knee-Replacement",
    "/doctors/India/Bengaluru/Orthopedics/Total-Knee-Replacement",
    "/doctors/India/Chennai/Orthopedics/Total-Knee-Replacement",
    "/doctors/India/Hyderabad/Orthopedics/Total-Knee-Replacement",
    "/hospitals/India/Delhi-NCR/Orthopedics",
    "/hospitals/India/Mumbai/Orthopedics",
    "/hospitals/India/Bengaluru/Orthopedics",
    "/costs/India/Delhi-NCR/Orthopedics/Total-Knee-Replacement",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(
    /^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm,
  );
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.ok((qa.quickAnswer?.items.length ?? 0) >= 8);
  assert.match(
    qa.quickAnswer?.items[0]?.question ?? "",
    /Knee replacement surgery in India is a procedure that replaces damaged knee joint surfaces/i,
  );
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Knee",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/knee-replacement-surgery-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.match(body, /\/treatments\/hip-replacement-surgery-in-india/);
});

test("the published hip replacement page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "hip-replacement-surgery-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$6,000–\$13,000/);
  assert.match(body, /\$10,000–\$20,000/);
  assert.match(body, /\$6,500–\$14,000/);
  assert.match(body, /\$5,500–\$12,000/);
  assert.match(body, /\$7,000–\$15,000/);
  assert.match(body, /\$4,500–\$10,000/);
  assert.match(body, /\$9,000–\$18,000/);
  assert.match(body, /4–7 nights/);
  assert.match(
    body,
    /article-quick-answer|Quick Answer: Hip Replacement Surgery in India/,
  );
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Total-Hip-Replacement/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Revision-Hip-Replacement/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Hip-Resurfacing/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Total-Knee-Replacement/);
  assert.match(body, /\/treatments\/knee-replacement-surgery-in-india/);
  assert.match(body, /\/uploads\/treatments\/hip-oa-anatomy\.webp/);
  assert.match(body, /\/uploads\/treatments\/hip-thr-implants\.webp/);
  assert.match(body, /\/uploads\/treatments\/hip-avn\.webp/);
  assert.match(body, /\/uploads\/treatments\/hip-physio\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Orthopedics/Total-Hip-Replacement",
    "/doctors/India/Mumbai/Orthopedics/Total-Hip-Replacement",
    "/doctors/India/Bengaluru/Orthopedics/Total-Hip-Replacement",
    "/doctors/India/Chennai/Orthopedics/Total-Hip-Replacement",
    "/doctors/India/Hyderabad/Orthopedics/Total-Hip-Replacement",
    "/hospitals/India/Delhi-NCR/Orthopedics",
    "/hospitals/India/Mumbai/Orthopedics",
    "/hospitals/India/Bengaluru/Orthopedics",
    "/costs/India/Delhi-NCR/Orthopedics/Total-Hip-Replacement",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(
    /^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm,
  );
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.ok((qa.quickAnswer?.items.length ?? 0) >= 8);
  assert.match(
    qa.quickAnswer?.items[0]?.question ?? "",
    /Hip replacement surgery in India is a procedure that replaces damaged portions of the hip joint/i,
  );
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Hip",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/hip-replacement-surgery-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/hip-replacement-surgery/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/hip-replacement-surgery-in-india/);
});

test("the published ACL surgery page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "acl-surgery-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$2,500–\$6,500/);
  assert.match(body, /\$1,800–\$4,500/);
  assert.match(body, /\$3,000–\$7,500/);
  assert.match(body, /\$2,000–\$5,500/);
  assert.match(body, /\$5,500–\$12,000/);
  assert.match(body, /1–3 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: ACL Surgery in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Orthopedics\/ACL-Reconstruction-\(Anterior-Cruciate-Ligament\)/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Meniscus-Repair/);
  assert.match(body, /\/costs\/India\/Orthopedics\/PCL-Reconstruction-\(Posterior-Cruciate-Ligament\)/);
  assert.match(body, /\/treatments\/knee-replacement-surgery-in-india/);
  assert.match(body, /\/treatments\/hip-replacement-surgery-in-india/);
  assert.match(body, /\/uploads\/treatments\/acl-tear-anatomy\.webp/);
  assert.match(body, /\/uploads\/treatments\/acl-graft-tunnels\.webp/);
  assert.match(body, /\/uploads\/treatments\/acl-graft-options\.webp/);
  assert.match(body, /\/uploads\/treatments\/acl-physio\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Orthopedics/ACL-Reconstruction-(Anterior-Cruciate-Ligament)",
    "/doctors/India/Mumbai/Orthopedics/ACL-Reconstruction-(Anterior-Cruciate-Ligament)",
    "/doctors/India/Bengaluru/Orthopedics/ACL-Reconstruction-(Anterior-Cruciate-Ligament)",
    "/doctors/India/Chennai/Orthopedics/ACL-Reconstruction-(Anterior-Cruciate-Ligament)",
    "/doctors/India/Hyderabad/Orthopedics/ACL-Reconstruction-(Anterior-Cruciate-Ligament)",
    "/hospitals/India/Delhi-NCR/Orthopedics",
    "/hospitals/India/Mumbai/Orthopedics",
    "/hospitals/India/Bengaluru/Orthopedics",
    "/costs/India/Delhi-NCR/Orthopedics/ACL-Reconstruction-(Anterior-Cruciate-Ligament)",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(/^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm);
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.ok((qa.quickAnswer?.items.length ?? 0) >= 8);
  assert.match(
    qa.quickAnswer?.items[0]?.question ?? "",
    /ACL surgery in India usually involves arthroscopic reconstruction/i,
  );
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Knee",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/acl-surgery-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/acl-surgery\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/acl-surgery-in-india/);
  const knee = store.treatments.find((row) => row.slug === "knee-replacement-surgery-in-india");
  assert.match(
    knee?.translations.en?.editorialBody ?? "",
    /\/treatments\/acl-surgery-in-india/,
  );
});

test("the published knee arthroscopy page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "knee-arthroscopy-surgery-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$2,000–\$5,500/);
  assert.match(body, /\$1,800–\$4,500/);
  assert.match(body, /\$2,500–\$6,500/);
  assert.match(body, /\$3,000–\$7,500/);
  assert.match(body, /\$5,500–\$12,000/);
  assert.match(body, /outpatient or 1–2 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: What Is Knee Arthroscopy/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Arthroscopic-Surgery/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Meniscus-Repair/);
  assert.match(body, /\/costs\/India\/Orthopedics\/ACL-Reconstruction-\(Anterior-Cruciate-Ligament\)/);
  assert.match(body, /\/costs\/India\/Orthopedics\/PCL-Reconstruction-\(Posterior-Cruciate-Ligament\)/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Total-Knee-Replacement/);
  assert.match(body, /\/treatments\/acl-surgery-in-india/);
  assert.match(body, /\/treatments\/knee-replacement-surgery-in-india/);
  assert.match(body, /\/treatments\/hip-replacement-surgery-in-india/);
  assert.match(body, /\/uploads\/treatments\/arthro-meniscus-tear\.webp/);
  assert.match(body, /\/uploads\/treatments\/arthro-portals\.webp/);
  assert.match(body, /\/uploads\/treatments\/arthro-loose-body\.webp/);
  assert.match(body, /\/uploads\/treatments\/arthro-physio\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Orthopedics/Arthroscopic-Surgery",
    "/doctors/India/Mumbai/Orthopedics/Arthroscopic-Surgery",
    "/doctors/India/Bengaluru/Orthopedics/Arthroscopic-Surgery",
    "/doctors/India/Chennai/Orthopedics/Arthroscopic-Surgery",
    "/doctors/India/Hyderabad/Orthopedics/Arthroscopic-Surgery",
    "/hospitals/India/Delhi-NCR/Orthopedics",
    "/hospitals/India/Mumbai/Orthopedics",
    "/hospitals/India/Bengaluru/Orthopedics",
    "/costs/India/Delhi-NCR/Orthopedics/Arthroscopic-Surgery",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(/^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm);
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.ok((qa.quickAnswer?.items.length ?? 0) >= 8);
  assert.match(
    qa.quickAnswer?.items[0]?.question ?? "",
    /Knee arthroscopy is keyhole surgery of the knee/i,
  );
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Knee",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/knee-arthroscopy-surgery-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/knee-arthroscopy/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(
    llms,
    /https:\/\/gaf\.healthcare\/treatments\/knee-arthroscopy-surgery-in-india/,
  );
  const acl = store.treatments.find((row) => row.slug === "acl-surgery-in-india");
  assert.match(
    acl?.translations.en?.editorialBody ?? "",
    /\/treatments\/knee-arthroscopy-surgery-in-india/,
  );
  const knee = store.treatments.find(
    (row) => row.slug === "knee-replacement-surgery-in-india",
  );
  assert.match(
    knee?.translations.en?.editorialBody ?? "",
    /\/treatments\/knee-arthroscopy-surgery-in-india/,
  );
});

test("the published hip arthroscopy page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "hip-arthroscopy-surgery-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$2,000–\$5,500/);
  assert.match(body, /\$6,000–\$13,000/);
  assert.match(body, /\$6,500–\$14,000/);
  assert.match(body, /\$10,000–\$30,000/);
  assert.match(body, /outpatient or 1–2 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Hip Arthroscopy Surgery in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Arthroscopic-Surgery/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Total-Hip-Replacement/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Hip-Resurfacing/);
  assert.match(body, /\/treatments\/hip-replacement-surgery-in-india/);
  assert.match(body, /\/treatments\/knee-arthroscopy-surgery-in-india/);
  assert.match(body, /\/treatments\/acl-surgery-in-india/);
  assert.match(body, /\/uploads\/treatments\/hip-fai-cam\.webp/);
  assert.match(body, /\/uploads\/treatments\/hip-labral-tear\.webp/);
  assert.match(body, /\/uploads\/treatments\/hip-arthro-portals\.webp/);
  assert.match(body, /\/uploads\/treatments\/hip-arthro-physio\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Orthopedics/Arthroscopic-Surgery",
    "/doctors/India/Mumbai/Orthopedics/Arthroscopic-Surgery",
    "/doctors/India/Bengaluru/Orthopedics/Arthroscopic-Surgery",
    "/doctors/India/Chennai/Orthopedics/Arthroscopic-Surgery",
    "/doctors/India/Hyderabad/Orthopedics/Arthroscopic-Surgery",
    "/hospitals/India/Delhi-NCR/Orthopedics",
    "/hospitals/India/Mumbai/Orthopedics",
    "/hospitals/India/Bengaluru/Orthopedics",
    "/costs/India/Delhi-NCR/Orthopedics/Arthroscopic-Surgery",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(/^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm);
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.ok((qa.quickAnswer?.items.length ?? 0) >= 8);
  assert.match(
    qa.quickAnswer?.items[0]?.question ?? "",
    /Hip arthroscopy surgery in India is a minimally invasive procedure/i,
  );
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Hip",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/hip-arthroscopy-surgery-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/hip-arthroscopy/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(
    llms,
    /https:\/\/gaf\.healthcare\/treatments\/hip-arthroscopy-surgery-in-india/,
  );
  const hip = store.treatments.find((row) => row.slug === "hip-replacement-surgery-in-india");
  assert.match(
    hip?.translations.en?.editorialBody ?? "",
    /\/treatments\/hip-arthroscopy-surgery-in-india/,
  );
  const kneeArthro = store.treatments.find(
    (row) => row.slug === "knee-arthroscopy-surgery-in-india",
  );
  assert.match(
    kneeArthro?.translations.en?.editorialBody ?? "",
    /\/treatments\/hip-arthroscopy-surgery-in-india/,
  );
});

test("the published shoulder arthroscopy page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "shoulder-arthroscopy-surgery-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$2,000–\$5,500/);
  assert.match(body, /\$2,800–\$7,000/);
  assert.match(body, /\$6,000–\$13,000/);
  assert.match(body, /\$15,000–\$40,000/);
  assert.match(body, /outpatient or 1–2 nights/);
  assert.match(body, /1–3 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: What Is Shoulder Arthroscopy/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Arthroscopic-Surgery/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Rotator-Cuff-Repair/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Shoulder-Replacement/);
  assert.match(body, /\/treatments\/knee-arthroscopy-surgery-in-india/);
  assert.match(body, /\/treatments\/hip-arthroscopy-surgery-in-india/);
  assert.match(body, /\/treatments\/acl-surgery-in-india/);
  assert.match(body, /\/uploads\/treatments\/shoulder-cuff-tear\.webp/);
  assert.match(body, /\/uploads\/treatments\/shoulder-labral-tear\.webp/);
  assert.match(body, /\/uploads\/treatments\/shoulder-arthro-portals\.webp/);
  assert.match(body, /\/uploads\/treatments\/shoulder-arthro-physio\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Orthopedics/Rotator-Cuff-Repair",
    "/doctors/India/Mumbai/Orthopedics/Rotator-Cuff-Repair",
    "/doctors/India/Bengaluru/Orthopedics/Rotator-Cuff-Repair",
    "/doctors/India/Chennai/Orthopedics/Rotator-Cuff-Repair",
    "/doctors/India/Hyderabad/Orthopedics/Rotator-Cuff-Repair",
    "/doctors/India/Delhi-NCR/Orthopedics/Arthroscopic-Surgery",
    "/hospitals/India/Delhi-NCR/Orthopedics",
    "/hospitals/India/Mumbai/Orthopedics",
    "/hospitals/India/Bengaluru/Orthopedics",
    "/costs/India/Delhi-NCR/Orthopedics/Rotator-Cuff-Repair",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(/^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm);
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.ok((qa.quickAnswer?.items.length ?? 0) >= 8);
  assert.match(
    qa.quickAnswer?.items[0]?.question ?? "",
    /Shoulder arthroscopy is keyhole surgery of the shoulder joint/i,
  );
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Shoulder",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/shoulder-arthroscopy-surgery-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/shoulder-arthroscopy/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(
    llms,
    /https:\/\/gaf\.healthcare\/treatments\/shoulder-arthroscopy-surgery-in-india/,
  );
  const kneeArthro = store.treatments.find(
    (row) => row.slug === "knee-arthroscopy-surgery-in-india",
  );
  assert.match(
    kneeArthro?.translations.en?.editorialBody ?? "",
    /\/treatments\/shoulder-arthroscopy-surgery-in-india/,
  );
  const hipArthro = store.treatments.find(
    (row) => row.slug === "hip-arthroscopy-surgery-in-india",
  );
  assert.match(
    hipArthro?.translations.en?.editorialBody ?? "",
    /\/treatments\/shoulder-arthroscopy-surgery-in-india/,
  );
});

test("the published limb lengthening page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "limb-lengthening-surgery-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$12,000–\$28,000/);
  assert.match(body, /\$10,000–\$25,000/);
  assert.match(body, /\$4,500–\$13,000/);
  assert.match(body, /\$5,000–\$14,000/);
  assert.match(body, /\$2,500–\$8,000/);
  assert.match(body, /\$50,000–\$150,000/);
  assert.match(body, /7–14 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Limb Lengthening Surgery in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Pediatric-Orthopaedic\/Limb-Lengthening-Surgery/);
  assert.match(body, /\/costs\/India\/Pediatric-Orthopaedic\/Limb-Reconstruction-Surgery/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Non-Union-Repair/);
  assert.match(body, /\/treatments\/knee-replacement-surgery-in-india/);
  assert.match(body, /\/treatments\/hip-replacement-surgery-in-india/);
  assert.match(body, /\/treatments\/acl-surgery-in-india/);
  assert.match(body, /\/uploads\/treatments\/limb-lengthening-distraction\.webp/);
  assert.match(body, /\/uploads\/treatments\/limb-lengthening-nail\.webp/);
  assert.match(body, /\/uploads\/treatments\/limb-lengthening-frame\.webp/);
  assert.match(body, /\/uploads\/treatments\/limb-lengthening-physio\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Pediatric-Orthopaedic/Limb-Lengthening-Surgery",
    "/doctors/India/Mumbai/Pediatric-Orthopaedic/Limb-Lengthening-Surgery",
    "/doctors/India/Bengaluru/Pediatric-Orthopaedic/Limb-Lengthening-Surgery",
    "/doctors/India/Chennai/Pediatric-Orthopaedic/Limb-Lengthening-Surgery",
    "/doctors/India/Hyderabad/Pediatric-Orthopaedic/Limb-Lengthening-Surgery",
    "/doctors/India/Delhi-NCR/Orthopedics/Limb-Lengthening-Surgery",
    "/hospitals/India/Delhi-NCR/Pediatric-Orthopaedic",
    "/hospitals/India/Mumbai/Pediatric-Orthopaedic",
    "/hospitals/India/Bengaluru/Pediatric-Orthopaedic",
    "/costs/India/Delhi-NCR/Pediatric-Orthopaedic/Limb-Lengthening-Surgery",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(/^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm);
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.ok((qa.quickAnswer?.items.length ?? 0) >= 8);
  assert.match(
    qa.quickAnswer?.items[0]?.question ?? "",
    /Limb lengthening surgery in India is an advanced orthopaedic procedure/i,
  );
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Lower Limb",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/limb-lengthening-surgery-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/limb-lengthening/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(
    llms,
    /https:\/\/gaf\.healthcare\/treatments\/limb-lengthening-surgery-in-india/,
  );
  const hip = store.treatments.find(
    (row) => row.slug === "hip-replacement-surgery-in-india",
  );
  assert.match(
    hip?.translations.en?.editorialBody ?? "",
    /\/treatments\/limb-lengthening-surgery-in-india/,
  );
  const knee = store.treatments.find(
    (row) => row.slug === "knee-replacement-surgery-in-india",
  );
  assert.match(
    knee?.translations.en?.editorialBody ?? "",
    /\/treatments\/limb-lengthening-surgery-in-india/,
  );
});

test("the published tendon repair page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "tendon-repair-surgery-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$1,500–\$5,000/);
  assert.match(body, /\$2,000–\$6,000/);
  assert.match(body, /\$2,800–\$7,000/);
  assert.match(body, /\$3,500–\$10,000/);
  assert.match(body, /\$8,000–\$22,000/);
  assert.match(body, /outpatient or 1–2 nights/);
  assert.match(body, /1–3 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Tendon Repair Surgery in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Tendon-Repair/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Achilles-Repair/);
  assert.match(body, /\/costs\/India\/Orthopedics\/Rotator-Cuff-Repair/);
  assert.match(body, /\/treatments\/shoulder-arthroscopy-surgery-in-india/);
  assert.match(body, /\/treatments\/acl-surgery-in-india/);
  assert.match(body, /\/treatments\/limb-lengthening-surgery-in-india/);
  assert.match(body, /\/uploads\/treatments\/tendon-flexor-laceration\.webp/);
  assert.match(body, /\/uploads\/treatments\/tendon-achilles-rupture\.webp/);
  assert.match(body, /\/uploads\/treatments\/tendon-biceps-avulsion\.webp/);
  assert.match(body, /\/uploads\/treatments\/tendon-physio-splint\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Orthopedics/Tendon-Repair",
    "/doctors/India/Mumbai/Orthopedics/Tendon-Repair",
    "/doctors/India/Bengaluru/Orthopedics/Tendon-Repair",
    "/doctors/India/Chennai/Orthopedics/Tendon-Repair",
    "/doctors/India/Hyderabad/Orthopedics/Tendon-Repair",
    "/doctors/India/Delhi-NCR/Orthopedics/Achilles-Repair",
    "/hospitals/India/Delhi-NCR/Orthopedics",
    "/hospitals/India/Mumbai/Orthopedics",
    "/hospitals/India/Bengaluru/Orthopedics",
    "/costs/India/Delhi-NCR/Orthopedics/Tendon-Repair",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(/^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm);
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.ok((qa.quickAnswer?.items.length ?? 0) >= 8);
  assert.match(
    qa.quickAnswer?.items[0]?.question ?? "",
    /Tendon repair surgery in India is a procedure used to reconnect/i,
  );
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Tendon",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/tendon-repair-surgery-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/tendon-repair/);
  assert.doesNotMatch(body, /\/treatments\/tendon-repair-surgery\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(
    llms,
    /https:\/\/gaf\.healthcare\/treatments\/tendon-repair-surgery-in-india/,
  );
  const shoulder = store.treatments.find(
    (row) => row.slug === "shoulder-arthroscopy-surgery-in-india",
  );
  assert.match(
    shoulder?.translations.en?.editorialBody ?? "",
    /\/treatments\/tendon-repair-surgery-in-india/,
  );
  const limb = store.treatments.find(
    (row) => row.slug === "limb-lengthening-surgery-in-india",
  );
  assert.match(
    limb?.translations.en?.editorialBody ?? "",
    /\/treatments\/tendon-repair-surgery-in-india/,
  );
});

test("the published craniotomy page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "craniotomy-surgery-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$6,000–\$15,000/);
  assert.match(body, /\$7,000–\$16,000/);
  assert.match(body, /\$6,500–\$15,000/);
  assert.match(body, /\$8,000–\$20,000/);
  assert.match(body, /\$8,000–\$22,000/);
  assert.match(body, /\$5,000–\$12,000/);
  assert.match(body, /\$2,000–\$6,000/);
  assert.match(body, /\$8,000–\$18,000/);
  assert.match(body, /\$10,000–\$25,000/);
  assert.match(body, /\$8,500–\$18,000/);
  assert.match(body, /\$10,500–\$22,000/);
  assert.match(body, /\$50,000–\$150,000/);
  assert.match(body, /5–10 nights/);
  assert.match(body, /5–12 nights/);
  assert.match(body, /7–14 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Craniotomy Surgery in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Neurosurgery\/Brain-Tumor-Surgery/);
  assert.match(body, /\/costs\/India\/Neurosurgery\/Glioma-Surgery/);
  assert.match(body, /\/costs\/India\/Neurosurgery\/Meningioma-Surgery/);
  assert.match(body, /\/costs\/India\/Neurosurgery\/Aneurysm-Clipping/);
  assert.match(body, /\/costs\/India\/Neurosurgery\/AVM-Surgery/);
  assert.match(body, /\/costs\/India\/Radiation-Oncology\/Gamma-Knife/);
  assert.match(body, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.match(body, /\/treatments\/colon-cancer-treatment-in-india/);
  assert.match(body, /\/uploads\/treatments\/craniotomy-bone-flap\.webp/);
  assert.match(body, /\/uploads\/treatments\/craniotomy-meningioma\.webp/);
  assert.match(body, /\/uploads\/treatments\/craniotomy-aneurysm\.webp/);
  assert.match(body, /\/uploads\/treatments\/craniotomy-recovery\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Neurosurgery/Brain-Tumor-Surgery",
    "/doctors/India/Mumbai/Neurosurgery/Brain-Tumor-Surgery",
    "/doctors/India/Bengaluru/Neurosurgery/Brain-Tumor-Surgery",
    "/doctors/India/Chennai/Neurosurgery/Brain-Tumor-Surgery",
    "/doctors/India/Hyderabad/Neurosurgery/Brain-Tumor-Surgery",
    "/doctors/India/Delhi-NCR/Neurosurgery/Aneurysm-Clipping",
    "/hospitals/India/Delhi-NCR/Neurosurgery",
    "/hospitals/India/Mumbai/Neurosurgery",
    "/hospitals/India/Bengaluru/Neurosurgery",
    "/costs/India/Delhi-NCR/Neurosurgery/Brain-Tumor-Surgery",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(/^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm);
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.ok((qa.quickAnswer?.items.length ?? 0) >= 8);
  assert.match(
    qa.quickAnswer?.items[0]?.question ?? "",
    /Craniotomy surgery in India is a major neurosurgical procedure/i,
  );
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Brain",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/craniotomy-surgery-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/craniotomy/);
  assert.doesNotMatch(body, /\/treatments\/craniotomy-surgery\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(
    llms,
    /https:\/\/gaf\.healthcare\/treatments\/craniotomy-surgery-in-india/,
  );
  const breast = store.treatments.find(
    (row) => row.slug === "breast-cancer-treatment-in-india",
  );
  assert.match(
    breast?.translations.en?.editorialBody ?? "",
    /\/treatments\/craniotomy-surgery-in-india/,
  );
  const colon = store.treatments.find(
    (row) => row.slug === "colon-cancer-treatment-in-india",
  );
  assert.match(
    colon?.translations.en?.editorialBody ?? "",
    /\/treatments\/craniotomy-surgery-in-india/,
  );
});

test("the published brain tumor page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "brain-tumor-surgery-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$6,000–\$15,000/);
  assert.match(body, /\$7,000–\$16,000/);
  assert.match(body, /\$6,500–\$15,000/);
  assert.match(body, /\$5,000–\$12,000/);
  assert.match(body, /\$2,000–\$6,000/);
  assert.match(body, /\$8,000–\$22,000/);
  assert.match(body, /\$1,000–\$6,000\+/);
  assert.match(body, /\$1,500–\$8,000\+/);
  assert.match(body, /\$8,500–\$18,000/);
  assert.match(body, /\$10,500–\$22,000/);
  assert.match(body, /\$8,000–\$30,000/);
  assert.match(body, /\$50,000–\$150,000/);
  assert.match(body, /5–10 nights/);
  assert.match(body, /5–12 nights/);
  assert.match(body, /1–3 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Brain Tumor Surgery in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Neurosurgery\/Brain-Tumor-Surgery/);
  assert.match(body, /\/costs\/India\/Neurosurgery\/Glioma-Surgery/);
  assert.match(body, /\/costs\/India\/Neurosurgery\/Meningioma-Surgery/);
  assert.match(body, /\/costs\/India\/Neurosurgery\/Pituitary-Tumor-Surgery/);
  assert.match(body, /\/costs\/India\/Neurosurgery\/Stereotactic-Brain-Biopsy/);
  assert.match(body, /\/treatments\/craniotomy-surgery-in-india/);
  assert.match(body, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.match(body, /\/treatments\/colon-cancer-treatment-in-india/);
  assert.match(body, /\/uploads\/treatments\/brain-tumor-glioma\.webp/);
  assert.match(body, /\/uploads\/treatments\/brain-tumor-meningioma\.webp/);
  assert.match(body, /\/uploads\/treatments\/brain-tumor-awake-mapping\.webp/);
  assert.match(body, /\/uploads\/treatments\/brain-tumor-biopsy\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Neurosurgery/Brain-Tumor-Surgery",
    "/doctors/India/Mumbai/Neurosurgery/Brain-Tumor-Surgery",
    "/doctors/India/Bengaluru/Neurosurgery/Brain-Tumor-Surgery",
    "/doctors/India/Chennai/Neurosurgery/Brain-Tumor-Surgery",
    "/doctors/India/Hyderabad/Neurosurgery/Brain-Tumor-Surgery",
    "/doctors/India/Delhi-NCR/Neurosurgery/Glioma-Surgery",
    "/hospitals/India/Delhi-NCR/Neurosurgery",
    "/hospitals/India/Mumbai/Neurosurgery",
    "/hospitals/India/Bengaluru/Neurosurgery",
    "/costs/India/Delhi-NCR/Neurosurgery/Brain-Tumor-Surgery",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(/^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm);
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.ok((qa.quickAnswer?.items.length ?? 0) >= 8);
  assert.match(
    qa.quickAnswer?.items[0]?.question ?? "",
    /What is brain tumor surgery\?/i,
  );
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Brain",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/brain-tumor-surgery-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/brain-tumor/);
  assert.doesNotMatch(body, /\/treatments\/brain-tumor-surgery\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(
    llms,
    /https:\/\/gaf\.healthcare\/treatments\/brain-tumor-surgery-in-india/,
  );
  const craniotomy = store.treatments.find(
    (row) => row.slug === "craniotomy-surgery-in-india",
  );
  assert.match(
    craniotomy?.translations.en?.editorialBody ?? "",
    /\/treatments\/brain-tumor-surgery-in-india/,
  );
  const breast = store.treatments.find(
    (row) => row.slug === "breast-cancer-treatment-in-india",
  );
  assert.match(
    breast?.translations.en?.editorialBody ?? "",
    /\/treatments\/brain-tumor-surgery-in-india/,
  );
  const colon = store.treatments.find(
    (row) => row.slug === "colon-cancer-treatment-in-india",
  );
  assert.match(
    colon?.translations.en?.editorialBody ?? "",
    /\/treatments\/brain-tumor-surgery-in-india/,
  );
});

test("the published spine tumor page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "spine-tumor-surgery-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$10,000–\$24,000/);
  assert.match(body, /\$4,000–\$9,500/);
  assert.match(body, /\$8,000–\$18,000/);
  assert.match(body, /\$2,500–\$6,500/);
  assert.match(body, /\$3,000–\$7,500/);
  assert.match(body, /\$8,000–\$17,500/);
  assert.match(body, /\$50,000–\$150,000/);
  assert.match(body, /5–12 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Spine Tumor Surgery in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Spine-Surgery\/Spinal-Tumor-Surgery/);
  assert.match(body, /\/costs\/India\/Spine-Surgery\/Laminectomy/);
  assert.match(body, /\/costs\/India\/Spine-Surgery\/Spinal-Fusion/);
  assert.match(body, /\/treatments\/brain-tumor-surgery-in-india/);
  assert.match(body, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.match(body, /\/treatments\/colon-cancer-treatment-in-india/);
  assert.match(body, /\/treatments\/prostate-cancer-treatment-in-india/);
  assert.match(body, /\/uploads\/treatments\/spine-tumor-vertebral-mets\.webp/);
  assert.match(body, /\/uploads\/treatments\/spine-tumor-schwannoma\.webp/);
  assert.match(body, /\/uploads\/treatments\/spine-tumor-instrumentation\.webp/);
  assert.match(body, /\/uploads\/treatments\/spine-tumor-recovery\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Spine-Surgery/Spinal-Tumor-Surgery",
    "/doctors/India/Mumbai/Spine-Surgery/Spinal-Tumor-Surgery",
    "/doctors/India/Bengaluru/Spine-Surgery/Spinal-Tumor-Surgery",
    "/doctors/India/Chennai/Spine-Surgery/Spinal-Tumor-Surgery",
    "/doctors/India/Hyderabad/Spine-Surgery/Spinal-Tumor-Surgery",
    "/doctors/India/Delhi-NCR/Neurosurgery/Spinal-Tumor-Surgery",
    "/hospitals/India/Delhi-NCR/Spine-Surgery",
    "/hospitals/India/Mumbai/Spine-Surgery",
    "/hospitals/India/Bengaluru/Spine-Surgery",
    "/costs/India/Delhi-NCR/Spine-Surgery/Spinal-Tumor-Surgery",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(/^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm);
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.ok((qa.quickAnswer?.items.length ?? 0) >= 8);
  assert.match(
    qa.quickAnswer?.items[0]?.question ?? "",
    /What is spine tumor surgery\?/i,
  );
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Spine",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/spine-tumor-surgery-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/spine-tumor/);
  assert.doesNotMatch(body, /\/treatments\/spine-tumor-surgery\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(
    llms,
    /https:\/\/gaf\.healthcare\/treatments\/spine-tumor-surgery-in-india/,
  );
  const brain = store.treatments.find(
    (row) => row.slug === "brain-tumor-surgery-in-india",
  );
  assert.match(
    brain?.translations.en?.editorialBody ?? "",
    /\/treatments\/spine-tumor-surgery-in-india/,
  );
  const breast = store.treatments.find(
    (row) => row.slug === "breast-cancer-treatment-in-india",
  );
  assert.match(
    breast?.translations.en?.editorialBody ?? "",
    /\/treatments\/spine-tumor-surgery-in-india/,
  );
  const colon = store.treatments.find(
    (row) => row.slug === "colon-cancer-treatment-in-india",
  );
  assert.match(
    colon?.translations.en?.editorialBody ?? "",
    /\/treatments\/spine-tumor-surgery-in-india/,
  );
  const prostate = store.treatments.find(
    (row) => row.slug === "prostate-cancer-treatment-in-india",
  );
  assert.match(
    prostate?.translations.en?.editorialBody ?? "",
    /\/treatments\/spine-tumor-surgery-in-india/,
  );
});

test("the published endoscopic brain page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "endoscopic-brain-surgery-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$5,000–\$12,000/);
  assert.match(body, /\$6,000–\$15,000/);
  assert.match(body, /\$3,000–\$8,000/);
  assert.match(body, /\$8,000–\$22,000/);
  assert.match(body, /\$30,000–\$80,000/);
  assert.match(body, /3–7 nights/);
  assert.match(body, /4–8 nights/);
  assert.match(body, /2–5 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: What is Endoscopic Brain Surgery/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Neurosurgery\/Endoscopic-Brain-Surgery/);
  assert.match(body, /\/costs\/India\/Neurosurgery\/Endoscopic-Skull-Base-Surgery/);
  assert.match(body, /\/costs\/India\/Neurosurgery\/Pituitary-Tumor-Surgery/);
  assert.match(body, /\/costs\/India\/Neurosurgery\/Endoscopic-Third-Ventriculostomy-\(ETV\)/);
  assert.match(body, /\/costs\/India\/ENT\/Skull-Base-Surgery/);
  assert.match(body, /\/treatments\/brain-tumor-surgery-in-india/);
  assert.match(body, /\/treatments\/craniotomy-surgery-in-india/);
  assert.match(body, /\/treatments\/spine-tumor-surgery-in-india/);
  assert.match(body, /\/uploads\/treatments\/endoscopic-brain-endonasal\.webp/);
  assert.match(body, /\/uploads\/treatments\/endoscopic-brain-pituitary\.webp/);
  assert.match(body, /\/uploads\/treatments\/endoscopic-brain-etv\.webp/);
  assert.match(body, /\/uploads\/treatments\/endoscopic-brain-recovery\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Neurosurgery/Endoscopic-Brain-Surgery",
    "/doctors/India/Mumbai/Neurosurgery/Endoscopic-Brain-Surgery",
    "/doctors/India/Bengaluru/Neurosurgery/Endoscopic-Brain-Surgery",
    "/doctors/India/Chennai/Neurosurgery/Endoscopic-Brain-Surgery",
    "/doctors/India/Hyderabad/Neurosurgery/Endoscopic-Brain-Surgery",
    "/doctors/India/Delhi-NCR/Neurosurgery/Pituitary-Tumor-Surgery",
    "/hospitals/India/Delhi-NCR/Neurosurgery",
    "/hospitals/India/Mumbai/Neurosurgery",
    "/hospitals/India/Bengaluru/Neurosurgery",
    "/costs/India/Delhi-NCR/Neurosurgery/Endoscopic-Brain-Surgery",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(/^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm);
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.ok((qa.quickAnswer?.items.length ?? 0) >= 8);
  assert.match(
    qa.quickAnswer?.items[0]?.question ?? "",
    /What is endoscopic brain surgery\?/i,
  );
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Brain",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/endoscopic-brain-surgery-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/endoscopic-brain/);
  assert.doesNotMatch(body, /\/treatments\/endoscopic-brain-surgery-india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(
    llms,
    /https:\/\/gaf\.healthcare\/treatments\/endoscopic-brain-surgery-in-india/,
  );
  const brain = store.treatments.find(
    (row) => row.slug === "brain-tumor-surgery-in-india",
  );
  assert.match(
    brain?.translations.en?.editorialBody ?? "",
    /\/treatments\/endoscopic-brain-surgery-in-india/,
  );
  const craniotomy = store.treatments.find(
    (row) => row.slug === "craniotomy-surgery-in-india",
  );
  assert.match(
    craniotomy?.translations.en?.editorialBody ?? "",
    /\/treatments\/endoscopic-brain-surgery-in-india/,
  );
});

test("Save recreates a missing Treatment instead of 404ing", () => {
  const store: CuratedTreatmentStore = { treatments: [] };
  const id = "099c61a5-a4e5-4227-9711-500eb3636730";
  const { treatment, created, errors } = applyCuratedTreatmentPatch(store, id, {
    baseName: "Breast Cancer Treatment in India",
    slug: "breast-cancer-treatment-in-india",
    specialtySlug: "surgical-oncology",
    status: "published",
  });
  assert.equal(created, true);
  assert.equal(treatment.id, id);
  assert.equal(treatment.status, "draft");
  assert.equal(treatment.translations.en?.name, "Breast Cancer Treatment in India");
  assert.equal(store.treatments[0]?.id, id);
  assert.ok(
    errors.some((error) => error.includes("Publish at least one language version")),
  );
});

test("the unified editor preserves legacy structured editorial content", () => {
  const translation = {
    ...blankTreatmentTranslation(),
    fullDescription: "Introductory context.",
    overview: "Existing overview.",
    recovery: "Existing recovery guidance.",
  };
  const migrated = treatmentEditorialBody(translation, "en");
  assert.match(migrated, /^Introductory context\./);
  assert.match(migrated, /## Treatment Overview\n\nExisting overview\./);
  assert.match(migrated, /## Recovery\n\nExisting recovery guidance\./);

  translation.editorialBody = "## One article\n\nNew editorial copy.";
  assert.equal(
    treatmentEditorialBody(translation, "en"),
    translation.editorialBody,
  );
});

test("the public article removes a duplicate leading Treatment title", () => {
  const translation = {
    ...blankTreatmentTranslation(),
    name: "Breast Cancer Treatment in India",
    editorialBody:
      "# Breast Cancer Treatment in India\n\n## Treatment overview\n\nPatient guidance.",
  };
  assert.equal(
    treatmentEditorialBodyForDisplay(translation, "en"),
    "## Treatment overview\n\nPatient guidance.",
  );

  translation.editorialBody =
    "## A different clinical heading\n\nDistinct content.";
  assert.equal(
    treatmentEditorialBodyForDisplay(translation, "en"),
    translation.editorialBody,
  );
});

test("slug uniqueness covers current and historical canonical slugs", () => {
  const treatment = blankCuratedTreatment({ treatments: [] });
  treatment.slug = "ivf";
  treatment.previousSlugs = ["in-vitro-fertilisation"];
  const store = { treatments: [treatment] };
  assert.equal(uniqueCuratedTreatmentSlug(store, "ivf"), "ivf-2");
  assert.equal(
    uniqueCuratedTreatmentSlug(store, "in-vitro-fertilisation"),
    "in-vitro-fertilisation-2",
  );
});

test("Treatment directory is canonical but no filter or combination routes exist", () => {
  for (const locale of LOCALES) {
    // The directory is only live where something is published in it. English
    // keeps its index; a target locale with an empty store 404s rather than
    // serving an empty shell.
    const directoryLive = locale === "en" || publishedCuratedTreatments(locale).length > 0;
    assert.equal(localePathIsPublished(locale, "/treatments"), directoryLive);
    assert.equal(
      localePathIsPublished(locale, "/treatments/india/cardiology/ivf"),
      false,
    );
    const entries = buildLocaleSitemap(locale);
    const directoryUrl =
      locale === "en"
        ? "https://gaf.healthcare/treatments"
        : `https://gaf.healthcare/${locale}/treatments`;
    assert.equal(
      entries.filter((entry) => entry.url === directoryUrl).length,
      directoryLive ? 1 : 0,
    );
    assert.ok(
      entries.every(
        (entry) =>
          !entry.url.includes("?") &&
          !entry.url.match(/\/treatments\/[^/]+\/[^/]+/),
      ),
    );
  }
});

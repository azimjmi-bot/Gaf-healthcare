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

test("the published pituitary tumor page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "pituitary-tumor-surgery-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$5,000–\$12,000/);
  assert.match(body, /\$6,000–\$15,000/);
  assert.match(body, /\$8,000–\$22,000/);
  assert.match(body, /\$10,500–\$22,000/);
  assert.match(body, /\$8,500–\$18,000/);
  assert.match(body, /\$40,000–\$100,000/);
  assert.match(body, /3–7 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Pituitary Tumor Surgery in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Neurosurgery\/Pituitary-Tumor-Surgery/);
  assert.match(body, /\/costs\/India\/Neurosurgery\/Endoscopic-Brain-Surgery/);
  assert.match(body, /\/costs\/India\/Radiation-Oncology\/Gamma-Knife/);
  assert.match(body, /\/treatments\/endoscopic-brain-surgery-in-india/);
  assert.match(body, /\/treatments\/brain-tumor-surgery-in-india/);
  assert.match(body, /\/treatments\/craniotomy-surgery-in-india/);
  assert.match(body, /\/uploads\/treatments\/pituitary-tumor-macroadenoma\.webp/);
  assert.match(body, /\/uploads\/treatments\/pituitary-tumor-endonasal\.webp/);
  assert.match(body, /\/uploads\/treatments\/pituitary-tumor-visual-field\.webp/);
  assert.match(body, /\/uploads\/treatments\/pituitary-tumor-recovery\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Neurosurgery/Pituitary-Tumor-Surgery",
    "/doctors/India/Mumbai/Neurosurgery/Pituitary-Tumor-Surgery",
    "/doctors/India/Bengaluru/Neurosurgery/Pituitary-Tumor-Surgery",
    "/doctors/India/Chennai/Neurosurgery/Pituitary-Tumor-Surgery",
    "/doctors/India/Hyderabad/Neurosurgery/Pituitary-Tumor-Surgery",
    "/doctors/India/Delhi-NCR/Neurosurgery/Endoscopic-Brain-Surgery",
    "/hospitals/India/Delhi-NCR/Neurosurgery",
    "/hospitals/India/Mumbai/Neurosurgery",
    "/hospitals/India/Bengaluru/Neurosurgery",
    "/costs/India/Delhi-NCR/Neurosurgery/Pituitary-Tumor-Surgery",
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
    /What is pituitary tumor surgery\?/i,
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
    english.includes("https://gaf.healthcare/treatments/pituitary-tumor-surgery-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/pituitary/);
  assert.doesNotMatch(body, /\/treatments\/pituitary-tumor-surgery\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(
    llms,
    /https:\/\/gaf\.healthcare\/treatments\/pituitary-tumor-surgery-in-india/,
  );
  const endoscopic = store.treatments.find(
    (row) => row.slug === "endoscopic-brain-surgery-in-india",
  );
  assert.match(
    endoscopic?.translations.en?.editorialBody ?? "",
    /\/treatments\/pituitary-tumor-surgery-in-india/,
  );
  const brain = store.treatments.find(
    (row) => row.slug === "brain-tumor-surgery-in-india",
  );
  assert.match(
    brain?.translations.en?.editorialBody ?? "",
    /\/treatments\/pituitary-tumor-surgery-in-india/,
  );
  const craniotomy = store.treatments.find(
    (row) => row.slug === "craniotomy-surgery-in-india",
  );
  assert.match(
    craniotomy?.translations.en?.editorialBody ?? "",
    /\/treatments\/pituitary-tumor-surgery-in-india/,
  );
});

test("the published hydrocephalus page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "hydrocephalus-surgery-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$3,000–\$8,000/);
  assert.match(body, /\$5,000–\$12,000/);
  assert.match(body, /\$6,000–\$15,000/);
  assert.match(body, /\$20,000–\$50,000/);
  assert.match(body, /3–7 nights/);
  assert.match(body, /2–5 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Hydrocephalus Surgery in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Neurosurgery\/Hydrocephalus-Surgery/);
  assert.match(
    body,
    /\/costs\/India\/Neurosurgery\/Endoscopic-Third-Ventriculostomy-\(ETV\)/,
  );
  assert.match(body, /\/treatments\/endoscopic-brain-surgery-in-india/);
  assert.match(body, /\/treatments\/brain-tumor-surgery-in-india/);
  assert.match(body, /\/treatments\/craniotomy-surgery-in-india/);
  assert.match(body, /\/treatments\/spine-tumor-surgery-in-india/);
  assert.match(body, /\/uploads\/treatments\/hydrocephalus-ventricles\.webp/);
  assert.match(body, /\/uploads\/treatments\/hydrocephalus-vp-shunt\.webp/);
  assert.match(body, /\/uploads\/treatments\/hydrocephalus-etv\.webp/);
  assert.match(body, /\/uploads\/treatments\/hydrocephalus-recovery\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Neurosurgery/Hydrocephalus-Surgery",
    "/doctors/India/Mumbai/Neurosurgery/Hydrocephalus-Surgery",
    "/doctors/India/Bengaluru/Neurosurgery/Hydrocephalus-Surgery",
    "/doctors/India/Chennai/Neurosurgery/Hydrocephalus-Surgery",
    "/doctors/India/Hyderabad/Neurosurgery/Hydrocephalus-Surgery",
    "/doctors/India/Delhi-NCR/Neurosurgery/Endoscopic-Brain-Surgery",
    "/hospitals/India/Delhi-NCR/Neurosurgery",
    "/hospitals/India/Mumbai/Neurosurgery",
    "/hospitals/India/Bengaluru/Neurosurgery",
    "/costs/India/Delhi-NCR/Neurosurgery/Hydrocephalus-Surgery",
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
    /What is hydrocephalus surgery\?/i,
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
    english.includes("https://gaf.healthcare/treatments/hydrocephalus-surgery-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/hydrocephalus/);
  assert.doesNotMatch(body, /\/treatments\/hydrocephalus-surgery\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(
    llms,
    /https:\/\/gaf\.healthcare\/treatments\/hydrocephalus-surgery-in-india/,
  );
  const endoscopic = store.treatments.find(
    (row) => row.slug === "endoscopic-brain-surgery-in-india",
  );
  assert.match(
    endoscopic?.translations.en?.editorialBody ?? "",
    /\/treatments\/hydrocephalus-surgery-in-india/,
  );
  const brain = store.treatments.find(
    (row) => row.slug === "brain-tumor-surgery-in-india",
  );
  assert.match(
    brain?.translations.en?.editorialBody ?? "",
    /\/treatments\/hydrocephalus-surgery-in-india/,
  );
  const craniotomy = store.treatments.find(
    (row) => row.slug === "craniotomy-surgery-in-india",
  );
  assert.match(
    craniotomy?.translations.en?.editorialBody ?? "",
    /\/treatments\/hydrocephalus-surgery-in-india/,
  );
  const spine = store.treatments.find(
    (row) => row.slug === "spine-tumor-surgery-in-india",
  );
  assert.match(
    spine?.translations.en?.editorialBody ?? "",
    /\/treatments\/hydrocephalus-surgery-in-india/,
  );
});

test("the published coronary angioplasty page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "coronary-angioplasty-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$3,200–\$8,500/);
  assert.match(body, /\$400–\$1,200/);
  assert.match(body, /\$5,500–\$14,000/);
  assert.match(body, /\$25,000–\$70,000/);
  assert.match(body, /1–3 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Coronary Angioplasty in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Cardiology\/Coronary-Angioplasty-Stenting/);
  assert.match(body, /\/costs\/India\/Cardiology\/Coronary-Angiography/);
  assert.match(
    body,
    /\/costs\/India\/Cardiology\/CTO-Angioplasty-\(Chronic-Total-Occlusion\)/,
  );
  assert.match(
    body,
    /\/costs\/India\/Cardiac-Surgery\/CABG-\(Coronary-Artery-Bypass-Grafting\)/,
  );
  assert.match(body, /\/uploads\/treatments\/coronary-angioplasty-plaque\.webp/);
  assert.match(body, /\/uploads\/treatments\/coronary-angioplasty-balloon\.webp/);
  assert.match(body, /\/uploads\/treatments\/coronary-angioplasty-stent\.webp/);
  assert.match(body, /\/uploads\/treatments\/coronary-angioplasty-radial\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Cardiology/Coronary-Angioplasty-Stenting",
    "/doctors/India/Mumbai/Cardiology/Coronary-Angioplasty-Stenting",
    "/doctors/India/Bengaluru/Cardiology/Coronary-Angioplasty-Stenting",
    "/doctors/India/Chennai/Cardiology/Coronary-Angioplasty-Stenting",
    "/doctors/India/Hyderabad/Cardiology/Coronary-Angioplasty-Stenting",
    "/hospitals/India/Delhi-NCR/Cardiology",
    "/hospitals/India/Mumbai/Cardiology",
    "/hospitals/India/Bengaluru/Cardiology",
    "/costs/India/Delhi-NCR/Cardiology/Coronary-Angioplasty-Stenting",
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
    /What is coronary angioplasty\?/i,
  );
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Heart",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/coronary-angioplasty-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/coronary/);
  assert.doesNotMatch(body, /\/treatments\/coronary-angioplasty\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(
    llms,
    /https:\/\/gaf\.healthcare\/treatments\/coronary-angioplasty-in-india/,
  );
});

test("the published pacemaker page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "pacemaker-implantation-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$3,500–\$9,000/);
  assert.match(body, /\$12,000–\$25,000/);
  assert.match(body, /\$10,000–\$22,000/);
  assert.match(body, /\$8,000–\$18,000/);
  assert.match(body, /\$20,000–\$50,000/);
  assert.match(body, /1–3 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Pacemaker Implantation in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Cardiology\/Pacemaker-Implantation/);
  assert.match(body, /\/costs\/India\/Cardiology\/Leadless-Pacemaker-Implantation/);
  assert.match(body, /\/costs\/India\/Cardiology\/CRT-CRT-D-Implantation/);
  assert.match(
    body,
    /\/costs\/India\/Cardiology\/ICD-Implantation-\(Implantable-Cardioverter-Defibrillator\)/,
  );
  assert.match(body, /\/treatments\/coronary-angioplasty-in-india/);
  assert.match(body, /\/uploads\/treatments\/pacemaker-conduction\.webp/);
  assert.match(body, /\/uploads\/treatments\/pacemaker-dual-chamber\.webp/);
  assert.match(body, /\/uploads\/treatments\/pacemaker-leadless\.webp/);
  assert.match(body, /\/uploads\/treatments\/pacemaker-followup\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Cardiology/Pacemaker-Implantation",
    "/doctors/India/Mumbai/Cardiology/Pacemaker-Implantation",
    "/doctors/India/Bengaluru/Cardiology/Pacemaker-Implantation",
    "/doctors/India/Chennai/Cardiology/Pacemaker-Implantation",
    "/doctors/India/Hyderabad/Cardiology/Pacemaker-Implantation",
    "/hospitals/India/Delhi-NCR/Cardiology",
    "/hospitals/India/Mumbai/Cardiology",
    "/hospitals/India/Bengaluru/Cardiology",
    "/costs/India/Delhi-NCR/Cardiology/Pacemaker-Implantation",
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
    /What is a pacemaker\?/i,
  );
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Heart",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/pacemaker-implantation-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/pacemaker/);
  assert.doesNotMatch(body, /\/treatments\/pacemaker-implantation\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(
    llms,
    /https:\/\/gaf\.healthcare\/treatments\/pacemaker-implantation-in-india/,
  );
  const pci = store.treatments.find(
    (row) => row.slug === "coronary-angioplasty-in-india",
  );
  assert.match(
    pci?.translations.en?.editorialBody ?? "",
    /\/treatments\/pacemaker-implantation-in-india/,
  );
});

test("the published ICD page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "icd-device-implantation-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$8,000–\$18,000/);
  assert.match(body, /\$3,500–\$9,000/);
  assert.match(body, /\$12,000–\$25,000/);
  assert.match(body, /\$10,000–\$22,000/);
  assert.match(body, /\$3,200–\$8,500/);
  assert.match(body, /\$40,000–\$100,000/);
  assert.match(body, /1–4 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: ICD Implantation in India/);
  assert.match(body, /local emergency department/);
  assert.match(
    body,
    /\/costs\/India\/Cardiology\/ICD-Implantation-\(Implantable-Cardioverter-Defibrillator\)/,
  );
  assert.match(body, /\/costs\/India\/Cardiology\/Pacemaker-Implantation/);
  assert.match(body, /\/costs\/India\/Cardiology\/Leadless-Pacemaker-Implantation/);
  assert.match(body, /\/costs\/India\/Cardiology\/CRT-CRT-D-Implantation/);
  assert.match(body, /\/treatments\/pacemaker-implantation-in-india/);
  assert.match(body, /\/treatments\/coronary-angioplasty-in-india/);
  assert.match(body, /\/uploads\/treatments\/icd-ventricular-arrhythmia\.webp/);
  assert.match(body, /\/uploads\/treatments\/icd-transvenous\.webp/);
  assert.match(body, /\/uploads\/treatments\/icd-subcutaneous\.webp/);
  assert.match(body, /\/uploads\/treatments\/icd-interrogation\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Cardiology/ICD-Implantation-(Implantable-Cardioverter-Defibrillator)",
    "/doctors/India/Mumbai/Cardiology/ICD-Implantation-(Implantable-Cardioverter-Defibrillator)",
    "/doctors/India/Bengaluru/Cardiology/ICD-Implantation-(Implantable-Cardioverter-Defibrillator)",
    "/doctors/India/Chennai/Cardiology/ICD-Implantation-(Implantable-Cardioverter-Defibrillator)",
    "/doctors/India/Hyderabad/Cardiology/ICD-Implantation-(Implantable-Cardioverter-Defibrillator)",
    "/hospitals/India/Delhi-NCR/Cardiology",
    "/hospitals/India/Mumbai/Cardiology",
    "/hospitals/India/Bengaluru/Cardiology",
    "/costs/India/Delhi-NCR/Cardiology/ICD-Implantation-(Implantable-Cardioverter-Defibrillator)",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /What is an ICD\?/i);
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Heart",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/icd-device-implantation-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/icd/);
  assert.doesNotMatch(body, /\/treatments\/icd-device-implantation\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(
    llms,
    /https:\/\/gaf\.healthcare\/treatments\/icd-device-implantation-in-india/,
  );
  const pacemaker = store.treatments.find(
    (row) => row.slug === "pacemaker-implantation-in-india",
  );
  assert.match(
    pacemaker?.translations.en?.editorialBody ?? "",
    /\/treatments\/icd-device-implantation-in-india/,
  );
});

test("the published TAVR page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "tavr-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$18,000–\$42,000/);
  assert.match(body, /\$7,000–\$18,500/);
  assert.match(body, /\$7,000–\$18,000/);
  assert.match(body, /\$3,200–\$8,500/);
  assert.match(body, /\$3,500–\$9,000/);
  assert.match(body, /\$5,500–\$14,000/);
  assert.match(body, /\$50,000–\$150,000/);
  assert.match(body, /3–7 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: TAVR in India/);
  assert.match(body, /local emergency department/);
  assert.match(
    body,
    /\/costs\/India\/Cardiac-Surgery\/TAVR-TAVI-\(Transcatheter-Aortic-Valve-Replacement\)/,
  );
  assert.match(body, /\/costs\/India\/Cardiac-Surgery\/Aortic-Valve-Replacement/);
  assert.match(body, /\/treatments\/pacemaker-implantation-in-india/);
  assert.match(body, /\/treatments\/coronary-angioplasty-in-india/);
  assert.match(body, /\/treatments\/icd-device-implantation-in-india/);
  assert.match(body, /\/uploads\/treatments\/tavr-aortic-stenosis\.webp/);
  assert.match(body, /\/uploads\/treatments\/tavr-transfemoral\.webp/);
  assert.match(body, /\/uploads\/treatments\/tavr-valve-types\.webp/);
  assert.match(body, /\/uploads\/treatments\/tavr-ct-planning\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Cardiology/TAVR-TAVI-(Transcatheter-Aortic-Valve-Replacement)",
    "/doctors/India/Mumbai/Cardiology/TAVR-TAVI-(Transcatheter-Aortic-Valve-Replacement)",
    "/doctors/India/Bengaluru/Cardiology/TAVR-TAVI-(Transcatheter-Aortic-Valve-Replacement)",
    "/doctors/India/Chennai/Cardiology/TAVR-TAVI-(Transcatheter-Aortic-Valve-Replacement)",
    "/doctors/India/Hyderabad/Cardiology/TAVR-TAVI-(Transcatheter-Aortic-Valve-Replacement)",
    "/hospitals/India/Delhi-NCR/Cardiac-Surgery",
    "/hospitals/India/Mumbai/Cardiac-Surgery",
    "/hospitals/India/Bengaluru/Cardiac-Surgery",
    "/costs/India/Delhi-NCR/Cardiac-Surgery/TAVR-TAVI-(Transcatheter-Aortic-Valve-Replacement)",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /What is TAVR\?/i);
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Heart",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/tavr-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/tavr/);
  assert.doesNotMatch(body, /\/treatments\/tavr\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/tavr-in-india/);
  const pacemaker = store.treatments.find(
    (row) => row.slug === "pacemaker-implantation-in-india",
  );
  assert.match(pacemaker?.translations.en?.editorialBody ?? "", /\/treatments\/tavr-in-india/);
  const pci = store.treatments.find((row) => row.slug === "coronary-angioplasty-in-india");
  assert.match(pci?.translations.en?.editorialBody ?? "", /\/treatments\/tavr-in-india/);
});

test("the published BAV page uses neighbouring USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "aortic-balloon-valvuloplasty-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /no separate GAF/);
  assert.match(body, /\$18,000–\$42,000/);
  assert.match(body, /\$7,000–\$18,500/);
  assert.match(body, /\$7,000–\$18,000/);
  assert.match(body, /\$4,000–\$10,000/);
  assert.match(body, /\$3,200–\$8,500/);
  assert.match(body, /\$3,500–\$9,000/);
  assert.match(body, /\$50,000–\$150,000/);
  assert.match(body, /article-quick-answer|Quick Answer: Aortic Balloon Valvuloplasty in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/treatments\/tavr-in-india/);
  assert.match(body, /\/treatments\/coronary-angioplasty-in-india/);
  assert.match(
    body,
    /\/costs\/India\/Cardiac-Surgery\/TAVR-TAVI-\(Transcatheter-Aortic-Valve-Replacement\)/,
  );
  assert.match(body, /\/costs\/India\/Cardiac-Surgery\/Aortic-Valve-Replacement/);
  assert.match(body, /\/costs\/India\/Cardiology\/Balloon-Mitral-Valvotomy/);
  assert.match(body, /\/uploads\/treatments\/bav-aortic-stenosis\.webp/);
  assert.match(body, /\/uploads\/treatments\/bav-balloon-inflation\.webp/);
  assert.match(body, /\/uploads\/treatments\/bav-vs-tavr\.webp/);
  assert.match(body, /\/uploads\/treatments\/bav-bridge-pathway\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Cardiology/TAVR-TAVI-(Transcatheter-Aortic-Valve-Replacement)",
    "/doctors/India/Mumbai/Cardiology/TAVR-TAVI-(Transcatheter-Aortic-Valve-Replacement)",
    "/doctors/India/Bengaluru/Cardiology/TAVR-TAVI-(Transcatheter-Aortic-Valve-Replacement)",
    "/doctors/India/Chennai/Cardiology/TAVR-TAVI-(Transcatheter-Aortic-Valve-Replacement)",
    "/doctors/India/Hyderabad/Cardiology/TAVR-TAVI-(Transcatheter-Aortic-Valve-Replacement)",
    "/hospitals/India/Delhi-NCR/Cardiac-Surgery",
    "/hospitals/India/Mumbai/Cardiac-Surgery",
    "/hospitals/India/Bengaluru/Cardiac-Surgery",
    "/costs/India/Delhi-NCR/Cardiac-Surgery/TAVR-TAVI-(Transcatheter-Aortic-Valve-Replacement)",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /medical name/i);
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Heart",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/aortic-balloon-valvuloplasty-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/aortic-balloon/);
  assert.doesNotMatch(body, /\/treatments\/aortic-balloon-valvuloplasty\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(
    llms,
    /https:\/\/gaf\.healthcare\/treatments\/aortic-balloon-valvuloplasty-in-india/,
  );
  const tavr = store.treatments.find((row) => row.slug === "tavr-in-india");
  assert.match(
    tavr?.translations.en?.editorialBody ?? "",
    /\/treatments\/aortic-balloon-valvuloplasty-in-india/,
  );
});

test("the published rhinoplasty page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "rhinoplasty-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$2,500–\$5,500/);
  assert.match(body, /\$8,000–\$18,000/);
  assert.match(body, /\$1,500–\$3,800/);
  assert.match(body, /\$4,000–\$9,500/);
  assert.match(body, /\$3,500–\$7,800/);
  assert.match(body, /\$2,000–\$5,200/);
  assert.match(body, /\$2,000–\$5,000/);
  assert.match(body, /1–3 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Rhinoplasty in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Rhinoplasty/);
  assert.match(body, /\/costs\/India\/ENT\/Septoplasty/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Facelift/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Blepharoplasty/);
  assert.match(body, /\/uploads\/treatments\/rhinoplasty-anatomy\.webp/);
  assert.match(body, /\/uploads\/treatments\/rhinoplasty-open-closed\.webp/);
  assert.match(body, /\/uploads\/treatments\/rhinoplasty-hump-tip\.webp/);
  assert.match(body, /\/uploads\/treatments\/rhinoplasty-recovery\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Cosmetic-Surgery/Rhinoplasty",
    "/doctors/India/Mumbai/Cosmetic-Surgery/Rhinoplasty",
    "/doctors/India/Bengaluru/Cosmetic-Surgery/Rhinoplasty",
    "/doctors/India/Chennai/Cosmetic-Surgery/Rhinoplasty",
    "/doctors/India/Hyderabad/Cosmetic-Surgery/Rhinoplasty",
    "/hospitals/India/Delhi-NCR/Cosmetic-Surgery",
    "/hospitals/India/Mumbai/Cosmetic-Surgery",
    "/hospitals/India/Bengaluru/Cosmetic-Surgery",
    "/costs/India/Delhi-NCR/Cosmetic-Surgery/Rhinoplasty",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /What is rhinoplasty\?/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Nose",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/rhinoplasty-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/rhinoplasty/);
  assert.doesNotMatch(body, /\/treatments\/rhinoplasty\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/rhinoplasty-in-india/);
});

test("the published blepharoplasty page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "blepharoplasty-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$1,500–\$3,800/);
  assert.match(body, /\$4,000–\$9,000/);
  assert.match(body, /\$2,500–\$5,500/);
  assert.match(body, /\$4,000–\$9,500/);
  assert.match(body, /\$1,200–\$4,000/);
  assert.match(body, /\$1,500–\$5,000/);
  assert.match(body, /\$2,000–\$5,500/);
  assert.match(body, /day-care or overnight/);
  assert.match(body, /article-quick-answer|Quick Answer: Blepharoplasty in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Blepharoplasty/);
  assert.match(body, /\/costs\/India\/Ophthalmology\/Oculoplastic-Surgery/);
  assert.match(body, /\/treatments\/rhinoplasty-in-india/);
  assert.match(body, /\/uploads\/treatments\/blepharoplasty-anatomy\.webp/);
  assert.match(body, /\/uploads\/treatments\/blepharoplasty-incisions\.webp/);
  assert.match(body, /\/uploads\/treatments\/blepharoplasty-vs-ptosis\.webp/);
  assert.match(body, /\/uploads\/treatments\/blepharoplasty-recovery\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Cosmetic-Surgery/Blepharoplasty",
    "/doctors/India/Mumbai/Cosmetic-Surgery/Blepharoplasty",
    "/doctors/India/Bengaluru/Cosmetic-Surgery/Blepharoplasty",
    "/doctors/India/Chennai/Cosmetic-Surgery/Blepharoplasty",
    "/doctors/India/Hyderabad/Cosmetic-Surgery/Blepharoplasty",
    "/hospitals/India/Delhi-NCR/Cosmetic-Surgery",
    "/hospitals/India/Mumbai/Cosmetic-Surgery",
    "/hospitals/India/Bengaluru/Cosmetic-Surgery",
    "/costs/India/Delhi-NCR/Cosmetic-Surgery/Blepharoplasty",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /medical name/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Eyelid",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/blepharoplasty-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/blepharoplasty/);
  assert.doesNotMatch(body, /\/treatments\/blepharoplasty\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/blepharoplasty-in-india/);
  const rhino = store.treatments.find((row) => row.slug === "rhinoplasty-in-india");
  assert.match(
    rhino?.translations.en?.editorialBody ?? "",
    /\/treatments\/blepharoplasty-in-india/,
  );
});

test("the published liposuction page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "liposuction-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$1,500–\$4,200/);
  assert.match(body, /\$4,000–\$12,000/);
  assert.match(body, /\$3,500–\$7,200/);
  assert.match(body, /\$2,000–\$5,500/);
  assert.match(body, /\$1,800–\$4,200/);
  assert.match(body, /\$2,800–\$6,200/);
  assert.match(body, /\$3,500–\$8,000/);
  assert.match(body, /\$4,500–\$8,500/);
  assert.match(body, /day-care to 2 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Liposuction in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Liposuction/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Tummy-Tuck/);
  assert.match(body, /\/costs\/India\/Bariatric-Surgery\/Sleeve-Gastrectomy/);
  assert.match(body, /\/treatments\/rhinoplasty-in-india/);
  assert.match(body, /\/treatments\/blepharoplasty-in-india/);
  assert.match(body, /\/uploads\/treatments\/liposuction-fat-layers\.webp/);
  assert.match(body, /\/uploads\/treatments\/liposuction-treatment-areas\.webp/);
  assert.match(body, /\/uploads\/treatments\/liposuction-cannula\.webp/);
  assert.match(body, /\/uploads\/treatments\/liposuction-recovery\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Cosmetic-Surgery/Liposuction",
    "/doctors/India/Mumbai/Cosmetic-Surgery/Liposuction",
    "/doctors/India/Bengaluru/Cosmetic-Surgery/Liposuction",
    "/doctors/India/Chennai/Cosmetic-Surgery/Liposuction",
    "/doctors/India/Hyderabad/Cosmetic-Surgery/Liposuction",
    "/hospitals/India/Delhi-NCR/Cosmetic-Surgery",
    "/hospitals/India/Mumbai/Cosmetic-Surgery",
    "/hospitals/India/Bengaluru/Cosmetic-Surgery",
    "/costs/India/Delhi-NCR/Cosmetic-Surgery/Liposuction",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /What is liposuction\?/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Subcutaneous Tissue",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/liposuction-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/liposuction/);
  assert.doesNotMatch(body, /\/treatments\/liposuction\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/liposuction-in-india/);
  const rhino = store.treatments.find((row) => row.slug === "rhinoplasty-in-india");
  assert.match(rhino?.translations.en?.editorialBody ?? "", /\/treatments\/liposuction-in-india/);
  const bleph = store.treatments.find((row) => row.slug === "blepharoplasty-in-india");
  assert.match(bleph?.translations.en?.editorialBody ?? "", /\/treatments\/liposuction-in-india/);
});

test("the published breast-lift page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "breast-lift-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$3,000–\$6,500/);
  assert.match(body, /\$7,000–\$15,000/);
  assert.match(body, /\$3,200–\$6,800/);
  assert.match(body, /\$2,000–\$5,500/);
  assert.match(body, /\$1,500–\$4,200/);
  assert.match(body, /\$1,800–\$4,200/);
  assert.match(body, /1–3 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Breast Lift in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Breast-Lift/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Breast-Augmentation/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Breast-Reduction/);
  assert.match(body, /\/treatments\/liposuction-in-india/);
  assert.match(body, /\/treatments\/rhinoplasty-in-india/);
  assert.match(body, /\/treatments\/blepharoplasty-in-india/);
  assert.match(body, /\/uploads\/treatments\/breast-lift-anatomy\.webp/);
  assert.match(body, /\/uploads\/treatments\/breast-lift-incisions\.webp/);
  assert.match(body, /\/uploads\/treatments\/breast-lift-vs-augmentation\.webp/);
  assert.match(body, /\/uploads\/treatments\/breast-lift-recovery\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Cosmetic-Surgery/Breast-Lift",
    "/doctors/India/Mumbai/Cosmetic-Surgery/Breast-Lift",
    "/doctors/India/Bengaluru/Cosmetic-Surgery/Breast-Lift",
    "/doctors/India/Chennai/Cosmetic-Surgery/Breast-Lift",
    "/doctors/India/Hyderabad/Cosmetic-Surgery/Breast-Lift",
    "/hospitals/India/Delhi-NCR/Cosmetic-Surgery",
    "/hospitals/India/Mumbai/Cosmetic-Surgery",
    "/hospitals/India/Bengaluru/Cosmetic-Surgery",
    "/costs/India/Delhi-NCR/Cosmetic-Surgery/Breast-Lift",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /What is breast lift surgery\?/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Breast",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/breast-lift-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/breast-lift/);
  assert.doesNotMatch(body, /\/treatments\/breast-lift\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/breast-lift-in-india/);
  const lipo = store.treatments.find((row) => row.slug === "liposuction-in-india");
  assert.match(lipo?.translations.en?.editorialBody ?? "", /\/treatments\/breast-lift-in-india/);
});

test("the published breast-reconstruction page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "breast-reconstruction-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$6,000–\$18,000/);
  assert.match(body, /\$25,000–\$70,000/);
  assert.match(body, /\$4,500–\$10,000/);
  assert.match(body, /\$5,500–\$12,000/);
  assert.match(body, /\$4,500–\$11,000/);
  assert.match(body, /\$3,500–\$8,000/);
  assert.match(body, /\$10,000–\$24,000/);
  assert.match(body, /4–8 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Breast Reconstruction in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Surgical-Oncology\/Breast-Reconstruction/);
  assert.match(body, /\/costs\/India\/Surgical-Oncology\/Mastectomy/);
  assert.match(body, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.match(body, /\/treatments\/breast-lift-in-india/);
  assert.match(body, /\/blogs\/breast-reconstruction-after-mastectomy-india/);
  assert.match(body, /\/uploads\/treatments\/breast-recon-implant-vs-flap\.webp/);
  assert.match(body, /\/uploads\/treatments\/breast-recon-diep\.webp/);
  assert.match(body, /\/uploads\/treatments\/breast-recon-timing\.webp/);
  assert.match(body, /\/uploads\/treatments\/breast-recon-expander\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Surgical-Oncology/Breast-Reconstruction",
    "/doctors/India/Mumbai/Surgical-Oncology/Breast-Reconstruction",
    "/doctors/India/Bengaluru/Surgical-Oncology/Breast-Reconstruction",
    "/doctors/India/Chennai/Surgical-Oncology/Breast-Reconstruction",
    "/doctors/India/Hyderabad/Surgical-Oncology/Breast-Reconstruction",
    "/hospitals/India/Delhi-NCR/Surgical-Oncology",
    "/hospitals/India/Mumbai/Surgical-Oncology",
    "/hospitals/India/Bengaluru/Surgical-Oncology",
    "/costs/India/Delhi-NCR/Surgical-Oncology/Breast-Reconstruction",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /What is breast reconstruction\?/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Breast",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/breast-reconstruction-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/breast-reconstruction/);
  assert.doesNotMatch(body, /\/treatments\/breast-reconstruction\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/breast-reconstruction-in-india/);
  const cancer = store.treatments.find((row) => row.slug === "breast-cancer-treatment-in-india");
  assert.match(
    cancer?.translations.en?.editorialBody ?? "",
    /\/treatments\/breast-reconstruction-in-india/,
  );
  const lift = store.treatments.find((row) => row.slug === "breast-lift-in-india");
  assert.match(lift?.translations.en?.editorialBody ?? "", /\/treatments\/breast-reconstruction-in-india/);
});

test("the published breast-augmentation page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "breast-augmentation-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$3,000–\$6,500/);
  assert.match(body, /\$6,500–\$15,000/);
  assert.match(body, /\$3,200–\$6,800/);
  assert.match(body, /\$2,000–\$5,500/);
  assert.match(body, /\$1,500–\$4,200/);
  assert.match(body, /\$1,800–\$4,200/);
  assert.match(body, /\$6,000–\$18,000/);
  assert.match(body, /1–3 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Breast Augmentation in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Breast-Augmentation/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Breast-Lift/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Fat-Transfer/);
  assert.match(body, /\/treatments\/breast-lift-in-india/);
  assert.match(body, /\/treatments\/breast-reconstruction-in-india/);
  assert.match(body, /\/treatments\/liposuction-in-india/);
  assert.match(body, /\/uploads\/treatments\/breast-aug-implant-vs-fat\.webp/);
  assert.match(body, /\/uploads\/treatments\/breast-aug-placement\.webp/);
  assert.match(body, /\/uploads\/treatments\/breast-aug-incisions\.webp/);
  assert.match(body, /\/uploads\/treatments\/breast-aug-recovery\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Cosmetic-Surgery/Breast-Augmentation",
    "/doctors/India/Mumbai/Cosmetic-Surgery/Breast-Augmentation",
    "/doctors/India/Bengaluru/Cosmetic-Surgery/Breast-Augmentation",
    "/doctors/India/Chennai/Cosmetic-Surgery/Breast-Augmentation",
    "/doctors/India/Hyderabad/Cosmetic-Surgery/Breast-Augmentation",
    "/hospitals/India/Delhi-NCR/Cosmetic-Surgery",
    "/hospitals/India/Mumbai/Cosmetic-Surgery",
    "/hospitals/India/Bengaluru/Cosmetic-Surgery",
    "/costs/India/Delhi-NCR/Cosmetic-Surgery/Breast-Augmentation",
  ]) {
    assert.match(body, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.ok(treatment.translations.en!.faqs.length >= 10);
  const ctas = body.match(/^\[[^\]]+\]\(\/(?:consult\?|https:\/\/wa\.me\/)/gm);
  assert.ok((ctas?.length ?? 0) >= 7, `expected 7 in-article CTAs, found ${ctas?.length ?? 0}`);
  const qa = splitTreatmentQuickAnswer(body);
  assert.ok(qa.quickAnswer);
  assert.ok((qa.quickAnswer?.items.length ?? 0) >= 6);
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /What is breast augmentation\?/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Breast",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/breast-augmentation-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/breast-augmentation/);
  assert.doesNotMatch(body, /\/treatments\/india\/plastic-surgery/);
  assert.doesNotMatch(body, /\/treatments\/breast-augmentation\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/breast-augmentation-in-india/);
  const lift = store.treatments.find((row) => row.slug === "breast-lift-in-india");
  assert.match(lift?.translations.en?.editorialBody ?? "", /\/treatments\/breast-augmentation-in-india/);
  const recon = store.treatments.find((row) => row.slug === "breast-reconstruction-in-india");
  assert.match(recon?.translations.en?.editorialBody ?? "", /\/treatments\/breast-augmentation-in-india/);
  const lipo = store.treatments.find((row) => row.slug === "liposuction-in-india");
  assert.match(lipo?.translations.en?.editorialBody ?? "", /\/treatments\/breast-augmentation-in-india/);
});

test("the published mommy-makeover page uses component USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "mommy-makeover-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$3,500–\$7,200/);
  assert.match(body, /\$8,000–\$16,000/);
  assert.match(body, /\$1,500–\$4,200/);
  assert.match(body, /\$3,000–\$6,500/);
  assert.match(body, /\$3,200–\$6,800/);
  assert.match(body, /\$2,000–\$5,500/);
  assert.match(body, /\$2,800–\$6,200/);
  assert.match(body, /2–5 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Mommy Makeover in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Tummy-Tuck/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Liposuction/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Breast-Lift/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Breast-Augmentation/);
  assert.match(body, /\/treatments\/liposuction-in-india/);
  assert.match(body, /\/treatments\/breast-lift-in-india/);
  assert.match(body, /\/treatments\/breast-augmentation-in-india/);
  assert.match(body, /\/uploads\/treatments\/mommy-makeover-components\.webp/);
  assert.match(body, /\/uploads\/treatments\/mommy-makeover-diastasis\.webp/);
  assert.match(body, /\/uploads\/treatments\/mommy-makeover-combined-vs-staged\.webp/);
  assert.match(body, /\/uploads\/treatments\/mommy-makeover-recovery\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Cosmetic-Surgery/Tummy-Tuck",
    "/doctors/India/Mumbai/Cosmetic-Surgery/Tummy-Tuck",
    "/doctors/India/Bengaluru/Cosmetic-Surgery/Tummy-Tuck",
    "/doctors/India/Chennai/Cosmetic-Surgery/Tummy-Tuck",
    "/doctors/India/Hyderabad/Cosmetic-Surgery/Tummy-Tuck",
    "/hospitals/India/Delhi-NCR/Cosmetic-Surgery",
    "/hospitals/India/Mumbai/Cosmetic-Surgery",
    "/hospitals/India/Bengaluru/Cosmetic-Surgery",
    "/costs/India/Delhi-NCR/Cosmetic-Surgery/Tummy-Tuck",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /Treatment/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Abdomen",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/mommy-makeover-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/mommy-makeover\/india/);
  assert.doesNotMatch(body, /\/treatments\/india\/mommy-makeover/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/mommy-makeover-in-india/);
  const lift = store.treatments.find((row) => row.slug === "breast-lift-in-india");
  assert.match(lift?.translations.en?.editorialBody ?? "", /\/treatments\/mommy-makeover-in-india/);
  const aug = store.treatments.find((row) => row.slug === "breast-augmentation-in-india");
  assert.match(aug?.translations.en?.editorialBody ?? "", /\/treatments\/mommy-makeover-in-india/);
  const liposuction = store.treatments.find((row) => row.slug === "liposuction-in-india");
  assert.match(
    liposuction?.translations.en?.editorialBody ?? "",
    /\/treatments\/mommy-makeover-in-india/,
  );
});

test("the published breast-reduction page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "breast-reduction-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$3,200–\$6,800/);
  assert.match(body, /\$8,000–\$16,000/);
  assert.match(body, /\$3,000–\$6,500/);
  assert.match(body, /\$1,500–\$4,200/);
  assert.match(body, /\$1,800–\$4,200/);
  assert.match(body, /\$6,000–\$18,000/);
  assert.match(body, /1–4 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Breast Reduction Surgery in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Breast-Reduction/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Breast-Lift/);
  assert.match(body, /\/costs\/India\/Cosmetic-Surgery\/Gynecomastia-Surgery/);
  assert.match(body, /\/treatments\/breast-lift-in-india/);
  assert.match(body, /\/treatments\/breast-augmentation-in-india/);
  assert.match(body, /\/treatments\/liposuction-in-india/);
  assert.match(body, /\/treatments\/mommy-makeover-in-india/);
  assert.match(body, /\/uploads\/treatments\/breast-red-goals\.webp/);
  assert.match(body, /\/uploads\/treatments\/breast-red-incisions\.webp/);
  assert.match(body, /\/uploads\/treatments\/breast-red-nipple\.webp/);
  assert.match(body, /\/uploads\/treatments\/breast-red-recovery\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Cosmetic-Surgery/Breast-Reduction",
    "/doctors/India/Mumbai/Cosmetic-Surgery/Breast-Reduction",
    "/doctors/India/Bengaluru/Cosmetic-Surgery/Breast-Reduction",
    "/doctors/India/Chennai/Cosmetic-Surgery/Breast-Reduction",
    "/doctors/India/Hyderabad/Cosmetic-Surgery/Breast-Reduction",
    "/hospitals/India/Delhi-NCR/Cosmetic-Surgery",
    "/hospitals/India/Mumbai/Cosmetic-Surgery",
    "/hospitals/India/Bengaluru/Cosmetic-Surgery",
    "/costs/India/Delhi-NCR/Cosmetic-Surgery/Breast-Reduction",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /What is breast reduction surgery\?/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Breast",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/breast-reduction-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/breast-reduction/);
  assert.doesNotMatch(body, /\/treatments\/india\/plastic-surgery/);
  assert.doesNotMatch(body, /\/treatments\/breast-reduction\/india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/breast-reduction-in-india/);
  const lift = store.treatments.find((row) => row.slug === "breast-lift-in-india");
  assert.match(lift?.translations.en?.editorialBody ?? "", /\/treatments\/breast-reduction-in-india/);
  const aug = store.treatments.find((row) => row.slug === "breast-augmentation-in-india");
  assert.match(aug?.translations.en?.editorialBody ?? "", /\/treatments\/breast-reduction-in-india/);
  const lipo = store.treatments.find((row) => row.slug === "liposuction-in-india");
  assert.match(lipo?.translations.en?.editorialBody ?? "", /\/treatments\/breast-reduction-in-india/);
  const mommy = store.treatments.find((row) => row.slug === "mommy-makeover-in-india");
  assert.match(mommy?.translations.en?.editorialBody ?? "", /\/treatments\/breast-reduction-in-india/);
});

test("the published bone-marrow-transplant page uses site USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "bone-marrow-transplant-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$25,000–\$70,000/);
  assert.match(body, /\$150,000–\$400,000/);
  assert.match(body, /\$18,000–\$48,000/);
  assert.match(body, /\$30,000–\$80,000/);
  assert.match(body, /\$35,000–\$85,000/);
  assert.match(body, /\$40,000–\$95,000/);
  assert.match(body, /\$28,000–\$75,000/);
  assert.match(body, /\$80,000–\$180,000/);
  assert.match(body, /4–8 weeks/);
  assert.match(body, /article-quick-answer|Quick Answer: Bone Marrow Transplant in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Hematology\/Bone-Marrow-Transplantation/);
  assert.match(body, /\/costs\/India\/Hematology\/Autologous-Stem-Cell-Transplant/);
  assert.match(body, /\/costs\/India\/Hematology\/Allogeneic-Stem-Cell-Transplant/);
  assert.match(body, /\/costs\/India\/Pediatric-Hematology\/Pediatric-Bone-Marrow-Transplantation/);
  assert.match(body, /\/uploads\/treatments\/bmt-types\.webp/);
  assert.match(body, /\/uploads\/treatments\/bmt-sources\.webp/);
  assert.match(body, /\/uploads\/treatments\/bmt-pathway\.webp/);
  assert.match(body, /\/uploads\/treatments\/bmt-risks\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Hematology/Bone-Marrow-Transplantation",
    "/doctors/India/Mumbai/Hematology/Bone-Marrow-Transplantation",
    "/doctors/India/Bengaluru/Hematology/Bone-Marrow-Transplantation",
    "/doctors/India/Chennai/Hematology/Bone-Marrow-Transplantation",
    "/doctors/India/Hyderabad/Hematology/Bone-Marrow-Transplantation",
    "/hospitals/India/Delhi-NCR/Hematology",
    "/hospitals/India/Mumbai/Hematology",
    "/hospitals/India/Bengaluru/Hematology",
    "/costs/India/Delhi-NCR/Hematology/Bone-Marrow-Transplantation",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /What is a bone marrow transplant\?/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Bone Marrow",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/bone-marrow-transplant-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/bone-marrow/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/bone-marrow-transplant-in-india/);
});

test("the published leukemia page uses modality USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "leukemia-treatment-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$1,500–\$8,000\+/);
  assert.match(body, /\$8,000–\$30,000/);
  assert.match(body, /\$15,000–\$45,000/);
  assert.match(body, /\$25,000–\$70,000/);
  assert.match(body, /\$30,000–\$80,000/);
  assert.match(body, /\$80,000–\$180,000/);
  assert.match(body, /\$10,000–\$50,000/);
  assert.match(body, /article-quick-answer|Quick Answer: Leukemia Treatment in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Medical-Oncology\/Chemotherapy/);
  assert.match(body, /\/costs\/India\/Medical-Oncology\/Targeted-Therapy/);
  assert.match(body, /\/costs\/India\/Hematology\/Bone-Marrow-Transplantation/);
  assert.match(body, /\/treatments\/bone-marrow-transplant-in-india/);
  assert.match(body, /\/uploads\/treatments\/leukemia-types\.webp/);
  assert.match(body, /\/uploads\/treatments\/leukemia-diagnosis\.webp/);
  assert.match(body, /\/uploads\/treatments\/leukemia-treatment\.webp/);
  assert.match(body, /\/uploads\/treatments\/leukemia-mrd\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Hematology",
    "/doctors/India/Mumbai/Hematology",
    "/doctors/India/Bengaluru/Hematology",
    "/doctors/India/Chennai/Hematology",
    "/doctors/India/Hyderabad/Hematology",
    "/doctors/India/Delhi-NCR/Hematology/Bone-Marrow-Transplantation",
    "/hospitals/India/Delhi-NCR/Hematology",
    "/hospitals/India/Mumbai/Hematology",
    "/costs/India/Delhi-NCR/Medical-Oncology/Chemotherapy",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /What is leukemia\?/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Bone Marrow",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/leukemia-treatment-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/leukemia/);
  assert.doesNotMatch(body, /\/treatments\/aml-treatment-in-india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/leukemia-treatment-in-india/);
  const bmt = store.treatments.find((row) => row.slug === "bone-marrow-transplant-in-india");
  assert.match(bmt?.translations.en?.editorialBody ?? "", /\/treatments\/leukemia-treatment-in-india/);
});

test("the published lymphoma page uses modality USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "lymphoma-treatment-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$1,500–\$8,000\+/);
  assert.match(body, /\$8,000–\$30,000/);
  assert.match(body, /\$15,000–\$45,000/);
  assert.match(body, /\$1,000–\$6,000\+/);
  assert.match(body, /\$18,000–\$48,000/);
  assert.match(body, /\$25,000–\$70,000/);
  assert.match(body, /\$80,000–\$180,000/);
  assert.match(body, /\$10,000–\$50,000/);
  assert.match(body, /article-quick-answer|Quick Answer: Lymphoma Treatment in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Medical-Oncology\/Chemotherapy/);
  assert.match(body, /\/costs\/India\/Radiation-Oncology\/External-Beam-Radiotherapy-\(EBRT\)/);
  assert.match(body, /\/costs\/India\/Hematology\/Autologous-Stem-Cell-Transplant/);
  assert.match(body, /\/costs\/India\/Hematology\/CAR-T-Cell-Therapy/);
  assert.match(body, /\/treatments\/bone-marrow-transplant-in-india/);
  assert.match(body, /\/treatments\/leukemia-treatment-in-india/);
  assert.match(body, /\/uploads\/treatments\/lymphoma-types\.webp/);
  assert.match(body, /\/uploads\/treatments\/lymphoma-diagnosis\.webp/);
  assert.match(body, /\/uploads\/treatments\/lymphoma-treatment\.webp/);
  assert.match(body, /\/uploads\/treatments\/lymphoma-stages\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Hematology",
    "/doctors/India/Mumbai/Hematology",
    "/doctors/India/Bengaluru/Hematology",
    "/doctors/India/Chennai/Hematology",
    "/doctors/India/Hyderabad/Hematology",
    "/doctors/India/Delhi-NCR/Hematology/Bone-Marrow-Transplantation",
    "/doctors/India/Delhi-NCR/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
    "/hospitals/India/Delhi-NCR/Hematology",
    "/hospitals/India/Mumbai/Hematology",
    "/costs/India/Delhi-NCR/Medical-Oncology/Chemotherapy",
    "/costs/India/Delhi-NCR/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /Lymphoma treatment in India/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Lymphatic System",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/lymphoma-treatment-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/lymphoma/);
  assert.doesNotMatch(body, /\/treatments\/hodgkin-lymphoma-treatment-in-india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/lymphoma-treatment-in-india/);
  const bmt = store.treatments.find((row) => row.slug === "bone-marrow-transplant-in-india");
  const leukemia = store.treatments.find((row) => row.slug === "leukemia-treatment-in-india");
  assert.match(bmt?.translations.en?.editorialBody ?? "", /\/treatments\/lymphoma-treatment-in-india/);
  assert.match(leukemia?.translations.en?.editorialBody ?? "", /\/treatments\/lymphoma-treatment-in-india/);
});

test("the published thalassemia page uses modality USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "thalassemia-treatment-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$25,000–\$70,000/);
  assert.match(body, /\$30,000–\$80,000/);
  assert.match(body, /\$28,000–\$75,000/);
  assert.match(body, /\$28,000–\$70,000/);
  assert.match(body, /\$40,000–\$95,000/);
  assert.match(body, /\$150,000–\$400,000/);
  assert.match(body, /article-quick-answer|Quick Answer: Thalassemia Treatment in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Hematology\/Bone-Marrow-Transplantation/);
  assert.match(body, /\/costs\/India\/Hematology\/Allogeneic-Stem-Cell-Transplant/);
  assert.match(body, /\/costs\/India\/Pediatric-Hematology\/Pediatric-Bone-Marrow-Transplantation/);
  assert.match(body, /\/treatments\/bone-marrow-transplant-in-india/);
  assert.match(body, /\/treatments\/leukemia-treatment-in-india/);
  assert.match(body, /\/treatments\/lymphoma-treatment-in-india/);
  assert.match(body, /\/uploads\/treatments\/thalassemia-types\.webp/);
  assert.match(body, /\/uploads\/treatments\/thalassemia-care\.webp/);
  assert.match(body, /\/uploads\/treatments\/thalassemia-iron\.webp/);
  assert.match(body, /\/uploads\/treatments\/thalassemia-hsct\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Hematology",
    "/doctors/India/Mumbai/Hematology",
    "/doctors/India/Bengaluru/Hematology",
    "/doctors/India/Chennai/Hematology",
    "/doctors/India/Hyderabad/Hematology",
    "/doctors/India/Delhi-NCR/Hematology/Bone-Marrow-Transplantation",
    "/doctors/India/Delhi-NCR/Hematology/Allogeneic-Stem-Cell-Transplant",
    "/hospitals/India/Delhi-NCR/Hematology",
    "/hospitals/India/Mumbai/Hematology",
    "/costs/India/Delhi-NCR/Hematology/Bone-Marrow-Transplantation",
    "/costs/India/Delhi-NCR/Hematology/Allogeneic-Stem-Cell-Transplant",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /What is thalassemia\?/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Bone Marrow",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/thalassemia-treatment-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/hematology\/thalassemia/);
  assert.doesNotMatch(body, /\/treatments\/alpha-thalassemia-treatment-in-india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/thalassemia-treatment-in-india/);
  const bmt = store.treatments.find((row) => row.slug === "bone-marrow-transplant-in-india");
  const leukemia = store.treatments.find((row) => row.slug === "leukemia-treatment-in-india");
  const lymphoma = store.treatments.find((row) => row.slug === "lymphoma-treatment-in-india");
  assert.match(bmt?.translations.en?.editorialBody ?? "", /\/treatments\/thalassemia-treatment-in-india/);
  assert.match(leukemia?.translations.en?.editorialBody ?? "", /\/treatments\/thalassemia-treatment-in-india/);
  assert.match(lymphoma?.translations.en?.editorialBody ?? "", /\/treatments\/thalassemia-treatment-in-india/);
});

test("the published sickle-cell page uses modality USD ranges and GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "sickle-cell-anemia-treatment-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$25,000–\$70,000/);
  assert.match(body, /\$30,000–\$80,000/);
  assert.match(body, /\$28,000–\$75,000/);
  assert.match(body, /\$28,000–\$70,000/);
  assert.match(body, /\$40,000–\$95,000/);
  assert.match(body, /\$150,000–\$400,000/);
  assert.match(body, /article-quick-answer|Quick Answer: Sickle Cell Anemia Treatment in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Hematology\/Bone-Marrow-Transplantation/);
  assert.match(body, /\/costs\/India\/Hematology\/Allogeneic-Stem-Cell-Transplant/);
  assert.match(body, /\/costs\/India\/Pediatric-Hematology\/Pediatric-Bone-Marrow-Transplantation/);
  assert.match(body, /\/treatments\/bone-marrow-transplant-in-india/);
  assert.match(body, /\/treatments\/thalassemia-treatment-in-india/);
  assert.match(body, /\/uploads\/treatments\/sickle-cell-shape\.webp/);
  assert.match(body, /\/uploads\/treatments\/sickle-cell-care\.webp/);
  assert.match(body, /\/uploads\/treatments\/sickle-cell-organs\.webp/);
  assert.match(body, /\/uploads\/treatments\/sickle-cell-hsct\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Hematology",
    "/doctors/India/Mumbai/Hematology",
    "/doctors/India/Bengaluru/Hematology",
    "/doctors/India/Chennai/Hematology",
    "/doctors/India/Hyderabad/Hematology",
    "/doctors/India/Delhi-NCR/Hematology/Bone-Marrow-Transplantation",
    "/doctors/India/Delhi-NCR/Hematology/Allogeneic-Stem-Cell-Transplant",
    "/hospitals/India/Delhi-NCR/Hematology",
    "/hospitals/India/Mumbai/Hematology",
    "/costs/India/Delhi-NCR/Hematology/Bone-Marrow-Transplantation",
    "/costs/India/Delhi-NCR/Hematology/Allogeneic-Stem-Cell-Transplant",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /Sickle cell anemia treatment in India/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Bone Marrow",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/sickle-cell-anemia-treatment-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/hematology\/sickle/);
  assert.doesNotMatch(body, /\/treatments\/hydroxyurea-treatment-in-india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/sickle-cell-anemia-treatment-in-india/);
  const bmt = store.treatments.find((row) => row.slug === "bone-marrow-transplant-in-india");
  const thalassemia = store.treatments.find((row) => row.slug === "thalassemia-treatment-in-india");
  assert.match(bmt?.translations.en?.editorialBody ?? "", /\/treatments\/sickle-cell-anemia-treatment-in-india/);
  assert.match(thalassemia?.translations.en?.editorialBody ?? "", /\/treatments\/sickle-cell-anemia-treatment-in-india/);
});

test("the published Multiple Myeloma treatment uses GAF USD ranges and haematology GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "multiple-myeloma-treatment-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$18,000–\$48,000/);
  assert.match(body, /\$25,000–\$70,000/);
  assert.match(body, /\$30,000–\$80,000/);
  assert.match(body, /\$1,500–\$8,000\+/);
  assert.match(body, /\$8,000–\$30,000/);
  assert.match(body, /\$15,000–\$45,000/);
  assert.match(body, /\$4,000–\$18,000/);
  assert.match(body, /\$80,000–\$180,000/);
  assert.match(body, /\$140,000–\$320,000/);
  assert.match(body, /article-quick-answer|Quick Answer: Multiple Myeloma Treatment in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Hematology\/Autologous-Stem-Cell-Transplant/);
  assert.match(body, /\/costs\/India\/Hematology\/Bone-Marrow-Transplantation/);
  assert.match(body, /\/costs\/India\/Hematology\/Allogeneic-Stem-Cell-Transplant/);
  assert.match(body, /\/costs\/India\/Hematology\/CAR-T-Cell-Therapy/);
  assert.match(body, /\/costs\/India\/Medical-Oncology\/Chemotherapy/);
  assert.match(body, /\/treatments\/bone-marrow-transplant-in-india/);
  assert.match(body, /\/treatments\/leukemia-treatment-in-india/);
  assert.match(body, /\/treatments\/lymphoma-treatment-in-india/);
  assert.match(body, /\/treatments\/thalassemia-treatment-in-india/);
  assert.match(body, /\/treatments\/sickle-cell-anemia-treatment-in-india/);
  assert.match(body, /\/uploads\/treatments\/myeloma-crab\.webp/);
  assert.match(body, /\/uploads\/treatments\/myeloma-diagnosis\.webp/);
  assert.match(body, /\/uploads\/treatments\/myeloma-treatment\.webp/);
  assert.match(body, /\/uploads\/treatments\/myeloma-asct\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Hematology",
    "/doctors/India/Mumbai/Hematology",
    "/doctors/India/Bengaluru/Hematology",
    "/doctors/India/Chennai/Hematology",
    "/doctors/India/Hyderabad/Hematology",
    "/doctors/India/Delhi-NCR/Hematology/Autologous-Stem-Cell-Transplant",
    "/doctors/India/Delhi-NCR/Hematology/Bone-Marrow-Transplantation",
    "/doctors/India/Delhi-NCR/Medical-Oncology/Chemotherapy",
    "/doctors/India/Delhi-NCR/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
    "/hospitals/India/Delhi-NCR/Hematology",
    "/hospitals/India/Mumbai/Hematology",
    "/costs/India/Delhi-NCR/Hematology/Autologous-Stem-Cell-Transplant",
    "/costs/India/Mumbai/Hematology/Bone-Marrow-Transplantation",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /Multiple myeloma treatment in India/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Bone Marrow",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/multiple-myeloma-treatment-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/hematology\/myeloma/);
  assert.doesNotMatch(body, /\/treatments\/daratumumab-treatment-in-india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/multiple-myeloma-treatment-in-india/);
  const bmt = store.treatments.find((row) => row.slug === "bone-marrow-transplant-in-india");
  const sickle = store.treatments.find((row) => row.slug === "sickle-cell-anemia-treatment-in-india");
  assert.match(bmt?.translations.en?.editorialBody ?? "", /\/treatments\/multiple-myeloma-treatment-in-india/);
  assert.match(sickle?.translations.en?.editorialBody ?? "", /\/treatments\/multiple-myeloma-treatment-in-india/);
});

test("the published Aplastic Anemia treatment uses GAF USD ranges and haematology GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "aplastic-anemia-treatment-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$30,000–\$80,000/);
  assert.match(body, /\$25,000–\$70,000/);
  assert.match(body, /\$35,000–\$85,000/);
  assert.match(body, /\$40,000–\$95,000/);
  assert.match(body, /\$28,000–\$75,000/);
  assert.match(body, /\$28,000–\$70,000/);
  assert.match(body, /\$24,000–\$70,000/);
  assert.match(body, /\$200,000–\$420,000/);
  assert.match(body, /article-quick-answer|Quick Answer: Aplastic Anemia Treatment in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Hematology\/Allogeneic-Stem-Cell-Transplant/);
  assert.match(body, /\/costs\/India\/Hematology\/Bone-Marrow-Transplantation/);
  assert.match(body, /\/costs\/India\/Hematology\/Haploidentical-Stem-Cell-Transplant/);
  assert.match(body, /\/costs\/India\/Pediatric-Hematology\/Pediatric-Bone-Marrow-Transplantation/);
  assert.match(body, /\/treatments\/bone-marrow-transplant-in-india/);
  assert.match(body, /\/treatments\/leukemia-treatment-in-india/);
  assert.match(body, /\/treatments\/multiple-myeloma-treatment-in-india/);
  assert.match(body, /\/treatments\/thalassemia-treatment-in-india/);
  assert.match(body, /\/treatments\/sickle-cell-anemia-treatment-in-india/);
  assert.match(body, /\/uploads\/treatments\/aplastic-anemia-marrow\.webp/);
  assert.match(body, /\/uploads\/treatments\/aplastic-anemia-severity\.webp/);
  assert.match(body, /\/uploads\/treatments\/aplastic-anemia-treatment\.webp/);
  assert.match(body, /\/uploads\/treatments\/aplastic-anemia-hsct\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Hematology",
    "/doctors/India/Mumbai/Hematology",
    "/doctors/India/Bengaluru/Hematology",
    "/doctors/India/Chennai/Hematology",
    "/doctors/India/Hyderabad/Hematology",
    "/doctors/India/Delhi-NCR/Hematology/Allogeneic-Stem-Cell-Transplant",
    "/doctors/India/Delhi-NCR/Hematology/Bone-Marrow-Transplantation",
    "/doctors/India/Delhi-NCR/Pediatric-Hematology/Pediatric-Bone-Marrow-Transplantation",
    "/hospitals/India/Delhi-NCR/Hematology",
    "/hospitals/India/Mumbai/Hematology",
    "/costs/India/Delhi-NCR/Hematology/Allogeneic-Stem-Cell-Transplant",
    "/costs/India/Mumbai/Hematology/Bone-Marrow-Transplantation",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /Aplastic anemia treatment in India/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Bone Marrow",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/aplastic-anemia-treatment-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/hematology\/aplastic/);
  assert.doesNotMatch(body, /\/treatments\/pnh-treatment-in-india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/aplastic-anemia-treatment-in-india/);
  const bmt = store.treatments.find((row) => row.slug === "bone-marrow-transplant-in-india");
  const myeloma = store.treatments.find((row) => row.slug === "multiple-myeloma-treatment-in-india");
  assert.match(bmt?.translations.en?.editorialBody ?? "", /\/treatments\/aplastic-anemia-treatment-in-india/);
  assert.match(myeloma?.translations.en?.editorialBody ?? "", /\/treatments\/aplastic-anemia-treatment-in-india/);
});

test("the published Autologous BMT treatment uses GAF USD ranges and haematology GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "autologous-bone-marrow-transplant-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$18,000–\$48,000/);
  assert.match(body, /\$25,000–\$70,000/);
  assert.match(body, /\$30,000–\$80,000/);
  assert.match(body, /\$140,000–\$320,000/);
  assert.match(body, /\$80,000–\$180,000/);
  assert.match(body, /article-quick-answer|Quick Answer: Autologous Bone Marrow Transplant in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Hematology\/Autologous-Stem-Cell-Transplant/);
  assert.match(body, /\/costs\/India\/Hematology\/Bone-Marrow-Transplantation/);
  assert.match(body, /\/costs\/India\/Hematology\/Allogeneic-Stem-Cell-Transplant/);
  assert.match(body, /\/treatments\/bone-marrow-transplant-in-india/);
  assert.match(body, /\/treatments\/multiple-myeloma-treatment-in-india/);
  assert.match(body, /\/treatments\/lymphoma-treatment-in-india/);
  assert.match(body, /\/treatments\/aplastic-anemia-treatment-in-india/);
  assert.match(body, /\/uploads\/treatments\/autologous-bmt-rescue\.webp/);
  assert.match(body, /\/uploads\/treatments\/autologous-bmt-compare\.webp/);
  assert.match(body, /\/uploads\/treatments\/autologous-bmt-steps\.webp/);
  assert.match(body, /\/uploads\/treatments\/autologous-bmt-engraft\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Hematology",
    "/doctors/India/Mumbai/Hematology",
    "/doctors/India/Bengaluru/Hematology",
    "/doctors/India/Chennai/Hematology",
    "/doctors/India/Hyderabad/Hematology",
    "/doctors/India/Delhi-NCR/Hematology/Autologous-Stem-Cell-Transplant",
    "/doctors/India/Delhi-NCR/Hematology/Bone-Marrow-Transplantation",
    "/hospitals/India/Delhi-NCR/Hematology",
    "/hospitals/India/Mumbai/Hematology",
    "/costs/India/Delhi-NCR/Hematology/Autologous-Stem-Cell-Transplant",
    "/costs/India/Mumbai/Hematology/Bone-Marrow-Transplantation",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /Autologous bone marrow transplant in India/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Bone Marrow",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/autologous-bone-marrow-transplant-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/autologous/);
  assert.doesNotMatch(body, /\/treatments\/hodgkin-lymphoma-treatment-in-india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/autologous-bone-marrow-transplant-in-india/);
  const bmt = store.treatments.find((row) => row.slug === "bone-marrow-transplant-in-india");
  const aplastic = store.treatments.find((row) => row.slug === "aplastic-anemia-treatment-in-india");
  assert.match(bmt?.translations.en?.editorialBody ?? "", /\/treatments\/autologous-bone-marrow-transplant-in-india/);
  assert.match(aplastic?.translations.en?.editorialBody ?? "", /\/treatments\/autologous-bone-marrow-transplant-in-india/);
});

test("the published Fanconi Anemia treatment uses GAF USD ranges and haematology GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "fanconi-anemia-treatment-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$30,000–\$80,000/);
  assert.match(body, /\$28,000–\$75,000/);
  assert.match(body, /\$28,000–\$70,000/);
  assert.match(body, /\$35,000–\$85,000/);
  assert.match(body, /\$40,000–\$95,000/);
  assert.match(body, /\$25,000–\$70,000/);
  assert.match(body, /\$200,000–\$420,000/);
  assert.match(body, /article-quick-answer|Quick Answer: Fanconi Anemia Treatment in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Hematology\/Allogeneic-Stem-Cell-Transplant/);
  assert.match(body, /\/costs\/India\/Pediatric-Hematology\/Pediatric-Bone-Marrow-Transplantation/);
  assert.match(body, /\/costs\/India\/Pediatric-Hematology\/Matched-Sibling-Donor-Transplant/);
  assert.match(body, /\/treatments\/bone-marrow-transplant-in-india/);
  assert.match(body, /\/treatments\/aplastic-anemia-treatment-in-india/);
  assert.match(body, /\/treatments\/thalassemia-treatment-in-india/);
  assert.match(body, /\/treatments\/leukemia-treatment-in-india/);
  assert.match(body, /\/uploads\/treatments\/fanconi-anemia-pathway\.webp/);
  assert.match(body, /\/uploads\/treatments\/fanconi-anemia-diagnosis\.webp/);
  assert.match(body, /\/uploads\/treatments\/fanconi-anemia-treatment\.webp/);
  assert.match(body, /\/uploads\/treatments\/fanconi-anemia-hsct\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Hematology",
    "/doctors/India/Mumbai/Hematology",
    "/doctors/India/Bengaluru/Hematology",
    "/doctors/India/Chennai/Hematology",
    "/doctors/India/Hyderabad/Hematology",
    "/doctors/India/Delhi-NCR/Hematology/Allogeneic-Stem-Cell-Transplant",
    "/doctors/India/Delhi-NCR/Pediatric-Hematology/Pediatric-Bone-Marrow-Transplantation",
    "/hospitals/India/Delhi-NCR/Hematology",
    "/hospitals/India/Mumbai/Hematology",
    "/costs/India/Delhi-NCR/Hematology/Allogeneic-Stem-Cell-Transplant",
    "/costs/India/Mumbai/Hematology/Bone-Marrow-Transplantation",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /Fanconi anemia treatment in India/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Bone Marrow",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/fanconi-anemia-treatment-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/hematology\/fanconi/);
  assert.doesNotMatch(body, /\/treatments\/mds-treatment-in-india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/fanconi-anemia-treatment-in-india/);
  const bmt = store.treatments.find((row) => row.slug === "bone-marrow-transplant-in-india");
  const aplastic = store.treatments.find((row) => row.slug === "aplastic-anemia-treatment-in-india");
  assert.match(bmt?.translations.en?.editorialBody ?? "", /\/treatments\/fanconi-anemia-treatment-in-india/);
  assert.match(aplastic?.translations.en?.editorialBody ?? "", /\/treatments\/fanconi-anemia-treatment-in-india/);
  assert.doesNotMatch(aplastic?.translations.en?.editorialBody ?? "", /Fanconi-anemia, MDS/);
});

test("the published CABG surgery page uses GAF USD ranges and cardiac GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.slug === "cabg-surgery-in-india");
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$5,500–\$14,000/);
  assert.match(body, /\$8,500–\$20,000/);
  assert.match(body, /\$8,000–\$20,000/);
  assert.match(body, /\$10,000–\$24,000/);
  assert.match(body, /\$3,200–\$8,500/);
  assert.match(body, /\$400–\$1,200/);
  assert.match(body, /\$70,000–\$200,000/);
  assert.match(body, /7–14 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: CABG Surgery in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Cardiac-Surgery\/CABG-\(Coronary-Artery-Bypass-Grafting\)/);
  assert.match(body, /\/costs\/India\/Cardiac-Surgery\/Redo-CABG/);
  assert.match(body, /\/costs\/India\/Cardiology\/Coronary-Angioplasty-Stenting/);
  assert.match(body, /\/treatments\/coronary-angioplasty-in-india/);
  assert.match(body, /\/treatments\/tavr-in-india/);
  assert.match(body, /\/uploads\/treatments\/cabg-bypass\.webp/);
  assert.match(body, /\/uploads\/treatments\/cabg-grafts\.webp/);
  assert.match(body, /\/uploads\/treatments\/cabg-types\.webp/);
  assert.match(body, /\/uploads\/treatments\/cabg-steps\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)",
    "/doctors/India/Mumbai/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)",
    "/doctors/India/Bengaluru/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)",
    "/doctors/India/Chennai/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)",
    "/doctors/India/Hyderabad/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)",
    "/hospitals/India/Delhi-NCR/Cardiac-Surgery",
    "/hospitals/India/Mumbai/Cardiac-Surgery",
    "/hospitals/India/Bengaluru/Cardiac-Surgery",
    "/costs/India/Delhi-NCR/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)",
    "/costs/India/Mumbai/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /What is CABG\?/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Heart",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/treatments/cabg-surgery-in-india"));
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/cardiac/);
  assert.doesNotMatch(body, /\/treatments\/heart-attack-treatment-in-india/);
  assert.doesNotMatch(body, /\/treatments\/cardiac-rehabilitation/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/cabg-surgery-in-india/);
  const angioplasty = store.treatments.find((row) => row.slug === "coronary-angioplasty-in-india");
  const tavr = store.treatments.find((row) => row.slug === "tavr-in-india");
  assert.match(angioplasty?.translations.en?.editorialBody ?? "", /\/treatments\/cabg-surgery-in-india/);
  assert.match(tavr?.translations.en?.editorialBody ?? "", /\/treatments\/cabg-surgery-in-india/);
});

test("the published heart valve replacement page uses GAF USD ranges and cardiac GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "heart-valve-replacement-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$7,000–\$18,000/);
  assert.match(body, /\$7,000–\$18,500/);
  assert.match(body, /\$6,500–\$16,500/);
  assert.match(body, /\$7,500–\$18,000/);
  assert.match(body, /\$12,000–\$28,000/);
  assert.match(body, /\$18,000–\$42,000/);
  assert.match(body, /\$80,000–\$220,000/);
  assert.match(body, /8–16 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Heart Valve Replacement Surgery in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Cardiac-Surgery\/Heart-Valve-Replacement/);
  assert.match(body, /\/costs\/India\/Cardiac-Surgery\/Aortic-Valve-Replacement/);
  assert.match(body, /\/costs\/India\/Cardiac-Surgery\/TAVR-TAVI-\(Transcatheter-Aortic-Valve-Replacement\)/);
  assert.match(body, /\/treatments\/tavr-in-india/);
  assert.match(body, /\/treatments\/cabg-surgery-in-india/);
  assert.match(body, /\/uploads\/treatments\/heart-valve-disease\.webp/);
  assert.match(body, /\/uploads\/treatments\/heart-valve-types\.webp/);
  assert.match(body, /\/uploads\/treatments\/heart-valve-pathways\.webp/);
  assert.match(body, /\/uploads\/treatments\/heart-valve-steps\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Cardiac-Surgery/Heart-Valve-Replacement",
    "/doctors/India/Mumbai/Cardiac-Surgery/Heart-Valve-Replacement",
    "/doctors/India/Bengaluru/Cardiac-Surgery/Heart-Valve-Replacement",
    "/doctors/India/Chennai/Cardiac-Surgery/Heart-Valve-Replacement",
    "/doctors/India/Hyderabad/Cardiac-Surgery/Heart-Valve-Replacement",
    "/hospitals/India/Delhi-NCR/Cardiac-Surgery",
    "/hospitals/India/Mumbai/Cardiac-Surgery",
    "/hospitals/India/Bengaluru/Cardiac-Surgery",
    "/costs/India/Delhi-NCR/Cardiac-Surgery/Heart-Valve-Replacement",
    "/costs/India/Mumbai/Cardiac-Surgery/Heart-Valve-Replacement",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /What is heart valve replacement\?/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Heart",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/heart-valve-replacement-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/cardiology\/heart-valve/);
  assert.doesNotMatch(body, /\/treatments\/aortic-valve-replacement-in-india/);
  assert.doesNotMatch(body, /\/treatments\/mitral-valve-replacement-in-india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/heart-valve-replacement-in-india/);
  const tavr = store.treatments.find((row) => row.slug === "tavr-in-india");
  const cabg = store.treatments.find((row) => row.slug === "cabg-surgery-in-india");
  const bav = store.treatments.find((row) => row.slug === "aortic-balloon-valvuloplasty-in-india");
  assert.match(tavr?.translations.en?.editorialBody ?? "", /\/treatments\/heart-valve-replacement-in-india/);
  assert.match(cabg?.translations.en?.editorialBody ?? "", /\/treatments\/heart-valve-replacement-in-india/);
  assert.match(bav?.translations.en?.editorialBody ?? "", /\/treatments\/heart-valve-replacement-in-india/);
});

test("the published tricuspid valve replacement page uses GAF USD ranges and cardiac GEO links", () => {
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find(
    (row) => row.slug === "tricuspid-valve-replacement-in-india",
  );
  assert.ok(treatment);
  assert.equal(treatment.status, "published");
  assert.equal(treatment.translations.en?.status, "published");
  assert.deepEqual(validateTreatmentForSave(treatment, store), []);
  const body = treatment.translations.en!.editorialBody;
  assert.doesNotMatch(body, /₹|lakh/i);
  assert.match(body, /\$7,000–\$18,000/);
  assert.match(body, /\$7,000–\$18,500/);
  assert.match(body, /\$6,500–\$16,500/);
  assert.match(body, /\$7,500–\$18,000/);
  assert.match(body, /\$12,000–\$28,000/);
  assert.match(body, /\$18,000–\$42,000/);
  assert.match(body, /\$8,000–\$20,000/);
  assert.match(body, /\$8,000–\$28,000/);
  assert.match(body, /\$80,000–\$220,000/);
  assert.match(body, /8–16 nights/);
  assert.match(body, /article-quick-answer|Quick Answer: Tricuspid Valve Replacement in India/);
  assert.match(body, /local emergency department/);
  assert.match(body, /\/costs\/India\/Cardiac-Surgery\/Heart-Valve-Replacement/);
  assert.match(body, /\/costs\/India\/Cardiac-Surgery\/Heart-Valve-Repair/);
  assert.match(body, /\/costs\/India\/Cardiac-Surgery\/TAVR-TAVI-\(Transcatheter-Aortic-Valve-Replacement\)/);
  assert.match(body, /\/treatments\/heart-valve-replacement-in-india/);
  assert.match(body, /\/treatments\/tavr-in-india/);
  assert.match(body, /\/treatments\/cabg-surgery-in-india/);
  assert.match(body, /\/uploads\/treatments\/tricuspid-valve-anatomy\.webp/);
  assert.match(body, /\/uploads\/treatments\/tricuspid-valve-decision\.webp/);
  assert.match(body, /\/uploads\/treatments\/tricuspid-valve-pathways\.webp/);
  assert.match(body, /\/uploads\/treatments\/tricuspid-valve-steps\.webp/);
  assert.match(body, /https:\/\/wa\.me\/919044346292/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Cardiac-Surgery/Heart-Valve-Replacement",
    "/doctors/India/Mumbai/Cardiac-Surgery/Heart-Valve-Replacement",
    "/doctors/India/Bengaluru/Cardiac-Surgery/Heart-Valve-Replacement",
    "/doctors/India/Chennai/Cardiac-Surgery/Heart-Valve-Replacement",
    "/doctors/India/Hyderabad/Cardiac-Surgery/Heart-Valve-Replacement",
    "/hospitals/India/Delhi-NCR/Cardiac-Surgery",
    "/hospitals/India/Mumbai/Cardiac-Surgery",
    "/hospitals/India/Bengaluru/Cardiac-Surgery",
    "/costs/India/Delhi-NCR/Cardiac-Surgery/Heart-Valve-Replacement",
    "/costs/India/Mumbai/Cardiac-Surgery/Heart-Valve-Replacement",
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
  assert.match(qa.quickAnswer?.items[0]?.question ?? "", /Procedure/i);
  assert.match(qa.quickAnswer?.items[0]?.answer ?? "", /Tricuspid Valve Replacement/i);
  for (const item of qa.quickAnswer!.items) {
    assert.doesNotMatch(item.answer, /\[[^\]]+\]\([^)]+\)/);
  }
  assert.equal(
    treatmentBodyLocation(
      treatment.category,
      treatment.subspecialty,
      treatment.translations.en!.name,
    ),
    "Heart",
  );
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(
    english.includes("https://gaf.healthcare/treatments/tricuspid-valve-replacement-in-india"),
  );
  assert.equal(treatment.translations.ar, undefined);
  assert.doesNotMatch(body, /\/treatments\/india\/cardiology\/tricuspid/);
  assert.doesNotMatch(body, /\/treatments\/mitral-valve-replacement-in-india/);
  assert.doesNotMatch(body, /\/treatments\/aortic-valve-replacement-in-india/);
  assert.doesNotMatch(body, /\/treatments\/tricuspid-valve-repair-in-india/);
  assert.doesNotMatch(body, /\/treatments\/minimally-invasive-heart-surgery-in-india/);
  assert.doesNotMatch(body, /\/doctors\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/hospitals\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  assert.doesNotMatch(body, /\/costs\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);
  const llms = readFileSync("public/llms.txt", "utf8");
  assert.match(llms, /https:\/\/gaf\.healthcare\/treatments\/tricuspid-valve-replacement-in-india/);
  const valve = store.treatments.find((row) => row.slug === "heart-valve-replacement-in-india");
  const tavr = store.treatments.find((row) => row.slug === "tavr-in-india");
  const cabg = store.treatments.find((row) => row.slug === "cabg-surgery-in-india");
  assert.match(valve?.translations.en?.editorialBody ?? "", /\/treatments\/tricuspid-valve-replacement-in-india/);
  assert.match(tavr?.translations.en?.editorialBody ?? "", /\/treatments\/tricuspid-valve-replacement-in-india/);
  assert.match(cabg?.translations.en?.editorialBody ?? "", /\/treatments\/tricuspid-valve-replacement-in-india/);
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

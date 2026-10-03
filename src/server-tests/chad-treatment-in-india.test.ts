import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  CHAD_CANCER_TREATMENT_SLUGS,
  CHAD_COST_PROCEDURE_NAMES,
  CHAD_CURATED_TREATMENT_SLUGS,
  CHAD_OFFICIAL_LINKS,
  CHAD_PAGE_PATH,
  chadPageCopy,
  resolveCuratedBySlug,
  resolveChadCostRows,
} from "@/data/chad-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/chad/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = chadPageCopy("en");

test("the Chad hub is an English-only published route", () => {
  assert.equal(localePageState("en", CHAD_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, CHAD_PAGE_PATH), "missing", locale);
  }
});

test("the Chad hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/chad/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/chad/treatment-in-india")), locale);
  }
});

test("Chad hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    CHAD_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Chadian Patients");
  assert.match(String(meta.description), /Chadian patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/chad/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.en,
    "https://gaf.healthcare/chad/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.["x-default"],
    "https://gaf.healthcare/chad/treatment-in-india",
  );
});

test("Chad hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, CHAD_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, CHAD_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, CHAD_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, CHAD_CANCER_TREATMENT_SLUGS.length);

  const costs = resolveChadCostRows(catalogTreatments);
  assert.equal(costs.length, CHAD_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Chad hub copy stays Chad-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/chad-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /N'Djamena/);
  assert.match(blob, /N'Djamena International Airport/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /not currently included in the Government of India's official e-Visa fee list/);
  assert.match(blob, /18,655/);
  assert.match(blob, /12,047/);
  assert.match(blob, /26,129/);
  assert.match(blob, /GLOBOCAN 2022/);
  assert.match(blob, /13 February 2025/);
  assert.match(blob, /health and pharmaceuticals/);
  assert.match(blob, /French-language/);
  assert.match(blob, /polio/);
  assert.match(copy.hero.h1, /^Medical Treatment in India for Chadian Patients$/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.treatments.length, 15);
  assert.match(
    copy.quickAnswer.evisa,
    /eligibility is nationality-specific and can change/,
  );
  assert.match(
    copy.quickAnswer.french,
    /French-language communication can also be an important consideration/,
  );
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /10,185/);
  assert.doesNotMatch(blob, /7,257/);
  assert.doesNotMatch(blob, /16,255/);
  assert.doesNotMatch(blob, /₹2\.5/);
  assert.doesNotMatch(blob, /\bsave\s+\d+%/i);
  assert.doesNotMatch(blob, /\bguaranteed (results|recovery|quotation|price|outcomes?)\b/i);
  assert.doesNotMatch(blob, /\b100%\s+success\b/i);
  assert.doesNotMatch(blob, /\bcheapest\b/i);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /Best Cities/i);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/treatments\/(kaposi|liver-cancer|oesophageal|esophageal|lung-cancer|endometrial|thyroid-cancer)/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(CHAD_OFFICIAL_LINKS.eVisa, "https://indianvisaonline.gov.in/evisa/tvoa.html");
  assert.equal(CHAD_OFFICIAL_LINKS.embassyVisa, "https://eoindjamena.gov.in/pages/Mjk,");
  assert.equal(
    CHAD_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/148-chad-fact-sheet.pdf",
  );
});

test("the homepage origin-country section links Chad to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /from-your-country/);
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.match(home, /Get a medical opinion/);
  assert.match(home, /wa\.me\/919044346292/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /chad/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Chad" && row.href === "/chad/treatment-in-india"));
});

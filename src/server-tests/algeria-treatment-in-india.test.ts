import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  ALGERIA_CANCER_TREATMENT_SLUGS,
  ALGERIA_COST_PROCEDURE_NAMES,
  ALGERIA_CURATED_TREATMENT_SLUGS,
  ALGERIA_OFFICIAL_LINKS,
  ALGERIA_PAGE_PATH,
  algeriaPageCopy,
  resolveCuratedBySlug,
  resolveAlgeriaCostRows,
} from "@/data/algeria-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/algeria/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = algeriaPageCopy("en");

test("the Algeria hub is an English-only published route", () => {
  assert.equal(localePageState("en", ALGERIA_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, ALGERIA_PAGE_PATH), "missing", locale);
  }
});

test("the Algeria hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/algeria/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/algeria/treatment-in-india")), locale);
  }
});

test("Algeria hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    ALGERIA_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Algerian Patients");
  assert.match(String(meta.description), /Algerian patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/algeria/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.en,
    "https://gaf.healthcare/algeria/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.["x-default"],
    "https://gaf.healthcare/algeria/treatment-in-india",
  );
});

test("Algeria hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, ALGERIA_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, ALGERIA_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, ALGERIA_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, ALGERIA_CANCER_TREATMENT_SLUGS.length);

  const costs = resolveAlgeriaCostRows(catalogTreatments);
  assert.equal(costs.length, ALGERIA_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Algeria hub copy stays Algeria-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/algeria-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Algiers/);
  assert.match(blob, /Houari Boumediene Airport/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /not currently shown on India's official e-Visa fee list/);
  assert.match(blob, /72,825/);
  assert.match(blob, /37,135/);
  assert.match(blob, /184,478/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /July 1962/);
  assert.match(blob, /French/);
  assert.match(copy.hero.h1, /^Medical Treatment in India for Algerian Patients$/);
  assert.ok(copy.faqs.length >= 15);
  assert.match(copy.quickAnswer.heading, /Can Algerian Patients Travel to India/);
  assert.match(copy.quickAnswer.yes, /Algerian citizens can travel to India/);
  assert.match(copy.quickAnswer.visaNote, /not currently shown on India's official e-Visa fee list/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /eligible to apply for India's e-Visa, including the e-Medical Visa category/);
  assert.doesNotMatch(blob, /70% of deaths/);
  assert.doesNotMatch(blob, /Accra/);
  assert.doesNotMatch(blob, /Kotoka/);
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
  assert.equal(ALGERIA_OFFICIAL_LINKS.eVisa, "https://indianvisaonline.gov.in/evisa/tvoa.html");
  assert.equal(ALGERIA_OFFICIAL_LINKS.embassyDocs, "https://www.indianembassyalgiers.gov.in/page/document-for-visa/");
  assert.equal(ALGERIA_OFFICIAL_LINKS.embassyVisa, "https://www.indianembassyalgiers.gov.in/page/visa-services/");
  assert.equal(
    ALGERIA_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/12-algeria-fact-sheet.pdf",
  );
});

test("the homepage origin-country section links Algeria to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /from-your-country/);
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.match(home, /home-origin-cta/);
  assert.match(home, /blogEstimateWhatsapp/);
  assert.match(home, /ORIGIN_COUNTRY_SECTION\.ctaLabel/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /algeria/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Algeria" && row.href === "/algeria/treatment-in-india"));
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  MOROCCO_CANCER_TREATMENT_SLUGS,
  MOROCCO_COST_PROCEDURE_NAMES,
  MOROCCO_CURATED_TREATMENT_SLUGS,
  MOROCCO_OFFICIAL_LINKS,
  MOROCCO_PAGE_PATH,
  moroccoPageCopy,
  resolveCuratedBySlug,
  resolveMoroccoCostRows,
} from "@/data/morocco-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/morocco/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = moroccoPageCopy("en");

test("the Morocco hub is an English-only published route", () => {
  assert.equal(localePageState("en", MOROCCO_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, MOROCCO_PAGE_PATH), "missing", locale);
  }
});

test("the Morocco hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/morocco/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/morocco/treatment-in-india")), locale);
  }
});

test("Morocco hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    MOROCCO_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Moroccan Patients");
  assert.match(String(meta.description), /Moroccan patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/morocco/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.en,
    "https://gaf.healthcare/morocco/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.["x-default"],
    "https://gaf.healthcare/morocco/treatment-in-india",
  );
});

test("Morocco hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, MOROCCO_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, MOROCCO_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, MOROCCO_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, MOROCCO_CANCER_TREATMENT_SLUGS.length);

  const costs = resolveMoroccoCostRows(catalogTreatments);
  assert.equal(costs.length, MOROCCO_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Morocco hub copy stays Morocco-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/morocco-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Casablanca/);
  assert.match(blob, /Mohammed V International Airport/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /Rabat/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /47,944/);
  assert.match(blob, /26,459/);
  assert.match(blob, /113,159/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /French/);
  assert.match(blob, /Arabic/);
  assert.match(blob, /US\$80/);
  assert.match(copy.hero.h1, /^Medical Treatment in India for Moroccan Patients$/);
  assert.ok(copy.faqs.length >= 15);
  assert.match(copy.quickAnswer.heading, /Can Moroccan Patients Travel to India/);
  assert.match(copy.quickAnswer.yes, /Moroccan passport holders are currently included/);
  assert.match(copy.quickAnswer.eligibility, /specifically lists Morocco/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /63,609/);
  assert.doesNotMatch(blob, /36,947/);
  assert.doesNotMatch(blob, /25,125/);
  assert.doesNotMatch(blob, /Harare/);
  assert.doesNotMatch(blob, /Mugabe/);
  assert.doesNotMatch(blob, /Accra/);
  assert.doesNotMatch(blob, /Kotoka/);
  assert.doesNotMatch(blob, /Lusaka/);
  assert.doesNotMatch(blob, /Kenneth Kaunda/);
  assert.doesNotMatch(blob, /15 April 2026/);
  assert.doesNotMatch(blob, /3% bank/);
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
  assert.equal(MOROCCO_OFFICIAL_LINKS.eVisa, "https://indianvisaonline.gov.in/evisa/tvoa.html");
  assert.equal(MOROCCO_OFFICIAL_LINKS.embassy, "https://indianembassyrabat.gov.in/");
  assert.equal(
    MOROCCO_OFFICIAL_LINKS.embassyVisa,
    "https://indianembassyrabat.gov.in/pages?id=vbmOe&nextid=7ax9b&subid=Pdy7a",
  );
  assert.equal(
    MOROCCO_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/504-morocco-fact-sheet.pdf",
  );
});

test("the homepage origin-country section links Morocco to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /from-your-country/);
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.match(home, /Get a medical opinion/);
  assert.match(home, /wa\.me\/919044346292/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /morocco/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Morocco" && row.href === "/morocco/treatment-in-india"));
});

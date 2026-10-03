import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  MAURITIUS_CANCER_TREATMENT_SLUGS,
  MAURITIUS_COST_PROCEDURE_NAMES,
  MAURITIUS_CURATED_TREATMENT_SLUGS,
  MAURITIUS_OFFICIAL_LINKS,
  MAURITIUS_PAGE_PATH,
  mauritiusPageCopy,
  resolveCuratedBySlug,
  resolveMauritiusCostRows,
} from "@/data/mauritius-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/mauritius/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = mauritiusPageCopy("en");

test("the Mauritius hub is an English-only published route", () => {
  assert.equal(localePageState("en", MAURITIUS_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, MAURITIUS_PAGE_PATH), "missing", locale);
  }
});

test("the Mauritius hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/mauritius/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/mauritius/treatment-in-india")), locale);
  }
});

test("Mauritius hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    MAURITIUS_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Mauritian Patients");
  assert.match(String(meta.description), /Mauritian patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/mauritius/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.en,
    "https://gaf.healthcare/mauritius/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.["x-default"],
    "https://gaf.healthcare/mauritius/treatment-in-india",
  );
});

test("Mauritius hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, MAURITIUS_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, MAURITIUS_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, MAURITIUS_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, MAURITIUS_CANCER_TREATMENT_SLUGS.length);

  const costs = resolveMauritiusCostRows(catalogTreatments);
  assert.equal(costs.length, MAURITIUS_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Mauritius hub copy stays Mauritius-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/mauritius-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Port Louis/);
  assert.match(blob, /Sir Seewoosagur Ramgoolam International Airport/);
  assert.match(blob, /High Commission of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /2,976/);
  assert.match(blob, /1,471/);
  assert.match(blob, /7,844/);
  assert.match(blob, /GLOBOCAN 2022/);
  assert.match(blob, /Jawaharlal Nehru Hospital/);
  assert.match(blob, /gratis visa/);
  assert.match(copy.hero.h1, /^Medical Treatment in India for Mauritian Patients$/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.treatments.length, 16);
  assert.match(copy.quickAnswer.evisa, /Mauritian passport holders are currently eligible/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /2,888/);
  assert.doesNotMatch(blob, /8,435/);
  assert.doesNotMatch(blob, /₹2\.5/);
  assert.doesNotMatch(blob, /\bsave\s+\d+%/i);
  assert.doesNotMatch(blob, /\bguaranteed (results|recovery|quotation|price|outcomes?)\b/i);
  assert.doesNotMatch(blob, /\b100%\s+success\b/i);
  assert.doesNotMatch(blob, /\bcheapest\b/i);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /Best Cities/i);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/treatments\/(kaposi|liver-cancer|rectal-cancer|lung-cancer|corpus-uteri)/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);
  assert.doesNotMatch(blob, /yellow-fever-endemic origin is Mauritius/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(MAURITIUS_OFFICIAL_LINKS.eVisa, "https://indianvisaonline.gov.in/evisa/tvoa.html");
  assert.equal(
    MAURITIUS_OFFICIAL_LINKS.hciVisaTypes,
    "https://hcimauritius.gov.in/pages?id=nel5a&subid=YerEd&nextid=mep2b",
  );
  assert.equal(
    MAURITIUS_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/480-mauritius-fact-sheet.pdf",
  );
});

test("the homepage origin-country section links Mauritius to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /from-your-country/);
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.match(home, /#medical-visa/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /mauritius/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Mauritius" && row.href === "/mauritius/treatment-in-india"));
});

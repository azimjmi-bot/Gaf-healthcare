import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  GHANA_CANCER_TREATMENT_SLUGS,
  GHANA_COST_PROCEDURE_NAMES,
  GHANA_CURATED_TREATMENT_SLUGS,
  GHANA_OFFICIAL_LINKS,
  GHANA_PAGE_PATH,
  ghanaPageCopy,
  resolveCuratedBySlug,
  resolveGhanaCostRows,
} from "@/data/ghana-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/ghana/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = ghanaPageCopy("en");

test("the Ghana hub is an English-only published route", () => {
  assert.equal(localePageState("en", GHANA_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, GHANA_PAGE_PATH), "missing", locale);
  }
});

test("the Ghana hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/ghana/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/ghana/treatment-in-india")), locale);
  }
});

test("Ghana hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    GHANA_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Ghanaian Patients");
  assert.match(String(meta.description), /Ghanaian patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/ghana/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.en,
    "https://gaf.healthcare/ghana/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.["x-default"],
    "https://gaf.healthcare/ghana/treatment-in-india",
  );
});

test("Ghana hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, GHANA_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, GHANA_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, GHANA_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, GHANA_CANCER_TREATMENT_SLUGS.length);

  const costs = resolveGhanaCostRows(catalogTreatments);
  assert.equal(costs.length, GHANA_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Ghana hub copy stays Ghana-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/ghana-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Accra/);
  assert.match(blob, /Kotoka International Airport/);
  assert.match(blob, /High Commission of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /27,260/);
  assert.match(blob, /17,662/);
  assert.match(blob, /56,295/);
  assert.match(blob, /GLOBOCAN 2022/);
  assert.match(blob, /yellow-fever/);
  assert.match(copy.hero.h1, /^Medical Treatment in India for Ghanaian Patients$/);
  assert.ok(copy.faqs.length >= 15);
  assert.match(copy.quickAnswer.heading, /Can Ghanaian Patients Travel to India/);
  assert.match(copy.quickAnswer.yes, /Ghanaian passport holders are currently eligible/);
  assert.match(copy.quickAnswer.eligibility, /official list of nationalities/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /27,385/);
  assert.doesNotMatch(blob, /17,944/);
  assert.doesNotMatch(blob, /Lusaka/);
  assert.doesNotMatch(blob, /Kenneth Kaunda/);
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
  assert.equal(GHANA_OFFICIAL_LINKS.eVisa, "https://indianvisaonline.gov.in/evisa/tvoa.html");
  assert.equal(GHANA_OFFICIAL_LINKS.hciVisa, "https://www.hciaccra.gov.in/pages/Nzg5");
  assert.equal(GHANA_OFFICIAL_LINKS.hciTypes, "https://www.hciaccra.gov.in/pages/Nzg4");
  assert.equal(
    GHANA_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/288-ghana-fact-sheet.pdf",
  );
});

test("the homepage origin-country section links Ghana to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /from-your-country/);
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.match(home, /home-origin-cta/);
  assert.match(home, /blogEstimateWhatsapp/);
  assert.match(home, /ORIGIN_COUNTRY_SECTION\.ctaLabel/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /ghana/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Ghana" && row.href === "/ghana/treatment-in-india"));
});

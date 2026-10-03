import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  SUDAN_CANCER_TREATMENT_SLUGS,
  SUDAN_COST_PROCEDURE_NAMES,
  SUDAN_CURATED_TREATMENT_SLUGS,
  SUDAN_OFFICIAL_LINKS,
  SUDAN_PAGE_PATH,
  sudanPageCopy,
  resolveCuratedBySlug,
  resolveSudanCostRows,
} from "@/data/sudan-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/sudan/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = sudanPageCopy("en");

test("the Sudan hub is an English-only published route", () => {
  assert.equal(localePageState("en", SUDAN_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, SUDAN_PAGE_PATH), "missing", locale);
  }
});

test("the Sudan hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/sudan/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/sudan/treatment-in-india")), locale);
  }
});

test("Sudan hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    SUDAN_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Sudanese Patients");
  assert.match(String(meta.description), /Sudanese patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/sudan/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.en,
    "https://gaf.healthcare/sudan/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.["x-default"],
    "https://gaf.healthcare/sudan/treatment-in-india",
  );
});

test("Sudan hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, SUDAN_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, SUDAN_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, SUDAN_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, SUDAN_CANCER_TREATMENT_SLUGS.length);

  const costs = resolveSudanCostRows(catalogTreatments);
  assert.equal(costs.length, SUDAN_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Sudan hub copy stays Sudan-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/sudan-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Khartoum/);
  assert.match(blob, /Port Sudan/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /41,022/);
  assert.match(blob, /25,766/);
  assert.match(blob, /73,087/);
  assert.match(blob, /GLOBOCAN 2022/);
  assert.match(blob, /4,363/);
  assert.match(blob, /34 million/);
  assert.match(copy.hero.h1, /^Medical Treatment in India for Sudanese Patients$/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.length, 6);
  assert.equal(copy.quickAnswer[2]?.question, "Can Sudanese citizens apply for an Indian e-Medical Visa?");
  assert.match(copy.quickAnswer[2]?.answer ?? "", /not included in the current Government of India's published e-Visa eligible-country list/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /28,586/);
  assert.doesNotMatch(blob, /18,504/);
  assert.doesNotMatch(blob, /55,385/);
  assert.doesNotMatch(blob, /\bsave\s+\d+%/i);
  assert.doesNotMatch(blob, /\bguaranteed (results|recovery|quotation|price|outcomes?)\b/i);
  assert.doesNotMatch(blob, /\b100%\s+success\b/i);
  assert.doesNotMatch(blob, /\bcheapest\b/i);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /Best Cities/i);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/treatments\/(kaposi|liver-cancer|rectal-cancer|lung-cancer)/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.equal(SUDAN_OFFICIAL_LINKS.eVisa, "https://indianvisaonline.gov.in/evisa/tvoa.html");
  assert.equal(SUDAN_OFFICIAL_LINKS.embassyVisa, "https://www.eoikhartoum.gov.in/indian-visa.php");
  assert.equal(SUDAN_OFFICIAL_LINKS.globocan, "https://gco.iarc.who.int/media/globocan/factsheets/populations/729-sudan-fact-sheet.pdf");
});

test("the homepage origin-country section links Sudan to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /from-your-country/);
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.match(home, /home-origin-cta/);
  assert.match(home, /blogEstimateWhatsapp/);
  assert.match(home, /ORIGIN_COUNTRY_SECTION\.ctaLabel/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /sudan/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Sudan" && row.href === "/sudan/treatment-in-india"));
});

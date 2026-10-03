import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  SOUTH_SUDAN_CANCER_TREATMENT_SLUGS,
  SOUTH_SUDAN_COST_PROCEDURE_NAMES,
  SOUTH_SUDAN_CURATED_TREATMENT_SLUGS,
  SOUTH_SUDAN_OFFICIAL_LINKS,
  SOUTH_SUDAN_PAGE_PATH,
  southSudanPageCopy,
  resolveCuratedBySlug,
  resolveSouthSudanCostRows,
} from "@/data/south-sudan-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/south-sudan/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = southSudanPageCopy("en");

test("the South Sudan hub is an English-only published route", () => {
  assert.equal(localePageState("en", SOUTH_SUDAN_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, SOUTH_SUDAN_PAGE_PATH), "missing", locale);
  }
});

test("the South Sudan hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/south-sudan/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/south-sudan/treatment-in-india")), locale);
  }
});

test("South Sudan hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    SOUTH_SUDAN_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for South Sudanese Patients");
  assert.match(String(meta.description), /South Sudanese patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/south-sudan/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.en,
    "https://gaf.healthcare/south-sudan/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.["x-default"],
    "https://gaf.healthcare/south-sudan/treatment-in-india",
  );
});

test("South Sudan hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, SOUTH_SUDAN_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, SOUTH_SUDAN_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, SOUTH_SUDAN_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, SOUTH_SUDAN_CANCER_TREATMENT_SLUGS.length);

  const costs = resolveSouthSudanCostRows(catalogTreatments);
  assert.equal(costs.length, SOUTH_SUDAN_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("South Sudan hub copy stays South Sudan-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/south-sudan-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Juba/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /2,556/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /8,124/);
  assert.match(blob, /5,218/);
  assert.match(blob, /11,645/);
  assert.match(blob, /GLOBOCAN 2022/);
  assert.match(blob, /7\.9/);
  assert.match(copy.hero.h1, /^Medical Treatment in India for South Sudanese Patients$/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.length, 5);
  assert.equal(copy.quickAnswer[2]?.question, "Do South Sudanese citizens need a medical visa?");
  assert.match(
    copy.quickAnswer[2]?.answer ?? "",
    /does not appear on the current Government of India's e-Visa eligible-country list/,
  );
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /6,874/);
  assert.doesNotMatch(blob, /5,081/);
  assert.doesNotMatch(blob, /11,547/);
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
  assert.equal(SOUTH_SUDAN_OFFICIAL_LINKS.eVisa, "https://indianvisaonline.gov.in/evisa/tvoa.html");
  assert.equal(SOUTH_SUDAN_OFFICIAL_LINKS.embassyVisa, "https://www.indembjuba.gov.in/page/indian-visa/");
  assert.equal(
    SOUTH_SUDAN_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/728-south-sudan-fact-sheet.pdf",
  );
  assert.equal(
    SOUTH_SUDAN_OFFICIAL_LINKS.meaBrief,
    "https://www.mea.gov.in/Portal/ForeignRelation/India-South_Sudan26.pdf",
  );
});

test("the homepage origin-country section links South Sudan to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /from-your-country/);
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.doesNotMatch(home, /home-origin-visa/);
  assert.doesNotMatch(home, /home-origin-cta/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /south sudan/i.test(row.name)));
  assert.ok(
    ORIGIN_COUNTRY_HUBS.some((row) => row.name === "South Sudan" && row.href === "/south-sudan/treatment-in-india"),
  );
});

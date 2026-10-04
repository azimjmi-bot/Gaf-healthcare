import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS, originCountryHubsByContinent } from "@/data/origin-countries";
import {
  ARMENIA_CANCER_TREATMENT_SLUGS,
  ARMENIA_COST_PROCEDURE_NAMES,
  ARMENIA_CURATED_TREATMENT_SLUGS,
  ARMENIA_OFFICIAL_LINKS,
  ARMENIA_PAGE_PATH,
  armeniaPageCopy,
  resolveCuratedBySlug,
  resolveArmeniaCostRows,
} from "@/data/armenia-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/armenia/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = armeniaPageCopy("en");

test("the Armenia hub is an English-only published route", () => {
  assert.equal(localePageState("en", ARMENIA_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, ARMENIA_PAGE_PATH), "missing", locale);
  }
});

test("the Armenia hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/armenia/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/armenia/treatment-in-india")), locale);
  }
});

test("Armenia hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    ARMENIA_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Armenian Patients");
  assert.match(String(meta.description), /Armenian patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/armenia/treatment-in-india",
  );
});

test("Armenia hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, ARMENIA_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, ARMENIA_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, ARMENIA_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, ARMENIA_CANCER_TREATMENT_SLUGS.length);
  const costs = resolveArmeniaCostRows(catalogTreatments);
  assert.equal(costs.length, ARMENIA_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Armenia hub copy stays Armenia-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/armenia-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Yerevan/);
  assert.match(blob, /Zvartnots International Airport/);
  assert.match(blob, /Yerevan/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /US\$80/);
  assert.match(blob, /10,718/);
  assert.match(blob, /5,468/);
  assert.match(blob, /26,260/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /telemedicine/i);
  assert.match(blob, /Pharmexcil/);
  assert.match(blob, /March 2015/);
  assert.match(blob, /AMD 33,000/);
  assert.match(blob, /pharmaceutical/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.heading, "Quick Answer: Medical Treatment in India for Armenian Patients");
  assert.equal(copy.quickAnswer.items[0]?.question, "Can Armenian patients travel to India for medical treatment?");
  assert.equal(copy.quickAnswer.items[1]?.question, "What treatments can Armenian patients seek in India?");
  assert.equal(copy.quickAnswer.items[2]?.question, "What is the cost of treatment in India?");
  assert.equal(
    copy.quickAnswer.items[3]?.question,
    "Can Armenian patients obtain a medical opinion before travelling?",
  );
  assert.match(copy.visa.points.join(" "), /US\$80/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);
  assert.match(page, /tanzania-hub__sticky/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /9,520/);
  assert.doesNotMatch(blob, /5,861/);
  assert.doesNotMatch(blob, /22,351/);
  assert.doesNotMatch(blob, /GLOBOCAN 2022/);
  assert.doesNotMatch(blob, /Minsk/);
  assert.doesNotMatch(blob, /Belavia/);
  assert.doesNotMatch(blob, /Chișinău/);
  assert.doesNotMatch(blob, /Moscow/);

  assert.doesNotMatch(blob, /Chișinău/);
  assert.doesNotMatch(blob, /Bucharest/);
  assert.doesNotMatch(blob, /80% of deaths/);
  assert.doesNotMatch(blob, /2012 MoU|memorandum signed in 2012/i);
  assert.doesNotMatch(blob, /45-member/);
  assert.doesNotMatch(blob, /Department of Pharmaceuticals and Armenia/);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /Best Cities/i);
  assert.doesNotMatch(blob, /Best Indian Cities/i);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/treatments\/(kaposi|liver-cancer|oesophageal|esophageal|lung-cancer|endometrial|thyroid-cancer|stomach-cancer|cataract|rectal-cancer)/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(ARMENIA_OFFICIAL_LINKS.embassy, "https://eoiyerevan.gov.in/");
  assert.equal(
    ARMENIA_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/51-armenia-fact-sheet.pdf",
  );
});

test("the homepage origin-country section links Armenia under Europe", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.match(home, /originCountryHubsByContinent/);
  assert.match(home, /group\.continent/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /armenia/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Armenia" && row.href === "/armenia/treatment-in-india"));
  const groups = originCountryHubsByContinent();
  assert.deepEqual(
    groups.map((group) => group.continent),
    ["Africa", "Central Asia", "Europe"],
  );
  assert.ok(groups[2]?.countries.some((row) => row.name === "Armenia"));
  assert.ok(groups[2]?.countries.some((row) => row.name === "Belarus"));
  assert.ok(groups[2]?.countries.some((row) => row.name === "Moldova"));
  assert.ok(groups[2]?.countries.some((row) => row.name === "Ukraine"));
  assert.ok(groups[2]?.countries.some((row) => row.name === "Russia"));
});

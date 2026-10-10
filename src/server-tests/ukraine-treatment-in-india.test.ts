import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS, originCountryHubsByContinent } from "@/data/origin-countries";
import {
  UKRAINE_CANCER_TREATMENT_SLUGS,
  UKRAINE_COST_PROCEDURE_NAMES,
  UKRAINE_CURATED_TREATMENT_SLUGS,
  UKRAINE_OFFICIAL_LINKS,
  UKRAINE_PAGE_PATH,
  ukrainePageCopy,
  resolveCuratedBySlug,
  resolveUkraineCostRows,
} from "@/data/ukraine-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/ukraine/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = ukrainePageCopy("en");

test("the Ukraine hub is an English-only published route", () => {
  assert.equal(localePageState("en", UKRAINE_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, UKRAINE_PAGE_PATH), "missing", locale);
  }
});

test("the Ukraine hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/ukraine/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/ukraine/treatment-in-india")), locale);
  }
});

test("Ukraine hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    UKRAINE_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Ukrainian Patients");
  assert.match(String(meta.description), /Ukrainian patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/ukraine/treatment-in-india",
  );
});

test("Ukraine hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, UKRAINE_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, UKRAINE_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, UKRAINE_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, UKRAINE_CANCER_TREATMENT_SLUGS.length);
  const costs = resolveUkraineCostRows(catalogTreatments);
  assert.equal(costs.length, UKRAINE_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Ukraine hub copy stays Ukraine-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/ukraine-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Kyiv/);
  assert.match(blob, /Lviv/);
  assert.match(blob, /Odesa/);
  assert.match(blob, /Dnipro/);
  assert.match(blob, /Kharkiv/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /US\$85/);
  assert.match(blob, /153,699/);
  assert.match(blob, /82,596/);
  assert.match(blob, /368,579/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /Joint Working Group/);
  assert.match(blob, /Covishield/);
  assert.match(blob, /2,763/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.heading, "Quick Answer: Medical Treatment in India for Ukrainian Patients");
  assert.equal(copy.quickAnswer.items[0]?.question, "Can Ukrainian citizens travel to India for medical treatment?");
  assert.equal(copy.quickAnswer.items[1]?.question, "What treatments can Ukrainian patients seek in India?");
  assert.equal(copy.quickAnswer.items[2]?.question, "How much does treatment in India cost for Ukrainian patients?");
  assert.equal(copy.quickAnswer.items[3]?.question, "Can Ukrainian patients get an Indian medical opinion before travelling?");
  assert.match(copy.visa.points.join(" "), /US\$85/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);
  assert.match(page, /tanzania-hub__sticky/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /155,239/);
  assert.doesNotMatch(blob, /84,153/);
  assert.doesNotMatch(blob, /414,286/);
  assert.doesNotMatch(blob, /Tashkent/);
  assert.doesNotMatch(blob, /Samarkand/);
  assert.doesNotMatch(blob, /Kampala/);
  assert.doesNotMatch(blob, /GLOBOCAN 2022/);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /Best Cities/i);
  assert.doesNotMatch(blob, /Best Indian Cities/i);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/treatments\/(kaposi|liver-cancer|oesophageal|esophageal|lung-cancer|endometrial|thyroid-cancer|stomach-cancer|cataract|rectal-cancer)/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(UKRAINE_OFFICIAL_LINKS.embassy, "https://www.eoiukraine.gov.in/");
  assert.equal(
    UKRAINE_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/804-ukraine-fact-sheet.pdf",
  );
});

test("the homepage origin-country section links Ukraine under Europe", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.match(home, /originCountryHubsByContinent/);
  assert.match(home, /group\.continent/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /ukraine/i.test(row.name)));
  assert.ok(
    ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Ukraine" && row.href === "/ukraine/treatment-in-india"),
  );
  const groups = originCountryHubsByContinent();
  assert.deepEqual(
    groups.map((group) => group.continent),
    ["Africa", "Central Asia", "Europe"],
  );
  assert.ok(groups[2]?.countries.some((row) => row.name === "Ukraine"));
});

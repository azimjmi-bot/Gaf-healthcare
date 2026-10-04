import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS, originCountryHubsByContinent } from "@/data/origin-countries";
import {
  UZBEKISTAN_CANCER_TREATMENT_SLUGS,
  UZBEKISTAN_COST_PROCEDURE_NAMES,
  UZBEKISTAN_CURATED_TREATMENT_SLUGS,
  UZBEKISTAN_OFFICIAL_LINKS,
  UZBEKISTAN_PAGE_PATH,
  uzbekistanPageCopy,
  resolveCuratedBySlug,
  resolveUzbekistanCostRows,
} from "@/data/uzbekistan-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/uzbekistan/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = uzbekistanPageCopy("en");

test("the Uzbekistan hub is an English-only published route", () => {
  assert.equal(localePageState("en", UZBEKISTAN_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, UZBEKISTAN_PAGE_PATH), "missing", locale);
  }
});

test("the Uzbekistan hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/uzbekistan/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/uzbekistan/treatment-in-india")), locale);
  }
});

test("Uzbekistan hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    UZBEKISTAN_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Uzbek Patients");
  assert.match(String(meta.description), /Uzbek patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/uzbekistan/treatment-in-india",
  );
});

test("Uzbekistan hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, UZBEKISTAN_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, UZBEKISTAN_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, UZBEKISTAN_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, UZBEKISTAN_CANCER_TREATMENT_SLUGS.length);
  const costs = resolveUzbekistanCostRows(catalogTreatments);
  assert.equal(costs.length, UZBEKISTAN_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Uzbekistan hub copy stays Uzbekistan-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/uzbekistan-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Tashkent/);
  assert.match(blob, /Samarkand/);
  assert.match(blob, /Bukhara/);
  assert.match(blob, /Andijan/);
  assert.match(blob, /Fergana/);
  assert.match(blob, /Namangan/);
  assert.match(blob, /Tashkent International Airport/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /US\$80/);
  assert.match(blob, /38,465/);
  assert.match(blob, /22,509/);
  assert.match(blob, /93,727/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /8,000/);
  assert.match(blob, /Covishield/);
  assert.match(blob, /Joint Working Group/);
  assert.match(blob, /Central Asia/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.heading, "Quick Answer: Medical Treatment in India for Uzbek Patients");
  assert.equal(copy.quickAnswer.items[0]?.question, "Can Uzbek citizens travel to India for medical treatment?");
  assert.match(copy.quickAnswer.items[1]?.answer ?? "", /8,000/);
  assert.match(copy.visa.points.join(" "), /US\$80/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);
  assert.match(page, /tanzania-hub__sticky/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /35,900/);
  assert.doesNotMatch(blob, /22,071/);
  assert.doesNotMatch(blob, /92,913/);
  assert.doesNotMatch(blob, /29,966/);
  assert.doesNotMatch(blob, /Kampala/);
  assert.doesNotMatch(blob, /Entebbe/);
  assert.doesNotMatch(blob, /Mulago/);
  assert.doesNotMatch(blob, /hcikampala/i);
  assert.doesNotMatch(blob, /Dakar/);
  assert.doesNotMatch(blob, /GLOBOCAN 2022/);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /Best Cities/i);
  assert.doesNotMatch(blob, /Best Indian Cities/i);
  assert.doesNotMatch(blob, /80\.1%/);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/treatments\/(kaposi|liver-cancer|oesophageal|esophageal|lung-cancer|endometrial|thyroid-cancer|stomach-cancer|cataract|rectal-cancer)/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(UZBEKISTAN_OFFICIAL_LINKS.embassy, "https://eoitashkent.gov.in/");
  assert.equal(
    UZBEKISTAN_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/860-uzbekistan-fact-sheet.pdf",
  );
});

test("the homepage origin-country section links Uzbekistan under Central Asia", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.match(home, /originCountryHubsByContinent/);
  assert.match(home, /group\.continent/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /uzbekistan/i.test(row.name)));
  assert.ok(
    ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Uzbekistan" && row.href === "/uzbekistan/treatment-in-india"),
  );
  const groups = originCountryHubsByContinent();
  assert.deepEqual(
    groups.map((group) => group.continent),
    ["Africa", "Central Asia"],
  );
  assert.ok(groups[1]?.countries.some((row) => row.name === "Uzbekistan"));
});

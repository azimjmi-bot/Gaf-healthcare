import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS, originCountryHubsByContinent } from "@/data/origin-countries";
import {
  KYRGYZSTAN_CANCER_TREATMENT_SLUGS,
  KYRGYZSTAN_COST_PROCEDURE_NAMES,
  KYRGYZSTAN_CURATED_TREATMENT_SLUGS,
  KYRGYZSTAN_OFFICIAL_LINKS,
  KYRGYZSTAN_PAGE_PATH,
  kyrgyzstanPageCopy,
  resolveCuratedBySlug,
  resolveKyrgyzstanCostRows,
} from "@/data/kyrgyzstan-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/kyrgyzstan/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = kyrgyzstanPageCopy("en");

test("the Kyrgyzstan hub is an English-only published route", () => {
  assert.equal(localePageState("en", KYRGYZSTAN_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, KYRGYZSTAN_PAGE_PATH), "missing", locale);
  }
});

test("the Kyrgyzstan hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/kyrgyzstan/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/kyrgyzstan/treatment-in-india")), locale);
  }
});

test("Kyrgyzstan hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    KYRGYZSTAN_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Kyrgyz Patients");
  assert.match(String(meta.description), /Kyrgyz patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/kyrgyzstan/treatment-in-india",
  );
});

test("Kyrgyzstan hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, KYRGYZSTAN_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, KYRGYZSTAN_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, KYRGYZSTAN_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, KYRGYZSTAN_CANCER_TREATMENT_SLUGS.length);
  const costs = resolveKyrgyzstanCostRows(catalogTreatments);
  assert.equal(costs.length, KYRGYZSTAN_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Kyrgyzstan hub copy stays Kyrgyzstan-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/kyrgyzstan-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Bishkek/);
  assert.match(blob, /Manas International Airport/);
  assert.match(blob, /Osh/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /US\$80/);
  assert.match(blob, /8,902/);
  assert.match(blob, /5,139/);
  assert.match(blob, /20,130/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /Bhabhatron-II/);
  assert.match(blob, /telemedicine/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.heading, "Quick Answer: Medical Treatment in India for Kyrgyz Patients");
  assert.equal(copy.quickAnswer.items[0]?.question, "Can Kyrgyz patients travel to India for medical treatment?");
  assert.equal(copy.quickAnswer.items[1]?.question, "What treatments can Kyrgyz patients seek in India?");
  assert.equal(copy.quickAnswer.items[2]?.question, "How much does treatment in India cost for Kyrgyz patients?");
  assert.equal(
    copy.quickAnswer.items[3]?.question,
    "Can Kyrgyz patients obtain an Indian medical opinion before travelling?",
  );
  assert.match(copy.visa.points.join(" "), /US\$80/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);
  assert.match(page, /tanzania-hub__sticky/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /7,266/);
  assert.doesNotMatch(blob, /4,672/);
  assert.doesNotMatch(blob, /16,883/);
  assert.doesNotMatch(blob, /GLOBOCAN 2022/);
  assert.doesNotMatch(blob, /4th India–Central Asia Dialogue/);
  assert.doesNotMatch(blob, /June 2025/);
  assert.doesNotMatch(blob, /Chișinău/);
  assert.doesNotMatch(blob, /Bucharest/);
  assert.doesNotMatch(blob, /Tashkent/);
  assert.doesNotMatch(blob, /Ashgabat/);
  assert.doesNotMatch(blob, /Moscow/);
  assert.doesNotMatch(blob, /Kyiv/);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /Best Cities/i);
  assert.doesNotMatch(blob, /Best Indian Cities/i);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/treatments\/(kaposi|liver-cancer|oesophageal|esophageal|lung-cancer|endometrial|thyroid-cancer|stomach-cancer|cataract|rectal-cancer)/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(KYRGYZSTAN_OFFICIAL_LINKS.embassy, "https://indembbishkek.gov.in/");
  assert.equal(
    KYRGYZSTAN_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/417-kyrgyzstan-fact-sheet.pdf",
  );
});

test("the homepage origin-country section links Kyrgyzstan under Central Asia", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.match(home, /originCountryHubsByContinent/);
  assert.match(home, /group\.continent/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /kyrgyz/i.test(row.name)));
  assert.ok(
    ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Kyrgyzstan" && row.href === "/kyrgyzstan/treatment-in-india"),
  );
  const groups = originCountryHubsByContinent();
  assert.deepEqual(
    groups.map((group) => group.continent),
    ["Africa", "Central Asia", "Europe"],
  );
  assert.ok(groups[1]?.countries.some((row) => row.name === "Kyrgyzstan"));
  assert.ok(groups[1]?.countries.some((row) => row.name === "Uzbekistan"));
  assert.ok(groups[1]?.countries.some((row) => row.name === "Turkmenistan"));
});

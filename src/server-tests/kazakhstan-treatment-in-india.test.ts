import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS, originCountryHubsByContinent } from "@/data/origin-countries";
import {
  KAZAKHSTAN_CANCER_TREATMENT_SLUGS,
  KAZAKHSTAN_COST_PROCEDURE_NAMES,
  KAZAKHSTAN_CURATED_TREATMENT_SLUGS,
  KAZAKHSTAN_OFFICIAL_LINKS,
  KAZAKHSTAN_PAGE_PATH,
  kazakhstanPageCopy,
  resolveCuratedBySlug,
  resolveKazakhstanCostRows,
} from "@/data/kazakhstan-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/kazakhstan/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = kazakhstanPageCopy("en");

test("the Kazakhstan hub is an English-only published route", () => {
  assert.equal(localePageState("en", KAZAKHSTAN_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, KAZAKHSTAN_PAGE_PATH), "missing", locale);
  }
});

test("the Kazakhstan hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/kazakhstan/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/kazakhstan/treatment-in-india")), locale);
  }
});

test("Kazakhstan hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    KAZAKHSTAN_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Kazakhstani Patients");
  assert.match(String(meta.description), /Kazakhstani patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/kazakhstan/treatment-in-india",
  );
});

test("Kazakhstan hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, KAZAKHSTAN_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, KAZAKHSTAN_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, KAZAKHSTAN_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, KAZAKHSTAN_CANCER_TREATMENT_SLUGS.length);
  const costs = resolveKazakhstanCostRows(catalogTreatments);
  assert.equal(costs.length, KAZAKHSTAN_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Kazakhstan hub copy stays Kazakhstan-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/kazakhstan-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Almaty/);
  assert.match(blob, /Astana/);
  assert.match(blob, /Almaty International Airport/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /US\$00/);
  assert.match(blob, /29,851/);
  assert.match(blob, /16,355/);
  assert.match(blob, /79,521/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /Pharmaceuticals and Healthcare/);
  assert.match(blob, /Pharmexcil/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.heading, "Quick Answer: Medical Treatment in India for Kazakhstani Patients");
  assert.equal(copy.quickAnswer.items[0]?.question, "Can Kazakhstani patients travel to India for medical treatment?");
  assert.equal(copy.quickAnswer.items[1]?.question, "What treatments can Kazakhstani patients seek in India?");
  assert.equal(copy.quickAnswer.items[2]?.question, "How much does treatment in India cost for Kazakhstani patients?");
  assert.equal(
    copy.quickAnswer.items[3]?.question,
    "Can Kazakhstani patients obtain an Indian medical opinion before travelling?",
  );
  assert.match(copy.visa.points.join(" "), /US\$00/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);
  assert.match(page, /tanzania-hub__sticky/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /1,327/);
  assert.doesNotMatch(blob, /8,902/);
  assert.doesNotMatch(blob, /GLOBOCAN 2022/);
  assert.doesNotMatch(blob, /4th India–Central Asia Dialogue/);
  assert.doesNotMatch(blob, /June 2025/);
  assert.doesNotMatch(blob, /Bishkek/);
  assert.doesNotMatch(blob, /Bhabhatron/);
  assert.doesNotMatch(blob, /Manas/);
  assert.doesNotMatch(blob, /Tashkent/);
  assert.doesNotMatch(blob, /Ashgabat/);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /Best Cities/i);
  assert.doesNotMatch(blob, /Best Indian Cities/i);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/treatments\/(kaposi|liver-cancer|oesophageal|esophageal|lung-cancer|endometrial|thyroid-cancer|stomach-cancer|cataract|rectal-cancer)/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(KAZAKHSTAN_OFFICIAL_LINKS.embassy, "https://www.indembastana.gov.in/");
  assert.equal(
    KAZAKHSTAN_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/398-kazakhstan-fact-sheet.pdf",
  );
});

test("the homepage origin-country section links Kazakhstan under Central Asia", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.match(home, /originCountryHubsByContinent/);
  assert.match(home, /group\.continent/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /kazakh/i.test(row.name)));
  assert.ok(
    ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Kazakhstan" && row.href === "/kazakhstan/treatment-in-india"),
  );
  const groups = originCountryHubsByContinent();
  assert.deepEqual(
    groups.map((group) => group.continent),
    ["Africa", "Central Asia", "Europe"],
  );
  assert.ok(groups[1]?.countries.some((row) => row.name === "Kazakhstan"));
  assert.ok(groups[1]?.countries.some((row) => row.name === "Kyrgyzstan"));
  assert.ok(groups[1]?.countries.some((row) => row.name === "Uzbekistan"));
});

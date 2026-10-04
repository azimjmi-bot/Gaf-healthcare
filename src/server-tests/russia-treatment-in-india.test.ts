import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS, originCountryHubsByContinent } from "@/data/origin-countries";
import {
  RUSSIA_CANCER_TREATMENT_SLUGS,
  RUSSIA_COST_PROCEDURE_NAMES,
  RUSSIA_CURATED_TREATMENT_SLUGS,
  RUSSIA_OFFICIAL_LINKS,
  RUSSIA_PAGE_PATH,
  russiaPageCopy,
  resolveCuratedBySlug,
  resolveRussiaCostRows,
} from "@/data/russia-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/russia/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = russiaPageCopy("en");

test("the Russia hub is an English-only published route", () => {
  assert.equal(localePageState("en", RUSSIA_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, RUSSIA_PAGE_PATH), "missing", locale);
  }
});

test("the Russia hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/russia/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/russia/treatment-in-india")), locale);
  }
});

test("Russia hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    RUSSIA_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Russian Patients");
  assert.match(String(meta.description), /Russian patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/russia/treatment-in-india",
  );
});

test("Russia hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, RUSSIA_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, RUSSIA_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, RUSSIA_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, RUSSIA_CANCER_TREATMENT_SLUGS.length);
  const costs = resolveRussiaCostRows(catalogTreatments);
  assert.equal(costs.length, RUSSIA_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Russia hub copy stays Russia-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/russia-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Moscow/);
  assert.match(blob, /Saint Petersburg/);
  assert.match(blob, /Yekaterinburg/);
  assert.match(blob, /Novosibirsk/);
  assert.match(blob, /Kazan/);
  assert.match(blob, /Vladivostok/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /US\$120/);
  assert.match(blob, /US\$100/);
  assert.match(blob, /633,830/);
  assert.match(blob, /307,941/);
  assert.match(blob, /1,741,099/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /Special and Privileged Strategic Partnership/);
  assert.match(blob, /20,000/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.heading, "Quick Answer: Medical Treatment in India for Russian Patients");
  assert.equal(copy.quickAnswer.items[0]?.question, "Can Russian patients travel to India for medical treatment?");
  assert.equal(copy.quickAnswer.items[1]?.question, "What treatments can Russian patients seek in India?");
  assert.equal(copy.quickAnswer.items[2]?.question, "How much does treatment in India cost for Russian patients?");
  assert.equal(
    copy.quickAnswer.items[3]?.question,
    "Can Russian patients obtain an Indian medical opinion before travelling?",
  );
  assert.match(copy.visa.points.join(" "), /US\$120/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);
  assert.match(page, /tanzania-hub__sticky/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /635,560/);
  assert.doesNotMatch(blob, /311,729/);
  assert.doesNotMatch(blob, /1,868,265/);
  assert.doesNotMatch(blob, /GLOBOCAN 2022/);
  assert.doesNotMatch(blob, /Kyiv/);
  assert.doesNotMatch(blob, /Ashgabat/);
  assert.doesNotMatch(blob, /Tashkent/);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /Best Cities/i);
  assert.doesNotMatch(blob, /Best Indian Cities/i);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/treatments\/(kaposi|liver-cancer|oesophageal|esophageal|lung-cancer|endometrial|thyroid-cancer|stomach-cancer|cataract|rectal-cancer)/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(RUSSIA_OFFICIAL_LINKS.embassy, "https://indianembassy-moscow.gov.in/");
  assert.equal(
    RUSSIA_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/643-russian-federation-fact-sheet.pdf",
  );
});

test("the homepage origin-country section links Russia under Europe", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.match(home, /originCountryHubsByContinent/);
  assert.match(home, /group\.continent/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /russia/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Russia" && row.href === "/russia/treatment-in-india"));
  const groups = originCountryHubsByContinent();
  assert.deepEqual(
    groups.map((group) => group.continent),
    ["Africa", "Central Asia", "Europe"],
  );
  assert.ok(groups[2]?.countries.some((row) => row.name === "Russia"));
  assert.ok(groups[2]?.countries.some((row) => row.name === "Ukraine"));
});

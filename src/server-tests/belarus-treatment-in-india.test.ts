import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS, originCountryHubsByContinent } from "@/data/origin-countries";
import {
  BELARUS_CANCER_TREATMENT_SLUGS,
  BELARUS_COST_PROCEDURE_NAMES,
  BELARUS_CURATED_TREATMENT_SLUGS,
  BELARUS_OFFICIAL_LINKS,
  BELARUS_PAGE_PATH,
  belarusPageCopy,
  resolveCuratedBySlug,
  resolveBelarusCostRows,
} from "@/data/belarus-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/belarus/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = belarusPageCopy("en");

test("the Belarus hub is an English-only published route", () => {
  assert.equal(localePageState("en", BELARUS_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, BELARUS_PAGE_PATH), "missing", locale);
  }
});

test("the Belarus hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/belarus/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/belarus/treatment-in-india")), locale);
  }
});

test("Belarus hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    BELARUS_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Belarusian Patients");
  assert.match(String(meta.description), /Belarusian patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/belarus/treatment-in-india",
  );
});

test("Belarus hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, BELARUS_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, BELARUS_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, BELARUS_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, BELARUS_CANCER_TREATMENT_SLUGS.length);
  const costs = resolveBelarusCostRows(catalogTreatments);
  assert.equal(costs.length, BELARUS_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Belarus hub copy stays Belarus-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/belarus-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Minsk/);
  assert.match(blob, /Minsk National Airport/);
  assert.match(blob, /Minsk/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /US\$80/);
  assert.match(blob, /46,420/);
  assert.match(blob, /22,838/);
  assert.match(blob, /127,422/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /Joint Working Group/);
  assert.match(blob, /Belavia/);
  assert.match(blob, /19 March 2026/);
  assert.match(blob, /US\$120/);
  assert.match(blob, /pharmaceutical/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.heading, "Quick Answer: Medical Treatment in India for Belarusian Patients");
  assert.equal(copy.quickAnswer.items[0]?.question, "Can Belarusian patients travel to India for medical treatment?");
  assert.equal(copy.quickAnswer.items[1]?.question, "What treatments can Belarusian patients seek in India?");
  assert.equal(copy.quickAnswer.items[2]?.question, "How much does treatment in India cost for Belarusian patients?");
  assert.equal(
    copy.quickAnswer.items[3]?.question,
    "Can Belarusian patients get an Indian medical opinion before travelling?",
  );
  assert.match(copy.visa.points.join(" "), /US\$80/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);
  assert.match(page, /tanzania-hub__sticky/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /11,349/);
  assert.doesNotMatch(blob, /6,141/);
  assert.doesNotMatch(blob, /28,151/);
  assert.doesNotMatch(blob, /GLOBOCAN 2022/);
  assert.doesNotMatch(blob, /Almaty/);
  assert.doesNotMatch(blob, /Astana/);
  assert.doesNotMatch(blob, /Bishkek/);

  assert.doesNotMatch(blob, /Chișinău/);
  assert.doesNotMatch(blob, /Bucharest/);
  assert.doesNotMatch(blob, /80% of deaths/);
  assert.doesNotMatch(blob, /2012 MoU|memorandum signed in 2012/i);
  assert.doesNotMatch(blob, /45-member/);
  assert.doesNotMatch(blob, /Department of Pharmaceuticals and Belarus/);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /Best Cities/i);
  assert.doesNotMatch(blob, /Best Indian Cities/i);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/treatments\/(kaposi|liver-cancer|oesophageal|esophageal|lung-cancer|endometrial|thyroid-cancer|stomach-cancer|cataract|rectal-cancer)/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(BELARUS_OFFICIAL_LINKS.embassy, "https://www.eoiminsk.gov.in/");
  assert.equal(
    BELARUS_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/112-belarus-fact-sheet.pdf",
  );
});

test("the homepage origin-country section links Belarus under Europe", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.match(home, /originCountryHubsByContinent/);
  assert.match(home, /group\.continent/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /belarus/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Belarus" && row.href === "/belarus/treatment-in-india"));
  const groups = originCountryHubsByContinent();
  assert.deepEqual(
    groups.map((group) => group.continent),
    ["Africa", "Central Asia", "Europe"],
  );
  assert.ok(groups[2]?.countries.some((row) => row.name === "Belarus"));
  assert.ok(groups[2]?.countries.some((row) => row.name === "Moldova"));
  assert.ok(groups[2]?.countries.some((row) => row.name === "Ukraine"));
  assert.ok(groups[2]?.countries.some((row) => row.name === "Russia"));
});

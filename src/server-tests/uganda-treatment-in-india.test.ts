import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  UGANDA_CANCER_TREATMENT_SLUGS,
  UGANDA_COST_PROCEDURE_NAMES,
  UGANDA_CURATED_TREATMENT_SLUGS,
  UGANDA_OFFICIAL_LINKS,
  UGANDA_PAGE_PATH,
  ugandaPageCopy,
  resolveCuratedBySlug,
  resolveUgandaCostRows,
} from "@/data/uganda-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/uganda/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = ugandaPageCopy("en");

test("the Uganda hub is an English-only published route", () => {
  assert.equal(localePageState("en", UGANDA_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, UGANDA_PAGE_PATH), "missing", locale);
  }
});

test("the Uganda hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/uganda/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/uganda/treatment-in-india")), locale);
  }
});

test("Uganda hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    UGANDA_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Ugandan Patients");
  assert.match(String(meta.description), /Ugandan patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/uganda/treatment-in-india",
  );
});

test("Uganda hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, UGANDA_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, UGANDA_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, UGANDA_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, UGANDA_CANCER_TREATMENT_SLUGS.length);
  const costs = resolveUgandaCostRows(catalogTreatments);
  assert.equal(costs.length, UGANDA_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Uganda hub copy stays Uganda-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/uganda-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Kampala/);
  assert.match(blob, /Entebbe/);
  assert.match(blob, /Jinja/);
  assert.match(blob, /Mbarara/);
  assert.match(blob, /Gulu/);
  assert.match(blob, /Entebbe International Airport/);
  assert.match(blob, /Mulago/);
  assert.match(blob, /High Commission of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /US\$80/);
  assert.match(blob, /29,966/);
  assert.match(blob, /18,205/);
  assert.match(blob, /59,662/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /10 September 2026/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.heading, "Quick Answer: Medical Treatment in India for Ugandan Patients");
  assert.equal(copy.quickAnswer.items[0]?.question, "Can Ugandan patients travel to India for medical treatment?");
  assert.match(copy.quickAnswer.items[1]?.answer ?? "", /US\$80/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);
  assert.match(page, /tanzania-hub__sticky/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /35,968/);
  assert.doesNotMatch(blob, /24,629/);
  assert.doesNotMatch(blob, /77,028/);
  assert.doesNotMatch(blob, /14,358/);
  assert.doesNotMatch(blob, /Dakar/);
  assert.doesNotMatch(blob, /embassyofindiadakar/i);
  assert.doesNotMatch(blob, /TEAM-9/);
  assert.doesNotMatch(blob, /GLOBOCAN 2022/);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /Best Cities/i);
  assert.doesNotMatch(blob, /Best Indian Cities/i);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/treatments\/(kaposi|liver-cancer|oesophageal|esophageal|lung-cancer|endometrial|thyroid-cancer|stomach-cancer|cataract|rectal-cancer)/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(UGANDA_OFFICIAL_LINKS.embassy, "https://hcikampala.gov.in/");
  assert.equal(
    UGANDA_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/800-uganda-fact-sheet.pdf",
  );
});

test("the homepage origin-country section links Uganda to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /uganda/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Uganda" && row.href === "/uganda/treatment-in-india"));
});

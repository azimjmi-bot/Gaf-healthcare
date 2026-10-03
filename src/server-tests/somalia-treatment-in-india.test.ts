import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  SOMALIA_CANCER_TREATMENT_SLUGS,
  SOMALIA_COST_PROCEDURE_NAMES,
  SOMALIA_CURATED_TREATMENT_SLUGS,
  SOMALIA_OFFICIAL_LINKS,
  SOMALIA_PAGE_PATH,
  somaliaPageCopy,
  resolveCuratedBySlug,
  resolveSomaliaCostRows,
} from "@/data/somalia-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/somalia/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = somaliaPageCopy("en");

test("the Somalia hub is an English-only published route", () => {
  assert.equal(localePageState("en", SOMALIA_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, SOMALIA_PAGE_PATH), "missing", locale);
  }
});

test("the Somalia hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/somalia/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/somalia/treatment-in-india")), locale);
  }
});

test("Somalia hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    SOMALIA_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Somali Patients");
  assert.match(String(meta.description), /Somali patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/somalia/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.en,
    "https://gaf.healthcare/somalia/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.["x-default"],
    "https://gaf.healthcare/somalia/treatment-in-india",
  );
});

test("Somalia hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, SOMALIA_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, SOMALIA_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, SOMALIA_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, SOMALIA_CANCER_TREATMENT_SLUGS.length);

  const costs = resolveSomaliaCostRows(catalogTreatments);
  assert.equal(costs.length, SOMALIA_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Somalia hub copy stays Somalia-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/somalia-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Mogadishu/);
  assert.match(blob, /Hargeisa/);
  assert.match(blob, /Garowe/);
  assert.match(blob, /Bosaso/);
  assert.match(blob, /Kismayo/);
  assert.match(blob, /Aden Adde International Airport/);
  assert.match(blob, /High Commission of India/);
  assert.match(blob, /Nairobi/);
  assert.match(blob, /Addis Ababa/);
  assert.match(blob, /concurrently accredited/);
  assert.match(blob, /e-VBAB/);
  assert.match(blob, /5,252/);
  assert.match(blob, /oral-polio/);
  assert.match(blob, /9,983/);
  assert.match(blob, /6,155/);
  assert.match(blob, /14,392/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /US\$1 million/);
  assert.match(copy.hero.h1, /^Medical Treatment in India for Somali Patients$/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.heading, "Quick Answer: Medical Treatment in India for Somali Patients");
  assert.equal(copy.quickAnswer.items[0]?.question, "Can Somali patients travel to India for medical treatment?");
  assert.match(copy.quickAnswer.items[1]?.answer ?? "", /should not assume that the e-Medical Visa/);
  assert.match(copy.quickAnswer.items[2]?.answer ?? "", /Nairobi/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);
  assert.match(page, /tanzania-hub__sticky/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /10,681/);
  assert.doesNotMatch(blob, /8,038/);
  assert.doesNotMatch(blob, /12,983/);
  assert.doesNotMatch(blob, /14,358/);
  assert.doesNotMatch(blob, /Dakar/);
  assert.doesNotMatch(blob, /embassyofindiadakar/i);
  assert.doesNotMatch(blob, /Thiès/);
  assert.doesNotMatch(blob, /TEAM-9/);
  assert.doesNotMatch(blob, /GLOBOCAN 2022/);
  assert.doesNotMatch(blob, /₹2\.5/);
  assert.doesNotMatch(blob, /\bsave\s+\d+%/i);
  assert.doesNotMatch(blob, /\bguaranteed (results|recovery|quotation|price|outcomes?)\b/i);
  assert.doesNotMatch(blob, /\b100%\s+success\b/i);
  assert.doesNotMatch(blob, /\bcheapest\b/i);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /Best Cities/i);
  assert.doesNotMatch(blob, /Best Indian Cities/i);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/treatments\/(kaposi|liver-cancer|oesophageal|esophageal|lung-cancer|endometrial|thyroid-cancer|stomach-cancer|cataract|rectal-cancer)/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(SOMALIA_OFFICIAL_LINKS.eVisa, "https://indianvisaonline.gov.in/evisa/tvoa.html");
  assert.equal(SOMALIA_OFFICIAL_LINKS.embassy, "https://www.hcinairobi.gov.in/");
  assert.equal(SOMALIA_OFFICIAL_LINKS.embassyVisa, "https://hcinairobi.gov.in/Visa_Types");
  assert.equal(SOMALIA_OFFICIAL_LINKS.addis, "https://eoiaddisababa.gov.in/");
  assert.equal(
    SOMALIA_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/706-somalia-fact-sheet.pdf",
  );
  assert.equal(
    SOMALIA_OFFICIAL_LINKS.meaBrief,
    "https://www.mea.gov.in/Portal/ForeignRelation/India-Somalia-April-2026.pdf",
  );
});

test("the homepage origin-country section links Somalia to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /from-your-country/);
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.doesNotMatch(home, /home-origin-visa/);
  assert.doesNotMatch(home, /home-origin-cta/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /somalia/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Somalia" && row.href === "/somalia/treatment-in-india"));
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  RWANDA_CANCER_TREATMENT_SLUGS,
  RWANDA_COST_PROCEDURE_NAMES,
  RWANDA_CURATED_TREATMENT_SLUGS,
  RWANDA_OFFICIAL_LINKS,
  RWANDA_PAGE_PATH,
  rwandaPageCopy,
  resolveCuratedBySlug,
  resolveRwandaCostRows,
} from "@/data/rwanda-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/rwanda/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = rwandaPageCopy("en");

test("the Rwanda hub is an English-only published route", () => {
  assert.equal(localePageState("en", RWANDA_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, RWANDA_PAGE_PATH), "missing", locale);
  }
});

test("the Rwanda hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/rwanda/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/rwanda/treatment-in-india")), locale);
  }
});

test("Rwanda hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    RWANDA_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Rwandan Patients");
  assert.match(String(meta.description), /Rwandan patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/rwanda/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.en,
    "https://gaf.healthcare/rwanda/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.["x-default"],
    "https://gaf.healthcare/rwanda/treatment-in-india",
  );
});

test("Rwanda hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, RWANDA_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, RWANDA_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, RWANDA_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, RWANDA_CANCER_TREATMENT_SLUGS.length);

  const costs = resolveRwandaCostRows(catalogTreatments);
  assert.equal(costs.length, RWANDA_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Rwanda hub copy stays Rwanda-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/rwanda-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Kigali/);
  assert.match(blob, /Huye/);
  assert.match(blob, /Musanze/);
  assert.match(blob, /Rubavu/);
  assert.match(blob, /Muhanga/);
  assert.match(blob, /Kigali International Airport/);
  assert.match(blob, /High Commission of India/);
  assert.match(blob, /Kampala till further notice/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /Kinyarwanda/);
  assert.match(blob, /12,440/);
  assert.match(blob, /7,991/);
  assert.match(blob, /23,979/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /COVISHIELD/);
  assert.match(blob, /India-UN Development Partnership Fund/);
  assert.match(blob, /not currently listed among yellow-fever endemic countries/);
  assert.match(copy.hero.h1, /^Medical Treatment in India for Rwandan Patients$/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.heading, "Quick Answer: Medical Treatment in India for Rwandan Patients");
  assert.equal(copy.quickAnswer.items[0]?.question, "Can Rwandan patients travel to India for medical treatment?");
  assert.match(copy.quickAnswer.items[1]?.answer ?? "", /e-Visa eligible-country list/);
  assert.match(copy.quickAnswer.items[5]?.answer ?? "", /Kinyarwanda/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);
  assert.match(page, /tanzania-hub__sticky/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /7,122/);
  assert.doesNotMatch(blob, /4,887/);
  assert.doesNotMatch(blob, /14,954/);
  assert.doesNotMatch(blob, /4,205/);
  assert.doesNotMatch(blob, /2,520/);
  assert.doesNotMatch(blob, /9,089/);
  assert.doesNotMatch(blob, /Windhoek/);
  assert.doesNotMatch(blob, /Hosea Kutako/);
  assert.doesNotMatch(blob, /hciwindhoek/i);
  assert.doesNotMatch(blob, /Lilongwe/);
  assert.doesNotMatch(blob, /Bhabhatron/);
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
  assert.equal(RWANDA_OFFICIAL_LINKS.eVisa, "https://indianvisaonline.gov.in/evisa/tvoa.html");
  assert.equal(RWANDA_OFFICIAL_LINKS.embassy, "https://hcikigali.gov.in/");
  assert.equal(RWANDA_OFFICIAL_LINKS.embassyVisa, "https://hcikigali.gov.in/visa.php");
  assert.equal(
    RWANDA_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/646-rwanda-fact-sheet.pdf",
  );
  assert.equal(
    RWANDA_OFFICIAL_LINKS.meaBrief,
    "https://www.mea.gov.in/Portal/ForeignRelation/India-Rwanda26.pdf",
  );
});

test("the homepage origin-country section links Rwanda to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /from-your-country/);
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.doesNotMatch(home, /home-origin-visa/);
  assert.doesNotMatch(home, /home-origin-cta/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /rwanda/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Rwanda" && row.href === "/rwanda/treatment-in-india"));
});

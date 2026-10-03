import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  LIBERIA_CANCER_TREATMENT_SLUGS,
  LIBERIA_COST_PROCEDURE_NAMES,
  LIBERIA_CURATED_TREATMENT_SLUGS,
  LIBERIA_OFFICIAL_LINKS,
  LIBERIA_PAGE_PATH,
  liberiaPageCopy,
  resolveCuratedBySlug,
  resolveLiberiaCostRows,
} from "@/data/liberia-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/liberia/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = liberiaPageCopy("en");

test("the Liberia hub is an English-only published route", () => {
  assert.equal(localePageState("en", LIBERIA_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, LIBERIA_PAGE_PATH), "missing", locale);
  }
});

test("the Liberia hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/liberia/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/liberia/treatment-in-india")), locale);
  }
});

test("Liberia hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    LIBERIA_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Liberian Patients");
  assert.match(String(meta.description), /Liberian patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/liberia/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.en,
    "https://gaf.healthcare/liberia/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.["x-default"],
    "https://gaf.healthcare/liberia/treatment-in-india",
  );
});

test("Liberia hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, LIBERIA_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, LIBERIA_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, LIBERIA_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, LIBERIA_CANCER_TREATMENT_SLUGS.length);

  const costs = resolveLiberiaCostRows(catalogTreatments);
  assert.equal(costs.length, LIBERIA_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Liberia hub copy stays Liberia-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/liberia-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Monrovia/);
  assert.match(blob, /Roberts International Airport/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /4,217/);
  assert.match(blob, /2,745/);
  assert.match(blob, /7,311/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /yellow-fever/);
  assert.match(blob, /Gbarnga/);
  assert.match(blob, /Buchanan/);
  assert.match(blob, /L\. V\. Prasad/);
  assert.match(blob, /JFK Memorial Hospital/);
  assert.match(blob, /preferred destination/);
  assert.match(copy.hero.h1, /^Medical Treatment in India for Liberian Patients$/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.heading, "Quick Answer: Medical Treatment in India for Liberian Patients");
  assert.match(copy.quickAnswer.intro, /Liberian patients may consider Indian hospitals/);
  assert.match(copy.quickAnswer.close, /after medical review/);
  assert.ok(copy.quickAnswer.treatments.includes("Cancer treatment"));
  assert.ok(copy.quickAnswer.treatments.includes("Eye treatment"));
  assert.ok(copy.quickAnswer.treatments.includes("Second opinions for complex diagnoses"));
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);
  assert.match(page, /tanzania-hub__sticky/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /3,873/);
  assert.doesNotMatch(blob, /2,730/);
  assert.doesNotMatch(blob, /7,210/);
  assert.doesNotMatch(blob, /11,592/);
  assert.doesNotMatch(blob, /8,777/);
  assert.doesNotMatch(blob, /eoiconakry/i);
  assert.doesNotMatch(blob, /Conakry/);
  assert.doesNotMatch(blob, /Ahmed Sékou Touré/);
  assert.doesNotMatch(blob, /e-VBAB/);
  assert.doesNotMatch(blob, /GLOBOCAN 2022/);
  assert.doesNotMatch(blob, /₹2\.5/);
  assert.doesNotMatch(blob, /\bsave\s+\d+%/i);
  assert.doesNotMatch(blob, /\bguaranteed (results|recovery|quotation|price|outcomes?)\b/i);
  assert.doesNotMatch(blob, /\b100%\s+success\b/i);
  assert.doesNotMatch(blob, /\bcheapest\b/i);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /Best Cities/i);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/treatments\/(kaposi|liver-cancer|oesophageal|esophageal|lung-cancer|endometrial|thyroid-cancer|stomach-cancer|cataract)/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("Eye") && !row.href));
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(LIBERIA_OFFICIAL_LINKS.eVisa, "https://indianvisaonline.gov.in/evisa/tvoa.html");
  assert.equal(LIBERIA_OFFICIAL_LINKS.embassy, "https://www.indianembassymonrovia.gov.in/");
  assert.equal(LIBERIA_OFFICIAL_LINKS.embassyVisa, "https://www.indianembassymonrovia.gov.in/visa-services.php");
  assert.equal(LIBERIA_OFFICIAL_LINKS.embassyEvisa, "https://www.indianembassymonrovia.gov.in/e-visa.php");
  assert.equal(
    LIBERIA_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/430-liberia-fact-sheet.pdf",
  );
  assert.equal(
    LIBERIA_OFFICIAL_LINKS.meaBrief,
    "https://www.mea.gov.in/Portal/ForeignRelation/India-Liberia26.pdf",
  );
});

test("the homepage origin-country section links Liberia to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /from-your-country/);
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.doesNotMatch(home, /home-origin-visa/);
  assert.doesNotMatch(home, /home-origin-cta/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /liberia/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Liberia" && row.href === "/liberia/treatment-in-india"));
});

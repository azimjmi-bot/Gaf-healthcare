import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  COTE_DIVOIRE_CANCER_TREATMENT_SLUGS,
  COTE_DIVOIRE_COST_PROCEDURE_NAMES,
  COTE_DIVOIRE_CURATED_TREATMENT_SLUGS,
  COTE_DIVOIRE_OFFICIAL_LINKS,
  COTE_DIVOIRE_PAGE_PATH,
  coteDivoirePageCopy,
  resolveCuratedBySlug,
  resolveCoteDivoireCostRows,
} from "@/data/cote-divoire-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/cote-divoire/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = coteDivoirePageCopy("en");

test("the Côte d’Ivoire hub is an English-only published route", () => {
  assert.equal(localePageState("en", COTE_DIVOIRE_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, COTE_DIVOIRE_PAGE_PATH), "missing", locale);
  }
});

test("the Côte d’Ivoire hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/cote-divoire/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/cote-divoire/treatment-in-india")), locale);
  }
});

test("Côte d’Ivoire hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    COTE_DIVOIRE_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Ivorian Patients");
  assert.match(String(meta.description), /Ivorian patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/cote-divoire/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.en,
    "https://gaf.healthcare/cote-divoire/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.["x-default"],
    "https://gaf.healthcare/cote-divoire/treatment-in-india",
  );
});

test("Côte d’Ivoire hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, COTE_DIVOIRE_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, COTE_DIVOIRE_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, COTE_DIVOIRE_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, COTE_DIVOIRE_CANCER_TREATMENT_SLUGS.length);

  const costs = resolveCoteDivoireCostRows(catalogTreatments);
  assert.equal(costs.length, COTE_DIVOIRE_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Côte d’Ivoire hub copy stays Côte d’Ivoire-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/cote-divoire-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Abidjan/);
  assert.match(blob, /Félix-Houphouët-Boigny International Airport/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /20,402/);
  assert.match(blob, /12,710/);
  assert.match(blob, /37,794/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /French/);
  assert.match(blob, /yellow-fever/);
  assert.match(blob, /Bouaké/);
  assert.match(copy.hero.h1, /^Medical Treatment in India for Ivorian Patients$/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.heading, "Quick Answer: Medical Treatment in India for Ivorian Patients");
  assert.match(copy.quickAnswer.yes, /Ivorian patients can travel to India for a wide range of specialised treatments/);
  assert.match(copy.quickAnswer.visaNote, /official e-Visa eligible-country list/);
  assert.equal(copy.quickAnswer.steps.length, 10);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);
  assert.match(page, /tanzania-hub__sticky/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /21,352/);
  assert.doesNotMatch(blob, /14,143/);
  assert.doesNotMatch(blob, /43,601/);
  assert.doesNotMatch(blob, /4,041/);
  assert.doesNotMatch(blob, /3,869/);
  assert.doesNotMatch(blob, /13,631/);
  assert.doesNotMatch(blob, /48,000 CFA/);
  assert.doesNotMatch(blob, /71,000 CFA/);
  assert.doesNotMatch(blob, /Thomas Sankara/);
  assert.doesNotMatch(blob, /Bobo-Dioulasso/);
  assert.doesNotMatch(blob, /eoiburkina/i);
  assert.doesNotMatch(blob, /GLOBOCAN 2022/);
  assert.doesNotMatch(blob, /₹2\.5/);
  assert.doesNotMatch(blob, /\bsave\s+\d+%/i);
  assert.doesNotMatch(blob, /\bguaranteed (results|recovery|quotation|price|outcomes?)\b/i);
  assert.doesNotMatch(blob, /\b100%\s+success\b/i);
  assert.doesNotMatch(blob, /\bcheapest\b/i);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /Best Cities/i);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/treatments\/(kaposi|liver-cancer|oesophageal|esophageal|lung-cancer|endometrial|thyroid-cancer|stomach-cancer)/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(COTE_DIVOIRE_OFFICIAL_LINKS.eVisa, "https://indianvisaonline.gov.in/evisa/tvoa.html");
  assert.equal(COTE_DIVOIRE_OFFICIAL_LINKS.embassy, "https://www.eoiabidjan.gov.in/");
  assert.equal(
    COTE_DIVOIRE_OFFICIAL_LINKS.embassyEvisa,
    "https://www.eoiabidjan.gov.in/page/e-visa-services/",
  );
  assert.equal(
    COTE_DIVOIRE_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/384-cote-divoire-fact-sheet.pdf",
  );
  assert.equal(
    COTE_DIVOIRE_OFFICIAL_LINKS.meaBrief,
    "https://www.mea.gov.in/Portal/ForeignRelation/India-Cote-d-ivoire26apr.pdf",
  );
});

test("the homepage origin-country section links Côte d’Ivoire to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /from-your-country/);
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.doesNotMatch(home, /home-origin-visa/);
  assert.doesNotMatch(home, /home-origin-cta/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /ivoire|ivory/i.test(row.name)));
  assert.ok(
    ORIGIN_COUNTRY_HUBS.some(
      (row) => row.name === "Côte d'Ivoire" && row.href === "/cote-divoire/treatment-in-india",
    ),
  );
});

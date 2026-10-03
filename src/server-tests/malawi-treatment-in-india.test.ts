import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  MALAWI_CANCER_TREATMENT_SLUGS,
  MALAWI_COST_PROCEDURE_NAMES,
  MALAWI_CURATED_TREATMENT_SLUGS,
  MALAWI_OFFICIAL_LINKS,
  MALAWI_PAGE_PATH,
  malawiPageCopy,
  resolveCuratedBySlug,
  resolveMalawiCostRows,
} from "@/data/malawi-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/malawi/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = malawiPageCopy("en");

test("the Malawi hub is an English-only published route", () => {
  assert.equal(localePageState("en", MALAWI_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, MALAWI_PAGE_PATH), "missing", locale);
  }
});

test("the Malawi hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/malawi/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/malawi/treatment-in-india")), locale);
  }
});

test("Malawi hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    MALAWI_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Malawian Patients");
  assert.match(String(meta.description), /Malawian patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/malawi/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.en,
    "https://gaf.healthcare/malawi/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.["x-default"],
    "https://gaf.healthcare/malawi/treatment-in-india",
  );
});

test("Malawi hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, MALAWI_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, MALAWI_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, MALAWI_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, MALAWI_CANCER_TREATMENT_SLUGS.length);

  const costs = resolveMalawiCostRows(catalogTreatments);
  assert.equal(costs.length, MALAWI_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Malawi hub copy stays Malawi-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/malawi-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Lilongwe/);
  assert.match(blob, /Blantyre/);
  assert.match(blob, /Mzuzu/);
  assert.match(blob, /Kamuzu International Airport/);
  assert.match(blob, /Chileka International Airport/);
  assert.match(blob, /High Commission of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /23,246/);
  assert.match(blob, /13,676/);
  assert.match(blob, /44,968/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /Bhabhatron/);
  assert.match(blob, /Kamuzu Central Hospital/);
  assert.match(blob, /Chichewa/);
  assert.match(blob, /not currently listed among yellow-fever endemic countries/);
  assert.match(copy.hero.h1, /^Medical Treatment in India for Malawian Patients$/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.heading, "Quick Answer: Medical Treatment in India for Malawian Patients");
  assert.match(copy.quickAnswer.intro, /Malawian patients may consider Indian hospitals/);
  assert.match(copy.quickAnswer.hospital, /diagnosis, treatment required, specialist expertise, hospital facilities, medical records and expected length of stay/);
  assert.match(copy.quickAnswer.close, /online ranking|lowest quotation/);
  assert.ok(copy.quickAnswer.treatments.includes("Cancer treatment"));
  assert.ok(!copy.quickAnswer.treatments.includes("Eye treatment"));
  assert.ok(copy.quickAnswer.treatments.includes("Second opinions for complex diagnoses"));
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);
  assert.match(page, /tanzania-hub__sticky/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /19,846/);
  assert.doesNotMatch(blob, /13,979/);
  assert.doesNotMatch(blob, /39,667/);
  assert.doesNotMatch(blob, /4,701/);
  assert.doesNotMatch(blob, /4,217/);
  assert.doesNotMatch(blob, /2,745/);
  assert.doesNotMatch(blob, /7,311/);
  assert.doesNotMatch(blob, /Monrovia/);
  assert.doesNotMatch(blob, /indianembassymonrovia/i);
  assert.doesNotMatch(blob, /430-malawi/);
  assert.doesNotMatch(blob, /eoiabidjan/i);
  assert.doesNotMatch(blob, /L\. V\. Prasad/);
  assert.doesNotMatch(blob, /JFK Memorial Hospital/);
  assert.doesNotMatch(blob, /Roberts International Airport/);
  assert.doesNotMatch(blob, /pharmacopoeial/i);
  assert.doesNotMatch(blob, /hospital twinning/i);
  assert.doesNotMatch(blob, /health tourism/i);
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
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(MALAWI_OFFICIAL_LINKS.eVisa, "https://indianvisaonline.gov.in/evisa/tvoa.html");
  assert.equal(MALAWI_OFFICIAL_LINKS.embassy, "https://www.hcililongwe.gov.in/");
  assert.equal(MALAWI_OFFICIAL_LINKS.embassyVisa, "https://www.hcililongwe.gov.in/page/visa-services/");
  assert.equal(MALAWI_OFFICIAL_LINKS.embassyEvisa, "https://www.hcililongwe.gov.in/page/e-visa-for-malawi-nationals/");
  assert.equal(
    MALAWI_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/454-malawi-fact-sheet.pdf",
  );
  assert.equal(
    MALAWI_OFFICIAL_LINKS.meaBrief,
    "https://www.mea.gov.in/Portal/ForeignRelation/India-Malawi-2025.pdf",
  );
});

test("the homepage origin-country section links Malawi to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /from-your-country/);
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.doesNotMatch(home, /home-origin-visa/);
  assert.doesNotMatch(home, /home-origin-cta/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /malawi/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Malawi" && row.href === "/malawi/treatment-in-india"));
});

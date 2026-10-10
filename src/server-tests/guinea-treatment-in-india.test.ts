import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  GUINEA_CANCER_TREATMENT_SLUGS,
  GUINEA_COST_PROCEDURE_NAMES,
  GUINEA_CURATED_TREATMENT_SLUGS,
  GUINEA_OFFICIAL_LINKS,
  GUINEA_PAGE_PATH,
  guineaPageCopy,
  resolveCuratedBySlug,
  resolveGuineaCostRows,
} from "@/data/guinea-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/guinea/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = guineaPageCopy("en");

test("the Guinea hub is an English-only published route", () => {
  assert.equal(localePageState("en", GUINEA_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, GUINEA_PAGE_PATH), "missing", locale);
  }
});

test("the Guinea hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/guinea/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/guinea/treatment-in-india")), locale);
  }
});

test("Guinea hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    GUINEA_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Guinean Patients");
  assert.match(String(meta.description), /Guinean patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/guinea/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.en,
    "https://gaf.healthcare/guinea/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.["x-default"],
    "https://gaf.healthcare/guinea/treatment-in-india",
  );
});

test("Guinea hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, GUINEA_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, GUINEA_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, GUINEA_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, GUINEA_CANCER_TREATMENT_SLUGS.length);

  const costs = resolveGuineaCostRows(catalogTreatments);
  assert.equal(costs.length, GUINEA_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Guinea hub copy stays Guinea-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/guinea-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Conakry/);
  assert.match(blob, /Ahmed Sékou Touré International Airport/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /11,592/);
  assert.match(blob, /7,746/);
  assert.match(blob, /19,129/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /French/);
  assert.match(blob, /yellow-fever/);
  assert.match(blob, /Kankan/);
  assert.match(blob, /Nzérékoré/);
  assert.match(blob, /e-VBAB/);
  assert.match(blob, /six tons/);
  assert.match(copy.hero.h1, /^Medical Treatment in India for Guinean Patients$/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.heading, "Quick Answer: Medical Treatment in India for Guinean Patients");
  assert.match(copy.quickAnswer.intro, /Guinean patients may consider Indian hospitals/);
  assert.match(copy.quickAnswer.close, /after medical review/);
  assert.ok(copy.quickAnswer.treatments.includes("Cancer treatment"));
  assert.ok(copy.quickAnswer.treatments.includes("Second opinions for complex diagnoses"));
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);
  assert.match(page, /tanzania-hub__sticky/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /8,777/);
  assert.doesNotMatch(blob, /6,363/);
  assert.doesNotMatch(blob, /16,392/);
  assert.doesNotMatch(blob, /2,551/);
  assert.doesNotMatch(blob, /20,402/);
  assert.doesNotMatch(blob, /4,845/);
  assert.doesNotMatch(blob, /12,710/);
  assert.doesNotMatch(blob, /37,794/);
  assert.doesNotMatch(blob, /49,100 CFA/);
  assert.doesNotMatch(blob, /73,600 CFA/);
  assert.doesNotMatch(blob, /Félix-Houphouët-Boigny/);
  assert.doesNotMatch(blob, /eoiabidjan/i);
  assert.doesNotMatch(blob, /Grand Bassam/);
  assert.doesNotMatch(blob, /Yopougon/);
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
  assert.equal(GUINEA_OFFICIAL_LINKS.eVisa, "https://indianvisaonline.gov.in/evisa/tvoa.html");
  assert.equal(GUINEA_OFFICIAL_LINKS.embassy, "https://eoiconakry.gov.in/");
  assert.equal(GUINEA_OFFICIAL_LINKS.embassyVisa, "https://www.eoiconakry.gov.in/visa.php");
  assert.equal(GUINEA_OFFICIAL_LINKS.embassyYf, "https://eoiconakry.gov.in/advisory.php");
  assert.equal(
    GUINEA_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/324-guinea-fact-sheet.pdf",
  );
  assert.equal(
    GUINEA_OFFICIAL_LINKS.meaBrief,
    "https://www.mea.gov.in/Portal/ForeignRelation/India-Guinea-2025.pdf",
  );
});

test("the homepage origin-country section links Guinea to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /from-your-country/);
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.doesNotMatch(home, /home-origin-visa/);
  assert.doesNotMatch(home, /home-origin-cta/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /guinea/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Guinea" && row.href === "/guinea/treatment-in-india"));
});

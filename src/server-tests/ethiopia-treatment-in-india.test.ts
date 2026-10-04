import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  ETHIOPIA_CANCER_TREATMENT_SLUGS,
  ETHIOPIA_COST_PROCEDURE_NAMES,
  ETHIOPIA_CURATED_TREATMENT_SLUGS,
  ETHIOPIA_OFFICIAL_LINKS,
  ETHIOPIA_PAGE_PATH,
  ethiopiaPageCopy,
  resolveCuratedBySlug,
  resolveEthiopiaCostRows,
} from "@/data/ethiopia-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/ethiopia/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = ethiopiaPageCopy("en");

test("the Ethiopia hub is an English-only published route", () => {
  assert.equal(localePageState("en", ETHIOPIA_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, ETHIOPIA_PAGE_PATH), "missing", locale);
  }
});

test("the Ethiopia hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/ethiopia/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/ethiopia/treatment-in-india")), locale);
  }
});

test("Ethiopia hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    ETHIOPIA_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Ethiopian Patients");
  assert.match(String(meta.description), /Ethiopian patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/ethiopia/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.en,
    "https://gaf.healthcare/ethiopia/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.["x-default"],
    "https://gaf.healthcare/ethiopia/treatment-in-india",
  );
});

test("Ethiopia hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, ETHIOPIA_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, ETHIOPIA_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, ETHIOPIA_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, ETHIOPIA_CANCER_TREATMENT_SLUGS.length);

  const costs = resolveEthiopiaCostRows(catalogTreatments);
  assert.equal(costs.length, ETHIOPIA_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Ethiopia hub copy stays Ethiopia-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/ethiopia-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Addis Ababa/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /yellow fever/i);
  assert.match(blob, /not currently included in the Government of India's e-Visa eligible-country list/);
  assert.match(copy.hero.h1, /^Medical Treatment in India for Ethiopian Patients$/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.length, 6);
  assert.equal(copy.quickAnswer[1]?.question, "Can Ethiopian patients get an Indian e-Medical Visa?");
  assert.equal(copy.journey.steps.length, 10);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /\bsave\s+\d+%/i);
  assert.doesNotMatch(blob, /\bguaranteed (results|recovery|quotation|price|outcomes?)\b/i);
  assert.doesNotMatch(blob, /\b100%\s+success\b/i);
  assert.doesNotMatch(blob, /\bcheapest\b/i);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);
  assert.doesNotMatch(blob, /Ethiopian healthcare is (inadequate|poor|weak)/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(ETHIOPIA_OFFICIAL_LINKS.eVisa, "https://indianvisaonline.gov.in/evisa/tvoa.html");
  assert.equal(ETHIOPIA_OFFICIAL_LINKS.embassy, "https://eoiaddisababa.gov.in/embassy/");
  assert.equal(
    ETHIOPIA_OFFICIAL_LINKS.yellowFever,
    "https://eoiaddisababa.gov.in/wp-content/uploads/2025/11/Yellow-Fever-Awarness.pdf",
  );
});

test("the homepage origin-country section links Ethiopia and Tanzania to published hubs", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /from-your-country/);
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.match(home, /country\.href/);
  assert.doesNotMatch(home, /home-origin-visa/);
  assert.doesNotMatch(home, /home-origin-cta/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /ethiopia|tanzania/i.test(row.name)));
  assert.deepEqual(
    ORIGIN_COUNTRY_HUBS.map((row) => ({ name: row.name, href: row.href })),
    [
      { name: "Algeria", href: "/algeria/treatment-in-india" },
      { name: "Angola", href: "/angola/treatment-in-india" },
      { name: "Armenia", href: "/armenia/treatment-in-india" },
      { name: "Belarus", href: "/belarus/treatment-in-india" },
      { name: "Benin", href: "/benin/treatment-in-india" },
      { name: "Botswana", href: "/botswana/treatment-in-india" },
      { name: "Burkina Faso", href: "/burkina-faso/treatment-in-india" },
      { name: "Chad", href: "/chad/treatment-in-india" },
      { name: "Côte d'Ivoire", href: "/cote-divoire/treatment-in-india" },
      { name: "Ethiopia", href: "/ethiopia/treatment-in-india" },
      { name: "Ghana", href: "/ghana/treatment-in-india" },
      { name: "Guinea", href: "/guinea/treatment-in-india" },
      { name: "Kazakhstan", href: "/kazakhstan/treatment-in-india" },
      { name: "Kenya", href: "/kenya/treatment-in-india" },
      { name: "Kyrgyzstan", href: "/kyrgyzstan/treatment-in-india" },
      { name: "Liberia", href: "/liberia/treatment-in-india" },
      { name: "Malawi", href: "/malawi/treatment-in-india" },
      { name: "Mauritius", href: "/mauritius/treatment-in-india" },
      { name: "Moldova", href: "/moldova/treatment-in-india" },
      { name: "Morocco", href: "/morocco/treatment-in-india" },
      { name: "Mozambique", href: "/mozambique/treatment-in-india" },
      { name: "Namibia", href: "/namibia/treatment-in-india" },
      { name: "Nigeria", href: "/nigeria/treatment-in-india" },
      { name: "Russia", href: "/russia/treatment-in-india" },
      { name: "Rwanda", href: "/rwanda/treatment-in-india" },
      { name: "Senegal", href: "/senegal/treatment-in-india" },
      { name: "Somalia", href: "/somalia/treatment-in-india" },
      { name: "South Africa", href: "/south-africa/treatment-in-india" },
      { name: "South Sudan", href: "/south-sudan/treatment-in-india" },
      { name: "Sudan", href: "/sudan/treatment-in-india" },
      { name: "Tanzania", href: "/tanzania/treatment-in-india" },
      { name: "Turkmenistan", href: "/turkmenistan/treatment-in-india" },
      { name: "Uganda", href: "/uganda/treatment-in-india" },
      { name: "Ukraine", href: "/ukraine/treatment-in-india" },
      { name: "Uzbekistan", href: "/uzbekistan/treatment-in-india" },
      { name: "Zambia", href: "/zambia/treatment-in-india" },
      { name: "Zimbabwe", href: "/zimbabwe/treatment-in-india" },
    ],
  );
});

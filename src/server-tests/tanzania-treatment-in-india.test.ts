import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  TANZANIA_CANCER_TREATMENT_SLUGS,
  TANZANIA_COST_PROCEDURE_NAMES,
  TANZANIA_CURATED_TREATMENT_SLUGS,
  TANZANIA_OFFICIAL_LINKS,
  TANZANIA_PAGE_PATH,
  resolveCostRows,
  resolveCuratedBySlug,
  tanzaniaPageCopy,
} from "@/data/tanzania-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/tanzania/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = tanzaniaPageCopy("en");

test("the Tanzania hub is an English-only published route", () => {
  assert.equal(localePageState("en", TANZANIA_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, TANZANIA_PAGE_PATH), "missing", locale);
  }
});

test("the Tanzania hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/tanzania/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/tanzania/treatment-in-india")), locale);
  }
});

test("Tanzania hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    TANZANIA_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Tanzanian Patients");
  assert.match(String(meta.description), /Tanzanian patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/tanzania/treatment-in-india",
  );
  assert.equal((meta.alternates as { languages?: Record<string, string> })?.languages?.en, "https://gaf.healthcare/tanzania/treatment-in-india");
  assert.equal((meta.alternates as { languages?: Record<string, string> })?.languages?.["x-default"], "https://gaf.healthcare/tanzania/treatment-in-india");
});

test("Tanzania hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, TANZANIA_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, TANZANIA_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, TANZANIA_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, TANZANIA_CANCER_TREATMENT_SLUGS.length);

  const costs = resolveCostRows(catalogTreatments);
  assert.equal(costs.length, TANZANIA_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Tanzania hub copy stays Tanzania-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/tanzania-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Dar es Salaam/);
  assert.match(blob, /High Commission of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(copy.hero.h1, /^Medical Treatment in India for Tanzanian Patients$/);
  assert.equal(copy.faqs.length, 16);
  assert.equal(copy.quickAnswer.length, 6);
  assert.equal(copy.journey.steps.length, 8);

  assert.doesNotMatch(blob, /97%\s+of\s+(Tanzania'?s\s+)?overseas referrals were going to India/i);
  assert.doesNotMatch(blob, /\bguaranteed (results|recovery|quotation|price)/i);
  assert.doesNotMatch(blob, /\b100%\s+success\b/i);
  assert.doesNotMatch(blob, /\bcheapest\b/i);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(TANZANIA_OFFICIAL_LINKS.eVisa, "https://indianvisaonline.gov.in/evisa/tvoa.html");
  assert.equal(TANZANIA_OFFICIAL_LINKS.hciMedicalVisa, "https://hcindiatz.gov.in/medical-visa.php");
});

test("the homepage origin-country section links Tanzania to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /from-your-country/);
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.match(home, /country\.href/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /tanzania/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Tanzania" && row.href === "/tanzania/treatment-in-india"));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Ethiopia" && row.href === "/ethiopia/treatment-in-india"));
});

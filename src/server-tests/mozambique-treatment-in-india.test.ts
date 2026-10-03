import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  MOZAMBIQUE_CANCER_TREATMENT_SLUGS,
  MOZAMBIQUE_COST_PROCEDURE_NAMES,
  MOZAMBIQUE_CURATED_TREATMENT_SLUGS,
  MOZAMBIQUE_OFFICIAL_LINKS,
  MOZAMBIQUE_PAGE_PATH,
  mozambiquePageCopy,
  resolveCuratedBySlug,
  resolveMozambiqueCostRows,
} from "@/data/mozambique-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/mozambique/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = mozambiquePageCopy("en");

test("the Mozambique hub is an English-only published route", () => {
  assert.equal(localePageState("en", MOZAMBIQUE_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, MOZAMBIQUE_PAGE_PATH), "missing", locale);
  }
});

test("the Mozambique hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/mozambique/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/mozambique/treatment-in-india")), locale);
  }
});

test("Mozambique hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    MOZAMBIQUE_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Mozambican Patients");
  assert.match(String(meta.description), /Mozambican patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/mozambique/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.en,
    "https://gaf.healthcare/mozambique/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.["x-default"],
    "https://gaf.healthcare/mozambique/treatment-in-india",
  );
});

test("Mozambique hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, MOZAMBIQUE_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, MOZAMBIQUE_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, MOZAMBIQUE_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, MOZAMBIQUE_CANCER_TREATMENT_SLUGS.length);

  const costs = resolveMozambiqueCostRows(catalogTreatments);
  assert.equal(costs.length, MOZAMBIQUE_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Mozambique hub copy stays Mozambique-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/mozambique-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Maputo/);
  assert.match(blob, /Nampula/);
  assert.match(blob, /High Commission of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /25,058/);
  assert.match(blob, /GLOBOCAN 2022/);
  assert.match(copy.hero.h1, /^Medical Treatment in India for Mozambican Patients$/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.length, 6);
  assert.equal(copy.quickAnswer[1]?.question, "Is an e-Medical Visa available for Mozambican citizens?");
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /26,578/);
  assert.doesNotMatch(blob, /\bsave\s+\d+%/i);
  assert.doesNotMatch(blob, /\bguaranteed (results|recovery|quotation|price|outcomes?)\b/i);
  assert.doesNotMatch(blob, /\b100%\s+success\b/i);
  assert.doesNotMatch(blob, /\bcheapest\b/i);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /Best Cities/i);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/treatments\/(kaposi|liver-cancer|rectal-cancer|lung-cancer)/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.equal(MOZAMBIQUE_OFFICIAL_LINKS.eVisa, "https://indianvisaonline.gov.in/evisa/tvoa.html");
  assert.equal(MOZAMBIQUE_OFFICIAL_LINKS.hciEvisa, "https://www.hcimaputo.gov.in/page/e-visa/");
  assert.equal(MOZAMBIQUE_OFFICIAL_LINKS.hciRegular, "https://www.hcimaputo.gov.in/page/regular-visas/");
});

test("the homepage origin-country section links Mozambique to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /from-your-country/);
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.match(home, /Get a medical opinion/);
  assert.match(home, /wa\.me\/919044346292/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /mozambique/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Mozambique" && row.href === "/mozambique/treatment-in-india"));
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  SOUTH_AFRICA_CANCER_TREATMENT_SLUGS,
  SOUTH_AFRICA_COST_PROCEDURE_NAMES,
  SOUTH_AFRICA_CURATED_TREATMENT_SLUGS,
  SOUTH_AFRICA_OFFICIAL_LINKS,
  SOUTH_AFRICA_PAGE_PATH,
  southAfricaPageCopy,
  resolveCuratedBySlug,
  resolveSouthAfricaCostRows,
} from "@/data/south-africa-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/south-africa/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = southAfricaPageCopy("en");

test("the South Africa hub is an English-only published route", () => {
  assert.equal(localePageState("en", SOUTH_AFRICA_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, SOUTH_AFRICA_PAGE_PATH), "missing", locale);
  }
});

test("the South Africa hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/south-africa/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/south-africa/treatment-in-india")), locale);
  }
});

test("South Africa hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    SOUTH_AFRICA_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for South African Patients");
  assert.match(String(meta.description), /South African patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/south-africa/treatment-in-india",
  );
});

test("South Africa hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, SOUTH_AFRICA_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, SOUTH_AFRICA_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, SOUTH_AFRICA_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, SOUTH_AFRICA_CANCER_TREATMENT_SLUGS.length);
  const costs = resolveSouthAfricaCostRows(catalogTreatments);
  assert.equal(costs.length, SOUTH_AFRICA_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("South Africa hub copy stays South Africa-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/south-africa-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Johannesburg/);
  assert.match(blob, /Cape Town/);
  assert.match(blob, /Durban/);
  assert.match(blob, /Pretoria/);
  assert.match(blob, /Gqeberha/);
  assert.match(blob, /O\.R\. Tambo International Airport/);
  assert.match(blob, /High Commission of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /US\$00/);
  assert.match(blob, /101,598/);
  assert.match(blob, /55,356/);
  assert.match(blob, /240,745/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /Red Fort Declaration/);
  assert.match(blob, /diagnostics and medical care/);
  assert.match(blob, /biotechnology, genomics, vaccine development/);
  assert.match(blob, /Press Information Bureau/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.heading, "Quick Answer: Medical Treatment in India for South African Patients");
  assert.equal(copy.quickAnswer.items[0]?.question, "Can South African patients travel to India for medical treatment?");
  assert.equal(
    copy.quickAnswer.items[1]?.answer,
    "Yes. South Africa is listed among the countries eligible for India's e-Visa services, which include e-Medical and e-Medical Attendant Visas.",
  );
  assert.match(copy.visa.points.join(" "), /US\$00/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);
  assert.match(page, /tanzania-hub__sticky/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /111,321/);
  assert.doesNotMatch(blob, /64,547/);
  assert.doesNotMatch(blob, /282,418/);
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
  assert.equal(SOUTH_AFRICA_OFFICIAL_LINKS.embassy, "https://www.hcipretoria.gov.in/");
  assert.equal(
    SOUTH_AFRICA_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/710-south-africa-fact-sheet.pdf",
  );
});

test("the homepage origin-country section links South Africa to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /south africa/i.test(row.name)));
  assert.ok(
    ORIGIN_COUNTRY_HUBS.some((row) => row.name === "South Africa" && row.href === "/south-africa/treatment-in-india"),
  );
});

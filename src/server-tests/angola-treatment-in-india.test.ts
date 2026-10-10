import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS } from "@/data/origin-countries";
import {
  ANGOLA_CANCER_TREATMENT_SLUGS,
  ANGOLA_COST_PROCEDURE_NAMES,
  ANGOLA_CURATED_TREATMENT_SLUGS,
  ANGOLA_OFFICIAL_LINKS,
  ANGOLA_PAGE_PATH,
  angolaPageCopy,
  resolveCuratedBySlug,
  resolveAngolaCostRows,
} from "@/data/angola-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/angola/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = angolaPageCopy("en");

test("the Angola hub is an English-only published route", () => {
  assert.equal(localePageState("en", ANGOLA_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, ANGOLA_PAGE_PATH), "missing", locale);
  }
});

test("the Angola hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/angola/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/angola/treatment-in-india")), locale);
  }
});

test("Angola hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    ANGOLA_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Angolan Patients");
  assert.match(String(meta.description), /Angolan patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/angola/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.en,
    "https://gaf.healthcare/angola/treatment-in-india",
  );
  assert.equal(
    (meta.alternates as { languages?: Record<string, string> })?.languages?.["x-default"],
    "https://gaf.healthcare/angola/treatment-in-india",
  );
});

test("Angola hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, ANGOLA_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, ANGOLA_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, ANGOLA_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, ANGOLA_CANCER_TREATMENT_SLUGS.length);

  const costs = resolveAngolaCostRows(catalogTreatments);
  assert.equal(costs.length, ANGOLA_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Angola hub copy stays Angola-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/angola-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Luanda/);
  assert.match(blob, /Dr\. António Agostinho Neto International Airport/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /e-Medical Visa/);
  assert.match(blob, /27,511/);
  assert.match(blob, /16,190/);
  assert.match(blob, /59,105/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /yellow-fever/);
  assert.match(blob, /Portuguese/);
  assert.match(blob, /Health and Medicine/);
  assert.match(blob, /Benguela/);
  assert.match(copy.hero.h1, /^Medical Treatment in India for Angolan Patients$/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.heading, "Quick Answer: Medical Treatment in India for Angolan Patients");
  assert.equal(copy.quickAnswer.items.length, 6);
  assert.equal(
    copy.quickAnswer.items[0]?.question,
    "Can Angolan patients travel to India for medical treatment?",
  );
  assert.match(
    copy.quickAnswer.items[0]?.answer ?? "",
    /Angolan patients can travel to India for a wide range of specialised medical treatments/,
  );
  assert.match(copy.quickAnswer.items[1]?.answer ?? "", /currently included on India's official list/);
  assert.match(
    copy.quickAnswer.items[2]?.answer ?? "",
    /Medical Reports → Specialist Opinion → Hospital Selection → Treatment Plan → Cost Estimate → e-Medical Visa → Travel → Hospital Evaluation → Treatment → Recovery → Follow-Up/,
  );
  assert.match(copy.quickAnswer.items[4]?.answer ?? "", /begin with the medical records/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);
  assert.match(page, /tanzania-hub__sticky/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /24,607/);
  assert.doesNotMatch(blob, /15,541/);
  assert.doesNotMatch(blob, /55,639/);
  assert.doesNotMatch(blob, /2,898/);
  assert.doesNotMatch(blob, /Bhabhatron/);
  assert.doesNotMatch(blob, /Angolatta/);
  assert.doesNotMatch(blob, /Quatro de Fevereiro/);
  assert.doesNotMatch(blob, /nairobi/i);
  assert.doesNotMatch(blob, /Apollo Hospitals/);
  assert.doesNotMatch(blob, /Baler Healthcare/);
  assert.doesNotMatch(blob, /₹2\.5/);
  assert.doesNotMatch(blob, /\bsave\s+\d+%/i);
  assert.doesNotMatch(blob, /\bguaranteed (results|recovery|quotation|price|outcomes?)\b/i);
  assert.doesNotMatch(blob, /\b100%\s+success\b/i);
  assert.doesNotMatch(blob, /\bcheapest\b/i);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /Best Cities/i);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/treatments\/(kaposi|liver-cancer|oesophageal|esophageal|lung-cancer|endometrial|thyroid-cancer)/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(ANGOLA_OFFICIAL_LINKS.eVisa, "https://indianvisaonline.gov.in/evisa/tvoa.html");
  assert.equal(ANGOLA_OFFICIAL_LINKS.embassy, "https://indembangola.gov.in/");
  assert.equal(ANGOLA_OFFICIAL_LINKS.embassyVisa, "https://indembangola.gov.in/pages?id=vbmOe&subid=YerEd");
  assert.equal(
    ANGOLA_OFFICIAL_LINKS.embassyEvisaPdf,
    "https://www.indembangola.gov.in/pdf/menu/e-Visa.pdf",
  );
  assert.equal(
    ANGOLA_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/24-angola-fact-sheet.pdf",
  );
  assert.equal(
    ANGOLA_OFFICIAL_LINKS.meaBrief,
    "https://www.mea.gov.in/Portal/ForeignRelation/India-AngolaRelations.pdf",
  );
});

test("the homepage origin-country section links Angola to its published hub", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /from-your-country/);
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.doesNotMatch(home, /home-origin-visa/);
  assert.doesNotMatch(home, /home-origin-cta/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /angola/i.test(row.name)));
  assert.ok(ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Angola" && row.href === "/angola/treatment-in-india"));
});

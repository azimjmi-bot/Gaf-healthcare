import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";
import { ORIGIN_COUNTRY_HUBS, originCountryHubsByContinent } from "@/data/origin-countries";
import {
  TURKMENISTAN_CANCER_TREATMENT_SLUGS,
  TURKMENISTAN_COST_PROCEDURE_NAMES,
  TURKMENISTAN_CURATED_TREATMENT_SLUGS,
  TURKMENISTAN_OFFICIAL_LINKS,
  TURKMENISTAN_PAGE_PATH,
  turkmenistanPageCopy,
  resolveCuratedBySlug,
  resolveTurkmenistanCostRows,
} from "@/data/turkmenistan-treatment-in-india";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { localePageState } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { catalogTreatments } from "@/lib/treatments";

const PAGE_FILE = "src/app/turkmenistan/treatment-in-india/page.tsx";
const HOME_FILE = "src/app/page.tsx";
const copy = turkmenistanPageCopy("en");

test("the Turkmenistan hub is an English-only published route", () => {
  assert.equal(localePageState("en", TURKMENISTAN_PAGE_PATH), "published");
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    assert.equal(localePageState(locale, TURKMENISTAN_PAGE_PATH), "missing", locale);
  }
});

test("the Turkmenistan hub is listed only on the English sitemap", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(english.includes("https://gaf.healthcare/turkmenistan/treatment-in-india"));
  for (const locale of LOCALES.filter((row) => row !== "en")) {
    const urls = buildLocaleSitemap(locale).map((row) => row.url);
    assert.ok(!urls.some((url) => url.includes("/turkmenistan/treatment-in-india")), locale);
  }
});

test("Turkmenistan hub metadata uses the required title, description and English canonical", () => {
  const meta = withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
    },
    TURKMENISTAN_PAGE_PATH,
    "en",
    ["en"],
  );
  assert.equal(meta.title, "Medical Treatment in India for Turkmen Patients");
  assert.match(String(meta.description), /Turkmen patients/i);
  assert.equal(
    (meta.alternates as { canonical?: string })?.canonical,
    "https://gaf.healthcare/turkmenistan/treatment-in-india",
  );
});

test("Turkmenistan hub content links only to live curated treatments and cost rows", () => {
  const published = publishedCuratedTreatments("en");
  const featured = resolveCuratedBySlug(published, TURKMENISTAN_CURATED_TREATMENT_SLUGS);
  const cancer = resolveCuratedBySlug(published, TURKMENISTAN_CANCER_TREATMENT_SLUGS);
  assert.equal(featured.length, TURKMENISTAN_CURATED_TREATMENT_SLUGS.length);
  assert.equal(cancer.length, TURKMENISTAN_CANCER_TREATMENT_SLUGS.length);
  const costs = resolveTurkmenistanCostRows(catalogTreatments);
  assert.equal(costs.length, TURKMENISTAN_COST_PROCEDURE_NAMES.length);
  for (const row of costs) {
    assert.match(row.range, /\$/);
    assert.ok(row.href.startsWith("/costs/"));
  }
});

test("Turkmenistan hub copy stays Turkmenistan-specific and medically responsible", () => {
  const page = readFileSync(PAGE_FILE, "utf8");
  const data = readFileSync("src/data/turkmenistan-treatment-in-india.ts", "utf8");
  const blob = `${page}\n${data}\n${JSON.stringify(copy)}`;

  assert.match(blob, /Ashgabat/);
  assert.match(blob, /Türkmenabat/);
  assert.match(blob, /Daşoguz/);
  assert.match(blob, /Mary/);
  assert.match(blob, /Türkmenbaşy/);
  assert.match(blob, /Ashgabat International Airport/);
  assert.match(blob, /Embassy of India/);
  assert.match(blob, /Medical Visa/);
  assert.match(blob, /US\$83/);
  assert.match(blob, /US\$123/);
  assert.match(blob, /7,659/);
  assert.match(blob, /4,496/);
  assert.match(blob, /18,497/);
  assert.match(blob, /GLOBOCAN 2024/);
  assert.match(blob, /Yoga and Traditional Medicine/);
  assert.match(blob, /not currently listed/);
  assert.ok(copy.faqs.length >= 15);
  assert.equal(copy.quickAnswer.heading, "Quick Answer: Medical Treatment in India for Turkmen Patients");
  assert.equal(copy.quickAnswer.items[0]?.question, "Can Turkmen patients travel to India for medical treatment?");
  assert.equal(copy.quickAnswer.items[1]?.question, "Can Turkmen citizens use India's e-Medical Visa?");
  assert.match(copy.quickAnswer.items[1]?.answer ?? "", /should not promise an e-Medical Visa/);
  assert.match(copy.visa.points.join(" "), /US\$83/);
  assert.equal(copy.journey.steps.length, 12);
  assert.match(blob, /WhatsApp \+91 90443 46292/);
  assert.match(page, /blogEstimateWhatsapp/);
  assert.match(page, /OriginCountryVisaCta/);
  assert.match(page, /tanzania-hub__sticky/);

  const whatsappCtas = page.match(/wa\.primary|wa\.secondary|WhatsAppCta|PseoEstimateCtaSection|CtaBand/g) ?? [];
  assert.ok(whatsappCtas.length >= 5, `expected at least 5 WhatsApp CTAs, found ${whatsappCtas.length}`);

  assert.doesNotMatch(blob, /6,807/);
  assert.doesNotMatch(blob, /4,456/);
  assert.doesNotMatch(blob, /17,063/);
  assert.doesNotMatch(blob, /67\.3%/);
  assert.doesNotMatch(blob, /Tashkent/);
  assert.doesNotMatch(blob, /Kyiv/);
  assert.doesNotMatch(blob, /GLOBOCAN 2022/);
  assert.doesNotMatch(blob, /Best hospitals/i);
  assert.doesNotMatch(blob, /Best Cities/i);
  assert.doesNotMatch(blob, /Best Indian Cities/i);
  assert.doesNotMatch(blob, /4th India–Central Asia Dialogue/);
  assert.doesNotMatch(blob, /\/treatments\/ivf/i);
  assert.doesNotMatch(blob, /\/treatments\/(kaposi|liver-cancer|oesophageal|esophageal|lung-cancer|endometrial|thyroid-cancer|stomach-cancer|cataract|rectal-cancer)/i);
  assert.doesNotMatch(blob, /\/(?:doctors|hospitals|costs)\/India\/Pune/i);

  assert.ok(copy.treatments.categories.some((row) => row.title.startsWith("IVF") && !row.href));
  assert.ok(copy.cities.items.some((row) => row.name === "Pune" && row.catalog === false));
  assert.equal(TURKMENISTAN_OFFICIAL_LINKS.embassy, "https://eoiashgabat.gov.in/");
  assert.equal(
    TURKMENISTAN_OFFICIAL_LINKS.globocan,
    "https://gco.iarc.who.int/media/globocan/factsheets/populations/795-turkmenistan-fact-sheet.pdf",
  );
});

test("the homepage origin-country section links Turkmenistan under Central Asia", () => {
  const home = readFileSync(HOME_FILE, "utf8");
  assert.match(home, /ORIGIN_COUNTRY_HUBS/);
  assert.match(home, /originCountryHubsByContinent/);
  assert.match(home, /group\.continent/);
  assert.doesNotMatch(home, /OriginCountryVisaCta/);
  assert.ok(!HOME_DESTINATIONS.some((row) => /turkmen/i.test(row.name)));
  assert.ok(
    ORIGIN_COUNTRY_HUBS.some((row) => row.name === "Turkmenistan" && row.href === "/turkmenistan/treatment-in-india"),
  );
  const groups = originCountryHubsByContinent();
  assert.deepEqual(
    groups.map((group) => group.continent),
    ["Africa", "Central Asia", "Europe"],
  );
  assert.ok(groups[1]?.countries.some((row) => row.name === "Turkmenistan"));
  assert.ok(groups[1]?.countries.some((row) => row.name === "Uzbekistan"));
});

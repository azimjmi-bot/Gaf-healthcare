import assert from "node:assert/strict";
import test from "node:test";
import { getSpecialtyPage } from "@/data/specialty-pages";
import {
  CMS_EDITIONS,
  editionFromLocale,
} from "@/lib/cms/edition";
import { loadCms } from "@/lib/cms/store";
import { doctors, hospitals } from "@/lib/data";
import {
  localePathIsPublished,
  publishedLocalesForPath,
} from "@/lib/i18n/locale-publication";
import { localeSurfaceIsAvailable } from "@/lib/i18n/locale-availability";
import { surfaceIsAvailable } from "@/lib/i18n/surfaces";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { isTargetLocale } from "@/lib/i18n/languages";
import { localeIsPublished as targetLocaleIsPublished } from "@/lib/i18n/locale-gating";

function localeIsPublished(locale: string) {
  return !isTargetLocale(locale) || targetLocaleIsPublished(locale);
}
import {
  buildLocaleSitemap,
  LANGUAGE_SITEMAP_PATHS,
  sitemapXml,
} from "@/lib/i18n/sitemap-entries";
import { uiCatalogFor } from "@/lib/i18n/ui-catalogs";
import {
  doctorsForLocale,
  hospitalsForLocale,
  treatmentsForLocale,
} from "@/lib/locale-catalog";

test("every language has an independent CMS edition", () => {
  assert.deepEqual(CMS_EDITIONS, ["en", "ru", "fr", "ar", "sw"]);
  for (const locale of CMS_EDITIONS) {
    assert.equal(editionFromLocale(locale), locale);
  }
  for (const locale of ["ru", "fr", "sw"] as const) {
    const store = loadCms(locale);
    assert.equal(store.articles.length, 0);
    assert.equal(store.settings.blogTitle, "");
  }
});

test("target-locale catalogs contain only authored overlays", () => {
  assert.equal(doctorsForLocale("ar").length, 2305);
  assert.equal(hospitalsForLocale("ar").length, 37);
  assert.equal(treatmentsForLocale("ar").length, 380);
  for (const locale of ["ru", "fr", "sw"] as const) {
    assert.equal(doctorsForLocale(locale).length, 0);
    assert.equal(hospitalsForLocale(locale).length, 0);
    assert.equal(treatmentsForLocale(locale).length, 0);
  }
  assert.equal(doctorsForLocale("en").length, doctorsForLocale("ar").length);
  assert.ok(hospitalsForLocale("en").length >= hospitalsForLocale("ar").length);
});

test("untranslated routes stay unpublished", () => {
  const arabicDoctor = doctorsForLocale("ar")[0];
  assert.ok(arabicDoctor);
  assert.equal(localePathIsPublished("ar", "/doctors"), true);
  assert.equal(
    localePathIsPublished("ar", `/doctors/${arabicDoctor.slug}`),
    true,
  );
  assert.equal(localePathIsPublished("ru", "/doctors"), false);
  assert.equal(localePathIsPublished("ar", "/consult"), false);
  assert.equal(localePathIsPublished("ar", "/costs"), true);
  assert.equal(localePathIsPublished("ar", "/costs/India"), true);
  assert.equal(localePathIsPublished("ar", "/specialties"), false);
  assert.deepEqual(publishedLocalesForPath("/consult"), ["en"]);
  assert.deepEqual(publishedLocalesForPath("/specialties"), ["en"]);
});

test("localized sitemaps contain only published locale records", () => {
  // Russian is not a live locale, so it advertises nothing at all. Its pages
  // still render, but they are noindex and must not be listed.
  assert.deepEqual(buildLocaleSitemap("ru"), []);

  const arabicUrls = buildLocaleSitemap("ar").map((row) => row.url);
  assert.ok(arabicUrls.includes("https://gaf.healthcare/ar/doctors"));
  assert.ok(arabicUrls.includes("https://gaf.healthcare/ar/hospitals"));
  assert.ok(arabicUrls.includes("https://gaf.healthcare/ar/costs"));
  assert.ok(arabicUrls.includes("https://gaf.healthcare/ar/costs/india"));
  assert.equal(
    arabicUrls.some((url) => url.includes("/ar/specialties")),
    false,
  );
  const localizedDoctorSlugs = new Set(
    doctorsForLocale("ar").map((doctor) => doctor.slug),
  );
  for (const doctor of doctors) {
    if (localizedDoctorSlugs.has(doctor.slug)) continue;
    assert.equal(
      arabicUrls.includes(`https://gaf.healthcare/ar/doctors/${doctor.slug}`),
      false,
    );
  }
  assert.ok(hospitals.length > 0);
});

test("every language has a dedicated, complete sitemap document", () => {
  assert.deepEqual(LANGUAGE_SITEMAP_PATHS, {
    en: "/sitemap-en.xml",
    ru: "/sitemap-ru.xml",
    fr: "/sitemap-fr.xml",
    ar: "/sitemap-ar.xml",
    sw: "/sitemap-sw.xml",
  });
  for (const locale of CMS_EDITIONS) {
    const entries = buildLocaleSitemap(locale);
    // A sitemap route exists for every locale, but an unpublished locale
    // legitimately has nothing to put in it.
    if (!localeIsPublished(locale)) {
      assert.deepEqual(entries, [], `sitemap-${locale}.xml should be empty`);
      continue;
    }
    assert.ok(entries.length > 0);
    const expectedPrefix =
      locale === "en"
        ? "https://gaf.healthcare"
        : `https://gaf.healthcare/${locale}`;
    assert.ok(
      entries.every(
        (entry) =>
          entry.url === expectedPrefix ||
          entry.url.startsWith(`${expectedPrefix}/`),
      ),
    );
    const xml = sitemapXml(entries);
    assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
    assert.match(xml, /<changefreq>/);
    assert.match(xml, /<priority>/);
  }
});

test("UI dictionaries do not fill missing translations with English", () => {
  assert.equal(uiCatalogFor("ru")["dir.showing"], "");
  assert.notEqual(uiCatalogFor("ru")["dir.showing"], uiCatalogFor("en")["dir.showing"]);
  assert.equal(uiCatalogFor("ar")["card.requestConsult"], "طلب استشارة طبية");
});

test("navigation hides routes without authored locale content", () => {
  assert.equal(surfaceIsAvailable("ar", "doctors"), true);
  assert.equal(surfaceIsAvailable("ar", "costs"), true);
  assert.equal(surfaceIsAvailable("ar", "consult"), false);
  assert.equal(surfaceIsAvailable("fr", "hospitals"), false);
  assert.equal(surfaceIsAvailable("en", "costs"), true);
  // Arabic treatments are authored published translations, so the nav follows
  // the catalog. A locale with none stays hidden, and a false fact still
  // closes the Arabic surface — availability is not hardcoded on.
  assert.ok(publishedCuratedTreatments("ar").length > 0);
  assert.equal(surfaceIsAvailable("ar", "treatments"), true);
  assert.equal(publishedCuratedTreatments("fr").length, 0);
  assert.equal(surfaceIsAvailable("fr", "treatments"), false);
  assert.equal(surfaceIsAvailable("en", "treatments"), true);
  assert.equal(
    localeSurfaceIsAvailable("ar", "treatments", {
      treatmentsPublished: false,
      costsPublished: true,
      blogsPublished: true,
    }),
    false,
  );
});

test("specialty editorials do not inherit the English edition", () => {
  assert.ok(getSpecialtyPage("india", "radiation-oncology", "en"));
  assert.equal(
    getSpecialtyPage("india", "radiation-oncology", "ru"),
    undefined,
  );
});

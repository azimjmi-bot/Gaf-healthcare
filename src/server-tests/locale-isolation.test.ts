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
import {
  buildLocaleSitemap,
  LANGUAGE_SITEMAP_PATHS,
  sitemapXml,
} from "@/lib/i18n/sitemap-entries";
import { uiCatalogFor } from "@/lib/i18n/ui-catalogs";
import {
  doctorsForLocale,
  hospitalsForLocale,
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
  assert.equal(doctorsForLocale("ar").length, 70);
  assert.equal(hospitalsForLocale("ar").length, 37);
  for (const locale of ["ru", "fr", "sw"] as const) {
    assert.equal(doctorsForLocale(locale).length, 0);
    assert.equal(hospitalsForLocale(locale).length, 0);
  }
  assert.ok(doctorsForLocale("en").length > doctorsForLocale("ar").length);
  assert.ok(hospitalsForLocale("en").length >= hospitalsForLocale("ar").length);
});

test("untranslated routes stay unpublished", () => {
  const arabicDoctor = doctorsForLocale("ar")[0];
  const englishOnlyDoctor = doctors.find(
    (doctor) => !doctorsForLocale("ar").some((row) => row.slug === doctor.slug),
  );
  assert.ok(arabicDoctor);
  assert.ok(englishOnlyDoctor);
  assert.equal(localePathIsPublished("ar", "/doctors"), true);
  assert.equal(
    localePathIsPublished("ar", `/doctors/${arabicDoctor.slug}`),
    true,
  );
  assert.equal(
    localePathIsPublished("ar", `/doctors/${englishOnlyDoctor.slug}`),
    false,
  );
  assert.equal(localePathIsPublished("ru", "/doctors"), false);
  assert.equal(localePathIsPublished("ar", "/consult"), false);
  assert.equal(localePathIsPublished("ar", "/costs"), false);
  assert.equal(localePathIsPublished("ar", "/specialties"), false);
  assert.deepEqual(
    publishedLocalesForPath(`/doctors/${englishOnlyDoctor.slug}`),
    ["en"],
  );
});

test("localized sitemaps contain only published locale records", () => {
  const russianUrls = buildLocaleSitemap("ru").map((row) => row.url);
  assert.deepEqual(russianUrls.sort(), [
    "https://gaf.healthcare/ru",
    "https://gaf.healthcare/ru/treatments",
  ]);

  const arabicUrls = buildLocaleSitemap("ar").map((row) => row.url);
  assert.ok(arabicUrls.includes("https://gaf.healthcare/ar/doctors"));
  assert.ok(arabicUrls.includes("https://gaf.healthcare/ar/hospitals"));
  assert.equal(arabicUrls.some((url) => url.includes("/ar/costs")), false);
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
  assert.equal(uiCatalogFor("ar")["card.requestConsult"], "طلب استشارة");
});

test("navigation hides routes without authored locale content", () => {
  assert.equal(localeSurfaceIsAvailable("ar", "doctors"), true);
  assert.equal(localeSurfaceIsAvailable("ar", "consult"), false);
  assert.equal(localeSurfaceIsAvailable("fr", "hospitals"), false);
  assert.equal(localeSurfaceIsAvailable("en", "costs"), true);
});

test("specialty editorials do not inherit the English edition", () => {
  assert.ok(getSpecialtyPage("india", "radiation-oncology", "en"));
  assert.equal(
    getSpecialtyPage("india", "radiation-oncology", "ru"),
    undefined,
  );
});

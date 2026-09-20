import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LOCALES, TARGET_LOCALES, type AppLocale } from "@/lib/i18n/languages";
import {
  ARABIC_TEMPLATE_APPROVED,
  FACET_MIN_ARABIC_PROFILES,
  facetIsPublished,
  localeIsPublished,
} from "@/lib/i18n/locale-gating";
import {
  localePageState,
  localePathIsPublished,
  publishedLocalesForPath,
} from "@/lib/i18n/locale-publication";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { doctorsForLocale, hospitalsForLocale } from "@/lib/locale-catalog";
import { listPublishedPosts } from "@/lib/blogs";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { doctorSpecialtySitemapPaths } from "@/lib/doctor-discovery";
import { hospitalSpecialtySitemapPaths } from "@/lib/radiation-hospital-page";
import { doctors, hospitals } from "@/lib/data";
import { doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import { INDIA_CITIES, SPECIALTIES } from "@/lib/taxonomy";
import { translationStatus } from "@/lib/cms/catalog-types";
import robots from "@/app/robots";

/** Every facet URL the English sitemap can produce, as candidates for Arabic. */
function facetCandidates() {
  const paths = new Set<string>();
  for (const path of doctorSpecialtySitemapPaths(doctors)) paths.add(path);
  for (const path of hospitalSpecialtySitemapPaths(hospitals, doctors)) paths.add(path);
  paths.add(doctorsPath({ destination: "India" }));
  paths.add(hospitalsPath({ destination: "India" }));
  for (const city of INDIA_CITIES) {
    paths.add(doctorsPath({ destination: "India", city }));
    paths.add(hospitalsPath({ destination: "India", city }));
  }
  for (const specialty of SPECIALTIES) {
    paths.add(doctorsPath({ destination: "India", specialty: specialty.name }));
    paths.add(hospitalsPath({ destination: "India", specialty: specialty.name }));
  }
  return [...paths];
}

/** Everything that could conceivably be an Arabic page, facets included. */
function everyArabicCandidate() {
  const paths = new Set<string>(["/", "/doctors", "/hospitals", "/treatments", "/blogs", "/consult", "/costs", "/specialties"]);
  for (const path of facetCandidates()) paths.add(path);
  for (const doctor of doctorsForLocale("ar")) paths.add(`/doctors/${doctor.slug}`);
  for (const hospital of hospitalsForLocale("ar")) {
    paths.add(`/hospitals/${hospital.slug}`);
    paths.add(`/hospitals/${hospital.slug}/doctors`);
    paths.add(`/hospitals/${hospital.slug}/procedures`);
  }
  for (const post of listPublishedPosts("ar")) paths.add(`/blogs/${post.slug}`);
  for (const treatment of publishedCuratedTreatments("ar")) paths.add(`/treatments/${treatment.slug}`);
  return [...paths];
}

test("no Arabic facet is published while its template is unapproved", () => {
  for (const approved of Object.values(ARABIC_TEMPLATE_APPROVED)) {
    assert.equal(approved, false, "no pSEO template has been approved yet");
  }

  const states = { published: 0, noindex: 0, missing: 0 };
  for (const path of facetCandidates()) states[localePageState("ar", path)] += 1;

  assert.equal(states.published, 0, "facets must not be published before Phase 3");
  assert.equal(
    states.noindex,
    1268,
    "the facets that render in Arabic should all be noindex,follow",
  );
});

test("the facet gate needs both an approved template and enough profiles", () => {
  assert.equal(FACET_MIN_ARABIC_PROFILES, 3);

  // Unapproved: no profile count is enough.
  assert.equal(facetIsPublished("hospitalFacet", 99), false);

  const original = ARABIC_TEMPLATE_APPROVED.hospitalFacet;
  try {
    ARABIC_TEMPLATE_APPROVED.hospitalFacet = true;
    assert.equal(facetIsPublished("hospitalFacet", 0), false);
    assert.equal(facetIsPublished("hospitalFacet", 1), false, "1 record is below the floor");
    assert.equal(facetIsPublished("hospitalFacet", 2), false, "2 records is below the floor");
    assert.equal(facetIsPublished("hospitalFacet", 3), true, "3 records clears the floor");
    // Approving one page type must not approve another.
    assert.equal(facetIsPublished("doctorFacet", 3), false);
  } finally {
    ARABIC_TEMPLATE_APPROVED.hospitalFacet = original;
  }
});

test("a facet with no matching Arabic profiles 404s rather than rendering empty", () => {
  assert.equal(localePageState("ar", "/doctors/India/Nephrology"), "missing");
  assert.equal(localePageState("ar", "/doctors/India/Delhi-NCR/Radiation-Oncology"), "noindex");
});

test("the live Arabic overlays stay published", () => {
  const file = join(process.cwd(), "content/ar/catalog-cms.json");
  const cms = JSON.parse(readFileSync(file, "utf8")) as {
    doctorOverrides: Record<string, { status?: string }>;
    hospitalOverrides: Record<string, { status?: string }>;
  };
  const doctorRows = Object.values(cms.doctorOverrides);
  const hospitalRows = Object.values(cms.hospitalOverrides);
  assert.equal(doctorRows.length, 70);
  assert.equal(hospitalRows.length, 37);
  for (const patch of [...doctorRows, ...hospitalRows]) {
    assert.equal(translationStatus(patch), "published");
  }

  assert.equal(doctorsForLocale("ar").length, 70);
  assert.equal(hospitalsForLocale("ar").length, 37);
  assert.equal(localePathIsPublished("ar", "/doctors/dr-anil-kumar-anand"), true);
  assert.equal(localePathIsPublished("ar", "/hospitals/apollo-delhi"), true);
});

test("a missing or unreviewed status keeps a translation out of the catalog", () => {
  assert.equal(translationStatus(undefined), "draft");
  assert.equal(translationStatus({}), "draft");
  assert.equal(translationStatus({ status: "reviewed" }), "reviewed");
  assert.equal(translationStatus({ status: "published" }), "published");
  assert.equal(translationStatus({ status: "nonsense" }), "draft");
});

test("/treatments 404s in a locale with nothing published, and stays live in English", () => {
  assert.equal(publishedCuratedTreatments("ar").length, 0);
  assert.equal(localePageState("ar", "/treatments"), "missing");
  assert.equal(localePageState("en", "/treatments"), "published");
});

test("locales that are not live render but are never advertised", () => {
  for (const locale of TARGET_LOCALES) {
    if (localeIsPublished(locale)) continue;
    assert.equal(localePageState(locale, "/"), "noindex", `${locale} home`);
    assert.equal(buildLocaleSitemap(locale).length, 0, `sitemap-${locale}.xml`);
    assert.ok(
      !publishedLocalesForPath("/").includes(locale),
      `${locale} must not appear in the home page hreflang`,
    );
  }
  assert.equal(localeIsPublished("ar"), true);
});

test("sitemap-ar.xml and the published Arabic set agree in both directions", () => {
  const sitemap = buildLocaleSitemap("ar").map((row) => decodeURIComponent(new URL(row.url).pathname));
  const listed = new Set(sitemap);
  assert.equal(sitemap.length, listed.size, "sitemap-ar.xml contains a duplicate URL");

  const published = everyArabicCandidate()
    .filter((path) => localePathIsPublished("ar", path))
    .map((path) => (path === "/" ? "/ar" : `/ar${path}`));

  for (const path of published) {
    assert.ok(listed.has(path), `published but missing from sitemap-ar.xml: ${path}`);
  }
  for (const path of listed) {
    const english = path === "/ar" ? "/" : path.replace(/^\/ar/, "");
    assert.equal(
      localePageState("ar", english),
      "published",
      `listed in sitemap-ar.xml but not published: ${path}`,
    );
  }
  assert.equal(listed.size, published.length);
});

test("no hreflang block ever points at a page that is not published", () => {
  const sample = [
    "/",
    "/doctors",
    "/doctors/dr-anil-kumar-anand",
    "/hospitals",
    "/hospitals/apollo-delhi",
    "/hospitals/apollo-delhi/doctors",
    "/hospitals/apollo-delhi/procedures",
    "/treatments",
    "/blogs",
    "/consult",
    "/costs/India/Radiation-Oncology",
    ...facetCandidates().filter((_, index) => index % 23 === 0),
  ];

  for (const path of sample) {
    for (const from of LOCALES) {
      const meta = withLocaleMetadata({}, path, from, LOCALES);
      const { languages } = meta.alternates as { languages: Record<string, string> };
      for (const [key, url] of Object.entries(languages)) {
        const target = (key === "x-default" ? "en" : key) as AppLocale;
        assert.equal(
          localePageState(target, path),
          "published",
          `${from} page ${path} advertises ${key} -> ${url}, which is not published`,
        );
      }
    }
  }
});

test("noindex Arabic pages stay crawlable in robots.txt", () => {
  const { rules, sitemap } = robots();
  const disallow = (Array.isArray(rules) ? rules : [rules]).flatMap((rule) =>
    rule.disallow === undefined ? [] : [rule.disallow].flat(),
  );
  // A Disallow would stop the noindex tag from ever being fetched and read.
  for (const path of ["/ar", "/ar/doctors", "/ar/hospitals"]) {
    assert.ok(
      !disallow.some((rule) => path.startsWith(rule)),
      `${path} must not be disallowed`,
    );
  }
  // Only sitemaps with something in them get advertised.
  assert.deepEqual(sitemap, [
    "https://gaf.healthcare/sitemap-en.xml",
    "https://gaf.healthcare/sitemap-ar.xml",
  ]);
});

test("a page that is not published in its own locale is marked noindex", () => {
  const facet = "/doctors/India/Delhi-NCR/Radiation-Oncology";
  const arabic = withLocaleMetadata({}, facet, "ar", LOCALES);
  assert.deepEqual(arabic.robots, { index: false, follow: true });

  const russianHome = withLocaleMetadata({}, "/", "ru", LOCALES);
  assert.deepEqual(russianHome.robots, { index: false, follow: true });

  // English is unaffected.
  assert.equal(withLocaleMetadata({}, facet, "en", LOCALES).robots, undefined);
  assert.equal(withLocaleMetadata({}, "/", "en", LOCALES).robots, undefined);
});

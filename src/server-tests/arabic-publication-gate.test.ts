import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LOCALES, TARGET_LOCALES, type AppLocale } from "@/lib/i18n/languages";
import {
  ARABIC_TEMPLATE_APPROVED,
  FACET_MAX_PARENT_OVERLAP,
  FACET_MIN_ARABIC_PROFILES,
  facetDuplicatesParent,
  facetIsPublished,
  localeIsPublished,
  type PseoPageType,
} from "@/lib/i18n/locale-gating";
import { canonicalFacetPath } from "@/lib/i18n/facet-canonical";
import {
  localePageState,
  localePathIsPublished,
  publishedLocalesForPath,
} from "@/lib/i18n/locale-publication";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { localizedAbsoluteUrl, withLocaleMetadata } from "@/lib/i18n/metadata";
import { doctorsForLocale, hospitalsForLocale } from "@/lib/locale-catalog";
import { listPublishedPosts } from "@/lib/blogs";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { facetCandidatePaths, publishedFacetPaths } from "@/lib/i18n/facet-candidates";
import { translationStatus } from "@/lib/cms/catalog-types";
import robots from "@/app/robots";

const facetCandidates = facetCandidatePaths;

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

/**
 * What each page type publishes when its own gate is the only one open.
 *
 * The page types partition the candidate set — a URL is a doctor facet or a
 * hospital facet, never both — so the number the site publishes at any moment
 * is the sum over the open gates. Pinning the parts rather than the total
 * means opening the next gate does not require re-deriving the ones already
 * open, and a page count that moves for any other reason still fails here.
 */
const STAGE_FACETS: Record<PseoPageType, number> = {
  doctorFacet: 74,
  hospitalFacet: 56,
  costFacet: 0,
  specialtyHub: 0,
};

/** Every facet URL that renders in Arabic, published or not. */
const FACET_CANDIDATES = 1268;

function expectedPublishedFacets() {
  return (Object.keys(STAGE_FACETS) as PseoPageType[])
    .filter((type) => ARABIC_TEMPLATE_APPROVED[type])
    .reduce((total, type) => total + STAGE_FACETS[type], 0);
}

test("the open gates publish exactly the reviewed facets and nothing else", () => {
  assert.equal(ARABIC_TEMPLATE_APPROVED.costFacet, false, "no Arabic cost content exists");
  assert.equal(ARABIC_TEMPLATE_APPROVED.specialtyHub, false, "specialty hubs are English long-form");

  const states = { published: 0, noindex: 0, missing: 0 };
  for (const path of facetCandidates()) states[localePageState("ar", path)] += 1;

  const expected = expectedPublishedFacets();
  assert.equal(states.published, expected, "published facet count");
  assert.equal(
    states.noindex,
    FACET_CANDIDATES - expected,
    "everything not published still renders as noindex,follow",
  );
});

test("a published facet that duplicates its parent stays out of the sitemap", () => {
  const published = facetCandidates().filter((path) => localePathIsPublished("ar", path));
  const listed = new Set(publishedFacetPaths("ar"));

  assert.equal(published.length, expectedPublishedFacets());
  // The 17 doctor facets that return exactly their parent's roster are
  // published — they render, and they are reachable — but they name the parent
  // as canonical, so advertising them would contradict their own head.
  assert.equal(listed.size, expectedPublishedFacets() - 17);
  for (const path of published) {
    if (listed.has(path)) continue;
    assert.notEqual(
      canonicalFacetPath(path, "ar"),
      path,
      `${path} is published and self-canonical but absent from the sitemap`,
    );
  }
});

test("the facet gate needs both an approved template and enough profiles", () => {
  assert.equal(FACET_MIN_ARABIC_PROFILES, 3);

  // Unapproved: no profile count is enough. costFacet is the page type still
  // waiting on content, so it is the honest stand-in for a closed gate.
  assert.equal(facetIsPublished("costFacet", 99), false);

  const original = ARABIC_TEMPLATE_APPROVED.hospitalFacet;
  try {
    ARABIC_TEMPLATE_APPROVED.hospitalFacet = true;
    assert.equal(facetIsPublished("hospitalFacet", 0), false);
    assert.equal(facetIsPublished("hospitalFacet", 1), false, "1 record is below the floor");
    assert.equal(facetIsPublished("hospitalFacet", 2), false, "2 records is below the floor");
    assert.equal(facetIsPublished("hospitalFacet", 3), true, "3 records clears the floor");
    // Approving one page type must not approve another.
    assert.equal(facetIsPublished("costFacet", 3), false);
  } finally {
    ARABIC_TEMPLATE_APPROVED.hospitalFacet = original;
  }
});

test("the overlap gate suppresses a facet that reproduces its parent", () => {
  assert.equal(FACET_MAX_PARENT_OVERLAP.hospitalFacet, 0.9);
  assert.equal(FACET_MAX_PARENT_OVERLAP.doctorFacet, null, "doctor facets have no overlap gate");

  // A facet with no parent, or an empty one, is never a duplicate.
  assert.equal(facetDuplicatesParent("hospitalFacet", 37, undefined), false);
  assert.equal(facetDuplicatesParent("hospitalFacet", 3, 0), false);

  // The boundary sits at exactly the threshold.
  assert.equal(facetDuplicatesParent("hospitalFacet", 9, 10), true, "90% is redundant");
  assert.equal(facetDuplicatesParent("hospitalFacet", 8, 10), false, "80% narrows enough");
  assert.equal(facetDuplicatesParent("hospitalFacet", 10, 10), true, "identical to parent");

  // A page type with a null threshold ignores overlap entirely.
  assert.equal(facetDuplicatesParent("doctorFacet", 70, 70), false);

  const original = ARABIC_TEMPLATE_APPROVED.hospitalFacet;
  try {
    ARABIC_TEMPLATE_APPROVED.hospitalFacet = true;
    assert.equal(facetIsPublished("hospitalFacet", 18, 37), true, "48% of its parent");
    assert.equal(facetIsPublished("hospitalFacet", 36, 37), false, "97% of its parent");
    // Both levers must clear, in either order.
    assert.equal(facetIsPublished("hospitalFacet", 2, 37), false, "distinct but thin");
  } finally {
    ARABIC_TEMPLATE_APPROVED.hospitalFacet = original;
  }
});

/**
 * The approved Phase 3 staging plan, pinned so that opening a gate produces the
 * page count that was reviewed rather than a surprise. Each stage is measured
 * by flipping its own flag and counting what the real Arabic catalog publishes.
 */
test("each staging stage publishes the reviewed number of facets", () => {
  const publishedCount = () =>
    facetCandidates().filter((path) => localePageState("ar", path) === "published").length;

  const doctorFlag = ARABIC_TEMPLATE_APPROVED.doctorFacet;
  const hospitalFlag = ARABIC_TEMPLATE_APPROVED.hospitalFacet;
  try {
    ARABIC_TEMPLATE_APPROVED.doctorFacet = false;
    ARABIC_TEMPLATE_APPROVED.hospitalFacet = false;
    assert.equal(publishedCount(), 0, "a closed gate publishes nothing");

    ARABIC_TEMPLATE_APPROVED.doctorFacet = true;
    assert.equal(
      publishedCount(),
      STAGE_FACETS.doctorFacet,
      "stage 1: every doctor facet clears the 3-profile floor",
    );
    ARABIC_TEMPLATE_APPROVED.doctorFacet = false;

    // Stages 2 and 3 share one flag: the overlap gate is what separates the 56
    // hospital facets that narrow their parent from the rest. Chennai's IGRT
    // facet left this set when the malformed IMRT label was corrected and the
    // procedure stopped being attributed to nine of the city's radiation staff.
    ARABIC_TEMPLATE_APPROVED.hospitalFacet = true;
    assert.equal(
      publishedCount(),
      STAGE_FACETS.hospitalFacet,
      "stages 2+3: 6 at country/city depth, 50 deeper",
    );

    // The stages are independent: opening both publishes the sum, so no facet
    // is counted twice and none is suppressed by the other gate.
    ARABIC_TEMPLATE_APPROVED.doctorFacet = true;
    assert.equal(
      publishedCount(),
      STAGE_FACETS.doctorFacet + STAGE_FACETS.hospitalFacet,
    );
  } finally {
    ARABIC_TEMPLATE_APPROVED.doctorFacet = doctorFlag;
    ARABIC_TEMPLATE_APPROVED.hospitalFacet = hospitalFlag;
  }
});

test("a facet with no matching Arabic profiles 404s rather than rendering empty", () => {
  assert.equal(localePageState("ar", "/doctors/India/Nephrology"), "missing");
  assert.equal(localePageState("ar", "/doctors/India/Delhi-NCR/Radiation-Oncology"), "published");
  // A hospital facet that reproduces its parent renders but is not indexed.
  assert.equal(localePageState("ar", "/hospitals/India/Radiation-Oncology"), "noindex");
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

  // A published facet that names its parent as canonical is the one thing that
  // is published and still absent on purpose; everything else must be listed.
  const published = everyArabicCandidate()
    .filter(
      (path) =>
        localePathIsPublished("ar", path) && canonicalFacetPath(path, "ar") === path,
    )
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
    assert.equal(
      canonicalFacetPath(english, "ar"),
      english,
      `listed in sitemap-ar.xml but canonicalised elsewhere: ${path}`,
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

test("a page that is not published in its own locale is noindex and bare", () => {
  // A hospital facet that returns the whole country's campuses: it renders in
  // Arabic, but the overlap gate keeps it out of the index.
  const facet = "/hospitals/India/Radiation-Oncology";

  for (const [label, path, locale] of [
    ["Arabic facet", facet, "ar"],
    ["Russian home", "/", "ru"],
    ["French home", "/", "fr"],
    ["Swahili home", "/", "sw"],
  ] as const) {
    const meta = withLocaleMetadata({}, path, locale, LOCALES);
    const alternates = meta.alternates as {
      canonical: string;
      languages: Record<string, string>;
    };
    assert.deepEqual(meta.robots, { index: false, follow: true }, label);
    // Bare: a self-referencing canonical, and nothing else.
    assert.equal(alternates.canonical, localizedAbsoluteUrl(path, locale), label);
    assert.deepEqual(alternates.languages, {}, `${label} must emit no hreflang`);
    assert.deepEqual(meta.openGraph?.alternateLocale, [], label);
  }

  // English is unaffected and keeps its full block.
  const english = withLocaleMetadata({}, facet, "en", LOCALES);
  assert.equal(english.robots, undefined);
  assert.deepEqual(Object.keys((english.alternates as { languages: object }).languages), [
    "x-default",
    "en",
  ]);
});

test("published pages declare the other published locales as og:locale:alternate", () => {
  const home = withLocaleMetadata({}, "/", "en", LOCALES);
  assert.equal(home.openGraph?.locale, "en_IN");
  assert.deepEqual(home.openGraph?.alternateLocale, ["ar"]);

  const arabicHome = withLocaleMetadata({}, "/", "ar", LOCALES);
  assert.equal(arabicHome.openGraph?.locale, "ar");
  assert.deepEqual(arabicHome.openGraph?.alternateLocale, ["en_IN"]);

  // A page published only in English has no alternates to declare.
  const costs = withLocaleMetadata({}, "/costs/India/Radiation-Oncology", "en", LOCALES);
  assert.deepEqual(costs.openGraph?.alternateLocale, []);
});

import assert from "node:assert/strict";
import test from "node:test";
import { filterDoctors } from "@/lib/catalog";
import { parentCatalogQuery } from "@/lib/catalog-options";
import { doctorsForLocale } from "@/lib/locale-catalog";
import { canonicalFacetPath } from "@/lib/i18n/facet-canonical";
import { ARABIC_TEMPLATE_APPROVED } from "@/lib/i18n/locale-gating";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { localePageState } from "@/lib/i18n/locale-publication";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { doctorSpecialtySitemapPaths } from "@/lib/doctor-discovery";
import { hospitalSpecialtySitemapPaths } from "@/lib/radiation-hospital-page";
import { doctors, hospitals } from "@/lib/data";
import { doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import { INDIA_CITIES, SPECIALTIES } from "@/lib/taxonomy";

/** Runs `body` with one page type's template gate open, then restores it. */
function withGateOpen(pageType: "doctorFacet" | "hospitalFacet", body: () => void) {
  const original = ARABIC_TEMPLATE_APPROVED[pageType];
  ARABIC_TEMPLATE_APPROVED[pageType] = true;
  try {
    body();
  } finally {
    ARABIC_TEMPLATE_APPROVED[pageType] = original;
  }
}

/** Every doctor facet URL the site can address, matching the gate test's set. */
function doctorFacets() {
  const paths = new Set<string>(doctorSpecialtySitemapPaths(doctors));
  paths.add(doctorsPath({ destination: "India" }));
  for (const city of INDIA_CITIES) paths.add(doctorsPath({ destination: "India", city }));
  for (const specialty of SPECIALTIES) {
    paths.add(doctorsPath({ destination: "India", specialty: specialty.name }));
  }
  return [...paths];
}

/** The hospital equivalent, where the overlap gate does the suppressing. */
function hospitalFacets() {
  const paths = new Set<string>(hospitalSpecialtySitemapPaths(hospitals, doctors));
  paths.add(hospitalsPath({ destination: "India" }));
  for (const city of INDIA_CITIES) paths.add(hospitalsPath({ destination: "India", city }));
  for (const specialty of SPECIALTIES) {
    paths.add(hospitalsPath({ destination: "India", specialty: specialty.name }));
  }
  return [...paths];
}

const arabicSlugs = (path: string) => {
  const query = parsePrettyCatalogSegments(path.split("/").filter(Boolean).slice(1));
  assert.ok(query, path);
  return new Set(filterDoctors(query, doctorsForLocale("ar")).map((row) => row.slug));
};

test("a doctor facet identical to its parent names the parent as canonical", () => {
  withGateOpen("doctorFacet", () => {
    const published = doctorFacets().filter((path) => localePageState("ar", path) === "published");
    assert.equal(published.length, 74, "stage 1 is the population under test");

    const redirected: string[] = [];
    for (const path of published) {
      const canonical = canonicalFacetPath(path, "ar");
      if (canonical === path) continue;
      redirected.push(path);

      // The claim the canonical makes must actually hold: same records.
      const own = arabicSlugs(path);
      const target = arabicSlugs(canonical);
      assert.equal(own.size, target.size, `${path} -> ${canonical}`);
      for (const slug of own) assert.ok(target.has(slug), `${slug} missing from ${canonical}`);

      // And it must not point somewhere Arabic does not publish.
      assert.equal(localePageState("ar", canonical), "published", canonical);
    }

    assert.equal(
      redirected.length,
      17,
      "the 17 doctor facets whose Arabic result set equals their parent's",
    );
  });
});

test("a doctor facet that narrows its parent keeps its own canonical", () => {
  withGateOpen("doctorFacet", () => {
    const narrowing = doctorFacets().filter((path) => {
      if (localePageState("ar", path) !== "published") return false;
      const query = parsePrettyCatalogSegments(path.split("/").filter(Boolean).slice(1));
      const parent = query ? parentCatalogQuery(query) : null;
      if (!parent) return false;
      return filterDoctors(parent, doctorsForLocale("ar")).length > arabicSlugs(path).size;
    });
    assert.ok(narrowing.length > 0, "there are facets that narrow their parent");
    for (const path of narrowing) {
      assert.equal(canonicalFacetPath(path, "ar"), path, path);
    }
  });
});

test("the canonical resolves to a page that is not itself a duplicate", () => {
  withGateOpen("doctorFacet", () => {
    for (const path of doctorFacets()) {
      if (localePageState("ar", path) !== "published") continue;
      const canonical = canonicalFacetPath(path, "ar");
      // Walking the chain once must reach a fixed point, not another duplicate.
      assert.equal(canonicalFacetPath(canonical, "ar"), canonical, `chain from ${path}`);
    }
  });
});

test("withLocaleMetadata emits the parent URL and drops hreflang on a duplicate", () => {
  withGateOpen("doctorFacet", () => {
    const duplicate = doctorFacets().find(
      (path) =>
        localePageState("ar", path) === "published" && canonicalFacetPath(path, "ar") !== path,
    );
    assert.ok(duplicate, "a published duplicate exists to test");
    const parent = canonicalFacetPath(duplicate, "ar");

    const meta = withLocaleMetadata({}, duplicate, "ar", ["en", "ar"]);
    assert.equal(meta.alternates?.canonical, `https://gaf.healthcare/ar${parent}`);
    // A page deferring to another URL is not the canonical of a language set.
    assert.deepEqual(meta.alternates?.languages, {});
    assert.equal(meta.openGraph?.url, `https://gaf.healthcare/ar${parent}`);
  });
});

test("English facets keep self-canonical regardless of overlap", () => {
  // 1,161 English facets are set-identical to their parent and every one is
  // live and self-canonical. Retargeting them is not part of adding Arabic.
  for (const path of doctorFacets()) {
    assert.equal(canonicalFacetPath(path, "en"), path, path);
  }
  const meta = withLocaleMetadata({}, "/doctors/India/Radiation-Oncology", "en", ["en", "ar"]);
  assert.equal(
    meta.alternates?.canonical,
    "https://gaf.healthcare/doctors/India/Radiation-Oncology",
  );
});

test("an unpublished facet makes no canonical claim yet", () => {
  // A noindex page is not asking to be indexed, so it has no canonical
  // decision to get wrong. The hospital facets held back by the overlap gate
  // are the population still in that state, and they are exactly the ones that
  // would be retargeted if the rule ran on unpublished pages.
  const held = hospitalFacets().filter((path) => localePageState("ar", path) === "noindex");
  assert.ok(held.length > 1000, `expected the suppressed hospital facets, got ${held.length}`);
  for (const path of held.slice(0, 60)) {
    assert.equal(canonicalFacetPath(path, "ar"), path, path);
  }
});

import assert from "node:assert/strict";
import test from "node:test";
import { costsDirectoryMetadata } from "@/app/costs/metadata";
import { filterDoctors, filterHospitals, filterTreatments } from "@/lib/catalog";
import { costsFilterPath } from "@/lib/catalog-links";
import { parentCatalogQuery } from "@/lib/catalog-options";
import { costCountryPageIsPublishable, resolveCostCountryPage } from "@/lib/cost-country-page";
import { catalogSpecialtyName } from "@/lib/catalog-links";
import { treatments } from "@/lib/data";
import { directoryIntro } from "@/lib/i18n/directory-copy";
import { canonicalFacetPath } from "@/lib/i18n/facet-canonical";
import { facetCandidatePaths } from "@/lib/i18n/facet-candidates";
import { localePageState, localePathIsPublished } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { doctorsForLocale, hospitalsForLocale, treatmentsForLocale } from "@/lib/locale-catalog";
import { parsePrettyCatalogSegments, prettyCatalogPath } from "@/lib/pretty-catalog-path";
import { COUNTRIES, SPECIALTIES, isPrimaryCountry } from "@/lib/taxonomy";

test("all 1,083 parent-identical English facets are accounted for cleanly", () => {
  const enDoctors = doctorsForLocale("en");
  const enHospitals = hospitalsForLocale("en");
  const enTreatments = treatmentsForLocale("en");

  let totalIdentical = 0;
  let canonicalised = 0;
  let preservedHubs = 0;
  let preservedCostCity = 0;
  let alreadyNoindex = 0;

  for (const path of facetCandidatePaths()) {
    const segments = path.split("/").filter(Boolean);
    const entity = segments[0];
    if (entity !== "doctors" && entity !== "hospitals" && entity !== "costs") continue;
    const query = parsePrettyCatalogSegments(segments.slice(1));
    if (!query) continue;
    const parent = parentCatalogQuery(query);
    if (!parent) continue;

    const getSlugs = (q: typeof query) => {
      if (entity === "doctors") return new Set(filterDoctors(q, enDoctors).map((d) => d.slug));
      if (entity === "hospitals") return new Set(filterHospitals(q, enHospitals).map((h) => h.slug));
      return new Set(filterTreatments(q, enTreatments).map((t) => t.slug));
    };

    const own = getSlugs(query);
    const par = getSlugs(parent);
    if (own.size === 0 || own.size !== par.size || ![...own].every((s) => par.has(s))) continue;

    totalIdentical += 1;

    if (!localePathIsPublished("en", path)) {
      alreadyNoindex += 1;
      assert.equal(canonicalFacetPath(path, "en"), path);
      continue;
    }

    if (entity === "hospitals" && !query.procedure && query.city && query.specialty) {
      preservedHubs += 1;
      assert.equal(canonicalFacetPath(path, "en"), path, `preserve hub ${path}`);
      continue;
    }

    if (entity === "costs" && query.city && !query.specialty && !query.procedure) {
      preservedCostCity += 1;
      assert.equal(canonicalFacetPath(path, "en"), path, `preserve cost city ${path}`);
      continue;
    }

    canonicalised += 1;
    const target = canonicalFacetPath(path, "en");
    assert.notEqual(target, path, `expected duplicate ${path} to canonicalise`);
    assert.equal(canonicalFacetPath(target, "en"), target, `fixed point for ${path}`);
    assert.equal(localePageState("en", target), "published", target);

    // Procedure-level hospital duplicates stop at their specialty hub parent.
    if (entity === "hospitals") {
      const targetQuery = parsePrettyCatalogSegments(target.split("/").filter(Boolean).slice(1));
      assert.ok(targetQuery?.specialty, `hospital canonical target keeps specialty: ${target}`);
    }

    // Metadata emits parent canonical and drops hreflang.
    const meta = withLocaleMetadata({}, path, "en", ["en", "ar"]);
    assert.ok(
      typeof meta.alternates?.canonical === "string" &&
        meta.alternates.canonical.endsWith(target.toLowerCase()),
      `${path} canonical mismatch`,
    );
    assert.deepEqual(meta.alternates?.languages, {});
  }

  assert.equal(totalIdentical, 1083);
  assert.equal(canonicalised, 988);
  assert.equal(preservedHubs, 72);
  assert.equal(preservedCostCity, 1);
  assert.equal(alreadyNoindex, 22);
});

test("English sitemap excludes canonicalised duplicate facets while keeping hubs and Arabic sitemap", () => {
  const enUrls = new Set(buildLocaleSitemap("en").map((e) => new URL(e.url).pathname.toLowerCase()));
  const arUrls = new Set(buildLocaleSitemap("ar").map((e) => new URL(e.url).pathname.toLowerCase()));

  // 8,294 baseline EN URLs minus 988 canonicalised-away duplicates = 7,306
  assert.equal(enUrls.size, 7306);
  // Arabic sitemap count stays intact
  assert.equal(arUrls.size, 4843);

  // Sample canonicalised doctor and hospital procedure facets are absent from sitemap-en
  assert.equal(enUrls.has("/doctors/india/chennai/radiation-oncology/imrt"), false);
  assert.equal(enUrls.has("/hospitals/india/bengaluru/radiation-oncology/imrt"), false);

  // Preserved hubs and narrowing procedure facets remain in sitemap-en
  assert.equal(enUrls.has("/hospitals/india/bengaluru/radiation-oncology"), true);
  assert.equal(
    enUrls.has("/hospitals/india/delhi-ncr/radiation-oncology/external-beam-radiotherapy-ebrt"),
    true,
  );
  assert.equal(enUrls.has("/costs/india/chennai"), true);
});

test("Chennai and sibling India city cost directories have differentiated H1 and lede", () => {
  const rootCopy = directoryIntro("costs", { destination: "India" }, "en");
  const chennaiCopy = directoryIntro("costs", { destination: "India", city: "Chennai" }, "en");

  assert.equal(rootCopy.heading, "Oncology, ENT and GI treatment cost in India");
  assert.equal(chennaiCopy.heading, "Treatment costs in Chennai, India");
  assert.notEqual(chennaiCopy.lede, rootCopy.lede);
  assert.match(chennaiCopy.lede, /Chennai, India/);
});

test("all 1,676 non-India cost combinations remain noindex with empty hreflang", async () => {
  const nonIndiaCountries = COUNTRIES.map((c) => c.name).filter((d) => !isPrimaryCountry(d));
  const enUrls = new Set(buildLocaleSitemap("en").map((e) => new URL(e.url).pathname.toLowerCase()));

  let count = 0;
  for (const treatment of treatments) {
    const specialty = catalogSpecialtyName(treatment);
    for (const country of nonIndiaCountries) {
      const resolved = resolveCostCountryPage({
        destination: country,
        specialty,
        procedure: treatment.name,
      });
      if (!resolved) continue;
      count += 1;
      assert.equal(costCountryPageIsPublishable(resolved), false, resolved.path);
      assert.equal(enUrls.has(resolved.path.toLowerCase()), false, resolved.path);
    }
  }
  assert.equal(count, 1676);

  // Spot-check metadata on a non-India procedure route
  const meta = await costsDirectoryMetadata(
    {
      destination: "Turkiye",
      specialty: "Medical Oncology",
      procedure: "Chemotherapy",
    },
    "en",
  );
  assert.deepEqual(meta.robots, { index: false, follow: true });
  assert.deepEqual(meta.alternates?.languages, {});
  assert.deepEqual(meta.openGraph?.alternateLocale, []);
});

test("empty non-India cost directory pages return noindex and strip hreflang", async () => {
  const nonIndiaCountries = COUNTRIES.map((c) => c.name).filter((d) => !isPrimaryCountry(d));
  let emptyCount = 0;

  for (const country of nonIndiaCountries) {
    const rootPath = costsFilterPath({ destination: country });
    assert.equal(localePageState("en", rootPath), "noindex", rootPath);
    emptyCount += 1;

    for (const specialty of SPECIALTIES) {
      const specPath = costsFilterPath({ destination: country, specialty: specialty.name });
      assert.equal(localePageState("en", specPath), "noindex", specPath);
      emptyCount += 1;
    }
  }
  assert.equal(emptyCount, 156);

  const rootMeta = await costsDirectoryMetadata({ destination: "Turkiye" }, "en");
  assert.deepEqual(rootMeta.robots, { index: false, follow: true });
  assert.deepEqual(rootMeta.alternates?.languages, {});

  const specMeta = await costsDirectoryMetadata(
    { destination: "Turkiye", specialty: "Medical Oncology" },
    "en",
  );
  assert.deepEqual(specMeta.robots, { index: false, follow: true });
  assert.deepEqual(specMeta.alternates?.languages, {});

  // Primary India cost pages remain indexable
  const indiaMeta = await costsDirectoryMetadata({ destination: "India" }, "en");
  assert.equal(indiaMeta.robots, undefined);
});

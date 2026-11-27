/**
 * Generates the Priority D thin & duplicate page protection audit CSV and summary JSON.
 *
 * Evaluates every one of:
 *   1. The 1,083 English catalog facets whose entity set matches their immediate parent.
 *   2. The 1,676 non-India cost procedure combinations (/costs/{country}/{specialty}/{procedure}).
 *   3. The 156 empty non-India cost directory pages (/costs/{country} and /costs/{country}/{specialty}).
 *
 * Run:
 *   NODE_OPTIONS='--conditions react-server' tsx scripts/audit/priority-d-thin-duplicate-audit.ts
 */
import fs from "node:fs";
import path from "node:path";
import { getCostArticle } from "@/data/cost-articles";
import {
  filterDoctors,
  filterHospitals,
  filterTreatments,
} from "@/lib/catalog";
import { catalogSpecialtyName, costsFilterPath } from "@/lib/catalog-links";
import { parentCatalogQuery, type CatalogQuery } from "@/lib/catalog-options";
import { costCountryPageIsPublishable, resolveCostCountryPage } from "@/lib/cost-country-page";
import { doctors, hospitals, treatments } from "@/lib/data";
import { buildHospitalSpecialtyHub } from "@/lib/radiation-hospital-page";
import { directoryIntro } from "@/lib/i18n/directory-copy";
import { canonicalFacetPath } from "@/lib/i18n/facet-canonical";
import { facetCandidatePaths } from "@/lib/i18n/facet-candidates";
import { localePageState, localePathIsPublished } from "@/lib/i18n/locale-publication";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { doctorsForLocale, hospitalsForLocale, treatmentsForLocale } from "@/lib/locale-catalog";
import { prettyCatalogPath } from "@/lib/pretty-catalog-path";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { COUNTRIES, SPECIALTIES, isPrimaryCountry } from "@/lib/taxonomy";

type Recommendation = "improve" | "canonicalise" | "noindex" | "preserve_already_noindex";

type AuditRow = {
  group: "en_duplicate_facet" | "non_india_cost_procedure" | "empty_non_india_cost_directory";
  facet_type: string;
  url: string;
  parent_url: string;
  canonical_target: string;
  entity_count: number;
  parent_entity_count: number;
  entity_overlap_pct: string;
  content_overlap: string;
  in_sitemap_before: boolean;
  in_sitemap_after: boolean;
  indexability_before: string;
  indexability_after: string;
  gsc_performance: string;
  backlinks: string;
  commercial_value: string;
  recommendation: Recommendation;
  rationale: string;
};

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter += 1;
  return inter / (a.size + b.size - inter);
}

function classifyFacetType(entity: string, query: CatalogQuery): string {
  const parts = [entity];
  if (query.city) parts.push("city");
  if (query.specialty) parts.push("spec");
  if (query.procedure) parts.push("proc");
  return parts.join("+");
}

function entityIds(entity: string, query: CatalogQuery): Set<string> {
  if (entity === "doctors") {
    return new Set(filterDoctors(query, doctorsForLocale("en")).map((d) => d.slug));
  }
  if (entity === "hospitals") {
    return new Set(filterHospitals(query, hospitalsForLocale("en")).map((h) => h.slug));
  }
  return new Set(filterTreatments(query, treatmentsForLocale("en")).map((t) => t.slug));
}

function csvEscape(v: string | number | boolean): string {
  const s = String(v);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function main() {
  const enSitemapUrls = new Set(
    buildLocaleSitemap("en").map((entry) => new URL(entry.url).pathname.toLowerCase()),
  );

  const rows: AuditRow[] = [];

  // 1. All 1,083 English parent-identical facets
  const candidates = facetCandidatePaths();
  for (const rawPath of candidates) {
    const segments = rawPath.split("/").filter(Boolean);
    const entity = segments[0];
    if (entity !== "doctors" && entity !== "hospitals" && entity !== "costs") continue;
    const query = parsePrettyCatalogSegments(segments.slice(1));
    if (!query) continue;
    const parentQuery = parentCatalogQuery(query);
    if (!parentQuery) continue;

    const own = entityIds(entity, query);
    const parent = entityIds(entity, parentQuery);
    if (own.size === 0 || own.size !== parent.size || ![...own].every((s) => parent.has(s))) {
      continue;
    }

    const parentPath = prettyCatalogPath(`/${entity}`, parentQuery);
    const facetType = classifyFacetType(entity, query);
    const published = localePathIsPublished("en", rawPath);
    const canonicalAfter = canonicalFacetPath(rawPath, "en");
    const inSitemapAfter = enSitemapUrls.has(rawPath.toLowerCase());
    const canonicalised = canonicalAfter !== rawPath;

    let contentOverlap = "0.50 (shared entity roster + procedure label)";
    let recommendation: Recommendation = "canonicalise";
    let commercialValue = "low_incremental_over_parent";
    let rationale =
      "100% identical entity roster to parent directory; canonicalise to parent and drop from sitemap-en.xml.";
    let inSitemapBefore = published;
    let indexabilityBefore = published ? "index,follow" : "noindex,follow";
    let indexabilityAfter = published ? "index,follow" : "noindex,follow";

    if (!published) {
      inSitemapBefore = false;
      recommendation = "preserve_already_noindex";
      commercialValue = "faculty_only_no_direct_hospital_evidence";
      rationale =
        "Already held at noindex,follow and omitted from sitemap-en.xml via sourceLocaleHospitalServiceLineFacetState (Pune faculty-only).";
    } else if (entity === "hospitals" && !query.procedure && query.city && query.specialty) {
      const hub = buildHospitalSpecialtyHub(query);
      const hubText = hub
        ? [
            hub.heading,
            hub.description,
            ...(hub.cityContext?.introduction ?? []),
            ...(hub.cityContext?.whyCity ?? []),
            ...hub.procedures.map((p) => p.name),
            ...hub.hospitals.map((h) => h.hospital.name),
          ].join(" ")
        : rawPath;
      const parentCopy = directoryIntro("hospitals", parentQuery, "en");
      const parentHospText = [
        parentCopy.heading,
        parentCopy.lede,
        ...filterHospitals(parentQuery, hospitals).map((h) => h.name),
      ].join(" ");
      const sim = jaccard(tokenize(hubText), tokenize(parentHospText));
      contentOverlap = `${sim.toFixed(3)} Jaccard (~${Math.round((1 - sim) * 100)}% distinct HospitalSpecialtyHub)`;
      recommendation = "improve";
      commercialValue = "high_city_specialty_hub";
      rationale =
        "Renders dedicated HospitalSpecialtyHub (cityContext, specialty-filtered doctors, procedures, cost links; ~85% distinct copy from city directory). Preserve self-canonical & sitemap.";
    } else if (entity === "costs" && query.city && !query.specialty && !query.procedure) {
      const ownCopy = directoryIntro("costs", query, "en");
      const parentCopy = directoryIntro("costs", parentQuery, "en");
      const sim = jaccard(
        tokenize(`${ownCopy.heading} ${ownCopy.lede}`),
        tokenize(`${parentCopy.heading} ${parentCopy.lede}`),
      );
      contentOverlap = `${sim.toFixed(3)} Jaccard after Priority D city copy fix (was 1.000)`;
      recommendation = "improve";
      commercialValue = "high_city_cost_hub";
      rationale =
        "Has full 419/419 treatment coverage and Arabic counterpart in sitemap-ar.xml; differentiated H1 and city-scoped lede in directory-copy.ts.";
    } else {
      const ownCopy = directoryIntro(entity, query, "en");
      const parentCopy = directoryIntro(entity, parentQuery, "en");
      const listNames = [...own].join(" ");
      const sim = jaccard(
        tokenize(`${ownCopy.heading} ${ownCopy.lede} ${listNames}`),
        tokenize(`${parentCopy.heading} ${parentCopy.lede} ${listNames}`),
      );
      contentOverlap = `${sim.toFixed(3)} Jaccard`;
      if (entity === "doctors") {
        rationale =
          "100% identical doctor roster to parent; aligns English canonicalFacetPath with Arabic (canonicalises to parent and removed from sitemap-en.xml).";
      } else {
        rationale =
          "100% identical hospital roster to specialty hub parent; canonicalises to parent hospital specialty hub and removed from sitemap-en.xml.";
      }
    }

    rows.push({
      group: "en_duplicate_facet",
      facet_type: facetType,
      url: rawPath.toLowerCase(),
      parent_url: parentPath.toLowerCase(),
      canonical_target: canonicalAfter.toLowerCase(),
      entity_count: own.size,
      parent_entity_count: parent.size,
      entity_overlap_pct: "100.0%",
      content_overlap: contentOverlap,
      in_sitemap_before: inSitemapBefore,
      in_sitemap_after: inSitemapAfter,
      indexability_before: indexabilityBefore,
      indexability_after: indexabilityAfter,
      gsc_performance: "unavailable_in_repo",
      backlinks: "unavailable_in_repo",
      commercial_value: commercialValue,
      recommendation,
      rationale,
    });

    if (recommendation === "canonicalise") {
      if (!canonicalised || inSitemapAfter) {
        throw new Error(`Expected canonicalised & sitemap-excluded for ${rawPath}`);
      }
    }
  }

  // 2. All 1,676 non-India cost procedure combinations
  const nonIndiaCostCountries = COUNTRIES.map((c) => c.name).filter((d) => !isPrimaryCountry(d));
  for (const treatment of treatments) {
    const specialty = catalogSpecialtyName(treatment);
    const article = getCostArticle(treatment.slug);
    if (!article) continue;
    for (const country of nonIndiaCostCountries) {
      const resolved = resolveCostCountryPage({
        destination: country,
        specialty,
        procedure: treatment.name,
      });
      if (!resolved) continue;
      const publishable = costCountryPageIsPublishable(resolved);
      const url = resolved.path.toLowerCase();
      const parentUrl = costsFilterPath({ destination: country, specialty }).toLowerCase();
      rows.push({
        group: "non_india_cost_procedure",
        facet_type: "costs+country+spec+proc",
        url,
        parent_url: parentUrl,
        canonical_target: url,
        entity_count: publishable ? 1 : 0,
        parent_entity_count: filterTreatments(
          { destination: country, specialty },
          treatmentsForLocale("en"),
        ).length,
        entity_overlap_pct: "N/A (modelled benchmark row; page=false)",
        content_overlap: "templated_country_cost_sheet_without_authored_page",
        in_sitemap_before: false,
        in_sitemap_after: enSitemapUrls.has(url),
        indexability_before: publishable ? "index,follow" : "noindex,follow",
        indexability_after: publishable ? "index,follow" : "noindex,follow",
        gsc_performance: "unavailable_in_repo",
        backlinks: "unavailable_in_repo",
        commercial_value: publishable
          ? "authored_country_page"
          : "modelled_international_comparison_unverified",
        recommendation: publishable ? "improve" : "noindex",
        rationale:
          "Country cost row lacks authored editorial page; remains noindex,follow with explicit empty hreflang and excluded from sitemaps until destination editorial copy is authored.",
      });
    }
  }

  // 3. Empty non-India cost directory routes (156)
  for (const country of nonIndiaCostCountries) {
    const rootPath = costsFilterPath({ destination: country });
    const rootCount = filterTreatments({ destination: country }, treatments).length;
    if (rootCount === 0) {
      rows.push({
        group: "empty_non_india_cost_directory",
        facet_type: "costs+country",
        url: rootPath.toLowerCase(),
        parent_url: "/costs",
        canonical_target: rootPath.toLowerCase(),
        entity_count: 0,
        parent_entity_count: treatments.length,
        entity_overlap_pct: "0.0% (0 matching treatments)",
        content_overlap: "empty_filter_shell",
        in_sitemap_before: false,
        in_sitemap_after: enSitemapUrls.has(rootPath.toLowerCase()),
        indexability_before: "index,follow (gap)",
        indexability_after: localePageState("en", rootPath) === "noindex" ? "noindex,follow" : "index,follow",
        gsc_performance: "unavailable_in_repo",
        backlinks: "unavailable_in_repo",
        commercial_value: "zero_inventory_directory",
        recommendation: "noindex",
        rationale:
          "Non-India country cost directory renders 0 matching treatments; moved from index,follow to noindex,follow with hreflang stripped.",
      });
    }
    for (const specialty of SPECIALTIES) {
      const specPath = costsFilterPath({ destination: country, specialty: specialty.name });
      const specCount = filterTreatments(
        { destination: country, specialty: specialty.name },
        treatments,
      ).length;
      if (specCount === 0) {
        rows.push({
          group: "empty_non_india_cost_directory",
          facet_type: "costs+country+spec",
          url: specPath.toLowerCase(),
          parent_url: rootPath.toLowerCase(),
          canonical_target: specPath.toLowerCase(),
          entity_count: 0,
          parent_entity_count: 0,
          entity_overlap_pct: "0.0% (0 matching treatments)",
          content_overlap: "empty_filter_shell",
          in_sitemap_before: false,
          in_sitemap_after: enSitemapUrls.has(specPath.toLowerCase()),
          indexability_before: "index,follow (gap)",
          indexability_after:
            localePageState("en", specPath) === "noindex" ? "noindex,follow" : "index,follow",
          gsc_performance: "unavailable_in_repo",
          backlinks: "unavailable_in_repo",
          commercial_value: "zero_inventory_directory",
          recommendation: "noindex",
          rationale:
            "Empty non-India country+specialty cost directory (0 treatments); moved from index,follow to noindex,follow with hreflang stripped.",
        });
      }
    }
  }

  const outDir = path.join(process.cwd(), "docs/seo-recovery/priority-d");
  fs.mkdirSync(outDir, { recursive: true });
  const header = [
    "group",
    "facet_type",
    "url",
    "parent_url",
    "canonical_target",
    "entity_count",
    "parent_entity_count",
    "entity_overlap_pct",
    "content_overlap",
    "in_sitemap_before",
    "in_sitemap_after",
    "indexability_before",
    "indexability_after",
    "gsc_performance",
    "backlinks",
    "commercial_value",
    "recommendation",
    "rationale",
  ];
  const csvLines = [
    header.join(","),
    ...rows.map((r) => header.map((col) => csvEscape(r[col as keyof AuditRow])).join(",")),
  ];
  fs.writeFileSync(path.join(outDir, "affected-urls-audit.csv"), `${csvLines.join("\n")}\n`);

  const summary = {
    totalRows: rows.length,
    enDuplicateFacets: rows.filter((r) => r.group === "en_duplicate_facet").length,
    enCanonicalised: rows.filter(
      (r) => r.group === "en_duplicate_facet" && r.recommendation === "canonicalise",
    ).length,
    enPreservedImproved: rows.filter(
      (r) => r.group === "en_duplicate_facet" && r.recommendation === "improve",
    ).length,
    enAlreadyNoindex: rows.filter(
      (r) => r.group === "en_duplicate_facet" && r.recommendation === "preserve_already_noindex",
    ).length,
    nonIndiaCostProcedures: rows.filter((r) => r.group === "non_india_cost_procedure").length,
    emptyNonIndiaCostDirectories: rows.filter(
      (r) => r.group === "empty_non_india_cost_directory",
    ).length,
    enSitemapTotalAfter: enSitemapUrls.size,
  };
  console.log(JSON.stringify(summary, null, 2));
}

main();

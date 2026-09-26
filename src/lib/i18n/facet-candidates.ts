import "server-only";
import { doctors, hospitals } from "@/lib/data";
import { doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import { doctorSpecialtySitemapPaths } from "@/lib/doctor-discovery";
import { hospitalSpecialtySitemapPaths } from "@/lib/radiation-hospital-page";
import { INDIA_CITIES, SPECIALTIES } from "@/lib/taxonomy";
import { canonicalFacetPath } from "@/lib/i18n/facet-canonical";
import { localePathIsPublished } from "@/lib/i18n/locale-publication";
import type { AppLocale } from "@/lib/i18n/languages";

/**
 * Every catalog facet URL the site can address, in one place.
 *
 * The publication gate, the sitemap and the analysis script all have to agree
 * on what the candidate set is, or the sitemap ends up listing pages the gate
 * does not publish — or, worse, quietly omitting pages it does. They used to
 * each build their own copy of this list.
 */
export function facetCandidatePaths(): string[] {
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

/**
 * The facets a locale may advertise: published, and speaking for themselves.
 *
 * A facet that names its parent as canonical has told search engines it is not
 * the address to index. Listing it in a sitemap would say the opposite, so the
 * duplicate-canonical facets are filtered out here rather than being published
 * and then contradicted.
 */
export function publishedFacetPaths(locale: AppLocale): string[] {
  return facetCandidatePaths().filter(
    (path) => localePathIsPublished(locale, path) && canonicalFacetPath(path, locale) === path,
  );
}

import "server-only";
import { listPublishedPosts } from "@/lib/blogs";
import { filterDoctors, filterHospitals } from "@/lib/catalog";
import {
  doctorsForHospitalLocale,
  doctorsForLocale,
  getDoctorForLocale,
  getHospitalForLocale,
  hospitalsForLocale,
} from "@/lib/locale-catalog";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import {
  LOCALES,
  SOURCE_LOCALE,
  type AppLocale,
} from "@/lib/i18n/languages";
import { stripLocalePrefix } from "@/lib/i18n/path";

function segmentsFor(path: string) {
  return stripLocalePrefix(path).pathname.split("/").filter(Boolean);
}

export function localePathIsPublished(locale: AppLocale, path: string) {
  if (locale === SOURCE_LOCALE) return true;
  const segments = segmentsFor(path);
  if (segments.length === 0 || segments[0] === "consult") return true;

  if (segments[0] === "doctors") {
    if (segments[1] === "compare") return false;
    const rows = doctorsForLocale(locale);
    if (segments.length === 1) return rows.length > 0;
    const query = parsePrettyCatalogSegments(segments.slice(1));
    if (query) return filterDoctors(query, rows).length > 0;
    return segments.length === 2 && Boolean(getDoctorForLocale(segments[1], locale));
  }

  if (segments[0] === "hospitals") {
    const rows = hospitalsForLocale(locale);
    if (segments.length === 1) return rows.length > 0;
    const query = parsePrettyCatalogSegments(segments.slice(1));
    if (query) return filterHospitals(query, rows).length > 0;
    const hospital = getHospitalForLocale(segments[1], locale);
    if (!hospital) return false;
    if (segments.length === 2) return true;
    if (segments.length === 3 && segments[2] === "doctors") {
      return doctorsForHospitalLocale(hospital.slug, locale).length > 0;
    }
    // Procedure editorial and cost content have no target-locale store yet.
    return false;
  }

  if (segments[0] === "blogs") {
    const posts = listPublishedPosts(locale);
    if (segments.length === 1) return posts.length > 0;
    return segments.length === 2 && posts.some((post) => post.slug === segments[1]);
  }

  // Cost guides and specialty editorials remain unpublished until their
  // locale-specific CMS records exist and have dedicated renderers.
  if (segments[0] === "costs" || segments[0] === "specialties") return false;

  return false;
}

export function publishedLocalesForPath(path: string) {
  return LOCALES.filter((locale) => localePathIsPublished(locale, path));
}

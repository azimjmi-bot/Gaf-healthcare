import "server-only";
import { filterDoctors, type CatalogQuery } from "@/lib/catalog";
import { citiesForDestination } from "@/lib/catalog-options";
import { paginateDoctors, type Doctor } from "@/lib/doctors";
import { arabicDoctorHub } from "@/lib/i18n/arabic-hub";
import { directoryEmpty, directoryIntro } from "@/lib/i18n/directory-copy";
import { DOCTOR_FAQS_AR } from "@/lib/i18n/faqs-ar";
import { canonicalFacetPath } from "@/lib/i18n/facet-canonical";
import {
  localePageState,
  publishedLocalesForPath,
  type LocalePageState,
} from "@/lib/i18n/locale-publication";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { uiCatalogFor } from "@/lib/i18n/ui-catalogs";
import { doctorsForLocale } from "@/lib/locale-catalog";
import { prettyCatalogPath } from "@/lib/pretty-catalog-path";

export type ArabicDocumentMeta = {
  /** English (unprefixed) path of the page being served. */
  path: string;
  /** English path the page names as canonical; equals `path` unless it duplicates a parent. */
  canonicalPath: string;
  state: LocalePageState;
  /** Published, self-canonical and therefore allowed to advertise alternates. */
  inLanguageSet: boolean;
  /** Locales whose version of this path belongs in the hreflang block. */
  hreflangLocales: string[];
};

export type ArabicDoctorDirectoryData = {
  query: CatalogQuery;
  meta: ArabicDocumentMeta;
  eyebrow: string;
  heading: string;
  title: string;
  description: string;
  lede: string;
  /** Hub evidence paragraphs after the lede; empty when the facet has no hub copy. */
  intro: string[];
  crumbs: { name: string; path: string }[];
  cityChips: { name: string; label: string; href: string; count: number }[];
  countryHref: string;
  countryTotal: number;
  paging: ReturnType<typeof paginateDoctors>;
  emptyCopy: string;
  faqs: { q: string; a: string }[];
  messages: Record<string, string>;
};

/**
 * One place that turns a locale + path into the robots/canonical/hreflang
 * decisions `withLocaleMetadata` makes for App Router pages, so the static
 * HTML documents never disagree with the metadata the same URL would get
 * through the rewrite.
 */
export function arabicDocumentMeta(path: string): ArabicDocumentMeta {
  const state = localePageState("ar", path);
  const canonicalPath = state === "published" ? canonicalFacetPath(path, "ar") : path;
  const inLanguageSet = state === "published" && canonicalPath === path;
  return {
    path,
    canonicalPath,
    state,
    inLanguageSet,
    hreflangLocales: inLanguageSet ? publishedLocalesForPath(path) : [],
  };
}

function breadcrumbs(query: CatalogQuery, path: string) {
  const crumbs: { name: string; path: string }[] = [{ name: "الأطباء", path: "/doctors" }];
  if (!query.destination) return crumbs;
  const steps: CatalogQuery[] = [{ destination: query.destination }];
  if (query.city) steps.push({ ...steps[steps.length - 1], city: query.city });
  if (query.specialty) steps.push({ ...steps[steps.length - 1], specialty: query.specialty });
  if (query.procedure) steps.push({ ...steps[steps.length - 1], procedure: query.procedure });
  for (const step of steps) {
    const name = taxonomyLabel(step.procedure ?? step.specialty ?? step.city ?? step.destination, "ar");
    crumbs.push({ name, path: prettyCatalogPath("/doctors", step) });
  }
  // The trail must end on the page itself even when the path was reached via an alias.
  crumbs[crumbs.length - 1].path = path;
  return crumbs;
}

/**
 * Crawler-complete data for any Arabic doctor directory that is not the
 * Radiation Oncology editorial layer: country, city, specialty and procedure
 * facets. Mirrors the generic Arabic branch of `DoctorsDirectory` field for
 * field so the static document and the App Router page say the same thing.
 */
export function buildArabicDoctorDirectory(
  query: CatalogQuery,
  page = 1,
  rows: Doctor[] = doctorsForLocale("ar"),
): ArabicDoctorDirectoryData | undefined {
  if (!query.destination) return undefined;
  const path = prettyCatalogPath("/doctors", query);
  const meta = arabicDocumentMeta(path);
  if (meta.state === "missing") return undefined;

  const list = filterDoctors(query, rows);
  const paging = paginateDoctors(list, page);
  const hub = arabicDoctorHub(query, "ar");
  const intro = directoryIntro("doctors", query, "ar");
  const heading = hub ? hub.heading : intro.heading;
  const lede = hub ? hub.intro[0] ?? intro.lede : intro.lede;

  const countryQuery = { ...query, city: undefined };
  const countryRows = filterDoctors(countryQuery, rows);
  const cityChips = citiesForDestination(query.destination)
    .map((city) => ({
      name: city,
      label: taxonomyLabel(city, "ar"),
      href: prettyCatalogPath("/doctors", { ...query, city }),
      count: countryRows.filter((doctor) => doctor.city === city).length,
    }))
    .filter((chip) => chip.count > 0);

  return {
    query,
    meta,
    eyebrow: hub ? hub.eyebrow : intro.eyebrow,
    heading,
    title: hub ? hub.title : heading,
    description: hub ? hub.description : lede,
    lede,
    intro: hub ? hub.intro.slice(1) : [],
    crumbs: breadcrumbs(query, path),
    cityChips,
    countryHref: prettyCatalogPath("/doctors", countryQuery),
    countryTotal: countryRows.length,
    paging,
    emptyCopy: directoryEmpty("doctors", query, "ar"),
    faqs: DOCTOR_FAQS_AR,
    messages: uiCatalogFor("ar"),
  };
}

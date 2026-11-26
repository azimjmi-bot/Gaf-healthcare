import type { CatalogQuery } from "@/lib/catalog-options";
import { costsFilterPath } from "@/lib/catalog-links";
import { catalogMetadata } from "@/lib/catalog-metadata";
import { LOCALES, SOURCE_LOCALE, type AppLocale } from "@/lib/i18n/languages";
import { withLightLocaleMetadata } from "@/lib/i18n/locale-metadata-light";
import { getRequestLocale } from "@/lib/i18n/request";
import { prettyCatalogPath } from "@/lib/pretty-catalog-path";
import { getCity, getSpecialty, isPrimaryCountry, toSlug } from "@/lib/taxonomy";
import type { Metadata } from "next";

async function costsPageIsRenderable(locale: AppLocale, path: string) {
  // English catalog pages are published before any treatment catalog is read.
  if (locale === SOURCE_LOCALE) return true;
  const { localePageIsRenderable } = await import("@/lib/i18n/locale-publication");
  return localePageIsRenderable(locale, path);
}

async function directoryCatalogMetadata(query: CatalogQuery, localeOverride?: AppLocale) {
  const locale = localeOverride ?? (await getRequestLocale());
  const englishPath = prettyCatalogPath("/costs", query);
  if (englishPath === "/costs") {
    const light = withLightLocaleMetadata(
      catalogMetadata("treatments", query),
      englishPath,
      locale,
      LOCALES,
    );
    if (light) return light;
  }
  const { catalogPageMetadata } = await import("@/lib/i18n/page-meta");
  return catalogPageMetadata("treatments", query, locale);
}

export async function costsDirectoryMetadata(
  query: CatalogQuery,
  localeOverride?: AppLocale,
): Promise<Metadata> {
  const locale = localeOverride ?? (await getRequestLocale());
  if (!(await costsPageIsRenderable(locale, costsFilterPath(query)))) {
    return { robots: { index: false, follow: false } };
  }
  if (query.procedure) {
    const { costsProcedureMetadata } = await import("./procedure-metadata");
    const { withLocaleMetadata } = await import("@/lib/i18n/metadata");
    const meta = await costsProcedureMetadata(query, locale);
    if (locale === "ar") return meta;
    // Country views already carry their own canonical and country-specific copy.
    if (!isPrimaryCountry(query.destination)) return meta;
    // Country-level procedure pages chose their own canonical but emitted no
    // hreflang. The path they canonicalise to is the one this query builds.
    if (!query.city) return withLocaleMetadata(meta, costsFilterPath(query), locale, LOCALES);
    const wrapped = await directoryCatalogMetadata(query, locale);
    return {
      ...meta,
      alternates: wrapped.alternates,
      openGraph: { ...meta.openGraph, ...wrapped.openGraph },
    };
  }
  const wrapped = await directoryCatalogMetadata(query, locale);
  const specialty = query.specialty ? getSpecialty(query.specialty) : undefined;
  const city = query.city ? getCity(query.city) : undefined;
  const countrySlug = query.destination ? toSlug(query.destination) : undefined;
  const profile =
    locale === "en" && specialty && countrySlug && (!query.city || city)
      ? (await import("@/data/specialty-pages")).getSpecialtyPage(countrySlug, specialty.slug)
      : undefined;
  if (profile) {
    const { buildSpecialtyPageData, specialtyPageMeetsQualityThreshold } = await import(
      "@/lib/specialty-page"
    );
    const data = buildSpecialtyPageData(profile, city?.slug);
    const indexable =
      Boolean(data && specialtyPageMeetsQualityThreshold(data)) &&
      profile.allowIndex &&
      profile.status === "published";
    const path = costsFilterPath({
      destination: query.destination,
      city: query.city,
      specialty: specialty?.name ?? query.specialty,
    });
    const title = data?.city
      ? `${data.specialty.name} Cost in ${data.city.name}, ${data.country.name} | Treatment Guide`
      : profile.seoTitle;
    const description = data?.city
      ? `Explore ${data.procedures.length} ${data.specialty.name} ${data.profile.terminology.careItems}, ${data.hospitals.length} related hospitals and ${data.doctors.length} connected ${data.profile.terminology.practitioners} in ${data.city.name}, ${data.country.name}.`
      : profile.seoDescription;
    // Overwriting alternates wholesale used to drop the hreflang block that
    // catalogPageMetadata had just built, so this branch shipped a canonical
    // and nothing else.
    const { withLocaleMetadata } = await import("@/lib/i18n/metadata");
    return withLocaleMetadata(
      {
        ...wrapped,
        title,
        description,
        robots: indexable ? undefined : { index: false, follow: true },
        openGraph: {
          ...wrapped.openGraph,
          title,
          description,
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
        },
      },
      path,
      locale,
      LOCALES,
    );
  }
  const facets = [query.city, query.specialty].filter(Boolean).length;
  if (locale === SOURCE_LOCALE && facets > 1) {
    return { ...wrapped, robots: { index: false, follow: true } };
  }
  return wrapped;
}

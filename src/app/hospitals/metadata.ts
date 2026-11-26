import type { Metadata } from "next";
import type { CatalogQuery } from "@/lib/catalog";
import { hospitalsPath } from "@/lib/catalog-links";
import { arabicHospitalHub } from "@/lib/i18n/arabic-hub";
import { LOCALES, type AppLocale } from "@/lib/i18n/languages";
import { localePageIsRenderable } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { catalogPageMetadata } from "@/lib/i18n/page-meta";
import { getRequestLocale } from "@/lib/i18n/request";
import { doctorsForLocale, hospitalsForLocale } from "@/lib/locale-catalog";
import {
  buildHospitalSpecialtyHub,
  hospitalSpecialtyPageIndexable,
  isHospitalSpecialtyScope,
} from "@/lib/radiation-hospital-page";
import { absoluteUrl } from "@/lib/seo-url";

function asNoindexFollow(meta: Metadata): Metadata {
  return {
    ...meta,
    robots: { index: false, follow: true },
    alternates: { ...meta.alternates, languages: {} },
    openGraph: meta.openGraph
      ? { ...meta.openGraph, alternateLocale: [] }
      : undefined,
  };
}

export async function hospitalsDirectoryMetadata(
  query: CatalogQuery,
  page = 1,
  localeOverride?: AppLocale,
): Promise<Metadata> {
  const locale = localeOverride ?? (await getRequestLocale());
  if (!localePageIsRenderable(locale, hospitalsPath(query))) {
    return { robots: { index: false, follow: false } };
  }
  if (locale === "en" && isHospitalSpecialtyScope(query)) {
    const hub = buildHospitalSpecialtyHub(
      query,
      page,
      hospitalsForLocale(locale),
      doctorsForLocale(locale),
    );
    if (!hub) {
      return asNoindexFollow(await catalogPageMetadata("hospitals", query, locale));
    }
    const indexable = hospitalSpecialtyPageIndexable(page, hub.paging.total);
    const result = withLocaleMetadata(
      {
        title: hub.title,
        description: hub.description,
        robots: indexable ? undefined : { index: false, follow: true },
        openGraph: {
          title: hub.title,
          description: hub.description,
          url: absoluteUrl(hub.path),
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: hub.title,
          description: hub.description,
        },
      },
      hub.path,
      locale,
      LOCALES,
    );
    return indexable ? result : asNoindexFollow(result);
  }
  const hub = arabicHospitalHub(query, locale);
  if (hub) {
    const result = withLocaleMetadata(
      {
        title: hub.title,
        description: hub.description,
        robots: page === 1 ? undefined : { index: false, follow: true },
        openGraph: {
          title: hub.title,
          description: hub.description,
          url: absoluteUrl(hospitalsPath(query), locale),
          type: "website",
        },
      },
      hospitalsPath(query),
      locale,
      LOCALES,
    );
    return page === 1 ? result : asNoindexFollow(result);
  }
  const wrapped = await catalogPageMetadata("hospitals", query, locale);
  if (page > 1) {
    return asNoindexFollow(wrapped);
  }
  return wrapped;
}

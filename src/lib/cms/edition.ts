import { SOURCE_LOCALE, isAppLocale, type AppLocale } from "@/lib/i18n/languages";

export const CMS_EDITION_COOKIE = "gaf_cms_edition";
export const CMS_EDITIONS = ["en", "ar"] as const;
export type CmsEdition = (typeof CMS_EDITIONS)[number];

export function isCmsEdition(value: string | null | undefined): value is CmsEdition {
  return value === "en" || value === "ar";
}

export function parseCmsEdition(value: string | null | undefined): CmsEdition {
  return isCmsEdition(value) ? value : SOURCE_LOCALE;
}

export function editionFromLocale(locale: AppLocale): CmsEdition {
  return locale === "ar" ? "ar" : "en";
}

export function localeFromEdition(edition: CmsEdition): AppLocale {
  return isAppLocale(edition) ? edition : SOURCE_LOCALE;
}

export function editionFromRequest(request: Request): CmsEdition {
  const url = new URL(request.url);
  if (url.searchParams.has("edition")) {
    return parseCmsEdition(url.searchParams.get("edition"));
  }
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${CMS_EDITION_COOKIE}=([^;]+)`));
  return parseCmsEdition(match?.[1] ? decodeURIComponent(match[1]) : undefined);
}

export const CMS_EDITION_LABELS: Record<CmsEdition, string> = {
  en: "English",
  ar: "العربية",
};

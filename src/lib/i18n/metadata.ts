import type { Metadata } from "next";
import { LANGUAGE_OG, SOURCE_LOCALE, type AppLocale } from "@/lib/i18n/languages";
import { localePath } from "@/lib/i18n/path";

export const SITE_ORIGIN = "https://gaf.healthcare";

export function localizedAbsoluteUrl(path: string, locale: AppLocale = SOURCE_LOCALE) {
  const prefixed = localePath(path, locale);
  return new URL(prefixed, SITE_ORIGIN).toString();
}

export function hreflangLanguages(englishPath: string, locales: readonly AppLocale[]) {
  const languages: Record<string, string> = {
    "x-default": localizedAbsoluteUrl(englishPath, "en"),
  };
  for (const locale of locales) {
    languages[locale] = localizedAbsoluteUrl(englishPath, locale);
  }
  return languages;
}

export function withLocaleMetadata(
  meta: Metadata,
  englishPath: string,
  locale: AppLocale,
  availableLocales: readonly AppLocale[],
): Metadata {
  const url = localizedAbsoluteUrl(englishPath, locale);
  const languages = hreflangLanguages(englishPath, availableLocales);
  const og = meta.openGraph ? { ...meta.openGraph } : {};
  const twitter = meta.twitter ? { ...meta.twitter } : {};
  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      canonical: url,
      languages,
    },
    openGraph: {
      ...og,
      url,
      locale: LANGUAGE_OG[locale],
      siteName: typeof og.siteName === "string" ? og.siteName : "GAF Healthcare",
    },
    twitter,
  };
}

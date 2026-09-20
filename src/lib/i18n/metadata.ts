import type { Metadata } from "next";
import { LANGUAGE_OG, SOURCE_LOCALE, type AppLocale } from "@/lib/i18n/languages";
import { localePath } from "@/lib/i18n/path";
import { localePageState, publishedLocalesForPath } from "@/lib/i18n/locale-publication";

export const SITE_ORIGIN = "https://gaf.healthcare";

export function localizedAbsoluteUrl(path: string, locale: AppLocale = SOURCE_LOCALE) {
  const prefixed = localePath(path, locale);
  return new URL(prefixed, SITE_ORIGIN).toString();
}

export function hreflangLanguages(englishPath: string, locales: readonly AppLocale[]) {
  const languages: Record<string, string> = {};
  if (locales.includes("en")) {
    languages["x-default"] = localizedAbsoluteUrl(englishPath, "en");
  }
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
  const published = new Set(publishedLocalesForPath(englishPath));
  const languages = hreflangLanguages(
    englishPath,
    availableLocales.filter((candidate) => published.has(candidate)),
  );
  const og = meta.openGraph ? { ...meta.openGraph } : {};
  const twitter = meta.twitter ? { ...meta.twitter } : {};
  // Single place that turns "this page is not published in this locale" into a
  // robots tag, so no route can forget it. Callers keep any stricter robots
  // value they set themselves.
  const robots =
    localePageState(locale, englishPath) === "published"
      ? meta.robots
      : { index: false, follow: true };
  return {
    ...meta,
    robots,
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

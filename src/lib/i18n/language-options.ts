import "server-only";
import {
  LANGUAGE_LABELS,
  LOCALES,
  SOURCE_LOCALE,
  isTargetLocale,
  type AppLocale,
} from "@/lib/i18n/languages";
import { localeIsPublished } from "@/lib/i18n/locale-gating";
import { localePathIsPublished } from "@/lib/i18n/locale-publication";
import { localePath, stripLocalePrefix } from "@/lib/i18n/path";

export type LanguageOption = {
  locale: AppLocale;
  label: string;
  href: string;
  /** False when the link falls back to the locale home rather than this page. */
  equivalent: boolean;
};

/**
 * What the language switcher may offer from a given page.
 *
 * The switcher used to list every locale unconditionally, so on most pages at
 * least one option led to a 404 and several led to pages we ask not to be
 * indexed. Each locale now has to earn its place: the equivalent page if it is
 * published, else that locale's home if that is published, else nothing.
 */
export function languageOptions(currentPath: string): LanguageOption[] {
  const english = stripLocalePrefix(currentPath).pathname || "/";
  const options: LanguageOption[] = [];

  for (const locale of LOCALES) {
    // An unlive locale has no page worth sending anyone to, including its home.
    if (isTargetLocale(locale) && !localeIsPublished(locale)) continue;

    if (localePathIsPublished(locale, english)) {
      options.push({
        locale,
        label: LANGUAGE_LABELS[locale],
        href: localePath(english, locale),
        equivalent: true,
      });
      continue;
    }
    if (localePathIsPublished(locale, "/")) {
      options.push({
        locale,
        label: LANGUAGE_LABELS[locale],
        href: localePath("/", locale),
        equivalent: false,
      });
    }
  }

  // English is the source language and its home always exists, so a page with
  // no options at all would mean the resolver is broken rather than the page
  // being genuinely monolingual.
  if (!options.some((option) => option.locale === SOURCE_LOCALE)) {
    options.unshift({
      locale: SOURCE_LOCALE,
      label: LANGUAGE_LABELS[SOURCE_LOCALE],
      href: localePath("/", SOURCE_LOCALE),
      equivalent: false,
    });
  }
  return options;
}

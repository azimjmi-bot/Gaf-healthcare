import { UI_MESSAGE_FIELDS } from "@/lib/i18n/messages";
import type { AppLocale, TargetLocale } from "@/lib/i18n/languages";
import type { TranslationFields } from "@/lib/i18n/catalogs/types";
import { HOME_EXTRA as HOME_AR, UI as AR } from "@/lib/i18n/catalogs/ar";
import { HOME_EXTRA as HOME_FR, UI as FR } from "@/lib/i18n/catalogs/fr";
import { HOME_EXTRA as HOME_RU, UI as RU } from "@/lib/i18n/catalogs/ru";
import { HOME_EXTRA as HOME_SW, UI as SW } from "@/lib/i18n/catalogs/sw";

/**
 * The index over the per-locale dictionaries in ./catalogs.
 *
 * These used to share one 700-line module, which meant every translation
 * review touched the same file and a reviewer working on Arabic had to scroll
 * past three other alphabets. One file per locale also makes it obvious at a
 * glance how complete each one is.
 */
export type { TranslationFields };

export const UI_CATALOGS: Record<TargetLocale, TranslationFields> = {
  ru: RU,
  fr: FR,
  ar: AR,
  sw: SW,
};

export const HOME_EXTRA_CATALOGS: Record<TargetLocale, TranslationFields> = {
  ru: HOME_RU,
  fr: HOME_FR,
  ar: HOME_AR,
  sw: HOME_SW,
};

/**
 * A target locale's dictionary, with every English key present so a lookup
 * never falls through to English: an untranslated key resolves to an empty
 * string and the caller decides what to render.
 */
export function uiCatalogFor(locale: AppLocale): TranslationFields {
  if (locale === "en") return { ...UI_MESSAGE_FIELDS };
  const empty = Object.fromEntries(
    Object.keys(UI_MESSAGE_FIELDS).map((key) => [key, ""]),
  );
  return { ...empty, ...UI_CATALOGS[locale] };
}

export function homeExtraCatalogFor(locale: AppLocale): TranslationFields {
  if (locale === "en") return {};
  return { ...HOME_EXTRA_CATALOGS[locale] };
}

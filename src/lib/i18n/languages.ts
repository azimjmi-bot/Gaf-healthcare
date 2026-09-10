export const SOURCE_LOCALE = "en" as const;
export const TARGET_LOCALES = ["ru", "fr", "ar", "sw"] as const;

export type SourceLocale = typeof SOURCE_LOCALE;
export type TargetLocale = (typeof TARGET_LOCALES)[number];
export type AppLocale = SourceLocale | TargetLocale;

export const LOCALES: readonly AppLocale[] = [SOURCE_LOCALE, ...TARGET_LOCALES];

export const LANGUAGE_LABELS: Record<AppLocale, string> = {
  en: "English",
  ru: "Русский",
  fr: "Français",
  ar: "العربية",
  sw: "Kiswahili",
};

export const LANGUAGE_OG: Record<AppLocale, string> = {
  en: "en_IN",
  ru: "ru_RU",
  fr: "fr_FR",
  ar: "ar",
  sw: "sw_KE",
};

export const LOCALE_HEADER = "x-gaf-locale";

export function isTargetLocale(value: string): value is TargetLocale {
  return (TARGET_LOCALES as readonly string[]).includes(value);
}

export function isAppLocale(value: string): value is AppLocale {
  return value === SOURCE_LOCALE || isTargetLocale(value);
}

export function parseLocale(value: string | null | undefined): AppLocale {
  if (value && isAppLocale(value)) return value;
  return SOURCE_LOCALE;
}

export function localeDir(locale: AppLocale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function isRtlLocale(locale: AppLocale) {
  return locale === "ar";
}

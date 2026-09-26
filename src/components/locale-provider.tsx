"use client";

import { createContext, useContext, type ReactNode } from "react";
import { SOURCE_LOCALE, localeDir, type AppLocale } from "@/lib/i18n/languages";
import type { LanguageOption } from "@/lib/i18n/language-options";
import type { LocaleSurface } from "@/lib/i18n/locale-availability";
import { UI_MESSAGE_FIELDS } from "@/lib/i18n/messages";

type LocaleContextValue = {
  locale: AppLocale;
  dir: "ltr" | "rtl";
  messages: Record<string, string>;
  surfaces: readonly LocaleSurface[];
  languageOptions: readonly LanguageOption[];
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: SOURCE_LOCALE,
  dir: "ltr",
  messages: UI_MESSAGE_FIELDS,
  surfaces: [],
  languageOptions: [],
});

export function LocaleProvider({
  locale,
  messages,
  surfaces,
  languageOptions,
  children,
}: {
  locale: AppLocale;
  messages: Record<string, string>;
  surfaces: readonly LocaleSurface[];
  languageOptions: readonly LanguageOption[];
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider
      value={{ locale, dir: localeDir(locale), messages, surfaces, languageOptions }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext).locale;
}

export function useMessages() {
  return useContext(LocaleContext).messages;
}

/** The locales the switcher may offer from the current page. */
export function useLanguageOptions() {
  return useContext(LocaleContext).languageOptions;
}

/** Whether a nav surface has content in the current locale. */
export function useSurfaceAvailable() {
  const { surfaces } = useContext(LocaleContext);
  return (surface: LocaleSurface) => surfaces.includes(surface);
}

export function useT() {
  const { locale, messages } = useContext(LocaleContext);
  return (key: string, vars?: Record<string, string | number>) => {
    let value =
      locale === SOURCE_LOCALE
        ? messages[key] || UI_MESSAGE_FIELDS[key] || key
        : messages[key] ?? "";
    if (vars) {
      value = value.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? ""));
    }
    return value;
  };
}

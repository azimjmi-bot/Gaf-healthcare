"use client";

import { createContext, useContext, type ReactNode } from "react";
import { SOURCE_LOCALE, localeDir, type AppLocale } from "@/lib/i18n/languages";
import { UI_MESSAGE_FIELDS } from "@/lib/i18n/messages";

type LocaleContextValue = {
  locale: AppLocale;
  dir: "ltr" | "rtl";
  messages: Record<string, string>;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: SOURCE_LOCALE,
  dir: "ltr",
  messages: UI_MESSAGE_FIELDS,
});

export function LocaleProvider({
  locale,
  messages,
  children,
}: {
  locale: AppLocale;
  messages: Record<string, string>;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, dir: localeDir(locale), messages }}>
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

export function useT() {
  const messages = useMessages();
  return (key: string, vars?: Record<string, string | number>) => {
    let value = messages[key] || UI_MESSAGE_FIELDS[key] || key;
    if (vars) {
      value = value.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? ""));
    }
    return value;
  };
}

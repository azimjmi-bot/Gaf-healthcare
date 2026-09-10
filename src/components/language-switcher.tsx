"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "@/components/locale-provider";
import { LANGUAGE_LABELS, LOCALES, type AppLocale } from "@/lib/i18n/languages";
import { localePath, stripLocalePrefix } from "@/lib/i18n/path";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const search = useSearchParams();
  const english = stripLocalePrefix(pathname).pathname;
  const qs = search.toString();
  const current = `${english}${qs ? `?${qs}` : ""}`;

  return (
    <label className={`inline-flex items-center gap-2 text-sm ${className}`}>
      <span className="sr-only">Language</span>
      <select
        aria-label="Language"
        className="h-10 max-w-[9.5rem] rounded-full border border-current/25 bg-transparent px-3 text-sm"
        value={locale}
        onChange={(event) => {
          const next = event.target.value as AppLocale;
          window.location.assign(localePath(current, next));
        }}
      >
        {LOCALES.map((code) => (
          <option key={code} value={code} className="text-foreground">
            {LANGUAGE_LABELS[code]}
          </option>
        ))}
      </select>
    </label>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { useLanguageOptions, useLocale, useT } from "@/components/locale-provider";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const options = useLanguageOptions();
  const t = useT();
  const search = useSearchParams();
  const qs = search.toString();
  const label = t("lang.label");

  // One language and nothing to switch to is a control with no purpose.
  if (options.length < 2) return null;

  return (
    <label className={`inline-flex items-center gap-2 text-sm ${className}`}>
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        className="h-10 max-w-[9.5rem] rounded-full border border-current/25 bg-transparent px-3 text-sm"
        value={locale}
        onChange={(event) => {
          const next = options.find((option) => option.locale === event.target.value);
          if (!next) return;
          // Filters only survive a switch that lands on the same page.
          window.location.assign(next.equivalent && qs ? `${next.href}?${qs}` : next.href);
        }}
      >
        {options.map((option) => (
          <option key={option.locale} value={option.locale} className="text-foreground">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

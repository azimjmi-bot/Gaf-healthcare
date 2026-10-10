import type { AppLocale } from "@/lib/i18n/languages";
import type { LanguageOption } from "@/lib/i18n/language-options";

export function LanguageSwitcher({
  className = "",
  locale,
  options,
  label,
}: {
  className?: string;
  locale: AppLocale;
  options: readonly LanguageOption[];
  label: string;
}) {
  if (options.length < 2) return null;

  return (
    <nav className={`lang-switch ${className}`.trim()} aria-label={label}>
      {options.map((option) => {
        const current = option.locale === locale;
        return (
          <a
            key={option.locale}
            href={option.href}
            hrefLang={option.locale}
            lang={option.locale}
            aria-current={current ? "page" : undefined}
            className={current ? "is-current" : undefined}
          >
            {option.label}
          </a>
        );
      })}
    </nav>
  );
}

import type { AppLocale } from "@/lib/i18n/languages";

/**
 * Noto Sans Arabic is only painted under html[lang="ar"]. Loading it through
 * next/font in the shared root layout put a second render-blocking stylesheet
 * (and unused @font-face rules) on every English page, including the homepage
 * PageSpeed run. Arabic pages fetch the family here instead.
 */
export function LocaleFontLinks({ locale }: { locale: AppLocale }) {
  if (locale !== "ar") return null;
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
      />
    </>
  );
}

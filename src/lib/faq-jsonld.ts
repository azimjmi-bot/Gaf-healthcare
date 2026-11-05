import type { AppLocale } from "@/lib/i18n/languages";
import { absoluteUrl } from "@/lib/seo-url";

/** Same identity as `documentId(path, locale, "faq")` without loading the publication graph. */
export function faqJsonLd(
  rows: { q: string; a: string }[],
  opts: { path: string; locale?: AppLocale },
) {
  const locale = opts.locale ?? "en";
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(opts.path, locale)}#faq`,
    inLanguage: locale,
    url: absoluteUrl(opts.path, locale),
    mainEntity: rows.map((row) => ({
      "@type": "Question",
      name: row.q,
      acceptedAnswer: { "@type": "Answer", text: row.a },
    })),
  };
}

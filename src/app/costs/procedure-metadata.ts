import type { Metadata } from "next";
import { costCountryMetadata } from "@/app/costs/country-metadata";
import { getCostArticle } from "@/data/cost-articles";
import type { CatalogQuery } from "@/lib/catalog";
import { catalogSpecialtyName, costsFilterPath } from "@/lib/catalog-links";
import { cityEditorial, interpolateCostArticle } from "@/lib/cost-article";
import { treatments } from "@/lib/data";
import type { AppLocale } from "@/lib/i18n/languages";
import { getRequestLocale } from "@/lib/i18n/request";
import { absoluteUrl, catalogMetadata, costArticleMetadata } from "@/lib/seo";
import { getSpecialty } from "@/lib/taxonomy";
import { withContextualTreatmentImages } from "@/lib/treatment-images";
import type { Treatment } from "@/lib/treatments";

function costArticleFor(treatment: Treatment) {
  const cmsOverrides = Boolean(
    treatment.replaceGuide && treatment.blocks && treatment.blocks.length > 0,
  );
  if (cmsOverrides) return undefined;
  const raw = getCostArticle(treatment.slug);
  if (!raw) return undefined;
  return withContextualTreatmentImages(interpolateCostArticle(raw, treatment), treatment);
}

function treatmentForQuery(sheet: Treatment, query: CatalogQuery): Treatment {
  if (!query.specialty) return sheet;
  const specialty = getSpecialty(query.specialty);
  if (!specialty || !sheet.specialtySlugs.includes(specialty.slug)) return sheet;
  return { ...sheet, category: specialty.name, specialtySlug: specialty.slug };
}

export async function costsProcedureMetadata(
  query: CatalogQuery,
  localeOverride?: AppLocale,
): Promise<Metadata> {
  const locale = localeOverride ?? (await getRequestLocale());
  if (locale === "ar") {
    const { arabicCostProcedureMetadata } = await import("@/lib/i18n/ar-cost-content");
    return arabicCostProcedureMetadata(query);
  }
  const base = catalogMetadata("treatments", query);
  const country = costCountryMetadata(query);
  if (country) return country;
  const source = query.procedure ? treatments.find((t) => t.name === query.procedure) : undefined;
  if (!source) return base;
  const sheet = treatmentForQuery(source, query);
  const canonicalSpecialty = catalogSpecialtyName(source);
  const article = costArticleFor(sheet);
  if (article && query.city) {
    const cityPage = cityEditorial(article, query.city)?.page;
    if (cityPage) {
      const path = costsFilterPath({
        destination: query.destination || "India",
        city: query.city,
        specialty: canonicalSpecialty,
        procedure: source.name,
      });
      return costArticleMetadata(
        sheet,
        {
          seoTitle: cityPage.seoTitle,
          seoDescription: cityPage.seoDescription,
          lastUpdated: article.lastUpdated,
        },
        { path, image: article.figures?.[0]?.src, imageAlt: article.figures?.[0]?.alt },
      );
    }
  }
  const canonicalPath = costsFilterPath({
    destination: query.destination,
    specialty: canonicalSpecialty,
    procedure: source.name,
  });
  const canonicalUrl = absoluteUrl(canonicalPath);
  const meta = article
    ? costArticleMetadata(sheet, interpolateCostArticle(article, sheet), {
        image: article.figures?.[0]?.src,
        imageAlt: article.figures?.[0]?.alt,
      })
    : base;
  return {
    ...meta,
    alternates: { canonical: canonicalUrl },
    openGraph: { ...meta.openGraph, url: canonicalUrl },
  };
}

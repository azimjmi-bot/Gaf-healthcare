import { getCostArticle } from "@/data/cost-articles";
import type { CatalogQuery } from "@/lib/catalog";
import { costsFilterPath } from "@/lib/catalog-links";
import { catalogSpecialtyName, cityEditorial, interpolateCostArticle } from "@/lib/cost-article";
import { treatments } from "@/lib/data";
import type { AppLocale } from "@/lib/i18n/languages";
import { getRequestLocale } from "@/lib/i18n/request";
import { absoluteUrl, catalogMetadata, costArticleMetadata } from "@/lib/seo";
import { getSpecialty } from "@/lib/taxonomy";
import { withContextualTreatmentImages } from "@/lib/treatment-images";
import type { Treatment } from "@/lib/treatments";
import { costCountryMetadata } from "@/app/costs/country-metadata";
import type { Metadata } from "next";

function treatmentForQuery(sheet: Treatment, query: CatalogQuery): Treatment {
  if (!query.specialty) return sheet;
  const specialty = getSpecialty(query.specialty);
  if (!specialty || !sheet.specialtySlugs.includes(specialty.slug)) return sheet;
  return { ...sheet, category: specialty.name, specialtySlug: specialty.slug };
}

function costArticleForMetadata(treatment: Treatment) {
  const raw = getCostArticle(treatment.slug);
  const cmsOverrides = Boolean(
    treatment.replaceGuide && treatment.blocks && treatment.blocks.length > 0,
  );
  if (!raw || cmsOverrides) return undefined;
  return withContextualTreatmentImages(interpolateCostArticle(raw, treatment), treatment);
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
  const article = costArticleForMetadata(sheet);
  if (article && query.city) {
    const cityPage = cityEditorial(article, query.city)?.page;
    if (cityPage) {
      const path = costsFilterPath({
        destination: query.destination || "India",
        city: query.city,
        specialty: query.specialty || catalogSpecialtyName(sheet),
        procedure: sheet.name,
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
  return {
    ...(article
      ? costArticleMetadata(sheet, interpolateCostArticle(article, sheet), {
          image: article.figures?.[0]?.src,
          imageAlt: article.figures?.[0]?.alt,
        })
      : base),
    alternates: {
      canonical: absoluteUrl(
        costsFilterPath({
          destination: query.destination,
          specialty: query.specialty || catalogSpecialtyName(sheet),
          procedure: sheet.name,
        }),
      ),
    },
  };
}

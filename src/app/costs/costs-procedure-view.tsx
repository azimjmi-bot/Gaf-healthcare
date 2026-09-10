import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { CostArticleSection, costArticleData, costArticleFor } from "@/components/cost-article-section";
import { JsonLd } from "@/components/json-ld";
import { cityResultCounts, filterTreatments, type CatalogQuery } from "@/lib/catalog";
import { costsFilterPath } from "@/lib/catalog-links";
import { cityEditorial, doctorsToConsiderHeading, hospitalsToConsiderHeading, interpolateCostArticle } from "@/lib/cost-article";
import { hospitals, treatments } from "@/lib/data";
import {
  absoluteUrl,
  catalogMetadata,
  costArticleMetadata,
  breadcrumbJsonLd,
  doctorItemListJsonLd,
  faqJsonLd,
  hospitalItemListJsonLd,
  medicalWebPageJsonLd,
} from "@/lib/seo";
import type { Metadata } from "next";

export async function costsProcedureMetadata(query: CatalogQuery): Promise<Metadata> {
  const base = catalogMetadata("treatments", query);
  const sheet = query.procedure ? treatments.find((t) => t.name === query.procedure) : undefined;
  if (!sheet) return base;
  const article = costArticleFor(sheet);
  if (article && query.city) {
    const cityPage = cityEditorial(article, query.city)?.page;
    if (cityPage) {
      const path = costsFilterPath({
        destination: query.destination || "India",
        city: query.city,
        specialty: query.specialty || sheet.category,
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
    alternates: { canonical: absoluteUrl(`/costs/${sheet.slug}`) },
  };
}

export async function CostsProcedureView({ query }: { query: CatalogQuery }) {
  const list = filterTreatments(query, treatments, hospitals);
  const sheet = query.procedure ? treatments.find((t) => t.name === query.procedure) : undefined;
  if (!sheet) return null;
  const sheetArticle = costArticleFor(sheet);
  if (!sheetArticle) return null;

  const chipStats =
    query.destination === "India" ? cityResultCounts("treatments", query) : null;
  const data = costArticleData(sheet, query.city);
  const cityPage = cityEditorial(sheetArticle, query.city)?.page;
  const pagePath = cityPage
    ? costsFilterPath({
        destination: query.destination || "India",
        city: query.city,
        specialty: query.specialty || sheet.category,
        procedure: sheet.name,
      })
    : `/costs/${sheet.slug}`;
  const faqs = cityPage
    ? [...cityPage.faqs, ...sheetArticle.faqs.filter((item) => !cityPage.faqs.some((faq) => faq.q === item.q))]
    : sheetArticle.faqs;
  const brief = sheetArticle.briefName || sheetArticle.procedure;

  return (
    <>
      <JsonLd
        data={medicalWebPageJsonLd({
          name: cityPage?.seoTitle || sheetArticle.seoTitle,
          description: cityPage?.seoDescription || sheetArticle.seoDescription,
          path: pagePath,
          lastReviewed: sheetArticle.lastUpdated,
          procedureName: sheet.name,
          specialty: sheet.category,
          about: sheetArticle.heroLede || sheet.summary,
          image: sheetArticle.figures?.[0]?.src,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Treatment Cost", path: "/costs" },
          { name: sheet.category, path: costsFilterPath({ destination: query.destination || "India", specialty: sheet.category }) },
          { name: sheet.name, path: `/costs/${sheet.slug}` },
          ...(query.city ? [{ name: query.city, path: pagePath }] : []),
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      {data && data.faculty.length > 0 ? (
        <JsonLd
          data={doctorItemListJsonLd(data.faculty, {
            name: doctorsToConsiderHeading(brief, query.city, sheetArticle.cityDoctorHeading),
            path: pagePath,
          })}
        />
      ) : null}
      {data && data.campuses.length > 0 ? (
        <JsonLd
          data={hospitalItemListJsonLd(data.campuses.slice(0, 8), {
            name: hospitalsToConsiderHeading(brief, query.city, sheetArticle.cityHospitalHeading),
            path: pagePath,
          })}
        />
      ) : null}
      <CostArticleSection
        treatment={sheet}
        city={query.city}
        heading={cityPage?.heading ?? sheetArticle.heading}
        lede={cityPage?.subtitle ?? cityPage?.intro[0] ?? sheetArticle.heroSubtitle ?? sheetArticle.heroLede ?? sheet.summary}
        filters={
          <div className="pb-8">
            <Suspense fallback={<div className="h-24 rounded-2xl bg-white shadow-sm" />}>
              <CatalogFilter
                basePath="/costs"
                entity="treatments"
                query={query}
                chipStats={chipStats}
                resultCount={list.length}
                resultLabel={list.length === 1 ? "pathway" : "pathways"}
              />
            </Suspense>
          </div>
        }
      />
    </>
  );
}

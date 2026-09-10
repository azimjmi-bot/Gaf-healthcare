import Link from "next/link";
import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { CostArticleSection, costArticleData, costArticleFor } from "@/components/cost-article-section";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { filterTreatments, parseCatalogQuery } from "@/lib/catalog";
import { costsFilterPath } from "@/lib/catalog-links";
import { cityEditorial, doctorsToConsiderHeading, hospitalsToConsiderHeading, interpolateCostArticle } from "@/lib/cost-article";
import { hospitals, treatments } from "@/lib/data";
import {
  absoluteUrl,
  catalogMetadata,
  COST_FAQS,
  costArticleMetadata,
  breadcrumbJsonLd,
  doctorItemListJsonLd,
  faqJsonLd,
  hospitalItemListJsonLd,
  medicalWebPageJsonLd,
} from "@/lib/seo";
import { SPECIALTIES } from "@/lib/taxonomy";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const query = parseCatalogQuery(await searchParams);
  const base = catalogMetadata("treatments", query);

  const sheet = query.procedure ? treatments.find((t) => t.name === query.procedure) : undefined;
  if (sheet) {
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

  const facets = [query.city, query.specialty, query.procedure].filter(Boolean).length;
  if (facets > 1) {
    return { ...base, robots: { index: false, follow: true } };
  }

  return base;
}

export default async function CostsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseCatalogQuery(await searchParams);
  const list = filterTreatments(query, treatments, hospitals);
  const groupSpecs = query.specialty
    ? SPECIALTIES.filter((s) => s.name === query.specialty)
    : SPECIALTIES;
  const groups = groupSpecs.map((specialty) => ({
    ...specialty,
    items: list.filter((t) => t.specialtySlugs.includes(specialty.slug)),
  })).filter((g) => g.items.length > 0);
  const place = query.city ? `${query.city}, India` : "India";
  const directoryHome = !query.city && !query.specialty && !query.procedure;
  const heading = directoryHome
    ? "Compare Treatment Costs Before You Travel"
    : query.procedure
      ? `${query.procedure} cost in ${place}`
      : query.specialty
        ? `${query.specialty} cost in ${place}`
        : "Oncology, ENT and GI treatment cost in India";
  const lede = directoryHome
    ? "Explore indicative treatment costs by procedure, country, and location, and understand what may be included before choosing where to receive care."
    : "US cash-pay beside partner ranges for Radiation Oncology, Surgical Oncology, Medical Oncology, Hematology, Pediatric Hematology, Cardiac Surgery, Pediatric Cardiac Surgery, Cardiology, Bariatric Surgery, Cosmetic Surgery, ENT, Gastroenterology, Surgical Gastroenterology, Urology, Spine Surgery, Pulmonology, Pediatric Orthopaedic, Orthopedics, Ophthalmology, Gynecology, Neurosurgery, Neurology and Nephrology in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. Filter by destination, city, specialty or procedure — the same keys a later landing page will use. Figures are planning ranges, not quotations.";

  // Filtering down to one procedure is a cost-sheet request, so serve the full
  // article here rather than a one-row table. Canonical still points at /costs/[slug].
  const sheet = query.procedure ? treatments.find((t) => t.name === query.procedure) : undefined;
  const sheetArticle = sheet ? costArticleFor(sheet) : undefined;
  if (sheet && sheetArticle) {
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
            { name: sheet.category, path: `/costs?specialty=${encodeURIComponent(sheet.category)}` },
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

  return (
    <>
      <JsonLd data={faqJsonLd(COST_FAQS)} />
      <PageIntro
        eyebrow="India planning ranges"
        title={heading}
        lede={lede}
      >
        <Suspense fallback={<div className="h-24 rounded-2xl bg-white shadow-sm" />}>
          <CatalogFilter
            basePath="/costs"
            entity="treatments"
            resultCount={list.length}
            resultLabel={list.length === 1 ? "pathway" : "pathways"}
          />
        </Suspense>
      </PageIntro>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8 md:py-12">
        {list.length === 0 ? (
          <p className="text-muted-foreground">No treatment costs match these filters.</p>
        ) : (
          <div className="space-y-14">
            {groups.map((group) => (
              <div key={group.slug}>
                <p className="text-xs tracking-[0.18em] uppercase text-gold">Specialty</p>
                <h2 className="mt-2 font-heading text-4xl">{group.name}</h2>
                <div className="mt-6 hidden overflow-hidden rounded-2xl border border-border md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-secondary/60 text-xs tracking-[0.16em] uppercase text-muted-foreground">
                      <tr>
                        <th className="px-6 py-4 font-medium">Pathway</th>
                        <th className="px-6 py-4 font-medium">Typical US cash</th>
                        <th className="px-6 py-4 font-medium">Partner range</th>
                        <th className="px-6 py-4 font-medium">Stay</th>
                        <th className="px-6 py-4 font-medium" />
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((t) => (
                        <tr key={t.slug} className="border-t border-border bg-card">
                          <td className="px-6 py-5">
                            <p className="font-heading text-xl text-foreground">{t.name}</p>
                            <p className="text-muted-foreground">{t.category}</p>
                          </td>
                          <td className="px-6 py-5">{t.usRange}</td>
                          <td className="px-6 py-5 font-medium">{t.partnerRange}</td>
                          <td className="px-6 py-5 text-muted-foreground">{t.stay}</td>
                          <td className="px-6 py-5 text-right">
                            <Link
                              href={`/costs/${t.slug}`}
                              className="text-sm underline-offset-4 hover:underline"
                            >
                              Detail
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 grid gap-4 md:hidden">
                  {group.items.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/costs/${t.slug}`}
                      className="rounded-2xl border border-border bg-card p-5"
                    >
                      <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                        {t.category}
                      </p>
                      <h3 className="mt-1 font-heading text-2xl">{t.name}</h3>
                      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <dt className="text-muted-foreground">US cash</dt>
                          <dd>{t.usRange}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Partner</dt>
                          <dd>{t.partnerRange}</dd>
                        </div>
                      </dl>
                      <p className="mt-3 text-sm text-muted-foreground">Stay {t.stay}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
          Oncology, ENT and GI pathways are quoted only after records review. Atelier fee (typically 8–12%) is
          included in the written all-in quote if you proceed.
        </p>
        <h2 className="mt-14 font-heading text-3xl">Frequently Asked Questions About Treatment Costs</h2>
        <p className="prose-gaf mt-3">
          Understand how treatment costs are calculated, what may be included, why prices vary, and how to
          get a more personalized estimate.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {COST_FAQS.map((row) => (
            <details key={row.q} className="group rounded-2xl border border-border bg-card px-5 py-4">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <h3 className="font-medium leading-snug">{row.q}</h3>
                <span
                  aria-hidden
                  className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-base leading-none"
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{row.a}</p>
            </details>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

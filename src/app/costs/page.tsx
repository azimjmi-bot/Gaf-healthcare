import Link from "next/link";
import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { CostArticleSection, costArticleFor } from "@/components/cost-article-section";
import { CostStickyCta } from "@/components/cost-article-view";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { filterTreatments, parseCatalogQuery } from "@/lib/catalog";
import { hospitals, treatments } from "@/lib/data";
import { absoluteUrl, catalogMetadata, COST_FAQS, faqJsonLd } from "@/lib/seo";
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

  // A procedure facet duplicates the cost sheet, so point it at the canonical sheet.
  const sheet = query.procedure ? treatments.find((t) => t.name === query.procedure) : undefined;
  if (sheet) {
    return {
      ...base,
      alternates: { canonical: absoluteUrl(`/costs/${sheet.slug}`) },
    };
  }

  // Keep deeper facet combinations crawlable but out of the index.
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
  const heading = query.procedure
    ? `${query.procedure} cost in ${place}`
    : query.specialty
      ? `${query.specialty} cost in ${place}`
      : "Oncology, ENT and GI treatment cost in India";

  // Filtering down to one procedure is a cost-sheet request, so serve the full
  // article here rather than a one-row table. Canonical still points at /costs/[slug].
  const sheet = query.procedure ? treatments.find((t) => t.name === query.procedure) : undefined;
  const sheetArticle = sheet ? costArticleFor(sheet) : undefined;
  if (sheet && sheetArticle) {
    return (
      <>
        <JsonLd data={faqJsonLd(sheetArticle.faqs)} />
        <PageIntro eyebrow={`India planning ranges · ${sheet.category}`} title={heading} lede={sheet.summary}>
          <Suspense fallback={<div className="h-24 rounded-2xl bg-white shadow-sm" />}>
            <CatalogFilter
              basePath="/costs"
              entity="treatments"
              resultCount={list.length}
              resultLabel={list.length === 1 ? "pathway" : "pathways"}
            />
          </Suspense>
        </PageIntro>
        <CostArticleSection treatment={sheet} />
        <CtaBand />
        <div className="h-16 md:hidden" />
        <CostStickyCta
          href={`/consult?treatment=${sheet.slug}`}
          label="Get a personalised cost estimate"
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
        lede="US cash-pay beside partner ranges for Radiation Oncology, Surgical Oncology, Medical Oncology, Hematology, Pediatric Hematology, Cardiac Surgery, Pediatric Cardiac Surgery, Cardiology, Bariatric Surgery, Cosmetic Surgery, ENT, Gastroenterology, Surgical Gastroenterology, Urology, Spine Surgery, Pulmonology, Pediatric Orthopaedic, Orthopedics, Ophthalmology, Gynecology, Neurosurgery, Neurology and Nephrology in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. Filter by destination, city, specialty or procedure — the same keys a later landing page will use. Figures are planning ranges, not quotations."
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
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
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
        <h2 className="mt-14 font-heading text-3xl">Cost questions</h2>
        <dl className="mt-6 grid gap-8 md:grid-cols-2">
          {COST_FAQS.map((row) => (
            <div key={row.q}>
              <dt className="font-medium">{row.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{row.a}</dd>
            </div>
          ))}
        </dl>
      </section>
      <CtaBand />
    </>
  );
}

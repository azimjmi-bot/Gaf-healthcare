import { LocaleLink as Link } from "@/components/locale-link";
import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { SpecialtyPager } from "@/components/specialty-pager";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { cityResultCounts, listCostSpecialtyGroups, type CatalogQuery } from "@/lib/catalog";
import { hospitals, treatments } from "@/lib/data";
import { faqJsonLd } from "@/lib/seo";
import { catalogPageMetadata } from "@/lib/i18n/page-meta";
import { localizeFaqs, localizeMessages } from "@/lib/i18n/localize";
import { directoryEmpty, directoryIntro, resultLabel } from "@/lib/i18n/directory-copy";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { getRequestLocale } from "@/lib/i18n/request";
import type { Metadata } from "next";

export async function costsDirectoryMetadata(query: CatalogQuery): Promise<Metadata> {
  if (query.procedure) {
    const { costsProcedureMetadata } = await import("./costs-procedure-view");
    const meta = await costsProcedureMetadata(query);
    const wrapped = await catalogPageMetadata("treatments", query);
    return { ...meta, alternates: wrapped.alternates, openGraph: { ...meta.openGraph, ...wrapped.openGraph } };
  }
  const wrapped = await catalogPageMetadata("treatments", query);
  const facets = [query.city, query.specialty].filter(Boolean).length;
  if (facets > 1) {
    return { ...wrapped, robots: { index: false, follow: true } };
  }
  return wrapped;
}

export async function CostsDirectory({ query }: { query: CatalogQuery }) {
  if (query.procedure) {
    const { CostsProcedureView } = await import("./costs-procedure-view");
    return <CostsProcedureView query={query} />;
  }

  const locale = await getRequestLocale();
  const messages = await localizeMessages(locale);
  const faqs = await localizeFaqs("costs", locale);
  const specialtyPages = listCostSpecialtyGroups(query, treatments, hospitals);
  const selectedIndex = query.specialty
    ? specialtyPages.findIndex((group) => group.name === query.specialty)
    : 0;
  const currentIndex = selectedIndex >= 0 ? selectedIndex : 0;
  const group = specialtyPages[currentIndex];
  const visibleItems = query.specialty && selectedIndex < 0 ? [] : (group?.items ?? []);
  const copy = directoryIntro("costs", query, locale);
  const chipStats =
    query.destination === "India" ? cityResultCounts("treatments", { ...query, procedure: undefined }) : null;

  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageIntro
        eyebrow={copy.eyebrow}
        title={copy.heading}
        lede={copy.lede}
      >
        <Suspense fallback={<div className="h-24 rounded-2xl bg-white shadow-sm" />}>
          <CatalogFilter
            basePath="/costs"
            entity="treatments"
            query={query}
            chipStats={chipStats}
            resultCount={visibleItems.length}
            resultLabel={resultLabel("costs", visibleItems.length, locale)}
          />
        </Suspense>
      </PageIntro>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8 md:py-12">
        {specialtyPages.length === 0 ? (
          <p className="text-muted-foreground">{directoryEmpty("costs", query, locale)}</p>
        ) : (
          <div>
            {group ? (
              <div>
                <p className="text-xs tracking-[0.18em] uppercase text-gold">{messages["dir.costs.specialtyLabel"]}</p>
                <h2 className="mt-2 font-heading text-4xl">{taxonomyLabel(group.name, locale)}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {messages["dir.costs.specialtyOf"]
                    .replace("{current}", String(currentIndex + 1))
                    .replace("{total}", String(specialtyPages.length))}
                </p>
                <SpecialtyPager query={query} specialties={specialtyPages} currentIndex={currentIndex} />
                {visibleItems.length === 0 ? (
                  <p className="mt-6 text-muted-foreground">{directoryEmpty("costs", query, locale)}</p>
                ) : (
                  <>
                    <div className="mt-6 hidden overflow-hidden rounded-2xl border border-border md:block">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-secondary/60 text-xs tracking-[0.16em] uppercase text-muted-foreground">
                          <tr>
                            <th className="px-6 py-4 font-medium">{messages["dir.costs.pathway"]}</th>
                            <th className="px-6 py-4 font-medium">{messages["dir.costs.usCash"]}</th>
                            <th className="px-6 py-4 font-medium">{messages["dir.costs.partnerRange"]}</th>
                            <th className="px-6 py-4 font-medium">{messages["dir.costs.stay"]}</th>
                            <th className="px-6 py-4 font-medium" />
                          </tr>
                        </thead>
                        <tbody>
                          {visibleItems.map((t) => (
                            <tr key={t.slug} className="border-t border-border bg-card">
                              <td className="px-6 py-5">
                                <p className="font-heading text-xl text-foreground">{taxonomyLabel(t.name, locale)}</p>
                                <p className="text-muted-foreground">{taxonomyLabel(t.category, locale)}</p>
                              </td>
                              <td className="px-6 py-5">{t.usRange}</td>
                              <td className="px-6 py-5 font-medium">{t.partnerRange}</td>
                              <td className="px-6 py-5 text-muted-foreground">{t.stay}</td>
                              <td className="px-6 py-5 text-right">
                                <Link
                                  href={`/costs/${t.slug}`}
                                  className="text-sm underline-offset-4 hover:underline"
                                >
                                  {messages["dir.costs.detail"]}
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 grid gap-4 md:hidden">
                      {visibleItems.map((t) => (
                        <Link
                          key={t.slug}
                          href={`/costs/${t.slug}`}
                          className="rounded-2xl border border-border bg-card p-5"
                        >
                          <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                            {taxonomyLabel(t.category, locale)}
                          </p>
                          <h3 className="mt-1 font-heading text-2xl">{taxonomyLabel(t.name, locale)}</h3>
                          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <dt className="text-muted-foreground">{messages["dir.costs.usCashShort"]}</dt>
                              <dd>{t.usRange}</dd>
                            </div>
                            <div>
                              <dt className="text-muted-foreground">{messages["dir.costs.partner"]}</dt>
                              <dd>{t.partnerRange}</dd>
                            </div>
                          </dl>
                          <p className="mt-3 text-sm text-muted-foreground">
                            {messages["dir.costs.stayValue"].replace("{stay}", t.stay)}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
                <SpecialtyPager query={query} specialties={specialtyPages} currentIndex={currentIndex} />
              </div>
            ) : (
              <p className="text-muted-foreground">{directoryEmpty("costs", query, locale)}</p>
            )}
          </div>
        )}

        <p className="mt-8 max-w-2xl text-sm text-muted-foreground">{messages["dir.costs.note"]}</p>
        <h2 className="mt-14 font-heading text-3xl">{messages["dir.costs.faqTitle"]}</h2>
        <p className="prose-gaf mt-3">{messages["dir.costs.faqLede"]}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map((row) => (
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

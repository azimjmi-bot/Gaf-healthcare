import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { CatalogPager } from "@/components/catalog-pager";
import { DoctorCard } from "@/components/doctor-card";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { cityResultCounts, filterDoctors, type CatalogQuery } from "@/lib/catalog";
import { paginateDoctors } from "@/lib/doctors";
import { doctors } from "@/lib/data";
import { faqJsonLd } from "@/lib/seo";
import { catalogPageMetadata } from "@/lib/i18n/page-meta";
import { localizeFaqs, localizeMessages } from "@/lib/i18n/localize";
import { directoryEmpty, directoryIntro, resultLabel } from "@/lib/i18n/directory-copy";
import { getRequestLocale } from "@/lib/i18n/request";
import type { Metadata } from "next";

export async function doctorsDirectoryMetadata(query: CatalogQuery): Promise<Metadata> {
  return catalogPageMetadata("doctors", query);
}

export async function DoctorsDirectory({
  query,
  page = 1,
}: {
  query: CatalogQuery;
  page?: number;
}) {
  const locale = await getRequestLocale();
  const messages = await localizeMessages(locale);
  const faqs = await localizeFaqs("doctors", locale);
  const list = filterDoctors(query, doctors);
  const paging = paginateDoctors(list, page);
  const chipStats = query.destination === "India" ? cityResultCounts("doctors", query) : null;
  const copy = directoryIntro("doctors", query, locale);

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
            basePath="/doctors"
            entity="doctors"
            query={query}
            chipStats={chipStats}
            resultCount={paging.total}
            resultLabel={resultLabel("doctors", paging.total, locale)}
          />
        </Suspense>
      </PageIntro>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8 md:py-12">
        {paging.total === 0 ? (
          <p className="text-muted-foreground">{directoryEmpty("doctors", query, locale)}</p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              {messages["dir.showing"]
                .replace("{from}", String(paging.from))
                .replace("{to}", String(paging.to))
                .replace("{total}", String(paging.total))}
            </p>
            <ul className="hosp-list mt-6">
              {paging.items.map((d) => (
                <li key={d.slug}>
                  <DoctorCard doctor={d} />
                </li>
              ))}
            </ul>
            <CatalogPager
              page={paging.page}
              totalPages={paging.totalPages}
              query={query}
              basePath="/doctors"
              label={messages["dir.doctors.pagerLabel"]}
            />
          </>
        )}
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <h2 className="font-heading text-3xl">{messages["dir.doctors.faqTitle"]}</h2>
        <p className="prose-gaf mt-3">{messages["dir.doctors.faqLede"]}</p>
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

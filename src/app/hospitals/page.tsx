import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { HospitalCard } from "@/components/hospital-card";
import { CatalogPager } from "@/components/catalog-pager";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { filterHospitals, parseCatalogQuery } from "@/lib/catalog";
import { paginateHospitals } from "@/lib/hospitals";
import { hospitals } from "@/lib/data";
import { catalogMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const raw = await searchParams;
  return catalogMetadata("hospitals", parseCatalogQuery(raw));
}

function readPage(raw: Record<string, string | string[] | undefined>) {
  const value = Array.isArray(raw.page) ? raw.page[0] : raw.page;
  const n = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export default async function HospitalsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const query = parseCatalogQuery(raw);
  const list = filterHospitals(query, hospitals);
  const paging = paginateHospitals(list, readPage(raw));
  const place = query.city ? `${query.city}, India` : "India";
  const heading = query.procedure
    ? `Hospitals for ${query.procedure} in ${place}`
    : query.specialty
      ? `${query.specialty} hospitals in ${place}`
      : "Hospitals in India";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: heading,
          description:
            "Partner campuses in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. One card per house, with specialties on the campus.",
        }}
      />
      <PageIntro
        eyebrow="India campuses"
        title={heading}
        lede="JCI and NABH campuses in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. Each house appears once. Ten campuses per page — specialties sit on the card."
      >
        <Suspense fallback={<div className="h-24 rounded-2xl bg-white shadow-sm" />}>
          <CatalogFilter
            basePath="/hospitals"
            entity="hospitals"
            resultCount={paging.total}
            resultLabel={paging.total === 1 ? "hospital" : "hospitals"}
          />
        </Suspense>
      </PageIntro>
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        {paging.total === 0 ? (
          <p className="text-muted-foreground">No hospitals match these filters.</p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Showing {paging.from}–{paging.to} of {paging.total}
            </p>
            <ul className="hosp-list mt-6">
              {paging.items.map((h) => (
                <li key={h.slug}>
                  <HospitalCard hospital={h} />
                </li>
              ))}
            </ul>
            <CatalogPager
              page={paging.page}
              totalPages={paging.totalPages}
              searchParams={raw}
              basePath="/hospitals"
              label="Hospital list pages"
            />
          </>
        )}
      </section>
      <CtaBand />
    </>
  );
}

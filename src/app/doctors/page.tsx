import Link from "next/link";
import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { DoctorCard } from "@/components/doctor-card";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { filterDoctors, parseCatalogQuery } from "@/lib/catalog";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Doctors" };

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseCatalogQuery(await searchParams);
  const list = filterDoctors(query);
  const featuredFirst = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <>
      <PageIntro
        eyebrow="Expert specialists"
        title="Top radiation oncologists in India"
        lede="The same directory shape you would scan on a destination page: portrait, qualifications, designation, hospital, years, and a professional summary — then the full profile."
      >
        <Suspense fallback={<div className="h-24 rounded-2xl bg-white shadow-sm" />}>
          <CatalogFilter
            basePath="/doctors"
            entity="doctors"
            resultCount={list.length}
            resultLabel={list.length === 1 ? "specialist" : "specialists"}
          />
        </Suspense>
      </PageIntro>
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        {list.length === 0 ? (
          <p className="text-muted-foreground">
            No doctors match these filters. Clear a field or request a dossier and we will advise.
          </p>
        ) : (
          <div className="doc-grid">
            {featuredFirst.map((d) => (
              <DoctorCard key={d.slug} doctor={d} />
            ))}
          </div>
        )}
      </section>
      <CtaBand />
    </>
  );
}

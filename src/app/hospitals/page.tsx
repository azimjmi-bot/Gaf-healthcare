import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { filterHospitals, parseCatalogQuery } from "@/lib/catalog";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Hospitals" };

export default async function HospitalsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseCatalogQuery(await searchParams);
  const list = filterHospitals(query);

  return (
    <>
      <PageIntro
        eyebrow="Campus"
        title="A short list, inspected."
        lede="Filter by destination, city, specialty, condition, or procedure. Every campus here holds current JCI or equivalent accreditation and an international desk that answers."
      >
        <Suspense fallback={<div className="h-24 rounded-2xl bg-white shadow-sm" />}>
          <CatalogFilter
            basePath="/hospitals"
            resultCount={list.length}
            resultLabel={list.length === 1 ? "hospital" : "hospitals"}
          />
        </Suspense>
      </PageIntro>
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        {list.length === 0 ? (
          <p className="text-muted-foreground">No hospitals match these filters.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((h) => (
              <Link
                key={h.slug}
                href={`/hospitals/${h.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative h-48">
                  <Image
                    src={h.image}
                    alt={h.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs tracking-[0.18em] uppercase text-gold">{h.accreditation}</p>
                  <h2 className="mt-2 font-heading text-2xl">{h.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {h.city}, {h.country}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{h.focus}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <CtaBand />
    </>
  );
}

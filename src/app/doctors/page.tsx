import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { filterDoctors, parseCatalogQuery } from "@/lib/catalog";
import { getHospital } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Doctors" };

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const query = parseCatalogQuery(raw);
  const list = filterDoctors(query);

  return (
    <>
      <PageIntro
        eyebrow="Find a specialist"
        title="Named surgeons. Video first. Never a mill."
        lede="Consult with internationally trained specialists across plastic surgery, cardiology, oncology, orthopaedics, and more — verified profiles, then a camera meeting before any deposit."
      >
        <Suspense fallback={<FilterSkeleton />}>
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((d) => {
              const hospital = getHospital(d.hospitalSlug);
              return (
                <Link
                  key={d.slug}
                  href={`/doctors/${d.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="relative h-72">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      className="object-cover object-top transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs tracking-[0.18em] uppercase text-gold">{d.specialty}</p>
                    <h2 className="mt-2 font-heading text-2xl">{d.name}</h2>
                    <p className="text-sm text-muted-foreground">{d.title}</p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {hospital?.name} · {hospital?.city}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
      <CtaBand />
    </>
  );
}

function FilterSkeleton() {
  return <div className="h-24 rounded-2xl bg-white shadow-sm" />;
}

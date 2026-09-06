import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { filterDoctors, parseCatalogQuery } from "@/lib/catalog";
import { groupDoctorsForDirectory } from "@/lib/doctors";
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
  const directory = groupDoctorsForDirectory(list);

  return (
    <>
      <PageIntro
        eyebrow="Find a specialist"
        title="Named radiation oncologists, indexed for the city you can actually fly to."
        lede="Every consultant is filed under specialty, procedure, city, and country — the same keys a later landing page will use. Filter here; the URL facets stay stable."
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
          <div className="space-y-16">
            {directory.map((specialty) => (
              <div key={specialty.specialtySlug}>
                <p className="text-xs tracking-[0.18em] uppercase text-gold">Specialty</p>
                <h2 className="mt-2 font-heading text-4xl">{specialty.specialty}</h2>
                <div className="mt-10 space-y-12">
                  {specialty.countries.map((country) => (
                    <div key={country.countrySlug}>
                      <h3 className="font-heading text-2xl">{country.country}</h3>
                      <div className="mt-6 space-y-10">
                        {country.cities.map((city) => (
                          <div key={city.citySlug}>
                            <p className="text-sm font-medium text-foreground">{city.city}</p>
                            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                              {city.doctors.map((d) => (
                                <Link
                                  key={d.slug}
                                  href={`/doctors/${d.slug}`}
                                  className="group overflow-hidden rounded-2xl border border-border bg-card"
                                >
                                  <div className="relative h-64">
                                    <Image
                                      src={d.image}
                                      alt={d.name}
                                      fill
                                      className="object-cover object-top transition duration-700 group-hover:scale-105"
                                    />
                                  </div>
                                  <div className="p-6">
                                    <p className="text-xs tracking-[0.18em] uppercase text-gold">
                                      {d.specialty}
                                    </p>
                                    <h4 className="mt-2 font-heading text-2xl">{d.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {d.city}, {d.country}
                                    </p>
                                    <p className="mt-3 text-sm text-muted-foreground">
                                      {d.procedures.slice(0, 2).join(" · ")}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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

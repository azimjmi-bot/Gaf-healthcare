import Link from "next/link";
import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { HospitalCard } from "@/components/hospital-card";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { filterHospitals, parseCatalogQuery } from "@/lib/catalog";
import { groupHospitalsForDirectory } from "@/lib/hospitals";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Hospitals" };

export default async function HospitalsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseCatalogQuery(await searchParams);
  const list = filterHospitals(query);
  const directory = groupHospitalsForDirectory(list, query.specialty);

  return (
    <>
      <PageIntro
        eyebrow="Top hospitals"
        title="Oncology campuses in India"
        lede="Each house is filed under specialty, procedure, city, and country — Radiation Oncology and Surgical Oncology, with named consultants from both lists."
      >
        <Suspense fallback={<div className="h-24 rounded-2xl bg-white shadow-sm" />}>
          <CatalogFilter
            basePath="/hospitals"
            entity="hospitals"
            resultCount={list.length}
            resultLabel={list.length === 1 ? "hospital" : "hospitals"}
          />
        </Suspense>
      </PageIntro>
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        {list.length === 0 ? (
          <p className="text-muted-foreground">No hospitals match these filters.</p>
        ) : (
          <div className="space-y-16">
            {directory.map((specialty) => (
              <div key={specialty.specialtySlug}>
                <p className="text-xs tracking-[0.18em] uppercase text-gold">Specialty</p>
                <h2 className="mt-2 font-heading text-4xl">{specialty.specialty}</h2>
                {specialty.countries.map((country) => (
                  <div key={country.countrySlug} className="mt-10">
                    <h3 className="font-heading text-2xl">{country.country}</h3>
                    <div className="mt-8 space-y-12">
                      {country.cities.map((city) => (
                        <div key={city.citySlug}>
                          <p className="text-sm font-medium">{city.city}</p>
                          <div className="mt-4 grid gap-6 md:grid-cols-2">
                            {city.hospitals.map((h) => (
                              <HospitalCard key={h.slug} hospital={h} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </section>
      <CtaBand />
    </>
  );
}

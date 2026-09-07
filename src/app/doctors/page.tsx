import Link from "next/link";
import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { DoctorCard } from "@/components/doctor-card";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { filterDoctors, parseCatalogQuery } from "@/lib/catalog";
import { groupDoctorsUnderHospitals } from "@/lib/doctors";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Doctors" };

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseCatalogQuery(await searchParams);
  const list = filterDoctors(query);
  const directory = groupDoctorsUnderHospitals(list);

  return (
    <>
      <PageIntro
        eyebrow="Expert specialists"
        title="Oncology consultants in India"
        lede="Radiation and surgical oncologists sit under the hospital they practise at, then city, country, specialty, and procedure — the same keys later pSEO pages will use. Bios are original Velora copy."
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
          <div className="space-y-16">
            {directory.map((specialty) => (
              <div key={specialty.specialtySlug}>
                <p className="text-xs tracking-[0.18em] uppercase text-gold">Specialty</p>
                <h2 className="mt-2 font-heading text-4xl">{specialty.specialty}</h2>
                {specialty.countries.map((country) => (
                  <div key={country.countrySlug} className="mt-10">
                    <h3 className="font-heading text-2xl">{country.country}</h3>
                    {country.cities.map((city) => (
                      <div key={city.citySlug} className="mt-8 space-y-10">
                        <p className="text-sm font-medium">{city.city}</p>
                        {city.campuses.map((campus) => (
                          <div key={campus.hospitalSlug}>
                            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                              <Link
                                href={`/hospitals/${campus.hospitalSlug}`}
                                className="font-heading text-2xl hover:text-gold"
                              >
                                {campus.hospitalName}
                              </Link>
                              <Link
                                href={`/hospitals/${campus.hospitalSlug}`}
                                className="text-sm underline-offset-4 hover:underline"
                              >
                                Hospital profile
                              </Link>
                            </div>
                            <div className="doc-grid">
                              {campus.doctors.map((d) => (
                                <DoctorCard key={d.slug} doctor={d} />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
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

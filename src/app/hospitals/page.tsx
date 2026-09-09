import Link from "next/link";
import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { HospitalCard } from "@/components/hospital-card";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { filterHospitals, parseCatalogQuery } from "@/lib/catalog";
import { groupHospitalsByCity } from "@/lib/hospitals";
import { catalogMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  return catalogMetadata("hospitals", parseCatalogQuery(await searchParams));
}

export default async function HospitalsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseCatalogQuery(await searchParams);
  const list = filterHospitals(query);
  const directory = groupHospitalsByCity(list);
  const uniqueCount = new Set(list.map((h) => h.slug)).size;
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
        lede="JCI and NABH campuses in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. Each house appears once. Specialties sit on the card — filter by city, specialty or procedure when you already know the list you need."
      >
        <Suspense fallback={<div className="h-24 rounded-2xl bg-white shadow-sm" />}>
          <CatalogFilter
            basePath="/hospitals"
            entity="hospitals"
            resultCount={uniqueCount}
            resultLabel={uniqueCount === 1 ? "hospital" : "hospitals"}
          />
        </Suspense>
      </PageIntro>
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        {list.length === 0 ? (
          <p className="text-muted-foreground">No hospitals match these filters.</p>
        ) : (
          <div className="space-y-16">
            {directory.map((country) => (
              <div key={country.countrySlug}>
                <h2 className="font-heading text-4xl">{country.country}</h2>
                <div className="mt-10 space-y-12">
                  {country.cities.map((city) => (
                    <div key={city.citySlug} id={city.citySlug} className="scroll-mt-24">
                      <p className="text-sm font-medium">
                        {city.city}{" "}
                        <span className="text-muted-foreground">
                          ({city.hospitals.length} {city.hospitals.length === 1 ? "campus" : "campuses"})
                        </span>
                      </p>
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
        )}
      </section>
      <CtaBand />
    </>
  );
}

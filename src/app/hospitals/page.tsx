import Link from "next/link";
import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { HospitalCard } from "@/components/hospital-card";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { filterHospitals, parseCatalogQuery } from "@/lib/catalog";
import { groupHospitalsForDirectory } from "@/lib/hospitals";
import { catalogMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  return catalogMetadata("hospitals", parseCatalogQuery(await searchParams));
}

function countHospitals(specialty: ReturnType<typeof groupHospitalsForDirectory>[number]) {
  return specialty.countries.reduce(
    (n, country) => n + country.cities.reduce((m, city) => m + city.hospitals.length, 0),
    0,
  );
}

export default async function HospitalsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseCatalogQuery(await searchParams);
  const list = filterHospitals(query);
  const directory = groupHospitalsForDirectory(list, query.specialty);
  const place = query.city ? `${query.city}, India` : "India";
  const heading = query.procedure
    ? `Hospitals for ${query.procedure} in ${place}`
    : query.specialty
      ? `${query.specialty} hospitals in ${place}`
      : "Oncology, ENT and GI hospitals in India";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Oncology, ENT and GI hospitals in India",
          description:
            "Partner campuses in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad for oncology, ENT, gastroenterology and surgical gastroenterology.",
        }}
      />
      <PageIntro
        eyebrow="India campuses"
        title={heading}
        lede="JCI and NABH campuses in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. Each house is filed under country, city, specialty and procedure — Radiation, Surgical and Medical Oncology, Hematology, Pediatric Hematology, Cardiac Surgery, Pediatric Cardiac Surgery, Cardiology, Bariatric Surgery, Cosmetic Surgery, ENT, Gastroenterology, Surgical Gastroenterology, Urology, Spine Surgery, Pulmonology, Pediatric Orthopaedic and Orthopedics — with named consultants where Velora has matched them."
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
            {directory.length > 1 ? (
              <nav aria-label="Specialties" className="flex flex-wrap gap-2">
                {directory.map((specialty) => (
                  <a
                    key={specialty.specialtySlug}
                    href={`#${specialty.specialtySlug}`}
                    className="rounded-full border border-border px-3 py-1.5 text-sm hover:border-primary/40"
                  >
                    {specialty.specialty} ({countHospitals(specialty)})
                  </a>
                ))}
              </nav>
            ) : null}
            {directory.map((specialty) => (
              <div key={specialty.specialtySlug} id={specialty.specialtySlug} className="scroll-mt-24">
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

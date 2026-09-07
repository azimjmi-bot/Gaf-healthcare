import Link from "next/link";
import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { DoctorCard } from "@/components/doctor-card";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { filterDoctors, parseCatalogQuery } from "@/lib/catalog";
import { groupDoctorsUnderHospitals } from "@/lib/doctors";
import { catalogMetadata, DOCTOR_FAQS, faqJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  return catalogMetadata("doctors", parseCatalogQuery(await searchParams));
}

function countDoctors(specialty: ReturnType<typeof groupDoctorsUnderHospitals>[number]) {
  return specialty.countries.reduce(
    (n, country) =>
      n +
      country.cities.reduce(
        (m, city) => m + city.campuses.reduce((k, campus) => k + campus.doctors.length, 0),
        0,
      ),
    0,
  );
}

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseCatalogQuery(await searchParams);
  const list = filterDoctors(query);
  const directory = groupDoctorsUnderHospitals(list);
  const place = query.city ? `${query.city}, India` : "India";
  const heading = query.procedure
    ? `${query.procedure} specialists in ${place}`
    : query.specialty === "Pediatric Hematology"
      ? `Pediatric hematologists in ${place}`
    : query.specialty === "Hematology"
      ? `Hematologists in ${place}`
      : query.specialty === "Cardiac Surgery"
        ? `Cardiac surgeons in ${place}`
      : query.specialty === "Pediatric Cardiac Surgery"
        ? `Pediatric cardiac surgeons in ${place}`
      : query.specialty
        ? `${query.specialty} doctors in ${place}`
        : "Oncologists, hematologists and cardiac surgeons in India";

  return (
    <>
      <JsonLd data={faqJsonLd(DOCTOR_FAQS)} />
      <PageIntro
        eyebrow="India · five cities · seven specialties"
        title={heading}
        lede="Named radiation, surgical and medical oncologists, haematologists, paediatric haematologists, cardiac surgeons and paediatric cardiac surgeons in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. Each profile is filed under country, city, specialty and procedure so later pSEO can mount /doctors/india/{city}/pediatric-cardiac-surgery/{procedure}. Bios are original Velora copy."
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
            {directory.length > 1 ? (
              <nav aria-label="Specialties" className="flex flex-wrap gap-2">
                {directory.map((specialty) => (
                  <a
                    key={specialty.specialtySlug}
                    href={`#${specialty.specialtySlug}`}
                    className="rounded-full border border-border px-3 py-1.5 text-sm hover:border-primary/40"
                  >
                    {specialty.specialty} ({countDoctors(specialty)})
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
      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="font-heading text-3xl">India oncology directory — questions</h2>
        <dl className="mt-8 grid gap-8 md:grid-cols-3">
          {DOCTOR_FAQS.map((row) => (
            <div key={row.q}>
              <dt className="font-medium">{row.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{row.a}</dd>
            </div>
          ))}
        </dl>
      </section>
      <CtaBand />
    </>
  );
}

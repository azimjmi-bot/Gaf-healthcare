import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { CatalogPager } from "@/components/catalog-pager";
import { DoctorCard } from "@/components/doctor-card";
import { JsonLd } from "@/components/json-ld";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { PseoEstimateCtaSection } from "@/components/pseo-estimate-cta";
import { PseoTrust } from "@/components/pseo-trust";
import { QuickAnswer } from "@/components/quick-answer";
import { RadiationHospitalCard } from "@/components/radiation-hospital-card";
import { LocaleLink as Link } from "@/components/locale-link";
import type { CatalogQuery } from "@/lib/catalog";
import { doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import type { RadiationHospitalHubData } from "@/lib/radiation-hospital-page";
import {
  breadcrumbJsonLd,
  doctorItemListJsonLd,
  faqJsonLd,
  hospitalItemListJsonLd,
} from "@/lib/seo";

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="max-w-3xl">
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 font-heading text-3xl md:text-4xl">{title}</h2>
      {intro ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {intro}
        </p>
      ) : null}
    </header>
  );
}

export function RadiationHospitalHub({
  data,
  query,
}: {
  data: RadiationHospitalHubData;
  query: CatalogQuery;
}) {
  const consultHref = `/consult?specialty=radiation-oncology${data.cityName ? `&city=${encodeURIComponent(data.cityName)}` : ""}${data.procedure ? `&treatment=${encodeURIComponent(data.procedure)}` : ""}`;
  const ctaSubject = data.procedure ?? "radiation oncology treatment";
  const visibleHospitals = data.paging.items
    .map((hospital) =>
      data.hospitals.find((row) => row.hospital.slug === hospital.slug),
    )
    .filter((row): row is NonNullable<typeof row> => Boolean(row));
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Hospitals", path: "/hospitals" },
    { name: "India", path: "/hospitals/India" },
    ...(data.cityName
      ? [
          {
            name: data.cityName,
            path: hospitalsPath({ destination: "India", city: data.cityName }),
          },
        ]
      : []),
    {
      name: "Radiation Oncology",
      path: data.cityName
        ? hospitalsPath({
            destination: "India",
            city: data.cityName,
            specialty: "Radiation Oncology",
          })
        : hospitalsPath({ destination: "India", specialty: "Radiation Oncology" }),
    },
    ...(data.procedure ? [{ name: data.procedure, path: data.path }] : []),
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: data.heading,
          description: data.description,
          url: `https://gaf.healthcare${data.path}`,
          about: data.procedure
            ? { "@type": "MedicalProcedure", name: data.procedure }
            : { "@type": "MedicalSpecialty", name: "Radiation Oncology" },
        }}
      />
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <JsonLd data={faqJsonLd(data.faqs)} />
      <JsonLd
        data={hospitalItemListJsonLd(data.paging.items, {
          name: data.heading,
          path: data.path,
          addressCountry: "IN",
        })}
      />
      <JsonLd
        data={doctorItemListJsonLd(data.doctors, {
          name: `Radiation oncologists associated with ${data.procedure ?? "validated hospitals"} in ${data.place}`,
          path: data.path,
          addressCountry: "IN",
        })}
      />

      <PageIntro
        eyebrow="Hospital discovery · Radiation Oncology"
        title={data.heading}
        lede={data.description}
      >
        <Suspense fallback={<div className="h-24 rounded-2xl bg-white shadow-sm" />}>
          <CatalogFilter
            basePath="/hospitals"
            entity="hospitals"
            query={query}
            chipStats={{
              total: data.hospitals.length,
              counts: Object.fromEntries(
                data.cities.map((city) => [city.name, city.count ?? 0]),
              ),
            }}
            resultCount={data.paging.total}
            resultLabel={data.paging.total === 1 ? "hospital" : "hospitals"}
          />
        </Suspense>
      </PageIntro>

      <QuickAnswer
        items={data.quickAnswers}
        layout={!data.cityName && !data.procedure ? "stacked" : "grid"}
      />

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <SectionHeading eyebrow="At a glance" title="Validated catalog relationships" />
        <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-6">
          {data.metrics.map((metric) => (
            <div key={metric.label} className="bg-card p-5">
              <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {metric.label}
              </dt>
              <dd className="mt-2 font-heading text-3xl">{metric.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground">
          Hospital inclusion requires a Radiation Oncology specialty relationship and an
          affiliated radiation oncologist. Procedure pages additionally require matching
          hospital-procedure and doctor-procedure relationships.
        </p>
      </section>

      <PseoEstimateCtaSection
        subject={ctaSubject}
        place={data.place}
        consultHref={consultHref}
        variant="records"
      />

      <section className="border-y border-border bg-secondary/30 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <SectionHeading
            eyebrow="Hospitals"
            title={
              data.procedure
                ? `Hospitals offering ${data.procedure} in ${data.place}`
                : `Radiation Oncology hospitals in ${data.place}`
            }
            intro="Cards use factual campus data and validated relationship counts. Ordering is alphabetical by city and hospital name, not a ranking."
          />
          <p className="mt-5 text-sm text-muted-foreground">
            Showing {data.paging.from}–{data.paging.to} of {data.paging.total}
          </p>
          <div className="mt-6 grid gap-5">
            {visibleHospitals.map((relationship) => (
              <RadiationHospitalCard
                key={relationship.hospital.slug}
                relationship={relationship}
                selectedProcedure={data.procedure}
              />
            ))}
          </div>
          {visibleHospitals.length > 1 ? (
            <div className="mt-12">
              <h3 className="font-heading text-3xl">Compare hospital facts</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                This table compares recorded attributes only. It does not score or rank hospitals.
              </p>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-border bg-card">
                <table className="min-w-[760px] w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="px-4 py-3 font-medium text-muted-foreground">Hospital</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">City</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Accreditation</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Beds</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Established</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Validated procedures</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Listed doctors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleHospitals.slice(0, 6).map((relationship) => (
                      <tr key={relationship.hospital.slug} className="border-t border-border align-top">
                        <th className="px-4 py-3 text-left font-medium">
                          <Link href={`/hospitals/${relationship.hospital.slug}`}>
                            {relationship.hospital.name}
                          </Link>
                        </th>
                        <td className="px-4 py-3 text-muted-foreground">{relationship.hospital.city}</td>
                        <td className="px-4 py-3 text-muted-foreground">{relationship.hospital.accreditation || "Not recorded"}</td>
                        <td className="px-4 py-3 text-muted-foreground">{relationship.hospital.beds || "Not recorded"}</td>
                        <td className="px-4 py-3 text-muted-foreground">{relationship.hospital.established || "Not recorded"}</td>
                        <td className="px-4 py-3 text-muted-foreground">{relationship.procedures.length}</td>
                        <td className="px-4 py-3 text-muted-foreground">{relationship.doctors.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
          <CatalogPager
            page={data.paging.page}
            totalPages={data.paging.totalPages}
            query={query}
            basePath="/hospitals"
            label="Hospital list pages"
          />
        </div>
      </section>

      <PseoEstimateCtaSection
        subject={ctaSubject}
        place={data.place}
        consultHref={consultHref}
        variant="hospital"
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-5 md:px-8 md:py-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Procedures"
            title={
              data.procedure
                ? `Related Radiation Oncology procedures`
                : `Radiation Oncology procedures in ${data.place}`
            }
          />
          <ul className="mt-6 grid gap-3">
            {(data.procedure ? data.relatedProcedures : data.procedures).map((row) => (
              <li key={row.href}>
                <Link
                  href={row.href}
                  className="block rounded-xl border border-border bg-card p-4"
                >
                  <span className="font-heading text-xl">{row.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {row.count} validated hospital{row.count === 1 ? "" : "s"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading
            eyebrow="Cities"
            title={
              data.procedure
                ? `Cities with hospitals offering ${data.procedure}`
                : "Radiation Oncology hospitals by city"
            }
          />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {data.cities.map((city) => (
              <li key={city.href}>
                <Link
                  href={city.href}
                  className="block rounded-xl border border-border bg-card p-4"
                >
                  <span className="font-heading text-xl">{city.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {city.count} validated hospital{city.count === 1 ? "" : "s"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PseoEstimateCtaSection
        subject={ctaSubject}
        place={data.place}
        consultHref={consultHref}
        variant="options"
      />

      {data.doctors.length > 0 ? (
        <section className="border-y border-border bg-secondary/30 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
            <SectionHeading
              eyebrow="Doctors"
              title={
                data.procedure
                  ? `Radiation oncologists associated with ${data.procedure}`
                  : `Radiation oncologists at the listed hospitals`
              }
              intro="Each doctor has a matching hospital and Radiation Oncology relationship. Procedure pages additionally require that exact doctor-procedure mapping."
            />
            <div className="hosp-list mt-6">
              {data.doctors.slice(0, 8).map((doctor) => (
                <DoctorCard key={doctor.slug} doctor={doctor} />
              ))}
            </div>
            <p className="mt-5 text-sm">
              <Link
                href={doctorsPath({
                  destination: "India",
                  city: data.cityName,
                  specialty: "Radiation Oncology",
                  procedure: data.procedure,
                })}
              >
                View all matching radiation oncologists
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      <PseoEstimateCtaSection
        subject={ctaSubject}
        place={data.place}
        consultHref={consultHref}
        variant="travel"
      />

      {data.cityContext ? (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-16">
          <SectionHeading
            eyebrow="City context"
            title={`Why patients consider ${data.cityName} for Radiation Oncology`}
          />
          <div className="mt-6 max-w-4xl space-y-4 text-[1.05rem] leading-relaxed text-muted-foreground">
            {[
              ...data.cityContext.introduction,
              ...data.cityContext.whyCity,
              ...data.cityContext.planning,
              ...data.cityContext.logistics,
            ].map((paragraph) => (
              <p key={paragraph.slice(0, 80)}>{paragraph}</p>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-5 md:px-8 md:py-16 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Treatment guides" title="Canonical GAF treatment content" />
          <ul className="mt-6 space-y-3">
            {data.treatmentGuides.map((guide) => (
              <li key={guide.href} className="rounded-xl border border-border bg-card p-4">
                <Link href={guide.href} className="font-heading text-xl">
                  {guide.name}
                </Link>
                {guide.note ? (
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {guide.note}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading eyebrow="Cost guides" title="Indicative planning ranges" />
          <ul className="mt-6 space-y-3">
            {data.costGuides.map((guide) => (
              <li key={guide.href} className="rounded-xl border border-border bg-card p-4">
                <Link href={guide.href} className="font-heading text-xl">
                  {guide.name}
                </Link>
                <p className="mt-2 text-sm text-muted-foreground">{guide.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            India planning ranges are not city tariffs, hospital quotations or
            patient-specific prices. A named hospital must confirm the written estimate.
          </p>
        </div>
      </section>

      {data.conditions.length > 0 ? (
        <section className="border-y border-border bg-secondary/30 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
            <SectionHeading
              eyebrow="Conditions"
              title="Explicitly related conditions"
              intro="Conditions appear only when the controlled specialty profile or canonical procedure content records the relationship."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.conditions.map((condition) => (
                <li key={condition.name} className="rounded-xl border border-border bg-card p-4">
                  <Link href={condition.href} className="font-heading text-xl">
                    {condition.name}
                  </Link>
                  {condition.note ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {condition.note}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-16">
        <SectionHeading eyebrow="Questions" title={`${data.heading} — frequently asked questions`} />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {data.faqs.map((faq) => (
            <details key={faq.q} className="group rounded-2xl border border-border bg-card px-5 py-4">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <h3 className="font-medium leading-snug">{faq.q}</h3>
                <span aria-hidden className="text-xl">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <PseoEstimateCtaSection
        subject={ctaSubject}
        place={data.place}
        consultHref={consultHref}
        variant="plan"
      />

      <PseoTrust />
      <CtaBand />
    </>
  );
}

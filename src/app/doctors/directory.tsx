import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { CatalogPager } from "@/components/catalog-pager";
import { DoctorCard } from "@/components/doctor-card";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { cityResultCounts, filterDoctors, type CatalogQuery } from "@/lib/catalog";
import { paginateDoctors } from "@/lib/doctors";
import { doctors } from "@/lib/data";
import { catalogMetadata, DOCTOR_FAQS, faqJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export async function doctorsDirectoryMetadata(query: CatalogQuery): Promise<Metadata> {
  return catalogMetadata("doctors", query);
}

export async function DoctorsDirectory({
  query,
  page = 1,
}: {
  query: CatalogQuery;
  page?: number;
}) {
  const list = filterDoctors(query, doctors);
  const paging = paginateDoctors(list, page);
  const chipStats = query.destination === "India" ? cityResultCounts("doctors", query) : null;
  const place = query.city ? `${query.city}, India` : "India";
  const directoryHome = !query.city && !query.specialty && !query.procedure;
  const heading = directoryHome
    ? "Find the Right Doctor for Your Treatment"
    : query.procedure
    ? `${query.procedure} specialists in ${place}`
    : query.specialty === "Pediatric Hematology"
      ? `Pediatric hematologists in ${place}`
    : query.specialty === "Hematology"
      ? `Hematologists in ${place}`
      : query.specialty === "Cardiac Surgery"
        ? `Cardiac surgeons in ${place}`
      : query.specialty === "Pediatric Cardiac Surgery"
        ? `Pediatric cardiac surgeons in ${place}`
      : query.specialty === "Cardiology"
        ? `Cardiologists in ${place}`
      : query.specialty === "Bariatric Surgery"
        ? `Bariatric surgeons in ${place}`
      : query.specialty === "Cosmetic Surgery"
        ? `Cosmetic surgeons in ${place}`
      : query.specialty === "ENT"
        ? `ENT surgeons in ${place}`
      : query.specialty === "Gastroenterology"
        ? `Gastroenterologists in ${place}`
      : query.specialty === "Surgical Gastroenterology"
        ? `Surgical gastroenterologists in ${place}`
      : query.specialty === "Urology"
        ? `Urologists in ${place}`
      : query.specialty === "Spine Surgery"
        ? `Spine surgeons in ${place}`
      : query.specialty === "Pulmonology"
        ? `Pulmonologists in ${place}`
      : query.specialty === "Pediatric Orthopaedic"
        ? `Pediatric orthopaedic surgeons in ${place}`
      : query.specialty === "Orthopedics"
        ? `Orthopaedic surgeons in ${place}`
      : query.specialty === "Ophthalmology"
        ? `Ophthalmologists in ${place}`
      : query.specialty === "Gynecology"
        ? `Gynecologists in ${place}`
      : query.specialty === "Neurosurgery"
        ? `Neurosurgeons in ${place}`
      : query.specialty === "Neurology"
        ? `Neurologists in ${place}`
      : query.specialty === "Nephrology"
        ? `Nephrologists in ${place}`
      : query.specialty
        ? `${query.specialty} doctors in ${place}`
        : "Oncologists, ENT surgeons, gastroenterologists, surgical gastroenterologists, urologists, spine surgeons, pulmonologists, paediatric orthopaedic surgeons, orthopaedic surgeons, ophthalmologists, gynecologists, neurosurgeons, neurologists and nephrologists in India";
  const lede = directoryHome
    ? "Explore specialists by medical specialty, procedure, hospital, and location, and find doctors who match your treatment needs."
    : "Named specialists in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. Each doctor appears once. Ten profiles per page — filter by city, specialty or procedure when you already know the list you need.";

  return (
    <>
      <JsonLd data={faqJsonLd(DOCTOR_FAQS)} />
      <PageIntro
        eyebrow="India · five cities · twenty-three specialties"
        title={heading}
        lede={lede}
      >
        <Suspense fallback={<div className="h-24 rounded-2xl bg-white shadow-sm" />}>
          <CatalogFilter
            basePath="/doctors"
            entity="doctors"
            query={query}
            chipStats={chipStats}
            resultCount={paging.total}
            resultLabel={paging.total === 1 ? "specialist" : "specialists"}
          />
        </Suspense>
      </PageIntro>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8 md:py-12">
        {paging.total === 0 ? (
          <p className="text-muted-foreground">
            {query.specialty === "Neurosurgery"
              ? "Named neurosurgeons are being matched. Brain tumour, aneurysm, DBS, paediatric and radiosurgery cost sheets stay live — request a dossier and we will advise."
              : query.specialty === "Gynecology"
              ? "Named gynecologists are being matched. Laparoscopic, robotic, vaginal and abdominal hysterectomy, myomectomy, endometriosis and pelvic-floor cost sheets stay live — request a dossier and we will advise."
              : "No doctors match these filters. Clear a field or request a dossier and we will advise."}
          </p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Showing {paging.from}–{paging.to} of {paging.total}
            </p>
            <ul className="hosp-list mt-6">
              {paging.items.map((d) => (
                <li key={d.slug}>
                  <DoctorCard doctor={d} />
                </li>
              ))}
            </ul>
            <CatalogPager
              page={paging.page}
              totalPages={paging.totalPages}
              query={query}
              basePath="/doctors"
              label="Doctor list pages"
            />
          </>
        )}
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <h2 className="font-heading text-3xl">Frequently Asked Questions About Finding a Doctor</h2>
        <p className="prose-gaf mt-3">
          Learn how GAF Healthcare helps international patients compare doctors and explore treatment
          options.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {DOCTOR_FAQS.map((row) => (
            <details key={row.q} className="group rounded-2xl border border-border bg-card px-5 py-4">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <h3 className="font-medium leading-snug">{row.q}</h3>
                <span
                  aria-hidden
                  className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-base leading-none"
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{row.a}</p>
            </details>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

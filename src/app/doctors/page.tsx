import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { CatalogPager } from "@/components/catalog-pager";
import { DoctorCard } from "@/components/doctor-card";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { filterDoctors, parseCatalogQuery } from "@/lib/catalog";
import { paginateDoctors } from "@/lib/doctors";
import { doctors } from "@/lib/data";
import { catalogMetadata, DOCTOR_FAQS, faqJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  return catalogMetadata("doctors", parseCatalogQuery(await searchParams));
}

function readPage(raw: Record<string, string | string[] | undefined>) {
  const value = Array.isArray(raw.page) ? raw.page[0] : raw.page;
  const n = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const query = parseCatalogQuery(raw);
  const list = filterDoctors(query, doctors);
  const paging = paginateDoctors(list, readPage(raw));
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

  return (
    <>
      <JsonLd data={faqJsonLd(DOCTOR_FAQS)} />
      <PageIntro
        eyebrow="India · five cities · twenty-three specialties"
        title={heading}
        lede="Named specialists in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. Each doctor appears once. Ten profiles per page — filter by city, specialty or procedure when you already know the list you need."
      >
        <Suspense fallback={<div className="h-24 rounded-2xl bg-white shadow-sm" />}>
          <CatalogFilter
            basePath="/doctors"
            entity="doctors"
            resultCount={paging.total}
            resultLabel={paging.total === 1 ? "specialist" : "specialists"}
          />
        </Suspense>
      </PageIntro>
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
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
              searchParams={raw}
              basePath="/doctors"
              label="Doctor list pages"
            />
          </>
        )}
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="font-heading text-3xl">India specialists directory — questions</h2>
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

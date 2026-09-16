import { Suspense } from "react";
import { LocaleLink as Link } from "@/components/locale-link";
import { CatalogFilter } from "@/components/catalog-filter";
import { CatalogPager } from "@/components/catalog-pager";
import { DoctorCard } from "@/components/doctor-card";
import {
  DoctorCompareProvider,
  DoctorCompareToggle,
  DoctorCompareTray,
  DoctorHubExtraFilters,
} from "@/components/doctor-compare";
import { JsonLd } from "@/components/json-ld";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { PseoEstimateCtaSection } from "@/components/pseo-estimate-cta";
import { PseoTrust } from "@/components/pseo-trust";
import { QuickAnswer } from "@/components/quick-answer";
import type { CatalogQuery } from "@/lib/catalog";
import { costsFilterPath, doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import type { DoctorSpecialtyHubData } from "@/lib/doctor-specialty-page";
import { breadcrumbJsonLd, doctorItemListJsonLd, faqJsonLd } from "@/lib/seo";

function HubHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">{eyebrow}</p>
      <h2 className="mt-2 font-heading text-3xl md:text-4xl">{title}</h2>
      {intro ? <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{intro}</p> : null}
    </header>
  );
}

export function DoctorSpecialtyHub({
  data,
  query,
}: {
  data: DoctorSpecialtyHubData;
  query: CatalogQuery;
}) {
  const ctaSubject = data.procedure ?? "radiation oncology treatment";
  const consultParams = new URLSearchParams({ specialty: "radiation-oncology" });
  if (data.procedure) consultParams.set("treatment", data.procedure);
  if (data.cityName) consultParams.set("city", data.cityName);
  const consultHref = `/consult?${consultParams.toString()}`;
  const crumbs = [
    { name: "Doctors", path: "/doctors" },
    { name: "India", path: "/doctors/India" },
    { name: "Radiation Oncology", path: "/doctors/India/Radiation-Oncology" },
  ];
  if (data.cityName) {
    crumbs.push({
      name: data.cityName,
      path: doctorsPath({
        destination: "India",
        city: data.cityName,
        specialty: "Radiation Oncology",
      }),
    });
  }
  if (data.procedure) {
    crumbs.push({ name: data.procedure, path: data.path });
  }

  return (
    <DoctorCompareProvider>
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
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={doctorItemListJsonLd(data.paging.items, {
          name: data.heading,
          path: data.path,
        })}
      />
      <JsonLd data={faqJsonLd(data.faqs)} />

      <PageIntro eyebrow="Doctor discovery · Radiation Oncology" title={data.heading} lede={data.intro[0]}>
        <Suspense fallback={<div className="h-24 rounded-2xl bg-white shadow-sm" />}>
          <CatalogFilter
            basePath="/doctors"
            entity="doctors"
            query={query}
            chipStats={data.cityChipStats}
            resultCount={data.paging.total}
            resultLabel={data.paging.total === 1 ? "specialist" : "specialists"}
          />
        </Suspense>
        <Suspense fallback={null}>
          <DoctorHubExtraFilters hospitals={data.hospitalFilterOptions} />
        </Suspense>
      </PageIntro>

      <QuickAnswer
        items={data.quickAnswers}
        layout={!data.cityName && !data.procedure ? "stacked" : "grid"}
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h2 className="font-heading text-3xl">{data.methodology.question}</h2>
          <p className="prose-gaf mt-3">{data.methodology.answer}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{data.selectionNote}</p>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Listed specialists", String(data.paging.total)],
            ["Featured profiles", String(data.featuredCount)],
            ["Hospitals represented", String(data.hospitals.length)],
            ["Cities with listings", String(data.cities.length)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-border bg-white p-5">
              <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</dt>
              <dd className="mt-2 font-heading text-3xl">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8">
        {data.intro.slice(1).map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="prose-gaf mt-4 max-w-3xl">
            {paragraph}
          </p>
        ))}
        <p className="mt-4 text-sm">
          <Link href={data.specialtyCostHref} className="underline-offset-4 hover:underline">
            Radiation oncology treatment costs in {data.place}
          </Link>
          {data.cityCostHref ? (
            <>
              {" · "}
              <Link href={data.cityCostHref} className="underline-offset-4 hover:underline">
                {data.cityName} radiation oncology city guide
              </Link>
            </>
          ) : null}
        </p>
      </section>

      {data.mainArticleAnswers.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
          <HubHeading
            eyebrow="Radiation Oncology guide"
            title="Understanding Radiation Oncology"
            intro="Clinical context from GAF Healthcare’s existing Radiation Oncology treatment guide."
          />
          <div className="mt-6 max-w-4xl space-y-8">
            {data.mainArticleAnswers.map((item) => (
              <article key={item.question}>
                <h3 className="font-heading text-2xl">{item.question}</h3>
                <p className="prose-gaf mt-3 max-w-none">{item.answer}</p>
                {item.sourceHref ? (
                  <p className="mt-3 text-sm">
                    <Link href={item.sourceHref} className="underline-offset-4 hover:underline">
                      {item.sourceLabel ?? "Read the full GAF guide"}
                    </Link>
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {data.aboutProcedure?.definition ? (
        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8">
          <HubHeading
            eyebrow="About the procedure"
            title={data.procedure ? `About ${data.procedure}` : "About this procedure"}
            intro="This is a short extract from the existing GAF treatment guide, not a second long-form article."
          />
          <p className="prose-gaf mt-4 max-w-3xl">{data.aboutProcedure.definition}</p>
          {data.aboutProcedure.guideHref ? (
            <p className="mt-4 text-sm">
              <Link href={data.aboutProcedure.guideHref} className="underline-offset-4 hover:underline">
                {data.aboutProcedure.guideLabel}
              </Link>
            </p>
          ) : null}
        </section>
      ) : null}

      <PseoEstimateCtaSection
        subject={ctaSubject}
        place={data.place}
        consultHref={consultHref}
        variant="records"
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-16">
        <HubHeading
          eyebrow="Specialists"
          title={data.featuredCount ? "Featured specialists" : "Listed specialists"}
          intro={`${data.paging.total} catalog records match the current filters. Ordering is alphabetical by city and name, not a ranking.`}
        />
        {data.paging.total === 0 ? (
          <p className="mt-6 text-muted-foreground">No listed radiation oncologists match these filters.</p>
        ) : (
          <>
            <p className="mt-4 text-sm text-muted-foreground">
              Showing {data.paging.from}–{data.paging.to} of {data.paging.total}
            </p>
            <ul className="hosp-list mt-6">
              {data.paging.items.map((doctor) => (
                <li key={doctor.slug}>
                  <DoctorCard
                    doctor={doctor}
                    compareSlot={<DoctorCompareToggle slug={doctor.slug} />}
                  />
                </li>
              ))}
            </ul>
            <CatalogPager
              page={data.paging.page}
              totalPages={data.paging.totalPages}
              query={query}
              extraParams={{
                hospital: data.extras.hospital,
                experience: data.extras.minYears ? String(data.extras.minYears) : undefined,
              }}
              basePath="/doctors"
              label="Doctor list pages"
            />
          </>
        )}
      </section>

      {!data.procedure ? (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
          <HubHeading
            eyebrow="Clinical decisions"
            title={`How to choose a radiation oncologist in ${data.place}`}
            intro="These are planning questions, not a scoring system. Technique, campus and follow-up still have to be confirmed in writing."
          />
          <ol className="mt-6 max-w-3xl list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
            {data.howToChoose.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>
      ) : null}

      <PseoEstimateCtaSection
        subject={ctaSubject}
        place={data.place}
        consultHref={consultHref}
        variant="options"
      />

      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
          <HubHeading
            eyebrow="Treatments"
            title="Find radiation oncologists by treatment"
            intro="Each technique keeps its canonical cost guide. Doctor lists only include exact procedure mappings."
          />
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {data.procedures.map((row) => (
              <li key={row.name} className="rounded-2xl border border-border bg-white p-5">
                <p className="font-heading text-2xl">{row.name}</p>
                {row.note ? <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{row.note}</p> : null}
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  <Link href={row.href} className="underline-offset-4 hover:underline">
                    Radiation oncologists for {row.name}
                  </Link>
                  <Link
                    href={costsFilterPath({ destination: "India", specialty: "Radiation Oncology", procedure: row.name })}
                    className="underline-offset-4 hover:underline"
                  >
                    {row.name} treatment in India
                  </Link>
                </p>
                {row.count != null ? (
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {row.count} mapped specialists
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {data.relatedProcedures.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
          <HubHeading
            eyebrow="Related procedures"
            title="Related Radiation Oncology procedures"
            intro="These links come from the controlled taxonomy and existing treatment guides. Distinct techniques are not merged."
          />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.relatedProcedures.map((row) => (
              <li key={row.name}>
                <Link href={row.href} className="block rounded-2xl border border-border bg-white p-5 hover:border-primary/30">
                  <p className="font-heading text-xl">{row.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {row.count ?? 0} mapped specialist{(row.count ?? 0) === 1 ? "" : "s"}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <PseoEstimateCtaSection
        subject={ctaSubject}
        place={data.place}
        consultHref={consultHref}
        variant="hospital"
      />

      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
          <HubHeading
            eyebrow="Cities"
            title="Radiation oncologists by city"
            intro="City pages use live catalog counts. Empty combinations are omitted rather than published as thin URLs."
          />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {data.cities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={city.href}
                  className="block rounded-2xl border border-border bg-white p-5 hover:border-primary/30"
                >
                  <p className="font-heading text-2xl">{city.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{city.count} listed specialists</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <HubHeading
          eyebrow="Hospitals"
          title="Hospitals with radiation oncology specialists"
          intro="Counts are current doctor relationships at each campus. A hospital profile remains the canonical campus page."
        />
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {data.hospitals.map(({ hospital, count }) => (
            <li key={hospital.slug} className="rounded-2xl border border-border bg-white p-5">
              <Link href={`/hospitals/${hospital.slug}`} className="font-heading text-2xl text-gold underline underline-offset-4">
                {hospital.name}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">
                {hospital.city} · {count} listed radiation oncologist{count === 1 ? "" : "s"}
              </p>
              <Link
                href={hospitalsPath({
                  destination: "India",
                  city: hospital.city,
                  specialty: "Radiation Oncology",
                })}
                className="mt-3 inline-block text-sm underline-offset-4 hover:underline"
              >
                Radiation oncology hospitals in {hospital.city}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <PseoEstimateCtaSection
        subject={ctaSubject}
        place={data.place}
        consultHref={consultHref}
        variant="travel"
      />

      {data.conditions.length > 0 ? (
        <section className="border-y border-border bg-secondary/20">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
            <HubHeading
              eyebrow="Related conditions"
              title="Conditions with an explicit Radiation Oncology relationship"
              intro="These links come from the specialty guide taxonomy. They are not inferred from a doctor’s procedure list and are not a claim of individual doctor expertise."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.conditions.map((row) => (
                <li key={row.name}>
                  <Link href={row.href} className="block rounded-2xl border border-border bg-white p-5 hover:border-primary/30">
                    <p className="font-heading text-2xl">{row.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{row.note}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {data.treatmentGuides.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8">
          <HubHeading
            eyebrow="Treatment guides"
            title="Existing GAF treatment information"
            intro="Canonical long-form articles remain the authoritative resource. This directory does not rewrite them."
          />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {data.treatmentGuides.map((row) => (
              <li key={row.href}>
                <Link href={row.href} className="block rounded-2xl border border-border bg-white p-5 hover:border-primary/30">
                  <p className="font-heading text-xl">{row.name}</p>
                  {row.note ? <p className="mt-2 text-sm text-muted-foreground">{row.note}</p> : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
          <HubHeading
            eyebrow="Costs"
            title={`Radiation Oncology treatment costs in ${data.place}`}
            intro="These are the existing GAF cost guides. They are not doctor-specific prices."
          />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.costs.map((row) => (
              <li key={row.href}>
                <Link href={row.href} className="block rounded-2xl border border-border bg-white p-5 hover:border-primary/30">
                  <p className="font-heading text-xl">{row.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">View cost guide{row.note ? ` · ${row.note}` : ""}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {data.blogs.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8">
          <HubHeading eyebrow="Guides" title="Existing Radiation Oncology reading" />
          <ul className="mt-6 space-y-2 text-sm">
            {data.blogs.map((row) => (
              <li key={row.href}>
                <Link href={row.href} className="underline-offset-4 hover:underline">
                  {row.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-5 md:px-8">
        <h2 className="font-heading text-3xl">Questions this page answers</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {data.faqs.map((row) => (
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

      <PseoEstimateCtaSection
        subject={ctaSubject}
        place={data.place}
        consultHref={consultHref}
        variant="plan"
      />

      <div className="sticky bottom-3 z-30 mx-auto mb-3 flex max-w-7xl justify-end px-4 md:hidden">
        <Link
          href="/consult"
          className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg"
        >
          Request a Consultation
        </Link>
      </div>

      <PseoTrust />
      <DoctorCompareTray />
      <CtaBand />
    </DoctorCompareProvider>
  );
}

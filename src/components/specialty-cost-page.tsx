import { Suspense } from "react";
import { LocaleLink as Link } from "@/components/locale-link";
import { CatalogFilter } from "@/components/catalog-filter";
import {
  CostDoctorCard,
  CostHospitalCard,
} from "@/components/cost-page/cost-care-cards";
import { JsonLd } from "@/components/json-ld";
import {
  CtaBand,
} from "@/components/page-shell";
import { costsFilterPath, doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import type { CatalogQuery } from "@/lib/catalog";
import {
  breadcrumbJsonLd,
  doctorItemListJsonLd,
  faqJsonLd,
  hospitalItemListJsonLd,
} from "@/lib/seo";
import {
  specialtyPageMeetsQualityThreshold,
  specialtyProcedureSummary,
  type SpecialtyPageData,
} from "@/lib/specialty-page";

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
      <h2 className="mt-2 font-heading text-3xl leading-tight md:text-5xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">
          {intro}
        </p>
      ) : null}
    </header>
  );
}

function Paragraphs({ rows }: { rows: string[] }) {
  return (
    <div className="mt-6 max-w-3xl space-y-4 text-[1.05rem] leading-relaxed text-muted-foreground">
      {rows.map((row) => (
        <p key={row.slice(0, 80)}>{row}</p>
      ))}
    </div>
  );
}

function ProcedureLink({
  procedure,
  showCost = false,
}: {
  procedure: SpecialtyPageData["procedures"][number];
  showCost?: boolean;
}) {
  return (
    <Link
      href={`/costs/${procedure.slug}`}
      className="group block rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
    >
      <h3 className="font-heading text-xl leading-snug group-hover:underline">
        {procedure.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {specialtyProcedureSummary(procedure)}
      </p>
      {showCost ? (
        <dl className="mt-3 grid gap-2 border-t border-border pt-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">India planning range</dt>
            <dd className="font-medium">{procedure.partnerRange}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Course or stay</dt>
            <dd>{procedure.stay}</dd>
          </div>
        </dl>
      ) : null}
    </Link>
  );
}

function TreatmentDirectory({ data }: { data: SpecialtyPageData }) {
  return (
    <section id="treatments" className="scroll-mt-28 bg-secondary/35 py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          eyebrow="Treatments"
          title={`${data.specialty.name} treatments available in ${data.country.name}`}
          intro={`The ${data.procedures.length} current treatment records are grouped by clinical approach. Every link opens a separate procedure-cost guide; a platform name is not a treatment recommendation.`}
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {data.treatmentGroups.map((group) => (
            <section key={group.name} className="rounded-2xl border border-border bg-background p-5 md:p-6">
              <h3 className="font-heading text-2xl">{group.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {group.summary}
              </p>
              <div className="mt-5 grid gap-3">
                {group.procedures.map((procedure) => (
                  <ProcedureLink key={procedure.slug} procedure={procedure} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcedureComparison({ data }: { data: SpecialtyPageData }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-20">
      <SectionHeading
        eyebrow="Compare"
        title={`${data.specialty.name} procedure costs in ${data.country.name}`}
        intro="These are current GAF catalog planning ranges. They may describe a course, insertion, operation-linked component or transplant protocol rather than one interchangeable session."
      />
      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <table className="min-w-[760px] w-full text-left text-sm">
          <thead className="bg-secondary/60 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <tr>
              <th className="px-5 py-4 font-medium">Treatment</th>
              <th className="px-5 py-4 font-medium">What it is used for</th>
              <th className="px-5 py-4 font-medium">Typical course or stay</th>
              <th className="px-5 py-4 font-medium">India planning range</th>
              <th className="px-5 py-4 font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {data.procedures.map((procedure) => (
              <tr key={procedure.slug} className="border-t border-border bg-card align-top">
                <td className="px-5 py-4 font-medium">{procedure.name}</td>
                <td className="max-w-sm px-5 py-4 text-muted-foreground">
                  {specialtyProcedureSummary(procedure)}
                </td>
                <td className="px-5 py-4 text-muted-foreground">{procedure.stay}</td>
                <td className="px-5 py-4 whitespace-nowrap">{procedure.partnerRange}</td>
                <td className="px-5 py-4">
                  <Link href={`/costs/${procedure.slug}`} className="whitespace-nowrap underline-offset-4 hover:underline">
                    View treatment
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Indicative planning ranges, not guaranteed hospital quotations. The treating team confirms
        technique, fractions, planning, admission and exclusions after clinical review.
      </p>
    </section>
  );
}

function Conditions({ data }: { data: SpecialtyPageData }) {
  if (data.conditions.length === 0) return null;
  return (
    <section id="conditions" className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-20">
      <SectionHeading
        eyebrow="Clinical scope"
        title={`Conditions treated with ${data.specialty.name}`}
        intro="A specialty can have diagnostic, curative, supportive or palliative roles. A diagnosis alone does not establish that any listed treatment is appropriate."
      />
      <div className="mt-8 grid gap-x-10 gap-y-7 md:grid-cols-2">
        {data.conditions.map((condition) => (
          <article key={condition.name} className="border-l-2 border-primary/30 pl-4">
            <h3 className="font-heading text-2xl">{condition.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {condition.summary}
            </p>
            {condition.procedures.length > 0 ? (
              <p className="mt-3 text-sm">
                Related treatment guides:{" "}
                {condition.procedures.slice(0, 4).map((procedure, index) => (
                  <span key={procedure.slug}>
                    {index > 0 ? ", " : ""}
                    <Link href={`/costs/${procedure.slug}`} className="underline-offset-4 hover:underline">
                      {procedure.name}
                    </Link>
                  </span>
                ))}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function Process({ data }: { data: SpecialtyPageData }) {
  return (
    <section className="bg-ink py-12 text-ivory md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          eyebrow="Treatment pathway"
          title={`How ${data.specialty.name} treatment works`}
          intro="The exact sequence changes with the diagnosis and technique, but planning and safety checks come before treatment delivery."
        />
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {data.profile.treatmentProcess.map((step, index) => (
            <li key={step.label} className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <span className="text-sm font-medium text-gold-bright">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-heading text-2xl">{step.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/75">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CostDetails({ data }: { data: SpecialtyPageData }) {
  return (
    <section id="cost" className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-20">
      <SectionHeading
        eyebrow="Cost planning"
        title={`${data.specialty.name} cost in ${data.country.name}`}
        intro={
          data.costRange
            ? `Current GAF-listed procedure ranges span ${data.costRange} across ${data.pricedProcedureCount} priced treatments. This is not a national average: the rows represent different techniques, courses and clinical scopes.`
            : "Treatment costs vary by procedure and clinical complexity. A personalized estimate follows medical-record review."
        }
      />
      <Paragraphs rows={data.profile.costExplanation} />
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h3 className="font-heading text-3xl">What affects the final cost?</h3>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            {data.profile.costFactors.map((factor) => (
              <div key={factor.label} className="rounded-xl border border-border p-4">
                <dt className="font-medium">{factor.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {factor.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-secondary/35 p-5">
            <h3 className="font-heading text-2xl">What may be included?</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {data.profile.mayInclude.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-heading text-2xl">What may be additional?</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {data.profile.mayBeAdditional.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Technologies({ data }: { data: SpecialtyPageData }) {
  if (data.technologies.length === 0) return null;
  return (
    <section id="technology" className="bg-secondary/35 py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          eyebrow="Technology"
          title={`${data.specialty.name} technologies represented in the GAF catalog`}
          intro="Technology availability must be confirmed for a named hospital and treatment date. A machine or platform does not determine suitability by itself."
        />
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-background">
          {data.technologies.map((technology) => (
            <article key={technology.name} className="grid gap-3 p-5 md:grid-cols-[13rem_1fr_1fr] md:p-6">
              <h3 className="font-heading text-2xl">{technology.name}</h3>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">What it is</p>
                <p className="mt-1 text-sm leading-relaxed">{technology.what}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Why it may be used</p>
                <p className="mt-1 text-sm leading-relaxed">{technology.why}</p>
                <p className="mt-2 text-sm">
                  {technology.procedures.map((procedure, index) => (
                    <span key={procedure.slug}>
                      {index > 0 ? " · " : ""}
                      <Link href={`/costs/${procedure.slug}`} className="underline-offset-4 hover:underline">
                        {procedure.name}
                      </Link>
                    </span>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CityDirectory({ data }: { data: SpecialtyPageData }) {
  if (data.cities.length === 0) return null;
  return (
    <section id="cities" className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-20">
      <SectionHeading
        eyebrow="Cities"
        title={`Where can international patients explore ${data.specialty.name} in ${data.country.name}?`}
        intro="Cities appear only where current catalog relationships contain relevant hospitals, doctors or procedures. Counts update from the live data layer."
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {data.cities.map((city) => (
          <li key={city.slug}>
            <Link
              href={costsFilterPath({
                destination: data.country.name,
                city: city.name,
                specialty: data.specialty.name,
              })}
              className="block h-full rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <h3 className="font-heading text-2xl">{city.name}</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Procedures</dt>
                  <dd>{city.procedureCount}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Doctors</dt>
                  <dd>{city.doctorCount}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Hospitals</dt>
                  <dd>{city.hospitalCount}</dd>
                </div>
              </dl>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CareDirectories({ data }: { data: SpecialtyPageData }) {
  const consultHref = `/consult?specialty=${data.profile.specialtySlug}`;
  return (
    <>
      {data.featuredHospitals.length > 0 ? (
        <section id="hospitals" className="bg-secondary/35 py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Hospitals"
                title={`Hospitals for ${data.specialty.name} in ${data.country.name}`}
                intro={`${data.hospitals.length} hospitals currently have a ${data.specialty.name} specialty relationship. Cards show stored CMS information, not a ranking or universal capability claim.`}
              />
              <Link
                href={hospitalsPath({
                  destination: data.country.name,
                  specialty: data.specialty.name,
                })}
                className="text-sm underline-offset-4 hover:underline"
              >
                View all {data.hospitals.length} hospitals
              </Link>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {data.featuredHospitals.map((hospital) => (
                <CostHospitalCard
                  key={hospital.slug}
                  hospital={hospital}
                  doctorCount={data.doctorCountsByHospital.get(hospital.slug) ?? 0}
                  consultHref={consultHref}
                  doctorContext={data.specialty.name}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      {data.featuredDoctors.length > 0 ? (
        <section id="doctors" className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Specialists"
              title={`${data.specialty.name} doctors in ${data.country.name}`}
              intro={`${data.doctors.length} doctor records are connected to ${data.specialty.name} across ${data.hospitals.length} related hospitals. Profile facts come from the existing CMS; ordering is not a ranking.`}
            />
            <Link
              href={doctorsPath({
                destination: data.country.name,
                specialty: data.specialty.name,
              })}
              className="text-sm underline-offset-4 hover:underline"
            >
              View all {data.doctors.length} doctors
            </Link>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {data.featuredDoctors.map((doctor) => (
              <CostDoctorCard
                key={doctor.slug}
                doctor={doctor}
                consultHref={consultHref}
              />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

function InternationalGuide({ data }: { data: SpecialtyPageData }) {
  return (
    <section id="international-patients" className="bg-ink py-12 text-ivory md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-5 md:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="International patients"
            title={`Planning ${data.specialty.name} treatment in ${data.country.name}`}
          />
          <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-ivory/75">
            {data.profile.internationalPatientInformation.map((paragraph) => (
              <p key={paragraph.slice(0, 80)}>{paragraph}</p>
            ))}
          </div>
          <h3 className="mt-8 font-heading text-3xl">How long should patients stay?</h3>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-ivory/75">
            {data.profile.stayDuration.map((paragraph) => (
              <p key={paragraph.slice(0, 80)}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/5 p-5 md:p-7">
          <h3 className="font-heading text-3xl">Medical records to send</h3>
          <p className="mt-3 text-sm leading-relaxed text-ivory/70">
            Depending on the condition, the treating team may request:
          </p>
          <ul className="mt-5 space-y-3 text-sm text-ivory/80">
            {data.profile.recordsRequired.map((record) => (
              <li key={record} className="flex gap-3">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-bright" />
                {record}
              </li>
            ))}
          </ul>
          <Link href="/consult" className="cost-btn cost-btn--primary mt-7">
            Share medical records for review
          </Link>
        </div>
      </div>
    </section>
  );
}

function RelatedSpecialties({ data }: { data: SpecialtyPageData }) {
  if (data.relatedSpecialties.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-16">
      <SectionHeading title="Related medical specialties" />
      <div className="mt-6 flex flex-wrap gap-3">
        {data.relatedSpecialties.map((specialty) => (
          <Link
            key={specialty.slug}
            href={costsFilterPath({
              destination: data.country.name,
              specialty: specialty.name,
            })}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary/40"
          >
            {specialty.name} costs and treatments in {data.country.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

function FrequentlyAskedQuestions({ data }: { data: SpecialtyPageData }) {
  if (data.profile.faqs.length === 0) return null;
  return (
    <section id="faqs" className="bg-secondary/35 py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          eyebrow="Questions"
          title={`${data.specialty.name} in ${data.country.name} — frequently asked questions`}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {data.profile.faqs.map((faq) => (
            <details key={faq.q} className="group rounded-2xl border border-border bg-background px-5 py-4">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <h3 className="font-medium leading-snug">{faq.q}</h3>
                <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full border border-border">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SpecialtyCostPage({
  data,
  query,
}: {
  data: SpecialtyPageData;
  query: CatalogQuery;
}) {
  if (!specialtyPageMeetsQualityThreshold(data)) return null;
  const path = costsFilterPath({
    destination: data.country.name,
    specialty: data.specialty.name,
  });
  const consultHref = `/consult?specialty=${data.profile.specialtySlug}`;
  const costAnswer = data.costRange
    ? `${data.specialty.name} procedure prices currently listed by GAF span ${data.costRange} in ${data.country.name}. This is a cross-procedure planning span, not an average or hospital quotation.`
    : `${data.specialty.name} costs vary by procedure and clinical complexity. A personalized estimate follows medical-record review.`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["MedicalWebPage", "WebPage"],
          name: data.profile.seoTitle,
          description: data.profile.seoDescription,
          url: `https://gaf.healthcare${path}`,
          inLanguage: "en",
          lastReviewed: data.profile.lastReviewed,
          dateModified: data.profile.lastReviewed,
          audience: { "@type": "MedicalAudience", audienceType: "Patient" },
          publisher: {
            "@type": "Organization",
            name: "GAF Healthcare",
            url: "https://gaf.healthcare/",
          },
          about: {
            "@type": "Thing",
            name: `${data.specialty.name} in ${data.country.name}`,
          },
          mainEntity: {
            "@type": "Thing",
            name: data.specialty.name,
            additionalType: "https://schema.org/MedicalSpecialty",
          },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Medical Costs", path: "/costs" },
          {
            name: data.country.name,
            path: costsFilterPath({ destination: data.country.name }),
          },
          { name: data.specialty.name, path },
        ])}
      />
      <JsonLd data={faqJsonLd(data.profile.faqs)} />
      <JsonLd
        data={doctorItemListJsonLd(data.featuredDoctors, {
          name: `${data.specialty.name} doctors in ${data.country.name}`,
          path,
          addressCountry: data.country.name,
        })}
      />
      <JsonLd
        data={hospitalItemListJsonLd(data.featuredHospitals, {
          name: `${data.specialty.name} hospitals in ${data.country.name}`,
          path,
          addressCountry: data.country.name,
        })}
      />

      <section className="border-b border-border bg-gradient-to-b from-secondary/60 to-background">
        <div className="mx-auto max-w-7xl px-4 pt-7 sm:px-5 md:px-8 md:pt-10">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link href="/">Home</Link><span aria-hidden>›</span>
            <Link href="/costs">Medical Costs</Link><span aria-hidden>›</span>
            <Link href={costsFilterPath({ destination: data.country.name })}>{data.country.name}</Link>
            <span aria-hidden>›</span><span aria-current="page">{data.specialty.name}</span>
          </nav>
          <div className="grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-14">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                Specialty and country guide
              </p>
              <h1 className="mt-3 max-w-4xl font-heading text-4xl leading-tight md:text-6xl">
                {data.specialty.name} Cost in {data.country.name}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {data.profile.introAnswer}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={consultHref} className="cost-btn cost-btn--primary">
                  Get a Personalized Treatment Estimate
                </Link>
                <a href="#treatments" className="cost-btn cost-btn--ghost">
                  Explore treatments
                </a>
              </div>
            </div>
            <aside className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Current catalog span
              </p>
              <p className="mt-2 font-heading text-4xl">{data.costRange ?? "Case-specific"}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{costAnswer}</p>
            </aside>
          </div>
          <Suspense fallback={<div className="h-24 rounded-2xl bg-white shadow-sm" />}>
            <CatalogFilter
              basePath="/costs"
              entity="treatments"
              query={query}
              chipStats={{
                total: data.procedures.length,
                counts: Object.fromEntries(
                  data.cities.map((city) => [city.name, city.procedureCount]),
                ),
              }}
              resultCount={data.procedures.length}
              resultLabel={data.procedures.length === 1 ? "pathway" : "pathways"}
            />
          </Suspense>
        </div>
      </section>

      <section aria-labelledby="at-a-glance" className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8">
        <h2 id="at-a-glance" className="font-heading text-3xl">At a glance</h2>
        <dl className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Indicative cost span", data.costRange ?? "Personalized estimate"],
            ["Available procedures", String(data.procedures.length)],
            ["Listed specialists", String(data.doctors.length)],
            ["Related hospitals", String(data.hospitals.length)],
            ["Indian cities", String(data.cities.length)],
          ].map(([label, value]) => (
            <div key={label} className="bg-card p-5">
              <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
              <dd className="mt-2 font-heading text-2xl">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="overview" className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-20">
        <SectionHeading eyebrow="Specialty overview" title={`What is ${data.specialty.name}?`} />
        <Paragraphs rows={data.profile.overview} />
      </section>

      <Conditions data={data} />
      <TreatmentDirectory data={data} />
      <ProcedureComparison data={data} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-20">
        <SectionHeading eyebrow="Clinical decisions" title={`How is ${data.specialty.name} treatment selected?`} />
        <Paragraphs rows={data.profile.selection} />
      </section>

      <Process data={data} />
      <CostDetails data={data} />
      <Technologies data={data} />
      <CityDirectory data={data} />
      <CareDirectories data={data} />
      <InternationalGuide data={data} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-20">
        <SectionHeading title={`Why do international patients consider ${data.country.name} for ${data.specialty.name}?`} />
        <Paragraphs rows={data.profile.countryComparison} />
      </section>

      <RelatedSpecialties data={data} />
      <FrequentlyAskedQuestions data={data} />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8">
        <p className="rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Medical information notice:</strong>{" "}
          {data.profile.medicalDisclaimer}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Last medically reviewed: {data.profile.lastReviewed}. No reviewer name is shown because no named specialty-page reviewer is stored in the CMS.
        </p>
      </section>
      <CtaBand />
    </>
  );
}

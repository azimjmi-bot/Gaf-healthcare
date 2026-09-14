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

function placeName(data: SpecialtyPageData) {
  return data.city?.name ?? data.country.name;
}

function specialtyPagePath(data: SpecialtyPageData) {
  return costsFilterPath({
    destination: data.country.name,
    city: data.city?.name,
    specialty: data.specialty.name,
  });
}

function countrySpecialtyPath(data: SpecialtyPageData) {
  return costsFilterPath({
    destination: data.country.name,
    specialty: data.specialty.name,
  });
}

function visibleFaqs(data: SpecialtyPageData) {
  if (!data.city || !data.cityEditorial) return data.profile.faqs;
  const city = data.city.name;
  const terms = data.profile.terminology;
  const generated = [
    {
      q: `How much does ${data.specialty.name} cost in ${city}?`,
      a: data.hasCitySpecificPricing
        ? `${data.cityPricedProcedureCount} ${terms.careItems} currently have a stored ${city}-specific range. Other rows request a personalized estimate; every figure remains subject to clinical review and written scope.`
        : `No verified ${city}-specific tariff is stored. The page does not copy a national range into a city price; request a case-specific hospital quotation after records review.`,
    },
    {
      q: `Which ${data.specialty.name} ${terms.careItems} are represented in ${city}?`,
      a: `${data.procedures.length} current ${terms.careItem} relationships appear on this page. The list updates from the GAF catalog and does not prove that every listed hospital offers every item.`,
    },
    {
      q: `How many ${data.specialty.name} hospitals are represented in ${city}?`,
      a: `${data.hospitals.length} related hospital records currently meet the city and specialty filters. This is a factual catalog count, not a ranking or statement that every campus accepts every case.`,
    },
    {
      q: `How many ${data.specialty.name} ${terms.practitioners} are represented in ${city}?`,
      a: `${data.doctors.length} connected doctor records currently meet the city and specialty filters. Profiles use stored CMS relationships and ordering is not a ranking.`,
    },
    {
      q: `Does every ${data.specialty.name} hospital in ${city} offer the same technology?`,
      a: "No. A specialty or procedure relationship is not a complete machine inventory. Confirm the named campus, proposed technique, treating clinician and appointment availability in writing.",
    },
    {
      q: `Can I compare ${data.specialty.name} hospitals in ${city}?`,
      a: "Yes. Compare the stored hospital and clinician relationships, then request like-for-like written plans with the same clinical scope, billing basis, inclusions, exclusions and follow-up.",
    },
    {
      q: `How long should an international patient stay in ${city}?`,
      a: "There is no universal stay. Evaluation, treatment schedule, monitoring, recovery and fitness to travel are patient-specific; the treating team must confirm the practical timeline.",
    },
  ];
  const shared = data.profile.faqs.filter((faq) =>
    data.profile.cityFaqQuestions.includes(faq.q),
  );
  return [...generated, ...data.cityEditorial.faqExtras, ...shared].slice(0, 18);
}

function SectionHeading({
  eyebrow,
  title,
  intro,
  inverse = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  inverse?: boolean;
}) {
  return (
    <header className="max-w-3xl">
      {eyebrow ? (
        <p
          className={`text-xs font-medium uppercase tracking-[0.18em] ${
            inverse ? "text-gold-bright" : "text-gold"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 font-heading text-3xl leading-tight md:text-5xl">
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 text-[1.05rem] leading-relaxed ${
            inverse ? "text-ivory/80" : "text-muted-foreground"
          }`}
        >
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

function CityIntroduction({ data }: { data: SpecialtyPageData }) {
  if (!data.city || !data.cityEditorial) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-20">
      <SectionHeading
        eyebrow={`${data.specialty.name} · ${data.city.name}`}
        title={`${data.specialty.name} in ${data.city.name}`}
        intro={`${data.city.name} currently has ${data.procedures.length} ${data.profile.terminology.careItem} relationships, ${data.hospitals.length} related hospitals and ${data.doctors.length} connected ${data.profile.terminology.practitioners} represented by live GAF data.`}
      />
      <Paragraphs rows={data.cityEditorial.introduction} />
      <p className="mt-6 text-sm">
        For national clinical context and the complete catalog, review{" "}
        <Link
          href={countrySpecialtyPath(data)}
          className="underline underline-offset-4"
        >
          {data.specialty.name} costs and treatments in {data.country.name}
        </Link>
        .
      </p>
    </section>
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
  const place = placeName(data);
  const terms = data.profile.terminology;
  return (
    <section id="treatments" className="scroll-mt-28 bg-secondary/35 py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          eyebrow={terms.careItems}
          title={`${data.specialty.name} ${terms.careItems} represented in ${place}`}
          intro={`The ${data.procedures.length} current ${terms.careItem} records ${data.city ? `connected to ${data.city.name}` : `in ${data.country.name}`} are grouped by clinical approach. Every link opens a separate cost guide; a service or platform name is not a treatment recommendation.`}
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
  const place = placeName(data);
  const terms = data.profile.terminology;
  const rows = data.pricingGroups.flatMap((group) =>
    group.rows.map((row) => ({ ...row, basis: group.basis })),
  );
  if (rows.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-20">
      <SectionHeading
        eyebrow="Compare"
        title={`${data.specialty.name} ${terms.careItem} costs in ${place}`}
        intro={
          data.city
            ? data.hasCitySpecificPricing
              ? `${data.cityPricedProcedureCount} rows use stored ${data.city.name}-specific ranges. Rows without verified city pricing request a personalized estimate instead of copying the India range.`
              : `No verified ${data.city.name}-specific tariffs are stored for these ${terms.careItems}. The table requests a personalized estimate instead of presenting national figures as city prices.`
            : "These are current GAF catalog planning ranges, separated by compatible billing basis. A cycle, course, operation, test and treatment programme are not interchangeable units."
        }
      />
      <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-card">
        {data.pricingGroups.map((group) => (
          <div
            key={group.name}
            className="grid gap-2 p-4 md:grid-cols-[minmax(12rem,0.7fr)_minmax(14rem,1fr)_minmax(18rem,1.4fr)] md:gap-5"
          >
            <h3 className="font-medium">{group.name}</h3>
            <p className="text-sm text-muted-foreground">{group.basis}</p>
            <p className="text-sm leading-relaxed">{group.explanation}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <table className="min-w-[980px] w-full text-left text-sm">
          <thead className="bg-secondary/60 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <tr>
              <th className="px-5 py-4 font-medium">{terms.careItem}</th>
              <th className="px-5 py-4 font-medium">What it is used for</th>
              <th className="px-5 py-4 font-medium">{terms.durationLabel}</th>
              <th className="px-5 py-4 font-medium">Pricing basis</th>
              <th className="px-5 py-4 font-medium">
                {data.city ? `${data.city.name} cost` : "GAF India planning range"}
              </th>
              <th className="px-5 py-4 font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.procedure.slug} className="border-t border-border bg-card align-top">
                <td className="px-5 py-4 font-medium">{row.procedure.name}</td>
                <td className="max-w-sm px-5 py-4 text-muted-foreground">
                  {specialtyProcedureSummary(row.procedure)}
                </td>
                <td className="px-5 py-4 text-muted-foreground">{row.procedure.stay}</td>
                <td className="px-5 py-4 text-muted-foreground">{row.basis}</td>
                <td className="px-5 py-4 whitespace-nowrap">
                  {data.city ? row.cityRange ?? "Personalized estimate" : row.countryRange}
                </td>
                <td className="px-5 py-4">
                  <Link href={`/costs/${row.procedure.slug}`} className="whitespace-nowrap underline-offset-4 hover:underline">
                    View {terms.careItem}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Indicative planning ranges, not guaranteed hospital quotations. The treating team confirms
        the clinical scope, billing basis, schedule, admission, monitoring and exclusions after review.
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
        title={`Conditions assessed or treated in ${data.specialty.name}${data.city ? ` in ${data.city.name}` : ""}`}
        intro={`A specialty can have diagnostic, medical, procedural, supportive or palliative roles. A diagnosis alone does not establish that any listed ${data.profile.terminology.careItem} is appropriate${data.city ? ` or represented at every ${data.city.name} hospital` : ""}.`}
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
          intro={`This specialty-specific pathway is configured from approved editorial content. The exact sequence changes with the diagnosis, selected ${data.profile.terminology.careItem} and patient factors.${data.city ? ` Patients travelling to ${data.city.name} should keep the schedule flexible until the treating team confirms evaluation, treatment and follow-up.` : ""}`}
          inverse
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
  const place = placeName(data);
  return (
    <section id="cost" className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-20">
      <SectionHeading
        eyebrow="Cost planning"
        title={`${data.specialty.name} cost in ${place}`}
        intro={
          data.city
            ? data.hasCitySpecificPricing
              ? `${data.cityPricedProcedureCount} ${data.profile.terminology.careItems} have a stored ${data.city.name}-specific range. Missing city prices remain personalized estimates; final pricing depends on the selected hospital, clinical plan, billing basis and written inclusions.`
              : `No verified ${data.city.name}-specific tariff is stored. National figures are not presented as local prices; request a personalized estimate tied to the selected hospital, clinical plan, billing basis and written inclusions.`
            : data.costRange
            ? `Current GAF-listed procedure ranges span ${data.costRange} across ${data.pricedProcedureCount} priced treatments. This is not a national average: the rows represent different techniques, courses and clinical scopes.`
            : `Costs are shown by ${data.pricingGroups.length} compatible pricing ${data.pricingGroups.length === 1 ? "basis" : "bases"} rather than one misleading specialty-wide range. A personalized estimate follows medical-record review.`
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
          title={`${data.specialty.name} technologies represented${data.city ? ` in ${data.city.name}` : " in the GAF catalog"}`}
          intro={`This list is derived from procedure relationships${data.city ? ` currently represented in ${data.city.name}` : ""}; it is not a hospital machine inventory. Technology availability must be confirmed for a named campus and treatment date.`}
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
  const cities = data.city
    ? data.cities.filter((city) => city.slug !== data.city?.slug)
    : data.cities;
  if (cities.length === 0) return null;
  return (
    <section id="cities" className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-20">
      <SectionHeading
        eyebrow="Cities"
        title={
          data.city
            ? `Other cities to explore for ${data.specialty.name} in ${data.country.name}`
            : `Where can international patients explore ${data.specialty.name} in ${data.country.name}?`
        }
        intro={
          data.city
            ? `Compare other data-qualified city guides with different procedure, hospital and specialist relationships. ${data.city.name} is excluded from this list.`
            : "Cities appear only where current catalog relationships contain relevant hospitals, doctors and procedures. Counts update from the live data layer."
        }
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cities.map((city) => (
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
              <p className="mt-1 text-xs text-muted-foreground">
                {data.specialty.name} in {city.name}
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">
                    {data.profile.terminology.careItems}
                  </dt>
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
  const place = placeName(data);
  return (
    <>
      {data.featuredHospitals.length > 0 ? (
        <section id="hospitals" className="bg-secondary/35 py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Hospitals"
                title={`${data.specialty.name} hospitals in ${place}`}
                intro={`${data.hospitals.length} hospitals currently meet the ${place} and ${data.specialty.name} relationship filters. Cards show stored CMS information, not a ranking or universal capability claim.`}
              />
              <Link
                href={hospitalsPath({
                  destination: data.country.name,
                  city: data.city?.name,
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
              title={`${data.specialty.name} doctors in ${place}`}
              intro={`${data.doctors.length} doctor records meet the ${place} and ${data.specialty.name} relationship filters across ${data.hospitals.length} related hospitals. Profile facts come from the existing CMS; ordering is not a ranking.`}
            />
            <Link
              href={doctorsPath({
                destination: data.country.name,
                city: data.city?.name,
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
            title={`Planning ${data.specialty.name} treatment in ${placeName(data)}`}
            inverse
          />
          <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-ivory/75">
            {data.profile.internationalPatientInformation.map((paragraph) => (
              <p key={paragraph.slice(0, 80)}>{paragraph}</p>
            ))}
            {data.cityEditorial?.planning.map((paragraph) => (
              <p key={paragraph.slice(0, 80)}>{paragraph}</p>
            ))}
          </div>
          <h3 className="mt-8 font-heading text-3xl">How long should patients stay?</h3>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-ivory/75">
            {data.profile.stayDuration.map((paragraph) => (
              <p key={paragraph.slice(0, 80)}>{paragraph}</p>
            ))}
          </div>
          {data.cityEditorial ? (
            <>
              <h3 className="mt-8 font-heading text-3xl">
                Planning your stay in {data.city?.name}
              </h3>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-ivory/75">
                {data.cityEditorial.logistics.map((paragraph) => (
                  <p key={paragraph.slice(0, 80)}>{paragraph}</p>
                ))}
              </div>
            </>
          ) : null}
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
  const faqs = visibleFaqs(data);
  if (faqs.length === 0) return null;
  return (
    <section id="faqs" className="bg-secondary/35 py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          eyebrow="Questions"
          title={`${data.specialty.name} in ${placeName(data)} — frequently asked questions`}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
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
  const path = specialtyPagePath(data);
  const parentPath = countrySpecialtyPath(data);
  const faqs = visibleFaqs(data);
  const place = placeName(data);
  const consultHref = `/consult?specialty=${data.profile.specialtySlug}`;
  const costAnswer = data.city
    ? data.hasCitySpecificPricing
      ? `${data.cityPricedProcedureCount} ${data.profile.terminology.careItems} have stored ${data.city.name}-specific planning ranges. Other services remain case-specific, and a named hospital must confirm every quotation.`
      : `No verified ${data.city.name}-specific tariff is stored. National ranges are not reused as city prices; a named hospital must issue the case-specific quotation.`
    : data.costRange
    ? `${data.specialty.name} procedure prices currently listed by GAF span ${data.costRange} in ${data.country.name}. This is a cross-procedure planning span, not an average or hospital quotation.`
    : `${data.specialty.name} costs use different billing bases. Compare the relevant ${data.profile.terminology.careItem} row and request a personalized estimate after medical-record review.`;
  const pageName = data.city
    ? `${data.specialty.name} Cost in ${data.city.name}, ${data.country.name}`
    : data.profile.seoTitle;
  const pageDescription = data.city
    ? `Explore ${data.procedures.length} ${data.specialty.name} ${data.profile.terminology.careItems}, ${data.hospitals.length} related hospitals and ${data.doctors.length} connected ${data.profile.terminology.practitioners} in ${data.city.name}, ${data.country.name}.`
    : data.profile.seoDescription;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["MedicalWebPage", "WebPage"],
          name: pageName,
          description: pageDescription,
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
            name: data.city
              ? `${data.specialty.name} in ${data.city.name}, ${data.country.name}`
              : `${data.specialty.name} in ${data.country.name}`,
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
          { name: data.specialty.name, path: parentPath },
          ...(data.city ? [{ name: data.city.name, path }] : []),
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={doctorItemListJsonLd(data.featuredDoctors, {
          name: `${data.specialty.name} doctors in ${place}`,
          path,
          addressCountry: data.country.name,
        })}
      />
      <JsonLd
        data={hospitalItemListJsonLd(data.featuredHospitals, {
          name: `${data.specialty.name} hospitals in ${place}`,
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
            <span aria-hidden>›</span>
            {data.city ? (
              <>
                <Link href={parentPath}>{data.specialty.name}</Link>
                <span aria-hidden>›</span>
                <span aria-current="page">{data.city.name}</span>
              </>
            ) : (
              <span aria-current="page">{data.specialty.name}</span>
            )}
          </nav>
          <div className="grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-14">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                {data.city
                  ? `${data.specialty.name} · ${data.city.name}`
                  : "Specialty and country guide"}
              </p>
              <h1 className="mt-3 max-w-4xl font-heading text-4xl leading-tight md:text-6xl">
                {data.specialty.name} Cost in{" "}
                {data.city ? `${data.city.name}, ${data.country.name}` : data.country.name}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {data.city
                  ? `${data.city.name} currently has ${data.procedures.length} GAF-listed ${data.profile.terminology.careItem} relationships across ${data.hospitals.length} related hospitals and ${data.doctors.length} connected ${data.profile.terminology.practitioners}. Selection depends on the diagnosis, patient-specific factors and verified capability at the named campus.`
                  : data.profile.introAnswer}
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
                {data.city ? "City cost planning" : "Current catalog span"}
              </p>
              <p className="mt-2 font-heading text-4xl">
                {data.city
                  ? data.hasCitySpecificPricing
                    ? `${data.cityPricedProcedureCount} locally priced`
                    : "Personalized estimate"
                  : data.costRange ?? "Compare by pricing basis"}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{costAnswer}</p>
            </aside>
          </div>
          <Suspense fallback={<div className="h-24 rounded-2xl bg-white shadow-sm" />}>
            <CatalogFilter
              basePath="/costs"
              entity="treatments"
              query={query}
              chipStats={{
                total: data.nationalProcedureCount,
                counts: Object.fromEntries(
                  data.cities.map((city) => [city.name, city.procedureCount]),
                ),
              }}
              resultCount={data.procedures.length}
              resultLabel={
                data.procedures.length === 1
                  ? data.profile.terminology.careItem
                  : data.profile.terminology.careItems
              }
            />
          </Suspense>
        </div>
      </section>

      <section aria-labelledby="at-a-glance" className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8">
        <h2 id="at-a-glance" className="font-heading text-3xl">At a glance</h2>
        <dl className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {[
            [
              data.city ? "City-specific pricing" : "Indicative cost span",
              data.city
                ? data.hasCitySpecificPricing
                  ? `${data.cityPricedProcedureCount} verified`
                  : "Personalized estimate"
                : data.costRange ?? "Multiple pricing bases",
            ],
            [`Available ${data.profile.terminology.careItems}`, String(data.procedures.length)],
            [`Listed ${data.profile.terminology.practitioners}`, String(data.doctors.length)],
            ["Related hospitals", String(data.hospitals.length)],
            [
              data.city ? "Represented technologies" : "Indian cities",
              String(data.city ? data.technologies.length : data.cities.length),
            ],
          ].map(([label, value]) => (
            <div key={label} className="bg-card p-5">
              <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
              <dd className="mt-2 font-heading text-2xl">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <CityIntroduction data={data} />
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
      {!data.city ? <CityDirectory data={data} /> : null}
      <CareDirectories data={data} />
      {data.city && data.cityEditorial ? (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-20">
          <SectionHeading
            title={`Why do international patients consider ${data.city.name} for ${data.specialty.name}?`}
            intro={`The answer depends on the represented entities and the practical fit of a named campus—not a city ranking.`}
          />
          <Paragraphs rows={data.cityEditorial.whyCity} />
        </section>
      ) : null}
      <InternationalGuide data={data} />

      {!data.city ? (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-20">
          <SectionHeading title={`Why do international patients consider ${data.country.name} for ${data.specialty.name}?`} />
          <Paragraphs rows={data.profile.countryComparison} />
        </section>
      ) : null}

      {!data.city ? <RelatedSpecialties data={data} /> : null}
      <FrequentlyAskedQuestions data={data} />
      {data.city ? (
        <>
          <CityDirectory data={data} />
          <RelatedSpecialties data={data} />
        </>
      ) : null}

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

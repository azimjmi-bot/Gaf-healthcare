import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CostAttribution } from "@/components/cost-page/cost-attribution";
import { CostDoctorCard, CostHospitalCard } from "@/components/cost-page/cost-care-cards";
import {
  CityCostGrid,
  ConversionPanel,
  CostBreakdown,
  COST_DISCLAIMER,
  CostPageJump,
  DestinationDecision,
  InternationalComparison,
  MedicalTourismBudget,
  PatientJourney,
  PriceFactors,
  QuickAnswer,
  VARIANCE_NOTE,
  WhyGaf,
} from "@/components/cost-page/cost-blocks";
import type { CostArticle, CostFigure } from "@/data/cost-articles/types";
import { costPath, doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import {
  doctorsToConsiderHeading,
  hospitalsToConsiderHeading,
  resolveApproachComparison,
  type CostCityRow,
  type CostDestinationRow,
  cityEditorial,
} from "@/lib/cost-article";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { Treatment } from "@/lib/treatments";

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[1.05rem] leading-[1.75] text-muted-foreground">{children}</p>;
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-14 scroll-mt-36 font-heading text-[1.75rem] leading-tight md:text-3xl">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-8 font-heading text-xl md:text-2xl">{children}</h3>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[1.05rem] leading-relaxed text-muted-foreground">
          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Figure({ figure }: { figure: CostFigure }) {
  return (
    <figure className="mt-8">
      <Image
        src={figure.src}
        alt={figure.alt}
        width={1280}
        height={720}
        className={`h-auto w-full rounded-2xl ${figure.fit === "contain" ? "object-contain bg-white" : "object-cover"}`}
        sizes="(min-width: 1024px) 48rem, 100vw"
        loading="lazy"
      />
      {figure.caption ? (
        <figcaption className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {figure.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function figuresAfter(article: CostArticle, after: CostFigure["after"]) {
  return (article.figures ?? []).filter((figure) => figure.after === after);
}

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function CostArticleView({
  article,
  treatment,
  city,
  cityRows,
  destinations,
  anyModelled,
  faculty,
  facultyAll,
  facultyTotal,
  campuses,
  related,
}: {
  article: CostArticle;
  treatment: Treatment;
  city?: string;
  cityRows: CostCityRow[];
  destinations: CostDestinationRow[];
  anyModelled: boolean;
  faculty: Doctor[];
  facultyAll: Doctor[];
  facultyTotal: number;
  campuses: Hospital[];
  related: { name: string; slug: string; partnerRange: string; stay: string }[];
}) {
  const brief = article.briefName || article.procedure;
  const cityPage = cityEditorial(article, city)?.page;
  const allDoctors = doctorsPath({ destination: "India", city, procedure: treatment.name });
  const allHospitals = hospitalsPath({ destination: "India", city, procedure: treatment.name });
  const doctorsHeading = doctorsToConsiderHeading(brief, city);
  const hospitalsHeading = hospitalsToConsiderHeading(brief, city);
  const consultHref = `/consult?treatment=${treatment.slug}`;
  const faqs = cityPage
    ? [...cityPage.faqs, ...article.faqs.filter((item) => !cityPage.faqs.some((faq) => faq.q === item.q))]
    : article.faqs;
  const approach = resolveApproachComparison(article, treatment);

  return (
    <article className="w-full pb-4 [&_a]:underline-offset-4 [&_a:hover]:underline">
      <CostPageJump showApproach={Boolean(approach)} />
      <p className="mt-5 text-xs text-muted-foreground">
        Last updated: {formatDate(article.lastUpdated)} · Content curated by{" "}
        <a href="#attribution">Dr. Shabnam Choudhary</a> · Medically reviewed by{" "}
        <a href="#attribution">Dr. Saffiyyah Chaudhary</a>
      </p>

      <div className="mt-5">
        <QuickAnswer
          article={article}
          treatment={treatment}
          cityAnswer={cityPage?.answer}
          consultHref={consultHref}
        />
      </div>
      <div className="mt-8">
        <WhyGaf />
      </div>

      {cityPage ? (
        <section className="mt-10 rounded-2xl border border-border bg-secondary/30 p-5 md:p-7">
          <H2 id="city-guide">{brief} in {city}</H2>
          {cityPage.intro.map((para) => (
            <P key={para.slice(0, 48)}>{para}</P>
          ))}
          <H3>What {brief.toLowerCase()} typically costs in {city}</H3>
          {cityPage.costExplanation.map((para) => (
            <P key={para.slice(0, 48)}>{para}</P>
          ))}
          <H3>What moves the quote in {city}</H3>
          <dl className="mt-6 space-y-5">
            {cityPage.factors.map((item) => (
              <div key={item.label} className="border-l-2 border-border pl-4">
                <dt className="font-medium">{item.label}</dt>
                <dd className="mt-1 text-[1.05rem] leading-relaxed text-muted-foreground">{item.detail}</dd>
              </div>
            ))}
          </dl>
          <H3>Medical travel through {city}</H3>
          {cityPage.medicalTourism.map((para) => (
            <P key={para.slice(0, 48)}>{para}</P>
          ))}
          <H3>Hospitals and units listed in {city}</H3>
          {cityPage.hospitalDiscussion.map((para) => (
            <P key={para.slice(0, 48)}>{para}</P>
          ))}
          <p className="mt-5 text-sm">
            <Link href={allDoctors}>{brief} doctors in {city}</Link>
            {" · "}
            <Link href={allHospitals}>{brief} hospitals in {city}</Link>
            {" · "}
            <Link href={costPath(treatment.name)}>{brief} cost in India</Link>
          </p>
        </section>
      ) : null}

      <H2 id="overview">{article.overviewHeading ?? "Procedure overview"}</H2>
      {article.overview.what.map((para) => (
        <P key={para.slice(0, 40)}>{para}</P>
      ))}
      {figuresAfter(article, "overview").map((figure) => (
        <Figure key={figure.src} figure={figure} />
      ))}

      <H2 id="who-candidate">Who may be a candidate for {article.shortName}?</H2>
      {article.overview.who.map((para) => (
        <P key={para.slice(0, 40)}>{para}</P>
      ))}
      <p className="mt-4 text-sm">
        <a href="#clinical-detail" className="underline-offset-4 hover:underline">
          How the operation is performed, recovery and variations →
        </a>
      </p>

      <H2 id="cost-in-india">{article.procedure} cost in India</H2>
      {article.indiaCost.map((para) => (
        <P key={para.slice(0, 40)}>{para}</P>
      ))}
      {article.answer.slice(2).map((para) => (
        <P key={para.slice(0, 40)}>{para}</P>
      ))}
      {article.costComponents && article.costComponents.length > 0 ? (
        <>
          <H3>{article.procedure} cost breakdown in India</H3>
          <P>
            Component prices are rarely published as a public tariff. The lines below describe what
            typically sits inside a surgical estimate, not a dollar amount for each row.
          </P>
          <dl className="mt-6 space-y-5">
            {article.costComponents.map((item) => (
              <div key={item.label} className="border-l-2 border-border pl-4">
                <dt className="font-medium">{item.label}</dt>
                <dd className="mt-1 text-[1.05rem] leading-relaxed text-muted-foreground">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </>
      ) : null}
      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <p className="text-sm font-medium">Planning range or quotation?</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The {treatment.partnerRange} figure is an <strong className="text-foreground">indicative
          planning range</strong>. A <strong className="text-foreground">final hospital quotation</strong> is
          itemised, issued after a consultant reviews your records, and still subject to what is found
          clinically.
        </p>
      </div>
      <p className="mt-6">
        <Link href={consultHref} className="cost-btn cost-btn--primary">
          Get a Personalized Cost Estimate
        </Link>
      </p>

      <H2 id="whats-included">What is usually included in a {brief} package?</H2>
      <P>
        No two hospitals draw the line in the same place, so read an estimate for what it excludes as
        carefully as for what it covers. The pattern below is what listed campuses typically bundle into
        a surgical estimate for this procedure. Anything not written into your estimate should be
        assumed to be extra until the hospital confirms otherwise.
      </P>
      <CostBreakdown article={article} />
      <P>
        Catalog inclusions listed for this pathway:{" "}
        {treatment.includes.map((item, i) => (
          <span key={item}>
            {item.toLowerCase()}
            {i < treatment.includes.length - 1 ? "; " : "."}
          </span>
        ))}
      </P>

      <H2 id="cost-increases">What can increase the cost?</H2>
      <P>
        These are the drivers that actually move a bill for this operation, in rough order of how often
        they do it. Most of them are clinical decisions rather than commercial ones, which is why an
        honest estimate is written after a records review rather than before it.
      </P>
      <PriceFactors article={article} />

      {approach ? (
        <>
          <H2 id="approach">{approach.heading}</H2>
          {approach.intro.map((para) => (
            <P key={para.slice(0, 40)}>{para}</P>
          ))}
          <p className="cost-scroll-hint">Swipe to compare surgical approaches →</p>
          <div className="cost-scroll mt-2">
            <table>
              <caption className="sr-only">
                Relative complexity and catalog planning range by mastectomy approach
              </caption>
              <thead>
                <tr>
                  <th scope="col">Approach</th>
                  <th scope="col">Relative complexity</th>
                  <th scope="col">GAF planning range</th>
                  <th scope="col">Notes</th>
                </tr>
              </thead>
              <tbody>
                {approach.rows.map((row) => (
                  <tr key={row.name} className={row.isCurrent ? "is-india" : undefined}>
                    <th scope="row">
                      {row.href ? <Link href={row.href}>{row.name}</Link> : row.name}
                    </th>
                    <td>{row.relative}</td>
                    <td>
                      {row.range ?? "No separate GAF sheet"}
                      {row.range ? (
                        <span className="mt-0.5 block text-xs">Catalog planning range</span>
                      ) : (
                        <span className="mt-0.5 block text-xs">Relative complexity only</span>
                      )}
                    </td>
                    <td className="text-muted-foreground">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Planning ranges appear only where GAF Healthcare already publishes a cost sheet for that
            operation. Other rows describe relative surgical complexity and should not be read as prices.
          </p>
        </>
      ) : null}

      <H2 id="cost-by-country">{article.procedure} cost: India vs other medical tourism destinations</H2>
      {article.destinationIntro ? (
        article.destinationIntro.map((para) => <P key={para.slice(0, 40)}>{para}</P>)
      ) : (
        <P>
          The comparison below is for the same operation in each market, not for different treatments
          bundled under one heading. India and the United States figures come from our own catalog. The
          remaining markets are shown as relative cost context modelled against the India band — they are
          planning estimates for orientation, not hospital tariffs, and any of them should be confirmed
          with a written quotation from a hospital in that country.
        </P>
      )}
      <InternationalComparison article={article} destinations={destinations} anyModelled={anyModelled} />
      <P>
        The point of this table is not that one country is better. Cost level and treatment-market
        structure are different things. Germany and Singapore carry higher prices with mature
        multidisciplinary process; Turkey and Thailand compete hard on packaged pricing; the United
        States is the outlier for self-funding patients because facility, pathology and later oncology
        care are often billed by separate entities. India&apos;s practical advantage for this pathway is
        that surgery, pathology and the next-step oncology plan can usually be arranged in one city,
        with the consultant named before you buy a ticket.
      </P>
      <H3>Which destination is right for you?</H3>
      <P>
        Use this only as a reading guide for the table above. It is not a medical recommendation, and it
        does not rank countries.
      </P>
      <DestinationDecision />

      {article.whyIndia && article.whyIndia.length > 0 ? (
        <>
          <H2 id="why-india">Why do international patients consider India for {article.shortName}?</H2>
          {article.whyIndia.map((para) => (
            <P key={para.slice(0, 40)}>{para}</P>
          ))}
        </>
      ) : null}

      <H2 id="hospitals">{hospitalsHeading}</H2>
      <P>{article.hospitalIntro}</P>
      {campuses.length === 0 ? (
        <p className="mt-6 text-muted-foreground">
          Campuses for this pathway are being confirmed. <Link href="/consult">Ask the desk</Link> which
          houses currently quote it.
        </p>
      ) : (
        <>
          <div className="cost-hgrid mt-6">
            {campuses.slice(0, 8).map((hospital) => (
              <CostHospitalCard
                key={hospital.slug}
                hospital={hospital}
                doctorCount={facultyAll.filter((doctor) => doctor.hospitalSlug === hospital.slug).length}
                consultHref={`${consultHref}&hospital=${hospital.slug}`}
              />
            ))}
          </div>
          <p className="mt-5 text-sm">
            <Link href={allHospitals}>
              {brief} hospitals{city ? ` in ${city}` : " in India"}
            </Link>
            {" · "}
            <Link href={consultHref}>Talk to a treatment coordinator</Link>
          </p>
        </>
      )}

      <H2 id="doctors">{doctorsHeading}</H2>
      <P>{article.doctorIntro}</P>
      {faculty.length === 0 ? (
        <p className="mt-6 text-muted-foreground">
          Named consultants for this pathway are being matched.{" "}
          <Link href="/consult">Request a dossier</Link> and we will advise which campuses can quote it.
        </p>
      ) : (
        <>
          <div className="cost-dgrid mt-6">
            {faculty.map((doctor) => (
              <CostDoctorCard
                key={doctor.slug}
                doctor={doctor}
                consultHref={`${consultHref}&doctor=${doctor.slug}`}
              />
            ))}
          </div>
          <p className="mt-5 text-sm">
            <Link href={allDoctors}>
              {brief} doctors{city ? ` in ${city}` : " in India"} ({facultyTotal} listed)
            </Link>
            {" · "}
            <Link href={consultHref}>Get a personalized cost estimate</Link>
          </p>
        </>
      )}

      <H2 id="cost-by-city">{brief} cost by city in India</H2>
      {article.cityIntro ? (
        article.cityIntro.map((para) => <P key={para.slice(0, 40)}>{para}</P>)
      ) : (
        <>
          <P>
            GAF Healthcare lists named consultants for this pathway in{" "}
            {cityRows.map((row, i) => (
              <span key={row.citySlug}>
                <Link href={row.costPath}>{row.city}</Link>
                {i === cityRows.length - 2 ? " and " : i < cityRows.length - 2 ? ", " : ""}
              </span>
            ))}
            . City choice changes your logistics, your accommodation bill and the depth of the unit you
            are walking into. It changes the surgical fee far less than patients expect.
          </P>
          <P>
            We do not publish separate per-city price bands for this procedure unless a researched city
            figure exists. Inventing them would make the table look more precise and be less true. Each
            city link below uses the India planning range together with the listed consultants and
            campuses we can actually show you there.
          </P>
        </>
      )}
      <CityCostGrid rows={cityRows} activeCity={city} />
      <p className="mt-3 text-xs text-muted-foreground">{VARIANCE_NOTE}</p>

      <H2 id="cities">Choosing a city for {article.shortName}</H2>
      <P>
        Patients usually pick the surgeon first and the city second, which is the right order. Still,
        the city you land in decides how far you travel each day for radiotherapy, what you pay for six
        weeks of accommodation, and how easily a companion can stay with you. Here is what genuinely
        differs between the five cities we list.
      </P>
      <Accordion type="single" collapsible className="mt-6">
        {cityRows.map((row) => (
          <AccordionItem key={row.citySlug} value={row.citySlug} id={`city-${row.citySlug}`}>
            <AccordionTrigger className="text-left font-heading text-xl md:text-2xl">
              {article.procedure} cost in {row.city}
            </AccordionTrigger>
            <AccordionContent className="text-[1.05rem] leading-relaxed text-muted-foreground">
              <p>{row.ecosystem}</p>
              <p className="mt-3">{row.logistics}</p>
              <p className="mt-3 text-sm">
                <Link href={row.doctorsPath}>
                  {article.procedure} specialists in {row.city}
                </Link>
                {" · "}
                <Link href={row.hospitalsPath}>Hospitals in {row.city}</Link>
                {" · "}
                <Link href={row.costPath}>Cost in {row.city}</Link>
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <H2 id="total-pathway">What should international patients budget beyond the surgery?</H2>
      {article.fullPathway ? (
        <>
          {article.fullPathway.intro.map((para) => (
            <P key={para.slice(0, 40)}>{para}</P>
          ))}
          <dl className="mt-6 space-y-5">
            {article.fullPathway.stages.map((item) => (
              <div key={item.label} className="border-l-2 border-border pl-4">
                <dt className="font-medium">{item.label}</dt>
                <dd className="mt-1 text-[1.05rem] leading-relaxed text-muted-foreground">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </>
      ) : (
        <P>
          The surgical estimate is only one line in a medical-travel budget. The rows below separate
          hospital charges from living and travel costs so you can plan without treating a brochure
          package as a trip total.
        </P>
      )}
      <MedicalTourismBudget treatment={treatment} article={article} />
      <p className="mt-3 text-xs text-muted-foreground">Planning estimate — not a hospital quotation.</p>
      <p className="mt-5">
        <Link href={consultHref} className="cost-btn cost-btn--primary">
          Get a Personalized Treatment Estimate
        </Link>
      </p>

      <H2 id="journey">What does medical travel for {article.shortName} in India involve?</H2>
      <P>
        The sequence below is how a records-first pathway normally runs. The order matters: everything
        before arrival exists so that you are not making decisions in an unfamiliar hospital corridor
        with a suitcase beside you.
      </P>
      <PatientJourney steps={article.journey} />
      {figuresAfter(article, "journey").map((figure) => (
        <Figure key={figure.src} figure={figure} />
      ))}
      <H3>Documents to prepare</H3>
      <Bullets items={article.documents} />

      <ConversionPanel
        consultHref={consultHref}
        heading="Not sure which hospital or surgeon is right for you?"
        body="Share your medical reports and receive suitable doctor and hospital options along with an indicative treatment estimate."
        primary="Start My Treatment Request"
        secondary="Upload Medical Reports"
        secondaryHref="/consult"
      />

      <H2 id="clinical-detail">Clinical detail</H2>
      <H3>How the operation is performed</H3>
      {article.overview.how.map((para) => (
        <P key={para.slice(0, 40)}>{para}</P>
      ))}
      {figuresAfter(article, "how").map((figure) => (
        <Figure key={figure.src} figure={figure} />
      ))}
      <H3>Main variations</H3>
      <dl className="mt-6 space-y-5">
        {article.overview.variations.map((item) => (
          <div key={item.label} className="border-l-2 border-border pl-4">
            <dt className="font-medium">{item.label}</dt>
            <dd className="mt-1 text-[1.05rem] leading-relaxed text-muted-foreground">{item.detail}</dd>
          </div>
        ))}
      </dl>
      <H3>Preparation</H3>
      {article.overview.preparation.map((para) => (
        <P key={para.slice(0, 40)}>{para}</P>
      ))}
      <H3>Hospital stay and recovery</H3>
      {article.overview.recovery.map((para) => (
        <P key={para.slice(0, 40)}>{para}</P>
      ))}

      <H2 id="questions">How to compare {brief} quotes from Indian hospitals</H2>
      <P>
        Print these and work through them on the video call. A house that answers without hedging is
        telling you something useful about how it will behave when something goes wrong.
      </P>
      <Bullets items={article.questionsToAsk} />

      {article.whyCostDiffers && article.whyCostDiffers.length > 0 ? (
        <>
          <H2 id="cost-may-differ">Why your final {brief} cost may be different</H2>
          {article.whyCostDiffers.map((para) => (
            <P key={para.slice(0, 40)}>{para}</P>
          ))}
        </>
      ) : null}

      <H2 id="faq">Frequently asked questions</H2>
      <div className="mt-6 grid gap-4">
        {faqs.map((item) => (
          <details key={item.q} className="group rounded-2xl border border-border bg-card px-5 py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-medium leading-snug">{item.q}</h3>
              <span
                aria-hidden
                className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-base leading-none"
              >
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
      <CostAttribution />
      {related.length > 0 ? (
        <>
          <H2 id="related">Related treatment costs</H2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {related.map((row) => (
              <li key={row.slug}>
                <Link
                  href={`/costs/${row.slug}`}
                  className="block rounded-2xl border border-border bg-card p-5 no-underline transition-colors hover:border-primary/30"
                >
                  <p className="font-heading text-lg leading-tight">{row.name} cost in India</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {row.partnerRange} · stay {row.stay}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {article.relatedBlogs && article.relatedBlogs.length > 0 ? (
        <p className="mt-6 text-sm">
          Further reading:{" "}
          {article.relatedBlogs.map((blog, i) => (
            <span key={blog.href}>
              <Link href={blog.href}>{blog.label}</Link>
              {i < article.relatedBlogs!.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      ) : null}

      {article.planningClose && article.planningClose.length > 0 ? (
        <>
          <H2 id="planning">Planning your {article.shortName} treatment in India</H2>
          {article.planningClose.map((para) => (
            <P key={para.slice(0, 40)}>{para}</P>
          ))}
          <p className="mt-6 flex flex-wrap gap-3">
            <Link href={consultHref} className="cost-btn cost-btn--primary">
              Get a Personalized Cost Estimate
            </Link>
            <Link href="/consult" className="cost-btn cost-btn--ghost">
              Talk to a Treatment Coordinator
            </Link>
          </p>
        </>
      ) : null}

      <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-5">
        <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Cost note</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{COST_DISCLAIMER}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This page is general information about treatment costs and pathways. It is not a diagnosis, a
          treatment recommendation or a substitute for an individualised medical opinion. Decisions about
          whether this procedure is appropriate for you belong to a qualified doctor who has reviewed
          your records.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Last updated {formatDate(article.lastUpdated)}. Cost data is maintained separately from this
          article and refreshed as listed campuses revise their planning ranges.
        </p>
      </div>

      <p className="mt-6 text-sm">
        <Link href={costPath(treatment.name)}>{treatment.name} cost sheet</Link> ·{" "}
        <Link href="/costs">All treatment costs in India</Link> ·{" "}
        <Link href={`/costs?specialty=${encodeURIComponent(treatment.category)}`}>
          {treatment.category} costs
        </Link>
      </p>
    </article>
  );
}

import Image from "next/image";
import { LocaleLink as Link } from "@/components/locale-link";
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
import { catalogSpecialtyName, costPath, costsFilterPath, doctorsPath, hospitalsPath } from "@/lib/catalog-links";
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
  const doctorsHeading = city
    ? doctorsToConsiderHeading(brief, city, article.cityDoctorHeading)
    : article.doctorHeading || doctorsToConsiderHeading(brief);
  const hospitalsHeading = city
    ? hospitalsToConsiderHeading(brief, city, article.cityHospitalHeading)
    : article.hospitalHeading || hospitalsToConsiderHeading(brief);
  const isMedicalOncology = treatment.specialtySlug === "medical-oncology";
  const isHematology = treatment.specialtySlug === "hematology";
  const isCardiacSurgery = treatment.specialtySlug === "cardiac-surgery";
  const isBariatricSurgery = treatment.specialtySlug === "bariatric-surgery";
  const isCosmeticSurgery = treatment.specialtySlugs.includes("cosmetic-surgery");
  const isCardiology = treatment.specialtySlug === "cardiology";
  const isTavr = treatment.slug === "tavr-tavi-transcatheter-aortic-valve-replacement";
  const isNonsurgicalTreatment =
    isMedicalOncology || isHematology || isTavr || isBariatricSurgery;
  const skipOncologyFraming =
    treatment.specialtySlug === "pediatric-cardiac-surgery" ||
    treatment.specialtySlug === "orthopedics" ||
    treatment.specialtySlug === "spine-surgery" ||
    treatment.specialtySlug === "pediatric-orthopaedic" ||
    isCardiacSurgery ||
    isCardiology ||
    isBariatricSurgery ||
    isCosmeticSurgery;
  const consultHref = `/consult?treatment=${treatment.slug}`;
  const faqs = cityPage
    ? [...cityPage.faqs, ...article.faqs.filter((item) => !cityPage.faqs.some((faq) => faq.q === item.q))]
    : article.faqs;
  const approach = resolveApproachComparison(article, treatment);

  return (
    <article className="w-full pb-4 [&_a]:underline-offset-4 [&_a:hover]:underline">
      <CostPageJump showApproach={Boolean(approach)} showAccess={Boolean(article.accessComparison)} />
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

      {article.introduction && article.introduction.length > 0 && !cityPage ? (
        <section className="mt-10">
          {article.introduction.map((para) => (
            <P key={para.slice(0, 48)}>{para}</P>
          ))}
        </section>
      ) : null}

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

      <H2 id="who-candidate">{article.whoHeading ?? `Who may be a candidate for ${article.shortName}?`}</H2>
      {article.overview.who.map((para) => (
        <P key={para.slice(0, 40)}>{para}</P>
      ))}
      <p className="mt-4 text-sm">
        <a href="#clinical-detail" className="underline-offset-4 hover:underline">
          {isNonsurgicalTreatment
            ? "How treatment is given, monitored and adapted →"
            : isCardiology
              ? "How the procedure is performed, recovery and variations →"
            : "How the operation is performed, recovery and variations →"}
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
            typically sits inside a {isNonsurgicalTreatment ? "treatment" : isCardiology ? "cardiac procedure" : "surgical"} estimate,
            not a dollar amount for each row.
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
        a {isHematology ? "hematology" : isMedicalOncology ? "medical oncology" : isCardiacSurgery || isCardiology ? "cardiac procedure" : isBariatricSurgery ? "bariatric procedure" : isCosmeticSurgery ? "cosmetic procedure" : "surgical"} estimate for this {isNonsurgicalTreatment ? "treatment" : "procedure"}.
        Anything not written into your estimate should be
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
        These are the drivers that actually move a bill for this {isNonsurgicalTreatment || isCardiology ? "procedure" : "operation"}, in rough order of how often
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
          <p className="cost-scroll-hint">
            Swipe to compare {isNonsurgicalTreatment ? "treatment approaches" : isCardiology ? "procedural approaches" : "surgical approaches"} →
          </p>
          <div className="cost-scroll mt-2">
            <table>
              <caption className="sr-only">
                Relative complexity and catalog planning range by {brief.toLowerCase()} approach
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
            {isNonsurgicalTreatment || isCardiology ? " procedure" : " operation"}. Other rows describe relative clinical
            complexity and should not be read as prices.
          </p>
        </>
      ) : null}

      {article.accessComparison ? (
        <>
          <H2 id="access">{article.accessComparison.heading ?? "Open vs laparoscopic vs robotic surgery"}</H2>
          {article.accessComparison.intro.map((para) => (
            <P key={para.slice(0, 40)}>{para}</P>
          ))}
          <p className="cost-scroll-hint">Swipe to compare surgical access →</p>
          <div className="cost-scroll mt-2">
            <table>
              <caption className="sr-only">
                Open, laparoscopic and robotic access compared for {brief.toLowerCase()}
              </caption>
              <thead>
                <tr>
                  <th scope="col">Approach</th>
                  <th scope="col">Surgical access</th>
                  <th scope="col">General approach</th>
                  <th scope="col">Hospital-resource differences</th>
                  <th scope="col">Recovery considerations</th>
                  <th scope="col">Cost considerations</th>
                </tr>
              </thead>
              <tbody>
                {article.accessComparison.rows.map((row) => (
                  <tr key={row.name}>
                    <th scope="row">{row.name}</th>
                    <td>{row.access}</td>
                    <td>{row.method}</td>
                    <td className="text-muted-foreground">{row.resources}</td>
                    <td className="text-muted-foreground">{row.recovery}</td>
                    <td className="text-muted-foreground">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Suitability depends on the patient, the tumour, anatomy, surgeon expertise and clinical
            circumstances. None of these approaches is universally better, and this table is not a price
            list.
          </p>
        </>
      ) : null}

      {article.topicSections?.map((section) => (
        <section key={section.id}>
          <H2 id={section.id}>{section.heading}</H2>
          {section.paragraphs.map((para) => (
            <P key={para.slice(0, 40)}>{para}</P>
          ))}
          {section.table ? (
            <>
              <p className="cost-scroll-hint">Swipe to compare →</p>
              <div className="cost-scroll mt-2">
                <table>
                  {section.table.caption ? (
                    <caption className="sr-only">{section.table.caption}</caption>
                  ) : null}
                  <thead>
                    <tr>
                      {section.table.headers.map((header) => (
                        <th key={header} scope="col">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row) => (
                      <tr key={row.join("|")}>
                        {row.map((cell, index) =>
                          index === 0 ? (
                            <th key={`${row[0]}-${cell}`} scope="row">
                              {cell}
                            </th>
                          ) : (
                            <td key={`${row[0]}-${cell}`} className="text-muted-foreground">
                              {cell}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {section.table.note ? (
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{section.table.note}</p>
              ) : null}
            </>
          ) : null}
        </section>
      ))}

      <H2 id="cost-by-country">{article.procedure} cost: India vs other medical tourism destinations</H2>
      {article.destinationIntro ? (
        article.destinationIntro.map((para) => <P key={para.slice(0, 40)}>{para}</P>)
      ) : (
        <P>
          The comparison below is for the same {isNonsurgicalTreatment ? "treatment assumption" : isCardiology ? "procedure assumption" : "operation"} in each market, not for different treatments
          bundled under one heading. India and the United States figures come from our own catalog. The
          remaining markets are shown as relative cost context modelled against the India band — they are
          planning estimates for orientation, not hospital tariffs, and any of them should be confirmed
          with a written quotation from a hospital in that country.
        </P>
      )}
      <InternationalComparison article={article} destinations={destinations} anyModelled={anyModelled} />
      {!skipOncologyFraming ? (
        <>
          <P>
            The point of this table is not that one country is better. Cost level and treatment-market
            structure are different things. Compare the named hospital, multidisciplinary support,
            included care and follow-up pathway as carefully as the headline figure.
          </P>
          <H3>Which destination is right for you?</H3>
          <P>
            Use this only as a reading guide for the table above. It is not a medical recommendation, and it
            does not rank countries.
          </P>
          <DestinationDecision />
        </>
      ) : null}

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
            are walking into. It changes the {isHematology ? "protocol, laboratory and monitoring bill" : isMedicalOncology ? "medicine and monitoring bill" : isCardiology ? "procedure and device bill" : "surgical fee"} far less than patients expect.
          </P>
          <P>
            We do not publish separate per-city price bands for this procedure unless a researched city
            figure exists. Inventing them would make the table look more precise and be less true. Each
            city link below uses the India planning range together with the listed consultants and
            campuses we can actually show you there.
          </P>
        </>
      )}
      <CityCostGrid
        rows={cityRows}
        activeCity={city}
        serviceHeading={
          isHematology
            ? "Hematology services"
            : isCardiacSurgery
              ? "Cardiac Surgery services"
              : isBariatricSurgery
                ? "Bariatric Surgery services"
              : isCosmeticSurgery
                ? "Cosmetic Surgery services"
              : isCardiology
                ? "Cardiology services"
              : undefined
        }
      />
      <p className="mt-3 text-xs text-muted-foreground">{VARIANCE_NOTE}</p>

      <H2 id="cities">Choosing a city for {article.shortName}</H2>
      {!skipOncologyFraming ? (
        <P>
          Patients usually pick the treating team first and the city second. The city still affects daily
          travel, accommodation, companion arrangements and access to follow-up. Here is what genuinely
          differs between the five cities we list.
        </P>
      ) : null}
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

      <H2 id="total-pathway">
        What should international patients budget beyond the {isHematology ? "hematology procedure or treatment" : isMedicalOncology ? "treatment medicine" : isCardiology ? "cardiac procedure" : "surgery"}?
      </H2>
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
          The {isHematology ? "hematology" : isMedicalOncology ? "medical oncology" : isCardiacSurgery || isCardiology ? "cardiac procedure" : isBariatricSurgery ? "bariatric procedure" : isCosmeticSurgery ? "cosmetic procedure" : "surgical"} estimate is only one line in a medical-travel budget. The rows below separate
          hospital charges from living and travel costs so you can plan without treating a brochure
          package as a trip total.
        </P>
      )}
      <MedicalTourismBudget treatment={treatment} />
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
        heading={
          treatment.specialtySlug === "spine-surgery"
            ? "Need a case-specific spine estimate?"
            :           treatment.specialtySlug === "pediatric-orthopaedic"
              ? "Need a case-specific paediatric orthopaedic estimate?"
              : treatment.specialtySlug === "radiation-oncology"
                ? "Need a case-specific radiation estimate?"
                : isBariatricSurgery
                  ? "Need a case-specific bariatric treatment estimate?"
                : isCosmeticSurgery
                  ? "Need a case-specific cosmetic surgery estimate?"
                : isCardiology
                  ? "Need a case-specific cardiology estimate?"
                : isCardiacSurgery
                  ? "Need a case-specific cardiac surgery estimate?"
                : isHematology
                  ? "Need a case-specific hematology estimate?"
                : isMedicalOncology
                  ? "Need a regimen-specific cancer treatment estimate?"
                : "Not sure which hospital or surgeon is right for you?"
        }
        body={
          treatment.specialtySlug === "spine-surgery"
            ? "Share MRI and medical records for a treatment review. A named spine team can then discuss levels, implants and a written hospital estimate — this is not a quotation or a treatment decision."
            : treatment.specialtySlug === "pediatric-orthopaedic"
              ? "Share your child's medical records for a treatment review. A named paediatric orthopaedic team can then discuss age, growth remaining, implants or casts and a written hospital estimate — this is not a quotation or a treatment decision."
              : treatment.specialtySlug === "radiation-oncology"
                ? "Share your oncology records for a treatment review. A named radiation oncologist can then discuss technique, fractions, planning scans and a written hospital estimate — this is not a quotation or a treatment decision."
                : isBariatricSurgery
                  ? "Share your weight history, medical records and prior abdominal treatment for review. A named bariatric team can then discuss candidacy, procedure anatomy, nutrition follow-up and a written hospital estimate — this is not a quotation or a treatment decision."
                : isCosmeticSurgery
                  ? "Share your medical history, previous procedure records and clinician-requested photographs securely for review. A named cosmetic or plastic surgery team can then discuss suitability, realistic limits, technique, recovery and an itemized estimate — this is not a quotation or a treatment decision."
                : isCardiology
                  ? "Share ECG, imaging, angiography or device records for review. A named cardiology team can then discuss indication, access or implant plan, monitoring and a written hospital estimate — this is not a quotation or a treatment decision."
                : isCardiacSurgery
                  ? "Share your cardiac records for review. A named cardiac team can then discuss anatomy, operative or catheter approach, implants, ICU assumptions and a written hospital estimate — this is not a quotation or a treatment decision."
                : isHematology
                  ? "Share your hematology records for review. A named hematologist can then discuss diagnosis, protocol, donor or laboratory requirements, monitoring and a written hospital estimate — this is not a quotation or a treatment decision."
                : isMedicalOncology
                  ? "Share pathology, imaging, prior treatment and biomarker reports for review. A named medical oncologist can then discuss the regimen, cycles, medicines, monitoring and a written hospital estimate — this is not a quotation or a treatment decision."
                : "Share your medical reports and receive suitable doctor and hospital options along with an indicative treatment estimate."
        }
        primary={
          treatment.specialtySlug === "spine-surgery" ||
          treatment.specialtySlug === "pediatric-orthopaedic" ||
          treatment.specialtySlug === "radiation-oncology" ||
          isBariatricSurgery ||
          isCosmeticSurgery ||
          isCardiology ||
          isCardiacSurgery ||
          isNonsurgicalTreatment
            ? "Request a personalized treatment estimate"
            : "Start My Treatment Request"
        }
        secondary={
          treatment.specialtySlug === "spine-surgery"
            ? "Speak with GAF Healthcare about spine treatment in India"
            : treatment.specialtySlug === "pediatric-orthopaedic"
              ? "Speak with GAF Healthcare about pediatric orthopaedic treatment in India"
              : treatment.specialtySlug === "radiation-oncology"
                ? "Speak with GAF Healthcare about radiation oncology treatment in India"
                : isBariatricSurgery
                  ? "Speak with GAF Healthcare about bariatric surgery in India"
                : isCosmeticSurgery
                  ? "Speak with GAF Healthcare about cosmetic surgery in India"
                : isCardiology
                  ? "Speak with GAF Healthcare about cardiology in India"
                : isCardiacSurgery
                  ? "Speak with GAF Healthcare about cardiac surgery in India"
                : isHematology
                  ? "Speak with GAF Healthcare about hematology treatment in India"
                : isMedicalOncology
                  ? "Speak with GAF Healthcare about medical oncology treatment in India"
                : "Upload Medical Reports"
        }
        secondaryHref="/consult"
      />

      <H2 id="clinical-detail">Clinical detail</H2>
      <H3>
        {isBariatricSurgery || isCosmeticSurgery || isCardiology
          ? "How the procedure is performed"
          : treatment.specialtySlug === "radiation-oncology" || isNonsurgicalTreatment
            ? "How the treatment is delivered"
            : "How the operation is performed"}
      </H3>
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
        <Link href={costsFilterPath({ destination: "India", specialty: catalogSpecialtyName(treatment) })}>
          {catalogSpecialtyName(treatment)} costs
        </Link>
      </p>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import { AccreditationSeals } from "@/components/accreditation-seals";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { CostArticle, CostFigure } from "@/data/cost-articles/types";
import { costPath, doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import type { CostCityRow, CostDestinationRow } from "@/lib/cost-article";
import { experienceBadge, listingBio } from "@/lib/doctor-profile";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { Treatment } from "@/lib/treatments";

export const COST_DISCLAIMER =
  "Costs shown are indicative planning ranges and are not a final hospital quotation. The final estimate may vary depending on the patient's clinical condition, treatment plan, hospital, doctor, room category, investigations and other requirements.";

const VARIANCE_NOTE =
  "Costs vary considerably by hospital, surgeon, clinical complexity, insurance, room category, and what is included in the package.";

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[1.0625rem] leading-[1.75] text-muted-foreground">{children}</p>;
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-14 scroll-mt-24 font-heading text-[1.75rem] leading-tight md:text-3xl">
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
        <li key={item} className="flex gap-3 text-[1.0625rem] leading-relaxed text-muted-foreground">
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
        className="h-auto w-full rounded-2xl object-cover"
        sizes="(min-width: 1024px) 48rem, 100vw"
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

function DetailList({ items }: { items: { label: string; detail: string }[] }) {
  return (
    <dl className="mt-6 space-y-5">
      {items.map((item) => (
        <div key={item.label} className="border-l-2 border-border pl-4">
          <dt className="font-medium text-foreground">{item.label}</dt>
          <dd className="mt-1 text-[1.0625rem] leading-relaxed text-muted-foreground">{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Counts come from the live catalog, so a city with no named consultant yet says so. */
function CityListedLinks({ row }: { row: CostCityRow }) {
  return (
    <>
      {row.doctorCount > 0 ? (
        <Link href={row.doctorsPath}>
          {row.doctorCount} {row.doctorCount === 1 ? "doctor" : "doctors"}
        </Link>
      ) : (
        <Link href="/consult">Consultant match on request</Link>
      )}
      {" · "}
      <Link href={row.hospitalsPath}>
        {row.hospitalCount} {row.hospitalCount === 1 ? "campus" : "campuses"}
      </Link>
    </>
  );
}

function InlineCta({ label, href, note }: { label: string; href: string; note: string }) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <p className="text-sm leading-relaxed text-muted-foreground">{note}</p>
      <Button asChild className="mt-4 h-11 w-full rounded-full sm:mt-0 sm:w-auto sm:shrink-0">
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

const NAV = [
  ["cost-in-india", "Cost in India"],
  ["cost-by-city", "Cost by city"],
  ["cost-by-country", "International comparison"],
  ["whats-included", "What's included"],
  ["cost-increases", "What raises the cost"],
  ["overview", "Procedure overview"],
  ["total-pathway", "Full treatment cost"],
  ["journey", "Patient journey"],
  ["doctors", "Doctors"],
  ["hospitals", "Hospitals"],
  ["cities", "Choosing a city"],
  ["questions", "Questions to ask"],
  ["faq", "FAQs"],
] as const;

export function CostArticleView({
  article,
  treatment,
  cityRows,
  destinations,
  anyModelled,
  faculty,
  facultyTotal,
  campuses,
  related,
}: {
  article: CostArticle;
  treatment: Treatment;
  cityRows: CostCityRow[];
  destinations: CostDestinationRow[];
  anyModelled: boolean;
  faculty: Doctor[];
  facultyTotal: number;
  campuses: Hospital[];
  related: { name: string; slug: string; partnerRange: string; stay: string }[];
}) {
  const allDoctors = doctorsPath({ destination: "India", procedure: treatment.name });
  const allHospitals = hospitalsPath({ destination: "India", procedure: treatment.name });
  const consultHref = `/consult?treatment=${treatment.slug}`;
  const navItems = NAV.filter(([id]) => (id === "total-pathway" ? Boolean(article.fullPathway) : true));

  return (
    <article className="max-w-3xl pb-4 [&_a]:underline-offset-4 [&_a:hover]:underline">
      <p className="text-xs text-muted-foreground">
        Last updated: {formatDate(article.lastUpdated)} · Written and reviewed by the Velora medical
        travel desk
      </p>

      {/* Answer-first block. Kept above every table so an answer engine reads the number first. */}
      <div className="mt-5 rounded-2xl border border-border bg-card p-5 md:p-7">
        <p className="text-xs tracking-[0.18em] uppercase text-gold">The short answer</p>
        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs tracking-[0.14em] uppercase text-muted-foreground">India</dt>
            <dd className="mt-1 font-heading text-2xl">{treatment.partnerRange}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.14em] uppercase text-muted-foreground">US self-pay</dt>
            <dd className="mt-1 font-heading text-2xl">{treatment.usRange}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.14em] uppercase text-muted-foreground">Hospital stay</dt>
            <dd className="mt-1 font-heading text-2xl">{treatment.stay}</dd>
          </div>
        </dl>
      </div>

      {article.answer.map((para) => (
        <P key={para.slice(0, 40)}>{para}</P>
      ))}

      <nav aria-label="On this page" className="mt-8 rounded-2xl border border-border bg-secondary/40 p-5">
        <p className="text-xs tracking-[0.18em] uppercase text-gold">On this page</p>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          {navItems.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <H2 id="cost-in-india">{article.procedure} cost in India</H2>
      {article.indiaCost.map((para) => (
        <P key={para.slice(0, 40)}>{para}</P>
      ))}

      <div className="mt-6 rounded-2xl border border-gold/40 bg-gold/5 p-5">
        <p className="text-sm font-medium text-foreground">Planning range or quotation?</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The {treatment.partnerRange} figure is an <strong className="text-foreground">indicative
          planning range</strong> drawn from what listed campuses typically quote for this pathway. A{" "}
          <strong className="text-foreground">final hospital quotation</strong> is a different document:
          itemised, issued by the treating hospital after a consultant has reviewed your records, and
          still subject to what is found clinically. Use the first to decide whether to enquire. Use the
          second to decide whether to fly.
        </p>
      </div>

      <InlineCta
        href={consultHref}
        label="Get a personalised cost estimate"
        note={`Send your records and a listed consultant will review them before any figure is written for your case.`}
      />

      <H2 id="cost-by-city">Cost comparison by major Indian city</H2>
      <P>
        Velora lists named consultants for this pathway in{" "}
        {cityRows.map((row, i) => (
          <span key={row.citySlug}>
            <Link href={row.costPath}>{row.city}</Link>
            {i === cityRows.length - 2 ? " and " : i < cityRows.length - 2 ? ", " : ""}
          </span>
        ))}
        . City choice changes your logistics, your accommodation bill and the depth of the unit you are
        walking into. It changes the surgical fee far less than patients expect.
      </P>
      <P>
        We do not publish separate per-city price bands for this procedure, because we do not have
        verified city-level tariffs to publish. Inventing them would make this table look more precise
        and be less true. What the table below carries instead is the India planning range applied to
        each city, the number of listed consultants and campuses we can actually show you there, and the
        cost question worth asking in that specific city.
      </P>

      <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-border md:block">
        <table className="w-full min-w-[42rem] text-left text-sm">
          <caption className="sr-only">
            {article.procedure} indicative cost, typical stay and cost considerations by Indian city
          </caption>
          <thead className="bg-secondary/60 text-xs tracking-[0.16em] uppercase text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">City</th>
              <th scope="col" className="px-4 py-3 font-medium">Indicative cost</th>
              <th scope="col" className="px-4 py-3 font-medium">Typical stay</th>
              <th scope="col" className="px-4 py-3 font-medium">Key cost consideration</th>
              <th scope="col" className="px-4 py-3 font-medium">Listed on Velora</th>
            </tr>
          </thead>
          <tbody>
            {cityRows.map((row) => (
              <tr key={row.citySlug} className="border-t border-border bg-card align-top">
                <th scope="row" className="px-4 py-4 font-medium">
                  <Link href={row.costPath}>{row.city}</Link>
                </th>
                <td className="px-4 py-4 text-muted-foreground">
                  {row.range}
                  {row.rangeIsInherited ? <span className="block text-xs">India planning band</span> : null}
                </td>
                <td className="px-4 py-4 text-muted-foreground">{row.stay}</td>
                <td className="px-4 py-4 text-muted-foreground">{row.costNote}</td>
                <td className="px-4 py-4 text-muted-foreground">
                  <CityListedLinks row={row} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid gap-3 md:hidden">
        {cityRows.map((row) => (
          <div key={row.citySlug} className="rounded-2xl border border-border bg-card p-5">
            <Link href={row.costPath} className="font-heading text-xl">
              {row.city}
            </Link>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs tracking-[0.14em] uppercase text-muted-foreground">Indicative</dt>
                <dd className="mt-0.5">{row.range}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.14em] uppercase text-muted-foreground">Stay</dt>
                <dd className="mt-0.5">{row.stay}</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{row.costNote}</p>
            <p className="mt-3 text-sm">
              <CityListedLinks row={row} />
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{VARIANCE_NOTE}</p>

      <H2 id="cost-by-country">{article.procedure} cost in major medical tourism destinations</H2>
      <P>
        The comparison below is for the same operation in each market, not for different treatments
        bundled under one heading. India and the United States figures come from our own catalog. The
        remaining markets are shown as relative cost context modelled against the India band — they are
        planning estimates for orientation, not hospital tariffs, and any of them should be confirmed
        with a written quotation from a hospital in that country.
      </P>

      <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-border md:block">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <caption className="sr-only">
            {article.procedure} indicative cost, typical stay and relative cost context by country
          </caption>
          <thead className="bg-secondary/60 text-xs tracking-[0.16em] uppercase text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Country</th>
              <th scope="col" className="px-4 py-3 font-medium">Indicative cost</th>
              <th scope="col" className="px-4 py-3 font-medium">Typical stay</th>
              <th scope="col" className="px-4 py-3 font-medium">Relative cost context</th>
              <th scope="col" className="px-4 py-3 font-medium">Cost considerations</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((row) => (
              <tr
                key={row.country}
                className={`border-t border-border align-top ${row.isIndia ? "bg-secondary/40" : "bg-card"}`}
              >
                <th scope="row" className="px-4 py-4 font-medium">
                  {row.href ? <Link href={row.href}>{row.country}</Link> : row.country}
                </th>
                <td className="px-4 py-4 text-muted-foreground">
                  {row.range}
                  {row.modelled ? <span className="block text-xs">Modelled estimate*</span> : null}
                </td>
                <td className="px-4 py-4 text-muted-foreground">{row.stay}</td>
                <td className="px-4 py-4 text-muted-foreground">{row.relative}</td>
                <td className="px-4 py-4 text-muted-foreground">{row.context}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid gap-3 md:hidden">
        {destinations.map((row) => (
          <div
            key={row.country}
            className={`rounded-2xl border p-5 ${row.isIndia ? "border-gold/50 bg-gold/5" : "border-border bg-card"}`}
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-heading text-xl">
                {row.href ? <Link href={row.href}>{row.country}</Link> : row.country}
              </p>
              <p className="text-xs text-muted-foreground">{row.relative}</p>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs tracking-[0.14em] uppercase text-muted-foreground">Indicative</dt>
                <dd className="mt-0.5">
                  {row.range}
                  {row.modelled ? <span className="block text-xs text-muted-foreground">Modelled*</span> : null}
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.14em] uppercase text-muted-foreground">Stay</dt>
                <dd className="mt-0.5">{row.stay}</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{row.context}</p>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {anyModelled
          ? "*Modelled from the India planning range using a documented cost-level band for that market. Treat these rows as orientation and confirm with a hospital in the country concerned. "
          : ""}
        {VARIANCE_NOTE}
      </p>
      <P>
        The point of this table is not that one country is better. Cost level and treatment-market
        structure are different things. Germany and Singapore carry higher prices with mature
        multidisciplinary process; Turkey and Thailand compete hard on packaged pricing; the United
        States is the outlier for self-funding patients because facility, pathology and radiation
        oncology are billed by separate entities. The Indian advantage for this pathway is that the whole
        sequence — surgery, pathology, radiation, systemic therapy — can be arranged in one city, at one
        price level, with the consultant named before you buy a ticket.
      </P>

      <H2 id="whats-included">What is included in the cost?</H2>
      <P>
        No two hospitals draw the line in the same place, so read an estimate for what it excludes as
        carefully as for what it covers. The pattern below is what listed campuses typically bundle into
        a surgical estimate for this procedure. Anything not written into your estimate should be
        assumed to be extra until the hospital confirms otherwise.
      </P>
      <H3>Usually included</H3>
      <DetailList items={article.inclusions} />
      <H3>Usually additional</H3>
      <DetailList items={article.exclusions} />
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
      <DetailList items={article.costDrivers} />

      <H2 id="overview">Procedure overview</H2>
      {article.overview.what.map((para) => (
        <P key={para.slice(0, 40)}>{para}</P>
      ))}
      {figuresAfter(article, "overview").map((figure) => (
        <Figure key={figure.src} figure={figure} />
      ))}
      <H3>Who may be a candidate</H3>
      {article.overview.who.map((para) => (
        <P key={para.slice(0, 40)}>{para}</P>
      ))}
      <H3>How the operation is performed</H3>
      {article.overview.how.map((para) => (
        <P key={para.slice(0, 40)}>{para}</P>
      ))}
      {figuresAfter(article, "how").map((figure) => (
        <Figure key={figure.src} figure={figure} />
      ))}
      <H3>Main variations</H3>
      <DetailList items={article.overview.variations} />
      <H3>Preparation</H3>
      {article.overview.preparation.map((para) => (
        <P key={para.slice(0, 40)}>{para}</P>
      ))}
      <H3>Hospital stay and recovery</H3>
      {article.overview.recovery.map((para) => (
        <P key={para.slice(0, 40)}>{para}</P>
      ))}

      {article.fullPathway ? (
        <>
          <H2 id="total-pathway">What the full treatment actually costs</H2>
          {article.fullPathway.intro.map((para) => (
            <P key={para.slice(0, 40)}>{para}</P>
          ))}
          <DetailList items={article.fullPathway.stages} />
        </>
      ) : null}

      <H2 id="journey">Treatment journey for international patients</H2>
      <P>
        The sequence below is how a records-first pathway normally runs. The order matters: everything
        before arrival exists so that you are not making decisions in an unfamiliar hospital corridor
        with a suitcase beside you.
      </P>
      <ol className="mt-6 space-y-5">
        {article.journey.map((step, i) => (
          <li key={step.label} className="flex gap-4">
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-xs text-muted-foreground">
              {i + 1}
            </span>
            <div>
              <p className="font-medium text-foreground">{step.label}</p>
              <p className="mt-1 text-[1.0625rem] leading-relaxed text-muted-foreground">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      {figuresAfter(article, "journey").map((figure) => (
        <Figure key={figure.src} figure={figure} />
      ))}
      <H3>Documents to prepare</H3>
      <Bullets items={article.documents} />
      <InlineCta
        href="/consult"
        label="Share your medical reports"
        note="Records reviewed by a listed consultant, not a call centre. No obligation to travel."
      />

      <H2 id="doctors">{article.doctorHeading}</H2>
      <P>{article.doctorIntro}</P>
      {faculty.length === 0 ? (
        <p className="mt-6 text-muted-foreground">
          Named consultants for this pathway are being matched.{" "}
          <Link href="/consult">Request a dossier</Link> and we will advise which campuses can quote it.
        </p>
      ) : (
        <>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {faculty.map((doctor) => (
              <li
                key={doctor.slug}
                className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
              >
                <Link href={`/doctors/${doctor.slug}`} className="block no-underline">
                  <p className="font-heading text-xl leading-tight">{doctor.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{doctor.title}</p>
                </Link>
                <p className="mt-2 text-sm text-muted-foreground">
                  <Link href={`/hospitals/${doctor.hospitalSlug}`}>{doctor.hospitalName}</Link> ·{" "}
                  <Link href={doctorsPath({ destination: "India", city: doctor.city, procedure: treatment.name })}>
                    {doctor.city}
                  </Link>
                </p>
                {doctor.experience ? (
                  <p className="mt-2 text-xs tracking-[0.12em] uppercase text-muted-foreground">
                    {experienceBadge(doctor)}
                  </p>
                ) : null}
                {doctor.bio ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {listingBio(doctor, 170)}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm">
            <Link href={allDoctors}>
              See all {facultyTotal} listed {article.shortName} specialists in India
            </Link>
          </p>
        </>
      )}

      <H2 id="hospitals">{article.hospitalHeading}</H2>
      <P>{article.hospitalIntro}</P>
      {campuses.length === 0 ? (
        <p className="mt-6 text-muted-foreground">
          Campuses for this pathway are being confirmed. <Link href="/consult">Ask the desk</Link> which
          houses currently quote it.
        </p>
      ) : (
        <>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {campuses.slice(0, 8).map((hospital) => (
              <li
                key={hospital.slug}
                className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
              >
                <Link href={`/hospitals/${hospital.slug}`} className="block no-underline">
                  <p className="font-heading text-xl leading-tight">{hospital.name}</p>
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  <Link
                    href={hospitalsPath({ destination: "India", city: hospital.city, procedure: treatment.name })}
                  >
                    {hospital.city}
                  </Link>
                  , {hospital.country}
                </p>
                <div className="mt-3">
                  <AccreditationSeals accreditation={hospital.accreditation} size="sm" />
                </div>
                <p className="mt-3 text-sm">
                  <Link href={`/hospitals/${hospital.slug}/doctors`}>Consultants</Link> ·{" "}
                  <Link href={`/hospitals/${hospital.slug}/procedures`}>Procedures quoted</Link>
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm">
            <Link href={allHospitals}>See all listed campuses for {article.shortName}</Link>
          </p>
        </>
      )}

      <H2 id="cities">Choosing a city for {article.shortName}</H2>
      <P>
        Patients usually pick the surgeon first and the city second, which is the right order. Still,
        the city you land in decides how far you travel each day for radiotherapy, what you pay for six
        weeks of accommodation, and how easily a companion can stay with you. Here is what genuinely
        differs between the five cities we list.
      </P>
      <div className="mt-6 space-y-8">
        {cityRows.map((row) => (
          <div key={row.citySlug} id={`city-${row.citySlug}`} className="scroll-mt-24">
            <h3 className="font-heading text-xl md:text-2xl">
              <Link href={row.costPath}>
                {article.procedure} cost in {row.city}
              </Link>
            </h3>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted-foreground">{row.ecosystem}</p>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted-foreground">{row.logistics}</p>
            <p className="mt-3 text-sm">
              <Link href={row.doctorsPath}>
                {article.procedure} specialists in {row.city}
              </Link>
              {" · "}
              <Link href={row.hospitalsPath}>Hospitals in {row.city}</Link>
              {" · "}
              <Link href={row.costPath}>Cost in {row.city}</Link>
            </p>
          </div>
        ))}
      </div>

      <H2 id="questions">Questions to ask before you accept an estimate</H2>
      <P>
        Print these and work through them on the video call. A house that answers all twelve without
        hedging is telling you something useful about how it will behave when something goes wrong.
      </P>
      <Bullets items={article.questionsToAsk} />

      <H2 id="faq">Frequently asked questions</H2>
      <Accordion type="single" collapsible className="mt-6">
        {article.faqs.map((item, i) => (
          <AccordionItem key={item.q} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-base">{item.q}</AccordionTrigger>
            <AccordionContent className="text-[1.0625rem] leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

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

export function CostStickyCta({ href, label }: { href: string; label: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 py-3 backdrop-blur md:hidden">
      <Button asChild className="h-11 w-full rounded-full">
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
}

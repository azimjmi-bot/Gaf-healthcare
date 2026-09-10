import Link from "next/link";
import {
  BedDouble,
  Building2,
  CircleDollarSign,
  ClipboardList,
  Clock,
  FileText,
  Globe2,
  Plane,
  Stethoscope,
  Wallet,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { CostArticle } from "@/data/cost-articles/types";
import { formatUsd, parseUsdBand, type CostCityRow, type CostDestinationRow } from "@/lib/cost-article";
import type { Treatment } from "@/lib/treatments";

export const COST_DISCLAIMER =
  "Costs shown are indicative planning ranges and are not a final hospital quotation. The final estimate may vary depending on the patient's clinical condition, treatment plan, hospital, doctor, room category, investigations and other requirements.";

export const VARIANCE_NOTE =
  "Costs vary considerably by hospital, surgeon, clinical complexity, insurance, room category, and what is included in the package.";

export function QuickAnswer({
  article,
  treatment,
}: {
  article: CostArticle;
  treatment: Treatment;
}) {
  const band = parseUsdBand(treatment.partnerRange);
  const brief = article.briefName || article.shortName;
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-[0_16px_40px_-32px_rgba(20,24,28,0.45)] md:p-7">
      <h2 className="font-heading text-2xl md:text-3xl">How much does {brief} cost in India?</h2>
      <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">{article.answer[0]}</p>
      {article.answer[1] ? (
        <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">{article.answer[1]}</p>
      ) : null}
      <dl className="cost-metrics mt-6">
        <div className="cost-metric">
          <CircleDollarSign className="size-4" />
          <dt>Starting cost</dt>
          <dd>{band ? formatUsd(band[0]) : treatment.partnerRange}</dd>
        </div>
        <div className="cost-metric">
          <Wallet className="size-4" />
          <dt>Typical cost</dt>
          <dd>{treatment.partnerRange}</dd>
        </div>
        <div className="cost-metric">
          <BedDouble className="size-4" />
          <dt>Hospital stay</dt>
          <dd>{treatment.stay}</dd>
        </div>
        <div className="cost-metric">
          <Clock className="size-4" />
          <dt>Procedure time</dt>
          <dd>{article.duration ?? "Set after review"}</dd>
        </div>
      </dl>
    </section>
  );
}

export function CostBreakdown({ article }: { article: CostArticle }) {
  return (
    <div className="cost-include mt-6">
      {article.inclusions.map((item) => (
        <div key={item.label} className="cost-include__card cost-include__card--in">
          <p className="cost-include__tag">Included</p>
          <p className="font-medium">{item.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
        </div>
      ))}
      {article.exclusions.map((item) => (
        <div key={item.label} className="cost-include__card cost-include__card--extra">
          <p className="cost-include__tag">May be separate</p>
          <p className="font-medium">{item.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

export function PriceFactors({ article }: { article: CostArticle }) {
  return (
    <div className="mt-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="why-quotes-differ">
          <AccordionTrigger className="text-left text-base">
            Why can two hospitals quote different prices?
          </AccordionTrigger>
          <AccordionContent className="text-[1.05rem] leading-relaxed text-muted-foreground">
            Campus tier, the named surgeon, axillary work, oncoplastic reshaping, room category and
            what pathology is sent out all move a bill more than the city name does. The list below is
            the clinical and commercial detail behind that spread — not a menu to shop from.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <dl className="cost-drivers">
        {article.costDrivers.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function InternationalComparison({
  article,
  destinations,
  anyModelled,
}: {
  article: CostArticle;
  destinations: CostDestinationRow[];
  anyModelled: boolean;
}) {
  return (
    <>
      <p className="cost-scroll-hint">Swipe to compare destinations →</p>
      <div className="cost-scroll mt-2">
        <table>
          <caption className="sr-only">
            {article.procedure} estimated cost, typical stay and relative cost by destination
          </caption>
          <thead>
            <tr>
              <th scope="col">Destination</th>
              <th scope="col">Estimated cost</th>
              <th scope="col">Typical stay</th>
              <th scope="col">Relative cost</th>
              <th scope="col">Why patients choose it</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((row) => (
              <tr key={row.country} className={row.isIndia ? "is-india" : undefined}>
                <th scope="row">
                  {row.href ? <Link href={row.href}>{row.country}</Link> : row.country}
                </th>
                <td>
                  {row.range}
                  {row.modelled ? <span className="mt-0.5 block text-xs">Modelled estimate*</span> : null}
                </td>
                <td>{row.stay}</td>
                <td>{row.relative}</td>
                <td className="text-muted-foreground">{row.context}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {anyModelled
          ? "*International figures other than India and the United States are modelled planning estimates, not hospital quotations. Confirm with a hospital in the country concerned. "
          : ""}
        {VARIANCE_NOTE}
      </p>
    </>
  );
}

export function DestinationDecision() {
  return (
    <ul className="cost-decide mt-6">
      <li>
        <p>Looking for the lowest overall treatment cost?</p>
        <strong>India</strong>
      </li>
      <li>
        <p>Looking for premium private hospital infrastructure?</p>
        <strong>Singapore / UAE</strong>
      </li>
      <li>
        <p>Looking for proximity from the Middle East?</p>
        <strong>UAE / India / Turkey</strong>
      </li>
      <li>
        <p>Looking for established European oncology systems?</p>
        <strong>Germany / UK</strong>
      </li>
    </ul>
  );
}

export function CityCostGrid({ rows }: { rows: CostCityRow[] }) {
  return (
    <div className="cost-citygrid mt-6">
      {rows.map((row) => (
        <article key={row.citySlug} className="cost-city">
          <h3>
            <Link href={row.costPath}>{row.city}</Link>
          </h3>
          <p className="cost-city__range">{row.range}</p>
          {row.rangeIsInherited ? (
            <p className="mt-1 text-xs text-muted-foreground">India planning band — not a city quote</p>
          ) : null}
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{row.costNote}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {row.hospitalCount} {row.hospitalCount === 1 ? "hospital" : "hospitals"}
            {" · "}
            {row.doctorCount > 0
              ? `${row.doctorCount} ${row.doctorCount === 1 ? "doctor" : "doctors"}`
              : "consultant match on request"}
          </p>
          <p className="mt-auto pt-4 text-sm font-medium">
            <Link href={row.costPath}>View city →</Link>
          </p>
        </article>
      ))}
    </div>
  );
}

export function MedicalTourismBudget({
  treatment,
  article,
}: {
  treatment: Treatment;
  article: CostArticle;
}) {
  const rows = [
    { label: "Treatment (surgical package)", range: treatment.partnerRange },
    { label: "Pre-operative tests", range: "Often inside the estimate — confirm" },
    { label: "Hospital stay", range: `${treatment.stay} typically bundled` },
    {
      label: article.fullPathway ? "Radiotherapy / additional treatment" : "Additional treatment",
      range: "Quoted separately if advised",
    },
    { label: "Accommodation for companion", range: "Varies by city and length of stay" },
    { label: "Local transportation", range: "Airport and daily hospital transfers" },
    { label: "Flights", range: "Depends on origin" },
    { label: "Medical visa", range: "Fee set by the issuing consulate" },
  ];
  return (
    <ul className="cost-budget mt-6">
      {rows.map((row, i) => (
        <li key={row.label} className={i === 0 ? "is-lead" : undefined}>
          <span>{row.label}</span>
          <strong>{row.range}</strong>
        </li>
      ))}
    </ul>
  );
}

const JOURNEY_ICONS = [FileText, Stethoscope, ClipboardList, Building2, Plane, ClipboardList, Stethoscope, FileText, ClipboardList, Plane];

export function PatientJourney({ steps }: { steps: { label: string; detail: string }[] }) {
  return (
    <ol className="cost-steps mt-6">
      {steps.map((step, i) => {
        const Icon = JOURNEY_ICONS[i % JOURNEY_ICONS.length];
        return (
          <li key={step.label} className="cost-step">
            <span className="cost-step__n" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="cost-step__title">
                <Icon className="size-4" aria-hidden />
                {step.label}
              </p>
              <p className="mt-1 text-[1.02rem] leading-relaxed text-muted-foreground">{step.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function CostPageJump() {
  const items = [
    ["#cost-in-india", "Cost"],
    ["#whats-included", "Inclusions"],
    ["#cost-by-country", "Destinations"],
    ["#hospitals", "Hospitals"],
    ["#doctors", "Doctors"],
    ["#cost-by-city", "Cities"],
    ["#total-pathway", "Trip budget"],
  ] as const;
  return (
    <nav aria-label="On this page" className="cost-jump">
      {items.map(([href, label]) => (
        <a key={href} href={href}>
          {label}
        </a>
      ))}
    </nav>
  );
}

export function WhyGaf() {
  return (
    <section className="cost-why">
      <h2 className="font-heading text-2xl md:text-3xl">Why request a cost through GAF rather than a hospital?</h2>
      <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">
        Writing to one campus gets you that campus’s package. A GAF request is reviewed against your
        records and returned as suitable doctor and hospital options with an indicative, itemised
        estimate. There is no obligation to book.
      </p>
      <ul>
        <li>
          <Stethoscope className="size-4" />
          <span>
            <strong>Doctor review first.</strong> The number follows a reading of your imaging and
            pathology, not a brochure range.
          </span>
        </li>
        <li>
          <Building2 className="size-4" />
          <span>
            <strong>Hospital options.</strong> You can compare listed campuses before you travel,
            instead of starting over with each international desk.
          </span>
        </li>
        <li>
          <Globe2 className="size-4" />
          <span>
            <strong>International-patient coordination.</strong> Visa letters, records routing and
            companion logistics sit with the same request.
          </span>
        </li>
      </ul>
    </section>
  );
}

export function ConversionPanel({
  consultHref,
  heading,
  body,
  primary,
  secondary,
  secondaryHref,
}: {
  consultHref: string;
  heading: string;
  body: string;
  primary: string;
  secondary?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="cost-panel mt-12">
      <h2>{heading}</h2>
      <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-ivory/75">{body}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={consultHref} className="cost-btn cost-btn--primary">
          {primary}
        </Link>
        {secondary && secondaryHref ? (
          <Link href={secondaryHref} className="cost-btn border border-ivory/25 text-ivory hover:bg-white/5">
            {secondary}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

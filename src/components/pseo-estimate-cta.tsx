import type { ComponentProps } from "react";
import { LocaleLink as Link } from "@/components/locale-link";

type EstimateCtaVariant = "records" | "options" | "hospital" | "travel" | "plan";

const COPY: Record<
  EstimateCtaVariant,
  {
    heading: (subject: string, place: string) => string;
    body: (subject: string, place: string) => string;
    primary: string;
    secondary: (subject: string, place: string) => string;
  }
> = {
  records: {
    heading: (subject) => `Need a case-specific ${subject} estimate?`,
    body: (subject) =>
      `Share your medical records for a treatment review. A relevant specialist can then discuss the ${subject} pathway, likely hospital requirements and a written estimate — this is not a quotation or a treatment decision.`,
    primary: "Request a personalized treatment estimate",
    secondary: (subject, place) => `Speak with GAF Healthcare about ${subject} in ${place}`,
  },
  options: {
    heading: () => "Not sure which treatment option fits your case?",
    body: (subject) =>
      `Send the diagnosis, recent reports and previous treatment details for review. GAF Healthcare can help identify specialists and hospitals relevant to ${subject} before you make travel or booking decisions.`,
    primary: "Ask for a case review",
    secondary: (subject, place) => `Discuss ${subject} options in ${place}`,
  },
  hospital: {
    heading: () => "Want to compare hospitals for your treatment?",
    body: (subject, place) =>
      `Hospital choice depends on the planned ${subject} pathway, specialist availability and the facilities required for your case. Share your records to request comparable options in ${place}.`,
    primary: "Compare suitable hospital options",
    secondary: (subject, place) => `Get help choosing ${subject} care in ${place}`,
  },
  travel: {
    heading: () => "Planning treatment and travel together?",
    body: (subject, place) =>
      `A records-first review can clarify the expected ${subject} pathway, likely stay and hospital estimate before travel to ${place}. Final decisions remain with the treating clinician after assessment.`,
    primary: "Plan my treatment journey",
    secondary: (subject, place) => `Ask about travelling for ${subject} to ${place}`,
  },
  plan: {
    heading: () => "Ready to request a personalized treatment plan?",
    body: (subject) =>
      `Share your available reports securely. GAF Healthcare can coordinate a specialist review for ${subject} and return next-step guidance with an indicative hospital estimate.`,
    primary: "Start my treatment request",
    secondary: (subject, place) => `Speak with a coordinator about ${subject} in ${place}`,
  },
};

export function PseoEstimateCta({
  subject,
  place,
  consultHref,
  variant,
}: {
  subject: string;
  place: string;
  consultHref: string;
  variant: EstimateCtaVariant;
}) {
  const copy = COPY[variant];

  return (
    <aside className="cost-panel mt-12" aria-label="Personalized treatment estimate">
      <h2>{copy.heading(subject, place)}</h2>
      <p className="mt-3 max-w-3xl text-[1.02rem] leading-relaxed text-ivory/75">
        {copy.body(subject, place)}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={consultHref} className="cost-btn cost-btn--primary">
          {copy.primary}
        </Link>
        <Link
          href={consultHref}
          className="cost-btn border border-ivory/25 text-ivory hover:bg-white/5"
        >
          {copy.secondary(subject, place)}
        </Link>
      </div>
    </aside>
  );
}

export function PseoEstimateCtaSection(
  props: ComponentProps<typeof PseoEstimateCta>,
) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
      <PseoEstimateCta {...props} />
    </section>
  );
}

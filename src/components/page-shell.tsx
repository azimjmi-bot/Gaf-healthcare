import type { ReactNode } from "react";
import { PseoEstimateCta } from "@/components/pseo-estimate-cta";
import { blogEstimateWhatsapp } from "@/lib/site";

export function PageIntro({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className={`mx-auto max-w-7xl px-4 pt-10 sm:px-5 md:px-8 md:pt-24 ${children ? "pb-10 md:pb-16" : "pb-12 md:pb-24"}`}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl font-heading text-[2rem] leading-[1.15] sm:text-4xl md:mt-4 md:text-6xl">
          {title}
        </h1>
        <p className="prose-gaf mt-4 md:mt-6">{lede}</p>
      </div>
      {children ? (
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-5 md:px-8 md:pb-10">{children}</div>
      ) : null}
    </section>
  );
}

export function CtaBand({
  subject = "treatment",
  place = "India",
}: {
  subject?: string;
  place?: string;
} = {}) {
  const wa = blogEstimateWhatsapp(subject, place);
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
      <PseoEstimateCta
        subject={subject}
        place={place}
        consultHref={wa.primary}
        secondaryHref={wa.secondary}
        variant="records"
      />
    </section>
  );
}

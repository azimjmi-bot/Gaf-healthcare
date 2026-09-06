import { CtaBand, PageIntro } from "@/components/page-shell";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "The atelier" };

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="House"
        title="An atelier for people who refuse to be a lead."
        lede="Velora was founded by coordinators who had watched marketplaces send patients to the highest bidder. We took the opposite brief: fewer cities, named surgeons, written complication pathways, and a fee you can see."
      />
      <section className="mx-auto max-w-3xl space-y-8 px-5 py-16 text-lg leading-relaxed text-muted-foreground md:px-8">
        <p>
          We sit between you and the hospital. We do not employ the surgeons. We
          do not take a secret kickback that changes who we recommend. The
          atelier fee is on the quote.
        </p>
        <p>
          Dossiers are assembled in New York, London, and Singapore so someone
          is awake when you land. Clinical review — whether a case is even
          appropriate to travel — is done before we talk about hotels.
        </p>
        <p>
          If the honest answer is “stay home and wait for your local specialist,”
          we will say so. That is still a successful consult.
        </p>
        <div className="rounded-2xl border border-border bg-card p-8 text-base text-foreground">
          <p className="eyebrow">Desks</p>
          <p className="mt-4">{site.email}</p>
          <p>{site.phone}</p>
          <p className="mt-2 text-muted-foreground">{site.hours}</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

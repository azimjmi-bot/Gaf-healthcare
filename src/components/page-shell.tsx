import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export function CtaBand() {
  return (
    <section className="bg-ink text-ivory">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-5 md:flex-row md:items-center md:gap-8 md:px-8 md:py-20">
        <div>
          <p className="eyebrow text-gold">Begin</p>
          <h2 className="mt-3 max-w-xl font-heading text-[1.85rem] leading-tight md:text-5xl">
            Request a private dossier. No obligation, no mill clinic.
          </h2>
        </div>
        <Button
          asChild
          className="h-12 w-full rounded-full bg-gold px-8 text-ink hover:bg-gold/90 md:w-auto"
        >
          <Link href="/consult">Talk to a coordinator</Link>
        </Button>
      </div>
    </section>
  );
}

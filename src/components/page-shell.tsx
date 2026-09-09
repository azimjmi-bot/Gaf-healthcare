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
      <div className={`mx-auto max-w-7xl px-5 pt-16 md:px-8 md:pt-24 ${children ? "pb-14 md:pb-16" : "pb-16 md:pb-24"}`}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-heading text-4xl leading-[1.1] md:text-6xl">
          {title}
        </h1>
        <p className="prose-gaf mt-6">{lede}</p>
      </div>
      {children ? (
        <div className="mx-auto max-w-7xl px-5 pb-10 md:px-8">{children}</div>
      ) : null}
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="bg-ink text-ivory">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 md:flex-row md:items-center md:px-8 md:py-20">
        <div>
          <p className="eyebrow text-gold">Begin</p>
          <h2 className="mt-3 max-w-xl font-heading text-3xl md:text-5xl">
            Request a private dossier. No obligation, no mill clinic.
          </h2>
        </div>
        <Button
          asChild
          className="h-12 rounded-full bg-gold px-8 text-ink hover:bg-gold/90"
        >
          <Link href="/consult">Talk to a coordinator</Link>
        </Button>
      </div>
    </section>
  );
}

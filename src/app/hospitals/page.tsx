import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { hospitals } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Hospitals" };

export default function HospitalsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Campus"
        title="A short list, inspected."
        lede="We do not list every hospital that will take a transfer. Partners below hold current JCI or equivalent accreditation, an international desk that actually answers, and published complication pathways."
      />
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hospitals.map((h) => (
            <Link
              key={h.slug}
              href={`/hospitals/${h.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="relative h-48">
                <Image
                  src={h.image}
                  alt={h.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-xs tracking-[0.18em] uppercase text-gold">{h.accreditation}</p>
                <h2 className="mt-2 font-heading text-2xl">{h.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {h.city}, {h.country}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{h.focus}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

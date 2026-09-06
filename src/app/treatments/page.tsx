import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { treatments } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Treatments" };

export default function TreatmentsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Pathways"
        title="Arranged with the same seriousness as at home — often with more time."
        lede="Estimates below are typical all-in clinical ranges at our partner campuses, not a quote. US ranges are public cash-pay bands for orientation. Your dossier will be specific."
      />
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {treatments.map((t) => (
            <Link
              key={t.slug}
              href={`/treatments/${t.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="relative h-56">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  {t.category}
                </p>
                <h2 className="mt-2 font-heading text-3xl">{t.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.summary}</p>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Typical US cash</p>
                    <p>{t.usRange}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Partner range</p>
                    <p>{t.partnerRange}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

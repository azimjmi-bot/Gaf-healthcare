import Link from "next/link";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { treatments } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Treatment Cost" };

export default function CostsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Ledger"
        title="What it typically costs — beside what it costs at home."
        lede="Figures are illustrative all-in clinical ranges at Velora partner hospitals, not a quote. US cash-pay bands are public orientation numbers. Your dossier will be specific to the doctor and campus."
      />
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="hidden overflow-hidden rounded-2xl border border-border md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60 text-xs tracking-[0.16em] uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Pathway</th>
                <th className="px-6 py-4 font-medium">Typical US cash</th>
                <th className="px-6 py-4 font-medium">Partner range</th>
                <th className="px-6 py-4 font-medium">Stay</th>
                <th className="px-6 py-4 font-medium" />
              </tr>
            </thead>
            <tbody>
              {treatments.map((t) => (
                <tr key={t.slug} className="border-t border-border bg-card">
                  <td className="px-6 py-5">
                    <p className="font-heading text-xl text-foreground">{t.name}</p>
                    <p className="text-muted-foreground">{t.category}</p>
                  </td>
                  <td className="px-6 py-5">{t.usRange}</td>
                  <td className="px-6 py-5 font-medium">{t.partnerRange}</td>
                  <td className="px-6 py-5 text-muted-foreground">{t.stay}</td>
                  <td className="px-6 py-5 text-right">
                    <Link href={`/costs/${t.slug}`} className="text-sm underline-offset-4 hover:underline">
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 md:hidden">
          {treatments.map((t) => (
            <Link
              key={t.slug}
              href={`/costs/${t.slug}`}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                {t.category}
              </p>
              <h2 className="mt-1 font-heading text-2xl">{t.name}</h2>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">US cash</dt>
                  <dd>{t.usRange}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Partner</dt>
                  <dd>{t.partnerRange}</dd>
                </div>
              </dl>
              <p className="mt-3 text-sm text-muted-foreground">Stay {t.stay}</p>
            </Link>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
          Oncology and some cardiac pathways are quoted only after records review.
          Atelier fee (typically 8–12%) is included in the written all-in quote if you proceed.
        </p>
      </section>
      <CtaBand />
    </>
  );
}

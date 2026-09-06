import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/page-shell";
import {
  doctorsForTreatment,
  getHospital,
  getTreatment,
  treatments,
} from "@/lib/data";
import type { Metadata } from "next";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTreatment(slug);
  return { title: t ? `${t.name} cost` : "Treatment Cost" };
}

export default async function CostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) notFound();
  const campuses = t.hospitalSlugs.map((s) => getHospital(s)).filter(Boolean);
  const faculty = doctorsForTreatment(t.slug);

  return (
    <>
      <section className="relative h-[50vh] min-h-[22rem] bg-ink text-ivory">
        <Image src={t.image} alt={t.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-12 md:px-8">
          <p className="eyebrow text-gold">Treatment cost · {t.category}</p>
          <h1 className="mt-3 font-heading text-5xl md:text-7xl">{t.name}</h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-7">
          <p className="text-lg leading-relaxed text-muted-foreground">{t.summary}</p>
          <p className="mt-6 text-muted-foreground">{t.notes}</p>
          <h2 className="mt-12 font-heading text-3xl">Typically included</h2>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            {t.includes.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <aside className="md:col-span-5 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-8">
            <dl className="space-y-5">
              <div>
                <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  Typical US cash
                </dt>
                <dd className="mt-1 font-heading text-2xl">{t.usRange}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  Partner range
                </dt>
                <dd className="mt-1 font-heading text-2xl">{t.partnerRange}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Stay</dt>
                <dd className="mt-1">{t.stay}</dd>
              </div>
            </dl>
            <Button asChild className="mt-8 h-11 w-full rounded-full">
              <Link href={`/consult?treatment=${t.slug}`}>Request this pathway</Link>
            </Button>
          </div>
        </aside>
      </section>
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-heading text-3xl">Doctors</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {faculty.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/doctors/${d.slug}`}
                  className="block rounded-xl border border-border bg-card p-6 hover:border-primary/30"
                >
                  <p className="font-heading text-2xl">{d.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{d.title}</p>
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-14 font-heading text-3xl">Hospitals</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {campuses.map((h) =>
              h ? (
                <li key={h.slug}>
                  <Link
                    href={`/hospitals/${h.slug}`}
                    className="block rounded-xl border border-border bg-card p-6 hover:border-primary/30"
                  >
                    <p className="font-heading text-2xl">{h.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {h.city}, {h.country}
                    </p>
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

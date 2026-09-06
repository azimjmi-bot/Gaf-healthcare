import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/page-shell";
import {
  doctorsForHospital,
  getHospital,
  hospitals,
  treatmentsForHospital,
} from "@/lib/data";
import type { Metadata } from "next";

export function generateStaticParams() {
  return hospitals.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const h = getHospital(slug);
  return { title: h ? h.name : "Hospital" };
}

export default async function HospitalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const h = getHospital(slug);
  if (!h) notFound();
  const faculty = doctorsForHospital(h.slug);
  const pathways = treatmentsForHospital(h.slug);

  return (
    <>
      <section className="relative h-[55vh] min-h-[24rem] bg-ink text-ivory">
        <Image src={h.image} alt={h.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-12 md:px-8">
          <p className="eyebrow text-gold">{h.accreditation}</p>
          <h1 className="mt-3 font-heading text-5xl md:text-6xl">{h.name}</h1>
          <p className="mt-3 text-ivory/80">
            {h.city}, {h.country}
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-7">
          <p className="text-lg leading-relaxed text-muted-foreground">{h.summary}</p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Focus</dt>
              <dd className="mt-1">{h.focus}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Languages</dt>
              <dd className="mt-1">{h.languages}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Critical care</dt>
              <dd className="mt-1">{h.icu}</dd>
            </div>
          </dl>
        </div>
        <aside className="md:col-span-5">
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="eyebrow">Next</p>
            <h2 className="mt-3 font-heading text-3xl">Open a dossier for this campus</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We match you to a named doctor on this floor, then you meet them on camera.
            </p>
            <Button asChild className="mt-6 h-11 rounded-full px-6">
              <Link href={`/consult?hospital=${h.slug}`}>Request this hospital</Link>
            </Button>
          </div>
        </aside>
      </section>
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-heading text-3xl">Doctors here</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {faculty.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/doctors/${d.slug}`}
                  className="flex gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/30"
                >
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
                    <Image src={d.image} alt={d.name} fill className="object-cover object-top" />
                  </div>
                  <div>
                    <p className="font-heading text-xl">{d.name}</p>
                    <p className="text-sm text-muted-foreground">{d.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {d.city}, {d.country}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-14 font-heading text-3xl">Treatment cost on this campus</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {pathways.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/costs/${t.slug}`}
                  className="block rounded-xl border border-border bg-card p-6 hover:border-primary/30"
                >
                  <p className="font-heading text-2xl">{t.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Partner range {t.partnerRange}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

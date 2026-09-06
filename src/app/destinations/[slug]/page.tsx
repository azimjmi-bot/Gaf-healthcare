import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/page-shell";
import {
  destinations,
  getDestination,
  hospitalsForDestination,
  treatmentsForDestination,
} from "@/lib/data";
import type { Metadata } from "next";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  return { title: d ? `${d.city}` : "Destination" };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();
  const localTreatments = treatmentsForDestination(d.slug);
  const localHospitals = hospitalsForDestination(d.slug);

  return (
    <>
      <section className="relative h-[70vh] min-h-[28rem] bg-ink text-ivory">
        <Image src={d.image} alt={d.city} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-12 md:px-8">
          <p className="eyebrow text-gold">{d.country}</p>
          <h1 className="mt-3 font-heading text-5xl md:text-7xl">{d.city}</h1>
          <p className="mt-4 max-w-2xl text-ivory/80">{d.headline}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-7">
          <p className="text-lg leading-relaxed text-muted-foreground">{d.summary}</p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Stay</dt>
              <dd className="mt-1 font-heading text-2xl">{d.stay}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Languages</dt>
              <dd className="mt-1 font-heading text-2xl leading-snug">{d.language}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Recovery</dt>
              <dd className="mt-1 text-sm leading-relaxed">{d.recoveryNote}</dd>
            </div>
          </dl>
        </div>
        <aside className="md:col-span-5">
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="eyebrow">Next</p>
            <h2 className="mt-3 font-heading text-3xl">Open a {d.city} dossier</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We will match you to a campus, a surgeon, and a stay length — then
              you meet them on camera.
            </p>
            <Button asChild className="mt-6 h-11 rounded-full px-6">
              <Link href={`/consult?destination=${d.slug}`}>Request this city</Link>
            </Button>
          </div>
        </aside>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-heading text-3xl">Pathways here</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {localTreatments.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/treatments/${t.slug}`}
                  className="block rounded-xl border border-border bg-card p-6 hover:border-primary/30"
                >
                  <p className="font-heading text-2xl">{t.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{t.partnerRange}</p>
                </Link>
              </li>
            ))}
          </ul>
          {localHospitals.length > 0 ? (
            <>
              <h2 className="mt-14 font-heading text-3xl">Partner campus</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {localHospitals.map((h) => (
                  <div key={h.slug} className="overflow-hidden rounded-xl border border-border bg-card">
                    <div className="relative h-40">
                      <Image src={h.image} alt={h.name} fill className="object-cover" />
                    </div>
                    <div className="p-5">
                      <p className="text-xs tracking-[0.18em] uppercase text-gold">
                        {h.accreditation}
                      </p>
                      <p className="mt-1 font-heading text-2xl">{h.name}</p>
                      <p className="text-sm text-muted-foreground">{h.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

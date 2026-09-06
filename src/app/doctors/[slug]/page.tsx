import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/page-shell";
import {
  doctors,
  getDoctor,
  getHospital,
  getTreatment,
} from "@/lib/data";
import type { Metadata } from "next";

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getDoctor(slug);
  return { title: d ? d.name : "Doctor" };
}

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDoctor(slug);
  if (!d) notFound();
  const hospital = getHospital(d.hospitalSlug);
  const pathways = d.treatmentSlugs.map((s) => getTreatment(s)).filter(Boolean);

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-12 md:px-8 md:py-20">
          <div className="relative min-h-80 overflow-hidden rounded-2xl md:col-span-5">
            <Image src={d.image} alt={d.name} fill className="object-cover object-top" priority />
          </div>
          <div className="md:col-span-7">
            <p className="eyebrow">{d.specialty}</p>
            <h1 className="mt-3 font-heading text-5xl md:text-6xl">{d.name}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{d.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {d.city}, {d.country}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{d.bio}</p>
            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Practice</dt>
                <dd className="mt-1">
                  {hospital ? (
                    <Link href={`/hospitals/${hospital.slug}`} className="hover:underline">
                      {hospital.name}, {d.city}, {d.country}
                    </Link>
                  ) : (
                    <span>
                      {d.city}, {d.country}
                    </span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  Credentials
                </dt>
                <dd className="mt-1 text-sm">{d.credentials}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Experience</dt>
                <dd className="mt-1">{d.years}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Volume</dt>
                <dd className="mt-1">{d.cases}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Languages</dt>
                <dd className="mt-1">{d.languages}</dd>
              </div>
            </dl>
            <Button asChild className="mt-8 h-11 rounded-full px-6">
              <Link href={`/consult?doctor=${d.slug}`}>Request this doctor</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <h2 className="font-heading text-3xl">Procedures & cost</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {pathways.map((t) =>
            t ? (
              <li key={t.slug}>
                <Link
                  href={`/costs/${t.slug}`}
                  className="block rounded-xl border border-border bg-card p-6 hover:border-primary/30"
                >
                  <p className="font-heading text-2xl">{t.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Partner range {t.partnerRange} · US cash {t.usRange}
                  </p>
                </Link>
              </li>
            ) : null,
          )}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Star } from "lucide-react";
import { AccreditationSeals } from "@/components/accreditation-seals";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/page-shell";
import { doctors, doctorsForHospital, getDoctor, getHospital, getTreatment } from "@/lib/data";
import { breadcrumbJsonLd, doctorMetadata, physicianJsonLd } from "@/lib/seo";
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
  if (!d) return { title: "Doctor" };
  return doctorMetadata(d);
}

function ProfileList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-10">
      <h2 className="font-heading text-3xl">{title}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
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
  const colleagues = doctorsForHospital(d.hospitalSlug)
    .filter((x) => x.slug !== d.slug && x.specialtySlug === d.specialtySlug)
    .slice(0, 6);

  return (
    <>
      <JsonLd data={physicianJsonLd(d)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Doctors", path: "/doctors" },
          { name: d.specialty, path: `/doctors?specialty=${encodeURIComponent(d.specialty)}` },
          { name: d.city, path: `/doctors?destination=India&city=${encodeURIComponent(d.city)}` },
          { name: d.name, path: `/doctors/${d.slug}` },
        ])}
      />
      <section className="relative overflow-hidden bg-ink text-ivory">
        <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <div className="flex flex-wrap gap-2">
            {d.featured ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-medium text-ink">
                <Star className="size-3 fill-amber-500 text-amber-500" /> Featured
              </span>
            ) : null}
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs">{d.specialty}</span>
            {d.experience ? (
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs">{d.experience}</span>
            ) : null}
          </div>
          <h1 className="mt-5 font-heading text-4xl md:text-6xl">{d.name}</h1>
          {d.qualifications ? (
            <p className="mt-3 text-sm tracking-wide text-ivory/70">{d.qualifications}</p>
          ) : null}
          <p className="mt-2 text-lg text-ivory/85">{d.title}</p>
          {hospital ? (
            <Link
              href={`/hospitals/${hospital.slug}`}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
            >
              {hospital.name}, {d.city}
              <ArrowRight className="size-4" />
            </Link>
          ) : (
            <p className="mt-5 text-sm text-ivory/70">
              {d.city}, {d.country}
            </p>
          )}
          <Button asChild className="mt-8 h-12 rounded-full bg-gold px-8 text-ink hover:bg-gold/90">
            <Link href={`/consult?doctor=${d.slug}`}>Book consultation</Link>
          </Button>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
        <h3 className="text-sm tracking-[0.2em] text-gold uppercase">About {d.name}</h3>
        <h2 className="mt-3 font-heading text-3xl">Professional summary</h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{d.bio}</p>
        {hospital ? (
          <div className="mt-10 rounded-2xl border border-border bg-card p-6">
            <p className="text-xs tracking-[0.18em] uppercase text-gold">Practises at</p>
            <Link href={`/hospitals/${hospital.slug}`} className="mt-2 block font-heading text-3xl hover:text-gold">
              {hospital.name}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              {hospital.city}, {hospital.country}
            </p>
            <div className="mt-3">
              <AccreditationSeals accreditation={hospital.accreditation} size="sm" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{hospital.bio}</p>
            <Link
              href={`/hospitals/${hospital.slug}`}
              className="mt-4 inline-block text-sm underline-offset-4 hover:underline"
            >
              Hospital profile and full faculty
            </Link>
          </div>
        ) : null}
        <ProfileList title="Specializations" items={d.specializations} />
        <ProfileList title="Procedures & Expertise" items={d.proceduresExpertise} />
        <ProfileList title="Education & Qualifications" items={d.education} />
        <ProfileList title="Hospital Affiliations" items={d.affiliations} />
        <ProfileList title="Professional Memberships" items={d.memberships} />
        <ProfileList title="Awards & Recognition" items={d.awards} />
        <ProfileList title="Research & Publications" items={d.research} />
      </article>

      {pathways.length > 0 ? (
        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <h2 className="font-heading text-3xl">Treatment cost for related procedures</h2>
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
          </div>
        </section>
      ) : null}

      {colleagues.length > 0 ? (
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="font-heading text-3xl">
              Other {d.specialty.toLowerCase().replace(" oncology", " oncologists")} at{" "}
              {hospital?.name ?? "this campus"}
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {colleagues.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/doctors/${c.slug}`}
                    className="block rounded-xl border border-border bg-card p-6 hover:border-primary/30"
                  >
                    <p className="font-heading text-2xl">{c.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{c.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{c.qualifications}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <CtaBand />
    </>
  );
}

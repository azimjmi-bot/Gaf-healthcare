import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { costPath, doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import { getCostGuide } from "@/lib/cost-guides";
import {
  doctorsForTreatment,
  getHospital,
  getTreatment,
  treatments,
} from "@/lib/data";
import { breadcrumbJsonLd, treatmentMetadata } from "@/lib/seo";
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
  if (!t) return { title: "Treatment Cost" };
  const guide = getCostGuide(t.slug);
  const base = treatmentMetadata(t);
  if (guide) {
    return { ...base, title: guide.title, description: guide.description };
  }
  return base;
}

export default async function CostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) notFound();
  const guide = getCostGuide(t.slug);
  const campuses = t.hospitalSlugs.map((s) => getHospital(s)).filter(Boolean);
  const faculty = doctorsForTreatment(t.slug);
  const featuredFaculty = [...faculty]
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 8);
  const related = treatments
    .filter((x) => x.slug !== t.slug && x.specialtySlugs.some((s) => t.specialtySlugs.includes(s)))
    .slice(0, 6);
  const consultantNoun = [
    t.specialtySlugs.includes("radiation-oncology") ? "radiation oncologists" : "",
    t.specialtySlugs.includes("surgical-oncology") ? "surgical oncologists" : "",
    t.specialtySlugs.includes("medical-oncology") ? "medical oncologists" : "",
    t.specialtySlugs.includes("hematology") ? "hematologists" : "",
    t.specialtySlugs.includes("pediatric-hematology") ? "pediatric hematologists" : "",
    t.specialtySlugs.includes("cardiac-surgery") ? "cardiac surgeons" : "",
    t.specialtySlugs.includes("pediatric-cardiac-surgery") ? "pediatric cardiac surgeons" : "",
    t.specialtySlugs.includes("cardiology") ? "cardiologists" : "",
    t.specialtySlugs.includes("bariatric-surgery") ? "bariatric surgeons" : "",
    t.specialtySlugs.includes("cosmetic-surgery") ? "cosmetic surgeons" : "",
    t.specialtySlugs.includes("ent") ? "ENT surgeons" : "",
    t.specialtySlugs.includes("gastroenterology") ? "gastroenterologists" : "",
    t.specialtySlugs.includes("surgical-gastroenterology") ? "surgical gastroenterologists" : "",
  ]
    .filter(Boolean)
    .join(" and ");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          name: t.name,
          procedureType: t.category,
          url: `https://velora.health/costs/${t.slug}`,
          description: t.summary,
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Treatment Cost", path: "/costs" },
          { name: t.category, path: `/costs?specialty=${encodeURIComponent(t.category)}` },
          { name: t.name, path: `/costs/${t.slug}` },
        ])}
      />
      <section className="relative h-[50vh] min-h-[22rem] bg-ink text-ivory">
        <Image src={t.image} alt={t.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-12 md:px-8">
          <p className="eyebrow text-gold">Treatment cost · {t.category}</p>
          <h1 className="mt-3 max-w-5xl font-heading text-4xl md:text-6xl">
            {guide ? guide.title : t.name}
          </h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-7">
          {guide ? (
            <guide.Guide />
          ) : (
            <>
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
            </>
          )}
        </div>
        <aside className="md:col-span-5 space-y-6 md:sticky md:top-28 md:self-start">
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
                  India planning range
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
            <p className="mt-4 text-xs text-muted-foreground">
              Not a quote. {t.specialtySlug === "surgical-gastroenterology"
                ? "Graft, reconstruction or resection plane are set after records review."
                : t.specialtySlug === "gastroenterology"
                ? "Indication, stent or histology are set after records review."
                : t.specialtySlug === "ent"
                ? "Imaging, implant or reconstruction are set after records review."
                : t.specialtySlug === "cosmetic-surgery"
                ? "Photographs, implant or graft plan are set after records review."
                : t.specialtySlug === "bariatric-surgery"
                ? "BMI, procedure and leak protocol are set after records review."
                : t.specialtySlug === "cardiology"
                ? "Access, device and whether PCI follows are set after records review."
                : t.specialtySlug === "pediatric-cardiac-surgery"
                ? "Anatomy, stage and a paediatric cardiac ICU are set after records review."
                : t.specialtySlug === "cardiac-surgery"
                ? "Conduit, prosthesis and approach are set after records review."
                : t.specialtySlug === "pediatric-hematology"
                ? "Paediatric donor, conditioning and graft source are set after records review."
                : t.specialtySlug === "hematology"
                ? "Donor, conditioning and graft source are set after records review."
                : t.specialtySlug === "medical-oncology"
                ? "Regimen and cycles are set after records review."
                : t.specialtySlug === "surgical-oncology"
                  ? "Approach and reconstruction are set after records review."
                  : "Technique and fractions are set after records review."}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 text-sm">
            <p className="text-xs tracking-[0.18em] uppercase text-gold">Related</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href={doctorsPath({ destination: "India", procedure: t.name })}>
                  Doctors for {t.name}
                </Link>
              </li>
              <li>
                <Link href={hospitalsPath({ destination: "India", procedure: t.name })}>
                  Hospitals offering this technique
                </Link>
              </li>
              <li>
                <Link href="/costs">All treatment costs</Link>
              </li>
              {guide?.relatedBlog ? (
                <li>
                  <Link href={guide.relatedBlog.href}>{guide.relatedBlog.label}</Link>
                </li>
              ) : null}
            </ul>
          </div>
        </aside>
      </section>
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-heading text-3xl">
              {consultantNoun.charAt(0).toUpperCase() + consultantNoun.slice(1)}
            </h2>
            <Link
              href={doctorsPath({ destination: "India", procedure: t.name })}
              className="text-sm underline-offset-4 hover:underline"
            >
              All {faculty.length} doctors
            </Link>
          </div>
          {featuredFaculty.length === 0 ? (
            <p className="mt-6 text-muted-foreground">
              Named {consultantNoun} for this
              procedure are being matched. Request a dossier and we will advise.
            </p>
          ) : (
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {featuredFaculty.map((d) => (
              <li key={d.slug} className="rounded-xl border border-border bg-card p-6 hover:border-primary/30">
                <Link href={`/doctors/${d.slug}`} className="block">
                  <p className="font-heading text-2xl">{d.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{d.title}</p>
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  <Link href={`/hospitals/${d.hospitalSlug}`} className="underline-offset-4 hover:underline">
                    {d.hospitalName}
                  </Link>
                  {" · "}
                  {d.city}
                </p>
              </li>
            ))}
          </ul>
          )}
          <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-heading text-3xl">Hospitals</h2>
            <Link
              href={hospitalsPath({ destination: "India", procedure: t.name })}
              className="text-sm underline-offset-4 hover:underline"
            >
              All campuses
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {campuses.slice(0, 12).map((h) =>
              h ? (
                <li key={h.slug}>
                  <Link
                    href={`/hospitals/${h.slug}`}
                    className="block rounded-xl border border-border bg-card p-6 hover:border-primary/30"
                  >
                    <p className="font-heading text-2xl">{h.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {h.city}, {h.country} · {h.accreditation}
                    </p>
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
          <h2 className="mt-14 font-heading text-3xl">Related procedures</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={costPath(r.name)}
                  className="block rounded-xl border border-border bg-card p-6 hover:border-primary/30"
                >
                  <p className="font-heading text-2xl">{r.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Partner {r.partnerRange} · Stay {r.stay}
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

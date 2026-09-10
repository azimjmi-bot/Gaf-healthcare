import Link from "next/link";
import { notFound } from "next/navigation";
import { AccreditationSeals } from "@/components/accreditation-seals";
import { DoctorProfileHero } from "@/components/doctor-profile-hero";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/page-shell";
import { doctorsForHospital, getDoctor, getHospital, getTreatment } from "@/lib/data";
import { displayBio } from "@/lib/hospital-profile";
import { doctorsPath } from "@/lib/catalog-links";
import { breadcrumbJsonLd, doctorMetadata, physicianJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export async function doctorProfileMetadata(slug: string): Promise<Metadata> {
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

export async function DoctorProfile({ slug }: { slug: string }) {
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
          { name: d.specialty, path: doctorsPath({ destination: "India", specialty: d.specialty }) },
          { name: d.city, path: doctorsPath({ destination: "India", city: d.city }) },
          { name: d.name, path: `/doctors/${d.slug}` },
        ])}
      />
      <DoctorProfileHero doctor={d} hospital={hospital} />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-5 md:px-8 md:py-20">
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
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{displayBio(hospital.bio)}</p>
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
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-16">
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

import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DoctorCard } from "@/components/doctor-card";
import { CtaBand } from "@/components/page-shell";
import { getTreatment, treatmentMatchesSpecialty, type Treatment } from "@/lib/data";
import { JsonLd } from "@/components/json-ld";
import { doctorsForHospital } from "@/lib/doctors";
import { getHospital, hospitals, hospitalsInCity } from "@/lib/hospitals";
import { breadcrumbJsonLd, hospitalJsonLd, hospitalMetadata } from "@/lib/seo";
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
  if (!h) return { title: "Hospital" };
  return hospitalMetadata(h);
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
  const radiationFaculty = faculty.filter((d) => d.specialtySlug === "radiation-oncology");
  const surgicalFaculty = faculty.filter((d) => d.specialtySlug === "surgical-oncology");
  const medicalFaculty = faculty.filter((d) => d.specialtySlug === "medical-oncology");
  const hematologyFaculty = faculty.filter((d) => d.specialtySlug === "hematology");
  const pediatricHematologyFaculty = faculty.filter((d) => d.specialtySlug === "pediatric-hematology");
  const cardiacFaculty = faculty.filter((d) => d.specialtySlug === "cardiac-surgery");
  const pathways = h.procedureSlugs
    .map((s) => getTreatment(s))
    .filter((t): t is Treatment => Boolean(t));
  const radiationPathways = pathways.filter((t) => treatmentMatchesSpecialty(t, "radiation-oncology"));
  const surgicalPathways = pathways.filter((t) => treatmentMatchesSpecialty(t, "surgical-oncology"));
  const medicalPathways = pathways.filter((t) => treatmentMatchesSpecialty(t, "medical-oncology"));
  const hematologyPathways = pathways.filter((t) => treatmentMatchesSpecialty(t, "hematology"));
  const pediatricHematologyPathways = pathways.filter((t) => treatmentMatchesSpecialty(t, "pediatric-hematology"));
  const cardiacPathways = pathways.filter((t) => treatmentMatchesSpecialty(t, "cardiac-surgery"));
  const nearby = hospitalsInCity(h.citySlug).filter((x) => x.slug !== h.slug);

  return (
    <>
      <JsonLd data={hospitalJsonLd(h)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Hospitals", path: "/hospitals" },
          { name: h.city, path: `/hospitals?destination=India&city=${encodeURIComponent(h.city)}` },
          { name: h.name, path: `/hospitals/${h.slug}` },
        ])}
      />
      <section className="border-b border-border bg-ink text-ivory">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <p className="eyebrow text-gold">{h.accreditation}</p>
          <h1 className="mt-3 font-heading text-5xl md:text-6xl">{h.name}</h1>
          <p className="mt-3 text-ivory/80">
            {h.city}, {h.country}
            {h.established ? ` · Established ${h.established}` : ""}
          </p>
          <p className="mt-2 text-sm text-ivory/60">{h.specialties.join(" · ")}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-7">
          <h2 className="font-heading text-3xl">About this campus</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{h.bio}</p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Specialties</dt>
              <dd className="mt-1 flex flex-col gap-1">
                {h.specialties.map((name) => (
                  <Link
                    key={name}
                    href={`/hospitals?specialty=${encodeURIComponent(name)}`}
                    className="hover:underline"
                  >
                    {name}
                  </Link>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">City</dt>
              <dd className="mt-1">
                <Link
                  href={`/hospitals?destination=${encodeURIComponent(h.country)}&city=${encodeURIComponent(h.city)}`}
                  className="hover:underline"
                >
                  {h.city}, {h.country}
                </Link>
              </dd>
            </div>
            {h.beds ? (
              <div>
                <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Beds</dt>
                <dd className="mt-1">{h.beds}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Languages</dt>
              <dd className="mt-1">{h.languages}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Critical care</dt>
              <dd className="mt-1">{h.icu}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Accreditation</dt>
              <dd className="mt-1">{h.accreditation}</dd>
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
            {faculty[0] ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Or go straight to{" "}
                <Link href={`/doctors/${faculty[0].slug}`} className="underline-offset-4 hover:underline">
                  {faculty[0].name}
                </Link>
                .
              </p>
            ) : null}
          </div>
        </aside>
      </section>

      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Faculty</p>
              <h2 className="mt-2 font-heading text-3xl">Named consultants at {h.name}</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Profiles sit under country, city, specialty, and procedure — the same keys later pSEO routes will use.
              </p>
            </div>
            <Link
              href={`/doctors?destination=${encodeURIComponent(h.country)}&city=${encodeURIComponent(h.city)}`}
              className="text-sm underline-offset-4 hover:underline"
            >
              All doctors in {h.city}
            </Link>
          </div>
          {faculty.length === 0 ? (
            <p className="mt-8 text-muted-foreground">
              Named consultants for this campus are being matched. Request a dossier and we will advise.
            </p>
          ) : (
            <>
              {radiationFaculty.length > 0 ? (
                <div className="mt-10">
                  <h3 className="font-heading text-2xl">Radiation oncologists</h3>
                  <div className="mt-6 grid gap-6">
                    {radiationFaculty.map((d) => (
                      <DoctorCard key={d.slug} doctor={d} />
                    ))}
                  </div>
                </div>
              ) : null}
              {surgicalFaculty.length > 0 ? (
                <div className="mt-10">
                  <h3 className="font-heading text-2xl">Surgical oncologists</h3>
                  <div className="mt-6 grid gap-6">
                    {surgicalFaculty.map((d) => (
                      <DoctorCard key={d.slug} doctor={d} />
                    ))}
                  </div>
                </div>
              ) : null}
              {medicalFaculty.length > 0 ? (
                <div className="mt-10">
                  <h3 className="font-heading text-2xl">Medical oncologists</h3>
                  <div className="mt-6 grid gap-6">
                    {medicalFaculty.map((d) => (
                      <DoctorCard key={d.slug} doctor={d} />
                    ))}
                  </div>
                </div>
              ) : null}
              {hematologyFaculty.length > 0 ? (
                <div className="mt-10">
                  <h3 className="font-heading text-2xl">Hematologists</h3>
                  <div className="mt-6 grid gap-6">
                    {hematologyFaculty.map((d) => (
                      <DoctorCard key={d.slug} doctor={d} />
                    ))}
                  </div>
                </div>
              ) : null}
              {pediatricHematologyFaculty.length > 0 ? (
                <div className="mt-10">
                  <h3 className="font-heading text-2xl">Pediatric hematologists</h3>
                  <div className="mt-6 grid gap-6">
                    {pediatricHematologyFaculty.map((d) => (
                      <DoctorCard key={d.slug} doctor={d} />
                    ))}
                  </div>
                </div>
              ) : null}
              {cardiacFaculty.length > 0 ? (
                <div className="mt-10">
                  <h3 className="font-heading text-2xl">Cardiac surgeons</h3>
                  <div className="mt-6 grid gap-6">
                    {cardiacFaculty.map((d) => (
                      <DoctorCard key={d.slug} doctor={d} />
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <h2 className="font-heading text-3xl">Procedures on this campus</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Radiation, surgical, medical-oncology, haematology, paediatric-haematology and cardiac-surgery pathways this house can quote — tagged for later pSEO.
        </p>
        {radiationPathways.length > 0 ? (
          <>
            <h3 className="mt-10 font-heading text-2xl">Radiation Oncology</h3>
            <ProcedureGrid hospital={h} rows={radiationPathways} />
          </>
        ) : null}
        {surgicalPathways.length > 0 ? (
          <>
            <h3 className="mt-10 font-heading text-2xl">Surgical Oncology</h3>
            <ProcedureGrid hospital={h} rows={surgicalPathways} />
          </>
        ) : null}
        {medicalPathways.length > 0 ? (
          <>
            <h3 className="mt-10 font-heading text-2xl">Medical Oncology</h3>
            <ProcedureGrid hospital={h} rows={medicalPathways} />
          </>
        ) : null}
        {hematologyPathways.length > 0 ? (
          <>
            <h3 className="mt-10 font-heading text-2xl">Hematology</h3>
            <ProcedureGrid hospital={h} rows={hematologyPathways} />
          </>
        ) : null}
        {pediatricHematologyPathways.length > 0 ? (
          <>
            <h3 className="mt-10 font-heading text-2xl">Pediatric Hematology</h3>
            <ProcedureGrid hospital={h} rows={pediatricHematologyPathways} />
          </>
        ) : null}
        {cardiacPathways.length > 0 ? (
          <>
            <h3 className="mt-10 font-heading text-2xl">Cardiac Surgery</h3>
            <ProcedureGrid hospital={h} rows={cardiacPathways} />
          </>
        ) : null}
      </section>

      {nearby.length > 0 ? (
        <section className="border-t border-border bg-ivory py-16">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="font-heading text-3xl">Other campuses in {h.city}</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`/hospitals/${n.slug}`}
                    className="block rounded-xl border border-border bg-card p-6 hover:border-primary/30"
                  >
                    <p className="font-heading text-2xl">{n.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{n.accreditation}</p>
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

function ProcedureGrid({
  hospital,
  rows,
}: {
  hospital: { country: string; city: string };
  rows: Treatment[];
}) {
  return (
    <ul className="mt-6 grid gap-4 md:grid-cols-2">
      {rows.map((t) => (
        <li key={t.slug}>
          <div className="rounded-xl border border-border bg-card p-6">
            <Link href={`/costs/${t.slug}`} className="font-heading text-2xl hover:text-gold">
              {t.name}
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Partner range {t.partnerRange} · US cash {t.usRange}
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link href={`/costs/${t.slug}`} className="underline-offset-4 hover:underline">
                Treatment cost
              </Link>
              <Link
                href={`/doctors?procedure=${encodeURIComponent(t.name)}&destination=${encodeURIComponent(hospital.country)}&city=${encodeURIComponent(hospital.city)}`}
                className="underline-offset-4 hover:underline"
              >
                Doctors for this procedure
              </Link>
              <Link
                href={`/hospitals?procedure=${encodeURIComponent(t.name)}`}
                className="underline-offset-4 hover:underline"
              >
                Other hospitals
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

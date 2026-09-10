import { LocaleLink as Link } from "@/components/locale-link";
import { DoctorCard } from "@/components/doctor-card";
import { CtaBand } from "@/components/page-shell";
import { loadHospitalCampus, requireHospitalCampus } from "@/lib/hospital-campus";
import { SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export async function hospitalDoctorsMetadata(slug: string): Promise<Metadata> {
  const data = loadHospitalCampus(slug);
  if (!data) return { title: "Hospital doctors" };
  const title = `Doctors at ${data.hospital.name}`;
  const description = `Named consultants at ${data.hospital.name} in ${data.hospital.city}, India. Meet them on camera before you travel.`;
  return { title, description, alternates: { canonical: `${SITE_URL}/hospitals/${slug}/doctors` } };
}

export async function HospitalDoctors({ slug }: { slug: string }) {
  const { hospital, faculty, groups } = requireHospitalCampus(slug);
  const facultyGroups = groups.filter((g) => g.doctors.length > 0);

  return (
    <div className="hospital-profile">
      <section className="hp-section">
        <div className="hp-wrap">
          <nav className="hp-crumbs" aria-label="Breadcrumb">
            <Link href="/hospitals">Hospitals</Link>
            <span>/</span>
            <Link href={`/hospitals/${hospital.slug}`}>{hospital.name}</Link>
            <span>/</span>
            <span aria-current="page">Doctors</span>
          </nav>
          <p className="eyebrow mt-8">Faculty</p>
          <h1 className="hp-hero__title">Named consultants at {hospital.name}</h1>
          <p className="hp-prose">
            {faculty.length
              ? `${faculty.length} listed ${faculty.length === 1 ? "doctor" : "doctors"} on this campus. Meet them on camera first.`
              : "Named consultants for this campus are being matched. Request a dossier and we will advise."}
          </p>
          <p className="mt-4">
            <Link href={`/hospitals/${hospital.slug}`} className="hp-textlink">
              Back to the hospital profile
            </Link>
          </p>
          {facultyGroups.map((g) => (
            <div key={g.slug} id={`doctors-${g.slug}`} className="hp-faculty scroll-mt-32">
              <h3>{g.heading}</h3>
              <div className="mt-6 grid gap-6">
                {g.doctors.map((d) => (
                  <DoctorCard key={d.slug} doctor={d} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </div>
  );
}

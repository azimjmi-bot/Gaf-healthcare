import { LocaleLink as Link } from "@/components/locale-link";
import { CtaBand } from "@/components/page-shell";
import { doctorsPath } from "@/lib/catalog-links";
import { loadHospitalCampus, requireHospitalCampus } from "@/lib/hospital-campus";
import { SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export async function hospitalProceduresMetadata(slug: string): Promise<Metadata> {
  const data = loadHospitalCampus(slug);
  if (!data) return { title: "Hospital procedures" };
  const title = `Procedures at ${data.hospital.name}`;
  const description = `Planning ranges for procedures ${data.hospital.name} in ${data.hospital.city}, India can quote. Not quotes — a named consultant confirms the protocol after records.`;
  return { title, description, alternates: { canonical: `${SITE_URL}/hospitals/${slug}/procedures` } };
}

export async function HospitalProcedures({ slug }: { slug: string }) {
  const { hospital, groups } = requireHospitalCampus(slug);
  const procedureGroups = groups.filter((g) => g.treatments.length > 0);

  return (
    <div className="hospital-profile">
      <section className="hp-section">
        <div className="hp-wrap">
          <nav className="hp-crumbs" aria-label="Breadcrumb">
            <Link href="/hospitals">Hospitals</Link>
            <span>/</span>
            <Link href={`/hospitals/${hospital.slug}`}>{hospital.name}</Link>
            <span>/</span>
            <span aria-current="page">Procedures</span>
          </nav>
          <p className="eyebrow mt-8">Planning ranges</p>
          <h1 className="hp-hero__title">All procedures at {hospital.name}</h1>
          <p className="hp-prose">
            USD figures are planning ranges, not quotes. Open a sheet for the US cash-pay comparison, then meet the
            consultant on camera before anyone sets a date.
          </p>
          <p className="mt-4">
            <Link href={`/hospitals/${hospital.slug}`} className="hp-textlink">
              Back to the hospital profile
            </Link>
          </p>
          {procedureGroups.length === 0 ? (
            <p className="mt-8 text-muted-foreground">
              Procedure sheets for this campus are being filed. A coordinator can still advise from records.
            </p>
          ) : (
            procedureGroups.map((g) => (
              <div key={g.slug} className="hp-proc-block">
                <h4>{g.name}</h4>
                <ul>
                  {g.treatments.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/costs/${t.slug}`}>{t.name}</Link>
                      <span>
                        Partner range {t.partnerRange} · US cash {t.usRange}
                      </span>
                      <Link
                        href={doctorsPath({
                          destination: hospital.country,
                          city: hospital.city,
                          procedure: t.name,
                        })}
                      >
                        Doctors
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </section>
      <CtaBand />
    </div>
  );
}

import { LocaleLink as Link } from "@/components/locale-link";
import { DoctorCard } from "@/components/doctor-card";
import { CtaBand } from "@/components/page-shell";
import { loadHospitalCampus, requireHospitalCampus } from "@/lib/hospital-campus";
import { LOCALES } from "@/lib/i18n/languages";
import { facultyHeadingLocalized } from "@/lib/i18n/hospital-copy";
import { interpolate } from "@/lib/i18n/messages";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { getRequestLocale } from "@/lib/i18n/request";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { uiCatalogFor } from "@/lib/i18n/ui-catalogs";
import type { Metadata } from "next";

export async function hospitalDoctorsMetadata(slug: string): Promise<Metadata> {
  const locale = await getRequestLocale();
  const data = loadHospitalCampus(slug, locale);
  if (!data) return { title: "Hospital doctors" };
  const t = uiCatalogFor(locale);
  const city = taxonomyLabel(data.hospital.city, locale);
  const title = interpolate(t["hp.metaDoctorsTitle"], { name: data.hospital.name });
  const description = interpolate(t["hp.metaDoctorsDesc"], { name: data.hospital.name, city });
  return withLocaleMetadata({ title, description }, `/hospitals/${slug}/doctors`, locale, LOCALES);
}

export async function HospitalDoctors({ slug }: { slug: string }) {
  const locale = await getRequestLocale();
  const t = uiCatalogFor(locale);
  const { hospital, faculty, groups } = requireHospitalCampus(slug, locale);
  const facultyGroups = groups.filter((g) => g.doctors.length > 0);

  return (
    <div className="hospital-profile">
      <section className="hp-section">
        <div className="hp-wrap">
          <nav className="hp-crumbs" aria-label={t["hp.crumbAria"]}>
            <Link href="/hospitals">{t["hp.hospitals"]}</Link>
            <span>/</span>
            <Link href={`/hospitals/${hospital.slug}`}>{hospital.name}</Link>
            <span>/</span>
            <span aria-current="page">{t["hp.nav.doctors"]}</span>
          </nav>
          <p className="eyebrow mt-8">{t["hp.faculty"]}</p>
          <h1 className="hp-hero__title">{interpolate(t["hp.facultyTitle"], { name: hospital.name })}</h1>
          <p className="hp-prose">
            {faculty.length
              ? interpolate(t["hp.facultyCount"], {
                  count: faculty.length,
                  noun: faculty.length === 1 ? t["hp.doctorOne"] : t["hp.doctorMany"],
                })
              : t["hp.facultyEmpty"]}
          </p>
          <p className="mt-4">
            <Link href={`/hospitals/${hospital.slug}`} className="hp-textlink">
              {t["hp.backHospital"]}
            </Link>
          </p>
          {facultyGroups.map((g) => (
            <div key={g.slug} id={`doctors-${g.slug}`} className="hp-faculty scroll-mt-32">
              <h3>{facultyHeadingLocalized(g.slug, g.doctors.length, locale)}</h3>
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

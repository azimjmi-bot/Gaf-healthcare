import { LocaleLink as Link } from "@/components/locale-link";
import { CtaBand } from "@/components/page-shell";
import { doctorsPath } from "@/lib/catalog-links";
import { loadHospitalCampus, requireHospitalCampus } from "@/lib/hospital-campus";
import { LOCALES } from "@/lib/i18n/languages";
import { interpolate } from "@/lib/i18n/messages";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { getRequestLocale } from "@/lib/i18n/request";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { uiCatalogFor } from "@/lib/i18n/ui-catalogs";
import type { Metadata } from "next";

export async function hospitalProceduresMetadata(slug: string): Promise<Metadata> {
  const locale = await getRequestLocale();
  const data = loadHospitalCampus(slug, locale);
  if (!data) return { title: "Hospital procedures" };
  const t = uiCatalogFor(locale);
  const city = taxonomyLabel(data.hospital.city, locale);
  const title = interpolate(t["hp.metaProcsTitle"], { name: data.hospital.name });
  const description = interpolate(t["hp.metaProcsDesc"], { name: data.hospital.name, city });
  return withLocaleMetadata({ title, description }, `/hospitals/${slug}/procedures`, locale, LOCALES);
}

export async function HospitalProcedures({ slug }: { slug: string }) {
  const locale = await getRequestLocale();
  const t = uiCatalogFor(locale);
  const { hospital, groups } = requireHospitalCampus(slug, locale);
  const procedureGroups = groups.filter((g) => g.treatments.length > 0);

  return (
    <div className="hospital-profile">
      <section className="hp-section">
        <div className="hp-wrap">
          <nav className="hp-crumbs" aria-label={t["hp.crumbAria"]}>
            <Link href="/hospitals">{t["hp.hospitals"]}</Link>
            <span>/</span>
            <Link href={`/hospitals/${hospital.slug}`}>{hospital.name}</Link>
            <span>/</span>
            <span aria-current="page">{t["hp.nav.procedures"]}</span>
          </nav>
          <p className="eyebrow mt-8">{t["hp.planningRanges"]}</p>
          <h1 className="hp-hero__title">{interpolate(t["hp.procTitle"], { name: hospital.name })}</h1>
          <p className="hp-prose">{t["hp.procLede"]}</p>
          <p className="mt-4">
            <Link href={`/hospitals/${hospital.slug}`} className="hp-textlink">
              {t["hp.backHospital"]}
            </Link>
          </p>
          {procedureGroups.length === 0 ? (
            <p className="mt-8 text-muted-foreground">{t["hp.procEmpty"]}</p>
          ) : (
            procedureGroups.map((g) => (
              <div key={g.slug} className="hp-proc-block">
                <h4>{taxonomyLabel(g.name, locale)}</h4>
                <ul>
                  {g.treatments.map((row) => (
                    <li key={row.slug}>
                      <Link href={`/costs/${row.slug}`}>{taxonomyLabel(row.name, locale)}</Link>
                      <span>
                        {interpolate(t["hp.partnerUs"], { partner: row.partnerRange, us: row.usRange })}
                      </span>
                      <Link
                        href={doctorsPath({
                          destination: hospital.country,
                          city: hospital.city,
                          procedure: row.name,
                        })}
                      >
                        {t["hp.doctorsLink"]}
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

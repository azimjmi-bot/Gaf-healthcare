import { LocaleLink as Link } from "@/components/locale-link";
import { notFound } from "next/navigation";
import { HospitalProfileView } from "@/components/hospital-profile-view";
import { JsonLd } from "@/components/json-ld";
import {
  getHospital,
  getTreatment,
  hospitalsInCity,
  type Treatment,
} from "@/lib/data";
import { doctorsForHospitalLocale } from "@/lib/locale-catalog";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { hospitalsPath } from "@/lib/catalog-links";
import { breadcrumbJsonLd, hospitalJsonLd } from "@/lib/seo";
import { hospitalPageMetadata } from "@/lib/i18n/page-meta";
import { localizeHospital } from "@/lib/i18n/localize";
import { getRequestLocale } from "@/lib/i18n/request";
import type { Metadata } from "next";

export async function hospitalProfileMetadata(slug: string): Promise<Metadata> {
  return hospitalPageMetadata(slug);
}

export async function HospitalProfile({ slug }: { slug: string }) {
  const source = getHospital(slug);
  if (!source) notFound();
  const locale = await getRequestLocale();
  const h = await localizeHospital(source, locale);
  const faculty = doctorsForHospitalLocale(h.slug, locale);
  const pathways = h.procedureSlugs
    .map((s) => getTreatment(s))
    .filter((t): t is Treatment => Boolean(t));
  const nearby = hospitalsInCity(h.citySlug).filter((x) => x.slug !== h.slug);

  return (
    <>
      <JsonLd data={hospitalJsonLd(h, locale)} />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: locale === "ar" ? "المستشفيات" : "Hospitals", path: "/hospitals" },
            { name: taxonomyLabel(h.city, locale), path: hospitalsPath({ destination: "India", city: h.city }) },
            { name: h.name, path: `/hospitals/${h.slug}` },
          ],
          locale,
        )}
      />
      <HospitalProfileView hospital={h} faculty={faculty} pathways={pathways} nearby={nearby} locale={locale} />
    </>
  );
}

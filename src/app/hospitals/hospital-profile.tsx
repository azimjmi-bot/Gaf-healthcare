import { notFound } from "next/navigation";
import { HospitalProfileView } from "@/components/hospital-profile-view";
import { JsonLd } from "@/components/json-ld";
import { getTreatment, type Treatment } from "@/lib/data";
import {
  doctorsForHospitalLocale,
  getHospitalForLocale,
  hospitalsInCityLocale,
} from "@/lib/locale-catalog";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { hospitalsPath } from "@/lib/catalog-links";
import { breadcrumbJsonLd, hospitalJsonLd } from "@/lib/seo";
import { hospitalPageMetadata } from "@/lib/i18n/page-meta";
import { getRequestLocale } from "@/lib/i18n/request";
import type { Metadata } from "next";

export async function hospitalProfileMetadata(slug: string): Promise<Metadata> {
  return hospitalPageMetadata(slug);
}

export async function HospitalProfile({ slug }: { slug: string }) {
  const locale = await getRequestLocale();
  const h = getHospitalForLocale(slug, locale);
  if (!h) notFound();
  const faculty = doctorsForHospitalLocale(h.slug, locale);
  const pathways = h.procedureSlugs
    .map((s) => getTreatment(s))
    .filter((t): t is Treatment => Boolean(t));
  const nearby = hospitalsInCityLocale(h.citySlug, locale).filter((x) => x.slug !== h.slug);

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

import Link from "next/link";
import { notFound } from "next/navigation";
import { HospitalProfileView } from "@/components/hospital-profile-view";
import { JsonLd } from "@/components/json-ld";
import {
  doctorsForHospital,
  getHospital,
  getTreatment,
  hospitalsInCity,
  type Treatment,
} from "@/lib/data";
import { hospitalsPath } from "@/lib/catalog-links";
import { breadcrumbJsonLd, hospitalJsonLd, hospitalMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function hospitalProfileMetadata(slug: string): Promise<Metadata> {
  const h = getHospital(slug);
  if (!h) return { title: "Hospital" };
  return hospitalMetadata(h);
}

export async function HospitalProfile({ slug }: { slug: string }) {
  const h = getHospital(slug);
  if (!h) notFound();
  const faculty = doctorsForHospital(h.slug);
  const pathways = h.procedureSlugs
    .map((s) => getTreatment(s))
    .filter((t): t is Treatment => Boolean(t));
  const nearby = hospitalsInCity(h.citySlug).filter((x) => x.slug !== h.slug);

  return (
    <>
      <JsonLd data={hospitalJsonLd(h)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Hospitals", path: "/hospitals" },
          { name: h.city, path: hospitalsPath({ destination: "India", city: h.city }) },
          { name: h.name, path: `/hospitals/${h.slug}` },
        ])}
      />
      <HospitalProfileView hospital={h} faculty={faculty} pathways={pathways} nearby={nearby} />
    </>
  );
}

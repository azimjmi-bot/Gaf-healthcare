import Link from "next/link";
import { notFound } from "next/navigation";
import { HospitalProfileView } from "@/components/hospital-profile-view";
import { JsonLd } from "@/components/json-ld";
import { doctorsForHospital } from "@/lib/doctors";
import { getHospital, hospitals, hospitalsInCity } from "@/lib/hospitals";
import { getTreatment, type Treatment } from "@/lib/data";
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
          { name: h.city, path: `/hospitals?destination=India&city=${encodeURIComponent(h.city)}` },
          { name: h.name, path: `/hospitals/${h.slug}` },
        ])}
      />
      <HospitalProfileView hospital={h} faculty={faculty} pathways={pathways} nearby={nearby} />
    </>
  );
}

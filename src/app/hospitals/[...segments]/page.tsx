import { notFound } from "next/navigation";
import { HospitalsDirectory, hospitalsDirectoryMetadata } from "@/app/hospitals/directory";
import { HospitalDoctors, hospitalDoctorsMetadata } from "@/app/hospitals/hospital-doctors";
import { HospitalProcedures, hospitalProceduresMetadata } from "@/app/hospitals/hospital-procedures";
import { HospitalProfile, hospitalProfileMetadata } from "@/app/hospitals/hospital-profile";
import { canonicalizePrettyPath, readCatalogPage } from "@/lib/catalog-route";
import { hospitals } from "@/lib/data";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export function generateStaticParams() {
  return hospitals.flatMap((h) => [
    { segments: [h.slug] },
    { segments: [h.slug, "doctors"] },
    { segments: [h.slug, "procedures"] },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segments: string[] }>;
}): Promise<Metadata> {
  const { segments } = await params;
  const filter = parsePrettyCatalogSegments(segments);
  if (filter) return hospitalsDirectoryMetadata(filter);
  if (segments.length === 2 && segments[1] === "doctors") return hospitalDoctorsMetadata(segments[0]);
  if (segments.length === 2 && segments[1] === "procedures") return hospitalProceduresMetadata(segments[0]);
  if (segments.length === 1) return hospitalProfileMetadata(segments[0]);
  return { title: "Hospital" };
}

export default async function HospitalsCatchAllPage({
  params,
  searchParams,
}: {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { segments } = await params;
  const page = readCatalogPage(await searchParams);
  const filter = parsePrettyCatalogSegments(segments);
  if (filter) {
    canonicalizePrettyPath("/hospitals", segments, filter, page);
    return <HospitalsDirectory query={filter} page={page} />;
  }
  if (segments.length === 2 && segments[1] === "doctors") {
    return <HospitalDoctors slug={segments[0]} />;
  }
  if (segments.length === 2 && segments[1] === "procedures") {
    return <HospitalProcedures slug={segments[0]} />;
  }
  if (segments.length === 1) return <HospitalProfile slug={segments[0]} />;
  notFound();
}

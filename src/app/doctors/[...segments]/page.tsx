import { notFound } from "next/navigation";
import { DoctorsDirectory, doctorsDirectoryMetadata } from "@/app/doctors/directory";
import { DoctorProfile, doctorProfileMetadata } from "@/app/doctors/doctor-profile";
import { canonicalizePrettyPath, readCatalogPage } from "@/lib/catalog-route";
import { doctors } from "@/lib/data";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { getRequestLocale } from "@/lib/i18n/request";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export function generateStaticParams() {
  return doctors.map((d) => ({ segments: [d.slug] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segments: string[] }>;
}): Promise<Metadata> {
  const { segments } = await params;
  const filter = parsePrettyCatalogSegments(segments);
  if (filter) return doctorsDirectoryMetadata(filter);
  if (segments.length === 1) return doctorProfileMetadata(segments[0]);
  return { title: "Doctor" };
}

export default async function DoctorsCatchAllPage({
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
    canonicalizePrettyPath("/doctors", segments, filter, page, await getRequestLocale());
    return <DoctorsDirectory query={filter} page={page} />;
  }
  if (segments.length === 1) return <DoctorProfile slug={segments[0]} />;
  notFound();
}

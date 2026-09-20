import { notFound } from "next/navigation";
import { DoctorsDirectory, doctorsDirectoryMetadata } from "@/app/doctors/directory";
import { DoctorProfile, doctorProfileMetadata } from "@/app/doctors/doctor-profile";
import { canonicalizePrettyPath, readCatalogPage } from "@/lib/catalog-route";
import { doctors } from "@/lib/data";
import { parseDoctorListingExtras } from "@/lib/doctor-discovery";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { getRequestLocale } from "@/lib/i18n/request";
import { localePageIsRenderable } from "@/lib/i18n/locale-publication";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export function generateStaticParams() {
  return doctors.map((d) => ({ segments: [d.slug] }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { segments } = await params;
  const locale = await getRequestLocale();
  if (!localePageIsRenderable(locale, `/doctors/${segments.join("/")}`)) {
    return { robots: { index: false, follow: false } };
  }
  const raw = await searchParams;
  const filter = parsePrettyCatalogSegments(segments);
  if (filter) {
    return doctorsDirectoryMetadata(filter, parseDoctorListingExtras(raw), readCatalogPage(raw));
  }
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
  const locale = await getRequestLocale();
  if (!localePageIsRenderable(locale, `/doctors/${segments.join("/")}`)) notFound();
  const raw = await searchParams;
  const page = readCatalogPage(raw);
  const filter = parsePrettyCatalogSegments(segments);
  if (filter) {
    canonicalizePrettyPath("/doctors", segments, filter, page, locale);
    return <DoctorsDirectory query={filter} page={page} extras={parseDoctorListingExtras(raw)} />;
  }
  if (segments.length === 1) return <DoctorProfile slug={segments[0]} />;
  notFound();
}

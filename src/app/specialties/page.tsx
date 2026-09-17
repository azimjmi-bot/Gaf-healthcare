import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Building2, MapPin, Stethoscope } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { PseoTrust } from "@/components/pseo-trust";
import {
  getSpecialtyPage,
  listBaseSpecialtyPages,
} from "@/data/specialty-pages";
import { costsFilterPath } from "@/lib/catalog-links";
import { getRequestLocale } from "@/lib/i18n/request";
import { localePathIsPublished } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { absoluteUrl } from "@/lib/seo";
import {
  buildSpecialtyPageData,
  specialtyPageMeetsQualityThreshold,
} from "@/lib/specialty-page";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  if (!localePathIsPublished(locale, "/specialties")) {
    return { robots: { index: false, follow: false } };
  }
  return withLocaleMetadata(
    {
      title: "Medical Specialties in India",
      description:
        "Explore data-qualified specialty guides for India, including treatments, planning costs, connected doctors, hospitals and eligible city guides.",
      robots: locale === "en" ? undefined : { index: false, follow: true },
    },
    "/specialties",
    locale,
    ["en"],
  );
}

function publishedSpecialties() {
  return listBaseSpecialtyPages()
    .map((base) => getSpecialtyPage(base.countrySlug, base.specialtySlug))
    .filter((profile) => Boolean(profile?.allowIndex && profile.status === "published"))
    .map((profile) => (profile ? buildSpecialtyPageData(profile) : undefined))
    .filter(
      (data): data is NonNullable<typeof data> =>
        Boolean(data && specialtyPageMeetsQualityThreshold(data)),
    );
}

export default async function SpecialtiesPage() {
  const locale = await getRequestLocale();
  if (!localePathIsPublished(locale, "/specialties")) notFound();
  const specialties = publishedSpecialties();
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Published medical specialty guides",
    numberOfItems: specialties.length,
    itemListElement: specialties.map((data, index) => {
      const path = costsFilterPath({
        destination: data.country.name,
        specialty: data.specialty.name,
      });
      return {
        "@type": "ListItem",
        position: index + 1,
        name: `${data.specialty.name} in ${data.country.name}`,
        url: absoluteUrl(path),
      };
    }),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <PageIntro
        eyebrow="Specialty guides"
        title="Plan specialty care with real catalog evidence"
        lede="Start with a medical specialty, then compare its connected treatments, indicative planning ranges, doctors and hospitals. City guides appear only where the catalog has enough linked clinical and hospital depth."
      />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page">Specialties</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {specialties.map((data) => {
            const path = costsFilterPath({
              destination: data.country.name,
              specialty: data.specialty.name,
            });
            return (
              <article
                key={`${data.country.slug}/${data.specialty.slug}`}
                className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8"
              >
                <p className="eyebrow">{data.country.name}</p>
                <h2 className="mt-3 font-heading text-3xl leading-tight md:text-4xl">
                  {data.specialty.name}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {data.profile.introAnswer}
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl bg-secondary/60 p-3">
                    <Stethoscope className="size-4 text-primary" aria-hidden />
                    <dt className="mt-2 text-xs text-muted-foreground">
                      {data.profile.terminology.careItems}
                    </dt>
                    <dd className="mt-1 text-xl font-semibold">{data.procedures.length}</dd>
                  </div>
                  <div className="rounded-2xl bg-secondary/60 p-3">
                    <Building2 className="size-4 text-primary" aria-hidden />
                    <dt className="mt-2 text-xs text-muted-foreground">Hospitals</dt>
                    <dd className="mt-1 text-xl font-semibold">{data.hospitals.length}</dd>
                  </div>
                  <div className="rounded-2xl bg-secondary/60 p-3">
                    <Stethoscope className="size-4 text-primary" aria-hidden />
                    <dt className="mt-2 text-xs text-muted-foreground">
                      {data.profile.terminology.practitioners}
                    </dt>
                    <dd className="mt-1 text-xl font-semibold">{data.doctors.length}</dd>
                  </div>
                  <div className="rounded-2xl bg-secondary/60 p-3">
                    <MapPin className="size-4 text-primary" aria-hidden />
                    <dt className="mt-2 text-xs text-muted-foreground">Eligible cities</dt>
                    <dd className="mt-1 text-xl font-semibold">{data.cities.length}</dd>
                  </div>
                </dl>

                <Link
                  href={path}
                  className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Explore {data.specialty.name}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </article>
            );
          })}
        </div>
      </main>
      <PseoTrust />
      <CtaBand />
    </>
  );
}

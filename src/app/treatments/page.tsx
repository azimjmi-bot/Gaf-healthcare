import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { TreatmentCard } from "@/components/treatment-card";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { LOCALES } from "@/lib/i18n/languages";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { localePath } from "@/lib/i18n/path";
import { getRequestLocale } from "@/lib/i18n/request";
import { localePageIsRenderable } from "@/lib/i18n/locale-publication";
import { treatmentUi } from "@/lib/i18n/treatment-ui";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { getCountry, getSpecialty } from "@/lib/taxonomy";

type SearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

function valueOf(value: string | string[] | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const locale = await getRequestLocale();
  if (!localePageIsRenderable(locale, "/treatments")) {
    return { robots: { index: false, follow: false } };
  }
  const ui = treatmentUi(locale);
  const query = await searchParams;
  const filtered = Object.values(query).some((value) =>
    Array.isArray(value) ? value.length > 0 : Boolean(value),
  );
  return withLocaleMetadata(
    {
      title: ui.directoryMetaTitle,
      description: ui.directoryMetaDescription,
      robots: filtered ? { index: false, follow: true } : undefined,
      openGraph: {
        title: ui.directoryMetaTitle,
        description: ui.directoryMetaDescription,
        type: "website",
      },
    },
    "/treatments",
    locale,
    LOCALES,
  );
}

export default async function TreatmentsDirectoryPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const locale = await getRequestLocale();
  // A locale with nothing published here would otherwise render an empty
  // directory shell, which is exactly the thin page the gate exists to stop.
  if (!localePageIsRenderable(locale, "/treatments")) notFound();
  const ui = treatmentUi(locale);
  const query = await searchParams;
  const q = valueOf(query.q).toLocaleLowerCase(locale);
  const specialty = valueOf(query.specialty);
  const subspecialty = valueOf(query.subspecialty);
  const destination = valueOf(query.destination);
  const requestedPage = Math.max(1, Number(valueOf(query.page)) || 1);
  const allTreatments = publishedCuratedTreatments(locale);

  const specialtySlugs = [
    ...new Set(allTreatments.map((row) => row.specialtySlug)),
  ].filter(Boolean);
  const subspecialties = [
    ...new Set(allTreatments.map((row) => row.subspecialty.trim())),
  ].filter(Boolean);
  const destinationSlugs = [
    ...new Set(allTreatments.flatMap((row) => row.destinationSlugs)),
  ].filter(Boolean);

  const filtered = allTreatments.filter((row) => {
    const copy = row.translations[locale]!;
    const searchable = [
      copy.name,
      copy.shortDescription,
      ...copy.searchKeywords,
    ]
      .join(" ")
      .toLocaleLowerCase(locale);
    if (q && !searchable.includes(q)) return false;
    if (specialty && row.specialtySlug !== specialty) return false;
    if (subspecialty && row.subspecialty !== subspecialty) return false;
    if (destination && !row.destinationSlugs.includes(destination)) return false;
    return true;
  });

  const pageSize = 18;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(requestedPage, pageCount);
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const action = localePath("/treatments", locale);

  function pageHref(nextPage: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", valueOf(query.q));
    if (specialty) params.set("specialty", specialty);
    if (subspecialty) params.set("subspecialty", subspecialty);
    if (destination) params.set("destination", destination);
    params.set("page", String(nextPage));
    return `${action}?${params}`;
  }

  return (
    <main className="treatments-directory">
      <section className="treatments-directory__hero">
        <div className="page-wrap">
          <p className="eyebrow">{ui.directoryEyebrow}</p>
          <h1>{ui.directoryTitle}</h1>
          <p>{ui.directoryLede}</p>
        </div>
      </section>

      <div className="page-wrap treatments-directory__layout">
        <aside className="treatment-filters">
          <div className="treatment-filters__title">
            <SlidersHorizontal className="size-5" aria-hidden="true" />
            <strong>{ui.applyFilters}</strong>
          </div>
          <form action={action} method="get">
            <label>
              {ui.searchLabel}
              <span className="treatment-search">
                <Search className="size-4" aria-hidden="true" />
                <input
                  type="search"
                  name="q"
                  defaultValue={valueOf(query.q)}
                  placeholder={ui.searchPlaceholder}
                />
              </span>
            </label>
            {specialtySlugs.length > 1 ? (
              <label>
                {ui.specialty}
                <select name="specialty" defaultValue={specialty}>
                  <option value="">{ui.allSpecialties}</option>
                  {specialtySlugs.map((slug) => {
                    const row = getSpecialty(slug);
                    return (
                      <option key={slug} value={slug}>
                        {taxonomyLabel(row?.name, locale)}
                      </option>
                    );
                  })}
                </select>
              </label>
            ) : null}
            {subspecialties.length > 1 ? (
              <label>
                {ui.subspecialty}
                <select name="subspecialty" defaultValue={subspecialty}>
                  <option value="">{ui.allSubspecialties}</option>
                  {subspecialties.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
            {destinationSlugs.length > 1 ? (
              <label>
                {ui.destination}
                <select name="destination" defaultValue={destination}>
                  <option value="">{ui.allDestinations}</option>
                  {destinationSlugs.map((slug) => (
                    <option key={slug} value={slug}>
                      {taxonomyLabel(getCountry(slug)?.name, locale)}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
            <button type="submit">{ui.applyFilters}</button>
            {q || specialty || subspecialty || destination ? (
              <Link href={action}>{ui.clearFilters}</Link>
            ) : null}
          </form>
        </aside>

        <section className="treatment-results" aria-live="polite">
          <p className="treatment-results__count">
            {filtered.length} {ui.results}
          </p>
          {rows.length > 0 ? (
            <div className="treatment-grid">
              {rows.map((treatment) => (
                <TreatmentCard
                  key={treatment.id}
                  treatment={treatment}
                  locale={locale}
                />
              ))}
            </div>
          ) : (
            <div className="treatment-results__empty">
              <Search className="size-8" aria-hidden="true" />
              <p>{allTreatments.length > 0 ? ui.noResults : ui.noTreatments}</p>
            </div>
          )}
          {pageCount > 1 ? (
            <nav className="treatment-pagination" aria-label="Pagination">
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (number) => (
                  <Link
                    key={number}
                    href={pageHref(number)}
                    aria-current={number === page ? "page" : undefined}
                  >
                    {number}
                  </Link>
                ),
              )}
            </nav>
          ) : null}
        </section>
      </div>
    </main>
  );
}

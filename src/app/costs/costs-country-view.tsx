/**
 * Country-level Treatment Cost page for every destination other than the primary one.
 *
 * The primary destination keeps its long-form cost sheet untouched; this view exists
 * because the CMS describes other countries with a destination row rather than a full
 * article, and printing the India guide under a Turkish or Emirati URL would be wrong.
 * Everything rendered here comes from that country's own CMS record plus the
 * country-agnostic clinical sections of the procedure.
 */
import { notFound } from "next/navigation";
import { LocaleLink as Link } from "@/components/locale-link";
import { CostHero } from "@/components/cost-page/cost-hero";
import { CostStickyBar } from "@/components/cost-page/cost-sticky-bar";
import { InternationalComparison } from "@/components/cost-page/cost-blocks";
import { JsonLd } from "@/components/json-ld";
import { PseoTrust } from "@/components/pseo-trust";
import type { CatalogQuery } from "@/lib/catalog";
import {
  costCountryPageIsPublishable,
  resolveCostCountryPage,
} from "@/lib/cost-country-page";
import { costsFilterPath } from "@/lib/catalog-links";
import { costDestinationRows } from "@/lib/cost-article";
import { costCountryRecords, costPlaceLabel } from "@/lib/cost-geo";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  medicalWebPageJsonLd,
} from "@/lib/seo";
import type { Metadata } from "next";

export function costCountryMetadata(query: CatalogQuery): Metadata | undefined {
  const resolved = resolveCostCountryPage(query);
  if (!resolved) return undefined;
  const { record, city, range, stay, path, heading, brief, specialty } = resolved;
  const page = city?.editorial.page ?? record.row.page;
  const place = costPlaceLabel(record.label, city?.city.name);
  const title = page?.seoTitle ?? `${heading}: ${specialty} Prices & What to Confirm`;
  const description =
    page?.seoDescription ??
    `${brief} planning cost in ${place}: ${range}, ${stay.toLowerCase()}. ${record.row.positioning ?? "Private self-pay market"}. Compare against the India band before you ask for a written quotation.`;
  const url = absoluteUrl(path);
  return {
    title,
    description,
    robots: costCountryPageIsPublishable(resolved) ? undefined : { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="prose-gaf mt-4 leading-relaxed">{children}</p>;
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-14 scroll-mt-36 font-heading text-[1.75rem] leading-tight md:text-3xl">
      {children}
    </h2>
  );
}

export function CostsCountryView({ query }: { query: CatalogQuery }) {
  const resolved = resolveCostCountryPage(query);
  if (!resolved) notFound();
  const { treatment, article, record, city, range, modelled, relative, stay, path, heading, brief, specialty } =
    resolved;
  const cityEditorial = city?.editorial;
  const page = cityEditorial?.page ?? record.row.page;
  const { rows, anyModelled } = costDestinationRows(article, treatment);
  const place = costPlaceLabel(record.label, city?.city.name);
  const consultHref = `/consult?treatment=${treatment.slug}`;
  const faqs = page?.faqs ?? [];
  const siblings = costCountryRecords(article).filter(
    (entry) => entry.country.slug !== record.country.slug,
  );

  return (
    <>
      <JsonLd
        data={medicalWebPageJsonLd({
          name: page?.seoTitle ?? heading,
          description:
            page?.seoDescription ??
            `${brief} planning cost in ${record.label} compared with the India catalog band.`,
          path,
          lastReviewed: article.lastUpdated,
          procedureName: treatment.name,
          specialty,
          about: page?.intro?.[0] ?? record.row.context,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Treatment Cost", path: "/costs" },
          { name: record.label, path: costsFilterPath({ destination: record.country.name }) },
          {
            name: specialty,
            path: costsFilterPath({ destination: record.country.name, specialty }),
          },
          {
            name: brief,
            path: costsFilterPath({
              destination: record.country.name,
              specialty,
              procedure: treatment.name,
            }),
          },
          ...(city ? [{ name: city.city.name, path }] : []),
        ])}
      />
      {faqs.length > 0 ? <JsonLd data={faqJsonLd(faqs)} /> : null}

      <CostHero
        article={article}
        treatment={treatment}
        place={place}
        country={record.country.name}
        countryLabel={record.label}
        eyebrow={`${place} planning ranges`}
        priceRange={range}
        stay={stay}
        heading={heading}
        subtitle={page?.subtitle}
        lede={
          page?.subtitle
            ? undefined
            : (page?.intro?.[0] ?? cityEditorial?.costNote ?? record.row.context)
        }
        consultHref={consultHref}
        hospitalsHref="#cost-by-country"
        hospitalsLabel="Compare Destinations"
      />
      <CostStickyBar label={`${brief} cost in ${place}`} range={range} href={consultHref} />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-5 md:px-8 md:py-16 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-8">
          <H2 id="cost-in-country">
            {article.procedure} cost in {place}
          </H2>
          {page?.answer?.length ? (
            page.answer.map((para) => <P key={para.slice(0, 40)}>{para}</P>)
          ) : (
            <P>
              {brief} in {place} plans at {range}
              {modelled
                ? ", an indicative band scaled from our India catalog figure rather than a hospital tariff"
                : ""}
              . Typical stay is {stay.toLowerCase()}, and the market sits at {relative}.
            </P>
          )}
          {page?.costExplanation?.map((para) => <P key={para.slice(0, 40)}>{para}</P>)}
          {cityEditorial ? (
            <>
              <P>{cityEditorial.costNote}</P>
              <P>{cityEditorial.ecosystem}</P>
              <P>{cityEditorial.logistics}</P>
            </>
          ) : null}
          <P>
            <span className="font-medium text-foreground">
              {record.row.positioning ?? "Private self-pay market"}.
            </span>{" "}
            {record.row.context}
          </P>
          {page?.factors?.length ? (
            <dl className="cost-factors mt-6">
              {page.factors.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.detail}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <H2 id="overview">{article.overviewHeading ?? "Procedure overview"}</H2>
          {article.overview.what.map((para) => (
            <P key={para.slice(0, 40)}>{para}</P>
          ))}

          <H2 id="cost-by-country">
            {article.procedure} cost by destination
          </H2>
          <P>
            The same assumption priced in each market. Read {record.label} against the rest of the
            row rather than on its own, and confirm any figure with a written quotation from a named
            hospital in that country.
          </P>
          <InternationalComparison article={article} destinations={rows} anyModelled={anyModelled} />

          {faqs.length > 0 ? (
            <>
              <H2 id="faq">Frequently asked questions</H2>
              <div className="mt-6 grid gap-4">
                {faqs.map((row) => (
                  <details key={row.q} className="group rounded-2xl border border-border bg-card px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                      <h3 className="font-medium leading-snug">{row.q}</h3>
                      <span
                        aria-hidden
                        className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-base leading-none"
                      >
                        <span className="group-open:hidden">+</span>
                        <span className="hidden group-open:inline">−</span>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{row.a}</p>
                  </details>
                ))}
              </div>
            </>
          ) : null}
        </div>

        <aside className="hidden space-y-6 lg:col-span-4 lg:sticky lg:top-36 lg:block lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6 text-sm">
            <p className="text-xs tracking-[0.18em] uppercase text-gold">Why request a cost through GAF</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              One request is reviewed by a doctor and returned as comparable hospital options with an
              itemised planning estimate — not a brochure package from a single campus.
            </p>
            <p className="mt-5">
              <Link href={consultHref} className="cost-btn cost-btn--primary w-full">
                Get a Personalized Cost Estimate
              </Link>
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 text-sm">
            <p className="text-xs tracking-[0.18em] uppercase text-gold">
              {brief} cost in other destinations
            </p>
            <ul className="mt-3 space-y-2">
              {city ? (
                <li>
                  <Link
                    href={costsFilterPath({
                      destination: record.country.name,
                      specialty,
                      procedure: treatment.name,
                    })}
                    className="underline-offset-4 hover:underline"
                  >
                    {brief} cost in {record.label}
                  </Link>
                </li>
              ) : null}
              {siblings.map((entry) => (
                <li key={entry.country.slug}>
                  <Link
                    href={costsFilterPath({
                      destination: entry.country.name,
                      specialty,
                      procedure: treatment.name,
                    })}
                    className="underline-offset-4 hover:underline"
                  >
                    {brief} cost in {entry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
      <PseoTrust />
    </>
  );
}

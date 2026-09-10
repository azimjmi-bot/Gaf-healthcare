import type { ReactNode } from "react";
import { LocaleLink as Link } from "@/components/locale-link";
import { ArticleBlocks } from "@/components/article-body";
import { CostArticleView } from "@/components/cost-article-view";
import { CostHero } from "@/components/cost-page/cost-hero";
import { CostStickyBar } from "@/components/cost-page/cost-sticky-bar";
import { getCostArticle } from "@/data/cost-articles";
import { doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import {
  articleCampuses,
  articleFaculty,
  carePlace,
  cityEditorial,
  costCityRows,
  costDestinationRows,
  interpolateCostArticle,
} from "@/lib/cost-article";
import { getTreatment } from "@/lib/data";
import { toSlug } from "@/lib/taxonomy";
import type { Treatment } from "@/lib/treatments";

/** A CMS body flagged to replace the guide takes precedence over the coded article. */
export function hasCostArticle(treatment: Treatment) {
  const cmsOverrides = Boolean(treatment.replaceGuide && treatment.blocks && treatment.blocks.length > 0);
  return Boolean(getCostArticle(treatment.slug)) && !cmsOverrides;
}

export function costArticleFor(treatment: Treatment) {
  const raw = getCostArticle(treatment.slug);
  if (!raw || !hasCostArticle(treatment)) return undefined;
  return interpolateCostArticle(raw, treatment);
}

export function costArticleData(treatment: Treatment, city?: string) {
  const article = costArticleFor(treatment);
  if (!article) return undefined;
  const campuses = articleCampuses(treatment, city);
  const nationalCampuses = articleCampuses(treatment);
  const { all, featured } = articleFaculty(treatment.slug, city);
  const nationalFaculty = city ? articleFaculty(treatment.slug).all : all;
  return {
    article,
    campuses,
    faculty: featured,
    facultyAll: all,
    facultyTotal: all.length,
    cityRows: costCityRows(article, treatment, nationalFaculty, nationalCampuses),
    ...costDestinationRows(article, treatment),
    related: article.relatedProcedures
      .map((name) => getTreatment(toSlug(name)))
      .filter((row): row is Treatment => Boolean(row) && row!.slug !== treatment.slug)
      .map((row) => ({
        name: row.name,
        slug: row.slug,
        partnerRange: row.partnerRange,
        stay: row.stay,
      })),
  };
}

export function CostArticleSection({
  treatment,
  city,
  heading,
  lede,
  filters,
}: {
  treatment: Treatment;
  city?: string;
  heading?: string;
  lede?: string;
  filters?: ReactNode;
}) {
  const data = costArticleData(treatment, city);
  if (!data) return null;
  const { article, cityRows, rows, anyModelled, faculty, facultyAll, facultyTotal, campuses, related } =
    data;
  const place = carePlace(city);
  const consultHref = `/consult?treatment=${treatment.slug}`;
  const cityPage = cityEditorial(article, city)?.page;
  const title = cityPage?.heading ?? heading ?? article.heading;
  const subtitle = cityPage?.subtitle ?? article.heroSubtitle;
  const longLede = lede ?? article.heroLede ?? treatment.summary;

  return (
    <>
      <CostHero
        article={article}
        treatment={treatment}
        place={place}
        heading={title}
        subtitle={subtitle}
        lede={subtitle ? undefined : longLede}
        consultHref={consultHref}
        hospitalsHref="#hospitals"
        doctorsHref="#doctors"
      >
        {filters}
      </CostHero>
      <CostStickyBar
        label={`${article.briefName || article.procedure} cost in ${place}`}
        range={treatment.partnerRange}
        href={consultHref}
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-5 md:px-8 md:py-16 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-8">
          <CostArticleView
            article={article}
            treatment={treatment}
            city={city}
            cityRows={cityRows}
            destinations={rows}
            anyModelled={anyModelled}
            faculty={faculty}
            facultyAll={facultyAll}
            facultyTotal={facultyTotal}
            campuses={campuses}
            related={related}
          />
          {treatment.blocks && treatment.blocks.length > 0 ? (
            <div className="mt-14 max-w-3xl">
              <ArticleBlocks blocks={treatment.blocks} />
            </div>
          ) : null}
        </div>
        <aside className="hidden space-y-6 lg:col-span-4 lg:sticky lg:top-36 lg:block lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6 text-sm">
            <p className="text-xs tracking-[0.18em] uppercase text-gold">Why request a cost through GAF</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              One request is reviewed by a doctor and returned as comparable hospital options with an
              itemised planning estimate — not a brochure package from a single campus.
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>Records reviewed before you travel</li>
              <li>Hospital options, not a single quote</li>
              <li>No obligation to book</li>
            </ul>
            <p className="mt-5">
              <Link href={consultHref} className="cost-btn cost-btn--primary w-full">
                Get a Personalized Cost Estimate
              </Link>
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 text-sm">
            <p className="text-xs tracking-[0.18em] uppercase text-gold">On this page</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#cost-in-india" className="underline-offset-4 hover:underline">
                  Cost in India
                </a>
              </li>
              <li>
                <a href="#whats-included" className="underline-offset-4 hover:underline">
                  What is included
                </a>
              </li>
              {article.approachComparison ? (
                <li>
                  <a href="#approach" className="underline-offset-4 hover:underline">
                    Cost by surgical approach
                  </a>
                </li>
              ) : null}
              {article.accessComparison ? (
                <li>
                  <a href="#access" className="underline-offset-4 hover:underline">
                    Open vs laparoscopic vs robotic
                  </a>
                </li>
              ) : null}
              <li>
                <a href="#cost-by-country" className="underline-offset-4 hover:underline">
                  India vs other countries
                </a>
              </li>
              <li>
                <a href="#hospitals" className="underline-offset-4 hover:underline">
                  Hospitals
                </a>
              </li>
              <li>
                <a href="#doctors" className="underline-offset-4 hover:underline">
                  Doctors
                </a>
              </li>
              <li>
                <a href="#total-pathway" className="underline-offset-4 hover:underline">
                  Trip budget
                </a>
              </li>
            </ul>
            <p className="mt-5 text-xs tracking-[0.18em] uppercase text-gold">Directories</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href={doctorsPath({ destination: "India", city, procedure: treatment.name })}
                  className="underline-offset-4 hover:underline"
                >
                  {treatment.name} doctors{city ? ` in ${city}` : " in India"}
                </Link>
              </li>
              <li>
                <Link
                  href={hospitalsPath({ destination: "India", city, procedure: treatment.name })}
                  className="underline-offset-4 hover:underline"
                >
                  {treatment.name} hospitals{city ? ` in ${city}` : " in India"}
                </Link>
              </li>
              <li>
                <Link href="/costs" className="underline-offset-4 hover:underline">
                  All treatment costs in India
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </section>
      <div className="h-20 md:hidden" />
    </>
  );
}

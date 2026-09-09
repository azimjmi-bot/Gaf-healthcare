import Link from "next/link";
import { ArticleBlocks } from "@/components/article-body";
import { CostArticleView } from "@/components/cost-article-view";
import { Button } from "@/components/ui/button";
import { getCostArticle } from "@/data/cost-articles";
import { doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import {
  articleCampuses,
  articleFaculty,
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

export function costArticleData(treatment: Treatment) {
  const article = costArticleFor(treatment);
  if (!article) return undefined;
  const campuses = articleCampuses(treatment);
  const { all, featured } = articleFaculty(treatment.slug);
  return {
    article,
    campuses,
    faculty: featured,
    facultyTotal: all.length,
    cityRows: costCityRows(article, treatment, all, campuses),
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

export function CostArticleSection({ treatment }: { treatment: Treatment }) {
  const data = costArticleData(treatment);
  if (!data) return null;
  const { article, cityRows, rows, anyModelled, faculty, facultyTotal, campuses, related } = data;

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-8">
        <CostArticleView
          article={article}
          treatment={treatment}
          cityRows={cityRows}
          destinations={rows}
          anyModelled={anyModelled}
          faculty={faculty}
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
      <aside className="space-y-6 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-7">
          <p className="text-xs tracking-[0.18em] uppercase text-gold">Planning figures</p>
          <dl className="mt-5 space-y-5">
            <div>
              <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                India planning range
              </dt>
              <dd className="mt-1 font-heading text-2xl">{treatment.partnerRange}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                Typical US self-pay
              </dt>
              <dd className="mt-1 font-heading text-2xl">{treatment.usRange}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                Hospital stay
              </dt>
              <dd className="mt-1">{treatment.stay}</dd>
            </div>
          </dl>
          <Button asChild className="mt-7 h-11 w-full rounded-full">
            <Link href={`/consult?treatment=${treatment.slug}`}>Request a treatment plan</Link>
          </Button>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Indicative planning range, not a quotation. {treatment.notes}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 text-sm">
          <p className="text-xs tracking-[0.18em] uppercase text-gold">Find care</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                href={doctorsPath({ destination: "India", procedure: treatment.name })}
                className="underline-offset-4 hover:underline"
              >
                {treatment.name} specialists in India
              </Link>
            </li>
            <li>
              <Link
                href={hospitalsPath({ destination: "India", procedure: treatment.name })}
                className="underline-offset-4 hover:underline"
              >
                Hospitals offering this procedure
              </Link>
            </li>
            {cityRows.map((row) => (
              <li key={row.citySlug}>
                <Link href={row.costPath} className="underline-offset-4 hover:underline">
                  {treatment.name} cost in {row.city}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/costs" className="underline-offset-4 hover:underline">
                All treatment costs
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </section>
  );
}

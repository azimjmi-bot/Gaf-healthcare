"use client";

import { LocaleLink as Link } from "@/components/locale-link";
import { useLocale, useT } from "@/components/locale-provider";
import type { CatalogQuery } from "@/lib/catalog-options";
import { costsSpecialtyPath } from "@/lib/catalog-links";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";

function visiblePages(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const want = new Set([1, total, current - 1, current, current + 1]);
  return [...want].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
}

export function SpecialtyPager({
  query,
  specialties,
  currentIndex,
}: {
  query: CatalogQuery;
  specialties: { name: string }[];
  currentIndex: number;
}) {
  const t = useT();
  const locale = useLocale();
  const total = specialties.length;
  if (total <= 1) return null;

  const page = currentIndex + 1;
  const prev = specialties[currentIndex - 1];
  const next = specialties[currentIndex + 1];

  function hrefFor(name: string) {
    return costsSpecialtyPath({
      destination: query.destination,
      city: query.city,
      specialty: name,
    });
  }

  const nums = visiblePages(page, total);

  return (
    <nav className="hosp-pager" aria-label={t("dir.costs.pagerLabel")}>
      {prev ? (
        <Link href={hrefFor(prev.name)} className="hosp-pager__btn" title={taxonomyLabel(prev.name, locale)}>
          {t("pager.previous")}
        </Link>
      ) : (
        <span className="hosp-pager__btn is-disabled">{t("pager.previous")}</span>
      )}
      <ol className="hosp-pager__pages">
        {nums.map((n, i) => {
          const prior = nums[i - 1];
          const gap = prior && n - prior > 1;
          const spec = specialties[n - 1];
          return (
            <li key={n} className="flex items-center gap-1">
              {gap ? <span className="hosp-pager__ellipsis">…</span> : null}
              {n === page ? (
                <span className="hosp-pager__num is-current" aria-current="page" title={taxonomyLabel(spec?.name, locale)}>
                  {n}
                </span>
              ) : (
                <Link href={hrefFor(spec.name)} className="hosp-pager__num" title={taxonomyLabel(spec.name, locale)}>
                  {n}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      {next ? (
        <Link href={hrefFor(next.name)} className="hosp-pager__btn hosp-pager__btn--next" title={taxonomyLabel(next.name, locale)}>
          {t("pager.next")}
        </Link>
      ) : (
        <span className="hosp-pager__btn is-disabled">{t("pager.next")}</span>
      )}
    </nav>
  );
}

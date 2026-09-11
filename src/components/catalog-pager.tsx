"use client";

import { LocaleLink as Link } from "@/components/locale-link";
import { useT } from "@/components/locale-provider";
import type { CatalogQuery } from "@/lib/catalog-options";
import { prettyCatalogPath, type CatalogBasePath } from "@/lib/pretty-catalog-path";

function visiblePages(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const want = new Set([1, total, current - 1, current, current + 1]);
  return [...want].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
}

export function CatalogPager({
  page,
  totalPages,
  query,
  searchParams,
  basePath,
  label,
}: {
  page: number;
  totalPages: number;
  query?: CatalogQuery;
  searchParams?: Record<string, string | string[] | undefined>;
  basePath: CatalogBasePath;
  label: string;
}) {
  const t = useT();
  if (totalPages <= 1) return null;

  const facets: CatalogQuery = query ?? {
    destination: one(searchParams, "destination"),
    city: one(searchParams, "city"),
    specialty: one(searchParams, "specialty"),
    procedure: one(searchParams, "procedure"),
  };

  function hrefFor(nextPage: number) {
    const path = prettyCatalogPath(basePath, facets);
    return nextPage > 1 ? `${path}?page=${nextPage}` : path;
  }

  const nums = visiblePages(page, totalPages);

  return (
    <nav className="hosp-pager" aria-label={label}>
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className="hosp-pager__btn">
          {t("pager.previous")}
        </Link>
      ) : (
        <span className="hosp-pager__btn is-disabled">{t("pager.previous")}</span>
      )}
      <ol className="hosp-pager__pages">
        {nums.map((n, i) => {
          const prev = nums[i - 1];
          const gap = prev && n - prev > 1;
          return (
            <li key={n} className="flex items-center gap-1">
              {gap ? <span className="hosp-pager__ellipsis">…</span> : null}
              {n === page ? (
                <span className="hosp-pager__num is-current" aria-current="page">
                  {n}
                </span>
              ) : (
                <Link href={hrefFor(n)} className="hosp-pager__num">
                  {n}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} className="hosp-pager__btn hosp-pager__btn--next">
          {t("pager.next")}
        </Link>
      ) : (
        <span className="hosp-pager__btn is-disabled">{t("pager.next")}</span>
      )}
    </nav>
  );
}

function one(params: Record<string, string | string[] | undefined> | undefined, key: string) {
  if (!params) return undefined;
  const value = params[key];
  const raw = Array.isArray(value) ? value[0] : value;
  return raw || undefined;
}

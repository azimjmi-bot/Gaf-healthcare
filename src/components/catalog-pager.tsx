import Link from "next/link";

function visiblePages(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const want = new Set([1, total, current - 1, current, current + 1]);
  return [...want].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
}

export function CatalogPager({
  page,
  totalPages,
  searchParams,
  basePath,
  label,
}: {
  page: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
  basePath: "/doctors" | "/hospitals";
  label: string;
}) {
  if (totalPages <= 1) return null;

  function hrefFor(nextPage: number) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (key === "page") continue;
      const raw = Array.isArray(value) ? value[0] : value;
      if (raw) params.set(key, raw);
    }
    if (nextPage > 1) params.set("page", String(nextPage));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  const nums = visiblePages(page, totalPages);

  return (
    <nav className="hosp-pager" aria-label={label}>
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className="hosp-pager__btn">
          Previous
        </Link>
      ) : (
        <span className="hosp-pager__btn is-disabled">Previous</span>
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
          Next
        </Link>
      ) : (
        <span className="hosp-pager__btn is-disabled">Next</span>
      )}
    </nav>
  );
}

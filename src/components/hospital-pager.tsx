import Link from "next/link";

export function HospitalPager({
  page,
  totalPages,
  searchParams,
}: {
  page: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
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
    return qs ? `/hospitals?${qs}` : "/hospitals";
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="hosp-pager" aria-label="Hospital list pages">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className="hosp-pager__btn">
          Previous
        </Link>
      ) : (
        <span className="hosp-pager__btn is-disabled">Previous</span>
      )}
      <ol className="hosp-pager__pages">
        {pages.map((n) => (
          <li key={n}>
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
        ))}
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

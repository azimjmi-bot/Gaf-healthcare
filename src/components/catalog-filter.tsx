"use client";

import { useEffect, useRef } from "react";
import { CatalogFilterForm } from "@/components/catalog-filter-form";
import { useLocale } from "@/components/locale-provider";
import type { CatalogEntity, CatalogQuery, CityChipStats } from "@/lib/catalog-options";
import type { CatalogBasePath } from "@/lib/pretty-catalog-path";

type Props = {
  basePath: CatalogBasePath;
  resultCount: number;
  resultLabel: string;
  entity: CatalogEntity;
  query?: CatalogQuery;
  chipStats?: CityChipStats | null;
};

/**
 * The directory filter is real HTML, not a select that appears after
 * hydration. The effect covers client navigations, where an inline script
 * from the previous document does not run again.
 */
export function CatalogFilter(props: Props) {
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const form = ref.current?.querySelector("form.catalog-filter");
    if (!form) return;
    const onChange = (event: Event) => {
      const select = event.target;
      if (!(select instanceof HTMLSelectElement)) return;
      const href = select.selectedOptions[0]?.getAttribute("data-href");
      if (href) window.location.href = href;
    };
    form.addEventListener("change", onChange);
    return () => form.removeEventListener("change", onChange);
  });
  return (
    <div ref={ref}>
      <CatalogFilterForm {...props} locale={locale} />
    </div>
  );
}

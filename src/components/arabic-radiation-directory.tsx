import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { ArabicRadiationCityLinks, ArabicRadiationSsrDocument } from "@/components/arabic-radiation-ssr";
import { CtaBand } from "@/components/page-shell";
import { PseoTrust } from "@/components/pseo-trust";
import type { CatalogQuery } from "@/lib/catalog";
import type { ArabicRadiationDirectoryData } from "@/lib/i18n/ar-radiation-directory";
import { resultLabel } from "@/lib/i18n/directory-copy";

export function ArabicRadiationDirectory({
  data,
  query,
}: {
  data: ArabicRadiationDirectoryData;
  query: CatalogQuery;
}) {
  return (
    <>
      <ArabicRadiationSsrDocument
        data={data}
        filterSlot={
          <>
            <ArabicRadiationCityLinks data={data} />
            <div className="mt-4">
              <Suspense fallback={null}>
                <CatalogFilter
                  basePath="/doctors"
                  entity="doctors"
                  query={query}
                  resultCount={data.paging.total}
                  resultLabel={resultLabel("doctors", data.paging.total, "ar")}
                />
              </Suspense>
            </div>
          </>
        }
      />
      <Suspense fallback={null}>
        <PseoTrust />
      </Suspense>
      <Suspense fallback={null}>
        <CtaBand subject="علاج الأورام بالإشعاع" place={data.place} />
      </Suspense>
    </>
  );
}

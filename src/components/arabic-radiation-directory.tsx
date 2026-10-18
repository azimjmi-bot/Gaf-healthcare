import "@/styles/directory-cards.css";

import { ArabicRadiationSsrDocument } from "@/components/arabic-radiation-ssr";
import type { CatalogQuery } from "@/lib/catalog";
import type { ArabicRadiationDirectoryData } from "@/lib/i18n/ar-radiation-directory";

/**
 * Arabic Radiation Oncology HTML is a synchronous server document.
 * The directory filter is plain HTML in this document, so it is present
 * before any script runs. YouTube stories stay off this route.
 */
export function ArabicRadiationDirectory({
  data,
}: {
  data: ArabicRadiationDirectoryData;
  query?: CatalogQuery;
}) {
  return <ArabicRadiationSsrDocument data={data} />;
}

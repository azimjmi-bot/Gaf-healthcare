import "@/styles/directory-cards.css";

import { ArabicRadiationSsrDocument } from "@/components/arabic-radiation-ssr";
import type { CatalogQuery } from "@/lib/catalog";
import type { ArabicRadiationDirectoryData } from "@/lib/i18n/ar-radiation-directory";

/**
 * Arabic Radiation Oncology HTML is a synchronous server document.
 * Client filters, YouTube stories and cost-page attribution stay off this
 * route so crawlers receive the H1, Quick Answer and FAQs before timeout.
 */
export function ArabicRadiationDirectory({
  data,
}: {
  data: ArabicRadiationDirectoryData;
  query?: CatalogQuery;
}) {
  return <ArabicRadiationSsrDocument data={data} />;
}

import { headers } from "next/headers";
import { LOCALE_HEADER, parseLocale, type AppLocale } from "@/lib/i18n/languages";

export async function getRequestLocale(): Promise<AppLocale> {
  const headerList = await headers();
  return parseLocale(headerList.get(LOCALE_HEADER));
}

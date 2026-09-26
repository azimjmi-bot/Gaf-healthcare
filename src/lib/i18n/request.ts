import { headers } from "next/headers";
import { LOCALE_HEADER, PATH_HEADER, parseLocale, type AppLocale } from "@/lib/i18n/languages";

export async function getRequestLocale(): Promise<AppLocale> {
  const headerList = await headers();
  return parseLocale(headerList.get(LOCALE_HEADER));
}

/** The requested path without its locale prefix, e.g. /hospitals/max-saket. */
export async function getRequestPath(): Promise<string> {
  const headerList = await headers();
  const path = headerList.get(PATH_HEADER) || "/";
  return path.startsWith("/") ? path : `/${path}`;
}

import { permanentRedirect } from "next/navigation";
import type { CatalogQuery } from "@/lib/catalog-options";
import {
  prettyCatalogPath,
  type CatalogBasePath,
} from "@/lib/pretty-catalog-path";

export function readCatalogPage(raw: Record<string, string | string[] | undefined>) {
  const value = Array.isArray(raw.page) ? raw.page[0] : raw.page;
  const n = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export function prettyCatalogHref(base: CatalogBasePath, query: CatalogQuery, page = 1) {
  const path = prettyCatalogPath(base, query);
  return page > 1 ? `${path}${path.includes("?") ? "&" : "?"}page=${page}` : path;
}

/** Send leftover ?destination= catalog URLs to the Title-Case path. */
export function redirectPrettyCatalog(base: CatalogBasePath, query: CatalogQuery, page = 1) {
  if (!query.destination) return;
  const pretty = prettyCatalogPath(base, query);
  if (pretty.includes("?") || pretty === base) return;
  permanentRedirect(prettyCatalogHref(base, query, page));
}

export function canonicalizePrettyPath(
  base: CatalogBasePath,
  segments: string[],
  query: CatalogQuery,
  page = 1,
) {
  const current = [base, ...segments].join("/");
  const pretty = prettyCatalogPath(base, query);
  if (pretty.includes("?") || current === pretty) return;
  permanentRedirect(prettyCatalogHref(base, query, page));
}

import { SOURCE_LOCALE, isTargetLocale, type AppLocale } from "@/lib/i18n/languages";

export type SplitPath = {
  locale: AppLocale;
  pathname: string;
  search: string;
  hash: string;
};

function splitInput(input: string): { path: string; search: string; hash: string } {
  const hashIndex = input.indexOf("#");
  const hash = hashIndex >= 0 ? input.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? input.slice(0, hashIndex) : input;
  const searchIndex = withoutHash.indexOf("?");
  const search = searchIndex >= 0 ? withoutHash.slice(searchIndex) : "";
  const path = searchIndex >= 0 ? withoutHash.slice(0, searchIndex) : withoutHash;
  return { path, search, hash };
}

function normalizePathname(path: string) {
  if (!path || path === "/") return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.replace(/\/{2,}/g, "/");
}

const CATALOG_ROOTS = new Set(["doctors", "hospitals", "costs"]);

/**
 * Public catalog addresses are lowercase in every language. Internal facet
 * keys stay Title Case; this only changes the path that is emitted or redirected.
 */
export function lowercaseCatalogPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (!CATALOG_ROOTS.has(parts[0] ?? "")) return pathname;
  return `/${parts.map((part) => part.toLowerCase()).join("/")}`;
}

/** @deprecated Use lowercaseCatalogPath. Kept so older imports keep working. */
export const lowercaseArabicCatalogPath = lowercaseCatalogPath;

export function stripLocalePrefix(input: string): SplitPath {
  const { path, search, hash } = splitInput(input || "/");
  const pathname = normalizePathname(path);
  const parts = pathname.split("/").filter(Boolean);
  const head = parts[0];
  if (head && isTargetLocale(head)) {
    const rest = `/${parts.slice(1).join("/")}` || "/";
    return { locale: head, pathname: rest === "/" ? "/" : rest.replace(/\/$/, "") || "/", search, hash };
  }
  return { locale: SOURCE_LOCALE, pathname: pathname === "/" ? "/" : pathname.replace(/\/$/, "") || "/", search, hash };
}

/** Prefix an English site path with a language subdirectory. English stays unprefixed. */
export function localePath(input: string, locale: AppLocale): string {
  const stripped = stripLocalePrefix(input);
  const pathname = stripped.pathname === "/" ? "/" : lowercaseCatalogPath(stripped.pathname);
  if (locale === SOURCE_LOCALE) {
    return `${pathname}${stripped.search}${stripped.hash}`;
  }
  const prefixed = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return `${prefixed}${stripped.search}${stripped.hash}`;
}

export function englishPath(input: string) {
  const stripped = stripLocalePrefix(input);
  return `${lowercaseCatalogPath(stripped.pathname)}${stripped.search}${stripped.hash}`;
}

export function isInternalHref(href: string) {
  if (!href) return false;
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return false;
  return href.startsWith("/");
}

export function localizeInternalHref(href: string, locale: AppLocale) {
  if (!isInternalHref(href)) return href;
  return localePath(href, locale);
}

const SITE_CONTENT_ROOTS = new Set([
  "blogs",
  "treatments",
  "doctors",
  "hospitals",
  "costs",
  "specialties",
]);

const SITE_ORIGIN = /^https?:\/\/(?:www\.)?gaf\.healthcare(?=\/|$)/i;

/**
 * Point an in-article link at the same page in the current language.
 *
 * Consult links stay unprefixed so the estimate button can still recognise
 * them. Uploads, anchors, and other sites stay as written.
 */
export function localizeContentHref(href: string, locale: AppLocale) {
  if (!href || locale === SOURCE_LOCALE) return href;
  const trimmed = href.trim();
  const origin = trimmed.match(SITE_ORIGIN)?.[0] ?? "";
  const path = origin ? trimmed.slice(origin.length) || "/" : trimmed;
  if (!path.startsWith("/")) return href;
  const stripped = stripLocalePrefix(path);
  const head = stripped.pathname.split("/").filter(Boolean)[0];
  if (!head || !SITE_CONTENT_ROOTS.has(head)) return href;
  return localePath(path, locale);
}

/** Rewrite Markdown and HTML links inside article prose. */
export function localizeProseLinks(text: string, locale: AppLocale) {
  if (!text || locale === SOURCE_LOCALE) return text;
  const markdownLink = /\[([^\]]*)\]\(([^)\s]+)(\s+(?:"[^"]*"|'[^']*'))?\)/g;
  const htmlHref = /\shref=(["'])([^"']+)\1/gi;
  return text
    .replace(markdownLink, (full, label: string, href: string, title: string = "") => {
      const next = localizeContentHref(href, locale);
      return next === href ? full : `[${label}](${next}${title})`;
    })
    .replace(htmlHref, (full, quote: string, href: string) => {
      const next = localizeContentHref(href, locale);
      return next === href ? full : ` href=${quote}${next}${quote}`;
    });
}

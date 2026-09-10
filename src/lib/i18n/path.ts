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
  const pathname = stripped.pathname === "/" ? "/" : stripped.pathname;
  if (locale === SOURCE_LOCALE) {
    return `${pathname}${stripped.search}${stripped.hash}`;
  }
  const prefixed = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return `${prefixed}${stripped.search}${stripped.hash}`;
}

export function englishPath(input: string) {
  const stripped = stripLocalePrefix(input);
  return `${stripped.pathname}${stripped.search}${stripped.hash}`;
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

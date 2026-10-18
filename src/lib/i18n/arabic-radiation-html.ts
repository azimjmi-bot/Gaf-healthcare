import { readFileSync } from "fs";
import { join } from "path";
import { createElement, Fragment, type ReactNode } from "react";
import { ArabicDoctorDirectorySsrDocument } from "@/components/arabic-doctor-directory-ssr";
import { ArabicRadiationProcedureSsrDocument } from "@/components/arabic-radiation-procedure-ssr";
import { ArabicRadiationSsrDocument } from "@/components/arabic-radiation-ssr";
import {
  buildArabicRadiationDirectory,
  isArabicRadiationDirectory,
  type ArabicRadiationDirectoryData,
} from "@/lib/i18n/ar-radiation-directory";
import { buildArabicRadiationProcedure } from "@/lib/i18n/ar-radiation-procedure";
import {
  arabicDocumentMeta,
  buildArabicDoctorDirectory,
  type ArabicDocumentMeta,
} from "@/lib/i18n/arabic-doctor-directory";
import type { CatalogQuery } from "@/lib/catalog";
import { localePath } from "@/lib/i18n/path";
import { SITE_ORIGIN } from "@/lib/i18n/metadata";
import { consultToWhatsappHref } from "@/lib/site";
import { toSlug } from "@/lib/taxonomy";
import { TtlLru } from "@/lib/ttl-lru";

// Next's ISR layer already keeps each static route document for the same five
// minutes (memory + .next/cache), so this only short-circuits re-renders that
// land inside one revalidation window. Keep it small: a Googlebot crawl of
// every Arabic facet once left ~1,200 expired documents (~120 MB) in an
// unbounded Map here.
const HTML_CACHE_MS = 5 * 60 * 1000;
const HTML_CACHE_MAX_ENTRIES = 48;
const htmlCache = new TtlLru<string>(HTML_CACHE_MAX_ENTRIES, HTML_CACHE_MS);

const DIRECTORY_CSS_FILE = "ar-ro-directory.css";
let directoryCss: string | null | undefined;

/**
 * The whole directory stylesheet travels inside the document. A browser or
 * CDN that still holds an older copy of `/ar-ro-directory.css` then cannot
 * style a newer document with it — the two previous layout fixes reached the
 * origin but not every reader because of exactly that skew. The file lives in
 * `public/` and is read the way the CMS store reads `content/` at runtime; if
 * that read ever fails the document falls back to the external link.
 */
function directoryStyleTag() {
  if (directoryCss === undefined) {
    try {
      directoryCss = readFileSync(join(process.cwd(), "public", DIRECTORY_CSS_FILE), "utf8");
    } catch {
      directoryCss = null;
    }
  }
  if (directoryCss === null) return `<link rel="stylesheet" href="/${DIRECTORY_CSS_FILE}?v=7"/>`;
  return `<style>${directoryCss.replace(/<\/style/gi, "<\\/style")}</style>`;
}

/**
 * Every Arabic India doctor directory — country, city, specialty, procedure —
 * is answered by the static HTML route. Profile slugs (`/ar/doctors/<slug>`)
 * and `/ar/doctors/compare` are not under `India`, so they fall through to the
 * App Router rewrite as before. The proxy keeps an identical copy of this
 * check because it cannot import server-only modules.
 */
export function isArabicDoctorHtmlPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "ar" || parts[1] !== "doctors" || parts[2] !== "India") return false;
  return parts.length >= 3 && parts.length <= 6;
}

/** @deprecated kept for callers that predate the general matcher. */
export const isArabicRadiationHtmlPath = isArabicDoctorHtmlPath;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type ArabicHtmlDocument = {
  title: string;
  description: string;
  meta: ArabicDocumentMeta;
  consultHref: string;
};

function headLinks(meta: ArabicDocumentMeta) {
  const canonical = `${SITE_ORIGIN}${localePath(meta.canonicalPath, "ar")}`;
  const lines = [`<link rel="canonical" href="${canonical}"/>`];
  // A noindex page or a duplicate that defers to its parent makes no language
  // claim, so it carries canonical and robots only — the same rule
  // withLocaleMetadata applies to App Router pages.
  if (meta.state !== "published") {
    lines.push('<meta name="robots" content="noindex, follow"/>');
  }
  // Attribute casing follows what Next's metadata renderer emits (`hrefLang`),
  // so the alternates sweep and any other tooling tuned to App Router output
  // read these documents the same way. HTML attribute names are
  // case-insensitive, so browsers and crawlers are unaffected either way.
  if (meta.inLanguageSet) {
    if (meta.hreflangLocales.includes("en")) {
      lines.push(`<link rel="alternate" hrefLang="x-default" href="${SITE_ORIGIN}${meta.path}"/>`);
    }
    for (const locale of meta.hreflangLocales) {
      const href = `${SITE_ORIGIN}${localePath(meta.path, locale as "ar" | "en")}`;
      lines.push(`<link rel="alternate" hrefLang="${locale}" href="${href}"/>`);
    }
  }
  return { canonical, lines: lines.join("\n") };
}

export function wrapArabicDocument(doc: ArabicHtmlDocument, bodyHtml: string) {
  const english = `${SITE_ORIGIN}${doc.meta.path}`;
  const head = headLinks(doc.meta);
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"/>
<title>${escapeHtml(doc.title)} — GAF Healthcare</title>
<meta name="description" content="${escapeHtml(doc.description)}"/>
${head.lines}
<meta property="og:type" content="website"/>
<meta property="og:locale" content="ar_AR"/>
<meta property="og:site_name" content="GAF Healthcare"/>
<meta property="og:title" content="${escapeHtml(doc.title)}"/>
<meta property="og:description" content="${escapeHtml(doc.description)}"/>
<meta property="og:url" content="${head.canonical}"/>
<meta property="og:image" content="${SITE_ORIGIN}/brand/gaf-healthcare.png"/>
<meta name="twitter:card" content="summary"/>
<meta name="twitter:title" content="${escapeHtml(doc.title)}"/>
<meta name="twitter:description" content="${escapeHtml(doc.description)}"/>
${directoryStyleTag()}
</head>
<body class="site-shell">
<header>
  <a href="/ar" aria-label="GAF Healthcare"><img src="/brand/gaf-healthcare.png" alt="GAF Healthcare" width="128" height="124"/></a>
  <nav aria-label="التنقل">
    <a href="/ar/doctors">الأطباء</a>
    <a href="/ar/hospitals">المستشفيات</a>
    <a href="/ar/costs">تكلفة العلاج</a>
    <a href="${english}">English</a>
    <a href="${doc.consultHref}" rel="noreferrer noopener">اطلب استشارة</a>
  </nav>
</header>
<main>${bodyHtml}</main>
<footer>
  <p>GAF Healthcare ليست مستشفى ولا تقدّم مشورة طبية. القرارات السريرية لكم وللطبيب المرخّص الذي تختارونه.</p>
</footer>
</body>
</html>`;
}

function consultHrefFor(query: CatalogQuery) {
  const params = new URLSearchParams();
  if (query.procedure) params.set("treatment", toSlug(query.procedure));
  else if (query.specialty) params.set("specialty", toSlug(query.specialty));
  const qs = params.toString();
  return consultToWhatsappHref(qs ? `/consult?${qs}` : "/consult");
}

export function wrapArabicRadiationDocument(data: ArabicRadiationDirectoryData, bodyHtml: string) {
  return wrapArabicDocument(
    {
      title: data.title,
      description: data.description,
      meta: arabicDocumentMeta(data.path),
      consultHref: consultToWhatsappHref("/consult?specialty=radiation-oncology"),
    },
    bodyHtml,
  );
}

export function cacheArabicRadiationHtml(path: string, html: string) {
  return htmlCache.set(path, html);
}

export function readCachedArabicRadiationHtml(path: string) {
  return htmlCache.get(path);
}

function hostMarkup(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(hostMarkup).join("");
  if (typeof node !== "object") return "";
  const el = node as {
    type?: unknown;
    props?: Record<string, unknown> & { children?: ReactNode; dangerouslySetInnerHTML?: { __html: string } };
  };
  if (el.type === Fragment) return hostMarkup(el.props?.children);
  if (typeof el.type === "function") {
    const rendered = (el.type as (props: unknown) => ReactNode)(el.props ?? {});
    return hostMarkup(rendered);
  }
  const tag = typeof el.type === "string" ? el.type : "";
  const props = el.props ?? {};
  const attrEntries = Object.entries(props).flatMap(([key, value]) => {
    if (key === "children" || key === "dangerouslySetInnerHTML" || value == null || value === false) {
      return [];
    }
    if (key === "className") return [`class="${String(value)}"`];
    if (typeof value === "boolean") return value ? [key] : [];
    if (typeof value === "object") return [];
    return [`${key}="${String(value).replace(/"/g, "&quot;")}"`];
  });
  const attrs = attrEntries.length ? ` ${attrEntries.join(" ")}` : "";
  const inner = props.dangerouslySetInnerHTML
    ? props.dangerouslySetInnerHTML.__html
    : hostMarkup(props.children);
  if (!tag) return inner;
  if (tag === "img" || tag === "input" || tag === "br" || tag === "hr" || tag === "meta") {
    return `<${tag}${attrs}/>`;
  }
  return `<${tag}${attrs}>${inner}</${tag}>`;
}

function cacheKeyFor(path: string, page: number) {
  const url = page > 1 ? `/ar${path}?page=${page}` : `/ar${path}`;
  return `v7:${url}`;
}

export function renderArabicRadiationHtml(query: CatalogQuery, page = 1) {
  const data = buildArabicRadiationDirectory(query, {}, page);
  if (!data) return undefined;
  const cacheKey = cacheKeyFor(data.path, data.paging.page);
  const cached = readCachedArabicRadiationHtml(cacheKey);
  if (cached) return cached;
  const body = hostMarkup(createElement(ArabicRadiationSsrDocument, { data }));
  return cacheArabicRadiationHtml(cacheKey, wrapArabicRadiationDocument(data, body));
}

/**
 * Static HTML for any Arabic India doctor directory. Radiation Oncology keeps
 * its editorial layer; every other facet gets the generic directory document.
 * Returns undefined when the locale does not publish the path at all.
 */
export function renderArabicRadiationProcedureHtml(query: CatalogQuery, page = 1) {
  const data = buildArabicRadiationProcedure(query, page);
  if (!data) return undefined;
  const cacheKey = cacheKeyFor(data.path, page);
  const cached = readCachedArabicRadiationHtml(cacheKey);
  if (cached) return cached;
  const body = hostMarkup(createElement(ArabicRadiationProcedureSsrDocument, { data }));
  return cacheArabicRadiationHtml(
    cacheKey,
    wrapArabicDocument(
      {
        title: data.copy.title,
        description: data.copy.description,
        meta: data.meta,
        consultHref: data.consultHref,
      },
      body,
    ),
  );
}

export function renderArabicDoctorDirectoryHtml(query: CatalogQuery, page = 1) {
  if (isArabicRadiationDirectory(query)) return renderArabicRadiationHtml(query, page);
  const procedurePage = renderArabicRadiationProcedureHtml(query, page);
  if (procedurePage) return procedurePage;
  const data = buildArabicDoctorDirectory(query, page);
  if (!data) return undefined;
  const cacheKey = cacheKeyFor(data.meta.path, data.paging.page);
  const cached = readCachedArabicRadiationHtml(cacheKey);
  if (cached) return cached;
  const body = hostMarkup(createElement(ArabicDoctorDirectorySsrDocument, { data }));
  const html = wrapArabicDocument(
    {
      title: data.title,
      description: data.description,
      meta: data.meta,
      consultHref: consultHrefFor(query),
    },
    body,
  );
  return cacheArabicRadiationHtml(cacheKey, html);
}


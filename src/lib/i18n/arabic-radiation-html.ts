import { createElement, Fragment, type ReactNode } from "react";
import { ArabicDoctorDirectorySsrDocument } from "@/components/arabic-doctor-directory-ssr";
import { ArabicRadiationSsrDocument } from "@/components/arabic-radiation-ssr";
import {
  buildArabicRadiationDirectory,
  isArabicRadiationDirectory,
  type ArabicRadiationDirectoryData,
} from "@/lib/i18n/ar-radiation-directory";
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

const HTML_CACHE_MS = 5 * 60 * 1000;
const htmlCache = new Map<string, { html: string; expires: number }>();

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
<title>${escapeHtml(doc.title)} — GAF Healthcare</title>
<meta name="description" content="${escapeHtml(doc.description)}"/>
${head.lines}
<meta property="og:locale" content="ar_AR"/>
<meta property="og:title" content="${escapeHtml(doc.title)}"/>
<meta property="og:description" content="${escapeHtml(doc.description)}"/>
<meta property="og:url" content="${head.canonical}"/>
<link rel="stylesheet" href="/ar-ro-directory.css"/>
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
  htmlCache.set(path, { html, expires: Date.now() + HTML_CACHE_MS });
  return html;
}

export function readCachedArabicRadiationHtml(path: string) {
  const hit = htmlCache.get(path);
  if (!hit || hit.expires <= Date.now()) return undefined;
  return hit.html;
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
  return page > 1 ? `/ar${path}?page=${page}` : `/ar${path}`;
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
export function renderArabicDoctorDirectoryHtml(query: CatalogQuery, page = 1) {
  if (isArabicRadiationDirectory(query)) return renderArabicRadiationHtml(query, page);
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


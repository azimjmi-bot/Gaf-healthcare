import { createElement, Fragment, type ReactNode } from "react";
import { ArabicRadiationSsrDocument } from "@/components/arabic-radiation-ssr";
import {
  buildArabicRadiationDirectory,
  type ArabicRadiationDirectoryData,
} from "@/lib/i18n/ar-radiation-directory";
import type { CatalogQuery } from "@/lib/catalog";
import { localePath } from "@/lib/i18n/path";
import { SITE_ORIGIN } from "@/lib/i18n/metadata";
import { consultToWhatsappHref } from "@/lib/site";

const HTML_CACHE_MS = 5 * 60 * 1000;
const htmlCache = new Map<string, { html: string; expires: number }>();

export function isArabicRadiationHtmlPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "ar" || parts[1] !== "doctors" || parts[2] !== "India") return false;
  if (parts.length === 4 && parts[3] === "Radiation-Oncology") return true;
  if (parts.length === 5 && parts[4] === "Radiation-Oncology") return true;
  return false;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function wrapArabicRadiationDocument(data: ArabicRadiationDirectoryData, bodyHtml: string) {
  const canonical = `${SITE_ORIGIN}${localePath(data.path, "ar")}`;
  const english = `${SITE_ORIGIN}${data.path}`;
  const consult = consultToWhatsappHref("/consult?specialty=radiation-oncology");
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${escapeHtml(data.title)} — GAF Healthcare</title>
<meta name="description" content="${escapeHtml(data.description)}"/>
<link rel="canonical" href="${canonical}"/>
<link rel="alternate" hreflang="ar" href="${canonical}"/>
<link rel="alternate" hreflang="en" href="${english}"/>
<link rel="alternate" hreflang="x-default" href="${english}"/>
<meta property="og:locale" content="ar_AR"/>
<meta property="og:title" content="${escapeHtml(data.title)}"/>
<meta property="og:description" content="${escapeHtml(data.description)}"/>
<meta property="og:url" content="${canonical}"/>
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
    <a href="${consult}" rel="noreferrer noopener">اطلب استشارة</a>
  </nav>
</header>
<main>${bodyHtml}</main>
<footer>
  <p>GAF Healthcare ليست مستشفى ولا تقدّم مشورة طبية. القرارات السريرية لكم وللطبيب المرخّص الذي تختارونه.</p>
</footer>
</body>
</html>`;
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

export function renderArabicRadiationHtml(query: CatalogQuery, page = 1) {
  const data = buildArabicRadiationDirectory(query, {}, page);
  if (!data) return undefined;
  const cacheKey = `/ar${data.path}`;
  const cached = readCachedArabicRadiationHtml(cacheKey);
  if (cached) return cached;
  const body = hostMarkup(createElement(ArabicRadiationSsrDocument, { data }));
  return cacheArabicRadiationHtml(cacheKey, wrapArabicRadiationDocument(data, body));
}


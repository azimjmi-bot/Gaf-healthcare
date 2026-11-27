export type GaEventName = "consult_form_submit" | "whatsapp_click" | "phone_click";

const ALLOWED_GA_PARAM_KEYS = new Set([
  "locale",
  "treatment_slug",
  "hospital_slug",
  "doctor_slug",
  "timeline",
  "has_report_upload",
  "report_count",
  "placement",
  "page_type",
  "cta_target",
]);

export type SafeGaParams = Record<string, string | number | boolean>;

/**
 * Strip every field outside the explicit non-PII allowlist so patient names,
 * emails, phone numbers, diagnoses, free-text notes, and filenames can never
 * be forwarded to GA4.
 */
export function sanitizeGaParams(raw: Record<string, unknown>): SafeGaParams {
  const clean: SafeGaParams = {};
  for (const [key, value] of Object.entries(raw)) {
    if (!ALLOWED_GA_PARAM_KEYS.has(key)) continue;
    if (value === undefined || value === null || value === "") continue;
    if (typeof value === "boolean" || typeof value === "number") {
      clean[key] = value;
    } else if (typeof value === "string") {
      clean[key] = value.slice(0, 80);
    }
  }
  return clean;
}

export function trackGaEvent(
  eventName: GaEventName,
  rawParams: Record<string, unknown> = {},
): SafeGaParams {
  const params = sanitizeGaParams(rawParams);
  if (typeof window === "undefined") return params;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
    return params;
  }
  // Queue in gtag's expected Arguments format before deferred gtag.js boots.
  (function queueGtag(..._args: unknown[]) {
    window.dataLayer?.push(arguments);
  })("event", eventName, params);
  return params;
}

export function classifyPageType(pathname: string): string {
  const clean = pathname.replace(/^\/(?:ar|fr|ru|sw)(?=\/|$)/, "") || "/";
  if (clean === "/") return "home";
  const seg = clean.split("/").filter(Boolean)[0] || "other";
  if (seg === "treatment-in-india" || clean.endsWith("/treatment-in-india")) return "country_hub";
  return seg;
}

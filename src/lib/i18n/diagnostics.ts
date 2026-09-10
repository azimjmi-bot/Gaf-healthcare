const FLAG = process.env.TRANSLATION_DIAGNOSTICS === "1" || process.env.NODE_ENV !== "production";

export function translationLog(
  kind: "CACHE HIT" | "TRANSLATION API" | "TRANSLATION SAVED" | "TRANSLATION SKIP" | "TRANSLATION FAIL",
  sourceType: string,
  sourceId: string,
  language: string,
  extra?: string,
) {
  if (!FLAG) return;
  const suffix = extra ? ` ${extra}` : "";
  console.info(`[${kind}] content=${sourceType}:${sourceId} language=${language}${suffix}`);
}

export function sanitizeTranslationError(err: unknown) {
  let message = err instanceof Error ? err.message : "Translation failed";
  message = message.replace(/-----BEGIN[\s\S]*?-----END [A-Z ]+-----/g, "[redacted]");
  message = message.replace(/GOOGLE_SERVICE_ACCOUNT_JSON/g, "[env]");
  message = message.replace(/private_key["']?\s*:\s*["'][^"']+/gi, "private_key:[redacted]");
  return message.slice(0, 400);
}

export function errorCategory(err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  if (/UNAUTHENTICATED|credential|permission/i.test(message)) return "auth";
  if (/RESOURCE_EXHAUSTED|quota|rate/i.test(message)) return "quota";
  if (/INVALID_ARGUMENT|mime/i.test(message)) return "invalid";
  if (/ENOTFOUND|ECONN|timeout|unavailable/i.test(message)) return "network";
  return "unknown";
}

import { hashContent } from "@/lib/i18n/hash";
import { looksLikeHtml } from "@/lib/i18n/extract";
import { translationLog, sanitizeTranslationError, errorCategory } from "@/lib/i18n/diagnostics";
import { translateSegments, translationConfigured } from "@/lib/i18n/google";
import { TARGET_LOCALES, type TargetLocale } from "@/lib/i18n/languages";
import {
  claimTranslationSlot,
  getTranslation,
  listTranslationsForSource,
  markSourceOutdated,
  patchTranslation,
  upsertTranslation,
} from "@/lib/i18n/store";
import type { SourceType, TranslationFields, TranslationRecord } from "@/lib/i18n/types";
import { displayTranslationState } from "@/lib/i18n/types";

const inflight = new Map<string, Promise<TranslationFields>>();

function nextVersion(existing: TranslationRecord | undefined, hash: string) {
  if (!existing) return 1;
  if (existing.sourceContentHash === hash) return existing.sourceVersion || 1;
  return (existing.sourceVersion || 1) + 1;
}

async function translateFields(fields: TranslationFields, language: TargetLocale) {
  const keys = Object.keys(fields).filter((key) => fields[key]?.trim());
  const htmlKeys = keys.filter((key) => key.endsWith(".html") || looksLikeHtml(fields[key]));
  const textKeys = keys.filter((key) => !htmlKeys.includes(key));
  const translated: TranslationFields = { ...fields };

  async function run(selected: string[], mimeType: "text/plain" | "text/html") {
    if (selected.length === 0) return;
    const result = await translateSegments(
      selected.map((key) => fields[key]),
      mimeType,
      language,
    );
    selected.forEach((key, index) => {
      translated[key] = result[index] || fields[key];
    });
  }

  await run(textKeys, "text/plain");
  await run(htmlKeys, "text/html");
  return translated;
}

async function waitForCompletion(
  sourceType: SourceType,
  sourceId: string,
  language: TargetLocale,
  hash: string,
  attempts = 20,
) {
  for (let i = 0; i < attempts; i += 1) {
    const record = getTranslation(sourceType, sourceId, language);
    if (record?.status === "completed" && record.sourceContentHash === hash) return record.fields;
    if (record?.status === "failed") return record.fields;
    if (record?.status === "completed") return record.fields;
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  const record = getTranslation(sourceType, sourceId, language);
  return record?.fields ?? {};
}

async function performTranslation(input: {
  sourceType: SourceType;
  sourceId: string;
  language: TargetLocale;
  fields: TranslationFields;
  hash: string;
  force?: boolean;
}) {
  const existing = getTranslation(input.sourceType, input.sourceId, input.language);
  if (!translationConfigured()) {
    translationLog("TRANSLATION FAIL", input.sourceType, input.sourceId, input.language, "not-configured");
    return existing?.fields && Object.keys(existing.fields).length ? existing.fields : input.fields;
  }

  const { claimed, record } = await claimTranslationSlot({
    sourceType: input.sourceType,
    sourceId: input.sourceId,
    language: input.language,
    sourceContentHash: input.hash,
    sourceVersion: nextVersion(existing, input.hash),
  });

  if (!claimed && !input.force) {
    translationLog("TRANSLATION SKIP", input.sourceType, input.sourceId, input.language, "lock");
    return waitForCompletion(input.sourceType, input.sourceId, input.language, input.hash);
  }

  translationLog("TRANSLATION API", input.sourceType, input.sourceId, input.language);
  try {
    const translated = await translateFields(input.fields, input.language);
    const saved: TranslationRecord = {
      ...record,
      fields: translated,
      status: "completed",
      outdated: false,
      sourceContentHash: input.hash,
      sourceVersion: nextVersion(existing, input.hash),
      translatedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      errorMessage: null,
      errorCategory: null,
    };
    await upsertTranslation(saved);
    translationLog("TRANSLATION SAVED", input.sourceType, input.sourceId, input.language);
    return translated;
  } catch (err) {
    const message = sanitizeTranslationError(err);
    await patchTranslation(input.sourceType, input.sourceId, input.language, {
      status: "failed",
      errorMessage: message,
      errorCategory: errorCategory(err),
    });
    translationLog("TRANSLATION FAIL", input.sourceType, input.sourceId, input.language);
    return existing?.fields && Object.keys(existing.fields).length ? existing.fields : {};
  }
}

export async function getLocalizedFields(input: {
  sourceType: SourceType;
  sourceId: string;
  language: string;
  fields: TranslationFields;
  generateIfMissing?: boolean;
  force?: boolean;
}): Promise<TranslationFields> {
  if (input.language === "en" || !TARGET_LOCALES.includes(input.language as TargetLocale)) {
    return input.fields;
  }
  const language = input.language as TargetLocale;
  const hash = hashContent(input.fields);
  const existing = getTranslation(input.sourceType, input.sourceId, language);
  const current =
    existing?.status === "completed" && existing.sourceContentHash === hash && !existing.outdated;

  if (current && !input.force) {
    translationLog("CACHE HIT", input.sourceType, input.sourceId, language);
    return existing.fields;
  }

  const shouldGenerate = input.force || (input.generateIfMissing !== false && (!existing || !current));
  if (!shouldGenerate) {
    if (existing?.status === "completed") return existing.fields;
    return input.fields;
  }

  const key = `${input.sourceType}:${input.sourceId}:${language}:${hash}:${input.force ? "force" : "miss"}`;
  const pending = inflight.get(key);
  if (pending) return pending;

  const job = performTranslation({
    sourceType: input.sourceType,
    sourceId: input.sourceId,
    language,
    fields: input.fields,
    hash,
    force: input.force,
  }).finally(() => inflight.delete(key));
  inflight.set(key, job);
  const result = await job;
  return Object.keys(result).length ? result : existing?.fields && Object.keys(existing.fields).length ? existing.fields : input.fields;
}

export async function sourceStatuses(sourceType: SourceType, sourceId: string, fields: TranslationFields) {
  const hash = hashContent(fields);
  return TARGET_LOCALES.map((language) => {
    const record = getTranslation(sourceType, sourceId, language);
    return {
      language,
      state: displayTranslationState(record, hash),
      status: record?.status ?? null,
      updatedAt: record?.updatedAt ?? null,
      errorMessage: record?.errorMessage ?? null,
      sourceVersion: record?.sourceVersion ?? null,
    };
  });
}

export function completedLocalesFor(sourceType: SourceType, sourceId: string, fields?: TranslationFields) {
  const hash = fields ? hashContent(fields) : undefined;
  const locales: Array<"en" | TargetLocale> = ["en"];
  for (const language of TARGET_LOCALES) {
    const record = getTranslation(sourceType, sourceId, language);
    if (!record || record.status !== "completed") continue;
    if (hash && record.sourceContentHash !== hash) continue;
    locales.push(language);
  }
  return locales;
}

export async function translateSource(input: {
  sourceType: SourceType;
  sourceId: string;
  language: TargetLocale;
  fields: TranslationFields;
  force?: boolean;
}) {
  return getLocalizedFields({
    ...input,
    generateIfMissing: true,
    force: input.force,
  });
}

export async function translateAllLanguages(input: {
  sourceType: SourceType;
  sourceId: string;
  fields: TranslationFields;
  force?: boolean;
}) {
  const results: Record<string, string> = {};
  for (const language of TARGET_LOCALES) {
    try {
      await translateSource({ ...input, language });
      results[language] = "ok";
    } catch (err) {
      results[language] = sanitizeTranslationError(err);
    }
  }
  return results;
}

export async function onEnglishSourceSaved(sourceType: SourceType, sourceId: string, fields: TranslationFields) {
  const hash = hashContent(fields);
  await markSourceOutdated(sourceType, sourceId, hash);
}

export { listTranslationsForSource, hashContent };

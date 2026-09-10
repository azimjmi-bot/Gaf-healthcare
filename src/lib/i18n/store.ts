import { mkdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import type { TargetLocale } from "@/lib/i18n/languages";
import type { BulkJob, SourceType, TranslationRecord, TranslationStoreFile } from "@/lib/i18n/types";
import { translationKey } from "@/lib/i18n/types";

const FILE = process.env.TRANSLATIONS_FILE || join(process.cwd(), "content/translations.json");

let cache: { at: number; data: TranslationStoreFile } | undefined;
let writeQueue: Promise<void> = Promise.resolve();

function emptyStore(): TranslationStoreFile {
  return { records: {}, bulkJob: null };
}

export function loadTranslations(): TranslationStoreFile {
  const now = Date.now();
  if (cache && now - cache.at < 250) return cache.data;
  try {
    const parsed = JSON.parse(readFileSync(FILE, "utf8")) as TranslationStoreFile;
    const data: TranslationStoreFile = {
      records: parsed.records && typeof parsed.records === "object" ? parsed.records : {},
      bulkJob: parsed.bulkJob ?? null,
    };
    cache = { at: now, data };
    return data;
  } catch {
    const empty = emptyStore();
    cache = { at: now, data: empty };
    return empty;
  }
}

function persist(store: TranslationStoreFile) {
  mkdirSync(dirname(FILE), { recursive: true });
  const tmp = `${FILE}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(store)}\n`);
  renameSync(tmp, FILE);
  cache = { at: Date.now(), data: store };
}

function mutateSync<T>(fn: (store: TranslationStoreFile) => T): T {
  const store = loadTranslations();
  const result = fn(store);
  persist(store);
  return result;
}

/** Serialize writes so concurrent requests cannot clobber the JSON file. */
export function mutateTranslations<T>(fn: (store: TranslationStoreFile) => T): Promise<T> {
  const run = writeQueue.then(() => mutateSync(fn));
  writeQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export function getTranslation(sourceType: SourceType, sourceId: string, language: TargetLocale) {
  return loadTranslations().records[translationKey(sourceType, sourceId, language)];
}

export function listTranslationsForSource(sourceType: SourceType, sourceId: string) {
  return Object.values(loadTranslations().records).filter(
    (row) => row.sourceType === sourceType && row.sourceId === sourceId,
  );
}

export function listCompletedTranslations() {
  return Object.values(loadTranslations().records).filter((row) => row.status === "completed");
}

export function getBulkJob() {
  return loadTranslations().bulkJob;
}

export function upsertTranslation(record: TranslationRecord) {
  return mutateTranslations((store) => {
    store.records[translationKey(record.sourceType, record.sourceId, record.languageCode)] = record;
    return record;
  });
}

export function patchTranslation(
  sourceType: SourceType,
  sourceId: string,
  language: TargetLocale,
  patch: Partial<TranslationRecord>,
) {
  return mutateTranslations((store) => {
    const key = translationKey(sourceType, sourceId, language);
    const current = store.records[key];
    if (!current) return undefined;
    const next = { ...current, ...patch, updatedAt: new Date().toISOString() };
    store.records[key] = next;
    return next;
  });
}

export function markSourceOutdated(sourceType: SourceType, sourceId: string, nextHash: string) {
  return mutateTranslations((store) => {
    let count = 0;
    for (const record of Object.values(store.records)) {
      if (record.sourceType !== sourceType || record.sourceId !== sourceId) continue;
      if (record.sourceContentHash === nextHash && record.status === "completed") continue;
      record.outdated = true;
      record.updatedAt = new Date().toISOString();
      count += 1;
    }
    return count;
  });
}

export function saveBulkJob(job: BulkJob | null) {
  return mutateTranslations((store) => {
    store.bulkJob = job;
    return job;
  });
}

export async function claimTranslationSlot(input: {
  sourceType: SourceType;
  sourceId: string;
  language: TargetLocale;
  sourceContentHash: string;
  sourceVersion: number;
  staleMs?: number;
}): Promise<{ claimed: boolean; record: TranslationRecord }> {
  const staleMs = input.staleMs ?? 120_000;
  const now = new Date().toISOString();
  return mutateTranslations((store) => {
    const key = translationKey(input.sourceType, input.sourceId, input.language);
    const existing = store.records[key];
    if (
      existing?.status === "translating" &&
      Date.now() - new Date(existing.updatedAt).getTime() < staleMs
    ) {
      return { claimed: false, record: existing };
    }
    const record: TranslationRecord = {
      translationId: key,
      sourceType: input.sourceType,
      sourceId: input.sourceId,
      languageCode: input.language,
      fields: existing?.fields ?? {},
      sourceVersion: input.sourceVersion,
      sourceContentHash: input.sourceContentHash,
      status: "translating",
      outdated: existing?.status === "completed",
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      translatedAt: existing?.translatedAt ?? null,
      errorMessage: null,
      errorCategory: null,
    };
    store.records[key] = record;
    return { claimed: true, record };
  });
}

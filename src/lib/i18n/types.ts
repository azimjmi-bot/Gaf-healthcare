import type { TargetLocale } from "@/lib/i18n/languages";

export const TRANSLATION_STATUSES = ["pending", "translating", "completed", "failed"] as const;
export type TranslationStatus = (typeof TRANSLATION_STATUSES)[number];

export const SOURCE_TYPES = [
  "ui",
  "page",
  "doctor",
  "hospital",
  "cost",
  "blog",
  "copy",
] as const;
export type SourceType = (typeof SOURCE_TYPES)[number];

export type TranslationFields = Record<string, string>;

export type TranslationRecord = {
  translationId: string;
  sourceType: SourceType;
  sourceId: string;
  languageCode: TargetLocale;
  fields: TranslationFields;
  sourceVersion: number;
  sourceContentHash: string;
  status: TranslationStatus;
  outdated: boolean;
  createdAt: string;
  updatedAt: string;
  translatedAt: string | null;
  errorMessage: string | null;
  errorCategory: string | null;
};

export type BulkJob = {
  id: string;
  status: "running" | "completed" | "failed" | "cancelled";
  startedAt: string;
  updatedAt: string;
  finishedAt: string | null;
  total: number;
  completed: number;
  failed: number;
  skipped: number;
  sourceTypes: SourceType[];
  languages: TargetLocale[];
  lastError: string | null;
};

export type TranslationStoreFile = {
  records: Record<string, TranslationRecord>;
  bulkJob: BulkJob | null;
};

export function translationKey(sourceType: SourceType, sourceId: string, language: TargetLocale) {
  return `${sourceType}:${sourceId}:${language}`;
}

export function displayTranslationState(
  record: TranslationRecord | undefined,
  currentHash: string,
): "missing" | "current" | "outdated" | "failed" | "translating" | "pending" {
  if (!record) return "missing";
  if (record.status === "translating") return "translating";
  if (record.status === "pending") return "pending";
  if (record.status === "failed") return "failed";
  if (record.status === "completed" && record.sourceContentHash === currentHash && !record.outdated) {
    return "current";
  }
  if (record.status === "completed") return "outdated";
  return "missing";
}

import "server-only";
import { getCostArticle } from "@/data/cost-articles";
import { listPublishedPosts } from "@/lib/blogs";
import { doctors, hospitals, treatments } from "@/lib/data";
import { TARGET_LOCALES, type TargetLocale } from "@/lib/i18n/languages";
import { englishFieldsFor } from "@/lib/i18n/localize";
import { getLocalizedFields } from "@/lib/i18n/service";
import { getBulkJob, saveBulkJob } from "@/lib/i18n/store";
import { hashContent } from "@/lib/i18n/hash";
import { getTranslation } from "@/lib/i18n/store";
import type { SourceType } from "@/lib/i18n/types";
import { displayTranslationState } from "@/lib/i18n/types";
import { sanitizeTranslationError } from "@/lib/i18n/diagnostics";

export type BulkTarget = {
  sourceType: SourceType;
  sourceId: string;
};

const CONCURRENCY = 2;

export function listEligibleTargets(types?: SourceType[]): BulkTarget[] {
  const allow = new Set(types && types.length ? types : (["ui", "page", "blog", "doctor", "hospital", "cost"] as SourceType[]));
  const targets: BulkTarget[] = [];
  if (allow.has("ui")) targets.push({ sourceType: "ui", sourceId: "chrome" });
  if (allow.has("page")) {
    targets.push(
      { sourceType: "page", sourceId: "home" },
      { sourceType: "page", sourceId: "doctors-faqs" },
      { sourceType: "page", sourceId: "hospitals-faqs" },
      { sourceType: "page", sourceId: "costs-faqs" },
      { sourceType: "page", sourceId: "blogs-index" },
    );
  }
  if (allow.has("blog")) {
    for (const post of listPublishedPosts()) targets.push({ sourceType: "blog", sourceId: post.slug });
  }
  if (allow.has("doctor")) {
    for (const doctor of doctors) targets.push({ sourceType: "doctor", sourceId: doctor.slug });
  }
  if (allow.has("hospital")) {
    for (const hospital of hospitals) targets.push({ sourceType: "hospital", sourceId: hospital.slug });
  }
  if (allow.has("cost")) {
    for (const treatment of treatments) {
      void getCostArticle(treatment.slug);
      targets.push({ sourceType: "cost", sourceId: treatment.slug });
    }
  }
  return targets;
}

export function translationInventory() {
  const doctorsCount = doctors.length;
  const hospitalsCount = hospitals.length;
  const costsCount = treatments.length;
  const blogsCount = listPublishedPosts().length;
  return {
    doctors: doctorsCount,
    hospitals: hospitalsCount,
    costs: costsCount,
    blogs: blogsCount,
    pages: 5,
    ui: 1,
    targetLanguages: TARGET_LOCALES,
    eligibleJobs:
      (1 + 5 + blogsCount + doctorsCount + hospitalsCount + costsCount) * TARGET_LOCALES.length,
  };
}

async function translateTarget(target: BulkTarget, language: TargetLocale, force: boolean) {
  const fields = englishFieldsFor(target.sourceType, target.sourceId);
  if (!fields) return "skipped";
  const hash = hashContent(fields);
  const record = getTranslation(target.sourceType, target.sourceId, language);
  const state = displayTranslationState(record, hash);
  if (!force && state === "current") return "skipped";
  await getLocalizedFields({
    sourceType: target.sourceType,
    sourceId: target.sourceId,
    language,
    fields,
    generateIfMissing: true,
    force,
  });
  const next = getTranslation(target.sourceType, target.sourceId, language);
  if (next?.status === "failed") return "failed";
  if (next?.status === "completed") return "completed";
  return "failed";
}

export async function startBulkTranslation(opts: {
  sourceTypes?: SourceType[];
  languages?: TargetLocale[];
  force?: boolean;
}) {
  const current = getBulkJob();
  if (current?.status === "running") {
    return current;
  }
  const languages = opts.languages?.length ? opts.languages : [...TARGET_LOCALES];
  const targets = listEligibleTargets(opts.sourceTypes);
  const jobs = targets.flatMap((target) => languages.map((language) => ({ target, language })));
  const job = {
    id: `bulk_${Date.now().toString(36)}`,
    status: "running" as const,
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    finishedAt: null,
    total: jobs.length,
    completed: 0,
    failed: 0,
    skipped: 0,
    sourceTypes: opts.sourceTypes?.length ? opts.sourceTypes : (["ui", "page", "blog", "doctor", "hospital", "cost"] as SourceType[]),
    languages,
    lastError: null as string | null,
  };
  await saveBulkJob(job);

  void runBulk(jobs, opts.force === true, job.id);
  return job;
}

async function runBulk(
  jobs: { target: BulkTarget; language: TargetLocale }[],
  force: boolean,
  jobId: string,
) {
  let index = 0;
  async function worker() {
    while (index < jobs.length) {
      const live = getBulkJob();
      if (!live || live.id !== jobId || live.status === "cancelled") return;
      const current = index;
      index += 1;
      const item = jobs[current];
      try {
        const result = await translateTarget(item.target, item.language, force);
        const latest = getBulkJob();
        if (!latest || latest.id !== jobId) return;
        if (result === "skipped") latest.skipped += 1;
        else if (result === "failed") latest.failed += 1;
        else latest.completed += 1;
        latest.updatedAt = new Date().toISOString();
        await saveBulkJob(latest);
      } catch (err) {
        const latest = getBulkJob();
        if (!latest || latest.id !== jobId) return;
        latest.failed += 1;
        latest.lastError = sanitizeTranslationError(err);
        latest.updatedAt = new Date().toISOString();
        await saveBulkJob(latest);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  const latest = getBulkJob();
  if (!latest || latest.id !== jobId) return;
  if (latest.status === "cancelled") return;
  latest.status = latest.failed > 0 && latest.completed === 0 ? "failed" : "completed";
  latest.finishedAt = new Date().toISOString();
  latest.updatedAt = latest.finishedAt;
  await saveBulkJob(latest);
}

export async function cancelBulkTranslation() {
  const current = getBulkJob();
  if (!current || current.status !== "running") return current;
  current.status = "cancelled";
  current.finishedAt = new Date().toISOString();
  current.updatedAt = current.finishedAt;
  return saveBulkJob(current);
}

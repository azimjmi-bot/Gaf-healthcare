import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { TARGET_LOCALES, isTargetLocale, type TargetLocale } from "@/lib/i18n/languages";
import { englishFieldsFor } from "@/lib/i18n/localize";
import { sourceStatuses, translateAllLanguages, translateSource } from "@/lib/i18n/service";
import { cancelBulkTranslation, startBulkTranslation, translationInventory } from "@/lib/i18n/bulk";
import { getBulkJob } from "@/lib/i18n/store";
import type { SourceType } from "@/lib/i18n/types";
import { SOURCE_TYPES } from "@/lib/i18n/types";

function asSourceType(value: unknown): SourceType | null {
  return typeof value === "string" && (SOURCE_TYPES as readonly string[]).includes(value)
    ? (value as SourceType)
    : null;
}

export async function GET(request: Request) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(request.url);
  const sourceType = asSourceType(url.searchParams.get("sourceType"));
  const sourceId = url.searchParams.get("sourceId");
  if (sourceType && sourceId) {
    const fields = englishFieldsFor(sourceType, sourceId);
    if (!fields) return NextResponse.json({ error: "Source not found" }, { status: 404 });
    const languages = await sourceStatuses(sourceType, sourceId, fields);
    return NextResponse.json({ sourceType, sourceId, languages, inventory: translationInventory(), job: getBulkJob() });
  }
  return NextResponse.json({ inventory: translationInventory(), job: getBulkJob() });
}

export async function POST(request: Request) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  const action = String(body.action || "translate");

  if (action === "bulk") {
    const sourceTypes = Array.isArray(body.sourceTypes)
      ? body.sourceTypes.map(asSourceType).filter((row): row is SourceType => Boolean(row))
      : undefined;
    const languages = Array.isArray(body.languages)
      ? body.languages.filter((row): row is TargetLocale => typeof row === "string" && isTargetLocale(row))
      : undefined;
    const job = await startBulkTranslation({
      sourceTypes,
      languages,
      force: body.force === true,
    });
    return NextResponse.json({ ok: true, job });
  }

  if (action === "cancel-bulk") {
    const job = await cancelBulkTranslation();
    return NextResponse.json({ ok: true, job });
  }

  const sourceType = asSourceType(body.sourceType);
  const sourceId = typeof body.sourceId === "string" ? body.sourceId : "";
  if (!sourceType || !sourceId) return NextResponse.json({ error: "sourceType and sourceId required" }, { status: 400 });
  const fields = englishFieldsFor(sourceType, sourceId);
  if (!fields) return NextResponse.json({ error: "Source not found" }, { status: 404 });

  if (action === "translate-all") {
    const results = await translateAllLanguages({
      sourceType,
      sourceId,
      fields,
      force: body.force === true,
    });
    return NextResponse.json({ ok: true, results });
  }

  const language = typeof body.language === "string" && isTargetLocale(body.language) ? body.language : null;
  if (!language) return NextResponse.json({ error: "language required" }, { status: 400 });
  await translateSource({
    sourceType,
    sourceId,
    language,
    fields,
    force: action === "regenerate" || body.force === true,
  });
  const languages = await sourceStatuses(sourceType, sourceId, fields);
  return NextResponse.json({ ok: true, languages, targetLanguages: TARGET_LOCALES });
}

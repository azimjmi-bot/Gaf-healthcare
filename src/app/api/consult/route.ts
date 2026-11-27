import { NextResponse } from "next/server";
import {
  buildLeadDedupeKey,
  checkConsultRateLimit,
  consultStore,
  dispatchCoordinatorNotification,
  generateLeadReference,
  MAX_REPORT_FILES,
  MAX_REPORT_TOTAL_BYTES,
  retentionIso,
  validateMedicalReport,
  type AllowedReportMime,
  type ConsultLocale,
  type ReportAttachmentInput,
} from "@/lib/consult-store";

/**
 * Validation failures come back as a code, not as prose.
 *
 * The API has no reliable way to know which language the visitor is reading —
 * the form posts from /consult and from /ar/consult — and a route handler is
 * the wrong place to hold copy anyway. The client maps these to consult.error.*
 * in its own locale.
 */
export type ConsultErrorCode =
  | "invalidRequest"
  | "name"
  | "email"
  | "phone"
  | "country"
  | "selection"
  | "consent"
  | "fileType"
  | "fileSize"
  | "fileCount"
  | "duplicate"
  | "rateLimit"
  | "spam"
  | "storageUnavailable";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_HUMAN_SUBMIT_MS = 800;

function reject(
  error: ConsultErrorCode,
  status = 400,
  extra?: Record<string, unknown>,
  headers?: Record<string, string>,
) {
  return NextResponse.json(
    { ok: false, error, ...extra },
    {
      status,
      headers: {
        "cache-control": "no-store",
        ...headers,
      },
    },
  );
}

function clientIp(request: Request): string {
  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;
  const xff = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (xff) return xff;
  return "unknown";
}

function normalizeLocale(raw: unknown): ConsultLocale {
  const s = String(raw || "en").trim().toLowerCase();
  if (s === "ar" || s === "fr" || s === "ru" || s === "sw") return s;
  return "en";
}

type ParsedSubmission = {
  fields: Record<string, unknown>;
  files: ReportAttachmentInput[];
};

async function parseConsultRequest(request: Request): Promise<ParsedSubmission | null> {
  const contentType = (request.headers.get("content-type") || "").toLowerCase();
  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData().catch(() => null);
    if (!form) return null;
    const fields: Record<string, unknown> = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      country: form.get("country"),
      treatment: form.get("treatment"),
      hospital: form.get("hospital"),
      doctor: form.get("doctor"),
      timeline: form.get("timeline"),
      notes: form.get("notes"),
      consent: form.get("consent") === "on" || form.get("consent") === "true",
      locale: form.get("locale"),
      website: form.get("website"),
      formLoadedAt: form.get("formLoadedAt"),
    };
    const files: ReportAttachmentInput[] = [];
    for (const entry of form.getAll("reports")) {
      if (entry instanceof File && (entry.size > 0 || entry.name)) {
        const bytes = new Uint8Array(await entry.arrayBuffer());
        files.push({
          originalName: entry.name || "report",
          declaredMime: entry.type || "",
          bytes,
        });
      }
    }
    return { fields, files };
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") return null;
  return { fields: body, files: [] };
}

export async function POST(request: Request) {
  const parsed = await parseConsultRequest(request);
  if (!parsed) return reject("invalidRequest");

  const { fields, files } = parsed;

  // Honeypot & automated bot-timing guard.
  const honeypot = String(fields.website || "").trim();
  if (honeypot.length > 0) {
    return reject("spam", 400);
  }
  const loadedAtRaw = Number(fields.formLoadedAt);
  if (Number.isFinite(loadedAtRaw) && loadedAtRaw > 0) {
    const elapsed = Date.now() - loadedAtRaw;
    if (elapsed < MIN_HUMAN_SUBMIT_MS) {
      return reject("spam", 400);
    }
  }

  const rate = checkConsultRateLimit(clientIp(request));
  if (!rate.allowed) {
    return reject(
      "rateLimit",
      429,
      undefined,
      { "retry-after": String(rate.retryAfterSeconds) },
    );
  }

  const name = String(fields.name || "").trim().slice(0, 120);
  const email = String(fields.email || "").trim().slice(0, 180);
  const phone = String(fields.phone || "").trim().slice(0, 40);
  const country = String(fields.country || "").trim().slice(0, 80);
  const treatment = String(fields.treatment || "").trim().slice(0, 120);
  const hospital = String(fields.hospital || "").trim().slice(0, 120);
  const doctor = String(fields.doctor || "").trim().slice(0, 120);
  const timeline = String(fields.timeline || "").trim().slice(0, 40);
  const notes = String(fields.notes || "").trim().slice(0, 4000);
  const consent = Boolean(fields.consent);
  const locale = normalizeLocale(fields.locale);

  if (name.length < 2) return reject("name");
  if (!EMAIL_RE.test(email)) return reject("email");
  const phoneDigits = phone.replace(/\D+/g, "");
  if (phoneDigits.length < 7 || phoneDigits.length > 18) return reject("phone");
  if (country.length < 2) return reject("country");
  if (!treatment || !timeline) return reject("selection");
  if (!consent) return reject("consent");

  if (files.length > MAX_REPORT_FILES) {
    return reject("fileCount");
  }
  let totalBytes = 0;
  const validatedReports: Array<
    ReportAttachmentInput & {
      mime: AllowedReportMime;
      ext: "pdf" | "jpg" | "png" | "webp";
      safeName: string;
      sha256: string;
    }
  > = [];
  for (const file of files) {
    totalBytes += file.bytes.byteLength;
    if (totalBytes > MAX_REPORT_TOTAL_BYTES) {
      return reject("fileSize");
    }
    const result = validateMedicalReport(file);
    if (!result.ok) {
      return reject(result.error);
    }
    validatedReports.push({
      ...file,
      mime: result.mime,
      ext: result.ext,
      safeName: result.safeName,
      sha256: result.sha256,
    });
  }

  const store = consultStore();
  const dedupeKey = buildLeadDedupeKey({ email, phone, treatment, hospital });

  try {
    const duplicate = await store.findDuplicate(dedupeKey);
    if (duplicate) {
      return reject("duplicate", 409, { reference: duplicate.reference });
    }

    const now = new Date();
    const { id, reference } = generateLeadReference(now);
    const saved = await store.saveLead(
      {
        id,
        reference,
        locale,
        status: "new",
        createdAt: now.toISOString(),
        retainUntil: retentionIso(now),
        name,
        email,
        phone,
        country,
        treatment,
        hospital,
        doctor,
        timeline,
        notes,
        consent: true,
        dedupeKey,
      },
      validatedReports,
      (lead) => dispatchCoordinatorNotification(lead),
    );

    return NextResponse.json(
      {
        ok: true,
        persisted: true,
        reference: saved.reference,
        attachmentCount: saved.attachments.length,
        notificationStatus: saved.notification.status,
      },
      {
        status: 201,
        headers: { "cache-control": "no-store" },
      },
    );
  } catch {
    return reject("storageUnavailable", 503);
  }
}

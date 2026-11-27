import { createHash, randomBytes, webcrypto } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { R2BucketLike, R2ObjectBodyLike, R2ObjectLike } from "@/lib/storage/r2";

export type ConsultLocale = "en" | "ar" | "fr" | "ru" | "sw";

export const MAX_REPORT_FILES = 3;
export const MAX_REPORT_FILE_BYTES = 5 * 1024 * 1024;
export const MAX_REPORT_TOTAL_BYTES = 12 * 1024 * 1024;
export const LEAD_RETENTION_DAYS = 90;
export const DEDUPE_WINDOW_MS = 15 * 60 * 1000;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
export const RATE_LIMIT_MAX_ATTEMPTS = 5;

export type AllowedReportMime =
  | "application/pdf"
  | "image/jpeg"
  | "image/png"
  | "image/webp";

export type ReportAttachmentInput = {
  originalName: string;
  declaredMime: string;
  bytes: Uint8Array;
};

export type StoredReportAttachment = {
  fileId: string;
  originalName: string;
  mime: AllowedReportMime;
  ext: "pdf" | "jpg" | "png" | "webp";
  size: number;
  sha256: string;
  storageKey: string;
  encrypted: boolean;
  uploadedAt: string;
  retainUntil: string;
};

export type LeadStatus = "new" | "reviewed" | "contacted" | "archived";

export type NotificationReceipt = {
  channel: "webhook" | "resend" | "cms-inbox";
  status: "delivered" | "queued_in_cms_inbox" | "failed";
  attemptedAt: string;
  detail?: string;
};

export type PersistedConsultLead = {
  id: string;
  reference: string;
  locale: ConsultLocale;
  status: LeadStatus;
  createdAt: string;
  retainUntil: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  treatment: string;
  hospital: string;
  doctor: string;
  timeline: string;
  notes: string;
  consent: true;
  attachments: StoredReportAttachment[];
  notification: NotificationReceipt;
  dedupeKey: string;
};

export type ReportValidationResult =
  | {
      ok: true;
      mime: AllowedReportMime;
      ext: "pdf" | "jpg" | "png" | "webp";
      safeName: string;
      sha256: string;
    }
  | { ok: false; error: "fileType" | "fileSize" };

export interface ConsultStoreBackend {
  saveLead(
    lead: Omit<PersistedConsultLead, "attachments" | "notification">,
    reports: Array<ReportAttachmentInput & { mime: AllowedReportMime; ext: "pdf" | "jpg" | "png" | "webp"; safeName: string; sha256: string }>,
    notify: (saved: PersistedConsultLead) => Promise<NotificationReceipt>,
  ): Promise<PersistedConsultLead>;
  findDuplicate(dedupeKey: string, nowMs?: number): Promise<{ reference: string; createdAt: string } | null>;
  listLeads(limit?: number): Promise<PersistedConsultLead[]>;
  getLead(id: string): Promise<PersistedConsultLead | null>;
  updateLeadStatus(id: string, status: LeadStatus): Promise<PersistedConsultLead | null>;
  getReportBytes(leadId: string, fileId: string): Promise<{ attachment: StoredReportAttachment; bytes: Uint8Array } | null>;
}

export type ConsultNotificationConfig = {
  webhookUrl?: string;
  resendApiKey?: string;
  notifyEmail?: string;
  fromEmail?: string;
};

const STORE_SYMBOL = Symbol.for("gaf.consult-store");
const NOTIFY_SYMBOL = Symbol.for("gaf.consult-notify-config");
const RATE_LIMIT_SYMBOL = Symbol.for("gaf.consult-rate-limit");

const PRIVATE_LEADS_PREFIX = "private/consult-leads/";
const PRIVATE_REPORTS_PREFIX = "private/consult-reports/";
const PRIVATE_DEDUPE_PREFIX = "private/consult-leads/.dedupe/";

type EncryptedEnvelope = {
  v: 1;
  alg: "AES-256-GCM";
  iv: string;
  ciphertext: string;
};

function hasBody(object: R2ObjectBodyLike | R2ObjectLike | null): object is R2ObjectBodyLike {
  return object !== null && typeof (object as R2ObjectBodyLike).arrayBuffer === "function";
}

function sanitizeFilename(raw: string, ext: string): string {
  const stem = raw
    .replace(/^.*[/\\]/, "")
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
  return `${stem || "medical-report"}.${ext}`;
}

function sniffReportSignature(bytes: Uint8Array): { mime: AllowedReportMime; ext: "pdf" | "jpg" | "png" | "webp" } | null {
  if (bytes.byteLength < 8) return null;
  // %PDF-
  if (
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46 &&
    bytes[4] === 0x2d
  ) {
    return { mime: "application/pdf", ext: "pdf" };
  }
  // JPEG: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { mime: "image/jpeg", ext: "jpg" };
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return { mime: "image/png", ext: "png" };
  }
  // WEBP: RIFF....WEBP
  if (
    bytes.byteLength >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return { mime: "image/webp", ext: "webp" };
  }
  return null;
}

const EXT_FOR_DECLARED_MIME: Record<string, AllowedReportMime> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export function validateMedicalReport(input: ReportAttachmentInput): ReportValidationResult {
  if (input.bytes.byteLength <= 0 || input.bytes.byteLength > MAX_REPORT_FILE_BYTES) {
    return { ok: false, error: "fileSize" };
  }
  const sniffed = sniffReportSignature(input.bytes);
  if (!sniffed) {
    return { ok: false, error: "fileType" };
  }
  const extMatch = input.originalName.toLowerCase().match(/\.([a-z0-9]+)$/);
  if (extMatch) {
    const expectedMime = EXT_FOR_DECLARED_MIME[extMatch[1]];
    if (!expectedMime || expectedMime !== sniffed.mime) {
      return { ok: false, error: "fileType" };
    }
  }
  const declared = input.declaredMime.trim().toLowerCase();
  if (declared && declared !== "application/octet-stream" && declared !== sniffed.mime) {
    if (!(declared === "image/jpg" && sniffed.mime === "image/jpeg")) {
      return { ok: false, error: "fileType" };
    }
  }
  const sha256 = createHash("sha256").update(input.bytes).digest("hex");
  return {
    ok: true,
    mime: sniffed.mime,
    ext: sniffed.ext,
    safeName: sanitizeFilename(input.originalName, sniffed.ext),
    sha256,
  };
}

export function buildLeadDedupeKey(fields: {
  email: string;
  phone: string;
  treatment: string;
  hospital: string;
}): string {
  const email = fields.email.trim().toLowerCase();
  const phoneDigits = fields.phone.replace(/\D+/g, "");
  const treatment = fields.treatment.trim().toLowerCase();
  const hospital = fields.hospital.trim().toLowerCase();
  return createHash("sha256")
    .update(`${email}|${phoneDigits}|${treatment}|${hospital}`)
    .digest("hex")
    .slice(0, 32);
}

export function generateLeadReference(now = new Date()): { id: string; reference: string } {
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = randomBytes(4).toString("hex").toUpperCase();
  const id = `${datePart}-${rand}`;
  return { id, reference: `GAF-${datePart.slice(2)}-${rand.slice(0, 6)}` };
}

export function retentionIso(now = new Date(), days = LEAD_RETENTION_DAYS): string {
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString();
}

async function importAesKey(secret: string) {
  const digest = createHash("sha256").update(`gaf-consult-at-rest:${secret}`).digest();
  return webcrypto.subtle.importKey("raw", digest, { name: "AES-GCM" }, false, [
    "encrypt",
    "decrypt",
  ]);
}

async function encryptBytes(bytes: Uint8Array, secret: string): Promise<Uint8Array> {
  const key = await importAesKey(secret);
  const iv = randomBytes(12);
  const cipher = await webcrypto.subtle.encrypt({ name: "AES-GCM", iv }, key, bytes);
  const envelope: EncryptedEnvelope = {
    v: 1,
    alg: "AES-256-GCM",
    iv: Buffer.from(iv).toString("base64"),
    ciphertext: Buffer.from(cipher).toString("base64"),
  };
  return new TextEncoder().encode(JSON.stringify(envelope));
}

async function decryptBytes(raw: Uint8Array, secret: string): Promise<Uint8Array> {
  const envelope = JSON.parse(new TextDecoder().decode(raw)) as EncryptedEnvelope;
  if (envelope.v !== 1 || envelope.alg !== "AES-256-GCM") {
    throw new Error("Unsupported encrypted payload envelope");
  }
  const key = await importAesKey(secret);
  const iv = Buffer.from(envelope.iv, "base64");
  const ciphertext = Buffer.from(envelope.ciphertext, "base64");
  const plain = await webcrypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
  return new Uint8Array(plain);
}

function encodeUtf8(value: string): Uint8Array {
  return new TextEncoder().encode(value);
}

function decodeUtf8(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

export class R2ConsultStore implements ConsultStoreBackend {
  private readonly bucket: R2BucketLike;
  private readonly encryptionSecret?: string;

  constructor(options: { bucket: R2BucketLike; encryptionSecret?: string }) {
    this.bucket = options.bucket;
    this.encryptionSecret = options.encryptionSecret?.trim() || undefined;
  }

  private async seal(bytes: Uint8Array): Promise<{ body: Uint8Array; encrypted: boolean }> {
    if (!this.encryptionSecret) return { body: bytes, encrypted: false };
    return { body: await encryptBytes(bytes, this.encryptionSecret), encrypted: true };
  }

  private async unseal(bytes: Uint8Array, encrypted: boolean): Promise<Uint8Array> {
    if (!encrypted) return bytes;
    if (!this.encryptionSecret) {
      throw new Error("Missing encryption secret to decrypt consultation data");
    }
    return decryptBytes(bytes, this.encryptionSecret);
  }

  private async readLeadObject(key: string): Promise<PersistedConsultLead | null> {
    const obj = await this.bucket.get(key);
    if (!hasBody(obj)) return null;
    const raw = new Uint8Array(await obj.arrayBuffer());
    const text = decodeUtf8(raw);
    const parsed = JSON.parse(text) as PersistedConsultLead | EncryptedEnvelope;
    if ("alg" in parsed && parsed.alg === "AES-256-GCM") {
      const plain = await this.unseal(raw, true);
      return JSON.parse(decodeUtf8(plain)) as PersistedConsultLead;
    }
    return parsed as PersistedConsultLead;
  }

  private async writeLeadObject(lead: PersistedConsultLead): Promise<void> {
    const jsonBytes = encodeUtf8(JSON.stringify(lead));
    const sealed = await this.seal(jsonBytes);
    await this.bucket.put(`${PRIVATE_LEADS_PREFIX}${lead.id}.json`, sealed.body, {
      httpMetadata: { contentType: "application/json; charset=utf-8" },
    });
  }

  async findDuplicate(
    dedupeKey: string,
    nowMs = Date.now(),
  ): Promise<{ reference: string; createdAt: string } | null> {
    const obj = await this.bucket.get(`${PRIVATE_DEDUPE_PREFIX}${dedupeKey}.json`);
    if (!hasBody(obj)) return null;
    try {
      const marker = JSON.parse(decodeUtf8(new Uint8Array(await obj.arrayBuffer()))) as {
        reference: string;
        createdAt: string;
        expiresAtMs: number;
      };
      if (marker.expiresAtMs > nowMs) {
        return { reference: marker.reference, createdAt: marker.createdAt };
      }
      await this.bucket.delete(`${PRIVATE_DEDUPE_PREFIX}${dedupeKey}.json`);
    } catch {
      return null;
    }
    return null;
  }

  async saveLead(
    leadBase: Omit<PersistedConsultLead, "attachments" | "notification">,
    reports: Array<
      ReportAttachmentInput & {
        mime: AllowedReportMime;
        ext: "pdf" | "jpg" | "png" | "webp";
        safeName: string;
        sha256: string;
      }
    >,
    notify: (saved: PersistedConsultLead) => Promise<NotificationReceipt>,
  ): Promise<PersistedConsultLead> {
    const attachments: StoredReportAttachment[] = [];
    for (const report of reports) {
      const fileId = randomBytes(8).toString("hex");
      const storageKey = `${PRIVATE_REPORTS_PREFIX}${leadBase.id}/${fileId}.${report.ext}`;
      const sealed = await this.seal(report.bytes);
      await this.bucket.put(storageKey, sealed.body, {
        httpMetadata: {
          contentType: sealed.encrypted ? "application/octet-stream" : report.mime,
        },
      });
      attachments.push({
        fileId,
        originalName: report.safeName,
        mime: report.mime,
        ext: report.ext,
        size: report.bytes.byteLength,
        sha256: report.sha256,
        storageKey,
        encrypted: sealed.encrypted,
        uploadedAt: leadBase.createdAt,
        retainUntil: leadBase.retainUntil,
      });
    }

    const draftLead: PersistedConsultLead = {
      ...leadBase,
      attachments,
      notification: {
        channel: "cms-inbox",
        status: "queued_in_cms_inbox",
        attemptedAt: leadBase.createdAt,
      },
    };
    await this.writeLeadObject(draftLead);

    const notification = await notify(draftLead);
    const finalized: PersistedConsultLead = { ...draftLead, notification };
    await this.writeLeadObject(finalized);

    await this.bucket.put(
      `${PRIVATE_DEDUPE_PREFIX}${leadBase.dedupeKey}.json`,
      JSON.stringify({
        reference: leadBase.reference,
        createdAt: leadBase.createdAt,
        expiresAtMs: Date.parse(leadBase.createdAt) + DEDUPE_WINDOW_MS,
      }),
      { httpMetadata: { contentType: "application/json; charset=utf-8" } },
    );

    return finalized;
  }

  async listLeads(limit = 100): Promise<PersistedConsultLead[]> {
    const keys: string[] = [];
    let cursor: string | undefined;
    do {
      const page = await this.bucket.list({ prefix: PRIVATE_LEADS_PREFIX, cursor, limit: 1000 });
      for (const obj of page.objects) {
        if (!obj.key.startsWith(PRIVATE_DEDUPE_PREFIX) && obj.key.endsWith(".json")) {
          keys.push(obj.key);
        }
      }
      cursor = page.truncated ? page.cursor : undefined;
    } while (cursor);

    keys.sort().reverse();
    const slice = keys.slice(0, Math.max(1, limit));
    const leads: PersistedConsultLead[] = [];
    const nowMs = Date.now();
    for (const key of slice) {
      const lead = await this.readLeadObject(key).catch(() => null);
      if (!lead) continue;
      if (Date.parse(lead.retainUntil) <= nowMs) {
        await this.purgeLead(lead);
        continue;
      }
      leads.push(lead);
    }
    return leads.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  async getLead(id: string): Promise<PersistedConsultLead | null> {
    if (!/^[a-z0-9-]+$/i.test(id)) return null;
    const lead = await this.readLeadObject(`${PRIVATE_LEADS_PREFIX}${id}.json`).catch(() => null);
    if (!lead) return null;
    if (Date.parse(lead.retainUntil) <= Date.now()) {
      await this.purgeLead(lead);
      return null;
    }
    return lead;
  }

  async updateLeadStatus(id: string, status: LeadStatus): Promise<PersistedConsultLead | null> {
    const lead = await this.getLead(id);
    if (!lead) return null;
    const updated: PersistedConsultLead = { ...lead, status };
    await this.writeLeadObject(updated);
    return updated;
  }

  async getReportBytes(
    leadId: string,
    fileId: string,
  ): Promise<{ attachment: StoredReportAttachment; bytes: Uint8Array } | null> {
    const lead = await this.getLead(leadId);
    if (!lead) return null;
    const attachment = lead.attachments.find((item) => item.fileId === fileId);
    if (!attachment) return null;
    const obj = await this.bucket.get(attachment.storageKey);
    if (!hasBody(obj)) return null;
    const raw = new Uint8Array(await obj.arrayBuffer());
    const bytes = await this.unseal(raw, attachment.encrypted);
    return { attachment, bytes };
  }

  private async purgeLead(lead: PersistedConsultLead): Promise<void> {
    await this.bucket.delete(`${PRIVATE_LEADS_PREFIX}${lead.id}.json`).catch(() => {});
    for (const att of lead.attachments) {
      await this.bucket.delete(att.storageKey).catch(() => {});
    }
  }
}

export class MemoryConsultStore implements ConsultStoreBackend {
  private readonly leads = new Map<string, PersistedConsultLead>();
  private readonly reports = new Map<string, Uint8Array>();
  private readonly dedupe = new Map<string, { reference: string; createdAt: string; expiresAtMs: number }>();

  async findDuplicate(dedupeKey: string, nowMs = Date.now()) {
    const hit = this.dedupe.get(dedupeKey);
    if (!hit) return null;
    if (hit.expiresAtMs <= nowMs) {
      this.dedupe.delete(dedupeKey);
      return null;
    }
    return { reference: hit.reference, createdAt: hit.createdAt };
  }

  async saveLead(
    leadBase: Omit<PersistedConsultLead, "attachments" | "notification">,
    reports: Array<
      ReportAttachmentInput & {
        mime: AllowedReportMime;
        ext: "pdf" | "jpg" | "png" | "webp";
        safeName: string;
        sha256: string;
      }
    >,
    notify: (saved: PersistedConsultLead) => Promise<NotificationReceipt>,
  ): Promise<PersistedConsultLead> {
    const attachments: StoredReportAttachment[] = reports.map((report) => {
      const fileId = randomBytes(8).toString("hex");
      const storageKey = `${PRIVATE_REPORTS_PREFIX}${leadBase.id}/${fileId}.${report.ext}`;
      this.reports.set(storageKey, report.bytes.slice());
      return {
        fileId,
        originalName: report.safeName,
        mime: report.mime,
        ext: report.ext,
        size: report.bytes.byteLength,
        sha256: report.sha256,
        storageKey,
        encrypted: true,
        uploadedAt: leadBase.createdAt,
        retainUntil: leadBase.retainUntil,
      };
    });

    const draft: PersistedConsultLead = {
      ...leadBase,
      attachments,
      notification: {
        channel: "cms-inbox",
        status: "queued_in_cms_inbox",
        attemptedAt: leadBase.createdAt,
      },
    };
    this.leads.set(draft.id, draft);
    const notification = await notify(draft);
    const finalized: PersistedConsultLead = { ...draft, notification };
    this.leads.set(finalized.id, finalized);
    this.dedupe.set(leadBase.dedupeKey, {
      reference: leadBase.reference,
      createdAt: leadBase.createdAt,
      expiresAtMs: Date.parse(leadBase.createdAt) + DEDUPE_WINDOW_MS,
    });
    return finalized;
  }

  async listLeads(limit = 100) {
    return [...this.leads.values()]
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .slice(0, limit);
  }

  async getLead(id: string) {
    return this.leads.get(id) ?? null;
  }

  async updateLeadStatus(id: string, status: LeadStatus) {
    const existing = this.leads.get(id);
    if (!existing) return null;
    const next = { ...existing, status };
    this.leads.set(id, next);
    return next;
  }

  async getReportBytes(leadId: string, fileId: string) {
    const lead = this.leads.get(leadId);
    const attachment = lead?.attachments.find((item) => item.fileId === fileId);
    if (!lead || !attachment) return null;
    const bytes = this.reports.get(attachment.storageKey);
    if (!bytes) return null;
    return { attachment, bytes: bytes.slice() };
  }
}

export class FsConsultStore implements ConsultStoreBackend {
  private readonly dir: string;
  private readonly encryptionSecret?: string;

  constructor(dir = path.join(process.cwd(), ".gaf-local-leads"), encryptionSecret?: string) {
    this.dir = dir;
    this.encryptionSecret = encryptionSecret?.trim() || undefined;
  }

  private ensureDirs() {
    mkdirSync(path.join(this.dir, "leads"), { recursive: true });
    mkdirSync(path.join(this.dir, "reports"), { recursive: true });
    mkdirSync(path.join(this.dir, "dedupe"), { recursive: true });
  }

  private async seal(bytes: Uint8Array) {
    if (!this.encryptionSecret) return { body: bytes, encrypted: false };
    return { body: await encryptBytes(bytes, this.encryptionSecret), encrypted: true };
  }

  private async unseal(bytes: Uint8Array, encrypted: boolean) {
    if (!encrypted) return bytes;
    if (!this.encryptionSecret) throw new Error("Missing encryption secret");
    return decryptBytes(bytes, this.encryptionSecret);
  }

  async findDuplicate(dedupeKey: string, nowMs = Date.now()) {
    const file = path.join(this.dir, "dedupe", `${dedupeKey}.json`);
    if (!existsSync(file)) return null;
    try {
      const parsed = JSON.parse(readFileSync(file, "utf8")) as {
        reference: string;
        createdAt: string;
        expiresAtMs: number;
      };
      if (parsed.expiresAtMs > nowMs) {
        return { reference: parsed.reference, createdAt: parsed.createdAt };
      }
      rmSync(file, { force: true });
    } catch {
      return null;
    }
    return null;
  }

  async saveLead(
    leadBase: Omit<PersistedConsultLead, "attachments" | "notification">,
    reports: Array<
      ReportAttachmentInput & {
        mime: AllowedReportMime;
        ext: "pdf" | "jpg" | "png" | "webp";
        safeName: string;
        sha256: string;
      }
    >,
    notify: (saved: PersistedConsultLead) => Promise<NotificationReceipt>,
  ): Promise<PersistedConsultLead> {
    this.ensureDirs();
    const attachments: StoredReportAttachment[] = [];
    for (const report of reports) {
      const fileId = randomBytes(8).toString("hex");
      const storageKey = `${PRIVATE_REPORTS_PREFIX}${leadBase.id}/${fileId}.${report.ext}`;
      const sealed = await this.seal(report.bytes);
      const reportDir = path.join(this.dir, "reports", leadBase.id);
      mkdirSync(reportDir, { recursive: true });
      writeFileSync(path.join(reportDir, `${fileId}.${report.ext}`), sealed.body);
      attachments.push({
        fileId,
        originalName: report.safeName,
        mime: report.mime,
        ext: report.ext,
        size: report.bytes.byteLength,
        sha256: report.sha256,
        storageKey,
        encrypted: sealed.encrypted,
        uploadedAt: leadBase.createdAt,
        retainUntil: leadBase.retainUntil,
      });
    }

    const draft: PersistedConsultLead = {
      ...leadBase,
      attachments,
      notification: {
        channel: "cms-inbox",
        status: "queued_in_cms_inbox",
        attemptedAt: leadBase.createdAt,
      },
    };
    await this.writeLead(draft);
    const notification = await notify(draft);
    const finalized: PersistedConsultLead = { ...draft, notification };
    await this.writeLead(finalized);
    writeFileSync(
      path.join(this.dir, "dedupe", `${leadBase.dedupeKey}.json`),
      JSON.stringify({
        reference: leadBase.reference,
        createdAt: leadBase.createdAt,
        expiresAtMs: Date.parse(leadBase.createdAt) + DEDUPE_WINDOW_MS,
      }),
    );
    return finalized;
  }

  private async writeLead(lead: PersistedConsultLead) {
    const sealed = await this.seal(encodeUtf8(JSON.stringify(lead)));
    writeFileSync(path.join(this.dir, "leads", `${lead.id}.json`), sealed.body);
  }

  private async readLeadFile(file: string): Promise<PersistedConsultLead | null> {
    if (!existsSync(file)) return null;
    const raw = new Uint8Array(readFileSync(file));
    const parsed = JSON.parse(decodeUtf8(raw)) as PersistedConsultLead | EncryptedEnvelope;
    if ("alg" in parsed && parsed.alg === "AES-256-GCM") {
      return JSON.parse(decodeUtf8(await this.unseal(raw, true))) as PersistedConsultLead;
    }
    return parsed as PersistedConsultLead;
  }

  async listLeads(limit = 100): Promise<PersistedConsultLead[]> {
    const leadsDir = path.join(this.dir, "leads");
    if (!existsSync(leadsDir)) return [];
    const files = readdirSync(leadsDir)
      .filter((name) => name.endsWith(".json"))
      .sort()
      .reverse()
      .slice(0, limit);
    const out: PersistedConsultLead[] = [];
    for (const name of files) {
      const lead = await this.readLeadFile(path.join(leadsDir, name)).catch(() => null);
      if (lead) out.push(lead);
    }
    return out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  async getLead(id: string): Promise<PersistedConsultLead | null> {
    if (!/^[a-z0-9-]+$/i.test(id)) return null;
    return this.readLeadFile(path.join(this.dir, "leads", `${id}.json`)).catch(() => null);
  }

  async updateLeadStatus(id: string, status: LeadStatus): Promise<PersistedConsultLead | null> {
    const lead = await this.getLead(id);
    if (!lead) return null;
    const next = { ...lead, status };
    await this.writeLead(next);
    return next;
  }

  async getReportBytes(leadId: string, fileId: string) {
    const lead = await this.getLead(leadId);
    const attachment = lead?.attachments.find((item) => item.fileId === fileId);
    if (!lead || !attachment) return null;
    const filePath = path.join(this.dir, "reports", leadId, `${attachment.fileId}.${attachment.ext}`);
    if (!existsSync(filePath)) return null;
    const raw = new Uint8Array(readFileSync(filePath));
    const bytes = await this.unseal(raw, attachment.encrypted);
    return { attachment, bytes };
  }
}

export function setConsultStore(backend: ConsultStoreBackend | undefined) {
  const holder = globalThis as Record<symbol, ConsultStoreBackend | undefined>;
  holder[STORE_SYMBOL] = backend;
}

export function setConsultNotificationConfig(config: ConsultNotificationConfig | undefined) {
  const holder = globalThis as Record<symbol, ConsultNotificationConfig | undefined>;
  holder[NOTIFY_SYMBOL] = config;
}

export function consultNotificationConfig(): ConsultNotificationConfig {
  const holder = globalThis as Record<symbol, ConsultNotificationConfig | undefined>;
  if (holder[NOTIFY_SYMBOL]) return holder[NOTIFY_SYMBOL]!;
  return {
    webhookUrl: process.env.CONSULT_WEBHOOK_URL,
    resendApiKey: process.env.RESEND_API_KEY,
    notifyEmail: process.env.CONSULT_NOTIFY_EMAIL,
    fromEmail: process.env.CONSULT_FROM_EMAIL,
  };
}

export function consultStore(): ConsultStoreBackend {
  const holder = globalThis as Record<symbol, ConsultStoreBackend | undefined>;
  if (holder[STORE_SYMBOL]) return holder[STORE_SYMBOL]!;
  if (process.env.GAF_STORAGE === "r2") {
    throw new Error("GAF_STORAGE=r2 requires Worker runtime to install consult store");
  }
  const secret =
    process.env.CONSULT_ENCRYPTION_KEY ||
    process.env.CMS_SESSION_SECRET ||
    process.env.CMS_PASSWORD;
  holder[STORE_SYMBOL] = new FsConsultStore(undefined, secret);
  return holder[STORE_SYMBOL]!;
}

type RateEntry = number[];

export function checkConsultRateLimit(
  clientKey: string,
  nowMs = Date.now(),
  maxAttempts = RATE_LIMIT_MAX_ATTEMPTS,
  windowMs = RATE_LIMIT_WINDOW_MS,
): { allowed: boolean; retryAfterSeconds: number } {
  const holder = globalThis as Record<symbol, Map<string, RateEntry> | undefined>;
  const map = (holder[RATE_LIMIT_SYMBOL] ??= new Map<string, RateEntry>());
  const cutoff = nowMs - windowMs;
  const recent = (map.get(clientKey) ?? []).filter((ts) => ts > cutoff);
  if (recent.length >= maxAttempts) {
    const oldest = recent[0] ?? nowMs;
    const retryAfterSeconds = Math.max(1, Math.ceil((oldest + windowMs - nowMs) / 1000));
    map.set(clientKey, recent);
    return { allowed: false, retryAfterSeconds };
  }
  recent.push(nowMs);
  map.set(clientKey, recent);
  return { allowed: true, retryAfterSeconds: 0 };
}

export function resetConsultRateLimits() {
  const holder = globalThis as Record<symbol, Map<string, RateEntry> | undefined>;
  holder[RATE_LIMIT_SYMBOL]?.clear();
}

export async function dispatchCoordinatorNotification(
  lead: PersistedConsultLead,
  config = consultNotificationConfig(),
  fetchImpl: typeof fetch = fetch,
): Promise<NotificationReceipt> {
  const attemptedAt = new Date().toISOString();
  // Never emit medical reports, raw notes, or patient contacts in third-party webhooks
  // unless sending via an explicitly configured coordinator relay.
  if (config.webhookUrl && /^https:\/\//i.test(config.webhookUrl)) {
    try {
      const response = await fetchImpl(config.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "gaf.consult.submitted",
          reference: lead.reference,
          locale: lead.locale,
          treatment: lead.treatment,
          hospital: lead.hospital,
          doctor: lead.doctor,
          timeline: lead.timeline,
          country: lead.country,
          attachmentCount: lead.attachments.length,
          createdAt: lead.createdAt,
          cmsInboxPath: "/cms/leads",
        }),
      });
      if (response.ok) {
        return { channel: "webhook", status: "delivered", attemptedAt };
      }
      return {
        channel: "webhook",
        status: "failed",
        attemptedAt,
        detail: `HTTP ${response.status}`,
      };
    } catch (error) {
      return {
        channel: "webhook",
        status: "failed",
        attemptedAt,
        detail: error instanceof Error ? error.message : "network_error",
      };
    }
  }

  if (config.resendApiKey && config.notifyEmail) {
    try {
      const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: config.fromEmail || "GAF Healthcare Desk <care@gaf.healthcare>",
          to: [config.notifyEmail],
          subject: `[GAF Consult] ${lead.reference} (${lead.locale.toUpperCase()})`,
          text: [
            `New consultation dossier persisted: ${lead.reference}`,
            `Locale: ${lead.locale}`,
            `Treatment: ${lead.treatment}`,
            `Hospital: ${lead.hospital || "open"}`,
            `Timeline: ${lead.timeline}`,
            `Attachments: ${lead.attachments.length}`,
            `Review securely in CMS: /cms/leads`,
          ].join("\n"),
        }),
      });
      if (response.ok) {
        return { channel: "resend", status: "delivered", attemptedAt };
      }
      return {
        channel: "resend",
        status: "failed",
        attemptedAt,
        detail: `HTTP ${response.status}`,
      };
    } catch (error) {
      return {
        channel: "resend",
        status: "failed",
        attemptedAt,
        detail: error instanceof Error ? error.message : "network_error",
      };
    }
  }

  return {
    channel: "cms-inbox",
    status: "queued_in_cms_inbox",
    attemptedAt,
    detail: "Saved to private CMS coordinator inbox",
  };
}

import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST as consultPost } from "@/app/api/consult/route";
import { GET as cmsReportGet } from "@/app/api/cms/leads/[id]/report/route";
import { sanitizeGaParams, trackGaEvent } from "@/lib/analytics";
import {
  MemoryConsultStore,
  R2ConsultStore,
  resetConsultRateLimits,
  setConsultNotificationConfig,
  setConsultStore,
  validateMedicalReport,
  type PersistedConsultLead,
} from "@/lib/consult-store";
import { localePageIsRenderable, localePageState } from "@/lib/i18n/locale-publication";
import { localeSurfaceIsAvailable } from "@/lib/i18n/locale-availability";
import { FakeR2Bucket } from "@/lib/storage/fake-r2-bucket";
import { MANIFEST_KEY, VERSION_KEY } from "@/lib/storage/r2";
import { createWorker, type WorkerEnv } from "@/worker/runtime";

function fakeAssets() {
  return {
    async fetch() {
      return new Response("Not Found", { status: 404 });
    },
  };
}

function pdfBytes(body = "1 0 obj <<>> endobj"): Uint8Array {
  return new TextEncoder().encode(`%PDF-1.4\n${body}`);
}

function pngBytes(): Uint8Array {
  return new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00]);
}

function makeConsultFormData(overrides: Record<string, string | File[]> = {}) {
  const form = new FormData();
  form.set("name", "Amina Hassan");
  form.set("email", "amina@example.org");
  form.set("phone", "+254712345678");
  form.set("country", "Kenya");
  form.set("treatment", "chemotherapy");
  form.set("hospital", "apollo-delhi");
  form.set("doctor", "dr-anil-kumar-anand");
  form.set("timeline", "near");
  form.set("notes", "Recent PET-CT attached.");
  form.set("consent", "true");
  form.set("locale", "en");
  form.set("website", "");
  form.set("formLoadedAt", String(Date.now() - 5_000));
  for (const [key, val] of Object.entries(overrides)) {
    if (key === "reports" && Array.isArray(val)) {
      for (const f of val) form.append("reports", f);
    } else if (typeof val === "string") {
      form.set(key, val);
    }
  }
  return form;
}

let store: MemoryConsultStore;

beforeEach(() => {
  store = new MemoryConsultStore();
  setConsultStore(store);
  setConsultNotificationConfig({});
  resetConsultRateLimits();
});

afterEach(() => {
  setConsultStore(undefined);
  setConsultNotificationConfig(undefined);
  resetConsultRateLimits();
});

test("consultation page is published and renderable in both English and Arabic", () => {
  assert.equal(localePageState("en", "/consult"), "published");
  assert.equal(localePageState("ar", "/consult"), "published");
  assert.equal(localePageIsRenderable("en", "/consult"), true);
  assert.equal(localePageIsRenderable("ar", "/consult"), true);
  assert.equal(
    localeSurfaceIsAvailable("ar", "consult", {
      treatmentsPublished: true,
      costsPublished: true,
      blogsPublished: true,
    }),
    true,
  );
});

test("POST /api/consult persists valid lead + encrypted medical reports and dispatches notification", async () => {
  let webhookBody: Record<string, unknown> | null = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: string | URL | Request, init?: RequestInit) => {
    webhookBody = JSON.parse(String(init?.body || "{}")) as Record<string, unknown>;
    return new Response("ok", { status: 200 });
  }) as typeof fetch;

  try {
    setConsultNotificationConfig({ webhookUrl: "https://hooks.example.test/consult" });
    const report = new File([pdfBytes()], "PET Scan Report.pdf", { type: "application/pdf" });
    const form = makeConsultFormData({ locale: "ar", reports: [report] });
    const res = await consultPost(
      new Request("https://gaf.healthcare/api/consult", {
        method: "POST",
        headers: { "cf-connecting-ip": "198.51.100.10" },
        body: form,
      }),
    );
    assert.equal(res.status, 201);
    const json = (await res.json()) as {
      ok: boolean;
      persisted: boolean;
      reference: string;
      attachmentCount: number;
      notificationStatus: string;
    };
    assert.equal(json.ok, true);
    assert.equal(json.persisted, true);
    assert.match(json.reference, /^GAF-/);
    assert.equal(json.attachmentCount, 1);
    assert.equal(json.notificationStatus, "delivered");

    const saved = await store.listLeads();
    assert.equal(saved.length, 1);
    assert.equal(saved[0].locale, "ar");
    assert.equal(saved[0].attachments.length, 1);
    assert.match(saved[0].attachments[0].storageKey, /^private\/consult-reports\//);
    assert.doesNotMatch(JSON.stringify(json), /private\/consult-reports|uploads\//);

    // Webhook payload must exclude patient name, email, phone, and clinical notes.
    assert.ok(webhookBody);
    assert.equal(webhookBody.reference, json.reference);
    assert.equal("name" in webhookBody, false);
    assert.equal("email" in webhookBody, false);
    assert.equal("phone" in webhookBody, false);
    assert.equal("notes" in webhookBody, false);
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("POST /api/consult rejects invalid fields, bad files, spam, duplicates, rate limits, and storage failures", async () => {
  // 1. Bad email
  const badEmail = await consultPost(
    new Request("https://gaf.healthcare/api/consult", {
      method: "POST",
      headers: { "cf-connecting-ip": "198.51.100.20" },
      body: makeConsultFormData({ email: "not-an-email" }),
    }),
  );
  assert.equal(badEmail.status, 400);
  assert.equal(((await badEmail.json()) as { error: string }).error, "email");

  // 2. Spoofed PDF magic bytes
  const badFile = new File([new TextEncoder().encode("<script>alert(1)</script>")], "evil.pdf", {
    type: "application/pdf",
  });
  const spoofed = await consultPost(
    new Request("https://gaf.healthcare/api/consult", {
      method: "POST",
      headers: { "cf-connecting-ip": "198.51.100.21" },
      body: makeConsultFormData({ reports: [badFile] }),
    }),
  );
  assert.equal(spoofed.status, 400);
  assert.equal(((await spoofed.json()) as { error: string }).error, "fileType");

  // 3. Oversized file (>5 MB)
  const huge = new Uint8Array(5 * 1024 * 1024 + 64);
  huge.set(pngBytes(), 0);
  const oversized = validateMedicalReport({
    originalName: "scan.png",
    declaredMime: "image/png",
    bytes: huge,
  });
  assert.deepEqual(oversized, { ok: false, error: "fileSize" });

  // 4. Honeypot spam
  const spamRes = await consultPost(
    new Request("https://gaf.healthcare/api/consult", {
      method: "POST",
      headers: { "cf-connecting-ip": "198.51.100.22" },
      body: makeConsultFormData({ website: "https://spam.invalid" }),
    }),
  );
  assert.equal(spamRes.status, 400);
  assert.equal(((await spamRes.json()) as { error: string }).error, "spam");

  // 5. Duplicate submission returns 409 and does not create a second lead
  const first = await consultPost(
    new Request("https://gaf.healthcare/api/consult", {
      method: "POST",
      headers: { "cf-connecting-ip": "198.51.100.23" },
      body: makeConsultFormData(),
    }),
  );
  assert.equal(first.status, 201);
  const second = await consultPost(
    new Request("https://gaf.healthcare/api/consult", {
      method: "POST",
      headers: { "cf-connecting-ip": "198.51.100.23" },
      body: makeConsultFormData(),
    }),
  );
  assert.equal(second.status, 409);
  assert.equal(((await second.json()) as { error: string }).error, "duplicate");
  assert.equal((await store.listLeads()).length, 1);

  // 6. Rate limiting after 5 attempts from same IP
  for (let i = 0; i < 5; i += 1) {
    await consultPost(
      new Request("https://gaf.healthcare/api/consult", {
        method: "POST",
        headers: { "cf-connecting-ip": "198.51.100.24" },
        body: makeConsultFormData({ email: `patient${i}@example.org` }),
      }),
    );
  }
  const throttled = await consultPost(
    new Request("https://gaf.healthcare/api/consult", {
      method: "POST",
      headers: { "cf-connecting-ip": "198.51.100.24" },
      body: makeConsultFormData({ email: "patient99@example.org" }),
    }),
  );
  assert.equal(throttled.status, 429);
  assert.equal(((await throttled.json()) as { error: string }).error, "rateLimit");

  // 7. Storage failure must return 503 and never emit a synthetic ID
  setConsultStore({
    ...store,
    findDuplicate: async () => null,
    saveLead: async () => {
      throw new Error("R2 down");
    },
  });
  const failedStorage = await consultPost(
    new Request("https://gaf.healthcare/api/consult", {
      method: "POST",
      headers: { "cf-connecting-ip": "198.51.100.25" },
      body: makeConsultFormData({ email: "storagefail@example.org" }),
    }),
  );
  assert.equal(failedStorage.status, 503);
  const failedBody = (await failedStorage.json()) as { ok: boolean; error: string; reference?: string };
  assert.equal(failedBody.ok, false);
  assert.equal(failedBody.error, "storageUnavailable");
  assert.equal(failedBody.reference, undefined);
});

test("R2ConsultStore encrypts medical reports at rest and blocks unauthenticated downloads", async () => {
  const bucket = new FakeR2Bucket();
  const r2Store = new R2ConsultStore({
    bucket,
    encryptionSecret: "test-consult-secret-key",
  });
  setConsultStore(r2Store);

  const plainPdf = pdfBytes("sensitive diagnosis details");
  const saved: PersistedConsultLead = await r2Store.saveLead(
    {
      id: "20261127-TESTLEAD",
      reference: "GAF-261127-TEST01",
      locale: "en",
      status: "new",
      createdAt: new Date().toISOString(),
      retainUntil: new Date(Date.now() + 86_400_000).toISOString(),
      name: "Confidential Patient",
      email: "patient@example.org",
      phone: "+919876543210",
      country: "UAE",
      treatment: "chemotherapy",
      hospital: "open",
      doctor: "",
      timeline: "near",
      notes: "Stage II biopsy",
      consent: true,
      dedupeKey: "dedupe-1",
    },
    [
      {
        originalName: "biopsy.pdf",
        declaredMime: "application/pdf",
        bytes: plainPdf,
        mime: "application/pdf",
        ext: "pdf",
        safeName: "biopsy.pdf",
        sha256: "abc",
      },
    ],
    async () => ({
      channel: "cms-inbox",
      status: "queued_in_cms_inbox",
      attemptedAt: new Date().toISOString(),
    }),
  );

  // Stored R2 object must be encrypted (plaintext must not appear in raw bucket bytes).
  const rawStored = await bucket.get(saved.attachments[0].storageKey);
  assert.ok(rawStored && "arrayBuffer" in rawStored);
  const rawText = new TextDecoder().decode(new Uint8Array(await rawStored.arrayBuffer()));
  assert.doesNotMatch(rawText, /sensitive diagnosis details/);
  assert.match(rawText, /"AES-256-GCM"/);

  // Unauthenticated CMS report download fails with 401.
  const unauth = await cmsReportGet(
    new Request(`https://gaf.healthcare/api/cms/leads/${saved.id}/report?fileId=${saved.attachments[0].fileId}`),
    { params: Promise.resolve({ id: saved.id }) },
  );
  assert.equal(unauth.status, 401);

  // Worker rejects any public request to private consult paths.
  const contentBucket = new FakeR2Bucket({
    [MANIFEST_KEY]: JSON.stringify({ version: 1, generatedAt: "2026-10-20T00:00:00.000Z", keys: [] }),
    [VERSION_KEY]: JSON.stringify({ groups: { en: "v1", ar: "v1" }, updatedAt: "v1" }),
  });
  const env = { CONTENT: contentBucket, STATIC: bucket, ASSETS: fakeAssets() } as unknown as WorkerEnv;
  const worker = createWorker(async () => new Response("not-found", { status: 404 }), { cache: () => undefined });
  const ctx = { waitUntil: () => {} };
  const privRes = await worker.fetch(
    new Request(`https://gaf.healthcare/${saved.attachments[0].storageKey}`),
    env,
    ctx,
  );
  assert.equal(privRes.status, 404);
  const traversalRes = await worker.fetch(
    new Request(`https://gaf.healthcare/uploads/../${saved.attachments[0].storageKey}`),
    env,
    ctx,
  );
  assert.equal(traversalRes.status, 404);
});

test("GA4 event helper strips all PII and medical fields", () => {
  const sanitized = sanitizeGaParams({
    locale: "ar",
    treatment_slug: "chemotherapy",
    has_report_upload: true,
    report_count: 2,
    name: "Secret Patient",
    email: "secret@example.org",
    phone: "+911234567890",
    notes: "Stage 3 adenocarcinoma",
    diagnosis: "Breast cancer",
    filename: "biopsy.pdf",
    reference: "GAF-123",
  });
  assert.deepEqual(sanitized, {
    locale: "ar",
    treatment_slug: "chemotherapy",
    has_report_upload: true,
    report_count: 2,
  });

  const pushed: unknown[] = [];
  const prevWindow = (globalThis as { window?: unknown }).window;
  (globalThis as { window?: unknown }).window = {
    dataLayer: pushed,
  };
  try {
    trackGaEvent("whatsapp_click", {
      locale: "en",
      placement: "floating_widget",
      page_type: "costs",
      phone: "+919044346292",
    });
    assert.equal(pushed.length, 1);
    const args = Array.from(pushed[0] as ArrayLike<unknown>);
    assert.equal(args[0], "event");
    assert.equal(args[1], "whatsapp_click");
    assert.deepEqual(args[2], {
      locale: "en",
      placement: "floating_widget",
      page_type: "costs",
    });
  } finally {
    (globalThis as { window?: unknown }).window = prevWindow;
  }
});

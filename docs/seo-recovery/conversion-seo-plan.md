# GAF Healthcare — Conversion SEO & Measurement Plan

**Goal:** Turn qualified international patient search traffic into tracked, high-intent medical report submissions, coordinator consultations, and WhatsApp enquiries without compromising clinical trust.

---

## 1. Critical Conversion Defects Discovered in Codebase

1. **Silent `/consult` Hijacking (`src/components/locale-link.tsx` line 30 & `src/lib/site.ts` line 31):**
   - `LocaleLink` runs every `/consult?...` link through `consultToWhatsappHref()`, converting `<LocaleLink href="/consult?treatment=...">` into an external `https://wa.me/919044346292?text=...` link.
   - **Consequences:**
     - Users clicking `"Get a Personalized Cost Estimate"` or `"Request a Consultation"` who are on desktop without WhatsApp Web—or who want to upload medical scans/pathology reports via web form—never reach `/consult`.
     - Organic attribution, landing page context, and form funnel drop-offs are completely blind in GA4.
2. **Consult Form Lacks Medical Report Upload & Persistence (`src/components/consult-form.tsx` & `src/app/api/consult/route.ts`):**
   - `ConsultForm` collects `name`, `email`, `phone`, `country`, `treatment`, `hospital`, `timeline`, `notes`, `consent`—**no file upload input** for MRI/CT/pathology/echo reports despite CTA copy explicitly saying `"Please review my medical records"`.
   - `POST /api/consult` validates fields and returns `VEL-${Date.now().toString(36)}` **without writing to R2/D1/database, sending an email notification, or posting to a CRM/WhatsApp webhook**. Submissions are currently discarded!
3. **Zero GA4 Key Event Instrumentation (`src/components/deferred-analytics.tsx`):**
   - Grep across `src/` confirms **`0` `gtag("event", ...)` calls**.
   - `DeferredAnalytics` loads `G-F12D7QK2B2` only after user interaction or `10s` idle, with zero tracking for: WhatsApp clicks (`Floating` vs `Inline`), phone (`tel:`) clicks, consultation form starts/submissions, doctor/hospital profile CTA clicks, or cost-estimate CTA clicks.

---

## 2. Conversion Funnel Remediation Plan

### C1 — Dual-Path Enquiry UX (Web Report Upload + Instant WhatsApp)
Keep WhatsApp prominent (critical for Africa & Middle East medical travellers) **without hijacking `/consult`**:
1. **Restore `/consult` as a real conversion destination** for `"Upload Medical Reports / Request Case Estimate"` CTAs (remove silent hijack inside `LocaleLink`, or make WhatsApp an explicit secondary/co-primary button beside `/consult?...`).
2. **Upgrade `/consult` (`src/components/consult-form.tsx` + `src/app/api/consult/route.ts`):**
   - Add optional **secure medical report upload** (PDF, JPG, PNG, DICOM archive links; stored in private non-public R2 bucket prefix with strict size/MIME checks + short-lived signed access for coordinators).
   - Wire `POST /api/consult` to **real persistence + instant notification** (Cloudflare D1/KV/R2 record + email/CRM webhook via Worker secret — never silent discard!).
   - Pre-fill `country` (from origin-country hub referrer or query param), `treatment`, `doctor`, and `hospital` cleanly and show a **3-step timeline expectation**: *"1. Coordinator acknowledges within 2 hours → 2. Specialist reviews records → 3. Video call + written hospital estimate"*.
   - Translate & enable `/ar/consult` (`locale-gating.ts` + `ar.ts`) for Arabic patients.

### C2 — Page-Type Conversion Architecture (Unobtrusive & Context-Matched)

| Landing Page Type | Primary Contextual CTA | Secondary / Low-Friction CTA | Supporting Trust Cue |
|---|---|---|---|
| **Priority Country Hub** (`/{country}/treatment-in-india`) | `"Send Reports for India Treatment Plan"` (`/consult?country={country}`) | `"WhatsApp International Desk ([Country])"` (`wa.me`) | Visa letter + airport pickup + local-language/Arabic interpreter note |
| **Treatment Cost Guide** (`/costs/india/{spec}/{proc}`) | `"Request Case-Specific Hospital Quote"` (`/consult?treatment={slug}`) | `"Compare 2–3 Hospital Estimates on WhatsApp"` | Explicit inclusions/exclusions + `"No upfront payment to GAF"` |
| **Curated Treatment Page** (`/treatments/{slug}`) | `"Check Candidacy with a Specialist"` (`/consult?treatment={slug}`) | `"Book Pre-Travel Video Call"` | Named specialist list + hospital accreditation seals |
| **Doctor Profile** (`/doctors/{slug}`) | `"Request Opinion from {Doctor Name}"` (`/consult?doctor={slug}`) | `"WhatsApp Coordinator for {Doctor Name}"` | Hospital affiliation + languages spoken + verified qualifications |
| **Hospital Profile** (`/hospitals/{slug}`) | `"Request Estimate at {Hospital Name}"` (`/consult?hospital={slug}`) | `"Browse {Hospital} Specialists"` | JCI / NABH accreditation + international patient desk support |
| **Clinical Blog** (`/blogs/{slug}`) | `"Upload Pathology / Scan for Second Opinion"` (mid-article & footer CTA) | `"See [Procedure] Cost Guide"` | Medical reviewer attribution + clinical references |

---

## 3. GA4 Event & Conversion Measurement Specification (`G-F12D7QK2B2`)

Create a thin helper `src/lib/analytics.ts` that queues events safely onto `window.dataLayer` even before `gtag.js` finishes async load (so fast clicks are never lost by `DeferredAnalytics`!):

| GA4 Event Name | Trigger | Required Event Parameters | Mark as Key Event? |
|---|---|---|---|
| `consult_form_start` | First field interaction on `/consult` or `/ar/consult` | `locale`, `source_page_type`, `treatment_slug`, `country` | No (funnel step) |
| `consult_form_submit` | Verified `200 OK` from `POST /api/consult` | `locale`, `treatment_slug`, `hospital_slug`, `doctor_slug`, `country`, `has_report_upload` | **Yes (Primary Lead)** |
| `medical_report_upload` | File successfully attached on `/consult` | `locale`, `file_type`, `treatment_slug` | No (intent step) |
| `whatsapp_click` | Any `wa.me` click (floating button vs inline CTA) | `locale`, `placement` (`float`, `hero`, `cost_quick_answer`, `doctor_profile`, `blog_cta`), `page_type`, `treatment_slug`, `doctor_slug` | **Yes (Primary Lead)** |
| `phone_click` | Any `tel:` coordinator link click | `locale`, `placement`, `page_type` | **Yes** |
| `estimate_cta_click` | Click on `"Get a Personalized Cost Estimate"` / `/consult` CTA | `locale`, `placement`, `treatment_slug`, `specialty_slug` | No (micro-conversion) |
| `doctor_discovery_click` | Click from Cost/Treatment/Country page to a Doctor or Hospital card | `source_type`, `target_type`, `target_slug`, `specialty_slug` | No (engagement) |

**Privacy / Medical Compliance Rule:** **NEVER** send patient PII (`name`, `email`, `phone`, `notes`, diagnosis text, or filenames) in GA4 event parameters — pass only non-PII catalog slugs, locale, and UI placement identifiers.

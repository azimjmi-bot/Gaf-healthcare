# GAF Healthcare — International SEO & Geo Growth Strategy

**Priority International Markets (10):** Tanzania, Kenya, Ethiopia, Uganda, Zambia, Cameroon, South Sudan, Iraq, Oman, Saudi Arabia.  
**Live Language Posture (`src/lib/i18n/locale-gating.ts`):** `en` (`live`), `ar` (`live`), `fr` (`noindex` — `85/278` UI strings, `0` entity translations), `ru` (`noindex`), `sw` (`noindex`).

---

## 1. Priority Market Gap Matrix

| Priority Market | Current EN Hub (`/{cc}/treatment-in-india`) | Current AR Hub (`/ar/{cc}/treatment-in-india`) | Primary Languages | Top Demand Specialties (Clinical & Cost Fit) | Action Required |
|---|---|---|---|---|---|
| **1. Tanzania** | Live (`728` lines) | None (`0` AR country hubs) | English, Swahili (future) | Cancer, Cardiac, Orthopaedics, Urology/Kidney, Neurosurgery | Deepen Dar es Salaam/Kilimanjaro travel corridors, NHIF/referral guidance, and link to all 8 specialty pillars |
| **2. Kenya** | Live (`874` lines) | None | English, Swahili (future) | Cancer, Cardiology, Orthopaedics, IVF, GI/Liver | Add Nairobi/Mombasa flight times, e-Medical Visa rules, SHIF/insurance reimbursement documentation guidance |
| **3. Ethiopia** | Live (`867` lines) | None | English, Amharic/Oromo (EN search dominant for medical travel) | Cardiac (pediatric & adult), Cancer, Neurosurgery, Urology | Add Addis Ababa → Delhi/Mumbai/Chennai Ethiopian Airlines corridors, cardiac & oncology cost anchors |
| **4. Uganda** | Live (`887` lines) | None | English | Cancer, Kidney Transplant, Cardiac, Spine, IVF | Differentiate Entebbe travel/visa/currency (`UGX` context alongside `USD`), link to BMT & kidney transplant guides |
| **5. Zambia** | Live (`849` lines) | None | English | Cancer, Orthopaedics, Cardiac, Neurosurgery, Urology | Differentiate Lusaka/Ndola referral pathways (`Ministry of Health` overseas treatment letters), eliminate template overlap |
| **6. South Sudan** | Live (`826` lines) | Future AR helpful (Juba Arabic/EN) | English / Arabic | Orthopaedics/Trauma, Cardiac, Oncology, Ophthalmology, Urology | Add Juba → Nairobi/Addis → Delhi/Mumbai connecting logistics, visa-via-embassy details |
| **7. Cameroon** | **MISSING (`404`)** | None | **English & French** | Oncology, Cardiology, Orthopaedics, IVF, Urology | **Create `/cameroon/treatment-in-india` (EN immediately)** targeting Douala/Yaoundé; build French translation roadmap before enabling `fr` |
| **8. Iraq** | **MISSING (`404`)** | **MISSING (`404`)** | **Arabic (primary) & English** | Oncology, Liver/Kidney Transplant, Cardiac, Spine, Neurosurgery, IVF | **Create `/iraq/treatment-in-india` + `/ar/iraq/treatment-in-india`** (Baghdad/Erbil/Basra flights, Arabic-speaking interpreters, Halal food, e-Medical Visa) |
| **9. Oman** | **MISSING (`404`)** | **MISSING (`404`)** | **Arabic & English** | Orthopaedics, Cardiac, Oncology, Ophthalmology, GI, Cosmetic | **Create `/oman/treatment-in-india` + `/ar/oman/treatment-in-india`** (Muscat/Salalah direct flights ~3–4 hrs to Mumbai/Delhi/Chennai/Kochi, Gulf patient desk) |
| **10. Saudi Arabia** | **MISSING (`404`)** | **MISSING (`404`)** | **Arabic (primary) & English** | Second-opinion Oncology, Robotic Spine/Ortho, IVF, GI/Bariatric, Cosmetic | **Create `/saudi-arabia/treatment-in-india` + `/ar/saudi-arabia/treatment-in-india`** (Riyadh/Jeddah/Dammam flights, JCI hospital filter, VIP Arabic coordinator) |

---

## 2. Fixing Secondary Country Hub Boilerplate & Overlap

Currently, **`37` country hubs** exist in `src/data/*-treatment-in-india.ts` (`31,959` lines total). Only `6` belong to the 10 priority markets; `31` are secondary countries (`Moldova`, `Belarus`, `Armenia`, `Benin`, `Chad`, `Liberia`, `Mozambique`, `Turkmenistan`, etc.) sharing identical template structures (`~21%` verbatim line overlap in data files and high rendered HTML section overlap).

**Strict Rules (No Mass Deletion):**
1. **Do NOT create country×city×procedure spam pages** (no `/kenya/nairobi/knee-replacement-in-delhi` matrix).
2. **Audit all `31` secondary hubs against 16-month GSC Performance + Links exports:**
   - **High-demand secondary hubs** (e.g., `Nigeria`, `Somalia`, `Sudan`, `Ghana`, `Zimbabwe`, `Uzbekistan`, `Kazakhstan` — verify via GSC): Keep, differentiate copy, and translate `Sudan`/`Somalia` into `/ar/...`.
   - **Zero-impression / zero-backlink boilerplate hubs:** Either enrich with genuinely distinct local travel/visa/specialty intent OR consolidate/noindex rather than holding near-identical boilerplate across 37 pages.

---

## 3. Arabic (`/ar`) Localisation & Growth Plan

1. **Immediate (Phase 1 Deploy `9714063`):** Unlocks `147` `/ar/costs/india/{city}/{specialty}` pages and fixes English metadata leak on `/ar/costs`.
2. **Short-Term (Days 15–45):**
   - Publish **`/ar/iraq/treatment-in-india`**, **`/ar/oman/treatment-in-india`**, **`/ar/saudi-arabia/treatment-in-india`**, **`/ar/sudan/treatment-in-india`**, and **`/ar/somalia/treatment-in-india`** (`countryHubs` currently `0/37` published in AR!).
   - Close Curated Treatment AR parity gaps (`94` EN vs `58` AR): translate the `36` missing EN curated treatments—prioritising **Cardiology (`5` missing AR)**, **Neurosurgery (`5` missing AR)**, **Infertility & IVF (`1` + new cluster)**, **Spine (`1`)**, and **Surgical Oncology (`7` missing AR)**.
   - Localise `<PseoTrust />` (`CostAttribution`) for Arabic cost pages (currently `locale === "en"` only in `src/components/pseo-trust.tsx`).
3. **Never Do:**
   - Never publish machine-translated or partial Arabic pages where UI is Arabic and clinical body is English (`ar-publication-index.json` parity gate must stay enforced).
   - Never redirect `/ar/*` or `/ru|/fr|/sw` across languages.

---

## 4. French (`/fr`) & Swahili (`/sw`) Expansion Readiness

- **French Opportunity (Cameroon, Côte d'Ivoire, Senegal, Guinea, Chad, Burkina Faso, DRC, Algeria, Morocco):**
  - Currently `src/lib/i18n/catalogs/fr.ts` covers only **`85/278` UI strings** and **`0` entity/cost/treatment translations**, with `fr: false` (`noindex`) in `locale-gating.ts`.
  - **Rule:** Keep `fr` `noindex` and `sitemap-fr.xml` empty until a **Vertical Slice MVP** (Homepage + `/fr/cameroon/treatment-in-india` + `/fr/senegal/treatment-in-india` + `/fr/cote-divoire/treatment-in-india` + Top 20 Curated Treatments + Top 15 Oncology/Cardiac/IVF Cost Pages + UI `278/278` strings) is professionally translated and medically reviewed in French.
- **Swahili Opportunity (Tanzania, Kenya, Uganda):**
  - Keep `sw` `noindex` until French MVP proves international multi-language ROI and Swahili medical translation resources are secured.

---

## 5. Currency, Cost Presentation & Country-Page UX

- **Keep USD (`$`) as the canonical clinical planning baseline** across India cost guides (consistent with hospital international tariff desks), and show **verified local-context orientation notes** on priority country hubs (e.g., `TZS`, `KES`, `ETB`, `UGX`, `ZMW`, `XAF`, `IQD`, `OMR`, `SAR` rough conversion disclaimers noting USD wire/card settlement at hospitals) **without hardcoding stale live FX rates as guaranteed prices**.
- Include on every priority country hub:
  1. Direct flight routes & approximate flight times to Delhi / Mumbai / Chennai / Bengaluru / Hyderabad.
  2. Indian e-Medical Visa (`e-MedVisa`) + Medical Attendant (`e-MedX`) requirements & nearest Indian High Commission / Embassy details.
  3. Typical accommodation, halal/regional food availability, and interpreter support.
  4. Top 4–6 demanded specialties & curated treatment links + top accredited partner hospitals + named specialists + medical-report WhatsApp/Consult CTA.

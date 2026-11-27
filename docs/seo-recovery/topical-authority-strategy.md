# GAF Healthcare — Topical Authority & Topic-Cluster Strategy

**Objective:** Build authoritative, non-cannibalising topic clusters across all **8 priority specialties**, connecting Pillar Pages → Curated Treatments → Cost Guides → Hospital & Doctor Directories → Supporting Clinical Blogs → Consultation Conversion.

---

## 1. Anti-Cannibalisation URL Architecture Rules

To prevent pillar, treatment, city, hospital, and blog pages from competing for the same SERP:

| Page Class | URL Pattern | Primary Search Intent | Allowed Title / H1 Modifiers | Forbidden Modifiers |
|---|---|---|---|---|
| **Specialty Pillar (Clinical + Overview)** | `/costs/india/{specialty}` *(currently serves `SpecialtyCostPage`)* or dedicated specialty hub | Broad informational + commercial research (`"[specialty] treatment in India"`) | `"[Specialty] Treatment in India: Procedures, Hospitals & Costs"` | Procedure-specific cost/surgery terms |
| **Doctor Specialty / City Hub** | `/doctors/india/{specialty}` & `/doctors/india/{city}/{specialty}` | Specialist discovery (`"[specialist plural] in India / [city]"`) | `"[Specialty] Doctors in India / [City]"` *(remove `"Best"` superlative)* | `"Cost"`, `"Price"`, `"Blog"` |
| **Hospital Specialty Hub** | `/hospitals/india/{specialty}` | Facility & accreditation discovery (`"[specialty] hospitals in India"`) | `"[Specialty] Hospitals in India — JCI & NABH Accredited"` | Individual procedure price tables |
| **Curated Treatment Page** | `/treatments/{slug}-in-india` | High-intent treatment pathway (`"[treatment] in India"`, candidacy, recovery, specialists) | `"[Treatment] in India: Procedure, Top Hospitals & Specialists"` | `"Cost breakdown"` as primary H1 (keep price summary box + link to cost sheet) |
| **Treatment Cost Guide** | `/costs/india/{specialty}/{procedure}` *(and `/{city}/{specialty}/{procedure}` where authored)* | Explicit cost & package intent (`"[procedure] cost in India / [city]"`) | `"[Procedure] Cost in India ([Year]): Ranges, Inclusions & Hospitals"` | Broad treatment definition essay as primary H1 |
| **Supporting Clinical Blog** | `/blogs/{slug}` | Mid/top-of-funnel questions (`"stages"`, `"side effects"`, `"vs"`, `"recovery"`, `"eligibility"`) | Question / comparison / guide titles (`"HIPEC vs Systemic Chemotherapy..."`) | Exact match `"[Treatment] in India"` or `"[Treatment] Cost in India"` |
| **Country Market Hub** | `/{country}/treatment-in-india` | Geo-qualified travel + medical intent (`"medical treatment in India from [Country]"`) | `"Medical Treatment in India from [Country]: Hospitals, Costs & Visa"` | Generic India-only overview |

---

## 2. Current Coverage Audit Across the 8 Priority Specialties

| Priority Specialty Group | Catalog Specialties Mapped | EN / AR Doctors | EN Cost Articles | Curated Treatments (EN / AR) | Critical Authority Gap |
|---|---|---:|---:|---:|---|
| **1. Cancer & Surgical Oncology** | `surgical-oncology`, `medical-oncology`, `radiation-oncology`, `hematology`, `pediatric-hematology` | 374 / 374 | 72 | **40 / 33** | Strongest cluster (Breast, HIPEC, Colon, Prostate, BMT, Radiation); missing dedicated **Cervical, Ovarian, Pancreatic, Liver, Lung, Targeted Therapy** curated EN/AR hubs & `Pediatric Hematology` curated pages (`0`) |
| **2. Cardiology & Cardiac Surgery** | `cardiology`, `cardiac-surgery`, `pediatric-cardiac-surgery` | 377 / 377 | 41 | **23 / 8** | **`Cardiology` has `0` AR curated treatments**; `Pediatric Cardiac Surgery` has `9` EN / `3` AR; missing TAVR/TAVI, AFib ablation, arrhythmia & valve clusters in AR |
| **3. Neurosurgery** | `neurosurgery` *(+ `neurology`)* | 112 / 112 *(+129)* | 20 *(+17)* | **5 / 0** | **`0` AR curated treatments**; `0` curated treatments in `Neurology`; missing DBS, spine tumor, epilepsy surgery, pediatric neurosurgery & stroke clusters |
| **4. Orthopaedics** | `orthopedics`, `spine-surgery`, `pediatric-orthopaedic` | 323 / 323 | 53 | **9 / 6** | **`Pediatric Orthopaedic` (`0`/`0`) and `Spine Surgery` (`1`/`0`)** severely under-served; missing Hip Replacement, Revision Knee/Hip, Scoliosis, ACDF & Disc Replacement clusters |
| **5. Urology** | `urology` *(+ `nephrology`)* | 147 / 147 *(+117)* | 23 *(+13)* | **5 / 5** | **`Nephrology` (`0`/`0`)** missing entirely; Urology missing PCNL, RIRS/Kidney Stones, Robotic Radical Prostatectomy, Uro-oncology & Urethral Stricture clusters |
| **6. Gastroenterology** | `gastroenterology`, `surgical-gastroenterology` | 279 / 279 | 45 | **0 / 0** | **CRITICAL GAP: `0` curated treatments in both EN & AR** despite `279` doctors and `45` cost articles (Liver Transplant, Whipple, ERCP, IBD, Hepatectomy) |
| **7. IVF & Infertility** | `infertility-ivf` *(+ `gynecology`)* | 29 / 29 *(+198)* | 23 *(+15)* | **1 / 0** | **`0` AR curated treatments**; only `1` EN curated page despite `23` cost articles (IVF, ICSI, Egg Freezing, Donor, Endometriosis, Fibroids, Tubal Surgery) |
| **8. Cosmetic & Reconstructive** | `cosmetic-surgery` *(+ `bariatric-surgery`)* | 77 / 77 *(+30)* | 15 *(+11)* | **7 / 3** | Missing AR parity for `4` treatments + Breast Reconstruction, Maxillofacial Reconstruction, Burn/Scar Revision, Gynecomastia & Body Contouring |

---

## 3. Structured Topic Clusters (All 8 Priority Specialties)

Every specialty uses the same **4-pillar architecture**:
1. **Treatment Pillar:** `/costs/india/{specialty}` *(upgrade to full Clinical & Cost Pillar or pair with `/treatments/{specialty}-in-india`)*
2. **Hospital Pillar:** `/hospitals/india/{specialty}`
3. **Cost Pillar:** `/costs/india/{specialty}` *(procedures table + cost methodology)*
4. **Doctor Pillar:** `/doctors/india/{specialty}`

### Cluster 1 — Cancer & Surgical Oncology
- **Primary Search Intent:** International cancer second opinion, surgery/radiation/systemic therapy in India, package cost & timeline.
- **Primary Keywords:** `cancer treatment in india`, `best cancer hospitals in india`, `cancer treatment cost in india`, `oncologists in india`.
- **Secondary Keywords:** `hipec surgery cost india`, `whipple surgery india`, `immunotherapy cost in india`, `targeted therapy india`, `bone marrow transplant india`.
- **Supporting Entities:** Tata Memorial-trained faculty, Medanta, Apollo, Max, Fortis, PET-CT, IHC/NGS genomic profiling, CyberKnife, TrueBeam IMRT/IGRT, CAR-T.
- **Supporting Clusters (14):**
  - *Existing / Expand:* Breast cancer, Prostate cancer, Colon cancer, Blood cancer / Leukemia / BMT, HIPEC, Radiotherapy (IMRT/IGRT/SBRT/Gamma Knife), Immunotherapy.
  - *Priority Build-Out:* **Cervical cancer**, **Ovarian cancer**, **Pancreatic cancer** & **Whipple surgery**, **Liver cancer (HCC / TACE / Resection)**, **Lung cancer (VATS / Robotic Lobectomy)**, **Targeted therapy (EGFR/ALK/HER2/PARP)**.
- **Internal Links:** Each cancer blog → matching `/treatments/{cancer}-in-india` + `/costs/india/{oncology-subspecialty}/{procedure}` + `/doctors/india/{subspecialty}` + `/hospitals/india/{subspecialty}`.
- **Conversion Opportunity:** Pathology & PET-CT report upload CTA (`"Get a Multidisciplinary Tumour Board Review in 48 Hours"`).

### Cluster 2 — Cardiology & Cardiac Surgery
- **Primary Keywords:** `cardiac surgery in india`, `heart surgery cost in india`, `best heart hospitals in india`, `cardiologists in india`.
- **Secondary Keywords:** `cabg bypass surgery cost india`, `tavr tavi cost india`, `heart valve replacement india`, `pediatric heart surgery india`, `pacemaker cost india`.
- **Supporting Clusters:** CABG (Beating-Heart / Off-Pump), Coronary Angioplasty & Stenting, Heart Valve Replacement / Repair (AVR/MVR), TAVR / TAVI, Pediatric Congenital Heart Surgery (TOF, VSD, ASD), Pacemaker / ICD / CRT-D, Electrophysiology & AFib Ablation, Heart Failure & LVAD/Transplant.
- **Target Audience:** East/West Africa & Gulf patients needing elective or urgent surgical/interventional cardiology unavailable locally.
- **Internal Links & Conversion:** Echo / angiogram upload CTA + video consultation with named CTVS/interventional cardiologist.

### Cluster 3 — Neurosurgery (& Neurology)
- **Primary Keywords:** `neurosurgery in india`, `brain tumor surgery cost in india`, `best neurosurgeons in india`, `neurosurgery hospitals in india`.
- **Secondary Keywords:** `gamma knife radiosurgery india`, `deep brain stimulation dbs cost india`, `epilepsy surgery india`, `craniotomy cost india`, `aneurysm clipping coiling india`.
- **Supporting Clusters:** Brain Tumor Microsurgery (Glioma/Meningioma), Gamma Knife / CyberKnife Radiosurgery, Deep Brain Stimulation (Parkinson's / Dystonia), Cerebral Aneurysm Clipping & Endovascular Coiling, Refractory Epilepsy Surgery, Pediatric Neurosurgery (Hydrocephalus / VP Shunt / Spina Bifida), Awake Craniotomy, Stroke Neuro-rehabilitation.
- **Conversion:** Brain MRI/CT DICOM upload CTA + second-opinion neurosurgical plan.

### Cluster 4 — Orthopaedics (& Spine Surgery)
- **Primary Keywords:** `orthopedic surgery in india`, `knee replacement cost in india`, `hip replacement cost in india`, `spine surgery in india`.
- **Secondary Keywords:** `robotic knee replacement india`, `bilateral total knee replacement cost`, `revision joint replacement india`, `acdf cervical spine surgery india`, `scoliosis surgery cost india`, `clubfoot treatment india`.
- **Supporting Clusters:** Total Knee Replacement (Robotic & Conventional), Total Hip Replacement, Revision Joint Replacement, ACL & Ligament Reconstruction, Lumbar Spinal Fusion / TLIF, Cervical Disc Replacement / ACDF, Scoliosis & Kyphosis Correction, Pediatric Orthopaedics (Clubfoot, DDH, SCFE).
- **Conversion:** Weight-bearing X-ray / Spine MRI upload CTA + implant-option & physiotherapy stay breakdown.

### Cluster 5 — Urology (& Nephrology)
- **Primary Keywords:** `urology treatment in india`, `kidney transplant cost in india`, `best urologists in india`, `prostate surgery cost india`.
- **Secondary Keywords:** `robotic radical prostatectomy india`, `turp surgery cost india`, `pcnl kidney stone surgery india`, `rirs laser kidney stone india`, `urethroplasty cost india`, `dialysis & transplant india`.
- **Supporting Clusters:** Kidney Transplantation (ABO-compatible & ABO-incompatible, living donor legal/ethical requirements), Robotic Prostatectomy, TURP & HoLEP for BPH, PCNL & RIRS Kidney Stone Surgery, Reconstructive Urethroplasty, Uro-Oncology (Bladder/Renal Cancer), Chronic Kidney Disease & Hemodialysis Access.
- **Conversion:** HLA typing / donor workup checklist + KFT/ultrasound upload CTA.

### Cluster 6 — Gastroenterology & Surgical Gastroenterology *(Highest Unbuilt Opportunity)*
- **Primary Keywords:** `gastroenterology treatment in india`, `liver transplant cost in india`, `best gastro hospitals in india`, `surgical gastroenterologist india`.
- **Secondary Keywords:** `living donor liver transplant india`, `whipple procedure pancreatic surgery cost`, `ercp cost in india`, `bariatric sleeve gastrectomy cost india`, `colonoscopy & ibd treatment india`.
- **Supporting Clusters (Priority Build-Out):** Living Donor Liver Transplantation (Adult & Pediatric), Hepatobiliary & Pancreatic (HPB) Surgery / Whipple, ERCP & Endoscopic Ultrasound (EUS), Complex GI Oncology (Esophageal/Gastric/Colorectal), Bariatric & Metabolic Surgery (Sleeve / RYGB), Crohn's / Ulcerative Colitis Biologic & Surgical Care, Hernia & Laparoscopic Cholecystectomy.
- **Conversion:** LFT / FibroScan / MELD score & CT abdomen upload CTA.

### Cluster 7 — IVF & Infertility (& Gynecology)
- **Primary Keywords:** `ivf treatment in india`, `ivf cost in india`, `best ivf clinics in india`, `fertility specialists in india`.
- **Secondary Keywords:** `icsi treatment cost india`, `pgt-a genetic testing ivf india`, `failed ivf cycle second opinion india`, `endometriosis laparoscopic surgery india`, `myomectomy fibroid surgery cost india`.
- **Supporting Clusters:** Standard IVF & ICSI Cycles, PGT-A / Embryo Genetic Screening, Male Factor Infertility (TESA/Micro-TESE), Recurrent Implantation Failure Workup, Laparoscopic Myomectomy (Fibroids), Endometriosis Excision & Fertility Preservation, Hysteroscopic Surgery.
- **Compliance Note:** Explicitly clarify Indian ART (Regulation) Act rules for international patients (e.g., surrogacy restrictions, age limits, documentation) — builds huge trust with East African & Gulf patients.

### Cluster 8 — Cosmetic & Reconstructive Surgery
- **Primary Keywords:** `cosmetic surgery in india`, `plastic surgery cost in india`, `reconstructive surgery india`, `best plastic surgeons in india`.
- **Secondary Keywords:** `rhinoplasty cost in india`, `breast reconstruction after mastectomy india`, `gynecomastia surgery cost india`, `liposuction tummy tuck india`, `burn contracture & maxillofacial reconstruction india`.
- **Supporting Clusters:** Post-Cancer Reconstructive Microsurgery (Breast/Head & Neck Free Flap), Rhinoplasty (Functional & Aesthetic), Gynecomastia Correction, Abdominoplasty & Body Contouring, Post-Bariatric Skin Contouring, Scar & Burn Contracture Reconstruction, Blepharoplasty & Facial Rejuvenation.

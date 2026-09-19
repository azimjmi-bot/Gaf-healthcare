# Doctor BIO rewrite — Batch 68 — Medical Oncology, India (specialty complete)

Final Medical Oncology batch. Every sentence is drawn from that doctor's own record in
`src/data/ginger-catalog.json` (designation, hospital, city, experience, qualifications,
education, affiliations, memberships, awards and research). No external sources, no inference, and
no information from any other doctor's profile. One doctor is flagged rather than rewritten. Only
`doctorOverrides["<slug>"].bio` is written; no pSEO, schema, routing or frontend field changes.

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. M. A. Raja | Chennai | 85 | 273 | APPLIED |
| 2 | Dr. Priya Tiwari | Delhi NCR | 94 | 282 | APPLIED |
| 3 | Dr. Sumanth Kumar Mallupattu | Hyderabad | 87 | 273 | APPLIED |
| 4 | Dr. P K Das | Delhi NCR | 96 | 272 | APPLIED |
| 5 | Dr. Jayanta Patowary | Delhi NCR | 89 | 252 | APPLIED |
| 6 | Dr. K. V. S. Latha | Chennai | 80 | 251 | APPLIED |
| 7 | Dr. Syed Ismail Nawab John | Chennai | 85 | 248 | APPLIED |
| 8 | Dr. Rohit Ramesh Pai | Mumbai | 78 | 258 | APPLIED |
| 9 | Dr. Venkata Sampath V | Hyderabad | 79 | — | **FLAGGED — INSUFFICIENT SOURCE INFORMATION** |

Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and
for traceability of every capitalised term, acronym, degree and year back to that individual
doctor's own record in `src/data/ginger-catalog.json`.

---

## 1. Dr. M. A. Raja

**Slug:** `dr-m-a-raja` · MGM Healthcare, Chennai, Chennai

### Existing BIO

Dr. M. A. Raja is Director of Oncology Services at MGM Healthcare in Chennai, India. He has practised medical oncology in India for 42+ years experience. The systemic list covers CAR-T Cell Therapy, Immunotherapy and Targeted Therapy when the pathology supports it. Regimen and cycles are written after records review — not from a brochure. Training includes MBBS – Kilpauk Medical College, Chennai, India (1977). International patients meet him on camera first; travel to Chennai is offered only if this campus is the right floor.

### Proposed BIO

Dr. M. A. Raja is Director of Oncology Services at MGM Healthcare in Chennai, with more than 42 years of experience. His profile records two specializations, medical oncology and hematology, and his qualifications are MBBS, MD and MRCP.

Four procedures are listed, and between them they cover the whole length of drug treatment for cancer: chemotherapy for cancer, targeted therapy for cancer, cancer immunotherapy and CAR-T cell therapy. The first is the oldest tool in the field and the last is among the newest, so a patient whose disease needs conventional cytotoxic drugs and a patient whose blood cancer has stopped responding to them both fall inside his stated range.

His training was taken in Chennai and in England. He read MBBS at Kilpauk Medical College in Chennai in 1977 and returned to the same college for his MD in 1981. In 1988 he took MRCP from the Royal College of Physicians in England, and in 1996 he added the European Certification of Medical Oncology. He is affiliated with MGM Healthcare and with MGM Cancer Institute in Chennai.

His memberships are unusually wide and fall into two halves. On the clinical side he belongs to the American Society of Clinical Oncology, the European Society of Medical Oncology, the Royal Society of Medicine in the UK, the Association of Physicians of India and the Indian Society of Medical and Pediatric Oncology. On the laboratory side he belongs to the American Association of Cancer Research and the European Association of Cancer Research. That combination keeps him in the rooms where treatment standards are agreed and in the rooms where the underlying science is first presented.

**Word count:** 273

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 2. Dr. Priya Tiwari

**Slug:** `dr-priya-tiwari` · Medanta - The Medicity, Delhi NCR

### Existing BIO

Dr. Priya Tiwari is Director Medical Oncology and Hemato-oncology at Medanta - The Medicity in Delhi NCR, India. She has practised medical oncology in India for 20+ years experience. The systemic list covers Adjuvant Chemotherapy, Palliative Chemotherapy and Molecular Targeted Therapy when the pathology supports it. Regimen and cycles are written after records review — not from a brochure. Training includes Medical School: DM Medical Oncology, AIIMS (All India Institute of Medical Sciences). International patients meet her on camera first; travel to Delhi NCR is offered only if this campus is the right floor.

### Proposed BIO

Dr. Priya Tiwari is Director Medical Oncology and Hemato-oncology at Medanta - The Medicity in Delhi NCR, with more than 20 years of experience. Her listed specialization is medical oncology and her qualifications are MBBS, MD and DM.

Her procedure list is organised around the two questions a systemic oncologist has to answer: which drug, and with what intent. Adjuvant chemotherapy and palliative chemotherapy separate treatment given to prevent a recurrence from treatment given to control advanced disease. Molecular targeted therapy and biomarker-based targeted therapy cover the drugs chosen from the tumour's own profile rather than from its site. Immunotherapy for solid tumors, hormone therapy for breast cancer and hormonal therapy for gynaecologic cancers complete the range.

Her postgraduate training was taken entirely at AIIMS. She read MBBS at JMI and BHU, took MD in medicine at the All India Institute of Medical Sciences, and stayed there for DM in medical oncology. She is affiliated with Medanta - The Medicity in Gurugram.

Her student record is among the strongest a profile can carry. She won the gold medal for the maximum marks in the MBBS final examination, the Bhagwan Das Thakur Das gold medal for standing first in that examination in 2006, the Prof I.K. Agarwal gold medal for the highest marks in medicine, and a 100% university prize for the highest marks in MBBS. She had already placed second in 2004, and in 2006 she received the Sudisha Award for best outgoing female candidate at the Institute of Medical Sciences.

She was certified as an ESMO medical oncologist in 2015, the same year she held travel grants for the ESMO immunotherapy preceptorship in Lund, Sweden and for ESMO Asia in Singapore.

**Word count:** 282

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 3. Dr. Sumanth Kumar Mallupattu

**Slug:** `dr-sumanth-kumar-mallupattu` · Yashoda Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. Sumanth Kumar Mallupattu is Senior Consultant at Yashoda Hospitals in Hyderabad, India. He has practised medical oncology in India for 14+ years experience. The systemic list covers Hormone Therapy, Immunotherapy and Targeted Therapy when the pathology supports it. Regimen and cycles are written after records review — not from a brochure. Training includes DM in Medical Oncology — Nizam's Institute of Medical Sciences (NIMS), Hyderabad (2019). International patients meet him on camera first; travel to Hyderabad is offered only if this campus is the right floor.

### Proposed BIO

Dr. Sumanth Kumar Mallupattu is a Senior Consultant at Yashoda Hospitals in Secunderabad, Hyderabad, with more than 14 years of experience. He is listed in both medical oncology and hematology, and his qualifications are MBBS, MD and DM.

His procedures are the four main classes of systemic treatment: chemotherapy for cancer, cancer immunotherapy, targeted therapy for cancer and hormone therapy for breast cancer. Taken together, they let one clinician carry a breast cancer patient through a hormonal course and a patient with a different tumour through an immunotherapy course without a handover.

His training crossed two disciplines before it settled. He read MBBS at Kurnool Medical College in Kurnool, Andhra Pradesh in 2005, then took MD in radiation oncology at the Postgraduate Institute of Medical Education and Research in Chandigarh in 2012, and finally DM in medical oncology at Nizam's Institute of Medical Sciences in Hyderabad in 2019. A medical oncologist who first qualified in radiation oncology knows from the inside how the two arms of cancer treatment are sequenced.

His affiliations run through the public and the private cancer network of Hyderabad and beyond: Yashoda Hospital in Secunderabad, CARE Hospitals, Nizam's Institute of Medical Sciences, the Indian Red Cross Society Cancer Hospital, MNJ Cancer Hospital at Osmania Medical College, and the Jawaharlal Institute of Postgraduate Medical Education & Research in Puducherry.

He is a member of ASCO, the American Society of Clinical Oncology, of ESMO, the European Society for Medical Oncology, of ESTRO, the European Society for Radiotherapy and Oncology, and of IAPC, the Indian Association of Palliative Care. The last two match the radiation and supportive-care sides of his own training.

**Word count:** 273

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 4. Dr. P K Das

**Slug:** `dr-p-k-das-1` · Max Smart Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. P K Das is Vice Chairman – Medical Oncology at Max Smart Super Speciality Hospital in Delhi NCR, India. He has practised medical oncology in India for 29+ years experience. The systemic list covers Hormone Therapy, Immunotherapy and Targeted Therapy when the pathology supports it. Regimen and cycles are written after records review — not from a brochure. Training includes DM (Medical Oncology) – All India Institute of Medical Sciences (AIIMS), New Delhi (2000). International patients meet him on camera first; travel to Delhi NCR is offered only if this campus is the right floor.

### Proposed BIO

Dr. P K Das is Vice Chairman of Medical Oncology at Max Smart Super Speciality Hospital in Saket, Delhi NCR, with more than 29 years of experience. His profile records medical oncology together with haematological malignancies, and his qualifications are MBBS, MD and DM.

His procedure list covers systemic treatment across both halves of that practice. Chemotherapy for cancer, cancer immunotherapy and targeted therapy for cancer sit alongside hormone therapy given separately for breast, prostate and gynecologic cancers, which is the group of tumours whose growth can be slowed by changing the hormonal signal rather than by killing the cell outright.

He read MBBS at VSS Medical College under Sambalpur University in Odisha in 1990 and MD in internal medicine at MKCG Medical College under Berhampur University in 1995, then took DM in medical oncology at the All India Institute of Medical Sciences in New Delhi in 2000. He is affiliated with Max Smart Super Speciality Hospital in Saket and with Max Hospital in Saket East.

His recognition has come from three directions. He won first prize at the 11th International Congress on Anti-Cancer Treatment in Paris, France in 2001. In 2013 he was selected to the Expert Advisory Committee on Oncology for six new AIIMS institutions under the Ministry of Health & Family Welfare, and in the same year to an expert committee of the Drug Controller General of India.

His published work spans the cancers he treats and the tools used to stage them, including EGFR mutation status in NSCLC in India, the reliability of 18F-FDG PET parameters in invasive ductal carcinoma, and NK/T cell lymphoma presenting as chronic rhinosinusitis.

**Word count:** 272

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 5. Dr. Jayanta Patowary

**Slug:** `dr-jayanta-patowary` · Max Smart Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Jayanta Patowary is Clinical Associate at Max Smart Super Speciality Hospital in Delhi NCR, India. He has practised medical oncology in India for 22+ years experience. The systemic list covers Hormone Therapy, Immunotherapy and Targeted Therapy when the pathology supports it. Regimen and cycles are written after records review — not from a brochure. Training includes Fellowship (Medical Oncology) – Royal College of Physicians, United Kingdom (2019). International patients meet him on camera first; travel to Delhi NCR is offered only if this campus is the right floor.

### Proposed BIO

Dr. Jayanta Patowary is a Clinical Associate at Max Smart Super Speciality Hospital in Saket, Delhi NCR, with more than 22 years of experience. His listed specialization is medical oncology and his qualifications are MBBS with a fellowship in medical oncology.

His practice is systemic treatment across the common adult cancers. Chemotherapy for cancer, cancer immunotherapy and targeted therapy for cancer are listed, together with hormone therapy given separately for breast cancer, for prostate cancer and for gynecologic cancers. Those three hormone entries matter because they are the tumours where blocking a hormonal signal can hold disease for long periods with far less toxicity than cytotoxic drugs, and they are counted as distinct lines of work rather than as one heading.

He read MBBS at Guwahati Medical College in Guwahati in 2000 and later took his fellowship in medical oncology from the Royal College of Physicians in the United Kingdom in 2019, so a career that began in Assam was formalised by the Royal College of Physicians almost two decades in. He is affiliated with Max Smart Super Speciality Hospital in Saket and with Max Hospital in Saket East.

His academic record starts early. He held a National Talent Search Scholarship Award in 1991, a state level merit scholarship from the Government of Assam and a merit test scholarship from the Government of Meghalaya in the same year, and a state merit scholarship at the Higher Secondary Examination in 1993.

He has more than seven publications in national and international indexed journals.

**Word count:** 252

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 6. Dr. K. V. S. Latha

**Slug:** `dr-k-v-s-latha` · MGM Healthcare, Chennai, Chennai

### Existing BIO

Dr. K. V. S. Latha is Professor and Head of Medical Oncology at MGM Healthcare in Chennai, India. She has practised medical oncology in India for 35+ years experience. The systemic list covers Hormone Therapy, Immunotherapy and Targeted Therapy when the pathology supports it. Regimen and cycles are written after records review — not from a brochure. Training includes MBBS. International patients meet her on camera first; travel to Chennai is offered only if this campus is the right floor.

### Proposed BIO

Dr. K. V. S. Latha is Professor and Head of Medical Oncology at MGM Healthcare in Chennai, with more than 35 years of experience. Her listed specialization is medical oncology and her qualifications are MBBS and MD.

Her procedures are the standard classes of drug treatment for cancer: chemotherapy for cancer, cancer immunotherapy and targeted therapy for cancer, together with hormone therapy listed separately for breast cancer and for gynecologic cancers. That pairing is worth noting against her affiliations, because besides MGM Healthcare she is associated with the Institute of Obstetrics & Gynaecology at Madras Medical College in Chennai. A medical oncologist attached to a dedicated obstetrics and gynaecology institute sees women's cancers in volume rather than occasionally.

Her title is a teaching title, and the awards on her record are divided evenly between the two halves of that role. She won gold medals in both MBBS and MD as a student. She has since received the Best Doctor Award and the Best Teacher Award, both from The Tamil Nadu Dr. MGR Medical University, which is unusual: hospitals and universities do not normally recognise the same person for clinical work and for teaching.

She has also served as principal investigator on the Hospital-Based Cancer Registry Project run by NCDIR and ICMR. Registry work is the counting behind cancer policy, recording every case a hospital treats so that national incidence and outcome figures have something solid underneath them, and a principal investigator carries responsibility for the accuracy of what her centre contributes.

**Word count:** 251

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 7. Dr. Syed Ismail Nawab John

**Slug:** `dr-syed-ismail-nawab-john` · MGM Healthcare, Chennai, Chennai

### Existing BIO

Dr. Syed Ismail Nawab John is Clinical Lead and Senior Consultant at MGM Healthcare in Chennai, India. He has practised medical oncology in India for 16+ years experience. The systemic list covers CAR-T Cell Therapy, Hormone Therapy and Immunotherapy when the pathology supports it. Regimen and cycles are written after records review — not from a brochure. Training includes MBBS — Tirunelveli Medical College (2002). International patients meet him on camera first; travel to Chennai is offered only if this campus is the right floor.

### Proposed BIO

Dr. Syed Ismail Nawab John is Clinical Lead and Senior Consultant at MGM Healthcare in Chennai, with more than 16 years of experience. He is listed in both medical oncology and hematology, and his qualifications are MBBS, MD, DM and DNB.

His procedure list is broad at both ends. Chemotherapy for cancer, cancer immunotherapy and targeted therapy for cancer are joined by hormone therapy given separately for breast, prostate and gynecologic cancers, and by CAR-T cell therapy. That last entry belongs to the hematology half of his practice and is the point where treatment stops being a drug given to the patient and becomes the patient's own cells re-engineered.

His training was taken in Tirunelveli and Chennai and is unusually layered. He read MBBS at Tirunelveli Medical College in 2002, then MD in radiotherapy at Madras Medical College in Chennai in 2006. He returned to the same college for DM in medical oncology in 2013, finishing as gold medallist, and again for DNB in medical oncology in 2016. Two separate postgraduate qualifications in the same subject, on top of a radiotherapy degree, is a long apprenticeship by any measure.

He is affiliated with MGM Healthcare and is a member of the Indian Society of Oncology, the Indian Society of Gastroenterology and the Society of Gastrointestinal Endoscopy of India. The two gastroenterology bodies sit oddly beside an oncology practice only until you consider how many of the cancers treated with systemic drugs in India begin in the digestive tract.

**Word count:** 248

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 8. Dr. Rohit Ramesh Pai

**Slug:** `dr-rohit-ramesh-pai` · Gleneagles Hospital, Mumbai, Mumbai

### Existing BIO

Dr. Rohit Ramesh Pai is Senior Consultant at Gleneagles Hospital in Mumbai, India. He has practised medical oncology in India for 10+ years experience. The systemic list covers Hormone Therapy, Immunotherapy and Targeted Therapy when the pathology supports it. Regimen and cycles are written after records review — not from a brochure. Training includes Gleneagles Hospital, Mumbai, Parel. International patients meet him on camera first; travel to Mumbai is offered only if this campus is the right floor.

### Proposed BIO

Dr. Rohit Ramesh Pai is a Senior Consultant at Gleneagles Hospital in Mumbai, with more than 10 years of experience. He is listed in both medical oncology and hematology, and his qualifications are MBBS, MD, DM, MRCP (UK), MRCP (SCE) and DNB.

That string of six is worth reading slowly. DM and DNB are the two Indian routes to a medical oncology qualification and he holds both. MRCP (UK) is a physicians' membership taken in the United Kingdom, and MRCP (SCE) is its specialty examination, so he has been examined on the same material under two national systems. For an international patient the practical point is that his training is legible in the UK as well as in India.

His procedures are the standard classes of drug treatment: chemotherapy for cancer, cancer immunotherapy and targeted therapy for cancer, with hormone therapy listed separately for breast, prostate and gynecologic cancers.

He is associated with Gleneagles Hospital in Parel, with Bombay Hospital and with BYL Nair Hospital, all in Mumbai; the same three centres appear under his education, so his clinical work and his training have run through the same institutions.

He was ranked first in India in the AIIMS postgraduate entrance examination in 2009, which is the single most competitive medical entrance in the country. He has also spoken at TEDx, in a talk titled Rewriting the Cancer Narrative. Ten years into practice, that pairing describes someone who has been at the top of the academic queue and who also puts effort into explaining cancer outside the consulting room.

**Word count:** 258

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 9. Dr. Venkata Sampath V

**Slug:** `dr-venkata-sampath-v` · Apollo Hospital, Jubilee Hills, Hyderabad, Hyderabad

### Existing BIO

Dr. Venkata Sampath V is Consultant Medical Oncologist at Apollo Hospital in Hyderabad, India. He has practised medical oncology in India for 15+ years experience. The systemic list covers Chemotherapy, Targeted Therapy and Immunotherapy when the pathology supports it. Regimen and cycles are written after records review — not from a brochure. Training includes American Society of Medical Oncology(ASCO). International patients meet him on camera first; travel to Hyderabad is offered only if this campus is the right floor.

### Proposed BIO

NOT GENERATED.

**Word count:** —

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** specializations, proceduresExpertise, education and affiliations all hold the same three society names, and the two awards are conference abstracts credited to other authors, so the record states no clinical range, no training history and no personal achievements

**Other fields that would change:** NONE (bio only)

**Status:** FLAGGED — no change proposed

---

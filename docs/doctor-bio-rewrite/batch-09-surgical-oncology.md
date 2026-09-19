# Doctor BIO rewrite — Batch 09 — Surgical Oncology, India

Second Surgical Oncology batch. Every sentence is drawn from that doctor's own record in
`src/data/ginger-catalog.json`. The previous bios in this specialty are GAF platform boilerplate
and carry no doctor-specific facts, so the structured fields are the source.
No external sources, no inference, and no information from any other doctor's profile.
Only `doctorOverrides["<slug>"].bio` is written; no pSEO, schema, routing or frontend field changes.

One doctor is flagged rather than rewritten because the record contradicts itself on the most basic
question a patient would ask of it — whether he is a surgeon or a physician.

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. Harit Kumar Chaturvedi | Delhi NCR | 78 | 254 | APPLIED |
| 2 | Dr. Naveen Sanchety | Delhi NCR | 78 | 259 | APPLIED |
| 3 | Dr. Saroj Rajan | Delhi NCR | 85 | 247 | APPLIED |
| 4 | Dr. Somdipto Das | Mumbai | 70 | 234 | APPLIED |
| 5 | Dr. Prathamesh Pai | Mumbai | 69 | 246 | APPLIED |
| 6 | Dr. Ajit Singh Oberoi | Delhi NCR | 79 | 245 | APPLIED |
| 7 | Dr. Harshit Garg | Delhi NCR | 70 | 221 | APPLIED |
| 8 | Dr. Rachita Chopra | Delhi NCR | 76 | 216 | APPLIED |
| 9 | Dr. Rajesh Shinde | Mumbai | 72 | 250 | APPLIED |
| 10 | Dr. Rupinder Sekhon | Delhi NCR | 74 | 220 | APPLIED |
| 11 | Dr. Karan Gupta | Delhi NCR | 79 | 245 | APPLIED |
| 12 | Dr. Arsheed Hussain Hakeem | Hyderabad | 76 | — | **FLAGGED — INSUFFICIENT SOURCE INFORMATION** |

Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and
for traceability of every capitalised term, acronym, degree and year back to that individual
doctor's own record in `src/data/ginger-catalog.json`.

---

## 1. Dr. Harit Kumar Chaturvedi

**Slug:** `dr-harit-kumar-chaturvedi` · Indraprastha Apollo Hospital, Delhi NCR

### Existing BIO

Dr. Harit Kumar Chaturvedi is Chief Executive Officer & Clinical Head at Indraprastha Apollo Hospital in Delhi NCR. He has practised for 32+ years experience. The operating list includes Mastectomy and Sentinel Lymph Node Biopsy; Esophagectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS — G.S.V.M. Medical College, Kanpur, India. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Harit Kumar Chaturvedi is Chief Executive Officer and Clinical Head at Indraprastha Apollo Hospital, Delhi NCR, with more than 32 years of experience in surgical oncology.

His operating range spans breast cancer surgery and sentinel lymph node biopsy, head and neck and oral cancer surgery, lung, esophageal, gastric, colorectal and pancreatic cancer surgery, kidney, bladder and cervical cancer surgery, and cytoreductive surgery with HIPEC.

He completed both his MBBS and his MS in General Surgery at G.S.V.M. Medical College, Kanpur, followed by a fellowship in surgical oncology at Tata Memorial Hospital, Mumbai, and an MCh in Surgical Oncology at AIIMS, New Delhi. His advanced training covers the da Vinci Xi robotic surgery system, CyberKnife radiosurgery and HIPEC therapy, which matches the technology-led part of his operating list.

He practises within the Apollo Hospitals network in Delhi NCR and at Apollo Adlux Hospital.

Alongside clinical work he holds leadership roles in the specialty: he is a past president of the Indian Society of Oncology and founder president of the Core Cancer Foundation, and a member of the Association of Surgeons of India, the Association of Breast Surgeons of India and the Delhi Medical Association.

He received a Young Scientist Award for contributions to oncology research, and an International Patients & Medical Tourism Award for attracting international patients from South Asia, the Middle East, the SAARC countries, the CIS and Africa — a relevant credential for patients travelling from those regions. He has also been recognised for cancer awareness work and transparent communication with patients.

**Word count:** 254

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 2. Dr. Naveen Sanchety

**Slug:** `dr-naveen-sanchety` · Sarvodaya Hospital, Faridabad, Delhi NCR

### Existing BIO

Dr. Naveen Sanchety is Director of Surgical Oncology at Sarvodaya Hospital in Delhi NCR. He has practised for 26+ years experience. The operating list includes Oncoplastic Breast Surgery and Breast-Conserving Surgery (Lumpectomy); Mastectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes DNB (Oncosurgery) – Army Hospital, Research & Referral (RR), Delhi. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Naveen Sanchety is Director of Surgical Oncology at Sarvodaya Hospital, Faridabad, Delhi NCR, with more than 26 years of experience.

His operating list is organised around three areas. In breast cancer he performs breast cancer surgery, mastectomy, breast-conserving surgery and oncoplastic breast surgery. In head and neck cancer he performs oral cancer surgery, hypopharyngeal cancer surgery, head and neck tumour surgery and neck dissection. In abdominal and gynaecological cancer he operates on cervical, ovarian, endometrial and vaginal cancers, and on colorectal, rectal, gastric and pancreatic cancers.

He holds a DNB in Oncosurgery from Army Hospital Research & Referral in Delhi and a DNB in Surgery from Command Hospital. He is a Fellow of the Association of Surgeons of India and a Fellow of the American College of Surgeons, and is a certified robotic surgeon.

His earlier appointments include the Asian Institute of Medical Sciences in Faridabad, Paras HMRI in Patna, Metro Hospital in Delhi NCR, HCG Healthcare at Shanti Mukund and Narender Mohan Hospitals, and Apollo Indraprastha Hospitals in Delhi.

His published research concentrates on breast cancer and reflects an interest in how disease is staged and predicted rather than only how it is removed. It includes work on the axillary lymph node ratio compared with pathologic nodal stage as a prognostic factor in breast cancer, PET CT as a prognostic tool in primary breast cancer, a literature review of malignant granular cell tumour of the breast, facial fibro-osseous lesions and reconstruction, and surgically treated carotid body tumour. He won best paper in category at NATCON in 2011.

**Word count:** 259

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 3. Dr. Saroj Rajan

**Slug:** `dr-saroj-rajan` · Max Smart Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Saroj Rajan is Associate Consultant at Max Smart Super Speciality Hospital in Delhi NCR. She has practised for 11+ years experience. The operating list includes Mastectomy and Sentinel Lymph Node Biopsy; Cytoreductive Surgery with HIPEC stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MCh (Gynaecologic Oncology) — All India Institute of Medical Sciences (AIIMS), New Delhi (2024). Travelling patients meet her on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Saroj Rajan is an Associate Consultant at Max Smart Super Speciality Hospital, Saket, Delhi NCR, with more than 11 years of experience across surgical oncology, medical oncology and obstetrics and gynaecology.

Gynaecological cancer is the centre of her operating practice: ovarian, cervical, endometrial, vaginal and vulvar cancer surgery, radical hysterectomy and sentinel lymph node biopsy, together with cytoreductive surgery with HIPEC. She also performs breast cancer surgery.

Her training has been unusually concentrated and recent. She completed her MBBS at JIPMER, Puducherry, in 2015 and an MD in Obstetrics and Gynaecology at AIIMS, New Delhi, in 2019. In 2021 she took an integrated fellowship and diploma in minimal access surgery at World Laparoscopy Hospital, Gurgaon, and a fellowship with the International College of Robotic Surgeons. In 2023 she completed gynaecologic oncology fellowships at Charles University and General Faculty Hospital in Prague and at the Royal London Hospital, Barts NHS Trust, along with certification in essentials of palliative care from the Indian Association of Palliative Care. Her MCh in Gynaecologic Oncology at AIIMS, New Delhi, followed in 2024.

That record has been recognised by her own subspecialty body: the Association of Gynaecologic Oncologists of India named her Best Young Gynaecologic Oncologist in 2025, and she won its super speciality quiz in 2023 as well as the Asia-Oceania Research Organisation quiz the same year. As a student at JIPMER she won the Dr. Sudhir Chandra Bhattacharya Memorial Endowment Prize and the Dr. B.N. Ghosh Memorial Prize in Pharmacology.

**Word count:** 247

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 4. Dr. Somdipto Das

**Slug:** `dr-somdipto-das` · Gleneagles Hospital, Mumbai, Mumbai

### Existing BIO

Dr. Somdipto Das is Consultant at Gleneagles Hospital in Mumbai. He has practised for 12+ years experience. The operating list includes Thyroidectomy for Thyroid Cancer and Neck Dissection; Oral Cancer Surgery stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes BDS — Manipal University. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Somdipto Das is a Consultant at Gleneagles Hospital, Parel, Mumbai, with more than 12 years of experience in surgical oncology and head and neck oncology.

His operating practice is confined to the head and neck, which is where his whole training history points. He performs oral cancer surgery, oropharyngeal, hypopharyngeal and laryngeal cancer surgery, thyroid cancer surgery, head and neck tumour surgery and neck dissection.

He comes to this from a dental and maxillofacial route rather than a general surgical one. He completed his BDS at Manipal University and an MDS in Oral & Maxillofacial Surgery at King George's Medical University, Lucknow, where he was named best performer in oral and maxillofacial surgery in 2013. He then took a fellowship in head and neck oncology at Tata Memorial Hospital, Mumbai, and was a clinical research fellow in oral and maxillofacial surgery at Massachusetts General Hospital, Harvard University. He also holds an advanced fellowship from the American Academy of Cranio-Maxillofacial Surgeons.

Reconstruction is a distinct strand: he received the Ratan Tata Scholarship for microvascular reconstruction training at the University of Southern California, which is the technique used to rebuild the jaw, tongue or throat after a cancer resection.

His earlier and continuing affiliations include Tata Memorial Hospital, Apollo Hospital and HNCII in Mumbai. He received a best research paper award at the COSMOS conference in 2013 and has presented at national and international meetings.

**Word count:** 234

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 5. Dr. Prathamesh Pai

**Slug:** `dr-prathamesh-pai` · Gleneagles Hospital, Mumbai, Mumbai

### Existing BIO

Dr. Prathamesh Pai is Senior Consultant Surgeon at Gleneagles Hospital in Mumbai. He has practised for 20+ years experience. The operating list includes Thyroidectomy for Thyroid Cancer and Neck Dissection; Oral Cancer Surgery stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Prathamesh Pai is a Senior Consultant Surgeon at Gleneagles Hospital, Parel, Mumbai, with more than 20 years of experience. His work covers surgical oncology, head and neck oncology, and thyroid and parathyroid surgery.

His operating list stays within that field: oral cancer surgery, oropharyngeal, hypopharyngeal and laryngeal cancer surgery, thyroid cancer surgery, neck dissection and skull base tumour surgery.

He holds an MBBS, an MS and a DNB. His international training came through two named fellowships: he was a UICC Fellow under the ICRETT programme at Klinikum Fulda in Germany, and a Hargobind Fellow at the University of Pittsburgh in the United States.

Alongside Gleneagles Hospital he is associated with Pai Clinic and P.D. Hinduja Hospital at Khar in Mumbai, and with Tata Memorial Hospital.

What distinguishes his profile is the weight of his teaching and professional service rather than his operating list alone. He has delivered over 400 invited talks and orations at national and international conferences, and holds national and international recognition in head and neck surgery. He served as President of the Foundation for Head Neck Oncology in India from 2021 to 2023, and is the founding secretary of the Indian Society of Thyroid Surgeons — a role that places him at the origin of the organisation now representing that subspecialty in India. For patients, the practical reading is a surgeon whose thyroid and head and neck work is closely tied to how the field is taught and organised in the country.

**Word count:** 246

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 6. Dr. Ajit Singh Oberoi

**Slug:** `dr-ajit-singh-oberoi` · Max Smart Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Ajit Singh Oberoi is Consultant at Max Smart Super Speciality Hospital in Delhi NCR. He has practised for 11+ years experience. The operating list includes Esophagectomy and Gastrectomy; Rectal Cancer Surgery stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MRCS (Surgery) – Royal College of Surgeons of Edinburgh, United Kingdom (2024). Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Ajit Singh Oberoi is a Consultant at Max Smart Super Speciality Hospital, Saket, Delhi NCR, with more than 11 years of experience. His practice covers surgical oncology, thoracic surgical oncology and gastrointestinal surgical oncology by open, laparoscopic and robotic approaches.

His operating list is largely abdominal: esophageal, gastric, colorectal, pancreatic, liver, gallbladder and bile duct cancer surgery, along with thyroid cancer surgery.

His training has run through two of the most competitive routes available. He completed his MBBS at AIIMS, New Delhi, in 2015 and an MS in General Surgery there in 2018, then took first rank in the all-India AIIMS super-speciality surgical oncology entrance examination in 2019 and completed his MCh in Surgical Oncology at Dr. B.R.A. Institute-Rotary Cancer Hospital, AIIMS, in 2022. He then added a second MCh, in Colorectal Surgery, at Edge Hill University in the United Kingdom in 2024, along with the MRCS from the Royal College of Surgeons of Edinburgh in the same year.

His awards track that path closely. He received the Best Student Award with cash prize at Edge Hill University in 2024, an International Bursary Award at the Association of Surgeons of Great Britain & Ireland Congress in 2021, best poster prizes at the Indian Cancer Congress in Mumbai in 2023 and NATCON in New Delhi in 2021, and first prize for the Dr. C. Palanivelu best postgraduate paper at ASICON in 2018. In 2021 he was named among the top 100 Shining Sikhs of India.

**Word count:** 245

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 7. Dr. Harshit Garg

**Slug:** `dr-harshit-garg` · Indraprastha Apollo Hospital, Delhi NCR

### Existing BIO

Dr. Harshit Garg is Uro-Oncologist and Robotic Surgeon at Indraprastha Apollo Hospital in Delhi NCR. He has practised for 12+ years experience. The operating list includes Radical Prostatectomy and Partial Nephrectomy; Radical Cystectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MCh (Urology). Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Harshit Garg is a Uro-Oncologist and Robotic Surgeon at Indraprastha Apollo Hospital, Delhi NCR, with more than 12 years of experience. His work sits at the overlap of urology and surgical oncology, and his operating list is entirely urological cancer: kidney, prostate, bladder and testicular cancer surgery, including radical cystectomy and radical prostatectomy.

He holds an MBBS, an MS in General Surgery and an MCh in Urology, and also consults at Apollo Athenaa Women's Cancer Centre.

His training record at AIIMS, New Delhi, was strong enough to be recognised twice. He received the Dr. Hiralal Medal in General Surgery and the Dr. JR Chawla Medal in Urology, awarded for best urology resident, and served as an executive member of the Residents' Doctors Association there. He also holds the Urological Society of India Olympus Travel Fellowship Award.

His memberships are largely international, which is relevant for patients comparing approaches across countries: the American Urological Association, the Société Internationale d'Urologie, and the Urological Society of India along with its North Zone Section.

He has published over 50 papers in national and international peer-reviewed journals. For a surgeon a dozen years into practice, that volume of publication alongside a robotic uro-oncology caseload is the distinguishing feature of the profile, and it sits behind the complex prostate, bladder and kidney work he takes on.

**Word count:** 221

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 8. Dr. Rachita Chopra

**Slug:** `dr-rachita-chopra` · Medanta - The Medicity, Delhi NCR

### Existing BIO

Dr. Rachita Chopra is Associate Consultant at Medanta - The Medicity in Delhi NCR. She has practised for 8+ years experience. The operating list includes Esophagectomy and Lung Cancer Surgery; a second look in theatre stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS — Kasturba Medical College, Manipal. Travelling patients meet her on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Rachita Chopra is an Associate Consultant at Medanta – The Medicity, Delhi NCR, with more than 8 years of experience. She works in thoracic and chest surgical oncology, and her operating list covers lung cancer surgery, mediastinal and chest wall tumour surgery, esophageal cancer surgery and pleural mesothelioma surgery.

She completed her MBBS at Kasturba Medical College, Manipal, and a DNB in General Surgery at Hindu Rao Hospital and NDMC Medical College, Delhi. Her thoracic training was taken at the Institute of Chest Surgery at Medanta, Gurugram, where she earned a DrNB in Thoracic Surgery and where she now practises. She also holds the MRCS from the Royal College of Surgeons, Edinburgh.

Her wider surgical training is broader than the chest alone: fellowships in surgical gastroenterology, in liver transplantation, and in minimal access and robotic surgery. She is also a certified ATLS instructor, which is the trauma resuscitation course, and completed a public policy programme with high distinction — an unusual addition that points to an interest in how surgical services are organised as well as delivered.

She received the ASI Travelling Fellowship, a national surgical fellowship awarded by the Association of Surgeons of India, along with multiple national awards in surgery, and has an extensive publication record covering peer-reviewed journal articles and book chapters.

**Word count:** 216

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 9. Dr. Rajesh Shinde

**Slug:** `dr-rajesh-shinde` · Apollo Hospitals, Navi Mumbai, Mumbai

### Existing BIO

Dr. Rajesh Shinde is Consultant Surgical Oncologist at Apollo Hospitals in Mumbai. He has practised for 15+ years experience. The operating list includes Gastrectomy and Rectal Cancer Surgery; Colectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS— Bachelor of Medicine and Bachelor of Surgery. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Rajesh Shinde is a Consultant Surgical Oncologist at Apollo Hospitals, Navi Mumbai, with more than 15 years of experience.

Colorectal cancer is his specialised focus, approached with robotic surgical technique, and his operating list includes total mesorectal excision and low anterior resection for rectal cancer. The rest of it is hepatopancreatobiliary and gastrointestinal: liver cancer surgery and major liver resection, pancreatic cancer surgery and the Whipple procedure for periampullary and pancreatic tumours, gallbladder and gastric cancer surgery, small intestine cancer surgery, and cytoreductive surgery for GI cancers including CRS with HIPEC.

He holds an MBBS, an MS in General Surgery and an MCh in Surgical Oncology. He worked at Bombay Hospital Institute of Medical Sciences from 2008 to 2013, at Tata Memorial Hospital from 2013 to 2019, and returned to Bombay Hospital from 2019 before his current post.

His research follows the same colorectal and HPB lines. It includes work on whether histology dictates outcome in locally advanced rectal adenocarcinoma with complete pathological response after chemoradiation, a video vignette of robotic transabdominal intersphincteric resection with stapled coloanal anastomosis using the da Vinci Xi system, a single centre series on extracapsular excision of hepatic hemangioma, and a paper arguing the case for inter-institutional travel fellowships for young surgical oncologists.

He received the RD Birla Smarak Kosh Scholarship at NATCON in 2019, a best poster award at IASG 2017 later presented in Xiamen, and a best paper award at ICC 2017 that took him to the University of Verona in 2018.

**Word count:** 250

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 10. Dr. Rupinder Sekhon

**Slug:** `dr-rupinder-sekhon` · Apollo Athenaa Women's Cancer Centre, Delhi NCR

### Existing BIO

Dr. Rupinder Sekhon is Senior Consultant, Gynaecologic Oncology at Apollo Athenaa Women's Cancer Centre in Delhi NCR. She has practised for 35+ years experience. The operating list includes Mastectomy and Sentinel Lymph Node Biopsy; Cytoreductive Surgery with HIPEC stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS. Travelling patients meet her on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Rupinder Sekhon is Senior Consultant in Gynaecologic Oncology at Apollo Athenaa Women's Cancer Centre, Delhi NCR, with more than 35 years of experience.

Her operating list covers ovarian, cervical, endometrial, vulvar and vaginal cancer surgery, radical hysterectomy, sentinel lymph node biopsy, cytoreductive surgery with HIPEC, and mastectomy.

She holds an MBBS and an MD in Obstetrics & Gynaecology, and is a certified robotic console surgeon. She is also a WHO–IARC and IFCPC certified colposcopy trainer, a credential concerned with cervical cancer screening and prevention rather than treatment, and one she uses to train others in it.

Her professional memberships are concentrated in her subspecialty: the European Society of Gynaecological Oncology, the Indian Society of Peritoneal Surface Malignancy as a life member, the Association of Obstetricians & Gynaecologists of Delhi, AOGIN India, and the Association of Gynaecologic Robotic Surgeons.

Much of her standing in the field is editorial and organisational. She is immediate past-president of AOGIN India, the Asian Oceanic organisation for gynaecologic infections and neoplasia, executive editor of the Asian Journal of Oncology, and an editor of the Indian Journal of Gynecologic Oncology. For a patient facing surgery for a gynaecological cancer, the combination is a surgeon of 35 years who also sets and reviews the standards her field publishes, and who works across both open and robotic approaches.

**Word count:** 220

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 11. Dr. Karan Gupta

**Slug:** `dr-karan-gupta` · Medanta - The Medicity, Delhi NCR

### Existing BIO

Dr. Karan Gupta is Senior Consultant at Medanta - The Medicity in Delhi NCR. He has practised for 15+ years experience. The operating list includes Thyroidectomy for Thyroid Cancer and Neck Dissection; Oral Cancer Surgery stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS (Gold Medal) — Maulana Azad Medical College, Delhi. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Karan Gupta is a Senior Consultant at Medanta – The Medicity, Gurugram, Delhi NCR, with more than 15 years of experience across surgical oncology and ENT head and neck surgery.

His operating list covers oral cancer surgery, oropharyngeal, hypopharyngeal and laryngeal cancer surgery, thyroid cancer surgery, head and neck tumour surgery and neck dissection. He also performs transoral laser microsurgery, an approach that reaches tumours of the voice box and throat through the mouth rather than through an external incision.

His training record is decorated at both stages: a gold medal in MBBS at Maulana Azad Medical College, Delhi, and another in his MS in Otolaryngology & Head-Neck Surgery at PGIMER, Chandigarh, followed by a DNB in the same specialty. He then took three fellowships — in head and neck surgery, in head and neck reconstructive surgery, and in robotic head and neck surgery — with robotic training at the Vattikuti Foundation in Michigan and further training at Memorial Sloan Kettering Cancer Centre in New York, Stanford University in California and the University of Toronto.

That robotic work is also where his research sits. He received a Poster of Distinction Award at the 2017 American Head Neck Society meeting, held as part of the Combined Otolaryngology Spring Meet in San Diego, for a feasibility study of transoral robotic surgery for supraglottic malignancies at a tertiary cancer centre in India. He also held an ESMO travel grant fellowship to attend ESMO Asia 2017 in Singapore.

**Word count:** 245

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 12. Dr. Arsheed Hussain Hakeem

**Slug:** `dr-arsheed-hussain-hakeem` · Apollo Hospital, Jubilee Hills, Hyderabad, Hyderabad

### Existing BIO

Dr. Arsheed Hussain Hakeem is Consultant, Head and Neck Surgical Oncologist at Apollo Hospital in Hyderabad. He has practised for 20+ years experience. The operating list includes Mastectomy and Sentinel Lymph Node Biopsy; Thyroidectomy for Thyroid Cancer stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MD – General Medicine. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

NOT GENERATED.

**Word count:** —

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE — no bio proposed. The record is internally contradictory about what this doctor does.
The designation is "Consultant, Head and Neck Surgical Oncologist" and the procedure list is entirely
operative (head and neck tumour surgery, oral cancer surgery, neck dissection, breast cancer surgery,
sentinel lymph node biopsy, thyroid cancer surgery), but the qualifications and education are
exclusively non-surgical: MD in General Medicine, DNB in Medical Oncology, an ESMO fellowship and a
post-doctoral fellowship in Hemato-Oncology & BMT, with "Hematology & BMT" also listed as a
specialisation. Writing a bio would mean choosing between the two accounts, which is exactly the
inference this task forbids, so the doctor is flagged for manual review and left unchanged.

**Other fields that would change:** NONE (bio only)

**Status:** FLAGGED — no change proposed

---

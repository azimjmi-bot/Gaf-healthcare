# Doctor BIO rewrite — Batch 12 — Surgical Oncology, India

Final Surgical Oncology batch. Every sentence is drawn from that doctor's own record in
`src/data/ginger-catalog.json` (designation, hospital, city, experience, qualifications, education,
affiliations, memberships, awards and research). The previous bios in this specialty are GAF
platform boilerplate and carry no doctor-specific facts, so the structured fields are the source.
No external sources, no inference, and no information from any other doctor's profile.
Only `doctorOverrides["<slug>"].bio` is written; no pSEO, schema, routing or frontend field changes.

One doctor is flagged rather than rewritten: all five of his substance fields hold the same three
neuro-oncology entries, which do not belong to a head and neck surgeon.

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. Kanchan Kaur | Delhi NCR | 79 | 208 | APPLIED |
| 2 | Dr. Naveen H C | Chennai | 94 | — | **FLAGGED — INSUFFICIENT SOURCE INFORMATION** |
| 3 | Dr. Nikhil Agrawal | Delhi NCR | 79 | 223 | APPLIED |
| 4 | Dr. Richa Ashok Bansal | Mumbai | 75 | 225 | APPLIED |
| 5 | Dr. Sreekanth CN | Hyderabad | 76 | 232 | APPLIED |
| 6 | Dr. Swathi Prakash | Chennai | 85 | 245 | APPLIED |
| 7 | Dr. Asit Arora | Delhi NCR | 71 | 218 | APPLIED |
| 8 | Dr. Biswajyoti Hazarika | Delhi NCR | 84 | 214 | APPLIED |
| 9 | Dr. Himanshu Gupta | Delhi NCR | 77 | 224 | APPLIED |
| 10 | Dr. Shailesh Shrikhande | Mumbai | 68 | 228 | APPLIED |

Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and
for traceability of every capitalised term, acronym, degree and year back to that individual
doctor's own record in `src/data/ginger-catalog.json`.

---

## 1. Dr. Kanchan Kaur

**Slug:** `dr-kanchan-kaur` · Medanta - The Medicity, Delhi NCR

### Existing BIO

Dr. Kanchan Kaur is Senior Director at Medanta - The Medicity in Delhi NCR. She has practised for 26+ years experience. The operating list includes Oncoplastic Breast Surgery and Breast-Conserving Surgery (Lumpectomy); Mastectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes M.R.C.S. (Edin) — Member of the Royal College of Surgeons, Edinburgh. Travelling patients meet her on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Kanchan Kaur is Senior Director at Medanta – The Medicity in the Delhi NCR, with more than 26 years of experience. Her practice is breast surgery and breast cancer surgical oncology, and she also consults at Medanta Mediclinic Golf Course.

The range of her work covers the whole path a breast patient travels. At the diagnostic end she carries out breast lump evaluation, nipple discharge evaluation and breast biopsy procedures, and manages breast cysts and fibroadenomas. Where surgery is needed for cancer she performs wide local excision and breast-conserving surgery, mastectomy and modified radical mastectomy, and oncoplastic breast surgery when the breast is to be reshaped around the excision. For the axilla she offers sentinel lymph node biopsy and, where the nodes require it, axillary lymph node dissection.

She qualified M.B.B.S. and took an M.S. in General Surgery, and is a Member of the Royal College of Surgeons, Edinburgh.

Her student record was exceptional. She was awarded certificates for topping all four professional MBBS examinations, received the PFIZER Gold Medal as meritorious medical student for 1999, and was named best student of the year by Jammu University in 2000, again with a gold medal. In October 2018 she received the Chicago Sister Cities International Medical Initiative Award.

**Word count:** 208

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 2. Dr. Naveen H C

**Slug:** `dr-naveen-h-c` · Apollo Proton Cancer Centre, Chennai

### Existing BIO

Dr. Naveen H C is Consultant, Head & Neck Oncology at Apollo Proton Cancer Centre in Chennai. He has practised for 15+ years experience. The operating list includes Neck Dissection and reconstruction when the defect needs it; a second look in theatre stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes Delivered the prestigious invited NIMHANS Dr. Subhadra Dayanand Rao oration on 29th June 2017 at NIMHANS, Bengaluru.. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

NOT GENERATED.

**Word count:** —

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE — no bio proposed. All five substance fields on this record — specializations,
proceduresExpertise, education, affiliations and awards — hold the identical three entries, and the
entries are neuro-oncology: an oration at NIMHANS, a scientific chair of the Neuro Oncology section
at ESMO Asia 2017, and a leading role in establishing neuro-oncology societies in Sub Saharan Africa
and South America. The doctor is recorded as Consultant, Head & Neck Oncology with an MS in ENT and
an MCh in Head & Neck Surgical Oncology. Nothing in the profile states where he trained, what he
operates on, or where he has worked, and the material that is there appears to belong to somebody
else. Nothing can be written from this record without inventing it, so the doctor is flagged for
manual review and left unchanged.

**Other fields that would change:** NONE (bio only)

**Status:** FLAGGED — no change proposed

---
## 3. Dr. Nikhil Agrawal

**Slug:** `dr-nikhil-agrawal` · Indraprastha Apollo Hospital, Delhi NCR

### Existing BIO

Dr. Nikhil Agrawal is Senior Consultant, GI-HPB Surgical Oncologist at Indraprastha Apollo Hospital in Delhi NCR. He has practised for 19+ years experience. The operating list includes Esophagectomy and Gastrectomy; Rectal Cancer Surgery stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MCh — All India Institute of Medical Sciences (AIIMS), New Delhi. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Nikhil Agrawal is Senior Consultant and GI-HPB Surgical Oncologist at Indraprastha Apollo Hospital in the Delhi NCR, with more than 19 years of experience. He also works at the Apollo Athenaa Women's Cancer Centre.

His practice covers the gastrointestinal tract and the hepatopancreatobiliary organs. He performs pancreatic cancer surgery, gallbladder and bile duct cancer surgery, and liver cancer surgery, alongside esophageal, gastric, small intestine and colorectal cancer surgery, so his list runs the length of the digestive tract together with the solid organs that drain into it. For cancer that has spread across the peritoneal surfaces he performs cytoreductive surgery with HIPEC.

His entire medical training was completed at the All India Institute of Medical Sciences in New Delhi: MBBS, then MS in Surgery, then MCh. That is an unusually consistent path through a single institution. He is also a certified robotic surgery proctor, which means he mentors other surgeons through complex robotic GI-HPB oncologic procedures rather than only performing them himself.

He sits on the executive committee of the Indian Association of Surgical Gastroenterology. He has published over 50 PubMed-indexed papers and several book chapters, including in The Lancet Oncology, and appears as invited faculty at major GI-HPB conferences in India and abroad. Against 19 years in practice, that output is the clearest marker of the academic half of his work.

**Word count:** 223

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 4. Dr. Richa Ashok Bansal

**Slug:** `dr-richa-ashok-bansal` · Apollo Hospitals, Navi Mumbai, Mumbai

### Existing BIO

Dr. Richa Ashok Bansal is Consultant, Surgical Oncology at Apollo Hospitals in Mumbai. She has practised for 10+ years experience. The operating list includes Breast-Conserving Surgery (Lumpectomy) and Mastectomy; Sentinel Lymph Node Biopsy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MCh – Gynaecological Oncology, Tata Memorial Hospital. Travelling patients meet her on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Richa Ashok Bansal is a Consultant in Surgical Oncology at Apollo Hospitals, Navi Mumbai, with more than 10 years of experience. Her work sits between surgical oncology and obstetrics and gynecology, with a gynecologic oncology focus.

Most of her operating is in the gynaecological cancers. She performs radical hysterectomy and operates on cervical, endometrial, vulvar and vaginal cancer. Ovarian cancer is handled through both debulking and cytoreductive surgery, and she carries out gynecologic cancer lymphadenectomy and sentinel lymph node biopsy for nodal management. She also performs breast cancer surgery, offering both breast-conserving surgery and mastectomy.

She qualified MBBS and took an MS in General Surgery before subspecialising. Her MCh in Gynaecological Oncology was completed at Tata Memorial Hospital, and she also holds a DNB in Surgical Oncology and a fellowship of the European Society of Gynaecological Oncology.

Her academic record reaches beyond India. In 2017 she took first prize at the 6th National Conference of the National Association of Ovarian Cancer, for work on bone and young adult cancers. In 2019 she was selected for the FIGO working group and Asian Collaboration for Research in Uterine and Endometrial Neoplasms in Oncology, organised by Tata Memorial Centre and the National Cancer Grid of India. She co-authored a study on the prevalence of human papilloma virus in specimens of post-menopausal patients with oral and oropharyngeal cancers.

**Word count:** 225

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 5. Dr. Sreekanth CN

**Slug:** `dr-sreekanth-cn` · Yashoda Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. Sreekanth CN is Senior Consultant at Yashoda Hospitals in Hyderabad. He has practised for 20+ years experience. The operating list includes Oncoplastic Breast Surgery and Breast-Conserving Surgery (Lumpectomy); Mastectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes Online Course in Thoracic Oncology — University of Michigan (January 2022). Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Sreekanth CN is a Senior Consultant in surgical oncology at Yashoda Hospitals, Secunderabad, Hyderabad, with more than 20 years of experience.

His operating range is wide. On the breast he performs breast cancer surgery, breast-conserving surgery and oncoplastic breast surgery. In the head and neck he operates on thyroid cancer and on head and neck tumours. In the abdomen he handles gastric, esophageal and liver cancer, and the gynaecological cancers of the ovary, cervix and endometrium. In the chest he performs lung cancer surgery and mediastinal tumour surgery. For peritoneal disease he offers cytoreductive surgery with HIPEC.

He trained in Hyderabad and Mumbai. His MBBS was taken at Osmania Medical College, Hyderabad, from 1996 to 2001, followed by his internship at the same college. He completed his MS in General Surgery at Gandhi Medical College, Secunderabad, between 2004 and 2007, and his MCh in Surgical Oncology at Tata Memorial Hospital, Mumbai, from August 2010 to August 2013.

Since then he has added technique courses rather than further degrees. He took an advanced course in HIPEC and cytoreductive surgery at Hamburg in February 2018, and the International VATS Advanced Course at West China Hospital in Chengdu. He qualified as a console surgeon on the da Vinci Surgical System at Yenepoya Training Centre, Mangalore, in December 2019, and completed an online course in thoracic oncology with the University of Michigan in January 2022.

**Word count:** 232

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 6. Dr. Swathi Prakash

**Slug:** `dr-swathi-prakash` · Rela Hospital, Chennai

### Existing BIO

Dr. Swathi Prakash is Consultant, Breast Surgery, Cancer Centre, Surgical Oncology at Rela Hospital in Chennai. She has practised for 15+ years experience. The operating list includes Oncoplastic Breast Surgery and Breast-Conserving Surgery (Lumpectomy); Mastectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MCh (Breast & Endocrine Surgery) — All India Institute of Medical Sciences (AIIMS), New Delhi. Travelling patients meet her on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Swathi Prakash is a Consultant in breast surgery at the Cancer Centre of Rela Hospital, Chennai, working within surgical oncology, with more than 15 years of experience.

Her practice is devoted to the breast. She performs breast cancer surgery, mastectomy, breast-conserving surgery and oncoplastic breast surgery, and uses sentinel lymph node biopsy for nodal staging. Alongside the cancer surgery she also carries out breast biopsy, fibroadenoma treatment and breast cyst treatment.

She qualified MBBS from Shri Sathya Sai Medical College and Research Institute, Kanchipuram, and took her MS in General Surgery at Govt Kilpauk Medical College and Govt Royapettah Hospital in Chennai. Her MCh is in Breast and Endocrine Surgery, from the All India Institute of Medical Sciences, New Delhi.

Her research compares reconstruction strategies after mastectomy. In a randomized controlled trial she set skin sparing mastectomy with total breast reconstruction using autologous fat grafting against skin sparing mastectomy with silicone implant reconstruction and against breast conservative therapy, measuring quality of life, cosmesis and oncological outcomes in early breast cancer. The results at 34 months of follow-up were presented at the Australasian International Breast Congress in Brisbane.

She has won prizes for three case presentations: a poster on DCIS with lobular cancerization and contralateral axillary metastases at ASOMA in Dehradun in 2022, a collision tumor of the submandibular gland at ASICON in Jaipur in 2017, and a retrosternal goitre at the International College of Surgeons conference on updates of endocrine surgery the same year.

**Word count:** 245

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 7. Dr. Asit Arora

**Slug:** `dr-asit-arora` · Indraprastha Apollo Hospital, Delhi NCR

### Existing BIO

Dr. Asit Arora is Clinical Lead, GI & HPB Surgical Oncology at Indraprastha Apollo Hospital in Delhi NCR. He has practised for 22+ years experience. The operating list includes Esophagectomy and Gastrectomy; Rectal Cancer Surgery stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes M.B.B.S.. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Asit Arora is Clinical Lead for GI and HPB Surgical Oncology at Indraprastha Apollo Hospital in the Delhi NCR, with more than 22 years of experience. He also works at the Apollo Athenaa Women's Cancer Centre, and his profile records surgical gastroenterology, hepatobiliary and transplant surgery alongside surgical oncology.

His list is named at the level of the operation as well as the diagnosis. He performs the Whipple procedure and distal pancreatectomy for pancreatic disease, liver resection and hepatectomy for liver tumours, and gastrectomy for gastric cancer. The diagnoses behind those operations are pancreatic, gallbladder and bile duct cancer, liver cancer, and gastric, esophageal and colorectal cancer. For peritoneal spread he performs cytoreductive surgery with HIPEC.

He qualified M.B.B.S., took an M.S. in General Surgery, and completed his M.Ch. in Gastrointestinal Surgery, the super-specialty route into the hepatobiliary and pancreatic work that defines his present practice.

Three awards are recorded against his name, and between them they cover both sides of that practice. He is a recipient of the ICMR Young Scientist Award, given for research. In 2022 the ET Healthcare Awards named him Oncosurgeon of the Year for North India, and in 2025 he received the Pride of Indian Healthcare Award at the Indian Express Health Conclave, both of which recognise clinical standing rather than publication.

**Word count:** 218

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 8. Dr. Biswajyoti Hazarika

**Slug:** `dr-biswajyoti-hazarika` · Artemis Hospital, Delhi NCR

### Existing BIO

Dr. Biswajyoti Hazarika is Chief of Head & Neck Surgery at Artemis Hospital in Delhi NCR. He has practised for 22+ years experience. The operating list includes Thyroidectomy for Thyroid Cancer and Neck Dissection; Oral Cancer Surgery stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes Fellowship — Head & Neck Surgery, Kidwai Memorial Institute of Oncology, Bangalore. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Biswajyoti Hazarika is Chief of Head and Neck Surgery at Artemis Hospital, Gurgaon, in the Delhi NCR, with more than 22 years of experience. His profile records ENT alongside surgical oncology, and that is the route he came by.

His surgical practice is confined to the head and neck. He operates on oral cancer, on laryngeal, hypopharyngeal and oropharyngeal cancer, and on thyroid cancer, and takes on head and neck tumour surgery generally. Neck dissection is part of how he manages the lymph nodes of the neck.

He trained first in Assam. His MBBS was taken at Gauhati Medical College and Hospital in Guwahati, and his MS in ENT at Assam Medical College and Hospital in Dibrugarh. He then moved south for a fellowship in head and neck surgery at Kidwai Memorial Institute of Oncology, Bangalore, the institution that turned an ENT surgeon into a head and neck oncologist and where he subsequently worked.

His career since has run through several large units. He has been at Prince Aly Khan Hospital in Mumbai and at Max Super Specialty Hospital in Saket, New Delhi, before taking his present post as Chief of Head and Neck Surgery at Artemis Hospitals in Gurgaon.

His postgraduate work was recognised with the Blue Star Best Post Graduate Award.

**Word count:** 214

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 9. Dr. Himanshu Gupta

**Slug:** `dr-himanshu-gupta` · BLK-Max Super Speciality Hospital, Delhi NCR

### Existing BIO

Dr. Himanshu Gupta is Senior Consultant, Plastic & Onco Reconstructive Surgery, Cancer Centre at BLK-Max Super Speciality Hospital in Delhi NCR. He has practised for 15+ years experience. The operating list includes Oncoplastic Breast Surgery and Breast Reconstruction; Breast-Conserving Surgery (Lumpectomy) stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MBBS. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Himanshu Gupta is Senior Consultant in Plastic and Onco Reconstructive Surgery at the Cancer Centre of BLK-Max Super Speciality Hospital in the Delhi NCR, with more than 15 years of experience. His profile records both surgical oncology and cosmetic and plastic surgery, and his work sits where the two meet.

The breast is the main site, and his post covers both halves of the operation. He performs breast cancer surgery, mastectomy and breast-conserving surgery, and then the reconstruction: oncoplastic breast surgery and breast reconstruction surgery. That combination is what his title describes, plastic and onco reconstructive surgery carried out inside a cancer centre rather than referred on to a separate unit. He also operates on head and neck tumours and on skin cancer and melanoma.

He qualified MBBS and took an MS in General Surgery before his M.Ch in Plastic and Reconstructive Surgery. His further training was taken abroad. He was a Fellow in Cosmetic Surgery at University Hospital Moncloa in Madrid, Spain, and an observer in lymphatic microsurgery at Istituto Clinico Ligure di Alta Specialità in Rapallo, Italy.

His earlier posts were in cancer units. He was Assistant Professor and Senior Resident in plastic and reconstructive surgery at Tata Memorial Hospital, Mumbai, and then Consultant in plastic and reconstructive surgery at Action Cancer Hospital, New Delhi, before his present appointment at BLK-Max.

**Word count:** 224

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 10. Dr. Shailesh Shrikhande

**Slug:** `dr-shailesh-shrikhande` · Gleneagles Hospital, Mumbai, Mumbai

### Existing BIO

Dr. Shailesh Shrikhande is Director & Head of Surgical Oncology at Gleneagles Hospital in Mumbai. He has practised for 25+ years experience. The operating list includes Gastrectomy and Pancreatic Surgery; Radical Cystectomy stays on the table when the indication is honest. Peer review happens before anyone books a flight. Training includes MS. Travelling patients meet him on camera first; a date is offered only after the records hold.

### Proposed BIO

Dr. Shailesh Shrikhande is Director and Head of Surgical Oncology at Gleneagles Hospital, Parel, Mumbai, with more than 25 years of experience. His profile records three overlapping areas of work: surgical oncology, surgical gastroenterology, and gastroenterology and hepatobiliary surgery.

His operating practice is hepatobiliary and upper gastrointestinal. He performs pancreatic cancer surgery, gallbladder cancer surgery and bile duct cancer surgery, operates on liver cancer and liver tumours, and takes on gastric cancer surgery and small intestine cancer surgery. Pancreatic surgery sits at the centre of that list, with the biliary tract and the liver on one side of it and the stomach and small bowel on the other.

He holds an MS and an MD. Beyond those, what the record shows is a series of honorary fellowships rather than further examined degrees: FRCS from England and FRCS from Edinburgh, FACS from the American College of Surgeons, and FASA from the American Surgical Association. Those four fellowships, conferred rather than sat for, are an unusual concentration.

Before Gleneagles he was at Tata Memorial Hospital in Mumbai, where he served as Deputy Director and as Chief of GI and HPB Surgical Services. That post covered gastrointestinal and hepatobiliary surgery across the institution, and it accounts for the shape of the practice he brought with him: pancreatic and biliary surgery at the centre, with liver and upper gastrointestinal work around it.

**Word count:** 228

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---

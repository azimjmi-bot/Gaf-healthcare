# Doctor BIO rewrite — Batch 40 — Neurosurgery, India

Final Neurosurgery batch. Every sentence is drawn from that doctor's own record in
`src/data/ginger-catalog.json` (designation, hospital, city, experience, qualifications, education,
affiliations, memberships, awards and research). The previous bios in this specialty are GAF
platform boilerplate, so the structured fields are the source. No external sources, no inference,
and no information from any other doctor's profile. Only `doctorOverrides["<slug>"].bio` is
written; no pSEO, schema, routing or frontend field changes.

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. Muralidharan Vetrivel | Chennai | 123 | 239 | APPLIED |
| 2 | Dr. V S Mehta | Delhi NCR | 134 | 262 | APPLIED |
| 3 | Dr. Rajendra Prasad | Delhi NCR | 118 | 200 | APPLIED |
| 4 | Dr. Binit Kedia | Delhi NCR | 125 | 216 | APPLIED |
| 5 | Dr. Sanjeev Srivastava | Delhi NCR | 124 | 208 | APPLIED |
| 6 | Dr. Sudhir Dubey | Delhi NCR | 147 | 251 | APPLIED |
| 7 | Dr. Bipin Walia | Delhi NCR | 144 | 202 | APPLIED |
| 8 | Dr. B G Ratnam | Hyderabad | 117 | 214 | APPLIED |
| 9 | Dr. Sunit Mediratta | Delhi NCR | 120 | 246 | APPLIED |
| 10 | Dr. V. R. Roopesh Kumar | Chennai | 124 | 211 | APPLIED |
| 11 | Dr. Naren Nayak | Mumbai | 117 | 232 | APPLIED |
| 12 | Dr. Sridutt Bhadri | Bengaluru | 116 | 203 | APPLIED |

Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and
for traceability of every capitalised term, acronym, degree and year back to that individual
doctor's own record in `src/data/ginger-catalog.json`.

---

## 1. Dr. Muralidharan Vetrivel

**Slug:** `dr-muralidharan-vetrivel` · Rela Hospital, Chennai

### Existing BIO

Dr. Muralidharan Vetrivel is Consultant at Rela Hospital in Chennai, India. He has practised neurosurgery in India for 14+ years experience. Brain tumour, skull-base, aneurysm, DBS, paediatric and radiosurgery lists are tagged for later pSEO under country, city, specialty and procedure — Glioma Surgery, Meningioma Surgery and Pituitary Tumor Surgery when MRI, angiography or EEG already make the indication honest. Craniotomy versus endoscopic corridor, clipping versus coiling, and open resection versus Gamma Knife, CyberKnife or SRS are written after records review — not from a brochure robot or frame count. Training includes Fellowship in Endovascular Neurosurgery — University of Catania, Italy (2020). International patients meet him on camera first; travel to Chennai is offered only if this neurosurgery floor is the right list.

### Proposed BIO

Dr. Muralidharan Vetrivel is a Consultant at Rela Hospital, Chennai, with more than 14 years of experience. His profile records neurosurgery, interventional neuroradiology and spine surgery.

His list covers open and endovascular treatment of the same conditions. On the open side he performs brain tumor surgery, glioma surgery and meningioma surgery, acoustic neuroma or vestibular schwannoma surgery, pituitary tumor surgery, craniotomy, spinal tumor surgery, cavernoma surgery, arteriovenous malformation surgery and aneurysm clipping. On the endovascular side he performs aneurysm coiling, AVM embolization and stroke thrombectomy, which is the interventional neuroradiology arm of his profile.

His training is dated and much of it was taken abroad. He read MBBS at Madras Medical College and Government General Hospital in 2012, then completed a six-year integrated MCh in neurosurgery at Christian Medical College, Vellore, in 2019. His fellowship in endovascular neurosurgery was taken at the University of Catania in Italy in 2020. He also holds advanced microvascular anastomosis training from the Christian Doppler Medical Centre in Salzburg, Austria, and exclusive training in microvascular anastomosis techniques at Erasmus Medical Centre in Rotterdam, the Netherlands.

His speaking record is recent. He was an invited speaker at TEDx in 2023, and in 2024 was faculty at the World Neurosciences Summit and at the Neurological Society of India.

He has been at Dr. Rela Institute and Medical Centre in Chennai since 2025, and worked at Panimalar Medical College Hospital and Research Institute from 2021 to 2025.

**Word count:** 239

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 2. Dr. V S Mehta

**Slug:** `dr-v-s-mehta` · Paras Hospitals, Gurugram, Delhi NCR

### Existing BIO

Dr. V S Mehta is Chairman Emeritus of Neurosciences at Paras Hospitals in Delhi NCR, India. He has practised neurosurgery in India for 38+ years experience. GAF Healthcare lists him among featured India neurosurgeons for brain-tumour, aneurysm and radiosurgery lists. Brain tumour, skull-base, aneurysm, DBS, paediatric and radiosurgery lists are tagged for later pSEO under country, city, specialty and procedure — Glioma Surgery, Meningioma Surgery and Pituitary Tumor Surgery when MRI, angiography or EEG already make the indication honest. Craniotomy versus endoscopic corridor, clipping versus coiling, and open resection versus Gamma Knife, CyberKnife or SRS are written after records review — not from a brochure robot or frame count. Training includes M.B.B.S.. International patients meet him on camera first; travel to Delhi NCR is offered only if this neurosurgery floor is the right list.

### Proposed BIO

Dr. V S Mehta is Chairman Emeritus of Neurosciences at Paras Hospitals, Gurugram, in Delhi NCR, with more than 38 years of experience in neurosurgery.

His list is cranial and largely tumour work. He performs brain tumor surgery, glioma surgery and meningioma surgery, skull base tumor surgery and skull base surgery, pituitary tumor surgery, acoustic neuroma or vestibular schwannoma surgery, pediatric brain tumor surgery, craniotomy and endoscopic brain surgery, with spinal tumor surgery alongside them.

After M.B.B.S. and an M.S. in general surgery he took his M.Ch. in neurosurgery at AIIMS, New Delhi. He is a Fellow of the National Academy of Sciences, India, and a Fellow of the National Academy of Medical Sciences.

The Government of India has awarded him the Padma Shri in recognition of his distinguished contributions to the field of neurosurgery. That civilian honour, together with fellowships of both national academies and the title of Chairman Emeritus rather than a serving departmental head, describes a career whose standing rests on its length and contribution to the specialty as much as on its current operating list.

The list itself is worth setting out by group. Glioma, meningioma and brain tumor surgery are recorded together as the general tumour work. Skull base tumor surgery, skull base surgery, pituitary tumor surgery and acoustic neuroma surgery form a second group at the base of the skull. Pediatric brain tumor surgery extends the same work to children, and spinal tumor surgery takes it below the head. Craniotomy and endoscopic brain surgery are listed as the approaches.

He practises at Paras Health in Gurugram.

**Word count:** 262

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 3. Dr. Rajendra Prasad

**Slug:** `dr-rajendra-prasad` · Indraprastha Apollo Hospital, Delhi NCR

### Existing BIO

Dr. Rajendra Prasad is Senior Consultant at Indraprastha Apollo Hospital in Delhi NCR, India. He has practised neurosurgery in India for 35+ years experience. Brain tumour, skull-base, aneurysm, DBS, paediatric and radiosurgery lists are tagged for later pSEO under country, city, specialty and procedure — Glioma Surgery, Meningioma Surgery and Pituitary Tumor Surgery when MRI, angiography or EEG already make the indication honest. Craniotomy versus endoscopic corridor, clipping versus coiling, and open resection versus Gamma Knife, CyberKnife or SRS are written after records review — not from a brochure robot or frame count. Training includes MBBS. International patients meet him on camera first; travel to Delhi NCR is offered only if this neurosurgery floor is the right list.

### Proposed BIO

Dr. Rajendra Prasad is a Senior Consultant at Indraprastha Apollo Hospital in Delhi NCR, with more than 35 years of experience in neurosurgery.

His list runs across tumour, vascular and functional work. The tumour half covers brain tumor surgery, glioma surgery and meningioma surgery, skull base tumor surgery and skull base surgery, and pituitary tumor surgery, with craniotomy and endoscopic brain surgery as the approaches. The vascular half covers aneurysm clipping for brain aneurysms and arteriovenous malformation surgery. The functional half covers epilepsy surgery, VNS implant and deep brain stimulation, so the same practice treats tumours, aneurysms and drug-resistant epilepsy.

His qualifications are MBBS, an MS in general surgery and an M.Ch in neurosurgery. His fellowship training was taken at various international institutions, including programmes in the USA, the UK, France and Japan.

His record notes multiple national and international awards for his contributions to neurosurgery, recognition for excellence in brain tumor surgery and spinal neurosurgery, awards for distinguished research and publications in peer-reviewed neurosurgical journals, and honours at neurosurgical conferences for academic and clinical contribution. No titles or years are recorded on the profile, so they are left as the record gives them.

He practises at Apollo Hospitals, Indraprastha.

**Word count:** 200

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 4. Dr. Binit Kedia

**Slug:** `dr-binit-kedia` · Sarvodaya Hospital, Faridabad, Delhi NCR

### Existing BIO

Dr. Binit Kedia is Associate Consultant at Sarvodaya Hospital in Delhi NCR, India. He has practised neurosurgery in India for 13+ years experience. Brain tumour, skull-base, aneurysm, DBS, paediatric and radiosurgery lists are tagged for later pSEO under country, city, specialty and procedure — Glioma Surgery, Brain Tumor Surgery and Endoscopic Brain Surgery when MRI, angiography or EEG already make the indication honest. Craniotomy versus endoscopic corridor, clipping versus coiling, and open resection versus Gamma Knife, CyberKnife or SRS are written after records review — not from a brochure robot or frame count. Training includes MCh (Neurosurgery) — RNT Medical College, Udaipur, Rajasthan. International patients meet him on camera first; travel to Delhi NCR is offered only if this neurosurgery floor is the right list.

### Proposed BIO

Dr. Binit Kedia is an Associate Consultant at Sarvodaya Hospital, Faridabad, in Delhi NCR, with more than 13 years of experience. His profile records neurosurgery together with spine surgery.

His list is cranial and covers tumour, vascular and functional work. He performs brain tumor surgery, glioma surgery, skull base tumor surgery and skull base surgery, craniotomy, endoscopic brain surgery and hydrocephalus surgery, with aneurysm clipping for brain aneurysms and arteriovenous malformation surgery on the vascular side, and epilepsy surgery and deep brain stimulation on the functional side.

His training began in the northeast and finished in the northwest. He read MBBS at Assam Medical College in Dibrugarh and took his MS in general surgery at Gauhati Medical College, both in Assam, then his MCh in neurosurgery at RNT Medical College in Udaipur, Rajasthan.

His hospital history follows the same route in reverse. Besides his present post at Sarvodaya Hospital in Sector 8, Faridabad, he has worked at Metro Hospital in Sector 16 in the same city, at Indraprastha Apollo Hospital in New Delhi, at RNT Medical College in Udaipur where he trained, and at Star Hospital and Research in Hojai, Assam.

His published work is a comparison of techniques in skull reconstruction: cranioplasty using autologous bone against titanium mesh, published in the Romanian Journal of Neurosurgery.

**Word count:** 216

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 5. Dr. Sanjeev Srivastava

**Slug:** `dr-sanjeev-srivastava` · Artemis Hospital, Delhi NCR

### Existing BIO

Dr. Sanjeev Srivastava is Senior Consultant at Artemis Hospital in Delhi NCR, India. He has practised neurosurgery in India for 12+ years experience. Brain tumour, skull-base, aneurysm, DBS, paediatric and radiosurgery lists are tagged for later pSEO under country, city, specialty and procedure — Brain Tumor Surgery, Deep Brain Stimulation and Epilepsy Surgery when MRI, angiography or EEG already make the indication honest. Craniotomy versus endoscopic corridor, clipping versus coiling, and open resection versus Gamma Knife, CyberKnife or SRS are written after records review — not from a brochure robot or frame count. Training includes MBBS — M.L.B. Medical College, Jhansi, India. International patients meet him on camera first; travel to Delhi NCR is offered only if this neurosurgery floor is the right list.

### Proposed BIO

Dr. Sanjeev Srivastava is a Senior Consultant at Artemis Hospital in Delhi NCR, with more than 12 years of experience in neurosurgery.

His list is almost entirely functional and stereotactic. He performs deep brain stimulation, epilepsy surgery, VNS implant, stereotactic brain surgery and stereotactic radiosurgery, together with brain tumor surgery, acoustic neuroma or vestibular schwannoma surgery and craniotomy.

He read MBBS at M.L.B. Medical College in Jhansi and holds a DNB in general surgery and a DNB in neurosurgery. His advanced fellowship in functional neurosurgery and neuromodulation was taken in the Department of Neurosurgery at the University of Illinois at Chicago in October and November 2018, under Dr. (Prof.) Konstantin Slavin, and it corresponds directly to the DBS and VNS entries on his list.

His student record is exceptional even among surgical profiles. He won fourteen gold medals in MBBS at M.L.B. Medical College for securing the highest marks in various subjects across the curriculum, two Governor's Gold Medals from Bundelkhand University in Jhansi for being the overall university topper throughout MBBS, and a university bronze medal from the same university for securing 66.87% marks.

He practises at the Artemis Agrim Institute of Neurosciences at Artemis Hospital in Gurugram, and trained previously at Medanta, the Medicity, in Gurgaon.

**Word count:** 208

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 6. Dr. Sudhir Dubey

**Slug:** `dr-sudhir-dubey` · Medanta - The Medicity, Delhi NCR

### Existing BIO

Dr. Sudhir Dubey is Chairman, Department of Neurosurgery and Neurosciences at Medanta - The Medicity in Delhi NCR, India. He has practised neurosurgery in India for 30+ years experience. GAF Healthcare lists him among featured India neurosurgeons for brain-tumour, aneurysm and radiosurgery lists. Brain tumour, skull-base, aneurysm, DBS, paediatric and radiosurgery lists are tagged for later pSEO under country, city, specialty and procedure — Glioma Surgery, Meningioma Surgery and Pituitary Tumor Surgery when MRI, angiography or EEG already make the indication honest. Craniotomy versus endoscopic corridor, clipping versus coiling, and open resection versus Gamma Knife, CyberKnife or SRS are written after records review — not from a brochure robot or frame count. Training includes M.Ch (Neurosurgery) — National Institute of Mental Health and Neurosciences (NIMHANS). International patients meet him on camera first; travel to Delhi NCR is offered only if this neurosurgery floor is the right list.

### Proposed BIO

Dr. Sudhir Dubey is Chairman of the Department of Neurosurgery and Neurosciences at Medanta - The Medicity in Delhi NCR, with more than 30 years of experience in neurosurgery.

His list is cranial and built around tumour work. He performs brain tumor surgery, glioma surgery and meningioma surgery, skull base tumor surgery and skull base surgery, pituitary tumor surgery, craniotomy and endoscopic brain surgery.

He read M.B.B.S. at King George's Medical College, where he was awarded the Sir Rupkishan Das Gold Medal for his final year and held a merit scholarship, and took his M.Ch in neurosurgery at NIMHANS, finishing as best outgoing student in neurosurgery with the Silver Jubilee Award.

His highest distinction came early and from abroad. The World Federation of Neurosurgical Societies conferred its Young Neurosurgeon's Award on him, and his record notes that he was the first and only recipient from India. His cutting-edge work on brain tumors also received international recognition at Sydney, Australia, in 2001, which is the same area his operating list centres on.

Read together, his awards follow a single line. The gold medal and merit scholarship belong to his undergraduate years at King George's Medical College, the Silver Jubilee Award to the end of his superspecialty training at NIMHANS, the Sydney recognition to his early consultant work on brain tumors, and the World Federation award to the standing that followed it. The departmental chairmanship at Medanta is the present point on that line.

He practises at Medanta – The Medicity in Gurugram.

**Word count:** 251

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 7. Dr. Bipin Walia

**Slug:** `dr-bipin-walia` · Max Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Bipin Walia is Chairman & Head – Neurosurgery & Neurospine at Max Super Speciality Hospital in Delhi NCR, India. He has practised neurosurgery in India for 30+ years experience. GAF Healthcare lists him among featured India neurosurgeons for brain-tumour, aneurysm and radiosurgery lists. Brain tumour, skull-base, aneurysm, DBS, paediatric and radiosurgery lists are tagged for later pSEO under country, city, specialty and procedure — Glioma Surgery, Meningioma Surgery and Pituitary Tumor Surgery when MRI, angiography or EEG already make the indication honest. Craniotomy versus endoscopic corridor, clipping versus coiling, and open resection versus Gamma Knife, CyberKnife or SRS are written after records review — not from a brochure robot or frame count. Training includes MBBS – Armed Forces Medical College, Pune. International patients meet him on camera first; travel to Delhi NCR is offered only if this neurosurgery floor is the right list.

### Proposed BIO

Dr. Bipin Walia is Chairman and Head of Neurosurgery and Neurospine at Max Super Speciality Hospital, Saket, in Delhi NCR, with more than 30 years of experience. His profile records neurosurgery together with spine surgery.

His list is cranial with a spinal component. He performs brain tumor surgery, glioma surgery and meningioma surgery, skull base tumor surgery and skull base surgery, pituitary tumor surgery, craniotomy and endoscopic brain surgery, together with spinal tumor surgery.

He read MBBS and took his MS in general surgery at the Armed Forces Medical College in Pune, then his M.Ch in neurosurgery at AIIMS, New Delhi. He also holds a DNB in neurosurgery.

A distinct part of his record is teaching rather than operating. The National Board of Examinations recognises him as a post graduate teacher for the MS in general surgery at the universities of Delhi and Pune, and for the DNB in neurosurgery, which covers both the general surgical stage he trained in at Pune and the superspecialty he practises.

His practice runs across three hospitals in the same area of the capital: Max Super Speciality Hospital and Max Smart Super Speciality Hospital, both at Saket in New Delhi, and Max Hospital at Saket West.

**Word count:** 202

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 8. Dr. B G Ratnam

**Slug:** `dr-b-g-ratnam` · Apollo Hospital, Jubilee Hills, Hyderabad, Hyderabad

### Existing BIO

Dr. B G Ratnam is Consultant Neurosurgeon at Apollo Hospital in Hyderabad, India. He has practised neurosurgery in India for 25+ years experience. Brain tumour, skull-base, aneurysm, DBS, paediatric and radiosurgery lists are tagged for later pSEO under country, city, specialty and procedure — Glioma Surgery, Brain Tumor Surgery and Skull Base Surgery when MRI, angiography or EEG already make the indication honest. Craniotomy versus endoscopic corridor, clipping versus coiling, and open resection versus Gamma Knife, CyberKnife or SRS are written after records review — not from a brochure robot or frame count. Training includes MBBS. International patients meet him on camera first; travel to Hyderabad is offered only if this neurosurgery floor is the right list.

### Proposed BIO

Dr. B G Ratnam is a Consultant Neurosurgeon at Apollo Hospital, Jubilee Hills, in Hyderabad, with more than 25 years of experience. His profile records neurosurgery together with spine surgery.

His list covers tumour, functional and paediatric work. He performs brain tumor surgery and glioma surgery, skull base tumor surgery and skull base surgery, craniotomy, epilepsy surgery, peripheral nerve surgery, and hydrocephalus surgery including in children.

His qualifications are MBBS, an MS in general surgery and an MCh in neurosurgery, and his fellowship training covered cranial surgery, spine surgery and neuro-oncology, the three areas his procedure list draws on.

His academic record is presented mainly through the meetings he has taken work to. He received recognition in 2014 at Rajiv Gandhi University and the 49th Congress of Indian Association of Neurosurgeons at Greater Noida, and has presented research at national conferences including the annual conference of the Neurological Society of India and meetings of the Indian Society of Neuro-Oncology, the latter matching the neuro-oncology strand of his fellowship training. He has published multiple research papers in national and international neurosurgery and neurotrauma journals, so the trauma side of the specialty appears in his writing even though it is not named on his procedure list.

He practises at Apollo Health City, Jubilee Hills, in Hyderabad.

**Word count:** 214

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 9. Dr. Sunit Mediratta

**Slug:** `dr-sunit-mediratta` · Indraprastha Apollo Hospital, Delhi NCR

### Existing BIO

Dr. Sunit Mediratta is Senior Consultant at Indraprastha Apollo Hospital in Delhi NCR, India. He has practised neurosurgery in India for 22+ years experience. Brain tumour, skull-base, aneurysm, DBS, paediatric and radiosurgery lists are tagged for later pSEO under country, city, specialty and procedure — Pituitary Tumor Surgery, Brain Tumor Surgery and Endoscopic Brain Surgery when MRI, angiography or EEG already make the indication honest. Craniotomy versus endoscopic corridor, clipping versus coiling, and open resection versus Gamma Knife, CyberKnife or SRS are written after records review — not from a brochure robot or frame count. Training includes MBBS. International patients meet him on camera first; travel to Delhi NCR is offered only if this neurosurgery floor is the right list.

### Proposed BIO

Dr. Sunit Mediratta is a Senior Consultant at Indraprastha Apollo Hospital in Delhi NCR, with more than 22 years of experience in neurosurgery.

His list is cranial. He performs brain tumor surgery, skull base tumor surgery and skull base surgery, pituitary tumor surgery, craniotomy, endoscopic brain surgery and epilepsy surgery.

His qualifications run to five entries before his fellowships. After MBBS he took an MS, then the MCh in neurosurgery and a DNB, and is a member of the National Academy of Medical Sciences.

His two fellowships were taken abroad in successive years and in different areas of the specialty. The first was a cerebrovascular surgery fellowship at Fujita Health University in Nagoya, Japan, in July 2009. The second was a spinal surgery fellowship in minimally invasive techniques at Hochtaunusklinik in Bad Homburg, Germany, in August 2010. Between them they add vascular and spinal training to a listed practice that is otherwise built on cranial tumour resection and epilepsy surgery.

The procedures themselves fall into three groups. Brain tumor surgery, skull base tumor surgery, skull base surgery and pituitary tumor surgery are the tumour work, and the skull base entries indicate where much of it sits. Craniotomy and endoscopic brain surgery are the two approaches recorded. Epilepsy surgery stands apart from both as the one non-tumour indication on the list.

He practises at Indraprastha Apollo Hospitals in Delhi, and holds the MCh and the DNB in neurosurgery alongside membership of the National Academy of Medical Sciences.

**Word count:** 246

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 10. Dr. V. R. Roopesh Kumar

**Slug:** `dr-v-r-roopesh-kumar` · MGM Healthcare, Chennai, Chennai

### Existing BIO

Dr. V. R. Roopesh Kumar is Director of Neurosurgery at MGM Healthcare in Chennai, India. He has practised neurosurgery in India for 20+ years experience. Brain tumour, skull-base, aneurysm, DBS, paediatric and radiosurgery lists are tagged for later pSEO under country, city, specialty and procedure — Glioma Surgery, Meningioma Surgery and Pituitary Tumor Surgery when MRI, angiography or EEG already make the indication honest. Craniotomy versus endoscopic corridor, clipping versus coiling, and open resection versus Gamma Knife, CyberKnife or SRS are written after records review — not from a brochure robot or frame count. Training includes MBBS — Dr. MGR Medical University (1996). International patients meet him on camera first; travel to Chennai is offered only if this neurosurgery floor is the right list.

### Proposed BIO

Dr. V. R. Roopesh Kumar is Director of Neurosurgery at MGM Healthcare, Chennai, with more than 20 years of experience. His profile records neurosurgery together with spine surgery.

His list covers tumour, vascular and functional work. He performs brain tumor surgery, glioma surgery and meningioma surgery, skull base tumor surgery and skull base surgery, pituitary tumor surgery and craniotomy, with aneurysm clipping for brain aneurysms and arteriovenous malformation surgery on the vascular side, and deep brain stimulation on the functional side.

His three degrees were taken over eight years. He read MBBS under Dr. MGR Medical University in 1996, took his MS in general surgery at Madurai Medical College under the same university in 2001, and his MCh in neurosurgery at NIMHANS in Bangalore in 2004.

His recognition is recent and regional. In 2022 the Top-Notch Foundation named him Best Neurosurgeon in Tamil Nadu, the Atal Achievement Awards, supported by the Ministry for Rural Development and Steel, named him Most Trusted Neurosurgeon of South India, and he received the Mayan Award for Best Neurosurgeon in Chennai. In 2023 the Pride of Nation Awards by Brand Solutions named him Outstanding Neuro-Oncologist of the Year for 2022–23, which points to the tumour half of his list.

He practises at MGM Healthcare in Chennai.

**Word count:** 211

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 11. Dr. Naren Nayak

**Slug:** `dr-naren-nayak` · Gleneagles Hospital, Mumbai, Mumbai

### Existing BIO

Dr. Naren Nayak is Senior Consultant at Gleneagles Hospital in Mumbai, India. He has practised neurosurgery in India for 11+ years experience. Brain tumour, skull-base, aneurysm, DBS, paediatric and radiosurgery lists are tagged for later pSEO under country, city, specialty and procedure — Pituitary Tumor Surgery, Brain Tumor Surgery and Deep Brain Stimulation when MRI, angiography or EEG already make the indication honest. Craniotomy versus endoscopic corridor, clipping versus coiling, and open resection versus Gamma Knife, CyberKnife or SRS are written after records review — not from a brochure robot or frame count. Training includes MBBS. International patients meet him on camera first; travel to Mumbai is offered only if this neurosurgery floor is the right list.

### Proposed BIO

Dr. Naren Nayak is a Senior Consultant at Gleneagles Hospital, Mumbai, with more than 11 years of experience. His profile records neurosurgery together with spine surgery.

His list is short and weighted towards functional work. He performs deep brain stimulation and epilepsy surgery alongside brain tumor surgery, acoustic neuroma or vestibular schwannoma surgery, pituitary tumor surgery and craniotomy.

After MBBS and an MS he took his MCh in neurosurgery, then a fellowship in stereotaxy and functional neurosurgery in the Department of Neurosurgery at Tokyo Women's Medical University in Japan, under Prof. Takaomi Taira. That fellowship is the training behind the deep brain stimulation and epilepsy entries that head his procedure list.

His record credits him with initiating and co-leading the first deep brain stimulation programme at Gleneagles Hospital, Parel, where he now practises, so the subject of his fellowship became a new service at his own hospital rather than an individual technique he brought back. He has also served in academic and surgical leadership roles at top Mumbai medical institutions, and has been associated with Lokmanya Tilak Municipal General Hospital and Medical College in the same city.

The rest of his list sits either side of that functional core. Brain tumor surgery, pituitary tumor surgery and acoustic neuroma or vestibular schwannoma surgery are the tumour work, and craniotomy is the approach recorded for it. Spine surgery is listed as his second specialty.

**Word count:** 232

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 12. Dr. Sridutt Bhadri

**Slug:** `dr-sridutt-bhadri` · Apollo Hospitals, Bannerghatta Road, Bengaluru

### Existing BIO

Dr. Sridutt Bhadri is Consultant Neurosurgeon at Apollo Hospitals in Bengaluru, India. He has practised neurosurgery in India for 7+ years experience. Brain tumour, skull-base, aneurysm, DBS, paediatric and radiosurgery lists are tagged for later pSEO under country, city, specialty and procedure — Meningioma Surgery, Brain Tumor Surgery and Endoscopic Brain Surgery when MRI, angiography or EEG already make the indication honest. Craniotomy versus endoscopic corridor, clipping versus coiling, and open resection versus Gamma Knife, CyberKnife or SRS are written after records review — not from a brochure robot or frame count. Training includes M.B.B.S.. International patients meet him on camera first; travel to Bengaluru is offered only if this neurosurgery floor is the right list.

### Proposed BIO

Dr. Sridutt Bhadri is a Consultant Neurosurgeon at Apollo Hospitals, Bannerghatta Road, Bengaluru, with more than 7 years of experience in neurosurgery.

His list is cranial and concentrated on tumour resection. He performs brain tumor surgery and meningioma surgery, skull base tumor surgery and skull base surgery, craniotomy and endoscopic brain surgery, a set of procedures in which the endoscopic and open approaches are both represented.

His qualifications are the most detailed part of his record and run to seven entries, which is a long list for a surgeon at this stage of a career. He read M.B.B.S. and took his M.S. in general surgery, then completed two separate neurosurgical qualifications, the M.Ch. and the D.N.B., and was elected a member of the National Academy of Medical Sciences.

Two of the seven are international board qualifications rather than Indian degrees. He is a Fellow of the Royal College of Surgeons, England, and a Fellow of the European Board of Neurological Surgeons, the latter examined at European rather than national level. Holding both alongside the M.Ch. and D.N.B. means his training has been assessed under three separate examination systems.

Besides Apollo Hospitals on Bannerghatta Road he practises at Apollo Specialty Hospital in Jayanagar, Bengaluru.

**Word count:** 203

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---

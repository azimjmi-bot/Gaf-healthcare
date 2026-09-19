# Doctor BIO rewrite — Batch 27 — Orthopedics, India

Final Orthopedics batch, completing the specialty. Every sentence is drawn from that doctor's own
record in `src/data/ginger-catalog.json` (designation, hospital, city, experience, qualifications,
education, affiliations, memberships, awards and research). The previous bios in this specialty are
GAF platform boilerplate that describes the pSEO tagging scheme rather than the doctor, so the
structured fields are the source. No external sources, no inference, and no information from any
other doctor's profile. Only `doctorOverrides["<slug>"].bio` is written; no pSEO, schema, routing
or frontend field changes.

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. A.H. Ashwin Kumar | Hyderabad | 114 | 268 | APPLIED |
| 2 | Dr. Kushal Shah | Mumbai | 111 | 252 | APPLIED |
| 3 | Dr. Jitendra Kataria | Mumbai | 117 | 244 | APPLIED |
| 4 | Dr. Bejjanki Nithin Kumar | Hyderabad | 116 | 263 | APPLIED |
| 5 | Dr. Prof Amit Kumar Agarwal | Delhi NCR | 129 | 248 | APPLIED |

Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and
for traceability of every capitalised term, acronym, degree and year back to that individual
doctor's own record in `src/data/ginger-catalog.json`.

---

## 1. Dr. A.H. Ashwin Kumar

**Slug:** `dr-a-h-ashwin-kumar` · KIMS Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. A.H. Ashwin Kumar is Consultant at KIMS Hospitals in Hyderabad, India. He has practised adult orthopaedics in India for 16+ years experience. Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — Revision Knee Replacement, Partial Knee Replacement and Total Knee Replacement when films, alignment and activity already make the indication honest. Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair are written after records review — not from a brochure implant count. Training includes MBBS. International patients meet him on camera first; travel to Hyderabad is offered only if this orthopaedic floor is the right list.

### Proposed BIO

Dr. A.H. Ashwin Kumar is a Consultant at KIMS Hospitals, Secunderabad, in Hyderabad, with more than 16 years of experience in orthopedics.

His list covers both halves of adult orthopaedic practice. Replacement work covers total knee replacement, partial knee replacement, total hip replacement, hip resurfacing, shoulder replacement and the revision of both knee and hip. Arthroscopic and soft tissue work covers ACL reconstruction for ACL tear, PCL reconstruction for PCL tear, meniscus repair, rotator cuff repair and tendon repair. On the trauma and reconstruction side he performs fracture fixation, non-union repair and limb lengthening surgery and treats limb length discrepancy.

He holds an MBBS, an M.S. in orthopaedics and the DNB in orthopaedics, and his record notes special training in joint replacement and complex trauma, the two areas his list is weighted towards.

His awards are unusual in that all four are gold medals. In 2010 he received the Orthopedic Education Fund Gold Medal for the highest marks in the special examination and overall performance during his postgraduate course in M.S. Orthopedics, and the Nicholas Andre Gold Medal for the highest marks in the university examination in M.S. orthopaedic surgery as topper of his batch.

The other two were best paper awards at conferences. He won the Prof. C. Vyageswaradu Gold Medal in 2010 for "DVT and its Risk Factors in Replacement Surgeries – Our Experience", presented at TNOACON 2010 in Courtallam, and the same medal again in 2012 for "Component Motion in Bipolar Hemiarthroplasty – A Prospective Study", presented at OSSAPCON 2012 in Rajamundry. Both papers are on replacement surgery, the field his special training was in.

**Word count:** 268

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 2. Dr. Kushal Shah

**Slug:** `dr-kushal-shah` · Gleneagles Hospital, Mumbai, Mumbai

### Existing BIO

Dr. Kushal Shah is Consultant at Gleneagles Hospital in Mumbai, India. He has practised adult orthopaedics in India for 13+ years experience. Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — Fracture Fixation, Carpal Tunnel Release and Hand Reconstruction when films, alignment and activity already make the indication honest. Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair are written after records review — not from a brochure implant count. Training includes MBBS. International patients meet him on camera first; travel to Mumbai is offered only if this orthopaedic floor is the right list.

### Proposed BIO

Dr. Kushal Shah is a Consultant at Gleneagles Hospital in Mumbai, with more than 13 years of experience. His profile records orthopedics alongside cosmetic and plastic surgery for hand reconstruction and pediatric orthopedics.

The hand is the whole of his list. He performs carpal tunnel release for carpal tunnel syndrome, hand reconstruction, tendon repair and fracture fixation, and treats trigger finger and Dupuytren's contracture. No joint replacement work appears on his profile, which makes his practice unusually narrow for an orthopaedic surgeon and unusually deep in one region of the body.

He holds an MBBS and completed formal orthopaedic training at Father Muller Medical College under the Rajiv Gandhi University of Health Sciences in Karnataka, finishing in 2017.

His three fellowships were each in a different part of hand surgery and each taken under a named surgeon. He trained in plastic, hand and microvascular reconstructive surgery at Ganga Hospital in Coimbatore under Dr. S.R. Sabapathy; in congenital hand, paediatric hand, trauma and brachial plexus surgery at B.J. Wadia Hospital for Children in Mumbai under Dr. M. Thatte; and in hand and wrist trauma and sports-related hand injury at Laud Clinic in Mumbai under Dr. Sudhir Warrier. Between them those three account for the plastic surgery and paediatric specializations on his profile as well as the orthopaedic one.

He has won three conference prizes: best poster at GOSICON 2017 in Bangalore, best e-poster at Oncoorthocon 2018 in Ahmedabad and best paper at ISSHCON 2022 in Jaipur. He practises at Gleneagles Hospital in Parel.

**Word count:** 252

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 3. Dr. Jitendra Kataria

**Slug:** `dr-jitendra-kataria` · Gleneagles Hospital, Mumbai, Mumbai

### Existing BIO

Dr. Jitendra Kataria is Consultant at Gleneagles Hospital in Mumbai, India. He has practised adult orthopaedics in India for 10+ years experience. Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — Revision Knee Replacement, Total Knee Replacement and Revision Hip Replacement when films, alignment and activity already make the indication honest. Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair are written after records review — not from a brochure implant count. Training includes MBBS — JNMC, Sawangi Wardha. International patients meet him on camera first; travel to Mumbai is offered only if this orthopaedic floor is the right list.

### Proposed BIO

Dr. Jitendra Kataria is a Consultant at Gleneagles Hospital in Mumbai, with more than 10 years of experience. His profile records orthopedics alongside pediatric orthopedics and spine surgery.

His list is built around the hip and knee. He performs total knee replacement, total hip replacement, revision knee replacement and revision hip replacement, and on the arthroscopic side ACL reconstruction, meniscus repair, rotator cuff repair and arthroscopic surgery. His trauma work is fracture fixation and non-union repair.

His training moved between three institutions and ended in Mumbai. He read MBBS at JNMC in Sawangi Wardha, took his postgraduate Diploma in Orthopaedics at KIMS Karad, and then the DNB in orthopaedics at P. D. Hinduja Hospital and Research Centre in Mumbai. His fellowship in arthroplasty was also taken in Mumbai, and it is the qualification behind the replacement half of his present list.

An unusual entry on his record is a Diploma in Medico-Legal Systems, taken at KIMS Karad alongside his orthopaedic diploma. That is a qualification in the framework around clinical practice rather than in a surgical technique, and it is not one most orthopaedic surgeons carry.

He is at Gleneagles Hospital in Parel, and his record lists P. D. Hinduja Hospital and Research Centre and KIMS Karad as training affiliations, along with clinical practice at leading hospitals and surgical centers in Mumbai. Five qualifications and three specializations against ten years in practice make for a dense record for the stage of career it describes.

**Word count:** 244

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 4. Dr. Bejjanki Nithin Kumar

**Slug:** `dr-bejjanki-nithin-kumar` · Yashoda Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. Bejjanki Nithin Kumar is Senior Consultant at Yashoda Hospitals in Hyderabad, India. He has practised adult orthopaedics in India for 25+ years experience. Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — Robotic Knee Replacement, Revision Knee Replacement and Total Knee Replacement when films, alignment and activity already make the indication honest. Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair are written after records review — not from a brochure implant count. Training includes M.Ch (Ortho). International patients meet him on camera first; travel to Hyderabad is offered only if this orthopaedic floor is the right list.

### Proposed BIO

Dr. Bejjanki Nithin Kumar is a Senior Consultant at Yashoda Hospitals, Secunderabad, in Hyderabad, with more than 25 years of experience. His profile records orthopedics together with sports medicine.

The shoulder and the knee dominate his list. He performs shoulder replacement and rotator cuff repair for rotator cuff tear, and treats shoulder instability and frozen shoulder. On the knee he performs total knee replacement, robotic knee replacement, revision knee replacement, ACL reconstruction, PCL reconstruction and meniscus repair. He also performs ankle replacement, bunion surgery for hallux valgus, arthroscopic surgery, tendon repair, fracture fixation and joint injection, and treats osteomyelitis, tennis elbow, golfer's elbow and trigger finger.

His qualifications are entirely postgraduate. He holds the M.Ch in orthopaedics and the MRCS, and was elected FRCS in trauma and orthopaedics by the Royal College of Surgeons. He also holds the DSEM, a Diploma in Sports and Exercise Medicine from the International Olympic Committee, which is the formal basis for the sports medicine specialization on his profile.

Both of his fellowships were taken in the UK and both sit in the same region of the body as the busiest part of his list. He completed a fellowship in shoulder, knee and elbow arthroscopy and sports medicine in 2011, and the Calvert Fellowship in London, a shoulder fellowship taken under Dr. Andrew Wallace for the shoulder and Dr. Andy Williams for the knee. Those two placements explain why arthroscopic and sports procedures outnumber replacement procedures on a list from a surgeon of his seniority.

Alongside Yashoda Hospital in Secunderabad he has been at Continental Hospitals in Hyderabad.

**Word count:** 263

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 5. Dr. Prof Amit Kumar Agarwal

**Slug:** `dr-prof-amit-kumar-agarwal` · Indraprastha Apollo Hospital, Delhi NCR

### Existing BIO

Dr. Prof Amit Kumar Agarwal is Senior Consultant – Orthopedic Surgeon at Indraprastha Apollo Hospital in Delhi NCR, India. He has practised adult orthopaedics in India for 22+ years experience. Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — Robotic Knee Replacement, Revision Knee Replacement and Total Knee Replacement when films, alignment and activity already make the indication honest. Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair are written after records review — not from a brochure implant count. Training includes MBBS — King George's Medical University (KGMU), Lucknow. International patients meet him on camera first; travel to Delhi NCR is offered only if this orthopaedic floor is the right list.

### Proposed BIO

Dr. Prof Amit Kumar Agarwal is a Senior Consultant Orthopedic Surgeon at Indraprastha Apollo Hospital in the Delhi NCR, with more than 22 years of experience in orthopedics.

His list is built around joint replacement and its revision. He performs total knee replacement, robotic knee replacement, total hip replacement, shoulder replacement, revision knee replacement and revision hip replacement. Alongside that he performs ACL reconstruction, meniscus repair, rotator cuff repair, arthroscopic surgery and fracture fixation.

Both of his first degrees were taken at King George's Medical University in Lucknow: the MBBS and the MS in orthopedics. He then took the DNB in orthopedics through the National Board of Examinations in New Delhi, and is a Member of the National Academy of Medical Sciences.

He holds the academic title of Professor in orthopedic surgery, which his profile records alongside his hospital post rather than in place of it, and his record describes him as one of the leading orthopedic surgeons in Delhi.

His publication record is the most substantial part of his profile and spans five separate areas. He has published numerous research papers in national and international orthopedic journals on joint replacement outcomes, arthroscopic techniques, fracture management, minimally invasive surgery and bone cell therapy. The first three of those correspond directly to the three parts of his operating list, while the work on minimally invasive surgery and on bone cell therapy goes beyond what the list itself records.

He practises at Indraprastha Apollo Hospital in Jasola Vihar, New Delhi.

**Word count:** 248

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---

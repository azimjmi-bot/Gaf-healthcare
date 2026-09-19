# Doctor BIO rewrite — Batch 26 — Orthopedics, India

Fourth Orthopedics batch. Every sentence is drawn from that doctor's own record in
`src/data/ginger-catalog.json` (designation, hospital, city, experience, qualifications, education,
affiliations, memberships, awards and research). The previous bios in this specialty are GAF
platform boilerplate that describes the pSEO tagging scheme rather than the doctor, so the
structured fields are the source. No external sources, no inference, and no information from any
other doctor's profile. Only `doctorOverrides["<slug>"].bio` is written; no pSEO, schema, routing
or frontend field changes.

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. Anup Khatri | Mumbai | 114 | 250 | APPLIED |
| 2 | Dr. Abhinav Kumar | Delhi NCR | 127 | 274 | APPLIED |
| 3 | Dr. Ashok Rajgopal | Delhi NCR | 143 | 255 | APPLIED |
| 4 | Dr. I P S Oberoi | Delhi NCR | 149 | 269 | APPLIED |
| 5 | Dr. (Maj.) Mukesh Garg | Delhi NCR | 132 | 252 | APPLIED |
| 6 | Dr. Kunal Patel | Chennai | 118 | 231 | APPLIED |
| 7 | Dr. Neel Kamal Sourav | Delhi NCR | 122 | 220 | APPLIED |
| 8 | Dr. I. Vishwanatha Reddy | Hyderabad | 122 | 250 | APPLIED |
| 9 | Dr. Nitiraj Singh Oberoi | Delhi NCR | 125 | 257 | APPLIED |
| 10 | Dr. A. Navaladi Shankar | Chennai | 116 | 236 | APPLIED |
| 11 | Dr. Attique Vasdev | Delhi NCR | 119 | 253 | APPLIED |
| 12 | Dr. Rahul Davari | Mumbai | 121 | 226 | APPLIED |

Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and
for traceability of every capitalised term, acronym, degree and year back to that individual
doctor's own record in `src/data/ginger-catalog.json`.

---

## 1. Dr. Anup Khatri

**Slug:** `dr-anup-khatri` · Gleneagles Hospital, Mumbai, Mumbai

### Existing BIO

Dr. Anup Khatri is Senior Consultant at Gleneagles Hospital in Mumbai, India. He has practised adult orthopaedics in India for 20+ years experience. Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — Revision Knee Replacement, Partial Knee Replacement and Total Knee Replacement when films, alignment and activity already make the indication honest. Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair are written after records review — not from a brochure implant count. Training includes MBBS. International patients meet him on camera first; travel to Mumbai is offered only if this orthopaedic floor is the right list.

### Proposed BIO

Dr. Anup Khatri is a Senior Consultant at Gleneagles Hospital in Mumbai, with more than 20 years of experience. His profile records orthopedics together with pediatric orthopedics.

The foot and ankle is the part of his list that sets it apart. He performs ankle replacement, Achilles repair for tendon rupture and bunion surgery for hallux valgus, and treats plantar fasciitis. His replacement work covers total knee replacement, partial knee replacement, revision knee replacement, total hip replacement and revision hip replacement. His arthroscopic and soft tissue work covers ACL reconstruction for ACL tear, meniscus repair, arthroscopic surgery, rotator cuff repair for rotator cuff tear and tendon repair, and he treats frozen shoulder, tennis elbow, golfer's elbow and trigger finger. On the trauma side he performs fracture fixation and non-union repair.

He holds an MBBS and took the DNB in orthopaedics at RCSM Government Medical College in Kolhapur. His two fellowships account for the two clearest strengths in that list: joint replacement with Zimmer Biomet in Mumbai in 2011, and foot and ankle surgery with IFAS-UAB at the University of Alabama at Birmingham in the USA, taken over August and September 2017.

He works in the department of orthopaedics and arthroplasty at Gleneagles Hospital in Parel, and has also been in the department of orthopaedics at Holy Spirit Hospital in Mumbai and at RCSM Government Medical College in Kolhapur, where he took his DNB. His record notes active participation in national and international health camps and regular attendance at CMEs and workshops.

**Word count:** 250

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 2. Dr. Abhinav Kumar

**Slug:** `dr-abhinav-kumar` · Max Smart Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Abhinav Kumar is Associate Consultant at Max Smart Super Speciality Hospital in Delhi NCR, India. He has practised adult orthopaedics in India for 14+ years experience. Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — Robotic Knee Replacement, Revision Knee Replacement and Partial Knee Replacement when films, alignment and activity already make the indication honest. Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair are written after records review — not from a brochure implant count. Training includes MBBS– Krishna Institute of Medical Sciences, Karad, Maharashtra (2013). International patients meet him on camera first; travel to Delhi NCR is offered only if this orthopaedic floor is the right list.

### Proposed BIO

Dr. Abhinav Kumar is an Associate Consultant at Max Smart Super Speciality Hospital, Saket, in the Delhi NCR, with more than 14 years of experience in orthopedics.

His list is centred on the hip and knee. He performs total knee replacement, partial knee replacement, robotic knee replacement, revision knee replacement, total hip replacement and revision hip replacement, and manages advanced hip and knee osteoarthritis. His arthroscopic work covers ACL reconstruction for ACL tear, PCL reconstruction for PCL tear, meniscus repair and rotator cuff repair for rotator cuff tear. He also performs limb lengthening surgery, fracture fixation, non-union repair and tendon repair, and treats plantar fasciitis.

His training is documented year by year. He read MBBS at the Krishna Institute of Medical Sciences in Karad, Maharashtra in 2013, completed his internship at Hindu Rao Medical College in New Delhi in 2015, and took the DNB in orthopaedic surgery at Apollo Hospital in Chennai in 2019.

His later courses explain the specific techniques on his list. In 2024 he completed a certificate course in Stryker MAKO robotic total knee arthroplasty 2.0, a fellowship in hip and knee arthroplasty through the Science and Engineering Research Board in New Delhi, cadaver training in revision knee arthroplasty and an AO Trauma master course in pelvic acetabular fracture management, the last two both at Symbiosis International University in Pune, and an AO Trauma course on advanced principles of fracture management in Chennai. He also holds a diploma in hip surgery from JBJS MRC Oxford in the UK and has completed the Anterior Advantage cadaveric DAA course at M.S. Ramaiah Medical College in Bengaluru, run in collaboration with Johnson & Johnson.

**Word count:** 274

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 3. Dr. Ashok Rajgopal

**Slug:** `dr-ashok-rajgopal` · Medanta - The Medicity, Delhi NCR

### Existing BIO

Dr. Ashok Rajgopal is Group Chairman of Orthopedics at Medanta - The Medicity in Delhi NCR, India. He has practised adult orthopaedics in India for 50+ years experience. GAF Healthcare lists him among featured India orthopaedic surgeons for high-volume joint replacement and sports reconstruction. Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — Robotic Knee Replacement, Revision Knee Replacement and Total Knee Replacement when films, alignment and activity already make the indication honest. Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair are written after records review — not from a brochure implant count. Training includes F.R.C.S. (Fellow of the Royal College of Surgeons). International patients meet him on camera first; travel to Delhi NCR is offered only if this orthopaedic floor is the right list.

### Proposed BIO

Dr. Ashok Rajgopal is Group Chairman of Orthopedics at Medanta - The Medicity in the Delhi NCR, with more than 50 years of experience in orthopedics.

The knee is the centre of his practice. He performs total knee replacement, revision knee replacement, robotic knee replacement, arthroscopic knee surgery, ACL reconstruction, meniscus repair and ligament repair, and manages advanced knee osteoarthritis. On the hip he performs total hip replacement and revision hip replacement and manages advanced hip osteoarthritis. Failed joint replacement appears on his list as a category in its own right, which places revision work beside primary replacement rather than after it.

His qualifications run from the MBBS through the MS in orthopedics and the MCh in orthopedics, and he was elected a Fellow of the Royal College of Surgeons and a Fellow of the International Medical Sciences Academy.

His awards span a decade and a half and come from professional, civic and alumni bodies. He received the Knee Ratna Award from the IMA in New Delhi in 2002, a Distinguished Service Award from the Delhi Doctor Association in 2004, and the Bharat Shiromani Award for professional excellence in the field of orthopedics for 2008 to 2009. The Alumni Association of Sancheti Institutes in Pune gave him a Lifetime Achievement Award in 2016.

The name of the 2002 award and the shape of his operating list point the same way: after five decades in practice, his work remains concentrated on the knee, with revision and failed replacement surgery carrying as much weight as first-time replacement.

**Word count:** 255

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 4. Dr. I P S Oberoi

**Slug:** `dr-i-p-s-oberoi` · Artemis Hospital, Delhi NCR

### Existing BIO

Dr. I P S Oberoi is Chairperson - Orthopaedics Program & Chief of Robotics, Joint Replacement & Arthroscopy Surgery at Artemis Hospital in Delhi NCR, India. He has practised adult orthopaedics in India for 35+ years experience. GAF Healthcare lists him among featured India orthopaedic surgeons for high-volume joint replacement and sports reconstruction. Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — Robotic Knee Replacement, Revision Knee Replacement and Total Knee Replacement when films, alignment and activity already make the indication honest. Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair are written after records review — not from a brochure implant count. Training includes MS (Ortho) — Orthopaedic Surgery. International patients meet him on camera first; travel to Delhi NCR is offered only if this orthopaedic floor is the right list.

### Proposed BIO

Dr. I P S Oberoi is Chairperson of the Orthopaedics Program and Chief of Robotics, Joint Replacement and Arthroscopy Surgery at Artemis Hospital in the Delhi NCR, with more than 35 years of experience. His profile records orthopedics alongside robotic surgery, joint replacement and arthroscopy surgery, and sports medicine.

His list matches that title. Replacement work covers total knee replacement, total hip replacement, robotic knee replacement, shoulder replacement, revision knee replacement and revision hip replacement. Arthroscopic and sports work covers arthroscopic knee surgery, arthroscopic shoulder surgery, ACL reconstruction, meniscus repair, rotator cuff repair and ligament repair.

He holds an MS in orthopaedic surgery, and took the MCh in orthopaedics and a diploma at Liverpool in the UK.

His subsequent training is the most detailed part of his record, and almost all of it was taken outside India. He trained in joint replacement and adult reconstructive and revision surgery at centers in the USA and Germany. His knee reconstruction training was at the Parkland für Unfall Hand and Wiederherstellungschirurgie at the Universitätsklinikum in Münster, with further surgical training in knee reconstructive surgery at Freiburg, Hannover and Tübingen. His joint replacement training was taken at Muffield Hospital in London and Queen Elizabeth Hospital in Exeter. He trained in knee arthroscopy and reconstruction at the Sportsklinikum in Strasbourg and the Rosebank Clinic in Johannesburg, and in shoulder surgery at the Centre Hospitalier de Strasbourg and at Rheims, Troyes and Cape Town.

Those placements account for each part of his present list: the German and UK centres for the replacement half, and Strasbourg, Johannesburg and Cape Town for the arthroscopic and shoulder half.

**Word count:** 269

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 5. Dr. (Maj.) Mukesh Garg

**Slug:** `dr-maj-mukesh-garg` · Sarvodaya Hospital, Faridabad, Delhi NCR

### Existing BIO

Dr. (Maj.) Mukesh Garg is Director of Orthopaedics, Arthroscopy & Sports Injury at Sarvodaya Hospital in Delhi NCR, India. He has practised adult orthopaedics in India for 20+ years experience. Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — Partial Knee Replacement, Total Knee Replacement and Revision Hip Replacement when films, alignment and activity already make the indication honest. Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair are written after records review — not from a brochure implant count. Training includes MBBS — Institute of Medical Sciences, Banaras Hindu University (BHU), Varanasi. International patients meet him on camera first; travel to Delhi NCR is offered only if this orthopaedic floor is the right list.

### Proposed BIO

Dr. (Maj.) Mukesh Garg is Director of Orthopaedics, Arthroscopy and Sports Injury at Sarvodaya Hospital in Faridabad, in the Delhi NCR, with more than 20 years of experience in orthopedics.

His title names the three parts of his list. Arthroscopy and sports work covers ACL reconstruction for ACL tear, PCL reconstruction for PCL tear, meniscus repair, rotator cuff repair, arthroscopic surgery and shoulder instability. Replacement work covers total knee replacement, partial knee replacement, total hip replacement, shoulder replacement and revision hip replacement. He also performs fracture fixation, tendon repair and joint injection, and treats frozen shoulder, tennis elbow, golfer's elbow and trigger finger.

Both of his degrees were taken at the Institute of Medical Sciences at Banaras Hindu University in Varanasi: the MBBS and the MS in orthopaedic surgery. His two later placements correspond to the two halves of his practice, with training in advanced shoulder arthroscopy at Singapore General Hospital and a fellowship in joint replacement at Ahmedabad.

His awards both date from the same year and both came from orthopaedic conferences. He won best paper presentation at UPIOACON 2010 and a gold medal in the postgraduate quiz contest at IOACON 2010. He is a member of the Indian Orthopaedics Association and the Delhi Orthopaedics Society, and has been corresponding and primary author on papers in various international journals.

He practises at Sarvodaya Hospital and Research Centre in Sector 8, Faridabad, where the shoulder arthroscopy training from Singapore and the Ahmedabad replacement fellowship sit side by side in a single list.

**Word count:** 252

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, awards, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 6. Dr. Kunal Patel

**Slug:** `dr-kunal-patel` · Apollo Hospital, Chennai, Chennai

### Existing BIO

Dr. Kunal Patel is Consultant Orthopedic Surgeon at Apollo Hospital in Chennai, India. He has practised adult orthopaedics in India for 12+ years experience. Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — Revision Knee Replacement, Total Knee Replacement and Total Hip Replacement when films, alignment and activity already make the indication honest. Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair are written after records review — not from a brochure implant count. Training includes MBBS – Gujarat University. International patients meet him on camera first; travel to Chennai is offered only if this orthopaedic floor is the right list.

### Proposed BIO

Dr. Kunal Patel is a Consultant Orthopedic Surgeon at Apollo Hospital in Chennai, with more than 12 years of experience. His profile records orthopedics alongside arthroscopy and sports medicine and joint replacement surgery.

Those two subspecialties divide his list. On the replacement side he performs total knee replacement, total hip replacement and revision knee replacement. On the arthroscopic and sports side he performs ACL reconstruction, meniscus repair, rotator cuff repair and arthroscopic surgery. He also performs fracture fixation and carpal tunnel release and treats carpal tunnel syndrome.

Both of his first degrees were taken at Gujarat University: the MBBS and the MS in orthopaedics. He then took the DNB in orthopaedics through the National Board of Examinations in New Delhi, completed a fellowship in arthroscopy and sports medicine, and holds the FIAS of the International Society of Arthroscopy. He was elected a Fellow of the Royal College of Surgeons of Edinburgh.

Five qualifications against twelve years in practice makes for a dense record, and the two that are not general orthopaedic degrees are both in arthroscopy, which is also the half of his list with the most entries on it.

His record lists Shalby Hospital in Ahmedabad and Apollo Hospital in Ahmedabad among his affiliations alongside his present post in Chennai. He has received a Best Healthcare Excellence Officer award, and his profile notes further awards recognising his contributions in orthopedics.

**Word count:** 231

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 7. Dr. Neel Kamal Sourav

**Slug:** `dr-neel-kamal-sourav` · Sarvodaya Hospital, Faridabad, Delhi NCR

### Existing BIO

Dr. Neel Kamal Sourav is Associate Consultant at Sarvodaya Hospital in Delhi NCR, India. He has practised adult orthopaedics in India for 11+ years experience. Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — Robotic Knee Replacement, Revision Knee Replacement and Partial Knee Replacement when films, alignment and activity already make the indication honest. Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair are written after records review — not from a brochure implant count. Training includes Fellowship in Shoulder and Sports Injury. International patients meet him on camera first; travel to Delhi NCR is offered only if this orthopaedic floor is the right list.

### Proposed BIO

Dr. Neel Kamal Sourav is an Associate Consultant at Sarvodaya Hospital in Faridabad, in the Delhi NCR, with more than 11 years of experience in orthopedics.

The shoulder is the most developed part of his list, which follows directly from his fellowship. He performs shoulder replacement and rotator cuff repair and treats shoulder instability and frozen shoulder. His knee and hip work covers total knee replacement, partial knee replacement, robotic knee replacement, revision knee replacement, total hip replacement and revision hip replacement. His arthroscopic work covers ACL reconstruction for ACL tear, PCL reconstruction for PCL tear, meniscus repair and arthroscopic surgery, and he also performs fracture fixation and joint injection and treats tennis elbow, golfer's elbow and trigger finger.

He holds an MBBS, the DNB and the MNAMS, and completed a fellowship in shoulder and sports injury, the qualification that accounts for the shoulder weighting in his practice.

His posts have taken him across four cities. Before Sarvodaya Hospital in Sector 8, Faridabad, he was at Deenanath Mangeshkar Hospital and Research Centre in Pune, Jaslok Hospital and Research Centre in Mumbai, Indraprastha Apollo Hospital in New Delhi and Amrita Hospital in Faridabad.

His writing sits alongside the clinical work. He has published multiple national research papers and is a co-author of Orthopedic Operations: Text and Atlas by Dr. Sharad Hardikar.

**Word count:** 220

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, research, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 8. Dr. I. Vishwanatha Reddy

**Slug:** `dr-i-vishwanatha-reddy` · KIMS Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. I. Vishwanatha Reddy is Consultant Orthopedic Surgeon at KIMS Hospitals in Hyderabad, India. He has practised adult orthopaedics in India for 41+ years experience. Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — Revision Knee Replacement, Partial Knee Replacement and Total Knee Replacement when films, alignment and activity already make the indication honest. Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair are written after records review — not from a brochure implant count. Training includes MBBS — Sri Venkateswara University, Tirupati (1980). International patients meet him on camera first; travel to Hyderabad is offered only if this orthopaedic floor is the right list.

### Proposed BIO

Dr. I. Vishwanatha Reddy is a Consultant Orthopedic Surgeon at KIMS Hospitals, Secunderabad, in Hyderabad, with more than 41 years of experience in orthopedics.

His list is broad and covers both the worn and the injured joint. Replacement work covers total knee replacement, partial knee replacement, total hip replacement, hip resurfacing, shoulder replacement and the revision of both knee and hip. Arthroscopic and soft tissue work covers ACL reconstruction for ACL tear, PCL reconstruction for PCL tear, meniscus repair, rotator cuff repair for rotator cuff tear and tendon repair. On the trauma and reconstruction side he performs fracture fixation and non-union repair and treats limb length discrepancy, and he also gives joint injections.

His qualifications were taken over nineteen years and in two countries. He read MBBS at Sri Venkateswara University in Tirupati in 1980 and took his MS in orthopaedics at the same university in 1985. He then took an MSc in clinical orthopaedics at Tees Side in England in 1995, and was elected FRCS at Edinburgh in the UK in 1999.

His career divides into three clear phases. He was at A.P. Government Medical College from 1985 to 1993, then in NHS hospitals in England from 1993 to 1997, and has since worked in Hyderabad and Secunderabad at KIMS Hospitals, Image Hospital and CDR Hospital. The Tees Side MSc falls inside his NHS years, while the Edinburgh fellowship came two years after he returned, so the two overseas qualifications bracket that period of his career on either side.

**Word count:** 250

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 9. Dr. Nitiraj Singh Oberoi

**Slug:** `dr-nitiraj-singh-oberoi` · Max Smart Super Speciality Hospital, Saket, Delhi NCR

### Existing BIO

Dr. Nitiraj Singh Oberoi is Director at Max Smart Super Speciality Hospital in Delhi NCR, India. He has practised adult orthopaedics in India for 34+ years experience. Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — Revision Knee Replacement, Partial Knee Replacement and Total Knee Replacement when films, alignment and activity already make the indication honest. Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair are written after records review — not from a brochure implant count. Training includes MBBS — Maulana Azad Medical College, Delhi. International patients meet him on camera first; travel to Delhi NCR is offered only if this orthopaedic floor is the right list.

### Proposed BIO

Dr. Nitiraj Singh Oberoi is a Director at Max Smart Super Speciality Hospital, Saket, in the Delhi NCR, with more than 34 years of experience in orthopedics.

His list is one of the widest in the specialty and reaches from the hip to the foot. Replacement work covers total knee replacement, partial knee replacement, total hip replacement, shoulder replacement and the revision of both knee and hip, with advanced hip and knee osteoarthritis managed alongside. Arthroscopic and sports work covers ACL reconstruction for ACL tear, PCL reconstruction for PCL tear, meniscus repair, rotator cuff repair for rotator cuff tear, arthroscopic surgery and shoulder instability. He also performs carpal tunnel release and bunion surgery for hallux valgus, and treats trigger finger, tennis elbow, golfer's elbow, plantar fasciitis and frozen shoulder, alongside tendon repair and joint injection. On the trauma and reconstruction side he performs fracture fixation, non-union repair and limb lengthening surgery and treats limb length discrepancy.

Both of his first degrees were taken at Maulana Azad Medical College in Delhi: the MBBS and the MS in orthopaedics. He also holds the DNB in orthopaedics and was elected a Fellow of the Royal College of Surgeons at Edinburgh in the UK.

Before Max Smart Hospital in Saket he was at Max Hospital, Panchsheel Park, and earlier at Artemis Hospital, Fortis Healthcare and Sir Ganga Ram Hospital. Across more than three decades and five recorded posts, nothing appears to have been narrowed out of his practice: replacement, arthroscopy, trauma and the smaller joints all remain on the same list.

**Word count:** 257

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 10. Dr. A. Navaladi Shankar

**Slug:** `dr-a-navaladi-shankar` · Apollo Hospital, Chennai, Chennai

### Existing BIO

Dr. A. Navaladi Shankar is Senior Consultant at Apollo Hospital in Chennai, India. He has practised adult orthopaedics in India for 32+ years experience. Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — Revision Knee Replacement, Total Knee Replacement and Total Hip Replacement when films, alignment and activity already make the indication honest. Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair are written after records review — not from a brochure implant count. Training includes MS (Orthopaedics). International patients meet him on camera first; travel to Chennai is offered only if this orthopaedic floor is the right list.

### Proposed BIO

Dr. A. Navaladi Shankar is a Senior Consultant at Apollo Hospital in Chennai, with more than 32 years of experience. His profile records orthopedics together with sports medicine.

His list runs across both. Replacement work covers total knee replacement, total hip replacement and revision knee replacement, with advanced knee osteoarthritis managed alongside. Sports and arthroscopic work covers ACL reconstruction for ACL tear, meniscus repair, rotator cuff repair for rotator cuff tear and arthroscopic surgery. He also performs fracture fixation and carpal tunnel release, and treats carpal tunnel syndrome, frozen shoulder, tennis elbow, golfer's elbow and trigger finger.

His qualifications are all postgraduate. He holds the MS in orthopaedics and the DNB in orthopaedics, was elected FRCS, holds the MNAMS, and took a diploma in sports medicine. That last qualification is the formal basis for the second specialization on his profile, and it is reflected in the ligament, meniscus and rotator cuff work that makes up much of his list.

Alongside Apollo Hospitals on Greams Road in Chennai he runs the Dr. Navaladi Spine and Knee Clinic in the same city. The name of that clinic places the knee at the centre of his practice, which is consistent with a list on which knee replacement, revision knee replacement, ACL reconstruction and meniscus repair all appear.

He was awarded best paper at the Indian Orthopaedic Association conference, and his record notes further awards recognised during his professional career.

**Word count:** 236

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 11. Dr. Attique Vasdev

**Slug:** `dr-attique-vasdev` · Medanta - The Medicity, Delhi NCR

### Existing BIO

Dr. Attique Vasdev is Vice Chairman- Orthopedics at Medanta - The Medicity in Delhi NCR, India. He has practised adult orthopaedics in India for 25+ years experience. Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — Robotic Knee Replacement, Revision Knee Replacement and Total Knee Replacement when films, alignment and activity already make the indication honest. Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair are written after records review — not from a brochure implant count. Training includes M.B.B.S.. International patients meet him on camera first; travel to Delhi NCR is offered only if this orthopaedic floor is the right list.

### Proposed BIO

Dr. Attique Vasdev is Vice Chairman of Orthopedics at Medanta - The Medicity in the Delhi NCR, with more than 25 years of experience in orthopedics.

The knee is the centre of his practice. He performs total knee replacement, revision knee replacement, robotic knee replacement, arthroscopic knee surgery, ACL reconstruction and ligament repair, and manages advanced knee osteoarthritis and degenerative joint disease. Failed joint replacement appears on his list in its own right, alongside total hip replacement and fracture fixation, so revision work sits beside primary surgery rather than after it.

He holds an MBBS and an MS in orthopaedics, and took two fellowships abroad in different fields: joint replacement in Germany, and trauma, in developing and organizing trauma systems, in Israel. The second is a systems fellowship rather than a purely operative one, which is unusual alongside a list otherwise concentrated on a single joint.

He has been Vice Chairman of the Knee Unit at Medanta in Gurugram from 2009 to the present, a post whose title matches the shape of his operating list. Before that he was an Orthopaedic Consultant at Sir Ganga Ram Hospital in New Delhi and an Assistant Professor of Orthopaedics at Kasturba Medical College in Manipal, and earlier a Senior Resident at Holy Family Hospital. His record also lists Government Medical College in Chandigarh.

Between a teaching post at Manipal, a consultant post at Sir Ganga Ram and the knee unit at Medanta since 2009, his career has moved from general orthopaedic practice into a single-joint specialization.

**Word count:** 253

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 12. Dr. Rahul Davari

**Slug:** `dr-rahul-davari` · Medicover Hospital, Navi Mumbai, Mumbai

### Existing BIO

Dr. Rahul Davari is Consultant Orthopaedic, Arthroscopy, Sports Injuries & Joint Preservation Surgeon at Medicover Hospital in Mumbai, India. He has practised adult orthopaedics in India for 18+ years experience. Adult joint, sports and trauma lists are tagged for later pSEO under country, city, specialty and procedure — ACL Reconstruction (Anterior Cruciate Ligament), Arthroscopic Surgery and Meniscus Repair when films, alignment and activity already make the indication honest. Primary versus revision arthroplasty, robotic versus conventional knee, ACL versus PCL, and fracture fixation versus non-union repair are written after records review — not from a brochure implant count. Training includes MBBS. International patients meet him on camera first; travel to Mumbai is offered only if this orthopaedic floor is the right list.

### Proposed BIO

Dr. Rahul Davari is a Consultant Orthopaedic, Arthroscopy, Sports Injuries and Joint Preservation Surgeon at Medicover Hospital in Navi Mumbai, with more than 18 years of experience. His profile records orthopedics together with sports injuries and joint preservation surgery.

His designation names joint preservation rather than joint replacement, and his list follows it. He performs arthroscopic knee surgery and arthroscopic shoulder surgery, ACL reconstruction, meniscus repair, rotator cuff repair and ligament repair, together with fracture fixation and joint injection. He treats frozen shoulder, rheumatoid arthritis and degenerative joint disease. No replacement procedure appears on the list, so the degenerative joint is managed and reconstructed rather than replaced.

He holds an MBBS and an MS in orthopaedics.

His hospital record is the most detailed part of his profile and is concentrated in one place. Alongside Medicover Hospitals in Navi-Mumbai he has been at Terna Medical College in Nerul, Hiranandani Fortis Hospital in Vashi, Acharya Shri Nanesh Hospital and Apollo Hospital, both in CBD Belapur, KDAH in Koparkhairane and Medicity Hospital in Kharghar. That is seven posts across Nerul, Vashi, Belapur, Koparkhairane and Kharghar, all within the same city.

The combination is unusual. A practice of more than 18 years has been built entirely in Navi Mumbai, and it has stayed on the arthroscopic and joint-preserving side of orthopaedics rather than moving into replacement surgery as seniority increased.

**Word count:** 226

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---

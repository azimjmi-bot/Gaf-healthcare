# Doctor BIO rewrite — Batch 56 — Cardiac Surgery, India

Second Cardiac Surgery batch. Every sentence is drawn from that doctor's own record in
`src/data/ginger-catalog.json` (designation, hospital, city, experience, qualifications, education,
affiliations, memberships, awards and research). The previous bios in this specialty are GAF
platform boilerplate, so the structured fields are the source. No external sources, no inference,
and no information from any other doctor's profile. Only `doctorOverrides["<slug>"].bio` is
written; no pSEO, schema, routing or frontend field changes.

## Batch summary

| # | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 1 | Dr. Biswarup Purkayastha | Delhi NCR | 98 | 257 | APPLIED |
| 2 | Dr. K.V. Krishna Kumar | Hyderabad | 96 | 246 | APPLIED |
| 3 | Dr. Kale Satya Sridhar | Hyderabad | 92 | 242 | APPLIED |
| 4 | Dr. Vijay Kumar Devraj | Hyderabad | 90 | 240 | APPLIED |
| 5 | Dr. A G K Gokhale | Hyderabad | 86 | 237 | APPLIED |
| 6 | Dr. Manoj Kumar S P | Bengaluru | 86 | 245 | APPLIED |
| 7 | Dr. Naresh Trehan | Delhi NCR | 86 | 242 | APPLIED |
| 8 | Dr. Sathyaki P Nambala | Bengaluru | 81 | 244 | APPLIED |
| 9 | Dr. Srinath Vijayasekharan | Chennai | 80 | 225 | APPLIED |
| 10 | Dr. A. S. Hariharan | Chennai | 80 | 246 | APPLIED |
| 11 | Dr. Sanjay Kumar Sharma | Delhi NCR | 83 | 228 | APPLIED |
| 12 | Dr. Vishal Khante | Hyderabad | 97 | 240 | APPLIED |

Every bio below is validated by `scripts/check-bio-batch.mjs` for the 200–300 word range and
for traceability of every capitalised term, acronym, degree and year back to that individual
doctor's own record in `src/data/ginger-catalog.json`.

---

## 1. Dr. Biswarup Purkayastha

**Slug:** `dr-biswarup-purkayastha` · Artemis Hospital, Delhi NCR

### Existing BIO

Dr. Biswarup Purkayastha is Consultant, Heart & Lung Transplant and Vascular Surgery at Artemis Hospital in Delhi NCR, India. He has practised cardiac surgery in India for 15+ years experience. The cardiac list covers LVAD Implantation, Heart Transplant Surgery and Minimally Invasive Cardiac Surgery when the indication is honest. Conduit, prosthesis and approach are written after records review — not from a brochure. Training includes Membership of the European Board of Cardiothoracic Surgery (MEBCTS) — by examination. International patients meet him on camera first; travel to Delhi NCR is offered only if this theatre is the right floor.

### Proposed BIO

Dr. Biswarup Purkayastha is Consultant for Heart and Lung Transplant and Vascular Surgery at Artemis Hospital in Delhi NCR, with more than 15 years of experience. His profile records cardiac surgery together with vascular surgery.

His list covers heart transplant surgery, lung transplant surgery and combined heart-lung transplantation, LVAD implantation, coronary artery bypass grafting, heart valve repair and replacement, multiple valve surgery, aortic root replacement and minimally invasive cardiac surgery. The vascular side adds aortic aneurysm repair and endovascular aneurysm repair.

His qualifications are entirely transplant and support focused. He holds Membership of the European Board of Cardiothoracic Surgery by examination, and ELSO Level 1 and 101 certification as an adult ECMO practitioner. His Greenlane Fellowship in adult cardiothoracic surgery and heart-lung transplants at Auckland was a full two-year term, and he took international training at Vienna General Hospital under the Toronto–Vienna Lung Transplant Academy Program. His initial training was at Narayana Hrudayalaya.

ECMO certification alongside a transplant fellowship is the pairing that matters here, since extracorporeal support is what bridges a patient to a donor organ and carries them through the period afterward.

His memberships follow the same line: the International Society of Heart and Lung Transplantation, the European Association of Cardiothoracic Surgery, the Heart Failure Association of the European Society of Cardiology, the National Academy of Medical Sciences and the Indian Association of Cardiovascular and Thoracic Surgeons. A heart failure association membership sits on the medical rather than surgical side, which is where transplant candidates are first identified.

He practises at Artemis Hospitals in Gurugram.

**Word count:** 257

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, memberships, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 2. Dr. K.V. Krishna Kumar

**Slug:** `dr-k-v-krishna-kumar` · KIMS Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. K.V. Krishna Kumar is Senior Consultant Cardiothoracic Surgeon at KIMS Hospitals in Hyderabad, India. He has practised cardiac surgery in India for 42+ years experience. The cardiac list covers TAVR/TAVI (Transcatheter Aortic Valve Replacement), Minimally Invasive Cardiac Surgery and Redo CABG when the indication is honest. Conduit, prosthesis and approach are written after records review — not from a brochure. Training includes M.B.B.S. – Guntur Medical College, Guntur, A.P., India (Affiliated to Nagarjuna University), 1978–1983. International patients meet him on camera first; travel to Hyderabad is offered only if this theatre is the right floor.

### Proposed BIO

Dr. K.V. Krishna Kumar is a Senior Consultant Cardiothoracic Surgeon at KIMS Hospitals, Secunderabad, in Hyderabad, with more than 42 years of experience in cardiac surgery.

His list covers coronary artery bypass grafting and redo CABG, heart valve repair and replacement, double valve replacement and multiple valve surgery, aortic root replacement, minimally invasive cardiac surgery, and TAVI and TAVR.

He read MBBS at Guntur Medical College under Nagarjuna University between 1978 and 1983 and completed a rotating internship at the Government General Hospital in Guntur in 1984. His MS in general surgery was at Kasturba Medical College and Wenlock Government Hospital in Mangalore from 1986 to 1988, and his MCh in cardiothoracic surgery at Osmania Medical College and Osmania General Hospital in Hyderabad.

Four decades of practice since that training places him among the longest-serving cardiac surgeons on this platform, and a list that now includes transcatheter valve replacement alongside conventional bypass describes a practice that has taken on the newer procedures as they arrived.

His hospital record runs across two states and both kinds of setting. He has worked at Nizam's Institute of Medical Sciences and Medwin Hospital in Hyderabad, at the Mahavir Cardiovascular Centre, at the Bollineni Heart Center in Rajahmundry, and at the K.N. Hari Memorial and K.N. Memorial hospitals in Cherukupalli in Guntur district, alongside his current post at KIMS Hospitals in Secunderabad. District hospitals appearing beside tertiary cardiac centres on one record describe practice that has reached beyond the metropolitan centres.

**Word count:** 246

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 3. Dr. Kale Satya Sridhar

**Slug:** `dr-kale-satya-sridhar` · Yashoda Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. Kale Satya Sridhar is Consultant Cardiothoracic Surgeon at Yashoda Hospitals in Hyderabad, India. He has practised cardiac surgery in India for 30+ years experience. The cardiac list covers Heart Transplant Surgery, Minimally Invasive Cardiac Surgery and Aortic Root Replacement when the indication is honest. Conduit, prosthesis and approach are written after records review — not from a brochure. Training includes MCh (Cardiovascular Surgery) — G B Pant Hospital, Delhi University (2002–2005). International patients meet him on camera first; travel to Hyderabad is offered only if this theatre is the right floor.

### Proposed BIO

Dr. Kale Satya Sridhar is a Consultant Cardiothoracic Surgeon at Yashoda Hospitals, Secunderabad, in Hyderabad, with more than 30 years of experience. His profile records cardiac surgery together with paediatric cardiac surgery.

His list covers coronary artery bypass grafting, heart valve repair and replacement, aortic root replacement, minimally invasive cardiac surgery and heart transplant surgery.

He read MBBS at Gandhi Medical College under NTR University of Health Sciences in Hyderabad between 1989 and 1996, took his MS in general surgery at Kakatiya Medical College in Warangal from 1998 to 2002, and his MCh in cardiovascular surgery at G B Pant Hospital under Delhi University from 2002 to 2005.

His hospital record reads as a tour of the best-known cardiac units in the country. Alongside Yashoda Hospitals in Secunderabad he has worked at Nizam's Institute of Medical Sciences, Maxcure Medicity Hospital, Indo US Super Specialty Hospital and Apollo Hospital, at the Sri Satya Sai Institute of Higher Medical Sciences in Puttaparthi, at the Dr. K. M. Cherian Heart Foundation in Chennai, and at G B Pant Hospital in Delhi where he trained.

Two of those institutions are notable for the kind of work they do rather than their size. The Puttaparthi institute and the Cherian foundation are both associated with cardiac surgery offered without regard to a patient's ability to pay, and paediatric cardiac surgery, which appears on his profile alongside the adult work, is a large part of what such centres carry.

**Word count:** 242

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 4. Dr. Vijay Kumar Devraj

**Slug:** `dr-vijay-kumar-devraj` · KIMS Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. Vijay Kumar Devraj is Senior Consultant at KIMS Hospitals in Hyderabad, India. He has practised cardiac surgery in India for 35+ years experience. The cardiac list covers TAVR/TAVI (Transcatheter Aortic Valve Replacement), Minimally Invasive Cardiac Surgery and Redo CABG when the indication is honest. Conduit, prosthesis and approach are written after records review — not from a brochure. Training includes MBBS (1978) — Osmania Medical College, Osmania University, Hyderabad. International patients meet him on camera first; travel to Hyderabad is offered only if this theatre is the right floor.

### Proposed BIO

Dr. Vijay Kumar Devraj is a Senior Consultant at KIMS Hospitals, Secunderabad, in Hyderabad, with more than 35 years of experience. His profile records cardiac surgery together with general surgery.

His list covers coronary artery bypass grafting and redo CABG, heart valve repair and replacement, double valve replacement and multiple valve surgery, aortic root replacement, minimally invasive cardiac surgery, and TAVI and TAVR.

All three of his degrees were taken in Hyderabad. He read MBBS at Osmania Medical College under Osmania University in 1978, took his MS in general surgery at Gandhi Medical College in 1983, and returned to Gandhi Medical College for his MCh in cardiothoracic surgery in 1997 under Andhra Pradesh University of Health Sciences.

The years between the MS and the MCh make a long interval, and general surgery remaining on his profile as a specialty alongside cardiac surgery suggests those years were spent practising it rather than waiting.

His hospital record is correspondingly broad. He has worked at Osmania Medical College and Deccan Medical College in Hyderabad and at Kakatiya Medical College, at MEDWIN and Mahavir Hospitals in Hyderabad, at the Durgabai Deshmukh Hospital of the Andhra Mahila Sabha, and at Bolleneni Hospitals in Nellore, before his current post at KIMS Hospital in Secunderabad.

Three medical colleges among those affiliations means a substantial part of his career has been spent where surgical trainees are taught, which is a different setting from a private cardiac unit alone.

**Word count:** 240

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 5. Dr. A G K Gokhale

**Slug:** `dr-a-g-k-gokhale` · Apollo Hospital, Jubilee Hills, Hyderabad, Hyderabad

### Existing BIO

Dr. A G K Gokhale is Senior Consultant at Apollo Hospital in Hyderabad, India. He has practised cardiac surgery in India for 30+ years experience. The cardiac list covers Minimally Invasive Cardiac Surgery, Redo CABG and Double Valve Replacement when the indication is honest. Conduit, prosthesis and approach are written after records review — not from a brochure. Training includes MBBS – Recognized medical institution, India. International patients meet him on camera first; travel to Hyderabad is offered only if this theatre is the right floor.

### Proposed BIO

Dr. A G K Gokhale is a Senior Consultant at Apollo Hospital, Jubilee Hills, in Hyderabad, with more than 30 years of experience. His profile records cardiac surgery together with vascular surgery.

His list is genuinely split between the two. The cardiac work covers coronary artery bypass grafting and redo CABG, heart valve repair and replacement, double valve replacement, aortic root replacement and minimally invasive cardiac surgery. The vascular work covers peripheral vascular bypass surgery, endovascular aneurysm repair, AV fistula creation and deep vein thrombosis.

AV fistula creation on a cardiac surgeon's list is worth noting, since it is the access built for dialysis patients rather than a heart operation, and it comes from the vascular half of a cardiothoracic and vascular training.

He holds MBBS, an MS in general surgery and the MCh in cardiothoracic and vascular surgery, along with the FIACS as a Fellow of the Indian Association of Cardiovascular-Thoracic Surgeons, and his record notes fellowship and training in cardiothoracic and vascular surgery at premier Indian and international centres.

His profile records recognition for excellence in cardiothoracic surgical practice through multiple awards and honours over his career, awards for best scientific paper presentations at national and international conferences, and recognition for his contributions to advancing minimally invasive cardiac surgical techniques. He also has multiple publications in peer-reviewed national and international cardiothoracic and vascular surgery journals.

He practises at Apollo Health City in Jubilee Hills, Hyderabad.

**Word count:** 237

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 6. Dr. Manoj Kumar S P

**Slug:** `dr-manoj-kumar-s-p` · Apollo Hospitals, Bannerghatta Road, Bengaluru

### Existing BIO

Dr. Manoj Kumar S P is Senior Consultant at Apollo Hospitals in Bengaluru, India. He has practised cardiac surgery in India for 26+ years experience. The cardiac list covers Minimally Invasive Cardiac Surgery, Double Valve Replacement and Aortic Root Replacement when the indication is honest. Conduit, prosthesis and approach are written after records review — not from a brochure. Training includes M.Ch (Cardiothoracic and Vascular Surgery). International patients meet him on camera first; travel to Bengaluru is offered only if this theatre is the right floor.

### Proposed BIO

Dr. Manoj Kumar S P is a Senior Consultant at Apollo Hospitals, Bannerghatta Road, in Bengaluru, with more than 26 years of experience in cardiac surgery.

His list runs from the heart to the veins of the leg. The cardiac work covers coronary artery bypass grafting, heart valve repair and replacement, double valve replacement, aortic root replacement and minimally invasive cardiac surgery. The vascular work covers peripheral vascular bypass surgery, endovascular aneurysm repair, AV fistula creation, deep vein thrombosis, varicose vein surgery and laser treatment for varicose veins.

Laser treatment for varicose veins and open heart surgery on the same list is the full span of a cardiothoracic and vascular practice, from a day procedure on a superficial vein to an operation on the aortic root.

He holds MBBS, an MS in general surgery, and both the MCh and the DNB in cardiothoracic surgery, so the specialty was examined twice, along with the FAIS as a Fellow of the Association of Indian Surgeons.

His record notes national-level records established in performing international standards of cardiac, thoracic and vascular surgery, and recognises him as one of the youngest to perform such programmes in the country. He has been nominated for congenital heart defects and endovascular and extra-corporeal CABG work, and is an active member of the heart failure treatment team.

Heart failure team membership places him alongside physicians managing patients medically, which is where surgical candidates are identified. He practises at Apollo Hospitals in Seshadripuram, Bangalore.

**Word count:** 245

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 7. Dr. Naresh Trehan

**Slug:** `dr-naresh-trehan` · Medanta - The Medicity, Delhi NCR

### Existing BIO

Dr. Naresh Trehan is Chairman and Managing Director at Medanta - The Medicity in Delhi NCR, India. He has practised cardiac surgery in India for 52+ years experience. The cardiac list covers Heart Transplant Surgery, Robotic Cardiac Surgery and Minimally Invasive Cardiac Surgery when the indication is honest. Conduit, prosthesis and approach are written after records review — not from a brochure. Training includes M.B.B.S.. International patients meet him on camera first; travel to Delhi NCR is offered only if this theatre is the right floor.

### Proposed BIO

Dr. Naresh Trehan is Chairman and Managing Director of Medanta - The Medicity in Delhi NCR, with more than 52 years of experience in cardiac surgery.

His list covers coronary artery bypass grafting and redo CABG, heart valve repair and replacement, double valve replacement and multiple valve surgery, heart transplant surgery, minimally invasive cardiac surgery and robotic cardiac surgery. His profile also records the comparison between traditional and minimally invasive heart surgery as one of the subjects he addresses, which is the question a patient facing either faces first.

He holds MBBS and is a Diplomate of the American Board of Cardiothoracic Surgery, the certification that governs the specialty in the United States.

His honours span more than three decades and two of the highest civilian awards in India. He received the Padma Shri in 1991 for distinguished service in medicine and the Padma Bhushan from the Government of India, along with the Dr. B. C. Roy National Award in 2005, the highest recognition Indian medicine gives its own. Earlier came the Rajiv Gandhi National Unity Award and the India International Gold Award, both in 1995.

Robotic and minimally invasive cardiac surgery sitting on the same list as transplantation and redo bypass describes a practice that covers both the newest approaches to the heart and the hardest repeat operations.

Alongside Medanta – The Medicity, where he is chairman and managing director, he practises at Medanta Gurugram and Medanta Mediclinic in Defence Colony.

**Word count:** 242

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 8. Dr. Sathyaki P Nambala

**Slug:** `dr-sathyaki-p-nambala` · Apollo Hospitals, Bannerghatta Road, Bengaluru

### Existing BIO

Dr. Sathyaki P Nambala is Consultant Cardiac Surgeon at Apollo Hospitals in Bengaluru, India. He has practised cardiac surgery in India for 18+ years experience. The cardiac list covers Robotic Cardiac Surgery, Minimally Invasive Cardiac Surgery and Redo CABG when the indication is honest. Conduit, prosthesis and approach are written after records review — not from a brochure. Training includes MBBS. International patients meet him on camera first; travel to Bengaluru is offered only if this theatre is the right floor.

### Proposed BIO

Dr. Sathyaki P Nambala is a Consultant Cardiac Surgeon at Apollo Hospitals, Bannerghatta Road, in Bengaluru, with more than 18 years of experience.

His list covers coronary artery bypass grafting and redo CABG, heart valve repair and replacement, double valve replacement and multiple valve surgery, aortic root replacement, minimally invasive cardiac surgery and robotic cardiac surgery.

He holds MBBS and an MS in general surgery, and took his MCh in cardiothoracic and vascular surgery through Apollo Hospital in Bangalore and the Sri Sathya Sai Institute of Higher Medical Sciences. His fellowship covers both minimally invasive cardiac surgery and robotic cardiac surgery, the two techniques that distinguish his list from a conventional one.

His record names one accomplishment in particular: he led the first-ever beating heart coronary artery bypass operation, off-pump CABG, at one of his affiliated institutions. Off-pump surgery is bypass performed without stopping the heart or using the heart-lung machine, and being the first to do it at an institution means introducing the technique to a whole theatre team rather than only performing it.

He has presented surgical studies at the Heart Valve Society and at international congress, which his profile records as demonstrating his academic and clinical contributions to the field.

Alongside Apollo Hospital in Seshadripuram he has worked at Narayana Health in Bangalore, at the Sri Sathya Sai Institute of Higher Medical Sciences and at the Sri Jayadeva Institute of Cardiovascular Sciences, three of the best-known cardiac centres in the city.

**Word count:** 244

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 9. Dr. Srinath Vijayasekharan

**Slug:** `dr-srinath-vijayasekharan` · Rela Hospital, Chennai

### Existing BIO

Dr. Srinath Vijayasekharan is Director and Senior Consultant at Rela Hospital in Chennai, India. He has practised cardiac surgery in India for 26+ years experience. The cardiac list covers LVAD Implantation, Heart Transplant Surgery and Robotic Cardiac Surgery when the indication is honest. Conduit, prosthesis and approach are written after records review — not from a brochure. Training includes MBBS. International patients meet him on camera first; travel to Chennai is offered only if this theatre is the right floor.

### Proposed BIO

Dr. Srinath Vijayasekharan is Director and Senior Consultant at Rela Hospital in Chennai, with more than 26 years of experience. His profile records cardiac surgery together with paediatric cardiac surgery.

His list is among the widest in the specialty. It covers coronary artery bypass grafting, heart valve repair and replacement, aortic root replacement, minimally invasive cardiac surgery and robotic cardiac surgery, together with LVAD implantation, heart transplant surgery, lung transplant surgery and combined heart-lung transplantation.

An LVAD and three forms of transplantation on one list describe a service for patients whose own heart or lungs can no longer be repaired, and the paediatric side of his profile means that work is not confined to adults.

He holds MBBS, an MS and the DNB.

His hospital record covers the main cardiac and transplant centres of Chennai and beyond. Alongside Dr. Rela Institute and Medical Centre he has worked at MGM Healthcare, at Fortis Malar Hospitals and Malar Hospital, at Sri Ramachandra University, and at Kovai Medical Center and Hospital.

Robotic cardiac surgery appearing on the same list as heart-lung transplantation is unusual, since the two sit at opposite ends of the specialty: one is about operating through the smallest possible access, the other about replacing the organs entirely. A surgeon whose practice carries both is working across the full range of what cardiac surgery now offers.

**Word count:** 225

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 10. Dr. A. S. Hariharan

**Slug:** `dr-a-s-hariharan` · Rela Hospital, Chennai

### Existing BIO

Dr. A. S. Hariharan is Visiting Consultant at Rela Hospital in Chennai, India. He has practised cardiac surgery in India for 12+ years experience. The cardiac list covers LVAD Implantation, Minimally Invasive Cardiac Surgery and Aortic Root Replacement when the indication is honest. Conduit, prosthesis and approach are written after records review — not from a brochure. Training includes MBBS. International patients meet him on camera first; travel to Chennai is offered only if this theatre is the right floor.

### Proposed BIO

Dr. A. S. Hariharan is a Visiting Consultant at Rela Hospital in Chennai, with more than 12 years of experience. His profile records cardiac surgery together with vascular surgery.

His list is weighted toward the aorta. Alongside coronary artery bypass grafting, minimally invasive cardiac surgery and LVAD implantation, he performs aortic root replacement, aortic aneurysm repair and thoracic endovascular aortic repair. Holding both the open and the endovascular approach to an aneurysm on one list means the choice between them can be made on the case rather than on what the surgeon offers.

He holds MBBS, the DNB in general surgery and the DNB in cardiothoracic surgery, so both stages of his surgical training were examined through the national board.

His hospital record traces a clear progression through the grades. He was a senior resident in general surgery at VHS, then senior registrar and resident in cardiothoracic surgery at Railway Hospital, associate consultant in thoracic surgery at Apollo Hospital, and divisional medical officer at the Southern Railway Headquarters Hospital. At SRM Medical College Hospital and Research Centre he served first as junior and then as senior consultant, before his current visiting consultant post at Rela Hospital in Chennai.

Two railway hospitals among those posts describe part of a career spent in an employer-run health service, which serves a defined population rather than a referral catchment, and the move from resident to senior consultant across six institutions is the ordinary shape of a surgical career made visible.

**Word count:** 246

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 11. Dr. Sanjay Kumar Sharma

**Slug:** `dr-sanjay-kumar-sharma` · Indraprastha Apollo Hospital, Delhi NCR

### Existing BIO

Dr. Sanjay Kumar Sharma is Senior Consultant at Indraprastha Apollo Hospital in Delhi NCR, India. He has practised cardiac surgery in India for 23+ years experience. The cardiac list covers Robotic Cardiac Surgery, Minimally Invasive Cardiac Surgery and Redo CABG when the indication is honest. Conduit, prosthesis and approach are written after records review — not from a brochure. Training includes MBBS. International patients meet him on camera first; travel to Delhi NCR is offered only if this theatre is the right floor.

### Proposed BIO

Dr. Sanjay Kumar Sharma is a Senior Consultant at Indraprastha Apollo Hospital in Delhi NCR, with more than 23 years of experience in cardiac surgery.

His list covers coronary artery bypass grafting and redo CABG, heart valve repair and replacement, double valve replacement and multiple valve surgery, aortic root replacement, minimally invasive cardiac surgery and robotic cardiac surgery.

Robotic and minimally invasive surgery sitting beside redo bypass is worth noting. The first two are about reaching the heart through the smallest possible opening; a redo operation means going back through a chest that has been opened before, which is among the more demanding situations in the specialty. His list carries both.

He holds MBBS, an MS in general surgery and the DNB in cardiothoracic surgery, and completed a structural cardiac transplant training programme, recorded on his profile as specialised training and certification in structural cardiac transplant procedures.

His hospital record runs through the main cardiac units of Delhi. Alongside Indraprastha Apollo Hospital and Apollo Hospitals in Delhi he has worked at Fortis Escorts Hospital and at Manipal Hospitals.

A national board qualification in cardiothoracic surgery, followed by transplant-level training and a list that now includes robotic work, describes a surgeon whose practice has kept pace with the techniques as they arrived rather than settling at the point of qualification. He practises at Indraprastha Apollo Hospital in Delhi NCR.

**Word count:** 228

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, awards, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---
## 12. Dr. Vishal Khante

**Slug:** `dr-vishal-khante` · Yashoda Hospitals, Secunderabad, Hyderabad

### Existing BIO

Dr. Vishal Khante is Consultant Cardiothoracic and Minimal Invasive Surgeon at Yashoda Hospitals in Hyderabad, India. He has practised cardiac surgery in India for 23+ years experience. The cardiac list covers Minimally Invasive Cardiac Surgery, Double Valve Replacement and Heart Valve Repair when the indication is honest. Conduit, prosthesis and approach are written after records review — not from a brochure. Training includes M.Ch. in Cardiothoracic & Vascular Surgery (2013) — G.B. Pant Hospital, New Delhi, India. International patients meet him on camera first; travel to Hyderabad is offered only if this theatre is the right floor.

### Proposed BIO

Dr. Vishal Khante is a Consultant Cardiothoracic and Minimal Invasive Surgeon at Yashoda Hospitals, Secunderabad, in Hyderabad, with more than 23 years of experience. His profile records cardiac surgery together with paediatric cardiac surgery and vascular surgery.

His list leads with minimally invasive cardiac surgery and goes on to coronary artery bypass grafting, heart valve repair and replacement, double valve replacement, multiple valve surgery and combined heart-lung transplantation.

He read MBBS at Government Medical College, Nagpur, under Maharashtra University of Health Sciences in 2003, took his MS in general surgery at Government Medical College, Aurangabad, in 2009, and his MCh in cardiothoracic and vascular surgery at G.B. Pant Hospital in New Delhi in 2013. His fellowship in heart and lung transplant was at Freeman Hospital in Newcastle upon Tyne between 2021 and 2022.

That fellowship, taken nearly a decade after his MCh, is what places transplantation at the end of a list that otherwise describes a conventional and minimally invasive cardiac practice. A surgeon already established in valve and bypass work who then trains abroad in transplantation is adding a service rather than starting one.

Alongside Yashoda Hospitals in Secunderabad he has worked at Kamineni Hospitals and Medical College, at Maxcure Hospitals and at Medicover Hospitals in Hyderabad, as well as at Freeman Hospital where he trained.

His designation names minimal invasive surgery directly, which matches a list on which it appears first rather than as one option among several.

**Word count:** 240

**Existing GAF profile fields used:** name, designation, specialty, specializations, hospitalName, city, experience, qualifications, proceduresExpertise, education, affiliations, existing bio.

**New factual information introduced:** NONE

**Other fields that would change:** NONE (bio only)

**Status:** APPLIED

---

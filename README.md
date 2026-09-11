# GAF Healthcare

Private medical travel atelier with four surfaces: **Doctors**, **Hospitals**, **Treatment Cost**, and **Blogs**. Specialties: **Radiation Oncology**, **Surgical Oncology**, **Medical Oncology**, **Hematology**, **Pediatric Hematology**, **Cardiac Surgery**, **Pediatric Cardiac Surgery**, **Cardiology**, **Bariatric Surgery**, **Cosmetic Surgery**, **ENT**, **Gastroenterology**, **Surgical Gastroenterology**, **Urology**, **Spine Surgery**, **Pulmonology**, **Pediatric Orthopaedic**, **Orthopedics**, **Ophthalmology**, **Gynecology**, **Neurosurgery**, **Neurology**, and **Nephrology**.

Doctors and hospitals are stored with denormalized **specialty**, **procedure**, **city**, and **country** slugs (`src/lib/taxonomy.ts`, `src/lib/doctors.ts`, `src/lib/hospitals.ts`) so programmatic SEO routes can be mounted later without rewriting the catalog:

- `/doctors/{country}/{city}/{specialty}/{procedure}`
- `/hospitals/{country}/{city}/{specialty}/{procedure}`

Those lowercase pSEO landings are not live yet. Live directory filters use Title-Case path segments when a country is selected — `/costs/India/Surgical-Oncology/Mastectomy`, `/doctors/India/Delhi-NCR`, `/hospitals/India` — and old `?destination=` query URLs 301 to that look. Procedure cost sheets (`/costs/mastectomy`) and doctor/hospital profile slugs stay unchanged.

The India roster (2,305 consultants, 37 campuses) and structured fields were sourced from Ginger Healthcare’s public listings for [radiation oncology](https://ginger.healthcare/destinations/india/radiation-oncology/), [surgical oncology](https://ginger.healthcare/destinations/india/surgical-oncology/), [medical oncology](https://ginger.healthcare/destinations/india/medical-oncology/), [hematology](https://ginger.healthcare/destinations/india/hematology/), [pediatric hematology](https://ginger.healthcare/destinations/india/pediatric-hematology/), [cardiac surgery](https://ginger.healthcare/destinations/india/cardiac-surgery/), [pediatric cardiac surgery](https://ginger.healthcare/destinations/india/pediatric-cardiac-surgery/), [cardiology](https://ginger.healthcare/destinations/india/cardiology/), [bariatric surgery](https://ginger.healthcare/destinations/india/bariatric-surgery/), [cosmetic surgery](https://ginger.healthcare/destinations/india/cosmetic-surgery/), [ENT](https://ginger.healthcare/destinations/india/ent/), [gastroenterology](https://ginger.healthcare/destinations/india/gastroenterology/), [surgical gastroenterology](https://ginger.healthcare/destinations/india/surgical-gastroenterology/), [urology](https://ginger.healthcare/destinations/india/urology/), [spine surgery](https://ginger.healthcare/destinations/india/spine-surgery/), [pulmonology](https://ginger.healthcare/destinations/india/pulmonology/), [pediatric orthopedics](https://ginger.healthcare/destinations/india/pediatric-orthopedics/), [orthopedics](https://ginger.healthcare/destinations/india/orthopedics/), [ophthalmology](https://ginger.healthcare/destinations/india/ophthalmology/), [gynecology](https://ginger.healthcare/destinations/india/gynecology/), [neurosurgery](https://ginger.healthcare/destinations/india/neurosurgery/), [neurology](https://ginger.healthcare/destinations/india/neurology/), and [nephrology](https://ginger.healthcare/destinations/india/nephrology/). Bios on this site are original GAF Healthcare copy. Portraits wait on CMS.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:43127](http://localhost:43127).

## Hostinger Node

Use Node **20**. Build with `npm run build` (`next build --webpack`). Start with `npm start`. Config is `next.config.mjs` so the builder does not need SWC to load TypeScript config. If the log still shows `GLIBC_2.29 not found`, the Hostinger image cannot run this Next.js version — use Vercel instead.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.

The consult form posts to `/api/consult` and returns a reference number. There is no database in this slice — submissions are validated and acknowledged so the intake experience can be used end to end.

## Article CMS

A WordPress-style desk lives at [`/cms`](http://localhost:43127/cms). Sign-in password defaults to `gaf-local`. Set `CMS_PASSWORD` on the server.

- **Articles** — create, edit, duplicate, trash and restore posts; body blocks, featured image, SEO, tags, related links. Public `/blogs` reads published articles from `content/cms.json`.
- **Doctors, hospitals, cost sheets** — bio, photo and sheet fields are stored in `content/catalog-cms.json`. Add a consultant to an existing hospital and specialty, add a campus using an India city already in taxonomy, or add a cost sheet for a procedure slug that already exists. Remove hides the record on the live site (a tombstone). Restore brings it back. The Ginger JSON catalog, `*-costs.ts` files, and pSEO matching helpers are not rewritten.

Draft articles stay off the public `/blogs` list. Media uploads land in `public/uploads/articles`.

## Languages

English stays at the root (`https://gaf.healthcare/...`). Localized sites use a language prefix, not a subdomain and not `?lang=`:

- `https://gaf.healthcare/ru/` Russian
- `https://gaf.healthcare/fr/` French
- `https://gaf.healthcare/ar/` Arabic (RTL)
- `https://gaf.healthcare/sw/` Swahili

Existing English routes are unchanged. A Russian doctor page is `/ru/doctors/[slug]`. Slugs stay English.

`src/proxy.ts` (Next.js 16) reads the language prefix, sets `x-gaf-locale`, and rewrites to the existing English route. English stays at the root. There is no `/en/` prefix.

Navigation, homepage chrome, footer and forms use built-in Russian, French, Arabic and Swahili catalogs. Doctor, hospital, cost-sheet and blog bodies stay English until those language editions are written separately. Google Cloud Translation is not used.

### Replit / production secrets

- `CMS_PASSWORD` — CMS desk password

```bash
npm test
```

Cost ranges on treatment pages are illustrative, not quotes. Radiation has a full EBRT (and 3D-CRT) guide. Surgical Oncology, Medical Oncology, Hematology, Pediatric Hematology, Cardiac Surgery, Pediatric Cardiac Surgery, Cardiology, Bariatric Surgery, Cosmetic Surgery, ENT, Gastroenterology, Surgical Gastroenterology, Urology, Spine Surgery, Pulmonology, Pediatric Orthopaedic, Orthopedics and Ophthalmology each have planning sheets. Shared transplant, CAR-T, TAVR/TAVI, Rhinoplasty, TORS, hepatectomy, gastrectomy, esophagectomy, sleeve gastrectomy, radical prostatectomy, partial nephrectomy and radical cystectomy slugs can sit under more than one specialty so pSEO can use either path. Bariatric / Metabolic Endoscopy is a Gastroenterology sheet; Endoscopic Sleeve Gastroplasty (ESG) remains on Bariatric Surgery. Gastric Bypass Surgery is a Surgical Gastroenterology slug; Roux-en-Y remains on Bariatric Surgery. Radical nephrectomy, PCNL, TURP, kidney transplant and reconstructive urology sit on Urology sheets. Fusion, ACDF, microdiscectomy, deformity correction, vertebroplasty and revision lists sit on Spine Surgery sheets. Bronchoscopy, EBUS, thoracoscopy, TBNA, cryo-biopsy and lung transplant sit on Pulmonology sheets; bronchoscopic foreign-body removal is a different slug from Gastroenterology’s ingested foreign-body sheet. Named pulmonologists are listed under country, city, specialty and procedure. Clubfoot, DDH, SCFE, limb lengthening and paediatric scoliosis sit on Pediatric Orthopaedic sheets; adult scoliosis remains on Spine Surgery. Named paediatric orthopaedic surgeons are listed under country, city, specialty and procedure. Knee and hip replacement, ACL, trauma, hand and foot-and-ankle sit on Orthopedics sheets; Tendon Repair is a different slug from paediatric Tendon Repair Surgery, and Fracture Fixation is a different slug from Pediatric Fracture Fixation. Named adult orthopaedic surgeons are listed under country, city, specialty and procedure. Cataract, LASIK, SMILE, ICL, cornea (including DMEK, DSEK, DALK and C3R), glaucoma, retina and oculoplastics sit on Ophthalmology sheets. Blepharoplasty keeps a shared slug with Cosmetic Surgery. Named ophthalmologists are listed under country, city, specialty and procedure. Dr Agarwals Eye Hospital and The Sight Avenue Eye Hospital in Delhi NCR are NABH eye campuses tagged for ophthalmology only. Laparoscopic, robotic, vaginal and abdominal hysterectomy, laparoscopic, robotic and hysteroscopic myomectomy, endometriosis surgery, hysteroscopic polypectomy, ovarian cyst surgery, oophorectomy, salpingo-oophorectomy, pelvic organ prolapse surgery, pelvic floor repair and gynecologic cancer surgery sit on Gynecology sheets. Radical hysterectomy keeps a shared slug with Surgical Oncology. Fibroids, endometriosis, adenomyosis, ovarian cysts, PCOS, uterine prolapse, cervical, ovarian and endometrial cancer sit as conditions on those sheets, not extra procedure slugs. Named gynecologists are listed under country, city, specialty and procedure. Brain tumour, glioma, meningioma, pituitary, skull base, endoscopic, aneurysm, AVM, stroke thrombectomy, cerebral bypass, DBS, epilepsy, hydrocephalus, ETV, Chiari and craniosynostosis sit on Neurosurgery sheets. Gamma Knife, CyberKnife and Stereotactic Radiosurgery (SRS) keep shared slugs with Radiation Oncology. Spinal tumour surgery keeps a shared slug with Spine Surgery. Skull base surgery keeps a shared slug with ENT. Named neurosurgeons are listed under country, city, specialty and procedure. EEG, video EEG, EMG, nerve conduction, evoked potentials, lumbar puncture, IV thrombolysis, TCD, carotid Doppler, MRgFUS, botulinum toxin therapy, plasmapheresis, IVIG, nerve and muscle biopsy, VNS, sleep study and migraine nerve block sit on Neurology sheets. Deep brain stimulation and stroke thrombectomy (mechanical thrombectomy) keep shared slugs with Neurosurgery. Named neurologists are listed under country, city, specialty and procedure. Hemodialysis, peritoneal dialysis, CRRT, SLED, dialysis catheters, AV fistula, access management, CAPD catheter, permcath, native and graft biopsy, paired kidney exchange and transplant evaluation sit on Nephrology sheets. Kidney transplantation, living-donor, deceased-donor and ABO-incompatible keep shared slugs with Urology. Plasmapheresis keeps a shared slug with Neurology. Named nephrologists are listed under country, city, specialty and procedure.

# Velora

Private medical travel atelier with four surfaces: **Doctors**, **Hospitals**, **Treatment Cost**, and **Blogs**. Specialties: **Radiation Oncology**, **Surgical Oncology**, **Medical Oncology**, **Hematology**, **Pediatric Hematology**, **Cardiac Surgery**, **Pediatric Cardiac Surgery**, **Cardiology**, **Bariatric Surgery**, **Cosmetic Surgery**, **ENT**, and **Gastroenterology**.

Doctors and hospitals are stored with denormalized **specialty**, **procedure**, **city**, and **country** slugs (`src/lib/taxonomy.ts`, `src/lib/doctors.ts`, `src/lib/hospitals.ts`) so programmatic SEO routes can be mounted later without rewriting the catalog:

- `/doctors/{country}/{city}/{specialty}/{procedure}`
- `/hospitals/{country}/{city}/{specialty}/{procedure}`

Those paths are not live yet. Directory pages already group by the same keys.

The India roster (1,060 consultants, 35 campuses) and structured fields were sourced from Ginger Healthcare’s public listings for [radiation oncology](https://ginger.healthcare/destinations/india/radiation-oncology/), [surgical oncology](https://ginger.healthcare/destinations/india/surgical-oncology/), [medical oncology](https://ginger.healthcare/destinations/india/medical-oncology/), [hematology](https://ginger.healthcare/destinations/india/hematology/), [pediatric hematology](https://ginger.healthcare/destinations/india/pediatric-hematology/), [cardiac surgery](https://ginger.healthcare/destinations/india/cardiac-surgery/), [pediatric cardiac surgery](https://ginger.healthcare/destinations/india/pediatric-cardiac-surgery/), [cardiology](https://ginger.healthcare/destinations/india/cardiology/), [bariatric surgery](https://ginger.healthcare/destinations/india/bariatric-surgery/), [cosmetic surgery](https://ginger.healthcare/destinations/india/cosmetic-surgery/), [ENT](https://ginger.healthcare/destinations/india/ent/), and [gastroenterology](https://ginger.healthcare/destinations/india/gastroenterology/). Bios on this site are original Velora copy. Portraits wait on CMS.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:43127](http://localhost:43127).

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.

The consult form posts to `/api/consult` and returns a reference number. There is no database in this slice — submissions are validated and acknowledged so the intake experience can be used end to end.

Cost ranges on treatment pages are illustrative, not quotes. Radiation has a full EBRT (and 3D-CRT) guide. Surgical Oncology, Medical Oncology, Hematology, Pediatric Hematology, Cardiac Surgery, Pediatric Cardiac Surgery, Cardiology, Bariatric Surgery, Cosmetic Surgery, ENT and Gastroenterology each have planning sheets. Shared transplant, CAR-T, TAVR/TAVI, Rhinoplasty and TORS slugs can sit under more than one specialty so pSEO can use either path. Bariatric / Metabolic Endoscopy is a Gastroenterology sheet; Endoscopic Sleeve Gastroplasty (ESG) remains on Bariatric Surgery.

# Velora

Private medical travel atelier with four surfaces: **Doctors**, **Hospitals**, **Treatment Cost**, and **Blogs**. Specialties: **Radiation Oncology**, **Surgical Oncology**, **Medical Oncology**, **Hematology**, **Pediatric Hematology**, **Cardiac Surgery**, **Pediatric Cardiac Surgery**, and **Cardiology**.

Doctors and hospitals are stored with denormalized **specialty**, **procedure**, **city**, and **country** slugs (`src/lib/taxonomy.ts`, `src/lib/doctors.ts`, `src/lib/hospitals.ts`) so programmatic SEO routes can be mounted later without rewriting the catalog:

- `/doctors/{country}/{city}/{specialty}/{procedure}`
- `/hospitals/{country}/{city}/{specialty}/{procedure}`

Those paths are not live yet. Directory pages already group by the same keys.

The India roster (463 consultants, 33 campuses) and structured fields were sourced from Ginger Healthcare’s public listings for [radiation oncology](https://ginger.healthcare/destinations/india/radiation-oncology/), [surgical oncology](https://ginger.healthcare/destinations/india/surgical-oncology/), [medical oncology](https://ginger.healthcare/destinations/india/medical-oncology/), [hematology](https://ginger.healthcare/destinations/india/hematology/), [pediatric hematology](https://ginger.healthcare/destinations/india/pediatric-hematology/), [cardiac surgery](https://ginger.healthcare/destinations/india/cardiac-surgery/), and [pediatric cardiac surgery](https://ginger.healthcare/destinations/india/pediatric-cardiac-surgery/). **Cardiology** is on the taxonomy and cost sheet (15 procedures; TAVR/TAVI shares the cardiac-surgery slug); named cardiologists wait on a listing URL. Bios on this site are original Velora copy. Portraits wait on CMS.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:43127](http://localhost:43127).

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.

The consult form posts to `/api/consult` and returns a reference number. There is no database in this slice — submissions are validated and acknowledged so the intake experience can be used end to end.

Cost ranges on treatment pages are illustrative, not quotes. Radiation has a full EBRT (and 3D-CRT) guide. Surgical Oncology, Medical Oncology, Hematology, Pediatric Hematology, Cardiac Surgery, Pediatric Cardiac Surgery and Cardiology each have planning sheets. Shared transplant, CAR-T and TAVR/TAVI slugs can sit under more than one specialty so pSEO can use either path.

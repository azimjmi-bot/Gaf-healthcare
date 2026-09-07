# Velora

Private medical travel atelier with four surfaces: **Doctors**, **Hospitals**, **Treatment Cost**, and **Blogs**. Specialties: **Radiation Oncology**, **Surgical Oncology**, **Medical Oncology**, **Hematology**, and **Pediatric Hematology**.

Doctors and hospitals are stored with denormalized **specialty**, **procedure**, **city**, and **country** slugs (`src/lib/taxonomy.ts`, `src/lib/doctors.ts`, `src/lib/hospitals.ts`) so programmatic SEO routes can be mounted later without rewriting the catalog:

- `/doctors/{country}/{city}/{specialty}/{procedure}`
- `/hospitals/{country}/{city}/{specialty}/{procedure}`

Those paths are not live yet. Directory pages already group by the same keys.

The India roster (345 consultants, 31 campuses) and structured fields were sourced from Ginger Healthcare’s public listings for [radiation oncology](https://ginger.healthcare/destinations/india/radiation-oncology/), [surgical oncology](https://ginger.healthcare/destinations/india/surgical-oncology/), [medical oncology](https://ginger.healthcare/destinations/india/medical-oncology/), [hematology](https://ginger.healthcare/destinations/india/hematology/), and [pediatric hematology](https://ginger.healthcare/destinations/india/pediatric-hematology/). Bios on this site are original Velora copy. Portraits wait on CMS.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:43127](http://localhost:43127).

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.

The consult form posts to `/api/consult` and returns a reference number. There is no database in this slice — submissions are validated and acknowledged so the intake experience can be used end to end.

Cost ranges on treatment pages are illustrative, not quotes. Radiation has a full EBRT (and 3D-CRT) guide. Surgical Oncology, Medical Oncology, Hematology and Pediatric Hematology each have planning sheets. Shared transplant and CAR-T slugs can sit under more than one specialty so pSEO can use either path.

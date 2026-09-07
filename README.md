# Velora

Private medical travel atelier with four surfaces: **Doctors**, **Hospitals**, **Treatment Cost**, and **Blogs**. Specialties: **Radiation Oncology** and **Surgical Oncology**.

Doctors and hospitals are stored with denormalized **specialty**, **procedure**, **city**, and **country** slugs (`src/lib/taxonomy.ts`, `src/lib/doctors.ts`, `src/lib/hospitals.ts`) so programmatic SEO routes can be mounted later without rewriting the catalog:

- `/doctors/{country}/{city}/{specialty}/{procedure}`
- `/hospitals/{country}/{city}/{specialty}/{procedure}`

Those paths are not live yet. Directory pages already group by the same keys.

The India roster (200 consultants, 27 campuses) and structured fields were sourced from Ginger Healthcare’s public listings for [radiation oncology](https://ginger.healthcare/destinations/india/radiation-oncology/) and [surgical oncology](https://ginger.healthcare/destinations/india/surgical-oncology/). Bios on this site are original Velora copy. Portraits wait on CMS.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:43127](http://localhost:43127).

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.

The consult form posts to `/api/consult` and returns a reference number. There is no database in this slice — submissions are validated and acknowledged so the intake experience can be used end to end.

Cost ranges on treatment pages are illustrative, not quotes. The External Beam Radiation Therapy (EBRT) page is a full guide (sessions, city costs, FAQs) with links into doctors, hospitals, related techniques, and planning blogs.

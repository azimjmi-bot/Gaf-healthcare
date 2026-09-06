# Velora

Private medical travel atelier with four surfaces: **Doctors**, **Hospitals**, **Treatment Cost**, and **Blogs**. Radiation oncology procedures only.

Doctors are stored with denormalized **specialty**, **procedure**, **city**, and **country** slugs (`src/lib/taxonomy.ts`, `src/lib/doctors.ts`) so programmatic SEO routes can be mounted later without rewriting the catalog.

The India radiation-oncology roster (70 consultants) and profile fields were sourced from [Ginger Healthcare’s public listing](https://ginger.healthcare/destinations/india/radiation-oncology/#doctors). Portraits and hospital photographs are loaded from that site’s media host.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:43127](http://localhost:43127).

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.

The consult form posts to `/api/consult` and returns a reference number. There is no database in this slice — submissions are validated and acknowledged so the intake experience can be used end to end.

Cost ranges on treatment pages are illustrative, not quotes. Velora is presented as a coordinator, not a hospital.

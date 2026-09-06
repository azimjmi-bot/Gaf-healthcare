# Velora

Private medical travel atelier. A premium site for matching patients with JCI-accredited hospitals in Seoul, Istanbul, Bangkok, Dubai, Singapore, and Mexico City.

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

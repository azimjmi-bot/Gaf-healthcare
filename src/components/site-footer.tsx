import Link from "next/link";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Plan",
    links: [
      { href: "/doctors", label: "Doctors" },
      { href: "/hospitals", label: "Hospitals" },
      { href: "/costs", label: "Treatment Cost" },
      { href: "/journey", label: "How it works" },
    ],
  },
  {
    title: "House",
    links: [
      { href: "/about", label: "The atelier" },
      { href: "/stories", label: "Patient stories" },
      { href: "/consult", label: "Request a dossier" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <p className="font-heading text-3xl tracking-[0.2em] uppercase">Velora</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/70">
            {site.tagline} A private medical travel atelier for patients who want
            accredited hospitals, named doctors, and a coordinator who stays on
            the line after you land.
          </p>
          <p className="mt-6 text-sm text-ivory/60">
            {site.email}
            <br />
            {site.phone}
            <br />
            {site.hours}
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <p className="eyebrow text-gold">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ivory/75 hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="md:col-span-3">
          <p className="eyebrow text-gold">Note</p>
          <p className="mt-4 text-sm leading-relaxed text-ivory/60">
            Velora is not a hospital and does not provide medical advice. Cost
            ranges are illustrative. Clinical decisions belong to you and the
            licensed physician you choose.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-ivory/45 md:flex-row md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Velora Atelier. All rights reserved.</p>
          <p>New York · London · Singapore</p>
        </div>
      </div>
    </footer>
  );
}

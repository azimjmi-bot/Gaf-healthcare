"use client";

import { LocaleLink as Link } from "@/components/locale-link";
import { useT } from "@/components/locale-provider";
import { usePathname } from "next/navigation";
import { GOOGLE_MAPS_URL, YOUTUBE_CHANNEL } from "@/data/home";
import { stripLocalePrefix } from "@/lib/i18n/path";
import { site } from "@/lib/site";

export function SiteFooter() {
  const pathname = stripLocalePrefix(usePathname() || "/").pathname;
  const t = useT();
  if (pathname.startsWith("/cms")) return null;
  const columns = [
    {
      title: t("footer.explore"),
      links: [
        { href: "/doctors", label: t("nav.doctors") },
        { href: "/hospitals", label: t("nav.hospitals") },
        { href: "/costs", label: t("nav.costs") },
        { href: "/blogs", label: t("nav.blogs") },
      ],
    },
  ];
  return (
    <footer className="border-t border-border bg-ink text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-5 md:grid-cols-12 md:gap-12 md:px-8 md:py-16">
        <div className="md:col-span-5">
          <p className="font-heading text-2xl tracking-[0.12em] uppercase md:text-3xl">GAF Healthcare</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/70">
            {site.tagline} {t("footer.tagline")}
          </p>
          <p className="mt-6 text-sm text-ivory/60">
            {site.email}
            <br />
            {site.phone}
            <br />
            {site.hours}
          </p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a href={YOUTUBE_CHANNEL} className="text-ivory/75 hover:text-ivory" target="_blank" rel="noreferrer">
              {t("footer.youtube")}
            </a>
            <a href={GOOGLE_MAPS_URL} className="text-ivory/75 hover:text-ivory" target="_blank" rel="noreferrer">
              {t("footer.reviews")}
            </a>
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
          <p className="eyebrow text-gold">{t("footer.note")}</p>
          <p className="mt-4 text-sm leading-relaxed text-ivory/60">{t("footer.disclaimer")}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-ivory/45 md:flex-row md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} GAF Healthcare. {t("footer.rights")}
          </p>
          <p>New York · London · Singapore</p>
        </div>
      </div>
    </footer>
  );
}

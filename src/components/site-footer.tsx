import logoLight from "@/assets/brand/gaf-healthcare-light.svg";
import Image from "next/image";
import Link from "next/link";
import { GOOGLE_MAPS_URL, YOUTUBE_CHANNEL } from "@/data/home";
import { SOURCE_LOCALE } from "@/lib/i18n/languages";
import { localizeMessages } from "@/lib/i18n/localize";
import type { LocaleSurface } from "@/lib/i18n/locale-availability";
import { UI_MESSAGE_FIELDS } from "@/lib/i18n/messages";
import { localePath } from "@/lib/i18n/path";
import { getRequestLocale, getRequestPath } from "@/lib/i18n/request";
import { surfaceIsAvailable } from "@/lib/i18n/surfaces";
import { site } from "@/lib/site";

export async function SiteFooter() {
  const locale = await getRequestLocale();
  const pathname = await getRequestPath();
  const messages = await localizeMessages(locale);
  if (pathname.startsWith("/cms")) return null;
  const t = (key: string) =>
    locale === SOURCE_LOCALE
      ? messages[key] || UI_MESSAGE_FIELDS[key] || key
      : messages[key] || "";
  const href = (path: string) => localePath(path, locale);
  const columns = [
    {
      title: t("footer.explore"),
      links: (
        [
          { href: "/specialties", label: t("nav.specialties"), surface: "specialties" },
          { href: "/doctors", label: t("nav.doctors"), surface: "doctors" },
          { href: "/hospitals", label: t("nav.hospitals"), surface: "hospitals" },
          { href: "/treatments", label: t("nav.treatments"), surface: "treatments" },
          { href: "/costs", label: t("nav.costs"), surface: "costs" },
          { href: "/blogs", label: t("nav.blogs"), surface: "blogs" },
        ] as const
      ).filter((link) => surfaceIsAvailable(locale, link.surface as LocaleSurface)),
    },
  ].filter((column) => column.links.length > 0);
  return (
    <footer className="border-t border-border bg-ink text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-5 md:grid-cols-12 md:gap-12 md:px-8 md:py-16">
        <div className="md:col-span-5">
          <Image
            src={logoLight}
            alt="GAF Healthcare"
            width={206}
            height={199}
            unoptimized
            className="h-16 w-auto md:h-20"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/70">
            {locale === "en" ? `${site.tagline} ` : null}
            {t("footer.tagline")}
          </p>
          <p className="mt-6 text-sm text-ivory/60">
            {site.email}
            <br />
            {site.phone}
            {locale === "en" ? (
              <>
                <br />
                {site.hours}
              </>
            ) : null}
          </p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a href={YOUTUBE_CHANNEL} className="text-gold-bright underline underline-offset-4 hover:text-ivory" target="_blank" rel="noreferrer">
              {t("footer.youtube")}
            </a>
            <a href={GOOGLE_MAPS_URL} className="text-gold-bright underline underline-offset-4 hover:text-ivory" target="_blank" rel="noreferrer">
              {t("footer.reviews")}
            </a>
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <p className="eyebrow text-gold-bright">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={href(l.href)} className="text-sm text-gold-bright underline underline-offset-4 hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="md:col-span-3">
          <p className="eyebrow text-gold-bright">{t("footer.note")}</p>
          <p className="mt-4 text-sm leading-relaxed text-ivory/60">{t("footer.disclaimer")}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-ivory/70 md:flex-row md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} GAF Healthcare. {t("footer.rights")}
          </p>
          <p>{t("footer.offices")}</p>
        </div>
      </div>
    </footer>
  );
}

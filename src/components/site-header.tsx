import { LanguageSwitcher } from "@/components/language-switcher";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { languageOptions } from "@/lib/i18n/language-options";
import { localizeMessages } from "@/lib/i18n/localize";
import { SOURCE_LOCALE } from "@/lib/i18n/languages";
import type { LocaleSurface } from "@/lib/i18n/locale-availability";
import { UI_MESSAGE_FIELDS } from "@/lib/i18n/messages";
import { localePath } from "@/lib/i18n/path";
import { getRequestLocale, getRequestPath } from "@/lib/i18n/request";
import { surfaceIsAvailable } from "@/lib/i18n/surfaces";

export async function SiteHeader() {
  const locale = await getRequestLocale();
  const pathname = await getRequestPath();
  const messages = await localizeMessages(locale);
  if (pathname.startsWith("/cms")) return null;
  const overlay = pathname === "/";
  const t = (key: string) =>
    locale === SOURCE_LOCALE
      ? messages[key] || UI_MESSAGE_FIELDS[key] || key
      : messages[key] || "";
  const href = (path: string) => localePath(path, locale);
  const links = (
    [
      { href: "/#destinations", label: t("nav.destinations"), surface: "hospitals" },
      { href: "/specialties", label: t("nav.specialties"), surface: "specialties" },
      { href: "/doctors", label: t("nav.doctors"), surface: "doctors" },
      { href: "/hospitals", label: t("nav.hospitals"), surface: "hospitals" },
      { href: "/treatments", label: t("nav.treatments"), surface: "treatments" },
      { href: "/costs", label: t("nav.costs"), surface: "costs" },
      { href: "/blogs", label: t("nav.blogs"), surface: "blogs" },
    ] as const
  ).filter((link) => surfaceIsAvailable(locale, link.surface as LocaleSurface));

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-50 text-white"
          : "sticky top-0 z-50 border-b border-border/80 bg-ivory/90 backdrop-blur-md"
      }
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 pt-[env(safe-area-inset-top)] sm:px-5 md:h-20 md:px-8">
        <Link href={href("/")} className="shrink-0" aria-label={t("a11y.home")}>
          <Image
            src={overlay ? "/brand/gaf-healthcare-light.svg" : "/brand/gaf-healthcare.svg"}
            alt="GAF Healthcare"
            width={206}
            height={199}
            priority
            unoptimized
            className="h-10 w-auto md:h-16"
          />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={href(l.href)}
                className={`text-[13px] tracking-wide transition-opacity hover:opacity-100 ${
                  active ? "opacity-100" : "opacity-70"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher
            className={overlay ? "text-white" : ""}
            locale={locale}
            options={languageOptions(pathname)}
            label={t("lang.label")}
          />
          <Link
            href={href("/consult")}
            className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:px-5"
          >
            <span className="md:hidden">{t("nav.consultShort")}</span>
            <span className="hidden md:inline">{t("nav.consult")}</span>
          </Link>
          <details className="site-menu lg:hidden">
            <summary className={overlay ? "text-white" : ""} aria-label={t("nav.menu")}>
              <Menu className="size-5" aria-hidden="true" />
            </summary>
            <div className="site-menu__panel">
              <p className="site-menu__brand">
                <Image
                  src="/brand/gaf-healthcare.svg"
                  alt="GAF Healthcare"
                  width={206}
                  height={199}
                  unoptimized
                  className="h-12 w-auto"
                />
              </p>
              <nav>
                {links.map((l) => (
                  <Link key={l.href} href={href(l.href)} className="site-menu__link">
                    {l.label}
                  </Link>
                ))}
                <Link href={href("/consult")} className="site-menu__consult">
                  {t("nav.dossier")}
                </Link>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

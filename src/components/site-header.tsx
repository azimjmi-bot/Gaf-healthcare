"use client";

import { LocaleLink as Link } from "@/components/locale-link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocale, useT } from "@/components/locale-provider";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { stripLocalePrefix } from "@/lib/i18n/path";
import {
  localeSurfaceIsAvailable,
  type LocaleSurface,
} from "@/lib/i18n/locale-availability";

export function SiteHeader() {
  const pathname = stripLocalePrefix(usePathname() || "/").pathname;
  const t = useT();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  if (pathname.startsWith("/cms")) return null;
  const overlay = pathname === "/";
  const links = [
    { href: "/#destinations", label: t("nav.destinations"), surface: "hospitals" },
    { href: "/specialties", label: t("nav.specialties"), surface: "specialties" },
    { href: "/doctors", label: t("nav.doctors"), surface: "doctors" },
    { href: "/hospitals", label: t("nav.hospitals"), surface: "hospitals" },
    { href: "/treatments", label: t("nav.treatments"), surface: "treatments" },
    { href: "/costs", label: t("nav.costs"), surface: "costs" },
    { href: "/blogs", label: t("nav.blogs"), surface: "blogs" },
  ].filter((link) =>
    localeSurfaceIsAvailable(locale, link.surface as LocaleSurface),
  );
  const consultAvailable = localeSurfaceIsAvailable(locale, "consult");

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-50 text-white"
          : "sticky top-0 z-50 border-b border-border/80 bg-ivory/90 backdrop-blur-md"
      }
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 pt-[env(safe-area-inset-top)] sm:px-5 md:h-20 md:px-8">
        <Link href="/" className="shrink-0" aria-label="GAF Healthcare — home">
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
                href={l.href}
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
          <LanguageSwitcher className={overlay ? "text-white" : ""} />
          {consultAvailable ? (
          <Button
            asChild
            className="h-10 rounded-full bg-primary px-3 text-sm text-primary-foreground hover:bg-primary/90 sm:px-5"
          >
            <Link href="/consult">
              <span className="md:hidden">{t("nav.consultShort")}</span>
              <span className="hidden md:inline">{t("nav.consult")}</span>
            </Link>
          </Button>
          ) : null}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`size-11 lg:hidden ${overlay ? "text-white hover:bg-white/10 hover:text-white" : ""}`}
                aria-label={t("nav.menu")}
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side={locale === "ar" ? "left" : "right"} className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle>
                  <Image
                    src="/brand/gaf-healthcare.svg"
                    alt="GAF Healthcare"
                    width={206}
                    height={199}
                    unoptimized
                    className="h-12 w-auto"
                  />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1 px-4">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center text-lg"
                  >
                    {l.label}
                  </Link>
                ))}
                {consultAvailable ? (
                <Button asChild className="mt-4 h-12 rounded-full">
                  <Link href="/consult" onClick={() => setOpen(false)}>
                    {t("nav.dossier")}
                  </Link>
                </Button>
                ) : null}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

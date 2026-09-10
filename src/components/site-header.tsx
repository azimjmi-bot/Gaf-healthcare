"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

const links = [
  { href: "/#destinations", label: "Destinations" },
  { href: "/doctors", label: "Doctors" },
  { href: "/hospitals", label: "Hospitals" },
  { href: "/costs", label: "Treatment Cost" },
  { href: "/blogs", label: "Blogs" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  if (pathname.startsWith("/cms")) return null;
  const overlay = pathname === "/";

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-50 text-white"
          : "sticky top-0 z-50 border-b border-border/80 bg-ivory/90 backdrop-blur-md"
      }
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link href="/" className="font-heading text-lg tracking-[0.12em] uppercase md:text-2xl">
          GAF Healthcare
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
        <div className="flex items-center gap-2">
          <Button
            asChild
            className={`hidden h-10 rounded-full px-5 text-sm md:inline-flex ${
              overlay
                ? "bg-white text-ink hover:bg-white/90"
                : "bg-primary text-primary-foreground"
            }`}
          >
            <Link href="/consult">Request a consult</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`lg:hidden ${overlay ? "text-white hover:bg-white/10 hover:text-white" : ""}`}
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle className="font-heading text-xl tracking-[0.12em] uppercase">
                  GAF Healthcare
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-5 px-4">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-lg"
                  >
                    {l.label}
                  </Link>
                ))}
                <Button asChild className="mt-4 h-11 rounded-full">
                  <Link href="/consult" onClick={() => setOpen(false)}>
                    Request a dossier
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

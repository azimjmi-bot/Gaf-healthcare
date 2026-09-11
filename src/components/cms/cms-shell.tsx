"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CMS_EDITION_COOKIE, CMS_EDITION_LABELS, CMS_EDITIONS, parseCmsEdition, type CmsEdition } from "@/lib/cms/edition";
import {
  Building2,
  FileText,
  FolderTree,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Settings,
  Stethoscope,
  Wallet,
} from "lucide-react";

const NAV = [
  { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cms/articles", label: "Articles", icon: FileText },
  { href: "/cms/doctors", label: "Doctors", icon: Stethoscope },
  { href: "/cms/hospitals", label: "Hospitals", icon: Building2 },
  { href: "/cms/costs", label: "Cost sheets", icon: Wallet },
  { href: "/cms/media", label: "Media", icon: ImageIcon },
  { href: "/cms/taxonomies", label: "Categories & tags", icon: FolderTree },
  { href: "/cms/settings", label: "Settings", icon: Settings },
];

function readEditionCookie(): CmsEdition {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${CMS_EDITION_COOKIE}=([^;]+)`));
  return parseCmsEdition(match?.[1] ? decodeURIComponent(match[1]) : undefined);
}

export function CmsShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [edition, setEdition] = useState<CmsEdition>("en");

  useEffect(() => {
    setEdition(readEditionCookie());
  }, []);

  async function switchEdition(next: CmsEdition) {
    setEdition(next);
    await fetch("/api/cms/edition", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ edition: next }),
    });
    router.refresh();
  }

  if (path === "/cms/login") {
    return <>{children}</>;
  }

  async function logout() {
    await fetch("/api/cms/logout", { method: "POST" });
    router.push("/cms/login");
    router.refresh();
  }

  return (
    <div className="cms-shell">
      <aside className="cms-nav">
        <p className="cms-nav__brand">GAF Healthcare desk</p>
        <p className="cms-nav__sub">{edition === "ar" ? "Arabic edition" : "English edition"}</p>
        <div className="cms-edition" role="group" aria-label="CMS language edition">
          {CMS_EDITIONS.map((code) => (
            <button
              key={code}
              type="button"
              className={edition === code ? "is-active" : undefined}
              onClick={() => switchEdition(code)}
            >
              {CMS_EDITION_LABELS[code]}
            </button>
          ))}
        </div>
        <nav>
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = item.href === "/cms" ? path === "/cms" : path.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={active ? "is-active" : undefined}>
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="cms-nav__foot">
          <Link href="/blogs" target="_blank">
            View public blogs
          </Link>
          <button type="button" onClick={logout}>
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      </aside>
      <div className="cms-main">{children}</div>
    </div>
  );
}

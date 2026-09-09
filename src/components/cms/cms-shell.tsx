"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, FolderTree, ImageIcon, LayoutDashboard, LogOut, Settings } from "lucide-react";

const NAV = [
  { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cms/articles", label: "Articles", icon: FileText },
  { href: "/cms/media", label: "Media", icon: ImageIcon },
  { href: "/cms/taxonomies", label: "Categories & tags", icon: FolderTree },
  { href: "/cms/settings", label: "Settings", icon: Settings },
];

export function CmsShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();

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
        <p className="cms-nav__brand">Velora desk</p>
        <p className="cms-nav__sub">Article CMS</p>
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

"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LocaleLink as Link } from "@/components/locale-link";
import { useLocale } from "@/components/locale-provider";
import { localePath, stripLocalePrefix } from "@/lib/i18n/path";

const STORAGE_KEY = "gaf-compare-doctors";
const MAX = 4;

function loadSlugs() {
  if (typeof window === "undefined") return [] as string[];
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]") as string[];
    return [...new Set(stored)].slice(0, MAX);
  } catch {
    return [];
  }
}

const CompareContext = createContext<{
  slugs: string[];
  toggle: (slug: string) => void;
}>({ slugs: [], toggle: () => undefined });

export function DoctorCompareProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  useEffect(() => {
    setSlugs(loadSlugs());
  }, []);
  const value = useMemo(
    () => ({
      slugs,
      toggle: (slug: string) => {
        setSlugs((current) => {
          const next = new Set(current);
          if (next.has(slug)) next.delete(slug);
          else if (next.size < MAX) next.add(slug);
          const list = [...next];
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(list));
          return list;
        });
      },
    }),
    [slugs],
  );
  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function DoctorCompareToggle({ slug }: { slug: string }) {
  const { slugs, toggle } = useContext(CompareContext);
  const selected = slugs.includes(slug);
  return (
    <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
      <input type="checkbox" checked={selected} onChange={() => toggle(slug)} className="size-4 accent-[var(--primary)]" />
      Add to compare
    </label>
  );
}

export function DoctorCompareTray() {
  const { slugs } = useContext(CompareContext);
  if (slugs.length === 0) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {slugs.length} specialist{slugs.length === 1 ? "" : "s"} selected (maximum {MAX}).
        </p>
        <Link
          href={`/doctors/compare?ids=${slugs.join(",")}`}
          className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Compare specialists
        </Link>
      </div>
    </div>
  );
}

export function DoctorHubExtraFilters({
  hospitals,
}: {
  hospitals: { slug: string; name: string; count: number }[];
}) {
  const router = useRouter();
  const locale = useLocale();
  const pathname = stripLocalePrefix(usePathname() || "/").pathname;
  const params = useSearchParams();
  const hospital = params.get("hospital") ?? "all";
  const experience = params.get("experience") ?? "all";

  function setFilter(key: string, value: string) {
    const query = new URLSearchParams(params.toString());
    query.delete("page");
    if (!value || value === "all") query.delete(key);
    else query.set(key, value);
    const href = query.toString() ? `${pathname}?${query}` : pathname;
    router.push(localePath(href, locale));
  }

  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <label className="text-sm">
        <span className="mb-1 block text-xs uppercase tracking-[0.16em] text-muted-foreground">Hospital</span>
        <select
          className="h-11 w-full rounded-full border border-border bg-white px-4 text-sm"
          value={hospital}
          onChange={(event) => setFilter("hospital", event.target.value)}
        >
          <option value="all">All listed hospitals</option>
          {hospitals.map((row) => (
            <option key={row.slug} value={row.slug}>
              {row.name} ({row.count})
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm">
        <span className="mb-1 block text-xs uppercase tracking-[0.16em] text-muted-foreground">Experience</span>
        <select
          className="h-11 w-full rounded-full border border-border bg-white px-4 text-sm"
          value={experience}
          onChange={(event) => setFilter("experience", event.target.value)}
        >
          <option value="all">All listed experience</option>
          <option value="10">10+ years</option>
          <option value="20">20+ years</option>
          <option value="30">30+ years</option>
        </select>
      </label>
    </div>
  );
}

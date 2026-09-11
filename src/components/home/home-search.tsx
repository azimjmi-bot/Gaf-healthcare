"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  catalogDestinations,
  catalogProceduresFor,
  catalogSpecialties,
} from "@/lib/catalog-options";
import { useLocale, useT } from "@/components/locale-provider";
import { localePath } from "@/lib/i18n/path";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";

const ALL = "all";

export function HomeSearch() {
  const router = useRouter();
  const locale = useLocale();
  const t = useT();
  const [destination, setDestination] = useState(ALL);
  const [specialty, setSpecialty] = useState(ALL);
  const [procedure, setProcedure] = useState(ALL);
  const procedures = useMemo(() => catalogProceduresFor(specialty === ALL ? undefined : specialty), [specialty]);

  function onSpecialty(value: string) {
    setSpecialty(value);
    if (value === ALL || !catalogProceduresFor(value).includes(procedure)) setProcedure(ALL);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams();
    if (destination !== ALL) q.set("destination", destination);
    if (specialty !== ALL) q.set("specialty", specialty);
    if (procedure !== ALL) q.set("procedure", procedure);
    const qs = q.toString();
    router.push(localePath(qs ? `/doctors?${qs}` : "/doctors", locale));
  }

  return (
    <form className="home-search" onSubmit={onSubmit}>
      <label>
        <span className="sr-only">{t("home.searchDestination")}</span>
        <select value={destination} onChange={(e) => setDestination(e.target.value)}>
          <option value={ALL}>{t("home.searchDestination")}</option>
          {catalogDestinations.map((name) => (
            <option key={name} value={name}>
              {taxonomyLabel(name, locale)}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="sr-only">{t("home.searchSpecialty")}</span>
        <select value={specialty} onChange={(e) => onSpecialty(e.target.value)}>
          <option value={ALL}>{t("home.searchSpecialty")}</option>
          {catalogSpecialties.map((name) => (
            <option key={name} value={name}>
              {taxonomyLabel(name, locale)}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="sr-only">{t("home.searchProcedure")}</span>
        <select value={procedure} onChange={(e) => setProcedure(e.target.value)}>
          <option value={ALL}>{t("home.searchProcedure")}</option>
          {procedures.map((name) => (
            <option key={name} value={name}>
              {taxonomyLabel(name, locale)}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="home-search__go">
        <span className="md:hidden">{t("home.searchGoShort")}</span>
        <span className="hidden md:inline">{t("home.searchGo")}</span>
      </button>
    </form>
  );
}

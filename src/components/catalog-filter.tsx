"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  catalogDestinations,
  catalogProceduresFor,
  catalogSpecialties,
  citiesForDestination,
  parseCatalogQuery,
  type CatalogEntity,
  type CatalogQuery,
  type CityChipStats,
} from "@/lib/catalog-options";
import {
  parsePrettyCatalogPathname,
  prettyCatalogPath,
  type CatalogBasePath,
} from "@/lib/pretty-catalog-path";
import { useLocale, useT } from "@/components/locale-provider";
import { localePath, stripLocalePrefix } from "@/lib/i18n/path";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { localeDir } from "@/lib/i18n/languages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL = "all";

type Props = {
  basePath: CatalogBasePath;
  resultCount: number;
  resultLabel: string;
  entity: CatalogEntity;
  query?: CatalogQuery;
  chipStats?: CityChipStats | null;
};

function currentQuery(pathname: string, params: URLSearchParams, fallback?: CatalogQuery): CatalogQuery {
  const fromPath = parsePrettyCatalogPathname(pathname);
  if (fromPath && (fromPath.destination || fromPath.city || fromPath.specialty || fromPath.procedure)) {
    return fromPath;
  }
  const fromSearch = parseCatalogQuery({
    destination: params.get("destination") ?? undefined,
    city: params.get("city") ?? undefined,
    specialty: params.get("specialty") ?? undefined,
    procedure: params.get("procedure") ?? undefined,
  });
  if (fromSearch.destination || fromSearch.city || fromSearch.specialty || fromSearch.procedure) {
    return fromSearch;
  }
  return fallback ?? {};
}

export function CatalogFilter({ basePath, resultCount, resultLabel, query, chipStats }: Props) {
  const router = useRouter();
  const pathname = stripLocalePrefix(usePathname() || "/").pathname;
  const params = useSearchParams();
  const locale = useLocale();
  const t = useT();
  const active = currentQuery(pathname, params, query);
  const destination = active.destination ?? ALL;
  const city = active.city ?? ALL;
  const specialty = active.specialty ?? ALL;
  const procedure = active.procedure ?? ALL;
  const cities = citiesForDestination(destination === ALL ? undefined : destination);
  const procedureOptions = catalogProceduresFor(specialty === ALL ? undefined : specialty);

  function setFilter(key: keyof CatalogQuery, value: string) {
    const next: CatalogQuery = {
      destination: destination === ALL ? undefined : destination,
      city: city === ALL ? undefined : city,
      specialty: specialty === ALL ? undefined : specialty,
      procedure: procedure === ALL ? undefined : procedure,
    };
    if (!value || value === ALL) delete next[key];
    else next[key] = value;
    if (key === "destination") delete next.city;
    if (key === "specialty") {
      const allowed = catalogProceduresFor(next.specialty);
      if (next.procedure && !allowed.includes(next.procedure)) delete next.procedure;
    }
    router.push(localePath(prettyCatalogPath(basePath, next), locale), { scroll: false });
  }

  return (
    <div className="relative z-20 -mt-8 md:-mt-10">
      <div className="rounded-2xl border border-border/80 bg-white p-3 shadow-[0_12px_40px_-18px_rgba(20,24,40,0.28)] md:p-4">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect
            value={destination}
            onChange={(v) => setFilter("destination", v)}
            placeholder={t("filter.destinations")}
            options={catalogDestinations}
            allLabel={t("filter.destinations")}
            locale={locale}
          />
          <FilterSelect
            value={city}
            onChange={(v) => setFilter("city", v)}
            placeholder={t("filter.cities")}
            options={cities}
            allLabel={t("filter.cities")}
            locale={locale}
          />
          <FilterSelect
            value={specialty}
            onChange={(v) => setFilter("specialty", v)}
            placeholder={t("filter.specialities")}
            options={catalogSpecialties}
            allLabel={t("filter.specialities")}
            locale={locale}
          />
          <FilterSelect
            value={procedure}
            onChange={(v) => setFilter("procedure", v)}
            placeholder={t("filter.procedures")}
            options={procedureOptions}
            allLabel={t("filter.procedures")}
            locale={locale}
          />
        </div>
        {chipStats ? (
          <div className="catalog-chips mt-3">
            <CityChip
              active={city === ALL}
              onClick={() => setFilter("city", ALL)}
              label={`${t("filter.allCities")} (${chipStats.total})`}
            />
            {citiesForDestination("India").map((name) => (
              <CityChip
                key={name}
                active={city === name}
                onClick={() => setFilter("city", name)}
                label={`${taxonomyLabel(name, locale)} (${chipStats.counts[name] ?? 0})`}
              />
            ))}
          </div>
        ) : null}
      </div>
      <p className="mt-3 px-1 text-sm text-muted-foreground">
        {resultCount} {resultLabel} {t("filter.matching")}
      </p>
    </div>
  );
}

function CityChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-11 shrink-0 rounded-full px-4 py-2 text-sm transition ${
        active
          ? "bg-ink text-ivory"
          : "border border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function FilterSelect({
  value,
  onChange,
  placeholder,
  options,
  allLabel,
  locale,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: string[];
  allLabel: string;
  locale: ReturnType<typeof useLocale>;
}) {
  const dir = localeDir(locale);
  return (
    <Select value={value} onValueChange={onChange} dir={dir}>
      <SelectTrigger
        size="default"
        dir={dir}
        className="h-11 w-full rounded-lg border-border bg-white px-3 text-sm text-foreground shadow-none"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper" align="start" dir={dir} className="rounded-xl p-1 shadow-lg">
        <SelectItem
          value={ALL}
          className="rounded-md py-2 pl-2.5 pr-8 focus:bg-primary focus:text-primary-foreground"
        >
          {allLabel}
        </SelectItem>
        {options.map((opt) => (
          <SelectItem
            key={opt}
            value={opt}
            className="rounded-md py-2 pl-2.5 pr-8 focus:bg-primary focus:text-primary-foreground"
          >
            {taxonomyLabel(opt, locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

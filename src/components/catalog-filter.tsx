"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  catalogDestinations,
  catalogProceduresFor,
  catalogSpecialties,
  citiesForDestination,
  cityResultCounts,
  parseCatalogQuery,
  type CatalogEntity,
} from "@/lib/catalog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL = "all";

type Props = {
  basePath: string;
  resultCount: number;
  resultLabel: string;
  entity: CatalogEntity;
};

export function CatalogFilter({ basePath, resultCount, resultLabel, entity }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const destination = params.get("destination") ?? ALL;
  const city = params.get("city") ?? ALL;
  const specialty = params.get("specialty") ?? ALL;
  const procedure = params.get("procedure") ?? ALL;
  const cities = citiesForDestination(destination === ALL ? undefined : destination);
  const procedureOptions = catalogProceduresFor(specialty === ALL ? undefined : specialty);
  const indiaSelected = destination === "India";
  const chipStats = indiaSelected
    ? cityResultCounts(entity, parseCatalogQuery({ destination, specialty, procedure }))
    : null;

  function setFilter(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (!value || value === ALL) next.delete(key);
    else next.set(key, value);
    if (key === "destination") next.delete("city");
    if (key === "specialty") {
      const nextSpecialty = !value || value === ALL ? undefined : value;
      const allowed = catalogProceduresFor(nextSpecialty);
      const currentProcedure = next.get("procedure");
      if (currentProcedure && !allowed.includes(currentProcedure)) next.delete("procedure");
    }
    next.delete("condition");
    next.delete("page");
    const qs = next.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
  }

  return (
    <div className="relative z-20 -mt-8 md:-mt-10">
      <div className="rounded-2xl border border-border/80 bg-white p-3 shadow-[0_12px_40px_-18px_rgba(20,24,40,0.28)] md:p-4">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect
            value={destination}
            onChange={(v) => setFilter("destination", v)}
            placeholder="All Destinations"
            options={catalogDestinations}
            allLabel="All Destinations"
          />
          <FilterSelect
            value={city}
            onChange={(v) => setFilter("city", v)}
            placeholder="All Cities"
            options={cities}
            allLabel="All Cities"
          />
          <FilterSelect
            value={specialty}
            onChange={(v) => setFilter("specialty", v)}
            placeholder="All Specialities"
            options={catalogSpecialties}
            allLabel="All Specialities"
          />
          <FilterSelect
            value={procedure}
            onChange={(v) => setFilter("procedure", v)}
            placeholder="All Procedures"
            options={procedureOptions}
            allLabel="All Procedures"
          />
        </div>
        {chipStats ? (
          <div className="mt-3 flex flex-wrap gap-2">
            <CityChip
              active={city === ALL}
              onClick={() => setFilter("city", ALL)}
              label={`All Cities (${chipStats.total})`}
            />
            {citiesForDestination("India").map((name) => (
              <CityChip
                key={name}
                active={city === name}
                onClick={() => setFilter("city", name)}
                label={`${name} (${chipStats.counts[name] ?? 0})`}
              />
            ))}
          </div>
        ) : null}
      </div>
      <p className="mt-3 px-1 text-sm text-muted-foreground">
        {resultCount} {resultLabel} matching your filters
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
      className={`rounded-full px-4 py-2 text-sm transition ${
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
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: string[];
  allLabel: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        size="default"
        className="h-11 w-full rounded-lg border-border bg-white px-3 text-sm text-foreground shadow-none"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper" align="start" className="rounded-xl p-1 shadow-lg">
        <SelectItem
          value={ALL}
          className="rounded-md py-2 pl-2.5 pr-8 focus:bg-sky-500 focus:text-white"
        >
          {allLabel}
        </SelectItem>
        {options.map((opt) => (
          <SelectItem
            key={opt}
            value={opt}
            className="rounded-md py-2 pl-2.5 pr-8 focus:bg-sky-500 focus:text-white"
          >
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

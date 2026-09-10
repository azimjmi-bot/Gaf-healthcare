"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  catalogDestinations,
  catalogProceduresFor,
  catalogSpecialties,
} from "@/lib/catalog";

const ALL = "all";

export function HomeSearch() {
  const router = useRouter();
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
    router.push(qs ? `/doctors?${qs}` : "/doctors");
  }

  return (
    <form className="home-search" onSubmit={onSubmit}>
      <label>
        <span className="sr-only">Destination</span>
        <select value={destination} onChange={(e) => setDestination(e.target.value)}>
          <option value={ALL}>Destination</option>
          {catalogDestinations.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="sr-only">Specialty</span>
        <select value={specialty} onChange={(e) => onSpecialty(e.target.value)}>
          <option value={ALL}>Specialty</option>
          {catalogSpecialties.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="sr-only">Procedure</span>
        <select value={procedure} onChange={(e) => setProcedure(e.target.value)}>
          <option value={ALL}>Procedure</option>
          {procedures.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="home-search__go">
        <span className="md:hidden">Find specialists</span>
        <span className="hidden md:inline">Advanced Care A Click Away</span>
      </button>
    </form>
  );
}

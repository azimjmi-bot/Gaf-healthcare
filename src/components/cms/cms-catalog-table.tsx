"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CatalogRow } from "@/lib/cms/catalog-types";

export type { CatalogRow };

export function CmsCatalogTable({
  entity,
  rows,
}: {
  entity: "doctors" | "hospitals" | "treatments";
  rows: CatalogRow[];
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [trash, setTrash] = useState(false);
  const shown = useMemo(() => {
    return rows.filter((row) => {
      if (Boolean(row.deleted) !== trash) return false;
      const hay = `${row.name} ${row.slug} ${row.city ?? ""} ${row.specialty ?? ""} ${row.hospitalName ?? ""} ${row.category ?? ""}`.toLowerCase();
      return hay.includes(q.toLowerCase());
    });
  }, [q, rows, trash]);

  async function remove(slug: string) {
    await fetch(`/api/cms/catalog/${entity}/${slug}`, { method: "DELETE" });
    router.refresh();
  }
  async function restore(slug: string) {
    await fetch(`/api/cms/catalog/${entity}/${slug}/restore`, { method: "POST" });
    router.refresh();
  }

  return (
    <div>
      <div className="cms-filters">
        <Input value={q} placeholder="Search" onChange={(e) => setQ(e.target.value)} />
        <label className="cms-check">
          <input type="checkbox" checked={trash} onChange={(e) => setTrash(e.target.checked)} />
          Show removed
        </label>
      </div>
      <p className="cms-muted">{shown.length} shown</p>
      <table className="cms-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>{entity === "treatments" ? "Category" : "Place"}</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {shown.slice(0, 80).map((row) => (
            <tr key={row.slug}>
              <td>
                <Link href={entity === "treatments" ? `/cms/costs/${row.slug}` : `/cms/${entity}/${row.slug}`}>
                  {row.name}
                </Link>
                <div className="cms-muted">
                  /{row.slug}
                  {row.added ? " · added in CMS" : ""}
                  {row.deleted ? " · removed" : ""}
                </div>
              </td>
              <td>{row.hospitalName || row.city || row.category || row.specialty}</td>
              <td className="cms-row-actions">
                {row.deleted ? (
                  <>
                    <Button size="xs" variant="outline" type="button" onClick={() => restore(row.slug)}>
                      Restore
                    </Button>
                    <Button size="xs" variant="destructive" type="button" onClick={() => remove(row.slug)}>
                      Delete forever
                    </Button>
                  </>
                ) : (
                  <Button size="xs" variant="outline" type="button" onClick={() => remove(row.slug)}>
                    Remove
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {shown.length > 80 ? <p className="cms-muted">Narrow the search to see the rest.</p> : null}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CMS_EDITIONS, CMS_EDITION_LABELS } from "@/lib/cms/edition";
import type { CuratedTreatment } from "@/lib/cms/curated-treatment-types";

export function CmsCuratedTreatmentTable({
  treatments,
}: {
  treatments: CuratedTreatment[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const rows = useMemo(
    () =>
      treatments.filter((row) => {
        if (status !== "all" && row.status !== status) return false;
        const names = Object.values(row.translations)
          .map((translation) => translation?.name ?? "")
          .join(" ");
        return `${row.baseName} ${row.slug} ${names}`
          .toLowerCase()
          .includes(query.toLowerCase());
      }),
    [query, status, treatments],
  );

  async function archive(id: string) {
    if (!window.confirm("Archive this Treatment?")) return;
    await fetch(`/api/cms/curated-treatments/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <div className="cms-filters">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search Treatments"
        />
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      <div className="cms-table-wrap">
        <table className="cms-table">
          <thead>
            <tr>
              <th>Treatment</th>
              <th>Core status</th>
              {CMS_EDITIONS.map((locale) => (
                <th key={locale} title={CMS_EDITION_LABELS[locale]}>
                  {locale.toUpperCase()}
                </th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8}>No Treatments in this view.</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <Link href={`/cms/treatments/${row.id}`}>
                      {row.baseName || row.translations.en?.name || "Untitled"}
                    </Link>
                    <div className="cms-muted">/treatments/{row.slug}</div>
                  </td>
                  <td>
                    <span data-cms-status={row.status}>{row.status}</span>
                  </td>
                  {CMS_EDITIONS.map((locale) => {
                    const translationStatus =
                      row.translations[locale]?.status ?? "missing";
                    return (
                      <td key={locale}>
                        <span data-cms-status={translationStatus}>
                          {translationStatus}
                        </span>
                      </td>
                    );
                  })}
                  <td>
                    <Button
                      type="button"
                      size="xs"
                      variant="outline"
                      onClick={() => archive(row.id)}
                    >
                      Archive
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

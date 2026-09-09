"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function CmsNewTreatment({
  procedures,
}: {
  procedures: { slug: string; name: string }[];
}) {
  const router = useRouter();
  const [procedure, setProcedure] = useState(procedures[0]?.slug || "");
  const [summary, setSummary] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function create() {
    setBusy(true);
    const res = await fetch("/api/cms/catalog/treatments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ procedure, summary }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setMessage(data.error || "Could not add cost sheet.");
      return;
    }
    router.replace(`/cms/costs/${data.slug}`);
  }

  if (procedures.length === 0) {
    return (
      <p className="cms-muted">
        Every taxonomy procedure already has a cost sheet. Edit an existing sheet instead of adding a
        new slug.
      </p>
    );
  }

  return (
    <div className="cms-form">
      <label>
        Procedure (existing taxonomy)
        <select value={procedure} onChange={(e) => setProcedure(e.target.value)}>
          {procedures.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Summary
        <Textarea value={summary} rows={6} onChange={(e) => setSummary(e.target.value)} />
      </label>
      {message ? <p className="cms-flash">{message}</p> : null}
      <Button type="button" disabled={busy || !procedure} onClick={() => void create()}>
        Add cost sheet
      </Button>
    </div>
  );
}

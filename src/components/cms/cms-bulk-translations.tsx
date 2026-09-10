"use client";

import { useEffect, useState } from "react";
import { TARGET_LOCALES } from "@/lib/i18n/languages";

type Inventory = {
  doctors: number;
  hospitals: number;
  costs: number;
  blogs: number;
  pages: number;
  ui: number;
  eligibleJobs: number;
};

type Job = {
  status: string;
  total: number;
  completed: number;
  failed: number;
  skipped: number;
  lastError: string | null;
} | null;

export function CmsBulkTranslations() {
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [job, setJob] = useState<Job>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    const res = await fetch("/api/cms/translations");
    const data = await res.json();
    setInventory(data.inventory || null);
    setJob(data.job || null);
  }

  useEffect(() => {
    void load();
    const timer = setInterval(() => void load(), 4000);
    return () => clearInterval(timer);
  }, []);

  async function start(sourceTypes?: string[]) {
    setBusy(true);
    await fetch("/api/cms/translations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "bulk", sourceTypes, languages: TARGET_LOCALES }),
    });
    await load();
    setBusy(false);
  }

  async function cancel() {
    await fetch("/api/cms/translations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "cancel-bulk" }),
    });
    await load();
  }

  if (!inventory) return <p className="cms-muted">Loading eligible content counts…</p>;

  return (
    <div>
      <ul className="cms-stats">
        <li>
          <strong>{inventory.doctors}</strong>
          Eligible doctors
        </li>
        <li>
          <strong>{inventory.hospitals}</strong>
          Eligible hospitals
        </li>
        <li>
          <strong>{inventory.costs}</strong>
          Eligible treatment cost sheets
        </li>
        <li>
          <strong>{inventory.blogs}</strong>
          Eligible published blogs
        </li>
      </ul>
      <p className="cms-muted">
        Target languages: Russian, French, Arabic, Swahili. Current translations are skipped. This job does not
        start until you press a button. Worst-case job size: {inventory.eligibleJobs} documents.
      </p>
      {job ? (
        <p>
          Bulk job: {job.status}. {job.completed} of {job.total} translated, {job.skipped} skipped, {job.failed}{" "}
          failed.
          {job.lastError ? ` Last error: ${job.lastError}` : ""}
        </p>
      ) : (
        <p className="cms-muted">No bulk job has been started.</p>
      )}
      <p style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <button type="button" className="cms-btn" disabled={busy || job?.status === "running"} onClick={() => start(["ui", "page", "blog"])}>
          Translate UI, pages and blogs
        </button>
        <button type="button" className="cms-btn" disabled={busy || job?.status === "running"} onClick={() => start(["hospital"])}>
          Translate hospitals
        </button>
        <button type="button" className="cms-btn" disabled={busy || job?.status === "running"} onClick={() => start(["cost"])}>
          Translate cost sheets
        </button>
        <button type="button" className="cms-btn" disabled={busy || job?.status === "running"} onClick={() => start(["doctor"])}>
          Translate doctors
        </button>
        <button type="button" className="cms-btn" disabled={busy || job?.status === "running"} onClick={() => start()}>
          Translate all eligible content
        </button>
        {job?.status === "running" ? (
          <button type="button" className="cms-btn" onClick={() => cancel()}>
            Cancel bulk job
          </button>
        ) : null}
      </p>
    </div>
  );
}

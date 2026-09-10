"use client";

import { useEffect, useState } from "react";
import { LANGUAGE_LABELS, TARGET_LOCALES, type TargetLocale } from "@/lib/i18n/languages";

type Row = {
  language: TargetLocale;
  state: string;
  status: string | null;
  errorMessage: string | null;
};

export function CmsTranslationPanel({
  sourceType,
  sourceId,
}: {
  sourceType: string;
  sourceId: string;
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch(`/api/cms/translations?sourceType=${sourceType}&sourceId=${encodeURIComponent(sourceId)}`);
    const data = await res.json();
    setRows(data.languages || []);
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceType, sourceId]);

  async function run(action: string, language?: TargetLocale) {
    setBusy(language || action);
    setMessage("");
    const res = await fetch("/api/cms/translations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, sourceType, sourceId, language, force: action === "regenerate" }),
    });
    const data = await res.json();
    if (!res.ok) setMessage(data.error || "Failed");
    if (data.languages) setRows(data.languages);
    else await load();
    setBusy(null);
  }

  return (
    <section className="cms-panel" style={{ marginTop: "1.5rem" }}>
      <h2>Translations</h2>
      <p className="cms-muted">English is the source. Google is called only for missing, outdated, or forced regeneration.</p>
      <table className="cms-table">
        <thead>
          <tr>
            <th>Language</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>English</td>
            <td>Published / source</td>
            <td></td>
          </tr>
          {TARGET_LOCALES.map((language) => {
            const row = rows.find((item) => item.language === language);
            const state = row?.state || "missing";
            return (
              <tr key={language}>
                <td>{LANGUAGE_LABELS[language]}</td>
                <td>
                  {state}
                  {row?.errorMessage ? ` — ${row.errorMessage}` : ""}
                </td>
                <td>
                  {state === "current" ? (
                    <button type="button" className="cms-btn" disabled={busy === language} onClick={() => run("regenerate", language)}>
                      Regenerate {LANGUAGE_LABELS[language]}
                    </button>
                  ) : (
                    <button type="button" className="cms-btn" disabled={!!busy} onClick={() => run(state === "failed" ? "regenerate" : "translate", language)}>
                      {state === "failed" ? "Retry" : "Translate"} {LANGUAGE_LABELS[language]}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        <button type="button" className="cms-btn" disabled={!!busy} onClick={() => run("translate-all")}>
          Translate All
        </button>
      </p>
      {message ? <p className="cms-muted">{message}</p> : null}
    </section>
  );
}

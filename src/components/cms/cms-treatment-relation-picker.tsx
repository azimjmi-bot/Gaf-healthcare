"use client";

import { useEffect, useMemo, useState } from "react";

export type TreatmentRelationChoice = {
  value: string;
  label: string;
  meta?: string;
};

export function CmsTreatmentRelationPicker({
  kind,
  label,
  values,
  initialChoices,
  onChange,
}: {
  kind: "doctors" | "hospitals" | "costs" | "related";
  label: string;
  values: string[];
  initialChoices: TreatmentRelationChoice[];
  onChange: (values: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TreatmentRelationChoice[]>([]);
  const [known, setKnown] = useState(initialChoices);
  const selected = useMemo(() => new Set(values), [values]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      fetch(
        `/api/cms/curated-treatments/relations?kind=${kind}&q=${encodeURIComponent(query)}`,
        { signal: controller.signal },
      )
        .then((response) => response.json())
        .then((rows: TreatmentRelationChoice[]) => {
          setResults(Array.isArray(rows) ? rows : []);
          setKnown((current) => [
            ...new Map(
              [...current, ...(Array.isArray(rows) ? rows : [])].map((row) => [
                row.value,
                row,
              ]),
            ).values(),
          ]);
        })
        .catch(() => undefined);
    }, 220);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [kind, query]);

  const selectedChoices = values.map(
    (value) =>
      known.find((choice) => choice.value === value) ?? {
        value,
        label: value,
      },
  );

  function toggle(value: string) {
    onChange(
      selected.has(value)
        ? values.filter((item) => item !== value)
        : [...values, value],
    );
  }

  return (
    <fieldset className="cms-relation-picker">
      <legend>{label}</legend>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={`Search ${label.toLowerCase()}…`}
        aria-label={`Search ${label.toLowerCase()}`}
      />
      {selectedChoices.length > 0 ? (
        <div className="cms-relation-picker__selected">
          {selectedChoices.map((choice) => (
            <button
              key={choice.value}
              type="button"
              onClick={() => toggle(choice.value)}
              title="Remove relationship"
            >
              {choice.label} ×
            </button>
          ))}
        </div>
      ) : (
        <p className="cms-muted">None selected.</p>
      )}
      {results.length > 0 ? (
        <div className="cms-relation-picker__results">
          {results.map((choice) => (
            <label key={choice.value}>
              <input
                type="checkbox"
                checked={selected.has(choice.value)}
                onChange={() => toggle(choice.value)}
              />
              <span>
                <strong>{choice.label}</strong>
                {choice.meta ? <small>{choice.meta}</small> : null}
              </span>
            </label>
          ))}
        </div>
      ) : query.trim().length >= 2 ? (
        <p className="cms-muted">No matching records.</p>
      ) : null}
    </fieldset>
  );
}

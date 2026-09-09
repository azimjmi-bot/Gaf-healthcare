"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CmsTaxonomyForm({
  categories,
  tags,
}: {
  categories: string[];
  tags: string[];
}) {
  const [cats, setCats] = useState(categories.join("\n"));
  const [tagList, setTagList] = useState(tags.join("\n"));
  const [message, setMessage] = useState("");

  async function save() {
    const res = await fetch("/api/cms/taxonomies", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categories: cats.split("\n").map((s) => s.trim()).filter(Boolean),
        tags: tagList.split("\n").map((s) => s.trim()).filter(Boolean),
      }),
    });
    const data = await res.json();
    setMessage(res.ok ? "Saved categories and tags." : data.error || "Save failed.");
  }

  return (
    <div className="cms-two">
      <label>
        Categories (one per line)
        <textarea className="cms-plain" value={cats} onChange={(e) => setCats(e.target.value)} rows={12} />
      </label>
      <label>
        Tags (one per line)
        <textarea className="cms-plain" value={tagList} onChange={(e) => setTagList(e.target.value)} rows={12} />
      </label>
      {message ? <p className="cms-flash">{message}</p> : null}
      <Button type="button" onClick={() => void save()}>
        Save taxonomies
      </Button>
    </div>
  );
}

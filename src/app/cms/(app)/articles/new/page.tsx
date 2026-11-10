"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CmsNewArticlePage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function create() {
    setError("");
    try {
      const res = await fetch("/api/cms/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      const data = await res.json();
      if (res.ok && data.id) {
        router.replace(`/cms/articles/${data.id}`);
      } else {
        setError(data?.error || "Could not create article. Try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
  }

  useEffect(() => {
    void create();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="cms-page">
      {error ? (
        <div>
          <p className="cms-flash">{error}</p>
          <Button onClick={create}>Try again</Button>
        </div>
      ) : (
        <p className="cms-muted">Opening a new draft…</p>
      )}
    </div>
  );
}

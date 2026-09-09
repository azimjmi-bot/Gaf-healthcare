"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CmsNewArticlePage() {
  const router = useRouter();
  useEffect(() => {
    let gone = false;
    fetch("/api/cms/articles", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" })
      .then((r) => r.json())
      .then((article) => {
        if (!gone && article.id) router.replace(`/cms/articles/${article.id}`);
      });
    return () => {
      gone = true;
    };
  }, [router]);
  return (
    <div className="cms-page">
      <p>Opening a new draft…</p>
    </div>
  );
}

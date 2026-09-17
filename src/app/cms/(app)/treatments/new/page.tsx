"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CmsNewCuratedTreatmentPage() {
  const router = useRouter();
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let active = true;
    fetch("/api/cms/curated-treatments", { method: "POST" })
      .then((response) => response.json())
      .then((treatment) => {
        if (active && treatment.id) {
          router.replace(`/cms/treatments/${treatment.id}`);
        }
      });
    return () => {
      active = false;
    };
  }, [router]);
  return (
    <div className="cms-page">
      <p>Opening a new Treatment draft…</p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function CostStickyBar({
  label,
  range,
  href,
}: {
  label: string;
  range: string;
  href: string;
}) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".cost-hero");
    if (!hero || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setOn(!entry.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className={`cost-sticky ${on ? "is-on" : ""}`} hidden={!on}>
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-2">
          <p className="min-w-0">
            <span className="block truncate text-sm font-medium">{label}</span>
            <span className="font-heading text-xl">{range}</span>
          </p>
          <Link href={href} className="cost-btn cost-btn--primary shrink-0" tabIndex={on ? 0 : -1}>
            Get Exact Cost
          </Link>
        </div>
      </div>
      <div className="cost-dock">
        <Link href={href} className="cost-btn cost-btn--primary w-full">
          Get Exact Cost →
        </Link>
      </div>
    </>
  );
}

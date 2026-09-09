"use client";

import { useEffect, useState } from "react";

export type HospitalNavItem = { id: string; label: string };

export function HospitalSectionNav({ items }: { items: HospitalNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const nodes = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="hp-nav" aria-label="On this hospital page">
      <div className="hp-nav__inner">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={active === item.id ? "hp-nav__link is-active" : "hp-nav__link"}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

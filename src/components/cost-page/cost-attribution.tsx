"use client";

import { useState } from "react";
import { COST_ATTRIBUTION, type CostAttributionPerson } from "@/data/cost-attribution";

function AttributionCard({ person }: { person: CostAttributionPerson }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="cost-attr__card">
      <div className="cost-attr__bio">
        <p>
          {person.bio}
          {open ? ` ${person.more}` : null}
        </p>
        <button
          type="button"
          className="cost-attr__more"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "View less" : "View more"}
        </button>
      </div>
      <div className="cost-attr__identity">
        <div>
          <p className="cost-attr__role">{person.role}</p>
          <h3 className="cost-attr__name">{person.name}</h3>
          <p className="cost-attr__cred">{person.credential}</p>
          {person.affiliations.map((line) => (
            <p key={line} className="cost-attr__aff">
              {line}
            </p>
          ))}
        </div>
        {/* Local static portraits; match directory cards. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={person.image} alt={person.imageAlt} className="cost-attr__photo" />
      </div>
    </article>
  );
}

export function CostAttribution() {
  return (
    <section id="attribution" className="cost-attr" aria-label="Content curator and medical review">
      {COST_ATTRIBUTION.map((person) => (
        <AttributionCard key={person.name} person={person} />
      ))}
    </section>
  );
}

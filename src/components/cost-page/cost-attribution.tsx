import "@/styles/cost-page.css";

import { COST_ATTRIBUTION, type CostAttributionPerson } from "@/data/cost-attribution";

function AttributionCard({ person }: { person: CostAttributionPerson }) {
  return (
    <article className="cost-attr__card">
      <div className="cost-attr__bio">
        <p>{person.bio}</p>
        <details className="cost-attr__details group">
          <summary className="cost-attr__more">
            <span className="group-open:hidden">View more</span>
            <span className="hidden group-open:inline">View less</span>
          </summary>
          <p className="mt-2">{person.more}</p>
        </details>
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

export function CostAttribution({ flush = false }: { flush?: boolean }) {
  return (
    <section
      id="attribution"
      className={flush ? "cost-attr cost-attr--flush" : "cost-attr"}
      aria-label="Content curator and medical review"
    >
      {COST_ATTRIBUTION.map((person) => (
        <AttributionCard key={person.name} person={person} />
      ))}
    </section>
  );
}

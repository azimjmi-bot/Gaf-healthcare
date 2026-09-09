import type { ReactNode } from "react";
import Link from "next/link";
import { Check, Clock, Stethoscope, BedDouble } from "lucide-react";
import type { CostArticle } from "@/data/cost-articles/types";
import type { Treatment } from "@/lib/treatments";

export function CostHero({
  article,
  treatment,
  place = "India",
  heading,
  lede,
  consultHref,
  hospitalsHref,
  children,
}: {
  article: CostArticle;
  treatment: Treatment;
  place?: string;
  heading: string;
  lede: string;
  consultHref: string;
  hospitalsHref: string;
  children?: ReactNode;
}) {
  return (
    <section className="cost-hero">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="cost-hero__grid">
          <div className="cost-hero__copy">
            <nav aria-label="Breadcrumb" className="cost-crumbs">
              <Link href="/costs">India</Link>
              <span aria-hidden>›</span>
              <Link href={`/costs?specialty=${encodeURIComponent(treatment.category)}`}>
                {treatment.category}
              </Link>
              <span aria-hidden>›</span>
              <span>{article.briefName || article.procedure}</span>
            </nav>
            <h1 className="cost-hero__title">{heading}</h1>
          </div>
          <aside className="cost-price">
            <p className="cost-price__kicker">{place}</p>
            <p className="cost-price__num">{treatment.partnerRange}</p>
            <p className="cost-price__sub">Typical international-patient hospital package</p>
            <p className="cost-price__note">
              Indicative estimate. Final cost depends on hospital, surgeon, treatment plan and clinical
              requirements.
            </p>
          </aside>
          <div className="cost-hero__meta">
            <p className="cost-hero__lede">{lede}</p>
            <p className="cost-hero__facts">
              <span>
                <BedDouble className="size-4" />
                {treatment.stay} typical hospital stay
              </span>
              {article.duration ? (
                <span>
                  <Clock className="size-4" />
                  Procedure duration: {article.duration}
                </span>
              ) : null}
              <span>
                <Stethoscope className="size-4" />
                Doctor review recommended before travel
              </span>
            </p>
            <div className="cost-hero__actions">
              <Link href={consultHref} className="cost-btn cost-btn--primary">
                Get My Exact Treatment Cost
              </Link>
              <Link href={hospitalsHref} className="cost-btn cost-btn--ghost">
                Compare Hospitals
              </Link>
            </div>
            <p className="cost-trust">
              <span>
                <Check className="size-3.5" /> No obligation
              </span>
              <span>
                <Check className="size-3.5" /> Doctor review
              </span>
              <span>
                <Check className="size-3.5" /> Hospital options
              </span>
              <span>
                <Check className="size-3.5" /> International patient support
              </span>
            </p>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

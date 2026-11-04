"use client";

import "@/styles/directory-cards.css";

import { DoctorPhoto } from "@/components/doctor-photo";
import { LocaleLink as Link } from "@/components/locale-link";
import { useState, type ReactNode } from "react";
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  IdCard,
  Settings2,
} from "lucide-react";
import { useT } from "@/components/locale-provider";

const PROC_PREVIEW = 6;

/**
 * Exactly what the card draws, already localized. The server-side `DoctorCard`
 * builds this from a `Doctor` so the full record (long bio, awards, research,
 * affiliations) never crosses into the client payload — on a directory page
 * that was several kilobytes per card.
 */
export type DoctorCardData = {
  slug: string;
  name: string;
  title: string;
  featured: boolean;
  specialty: string;
  experience: string;
  designation: string;
  qualifications: string;
  education: string[];
  hospitalSlug: string;
  hospitalName: string;
  location: string;
  bio: string;
  procedures: string[];
  image?: string;
  imageAlt?: string;
};

export function DoctorCardView({ card, compareSlot }: { card: DoctorCardData; compareSlot?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const t = useT();
  const shown = open ? card.procedures : card.procedures.slice(0, PROC_PREVIEW);
  const extra = card.procedures.length - PROC_PREVIEW;

  return (
    <article className="dcard">
      <div className="dcard__top">
        <div className="dcard__avatar">
          <DoctorPhoto doctor={{ name: card.name, image: card.image, imageAlt: card.imageAlt }} sizes="6.75rem" />
        </div>

        <div className="dcard__id">
          <div className="dcard__name-row">
            <h2 className="dcard__name">
              <Link href={`/doctors/${card.slug}`}>{card.name}</Link>
              {card.featured ? <BadgeCheck className="dcard__check" aria-label={t("card.featured")} /> : null}
            </h2>
            <span className="dcard__chip">{card.specialty}</span>
          </div>
          <p className="dcard__role">{card.title}</p>
          <ul className="dcard__facts">
            {card.experience ? (
              <li>
                <CalendarDays className="size-4" />
                {card.experience}
              </li>
            ) : null}
            <li>
              <IdCard className="size-4" />
              {t("card.designation", { title: card.designation })}
            </li>
            {card.qualifications ? (
              <li>
                <GraduationCap className="size-4" />
                {card.qualifications}
              </li>
            ) : null}
            {card.education.map((line, index) => (
              <li key={`${line}-${index}`}>
                <GraduationCap className="size-4" />
                <span dir="ltr">{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="dcard__aside">
          <Link href={`/hospitals/${card.hospitalSlug}`} className="dcard__hosp">
            <Building2 className="size-4 shrink-0" />
            <span>
              <strong>{card.hospitalName}</strong>
              {card.location ? <span>{card.location}</span> : null}
            </span>
          </Link>
          <div className="dcard__cta">
            <Link href={`/doctors/${card.slug}`} className="dcard__btn dcard__btn--book">
              {t("card.viewProfile")}
            </Link>
            <Link href={`/consult?doctor=${card.slug}`} className="dcard__btn dcard__btn--consult">
              {t("card.requestConsult")}
            </Link>
            {compareSlot}
          </div>
        </div>
      </div>

      <div className="dcard__bottom">
        <div className="dcard__about">
          {card.bio ? <p className="dcard__bio">{card.bio}</p> : null}
          <Link href={`/doctors/${card.slug}`} className="dcard__more">
            {t("card.viewProfile")}
          </Link>
        </div>

        {card.procedures.length > 0 ? (
          <div className="dcard__procs">
            <p>
              <Settings2 className="size-4" />
              {t("card.keyProcedures")}
            </p>
            <ul>
              {shown.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {extra > 0 ? (
              <button type="button" className="dcard__toggle" onClick={() => setOpen((v) => !v)}>
                {open ? (
                  <>
                    {t("card.showLess")} <ChevronUp className="size-4" />
                  </>
                ) : (
                  <>
                    {t("card.showMore")} <ChevronDown className="size-4" />
                  </>
                )}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

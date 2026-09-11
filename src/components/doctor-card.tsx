"use client";

import { LocaleLink as Link } from "@/components/locale-link";
import { useState } from "react";
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
import { useLocale, useT } from "@/components/locale-provider";
import {
  designationLabel,
  experienceBadge,
  keyProcedureLabels,
  listingBio,
} from "@/lib/doctor-profile";
import type { Doctor } from "@/lib/doctors";
import { medicalPhrase } from "@/lib/i18n/medical-phrases";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { whatsappHref } from "@/lib/site";

const PROC_PREVIEW = 6;

function wa(doctor: Doctor, intent: string) {
  return whatsappHref(
    `Hello — I am writing about ${doctor.name} at ${doctor.hospitalName} in ${doctor.city}. ${intent}`,
  );
}

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = useT();
  const bio = listingBio(doctor);
  const procedures = keyProcedureLabels(doctor).map((item) => medicalPhrase(item, locale));
  const shown = open ? procedures : procedures.slice(0, PROC_PREVIEW);
  const extra = procedures.length - PROC_PREVIEW;
  const experience = experienceBadge(doctor);
  const designation = designationLabel(doctor);

  return (
    <article className="dcard">
      <div className="dcard__top">
        <div className="dcard__avatar">
          <img src={doctor.image || "/doctors/avatar-placeholder.webp?v=2"} alt={doctor.image ? doctor.imageAlt || doctor.name : ""} />
        </div>

        <div className="dcard__id">
          <div className="dcard__name-row">
            <h2 className="dcard__name">
              <Link href={`/doctors/${doctor.slug}`}>{doctor.name}</Link>
              {doctor.featured ? (
                <BadgeCheck className="dcard__check" aria-label={t("card.featured")} />
              ) : null}
            </h2>
            <span className="dcard__chip">{taxonomyLabel(doctor.specialty, locale)}</span>
          </div>
          <p className="dcard__role">{doctor.title}</p>
          <ul className="dcard__facts">
            {experience ? (
              <li>
                <CalendarDays className="size-4" />
                {experience}
              </li>
            ) : null}
            <li>
              <IdCard className="size-4" />
              {t("card.designation", { title: designation })}
            </li>
            {doctor.qualifications ? (
              <li>
                <GraduationCap className="size-4" />
                {doctor.qualifications}
              </li>
            ) : null}
          </ul>
        </div>

        <div className="dcard__aside">
          <Link href={`/hospitals/${doctor.hospitalSlug}`} className="dcard__hosp">
            <Building2 className="size-4 shrink-0" />
            <span>
              <strong>{doctor.hospitalName}</strong>
              <span>
                {taxonomyLabel(doctor.city, locale)}, {taxonomyLabel(doctor.country, locale)}
              </span>
            </span>
          </Link>
          <div className="dcard__cta">
            <a
              className="dcard__btn dcard__btn--book"
              href={wa(doctor, locale === "ar" ? "أرغب في حجز موعد." : "I would like to book an appointment.")}
              target="_blank"
              rel="noreferrer"
            >
              <CalendarDays className="size-4" />
              {t("card.book")}
            </a>
            <a
              className="dcard__btn dcard__btn--wa"
              href={wa(doctor, locale === "ar" ? "يرجى التواصل عبر واتساب." : "Please connect me on WhatsApp.")}
              target="_blank"
              rel="noreferrer"
            >
              {t("card.whatsapp")}
            </a>
          </div>
        </div>
      </div>

      <div className="dcard__bottom">
        <div className="dcard__about">
          {bio ? <p className="dcard__bio">{bio}</p> : null}
          <Link href={`/doctors/${doctor.slug}`} className="dcard__more">
            {t("card.viewProfile")}
          </Link>
        </div>

        {procedures.length > 0 ? (
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

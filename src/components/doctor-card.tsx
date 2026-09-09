"use client";

import Link from "next/link";
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
import {
  designationLabel,
  experienceBadge,
  keyProcedureLabels,
  listingBio,
} from "@/lib/doctor-profile";
import type { Doctor } from "@/lib/doctors";
import { whatsappHref } from "@/lib/site";

const PROC_PREVIEW = 6;

function wa(doctor: Doctor, intent: string) {
  return whatsappHref(
    `Hello — I am writing about ${doctor.name} at ${doctor.hospitalName} in ${doctor.city}. ${intent}`,
  );
}

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const [open, setOpen] = useState(false);
  const bio = listingBio(doctor);
  const procedures = keyProcedureLabels(doctor);
  const shown = open ? procedures : procedures.slice(0, PROC_PREVIEW);
  const extra = procedures.length - PROC_PREVIEW;
  const experience = experienceBadge(doctor);
  const designation = designationLabel(doctor);

  return (
    <article className="dcard">
      <div className="dcard__top">
        <div className="dcard__avatar">
          <img src="/doctors/avatar-placeholder.webp?v=2" alt="" />
        </div>

        <div className="dcard__id">
          <div className="dcard__name-row">
            <h2 className="dcard__name">
              <Link href={`/doctors/${doctor.slug}`}>{doctor.name}</Link>
              {doctor.featured ? (
                <BadgeCheck className="dcard__check" aria-label="Featured specialist" />
              ) : null}
            </h2>
            <span className="dcard__chip">{doctor.specialty}</span>
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
              Designation: {designation}
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
                {doctor.city}, {doctor.country}
              </span>
            </span>
          </Link>
          <div className="dcard__cta">
            <a
              className="dcard__btn dcard__btn--book"
              href={wa(doctor, "I would like to book an appointment.")}
              target="_blank"
              rel="noreferrer"
            >
              <CalendarDays className="size-4" />
              Book Appointment
            </a>
            <a
              className="dcard__btn dcard__btn--wa"
              href={wa(doctor, "Please connect me on WhatsApp.")}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="dcard__bottom">
        <div className="dcard__about">
          {bio ? <p className="dcard__bio">{bio}</p> : null}
          <Link href={`/doctors/${doctor.slug}`} className="dcard__more">
            View profile →
          </Link>
        </div>

        {procedures.length > 0 ? (
          <div className="dcard__procs">
            <p>
              <Settings2 className="size-4" />
              Key Procedures
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
                    Show less <ChevronUp className="size-4" />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown className="size-4" />
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

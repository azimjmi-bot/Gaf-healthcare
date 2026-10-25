import type { ReactNode } from "react";
import { DoctorCardView, type DoctorCardData } from "@/components/doctor-card-view";
import {
  campusLocation,
  designationLabel,
  experienceBadge,
  keyProcedureLabels,
  listingBio,
} from "@/lib/doctor-profile";
import type { Doctor } from "@/lib/doctors";
import type { AppLocale } from "@/lib/i18n/languages";
import { medicalPhrase } from "@/lib/i18n/medical-phrases";
import { getRequestLocale } from "@/lib/i18n/request";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";

/** The slim, localized view of a doctor that the client card renders. */
export function doctorCardData(doctor: Doctor, locale: AppLocale): DoctorCardData {
  return {
    slug: doctor.slug,
    name: doctor.name,
    title: doctor.title,
    featured: Boolean(doctor.featured),
    specialty: taxonomyLabel(doctor.specialty, locale),
    experience: experienceBadge(doctor),
    designation: designationLabel(doctor),
    qualifications: doctor.qualifications,
    education: doctor.education.filter(Boolean).slice(0, 3),
    hospitalSlug: doctor.hospitalSlug,
    hospitalName: doctor.hospitalName,
    location: campusLocation(doctor, undefined, locale),
    bio: listingBio(doctor),
    procedures: keyProcedureLabels(doctor).map((item) => medicalPhrase(item, locale)),
    image: doctor.image,
    imageAlt: doctor.imageAlt,
  };
}

/**
 * Server half of the directory card: reads the request locale, reduces the
 * `Doctor` to the fields the card shows, and hands that to the client view.
 */
export async function DoctorCard({ doctor, compareSlot }: { doctor: Doctor; compareSlot?: ReactNode }) {
  const locale = await getRequestLocale();
  return <DoctorCardView card={doctorCardData(doctor, locale)} compareSlot={compareSlot} />;
}

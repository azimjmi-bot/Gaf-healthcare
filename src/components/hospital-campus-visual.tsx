import type { AppLocale } from "@/lib/i18n/languages";
import { interpolate } from "@/lib/i18n/messages";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { uiCatalogFor } from "@/lib/i18n/ui-catalogs";
import type { Hospital } from "@/lib/hospitals";
import { isEyeCampus } from "@/lib/hospital-profile";

const CITY_TONE: Record<string, { sky: string; building: string; glass: string; accent: string }> = {
  "delhi-ncr": {
    sky: "#d7e4ee",
    building: "#1f3d4d",
    glass: "#7eb6c9",
    accent: "#2BA9B4",
  },
  mumbai: {
    sky: "#f3ddd0",
    building: "#1c3a4a",
    glass: "#6aa8b8",
    accent: "#e07a3d",
  },
  bengaluru: {
    sky: "#d5eadc",
    building: "#1a4450",
    glass: "#6cb3b0",
    accent: "#3d8b74",
  },
  chennai: {
    sky: "#d9e8f4",
    building: "#16384a",
    glass: "#5aa7c4",
    accent: "#F07529",
  },
  hyderabad: {
    sky: "#efe0d4",
    building: "#214352",
    glass: "#88b8c4",
    accent: "#c45c26",
  },
};

/**
 * The caption for a campus placeholder, in the reader's language.
 *
 * Lives beside the component rather than at each call site so the six places
 * that draw a placeholder cannot drift apart.
 */
export function campusCaption(hospital: Hospital, locale: AppLocale) {
  const t = uiCatalogFor(locale);
  const place = interpolate(t["dir.placeCity"], {
    city: taxonomyLabel(hospital.city, locale),
    country: taxonomyLabel(hospital.country, locale),
  });
  return interpolate(t["hospital.campusIllustration"], { place });
}

/**
 * The handful of fields the placeholder actually draws. Client components
 * (the photo gallery dialog) receive this instead of a full `Hospital`, which
 * otherwise serializes bio, infrastructure and specialty copy into the RSC
 * payload once per card.
 */
export type CampusVisualHospital = Pick<
  Hospital,
  "slug" | "name" | "city" | "country" | "citySlug" | "image" | "imageAlt"
> & { eye: boolean };

export function campusVisualProps(hospital: Hospital): CampusVisualHospital {
  return {
    slug: hospital.slug,
    name: hospital.name,
    city: hospital.city,
    country: hospital.country,
    citySlug: hospital.citySlug,
    image: hospital.image,
    imageAlt: hospital.imageAlt,
    eye: isEyeCampus(hospital),
  };
}

function isSlim(hospital: Hospital | CampusVisualHospital): hospital is CampusVisualHospital {
  return "eye" in hospital;
}

export function HospitalCampusVisual({
  hospital,
  className,
  caption,
}: {
  hospital: Hospital | CampusVisualHospital;
  className?: string;
  /**
   * The watermark drawn into the placeholder, naming the campus and saying
   * plainly that this is a drawing rather than a photograph. Passed in because
   * one caller is a client component, so this cannot read the request locale.
   */
  caption?: string;
}) {
  if (hospital.image) {
    return (
      <div className={className}>
        {/* CMS campus photos may be local uploads. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hospital.image} alt={hospital.imageAlt || hospital.name} />
      </div>
    );
  }
  const tone = CITY_TONE[hospital.citySlug] ?? CITY_TONE["delhi-ncr"];
  const eye = isSlim(hospital) ? hospital.eye : isEyeCampus(hospital);
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        background: `linear-gradient(180deg, ${tone.sky} 0%, #f7f3ea 72%, #e8e0d2 72%, #e8e0d2 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0.85rem 1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <svg viewBox="0 0 80 48" style={{ width: "42%", height: "auto", margin: "auto auto 0.35rem" }}>
        <rect x="6" y="16" width="22" height="30" rx="2" fill={tone.building} />
        <rect x="29" y="8" width="22" height="38" rx="2" fill={tone.building} />
        <rect x="52" y="20" width="22" height="26" rx="2" fill={tone.building} />
        <rect x="34" y="34" width="12" height="12" fill={tone.accent} />
        {eye ? (
          <circle cx="40" cy="4" r="3" fill="none" stroke={tone.accent} strokeWidth="1.5" />
        ) : (
          <rect x="35" y="2" width="10" height="3" fill={tone.accent} />
        )}
      </svg>
      <span style={{ color: tone.building, fontSize: "0.72rem", lineHeight: 1.25, fontFamily: "ui-sans-serif, system-ui" }}>
        {caption ?? `${hospital.city}, ${hospital.country} — campus illustration`}
      </span>
    </div>
  );
}

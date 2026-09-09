import type { Hospital } from "@/lib/hospitals";
import { isEyeCampus } from "@/lib/hospital-profile";

const CITY_TONE: Record<string, { sky: string; building: string; glass: string; accent: string }> = {
  "delhi-ncr": {
    sky: "#d7e4ee",
    building: "#1f3d4d",
    glass: "#7eb6c9",
    accent: "#c9a227",
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
    accent: "#d4a017",
  },
  hyderabad: {
    sky: "#efe0d4",
    building: "#214352",
    glass: "#88b8c4",
    accent: "#c45c26",
  },
};

export function HospitalCampusVisual({
  hospital,
  className,
}: {
  hospital: Hospital;
  className?: string;
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
  const eye = isEyeCampus(hospital);
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 640 480" className="h-full w-full" role="img">
        <title>Illustrated campus for {hospital.name}</title>
        <defs>
          <linearGradient id={`sky-${hospital.slug}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tone.sky} />
            <stop offset="100%" stopColor="#f7f3ea" />
          </linearGradient>
        </defs>
        <rect width="640" height="480" fill={`url(#sky-${hospital.slug})`} />
        <ellipse cx="520" cy="90" rx="70" ry="70" fill="#fff8e8" opacity="0.7" />
        <rect x="0" y="350" width="640" height="130" fill="#e8e0d2" />
        <rect x="40" y="160" width="220" height="220" fill={tone.building} rx="4" />
        <rect x="70" y="190" width="48" height="70" fill={tone.glass} opacity="0.85" />
        <rect x="132" y="190" width="48" height="70" fill={tone.glass} opacity="0.7" />
        <rect x="194" y="190" width="48" height="70" fill={tone.glass} opacity="0.85" />
        <rect x="70" y="275" width="48" height="70" fill={tone.glass} opacity="0.55" />
        <rect x="132" y="275" width="48" height="70" fill={tone.glass} opacity="0.7" />
        <rect x="194" y="275" width="48" height="70" fill={tone.glass} opacity="0.55" />
        <rect x="250" y="110" width="170" height="270" fill={tone.building} rx="4" />
        <rect x="272" y="140" width="126" height="200" fill={tone.glass} opacity="0.55" />
        <rect x="300" y="318" width="70" height="62" fill={tone.accent} />
        <rect x="430" y="190" width="170" height="190" fill={tone.building} rx="4" />
        <rect x="452" y="218" width="50" height="60" fill={tone.glass} />
        <rect x="518" y="218" width="50" height="60" fill={tone.glass} opacity="0.75" />
        <rect x="452" y="292" width="50" height="60" fill={tone.glass} opacity="0.65" />
        <rect x="518" y="292" width="50" height="60" fill={tone.glass} />
        {eye ? (
          <circle cx="335" cy="80" r="28" fill="none" stroke={tone.accent} strokeWidth="8" />
        ) : (
          <rect x="310" y="70" width="50" height="18" fill={tone.accent} />
        )}
        <text x="48" y="430" fill={tone.building} fontSize="16" fontFamily="ui-sans-serif, system-ui">
          {hospital.city}, India — campus illustration
        </text>
      </svg>
    </div>
  );
}

import { doctorInitials } from "@/lib/hospital-profile";

export function DoctorClinicianVisual({
  name,
  slug,
  className,
}: {
  name: string;
  slug: string;
  className?: string;
}) {
  const gid = `dhero-${slug.replace(/[^a-z0-9-]/gi, "")}`;
  const initials = doctorInitials(name);

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 420 520" className="h-full w-full" role="img">
        <title>Illustrated clinician mark for {name}</title>
        <defs>
          <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e8f1f6" />
            <stop offset="100%" stopColor="#f7f3ea" />
          </linearGradient>
          <linearGradient id={`${gid}-coat`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbfcfd" />
            <stop offset="100%" stopColor="#e4eaf0" />
          </linearGradient>
        </defs>
        <rect width="420" height="520" rx="28" fill={`url(#${gid}-bg)`} />
        <circle cx="320" cy="90" r="88" fill="#cfe4f0" opacity="0.85" />
        <circle cx="70" cy="430" r="110" fill="#ffffff" opacity="0.55" />
        <circle cx="360" cy="400" r="70" fill="#dce8c9" opacity="0.45" />
        <ellipse cx="210" cy="168" rx="62" ry="70" fill="#c5d0d8" />
        <ellipse cx="210" cy="158" rx="48" ry="54" fill="#d7e0e6" />
        <path
          d="M92 500 V310 C92 250 140 220 210 220 C280 220 328 250 328 310 V500 Z"
          fill={`url(#${gid}-coat)`}
        />
        <path d="M168 228 C168 268 188 292 210 292 C232 292 252 268 252 228" fill="#edf2f6" />
        <rect x="204" y="292" width="12" height="88" rx="3" fill="#c9a227" />
        <path
          d="M150 250 C120 310 128 360 148 390"
          fill="none"
          stroke="#1f3d4d"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="148" cy="402" r="16" fill="none" stroke="#1f3d4d" strokeWidth="7" />
        <circle cx="210" cy="360" r="34" fill="#1f3d4d" />
        <text
          x="210"
          y="370"
          textAnchor="middle"
          fill="#f7f3ea"
          fontSize="18"
          fontFamily="ui-sans-serif, system-ui"
          fontWeight="600"
        >
          {initials}
        </text>
      </svg>
    </div>
  );
}

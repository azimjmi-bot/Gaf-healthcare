import { parseAccreditationMarks } from "@/lib/hospital-profile";

export function AccreditationSeals({
  accreditation,
  size = "md",
}: {
  accreditation: string;
  size?: "sm" | "md";
}) {
  const marks = parseAccreditationMarks(accreditation);
  if (!marks.length) return null;
  return (
    <ul className={size === "sm" ? "hp-seals hp-seals--sm" : "hp-seals"} aria-label="Accreditations">
      {marks.map((mark) => (
        <li key={mark.id}>
          {mark.src ? (
            <img src={mark.src} alt={mark.label} title={mark.label} className="hp-seal" />
          ) : (
            <span className="hp-seal-fallback" title={mark.label}>
              {mark.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

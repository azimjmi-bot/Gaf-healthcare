import { parseAccreditationMarks } from "@/lib/hospital-profile";

export function AccreditationSeals({
  accreditation,
  size = "md",
  labeled = false,
}: {
  accreditation: string;
  size?: "sm" | "md";
  labeled?: boolean;
}) {
  const marks = parseAccreditationMarks(accreditation);
  if (!marks.length) return null;
  const short: Record<string, string> = {
    jci: "JCI Accredited",
    nabh: "NABH Accredited",
    nabl: "NABL Accredited",
  };
  return (
    <ul
      className={`${size === "sm" ? "hp-seals hp-seals--sm" : "hp-seals"} ${labeled ? "hp-seals--labeled" : ""}`}
      aria-label="Accreditations"
    >
      {marks.map((mark) => (
        <li key={mark.id} className={labeled ? "hp-seals__item" : undefined}>
          {mark.src ? (
            <img src={mark.src} alt={mark.label} title={mark.label} className="hp-seal" />
          ) : (
            <span className="hp-seal-fallback" title={mark.label}>
              {mark.label}
            </span>
          )}
          {labeled ? <span className="hp-seals__caption">{short[mark.id] ?? mark.label}</span> : null}
        </li>
      ))}
    </ul>
  );
}

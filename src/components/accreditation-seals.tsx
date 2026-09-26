import { parseAccreditationMarks } from "@/lib/hospital-profile";
import { getRequestLocale } from "@/lib/i18n/request";
import { uiCatalogFor } from "@/lib/i18n/ui-catalogs";

/**
 * Reads the request locale rather than taking it as a prop: this renders from
 * eight call sites, all of them server components, and none of them otherwise
 * need to know about locale.
 */
export async function AccreditationSeals({
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

  const locale = await getRequestLocale();
  const t = uiCatalogFor(locale);

  return (
    <ul
      className={`${size === "sm" ? "hp-seals hp-seals--sm" : "hp-seals"} ${labeled ? "hp-seals--labeled" : ""}`}
      aria-label={t["seals.label"]}
    >
      {marks.map((mark) => {
        // The scheme name is the body's own initialism; only the word
        // "Accredited" around it is translated. An unrecognised mark falls back
        // to the raw label, which is the initialism on its own.
        const caption = t[`seals.${mark.id}`] || mark.label;
        return (
          <li key={mark.id} className={labeled ? "hp-seals__item" : undefined}>
            {mark.src ? (
              <img src={mark.src} alt={mark.label} title={caption} className="hp-seal" />
            ) : (
              <span className="hp-seal-fallback" title={caption}>
                {mark.label}
              </span>
            )}
            {labeled ? <span className="hp-seals__caption">{caption}</span> : null}
          </li>
        );
      })}
    </ul>
  );
}

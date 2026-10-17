/**
 * Deterministic place formatting for Arabic (and mixed) campus strings.
 *
 * Hospital display names often already contain the city ("مستشفيات غلين إيغلز، بنغالور").
 * Cards, overlays and metadata must not append that city again, and must not
 * concatenate the same label twice (`بنغالوربنغالور`). Identity fields — slugs,
 * English names, entity IDs — are not rewritten here.
 */

export const ARABIC_PLACE_LABELS = [
  "دلهي إن سي آر",
  "نافي مومباي",
  "حيدر آباد",
  "غوروغرام",
  "فريد آباد",
  "بنغالور",
  "تشيناي",
  "مومباي",
  "الهند",
  "نويدا",
  "ساكيت",
  "شاليمار باغ",
  "جوبيلي هيلز",
  "بانيرغاتا",
] as const;

function compact(value: string) {
  return value.replace(/[\s\u200e\u200f,،.\-–—]+/g, "").toLowerCase();
}

export function containsPlace(haystack: string, place: string) {
  if (!haystack || !place) return false;
  if (haystack.includes(place)) return true;
  const needle = compact(place);
  return needle.length > 0 && compact(haystack).includes(needle);
}

export function joinPlaceParts(parts: Array<string | undefined | null>, sep = "، ") {
  const out: string[] = [];
  for (const raw of parts) {
    const part = String(raw ?? "").replace(/\s+/g, " ").trim();
    if (!part) continue;
    const hay = out.join(sep);
    if (hay && containsPlace(hay, part)) continue;
    out.push(part);
  }
  return out.join(sep);
}

export function collapseRepeatedPlaces(
  text: string,
  places: readonly string[] = ARABIC_PLACE_LABELS,
) {
  if (!text) return text;
  const labels = [...places].filter(Boolean).sort((a, b) => b.length - a.length);
  let out = text;
  for (let guard = 0; guard < 6; guard += 1) {
    const previous = out;
    for (const place of labels) {
      out = out.split(`${place}${place}`).join(place);
      out = out.split(`${place}، ${place}`).join(place);
      out = out.split(`${place}, ${place}`).join(place);
      out = out.split(`${place}،${place}`).join(place);
      out = out.split(`${place} بـ${place}`).join(place);
      out = out.split(`${place} بمدينة ${place}`).join(place);
      out = out.split(`${place} ومدينة ${place}`).join(place);
      out = out.split(`بمدينة ${place}، ${place}`).join(`بمدينة ${place}`);
      out = out.split(`في ${place}، ${place}`).join(`في ${place}`);
      out = out.split(`في ${place} بـ${place}`).join(`في ${place}`);
    }
    out = out.replace(/[،,]\s*[،,]/g, "،").replace(/\s{2,}/g, " ").trim();
    if (out === previous) break;
  }
  return out;
}

export function withCampus(
  hospital: string,
  city?: string,
  country?: string,
) {
  return collapseRepeatedPlaces(joinPlaceParts([hospital, city, country]));
}

export function hospitalInCity(hospital: string, city: string) {
  if (containsPlace(hospital, city)) return hospital;
  return `${hospital} بمدينة ${city}`;
}

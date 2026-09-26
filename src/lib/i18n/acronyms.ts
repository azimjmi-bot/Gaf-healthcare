/**
 * House style: an Arabic procedure name carries the Latin acronym in brackets.
 *
 * "الجراحة الإشعاعية التجسيمية" and "الجراحة الإشعاعية التجسيمية (SRS)" are the
 * same term, but only the second one survives the reader who knows the
 * procedure by its acronym and nothing else — which, for radiation oncology, is
 * most of them. The acronym is also the token a patient will have been given by
 * a referring hospital, so dropping it costs recognition for no gain.
 *
 * The rule is mechanical, so the acronym is read off the English label rather
 * than maintained by hand: whatever the English side declares as the short form
 * is what the Arabic side must end with.
 */

/**
 * Mostly capitals and short: a short form rather than a word. The allowance for
 * up to two lowercase letters is what lets HoLEP and MRgFUS through without
 * also admitting "ABO-Incompatible" or "Hepatectomy".
 */
function looksLikeAcronym(token: string): boolean {
  if (!/^[A-Za-z0-9][A-Za-z0-9./+-]*$/.test(token) || token.length > 12) return false;
  const upper = (token.match(/[A-Z]/g) ?? []).length;
  const lower = (token.match(/[a-z]/g) ?? []).length;
  return upper >= 2 && lower <= 2;
}

/**
 * Short forms that name a route or a region rather than the procedure, so
 * appending them would say nothing: intravenous thrombolysis is thrombolysis.
 */
const NOT_A_PROCEDURE_SHORT_FORM = new Set(["GI", "IV", "AV"]);

/**
 * The Latin short form an English label declares, in either shape the catalog
 * uses: the acronym in brackets after the name ("Stereotactic Radiosurgery
 * (SRS)"), or the acronym first ("TURP (Transurethral Resection of the
 * Prostate)", "LVAD Implantation").
 */
export function latinAcronym(english: string): string | null {
  for (const [, token] of english.matchAll(/\(([^)]+)\)/g)) {
    if (looksLikeAcronym(token)) return token;
  }
  const leading = english.match(/^([A-Za-z0-9][A-Za-z0-9./+-]*)\b/)?.[1];
  if (leading && looksLikeAcronym(leading) && !NOT_A_PROCEDURE_SHORT_FORM.has(leading)) {
    return leading;
  }
  return null;
}

/** Whether an Arabic rendering already satisfies the rule for its English key. */
export function carriesAcronym(english: string, arabic: string): boolean {
  const acronym = latinAcronym(english);
  return acronym === null || arabic.includes(acronym);
}

/** The Arabic rendering with the short form appended, if it is owed one. */
export function withAcronym(english: string, arabic: string): string {
  const acronym = latinAcronym(english);
  if (acronym === null || arabic.includes(acronym)) return arabic;
  return `${arabic} (${acronym})`;
}

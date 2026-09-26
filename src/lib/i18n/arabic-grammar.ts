/**
 * The bits of Arabic that a template cannot get right by substitution alone.
 *
 * Interpolating an approved term into a sentence is not the same as writing
 * the sentence: Arabic inflects the noun for its position, joins some
 * prepositions to the word that follows, and agrees a counted noun with its
 * number in four different ways. A template that ignores all three produces
 * text that parses but is visibly written by someone who does not speak the
 * language, which on a medical page costs exactly the trust the page is for.
 *
 * None of this invents terminology. The nouns come from the glossary; what is
 * applied here is grammar.
 */

/**
 * A sound masculine plural in the genitive, which is where the hub headings
 * put it: after أفضل and after من. The nominative ـون/ـو becomes ـين/ـي, so
 * "أخصائيو علاج الأورام" reads "أخصائيي علاج الأورام". Broken plurals such as
 * أطباء and جرّاحو — the second of which is sound — are handled by the same
 * two rules; anything that ends in neither is returned unchanged, because
 * broken plurals do not show case in unvowelled script.
 */
export function genitivePlural(role: string): string {
  return role.replace(/^(\S+?)و(\s)/, "$1ي$2").replace(/^(\S+?)ون$/, "$1ين");
}

/**
 * A one-letter particle joined to the word it governs. Arabic writes no space
 * here, and the لام swallows the alif of a following definite article: not
 * "لـالجراحة" but "للجراحة".
 *
 * A term the glossary has not translated yet still arrives in Latin script,
 * and an Arabic letter cannot join to one. Those keep the tatweel bridge, so
 * the particle stays readable instead of colliding with the Latin word.
 */
export function withParticle(particle: string, word: string): string {
  const trimmed = word.trim();
  if (particle === "ل" && trimmed.startsWith("ال")) return `لل${trimmed.slice(2)}`;
  if (/^[\u0600-\u06FF]/.test(trimmed)) return `${particle}${trimmed}`;
  return `${particle}ـ${trimmed}`;
}

/** "for X" — the لام of purpose or attribution. */
export function withLam(word: string): string {
  return withParticle("ل", word);
}

/** "with X" / "related to X" — the باء. */
export function withBa(word: string): string {
  return withParticle("ب", word);
}

/**
 * The forms a counted noun phrase takes. Arabic agreement is not
 * singular-or-plural: three to ten take the plural, eleven and up take the
 * singular again, and one and two are carried by the noun itself rather than
 * by a numeral.
 *
 * Each form is the whole noun phrase, adjective included, because the
 * adjective agrees with the noun and therefore changes with the number too —
 * "خمس مستشفيات موثّقة" but "خمسة وثلاثون مستشفى موثّقًا".
 */
export type CountedNoun = {
  /** One of them, written out rather than numbered. */
  one: string;
  /** Two of them: the dual, which also carries its own count. */
  two: string;
  /** Three to ten: the plural. */
  few: string;
  /** Eleven and up: the singular again, in the accusative of specification. */
  many: string;
  /** None of them. */
  none: string;
};

export const COUNTED_NOUNS = {
  hospital: {
    one: "مستشفى واحد",
    two: "مستشفيان",
    few: "مستشفيات",
    many: "مستشفى",
    none: "لا مستشفيات",
  },
  validatedHospital: {
    one: "مستشفى موثّق واحد",
    two: "مستشفيان موثّقان",
    few: "مستشفيات موثّقة",
    many: "مستشفى موثّقًا",
    none: "لا مستشفيات موثّقة",
  },
  campus: {
    one: "حرم طبي واحد",
    two: "حرمان طبيان",
    few: "أحرام طبية",
    many: "حرمًا طبيًا",
    none: "لا أحرام طبية",
  },
  city: {
    one: "مدينة واحدة",
    two: "مدينتان",
    few: "مدن",
    many: "مدينةً",
    none: "لا مدن",
  },
  linkedProcedure: {
    one: "إجراء مرتبط واحد",
    two: "إجراءان مرتبطان",
    few: "إجراءات مرتبطة",
    many: "إجراءً مرتبطًا",
    none: "لا إجراءات مرتبطة",
  },
  record: {
    one: "سجل واحد",
    two: "سجلان",
    few: "سجلات",
    many: "سجلًا",
    none: "لا سجلات",
  },
} satisfies Record<string, CountedNoun>;

export type CountedNounKey = keyof typeof COUNTED_NOUNS;

/**
 * A number and its noun, agreed the way Arabic agrees them. One and two are
 * carried by the noun alone: "مستشفيان" already says two, and "2 مستشفيان"
 * would say it twice.
 */
export function countedNoun(count: number, key: CountedNounKey): string {
  const forms = COUNTED_NOUNS[key];
  if (count <= 0) return forms.none;
  if (count === 1) return forms.one;
  if (count === 2) return forms.two;
  if (count <= 10) return `${count} ${forms.few}`;
  return `${count} ${forms.many}`;
}

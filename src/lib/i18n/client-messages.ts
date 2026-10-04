import { SOURCE_LOCALE, type AppLocale } from "@/lib/i18n/languages";

/**
 * English UI copy already lives in the LocaleProvider client module
 * (`UI_MESSAGE_FIELDS`). Re-serializing the same ~312 strings into every
 * RSC payload was ~15–30 KB of homepage HTML. Target locales still need
 * the translated catalog on the wire.
 */
export function clientMessagesFor(
  locale: AppLocale,
  messages: Record<string, string>,
): Record<string, string> {
  return locale === SOURCE_LOCALE ? {} : messages;
}

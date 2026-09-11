import type { AppLocale } from "@/lib/i18n/languages";
import { TAXONOMY_AR } from "@/lib/i18n/taxonomy-ar";

const CATALOGS: Partial<Record<AppLocale, Record<string, string>>> = {
  ar: TAXONOMY_AR,
};

export function taxonomyLabel(name: string | undefined, locale: AppLocale): string {
  if (!name) return "";
  const catalog = CATALOGS[locale];
  return catalog?.[name] || name;
}

export function taxonomyLabels(names: readonly string[], locale: AppLocale): { value: string; label: string }[] {
  return names.map((value) => ({ value, label: taxonomyLabel(value, locale) }));
}

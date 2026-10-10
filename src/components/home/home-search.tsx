import {
  catalogDestinations,
  catalogProcedures,
  catalogSpecialties,
} from "@/lib/catalog-options";
import type { AppLocale } from "@/lib/i18n/languages";
import { localePath } from "@/lib/i18n/path";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";

export function HomeSearch({
  locale,
  labels,
}: {
  locale: AppLocale;
  labels: {
    destination: string;
    specialty: string;
    procedure: string;
    go: string;
    goShort: string;
  };
}) {
  return (
    <form className="home-search" action={localePath("/doctors", locale)} method="get">
      <label>
        <span className="sr-only">{labels.destination}</span>
        <select name="destination" defaultValue="">
          <option value="">{labels.destination}</option>
          {catalogDestinations.map((name) => (
            <option key={name} value={name}>
              {taxonomyLabel(name, locale)}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="sr-only">{labels.specialty}</span>
        <select name="specialty" defaultValue="">
          <option value="">{labels.specialty}</option>
          {catalogSpecialties.map((name) => (
            <option key={name} value={name}>
              {taxonomyLabel(name, locale)}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="sr-only">{labels.procedure}</span>
        <select name="procedure" defaultValue="">
          <option value="">{labels.procedure}</option>
          {catalogProcedures.map((name) => (
            <option key={name} value={name}>
              {taxonomyLabel(name, locale)}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="home-search__go">
        <span className="md:hidden">{labels.goShort}</span>
        <span className="hidden md:inline">{labels.go}</span>
      </button>
    </form>
  );
}

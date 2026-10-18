import {
  catalogDestinations,
  catalogProceduresFor,
  catalogSpecialties,
  citiesForDestination,
  type CatalogEntity,
  type CatalogQuery,
  type CityChipStats,
} from "@/lib/catalog-options";
import { catalogChoiceHref } from "@/lib/catalog-filter";
import type { AppLocale } from "@/lib/i18n/languages";
import { localePath } from "@/lib/i18n/path";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { uiCatalogFor } from "@/lib/i18n/ui-catalogs";
import type { CatalogBasePath } from "@/lib/pretty-catalog-path";

const FILTER_CSS = `
.catalog-filter{margin:1rem 1rem 0;border:1px solid #d7e3ea;border-radius:1rem;background:#fff;padding:.75rem 1rem 1rem;box-shadow:0 12px 40px -18px rgba(20,24,40,.28)}
.catalog-filter--sticky{position:relative;z-index:40}
@media(min-width:1024px){.catalog-filter--sticky{position:sticky;top:5.5rem}}
.catalog-filter__grid{display:grid;grid-template-columns:1fr 1fr;gap:.5rem}
@media(min-width:1024px){.catalog-filter__grid{grid-template-columns:repeat(4,minmax(0,1fr)) auto}}
.catalog-filter select,.catalog-filter button{min-height:2.75rem;width:100%;border:1px solid #d7e3ea;border-radius:.6rem;background:#fff;color:#14202b;padding:.4rem .75rem;font:inherit}
.catalog-filter button{width:auto;background:#1d4f6f;color:#fff;border-color:#1d4f6f;cursor:pointer;padding-inline:1.1rem}
.catalog-filter__count{margin:.75rem .15rem 0;color:#4a5c62;font-size:.875rem}
.catalog-filter .catalog-chips{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.75rem}
.catalog-filter .catalog-chips a{display:inline-flex;min-height:2.75rem;align-items:center;border-radius:999px;border:1px solid #d7e3ea;background:#fff;color:#4a5c62;padding:.5rem 1rem;text-decoration:none}
.catalog-filter .catalog-chips a.is-active{background:#14202b;color:#f6f3ec;border-color:#14202b}
`;

const FILTER_SCRIPT = `(function(){document.querySelectorAll("form.catalog-filter").forEach(function(form){if(form.getAttribute("data-filter-bound")==="1")return;form.setAttribute("data-filter-bound","1");form.querySelectorAll("select").forEach(function(select){select.addEventListener("change",function(){var option=select.options[select.selectedIndex];var href=option&&option.getAttribute("data-href");if(href)location.href=href;});});});})();`;

type Props = {
  basePath: CatalogBasePath;
  locale: AppLocale;
  query?: CatalogQuery;
  resultCount?: number;
  resultLabel?: string;
  chipStats?: CityChipStats | null;
  /** Stay on screen while a long directory article scrolls. */
  sticky?: boolean;
  entity?: CatalogEntity;
};

function ChoiceSelect({
  name,
  label,
  value,
  options,
  locale,
  hrefFor,
}: {
  name: string;
  label: string;
  value?: string;
  options: string[];
  locale: AppLocale;
  hrefFor: (value: string | undefined) => string;
}) {
  return (
    <select name={name} aria-label={label} defaultValue={value ?? ""}>
      <option value="" data-href={hrefFor(undefined)}>
        {label}
      </option>
      {options.map((option) => (
        <option key={option} value={option} data-href={hrefFor(option)}>
          {taxonomyLabel(option, locale)}
        </option>
      ))}
    </select>
  );
}

/**
 * Directory filter as ordinary HTML. Selects navigate immediately, and the
 * submit button works with JavaScript disabled. No client hooks, so the
 * static Arabic documents include it in the first response.
 */
export function CatalogFilterForm({
  basePath,
  locale,
  query = {},
  resultCount,
  resultLabel,
  chipStats,
  sticky = false,
}: Props) {
  const messages = uiCatalogFor(locale);
  const cities = citiesForDestination(query.destination);
  const procedures = catalogProceduresFor(query.specialty);
  const hrefFor = (key: keyof CatalogQuery) => (value: string | undefined) =>
    catalogChoiceHref(basePath, query, key, value, locale);
  const applyLabel = locale === "ar" ? "عرض النتائج" : "Show results";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FILTER_CSS }} />
      <form
        className={sticky ? "catalog-filter catalog-filter--sticky" : "catalog-filter"}
        method="get"
        action={localePath(`${basePath}/filter`, locale)}
      >
        <div className="catalog-filter__grid">
          <ChoiceSelect
            name="destination"
            label={messages["filter.destinations"]}
            value={query.destination}
            options={catalogDestinations}
            locale={locale}
            hrefFor={hrefFor("destination")}
          />
          <ChoiceSelect
            name="city"
            label={messages["filter.cities"]}
            value={query.city}
            options={cities}
            locale={locale}
            hrefFor={hrefFor("city")}
          />
          <ChoiceSelect
            name="specialty"
            label={messages["filter.specialities"]}
            value={query.specialty}
            options={catalogSpecialties}
            locale={locale}
            hrefFor={hrefFor("specialty")}
          />
          <ChoiceSelect
            name="procedure"
            label={messages["filter.procedures"]}
            value={query.procedure}
            options={procedures}
            locale={locale}
            hrefFor={hrefFor("procedure")}
          />
          <button type="submit">{applyLabel}</button>
        </div>
        {chipStats ? (
          <div className="catalog-chips">
            <a
              href={catalogChoiceHref(basePath, query, "city", undefined, locale)}
              className={!query.city ? "is-active" : undefined}
            >
              {messages["filter.allCities"]} ({chipStats.total})
            </a>
            {citiesForDestination("India").map((name) => (
              <a
                key={name}
                href={catalogChoiceHref(basePath, query, "city", name, locale)}
                className={query.city === name ? "is-active" : undefined}
              >
                {taxonomyLabel(name, locale)} ({chipStats.counts[name] ?? 0})
              </a>
            ))}
          </div>
        ) : null}
        {resultCount != null && resultLabel ? (
          <p className="catalog-filter__count">
            {resultCount} {resultLabel} {messages["filter.matching"]}
          </p>
        ) : null}
        <script dangerouslySetInnerHTML={{ __html: FILTER_SCRIPT }} />
      </form>
    </>
  );
}

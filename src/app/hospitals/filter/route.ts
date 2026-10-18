import { redirectCatalogFilter } from "@/lib/catalog-filter-route";

export function GET(request: Request) {
  return redirectCatalogFilter(request, "/hospitals");
}

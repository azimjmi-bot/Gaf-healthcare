import { toSlug } from "@/lib/taxonomy";

export function costPath(procedureName: string) {
  return `/costs/${toSlug(procedureName)}`;
}

export function doctorsPath(opts: {
  procedure?: string;
  city?: string;
  destination?: string;
}) {
  const q = new URLSearchParams();
  if (opts.destination) q.set("destination", opts.destination);
  if (opts.city) q.set("city", opts.city);
  if (opts.procedure) q.set("procedure", opts.procedure);
  const qs = q.toString();
  return qs ? `/doctors?${qs}` : "/doctors";
}

export function hospitalsPath(opts: {
  procedure?: string;
  city?: string;
  destination?: string;
}) {
  const q = new URLSearchParams();
  if (opts.destination) q.set("destination", opts.destination);
  if (opts.city) q.set("city", opts.city);
  if (opts.procedure) q.set("procedure", opts.procedure);
  const qs = q.toString();
  return qs ? `/hospitals?${qs}` : "/hospitals";
}

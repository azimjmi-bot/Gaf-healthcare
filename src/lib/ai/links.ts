const STATIC_PATHS = [
  "/",
  "/doctors",
  "/hospitals",
  "/treatments",
  "/costs",
  "/specialties",
  "/blogs",
  "/consult",
];

export function normalizeInternalPath(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  try {
    const parsed = trimmed.startsWith("http")
      ? new URL(trimmed)
      : new URL(trimmed, "https://gaf.healthcare");
    const host = parsed.hostname.replace(/^www\./, "");
    if (trimmed.startsWith("http") && host !== "gaf.healthcare") return "";
    let path = parsed.pathname || "/";
    if (path.length > 1) path = path.replace(/\/+$/, "");
    return path;
  } catch {
    return "";
  }
}

export function isAllowedInternalPath(url: string, allowed: Iterable<string>) {
  const path = normalizeInternalPath(url);
  if (!path) return false;
  const known = new Set(allowed);
  if (known.has(path)) return true;
  const parts = path.split("/").filter(Boolean);
  if (parts[0] && ["ar", "ru", "fr", "sw"].includes(parts[0])) {
    const rest = `/${parts.slice(1).join("/")}` || "/";
    return known.has(rest === "//" ? "/" : rest);
  }
  return false;
}

export function staticInternalPaths() {
  return [...STATIC_PATHS];
}

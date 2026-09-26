/**
 * The Arabic URLs the running server is actually advertising, and a small
 * concurrency helper for walking them.
 *
 * Every end-to-end check used to run against the same 34-row fixture, which is
 * a sample of page *types* and was never meant to be a sweep. Once the Phase 3
 * gates published 113 facet pages, "the checks pass" stopped meaning "the
 * published pages are correct". Reading sitemap-ar.xml off the server under
 * test gives each script the real population, and keeps giving it as more
 * gates open.
 */

export async function publishedArabicPaths(base: string): Promise<string[]> {
  const response = await fetch(`${base}/sitemap-ar.xml`);
  if (!response.ok) throw new Error(`sitemap-ar.xml returned ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => decodeURIComponent(new URL(decodeEntities(match[1])).pathname))
    .sort();
}

/** The English address of an Arabic path: the same page without the prefix. */
export function englishPathOf(arabicPath: string) {
  return arabicPath.replace(/^\/ar/, "") || "/";
}

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
}

/** Walks `items` with a bounded number of requests in flight. */
export async function mapLimit<T, R>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      for (let index = next++; index < items.length; index = next++) {
        results[index] = await worker(items[index]);
      }
    }),
  );
  return results;
}

import type { CmsEdition } from "@/lib/cms/edition";
import { loadCms, saveCms } from "@/lib/cms/store";
import { contentStorage, flushContentWrites } from "@/lib/storage";

/** Public URL prefix of CMS uploads. The storage key is `public` + this path. */
const UPLOADS_URL_PREFIX = "/uploads/articles/";

/**
 * Drop one media row and, when the URL is an upload we own, its object.
 *
 * The object delete is made durable before the CMS row is rewritten. `remove`
 * does not throw when the object is already gone, so a missing file still
 * drops the row. A bad key (`..`, empty segment, backslash) or any other
 * synchronous storage error throws here and leaves the row in place. An
 * asynchronous delete failure also throws from the first flush, before
 * `saveCms`, so a failed delete cannot leave the bytes in the bucket with no
 * CMS record pointing at them.
 *
 * URLs outside `/uploads/articles/` are catalog rows only (an external image).
 * Those skip object deletion.
 */
export async function deleteCmsMediaRecord(
  edition: CmsEdition,
  id: string | undefined,
): Promise<{ ok: true } | { ok: false; status: 404 }> {
  if (!id) return { ok: false, status: 404 };
  const store = loadCms(edition);
  const item = store.media.find((media) => media.id === id);
  if (!item) return { ok: false, status: 404 };

  if (item.url.startsWith(UPLOADS_URL_PREFIX)) {
    contentStorage().remove(`public${item.url}`);
    await flushContentWrites();
  }

  const current = loadCms(edition);
  current.media = current.media.filter((media) => media.id !== id);
  saveCms(current, edition);
  return { ok: true };
}

import type { MediaItem } from "@/lib/cms/types";

export const CMS_IMAGE_ACCEPT = "image/webp,image/png,image/jpeg,image/gif,image/svg+xml";

const EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png", ".gif", ".svg"];
const MAX_BYTES = 8 * 1024 * 1024;

export function isCmsImageFile(file: File) {
  const ext = file.name.includes(".") ? `.${file.name.split(".").pop()?.toLowerCase()}` : "";
  return file.type.startsWith("image/") || EXTENSIONS.includes(ext);
}

export async function uploadCmsMedia(file: File): Promise<MediaItem> {
  if (!isCmsImageFile(file)) {
    throw new Error("Choose a WebP, JPG, PNG, GIF or SVG.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Keep images under 8 MB.");
  }
  const form = new FormData();
  form.set("file", file);
  const res = await fetch("/api/cms/media", { method: "POST", body: form });
  const item = (await res.json()) as MediaItem & { error?: string };
  if (!res.ok) {
    throw new Error(item.error || "Upload failed.");
  }
  return item;
}

export async function uploadCmsMediaMany(files: Iterable<File>): Promise<MediaItem[]> {
  const items: MediaItem[] = [];
  let lastError = "";
  for (const file of files) {
    try {
      items.push(await uploadCmsMedia(file));
    } catch (err) {
      lastError = err instanceof Error ? err.message : "Upload failed.";
    }
  }
  if (!items.length) {
    throw new Error(lastError || "Upload failed.");
  }
  return items;
}

import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { groupForKey } from "@/lib/storage/r2";
import {
  assertPreviewTarget,
  buildPreviewPacks,
  PREVIEW_BUCKET_NAME,
  PREVIEW_MANIFEST_KEY,
  PREVIEW_VERSION_KEY,
  PreviewPackError,
  validatePreviewPack,
  type EditionFile,
  type PreviewWranglerConfig,
} from "@/lib/storage/packed-edition";

export type PackPreviewPlan = ReturnType<typeof buildPreviewPacks> & {
  bucket: typeof PREVIEW_BUCKET_NAME;
  skipped: string[];
};

export function stripJsonComments(text: string): string {
  return text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'])\/\/.*$/gm, "$1");
}

export function loadPreviewConfig(configPath: string): PreviewWranglerConfig {
  return JSON.parse(stripJsonComments(readFileSync(configPath, "utf8"))) as PreviewWranglerConfig;
}

function walk(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".")) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else found.push(full);
  }
  return found;
}

/** Read `content/` and build the preview objects. Does not touch R2. */
export function planPreviewPacks(contentRoot: string, stamp: string, generatedAt: string): PackPreviewPlan {
  const groups = new Map<string, EditionFile[]>();
  const skipped: string[] = [];
  for (const full of walk(contentRoot)) {
    const key = `content/${path.relative(contentRoot, full).split(path.sep).join("/")}`;
    const group = groupForKey(key);
    if (!group) {
      skipped.push(key);
      continue;
    }
    const files = groups.get(group) ?? [];
    files.push({ key, bytes: new Uint8Array(readFileSync(full)) });
    groups.set(group, files);
  }
  const built = buildPreviewPacks({ groups, stamp, generatedAt });
  const checked = validatePreviewPack({
    manifestBytes: built.objects.get(PREVIEW_MANIFEST_KEY)!,
    versionBytes: built.objects.get(PREVIEW_VERSION_KEY)!,
    packBytes: built.objects,
  });
  for (const [key, bytes] of checked.files) {
    const source = groups.get(groupForKey(key) ?? "")?.find((file) => file.key === key);
    if (!source || Buffer.compare(bytes, source.bytes) !== 0) throw new PreviewPackError(`preview pack validation mismatch for ${key}`);
  }
  return { ...built, bucket: PREVIEW_BUCKET_NAME, skipped };
}

export function previewObjectNames(plan: PackPreviewPlan): string[] {
  return [...plan.objects.keys()].sort();
}

export type PackPreviewArgs = {
  configPath: string | null;
  upload: boolean;
  dryRun: boolean;
  contentRoot: string;
  stamp: string;
};

export function parsePackPreviewArgs(argv: string[], defaults?: { contentRoot?: string; stamp?: string }): PackPreviewArgs {
  let configPath: string | null = null;
  let contentRoot = defaults?.contentRoot ?? path.join(process.cwd(), "content");
  let stamp = defaults?.stamp ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const flags = new Set<string>();
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--config" || arg === "--content" || arg === "--stamp") {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) throw new PreviewPackError(`${arg} requires a value`);
      if (arg === "--config") configPath = path.resolve(value);
      if (arg === "--content") contentRoot = path.resolve(value);
      if (arg === "--stamp") stamp = value;
      index += 1;
    } else if (arg.startsWith("--config=")) configPath = path.resolve(arg.slice("--config=".length));
    else flags.add(arg);
  }
  const upload = flags.has("--upload");
  return { configPath, upload, dryRun: !upload || flags.has("--dry-run"), contentRoot, stamp };
}

export type PackPreviewUploader = (bucket: string, key: string, body: Uint8Array, contentType: string) => Promise<void>;

/**
 * Plan a preview pack. Upload only when `--upload` is set, the confirm env
 * matches, and the config is the preview Worker. `--dry-run` wins over `--upload`.
 * There is no default config path.
 */
export async function runPackPreview(
  argv: string[],
  options?: { uploader?: PackPreviewUploader; env?: NodeJS.ProcessEnv; contentRoot?: string; stamp?: string; now?: string },
): Promise<PackPreviewPlan> {
  const args = parsePackPreviewArgs(argv, { contentRoot: options?.contentRoot, stamp: options?.stamp });
  if (!args.configPath) {
    throw new PreviewPackError("refusing to choose a bucket: pass --config wrangler.preview.jsonc");
  }
  const config = loadPreviewConfig(args.configPath);
  assertPreviewTarget(config);
  const plan = planPreviewPacks(args.contentRoot, args.stamp, options?.now ?? new Date().toISOString());
  const names = previewObjectNames(plan);
  for (const key of names) {
    if (key !== PREVIEW_MANIFEST_KEY && key !== PREVIEW_VERSION_KEY && !key.startsWith("content/.packs/")) {
      throw new PreviewPackError(`refusing unexpected preview object ${key}`);
    }
  }
  const ratio = plan.rawBytes === 0 ? 0 : plan.packBytes / plan.rawBytes;
  console.log(
    JSON.stringify({
      bucket: plan.bucket,
      files: plan.fileCount,
      rawBytes: plan.rawBytes,
      packBytes: plan.packBytes,
      ratio: Number(ratio.toFixed(4)),
      objects: names,
      skipped: plan.skipped,
      upload: !args.dryRun,
    }),
  );
  if (args.dryRun) {
    console.log("dry-run: no objects uploaded");
    return plan;
  }
  const env = options?.env ?? process.env;
  if (env.GAF_PREVIEW_PACK_CONFIRM !== PREVIEW_BUCKET_NAME) {
    throw new PreviewPackError(`refusing upload until GAF_PREVIEW_PACK_CONFIRM=${PREVIEW_BUCKET_NAME}`);
  }
  const uploader = options?.uploader ?? putPreviewObject;
  for (const key of names) {
    const body = plan.objects.get(key);
    if (!body) throw new PreviewPackError(`missing planned object ${key}`);
    await uploader(PREVIEW_BUCKET_NAME, key, body, key.endsWith(".json") ? "application/json; charset=utf-8" : "application/octet-stream");
  }
  console.log(`uploaded ${names.length} objects to ${PREVIEW_BUCKET_NAME}`);
  return plan;
}

async function putPreviewObject(bucket: string, key: string, body: Uint8Array, contentType: string) {
  if (bucket !== PREVIEW_BUCKET_NAME) throw new PreviewPackError(`refusing upload to ${bucket}`);
  const account = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!account || !token) throw new PreviewPackError("CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN are required to upload");
  const encoded = key.split("/").map((part) => encodeURIComponent(part)).join("/");
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/r2/buckets/${bucket}/objects/${encoded}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": contentType },
    body: Buffer.from(body),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new PreviewPackError(`put ${bucket}/${key} failed: ${response.status} ${text.slice(0, 180)}`);
  }
  await response.arrayBuffer();
}

export function previewReportBytes(plan: PackPreviewPlan): { files: number; rawBytes: number; packBytes: number; ratio: number } {
  return {
    files: plan.fileCount,
    rawBytes: plan.rawBytes,
    packBytes: plan.packBytes,
    ratio: plan.rawBytes === 0 ? 0 : plan.packBytes / plan.rawBytes,
  };
}

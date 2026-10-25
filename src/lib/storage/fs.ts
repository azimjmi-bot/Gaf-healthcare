import {
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { normaliseKey, type ContentStorage } from "@/lib/storage/types";

function isMissing(error: unknown) {
  return typeof error === "object" && error !== null && (error as { code?: string }).code === "ENOENT";
}

/**
 * The file-system backend: content lives in the checkout, under the process
 * working directory, exactly as it always has on Hostinger and in local
 * development. This is the default and the only backend active in production
 * until the hosting migration switches it.
 *
 * Writes are atomic through a sibling temporary file and `rename`, which is
 * what every store did individually before this module existed.
 */
export class FsContentStorage implements ContentStorage {
  readonly kind = "fs";
  readonly root: string;

  constructor(root: string = process.cwd()) {
    this.root = root;
  }

  private pathFor(key: string) {
    return join(this.root, ...normaliseKey(key).split("/"));
  }

  read(key: string): string | null {
    try {
      return readFileSync(this.pathFor(key), "utf8");
    } catch (error) {
      if (isMissing(error)) return null;
      throw error;
    }
  }

  readBytes(key: string): Uint8Array | null {
    try {
      return readFileSync(this.pathFor(key));
    } catch (error) {
      if (isMissing(error)) return null;
      throw error;
    }
  }

  write(key: string, data: string | Uint8Array): void {
    const file = this.pathFor(key);
    mkdirSync(dirname(file), { recursive: true });
    const tmp = `${file}.${process.pid}.${Date.now()}.tmp`;
    try {
      writeFileSync(tmp, data);
      renameSync(tmp, file);
    } catch (error) {
      rmSync(tmp, { force: true });
      throw error;
    }
  }

  remove(key: string): void {
    try {
      unlinkSync(this.pathFor(key));
    } catch (error) {
      if (!isMissing(error)) throw error;
    }
  }

  list(prefix: string): string[] {
    const base = normaliseKey(prefix);
    try {
      return readdirSync(this.pathFor(base), { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => `${base}/${entry.name}`)
        .sort();
    } catch (error) {
      if (isMissing(error)) return [];
      throw error;
    }
  }

  version(key: string): string | null {
    try {
      const stat = statSync(this.pathFor(key));
      return `${stat.mtimeMs}:${stat.size}`;
    } catch (error) {
      if (isMissing(error)) return null;
      throw error;
    }
  }

  flush(): Promise<void> {
    // Every write above returned only after rename() completed.
    return Promise.resolve();
  }
}

import "server-only";

import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { newId } from "@/lib/cms/types";
import type { AiGenerationRecord } from "@/lib/ai/types";

const FILE = join(process.cwd(), "content/ai-generations.json");
const MAX = 200;

type Store = { generations: AiGenerationRecord[] };

function load(): Store {
  try {
    const parsed = JSON.parse(readFileSync(FILE, "utf8")) as Store;
    return { generations: Array.isArray(parsed.generations) ? parsed.generations : [] };
  } catch {
    return { generations: [] };
  }
}

function save(store: Store) {
  mkdirSync(dirname(FILE), { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  writeFileSync(tmp, `${JSON.stringify({ generations: store.generations.slice(0, MAX) }, null, 2)}\n`);
  renameSync(tmp, FILE);
}

export function listGenerations(recordId?: string) {
  const rows = load().generations;
  return recordId ? rows.filter((row) => row.recordId === recordId) : rows.slice(0, 40);
}

export function getGeneration(id: string) {
  return load().generations.find((row) => row.id === id);
}

export function saveGeneration(row: Omit<AiGenerationRecord, "id" | "createdAt">) {
  const store = load();
  const record: AiGenerationRecord = {
    ...row,
    id: newId("ai"),
    createdAt: new Date().toISOString(),
  };
  store.generations.unshift(record);
  save(store);
  return record;
}

export function updateGeneration(id: string, patch: Partial<AiGenerationRecord>) {
  const store = load();
  const index = store.generations.findIndex((row) => row.id === id);
  if (index < 0) return null;
  const next = { ...store.generations[index], ...patch, id, createdAt: store.generations[index].createdAt };
  store.generations[index] = next;
  save(store);
  return store.generations[index];
}

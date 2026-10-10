import "server-only";

import { HOURLY_GENERATION_LIMIT } from "@/lib/ai/config";

const hits: number[] = [];
let inflight = 0;

export function beginGeneration() {
  const now = Date.now();
  while (hits.length && now - hits[0] > 60 * 60 * 1000) hits.shift();
  if (inflight > 0) {
    return "A generation is already running. Wait for it to finish.";
  }
  if (hits.length >= HOURLY_GENERATION_LIMIT) {
    return "The desk has reached the hourly generation limit. Try again later.";
  }
  inflight += 1;
  hits.push(now);
  return null;
}

export function endGeneration() {
  inflight = Math.max(0, inflight - 1);
}

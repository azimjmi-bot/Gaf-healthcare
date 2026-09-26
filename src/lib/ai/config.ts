import "server-only";

export const OPENAI_NOT_CONFIGURED =
  "AI service is not configured. Please configure OPENAI_API_KEY in the server environment.";

export const OPENAI_FAILED = "AI generation failed. Please try again.";

export const MAX_INSTRUCTION_CHARS = 4000;
export const MAX_OUTPUT_TOKENS = 3500;
export const HOURLY_GENERATION_LIMIT = 30;

export function openaiApiKey() {
  const value = process.env.OPENAI_API_KEY?.trim();
  return value || "";
}

export function openaiConfigured() {
  return openaiApiKey().length > 0;
}

export function openaiModel() {
  return process.env.OPENAI_MODEL?.trim() || "gpt-4.1-mini";
}

export function publicAiError(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  if (/api key|authentication|401/i.test(message)) {
    return OPENAI_NOT_CONFIGURED;
  }
  if (/credit|quota|insufficient/i.test(message)) {
    return "The OpenAI account has no remaining credits. Add credit, then try again.";
  }
  if (/rate limit|429/i.test(message)) {
    return "The AI service is busy. Wait a moment and try again.";
  }
  if (/timeout|timed out/i.test(message)) {
    return "The AI service timed out. Please try again.";
  }
  return OPENAI_FAILED;
}

import "server-only";

export const OPENAI_NOT_CONFIGURED =
  "AI service is not configured. Please configure OPENAI_API_KEY in the server environment.";

export const OPENAI_FAILED = "AI generation failed. Please try again.";

export const MAX_INSTRUCTION_CHARS = 4000;
export const MAX_OUTPUT_TOKENS = 3500;
export const HOURLY_GENERATION_LIMIT = 30;

function runtimeEnv(name: string) {
  // Bracket access keeps Hostinger's runtime value. Dot access can be inlined
  // as empty when the Hostinger build ran before OPENAI_API_KEY was set.
  const env = process.env as Record<string, string | undefined>;
  return env[name]?.trim() || "";
}

export function openaiApiKey() {
  return runtimeEnv("OPENAI_API_KEY");
}

export function openaiConfigured() {
  return openaiApiKey().length > 0;
}

export function openaiModel() {
  return runtimeEnv("OPENAI_MODEL") || "gpt-4.1-mini";
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

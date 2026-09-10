import { errorCategory, sanitizeTranslationError } from "@/lib/i18n/diagnostics";

export type TranslateRequest = {
  contents: string[];
  mimeType: "text/plain" | "text/html";
  targetLanguageCode: string;
};

export type TranslateFn = (request: TranslateRequest) => Promise<string[]>;

type ServiceAccount = {
  client_email?: string;
  private_key?: string;
  project_id?: string;
};

let testFn: TranslateFn | null = null;
let clientPromise: Promise<{ translateText: TranslateFn; projectId: string; location: string }> | null = null;

export function setTranslateFnForTests(fn: TranslateFn | null) {
  testFn = fn;
}

export function translationProjectId() {
  return (
    process.env.GOOGLE_CLOUD_PROJECT_ID ||
    process.env.GOOGLE_CLOUD_PROJECT ||
    parsedCredentials()?.project_id ||
    ""
  );
}

function parsedCredentials(): ServiceAccount | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ServiceAccount;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON");
  }
}

export function translationConfigured() {
  if (testFn) return true;
  return Boolean(parsedCredentials() && translationProjectId());
}

async function getClient() {
  if (testFn) {
    return {
      translateText: testFn,
      projectId: translationProjectId() || "test",
      location: process.env.GOOGLE_TRANSLATE_LOCATION || "global",
    };
  }
  if (!clientPromise) {
    clientPromise = (async () => {
      const credentials = parsedCredentials();
      const projectId = translationProjectId();
      if (!credentials?.client_email || !credentials.private_key || !projectId) {
        throw new Error("Google Translation is not configured");
      }
      const { v3 } = await import("@google-cloud/translate");
      const location = process.env.GOOGLE_TRANSLATE_LOCATION || "global";
      const client = new v3.TranslationServiceClient({
        projectId,
        credentials: {
          client_email: credentials.client_email,
          private_key: credentials.private_key,
        },
      });
      const glossaryId = process.env.GOOGLE_TRANSLATE_GLOSSARY_ID;
      const translateText: TranslateFn = async (request) => {
        if (request.contents.length === 0) return [];
        const parent = `projects/${projectId}/locations/${location}`;
        const glossaryConfig =
          glossaryId && location !== "global"
            ? {
                glossary: `projects/${projectId}/locations/${location}/glossaries/${glossaryId}`,
                ignoreCase: true,
              }
            : undefined;
        const [response] = await client.translateText({
          parent,
          contents: request.contents,
          mimeType: request.mimeType,
          sourceLanguageCode: "en",
          targetLanguageCode: request.targetLanguageCode,
          ...(glossaryConfig ? { glossaryConfig } : {}),
        });
        return (response.translations ?? []).map((row) => row.translatedText || "");
      };
      return { translateText, projectId, location };
    })();
  }
  return clientPromise;
}

const MAX_CODEPOINTS = 24_000;
const MAX_SEGMENTS = 128;

function codePoints(value: string) {
  return [...value].length;
}

export async function translateSegments(
  contents: string[],
  mimeType: "text/plain" | "text/html",
  targetLanguageCode: string,
) {
  if (contents.length === 0) return [];
  const client = await getClient();
  const out: string[] = [];
  let batch: string[] = [];
  let size = 0;

  async function flush() {
    if (batch.length === 0) return;
    const translated = await client.translateText({
      contents: batch,
      mimeType,
      targetLanguageCode,
    });
    if (translated.length !== batch.length) {
      throw new Error("Google Translation returned an unexpected segment count");
    }
    out.push(...translated);
    batch = [];
    size = 0;
  }

  for (const part of contents) {
    const len = codePoints(part);
    if (batch.length >= MAX_SEGMENTS || size + len > MAX_CODEPOINTS) {
      await flush();
    }
    batch.push(part);
    size += len;
  }
  await flush();
  return out;
}

export { sanitizeTranslationError, errorCategory };

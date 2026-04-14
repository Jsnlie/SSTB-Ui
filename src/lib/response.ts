export function toStringSafe(value: unknown) {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  return String(value);
}

export function toNumberSafe(value: unknown) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function normalizeArray<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];

  if (payload && typeof payload === "object") {
    const withData = payload as { data?: unknown; items?: unknown };

    if (Array.isArray(withData.data)) return withData.data as T[];
    if (Array.isArray(withData.items)) return withData.items as T[];

    const nestedData = withData.data as { items?: unknown } | undefined;
    if (nestedData && Array.isArray(nestedData.items)) return nestedData.items as T[];
  }

  return [];
}

export function getErrorMessage(text: string, fallback: string) {
  if (!text) return fallback;
  try {
    const parsed = JSON.parse(text) as { message?: string; title?: string };
    return parsed?.message || parsed?.title || fallback;
  } catch {
    return text;
  }
}

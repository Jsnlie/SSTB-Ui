import { normalizeArray, toNumberSafe, toStringSafe } from "./response";

export interface AcaraItem {
  id: number;
  title: string;
  date: string;
  time: string;
}

export function parseAcaraListResponse(payload: unknown): AcaraItem[] {
  const source = normalizeArray<unknown>(payload);

  return source.map((item) => {
    const raw = item as {
      id?: unknown;
      title?: unknown;
      date?: unknown;
      time?: unknown;
    };

    return {
      id: toNumberSafe(raw?.id),
      title: toStringSafe(raw?.title),
      date: toStringSafe(raw?.date),
      time: toStringSafe(raw?.time),
    };
  });
}

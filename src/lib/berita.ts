export interface BeritaItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  author: string;
  content?: string;
}

export const BERITA_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1469&auto=format&fit=crop";

function toStringSafe(value: unknown) {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  return String(value);
}

function toNumberSafe(value: unknown) {
  if (typeof value === "number") return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function mapBeritaItem(raw: any): BeritaItem {
  return {
    id: toNumberSafe(raw?.id),
    title: toStringSafe(raw?.title),
    excerpt: toStringSafe(raw?.excerpt),
    image: toStringSafe(raw?.image),
    date: toStringSafe(raw?.date),
    category: toStringSafe(raw?.category),
    author: toStringSafe(raw?.author),
    content: toStringSafe(raw?.content) || undefined,
  };
}

export function parseBeritaListResponse(payload: any): BeritaItem[] {
  if (Array.isArray(payload)) return payload.map(mapBeritaItem);
  if (Array.isArray(payload?.data)) return payload.data.map(mapBeritaItem);
  if (Array.isArray(payload?.items)) return payload.items.map(mapBeritaItem);
  return [];
}

export function parseBeritaDetailResponse(payload: any): BeritaItem | null {
  if (!payload) return null;
  const source = payload?.data ?? payload;
  if (!source || typeof source !== "object") return null;
  return mapBeritaItem(source);
}

export function formatBeritaDate(value: string) {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function looksLikeHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

export function sanitizeRichHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son[a-z]+=\"[^\"]*\"/gi, "")
    .replace(/\son[a-z]+=\'[^\']*\'/gi, "")
    .replace(/javascript:/gi, "");
}

export function getBeritaContent(item: BeritaItem) {
  return item.content?.trim() || item.excerpt?.trim() || "";
}

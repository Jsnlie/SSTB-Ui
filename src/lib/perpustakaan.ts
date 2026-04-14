import { apiUrl } from "./api";
import { normalizeArray, toNumberSafe, toStringSafe } from "./response";

export type LibraryStatus = "Published" | "Draft";

export interface LibraryBook {
  id: number;
  slug: string;
  title: string;
  author: string;
  releaseDate: string;
  category: string;
  isbn: string;
  cover: string;
  description: string;
  content: string;
  pdfUrl: string;
  status: LibraryStatus;
  pages: string[];
}

export interface LibraryUpsertInput {
  id?: number;
  slug?: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  releaseDate: string;
  cover: string;
  description: string;
  content?: string;
  pdfUrl?: string;
  status: LibraryStatus;
}

export const LIBRARY_COVER_FALLBACK =
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=870&auto=format&fit=crop";

function pickString(source: any, keys: string[]) {
  for (const key of keys) {
    const value = toStringSafe(source?.[key]).trim();
    if (value) return value;
  }
  return "";
}

function pickUrl(source: any, keys: string[]) {
  for (const key of keys) {
    const picked = source?.[key];

    if (typeof picked === "string" && picked.trim()) {
      return picked.trim();
    }

    if (!picked || typeof picked !== "object") {
      continue;
    }

    const nested = picked as Record<string, unknown>;
    for (const nestedKey of [
      "url",
      "Url",
      "path",
      "Path",
      "fileUrl",
      "FileUrl",
      "downloadUrl",
      "DownloadUrl",
      "href",
      "Href",
    ]) {
      const nestedValue = nested[nestedKey];
      if (typeof nestedValue === "string" && nestedValue.trim()) {
        return nestedValue.trim();
      }
    }
  }

  return "";
}

function normalizeResourceUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const rewriteApiHostIfNeeded = (urlValue: string) => {
    try {
      const resourceUrl = new URL(urlValue);
      const configuredApiUrl = new URL(apiUrl(""));

      const isResourceLocalhost =
        resourceUrl.hostname === "localhost" || resourceUrl.hostname === "127.0.0.1";
      const hasPublicApiHost =
        configuredApiUrl.hostname !== "localhost" && configuredApiUrl.hostname !== "127.0.0.1";

      if (!isResourceLocalhost || !hasPublicApiHost) {
        return urlValue;
      }

      resourceUrl.protocol = configuredApiUrl.protocol;
      resourceUrl.host = configuredApiUrl.host;
      return resourceUrl.toString();
    } catch {
      return urlValue;
    }
  };

  if (/^https?:\/\//i.test(trimmed)) return rewriteApiHostIfNeeded(trimmed);
  if (trimmed.startsWith("//")) return rewriteApiHostIfNeeded(`https:${trimmed}`);
  if (trimmed.startsWith("/")) return apiUrl(trimmed);
  if (/^www\./i.test(trimmed)) return `https://${trimmed}`;

  // Backend can return file paths without leading slash.
  if (!trimmed.includes(" ") && /\.(pdf|png|jpg|jpeg|webp|gif|svg)(\?|#|$)/i.test(trimmed)) {
    return apiUrl(`/${trimmed}`);
  }

  return trimmed;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function toDateOnly(value: string) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeStatus(raw: any): LibraryStatus {
  const statusValue = pickString(raw, ["status", "publishStatus", "state"]).toLowerCase();
  if (statusValue === "draft") return "Draft";
  if (statusValue === "published") return "Published";

  const boolStatus = raw?.isPublished ?? raw?.published ?? raw?.isActive;
  if (typeof boolStatus === "boolean") {
    return boolStatus ? "Published" : "Draft";
  }

  return "Published";
}

function toPages(raw: any, content: string) {
  const pageCandidates = normalizeArray<any>(raw?.pages)
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);

  if (pageCandidates.length > 0) return pageCandidates;

  const segments = content
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (segments.length > 0) return segments;
  return ["Konten ebook belum tersedia."];
}

function mapLibraryBook(raw: any): LibraryBook {
  const title = pickString(raw, ["title", "name"]);
  const slug = pickString(raw, ["slug"]) || slugify(title || `ebook-${toNumberSafe(raw?.id)}`);
  const content = pickString(raw, ["content", "body", "text"]);

  const releaseDateRaw = pickString(raw, [
    "releaseDate",
    "publishedAt",
    "publishDate",
    "date",
    "createdAt",
  ]);

  return {
    id: toNumberSafe(raw?.id),
    slug,
    title,
    author: pickString(raw, ["author", "writer", "createdBy"]),
    releaseDate: toDateOnly(releaseDateRaw),
    category: pickString(raw, ["category", "genre", "type"]) || "Umum",
    isbn: pickString(raw, ["isbn", "isbn13", "code"]),
    cover: normalizeResourceUrl(
      pickUrl(raw, [
        "cover",
        "Cover",
        "coverUrl",
        "CoverUrl",
        "image",
        "Image",
        "imageUrl",
        "ImageUrl",
        "thumbnail",
        "Thumbnail",
        "thumbnailUrl",
        "ThumbnailUrl",
        "coverImage",
        "CoverImage",
        "filePath",
        "FilePath",
      ])
    ) || LIBRARY_COVER_FALLBACK,
    description: pickString(raw, ["description", "excerpt", "summary"]),
    content,
    pdfUrl: normalizeResourceUrl(
      pickUrl(raw, [
        "pdfUrl",
        "PdfUrl",
        "ebookUrl",
        "EbookUrl",
        "fileUrl",
        "FileUrl",
        "documentUrl",
        "DocumentUrl",
        "attachmentUrl",
        "AttachmentUrl",
        "file",
        "File",
        "attachment",
        "Attachment",
        "content",
        "Content",
        "filePath",
        "FilePath",
      ])
    ),
    status: normalizeStatus(raw),
    pages: toPages(raw, content),
  };
}

export function parseLibraryListResponse(payload: unknown): LibraryBook[] {
  return normalizeArray<any>(payload)
    .map(mapLibraryBook)
    .filter((item) => item.id > 0 || Boolean(item.slug) || Boolean(item.title));
}

export function parseLibraryDetailResponse(payload: unknown): LibraryBook | null {
  if (!payload) return null;

  const source = (payload as any)?.data ?? payload;

  if (Array.isArray(source)) {
    if (source.length === 0) return null;
    return mapLibraryBook(source[0]);
  }

  if (!source || typeof source !== "object") return null;
  return mapLibraryBook(source);
}

export function getLibraryCategories(items: LibraryBook[]) {
  const unique = Array.from(new Set(items.map((item) => item.category).filter(Boolean)));
  unique.sort((a, b) => a.localeCompare(b));
  return ["Semua Koleksi", ...unique];
}

export function buildLibraryUpsertPayload(input: LibraryUpsertInput) {
  const title = input.title.trim();
  const slug = (input.slug || slugify(title)).trim();

  return {
    id: toNumberSafe(input.id),
    slug,
    title,
    author: input.author.trim(),
    category: input.category.trim(),
    isbn: input.isbn.trim(),
    releaseDate: toDateOnly(input.releaseDate),
    cover: input.cover.trim(),
    description: input.description.trim(),
    content: toStringSafe(input.content).trim(),
    pdfUrl: toStringSafe(input.pdfUrl).trim(),
    ebookUrl: toStringSafe(input.pdfUrl).trim(),
    status: input.status,
    isPublished: input.status === "Published",
  };
}

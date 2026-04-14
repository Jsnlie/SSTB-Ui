import { getMediaById, getMedias, MediaResponse } from "./admin-media";
import { apiUrl } from "./api";

export type MediaType = "Article" | "Video" | "Journal" | "Bulletin" | "Monograph";

export interface MediaItem {
  id: number;
  slug: string;
  type: MediaType;
  title: string;
  description: string;
  author: string;
  image: string;
  meta?: string;
  categoryLabel?: string;
  releaseDate: string;
  category: string;
  referenceCode: string;
  pages: string[];
  pdfUrl?: string;
  videoUrl?: string;
  authorImage?: string;
  authorDescription?: string;
  isbn?: string;
  writer?: string;
  theme?: string;
  tagline?: string;
}

export const readableMediaTypes: MediaType[] = ["Article", "Journal", "Bulletin", "Monograph"];

export const mediaItems: MediaItem[] = [];

function toDisplayType(type: MediaResponse["type"]): MediaType {
  if (type === "article") return "Article";
  if (type === "video") return "Video";
  if (type === "journal") return "Journal";
  if (type === "bulletin") return "Bulletin";
  return "Monograph";
}

function safePages(raw: string) {
  const normalized = raw
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);

  return normalized.length > 0 ? normalized : ["Konten belum tersedia."];
}

function isLikelyUrl(value: string) {
  const trimmed = value.trim();
  return /^https?:\/\//i.test(trimmed) || trimmed.startsWith("/") || /^data:application\/pdf/i.test(trimmed);
}

function isLikelyPdfUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (/^data:application\/pdf/i.test(trimmed)) return true;
  if (trimmed.includes(" ")) return false;
  if (!isLikelyUrl(trimmed)) return false;
  const lower = trimmed.toLowerCase();
  return lower.includes(".pdf") || lower.includes("/file") || lower.includes("download") || lower.includes("document");
}

function resolvePdfSource(...sources: string[]) {
  for (const source of sources) {
    const trimmed = source.trim();
    if (!trimmed) continue;
    if (isLikelyPdfUrl(trimmed)) return trimmed;
  }
  return "";
}

function normalizeResourceUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("//")) return `https:${trimmed}`;
  if (trimmed.startsWith("/")) return apiUrl(trimmed);

  // Backend sometimes returns file path without leading slash.
  if (!trimmed.includes(" ") && /\.(pdf|png|jpg|jpeg|webp|gif|svg)(\?|#|$)/i.test(trimmed)) {
    return apiUrl(`/${trimmed}`);
  }

  return trimmed;
}

export function toPublicMediaItem(media: MediaResponse): MediaItem {
  const type = toDisplayType(media.type);

  if (media.type === "article") {
    const articleContent = media.article?.content || "";
    const articleFileUrl = media.article?.fileUrl || "";
    const articlePdfUrl = resolvePdfSource(articleFileUrl, articleContent);

    return {
      id: media.id,
      slug: media.slug,
      type,
      title: media.title,
      description: media.article?.tagline || media.description || "Artikel belum memiliki deskripsi.",
      author: media.article?.author || media.author || "-",
      image: normalizeResourceUrl(media.coverImage),
      meta: "Article",
      categoryLabel: media.category,
      releaseDate: media.publishedAt,
      category: media.category,
      referenceCode: media.slug || `article-${media.id}`,
      pages: safePages(media.article?.tagline || media.article?.content || ""),
      pdfUrl: articlePdfUrl ? normalizeResourceUrl(articlePdfUrl) : undefined,
      authorImage: media.article?.authorImage || undefined,
      authorDescription: media.article?.authorDescription || undefined,
      tagline: media.article?.tagline || "",
    };
  }

  if (media.type === "video") {
    return {
      id: media.id,
      slug: media.slug,
      type,
      title: media.title,
      description: media.video?.description || media.description || "Video belum memiliki deskripsi.",
      author: media.video?.theme || media.author || "-",
      image: normalizeResourceUrl(media.coverImage),
      meta: "FEATURED VIDEO",
      categoryLabel: media.category,
      releaseDate: media.publishedAt,
      category: media.category,
      referenceCode: media.video?.youtubeUrl || media.slug || `video-${media.id}`,
      pages: [],
      videoUrl: media.video?.youtubeUrl || undefined,
      theme: media.video?.theme || media.author || "",
    };
  }

  if (media.type === "journal") {
    const journalPdfUrl = resolvePdfSource(
      media.journal?.fileUrl || "",
      media.journal?.media || ""
    );

    return {
      id: media.id,
      slug: media.slug,
      type,
      title: media.title,
      description: media.description || journalPdfUrl || "Dokumen jurnal tersedia dalam lampiran.",
      author: media.author || "Editor",
      image: normalizeResourceUrl(media.coverImage),
      meta: "Journal",
      categoryLabel: media.category,
      releaseDate: media.publishedAt,
      category: media.category,
      referenceCode: journalPdfUrl || media.slug || `journal-${media.id}`,
      pages: safePages(`Dokumen jurnal tersedia di URL berikut:\n\n${journalPdfUrl || "-"}`),
      pdfUrl: journalPdfUrl ? normalizeResourceUrl(journalPdfUrl) : undefined,
    };
  }

  if (media.type === "bulletin") {
    const bulletinPdfUrl = resolvePdfSource(
      media.bulletin?.fileUrl || "",
      media.bulletin?.description || "",
      media.bulletin?.titleDescription || "",
      media.bulletin?.media || ""
    );

    return {
      id: media.id,
      slug: media.slug,
      type,
      title: media.title,
      description: media.bulletin?.description || media.bulletin?.titleDescription || media.description || "Bulletin belum memiliki deskripsi.",
      author: media.bulletin?.author || media.author || "-",
      image: normalizeResourceUrl(media.coverImage),
      categoryLabel: media.category,
      releaseDate: media.publishedAt,
      category: media.category,
      referenceCode: bulletinPdfUrl || media.slug || `bulletin-${media.id}`,
      pages: safePages([media.bulletin?.titleDescription, media.bulletin?.description].filter(Boolean).join("\n\n")),
      pdfUrl: bulletinPdfUrl ? normalizeResourceUrl(bulletinPdfUrl) : undefined,
    };
  }

  return {
    id: media.id,
    slug: media.slug,
    type,
    title: media.title,
    description: media.monograph?.descriptionTitle || media.monograph?.synopsis || media.description || "Monograf belum memiliki deskripsi.",
    author: media.monograph?.author || media.author || "-",
    image: normalizeResourceUrl(media.monograph?.image || media.coverImage || ""),
    categoryLabel: media.category,
    releaseDate: media.publishedAt,
    category: media.category,
    referenceCode: media.monograph?.isbn || media.slug || `monograph-${media.id}`,
    pages: safePages([media.monograph?.descriptionTitle, media.monograph?.synopsis].filter(Boolean).join("\n\n")),
    isbn: media.monograph?.isbn || media.isbn || "",
    writer: media.monograph?.writer || media.author || "-",
  };
}

export async function fetchMediaItems() {
  const medias = await getMedias();

  // Fetch detailed data for each media item concurrently so that we receive
  // all internal related objects (article, video, bulletin, etc.) which contain the author, theme, and others.
  const detailedMedias = await Promise.all(
    medias.map(async (media) => {
      try {
        const detail = await getMediaById(media.id);
        return detail ? toPublicMediaItem(detail) : toPublicMediaItem(media);
      } catch {
        return toPublicMediaItem(media);
      }
    })
  );

  return detailedMedias;
}

export async function getMediaBySlug(slug: string) {
  const identifier = slug.trim();
  if (!identifier) return null;

  try {
    const detail = await getMediaById(identifier);
    if (detail) return toPublicMediaItem(detail);
  } catch {
    // Fallback to list lookup if detail endpoint fails for any reason.
  }

  const medias = await fetchMediaItems();
  const matched = medias.find((item) => item.slug === identifier) || null;
  if (!matched) return null;

  try {
    const detailById = await getMediaById(matched.id);
    if (detailById) return toPublicMediaItem(detailById);
  } catch {
    // Keep list-level match as last fallback.
  }

  return matched;
}

export function isReadableMediaType(type: MediaType) {
  return readableMediaTypes.includes(type);
}
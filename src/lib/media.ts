import { getMedias, MediaResponse } from "./admin-media";

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

export function toPublicMediaItem(media: MediaResponse): MediaItem {
  const type = toDisplayType(media.type);

  if (media.type === "article") {
    return {
      id: media.id,
      slug: media.slug,
      type,
      title: media.title,
      description: media.article?.tagline || media.article?.content || "Artikel belum memiliki deskripsi.",
      author: media.article?.author || "-",
      image: media.coverImage,
      meta: "Article",
      categoryLabel: media.category,
      releaseDate: media.publishedAt,
      category: media.category,
      referenceCode: media.slug || `article-${media.id}`,
      pages: safePages(media.article?.content || media.article?.tagline || ""),
    };
  }

  if (media.type === "video") {
    return {
      id: media.id,
      slug: media.slug,
      type,
      title: media.title,
      description: media.video?.description || "Video belum memiliki deskripsi.",
      author: media.video?.theme || "-",
      image: media.coverImage,
      meta: "FEATURED VIDEO",
      categoryLabel: media.category,
      releaseDate: media.publishedAt,
      category: media.category,
      referenceCode: media.video?.youtubeUrl || media.slug || `video-${media.id}`,
      pages: [],
    };
  }

  if (media.type === "journal") {
    return {
      id: media.id,
      slug: media.slug,
      type,
      title: media.title,
      description: media.journal?.fileUrl || "Dokumen jurnal tersedia dalam lampiran.",
      author: "Editor",
      image: media.coverImage,
      meta: "Journal",
      categoryLabel: media.category,
      releaseDate: media.publishedAt,
      category: media.category,
      referenceCode: media.journal?.fileUrl || media.slug || `journal-${media.id}`,
      pages: safePages(`Dokumen jurnal tersedia di URL berikut:\n\n${media.journal?.fileUrl || "-"}`),
    };
  }

  if (media.type === "bulletin") {
    return {
      id: media.id,
      slug: media.slug,
      type,
      title: media.title,
      description: media.bulletin?.description || media.bulletin?.titleDescription || "Bulletin belum memiliki deskripsi.",
      author: media.bulletin?.author || "-",
      image: media.coverImage,
      categoryLabel: media.category,
      releaseDate: media.publishedAt,
      category: media.category,
      referenceCode: media.bulletin?.fileUrl || media.slug || `bulletin-${media.id}`,
      pages: safePages([media.bulletin?.titleDescription, media.bulletin?.description].filter(Boolean).join("\n\n")),
    };
  }

  return {
    id: media.id,
    slug: media.slug,
    type,
    title: media.title,
    description: media.monograph?.descriptionTitle || media.monograph?.synopsis || "Monograf belum memiliki deskripsi.",
    author: media.monograph?.author || "-",
    image: media.coverImage || media.monograph?.image || "",
    categoryLabel: media.category,
    releaseDate: media.publishedAt,
    category: media.category,
    referenceCode: media.monograph?.isbn || media.slug || `monograph-${media.id}`,
    pages: safePages([media.monograph?.descriptionTitle, media.monograph?.synopsis].filter(Boolean).join("\n\n")),
  };
}

export async function fetchMediaItems() {
  const medias = await getMedias();
  return medias.map(toPublicMediaItem);
}

export async function getMediaBySlug(slug: string) {
  const medias = await fetchMediaItems();
  return medias.find((item) => item.slug === slug) || null;
}

export function isReadableMediaType(type: MediaType) {
  return readableMediaTypes.includes(type);
}
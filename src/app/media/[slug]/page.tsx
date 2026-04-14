"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Play,
  Tag,
  User,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { MediaItem } from "../../../lib/media";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { getMediaBySlug } from "../../../lib/media";

function formatReleaseDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();

    if (host.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "").trim();
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (host.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/embed/")) {
        return url;
      }

      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    return null;
  } catch {
    return null;
  }
}

function resolvePdfUrl(media: MediaItem) {
  return media.pdfUrl?.trim() || "";
}

export default function MediaDetailPage() {
  const params = useParams<{ slug: string }>();
  const [activePage, setActivePage] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [media, setMedia] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError("");
        const detail = await getMediaBySlug(params.slug);
        setMedia(detail);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Gagal memuat detail media");
        }
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!media) {
    notFound();
  }

  const totalPages = Math.max(media.pages.length, 1);
  const safePage = Math.min(activePage, totalPages - 1);
  const activeContent = media.pages[safePage] || "Konten belum tersedia.";
  const resolvedPdfUrl = resolvePdfUrl(media);
  const isMonograph = media.type === "Monograph";
  const hasPdf = !isMonograph && Boolean(resolvedPdfUrl);
  const isVideo = media.type === "Video";
  const videoEmbedUrl = media.videoUrl ? getYouTubeEmbedUrl(media.videoUrl) : null;
  const pdfSrc = hasPdf
    ? `${resolvedPdfUrl}${resolvedPdfUrl.includes("#") ? "&" : "#"}toolbar=1&navpanes=0&view=FitH&zoom=page-fit`
    : "";

  return (
    <div className="bg-[#eef1f6] min-h-screen">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/media"
          className="inline-flex items-center gap-2 text-[#002366] hover:text-[#001a4d] mb-6"
        >
          <ArrowLeft size={16} />
          Kembali ke Media
        </Link>

        <div className="grid lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <ImageWithFallback
                src={media.image}
                alt={media.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-5">
                <h1 className="text-[#061538] text-3xl [font-family:Georgia,_Times_New_Roman,_serif] mb-3">
                  {media.title}
                </h1>
                
                {media.description && !media.description.startsWith("data:") && !isMonograph && (
                  <p className="text-sm text-gray-600 mb-4">{media.description}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  <div className="flex items-start gap-3 rounded-lg bg-gray-50 px-3 py-2 min-w-0">
                    <User size={15} className="mt-0.5 shrink-0 text-[#002366]" />
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-gray-500">
                        {isMonograph ? "Penulis" : isVideo ? "Tema" : "Author"}
                      </p>
                      <p className="font-medium text-gray-800 break-words">
                        {isMonograph ? media.author || "-" : isVideo ? media.theme || media.author || "-" : media.author || "-"}
                      </p>
                    </div>
                  </div>
                  {isMonograph && media.writer && (
                    <div className="flex items-start gap-3 rounded-lg bg-gray-50 px-3 py-2 min-w-0">
                      <User size={15} className="mt-0.5 shrink-0 text-[#002366]" />
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wide text-gray-500">Editor</p>
                        <p className="font-medium text-gray-800 break-words">{media.writer}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3 rounded-lg bg-gray-50 px-3 py-2 min-w-0">
                    <Calendar size={15} className="mt-0.5 shrink-0 text-[#002366]" />
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Tanggal Rilis</p>
                      <p className="font-medium text-gray-800 break-words">{formatReleaseDate(media.releaseDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-gray-50 px-3 py-2 min-w-0">
                    <Tag size={15} className="mt-0.5 shrink-0 text-[#002366]" />
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Kategori</p>
                      <p className="font-medium text-gray-800 break-words">{media.category}</p>
                    </div>
                  </div>
                  {isMonograph && media.isbn && (
                    <div className="flex items-start gap-3 rounded-lg bg-gray-50 px-3 py-2 min-w-0 col-span-1 sm:col-span-2">
                      <BookOpen size={15} className="mt-0.5 shrink-0 text-[#002366]" />
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wide text-gray-500">ISBN</p>
                        <p className="font-medium text-gray-800 break-words">{media.isbn}</p>
                      </div>
                    </div>
                  )}
                  {media.type !== "Journal" && media.tagline && (
                    <div className="flex items-start gap-3 rounded-lg bg-gray-50 px-3 py-2 min-w-0 col-span-1 sm:col-span-2">
                      <BookOpen size={15} className="mt-0.5 shrink-0 text-[#002366]" />
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wide text-gray-500">Tagline</p>
                        <p className="font-normal text-gray-800 break-words line-clamp-2">{media.tagline}</p>
                      </div>
                    </div>
                  )}
                  {isMonograph && media.description && !media.description.startsWith("data:") && (
                    <div className="flex items-start gap-3 rounded-lg bg-gray-50 px-3 py-2 min-w-0 col-span-1 sm:col-span-2">
                      <BookOpen size={15} className="mt-0.5 shrink-0 text-[#002366]" />
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wide text-gray-500">Sinopsis</p>
                        <p className="font-normal text-gray-800 break-words whitespace-pre-wrap">{media.description}</p>
                      </div>
                    </div>
                  )}
                </div>

                {media.authorDescription && (
                  <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Tentang Author</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{media.authorDescription}</p>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <main className="lg:col-span-8">
            <div className="bg-[#061538] rounded-t-xl px-4 py-3 flex flex-wrap gap-3 items-center justify-between text-white">
              <p className="text-sm">{isVideo ? "Video Player" : isMonograph ? "Monograph Preview" : hasPdf ? media.title : "Media Reader Preview"}</p>
              {isVideo && media.videoUrl ? (
                <a
                  href={media.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-sm"
                >
                  <ExternalLink size={14} />
                  Buka Video
                </a>
              ) : hasPdf ? (
                <a
                  href={resolvedPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-sm"
                >
                  <ExternalLink size={14} />
                  Tab Baru
                </a>
              ) : isMonograph ? null : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setZoom((prev) => Math.max(80, prev - 10))}
                    className="w-9 h-9 rounded bg-white/10 hover:bg-white/20 inline-flex items-center justify-center"
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="text-sm w-12 text-center">{zoom}%</span>
                  <button
                    type="button"
                    onClick={() => setZoom((prev) => Math.min(140, prev + 10))}
                    className="w-9 h-9 rounded bg-white/10 hover:bg-white/20 inline-flex items-center justify-center"
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className={hasPdf || isVideo || isMonograph ? "bg-white p-4 sm:p-6 rounded-b-xl border border-t-0 border-gray-200" : "bg-[#dbe1eb] p-6 rounded-b-xl border border-t-0 border-gray-200"}>
              {isVideo ? (
                media.videoUrl ? (
                  <div className="space-y-4">
                    {videoEmbedUrl ? (
                      <div className="overflow-hidden rounded-xl border border-gray-200 bg-black shadow-sm aspect-video">
                        <iframe
                          src={videoEmbedUrl}
                          title={`Video ${media.title}`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
                        <p className="text-sm text-gray-600 mb-3">Video tidak dapat di-embed otomatis, buka via link berikut:</p>
                        <a
                          href={media.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-md bg-[#0c34a6] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a2d90]"
                        >
                          <Play size={14} />
                          Tonton Video
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600">
                    Link video belum tersedia.
                  </div>
                )
              ) : isMonograph ? (
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-[#f3f5f9] shadow-sm">
                    <ImageWithFallback
                      src={media.image}
                      alt={`Monograph ${media.title}`}
                      className="mx-auto max-h-[80vh] w-full object-contain"
                    />
                  </div>
                  {media.description ? (
                    <p className="text-sm leading-7 text-gray-700">{media.description}</p>
                  ) : null}
                </div>
              ) : hasPdf ? (
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm h-[88vh] sm:h-[92vh]">
                    <iframe
                      src={pdfSrc}
                      title={`PDF ${media.title}`}
                      className="w-full h-full bg-white"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className="bg-white min-h-[520px] mx-auto max-w-3xl shadow-lg rounded p-10"
                    style={{ fontSize: `${zoom}%` }}
                  >
                    <p className="text-xs text-gray-400 mb-6">Media Reader Preview</p>
                    <h2 className="text-[#061538] text-2xl [font-family:Georgia,_Times_New_Roman,_serif] mb-6">
                      {media.title}
                    </h2>
                    <p className="text-gray-700 leading-8">{activeContent}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActivePage((prev) => Math.max(0, prev - 1))}
                      disabled={safePage === 0}
                      className="w-10 h-10 rounded-lg border border-gray-300 bg-white disabled:opacity-50"
                    >
                      <ChevronLeft size={18} className="mx-auto" />
                    </button>
                    <span className="text-sm text-gray-600">
                      Halaman {safePage + 1} dari {totalPages}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActivePage((prev) => Math.min(totalPages - 1, prev + 1))}
                      disabled={safePage === totalPages - 1}
                      className="w-10 h-10 rounded-lg border border-gray-300 bg-white disabled:opacity-50"
                    >
                      <ChevronRight size={18} className="mx-auto" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
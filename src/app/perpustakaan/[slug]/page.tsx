"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, User, Tag, BookOpen, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, ArrowLeft, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { apiUrl } from "../../../lib/api";
import { getErrorMessage } from "../../../lib/response";
import {
  LibraryBook,
  parseLibraryDetailResponse,
} from "../../../lib/perpustakaan";

function formatReleaseDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function EbookDetailPage() {
  const params = useParams<{ slug: string }>();
  const [activePage, setActivePage] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [book, setBook] = useState<LibraryBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setError("");
        setLoading(true);

        const res = await fetch(apiUrl(`/api/Library/${params.slug}`), {
          cache: "no-store",
        });

        if (!res.ok) {
          if (res.status === 404) {
            setBook(null);
            return;
          }

          const text = await res.text().catch(() => "");
          throw new Error(getErrorMessage(text, "Gagal memuat detail ebook"));
        }

        const json = await res.json();
        setBook(parseLibraryDetailResponse(json));
      } catch (err: unknown) {
        setBook(null);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan saat memuat detail ebook");
        }
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchBook();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#002366] border-t-transparent" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="bg-[#eef1f6] min-h-screen">
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/perpustakaan"
            className="inline-flex items-center gap-2 text-[#002366] hover:text-[#001a4d] mb-6"
          >
            <ArrowLeft size={16} />
            Kembali ke Perpustakaan
          </Link>

          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <h1 className="text-2xl text-[#061538] [font-family:Georgia,_Times_New_Roman,_serif] mb-2">
              Ebook Tidak Ditemukan
            </h1>
            <p className="text-gray-600">
              {error || "Data ebook tidak tersedia atau sudah dihapus."}
            </p>
          </div>
        </section>
      </div>
    );
  }

  const totalPages = book.pages.length;
  const hasPdf = Boolean(book.pdfUrl);
  const safeLeftPage = Math.min(Math.max(0, activePage), Math.max(0, totalPages - 1));
  const rightPage = safeLeftPage + 1 < totalPages ? book.pages[safeLeftPage + 1] : "";
  const pdfSrc = hasPdf
    ? `${book.pdfUrl}${book.pdfUrl.includes("#") ? "&" : "#"}toolbar=1&navpanes=0&view=FitH&zoom=page-fit`
    : "";

  const goToPreviousSpread = () => {
    setActivePage((prev) => Math.max(0, prev - 2));
  };

  const goToNextSpread = () => {
    setActivePage((prev) => {
      const next = prev + 2;
      if (next >= totalPages) return prev;
      return next;
    });
  };

  return (
    <div className="bg-[#eef1f6] min-h-screen">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/perpustakaan"
          className="inline-flex items-center gap-2 text-[#002366] hover:text-[#001a4d] mb-6"
        >
          <ArrowLeft size={16} />
          Kembali ke Perpustakaan
        </Link>

        <div className="grid lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <ImageWithFallback
                src={book.cover}
                alt={book.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-5">
                <h1 className="text-[#061538] text-3xl [font-family:Georgia,_Times_New_Roman,_serif] mb-3">
                  {book.title}
                </h1>
                <p className="text-sm text-gray-600 mb-4">{book.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  <div className="flex items-start gap-3 rounded-lg bg-gray-50 px-3 py-2 min-w-0">
                    <User size={15} className="mt-0.5 shrink-0 text-[#002366]" />
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Author</p>
                      <p className="font-medium text-gray-800 break-words">{book.author}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-gray-50 px-3 py-2 min-w-0">
                    <Calendar size={15} className="mt-0.5 shrink-0 text-[#002366]" />
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Tanggal Rilis</p>
                      <p className="font-medium text-gray-800 break-words">{formatReleaseDate(book.releaseDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-gray-50 px-3 py-2 min-w-0">
                    <Tag size={15} className="mt-0.5 shrink-0 text-[#002366]" />
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Kategori</p>
                      <p className="font-medium text-gray-800 break-words">{book.category}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-gray-50 px-3 py-2 min-w-0">
                    <BookOpen size={15} className="mt-0.5 shrink-0 text-[#002366]" />
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-gray-500">ISBN</p>
                      <p className="font-normal text-gray-800 break-words">{book.isbn}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-8">
            <div className="bg-[#061538] rounded-t-xl px-4 py-3 flex flex-wrap gap-3 items-center justify-between text-white">
              <p className="text-sm">{hasPdf ? book.title : "Ebook"}</p>
              {hasPdf ? (
                <a
                  href={book.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-sm"
                >
                  <ExternalLink size={14} />
                  Tab Baru
                </a>
              ) : (
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

            <div className={hasPdf ? "bg-white p-4 sm:p-6 rounded-b-xl border border-t-0 border-gray-200" : "bg-[#dbe1eb] p-6 rounded-b-xl border border-t-0 border-gray-200"}>
              {hasPdf ? (
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm h-[88vh] sm:h-[92vh]">
                    <iframe
                      src={pdfSrc}
                      title={`PDF ${book.title}`}
                      className="w-full h-full bg-white"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative mx-auto max-w-5xl rounded-2xl border border-[#bfae8c] bg-[#ede2cc] p-4 sm:p-6 shadow-[0_20px_40px_rgba(27,18,4,0.2)]">
                    <div className="pointer-events-none absolute top-4 bottom-4 left-1/2 w-2 -translate-x-1/2 rounded-full bg-[#ceb98f] opacity-60 hidden md:block" />
                    <div className="grid md:grid-cols-2 gap-4">
                      <article
                        className="rounded-lg border border-[#cab996] bg-[#f7f0df] min-h-[460px] p-7 leading-8 text-[#3f3523]"
                        style={{ fontSize: `${zoom}%` }}
                      >
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a7852] mb-4">Halaman {safeLeftPage + 1}</p>
                        <h2 className="text-2xl [font-family:Georgia,_Times_New_Roman,_serif] text-[#33260f] mb-5">{book.title}</h2>
                        <p>{book.pages[safeLeftPage]}</p>
                      </article>

                      <article
                        className="rounded-lg border border-[#cab996] bg-[#f7f0df] min-h-[460px] p-7 leading-8 text-[#3f3523]"
                        style={{ fontSize: `${zoom}%` }}
                      >
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a7852] mb-4">
                          {rightPage ? `Halaman ${safeLeftPage + 2}` : "Akhir Buku"}
                        </p>
                        {rightPage ? <p>{rightPage}</p> : <p className="italic text-[#7d6b47]">Tidak ada halaman lanjutan.</p>}
                      </article>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={goToPreviousSpread}
                      disabled={safeLeftPage === 0}
                      className="w-10 h-10 rounded-lg border border-gray-300 bg-white disabled:opacity-50"
                    >
                      <ChevronLeft size={18} className="mx-auto" />
                    </button>
                    <span className="text-sm text-gray-600">
                      Lembar {Math.floor(safeLeftPage / 2) + 1} • Halaman {safeLeftPage + 1}
                      {rightPage ? `-${safeLeftPage + 2}` : ""} dari {totalPages}
                    </span>
                    <button
                      type="button"
                      onClick={goToNextSpread}
                      disabled={safeLeftPage + 2 >= totalPages}
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

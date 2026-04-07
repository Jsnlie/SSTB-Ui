"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { Calendar, User, Tag, BookOpen, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { getBookBySlug } from "../../../lib/perpustakaan";

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

  const book = useMemo(() => getBookBySlug(params.slug), [params.slug]);

  if (!book) {
    notFound();
  }

  const totalPages = book.pages.length;
  const safePage = Math.min(activePage, totalPages - 1);

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

                <div className="space-y-2 text-sm text-gray-700">
                  <p className="inline-flex items-center gap-2"><User size={14} /> Author: {book.author}</p>
                  <p className="inline-flex items-center gap-2"><Calendar size={14} /> Tanggal Rilis: {formatReleaseDate(book.releaseDate)}</p>
                  <p className="inline-flex items-center gap-2"><Tag size={14} /> Kategori: {book.category}</p>
                  <p className="inline-flex items-center gap-2"><BookOpen size={14} /> ISBN: {book.isbn}</p>
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-8">
            <div className="bg-[#061538] rounded-t-xl px-4 py-3 flex flex-wrap gap-3 items-center justify-between text-white">
              <p className="text-sm">PDF Reader Preview</p>
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
            </div>

            <div className="bg-[#dbe1eb] p-6 rounded-b-xl border border-t-0 border-gray-200">
              <div className="bg-white min-h-[520px] mx-auto max-w-3xl shadow-lg rounded p-10" style={{ fontSize: `${zoom}%` }}>
                <p className="text-xs text-gray-400 mb-6">Ebook Preview</p>
                <h2 className="text-[#061538] text-2xl [font-family:Georgia,_Times_New_Roman,_serif] mb-6">
                  {book.title}
                </h2>
                <p className="text-gray-700 leading-8">{book.pages[safePage]}</p>
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
                <span className="text-sm text-gray-600">Halaman {safePage + 1} dari {totalPages}</span>
                <button
                  type="button"
                  onClick={() => setActivePage((prev) => Math.min(totalPages - 1, prev + 1))}
                  disabled={safePage === totalPages - 1}
                  className="w-10 h-10 rounded-lg border border-gray-300 bg-white disabled:opacity-50"
                >
                  <ChevronRight size={18} className="mx-auto" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}

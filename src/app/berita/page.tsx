"use client";

import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiUrl } from "../../lib/api";
import {
  BERITA_IMAGE_FALLBACK,
  BeritaItem,
  formatBeritaDate,
  parseBeritaListResponse,
  stripHtml,
} from "../../lib/berita";
import { getErrorMessage } from "../../lib/response";

const PAGE_SIZE = 6;

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

export default function Berita() {
  const [data, setData] = useState<BeritaItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        const res = await fetch(apiUrl("/api/berita"));

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(getErrorMessage(text, "Gagal memuat data berita"));
        }

        const json = await res.json();
        setData(parseBeritaListResponse(json));
      } catch (err: unknown) {
        setData([]);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan saat memuat berita");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = useMemo(() => {
    return [
      "Semua",
      ...Array.from(
        new Set(data.map((item) => item.category).filter((item) => Boolean(item)))
      ).sort((a, b) => a.localeCompare(b)),
    ];
  }, [data]);

  const categoryCounts = useMemo(() => {
    return data.reduce<Record<string, number>>((result, item) => {
      if (!item.category) return result;
      result[item.category] = (result[item.category] || 0) + 1;
      return result;
    }, {});
  }, [data]);

  const filtered = useMemo(() => {
    if (selectedCategory === "Semua") return data;
    return data.filter((item) => item.category === selectedCategory);
  }, [data, selectedCategory]);

  const featuredArticle = filtered[0] || null;
  const listArticles = filtered;

  const totalPages = Math.max(1, Math.ceil(listArticles.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedArticles = listArticles.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE
  );

  const pageNumbers = Array.from({ length: totalPages }, (_, idx) => idx + 1).slice(
    Math.max(0, safeCurrentPage - 3),
    Math.max(0, safeCurrentPage - 3) + 5
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <div>
      {/* Hero */}
      <div className="relative h-80 bg-[#002366] flex items-center justify-center">
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl text-white">Berita</h1>
          <div className="h-1 w-24 bg-[#C41E3A] mx-auto mt-4"></div>
          <p className="text-gray-200 text-base md:text-lg mt-4 max-w-2xl mx-auto px-4">
            Ikuti kabar terbaru, artikel, dan informasi penting dari kegiatan STTB.
          </p>
        </div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Berita"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Featured Article Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="h-96 rounded-lg bg-gray-100 animate-pulse" />
        ) : featuredArticle ? (
          <Link
            href={`/berita/${featuredArticle.id}`}
            className="block relative h-96 rounded-lg overflow-hidden group"
          >
            <ImageWithFallback
              src={featuredArticle.image || BERITA_IMAGE_FALLBACK}
              alt={featuredArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className="inline-block bg-[#C41E3A] px-3 py-1 rounded text-sm mb-3">
                {featuredArticle.category || "Berita"}
              </span>
              <h2 className="text-3xl md:text-4xl mb-3">{featuredArticle.title}</h2>
              <p className="text-gray-200 mb-4 max-w-3xl">
                {truncate(stripHtml(featuredArticle.excerpt), 240)}
              </p>
              <div className="flex items-center text-sm text-gray-300">
                <Calendar size={16} className="mr-2" />
                {formatBeritaDate(featuredArticle.date)}
              </div>
            </div>
          </Link>
        ) : (
          <div className="h-96 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-500 bg-gray-50">
            Belum ada berita untuk ditampilkan.
          </div>
        )}
      </section>

      {/* Main Content - 2 Column Layout */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - News Grid (Masonry) */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl text-[#002366] mb-6">Berita Terbaru</h2>

            {error && (
              <div className="mb-6 p-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700">
                {error}
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="h-72 rounded-lg bg-gray-100 animate-pulse" />
                ))}
              </div>
            ) : paginatedArticles.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
                Tidak ada berita pada kategori ini.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {paginatedArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/berita/${article.id}`}
                    className="block h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <ImageWithFallback
                      src={article.image || BERITA_IMAGE_FALLBACK}
                      alt={article.title}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-4 h-[190px] flex flex-col">
                      <span className="inline-block w-fit text-xs text-white bg-[#002366] px-2 py-1 rounded mb-2">
                        {article.category || "Berita"}
                      </span>
                      <h3 className="text-[#002366] mb-2 group-hover:text-[#C41E3A] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                        {truncate(stripHtml(article.excerpt), 140)}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {formatBeritaDate(article.date)}
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-[#C41E3A] group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {listArticles.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, Math.min(totalPages, prev - 1)))
                  }
                  disabled={safeCurrentPage === 1 || loading}
                  className="p-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </button>

                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded ${
                      safeCurrentPage === page
                        ? "bg-[#002366] text-white"
                        : "border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, Math.min(totalPages, prev + 1)))
                  }
                  disabled={safeCurrentPage === totalPages || loading}
                  className="p-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-2xl text-[#002366] mb-6">Kategori Berita</h2>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`flex items-center justify-between w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        selectedCategory === category
                          ? "bg-[#002366] text-white"
                          : "text-gray-700 hover:bg-[#002366]/5 hover:text-[#002366]"
                      }`}
                    >
                      <span>{category}</span>
                      <span className="text-xs opacity-80">
                        {category === "Semua" ? data.length : categoryCounts[category] || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-lg text-[#002366] mb-4">Ringkasan</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>Total berita: {data.length}</p>
                  <p>Kategori aktif: {selectedCategory}</p>
                  <p>Menampilkan halaman: {safeCurrentPage}</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { apiUrl } from "../../lib/api";
import {
  BERITA_IMAGE_FALLBACK,
  BeritaItem,
  formatBeritaDate,
  parseBeritaListResponse,
  stripHtml,
} from "../../lib/berita";

function getErrorMessage(text: string, fallback: string) {
  if (!text) return fallback;

  try {
    const parsed = JSON.parse(text);
    return parsed?.message || parsed?.title || fallback;
  } catch {
    return text;
  }
}

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function getNewsSortValue(item: BeritaItem) {
  const parsedDate = new Date(item.date).getTime();
  if (!Number.isNaN(parsedDate)) return parsedDate;
  return item.id || 0;
}

export default function LatestNewsSection() {
  const [news, setNews] = useState<BeritaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setError("");
        const res = await fetch(apiUrl("/api/berita"));

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(getErrorMessage(text, "Gagal memuat berita terbaru"));
        }

        const json = await res.json();
        setNews(parseBeritaListResponse(json));
      } catch (err: unknown) {
        setNews([]);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan saat memuat berita terbaru");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const latestNews = useMemo(() => {
    return [...news]
      .sort((a, b) => getNewsSortValue(b) - getNewsSortValue(a))
      .slice(0, 3);
  }, [news]);

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-[#002366] mb-4">Berita Terbaru</h2>
          <div className="h-1 w-20 bg-[#C41E3A] mx-auto"></div>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-80 rounded-lg bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : latestNews.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
            Belum ada berita untuk ditampilkan.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {latestNews.map((item) => (
              <Link
                key={item.id}
                href={`/berita/${item.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <ImageWithFallback
                  src={item.image || BERITA_IMAGE_FALLBACK}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-[#002366] mb-2 group-hover:text-[#C41E3A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {truncate(stripHtml(item.excerpt), 120)}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={12} className="mr-1" />
                    {formatBeritaDate(item.date)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            href="/berita"
            className="inline-flex items-center text-[#002366] hover:text-[#C41E3A] transition-colors"
          >
            Baca Semua Berita
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}

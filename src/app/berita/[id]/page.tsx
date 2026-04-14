"use client";

import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { apiUrl } from "../../../lib/api";
import {
  BERITA_IMAGE_FALLBACK,
  BeritaItem,
  formatBeritaDate,
  getBeritaContent,
  looksLikeHtml,
  parseBeritaDetailResponse,
  parseBeritaListResponse,
  sanitizeRichHtml,
  stripHtml,
} from "../../../lib/berita";
import { getErrorMessage } from "../../../lib/response";

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

export default function ArtikelDetail() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);

  const [article, setArticle] = useState<BeritaItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<BeritaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");

        const detailRes = await fetch(apiUrl(`/api/berita/${id}`));
        if (!detailRes.ok) {
          const text = await detailRes.text().catch(() => "");
          throw new Error(getErrorMessage(text, "Gagal memuat detail berita"));
        }

        const detailJson = await detailRes.json();
        const parsedArticle = parseBeritaDetailResponse(detailJson);
        if (!parsedArticle) {
          throw new Error("Detail berita tidak ditemukan");
        }
        setArticle(parsedArticle);

        const listRes = await fetch(apiUrl("/api/berita"));
        if (listRes.ok) {
          const listJson = await listRes.json();
          const list = parseBeritaListResponse(listJson);
          setRelatedNews(
            list.filter((item) => item.id !== parsedArticle.id).slice(0, 3)
          );
        } else {
          setRelatedNews([]);
        }
      } catch (err: unknown) {
        setArticle(null);
        setRelatedNews([]);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan saat memuat detail berita");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const rawContent = useMemo(() => {
    if (!article) return "";
    return getBeritaContent(article);
  }, [article]);

  const sanitizedContent = useMemo(() => sanitizeRichHtml(rawContent), [rawContent]);
  const isRichTextContent = useMemo(() => looksLikeHtml(rawContent), [rawContent]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white border border-red-200 rounded-lg p-6 text-red-700">
            <h2 className="text-xl mb-2">Berita tidak dapat dimuat</h2>
            <p className="text-sm">{error || "Data berita tidak ditemukan"}</p>
          </div>
          <Link
            href="/berita"
            className="inline-block mt-6 border border-[#002366] text-[#002366] px-4 py-2 rounded hover:bg-[#002366] hover:text-white transition-colors"
          >
            Kembali ke Daftar Berita
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Article Header */}
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl text-[#002366] mb-6">
          {article.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
          <div className="flex items-center text-gray-600">
            <User size={16} className="mr-2 text-[#C41E3A]" />
            <span>{article.author || "Admin"}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2 text-[#C41E3A]" />
            <span>{formatBeritaDate(article.date)}</span>
          </div>
          <div className="flex items-center">
            <Tag size={16} className="mr-2 text-[#C41E3A]" />
            <span className="bg-[#002366] text-white px-3 py-1 rounded text-xs">
              {article.category || "Berita"}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <ImageWithFallback
          src={article.image || BERITA_IMAGE_FALLBACK}
          alt={article.title}
          className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
        />

        {/* Social Share */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b">
          <span className="text-sm text-gray-600 flex items-center">
            <Share2 size={16} className="mr-2" />
            Bagikan:
          </span>
          <button className="p-2 rounded-full bg-[#002366] text-white hover:bg-[#003080] transition-colors">
            <Facebook size={18} />
          </button>
          <button className="p-2 rounded-full bg-[#002366] text-white hover:bg-[#003080] transition-colors">
            <Twitter size={18} />
          </button>
          <button className="p-2 rounded-full bg-[#002366] text-white hover:bg-[#003080] transition-colors">
            <Linkedin size={18} />
          </button>
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none mb-12"
          style={{
            color: "#374151",
          }}
        >
          <style>
            {`
              .prose h3 {
                color: #002366;
                font-size: 1.5rem;
                font-weight: 600;
                margin-top: 2rem;
                margin-bottom: 1rem;
              }
              .prose p {
                margin-bottom: 1.25rem;
                line-height: 1.8;
              }
              .prose ul {
                margin: 1.5rem 0;
                padding-left: 2rem;
              }
              .prose li {
                margin-bottom: 0.75rem;
                line-height: 1.7;
              }
              .prose strong {
                color: #002366;
              }
            `}
          </style>
          {rawContent ? (
            isRichTextContent ? (
              <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            ) : (
              rawContent
                .split("\n")
                .map((paragraph) => paragraph.trim())
                .filter((paragraph) => Boolean(paragraph))
                .map((paragraph, index) => <p key={index}>{paragraph}</p>)
            )
          ) : (
            <p>Konten berita belum tersedia.</p>
          )}
        </div>
      </article>

      {/* Related News Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-[#002366] mb-8 text-center">
            Berita Terkait
          </h2>

          {relatedNews.length === 0 ? (
            <div className="text-center text-gray-500">Belum ada berita terkait.</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {relatedNews.map((news) => (
                <Link
                  key={news.id}
                  href={`/berita/${news.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <ImageWithFallback
                    src={news.image || BERITA_IMAGE_FALLBACK}
                    alt={news.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h3 className="text-[#002366] mb-2 group-hover:text-[#C41E3A] transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {truncate(stripHtml(news.excerpt), 120)}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar size={12} className="mr-1" />
                      {formatBeritaDate(news.date)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              href="/berita"
              className="inline-block border-2 border-[#002366] text-[#002366] px-8 py-3 rounded hover:bg-[#002366] hover:text-white transition-colors"
            >
              Lihat Semua Berita
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

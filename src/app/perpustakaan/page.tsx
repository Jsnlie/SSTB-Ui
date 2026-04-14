"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Search,
  SlidersHorizontal,
  User,
  Calendar,
  Library,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import {
  LibraryBook,
  getLibraryCategories,
  parseLibraryListResponse,
} from "../../lib/perpustakaan";
import { ScrollReveal } from "../../components/ScrollReveal";
import { apiUrl } from "../../lib/api";
import { getErrorMessage } from "../../lib/response";

type ListCategory = string;

const PAGE_SIZE = 6;

export default function PerpustakaanPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ListCategory>("Semua Koleksi");
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = useMemo(() => getLibraryCategories(books), [books]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setError("");
        const res = await fetch(apiUrl("/api/Library"), {
          cache: "no-store",
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(getErrorMessage(text, "Gagal memuat data perpustakaan"));
        }

        const json = await res.json();
        setBooks(parseLibraryListResponse(json));
      } catch (err: unknown) {
        setBooks([]);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan saat memuat data perpustakaan");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return books.filter((book) => {
      const categoryMatch =
        category === "Semua Koleksi" || book.category === category;

      const searchMatch =
        normalizedQuery.length === 0 ||
        book.title.toLowerCase().includes(normalizedQuery) ||
        book.author.toLowerCase().includes(normalizedQuery) ||
        book.isbn.toLowerCase().includes(normalizedQuery);

      return categoryMatch && searchMatch;
    });
  }, [books, category, query]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedBooks = filteredBooks.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE
  );

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1).slice(
    Math.max(0, safeCurrentPage - 2),
    Math.max(0, safeCurrentPage - 2) + 5
  );

  return (
    <div className="bg-[#f3f4f7] min-h-screen">
      <ScrollReveal y={28} amount={0.2}>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-[#C41E3A] mb-4">
              Perpustakaan Digital STTB
            </p>
            <h1 className="text-[#061538] text-5xl md:text-6xl leading-tight mb-6 [font-family:Georgia,_Times_New_Roman,_serif]">
              Temukan Naskah,
              <br />
              <span className="italic">Wawasan, dan</span> Hikmat.
            </h1>
            <p className="text-gray-600 text-lg max-w-xl">
              Jelajahi koleksi ebook teologi, kepemimpinan, dan spiritualitas.
            </p>

            <div className="mt-8">
              <h2 className="text-[#061538] text-2xl font-semibold mb-4">
                Perpustakaan Fisik
              </h2>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://library.sttb.ac.id/"
                  target="_blank"
                  className="px-6 py-3 rounded-lg bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors font-medium"
                >
                  Katalog
                </Link>
                <Link
                  href="https://docs.google.com/forms/d/18xoNEwlURemRdvMCCypUSXAK57Ni1S26j3pHlokUwyM/viewform?chromeless=1&edit_requested=true"
                  target="_blank"
                  className="px-6 py-3 rounded-lg bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors font-medium"
                >
                  Pustaka Pintar
                </Link>
                <Link
                  href="https://library.sttb.ac.id/index.php?p=perpanjang"
                  target="_blank"
                  className="px-6 py-3 rounded-lg bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors font-medium"
                >
                  Perpanjangan Mandiri
                </Link>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-white/70 rounded-xl"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Kurator perpustakaan"
              className="relative w-full h-[420px] object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5 flex flex-col md:flex-row gap-3 md:gap-4 md:items-center">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari judul, penulis, atau ISBN..."
              className="w-full h-12 pl-10 pr-4 rounded-lg bg-[#f3f4f7] border border-transparent focus:border-[#002366] focus:outline-none"
            />
          </div>

          <div className="h-12 px-5 rounded-lg bg-[#002366] text-white inline-flex items-center justify-center gap-2">
            <Library size={16} />
            {loading ? "Memuat..." : `${filteredBooks.length} Ebook`}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-5">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setCategory(item);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                category === item
                  ? "bg-[#002366] text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>
      </ScrollReveal>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-white py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#002366] border-t-transparent" />
          </div>
        ) : paginatedBooks.length === 0 ? (
          <ScrollReveal>
          <div className="bg-white rounded-xl p-10 text-center border border-dashed border-gray-300 text-gray-500">
            Ebook tidak ditemukan. Coba kata kunci lain.
          </div>
          </ScrollReveal>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {paginatedBooks.map((book, index) => (
              <ScrollReveal key={book.id} delay={index * 0.06} amount={0.18}>
              <article
                key={book.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <ImageWithFallback
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <span className="inline-block px-2 py-1 text-xs rounded bg-[#eef2ff] text-[#002366] mb-2">
                    {book.category}
                  </span>
                  <h3 className="text-[#061538] text-xl mb-1 [font-family:Georgia,_Times_New_Roman,_serif]">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{book.description}</p>

                  <div className="space-y-1 text-xs text-gray-500 mb-4">
                    <p className="inline-flex items-center gap-1">
                      <User size={12} /> {book.author}
                    </p>
                    <p className="inline-flex items-center gap-1 ml-2">
                      <Calendar size={12} /> {new Date(book.releaseDate).getFullYear()}
                    </p>
                  </div>

                  <Link
                    href={`/perpustakaan/${book.slug}`}
                    className="w-full h-10 rounded-lg bg-[#002366] text-white hover:bg-[#001a4d] transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <BookOpen size={16} />
                    Baca Ebook
                  </Link>
                </div>
              </article>
              </ScrollReveal>
            ))}
          </div>
        )}

        <ScrollReveal>
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={safeCurrentPage === 1}
            className="w-10 h-10 rounded-lg border border-gray-300 bg-white disabled:opacity-50"
          >
            <ChevronLeft size={18} className="mx-auto" />
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg text-sm ${
                safeCurrentPage === page
                  ? "bg-[#002366] text-white"
                  : "bg-white border border-gray-300 text-gray-600"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={safeCurrentPage === totalPages}
            className="w-10 h-10 rounded-lg border border-gray-300 bg-white disabled:opacity-50"
          >
            <ChevronRight size={18} className="mx-auto" />
          </button>
        </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

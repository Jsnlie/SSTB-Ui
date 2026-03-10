"use client";

import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Masonry from "react-responsive-masonry";

export default function Berita() {
  const [currentPage, setCurrentPage] = useState(1);

  const featuredArticle = {
    id: 1,
    title: "STT Seminari Theologia Meraih Akreditasi A dari BAN-PT",
    excerpt:
      "Dalam pencapaian membanggakan, STT Seminari Theologia berhasil meraih akreditasi A dari Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT) untuk semua program studinya. Pencapaian ini merupakan hasil dari komitmen jangka panjang terhadap keunggulan akademik.",
    image: "https://images.unsplash.com/photo-1660485345088-c398363c1f45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzMwNDEwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "5 Maret 2026",
    category: "Prestasi",
  };

  const newsArticles = [
    {
      id: 2,
      title: "Seminar Nasional Teologi Kontemporer 2026",
      excerpt:
        "STT mengadakan seminar nasional dengan menghadirkan para pakar teologi dari berbagai denominasi untuk membahas isu-isu kontemporer gereja.",
      image: "https://images.unsplash.com/photo-1583062434105-9bef71509685?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYXVkaXRvcml1bSUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzczMDUwNDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "28 Februari 2026",
      category: "Acara",
    },
    {
      id: 3,
      title: "Mahasiswa STT Raih Juara 1 Kompetisi Essay Teologi Nasional",
      excerpt:
        "Maria Susanto, mahasiswa semester 6, berhasil meraih juara pertama dalam kompetisi essay teologi tingkat nasional dengan tema 'Gereja dan Tantangan Digital'.",
      image: "https://images.unsplash.com/photo-1547817651-7fb0cc360536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2FtcHVzfGVufDF8fHx8MTc3Mjk2NDcyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "20 Februari 2026",
      category: "Prestasi",
    },
    {
      id: 4,
      title: "Perpustakaan Digital STT Diluncurkan dengan 10,000+ Koleksi",
      excerpt:
        "Perpustakaan digital baru dengan koleksi lebih dari 10,000 buku teologi, jurnal, dan resources multimedia kini dapat diakses mahasiswa 24/7.",
      image: "https://images.unsplash.com/photo-1566314748815-2ff5db8edf2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGJvb2tzJTIwbGlicmFyeSUyMHNoZWx2ZXN8ZW58MXx8fHwxNzczMDUwNDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "15 Februari 2026",
      category: "Fasilitas",
    },
    {
      id: 5,
      title: "Kerjasama Internasional dengan Trinity Theological Seminary",
      excerpt:
        "MoU ditandatangani untuk program pertukaran dosen dan mahasiswa serta penelitian bersama dengan Trinity Theological Seminary, USA.",
      image: "https://images.unsplash.com/photo-1600903308878-bf5e554ab841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYW1wdXMlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczMDUwNDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "10 Februari 2026",
      category: "Kerjasama",
    },
    {
      id: 6,
      title: "Workshop Pelayanan: Media Sosial untuk Pelayanan Gereja",
      excerpt:
        "Pelatihan praktis bagi mahasiswa tentang memanfaatkan media sosial sebagai alat penginjilan dan pembinaan jemaat di era digital.",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2xhc3Nyb29tJTIwbGVjdHVyZXxlbnwxfHx8fDE3NzI5NjQxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "5 Februari 2026",
      category: "Workshop",
    },
    {
      id: 7,
      title: "Wisuda ke-38: 156 Lulusan Siap Melayani",
      excerpt:
        "Sebanyak 156 mahasiswa diwisuda dalam upacara wisuda ke-38, siap melayani di berbagai ladang pelayanan di Indonesia dan mancanegara.",
      image: "https://images.unsplash.com/photo-1637455587265-2a3c2cbbcc84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMGludGVyaW9yfGVufDF8fHx8MTc3Mjk0MzY2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "1 Februari 2026",
      category: "Wisuda",
    },
    {
      id: 8,
      title: "Program Beasiswa Penuh untuk Pendeta Perintis",
      excerpt:
        "STT meluncurkan program beasiswa penuh bagi pendeta yang melayani di daerah terpencil dan tertinggal di seluruh Indonesia.",
      image: "https://images.unsplash.com/photo-1763890498955-13f109b2fbd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBvdXRkb29yJTIwc3R1ZGVudHMlMjB3YWxraW5nfGVufDF8fHx8MTc3MzA1MDQwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "25 Januari 2026",
      category: "Beasiswa",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Kebaktian Kebangunan Rohani Kampus",
      date: "15 Maret 2026",
      time: "18:00 - 21:00",
    },
    {
      id: 2,
      title: "Doa Puasa Mahasiswa",
      date: "18 Maret 2026",
      time: "06:00 - 08:00",
    },
    {
      id: 3,
      title: "Diskusi Panel: Gereja di Era Post-Pandemic",
      date: "22 Maret 2026",
      time: "13:00 - 16:00",
    },
    {
      id: 4,
      title: "Open House Program Magister",
      date: "25 Maret 2026",
      time: "09:00 - 12:00",
    },
    {
      id: 5,
      title: "Retreat Dosen & Staff",
      date: "28-30 Maret 2026",
      time: "All Day",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 bg-[#002366] flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl text-white">Berita & Kegiatan</h1>
      </div>

      {/* Featured Article Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={`/berita/${featuredArticle.id}`}
          className="block relative h-96 rounded-lg overflow-hidden group"
        >
          <ImageWithFallback
            src={featuredArticle.image}
            alt={featuredArticle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <span className="inline-block bg-[#C41E3A] px-3 py-1 rounded text-sm mb-3">
              {featuredArticle.category}
            </span>
            <h2 className="text-3xl md:text-4xl mb-3">
              {featuredArticle.title}
            </h2>
            <p className="text-gray-200 mb-4 max-w-3xl">
              {featuredArticle.excerpt}
            </p>
            <div className="flex items-center text-sm text-gray-300">
              <Calendar size={16} className="mr-2" />
              {featuredArticle.date}
            </div>
          </div>
        </Link>
      </section>

      {/* Main Content - 2 Column Layout */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - News Grid (Masonry) */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl text-[#002366] mb-6">Berita Terbaru</h2>

            <Masonry columnsCount={2} gutter="1.5rem">
              {newsArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/berita/${article.id}`}
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <span className="inline-block text-xs text-white bg-[#002366] px-2 py-1 rounded mb-2">
                      {article.category}
                    </span>
                    <h3 className="text-[#002366] mb-2 group-hover:text-[#C41E3A] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {article.date}
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-[#C41E3A] group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </Masonry>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>

              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded ${
                    currentPage === page
                      ? "bg-[#002366] text-white"
                      : "border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
                disabled={currentPage === 5}
                className="p-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Right Sidebar - Upcoming Events */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-2xl text-[#002366] mb-6">Acara Mendatang</h2>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border-l-4 border-[#C41E3A] pl-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-[#002366] text-sm mb-1">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-xs text-gray-600">
                        <Calendar size={12} className="mr-1 text-[#C41E3A]" />
                        <span>{event.date}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{event.time}</p>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 border-2 border-[#002366] text-[#002366] py-2 rounded hover:bg-[#002366] hover:text-white transition-colors">
                  Lihat Semua Acara
                </button>
              </div>

              {/* Categories Filter */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-lg text-[#002366] mb-4">Kategori</h3>
                <div className="space-y-2">
                  {[
                    "Semua",
                    "Prestasi",
                    "Acara",
                    "Workshop",
                    "Kerjasama",
                    "Wisuda",
                    "Beasiswa",
                  ].map((category) => (
                    <button
                      key={category}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-[#002366]/5 hover:text-[#002366] rounded transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

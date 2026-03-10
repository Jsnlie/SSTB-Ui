"use client";

import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ArtikelDetail() {
  const params = useParams();
  const id = params.id;

  const article = {
    title: "STT Seminari Theologia Meraih Akreditasi A dari BAN-PT",
    author: "Dr. Johannes Setiawan",
    date: "5 Maret 2026",
    category: "Prestasi",
    image: "https://images.unsplash.com/photo-1660485345088-c398363c1f45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzMwNDEwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: `
      <p>Jakarta, 5 Maret 2026 - Dalam pencapaian yang membanggakan, Sekolah Tinggi Teologi (STT) Seminari Theologia berhasil meraih akreditasi A dari Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT) untuk semua program studinya. Pencapaian ini merupakan hasil dari komitmen jangka panjang terhadap keunggulan akademik dan pelayanan berkualitas.</p>

      <p>Akreditasi A diberikan setelah melalui proses asesmen yang ketat dan komprehensif yang meliputi evaluasi terhadap tata kelola, sumber daya manusia, kurikulum, fasilitas, serta output dan outcome pendidikan. Tim asesor BAN-PT melakukan visitasi selama tiga hari pada bulan Januari 2026.</p>

      <h3>Komitmen terhadap Keunggulan</h3>

      <p>"Pencapaian akreditasi A ini adalah pengakuan atas dedikasi seluruh civitas akademika STT Seminari Theologia," ujar Dr. Johannes Setiawan, Ketua STT, dalam konferensi pers yang diadakan di kampus. "Ini bukan hanya tentang status akreditasi, tetapi tentang komitmen kami untuk terus memberikan pendidikan teologi terbaik bagi para calon pemimpin gereja."</p>

      <p>Dr. Setiawan menambahkan bahwa pencapaian ini merupakan buah dari berbagai upaya peningkatan kualitas yang telah dilakukan selama lima tahun terakhir, termasuk renovasi fasilitas, pengembangan perpustakaan digital, peningkatan kualifikasi dosen, dan penyempurnaan kurikulum yang lebih relevan dengan kebutuhan gereja masa kini.</p>

      <h3>Peningkatan Kualitas Berkelanjutan</h3>

      <p>Beberapa program inovatif yang menjadi sorotan positif dari tim asesor antara lain:</p>

      <ul>
        <li><strong>Program Mentoring Intensif:</strong> Setiap mahasiswa mendapat pembimbing akademik dan spiritual personal</li>
        <li><strong>Perpustakaan Digital:</strong> Akses ke lebih dari 10,000 buku dan jurnal teologi terkini</li>
        <li><strong>Kerjasama Internasional:</strong> Partnership dengan seminari-seminari terkemuka di luar negeri</li>
        <li><strong>Praktikum Pelayanan:</strong> Program magang terintegrasi di berbagai gereja dan organisasi Kristen</li>
        <li><strong>Penelitian dan Publikasi:</strong> Peningkatan signifikan dalam output penelitian dosen dan mahasiswa</li>
      </ul>

      <h3>Dampak bagi Mahasiswa dan Alumni</h3>

      <p>Maria Wijaya, mahasiswa semester 6 Program Sarjana Teologi, mengungkapkan kegembiraannya. "Sebagai mahasiswa, kami sangat bangga. Akreditasi A ini akan meningkatkan kredibilitas ijazah kami dan membuka lebih banyak peluang pelayanan di masa depan."</p>

      <p>Sementara itu, Rev. David Hartono, alumni tahun 2020 yang kini melayani sebagai gembala sidang di Surabaya, mengatakan, "Ini membuktikan bahwa pilihan saya kuliah di STT Seminari adalah keputusan yang tepat. Alumni seperti saya juga merasakan dampak positifnya dalam pelayanan."</p>

      <h3>Rencana ke Depan</h3>

      <p>Meskipun telah meraih akreditasi tertinggi, STT Seminari Theologia tidak berhenti di sini. Dr. Setiawan mengungkapkan beberapa rencana strategis untuk lima tahun ke depan:</p>

      <p>"Kami akan terus berinovasi. Tahun ini kami akan meluncurkan program Doktor Teologi (Th.D), memperluas program beasiswa untuk pendeta perintis, dan membangun pusat studi teologi kontemporer yang akan menjadi resource center bagi gereja-gereja di Indonesia," tutupnya.</p>

      <p>Akreditasi ini berlaku untuk periode 2026-2031 dan akan direview kembali menjelang masa berakhirnya. STT Seminari Theologia mengundang seluruh pihak yang ingin berkontribusi dalam misi mempersiapkan pemimpin rohani masa depan untuk bergabung dalam perjalanan ini.</p>
    `,
  };

  const relatedNews = [
    {
      id: 2,
      title: "Seminar Nasional Teologi Kontemporer 2026",
      image: "https://images.unsplash.com/photo-1583062434105-9bef71509685?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYXVkaXRvcml1bSUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzczMDUwNDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "28 Februari 2026",
    },
    {
      id: 3,
      title: "Mahasiswa STT Raih Juara 1 Kompetisi Essay",
      image: "https://images.unsplash.com/photo-1547817651-7fb0cc360536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2FtcHVzfGVufDF8fHx8MTc3Mjk2NDcyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "20 Februari 2026",
    },
    {
      id: 4,
      title: "Perpustakaan Digital Diluncurkan dengan 10,000+ Koleksi",
      image: "https://images.unsplash.com/photo-1566314748815-2ff5db8edf2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGJvb2tzJTIwbGlicmFyeSUyMHNoZWx2ZXN8ZW58MXx8fHwxNzczMDUwNDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "15 Februari 2026",
    },
  ];

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
            <span>{article.author}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2 text-[#C41E3A]" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center">
            <Tag size={16} className="mr-2 text-[#C41E3A]" />
            <span className="bg-[#002366] text-white px-3 py-1 rounded text-xs">
              {article.category}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <ImageWithFallback
          src={article.image}
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
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </article>

      {/* Related News Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-[#002366] mb-8 text-center">
            Berita Terkait
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedNews.map((news) => (
              <Link
                key={news.id}
                href={`/berita/${news.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <ImageWithFallback
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-[#002366] mb-2 group-hover:text-[#C41E3A] transition-colors">
                    {news.title}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={12} className="mr-1" />
                    {news.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>

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

"use client";

import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { BookOpen, Heart, Users, Building, Lightbulb, Handshake } from "lucide-react";
import { useState } from "react";
import Masonry from "react-responsive-masonry";

export default function KehidupanKampus() {
  const [activeSection, setActiveSection] = useState("fasilitas");

  const facilityImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1637455587265-2a3c2cbbcc84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMGludGVyaW9yfGVufDF8fHx8MTc3Mjk0MzY2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Perpustakaan",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2xhc3Nyb29tJTIwbGVjdHVyZXxlbnwxfHx8fDE3NzI5NjQxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Ruang Kelas",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1583062434105-9bef71509685?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYXVkaXRvcml1bSUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzczMDUwNDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Auditorium",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1547817651-7fb0cc360536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2FtcHVzfGVufDF8fHx8MTc3Mjk2NDcyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Area Studi",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1600903308878-bf5e554ab841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYW1wdXMlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczMDUwNDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Gedung Kampus",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1763890498955-13f109b2fbd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBvdXRkb29yJTIwc3R1ZGVudHMlMjB3YWxraW5nfGVufDF8fHx8MTc3MzA1MDQwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Area Kampus",
    },
  ];

  const facilities = [
    {
      icon: BookOpen,
      title: "Perpustakaan Digital",
      description:
        "Koleksi lebih dari 15,000 buku fisik dan 10,000+ e-book yang dapat diakses 24/7 dengan sistem katalog digital modern.",
    },
    {
      icon: Building,
      title: "Ruang Kelas Modern",
      description:
        "Ruang kelas ber-AC dengan kapasitas 30-50 mahasiswa, dilengkapi proyektor, sound system, dan papan tulis interaktif.",
    },
    {
      icon: Users,
      title: "Asrama Mahasiswa",
      description:
        "Asrama pria dan wanita dengan kapasitas 200 orang, dilengkapi WiFi, ruang belajar bersama, dan dapur komunal.",
    },
    {
      icon: Heart,
      title: "Kapel",
      description:
        "Ruang ibadah dengan kapasitas 300 orang untuk kebaktian harian, doa bersama, dan acara rohani mahasiswa.",
    },
    {
      icon: Lightbulb,
      title: "Lab Bahasa",
      description:
        "Laboratorium bahasa untuk pembelajaran Ibrani, Yunani, dan Inggris dengan software pembelajaran interaktif.",
    },
    {
      icon: Handshake,
      title: "Ruang Konseling",
      description:
        "Ruang konseling pribadi untuk pembinaan spiritual dan akademik dengan pembimbing berpengalaman.",
    },
  ];

  const pembinaanPrograms = [
    {
      title: "Pembinaan Spiritual Harian",
      description:
        "Kebaktian pagi setiap hari untuk membangun kebiasaan ibadah dan pendalaman Firman Tuhan bersama civitas akademika.",
      schedule: "Senin - Jumat, 06:30 - 07:30",
      image: "https://images.unsplash.com/photo-1583062434105-9bef71509685?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYXVkaXRvcml1bSUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzczMDUwNDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Kelompok Sel Mahasiswa",
      description:
        "Kelompok kecil untuk persekutuan, saling mendoakan, dan accountability dalam perjalanan iman dan studi.",
      schedule: "Setiap Rabu, 19:00 - 21:00",
      image: "https://images.unsplash.com/photo-1547817651-7fb0cc360536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2FtcHVzfGVufDF8fHx8MTc3Mjk2NDcyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Mentoring Personal",
      description:
        "Setiap mahasiswa mendapat mentor spiritual yang membimbing secara personal dalam aspek rohani dan akademis.",
      schedule: "Jadwal fleksibel sesuai kesepakatan",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2xhc3Nyb29tJTIwbGVjdHVyZXxlbnwxfHx8fDE3NzI5NjQxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Praktik Pelayanan",
      description:
        "Program magang di gereja-gereja mitra untuk pengalaman pelayanan langsung di bawah bimbingan gembala berpengalaman.",
      schedule: "Semester 5-8 (S.Th), Semester 3-4 (M.Th)",
      image: "https://images.unsplash.com/photo-1660485345088-c398363c1f45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzMwNDEwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Retreat Rohani",
      description:
        "Retreat semesteran untuk refreshing spiritual, evaluasi diri, dan pemulihan dari kesibukan akademik.",
      schedule: "2x per tahun (setiap semester)",
      image: "https://images.unsplash.com/photo-1600903308878-bf5e554ab841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYW1wdXMlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczMDUwNDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Seminar & Workshop",
      description:
        "Seminar dan workshop berkala tentang topik-topik praktis untuk pengembangan keterampilan pelayanan.",
      schedule: "Bulanan",
      image: "https://images.unsplash.com/photo-1653933606308-26e3aade9bb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMHByb2Zlc3NvciUyMHRlYWNoaW5nfGVufDF8fHx8MTc3MzA1MDQwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const senatActivities = [
    {
      title: "Organisasi Kemahasiswaan",
      description:
        "Senat Mahasiswa yang mengkoordinir berbagai kegiatan kampus, advokasi mahasiswa, dan pengembangan leadership.",
    },
    {
      title: "Tim Pujian & Penyembahan",
      description:
        "Tim worship yang melayani di kebaktian kampus dan melatih mahasiswa dalam pelayanan musik gereja.",
    },
    {
      title: "Tim Olahraga",
      description:
        "Berbagai cabang olahraga seperti futsal, basket, voli untuk menjaga kesehatan dan membangun teamwork.",
    },
    {
      title: "Kelompok Studi Alkitab",
      description:
        "Berbagai kelompok studi yang fokus pada topik-topik teologi tertentu untuk pendalaman bersama.",
    },
    {
      title: "Tim Pelayanan Sosial",
      description:
        "Tim yang mengorganisir kegiatan sosial seperti mengunjungi panti asuhan, pelayanan di daerah terpencil.",
    },
    {
      title: "Majalah & Publikasi",
      description:
        "Tim redaksi yang menerbitkan majalah kampus, newsletter, dan mengelola media sosial STT.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 bg-[#002366] flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl text-white">Kehidupan Kampus</h1>
      </div>

      {/* Sub Navigation */}
      <div className="bg-white shadow-md sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {[
              { id: "fasilitas", label: "Fasilitas Kampus" },
              { id: "pembinaan", label: "Pembinaan" },
              { id: "senat", label: "Senat & Organisasi" },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-8 py-4 whitespace-nowrap border-b-2 transition-colors ${
                  activeSection === section.id
                    ? "border-[#C41E3A] text-[#C41E3A]"
                    : "border-transparent text-[#002366] hover:text-[#C41E3A]"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fasilitas Kampus Section */}
      {activeSection === "fasilitas" && (
        <>
          {/* Gallery */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl text-[#002366] mb-4">Galeri Fasilitas</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Fasilitas modern dan lengkap untuk mendukung proses pembelajaran
              </p>
            </div>

            <Masonry columnsCount={3} gutter="1.5rem">
              {facilityImages.map((image) => (
                <div
                  key={image.id}
                  className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <ImageWithFallback
                    src={image.url}
                    alt={image.title}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white text-lg">{image.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </Masonry>
          </section>

          {/* Facilities Grid */}
          <section className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl text-[#002366] mb-4">
                  Fasilitas yang Tersedia
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map((facility, idx) => {
                  const Icon = facility.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-[#C41E3A]/10 p-3 rounded-lg mr-4">
                          <Icon className="text-[#C41E3A]" size={24} />
                        </div>
                        <h3 className="text-lg text-[#002366]">
                          {facility.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        {facility.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Pembinaan Section */}
      {activeSection === "pembinaan" && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#002366] mb-4">
              Program Pembinaan Spiritual
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pembinaan holistik untuk membentuk karakter Kristiani yang matang
              dan melengkapi mahasiswa untuk pelayanan
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pembinaanPrograms.map((program, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <ImageWithFallback
                  src={program.image}
                  alt={program.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl text-[#002366] mb-3">
                    {program.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{program.description}</p>
                  <div className="flex items-center text-sm text-[#C41E3A]">
                    <Heart size={16} className="mr-2" />
                    <span>{program.schedule}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#002366] text-white p-8 rounded-lg">
            <h3 className="text-2xl mb-4">Komitmen Pembinaan Kami</h3>
            <p className="text-gray-200 mb-4">
              Kami percaya bahwa pendidikan teologi bukan hanya tentang transfer
              pengetahuan, tetapi juga pembentukan karakter. Setiap program
              pembinaan dirancang untuk:
            </p>
            <ul className="space-y-2 text-gray-200">
              <li className="flex items-start">
                <span className="text-[#C41E3A] mr-2">✓</span>
                <span>
                  Membangun hubungan pribadi yang intim dengan Tuhan
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#C41E3A] mr-2">✓</span>
                <span>Mengembangkan disiplin rohani yang konsisten</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#C41E3A] mr-2">✓</span>
                <span>
                  Membentuk karakter yang mencerminkan nilai-nilai Kristiani
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#C41E3A] mr-2">✓</span>
                <span>
                  Melengkapi dengan keterampilan pelayanan yang praktis
                </span>
              </li>
            </ul>
          </div>
        </section>
      )}

      {/* Senat Section */}
      {activeSection === "senat" && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#002366] mb-4">
              Senat & Organisasi Mahasiswa
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Berbagai organisasi dan kegiatan mahasiswa untuk mengembangkan
              talenta, leadership, dan pelayanan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {senatActivities.map((activity, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg border-2 border-[#002366] hover:border-[#C41E3A] hover:shadow-lg transition-all"
              >
                <div className="flex items-center mb-4">
                  <Users className="text-[#C41E3A] mr-3" size={24} />
                  <h3 className="text-lg text-[#002366]">{activity.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl text-[#002366] mb-6 text-center">
              Struktur Senat Mahasiswa
            </h3>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <h4 className="text-lg text-[#002366] mb-2">
                  Ketua Senat Mahasiswa
                </h4>
                <p className="text-sm text-gray-600">
                  Memimpin dan mengkoordinir seluruh kegiatan organisasi
                  kemahasiswaan
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg text-[#002366] mb-2">
                    Divisi Kerohanian
                  </h4>
                  <p className="text-sm text-gray-600">
                    Mengkoordinir kegiatan spiritual dan pembinaan mahasiswa
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg text-[#002366] mb-2">
                    Divisi Akademik
                  </h4>
                  <p className="text-sm text-gray-600">
                    Mendukung kegiatan akademik dan penelitian mahasiswa
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg text-[#002366] mb-2">
                    Divisi Sosial
                  </h4>
                  <p className="text-sm text-gray-600">
                    Mengorganisir kegiatan pelayanan sosial dan outreach
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg text-[#002366] mb-2">
                    Divisi Multimedia
                  </h4>
                  <p className="text-sm text-gray-600">
                    Mengelola publikasi, dokumentasi, dan media sosial
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

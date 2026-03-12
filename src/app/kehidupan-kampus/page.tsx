"use client";

import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { BookOpen, Heart, Users, Building, Lightbulb, Handshake } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Masonry from "react-responsive-masonry";

export default function KehidupanKampus() {
  const [activeSection, setActiveSection] = useState("fasilitas");

  const facilityImages = [
    {
      id: 1,
      url: "/perpustakaan.png",
      title: "Perpustakaan",
    },
    {
      id: 2,
      url: "/ruang kelas.png",
      title: "Ruang Kelas",
    },
    {
      id: 3,
      url: "/gereja.png",
      title: "Kapel",
    },
    {
      id: 4,
      url: "/dorm.png",
      title: "Dorm",
    },
    {
      id: 5,
      url: "gedung sttb.jpg",
      title: "Gedung Kampus",
    },
    {
      id: 6,
      url: "/lobby.png",
      title: "Lobby Kampus",
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
      title: "Kehidupan Komunitas",
      description:
        "Kehidupan Komunitas di STTB dirancang agar mahasiswa dapat hidup, belajar, dan bertumbuh bersama dalam lingkungan asrama yang kondusif. Melalui pendampingan dari mentor, konselor, hingga pengurus asrama, setiap mahasiswa didukung untuk menjalani keseharian yang disiplin dan suportif demi pembentukan karakter yang utuh.",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Kapel & Forum Pembinaan",
      description:
        "Sebuah program bagi mahasiswa yang bertujuan membentuk kerohanian dan karakter melalui ibadah komunitas serta pembinaan intensif. Berfokus pada empat pilar utama—Pengajaran, Spiritual, Karakter, dan Pelayanan—program ini mempersiapkan mahasiswa untuk memiliki pengenalan akan Tuhan yang mendalam, karakter serupa Kristus, serta kesiapan melayani di tengah dunia.",
      image: "https://images.unsplash.com/photo-1437603568260-1950d3ca6eab?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Kelompok Pastoral",
      description:
        "Kelompok Pastoral merupakan sarana pendampingan bagi mahasiswa dalam aspek akademik, kerohanian, dan pelayanan melalui bimbingan seorang orang tua rohani. Setiap kelompok bertemu dua minggu sekali untuk mendapatkan arahan serta dukungan pribadi, termasuk penanganan kondisi khusus seperti kesehatan, pengembangan karakter, hingga konsultasi psikologis",
      image: "https://plus.unsplash.com/premium_photo-1681491022899-410970110095?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Kelompok Pemuridan",
      description:
        "Merupakan sarana untuk menolong mahasiswa belajar dan bertumbuh bersama mengenai dasar-dasar pertumbuhan iman Kristen untuk menjadi murid Kristus dan menjadikan orang lain Murid Kristus, Dimana pun berada dan diutus",
      image: "https://plus.unsplash.com/premium_photo-1663126706587-a91ed8a6982b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Formasi Spiritual",
      description:
        "Berfokus pada kedalaman hubungan pribadi mahasiswa dengan Tuhan melalui disiplin waktu teduh harian dan doa yang terjadwal secara teratur. Pertumbuhan rohani ini diperkuat dengan serangkaian program retreat yang diikuti sepanjang masa studi, mulai dari awal perkuliahan hingga persiapan akhir sebelum terjun ke dalam praktik pelayanan.",
      image: "https://plus.unsplash.com/premium_photo-1770559520599-881a099cc6e9?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Mission Education & Exposure",
      description:
        "bertujuan membekali mahasiswa dengan wawasan dan keterampilan praktis untuk melayani di ladang misi serta membentuk gaya hidup misioner. Melalui program khusus seperti Mission Education & Exposure Training (MEET) selama satu bulan penuh, mahasiswa mendapatkan pengalaman langsung di lapangan untuk mempersiapkan mereka menjadi pelayan yang berdampak bagi dunia.",
      image: "https://plus.unsplash.com/premium_photo-1681995466835-df504dba5269?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Praktik Pelayanan",
      description:
        "bertujuan agar mahasiswa semakin diperlengkapi dalam wawasan dan keterampilan serta semakin di asah dalam hati dan keterbebanan untuk dapat melayani dengan efektif melalui pengalaman melayani secara langsung di gereja.",
      image: "https://images.unsplash.com/photo-1609234656381-73e732808098?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const senatActivities = [
    {
      title: "Training Group",
      description:[
        "Training Group Media & AU-VI", 
        "Training Group Panggung Boneka", 
        "Training Group Musik Ibadah",
      ]
        
    },
    {
      title: "Pembinaan & Pelayanan",
      description:[
        "Pameran Buku", 
        "Pelatihan/Lokakarya", 
        "Pelayanan Gereja",
        "Pelayanan Masyarakate"
      ]
    },
    {
      title: "Perayaan & Peringatan",
      description:[
        "Upacara Hut RI", 
        "Malam Budaya", 
        "Hari Reformasi",
        "Hari Natal/Paskah"
      ]
    },
    {
      title: "Kehidupan Kampus",
      description:[
        "Orientasi Mahasiswa Baru", 
        "Pemilihan Senat", 
        "Wisuda & Dies Natalis STTB",
        "Game/Sport Day"
      ]
    }
  ];

  const senatGallery = [
    {
      id: 1,
      url: "/kehidupan.png",
    },
    {
      id: 2,
      url: "/kehidupan2.png",
    },
    {
      id: 3,
      url: "/pembinaan.png",
    },
    {
      id: 4,
      url: "/pembinaan2.png",
    },
    {
      id: 5,
      url: "/perayaan.png",
    },
    {
      id: 6,
      url: "/training.png",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="relative h-80 bg-[#002366] flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl text-white">Kehidupan Kampus</h1>
         <ImageWithFallback
          src="https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Berita"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Sub Navigation */}
      <div className="bg-white shadow-md sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto justify-center">
            {[
              { id: "fasilitas", label: "Fasilitas Kampus" },
              { id: "pembinaan", label: "Pembinaan" },
              { id: "senat", label: "Senat" },
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
                  <Image
                    src={image.url}
                    width={40}
                    height={40}
                    alt="fasilitas kampus"
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

          <div className="grid md:grid-cols-3 gap-8">
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
              Kegiatan Senat
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Berbagai kegiatan mahasiswa untuk mengembangkan
              talenta, leadership, dan pelayanan
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {senatActivities.map((activity, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg border-2 border-[#002366] hover:border-[#C41E3A] hover:shadow-lg transition-all"
              >
                <div className="flex items-center mb-4">
                  <Users className="text-[#C41E3A] mr-3" size={24} />
                  <h3 className="text-lg text-[#002366]">{activity.title}</h3>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {activity.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl text-[#002366] mb-6 text-center">
              Galeri Kegiatan Senat
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {senatGallery.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative overflow-hidden rounded-lg aspect-square"
                >
                  <ImageWithFallback
                    src={photo.url}
                    alt="senat galeri"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

"use client";

import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ChevronDown, Heart, Target, Users, Book, Search, Filter } from "lucide-react";
import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";

export default function TentangKami() {
  const [activeSection, setActiveSection] = useState("sejarah");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const coreValues = [
    {
      icon: Heart,
      title: "Kasih",
      description: "Mengasihi Tuhan dan sesama sebagai fondasi pelayanan",
    },
    {
      icon: Book,
      title: "Kebenaran",
      description: "Berpegang teguh pada kebenaran Firman Tuhan",
    },
    {
      icon: Users,
      title: "Komunitas",
      description: "Membangun komunitas yang saling mendukung",
    },
  ];

  const pengakuanIman = [
    {
      title: "Alkitab",
      content:
        "Kami percaya bahwa Alkitab adalah Firman Allah yang diilhamkan, tidak ada kesalahan dalam naskah aslinya, dan merupakan otoritas tertinggi dalam iman dan praktik Kristen. Alkitab terdiri dari 66 kitab dalam Perjanjian Lama dan Perjanjian Baru yang memberikan wahyu Allah yang sempurna dan cukup bagi keselamatan manusia.",
    },
    {
      title: "Allah Tritunggal",
      content:
        "Kami percaya pada satu Allah yang kekal, yang menyatakan diri-Nya dalam tiga pribadi: Allah Bapa, Allah Anak (Yesus Kristus), dan Allah Roh Kudus. Ketiga pribadi ini adalah satu dalam esensi, sama dalam kuasa dan kemuliaan, namun berbeda dalam fungsi dalam karya penciptaan, penebusan, dan pengudusan.",
    },
    {
      title: "Keselamatan",
      content:
        "Kami percaya bahwa keselamatan adalah anugerah Allah semata melalui iman kepada Yesus Kristus. Manusia tidak dapat menyelamatkan dirinya sendiri melalui perbuatan baik. Keselamatan mencakup pembenaran, kelahiran baru, adopsi sebagai anak-anak Allah, dan pengudusan yang progresif melalui karya Roh Kudus.",
    },
    {
      title: "Gereja",
      content:
        "Kami percaya bahwa gereja adalah tubuh Kristus yang terdiri dari semua orang percaya sejati. Gereja lokal adalah perkumpulan orang-orang percaya yang berkumpul untuk ibadah, persekutuan, pengajaran, dan pelayanan. Gereja memiliki mandat untuk memberitakan Injil ke seluruh dunia dan memuridkan segala bangsa.",
    },
    {
      title: "Kedatangan Kristus",
      content:
        "Kami percaya pada kedatangan Yesus Kristus yang kedua kali secara literal dan fisik. Pada kedatangan-Nya, orang percaya akan dibangkitkan dan diubah, penghakiman akan terjadi, dan kerajaan Allah yang kekal akan ditegakkan. Pengharapan ini mendorong kita untuk hidup kudus dan melayani dengan setia.",
    },
  ];

  const faculty = [
    {
      id: 1,
      name: "Dr. Johannes Setiawan, M.Th",
      title: "Ketua STT & Dosen Teologi Sistematika",
      department: "dosen",
      image: "https://images.unsplash.com/photo-1653933606308-26e3aade9bb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMHByb2Zlc3NvciUyMHRlYWNoaW5nfGVufDF8fHx8MTc3MzA1MDQwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      name: "Dr. Maria Wijaya, M.A.",
      title: "Dosen Perjanjian Baru",
      department: "dosen",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    },
    {
      id: 3,
      name: "Prof. David Santoso, Ph.D",
      title: "Dosen Perjanjian Lama",
      department: "dosen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    {
      id: 4,
      name: "Rev. Ruth Hartono, M.Div",
      title: "Dosen Teologi Praktis & Konseling",
      department: "dosen",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    },
    {
      id: 5,
      name: "Dr. Samuel Gunawan, Th.D",
      title: "Dosen Misiologi & Pertumbuhan Gereja",
      department: "dosen",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    },
    {
      id: 6,
      name: "Dr. Esther Liem, M.Th",
      title: "Dosen Etika Kristen & Apologetika",
      department: "dosen",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    },
    {
      id: 7,
      name: "Pdt. Andreas Kurniawan, M.A.",
      title: "Dosen Homilika & Komunikasi",
      department: "dosen",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    },
    {
      id: 8,
      name: "Dr. Grace Tanujaya, M.Div",
      title: "Dosen Sejarah Gereja & Teologi Reformasi",
      department: "dosen",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400",
    },
    {
      id: 9,
      name: "Drs. Peter Halim",
      title: "Ketua Yayasan",
      department: "yayasan",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: 10,
      name: "Ibu Linda Susanto",
      title: "Sekretaris Yayasan",
      department: "yayasan",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    },
    {
      id: 11,
      name: "Bpk. Thomas Wijaya",
      title: "Bendahara Yayasan",
      department: "yayasan",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    },
  ];

  const filteredFaculty = faculty.filter((person) => {
    const matchesSearch = person.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || person.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-64 bg-[#002366] flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl text-white">Tentang Kami</h1>
      </div>

      {/* Sub Navigation */}
      <div className="bg-white shadow-md sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {[
              { id: "sejarah", label: "Sejarah" },
              { id: "visi-misi", label: "Visi & Misi" },
              { id: "mars", label: "Mars STTB" },
              { id: "pengakuan-iman", label: "Pengakuan Iman" },
              { id: "dewan-dosen", label: "Dewan Dosen" },
              { id: "yayasan", label: "Pengurus Yayasan" },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-4 whitespace-nowrap border-b-2 transition-colors ${
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

      {/* Sejarah Section */}
      {activeSection === "sejarah" && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#002366] mb-4">Sejarah Kami</h2>
            <div className="h-1 w-20 bg-[#C41E3A] mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 text-gray-700 leading-relaxed">
              <p>
                STT Seminari Theologia didirikan pada tahun 1985 oleh sekelompok
                hamba Tuhan yang memiliki visi untuk menyediakan pendidikan teologi
                yang berkualitas di Indonesia. Berawal dari sebuah kelas kecil dengan
                15 mahasiswa, kini STT telah berkembang menjadi institusi pendidikan
                teologi terkemuka dengan lebih dari 500 mahasiswa aktif.
              </p>
              <p>
                Perjalanan STT dimulai dengan komitmen untuk mengajarkan Alkitab
                secara mendalam dan membentuk karakter Kristiani yang matang. Pendiri
                kami percaya bahwa gereja membutuhkan pemimpin yang tidak hanya
                memiliki pengetahuan teologi yang solid, tetapi juga hati yang
                mengasihi Tuhan dan sesama.
              </p>
              <p>
                Pada tahun 1995, STT memperoleh akreditasi pertama dari BAN-PT dengan
                peringkat B. Melalui kerja keras dan dedikasi seluruh civitas
                akademika, pada tahun 2015 STT berhasil meraih akreditasi A, yang
                kemudian dipertahankan hingga saat ini.
              </p>
              <p>
                Sepanjang lebih dari 35 tahun perjalanannya, STT telah menghasilkan
                ribuan alumni yang melayani di berbagai bidang pelayanan: gembala
                sidang, misionaris, dosen teologi, penulis Kristen, dan pemimpin
                organisasi Kristen. Alumni kami tersebar di seluruh Indonesia dan
                berbagai negara di dunia.
              </p>
            </div>

            <div className="mt-12 bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl text-[#002366] mb-6">Milestone Penting</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-24 text-[#C41E3A]">1985</div>
                  <div className="text-gray-700">Pendirian STT Seminari Theologia</div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-24 text-[#C41E3A]">1995</div>
                  <div className="text-gray-700">Akreditasi pertama (Peringkat B)</div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-24 text-[#C41E3A]">2005</div>
                  <div className="text-gray-700">Pembukaan Program Magister Teologi</div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-24 text-[#C41E3A]">2015</div>
                  <div className="text-gray-700">Meraih Akreditasi A dari BAN-PT</div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-24 text-[#C41E3A]">2020</div>
                  <div className="text-gray-700">Peluncuran perpustakaan digital modern</div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-24 text-[#C41E3A]">2025</div>
                  <div className="text-gray-700">Kerjasama internasional dengan seminari di USA</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Visi & Misi Section */}
      {activeSection === "visi-misi" && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#002366] mb-4">Visi & Misi</h2>
            <div className="h-1 w-20 bg-[#C41E3A] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <Target className="text-[#C41E3A] mr-3" size={32} />
                <h3 className="text-2xl text-[#002366]">Visi</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Menjadi institusi pendidikan teologi terkemuka di Indonesia yang
                menghasilkan pemimpin rohani yang berkarakter Kristus, memiliki
                pengetahuan teologi yang mendalam, dan berkomitmen untuk melayani
                gereja dan masyarakat dengan keunggulan.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <Users className="text-[#C41E3A] mr-3" size={32} />
                <h3 className="text-2xl text-[#002366]">Misi</h3>
              </div>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="text-[#C41E3A] mr-2">•</span>
                  <span>Menyediakan pendidikan teologi yang berpusat pada Alkitab</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#C41E3A] mr-2">•</span>
                  <span>Membentuk karakter mahasiswa melalui pengajaran dan teladan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#C41E3A] mr-2">•</span>
                  <span>Melengkapi mahasiswa dengan keterampilan pelayanan praktis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#C41E3A] mr-2">•</span>
                  <span>Mengembangkan penelitian teologi yang berkualitas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#C41E3A] mr-2">•</span>
                  <span>Membangun kerjasama dengan gereja dan lembaga teologi lain</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Core Values */}
          <div className="mt-16">
            <h3 className="text-2xl text-[#002366] text-center mb-8">Nilai-Nilai Inti</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg border-2 border-[#002366] hover:border-[#C41E3A] transition-all"
                  >
                    <div className="flex justify-center mb-4">
                      <Icon className="text-[#002366]" size={40} />
                    </div>
                    <h4 className="text-lg text-[#002366] text-center mb-3">
                      {value.title}
                    </h4>
                    <p className="text-sm text-gray-600 text-center">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Mars STTB Section */}
      {activeSection === "mars" && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#002366] mb-4">Mars STT Seminari Theologia</h2>
            <div className="h-1 w-20 bg-[#C41E3A] mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto bg-gray-50 p-12 rounded-lg">
            <div className="text-center space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                STT Seminari Theologia<br />
                Benteng iman yang teguh berdiri<br />
                Mendidik hamba Tuhan sejati<br />
                Berlandaskan Firman yang suci
              </p>
              <p>
                Reff:<br />
                Maju terus pantang mundur<br />
                Sebarkan terang Injil Kristus<br />
                Dengan iman, kasih, dan pengharapan<br />
                Melayani Tuhan dan sesama
              </p>
              <p>
                Tuntunlah kami ya Roh Kudus<br />
                Dalam pembelajaran yang kudus<br />
                Bentuk kami jadi alat-Mu<br />
                Yang setia hingga akhir waktu
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Pengakuan Iman Section */}
      {activeSection === "pengakuan-iman" && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#002366] mb-4">Pengakuan Iman</h2>
            <div className="h-1 w-20 bg-[#C41E3A] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pernyataan iman kami yang menjadi dasar pengajaran dan pelayanan di STT
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion.Root type="single" collapsible className="space-y-4">
              {pengakuanIman.map((item, index) => (
                <Accordion.Item
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors group">
                      <span className="text-lg text-[#002366] group-hover:text-[#C41E3A]">
                        {item.title}
                      </span>
                      <ChevronDown className="text-[#C41E3A] transition-transform group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="p-6 pt-0 text-gray-700 leading-relaxed">
                      {item.content}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </section>
      )}

      {/* Dewan Dosen Section */}
      {activeSection === "dewan-dosen" && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#002366] mb-4">Dewan Dosen</h2>
            <div className="h-1 w-20 bg-[#C41E3A] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tim dosen berkualitas dengan latar belakang pendidikan teologi yang kuat
            </p>
          </div>

          {/* Search & Filter */}
          <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari nama dosen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#002366] focus:outline-none"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="pl-10 pr-8 py-2 border-2 border-gray-200 rounded-lg focus:border-[#002366] focus:outline-none appearance-none bg-white"
              >
                <option value="all">Semua</option>
                <option value="dosen">Dosen</option>
                <option value="yayasan">Yayasan</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredFaculty
              .filter((f) => f.department === "dosen")
              .map((person) => (
                <div
                  key={person.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <ImageWithFallback
                    src={person.image}
                    alt={person.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg text-[#002366] mb-2">{person.name}</h3>
                    <p className="text-sm text-gray-600">{person.title}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Pengurus Yayasan Section */}
      {activeSection === "yayasan" && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#002366] mb-4">Pengurus Yayasan</h2>
            <div className="h-1 w-20 bg-[#C41E3A] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dewan pengurus yayasan yang mengawasi dan mengelola STT
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {faculty
              .filter((f) => f.department === "yayasan")
              .map((person) => (
                <div
                  key={person.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <ImageWithFallback
                    src={person.image}
                    alt={person.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg text-[#002366] mb-2">{person.name}</h3>
                    <p className="text-sm text-gray-600">{person.title}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}

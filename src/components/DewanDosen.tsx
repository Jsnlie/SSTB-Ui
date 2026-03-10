"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Dosen {
  id: number;
  name: string;
  position: string;
  subjects: string[];
  image: string;
}

const dosenList: Dosen[] = [
  {
    id: 1,
    name: "Sutrisna Harjanto",
    position: "Ketua STT",
    subjects: ["Dosen Pendidikan", "Biblika", "Marketplace"],
    image: "/sutrisna.png",
  },
  {
    id: 2,
    name: "Tan Giok Lie",
    position: "Wakil Ketua I Akademik",
    subjects: ["Dosen Pendidikan"],
    image: "/tan.png",
  },
  {
    id: 3,
    name: "Wemmy Prayogo",
    position: "Wakil Ketua II Akademik",
    subjects: ["Dosen Pendidikan"],
    image: "/wemmy.png",
  },
  {
    id: 4,
    name: "Johan Setiawan",
    position: "Wakil Ketua II Akademik",
    subjects: ["Dosen Biblika", "Praktika"],
    image: "/johan.png",
  },
  {
    id: 5,
    name: "Ferry Herlianto",
    position: "Ketua Program Studi S.Pd.",
    subjects: ["Dosen Pendidikan", "Praktika"],
    image: "/ferry.png",
  },
  {
    id: 6,
    name: "Dwi Maria Handayani",
    position: "Ketua Program Studi M.Th.",
    subjects: ["Dosen Biblika", "Praktika"],
    image: "/dwi.png",
  },
  {
    id: 7,
    name: "Sarinah Lo",
    position: "Ketua Program Studi M.Pd.K",
    subjects: ["Dosen Pendidikan"],
    image: "/sarinah.png",
  },
  {
    id: 8,
    name: "Heriyanto",
    position: "Ketua Program Studi M.Min",
    subjects: ["Dosen Biblika", "Pendidikan", "Praktika"],
    image: "/heriyanto.png",
  },
  {
    id: 9,
    name: "Kristian Kusumawardana",
    position: "Ketua Program Studi S.Th.",
    subjects: [],
    image: "/kristian.png",
  },
  {
    id: 10,
    name: "Joseph Tong",
    position: "Dosen",
    subjects: ["Dosen Filsafat", "Sistematika", "Praktika"],
    image: "/joseph-tong.png",
  },
  {
    id: 11,
    name: "Herlise Y Sagala",
    position: "Dosen",
    subjects: ["Dosen Biblika", "Praktika"],
    image: "/herlise.png",
  },
  {
    id: 12,
    name: "Agus Gunawan",
    position: "Dosen",
    subjects: ["Dosen Teologi", "Pendidikan", "Praktika"],
    image: "/agus.png",
  },
  {
    id: 13,
    name: "Chandra Koewoso",
    position: "Dosen",
    subjects: ["Dosen Biblika", "Praktika"],
    image: "/chandra.png",
  },
  {
    id: 14,
    name: "Budiyanto Santosa",
    position: "Dosen",
    subjects: ["Dosen Pendidikan", "Biblika"],
    image: "/budiyanto.png",
  },
   {
    id: 15,
    name: "Philip Djung",
    position: "Dosen",
    subjects: ["Dosen Sistematika"],
    image: "/philip.png",
  },
  {
    id: 16,
    name: "Doroti Tunggal Widjaja",
    position: "Dosen",
    subjects: ["Dosen Biblika"],
    image: "/doroti.png",
  },
   {
    id: 17,
    name: "Amy Iwani",
    position: "Dosen",
    subjects: ["Dosen Pendidikan"],
    image: "/amy.png",
  },
  {
    id: 18,
    name: "Grace Emilia",
    position: "Dosen",
    subjects: ["Dosen Praktika"],
    image: "/grace.png",
  },
   {
    id: 19,
    name: "Winarish",
    position: "Dosen",
    subjects: ["Dosen Konseling (Praktika)"],
    image: "/winarsih.png",
  },

  {
    id: 20,
    name: "Viktor Pamusu",
    position: "Dosen",
    subjects: ["Dosen Sistematika"],
    image: "/viktor.png",
  },
  {
    id: 21,
    name: "Yohanes Marsono",
    position: "Dosen",
    subjects: ["Dosen Biblika"],
    image: "/yohanes.png",
  },
   {
    id: 22,
    name: "Desiana M, Nainggolan",
    position: "Dosen",
    subjects: ["Dosen Bahasa Yunani", "Misi"],
    image: "/desiana.png",
  },
  {
    id: 23,
    name: "Noni Susilo",
    position: "Dosen",
    subjects: ["Dosen Biblika"],
    image: "/noni.png",
  },
   {
    id: 24,
    name: "Santobi Ong",
    position: "Dosen",
    subjects: ["Dosen Biblika", "Praktika"],
    image: "/santobi.png",
  },

   {
    id: 25,
    name: "Romy",
    position: "Dosen",
    subjects: ["Dosen Biblika", "Praktika"],
    image: "/romy.png",
  },
  {
    id: 26,
    name: "Iwan Tanusaputra",
    position: "Dosen",
    subjects: ["Dosen Biblika"],
    image: "/iwan.png",
  },
   {
    id: 27,
    name: "Paulina Widjaja",
    position: "Dosen",
    subjects: ["Dosen Pendidikan"],
    image: "/paulina.png",
  },
  {
    id: 28,
    name: "Lin Yuan I",
    position: "Dosen",
    subjects: ["Dosen Sistematika"],
    image: "/lin.png",
  },
   {
    id: 29,
    name: "Rico Christian Komala",
    position: "Dosen",
    subjects: ["Dosen Liturgika", "Musik Gereja"],
    image: "/rico.png",
  },


   {
    id: 30,
    name: "Swati Suhaemi",
    position: "Dosen",
    subjects: ["Dosen Pendidikan"],
    image: "/swati.png",
  },

   {
    id: 31,
    name: "Mario Saliutama",
    position: "Dosen",
    subjects: ["Dosen STTB"],
    image: "/mario.png",
  },
  {
    id: 32,
    name: "I Gede Puji Arsantosa",
    position: "Dosen",
     subjects: ["Dosen STTB"],
    image: "/igede.png",
  },
   {
    id: 33,
    name: "Johanes Kurniawan",
    position: "Dosen",
     subjects: ["Dosen STTB"],
    image: "/johanes.png",
  },
  {
    id: 34,
    name: "Rebekah Earnshaw",
    position: "Dosen",
     subjects: ["Dosen STTB"],
    image: "/rebekah.png",
  },
   {
    id: 35,
    name: "Tan Giok Sien",
    position: "Dosen",
     subjects: ["Dosen STTB"],
    image: "/sien.png",
  },
];

function DosenCard({ dosen }: { dosen: Dosen }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center p-5 gap-5">
      {/* Left: Circular Image */}
      <div className="shrink-0">
        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#002366]/20">
          <img
            src={dosen.image}
            alt={dosen.name}
            width={112}
            height={112}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right: Text Info */}
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#C41E3A] mb-1">
          {dosen.position}
        </span>
        <h3 className="text-base font-bold text-[#002366] mb-2 leading-tight">
          {dosen.name}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {dosen.subjects.map((subject) => (
            <span
              key={subject}
              className="text-xs bg-[#002366]/10 text-[#002366] px-2.5 py-0.5 rounded-full"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DewanDosen() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDosen = dosenList.filter(
    (dosen) =>
      dosen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dosen.subjects.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl text-[#002366] mb-4">
          Dewan Pengajar Dosen STTB
        </h2>
        <div className="h-1 w-20 bg-[#C41E3A] mx-auto mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tim dosen berkualitas dengan latar belakang pendidikan teologi yang
          kuat
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Cari nama dosen atau mata kuliah..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#002366] focus:outline-none"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {filteredDosen.map((dosen) => (
          <DosenCard key={dosen.id} dosen={dosen} />
        ))}
      </div>

      {filteredDosen.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          Tidak ada dosen yang ditemukan.
        </p>
      )}
    </section>
  );
}

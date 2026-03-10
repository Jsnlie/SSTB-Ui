"use client";

import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { useState } from "react";
import Image from "next/image";
import TimelineCarousel from "../../components/TimelineCarousel";
import LogoMeaning from "../../components/LogoMeaning";
import Pendiri from "../../components/Pendiri";
import VisiMisi from "../../components/VisiMisi";
import CoreValues from "../../components/CoreValues";
import PengakuanIman from "../../components/PengakuanIman";
import DewanDosen from "../../components/DewanDosen";

export default function TentangKami() {
  const [activeSection, setActiveSection] = useState("sejarah");

  const faculty = [
    {
      id: 9,
      name: "Drs. Peter Halim",
      title: "Ketua Yayasan",
      department: "yayasan",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: 10,
      name: "Ibu Linda Susanto",
      title: "Sekretaris Yayasan",
      department: "yayasan",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    },
    {
      id: 11,
      name: "Bpk. Thomas Wijaya",
      title: "Bendahara Yayasan",
      department: "yayasan",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-64 bg-[#002366] flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl text-white">Tentang Kami</h1>
      </div>

      {/* Sub Navigation */}
      <div className="bg-white shadow-md sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto justify-center">
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
            <h2 className="text-3xl text-[#002366] mb-4">Timeline Sejarah</h2>
            <div className="h-1 w-20 bg-[#C41E3A] mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-row gap-4 justify-center items-center mb-8">
              <Image
                src="/sttb1.png"
                alt="STTB 1"
                width={400}
                height={200}
                className="object-contain flex-1 max-w-[33%]"
              />
              <Image
                src="/sttb2.png"
                alt="STTB 2"
                width={400}
                height={200}
                className="object-contain flex-1 max-w-[33%]"
              />
              <Image
                src="/sttb3.png"
                alt="STTB 3"
                width={400}
                height={200}
                className="object-contain flex-1 max-w-[33%]"
              />
            </div>
          </div>
          <TimelineCarousel/>
          <Pendiri/>
          <LogoMeaning/>

        </section>
      )}

      {/* Visi & Misi Section */}
      {activeSection === "visi-misi" && (
        <div>
          <VisiMisi />
          <CoreValues />
        </div>
      )}

      {/* Mars STTB Section */}
      {activeSection === "mars" && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#002366] mb-4">
              Mars Sekolah Tinggi Teologi Bandung
            </h2>
            <div className="h-1 w-20 bg-[#C41E3A] mx-auto mb-4"></div>
          
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Audio Player */}
              <div className="bg-[#C41E3A] px-8 py-6 flex flex-col items-center gap-3">
                <p className="text-white text-sm font-medium tracking-wide uppercase">
                  
                </p>
                <audio controls className="w-full max-w-md">
                  <source src="/Audio-Mars-STTB.mp3" type="audio/mpeg" />
                  Browser Anda tidak mendukung pemutar audio.
                </audio>
              </div>

              {/* Sheet Music Image */}
              <div className="p-6">
                <Image
                  src="/Mars.jpg"
                  alt="Mars STTB"
                  width={800}
                  height={800}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pengakuan Iman Section */}
      {activeSection === "pengakuan-iman" && <PengakuanIman />}
      {/* Dewan Dosen Section */}
      {activeSection === "dewan-dosen" && <DewanDosen />}

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
                    <h3 className="text-lg text-[#002366] mb-2">
                      {person.name}
                    </h3>
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

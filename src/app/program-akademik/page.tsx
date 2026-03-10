"use client";

import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Clock, Award, BookOpen, GraduationCap } from "lucide-react";
import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";

export default function ProgramAkademik() {
  const [activeTab, setActiveTab] = useState("overview");

  const curriculumData = {
    semester1: [
      { code: "TH101", name: "Pengantar Teologi Sistematika", credits: 3 },
      { code: "PL101", name: "Survey Perjanjian Lama", credits: 3 },
      { code: "PB101", name: "Survey Perjanjian Baru", credits: 3 },
      { code: "HB101", name: "Bahasa Ibrani I", credits: 3 },
      { code: "EN101", name: "English for Theological Studies", credits: 2 },
      { code: "SP101", name: "Spiritual Formation I", credits: 2 },
    ],
    semester2: [
      { code: "TH201", name: "Teologi Sistematika I (Theologi Proper)", credits: 3 },
      { code: "PL201", name: "Taurat dan Kitab Sejarah", credits: 3 },
      { code: "PB201", name: "Injil Sinoptik", credits: 3 },
      { code: "HB201", name: "Bahasa Ibrani II", credits: 3 },
      { code: "YN201", name: "Bahasa Yunani I", credits: 3 },
      { code: "SP201", name: "Spiritual Formation II", credits: 2 },
    ],
    semester3: [
      { code: "TH301", name: "Teologi Sistematika II (Kristologi)", credits: 3 },
      { code: "PL301", name: "Kitab Puisi dan Hikmat", credits: 3 },
      { code: "PB301", name: "Injil Yohanes dan Surat-Surat Yohanes", credits: 3 },
      { code: "YN301", name: "Bahasa Yunani II", credits: 3 },
      { code: "HM301", name: "Homilika I", credits: 3 },
      { code: "SG301", name: "Sejarah Gereja I", credits: 3 },
    ],
    semester4: [
      { code: "TH401", name: "Teologi Sistematika III (Soteriologi)", credits: 3 },
      { code: "PL401", name: "Kitab Para Nabi", credits: 3 },
      { code: "PB401", name: "Surat-Surat Paulus", credits: 3 },
      { code: "EK401", name: "Eksegesis Perjanjian Lama", credits: 3 },
      { code: "HM401", name: "Homilika II", credits: 3 },
      { code: "SG401", name: "Sejarah Gereja II", credits: 3 },
    ],
  };

  return (
    <div>
      {/* Hero Header */}
      <div className="bg-[#002366] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-4">Program Magister Teologi</h1>
          <p className="text-xl text-gray-200">Master of Theology (M.Th)</p>
        </div>
      </div>

      {/* Quick Facts */}
      <section className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#C41E3A]/10 p-3 rounded-lg">
                <Clock className="text-[#C41E3A]" size={32} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Durasi</p>
                <p className="text-[#002366]">2 Tahun (4 Semester)</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#C41E3A]/10 p-3 rounded-lg">
                <BookOpen className="text-[#C41E3A]" size={32} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total SKS</p>
                <p className="text-[#002366]">54 SKS</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#C41E3A]/10 p-3 rounded-lg">
                <Award className="text-[#C41E3A]" size={32} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Gelar</p>
                <p className="text-[#002366]">Magister Teologi (M.Th)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - 2 Column Layout */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
              <Tabs.List className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                <Tabs.Trigger
                  value="overview"
                  className="px-6 py-3 text-[#002366] border-b-2 border-transparent data-[state=active]:border-[#002366] data-[state=active]:text-[#002366] hover:text-[#C41E3A] transition-colors whitespace-nowrap"
                >
                  Overview
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="curriculum"
                  className="px-6 py-3 text-[#002366] border-b-2 border-transparent data-[state=active]:border-[#002366] data-[state=active]:text-[#002366] hover:text-[#C41E3A] transition-colors whitespace-nowrap"
                >
                  Kurikulum
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="competencies"
                  className="px-6 py-3 text-[#002366] border-b-2 border-transparent data-[state=active]:border-[#002366] data-[state=active]:text-[#002366] hover:text-[#C41E3A] transition-colors whitespace-nowrap"
                >
                  Kompetensi
                </Tabs.Trigger>
              </Tabs.List>

              {/* Overview Tab */}
              <Tabs.Content value="overview">
                <div className="prose max-w-none">
                  <h2 className="text-2xl text-[#002366] mb-4">
                    Tentang Program
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Program Magister Teologi dirancang untuk mempersiapkan para
                    pemimpin gereja dan pelayan Tuhan dengan pemahaman teologis
                    yang mendalam dan keterampilan pelayanan yang praktis.
                    Program ini menekankan pada penelitian akademis yang ketat
                    sambil tetap mempertahankan relevansi praktis untuk
                    pelayanan gereja.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Mahasiswa akan mempelajari Alkitab dalam bahasa aslinya
                    (Ibrani dan Yunani), mendalami teologi sistematika, sejarah
                    gereja, dan mengembangkan keterampilan dalam berkhotbah,
                    mengajar, dan kepemimpinan gereja.
                  </p>

                  <h3 className="text-xl text-[#002366] mt-8 mb-4">
                    Konsentrasi Tersedia
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-[#C41E3A] mr-2">•</span>
                      <span>Teologi Sistematika</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#C41E3A] mr-2">•</span>
                      <span>Studi Perjanjian Lama</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#C41E3A] mr-2">•</span>
                      <span>Studi Perjanjian Baru</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#C41E3A] mr-2">•</span>
                      <span>Teologi Praktis dan Kepemimpinan</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#C41E3A] mr-2">•</span>
                      <span>Misiologi</span>
                    </li>
                  </ul>
                </div>
              </Tabs.Content>

              {/* Curriculum Tab */}
              <Tabs.Content value="curriculum">
                <h2 className="text-2xl text-[#002366] mb-6">
                  Struktur Kurikulum
                </h2>

                <div className="space-y-8">
                  {/* Semester 1 */}
                  <div>
                    <h3 className="text-xl text-[#002366] mb-4">Semester 1</h3>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-[#002366] text-white">
                          <tr>
                            <th className="px-4 py-3 text-left">Kode</th>
                            <th className="px-4 py-3 text-left">Mata Kuliah</th>
                            <th className="px-4 py-3 text-right">SKS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {curriculumData.semester1.map((course, idx) => (
                            <tr
                              key={idx}
                              className="border-b border-gray-200 hover:bg-gray-50"
                            >
                              <td className="px-4 py-3 text-gray-600">
                                {course.code}
                              </td>
                              <td className="px-4 py-3 text-gray-800">
                                {course.name}
                              </td>
                              <td className="px-4 py-3 text-right text-[#002366]">
                                {course.credits}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Semester 2 */}
                  <div>
                    <h3 className="text-xl text-[#002366] mb-4">Semester 2</h3>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-[#002366] text-white">
                          <tr>
                            <th className="px-4 py-3 text-left">Kode</th>
                            <th className="px-4 py-3 text-left">Mata Kuliah</th>
                            <th className="px-4 py-3 text-right">SKS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {curriculumData.semester2.map((course, idx) => (
                            <tr
                              key={idx}
                              className="border-b border-gray-200 hover:bg-gray-50"
                            >
                              <td className="px-4 py-3 text-gray-600">
                                {course.code}
                              </td>
                              <td className="px-4 py-3 text-gray-800">
                                {course.name}
                              </td>
                              <td className="px-4 py-3 text-right text-[#002366]">
                                {course.credits}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Semester 3 */}
                  <div>
                    <h3 className="text-xl text-[#002366] mb-4">Semester 3</h3>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-[#002366] text-white">
                          <tr>
                            <th className="px-4 py-3 text-left">Kode</th>
                            <th className="px-4 py-3 text-left">Mata Kuliah</th>
                            <th className="px-4 py-3 text-right">SKS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {curriculumData.semester3.map((course, idx) => (
                            <tr
                              key={idx}
                              className="border-b border-gray-200 hover:bg-gray-50"
                            >
                              <td className="px-4 py-3 text-gray-600">
                                {course.code}
                              </td>
                              <td className="px-4 py-3 text-gray-800">
                                {course.name}
                              </td>
                              <td className="px-4 py-3 text-right text-[#002366]">
                                {course.credits}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Semester 4 */}
                  <div>
                    <h3 className="text-xl text-[#002366] mb-4">Semester 4</h3>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-[#002366] text-white">
                          <tr>
                            <th className="px-4 py-3 text-left">Kode</th>
                            <th className="px-4 py-3 text-left">Mata Kuliah</th>
                            <th className="px-4 py-3 text-right">SKS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {curriculumData.semester4.map((course, idx) => (
                            <tr
                              key={idx}
                              className="border-b border-gray-200 hover:bg-gray-50"
                            >
                              <td className="px-4 py-3 text-gray-600">
                                {course.code}
                              </td>
                              <td className="px-4 py-3 text-gray-800">
                                {course.name}
                              </td>
                              <td className="px-4 py-3 text-right text-[#002366]">
                                {course.credits}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Tabs.Content>

              {/* Competencies Tab */}
              <Tabs.Content value="competencies">
                <h2 className="text-2xl text-[#002366] mb-6">
                  Kompetensi Lulusan
                </h2>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg text-[#002366] mb-3">
                      Kompetensi Pengetahuan
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-[#C41E3A] mr-2">•</span>
                        <span>
                          Memahami dan menginterpretasi Alkitab dalam bahasa
                          aslinya dengan metode eksegesis yang tepat
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#C41E3A] mr-2">•</span>
                        <span>
                          Menguasai doktrin-doktrin utama Kekristenan dan mampu
                          mengartikulasikannya secara sistematis
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#C41E3A] mr-2">•</span>
                        <span>
                          Memiliki pemahaman mendalam tentang sejarah gereja dan
                          perkembangan teologi
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg text-[#002366] mb-3">
                      Kompetensi Keterampilan
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-[#C41E3A] mr-2">•</span>
                        <span>
                          Mampu berkhotbah dan mengajar Firman Tuhan dengan
                          efektif dan relevan
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#C41E3A] mr-2">•</span>
                        <span>
                          Terampil dalam kepemimpinan gereja dan pengembangan
                          organisasi
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#C41E3A] mr-2">•</span>
                        <span>
                          Mampu melakukan penelitian teologis dan menulis karya
                          akademis
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg text-[#002366] mb-3">
                      Kompetensi Sikap
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-[#C41E3A] mr-2">•</span>
                        <span>
                          Memiliki karakter yang mencerminkan nilai-nilai Kristiani
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#C41E3A] mr-2">•</span>
                        <span>
                          Berkomitmen pada pertumbuhan spiritual pribadi yang
                          berkelanjutan
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#C41E3A] mr-2">•</span>
                        <span>
                          Memiliki hati melayani dan kepekaan terhadap kebutuhan
                          gereja dan masyarakat
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>

          {/* Right Column - Sticky Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border-2 border-[#002366] rounded-lg p-6">
              <h3 className="text-xl text-[#002366] mb-4">
                Tertarik dengan Program Ini?
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                Dapatkan informasi lebih lanjut tentang program Magister Teologi
              </p>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#002366]"
                    placeholder="Masukkan nama"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#002366]"
                    placeholder="Masukkan email"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#002366]"
                    placeholder="Masukkan nomor telepon"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Pesan (Opsional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#002366]"
                    placeholder="Tuliskan pertanyaan Anda"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C41E3A] text-white py-3 rounded hover:bg-[#A01829] transition-colors"
                >
                  Kirim Permintaan Info
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

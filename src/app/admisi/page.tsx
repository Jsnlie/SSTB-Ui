"use client";

import { ChevronDown, DollarSign, GraduationCap, FileText, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";

export default function Admisi() {
  const steps = [
    {
      number: 1,
      title: "Pendaftaran Online",
      description: "Lengkapi formulir pendaftaran online dan upload dokumen",
    },
    {
      number: 2,
      title: "Tes Masuk",
      description: "Ikuti tes tertulis dan wawancara",
    },
    {
      number: 3,
      title: "Pengumuman",
      description: "Hasil seleksi akan diumumkan via email",
    },
    {
      number: 4,
      title: "Registrasi",
      description: "Pembayaran dan registrasi ulang",
    },
  ];

  const tuitionFees = [
    {
      program: "Sarjana Teologi (S.Th)",
      pendaftaranTes: "Rp 500.000",
      administrasiPerSemester: "Rp 500.000",
      biayaKuliahPerSemester: "Rp 9.000.000",
      bimbinganTA: "Rp 1.500.000",
      wisuda: "Rp 2.000.000",
      cutiAkademik: "Rp 500.000",
      total: "Rp 14.000.000",
    },
    {
      program: "Sarjana Teologi (S.Pd)",
      pendaftaranTes: "Rp 500.000",
      administrasiPerSemester: "Rp 500.000",
      biayaKuliahPerSemester: "Rp 9.000.000",
      bimbinganTA: "Rp 1.500.000",
      wisuda: "Rp 2.000.000",
      cutiAkademik: "Rp 500.000",
      total: "Rp 14.000.000",
    },
    {
      program: "Magister Teologi (M.Th)",
      pendaftaranTes: "Rp 500.000",
      administrasiPerSemester: "Rp 500.000",
      biayaKuliahPerSemester: "Rp 1.500.000",
      bimbinganTA: "Rp 7.000.000",
      wisuda: "Rp 2.500.000",
      cutiAkademik: "Rp 500.000",
      total: "Rp 12.500.000",
    },
    {
      program: "Magister Pendidikan (M.Pd)",
      pendaftaranTes: "Rp 500.000",
      administrasiPerSemester: "Rp 500.000",
      biayaKuliahPerSemester: "Rp 1.500.000",
      bimbinganTA: "Rp 7.000.000",
      wisuda: "Rp 2.500.000",
      cutiAkademik: "Rp 500.000",
      total: "Rp 12.500.000",
    },
    {
      program: "Magister Pelayanan (M.Min)",
      pendaftaranTes: "Rp 500.000",
      administrasiPerSemester: "Rp 500.000",
      biayaKuliahPerSemester: "Rp 1.500.000",
      bimbinganTA: "Rp 2.500.000",
      wisuda: "Rp 2.500.000",
      cutiAkademik: "Rp 500.000",
      total: "Rp 8.000.000",
    },
  ];

  const scholarships = [
    {
      name: "Beasiswa Pastor Scholar",
      description:
        "Diberikan kepada mahasiswa dengan prestasi akademik outstanding",
      coverage: "50% - 100% SPP",
    },
    {
      name: "Beasiswa Formatio",
      description: "Untuk mereka yang telah melayani di gereja minimal 2 tahun",
      coverage: "30% - 50% SPP",
    },
    {
      name: "Beasiswa Transformative Leadership",
      description:
        "Diskon khusus untuk keluarga yang memiliki lebih dari 1 mahasiswa",
      coverage: "20% SPP",
    },
  ];

  const faqs = [
    {
      question: "Apa saja persyaratan pendaftaran?",
      answer:
        "Persyaratan meliputi: (1) Ijazah SMA/S1 yang dilegalisir, (2) Transkrip nilai, (3) Surat rekomendasi dari gembala/pemimpin gereja, (4) Surat keterangan sehat, (5) Pas foto terbaru, (6) Fotokopi KTP dan KK, (7) Essay motivasi pelayanan.",
    },
    {
      question: "Kapan waktu pendaftaran dibuka?",
      answer:
        "Pendaftaran dibuka dua kali dalam setahun: Gelombang 1 (Januari - Maret) dan Gelombang 2 (Juni - Agustus). Tes masuk dilakukan setiap akhir periode pendaftaran.",
    },
    {
      question: "Apakah ada asrama untuk mahasiswa?",
      answer:
        "Ya, kami menyediakan asrama dengan kapasitas terbatas. Prioritas diberikan kepada mahasiswa dari luar kota. Biaya asrama sekitar Rp 1.500.000 per semester sudah termasuk utilities.",
    },
    {
      question: "Berapa lama waktu studi yang ditempuh?",
      answer:
        "Program Sarjana ditempuh dalam 4 tahun (8 semester), sementara Program Magister 2 tahun (4 semester). Namun, tersedia juga program akselerasi untuk mahasiswa dengan prestasi tinggi.",
    },
    {
      question: "Apakah lulusan bisa melanjutkan ke jenjang lebih tinggi?",
      answer:
        "Tentu saja. Lulusan S.Th dapat melanjutkan ke M.Th, dan lulusan M.Th dapat melanjutkan ke program Doktoral (Ph.D/Th.D) baik di institusi kami maupun di seminari lain di dalam dan luar negeri.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 bg-[#002366] flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl text-white">Admisi & Keuangan</h1>
      </div>

      {/* Registration Procedure Timeline */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-[#002366] mb-4">Prosedur Pendaftaran</h2>
          <p className="text-gray-600">
            Ikuti 4 langkah mudah untuk menjadi mahasiswa STT Seminari Theologia
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connection line for desktop */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-300 -z-10"></div>

          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#C41E3A] text-white flex items-center justify-center text-2xl border-4 border-white shadow-lg">
                  {step.number}
                </div>
              </div>
              <h3 className="text-lg text-[#002366] mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tuition Fees Table */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#002366] mb-4">Biaya Studi</h2>
            <p className="text-gray-600">
              Rincian biaya pendidikan untuk tahun akademik 2025/2026
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {tuitionFees.map((fee, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="bg-[#002366] px-4 py-3">
                  <h3 className="text-white font-medium text-sm">{fee.program}</h3>
                </div>
                <div className="px-4 py-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pendaftaran & Tes</span>
                    <span className="text-gray-800">{fee.pendaftaranTes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Administrasi/Smt</span>
                    <span className="text-gray-800">{fee.administrasiPerSemester}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Biaya Kuliah/Smt</span>
                    <span className="text-gray-800">{fee.biayaKuliahPerSemester}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bimbingan TA</span>
                    <span className="text-gray-800">{fee.bimbinganTA}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wisuda</span>
                    <span className="text-gray-800">{fee.wisuda}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cuti Akademik/Smt</span>
                    <span className="text-gray-800">{fee.cutiAkademik}</span>
                  </div>
                </div>
                <div className="bg-[#C41E3A]/10 border-t-2 border-[#C41E3A] px-4 py-3 flex justify-between items-center">
                  <span className="text-[#002366] font-bold text-sm">Total</span>
                  <span className="text-[#C41E3A] font-bold">{fee.total}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              * Biaya sudah termasuk perpustakaan, laboratorium, dan fasilitas
              kampus
            </p>
            <p>* Belum termasuk biaya buku, asrama, dan kebutuhan pribadi</p>
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-[#002366] mb-4">Program Beasiswa</h2>
          <p className="text-gray-600">
            Kami menyediakan berbagai program beasiswa untuk mendukung pendidikan
            Anda
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {scholarships.map((scholarship, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <GraduationCap className="text-[#C41E3A]" size={48} />
              </div>
              <h3 className="text-lg text-[#002366] text-center mb-3">
                {scholarship.name}
              </h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                {scholarship.description}
              </p>
              <div className="bg-[#002366]/5 rounded py-2 text-center">
                <span className="text-[#002366]">{scholarship.coverage}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#002366] mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-gray-600">
              Temukan jawaban atas pertanyaan umum tentang admisi dan biaya
            </p>
          </div>

          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <Accordion.Item
                key={index}
                value={`faq-${index}`}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group">
                    <span className="text-[#002366] group-data-[state=open]:text-[#C41E3A] pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className="text-[#002366] transition-transform group-data-[state=open]:rotate-180 group-data-[state=open]:text-[#C41E3A] flex-shrink-0"
                      size={20}
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-6 pb-4 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  <p className="text-gray-700">{faq.answer}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#C41E3A] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl text-white mb-6">Siap untuk Mendaftar?</h2>
          <p className="text-xl text-white/90 mb-8">
            Bergabunglah dengan ribuan alumni kami yang telah melayani di berbagai
            belahan dunia
          </p>
          <button className="bg-white text-[#C41E3A] px-12 py-4 rounded-lg text-lg hover:bg-gray-100 transition-colors shadow-lg">
            Daftar Online Sekarang
          </button>
          <p className="text-white/80 mt-6 text-sm">
            Pendaftaran dibuka untuk semester September 2026
          </p>
        </div>
      </section>
    </div>
  );
}

"use client";

import { ChevronDown, DollarSign, GraduationCap, FileText, CheckCircle2, X } from "lucide-react";
import { useEffect, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { ScrollReveal } from "../../components/ScrollReveal";
import {
  formatRupiah,
  getErrorMessage,
  parseAdmissionListResponse,
  type AdmisiBiayaStudiItem,
} from "../../lib/admin-admisi";
import { apiUrl } from "../../lib/api";

function toStringSafe(value: unknown) {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  return String(value);
}

function toNumberSafe(value: unknown) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function extractArray(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  return [];
}

export default function Admisi() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nama: "", email: "", telp: "", prodi: "" });
  const [tuitionFees, setTuitionFees] = useState<AdmisiBiayaStudiItem[]>([]);
  const [tuitionLoading, setTuitionLoading] = useState(true);
  const [tuitionError, setTuitionError] = useState("");
  const steps = [
    {
      number: 1,
      title: "Memperoleh Form",
      description: "Melakukan pendaftaran awal ke admisi online melalui sis.sttb.ac.id/pmb",
    },
    {
      number: 2,
      title: "Mengirim Form & Berkas",
      description: "Mengirimkan Form dan Berkas yang di perlukan sesuai ketentuan.",
    },
    {
      number: 3,
      title: "Membayar Biaya Daftar & Tes",
      description: "Pembayaran biaya formulir pendaftaran Rp500.000 ke rekening BCA a.n. Yayasan STT Bandung (2823005555).Kirim bukti transfer melalui sttb.ac.id/konfirmasi atau WA 0815-7336-0009.",
    },
    {
      number: 4,
      title: "Mengikuti Tes Masuk Secara Online",
      description: "Mengikuti Psikotes, Pengetahuan Teologi, Bahasa Indonesia & Inggris, Wawancara dengan dosen STTB.",
    },
    {
      number: 5,
      title: "Pengumuman & Konfirmasi",
      description: "Dalam jangka waktu 2-3 minggu setelah tes, pendaftar akan menerima pemberitahuan hasil penerimaan.",
    },
  ];

  useEffect(() => {
    let cancelled = false;

    const fetchTuitionFees = async () => {
      try {
        setTuitionError("");
        setTuitionLoading(true);

        const [admissionRes, programStudiRes] = await Promise.all([
          fetch(apiUrl("/api/admission"), { cache: "no-store" }),
          fetch(apiUrl("/api/program-studi"), { cache: "no-store" }),
        ]);

        if (!admissionRes.ok) {
          const text = await admissionRes.text().catch(() => "");
          throw new Error(getErrorMessage(text, "Gagal memuat biaya studi"));
        }

        const admissionJson = await admissionRes.json();

        const programNameById = new Map<number, string>();
        if (programStudiRes.ok) {
          const programStudiJson = await programStudiRes.json().catch(() => null);
          const programStudiList = extractArray(programStudiJson);
          for (const item of programStudiList) {
            const id = toNumberSafe(item?.id);
            const name = toStringSafe(item?.name);
            if (id > 0 && name) {
              programNameById.set(id, name);
            }
          }
        }

        if (cancelled) return;
        const mapped = parseAdmissionListResponse(admissionJson, programNameById);
        setTuitionFees(mapped);
      } catch (err: unknown) {
        if (cancelled) return;
        setTuitionFees([]);
        if (err instanceof Error) {
          setTuitionError(err.message);
        } else {
          setTuitionError("Terjadi kesalahan saat memuat biaya studi");
        }
      } finally {
        if (!cancelled) {
          setTuitionLoading(false);
        }
      }
    };

    fetchTuitionFees();

    return () => {
      cancelled = true;
    };
  }, []);

  const scholarships = [
    {
      name: "Beasiswa Pastor Scholar",
      description:
        "Beasiswa S1",
      coverage: [
        "Diperuntukkan bagi mahasiswa S1 dan menjadikan STTB sebagai pilihan pertama",
        "Beasiswa meliputi biaya pendidikan dari semester 1.",
        "Memiliki prestasi yang menonjol di SMA (rata-rata rapor minimal 8.0)",
        "Memiliki panggilan yang jelas",
        "Memiliki rekomendasi yang kuat",
        "Minimal IPK 2.75 pada semester 1 dan minimal IPK 3,0 pada semester 2-4",
        "Bersedia mengalokasikan waktu 15 jam/bulan untuk membantu kegiatan administrasi/akademik di STTB",
        "Kelanjutan beasiswa akan dievaluasi per semester",
        "Bersedia memenuhi ikatan dinas 0.5 N (setara 2 tahun) setelah mahasiswa lulus"
      ],
    },
    {
      name: "Beasiswa Formatio",
      description: "Beasiswa S1",
        coverage: [
        "Beasiswa meliputi biaya pendidikan S1 dari tahun kedua atau telah menempuh semester 2",
        "Memiliki prestasi belajar yang baik serta lolos seleksi dan wawancara",
        "Memiliki prestasi yang menonjol di SMA (rata-rata rapor minimal 8.0)",
        "Kelanjutan beasiswa akan dievaluasi per semester",
        "Bersedia mengalokasikan waktu 15 jam/bulan untuk membantu kegiatan administrasi/akademik di STTB",
        "Bersedia memenuhi ikatan dinas 0.5 N"
      ],
    },
    {
      name: "Beasiswa Transformative Leadership",
      description:
        "Beasiswa S1-S2",
        coverage: [
        "Diperuntukkan bagi mahasiswa S2 dengan prestasi akademik maupun non akademik yang menonjol",
        "Memiliki integritas dan panggilan yang jelas",
        "Meliputi maksimal 50% dari total biaya pendidikan",
        "Memberikan surat keterangan yang menyatakan telah melakukan pelayanan sebanyak 10 jam di pelayanan di lembaga pelayanan atau lembaga domisili setempat",
        "Bersedia menjadi bagian kepanitiaan acara event STTB dan bersedia menjadi ketua & koordinator kelas.",
        "Tidak diberlakukan ikatan dinas"
      ],
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
      <ScrollReveal y={28} amount={0.2}>
        <div className="relative h-80 bg-[#002366] flex items-center justify-center overflow-hidden">
          <div className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-[#C41E3A]/20 blur-3xl"></div>
          <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl text-white">Admisi & Keuangan</h1>
          <div className="h-1 w-24 bg-[#C41E3A] mx-auto mt-4"></div>
          <p className="text-gray-200 text-base md:text-lg mt-4 max-w-2xl mx-auto px-4">
            Informasi lengkap pendaftaran, persyaratan, dan rincian biaya studi di STTB.
          </p>
          </div>
          <ImageWithFallback
          src="https://plus.unsplash.com/premium_photo-1661634003229-975f2828c45a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="admisi"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        </div>
      </ScrollReveal>

      {/* Registration Procedure Timeline */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal>
          <div className="text-center mb-12">
          <h2 className="text-3xl text-[#002366] mb-4">Prosedur Pendaftaran</h2>
          <p className="text-gray-600">
            Ikuti 5 langkah mudah untuk menjadi mahasiswa STTB
          </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-5 gap-8 relative">
          {/* Connection line for desktop */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-300 -z-10"></div>

          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.08} amount={0.2}>
              <div className="relative text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#C41E3A] text-white flex items-center justify-center text-2xl border-4 border-white shadow-lg">
                  {step.number}
                </div>
              </div>
              <h3 className="text-lg text-[#002366] mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Tuition Fees Table */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
            <h2 className="text-3xl text-[#002366] mb-4">Biaya Studi</h2>
            </div>
          </ScrollReveal>

          {tuitionError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 text-center">
              {tuitionError}
            </div>
          )}

          {tuitionLoading ? (
            <div className="flex items-center justify-center py-14">
              <div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
          <>

          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
            {tuitionFees.map((fee, idx) => (
              <ScrollReveal key={fee.id} delay={idx * 0.06} amount={0.18}>
                <div
                className="h-full w-full max-w-[360px] mx-auto bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="bg-[#002366] px-4 py-3">
                  <h3 className="text-white font-medium text-sm text-center">
                    {fee.program}
                  </h3>
                </div>
                <div className="px-4 py-3 space-y-2 text-sm">
                  {fee.admissionItems.length > 0 ? (
                    fee.admissionItems.map((item, itemIdx) => (
                      <div key={`${fee.id}-${item.id}-${itemIdx}`} className="flex justify-between gap-2">
                        <span className="text-gray-600 truncate">{item.name}</span>
                        <span className="text-gray-800 whitespace-nowrap">{formatRupiah(item.price)}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">Belum ada komponen biaya.</p>
                  )}
                </div>
                <div className="bg-[#C41E3A]/10 border-t-2 border-[#C41E3A] px-4 py-3 flex justify-between items-center">
                  <span className="text-[#002366] font-bold text-sm">
                    Total
                  </span>
                  <span className="text-[#C41E3A] font-bold">{formatRupiah(fee.total)}</span>
                </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {tuitionFees.length === 0 && (
            <p className="mt-2 text-center text-sm text-gray-500">Belum ada data biaya studi tersedia.</p>
          )}

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              * Biaya sudah termasuk perpustakaan, laboratorium, dan fasilitas
              kampus
            </p>
            <p>* Belum termasuk biaya buku, asrama, dan kebutuhan pribadi</p>
          </div>
          </>
          )}
        </div>
      </section>

      {/* Scholarships
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-[#002366] mb-4">Program Beasiswa</h2>
          <p className="text-gray-600">
            Kami menyediakan berbagai program beasiswa untuk mendukung
            pendidikan Anda
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
                <ul className="text-[#002366] text-sm list-disc list-inside text-left px-3">
                  {scholarship.coverage.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Scholarships */}
      <section className="bg-[#EEF2F7] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002366] mb-3">
              Program Beasiswa Unggulan
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
              Kami berkomitmen mendukung putra-putri terbaik bangsa melalui
              berbagai program bantuan pendidikan untuk mewujudkan pemimpin masa
              depan yang kompeten.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {scholarships.map((scholarship, idx) => {
              const levels = ["Beasiswa S1", "Beasiswa S1", "Beasiswa S1-S2"];

              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-md flex flex-col ease-in-out hover:-translate-y-2 transition-shadow"
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-4 mt-2">
                    <GraduationCap className="text-[#C41E3A]" size={48} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#002366] text-center mb-4 leading-snug">
                    {scholarship.name}
                  </h3>

                  {/* Level Badge */}
                  <div className="flex justify-center mb-5">
                    <span className="text-xs font-semibold text-[#C41E3A] border border-[#C41E3A] rounded-full px-3 py-0.5">
                      {levels[idx % 3]}
                    </span>
                  </div>

                  {/* Checklist Items */}
                  <ul className="flex-1 space-y-2 mb-6">
                    {scholarship.coverage.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span className="mt-0.5 flex-shrink-0">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <circle
                              cx="8"
                              cy="8"
                              r="7.5"
                              stroke="#C41E3A"
                              strokeWidth="1"
                            />
                            <path
                              d="M4.5 8l2.5 2.5 4-4"
                              stroke="#C41E3A"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button 
                    onClick={() => window.open("https://sis.sttb.ac.id/pmb", "_blank")}
                    className="w-full bg-[#002366] hover:bg-[#001a4d] text-white text-sm font-semibold py-3 rounded-lg transition-colors"
                  >
                    Daftar Sekarang
                  </button>
                </div>
              );
            })}
          </div>
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
            Bergabunglah dengan ribuan alumni kami yang telah melayani di
            berbagai belahan dunia
          </p>
          <button
            onClick={() => window.open("https://sis.sttb.ac.id/pmb", "_blank")}
            className="bg-white text-[#C41E3A] px-12 py-4 rounded-lg text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Daftar Sekarang
          </button>
          <p className="text-white/80 mt-6 text-sm">
            Pendaftaran dibuka untuk semester September 2026
          </p>
        </div>
      </section>

      {/* Registration Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            {submitted ? (
              <div className="p-8 text-center">
                <CheckCircle2
                  className="mx-auto text-green-500 mb-4"
                  size={64}
                />
                <h3 className="text-2xl text-[#002366] mb-2">
                  Pendaftaran Berhasil!
                </h3>
                <p className="text-gray-600 mb-6">
                  Terima kasih, <strong>{form.nama}</strong>. Data pendaftaran
                  Anda telah kami terima. Tim admisi akan menghubungi Anda
                  melalui email.
                </p>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-[#002366] text-white px-8 py-2 rounded-lg hover:bg-[#001a4d] transition-colors"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="p-8"
              >
                <h3 className="text-2xl text-[#002366] mb-6 text-center">
                  Formulir Pendaftaran
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={form.nama}
                      onChange={(e) =>
                        setForm({ ...form, nama: e.target.value })
                      }
                      placeholder="Masukkan nama lengkap"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="contoh@email.com"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      No. Telepon
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.telp}
                      onChange={(e) =>
                        setForm({ ...form, telp: e.target.value })
                      }
                      placeholder="08xxxxxxxxxx"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Program Studi
                    </label>
                    <select
                      required
                      value={form.prodi}
                      onChange={(e) =>
                        setForm({ ...form, prodi: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366] focus:border-transparent"
                    >
                      <option value="">Pilih Program Studi</option>
                      {tuitionFees.map((fee) => (
                        <option key={fee.id} value={fee.program}>
                          {fee.program}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-[#C41E3A] text-white py-3 rounded-lg text-lg hover:bg-[#a31830] transition-colors"
                >
                  Kirim Pendaftaran
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

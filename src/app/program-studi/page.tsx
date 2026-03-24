"use client";

import { useEffect, useState } from "react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Clock, Award, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProgramStudi {
  id: number;
  slug: string;
  level: string;
  name: string;
  duration: string;
  totalCredits: number;
  description: string;
  image: string;
  highlights: string[];
}

export default function ProgramStudi() {
  const [programs, setPrograms] = useState<ProgramStudi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch("https://localhost:7013/api/program-studi");
        if (!res.ok) throw new Error("Gagal memuat data program studi");
        const data = await res.json();
        setPrograms(Array.isArray(data) ? data : data.data ?? []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan saat memuat data");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#002366] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div className="relative h-80 bg-[#002366]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#002366] to-[#003080]"></div>
        <div className="relative h-full flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-5xl mb-4">Program Studi</h1>
            <div className="h-1 w-24 bg-[#C41E3A] mx-auto mb-6"></div>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Temukan program yang sesuai dengan panggilan pelayanan Anda
            </p>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="STT Campus"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-[#002366] mb-4">
            Program yang Kami Tawarkan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            STTB menyediakan berbagai program pendidikan teologi
            untuk memenuhi kebutuhan pelayanan yang beragam
          </p>
        </div>

        <div className="space-y-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {/* Image */}
                <div className="md:col-span-1">
                  <ImageWithFallback
                    src={program.image}
                    alt={program.name}
                    className="w-full h-full object-cover min-h-64"
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-2 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#002366] text-white px-3 py-1 rounded text-sm">
                      {program.level}
                    </span>
                    <GraduationCap className="text-[#C41E3A]" size={24} />
                  </div>

                  <h3 className="text-2xl text-[#002366] mb-3">{program.name}</h3>

                  <div className="flex flex-wrap gap-6 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-[#C41E3A]" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen size={16} className="mr-2 text-[#C41E3A]" />
                      <span>{program.totalCredits} SKS</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{program.description}</p>

                  <div className="mb-6">
                    <h4 className="text-sm text-[#002366] mb-2">
                      Keunggulan Program:
                    </h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {program.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <span className="text-[#C41E3A] mr-2">✓</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <Link
                      href={`/program-akademik/${program.slug}`}
                      className="inline-flex items-center bg-[#C41E3A] text-white px-6 py-2 rounded hover:bg-[#A01829] transition-colors"
                    >
                      Lihat Detail
                      <ArrowRight className="ml-2" size={16} />
                    </Link>
                    <Link
                      href="/admisi"
                      className="inline-flex items-center border-2 border-[#002366] text-[#002366] px-6 py-2 rounded hover:bg-[#002366] hover:text-white transition-colors"
                    >
                      Daftar Sekarang
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#002366] mb-4">
              Mengapa Memilih STT Seminari Theologia?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-[#C41E3A]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-[#C41E3A]" size={32} />
              </div>
              <h3 className="text-lg text-[#002366] mb-2">Terakreditasi A</h3>
              <p className="text-sm text-gray-600">
                Semua program terakreditasi BAN-PT dengan peringkat tertinggi
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-[#C41E3A]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="text-[#C41E3A]" size={32} />
              </div>
              <h3 className="text-lg text-[#002366] mb-2">Dosen Berkualitas</h3>
              <p className="text-sm text-gray-600">
                Tim dosen dengan kualifikasi S3 dari universitas terkemuka
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-[#C41E3A]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-[#C41E3A]" size={32} />
              </div>
              <h3 className="text-lg text-[#002366] mb-2">Fasilitas Lengkap</h3>
              <p className="text-sm text-gray-600">
                Perpustakaan digital, laboratorium bahasa, dan asrama mahasiswa
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-[#C41E3A]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-[#C41E3A]" size={32} />
              </div>
              <h3 className="text-lg text-[#002366] mb-2">Jadwal Fleksibel</h3>
              <p className="text-sm text-gray-600">
                Tersedia kelas reguler dan kelas karyawan untuk yang bekerja
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#002366] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl text-white mb-4">
            Butuh Konsultasi Program?
          </h2>
          <p className="text-gray-200 mb-8">
            Tim akademik kami siap membantu Anda memilih program yang tepat sesuai
            dengan panggilan pelayanan Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#C41E3A] text-white px-8 py-3 rounded hover:bg-[#A01829] transition-colors">
              Hubungi Kami
            </button>
            <Link
              href="/admisi"
              className="border-2 border-white text-white px-8 py-3 rounded hover:bg-white hover:text-[#002366] transition-colors inline-block"
            >
              Lihat Panduan Admisi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

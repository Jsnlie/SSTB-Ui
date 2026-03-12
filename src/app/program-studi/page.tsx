import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Clock, Award, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProgramStudi() {
  const programs = [
    {
      id: 1,
      slug: "sarjana-teologi",
      level: "Sarjana",
      name: "Sarjana Teologi (S.Th)",
      duration: "4 Tahun (3 tahun kuliah + 1 tahun praktik pelayanan)",
      credits: "145 SKS",
      description:
        "Program sarjana yang memberikan fondasi teologi yang kuat dengan penekanan pada studi Alkitab, teologi sistematika, dan pelayanan praktis.",
      image: "https://images.unsplash.com/photo-1547817651-7fb0cc360536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2FtcHVzfGVufDF8fHx8MTc3Mjk2NDcyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      highlights: [
        "Studi Alkitab mendalam",
        "Bahasa Ibrani & Yunani",
        "Praktik pelayanan terintegrasi",
        "Mentoring spiritual personal",
      ],
    },
    {
      id: 2,
      slug: "sarjana-pendidikan-kristen",
      level: "Sarjana",
      name: "Sarjana Pendidikan Kristen (S.Pd)",
      duration: "4 Tahun (3 tahun kuliah + 1 tahun praktik pelayanan)",
      credits: "145 SKS",
      description:
        "Program ini mempersiapkan mahasiswa menjadi pendidik Kristen yang kompeten, berkarakter, dan mampu mengajar berdasarkan nilai-nilai Alkitab.",
      image: "https://images.unsplash.com/photo-1653933606308-26e3aade9bb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMHByb2Zlc3NvciUyMHRlYWNoaW5nfGVufDF8fHx8MTc3MzA1MDQwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      highlights: [
        "Praktik Lapangan Intensif",
        "Beragam Lingkup Pelayanan",
        "Integrasi Teori & Praktik",
        "Supervisi & Evaluasi Konstruktif",
      ],
    },
    {
      id: 3,
      slug: "magister-teologi",
      level: "Magister",
      name: "Magister Teologi Pelayanan Pastoral Gereja Urban (M.Th)",
      duration: "2 Tahun",
      credits: "56 SKS",
      description:
        "Program Magister Teologi Pelayanan Gereja Urban mempersiapkan pemimpin dan pelayan gereja yang mampu memahami serta melayani kebutuhan masyarakat perkotaan secara kontekstual dan relevan.",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2xhc3Nyb29tJTIwbGVjdHVyZXxlbnwxfHx8fDE3NzI5NjQxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      highlights: [
        "Kepemimpinan pelayanan",
        "Konseling pastoral",
        "Administrasi gereja",
        "Pengembangan jemaat",
      ],
    },
    {
      id: 4,
      slug: "magister-budaya",
      level: "Magister",
      name: "Magister Teologi Transformasi Budaya & Masyarakat (M.Th)",
      duration: "2 Tahun",
      credits: "56 SKS",
      description:
        "Program profesional yang mempersiapkan pemimpin gereja dengan keseimbangan antara teologi akademis dan Transformasi Budaya & Masyarakat.",
      image: "https://images.unsplash.com/photo-1583062434105-9bef71509685?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYXVkaXRvcml1bSUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzczMDUwNDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      highlights: [
        "Teologi Kontekstual",
        "Pendekatan Interdisipliner",
        "Dampak Sosial Nyata",
        "Pengembangan Pemimpin Transformasional",
      ],
    },
    {
      id: 5,
      slug: "magister-pendidikan",
      level: "Magister",
      name: "Magister Pendidikan Kristen (M.Pd)",
      duration: "2 Tahun",
      credits: "80 SKS",
      description:
        "Program magister yang mempersiapkan mahasiswa menjadi pendidik Kristen yang kompeten, berkarakter, dan mampu mengajar berdasarkan nilai-nilai Alkitab lebih dalam.",
      image: "https://images.unsplash.com/photo-1637455587265-2a3c2cbbcc84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMGludGVyaW9yfGVufDF8fHx8MTc3Mjk0MzY2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      highlights: [
        "Integrasi Iman & Pendidikan",
        "Pengembangan Profesional Pendidik",
        "Kurikulum Kontekstual",
        "Berorientasi pada Pembentukan Karakter",
      ],
    },
    {
      id: 6,
      slug: "magister-ministri",
      level: "Magister",
      name: "Magister Ministri in Marketplace (M.Min)",
      duration: "2 Tahun (4 Semester)",
      credits: "54 SKS",
      description:
        "Program magister yang mempersiapkan pemimpin Kristen untuk melayani dan memberi dampak di dunia kerja dengan mengintegrasikan iman, nilai-nilai Kristen, dan praktik profesional di lingkungan marketplace.",
      image: "https://images.unsplash.com/photo-1600903308878-bf5e554ab841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYW1wdXMlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczMDUwNDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      highlights: [
        "Integrasi Iman & Dunia Kerja",
        "Kepemimpinan Marketplace",
        "Pelayanan Kontekstual",
        "Relevan dengan Tantangan Profesional",
      ],
    },
    {
      id: 7,
      slug: "magister-pastoral",
      level: "Magister",
      name: "Magister Ministri Kepemimpinan Pastoral (M.Min)",
      duration: "2 Tahun",
      credits: "45 SKS",
      description:
        "Program akademik yang mempersiapkan pemimpin gereja dengan kemampuan kepemimpinan pastoral yang kuat, melalui pendalaman teologi dan pengembangan keterampilan pelayanan untuk menggembalakan jemaat secara efektif.",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzcyOTY0NzI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      highlights: [
        "Pembentukan Kepemimpinan Pastoral",
        "Pendalaman Teologi Pastoral",
        "Pengembangan Pelayanan Gereja",
        "Pembinaan Karakter Pemimpin",
      ],
    },
    {
      id: 8,
      slug: "magister-gerejawi",
      level: "Magister",
      name: "Magister Ministri Teologi Pelayanan Gerejawi (M.Min)",
      duration: "2,5 Tahun",
      credits: "65 SKS",
      description:
        "Program magister yang mempersiapkan pemimpin dan pelayan gereja dengan pemahaman teologi yang mendalam serta keterampilan praktis untuk mengembangkan pelayanan gerejawi yang efektif dan relevan.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Mjk2NDcyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      highlights: [
        "Pendalaman Teologi Pelayanan",
        "Pengembangan Kepemimpinan Gereja",
        "Integrasi Teori & Praktik",
        "Pelayanan yang Relevan",
      ],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="relative h-80 bg-[#002366]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#002366] to-[#003080]"></div>
        <div className="relative h-full flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-5xl mb-4">Program Studi</h1>
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
            STT Seminari Theologia menyediakan berbagai program pendidikan teologi
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
                      <span>{program.credits}</span>
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

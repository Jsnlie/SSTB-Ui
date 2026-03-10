import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Target, Heart, Book, Users, Calendar, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
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

  const testimonials = [
    {
      name: "Pdt. David Hartono",
      role: "Alumni 2020, Gembala Sidang di Surabaya",
      text: "STT Seminari Theologia tidak hanya memberi saya pengetahuan teologi yang mendalam, tetapi juga membentuk karakter saya sebagai pelayan Tuhan. Pengalaman studi di sini sangat mempengaruhi pelayanan saya hingga hari ini.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    {
      name: "Rev. Ruth Susanto",
      role: "Alumni 2019, Misionaris di Papua",
      text: "Kombinasi antara pembelajaran akademis yang ketat dan praktik pelayanan langsung mempersiapkan saya dengan baik untuk ladang misi. Saya sangat bersyukur untuk mentor-mentor rohani yang membimbing saya selama di STT.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    },
    {
      name: "Maria Liem, M.Th",
      role: "Alumni 2021, Dosen Teologi di Kalimantan",
      text: "Program Magister Teologi di STT memberikan fondasi penelitian yang kuat. Kini saya dapat melayani sebagai dosen dan peneliti yang berkontribusi untuk perkembangan teologi Indonesia.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400",
    },
  ];

  const upcomingEvents = [
    {
      title: "Kebaktian Kebangunan Rohani Kampus",
      date: "15 Maret 2026",
      image: "https://images.unsplash.com/photo-1583062434105-9bef71509685?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYXVkaXRvcml1bSUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzczMDUwNDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Seminar Nasional Teologi Kontemporer",
      date: "22 Maret 2026",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2xhc3Nyb29tJTIwbGVjdHVyZXxlbnwxfHx8fDE3NzI5NjQxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Open House Program Magister",
      date: "25 Maret 2026",
      image: "https://images.unsplash.com/photo-1547817651-7fb0cc360536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2FtcHVzfGVufDF8fHx8MTc3Mjk2NDcyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const latestNews = [
    {
      id: 1,
      title: "STT Seminari Theologia Meraih Akreditasi A dari BAN-PT",
      excerpt: "Pencapaian membanggakan sebagai hasil komitmen terhadap keunggulan akademik",
      date: "5 Maret 2026",
      image: "https://images.unsplash.com/photo-1660485345088-c398363c1f45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzMwNDEwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      title: "Perpustakaan Digital Diluncurkan dengan 10,000+ Koleksi",
      excerpt: "Akses mudah ke ribuan buku dan jurnal teologi untuk mahasiswa",
      date: "15 Februari 2026",
      image: "https://images.unsplash.com/photo-1566314748815-2ff5db8edf2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGJvb2tzJTIwbGlicmFyeSUyMHNoZWx2ZXN8ZW58MXx8fHwxNzczMDUwNDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      title: "Kerjasama Internasional dengan Trinity Theological Seminary",
      excerpt: "Program pertukaran mahasiswa dan dosen dengan seminari di USA",
      date: "10 Februari 2026",
      image: "https://images.unsplash.com/photo-1600903308878-bf5e554ab841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYW1wdXMlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczMDUwNDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-[#002366] to-[#003080]">
        <div className="absolute inset-0 bg-black/30"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1637455587265-2a3c2cbbcc84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMGludGVyaW9yfGVufDF8fHx8MTc3Mjk0MzY2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="STT Campus"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative h-full flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-5xl md:text-6xl mb-6">
              STT Seminari Theologia
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-gray-200">
              Membentuk Pemimpin Rohani yang Berkarakter Kristus
            </p>
            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Institusi pendidikan teologi terakreditasi A yang berkomitmen untuk keunggulan akademik dan pembentukan karakter
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/admisi"
                className="bg-[#C41E3A] text-white px-8 py-4 rounded-lg text-lg hover:bg-[#A01829] transition-colors inline-flex items-center justify-center"
              >
                Daftar Sekarang
                <ChevronRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/tentang-kami"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg hover:bg-white hover:text-[#002366] transition-colors"
              >
                Tentang Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-[#002366] mb-4">Visi & Misi Kami</h2>
            <div className="h-1 w-20 bg-[#C41E3A] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <Target className="text-[#C41E3A] mr-3" size={32} />
                <h3 className="text-2xl text-[#002366]">Visi</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Menjadi institusi pendidikan teologi terkemuka di Indonesia yang
                menghasilkan pemimpin rohani yang berkarakter Kristus, memiliki
                pengetahuan teologi yang mendalam, dan berkomitmen untuk
                melayani gereja dan masyarakat dengan keunggulan.
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
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-[#002366] mb-4">Nilai-Nilai Inti</h2>
            <div className="h-1 w-20 bg-[#C41E3A] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg border-2 border-[#002366] hover:border-[#C41E3A] hover:shadow-lg transition-all"
                >
                  <div className="flex justify-center mb-6">
                    <Icon className="text-[#002366]" size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl text-[#002366] text-center mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-center">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-[#002366] mb-4">Kesaksian Alumni</h2>
            <div className="h-1 w-20 bg-[#C41E3A] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dengarkan pengalaman para alumni yang kini melayani di berbagai ladang pelayanan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-[#002366]">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-[#002366] mb-4">Kegiatan & Acara</h2>
            <div className="h-1 w-20 bg-[#C41E3A] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-[#002366] mb-3">{event.title}</h3>
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2 text-[#C41E3A]" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/berita"
              className="inline-flex items-center text-[#002366] hover:text-[#C41E3A] transition-colors"
            >
              Lihat Semua Acara
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-[#002366] mb-4">Berita Terbaru</h2>
            <div className="h-1 w-20 bg-[#C41E3A] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {latestNews.map((news) => (
              <Link
                key={news.id}
                href={`/berita/${news.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <ImageWithFallback
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-[#002366] mb-2 group-hover:text-[#C41E3A] transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{news.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={12} className="mr-1" />
                    {news.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/berita"
              className="inline-flex items-center text-[#002366] hover:text-[#C41E3A] transition-colors"
            >
              Baca Semua Berita
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#002366] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl text-white mb-6">
            Siap Memulai Perjalanan Teologi Anda?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Bergabunglah dengan kami dan jadilah bagian dari komunitas yang
            mengasihi Tuhan dan melayani dengan setia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admisi"
              className="bg-[#C41E3A] text-white px-8 py-4 rounded-lg hover:bg-[#A01829] transition-colors"
            >
              Daftar Online
            </Link>
            <Link
              href="/program-akademik"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#002366] transition-colors"
            >
              Lihat Program Studi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

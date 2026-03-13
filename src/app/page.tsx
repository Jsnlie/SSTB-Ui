import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Calendar, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import VisiMisi from "../components/VisiMisi";
import CoreValues from "../components/CoreValues";
import LatestNewsSection from "../components/home/LatestNewsSection";

export default function Home() {
  const testimonials = [
    {
      name: "Maria Elsa",
      role: "S.Pd. 2014",
      text: "Menjadi guru Kristen adalah sebuah panggilan Allah untuk mewujudkan misi-Nya dalam dunia pendidikan. Saya bersyukur bisa bergabung dan diperlengkapi dalam program studi Sarjana Pendidikan Kristen di STT Bandung. Saya tidak hanya diajar secara kognitif melainkan juga belajar melalui pengalaman orang lain. Selain itu, di STT Bandung juga saya tidak hanya bertumbuh secara pemikiran tetapi juga bertumbuh dalam spiritualitas. Benar-benar menjadi jawaban dalam kebutuhan pelayanan saya. Saya berharap 30 tahun STT Bandung kiranya semakin maju, berkembang, dan terus mempersiapkan pelayan Tuhan yang menjadi berkat di manapun mereka ditempatkan.",
    },
    {
      name: "Yogi Fitra Firdaus",
      role: "STh., 2015",
      text: "STT Bandung sebagai seminari yang multikultur telah mempersiapkan saya sebagai hamba Tuhan yang mampu beradaptasi dalam berbagai konteks budaya yang ada di tengah gereja urban. Dengan visi menghasilkan pastor-scholar, diskusi teologis mengenai isu-isu di tengah masyarakat seperti kemiskinan, hak-hak anak dan ekologi memperlengkapi saya dengan satu pemahaman misi gereja yang holistik bahwa umat Allah tidak hanya dipanggil mewartakan Injil keselamatan tetapi juga hadir untuk menjadi agen transformasi sosial. STT Bandung juga memberikan ruang diseminasi ilmiah terhadap hasil-hasil riset yang dilakukan oleh dosen, mahasiswa dan alumni sehingga seluruh civitas academica dapat memberikan kontribusi strategis bagi gereja dan masyarakat.",
    },
    {
      name: "Samuel Wiratama",
      role: "MTh., 2018",
      text: "Bagi saya, STT Bandung telah menghadirkan berkat besar dalam kehidupan pelayanan. Dengan menekankan keseimbangan dalam karakter, akademik, dan praktik, menolong saya untuk menjadi seorang gembala yang mahir dalam pelayanan praktis gereja dengan berlandaskan akademik kuat dan kehidupan etis yang dapat menjadi teladan. Tidak ketinggalan, para dosen yang sangat peduli dalam membimbing dan memperhatikan para mahasiswa menjadi nilai tambah yang amat bermanfaat untuk membekali mahasiswa dalam pelayanan. Saya berharap STT Bandung terus bertumbuh dalam hal-hal ini sehingga dapat menjadi berkat bagi kekristenan di Indonesia.",
    }
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
              Sekolah Tinggi Teologi Bandung
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-gray-200">
              Membentuk Pastor yang Berkarakter Kristus
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

      <VisiMisi />
      <CoreValues />

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

      <LatestNewsSection />

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

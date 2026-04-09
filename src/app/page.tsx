import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import VisiMisi from "../components/VisiMisi";
import CoreValues from "../components/CoreValues";
import LatestNewsSection from "../components/home/LatestNewsSection";
import LatestEventsSection from "../components/home/LatestEventsSection";
import { ScrollReveal } from "../components/home/ScrollReveal";
import TestimonialsSection from "../components/home/TestimonialsSection";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[730px] bg-gradient-to-r from-[#002366] to-[#003080]">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#C41E3A]/20 blur-3xl"></div>
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1637455587265-2a3c2cbbcc84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMGludGVyaW9yfGVufDF8fHx8MTc3Mjk0MzY2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="STTB Campus"
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
            <div className="mt-12 inline-flex flex-col items-center gap-2 text-sm text-gray-200/90">
              <span className="tracking-[0.25em] uppercase">Scroll untuk menjelajah</span>
              <ChevronDown className="animate-bounce" size={22} />
            </div>
          </div>
        </div>
      </section>

      {/* Campus Tour Section */}
      <ScrollReveal>
        <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002366] mb-4">Campus Tour</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Jelajahi lingkungan kampus STTB secara virtual melalui video Campus Tour berikut. Temukan fasilitas, suasana, dan kehidupan kampus yang mendukung pertumbuhan akademik dan spiritual.
          </p>
          <div className="flex justify-center">
            <div className="w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/hTh0QkKxNhg?start=6"
                title="Campus Tour STT Bandung"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        </section>
      </ScrollReveal>

      <VisiMisi />
      <CoreValues />

      <TestimonialsSection />

      <LatestNewsSection />

      <LatestEventsSection />

      {/* CTA Section */}
      <ScrollReveal>
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
      </ScrollReveal>
    </div>
  );
}

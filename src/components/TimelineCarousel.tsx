"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

import { Calendar, LucideIcon } from "lucide-react";

export interface TimelineEvent {
  icon: LucideIcon;
  year: string;
  title: string;
  description: string;
}

const timelineData: TimelineEvent[] = [
  {
    icon: Calendar,
    year: "1992 - 1998",
    title: "Pendirian STTB",
    description:
      "STTB didirikan pada tahun 1992 oleh Pdt. Caleb Tong, Pdt. Joseph Tong, dan Pdt. Dorothy I. Marx untuk membentuk Pastor-Scholar dengan dasar teologi Reformed Injili di Indonesia. Pdt. Daniel Lucas Lukito menjadi Dekan Akademik pertama dan berperan dalam membangun fondasi akademik STTB. Pada masa awal, STTB juga mengembangkan perpustakaan, menerbitkan Jurnal Teologi STULOS, mengadakan acara nasional Ferakristal, dan melaksanakan wisuda pertama pada tahun 1996.",
  },
  {
     icon: Calendar,
    year: "1995 - 2005",
    title: "Pengembangan Program Studi",
    description:
      "Pada periode ini terjadi pergantian kepemimpinan dengan Ibu Dorothy I. Marx sebagai Rektor. STTB membuka program studi baru yaitu M.A. (Master of Arts) dan M.Th. (Master of Theology). Selain itu, STTB membangun asrama dosen, menerbitkan seri buku “Sola…”, serta menyelenggarakan acara nasional bagi pemuda yaitu CYLF (Christian Youth Leadership Forum).",
  },

  {
     icon: Calendar,
    year: "2006 - 2010",
    title: "Penguatan Akademik dan Misi Global",
    description: "Di bawah kepemimpinan Pdt. Joseph Tong, STTB meningkatkan kualitas dosen dengan mengutus beberapa tenaga pengajar melanjutkan studi di USA. Pada periode ini diterbitkan dua buku Seri Sola yaitu Sola Scriptura dan Sola Fide. STTB juga membuka program studi berbahasa Mandarin (S.Th., M.Div., dan M.A.) sebagai bagian dari pelayanan misi ke Tiongkok dengan dukungan dosen dari Taiwan.",
  },

  {
     icon: Calendar,
    year: "2011 - 2016",
    title: "Pengembangan Fasilitas dan Program Studi",
    description: "Pada masa kepemimpinan Pdt. Agus Gunawan, STTB membangun gedung tujuh lantai yang digunakan untuk kelas, kantor, asrama, aula, dan perpustakaan. STTB juga membuka program studi baru seperti S.Pd.K., M.Min., dan M.Pd.K. serta menerbitkan buku Seri Sola lainnya. Beberapa program studi mulai terakreditasi BAN-PT dan ATA, dan STTB memperluas jejaring internasional dengan kehadiran dosen dari berbagai negara.",
  },

  {
     icon: Calendar,
    year: "2017 - 2022",
    title: "Penguatan Formasi dan Inovasi Program",
    description: "Pada periode ini STTB berfokus pada peningkatan kualitas pendidikan dan pengembangan program studi formal maupun nonformal. Formasi spiritual mahasiswa diperkuat melalui integrasi pembelajaran, kapel, mentoring, dan praktik pelayanan. Berbagai program magister seperti M.Th. (Transformasi Budaya dan Masyarakat) serta M.Min Marketplace dikembangkan untuk membekali pelayanan di gereja dan dunia kerja. Pendidikan nonformal juga berkembang melalui LEAD Center dengan program pembinaan digital, webinar Conversation That Matters, serta kolaborasi dengan gereja dan lembaga nasional maupun global. Kepemimpinan STTB dijalankan oleh Pdt. Chandra Koewoso sejak 2017 dan dilanjutkan oleh Sutrisna Harjanto, PhD sejak 2019.",
  },
];

export default function TimelineCarousel() {
  return (
    <div className="mt-12">
      
      
      <Carousel
        opts={{ align: "start", loop: false, slidesToScroll: 2 }}
        className="mx-auto max-w-7xl px-12"
      >
        <CarouselContent className="-ml-4">
          {timelineData.map((event) => (
            <CarouselItem
              key={event.year}
              className="pl-4 basis-full md:basis-1/2"
            >
              <div className="h-full bg-gray-50 rounded-lg border-t-4 border-[#C41E3A] p-6 flex flex-col">
                <div className="flex items-center gap-2">
                  <event.icon className="text-[#C41E3A]" size={24} />
                  <span className="text-3xl font-bold text-[#C41E3A]">
                    {event.year}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-[#002366] mt-2 mb-3">
                  {event.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">
                  {event.description}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

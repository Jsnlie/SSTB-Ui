"use client";

import { useState } from "react";
import { ChevronDown} from "lucide-react";

const pengakuanImanData = [
  {
    title: "Alkitab",
    content:
      "Kami Percaya bahwa Alkitab secara keseluruhan, Perjanjian Lama dan Perjanjian Baru, adalah firman Allah yang diwahyukan dan diilhamkan tanpa kesalahan. Oleh karena itu, Alkitab adalah sumber otoritas tertinggi bagi iman dan kehidupan orang percaya di segala abad dan tempat.",
  },
  {
    title: "Allah Tritunggal",
    content:
      "Kami Percaya bahwa Allah adalah Esa dan kekal, Mahakudus, dan penuh rahmat. Ia adalah pencipta, penguasa, dan pemelihara alam semesta beserta segala isinya, Tritunggal sebagai Bapa, Anak, dan Roh Kudus. Masing-masing adalah Pribadi yang tidak diciptakan, sehakekat, dan setara dalam kuasa dan kemuliaan. Ia berdaulat baik dalam keselamatan maupun dalam penghakiman umat manusia.",
  },
  {
    title: "Manusia",
    content:
      "Kami Percaya bahwa manusia, laki-laki dan perempuan, telah diciptakan oleh Allah menurut gambar-Nya, yang telah dimahkotai-Nya dengan kemuliaan serta mandat untuk memenuhi bumi, mengelola dan memelihara seluruh ciptaan-Nya. Tetapi manusia telah jatuh ke dalam dosa, terpisah dari Allah, dan kehilangan kemampuan untuk hidup sesuai dengan citranya sebagai ciptaan Allah, sehingga tidak mampu menyelamatkan dirinya sendiri.",
  },
  {
    title: "Yesus Kristus",
    content:
      "Kami Percaya bahwa Yesus Kristus adalah Anak Tunggal Allah, Allah sejati dan Manusia sejati, penebus dan satu-satunya jalan keselamatan bagi seluruh umat manusia. Ia dikandung dari Roh Kudus, lahir dari anak dara Maria, hidup tanpa dosa, sempurna dalam pengorbanan dan kasih. Ia mati di atas kayu salib, bangkit kembali dari antara orang mati dalam tubuh kebangkitan yang nyata, naik ke sorga, duduk di sebelah kanan Allah Bapa, menjadi Imam Besar Agung bagi orang percaya, dan pengantara tunggal antara Allah dan manusia, serta Raja di atas segala raja.",
  },
  {
    title: "Roh Kudus",
    content:
      "Kami Percaya bahwa Roh Kudus adalah Allah yang hidup, yang menginsafkan manusia akan dosa, kebenaran, dan penghakiman. Ia melahirbarukan orang berdosa yang percaya, mendiami, menguduskan, dan memberi kuasa serta karunia-karunia kepada setiap orang percaya menurut kehendak-Nya demi kesaksian, persekutuan, dan pelayanan untuk pembangunan tubuh Kristus.",
  },
  {
    title: "Keselamatan",
    content:
      "Kami Percaya bahwa manusia hanya dapat diselamatkan oleh kasih karunia melalui penebusan oleh Tuhan Yesus Kristus dan dibenarkan melalui iman, tanpa jasa, usaha, ataupun kesalehan dari pihak manusia. Melalui penyelamatan Allah dalam Kristus, gambar Allah pada manusia dipulihkan. Dengan demikian, manusia dimampukan untuk menjalani kehidupan yang penuh tanggung jawab dalam pengabdian dan kasih di hadapan Allah dan manusia.",
  },
  {
    title: "Gereja",
    content:
      "Kami Percaya bahwa Gereja selaku garam dan terang dunia adalah himpunan semua orang percaya dari segala abad dan bangsa. Ia adalah tubuh Kristus yang kudus dan Am, dengan Kristus sebagai Kepalanya. Gereja memberitakan Kerajaan Allah melalui kebaktian, pengajaran, sakramen baptisan dan perjamuan kudus, serta pemberitaan Injil dan misi umat Allah seutuhnya di tengah dunia.",
  },
  {
    title: "Kedatangan Kristus Kedua Kali",
    content:
      "Kami Percaya bahwa kepastian kedatangan kembali Yesus Kristus secara nyata dan pribadi akan terjadi pada akhir zaman untuk menjemput umat-Nya untuk menghakimi seluruh umat manusia, baik yang hidup maupun yang mati. Pada kedatangan-Nya kedua kali itulah setiap orang mati akan dibangkitkan, orang percaya masuk ke dalam kehidupan yang kekal, orang yang tidak percaya masuk ke dalam kebinasaan yang kekal.",
  },
];

export default function PengakuanIman() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002366] mb-3">
            Pengakuan Iman
          </h2>
          <div className="h-1 w-20 bg-[#C41E3A] mx-auto mb-5"></div>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Dasar-dasar kepercayaan yang menjadi fondasi iman dan pengajaran di
            Sekolah Tinggi Teologi Bandung
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-4xl mx-auto space-y-4">
          {pengakuanImanData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`group rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#002366]/20 shadow-lg shadow-[#002366]/5 bg-white"
                    : "border-gray-200 bg-white hover:border-[#002366]/15 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center gap-4 p-5 md:p-6 text-left cursor-pointer"
                >
                  {/* Number badge */}
                  <span
                    className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-colors duration-300 ${
                      isOpen
                        ? "bg-[#C41E3A] text-white"
                        : "bg-[#002366]/10 text-[#002366] group-hover:bg-[#002366]/15"
                    }`}
                  >
                    {index + 1}
                  </span>

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-lg font-semibold transition-colors duration-300 ${
                        isOpen
                          ? "text-[#002366]"
                          : "text-gray-800 group-hover:text-[#002366]"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>

                  {/* Chevron */}
                  <ChevronDown
                    className={`flex-shrink-0 w-5 h-5 text-[#C41E3A] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 md:px-6 pb-6 pl-[4.75rem]">
                    <div className="h-px bg-gradient-to-r from-[#C41E3A]/30 via-[#002366]/10 to-transparent mb-5"></div>
                    <p className="text-gray-600 leading-relaxed text-[15px]">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

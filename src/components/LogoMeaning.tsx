import Image from "next/image";

interface LogoElement {
  image: string;
  title: string;
  description: string;
}

const logoElements: LogoElement[] = [
  {
    image: "/api.png",
    title: "Api",
    description:
      "Menggambarkan penyertaan dan pemenuhan dari Allah Roh Kudus yang menjadi sumber hikmat, kuasa, dan kasih serta merupakan syarat mutlak bagi pelayan Tuhan.",
  },
  {
    image: "/alkitab.png",
    title: "Alkitab",
    description:
      "Adalah satu-satunya sumber pengetahuan yang benar tentang Allah dan dasar bagi panggilan serta pelayanan (Sola Scriptura).",
  },
  {
    image: "/salib&mahkota.png",
    title: "Salib & Mahkota",
    description:
      "Melambangkan panggilan untuk berpegang kepada kebenaran dan merajakan Kristus.",
  },
  {
    image: "/tongkat gembala.png",
    title: "Tongkat Gembala",
    description:
      "Melambangkan panggilan Tuhan untuk menggembalakan umat-Nya.",
  },
];

export default function LogoMeaning() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl text-[#002366] mb-4">Arti Logo STTB</h2>
        <div className="h-1 w-20 bg-[#C41E3A] mx-auto mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Logo STTB menggambarkan pola pendidikan teologi yang akan memperlengkapi
          para mahasiswa untuk menjadi hamba Allah yang baik, setia, dan penuh hikmat,
          serta siap dipakai dalam pelayanan di ladangNya.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Logo Image */}
        <div className="flex-shrink-0">
          <Image
            src="/Sekolah Tinggi Teologi Bandung.png"
            alt="Logo STTB"
            width={280}
            height={280}
            className="object-contain"
          />
        </div>

        {/* Logo Elements Grid */}
        <div className="flex-1 grid sm:grid-cols-2 gap-6">
          {logoElements.map((item) => {
            return (
              <div
                key={item.title}
                className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#C41E3A] hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={50}
                    className="object-contain mix-blend-multiply"
                  />
                  <h3 className="text-lg font-bold text-[#C41E3A] uppercase tracking-wide">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

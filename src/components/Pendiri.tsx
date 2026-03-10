import Image from "next/image";

interface Founder {
  name: string;
  image: string;
}

const founders: Founder[] = [
  {
    name: "Rev. Dr. Caleb Tong (Alm.)",
    image: "/caleb-tong-rev.png",
  },
  {
    name: "Rev. Dr. Joseph Tong, Ph.D.",
    image: "/joseph-tong.png",
  },
  {
    name: "Rev. Dorothy I. Marx (Alm.)",
    image: "/dorothy-marx.png",
  },
];

export default function Pendiri() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl text-[#002366] mb-4">Para Pendiri STTB</h2>
        <div className="h-1 w-20 bg-[#C41E3A] mx-auto"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {founders.map((founder) => (
          <div
            key={founder.name}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-72 bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={founder.image}
                alt={founder.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold text-[#002366]">
                {founder.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

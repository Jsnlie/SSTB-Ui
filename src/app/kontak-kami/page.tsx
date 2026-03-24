import { Mail, MapPin, Phone, Smartphone, ArrowUpRight } from "lucide-react";

export default function KontakKamiPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-[#002366] to-[#003080] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h1 className="text-4xl md:text-5xl mb-4 text-center">Kontak Kami</h1>
          <div className="h-1 w-24 bg-[#C41E3A] mb-6 mx-auto"></div>
          <p className="text-center text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Hubungi kami untuk informasi admisi,
            program studi, atau kebutuhan pelayanan akademik lainnya.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-gray-50 border border-gray-100 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl text-[#002366] mb-6">Informasi Kontak</h2>

            <div className="space-y-5 text-gray-700">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#C41E3A] mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Alamat</p>
                  <p className="leading-relaxed">
                    Jl Dr. Djunjunan No. 105. Bandung, Indonesia 40173
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="text-[#C41E3A] mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <a
                    href="mailto:official@sttb.ac.id"
                    className="hover:text-[#002366] transition-colors"
                  >
                    official@sttb.ac.id
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="text-[#C41E3A] mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Keuangan</p>
                  <a
                    href="mailto:keuangan@sttb.ac.id"
                    className="hover:text-[#002366] transition-colors"
                  >
                    keuangan@sttb.ac.id
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="text-[#C41E3A] mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Beasiswa</p>
                  <a
                    href="mailto:beasiswa@sttb.ac.id"
                    className="hover:text-[#002366] transition-colors"
                  >
                    beasiswa@sttb.ac.id
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="text-[#C41E3A] mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Admisi & Marketing</p>
                  <p>(+62) 815 7336 0009</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="text-[#C41E3A] mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Akademik & Kemahasiswaan</p>
                  <p>(+62) 815-7127-228</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="text-[#C41E3A] mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Perpustakaan</p>
                  <p>(+62) 857-9153-8527</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-2xl text-[#002366]">Lokasi Kampus</h2>
            </div>

            <div className="h-[520px]">
              <iframe
                title="Lokasi Sekolah Tinggi Teologi Bandung"
                src="https://www.google.com/maps?hl=id&q=Sekolah+Tinggi+Teologi+Bandung+(Bandung+Theological+Seminary),+Jl.+Dr.+Djunjunan+No.105,+Bandung&z=17&output=embed"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

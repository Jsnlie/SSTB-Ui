"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, MapPin, Smartphone, LogIn } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Program Studi", href: "/program-studi" },
    { name: "Admisi", href: "/admisi" },
    { name: "Berita", href: "/berita" },
    { name: "Kegiatan", href: "/kegiatan" },
    { name: "Kehidupan Kampus", href: "/kehidupan-kampus" },
    { name: "Kontak Kami", href: "/kontak-kami" },
  ];

  // Skip public layout for admin routes
  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) return <>{children}</>;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center gap-3">
              <Image
                src="/Sekolah Tinggi Teologi Bandung.png"
                alt="logo sttb"
                width={40}
                height={40}
                className="object-contain"
              />
              <Link href="/" className="text-xl font-bold text-[#002366]">
                Sekolah Tinggi Teologi Bandung
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm transition-colors ${
                    pathname === item.href
                      ? "text-[#C41E3A]"
                      : "text-[#002366] hover:text-[#C41E3A]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 bg-[#002366] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#001a4d] transition-colors"
              >
                <LogIn size={16} />
                Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#002366]"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base ${
                      pathname === item.href
                        ? "bg-[#C41E3A] text-white"
                        : "text-[#002366] hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base bg-[#002366] text-white mt-2"
                >
                  <LogIn size={16} />
                  Login
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[#002366] text-white mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">Sekolah Tinggi Teologi Bandung</h3>
              <p className="text-sm text-gray-300">
               Sekolah Tinggi Teologi Bandung membentuk pemimpin rohani yang berintegritas dan berkarakter melalui pendidikan teologi yang berkualitas, pembinaan iman yang mendalam, serta komitmen untuk melayani gereja dan masyarakat secara luas.
              </p>
            </div>
            <div className="px-16">
              <h3 className="font-bold mb-4">Tautan Cepat</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tentang-kami"
                    className="text-gray-300 hover:text-white"
                  >
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href="/program-studi"
                    className="text-gray-300 hover:text-white"
                  >
                    Program Studi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admisi"
                    className="text-gray-300 hover:text-white"
                  >
                    Admisi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/berita"
                    className="text-gray-300 hover:text-white"
                  >
                    Berita
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kegiatan"
                    className="text-gray-300 hover:text-white"
                  >
                    Kegiatan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kehidupan-kampus"
                    className="text-gray-300 hover:text-white"
                  >
                    Kehidupan Kampus
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kontak-kami"
                    className="text-gray-300 hover:text-white"
                  >
                    Kontak Kami
                  </Link>
                </li>
                
              </ul>
            </div>
              <div className="text-sm text-gray-300 space-y-3">
                <h3 className="font-bold mb-4">Contact Us</h3>
                <div className="flex items-start gap-3">
                  <MapPin size={16} />
                  <span>
                    Jl Dr. Djunjunan No. 105. Bandung, Indonesia 40173
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>Email: official@sttb.ac.id</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>(+62) 22 601-6454, 607-7920</span>
                </div>

                <div className="flex items-center gap-2">
                  <Smartphone size={16} />
                  <span>
                    Whatsapp: (+62) 815 7336 0009, (+62) 851-8302-6009
                  </span>
                </div>
              </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
            © 2026 Sekolah Tinggi Teologi Bandung. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

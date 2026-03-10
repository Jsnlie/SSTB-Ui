"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Program Studi", href: "/program-studi" },
    { name: "Admisi", href: "/admisi" },
    { name: "Berita", href: "/berita" },
    { name: "Kehidupan Kampus", href: "/kehidupan-kampus" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-[#002366]">
                STT Seminari Theologia
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:gap-x-6">
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
              <h3 className="font-bold mb-4">STT Seminari Theologia</h3>
              <p className="text-sm text-gray-300">
                Institusi pendidikan teologi yang berkomitmen untuk
                membentuk pemimpin rohani yang berkualitas.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Tautan Cepat</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/tentang-kami" className="text-gray-300 hover:text-white">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="/program-studi" className="text-gray-300 hover:text-white">
                    Program Studi
                  </Link>
                </li>
                <li>
                  <Link href="/admisi" className="text-gray-300 hover:text-white">
                    Admisi
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Kontak</h3>
              <p className="text-sm text-gray-300">
                Jl. Pendidikan No. 123<br />
                Jakarta, Indonesia<br />
                Email: info@stt-seminari.ac.id<br />
                Telp: (021) 1234-5678
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
            © 2026 STT Seminari Theologia. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

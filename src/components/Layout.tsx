"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Smartphone,
  LogIn,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const aboutLinks = [
  { name: "Tentang Kami", href: "/tentang-kami" },
  { name: "Kehidupan Kampus", href: "/kehidupan-kampus" },
];

const academicLinks = [
  { name: "Program Studi", href: "/program-studi" },
  { name: "Perpustakaan", href: "/perpustakaan" },
];

const infoLinks = [
  { name: "Berita", href: "/berita" },
  { name: "Kegiatan", href: "/kegiatan" },
];

const directLinks = [
  { name: "Media", href: "/media" },
  { name: "Admisi", href: "/admisi" },
  { name: "Kontak Kami", href: "/kontak-kami" },
];

const footerLinksLeft = [
  { name: "Home", href: "/" },
  { name: "Tentang Kami", href: "/tentang-kami" },
  { name: "Program Studi", href: "/program-studi" },
  { name: "Program Akademik", href: "/program-akademik" },
  { name: "Perpustakaan", href: "/perpustakaan" },
];

const footerLinksRight = [
  { name: "Admisi", href: "/admisi" },
  { name: "Berita", href: "/berita" },
  { name: "Kegiatan", href: "/kegiatan" },
  { name: "Kehidupan Kampus", href: "/kehidupan-kampus" },
  { name: "Media", href: "/media" },
  { name: "Kontak Kami", href: "/kontak-kami" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSectionOpen, setMobileSectionOpen] = useState<string | null>(null);
  const pathname = usePathname();

  const sections = [
    { name: "Tentang", items: aboutLinks },
    { name: "Akademik", items: academicLinks },
    { name: "Informasi", items: infoLinks },
  ];

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  const isSectionActive = (items: { href: string }[]) =>
    items.some((item) => isActive(item.href));

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileSectionOpen(null);
  };

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
            <div className="hidden md:flex md:items-center md:gap-x-4">
              {sections.map((section) => (
                <DropdownMenu key={section.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={`inline-flex items-center gap-1 text-sm font-medium transition-colors px-2 py-1.5 rounded-md ${
                        isSectionActive(section.items)
                          ? "text-[#C41E3A] bg-[#C41E3A]/8"
                          : "text-[#002366] hover:text-[#C41E3A] hover:bg-gray-50"
                      }`}
                    >
                      {section.name}
                      <ChevronDown size={16} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-52 border-gray-200 bg-white">
                    {section.items.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link
                          href={item.href}
                          className={`cursor-pointer rounded-sm px-3 py-2 text-sm transition-colors ${
                            isActive(item.href)
                              ? "bg-[#C41E3A] text-white focus:bg-[#C41E3A] focus:text-white"
                              : "text-[#002366] focus:bg-gray-100 focus:text-[#C41E3A]"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}

              {directLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors px-2 py-1.5 rounded-md ${
                    isActive(item.href)
                      ? "text-[#C41E3A] bg-[#C41E3A]/8"
                      : "text-[#002366] hover:text-[#C41E3A] hover:bg-gray-50"
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
            <div className="md:hidden pb-4 space-y-2">
              <div className="space-y-2 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
                {sections.map((section) => (
                  <div key={section.name} className="rounded-xl border border-gray-100">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileSectionOpen((current) =>
                          current === section.name ? null : section.name
                        )
                      }
                      className={`flex w-full items-center justify-between px-4 py-3 text-left text-base font-medium ${
                        isSectionActive(section.items)
                          ? "text-[#C41E3A]"
                          : "text-[#002366]"
                      }`}
                    >
                      {section.name}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          mobileSectionOpen === section.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileSectionOpen === section.name && (
                      <div className="space-y-1 border-t border-gray-100 px-2 pb-2">
                        {section.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={closeMobileMenu}
                            className={`block rounded-lg px-3 py-2 text-sm ${
                              isActive(item.href)
                                ? "bg-[#C41E3A] text-white"
                                : "text-[#002366] hover:bg-gray-50"
                            }`}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {directLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`block px-4 py-3 rounded-xl text-base font-medium border border-gray-100 ${
                      isActive(item.href)
                        ? "bg-[#C41E3A] text-white"
                        : "text-[#002366] hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/admin/login"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-base bg-[#002366] text-white mt-2"
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
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 text-sm">
                <ul className="space-y-2">
                  {footerLinksLeft.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {footerLinksRight.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
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

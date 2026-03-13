"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Newspaper,
  CalendarDays,
  FileText,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Program Studi", href: "/admin/program-studi", icon: GraduationCap },
  { name: "Mata Kuliah", href: "/admin/mata-kuliah", icon: BookOpen },
  { name: "Berita", href: "/admin/berita", icon: Newspaper },
  { name: "Kegiatan", href: "/admin/kegiatan", icon: CalendarDays },
  { name: "Overview About", href: "/admin/overview-about", icon: FileText },
  { name: "Overview Requirement", href: "/admin/overview-requirement", icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1E3A8A] min-h-screen fixed left-0 top-0 flex flex-col text-white z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Image
            src="/Sekolah Tinggi Teologi Bandung.png"
            alt="STTB"
            width={36}
            height={36}
            className="object-contain"
          />
          <div>
            <h1 className="text-base font-bold leading-tight">STTB Admin</h1>
            <p className="text-[11px] text-white/60">Content Management System</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#DC2626] text-white shadow-lg shadow-red-500/20"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/80 hover:bg-white/10 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </Link>
      </div>
    </aside>
  );
}

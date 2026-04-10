"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../../../components/admin/Sidebar";
import AdminNavbar from "../../../components/admin/AdminNavbar";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/program-studi": "Program Studi",
  "/admin/jenis-matkul": "Jenis Mata Kuliah",
  "/admin/mata-kuliah": "Mata Kuliah",
  "/admin/kompetensi": "Kompetensi",
  "/admin/berita": "Berita",
  "/admin/kegiatan": "Kegiatan",
  "/admin/perpustakaan": "Perpustakaan",
  "/admin/admisi": "Biaya Studi",
  "/admin/overview-about": "Overview About",
  "/admin/overview-requirement": "Overview Requirement",
};

function getPageTitle(pathname: string): string {
  // Exact match first
  if (pageTitles[pathname]) return pageTitles[pathname];

  // Check for sub-routes (tambah, edit)
  for (const [key, value] of Object.entries(pageTitles)) {
    if (key !== "/admin" && pathname.startsWith(key)) {
      if (pathname.includes("/tambah")) return `Tambah ${value}`;
      return `Edit ${value}`;
    }
  }

  return "Dashboard";
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <Sidebar />
      <div className="ml-64">
        <AdminNavbar title={title} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

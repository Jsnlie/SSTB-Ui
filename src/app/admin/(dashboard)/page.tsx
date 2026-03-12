"use client";

import {
  GraduationCap,
  BookOpen,
  Newspaper,
  CalendarDays,
  TrendingUp,
  Users,
} from "lucide-react";
import StatsCard from "../../../components/admin/StatsCard";
import Link from "next/link";

const recentBerita = [
  { id: 1, title: "STT Bandung Meraih Akreditasi A dari BAN-PT", date: "5 Mar 2026", status: "Published" },
  { id: 2, title: "Perpustakaan Digital Diluncurkan", date: "15 Feb 2026", status: "Published" },
  { id: 3, title: "Kerjasama dengan Trinity Theological Seminary", date: "10 Feb 2026", status: "Draft" },
  { id: 4, title: "Wisuda Angkatan 2025", date: "1 Feb 2026", status: "Published" },
];

const recentKegiatan = [
  { id: 1, title: "Kebaktian Kebangunan Rohani Kampus", date: "15 Mar 2026", status: "Upcoming" },
  { id: 2, title: "Seminar Nasional Teologi Kontemporer", date: "22 Mar 2026", status: "Upcoming" },
  { id: 3, title: "Open House Program Magister", date: "25 Mar 2026", status: "Upcoming" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Program Studi"
          value={8}
          icon={GraduationCap}
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatsCard
          title="Total Mata Kuliah"
          value={124}
          icon={BookOpen}
          color="text-emerald-600"
          bgColor="bg-emerald-50"
        />
        <StatsCard
          title="Total Berita"
          value={47}
          icon={Newspaper}
          color="text-amber-600"
          bgColor="bg-amber-50"
        />
        <StatsCard
          title="Total Kegiatan"
          value={15}
          icon={CalendarDays}
          color="text-purple-600"
          bgColor="bg-purple-50"
        />
      </div>

      {/* Quick overview row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Aktivitas Terbaru</h2>
            <TrendingUp size={20} className="text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-600">Berita baru dipublikasikan</span>
              <span className="ml-auto text-gray-400 text-xs">2 jam lalu</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-gray-600">Mata kuliah diperbarui</span>
              <span className="ml-auto text-gray-400 text-xs">5 jam lalu</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              <span className="text-gray-600">Kegiatan baru ditambahkan</span>
              <span className="ml-auto text-gray-400 text-xs">1 hari lalu</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span className="text-gray-600">Program studi diperbarui</span>
              <span className="ml-auto text-gray-400 text-xs">2 hari lalu</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Statistik Pengunjung</h2>
            <Users size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Hari ini</span>
                <span className="font-medium text-gray-800">1,234</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#1E3A8A] h-2 rounded-full" style={{ width: "75%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Minggu ini</span>
                <span className="font-medium text-gray-800">8,456</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#1E3A8A] h-2 rounded-full" style={{ width: "60%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Bulan ini</span>
                <span className="font-medium text-gray-800">32,789</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#1E3A8A] h-2 rounded-full" style={{ width: "90%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tables row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Berita */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Berita Terbaru</h2>
            <Link href="/admin/berita" className="text-sm text-[#1E3A8A] hover:underline">
              Lihat semua
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentBerita.map((item) => (
              <div key={item.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    item.status === "Published"
                      ? "bg-green-50 text-green-700"
                      : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Kegiatan */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Kegiatan Mendatang</h2>
            <Link href="/admin/kegiatan" className="text-sm text-[#1E3A8A] hover:underline">
              Lihat semua
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentKegiatan.map((item) => (
              <div key={item.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-blue-50 text-blue-700">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

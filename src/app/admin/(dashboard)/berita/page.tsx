"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const placeholderData = [
  { id: 1, judul: "STT Bandung Meraih Akreditasi A dari BAN-PT", kategori: "Akademik", tanggal: "5 Mar 2026", status: "Published" },
  { id: 2, judul: "Perpustakaan Digital Diluncurkan dengan 10,000+ Koleksi", kategori: "Fasilitas", tanggal: "15 Feb 2026", status: "Published" },
  { id: 3, judul: "Kerjasama Internasional dengan Trinity Theological Seminary", kategori: "Kerjasama", tanggal: "10 Feb 2026", status: "Draft" },
  { id: 4, judul: "Wisuda Angkatan 2025: 120 Lulusan Siap Melayani", kategori: "Akademik", tanggal: "1 Feb 2026", status: "Published" },
  { id: 5, judul: "Workshop Penulisan Jurnal Ilmiah untuk Dosen", kategori: "Akademik", tanggal: "20 Jan 2026", status: "Published" },
  { id: 6, judul: "Program Beasiswa Penuh untuk Mahasiswa Berprestasi", kategori: "Beasiswa", tanggal: "15 Jan 2026", status: "Published" },
  { id: 7, judul: "Renovasi Gedung Perkuliahan Selesai", kategori: "Fasilitas", tanggal: "10 Jan 2026", status: "Draft" },
  { id: 8, judul: "Dosen STT Bandung Raih Penghargaan Peneliti Terbaik", kategori: "Prestasi", tanggal: "5 Jan 2026", status: "Published" },
];

export default function BeritaPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = placeholderData.filter((item) => {
    const matchSearch = item.judul.toLowerCase().includes(search.toLowerCase());
    const matchFilter = !filterStatus || item.status === filterStatus;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      {/* Actions bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-3 flex-1 w-full sm:w-auto">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white"
          >
            <option value="">Semua Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
        <Link
          href="/admin/berita/tambah"
          className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors"
        >
          <Plus size={18} />
          Tambah Berita
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-4 font-medium text-gray-600">No</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Judul</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Kategori</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Tanggal</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Status</th>
                <th className="text-center px-6 py-4 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-800 max-w-xs truncate">{item.judul}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                      {item.kategori}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.tanggal}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.status === "Published"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat">
                        <Eye size={16} />
                      </button>
                      <Link href={`/admin/berita/${item.id}`} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => setDeleteId(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Menampilkan {filtered.length} dari {placeholderData.length} data
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="px-3 py-1.5 bg-[#1E3A8A] text-white text-sm rounded-lg">1</button>
            <button className="p-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Dialog */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800">Hapus Berita</h3>
            <p className="text-sm text-gray-500 mt-2">
              Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3 mt-6 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-[#DC2626] text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

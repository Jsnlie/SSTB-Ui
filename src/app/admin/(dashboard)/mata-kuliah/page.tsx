"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const placeholderData = [
  { id: 1, kode: "TEO101", nama: "Pengantar Perjanjian Lama", sks: 3, semester: 1, prodi: "Sarjana Teologi" },
  { id: 2, kode: "TEO102", nama: "Pengantar Perjanjian Baru", sks: 3, semester: 1, prodi: "Sarjana Teologi" },
  { id: 3, kode: "TEO201", nama: "Teologi Sistematika I", sks: 4, semester: 3, prodi: "Sarjana Teologi" },
  { id: 4, kode: "TEO202", nama: "Sejarah Gereja", sks: 3, semester: 2, prodi: "Sarjana Teologi" },
  { id: 5, kode: "PDK101", nama: "Dasar-dasar Pendidikan Kristen", sks: 3, semester: 1, prodi: "Sarjana Pendidikan Kristen" },
  { id: 6, kode: "PDK201", nama: "Psikologi Pendidikan", sks: 3, semester: 3, prodi: "Sarjana Pendidikan Kristen" },
  { id: 7, kode: "MTH301", nama: "Hermeneutika Lanjut", sks: 3, semester: 1, prodi: "Magister Teologi" },
  { id: 8, kode: "MTH302", nama: "Metodologi Penelitian Teologi", sks: 3, semester: 2, prodi: "Magister Teologi" },
  { id: 9, kode: "TEO301", nama: "Homiletika", sks: 3, semester: 5, prodi: "Sarjana Teologi" },
  { id: 10, kode: "TEO302", nama: "Etika Kristen", sks: 3, semester: 4, prodi: "Sarjana Teologi" },
];

export default function MataKuliahPage() {
  const [search, setSearch] = useState("");
  const [filterProdi, setFilterProdi] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const prodiList = [...new Set(placeholderData.map((d) => d.prodi))];

  const filtered = placeholderData.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.kode.toLowerCase().includes(search.toLowerCase());
    const matchFilter = !filterProdi || item.prodi === filterProdi;
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
              placeholder="Cari mata kuliah..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
            />
          </div>
          <select
            value={filterProdi}
            onChange={(e) => setFilterProdi(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white"
          >
            <option value="">Semua Program Studi</option>
            {prodiList.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <Link
          href="/admin/mata-kuliah/tambah"
          className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors"
        >
          <Plus size={18} />
          Tambah Mata Kuliah
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-4 font-medium text-gray-600">No</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Kode</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Nama Mata Kuliah</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">SKS</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Semester</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Program Studi</th>
                <th className="text-center px-6 py-4 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500">{idx + 1}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-gray-100 text-gray-700">
                      {item.kode}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">{item.nama}</td>
                  <td className="px-6 py-4 text-gray-600">{item.sks}</td>
                  <td className="px-6 py-4 text-gray-600">{item.semester}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {item.prodi}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat">
                        <Eye size={16} />
                      </button>
                      <Link href={`/admin/mata-kuliah/${item.id}`} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
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
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
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
            <h3 className="text-lg font-semibold text-gray-800">Hapus Mata Kuliah</h3>
            <p className="text-sm text-gray-500 mt-2">
              Apakah Anda yakin ingin menghapus mata kuliah ini? Tindakan ini tidak dapat dibatalkan.
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

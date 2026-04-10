"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { AdmisiBiayaStudiItem, admisiBiayaStudiDummyData } from "../../../../lib/admin-admisi";

export default function AdmisiAdminPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<AdmisiBiayaStudiItem[]>(admisiBiayaStudiDummyData);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) => {
      if (!keyword) return true;
      return (
        item.program.toLowerCase().includes(keyword) ||
        item.total.toLowerCase().includes(keyword) ||
        item.pendaftaranTes.toLowerCase().includes(keyword)
      );
    });
  }, [data, search]);

  const handleDelete = () => {
    if (deleteId === null) return;
    setData((prev) => prev.filter((item) => item.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Mode dummy data aktif. Fitur simpan ke server akan dihubungkan setelah API backend tersedia.
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari program atau biaya..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
          />
        </div>

        <Link
          href="/admin/admisi/tambah"
          className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors"
        >
          <Plus size={18} />
          Tambah Biaya Studi
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[1100px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-4 font-medium text-gray-600">No</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Program</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Pendaftaran & Tes</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Administrasi/Smt</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Biaya Kuliah/Smt</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Bimbingan TA</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Wisuda</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Cuti Akademik/Smt</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Total</th>
                <th className="text-center px-6 py-4 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filtered.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{item.program}</td>
                  <td className="px-6 py-4 text-gray-600">{item.pendaftaranTes}</td>
                  <td className="px-6 py-4 text-gray-600">{item.administrasiPerSemester}</td>
                  <td className="px-6 py-4 text-gray-600">{item.biayaKuliahPerSemester}</td>
                  <td className="px-6 py-4 text-gray-600">{item.bimbinganTA}</td>
                  <td className="px-6 py-4 text-gray-600">{item.wisuda}</td>
                  <td className="px-6 py-4 text-gray-600">{item.cutiAkademik}</td>
                  <td className="px-6 py-4 text-[#C41E3A] font-semibold">{item.total}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        href={`/admin/admisi/${item.id}`}
                        className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit"
                      >
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
                  <td colSpan={10} className="px-6 py-12 text-center text-gray-400">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Menampilkan {filtered.length} dari {data.length} data
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

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800">Hapus Biaya Studi</h3>
            <p className="text-sm text-gray-500 mt-2">
              Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3 mt-6 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
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

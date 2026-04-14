"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { apiUrl } from "../../../../lib/api";
import {
  AdmisiBiayaStudiItem,
  formatRupiah,
  getErrorMessage,
  parseAdmissionListResponse,
} from "../../../../lib/admin-admisi";

function toStringSafe(value: unknown) {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  return String(value);
}

function toNumberSafe(value: unknown) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function extractArray(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  return [];
}

export default function AdmisiAdminPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<AdmisiBiayaStudiItem[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setError("");
      const token = localStorage.getItem("token");
      const [admissionRes, programStudiRes] = await Promise.all([
        fetch(apiUrl("/api/admission"), {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          cache: "no-store",
        }),
        fetch(apiUrl("/api/program-studi"), {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          cache: "no-store",
        }),
      ]);

      if (!admissionRes.ok) {
        const text = await admissionRes.text().catch(() => "");
        throw new Error(getErrorMessage(text, "Gagal memuat data biaya studi"));
      }

      const admissionJson = await admissionRes.json();
      const programNameById = new Map<number, string>();

      if (programStudiRes.ok) {
        const programStudiJson = await programStudiRes.json().catch(() => null);
        const programStudiList = extractArray(programStudiJson);
        for (const item of programStudiList) {
          const id = toNumberSafe(item?.id);
          const name = toStringSafe(item?.name);
          if (id > 0 && name) {
            programNameById.set(id, name);
          }
        }
      }

      setData(parseAdmissionListResponse(admissionJson, programNameById));
    } catch (err: unknown) {
      setData([]);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat memuat data biaya studi");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) => {
      if (!keyword) return true;
      return (
        item.program.toLowerCase().includes(keyword) ||
        item.year.toLowerCase().includes(keyword) ||
        formatRupiah(item.total).toLowerCase().includes(keyword)
      );
    });
  }, [data, search]);

  const handleDelete = async () => {
    if (deleteId === null) return;

    setDeleting(true);
    try {
      setError("");
      const token = localStorage.getItem("token");
      const res = await fetch(apiUrl(`/api/admission/${deleteId}`), {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(getErrorMessage(text, "Gagal menghapus biaya studi"));
      }

      await fetchData();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat menghapus biaya studi");
      }
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

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
          <table className="w-full text-sm min-w-[980px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-4 font-medium text-gray-600">No</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Program</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Tahun</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Komponen Biaya</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Total</th>
                <th className="text-center px-6 py-4 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filtered.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{item.program}</td>
                  <td className="px-6 py-4 text-gray-600">{item.year || "-"}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex flex-wrap gap-1.5 max-w-[360px]">
                      {item.admissionItems.length > 0 ? (
                        item.admissionItems.map((admissionItem) => (
                          <span
                            key={admissionItem.id || admissionItem.name}
                            className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs"
                            title={`${admissionItem.name}: ${formatRupiah(admissionItem.price)}`}
                          >
                            {admissionItem.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">Belum ada komponen</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#C41E3A] font-semibold">{formatRupiah(item.total)}</td>
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
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
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
                disabled={deleting}
                className="px-4 py-2 bg-[#DC2626] text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                {deleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

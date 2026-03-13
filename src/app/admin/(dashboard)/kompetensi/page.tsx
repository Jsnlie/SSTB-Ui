"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { apiUrl } from "../../../../lib/api";

interface ProgramStudiItem {
  id: number;
  slug: string;
  name: string;
  level: string;
}

interface CompetencyItem {
  id: number;
  text: string;
  competencyGroupId: number;
}

interface CompetencyGroupItem {
  id: number;
  title: string;
  programStudiId: number;
  items?: CompetencyItem[];
}

function toArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === "object") return [value as T];
  return [];
}

export default function KompetensiPage() {
  const [search, setSearch] = useState("");
  const [filterProdi, setFilterProdi] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [data, setData] = useState<CompetencyGroupItem[]>([]);
  const [prodiList, setProdiList] = useState<ProgramStudiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const fetchData = async (programStudiId?: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
      const endpoint = programStudiId
        ? apiUrl(`/api/kompetensi/program/${programStudiId}`)
        : apiUrl("/api/kompetensi");

      const [competencyRes, prodiRes] = await Promise.all([
        fetch(endpoint, { headers }),
        fetch(apiUrl("/api/program-studi"), { headers }),
      ]);

      if (competencyRes.ok) {
        const json = await competencyRes.json();
        const payload = (json as { data?: unknown })?.data ?? json;
        const parsed = toArray<CompetencyGroupItem>(payload).map((item) => ({
          ...item,
          items: Array.isArray(item.items) ? item.items : [],
        }));
        setData(parsed);
      } else {
        setData([]);
      }

      if (prodiRes.ok) {
        const json = await prodiRes.json();
        const payload = (json as { data?: unknown })?.data ?? json;
        setProdiList(toArray<ProgramStudiItem>(payload));
      }
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filterProdi || undefined);
  }, [filterProdi]);

  const handleDelete = async () => {
    if (deleteId === null) return;

    setDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(apiUrl(`/api/kompetensi/${deleteId}`), {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) throw new Error("Gagal menghapus data");
      await fetchData(filterProdi || undefined);
    } catch {
      // silent
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const getProdiName = (programStudiId: number) => {
    return prodiList.find((p) => p.id === programStudiId)?.name ?? `ID: ${programStudiId}`;
  };

  const filtered = data.filter((item) => {
    const itemTexts = (item.items ?? []).map((sub) => sub.text).join(" ").toLowerCase();
    const searchValue = search.toLowerCase();

    return (
      item.title.toLowerCase().includes(searchValue) || itemTexts.includes(searchValue)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-3 flex-1 w-full sm:w-auto">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari kompetensi..."
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
              <option key={p.id} value={String(p.id)}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <Link
          href="/admin/kompetensi/tambah"
          className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors"
        >
          <Plus size={18} />
          Tambah Kompetensi
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-4 font-medium text-gray-600">No</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Judul</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Program Studi</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Jumlah Item</th>
                <th className="text-center px-6 py-4 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500">{idx + 1}</td>
                  <td className="px-6 py-4 text-gray-800 max-w-md">
                    <p className="line-clamp-2 font-medium">{item.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {getProdiName(item.programStudiId)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{item.items?.length ?? 0}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        href={`/admin/kompetensi/${item.id}`}
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
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
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
            <h3 className="text-lg font-semibold text-gray-800">Hapus Kompetensi</h3>
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
                className="px-4 py-2 bg-[#DC2626] text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-70"
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

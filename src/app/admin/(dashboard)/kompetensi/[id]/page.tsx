"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { apiUrl } from "../../../../../lib/api";

interface ProgramStudiItem {
  id: number;
  name: string;
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

export default function EditKompetensiPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [title, setTitle] = useState("");
  const [programStudiId, setProgramStudiId] = useState("");
  const [itemsText, setItemsText] = useState("");
  const [existingItemIds, setExistingItemIds] = useState<number[]>([]);
  const [prodiList, setProdiList] = useState<ProgramStudiItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

        const [competencyRes, prodiRes] = await Promise.all([
          fetch(apiUrl("/api/kompetensi"), { headers }),
          fetch(apiUrl("/api/program-studi"), { headers }),
        ]);

        if (prodiRes.ok) {
          const json = await prodiRes.json();
          const payload = (json as { data?: unknown })?.data ?? json;
          setProdiList(toArray<ProgramStudiItem>(payload));
        }

        if (competencyRes.ok) {
          const json = await competencyRes.json();
          const payload = (json as { data?: unknown })?.data ?? json;
          const allItems = toArray<CompetencyGroupItem>(payload);
          const selected = allItems.find((item) => item.id === id);

          if (!selected) {
            setError("Data kompetensi tidak ditemukan");
            return;
          }

          const safeItems = Array.isArray(selected.items) ? selected.items : [];
          setTitle(selected.title || "");
          setProgramStudiId(String(selected.programStudiId || ""));
          setItemsText(safeItems.map((item) => item.text).join("\n"));
          setExistingItemIds(safeItems.map((item) => item.id));
        }
      } catch {
        setError("Gagal memuat data kompetensi");
      } finally {
        setLoadingData(false);
      }
    };

    fetchAll();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const parsedItems = itemsText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (!title.trim() || !programStudiId || parsedItems.length === 0) {
      setError("Judul, program studi, dan minimal 1 item kompetensi wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(apiUrl("/api/kompetensi"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          id,
          title: title.trim(),
          programStudiId: Number(programStudiId),
          items: parsedItems.map((text, index) => ({
            id: existingItemIds[index] ?? 0,
            text,
            competencyGroupId: id,
          })),
        }),
      });

      if (!res.ok) {
        const message = await res.text().catch(() => "");
        throw new Error(message || "Gagal memperbarui kompetensi");
      }

      router.push("/admin/kompetensi");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat menyimpan perubahan");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/kompetensi"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={16} />
        Kembali ke Kompetensi
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Edit Kompetensi</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Program Studi <span className="text-red-500">*</span>
            </label>
            <select
              value={programStudiId}
              onChange={(e) => setProgramStudiId(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white"
            >
              <option value="">Pilih Program Studi</option>
              {prodiList.map((p) => (
                <option key={p.id} value={String(p.id)}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Judul Kompetensi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Item Kompetensi <span className="text-red-500">*</span>
            </label>
            <textarea
              value={itemsText}
              onChange={(e) => setItemsText(e.target.value)}
              required
              rows={8}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none resize-y"
            />
            <p className="text-xs text-gray-500 mt-2">
              Tips: pisahkan setiap item menggunakan baris baru.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#1E3A8A] text-white rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors disabled:opacity-70"
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            <Link
              href="/admin/kompetensi"
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

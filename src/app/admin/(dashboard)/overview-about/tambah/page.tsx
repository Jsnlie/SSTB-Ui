"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { apiUrl } from "../../../../../lib/api";

interface ProgramStudiItem {
  id: number;
  name: string;
}

export default function TambahOverviewAboutPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [programStudiId, setProgramStudiId] = useState("");
  const [prodiList, setProdiList] = useState<ProgramStudiItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingProdi, setLoadingProdi] = useState(true);

  useEffect(() => {
    const fetchProdi = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(apiUrl("/api/program-studi"), {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const json = await res.json();
          setProdiList(Array.isArray(json) ? json : json.data ?? []);
        }
      } catch {
        // silent
      } finally {
        setLoadingProdi(false);
      }
    };
    fetchProdi();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !programStudiId) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(apiUrl("/api/OverviewAbout/batch"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify([
          {
            id: 0,
            text: text.trim(),
            programStudiId: Number(programStudiId),
          },
        ]),
      });
      if (!res.ok) throw new Error("Gagal menyimpan data");
      router.push("/admin/overview-about");
    } catch {
      alert("Gagal menyimpan data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Link
        href="/admin/overview-about"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={16} />
        Kembali ke Overview About
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Tambah Overview About</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Program Studi <span className="text-red-500">*</span>
            </label>
            {loadingProdi ? (
              <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-400">
                Memuat program studi...
              </div>
            ) : (
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
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Text <span className="text-red-500">*</span>
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={6}
              placeholder="Masukkan teks overview about..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none resize-y"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#1E3A8A] text-white rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors disabled:opacity-70"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
            <Link
              href="/admin/overview-about"
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

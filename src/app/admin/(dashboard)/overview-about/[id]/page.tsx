"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProgramStudiItem {
  id: number;
  name: string;
}

interface OverviewAboutItem {
  id: number;
  text: string;
  programStudiId: number;
}

export default function EditOverviewAboutPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [text, setText] = useState("");
  const [programStudiId, setProgramStudiId] = useState("");
  const [prodiList, setProdiList] = useState<ProgramStudiItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

        const [aboutRes, prodiRes] = await Promise.all([
          fetch("https://localhost:7013/api/OverviewAbout", { headers }),
          fetch("https://localhost:7013/api/program-studi", { headers }),
        ]);

        if (prodiRes.ok) {
          const json = await prodiRes.json();
          setProdiList(Array.isArray(json) ? json : json.data ?? []);
        }

        if (aboutRes.ok) {
          const json = await aboutRes.json();
          const allItems: OverviewAboutItem[] = Array.isArray(json) ? json : json.data ?? [];
          const item = allItems.find((a) => a.id === id);
          if (item) {
            setText(item.text);
            setProgramStudiId(String(item.programStudiId));
          }
        }
      } catch {
        // silent
      } finally {
        setLoadingData(false);
      }
    };
    fetchAll();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !programStudiId) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://localhost:7013/api/OverviewAbout", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          id,
          text: text.trim(),
          programStudiId: Number(programStudiId),
        }),
      });
      if (!res.ok) throw new Error("Gagal memperbarui data");
      router.push("/admin/overview-about");
    } catch {
      alert("Gagal memperbarui data. Silakan coba lagi.");
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
        href="/admin/overview-about"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={16} />
        Kembali ke Overview About
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Edit Overview About</h2>

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
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
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

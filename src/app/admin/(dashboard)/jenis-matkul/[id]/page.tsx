"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { apiUrl } from "../../../../../lib/api";

interface CurriculumGroupItem {
  id: number;
  label: string;
  programStudiId: number;
}

interface ProgramStudiItem {
  id: number;
  name: string;
}

export default function EditJenisMatkulPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [prodiList, setProdiList] = useState<ProgramStudiItem[]>([]);
  const [form, setForm] = useState({
    label: "",
    programStudiId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

        const [groupRes, prodiRes] = await Promise.all([
          fetch(apiUrl("/api/jenis-matkul"), { headers }),
          fetch(apiUrl("/api/program-studi"), { headers }),
        ]);

        if (!groupRes.ok) throw new Error("Gagal memuat jenis mata kuliah");

        const groupJson = await groupRes.json();
        const groupList: CurriculumGroupItem[] = Array.isArray(groupJson) ? groupJson : groupJson.data ?? [];
        const selected = groupList.find((item) => item.id === id);

        if (!selected) throw new Error("Data jenis mata kuliah tidak ditemukan");

        setForm({
          label: selected.label || "",
          programStudiId: String(selected.programStudiId || ""),
        });

        if (prodiRes.ok) {
          const prodiJson = await prodiRes.json();
          setProdiList(Array.isArray(prodiJson) ? prodiJson : prodiJson.data ?? []);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Gagal memuat data");
        }
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(apiUrl("/api/jenis-matkul"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          id,
          label: form.label,
          programStudiId: Number(form.programStudiId),
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        let message = "Gagal memperbarui jenis mata kuliah";
        try {
          const parsed = JSON.parse(text);
          message = parsed?.message || parsed?.title || message;
        } catch {
          if (text) message = text;
        }
        throw new Error(message);
      }

      router.push("/admin/jenis-matkul");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/jenis-matkul"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft size={16} />
        Kembali ke daftar
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Edit Jenis Mata Kuliah</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Label</label>
            <input
              type="text"
              name="label"
              value={form.label}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Program Studi</label>
            <select
              name="programStudiId"
              value={form.programStudiId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white"
            >
              <option value="">Pilih Program Studi</option>
              {prodiList.map((item) => (
                <option key={item.id} value={String(item.id)}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors disabled:opacity-70"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Simpan Perubahan
            </button>
            <Link
              href="/admin/jenis-matkul"
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

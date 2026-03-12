"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function TambahProgramStudiPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    slug: "",
    level: "",
    duration: "",
    totalCredits: "",
    description: "",
    image: "",
    heroTitle: "",
    heroSubtitle: "",
    degree: "",
    highlights: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://localhost:7013/api/program-studi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: form.name,
          slug: form.slug,
          level: form.level,
          duration: form.duration,
          totalCredits: Number(form.totalCredits),
          description: form.description,
          image: form.image,
          heroTitle: form.heroTitle,
          heroSubtitle: form.heroSubtitle,
          degree: form.degree,
          highlights: form.highlights.split("\n").filter(Boolean),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Gagal menambahkan program studi");
      }

      router.push("/admin/program-studi");
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

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/program-studi"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft size={16} />
        Kembali ke daftar
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Tambah Program Studi Baru</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Program Studi</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Contoh: Sarjana Teologi (S.Th)"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="Contoh: sarjana-teologi"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Jenjang (Level)</label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white"
              >
                <option value="">Pilih Jenjang</option>
                <option value="Sarjana">Sarjana</option>
                <option value="Magister">Magister</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Durasi</label>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="Contoh: 4 Tahun"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Total SKS</label>
              <input
                type="number"
                name="totalCredits"
                value={form.totalCredits}
                onChange={handleChange}
                placeholder="Contoh: 145"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Gelar (Degree)</label>
            <input
              type="text"
              name="degree"
              value={form.degree}
              onChange={handleChange}
              placeholder="Contoh: Sarjana Teologi (S.Th)"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
            <textarea
              rows={3}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Deskripsi program studi..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">URL Gambar</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Hero Title</label>
              <input
                type="text"
                name="heroTitle"
                value={form.heroTitle}
                onChange={handleChange}
                placeholder="Contoh: Program Sarjana Teologi"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Hero Subtitle</label>
              <input
                type="text"
                name="heroSubtitle"
                value={form.heroSubtitle}
                onChange={handleChange}
                placeholder="Contoh: Sarjana Teologi (S.Th)"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Highlights (satu per baris)</label>
            <textarea
              rows={4}
              name="highlights"
              value={form.highlights}
              onChange={handleChange}
              placeholder={"Studi Alkitab mendalam\nBahasa Ibrani & Yunani\nPraktik pelayanan terintegrasi"}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none resize-none"
            />
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
              Simpan
            </button>
            <Link
              href="/admin/program-studi"
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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X } from "lucide-react";

export default function TambahBeritaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageName, setImageName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/admin/berita");
    }, 600);
  };

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/berita"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft size={16} />
        Kembali ke daftar
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Tambah Berita Baru</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Berita</label>
            <input
              type="text"
              placeholder="Masukkan judul berita"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori</label>
              <select
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white"
              >
                <option value="">Pilih Kategori</option>
                <option value="Akademik">Akademik</option>
                <option value="Fasilitas">Fasilitas</option>
                <option value="Kerjasama">Kerjasama</option>
                <option value="Beasiswa">Beasiswa</option>
                <option value="Prestasi">Prestasi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
              <select
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Gambar</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1E3A8A] transition-colors">
              {imageName ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-700">{imageName}</span>
                  <button type="button" onClick={() => setImageName("")} className="text-red-500 hover:text-red-700">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Klik untuk upload gambar</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (max 2MB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setImageName(file.name);
                    }}
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Konten</label>
            <textarea
              rows={8}
              placeholder="Tulis konten berita..."
              required
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
              href="/admin/berita"
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

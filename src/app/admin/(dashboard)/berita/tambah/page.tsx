"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import RichTextEditor from "../../../../../components/admin/RichTextEditor";
import { apiUrl } from "../../../../../lib/api";
import { stripHtml } from "../../../../../lib/berita";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const maxWidth = 1280;
      const scale = Math.min(1, maxWidth / img.width);
      const width = Math.max(1, Math.round(img.width * scale));
      const height = Math.max(1, Math.round(img.height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Gagal memproses gambar"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/webp", 0.82);
      URL.revokeObjectURL(objectUrl);
      resolve(dataUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Gagal membaca file gambar"));
    };

    img.src = objectUrl;
  });
}

function getErrorMessage(text: string, fallback: string) {
  if (!text) return fallback;
  try {
    const parsed = JSON.parse(text);
    return parsed?.message || parsed?.title || fallback;
  } catch {
    return text;
  }
}

export default function TambahBeritaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
    author: "",
    date: new Date().toISOString().slice(0, 10),
    excerpt: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > MAX_IMAGE_SIZE) {
      setError("Ukuran foto maksimal 2MB");
      return;
    }
    setError("");
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripHtml(form.excerpt)) {
      setError("Konten berita wajib diisi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const imageDataUrl = imageFile ? await fileToDataUrl(imageFile) : "";
      const token = localStorage.getItem("token");
      const res = await fetch(apiUrl("/api/berita"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: form.title.trim(),
          excerpt: form.excerpt,
          image: imageDataUrl,
          date: form.date.trim(),
          category: form.category.trim(),
          author: form.author.trim(),
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(getErrorMessage(text, "Gagal menambahkan berita"));
      }

      router.push("/admin/berita");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat menambahkan berita");
      }
    } finally {
      setLoading(false);
    }
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

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Berita</label>
            <input
              type="text"
              name="title"
              placeholder="Masukkan judul berita"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori</label>
              <input
                type="text"
                name="category"
                placeholder="Contoh: Akademik"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Penulis</label>
              <input
                type="text"
                name="author"
                placeholder="Nama penulis"
                value={form.author}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal</label>
              <input
                type="text"
                name="date"
                value={form.date}
                onChange={handleChange}
                placeholder="Contoh: 2026-03-13"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Foto Berita</label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors w-fit">
                <Upload size={16} />
                Pilih File
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {imageFile ? (
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 text-sm text-gray-700 border border-gray-200">
                  <span>{imageFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setImageFile(null)}
                    className="text-red-500 hover:text-red-700"
                    title="Hapus file"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Belum ada file dipilih.</p>
              )}
            </div>
            <p className="mt-1 text-xs text-gray-500">Format: JPG, PNG, WEBP. Maksimal 2MB.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Konten Berita
            </label>
            <RichTextEditor
              value={form.excerpt}
              onChange={(value) => setForm({ ...form, excerpt: value })}
              placeholder="Tulis konten berita dan gunakan toolbar untuk bold, italic, list, link, dan lainnya..."
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

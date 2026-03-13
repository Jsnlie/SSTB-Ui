"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import RichTextEditor from "../../../../../components/admin/RichTextEditor";
import { apiUrl } from "../../../../../lib/api";
import {
  parseBeritaDetailResponse,
  stripHtml,
} from "../../../../../lib/berita";

function getErrorMessage(text: string, fallback: string) {
  if (!text) return fallback;
  try {
    const parsed = JSON.parse(text);
    return parsed?.message || parsed?.title || fallback;
  } catch {
    return text;
  }
}

export default function EditBeritaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [realId, setRealId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
    author: "",
    date: "",
    image: "",
    excerpt: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        const token = localStorage.getItem("token");
        const res = await fetch(apiUrl(`/api/berita/${id}`), {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(getErrorMessage(text, "Gagal memuat data berita"));
        }

        const json = await res.json();
        const data = parseBeritaDetailResponse(json);

        if (!data) {
          throw new Error("Data berita tidak ditemukan");
        }

        setRealId(data.id || Number(id));
        setForm({
          title: data.title || "",
          category: data.category || "",
          author: data.author || "",
          date: data.date || "",
          image: data.image || "",
          excerpt: data.content || data.excerpt || "",
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan saat memuat data berita");
        }
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripHtml(form.excerpt)) {
      setError("Konten berita wajib diisi");
      return;
    }

    if (realId === null) {
      setError("ID berita tidak ditemukan");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(apiUrl(`/api/berita/${realId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          id: realId,
          title: form.title.trim(),
          excerpt: form.excerpt,
          image: form.image.trim(),
          date: form.date.trim(),
          category: form.category.trim(),
          author: form.author.trim(),
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(getErrorMessage(text, "Gagal memperbarui berita"));
      }

      router.push("/admin/berita");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat memperbarui berita");
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
        href="/admin/berita"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft size={16} />
        Kembali ke daftar
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Edit Berita</h2>

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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">URL Gambar</label>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              />
            </div>
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
            <p className="text-xs text-gray-500 mt-2">
              Konten ini akan disimpan ke field excerpt pada API Berita.
            </p>
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

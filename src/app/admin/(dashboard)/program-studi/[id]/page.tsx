"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X } from "lucide-react";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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

export default function EditProgramStudiPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [realId, setRealId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        let item: any = null;

        // Try direct endpoint first (slug-based on current backend, but keep flexible).
        const directRes = await fetch(`https://localhost:7013/api/program-studi/${id}`, {
          headers,
        });
        if (directRes.ok) {
          const json = await directRes.json();
          item = json.data ?? json;
        }

        // Fallback: resolve from list by either id or slug.
        if (!item || typeof item !== "object") {
          const listRes = await fetch("https://localhost:7013/api/program-studi", { headers });
          if (listRes.ok) {
            const listJson = await listRes.json();
            const list = Array.isArray(listJson) ? listJson : listJson.data ?? [];
            item = list.find(
              (entry: any) => String(entry?.id) === id || String(entry?.slug) === id
            );
          }
        }

        if (!item || typeof item !== "object") throw new Error("Gagal memuat data");

        // Store the real ID for PUT request
        setRealId(item.id);
        setForm({
          name: item.name || "",
          slug: item.slug || "",
          level: item.level || "",
          duration: item.duration || "",
          totalCredits: String(item.totalCredits || ""),
          description: item.description || "",
          image: item.image || "",
          heroTitle: item.heroTitle || "",
          heroSubtitle: item.heroSubtitle || "",
          degree: item.degree || "",
          highlights: Array.isArray(item.highlights) ? item.highlights.join("\n") : "",
        });
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Gagal memuat data");
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "name") {
        next.slug = generateSlug(value);
      }
      return next;
    });
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
    setLoading(true);
    setError("");

    try {
      if (realId === null) {
        throw new Error("ID program studi tidak ditemukan");
      }

      const imagePayload = imageFile ? await fileToDataUrl(imageFile) : form.image;
      const slug = form.slug || generateSlug(form.name);
      const token = localStorage.getItem("token");
      const res = await fetch(`https://localhost:7013/api/program-studi/${realId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          id: realId,
          name: form.name,
          slug,
          level: form.level,
          duration: form.duration,
          totalCredits: Number(form.totalCredits),
          description: form.description,
          ...(imagePayload ? { image: imagePayload } : {}),
          heroTitle: form.heroTitle,
          heroSubtitle: form.heroSubtitle,
          degree: form.degree,
          highlights: form.highlights.split("\n").filter(Boolean),
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        let msg = "Gagal memperbarui program studi";
        try {
          const data = JSON.parse(text);
          msg = data?.message || data?.title || data?.errors ? JSON.stringify(data.errors) : msg;
        } catch {
          if (text) msg = text;
        }
        throw new Error(msg);
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
        href="/admin/program-studi"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft size={16} />
        Kembali ke daftar
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Edit Program Studi</h2>

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
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug (Otomatis)</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              />
              <p className="mt-1 text-xs text-gray-500">Slug tidak diinput manual oleh user.</p>
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Foto Program Studi</label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors w-fit">
                <Upload size={16} />
                Pilih File Baru
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
                <p className="text-sm text-gray-500">Belum ada file baru dipilih.</p>
              )}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {form.image ? "Foto saat ini sudah tersimpan. Upload file baru jika ingin mengganti." : "Belum ada foto tersimpan."}
            </p>
            <p className="mt-1 text-xs text-gray-500">Format: JPG, PNG, WEBP. Maksimal 2MB.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Hero Title</label>
              <input
                type="text"
                name="heroTitle"
                value={form.heroTitle}
                onChange={handleChange}
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
              Simpan Perubahan
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

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { apiUrl } from "../../../../../lib/api";

interface AcaraItem {
  id: number;
  title: string;
  date: string;
  time: string;
}

function toStringSafe(value: unknown) {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  return String(value);
}

function toNumberSafe(value: unknown) {
  if (typeof value === "number") return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseAcaraDetailResponse(payload: any): AcaraItem | null {
  const source = Array.isArray(payload)
    ? payload[0]
    : payload?.data && !Array.isArray(payload.data)
    ? payload.data
    : payload;

  if (!source || typeof source !== "object") return null;

  return {
    id: toNumberSafe(source?.id),
    title: toStringSafe(source?.title),
    date: toStringSafe(source?.date),
    time: toStringSafe(source?.time),
  };
}

function parseAcaraListResponse(payload: any): AcaraItem[] {
  const source = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload?.items)
    ? payload.items
    : [];

  return source.map((item: any) => ({
    id: toNumberSafe(item?.id),
    title: toStringSafe(item?.title),
    date: toStringSafe(item?.date),
    time: toStringSafe(item?.time),
  }));
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

function normalizeDateInput(value: string) {
  if (!value) return "";
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 10);
}

function normalizeTimeInput(value: string) {
  if (!value) return "";
  const trimmed = value.trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})(?::\d{2})?/);
  if (!match) return "";
  return `${match[1].padStart(2, "0")}:${match[2]}`;
}

export default function EditKegiatanPage() {
  const router = useRouter();
  const params = useParams();
  const idParam = params.id as string;

  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [realId, setRealId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        const parsedId = Number(idParam);
        if (!Number.isFinite(parsedId) || parsedId <= 0) {
          throw new Error("ID kegiatan tidak valid");
        }

        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        let data: AcaraItem | null = null;

        const detailRes = await fetch(apiUrl(`/api/Acara/${parsedId}`), {
          headers,
        });

        if (detailRes.ok) {
          const detailJson = await detailRes.json();
          data = parseAcaraDetailResponse(detailJson);
        } else {
          const listRes = await fetch(apiUrl("/api/Acara"), { headers });

          if (!listRes.ok) {
            const text = await detailRes.text().catch(() => "");
            throw new Error(getErrorMessage(text, "Gagal memuat data kegiatan"));
          }

          const listJson = await listRes.json();
          const list = parseAcaraListResponse(listJson);
          data = list.find((item) => item.id === parsedId) || null;
        }

        if (!data) {
          throw new Error("Data kegiatan tidak ditemukan");
        }

        setRealId(data.id || parsedId);
        setForm({
          title: data.title || "",
          date: normalizeDateInput(data.date),
          time: normalizeTimeInput(data.time),
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan saat memuat data kegiatan");
        }
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [idParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.date.trim() || !form.time.trim()) {
      setError("Judul, tanggal, dan jam wajib diisi");
      return;
    }

    if (realId === null) {
      setError("ID kegiatan tidak ditemukan");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(apiUrl(`/api/Acara/${realId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          id: realId,
          title: form.title.trim(),
          date: form.date.trim(),
          time: form.time.trim(),
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(getErrorMessage(text, "Gagal memperbarui kegiatan"));
      }

      router.push("/admin/kegiatan");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat memperbarui kegiatan");
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
        href="/admin/kegiatan"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft size={16} />
        Kembali ke daftar
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Edit Kegiatan</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Kegiatan</label>
            <input
              type="text"
              name="title"
              placeholder="Masukkan judul kegiatan"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Jam</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              />
            </div>
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
              href="/admin/kegiatan"
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

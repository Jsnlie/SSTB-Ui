"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import { apiUrl } from "../../../../../lib/api";
import {
  formatRupiah,
  getErrorMessage,
  parseCurrencyInput,
} from "../../../../../lib/admin-admisi";
import { normalizeArray } from "../../../../../lib/response";

interface ProgramStudiOption {
  id: number;
  name: string;
}

interface AdmissionItemForm {
  id: number;
  admissionPackageId: number;
  name: string;
  price: string;
}

const defaultAdmissionItem: AdmissionItemForm = {
  id: 0,
  admissionPackageId: 0,
  name: "",
  price: "",
};

function toStringSafe(value: unknown) {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  return String(value);
}

function toNumberSafe(value: unknown) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNominalInput(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function TambahBiayaStudiPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetchingProgram, setFetchingProgram] = useState(true);
  const [error, setError] = useState("");
  const [programOptions, setProgramOptions] = useState<ProgramStudiOption[]>([]);
  const [form, setForm] = useState({
    programStudiId: "",
    year: "",
    admissionItems: [{ ...defaultAdmissionItem }],
  });

  useEffect(() => {
    const fetchProgramStudi = async () => {
      try {
        setError("");
        const token = localStorage.getItem("token");
        const res = await fetch(apiUrl("/api/program-studi"), {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          cache: "no-store",
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(getErrorMessage(text, "Gagal memuat program studi"));
        }

        const json = await res.json();
        const options = normalizeArray<any>(json)
          .map((item) => ({
            id: toNumberSafe(item?.id),
            name: toStringSafe(item?.name),
          }))
          .filter((item) => item.id > 0 && item.name)
          .sort((a, b) => a.name.localeCompare(b.name));

        setProgramOptions(options);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan saat memuat program studi");
        }
      } finally {
        setFetchingProgram(false);
      }
    };

    fetchProgramStudi();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleItemChange = (
    index: number,
    key: "name" | "price",
    value: string
  ) => {
    setForm((prev) => {
      const next = [...prev.admissionItems];
      next[index] = {
        ...next[index],
        [key]: key === "price" ? formatNominalInput(value) : value,
      };
      return { ...prev, admissionItems: next };
    });
  };

  const handleAddItem = () => {
    setForm((prev) => ({
      ...prev,
      admissionItems: [...prev.admissionItems, { ...defaultAdmissionItem }],
    }));
  };

  const handleRemoveItem = (index: number) => {
    setForm((prev) => {
      if (prev.admissionItems.length <= 1) return prev;
      const next = prev.admissionItems.filter((_, idx) => idx !== index);
      return { ...prev, admissionItems: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.programStudiId.trim() || !form.year.trim()) {
      setError("Program studi dan tahun wajib diisi");
      return;
    }

    const hasInvalidItem = form.admissionItems.some(
      (item) => !item.name.trim() || parseCurrencyInput(item.price) <= 0
    );

    if (hasInvalidItem) {
      setError("Setiap komponen biaya wajib punya nama dan nominal lebih dari 0");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const programStudiId = Number.parseInt(form.programStudiId, 10);
      const payload = {
        id: 0,
        programStudiId,
        year: form.year.trim(),
        admissionItems: form.admissionItems.map((item) => ({
          id: 0,
          admissionPackageId: 0,
          name: item.name.trim(),
          price: parseCurrencyInput(item.price),
        })),
      };

      const token = localStorage.getItem("token");
      const res = await fetch(apiUrl("/api/admission"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(getErrorMessage(text, "Gagal menambahkan biaya studi"));
      }

      router.push("/admin/admisi");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat menambahkan biaya studi");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/admisi"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft size={16} />
        Kembali ke daftar
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Tambah Biaya Studi</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {fetchingProgram && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
            Memuat daftar program studi...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Program Studi</label>
              <select
                name="programStudiId"
                value={form.programStudiId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white"
              >
                <option value="">Pilih program studi</option>
                {programOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tahun Akademik</label>
              <input
                type="text"
                name="year"
                placeholder="Contoh: 2026/2027"
                value={form.year}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">Komponen Biaya</h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center gap-1.5 text-sm text-[#1E3A8A] hover:text-[#1e3a8a]/80"
              >
                <Plus size={15} />
                Tambah Komponen
              </button>
            </div>

            {form.admissionItems.map((item, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-[1fr_220px_auto] gap-3 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Komponen</label>
                  <input
                    type="text"
                    placeholder="Contoh: Pendaftaran & Tes"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, "name", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nominal</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">Rp</span>
                    <input
                      type="text"
                      placeholder="Contoh: 500.000"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, "price", e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  disabled={form.admissionItems.length <= 1}
                  className="h-[42px] px-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Hapus komponen"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <div className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-700 flex items-center justify-between">
              <span>Total Biaya</span>
              <span className="font-semibold text-[#1E3A8A]">
                {formatRupiah(
                  form.admissionItems.reduce(
                    (sum, item) => sum + parseCurrencyInput(item.price),
                    0
                  )
                )}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading || fetchingProgram}
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
              href="/admin/admisi"
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

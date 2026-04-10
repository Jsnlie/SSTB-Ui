"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { getAdmisiBiayaStudiById } from "../../../../../lib/admin-admisi";

export default function EditBiayaStudiPage() {
  const router = useRouter();
  const params = useParams();
  const idParam = Number(params.id);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    program: "",
    pendaftaranTes: "",
    administrasiPerSemester: "",
    biayaKuliahPerSemester: "",
    bimbinganTA: "",
    wisuda: "",
    cutiAkademik: "",
    total: "",
  });

  useEffect(() => {
    if (!Number.isFinite(idParam) || idParam <= 0) {
      setError("ID biaya studi tidak valid");
      setFetching(false);
      return;
    }

    const item = getAdmisiBiayaStudiById(idParam);
    if (!item) {
      setError("Data biaya studi tidak ditemukan");
      setFetching(false);
      return;
    }

    setForm({
      program: item.program,
      pendaftaranTes: item.pendaftaranTes,
      administrasiPerSemester: item.administrasiPerSemester,
      biayaKuliahPerSemester: item.biayaKuliahPerSemester,
      bimbinganTA: item.bimbinganTA,
      wisuda: item.wisuda,
      cutiAkademik: item.cutiAkademik,
      total: item.total,
    });
    setFetching(false);
  }, [idParam]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.program.trim() || !form.total.trim()) {
      setError("Program dan total biaya wajib diisi");
      return;
    }

    setError("");
    setLoading(true);

    // Sementara backend belum tersedia, submit hanya simulasi.
    router.push("/admin/admisi");
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
        href="/admin/admisi"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft size={16} />
        Kembali ke daftar
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Edit Biaya Studi</h2>
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-6">
          Form ini menggunakan dummy data sementara menunggu API backend.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Program Studi</label>
            <input
              type="text"
              name="program"
              placeholder="Contoh: Sarjana Teologi (S.Th)"
              value={form.program}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Pendaftaran & Tes</label>
              <input
                type="text"
                name="pendaftaranTes"
                placeholder="Rp 500.000"
                value={form.pendaftaranTes}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Administrasi/Smt</label>
              <input
                type="text"
                name="administrasiPerSemester"
                placeholder="Rp 500.000"
                value={form.administrasiPerSemester}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Biaya Kuliah/Smt</label>
              <input
                type="text"
                name="biayaKuliahPerSemester"
                placeholder="Rp 9.000.000"
                value={form.biayaKuliahPerSemester}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Bimbingan TA</label>
              <input
                type="text"
                name="bimbinganTA"
                placeholder="Rp 1.500.000"
                value={form.bimbinganTA}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Wisuda</label>
              <input
                type="text"
                name="wisuda"
                placeholder="Rp 2.000.000"
                value={form.wisuda}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Cuti Akademik/Smt</label>
              <input
                type="text"
                name="cutiAkademik"
                placeholder="Rp 500.000"
                value={form.cutiAkademik}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Total</label>
            <input
              type="text"
              name="total"
              placeholder="Rp 14.000.000"
              value={form.total}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
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

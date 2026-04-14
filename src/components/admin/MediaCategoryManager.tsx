"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Plus,
  Save,
  Search,
  Trash2,
} from "lucide-react";
import {
  CategoryResponse,
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  getMedias,
  updateCategory,
} from "../../lib/admin-media";

type MediaCategoryManagerProps = {
  mode: "list" | "create" | "edit";
  id?: number;
};

export default function MediaCategoryManager({ mode, id }: MediaCategoryManagerProps) {
  const router = useRouter();

  if (mode === "list") {
    return <CategoryList />;
  }

  return <CategoryForm mode={mode} id={id} router={router} />;
}

function CategoryList() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [mediaCountByCategoryId, setMediaCountByCategoryId] = useState<Record<number, number>>({});
  const [mediaCountByCategoryName, setMediaCountByCategoryName] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const getCategoryMediaCount = (category: CategoryResponse) => {
    if (mediaCountByCategoryId[category.id] !== undefined) {
      return mediaCountByCategoryId[category.id];
    }

    const normalizedName = category.name.trim().toLowerCase();
    if (normalizedName && mediaCountByCategoryName[normalizedName] !== undefined) {
      return mediaCountByCategoryName[normalizedName];
    }

    return category.medias.length;
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [categoryResult, mediaResult] = await Promise.all([
        getCategories(),
        getMedias(),
      ]);

      const countById = mediaResult.reduce<Record<number, number>>((acc, media) => {
        const categoryId = media.categoryId;
        if (Number.isFinite(categoryId) && categoryId > 0) {
          acc[categoryId] = (acc[categoryId] ?? 0) + 1;
        }

        return acc;
      }, {});

      const countByName = mediaResult.reduce<Record<string, number>>((acc, media) => {
        const normalizedCategoryName = media.category.trim().toLowerCase();
        if (!normalizedCategoryName) return acc;
        acc[normalizedCategoryName] = (acc[normalizedCategoryName] ?? 0) + 1;

        return acc;
      }, {});

      setCategories(categoryResult);
      setMediaCountByCategoryId(countById);
      setMediaCountByCategoryName(countByName);
    } catch (err: unknown) {
      setCategories([]);
      setMediaCountByCategoryId({});
      setMediaCountByCategoryName({});
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal memuat data category");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = categories.filter((item) => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return true;
    return item.name.toLowerCase().includes(keyword);
  });

  const handleDelete = async () => {
    if (deleteId === null) return;

    try {
      setDeleting(true);
      setError("");
      await deleteCategory(deleteId);
      await loadData();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal menghapus category");
      }
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari category..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
          />
        </div>
        <Link
          href="/admin/media/category/tambah"
          className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors"
        >
          <Plus size={18} />
          Tambah Category
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-4 font-medium text-gray-600">No</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Nama Category</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Jumlah Media</th>
                <th className="text-center px-6 py-4 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                    <div className="inline-block w-6 h-6 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              ) : (
                filtered.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                    <td className="px-6 py-4 text-gray-600">{getCategoryMediaCount(item)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          href={`/admin/media/category/${item.id}`}
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">Menampilkan {filtered.length} dari {categories.length} data</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled><ChevronLeft size={16} /></button>
            <button className="px-3 py-1.5 bg-[#1E3A8A] text-white text-sm rounded-lg">1</button>
            <button className="p-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800">Hapus Category</h3>
            <p className="text-sm text-gray-500 mt-2">Apakah Anda yakin ingin menghapus category ini? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3 mt-6 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">Batal</button>
              <button onClick={handleDelete} disabled={deleting} className="px-4 py-2 bg-[#DC2626] text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">{deleting ? "Menghapus..." : "Hapus"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryForm({
  mode,
  id,
  router,
}: {
  mode: "create" | "edit";
  id?: number;
  router: ReturnType<typeof useRouter>;
}) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(mode === "edit");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (mode !== "edit") return;

    const loadDetail = async () => {
      const numericId = Number(id);
      if (!Number.isFinite(numericId) || numericId <= 0) {
        setError("ID category tidak valid");
        setFetching(false);
        return;
      }

      try {
        setError("");
        const detail = await getCategoryById(numericId);
        if (!detail) {
          setError("Data category tidak ditemukan");
          return;
        }

        setName(detail.name);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Gagal memuat detail category");
        }
      } finally {
        setFetching(false);
      }
    };

    loadDetail();
  }, [id, mode]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Nama category wajib diisi");
      return;
    }

    try {
      setLoading(true);
      setError("");
      if (mode === "edit") {
        const numericId = Number(id);
        if (!Number.isFinite(numericId) || numericId <= 0) {
          throw new Error("ID category tidak valid");
        }
        await updateCategory(numericId, { name });
      } else {
        await createCategory({ name });
      }

      router.push("/admin/media/category");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal menyimpan category");
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
      <Link href="/admin/media/category" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft size={16} />
        Kembali ke daftar
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{mode === "edit" ? "Edit Category" : "Tambah Category Baru"}</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Category</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Masukkan nama category"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors disabled:opacity-70">
              {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}Simpan
            </button>
            <Link href="/admin/media/category" className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">Batal</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

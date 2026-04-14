"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pencil, Plus, Search, Trash2 } from "lucide-react";
import {
	CategoryResponse,
	deleteMedia,
	getCategories,
	getMedias,
	MediaResponse,
	MediaType,
} from "../../../../lib/admin-media";

export default function MediaOverviewPage() {
	const [search, setSearch] = useState("");
	const [filterType, setFilterType] = useState<"" | MediaType>("");
	const [filterCategoryId, setFilterCategoryId] = useState(0);
	const [categories, setCategories] = useState<CategoryResponse[]>([]);
	const [medias, setMedias] = useState<MediaResponse[]>([]);
	const [loading, setLoading] = useState(true);
	const [deleting, setDeleting] = useState(false);
	const [deleteId, setDeleteId] = useState<number | null>(null);
	const [error, setError] = useState("");

	const loadData = async () => {
		try {
			setLoading(true);
			setError("");
			const [categoryPayload, mediaPayload] = await Promise.all([
				getCategories(),
				getMedias(),
			]);
			setCategories(categoryPayload);
			setMedias(mediaPayload);
		} catch (err: unknown) {
			setCategories([]);
			setMedias([]);
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Gagal memuat data media");
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	const filtered = useMemo(() => {
		const keyword = search.trim().toLowerCase();
		return medias.filter((item) => {
			const matchSearch =
				!keyword ||
				item.title.toLowerCase().includes(keyword) ||
				item.slug.toLowerCase().includes(keyword) ||
				item.category.toLowerCase().includes(keyword) ||
				item.type.toLowerCase().includes(keyword);

			const matchType = !filterType || item.type === filterType;
			const matchCategory = filterCategoryId <= 0 || item.categoryId === filterCategoryId;

			return matchSearch && matchType && matchCategory;
		});
	}, [filterCategoryId, filterType, medias, search]);

	const handleDelete = async () => {
		if (deleteId === null) return;
		try {
			setDeleting(true);
			setError("");
			await deleteMedia(deleteId);
			await loadData();
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Gagal menghapus media");
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
				<div className="flex gap-3 flex-1 w-full sm:w-auto">
					<div className="relative flex-1 max-w-md">
						<Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
						<input
							type="text"
							placeholder="Cari media..."
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
						/>
					</div>
					<select
						value={filterType}
						onChange={(event) => setFilterType(event.target.value as "" | MediaType)}
						className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white"
					>
						<option value="">Semua Tipe</option>
						<option value="article">Article</option>
						<option value="video">Video</option>
						<option value="journal">Journal</option>
						<option value="bulletin">Bulletin</option>
						<option value="monograph">Monograph</option>
					</select>
					<select
						value={filterCategoryId}
						onChange={(event) => setFilterCategoryId(Number(event.target.value))}
						className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white"
					>
						<option value={0}>Semua Category</option>
						{categories.map((item) => (
							<option key={item.id} value={item.id}>{item.name}</option>
						))}
					</select>
				</div>
				<Link
					href="/admin/media/tambah"
					className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors"
				>
					<Plus size={18} />
					Tambah Media
				</Link>
			</div>

			<div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="bg-gray-50 border-b border-gray-200">
								<th className="text-left px-6 py-4 font-medium text-gray-600">No</th>
								<th className="text-left px-6 py-4 font-medium text-gray-600">Judul</th>
								<th className="text-left px-6 py-4 font-medium text-gray-600">Tipe</th>
								<th className="text-left px-6 py-4 font-medium text-gray-600">Category</th>
								<th className="text-left px-6 py-4 font-medium text-gray-600">Publish</th>
								<th className="text-center px-6 py-4 font-medium text-gray-600">Aksi</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{loading ? (
								<tr>
									<td colSpan={6} className="px-6 py-12 text-center text-gray-400">
										<div className="inline-block w-6 h-6 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
									</td>
								</tr>
							) : filtered.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-6 py-12 text-center text-gray-400">Tidak ada data ditemukan</td>
								</tr>
							) : (
								filtered.map((item, index) => (
									<tr key={item.id} className="hover:bg-gray-50 transition-colors">
										<td className="px-6 py-4 text-gray-500">{index + 1}</td>
										<td className="px-6 py-4 font-medium text-gray-800 max-w-xs truncate">{item.title}</td>
										<td className="px-6 py-4 text-gray-600 uppercase">{item.type}</td>
										<td className="px-6 py-4 text-gray-600">{item.category}</td>
										<td className="px-6 py-4 text-gray-600">{new Date(item.publishedAt).toLocaleDateString("id-ID")}</td>
										<td className="px-6 py-4">
											<div className="flex items-center justify-center gap-1">
												<Link href={`/admin/media/${item.type}/${item.slug}`} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
													<Pencil size={16} />
												</Link>
												<button onClick={() => setDeleteId(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
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
					<p className="text-sm text-gray-500">Menampilkan {filtered.length} dari {medias.length} data</p>
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
						<h3 className="text-lg font-semibold text-gray-800">Hapus Media</h3>
						<p className="text-sm text-gray-500 mt-2">Apakah Anda yakin ingin menghapus media ini? Tindakan ini tidak dapat dibatalkan.</p>
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

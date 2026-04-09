"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import {
	AdminEbookItem,
	adminEbookCategories,
	adminEbookDummyData,
} from "../../../../lib/admin-perpustakaan";

export default function PerpustakaanAdminPage() {
	const [search, setSearch] = useState("");
	const [filterCategory, setFilterCategory] = useState("");
	const [deleteId, setDeleteId] = useState<number | null>(null);
	const [data, setData] = useState<AdminEbookItem[]>(adminEbookDummyData);

	const filtered = useMemo(() => {
		const keyword = search.trim().toLowerCase();

		return data.filter((item) => {
			const matchSearch =
				item.title.toLowerCase().includes(keyword) ||
				item.author.toLowerCase().includes(keyword) ||
				item.isbn.toLowerCase().includes(keyword);
			const matchFilter = !filterCategory || item.category === filterCategory;
			return matchSearch && matchFilter;
		});
	}, [data, filterCategory, search]);

	const handleDelete = () => {
		if (deleteId === null) return;
		setData((prev) => prev.filter((item) => item.id !== deleteId));
		setDeleteId(null);
	};

	return (
		<div className="space-y-6">
			<div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
				Mode dummy data aktif. Fitur simpan ke server akan dihubungkan setelah API backend tersedia.
			</div>

			<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
				<div className="flex gap-3 flex-1 w-full sm:w-auto">
					<div className="relative flex-1 max-w-md">
						<Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
						<input
							type="text"
							placeholder="Cari judul, penulis, ISBN..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
						/>
					</div>
					<select
						value={filterCategory}
						onChange={(e) => setFilterCategory(e.target.value)}
						className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white"
					>
						<option value="">Semua Kategori</option>
						{adminEbookCategories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				<Link
					href="/admin/perpustakaan/tambah"
					className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors"
				>
					<Plus size={18} />
					Tambah Ebook
				</Link>
			</div>

			<div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="bg-gray-50 border-b border-gray-200">
								<th className="text-left px-6 py-4 font-medium text-gray-600">No</th>
								<th className="text-left px-6 py-4 font-medium text-gray-600">Judul Ebook</th>
								<th className="text-left px-6 py-4 font-medium text-gray-600">Penulis</th>
								<th className="text-left px-6 py-4 font-medium text-gray-600">Kategori</th>
								<th className="text-left px-6 py-4 font-medium text-gray-600">Tanggal Rilis</th>
								<th className="text-left px-6 py-4 font-medium text-gray-600">Status</th>
								<th className="text-center px-6 py-4 font-medium text-gray-600">Aksi</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{filtered.map((item, idx) => (
								<tr key={item.id} className="hover:bg-gray-50 transition-colors">
									<td className="px-6 py-4 text-gray-500">{idx + 1}</td>
									<td className="px-6 py-4 font-medium text-gray-800 max-w-xs truncate">{item.title}</td>
									<td className="px-6 py-4 text-gray-600">{item.author}</td>
									<td className="px-6 py-4">
										<span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
											{item.category}
										</span>
									</td>
									<td className="px-6 py-4 text-gray-600">
										{new Date(item.releaseDate).toLocaleDateString("id-ID")}
									</td>
									<td className="px-6 py-4">
										<span
											className={`px-2.5 py-1 rounded-full text-xs font-medium ${
												item.status === "Published"
													? "bg-emerald-50 text-emerald-700"
													: "bg-amber-50 text-amber-700"
											}`}
										>
											{item.status}
										</span>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center justify-center gap-1">
											<Link
												href={`/admin/perpustakaan/${item.id}`}
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
							))}

							{filtered.length === 0 && (
								<tr>
									<td colSpan={7} className="px-6 py-12 text-center text-gray-400">
										Tidak ada data ditemukan
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				<div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
					<p className="text-sm text-gray-500">
						Menampilkan {filtered.length} dari {data.length} data
					</p>
					<div className="flex items-center gap-2">
						<button className="p-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
							<ChevronLeft size={16} />
						</button>
						<button className="px-3 py-1.5 bg-[#1E3A8A] text-white text-sm rounded-lg">1</button>
						<button className="p-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
							<ChevronRight size={16} />
						</button>
					</div>
				</div>
			</div>

			{deleteId !== null && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
					<div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
						<h3 className="text-lg font-semibold text-gray-800">Hapus Ebook</h3>
						<p className="text-sm text-gray-500 mt-2">
							Apakah Anda yakin ingin menghapus ebook ini? Tindakan ini tidak dapat dibatalkan.
						</p>
						<div className="flex gap-3 mt-6 justify-end">
							<button
								onClick={() => setDeleteId(null)}
								className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
							>
								Batal
							</button>
							<button
								onClick={handleDelete}
								className="px-4 py-2 bg-[#DC2626] text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
							>
								Hapus
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

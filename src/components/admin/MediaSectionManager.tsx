"use client";

import { useEffect, useMemo, useState } from "react";
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
	Upload,
	X,
} from "lucide-react";
import {
	AdminMediaSection,
	AdminMediaStatus,
	getAdminMediaCategories,
	getAdminMediaContentById,
	getAdminMediaContentItems,
	getAdminMediaSectionConfig,
	getAdminMediaVideoById,
	getAdminMediaVideoItems,
} from "../../lib/admin-media";

type MediaSectionManagerProps = {
	section: string;
	mode: "list" | "create" | "edit";
	id?: number;
};

const defaultContentStatus: AdminMediaStatus = "Published";

function normalizeSection(section: string) {
	return section.trim().toLowerCase();
}

function isVideoSection(section: AdminMediaSection) {
	return section === "video";
}

function getInitialContentForm(section: Exclude<AdminMediaSection, "video">) {
	return {
		title: "",
		author: "",
		category: getAdminMediaCategories(section)[0] ?? "",
		referenceCode: "",
		releaseDate: new Date().toISOString().slice(0, 10),
		description: "",
		status: defaultContentStatus,
	};
}

function getInitialVideoForm() {
	return {
		title: "",
		youtubeUrl: "",
		description: "",
	};
}

export default function MediaSectionManager({ section, mode, id }: MediaSectionManagerProps) {
	const router = useRouter();
	const config = getAdminMediaSectionConfig(normalizeSection(section));

	if (!config) {
		return <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">Section media tidak valid.</div>;
	}

	if (mode === "list") {
		return <MediaSectionList config={config} />;
	}

	return <MediaSectionForm config={config} mode={mode} id={id} router={router} />;
}

function MediaSectionList({ config }: { config: NonNullable<ReturnType<typeof getAdminMediaSectionConfig>> }) {
	const isVideo = config.isVideo;
	const [search, setSearch] = useState("");
	const [filterCategory, setFilterCategory] = useState("");
	const [deleteId, setDeleteId] = useState<number | null>(null);
	const [data, setData] = useState(
		isVideo ? getAdminMediaVideoItems() : getAdminMediaContentItems(config.section as Exclude<AdminMediaSection, "video">)
	);

	useEffect(() => {
		setData(isVideo ? getAdminMediaVideoItems() : getAdminMediaContentItems(config.section as Exclude<AdminMediaSection, "video">));
		setSearch("");
		setFilterCategory("");
	}, [config.section, isVideo]);

	const categories = useMemo(() => {
		if (isVideo) return [];
		return Array.from(new Set(data.map((item) => item.category))).sort((a, b) => a.localeCompare(b));
	}, [data, isVideo]);

	const filtered = useMemo(() => {
		const keyword = search.trim().toLowerCase();
		if (isVideo) {
			return data.filter((item) => {
				const searchable = [item.title, item.youtubeUrl, item.description].join(" ").toLowerCase();
				return !keyword || searchable.includes(keyword);
			});
		}

		return data.filter((item) => {
			const searchable = [item.title, item.author, item.category, item.referenceCode, item.description].join(" ").toLowerCase();
			const matchSearch = !keyword || searchable.includes(keyword);
			const matchFilter = !filterCategory || item.category === filterCategory;
			return matchSearch && matchFilter;
		});
	}, [data, filterCategory, isVideo, search]);

	const handleDelete = () => {
		if (deleteId === null) return;
		setData((prev) => prev.filter((item) => item.id !== deleteId));
		setDeleteId(null);
	};

	const addHref = `/admin/media/${config.section}/tambah`;

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
							placeholder={isVideo ? "Cari judul video atau link YouTube..." : "Cari judul, penulis, kode referensi..."}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
						/>
					</div>
					{!isVideo && (
						<select
							value={filterCategory}
							onChange={(e) => setFilterCategory(e.target.value)}
							className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white"
						>
							<option value="">Semua Kategori</option>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					)}
				</div>

				<Link href={addHref} className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors">
					<Plus size={18} />
					Tambah {config.singularLabel}
				</Link>
			</div>

			<div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
				<div className="overflow-x-auto">
					{isVideo ? (
						<table className="w-full text-sm">
							<thead>
								<tr className="bg-gray-50 border-b border-gray-200">
									<th className="text-left px-6 py-4 font-medium text-gray-600">No</th>
									<th className="text-left px-6 py-4 font-medium text-gray-600">Judul Video</th>
									<th className="text-left px-6 py-4 font-medium text-gray-600">Link YouTube</th>
									<th className="text-left px-6 py-4 font-medium text-gray-600">Deskripsi Singkat</th>
									<th className="text-center px-6 py-4 font-medium text-gray-600">Aksi</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100">
								{filtered.map((item, idx) => (
									<tr key={item.id} className="hover:bg-gray-50 transition-colors">
										<td className="px-6 py-4 text-gray-500">{idx + 1}</td>
										<td className="px-6 py-4 font-medium text-gray-800 max-w-xs truncate">{item.title}</td>
										<td className="px-6 py-4 text-gray-600 max-w-sm truncate">{item.youtubeUrl}</td>
										<td className="px-6 py-4 text-gray-600 max-w-lg truncate">{item.description}</td>
										<td className="px-6 py-4">
											<div className="flex items-center justify-center gap-1">
												<Link href={`/admin/media/${config.section}/${item.id}`} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
													<Pencil size={16} />
												</Link>
												<button onClick={() => setDeleteId(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
													<Trash2 size={16} />
												</button>
											</div>
										</td>
									</tr>
								))}
								{filtered.length === 0 && (
									<tr>
										<td colSpan={5} className="px-6 py-12 text-center text-gray-400">Tidak ada data ditemukan</td>
									</tr>
								)}
							</tbody>
						</table>
					) : (
						<table className="w-full text-sm">
							<thead>
								<tr className="bg-gray-50 border-b border-gray-200">
									<th className="text-left px-6 py-4 font-medium text-gray-600">No</th>
									<th className="text-left px-6 py-4 font-medium text-gray-600">Judul</th>
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
										<td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">{item.category}</span></td>
										<td className="px-6 py-4 text-gray-600">{new Date(item.releaseDate).toLocaleDateString("id-ID")}</td>
										<td className="px-6 py-4">
											<span className={`px-2.5 py-1 rounded-full text-xs font-medium ${item.status === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
												{item.status}
											</span>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center justify-center gap-1">
												<Link href={`/admin/media/${config.section}/${item.id}`} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
													<Pencil size={16} />
												</Link>
												<button onClick={() => setDeleteId(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
													<Trash2 size={16} />
												</button>
											</div>
										</td>
									</tr>
								))}
								{filtered.length === 0 && (
									<tr>
										<td colSpan={7} className="px-6 py-12 text-center text-gray-400">Tidak ada data ditemukan</td>
									</tr>
								)}
							</tbody>
						</table>
					)}
				</div>

				<div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
					<p className="text-sm text-gray-500">Menampilkan {filtered.length} dari {data.length} data</p>
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
						<h3 className="text-lg font-semibold text-gray-800">Hapus {config.pluralLabel}</h3>
						<p className="text-sm text-gray-500 mt-2">Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.</p>
						<div className="flex gap-3 mt-6 justify-end">
							<button onClick={() => setDeleteId(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">Batal</button>
							<button onClick={handleDelete} className="px-4 py-2 bg-[#DC2626] text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">Hapus</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function MediaSectionForm({
	config,
	mode,
	id,
	router,
}: {
	config: NonNullable<ReturnType<typeof getAdminMediaSectionConfig>>;
	mode: "create" | "edit";
	id?: number;
	router: ReturnType<typeof useRouter>;
}) {
	const isVideo = config.isVideo;
	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(mode === "edit");
	const [error, setError] = useState("");
	const [coverFile, setCoverFile] = useState<File | null>(null);
	const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
	const [videoForm, setVideoForm] = useState(getInitialVideoForm());
	const [contentForm, setContentForm] = useState(() =>
		isVideo
			? getInitialContentForm("article")
			: getInitialContentForm(config.section as Exclude<AdminMediaSection, "video">)
	);

	useEffect(() => {
		if (mode !== "edit") return;

		const numericId = Number(id);
		if (!Number.isFinite(numericId) || numericId <= 0) {
			setError("ID data tidak valid");
			setFetching(false);
			return;
		}

		if (isVideo) {
			const item = getAdminMediaVideoById(numericId);
			if (!item) {
				setError("Data video tidak ditemukan");
				setFetching(false);
				return;
			}
			setVideoForm({ title: item.title, youtubeUrl: item.youtubeUrl, description: item.description });
			setFetching(false);
			return;
		}

		const item = getAdminMediaContentById(config.section as Exclude<AdminMediaSection, "video">, numericId);
		if (!item) {
			setError("Data media tidak ditemukan");
			setFetching(false);
			return;
		}

		setContentForm({
			title: item.title,
			author: item.author,
			category: item.category,
			referenceCode: item.referenceCode,
			releaseDate: item.releaseDate,
			description: item.description,
			status: item.status,
		});
		setFetching(false);
	}, [config.section, id, isVideo, mode]);

	const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		setContentForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setVideoForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (isVideo) {
			if (!videoForm.title.trim() || !videoForm.youtubeUrl.trim()) {
				setError("Judul video dan link YouTube wajib diisi");
				return;
			}
		} else if (!contentForm.title.trim() || !contentForm.author.trim() || !contentForm.referenceCode.trim()) {
			setError("Judul, penulis, dan kode referensi wajib diisi");
			return;
		}

		setError("");
		setLoading(true);
		router.push(`/admin/media/${config.section}`);
	};

	if (mode === "edit" && fetching) {
		return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" /></div>;
	}

	return (
		<div className="max-w-3xl">
			<Link href={`/admin/media/${config.section}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6">
				<ArrowLeft size={16} />
				Kembali ke daftar
			</Link>

			<div className="bg-white rounded-xl border border-gray-200 p-6">
				<h2 className="text-lg font-semibold text-gray-800 mb-2">{mode === "edit" ? `Edit ${config.singularLabel}` : `Tambah ${config.singularLabel} Baru`}</h2>
				<p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-6">Form ini menggunakan dummy data sementara menunggu API backend.</p>

				{error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}

				<form onSubmit={handleSubmit} className="space-y-5">
					{isVideo ? (
						<>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Video</label>
								<input type="text" name="title" placeholder="Masukkan judul video" value={videoForm.title} onChange={handleVideoChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">Link YouTube</label>
								<input type="url" name="youtubeUrl" placeholder="https://www.youtube.com/watch?v=..." value={videoForm.youtubeUrl} onChange={handleVideoChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi Singkat</label>
								<textarea name="description" placeholder="Deskripsi singkat video" value={videoForm.description} onChange={handleVideoChange} rows={4} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
							</div>
						</>
					) : (
						<>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">Judul</label>
								<input type="text" name="title" placeholder="Masukkan judul" value={contentForm.title} onChange={handleContentChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1.5">Penulis</label>
									<input type="text" name="author" placeholder="Nama penulis" value={contentForm.author} onChange={handleContentChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1.5">Kode Referensi</label>
									<input type="text" name="referenceCode" placeholder="REF-..." value={contentForm.referenceCode} onChange={handleContentChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
								</div>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori</label>
									<select name="category" value={contentForm.category} onChange={handleContentChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white">
										{getAdminMediaCategories(config.section as Exclude<AdminMediaSection, "video">).map((item) => <option key={item} value={item}>{item}</option>)}
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Rilis</label>
									<input type="date" name="releaseDate" value={contentForm.releaseDate} onChange={handleContentChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
									<select name="status" value={contentForm.status} onChange={handleContentChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white">
										<option value="Published">Published</option>
										<option value="Draft">Draft</option>
									</select>
								</div>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1.5">File Cover</label>
									<div className="flex flex-col sm:flex-row sm:items-center gap-3">
										<label className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors w-fit">
											<Upload size={16} />
											Pilih File
											<input type="file" accept="image/*" className="hidden" onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)} />
										</label>
										{coverFile ? (
											<div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 text-sm text-gray-700 border border-gray-200"><span>{coverFile.name}</span><button type="button" onClick={() => setCoverFile(null)} className="text-red-500 hover:text-red-700" title="Hapus file"><X size={14} /></button></div>
										) : <p className="text-sm text-gray-500">Belum ada file dipilih.</p>}
									</div>
									<p className="mt-1 text-xs text-gray-500">Format: JPG, PNG, WEBP. Maksimal 2MB.</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1.5">File Lampiran</label>
									<div className="flex flex-col sm:flex-row sm:items-center gap-3">
										<label className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors w-fit">
											<Upload size={16} />
											Pilih File
											<input type="file" accept="application/pdf" className="hidden" onChange={(e) => setAttachmentFile(e.target.files?.[0] ?? null)} />
										</label>
										{attachmentFile ? (
											<div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 text-sm text-gray-700 border border-gray-200"><span>{attachmentFile.name}</span><button type="button" onClick={() => setAttachmentFile(null)} className="text-red-500 hover:text-red-700" title="Hapus file"><X size={14} /></button></div>
										) : <p className="text-sm text-gray-500">Belum ada file dipilih.</p>}
									</div>
									<p className="mt-1 text-xs text-gray-500">Format: PDF. Maksimal 10MB.</p>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
								<textarea name="description" placeholder="Deskripsi singkat media" value={contentForm.description} onChange={handleContentChange} rows={4} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
							</div>
						</>
					)}

					<div className="flex gap-3 pt-4">
						<button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors disabled:opacity-70">{loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}Simpan</button>
						<Link href={`/admin/media/${config.section}`} className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">Batal</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

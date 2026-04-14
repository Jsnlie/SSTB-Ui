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
	buildMediaFormFromResponse,
	buildMediaPayload,
	AdminMediaSection,
	CategoryResponse,
	createDefaultMediaForm,
	createMedia,
	deleteMedia,
	getCategories,
	getAdminMediaSectionConfig,
	getMediaById,
	getMediaDetail,
	getMedias,
	MediaFormInput,
	MediaResponse,
	updateMedia,
	validateMediaForm,
} from "../../lib/admin-media";
import {
	selectMediasByCategoryId,
	selectMediasByType,
	useMediaCmsStore,
} from "../../lib/admin-media-store";

type MediaSectionManagerProps = {
	section: string;
	mode: "list" | "create" | "edit";
	id?: string;
};

function normalizeSection(section: string) {
	return section.trim().toLowerCase();
}

function isVideoSection(section: AdminMediaSection) {
	return section === "video";
}

function formatDate(value: string) {
	if (!value) return "-";
	const parsed = new Date(value);
	if (Number.isNaN(parsed.getTime())) return "-";
	return parsed.toLocaleDateString("id-ID");
}

function getCategoryName(categoryId: number, categories: CategoryResponse[]) {
	return categories.find((item) => item.id === categoryId)?.name ?? "-";
}

function extractAuthor(media: MediaResponse) {
	if (media.type === "article") return media.article?.author ?? "-";
	if (media.type === "bulletin") return media.bulletin?.author ?? "-";
	if (media.type === "monograph") return media.monograph?.author ?? "-";
	return "-";
}

function extractPrimaryInfo(media: MediaResponse) {
	if (media.type === "video") return media.video?.youtubeUrl ?? "-";
	if (media.type === "journal") return media.journal?.fileUrl ?? "-";
	if (media.type === "article") return media.article?.tagline ?? "-";
	if (media.type === "bulletin") return media.bulletin?.titleDescription ?? "-";
	if (media.type === "monograph") return media.monograph?.isbn ?? "-";
	return "-";
}

function imageFileToDataUrl(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const objectUrl = URL.createObjectURL(file);
		const image = new Image();

		image.onload = () => {
			const maxWidth = 1280;
			const scale = Math.min(1, maxWidth / image.width);
			const width = Math.max(1, Math.round(image.width * scale));
			const height = Math.max(1, Math.round(image.height * scale));

			const canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;

			const context = canvas.getContext("2d");
			if (!context) {
				URL.revokeObjectURL(objectUrl);
				reject(new Error("Gagal memproses gambar"));
				return;
			}

			context.drawImage(image, 0, 0, width, height);
			const dataUrl = canvas.toDataURL("image/webp", 0.82);
			URL.revokeObjectURL(objectUrl);
			resolve(dataUrl);
		};

		image.onerror = () => {
			URL.revokeObjectURL(objectUrl);
			reject(new Error("Gagal membaca file gambar"));
		};

		image.src = objectUrl;
	});
}

function buildUploadPath(file: File, scope: string) {
	const safeName = encodeURIComponent(file.name.trim().replace(/\s+/g, "-"));
	return `/uploads/${scope}/${safeName}`;
}

type FileInputFieldProps = {
	label: string;
	accept: string;
	file: File | null;
	onChange: (file: File | null) => void;
	helperText?: string;
	existingValue?: string;
};

function FileInputField({
	label,
	accept,
	file,
	onChange,
	helperText,
	existingValue,
}: FileInputFieldProps) {
	return (
		<div>
			<label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
				<label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50">
					<Upload size={16} />
					Pilih File
					<input
						type="file"
						accept={accept}
						className="hidden"
						onChange={(event) => onChange(event.target.files?.[0] ?? null)}
					/>
				</label>
				{file ? (
					<div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
						<span className="max-w-[240px] truncate">{file.name}</span>
						<button
							type="button"
							onClick={() => onChange(null)}
							className="text-red-500 transition-colors hover:text-red-700"
							title="Hapus file"
						>
							<X size={14} />
						</button>
					</div>
				) : (
					<p className="text-sm text-gray-500">Belum ada file dipilih.</p>
				)}
			</div>
			{helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
			{!file && existingValue ? (
				<p className="mt-1 text-xs text-gray-500">Menggunakan file tersimpan saat ini.</p>
			) : null}
		</div>
	);
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
	const {
		state,
		setLoading,
		setError,
		setCategories,
		setMedias,
		removeMedia,
		setActiveCategory,
	} = useMediaCmsStore();
	const [search, setSearch] = useState("");
	const [filterCategory, setFilterCategory] = useState(0);
	const [deleteId, setDeleteId] = useState<number | null>(null);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		const run = async () => {
			try {
				setLoading(true);
				setError("");

				const [categories, medias] = await Promise.all([
					getCategories(),
					getMedias({ type: config.section }),
				]);

				setCategories(categories);
				setMedias(medias);
				setSearch("");
				setFilterCategory(0);
				setActiveCategory(null);
			} catch (error: unknown) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError("Terjadi kesalahan saat memuat data media");
				}
				setMedias([]);
			} finally {
				setLoading(false);
			}
		};

		run();
	}, [config.section, setActiveCategory, setCategories, setError, setLoading, setMedias]);

	const mediasBySection = useMemo(
		() => selectMediasByType(state, config.section),
		[config.section, state]
	);

	const mediasByActiveCategory = useMemo(() => {
		if (!filterCategory) return mediasBySection;
		return selectMediasByCategoryId({ ...state, medias: mediasBySection }, filterCategory);
	}, [filterCategory, mediasBySection, state]);

	const categories = state.categories;

	const filteredItems = useMemo(() => {
		const keyword = search.trim().toLowerCase();

		return mediasByActiveCategory.filter((item) => {
			const detail = getMediaDetail(item);
			const searchable = [
				item.title,
				item.slug,
				item.category,
				typeof detail === "object" && detail ? Object.values(detail).join(" ") : "",
			]
				.join(" ")
				.toLowerCase();

			return !keyword || searchable.includes(keyword);
		});
	}, [mediasByActiveCategory, search]);

	const handleDelete = async () => {
		if (deleteId === null) return;

		try {
			setDeleting(true);
			setError("");
			await deleteMedia(deleteId);
			removeMedia(deleteId);
			setDeleteId(null);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("Gagal menghapus media");
			}
		} finally {
			setDeleting(false);
		}
	};

	const addHref = `/admin/media/tambah?type=${config.section}`;

	if (state.loading) {
		return (
			<div className="flex items-center justify-center py-20">
				<div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{state.error && (
				<div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
					{state.error}
				</div>
			)}

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
							onChange={(e) => {
								const next = Number(e.target.value);
								setFilterCategory(next);
								setActiveCategory(next > 0 ? next : null);
							}}
							className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white"
						>
							<option value={0}>Semua Kategori</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
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
									<th className="text-left px-6 py-4 font-medium text-gray-600">Kategori</th>
									<th className="text-center px-6 py-4 font-medium text-gray-600">Aksi</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100">
								{filteredItems.map((item, idx) => (
									<tr key={item.id} className="hover:bg-gray-50 transition-colors">
										<td className="px-6 py-4 text-gray-500">{idx + 1}</td>
										<td className="px-6 py-4 font-medium text-gray-800 max-w-xs truncate">{item.title}</td>
										<td className="px-6 py-4 text-gray-600 max-w-sm truncate">{item.type === "video" ? item.video?.youtubeUrl || "-" : "-"}</td>
										<td className="px-6 py-4 text-gray-600 max-w-lg truncate">{getCategoryName(item.categoryId, categories)}</td>
										<td className="px-6 py-4">
											<div className="flex items-center justify-center gap-1">
												<Link href={`/admin/media/${config.section}/${item.slug}`} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
													<Pencil size={16} />
												</Link>
												<button onClick={() => setDeleteId(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
													<Trash2 size={16} />
												</button>
											</div>
										</td>
									</tr>
								))}
								{filteredItems.length === 0 && (
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
									<th className="text-left px-6 py-4 font-medium text-gray-600">Info</th>
									<th className="text-left px-6 py-4 font-medium text-gray-600">Kategori</th>
									<th className="text-left px-6 py-4 font-medium text-gray-600">Tanggal Rilis</th>
									<th className="text-center px-6 py-4 font-medium text-gray-600">Aksi</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100">
								{filteredItems.map((item, idx) => (
									<tr key={item.id} className="hover:bg-gray-50 transition-colors">
										<td className="px-6 py-4 text-gray-500">{idx + 1}</td>
										<td className="px-6 py-4 font-medium text-gray-800 max-w-xs truncate">{item.title}</td>
										<td className="px-6 py-4 text-gray-600">{extractPrimaryInfo(item)}</td>
										<td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">{getCategoryName(item.categoryId, categories)}</span></td>
										<td className="px-6 py-4 text-gray-600">{formatDate(item.publishedAt)}</td>
										<td className="px-6 py-4">
											<div className="flex items-center justify-center gap-1">
												<Link href={`/admin/media/${config.section}/${item.slug}`} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
													<Pencil size={16} />
												</Link>
												<button onClick={() => setDeleteId(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
													<Trash2 size={16} />
												</button>
											</div>
										</td>
									</tr>
								))}
								{filteredItems.length === 0 && (
									<tr>
										<td colSpan={6} className="px-6 py-12 text-center text-gray-400">Tidak ada data ditemukan</td>
									</tr>
								)}
							</tbody>
						</table>
					)}
				</div>

				<div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
					<p className="text-sm text-gray-500">Menampilkan {filteredItems.length} dari {mediasBySection.length} data</p>
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
							<button onClick={handleDelete} disabled={deleting} className="px-4 py-2 bg-[#DC2626] text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">{deleting ? "Menghapus..." : "Hapus"}</button>
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
	id?: string;
	router: ReturnType<typeof useRouter>;
}) {
	const {
		state,
		setLoading: setStoreLoading,
		setError,
		setCategories,
		upsertMedia,
	} = useMediaCmsStore();
	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(true);
	const [form, setForm] = useState<MediaFormInput>(createDefaultMediaForm(config.section));
	const [resolvedMediaId, setResolvedMediaId] = useState<number | null>(null);
	const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
	const [authorImageFile, setAuthorImageFile] = useState<File | null>(null);
	const [articleContentFile, setArticleContentFile] = useState<File | null>(null);
	const [documentFile, setDocumentFile] = useState<File | null>(null);
	const [monographImageFile, setMonographImageFile] = useState<File | null>(null);

	useEffect(() => {
		const run = async () => {
			try {
				setFetching(true);
				setStoreLoading(true);
				setError("");

				const categories = await getCategories();
				setCategories(categories);

				const fallbackCategoryId = categories[0]?.id ?? 0;
				setForm((prev) => ({
					...prev,
					type: config.section,
					categoryId: prev.categoryId > 0 ? prev.categoryId : fallbackCategoryId,
				}));

				if (mode === "edit" && id) {
					const identifier = id.trim();
					if (!identifier) {
						throw new Error("ID data tidak valid");
					}

					const detail = await getMediaById(identifier);

					if (!detail) {
						throw new Error("Data media tidak ditemukan");
					}

					if (detail.type !== config.section) {
						throw new Error(`Tipe media "${detail.type}" tidak sesuai dengan section "${config.section}"`);
					}

					setResolvedMediaId(detail.id);
					const nextForm = buildMediaFormFromResponse(detail);
					const matchedCategoryId =
						nextForm.categoryId > 0
							? nextForm.categoryId
							: categories.find((item) => item.name === detail.category)?.id ?? fallbackCategoryId;

					setForm({
						...nextForm,
						type: config.section,
						categoryId: matchedCategoryId,
					});
					setCoverImageFile(null);
					setAuthorImageFile(null);
					setArticleContentFile(null);
					setDocumentFile(null);
					setMonographImageFile(null);
				} else {
					setResolvedMediaId(null);
					setArticleContentFile(null);
				}
			} catch (error: unknown) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError("Terjadi kesalahan saat memuat form media");
				}
			} finally {
				setStoreLoading(false);
				setFetching(false);
			}
		};

		run();
	}, [config.section, id, mode]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		if (state.error) {
			setError("");
		}
		if (name === "categoryId") {
			setForm((prev) => ({ ...prev, categoryId: Number(value) }));
			return;
		}

		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (
		name: "coverImage" | "authorImage" | "content" | "fileUrl" | "image",
		file: File | null
	) => {
		if (state.error) {
			setError("");
		}

		if (name === "coverImage") {
			setCoverImageFile(file);
			return;
		}

		if (name === "authorImage") {
			setAuthorImageFile(file);
			return;
		}

		if (name === "content") {
			setArticleContentFile(file);
			return;
		}

		if (name === "fileUrl") {
			setDocumentFile(file);
			return;
		}

		setMonographImageFile(file);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const preparedForm: MediaFormInput = {
				...form,
				coverImage: coverImageFile ? await imageFileToDataUrl(coverImageFile) : form.coverImage,
				authorImage: authorImageFile ? await imageFileToDataUrl(authorImageFile) : form.authorImage,
				content: articleContentFile ? buildUploadPath(articleContentFile, "article/content") : form.content,
				fileUrl: documentFile ? buildUploadPath(documentFile, config.section) : form.fileUrl,
				image: monographImageFile ? await imageFileToDataUrl(monographImageFile) : form.image,
			};

			const errors = validateMediaForm(config.section, preparedForm);

			if (errors.length > 0) {
				setError(errors[0]);
				return;
			}

			const payload = buildMediaPayload(config.section, preparedForm);

			if (mode === "edit") {
				if (!resolvedMediaId || resolvedMediaId <= 0) {
					throw new Error("ID media tidak valid");
				}

				const updated = await updateMedia(resolvedMediaId, payload);
				if (updated) {
					upsertMedia(updated);
				}
			} else {
				const created = await createMedia(payload);
				if (created) {
					upsertMedia(created);
				}
			}

			router.push("/admin/media");
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("Terjadi kesalahan saat menyimpan media");
			}
		} finally {
			setLoading(false);
		}
	};

	if (mode === "edit" && fetching) {
		return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" /></div>;
	}

	const categories = state.categories;
	const isVideo = config.isVideo;

	return (
		<div className="max-w-3xl">
			<Link href="/admin/media" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6">
				<ArrowLeft size={16} />
				Kembali ke daftar
			</Link>

			<div className="bg-white rounded-xl border border-gray-200 p-6">
				<h2 className="text-lg font-semibold text-gray-800 mb-2">{mode === "edit" ? `Edit ${config.singularLabel}` : `Tambah ${config.singularLabel} Baru`}</h2>

				{state.error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{state.error}</div>}

				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">Judul</label>
						<input type="text" name="title" placeholder="Masukkan judul" value={form.title} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori</label>
							<select name="categoryId" value={form.categoryId} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white" required>
								<option value={0} disabled>Pilih kategori</option>
								{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Publish</label>
							<input type="datetime-local" name="publishedAt" value={form.publishedAt ? form.publishedAt.slice(0, 16) : ""} onChange={(e) => {
								if (state.error) {
									setError("");
								}
								setForm((prev) => ({ ...prev, publishedAt: e.target.value ? `${e.target.value}:00` : "" }));
							}} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
						</div>
					</div>

					<div>
						<FileInputField
							label="Cover Image"
							accept="image/*"
							file={coverImageFile}
							onChange={(file) => handleFileChange("coverImage", file)}
							helperText="Upload gambar cover terbaru bila ingin mengganti cover saat ini."
							existingValue={form.coverImage}
						/>
					</div>

					{config.section === "article" && (
						<>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1.5">Author</label>
									<input type="text" name="author" value={form.author} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
								</div>
								<div>
									<FileInputField
										label="Author Image"
										accept="image/*"
										file={authorImageFile}
										onChange={(file) => handleFileChange("authorImage", file)}
										helperText="Upload foto author terbaru jika perlu."
										existingValue={form.authorImage}
									/>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">Author Description</label>
								<textarea name="authorDescription" value={form.authorDescription} onChange={handleChange} rows={3} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">Tagline</label>
								<input type="text" name="tagline" value={form.tagline} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
							</div>
							<div>
								<FileInputField
									label="Content Artikel (PDF)"
									accept="application/pdf"
									file={articleContentFile}
									onChange={(file) => handleFileChange("content", file)}
									helperText="Upload PDF konten artikel."
									existingValue={form.content}
								/>
							</div>
						</>
					)}

					{config.section === "video" && (
						<>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">YouTube URL</label>
								<input type="url" name="youtubeUrl" value={form.youtubeUrl} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">Tema Video</label>
								<input type="text" name="videoTheme" value={form.videoTheme} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi Video</label>
								<textarea name="videoDescription" value={form.videoDescription} onChange={handleChange} rows={4} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
							</div>
						</>
					)}

					{config.section === "journal" && (
						<div>
							<FileInputField
								label="File Jurnal (PDF)"
								accept="application/pdf"
								file={documentFile}
								onChange={(file) => handleFileChange("fileUrl", file)}
								helperText="Upload PDF jurnal jika ingin mengganti file saat ini."
								existingValue={form.fileUrl}
							/>
						</div>
					)}

					{config.section === "bulletin" && (
						<>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1.5">Author</label>
									<input type="text" name="author" value={form.author} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
								</div>
								<div>
									<FileInputField
										label="File Bulletin (PDF)"
										accept="application/pdf"
										file={documentFile}
										onChange={(file) => handleFileChange("fileUrl", file)}
										helperText="Upload PDF bulletin jika ingin mengganti file saat ini."
										existingValue={form.fileUrl}
									/>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">Title Description</label>
								<input type="text" name="titleDescription" value={form.titleDescription} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
								<textarea name="description" value={form.description} onChange={handleChange} rows={4} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
							</div>
						</>
					)}

					{config.section === "monograph" && (
						<>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1.5">Author</label>
									<input type="text" name="author" value={form.author} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
								</div>
								<div>
									<FileInputField
										label="Image"
										accept="image/*"
										file={monographImageFile}
										onChange={(file) => handleFileChange("image", file)}
										helperText="Upload gambar monograph terbaru bila diperlukan."
										existingValue={form.image}
									/>
								</div>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1.5">Description Title</label>
									<input type="text" name="descriptionTitle" value={form.descriptionTitle} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1.5">Writer</label>
									<input type="text" name="writer" value={form.writer} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">ISBN</label>
								<input type="text" name="isbn" value={form.isbn} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">Synopsis</label>
								<textarea name="synopsis" value={form.synopsis} onChange={handleChange} rows={4} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none" />
							</div>
						</>
					)}

					<div className="flex gap-3 pt-4">
						<button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors disabled:opacity-70">{loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}Simpan</button>
						<Link href="/admin/media" className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">Batal</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

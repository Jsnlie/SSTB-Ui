"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, ComponentType, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	ArrowLeft,
	BadgeInfo,
	Layers3,
	Loader2,
	MonitorPlay,
	NotebookText,
	Plus,
	ShieldCheck,
	Upload,
	X,
	FileText,
	Video,
} from "lucide-react";
import {
	buildMediaPayload,
	createDefaultMediaForm,
	createMedia,
	getCategories,
	getAdminMediaSectionConfig,
	MediaFormInput,
	MediaType,
	validateMediaForm,
} from "../../lib/admin-media";

type MediaCreateWizardProps = {
	initialType?: MediaType | null;
};

type MediaTypeOption = {
	type: MediaType;
	label: string;
	description: string;
	icon: ComponentType<{ size?: number }>;
	accent: string;
};

const MEDIA_TYPE_OPTIONS: MediaTypeOption[] = [
	{
		type: "article",
		label: "Artikel",
		description: "Konten berita atau artikel dengan penulis dan isi panjang.",
		icon: FileText,
		accent: "from-blue-600 to-cyan-500",
	},
	{
		type: "video",
		label: "Video",
		description: "Media video dengan tautan YouTube dan deskripsi singkat.",
		icon: Video,
		accent: "from-emerald-600 to-teal-500",
	},
	{
		type: "journal",
		label: "Jurnal",
		description: "Publikasi jurnal dengan tautan file utama.",
		icon: NotebookText,
		accent: "from-indigo-600 to-sky-500",
	},
	{
		type: "bulletin",
		label: "Buletin",
		description: "Buletin dengan author, PDF, dan deskripsi publikasi.",
		icon: BadgeInfo,
		accent: "from-orange-600 to-amber-500",
	},
	{
		type: "monograph",
		label: "Monograph",
		description: "Monograf lengkap dengan metadata, synopsis, dan ISBN.",
		icon: Layers3,
		accent: "from-violet-600 to-fuchsia-500",
	},
];

const TYPE_LABELS: Record<MediaType, string> = {
	article: "Artikel",
	video: "Video",
	journal: "Jurnal",
	bulletin: "Buletin",
	monograph: "Monograph",
};

function TypeBadge({ type }: { type: MediaType }) {
	const config = getAdminMediaSectionConfig(type);
	return (
		<span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
			<ShieldCheck size={14} />
			{config?.label ?? TYPE_LABELS[type]}
		</span>
	);
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

function fileToDataUrl(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(toString(reader.result));
		reader.onerror = () => reject(new Error("Gagal membaca file"));
		reader.readAsDataURL(file);
	});
}

function toString(value: string | ArrayBuffer | null): string {
	if (typeof value === "string") return value;
	return "";
}

function buildUploadPath(file: File, scope: string) {
	const safeName = encodeURIComponent(file.name.trim().replace(/\s+/g, "-"));
	return `/uploads/${scope}/${safeName}`;
}

type FileChoiceProps = {
	label: string;
	accept: string;
	helperText: string;
	file: File | null;
	onChange: (file: File | null) => void;
	imageLike?: boolean;
	required?: boolean;
};

function FileChoice({ label, accept, helperText, file, onChange, imageLike = false, required = false }: FileChoiceProps) {
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
			<p className="mt-1 text-xs text-gray-500">
				{helperText}
				{required ? " Wajib diisi." : ""}
			</p>
			{imageLike && file && <p className="mt-1 text-xs text-gray-500">Nama file akan disimpan ke path media saat submit.</p>}
		</div>
	);
}

export default function MediaCreateWizard({ initialType = null }: MediaCreateWizardProps) {
	const router = useRouter();
	const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
	const [loadingCategories, setLoadingCategories] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [selectedType, setSelectedType] = useState<MediaType | null>(initialType);
	const [form, setForm] = useState<MediaFormInput>(() => createDefaultMediaForm(initialType ?? "article"));
	const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
	const [articleContentFile, setArticleContentFile] = useState<File | null>(null);
	const [journalFile, setJournalFile] = useState<File | null>(null);
	const [bulletinPdfFile, setBulletinPdfFile] = useState<File | null>(null);
	const [monographImageFile, setMonographImageFile] = useState<File | null>(null);

	useEffect(() => {
		const run = async () => {
			try {
				setLoadingCategories(true);
				const data = await getCategories();
				setCategories(data.map((item) => ({ id: item.id, name: item.name })));
				setForm((prev) => {
					if (prev.categoryId > 0) return prev;
					return {
						...prev,
						categoryId: data[0]?.id ?? 0,
					};
				});
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("Gagal memuat daftar kategori");
				}
			} finally {
				setLoadingCategories(false);
			}
		};

		run();
	}, []);

	useEffect(() => {
		if (!selectedType) return;
		setForm(createDefaultMediaForm(selectedType, categories[0]?.id ?? 0));
		setCoverImageFile(null);
		setArticleContentFile(null);
		setJournalFile(null);
		setBulletinPdfFile(null);
		setMonographImageFile(null);
		setError("");
	}, [categories, selectedType]);

	const selectType = (nextType: MediaType) => {
		setSelectedType(nextType);
		setForm(createDefaultMediaForm(nextType, categories[0]?.id ?? form.categoryId ?? 0));
		setCoverImageFile(null);
		setArticleContentFile(null);
		setJournalFile(null);
		setBulletinPdfFile(null);
		setMonographImageFile(null);
		setError("");
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		if (error) {
			setError("");
		}

		if (name === "categoryId") {
			setForm((prev) => ({ ...prev, categoryId: Number(value) }));
			return;
		}

		if (name === "publishedAt") {
			setForm((prev) => ({
				...prev,
				publishedAt: value ? `${value}:00` : "",
			}));
			return;
		}

		if (name === "coverImage") {
			setCoverImageFile(null);
		}

		if (name === "content") {
			setArticleContentFile(null);
		}

		if (name === "image") {
			setMonographImageFile(null);
		}

		if (name === "fileUrl") {
			setJournalFile(null);
		}

		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (
		setter: (file: File | null) => void,
		field: keyof MediaFormInput,
		maxSize: number,
		errorMessage: string
	) => (file: File | null) => {
		if (file && file.size > maxSize) {
			setError(errorMessage);
			return;
		}

		setError("");
		setter(file);
		setForm((prev) => ({ ...prev, [field]: file ? file.name : "" }));
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (!selectedType) {
			setError("Pilih tipe media terlebih dahulu.");
			return;
		}

		const payloadErrors = validateMediaForm(selectedType, form);
		if (payloadErrors.length > 0) {
			setError(payloadErrors[0]);
			return;
		}

		setSubmitting(true);
		setError("");
		try {
			const nextForm = { ...form };

			if (coverImageFile) nextForm.coverImage = await imageFileToDataUrl(coverImageFile);
			if (articleContentFile) nextForm.content = await fileToDataUrl(articleContentFile);
			if (journalFile) nextForm.fileUrl = await fileToDataUrl(journalFile);
			if (bulletinPdfFile) nextForm.fileUrl = await fileToDataUrl(bulletinPdfFile);
			if (monographImageFile) nextForm.image = await imageFileToDataUrl(monographImageFile);

			if (selectedType === "monograph") {
				nextForm.coverImage = nextForm.image || nextForm.coverImage;
			}

			const payload = buildMediaPayload(selectedType, nextForm);
			const created = await createMedia(payload);
			if (created) {
				router.push("/admin/media");
				return;
			}

			setError("Media berhasil dikirim, tetapi respons server kosong.");
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Terjadi kesalahan saat menyimpan media");
			}
		} finally {
			setSubmitting(false);
		}
	};

	if (loadingCategories && categories.length === 0) {
		return (
			<div className="flex items-center justify-center py-20">
				<div className="flex items-center gap-3 text-sm text-gray-500">
					<Loader2 size={18} className="animate-spin" />
					Memuat form media...
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6 max-w-5xl">
			<div className="flex items-start justify-between gap-4">
				<div>
					<Link href="/admin/media" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4">
						<ArrowLeft size={16} />
						Kembali ke daftar media
					</Link>
					<h1 className="text-2xl font-semibold text-gray-900">Tambah Media Baru</h1>
					<p className="mt-2 text-sm text-gray-600">Pilih tipe media di awal, lalu isi form yang sesuai tanpa masuk ke alur CMS lama.</p>
				</div>
				{selectedType && <TypeBadge type={selectedType} />}
			</div>

			{error && (
				<div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
					{error}
				</div>
			)}

			{!selectedType ? (
				<div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
					<div className="flex items-center gap-2 text-sm font-medium text-gray-700">
						<Plus size={16} />
						Pilih tipe media
					</div>
					<p className="text-sm text-gray-500">Ini adalah langkah awal untuk menentukan field yang akan ditampilkan.</p>
					<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
						{MEDIA_TYPE_OPTIONS.map((option) => {
							const Icon = option.icon;
							return (
								<button
									key={option.type}
									type="button"
									onClick={() => selectType(option.type)}
									className="group rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg"
								>
									<div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${option.accent} text-white shadow-md`}>
										<Icon size={20} />
									</div>
									<h3 className="text-base font-semibold text-gray-900">{option.label}</h3>
									<p className="mt-2 text-sm leading-6 text-gray-600">{option.description}</p>
									<span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#1E3A8A] group-hover:translate-x-1 transition-transform">
										Pilih {option.label}
										<ArrowLeft size={14} className="rotate-180" />
									</span>
								</button>
							);
						})}
					</div>
				</div>
			) : (
				<div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
					<div className="flex flex-wrap items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
						<div className="flex items-center gap-2 text-sm font-medium text-slate-700">
							<MonitorPlay size={16} />
							Tipe aktif:
						</div>
						<div className="flex flex-wrap gap-2">
							{MEDIA_TYPE_OPTIONS.map((option) => (
								<button
									key={option.type}
									type="button"
									onClick={() => selectType(option.type)}
									className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
										selectedType === option.type
											? "bg-[#1E3A8A] text-white"
											: "bg-white text-slate-600 hover:bg-slate-100"
									}`}
								>
									{option.label}
								</button>
							))}
						</div>
						<div className="ml-auto">
							<select
								value={selectedType}
								onChange={(event) => selectType(event.target.value as MediaType)}
								className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E3A8A]"
							>
								{MEDIA_TYPE_OPTIONS.map((option) => (
									<option key={option.type} value={option.type}>{option.label}</option>
								))}
							</select>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="space-y-5">
						<div className="grid gap-5 lg:grid-cols-2">
							<div>
								<label className="mb-1.5 block text-sm font-medium text-gray-700">Judul</label>
								<input
									type="text"
									name="title"
									value={form.title}
									onChange={handleChange}
									placeholder="Masukkan judul media"
									className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1E3A8A]"
									required
								/>
							</div>
							<div>
								<label className="mb-1.5 block text-sm font-medium text-gray-700">Kategori</label>
								<select
									name="categoryId"
									value={form.categoryId}
									onChange={handleChange}
									className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1E3A8A]"
									required
								>
									<option value={0} disabled>{categories.length === 0 ? "Kategori belum tersedia" : "Pilih kategori"}</option>
									{categories.map((item) => (
										<option key={item.id} value={item.id}>{item.name}</option>
									))}
								</select>
							</div>
							<div>
								<label className="mb-1.5 block text-sm font-medium text-gray-700">Tanggal Publish</label>
								<input
									type="datetime-local"
									name="publishedAt"
									value={form.publishedAt ? form.publishedAt.slice(0, 16) : ""}
									onChange={handleChange}
									className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1E3A8A]"
								/>
							</div>
							<div>
								{selectedType === "monograph" ? null : (
									<FileChoice
										label="Cover Image"
										accept="image/*"
										helperText="Format JPG, PNG, atau WEBP."
										file={coverImageFile}
										onChange={handleFileChange(setCoverImageFile, "coverImage", 2 * 1024 * 1024, "Ukuran cover image maksimal 2MB")}
										imageLike
									/>
								)}
							</div>
						</div>

						{selectedType === "article" && (
							<div className="grid gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:grid-cols-2">
								<div>
									<label className="mb-1.5 block text-sm font-medium text-gray-700">Author</label>
									<input type="text" name="author" value={form.author} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1E3A8A]" required />
								</div>
								<div className="lg:col-span-2">
									<label className="mb-1.5 block text-sm font-medium text-gray-700">Author Description</label>
									<textarea name="authorDescription" value={form.authorDescription} onChange={handleChange} rows={3} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1E3A8A]" />
								</div>
								<div className="lg:col-span-2">
									<label className="mb-1.5 block text-sm font-medium text-gray-700">Tagline</label>
									<input type="text" name="tagline" value={form.tagline} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1E3A8A]" />
								</div>
								<div className="lg:col-span-2">
									<FileChoice
										label="Content Artikel (PDF)"
										accept="application/pdf"
										helperText="Upload file PDF untuk konten artikel."
										file={articleContentFile}
										onChange={handleFileChange(setArticleContentFile, "content", 10 * 1024 * 1024, "Ukuran PDF artikel maksimal 10MB")}
										required
									/>
								</div>
							</div>
						)}

						{selectedType === "video" && (
							<div className="grid gap-5 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
								<div>
									<label className="mb-1.5 block text-sm font-medium text-gray-700">YouTube URL</label>
									<input type="url" name="youtubeUrl" value={form.youtubeUrl} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1E3A8A]" required />
								</div>
								<div>
									<label className="mb-1.5 block text-sm font-medium text-gray-700">Tema Video</label>
									<input type="text" name="videoTheme" value={form.videoTheme} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1E3A8A]" />
								</div>
								<div>
									<label className="mb-1.5 block text-sm font-medium text-gray-700">Deskripsi Video</label>
									<textarea name="videoDescription" value={form.videoDescription} onChange={handleChange} rows={4} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1E3A8A]" />
								</div>
							</div>
						)}

						{selectedType === "journal" && (
							<div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-5">
								<FileChoice
									label="File Jurnal (PDF)"
									accept="application/pdf"
									helperText="Format PDF."
									file={journalFile}
									onChange={handleFileChange(setJournalFile, "fileUrl", 10 * 1024 * 1024, "Ukuran file jurnal maksimal 10MB")}
									required
								/>
							</div>
						)}

						{selectedType === "bulletin" && (
							<div className="grid gap-5 rounded-2xl border border-orange-200 bg-orange-50/60 p-5 lg:grid-cols-2">
								<div>
									<label className="mb-1.5 block text-sm font-medium text-gray-700">Author</label>
									<input type="text" name="author" value={form.author} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1E3A8A]" required />
								</div>
								<div>
									<FileChoice
										label="PDF Bulletin"
										accept="application/pdf"
										helperText="Format PDF."
										file={bulletinPdfFile}
										onChange={handleFileChange(setBulletinPdfFile, "fileUrl", 10 * 1024 * 1024, "Ukuran PDF bulletin maksimal 10MB")}
										required
									/>
								</div>
								<div className="lg:col-span-2">
									<label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
									<textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1E3A8A]" required />
								</div>
							</div>
						)}

						{selectedType === "monograph" && (
							<div className="grid gap-5 rounded-2xl border border-violet-200 bg-violet-50/60 p-5 lg:grid-cols-2">
								<div>
									<label className="mb-1.5 block text-sm font-medium text-gray-700">Penulis</label>
									<input type="text" name="author" value={form.author} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1E3A8A]" required />
								</div>
								<div>
									<FileChoice
										label="Image Monograph"
										accept="image/*"
										helperText="Format JPG, PNG, atau WEBP."
										file={monographImageFile}
										onChange={handleFileChange(setMonographImageFile, "image", 2 * 1024 * 1024, "Ukuran image monograph maksimal 2MB")}
										required
										imageLike
									/>
								</div>
								<div>
									<label className="mb-1.5 block text-sm font-medium text-gray-700">Description Title</label>
									<input type="text" name="descriptionTitle" value={form.descriptionTitle} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1E3A8A]" required />
								</div>
								<div>
									<label className="mb-1.5 block text-sm font-medium text-gray-700">Editor</label>
									<input type="text" name="writer" value={form.writer} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1E3A8A]" />
								</div>
								<div className="lg:col-span-2">
									<label className="mb-1.5 block text-sm font-medium text-gray-700">Synopsis</label>
									<textarea name="synopsis" value={form.synopsis} onChange={handleChange} rows={4} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1E3A8A]" required />
								</div>
								<div>
									<label className="mb-1.5 block text-sm font-medium text-gray-700">ISBN</label>
									<input type="text" name="isbn" value={form.isbn} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#1E3A8A]" required />
								</div>
							</div>
						)}

						<div className="flex flex-col gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
							<div className="text-sm text-gray-500">
								{loadingCategories ? "Memuat kategori..." : `${categories.length} kategori tersedia`}
							</div>
							<div className="flex gap-3">
								<button
									type="button"
									onClick={() => setSelectedType(null)}
									className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
								>
									Ganti tipe
								</button>
								<button
									type="submit"
									disabled={submitting}
									className="inline-flex items-center gap-2 rounded-lg bg-[#1E3A8A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1e3a8a]/90 disabled:cursor-not-allowed disabled:opacity-70"
								>
									{submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
									{submitting ? "Menyimpan..." : "Simpan Media"}
								</button>
							</div>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
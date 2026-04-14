"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import {
	AdminEbookItem,
	adminEbookDefaultCategories,
	buildAdminEbookFormData,
	getAdminEbookCategories,
	parseAdminEbookDetailResponse,
	parseAdminEbookListResponse,
} from "../../../../../lib/admin-perpustakaan";
import { apiUrl } from "../../../../../lib/api";
import { getErrorMessage } from "../../../../../lib/response";

async function fileFromUrl(fileUrl: string, fallbackName: string) {
	if (!fileUrl) return null;

	const response = await fetch(fileUrl, { cache: "no-store" });
	if (!response.ok) return null;

	const blob = await response.blob();
	const urlFileName = fileUrl.split("/").pop()?.split("?")[0] || fallbackName;
	return new File([blob], urlFileName, { type: blob.type || "application/octet-stream" });
}

export default function EditEbookPage() {
	const router = useRouter();
	const params = useParams();
	const idParam = Number(params.id);
	const MAX_COVER_SIZE = 2 * 1024 * 1024;
	const MAX_PDF_SIZE = 10 * 1024 * 1024;

	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(true);
	const [error, setError] = useState("");
	const [records, setRecords] = useState<AdminEbookItem[]>([]);
	const [coverFile, setCoverFile] = useState<File | null>(null);
	const [pdfFile, setPdfFile] = useState<File | null>(null);
	const [form, setForm] = useState({
		title: "",
		author: "",
		category: adminEbookDefaultCategories[0] ?? "Teologi",
		isbn: "",
		releaseDate: new Date().toISOString().slice(0, 10),
		cover: "",
		pdfUrl: "",
		description: "",
	});

	const categories = getAdminEbookCategories(records);

	useEffect(() => {
		if (!Number.isFinite(idParam) || idParam <= 0) {
			setError("ID ebook tidak valid");
			setFetching(false);
			return;
		}

		const fetchDetail = async () => {
			try {
				setError("");
				const token = localStorage.getItem("token");
				const res = await fetch(apiUrl("/api/Library"), {
					headers: token ? { Authorization: `Bearer ${token}` } : {},
					cache: "no-store",
				});

				if (!res.ok) {
					const text = await res.text().catch(() => "");
					throw new Error(getErrorMessage(text, "Gagal memuat data perpustakaan"));
				}

				const json = await res.json();
				const parsed = parseAdminEbookListResponse(json);
				setRecords(parsed);

				const ebook = parsed.find((item) => item.id === idParam) ?? null;
				if (!ebook) {
					throw new Error("Data ebook tidak ditemukan");
				}

				let detail = ebook;
				if (!detail.pdfUrl) {
					const detailRes = await fetch(apiUrl(`/api/Library/${ebook.slug}`), {
						headers: token ? { Authorization: `Bearer ${token}` } : {},
						cache: "no-store",
					});

					if (detailRes.ok) {
						const detailJson = await detailRes.json();
						detail = parseAdminEbookDetailResponse(detailJson) ?? detail;
					}
				}

				setForm({
					title: detail?.title || ebook.title,
					author: detail?.author || ebook.author,
					category: detail?.category || ebook.category,
					isbn: detail?.isbn || ebook.isbn,
					releaseDate: detail?.releaseDate || ebook.releaseDate,
					cover: detail?.cover || ebook.cover,
					pdfUrl: detail?.pdfUrl || ebook.pdfUrl,
					description: detail?.description || ebook.description,
				});
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("Terjadi kesalahan saat memuat data ebook");
				}
			} finally {
				setFetching(false);
			}
		};

		fetchDetail();
	}, [idParam]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		if (file && file.size > MAX_COVER_SIZE) {
			setError("Ukuran cover maksimal 2MB");
			return;
		}

		setError("");
		setCoverFile(file);
	};

	const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		if (file && file.size > MAX_PDF_SIZE) {
			setError("Ukuran PDF maksimal 10MB");
			return;
		}

		setError("");
		setPdfFile(file);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!form.title.trim() || !form.author.trim() || !form.isbn.trim()) {
			setError("Judul, penulis, dan ISBN wajib diisi");
			return;
		}

		setError("");
		setLoading(true);

		try {
			const token = localStorage.getItem("token");
			const [resolvedCoverFile, resolvedPdfFile] = await Promise.all([
				coverFile ?? (form.cover ? fileFromUrl(form.cover, `${form.title || "cover"}.jpg`) : null),
				pdfFile ?? (form.pdfUrl ? fileFromUrl(form.pdfUrl, `${form.title || "ebook"}.pdf`) : null),
			]);
			const formData = buildAdminEbookFormData({
				id: idParam,
				...form,
			}, {
				coverFile: resolvedCoverFile,
				pdfFile: resolvedPdfFile,
			});

			const res = await fetch(apiUrl(`/api/Library/${idParam}`), {
				method: "PUT",
				headers: {
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
				body: formData,
			});

			if (!res.ok) {
				const text = await res.text().catch(() => "");
				throw new Error(getErrorMessage(text, "Gagal memperbarui ebook"));
			}

			router.push("/admin/perpustakaan");
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Terjadi kesalahan saat memperbarui ebook");
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
				href="/admin/perpustakaan"
				className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
			>
				<ArrowLeft size={16} />
				Kembali ke daftar
			</Link>

			<div className="bg-white rounded-xl border border-gray-200 p-6">
				<h2 className="text-lg font-semibold text-gray-800 mb-2">Edit Ebook</h2>

				{error && (
					<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Ebook</label>
						<input
							type="text"
							name="title"
							placeholder="Masukkan judul ebook"
							value={form.title}
							onChange={handleChange}
							required
							className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
						/>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">Penulis</label>
							<input
								type="text"
								name="author"
								placeholder="Nama penulis"
								value={form.author}
								onChange={handleChange}
								required
								className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">ISBN</label>
							<input
								type="text"
								name="isbn"
								placeholder="978-..."
								value={form.isbn}
								onChange={handleChange}
								required
								className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori</label>
							<select
								name="category"
								value={form.category}
								onChange={handleChange}
								className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none bg-white"
							>
								{categories.map((item) => (
									<option key={item} value={item}>
										{item}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Rilis</label>
							<input
								type="date"
								name="releaseDate"
								value={form.releaseDate}
								onChange={handleChange}
								className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">File Cover</label>
							<div className="flex flex-col sm:flex-row sm:items-center gap-3">
								<label className="inline-flex items-center gap-2 px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors w-fit">
									<Upload size={16} />
									Pilih File Baru
									<input
										type="file"
										accept="image/*"
										className="hidden"
										onChange={handleCoverFileChange}
									/>
								</label>

								{coverFile ? (
									<div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 text-sm text-gray-700 border border-gray-200">
										<span>{coverFile.name}</span>
										<button
											type="button"
											onClick={() => setCoverFile(null)}
											className="text-red-500 hover:text-red-700"
											title="Batalkan file baru"
										>
											<X size={14} />
										</button>
									</div>
								) : (
									<p className="text-sm text-gray-500">
										{form.cover ? "Menggunakan cover tersimpan." : "Belum ada cover tersimpan."}
									</p>
								)}
							</div>
							<p className="mt-1 text-xs text-gray-500">Format: JPG, PNG, WEBP. Maksimal 2MB.</p>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">File PDF Ebook</label>
							<div className="flex flex-col sm:flex-row sm:items-center gap-3">
								<label className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors w-fit">
									<Upload size={16} />
									Pilih File Baru
									<input
										type="file"
										accept="application/pdf"
										className="hidden"
										onChange={handlePdfFileChange}
									/>
								</label>

								{pdfFile ? (
									<div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 text-sm text-gray-700 border border-gray-200">
										<span>{pdfFile.name}</span>
										<button
											type="button"
											onClick={() => setPdfFile(null)}
											className="text-red-500 hover:text-red-700"
											title="Batalkan file PDF baru"
										>
											<X size={14} />
										</button>
									</div>
								) : (
									<p className="text-sm text-gray-500">
										{form.pdfUrl ? "Menggunakan PDF tersimpan." : "Belum ada PDF tersimpan."}
									</p>
								)}
							</div>
							<p className="mt-1 text-xs text-gray-500">Format: PDF. Maksimal 10MB.</p>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
						<textarea
							name="description"
							placeholder="Deskripsi singkat ebook"
							value={form.description}
							onChange={handleChange}
							rows={4}
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
							href="/admin/perpustakaan"
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

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import {
  AdminEbookItem,
  adminEbookDefaultCategories,
	buildAdminEbookFormData,
  getAdminEbookCategories,
  parseAdminEbookListResponse,
} from "../../../../../lib/admin-perpustakaan";
import { apiUrl } from "../../../../../lib/api";
import { getErrorMessage } from "../../../../../lib/response";

export default function TambahEbookPage() {
	const router = useRouter();
	const MAX_COVER_SIZE = 2 * 1024 * 1024;
	const MAX_PDF_SIZE = 10 * 1024 * 1024;
	const [loading, setLoading] = useState(false);
	const [fetchingCategories, setFetchingCategories] = useState(true);
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
		description: "",
	});

	const categories = useMemo(() => getAdminEbookCategories(records), [records]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				setError("");
				const token = localStorage.getItem("token");
				const res = await fetch(apiUrl("/api/Library"), {
					headers: token ? { Authorization: `Bearer ${token}` } : {},
					cache: "no-store",
				});

				if (!res.ok) {
					const text = await res.text().catch(() => "");
					throw new Error(getErrorMessage(text, "Gagal memuat kategori ebook"));
				}

				const json = await res.json();
				setRecords(parseAdminEbookListResponse(json));
			} catch (err: unknown) {
				setRecords([]);
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("Terjadi kesalahan saat memuat kategori ebook");
				}
			} finally {
				setFetchingCategories(false);
			}
		};

		fetchCategories();
	}, []);

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

		if (!coverFile || !pdfFile) {
			setError("File cover dan PDF ebook wajib dipilih");
			return;
		}

		setError("");
		setLoading(true);

		try {
			const token = localStorage.getItem("token");
			const formData = buildAdminEbookFormData(form, {
				coverFile,
				pdfFile,
			});

			const res = await fetch(apiUrl("/api/Library"), {
				method: "POST",
				headers: {
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
				body: formData,
			});

			if (!res.ok) {
				const text = await res.text().catch(() => "");
				throw new Error(getErrorMessage(text, "Gagal menambahkan ebook"));
			}

			router.push("/admin/perpustakaan");
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Terjadi kesalahan saat menambahkan ebook");
			}
		} finally {
			setLoading(false);
		}
	};

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
				<h2 className="text-lg font-semibold text-gray-800 mb-2">Tambah Ebook Baru</h2>

				{error && (
					<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
						{error}
					</div>
				)}

				{fetchingCategories && (
					<div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
						Memuat kategori ebook...
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
								<label className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors w-fit">
									<Upload size={16} />
									Pilih File
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
											title="Hapus file"
										>
											<X size={14} />
										</button>
									</div>
								) : (
									<p className="text-sm text-gray-500">Belum ada file dipilih.</p>
								)}
							</div>
							<p className="mt-1 text-xs text-gray-500">Format: JPG, PNG, WEBP. Maksimal 2MB.</p>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">File PDF Ebook</label>
							<div className="flex flex-col sm:flex-row sm:items-center gap-3">
								<label className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors w-fit">
									<Upload size={16} />
									Pilih File
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
											title="Hapus file"
										>
											<X size={14} />
										</button>
									</div>
								) : (
									<p className="text-sm text-gray-500">Belum ada file dipilih.</p>
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
							disabled={loading || fetchingCategories}
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

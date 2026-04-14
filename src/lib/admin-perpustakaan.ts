import {
	LibraryBook,
	LibraryStatus,
	LibraryUpsertInput,
	buildLibraryUpsertPayload,
	parseLibraryDetailResponse,
	parseLibraryListResponse,
} from "./perpustakaan";

export type EbookStatus = LibraryStatus;

export interface AdminEbookItem {
	id: number;
	slug: string;
	title: string;
	author: string;
	category: string;
	isbn: string;
	releaseDate: string;
	cover: string;
	description: string;
	pdfUrl: string;
	status: EbookStatus;
}

export interface AdminEbookFormInput {
	id?: number;
	slug?: string;
	title: string;
	author: string;
	category: string;
	isbn: string;
	releaseDate: string;
	cover?: string;
	description: string;
	pdfUrl?: string;
	status?: EbookStatus;
}

export interface AdminEbookUploadFiles {
	coverFile?: File | null;
	pdfFile?: File | null;
}

export const adminEbookDefaultCategories = [
	"Teologi",
	"Kepemimpinan",
	"Spiritualitas",
	"Misi",
	"Etika",
	"Others"
];

function mapBookToAdminItem(item: LibraryBook): AdminEbookItem {
	return {
		id: item.id,
		slug: item.slug,
		title: item.title,
		author: item.author,
		category: item.category,
		isbn: item.isbn,
		releaseDate: item.releaseDate,
		cover: item.cover,
		description: item.description,
		pdfUrl: item.pdfUrl,
		status: item.status,
	};
}

export function parseAdminEbookListResponse(payload: unknown): AdminEbookItem[] {
	return parseLibraryListResponse(payload).map(mapBookToAdminItem);
}

export function parseAdminEbookDetailResponse(payload: unknown): AdminEbookItem | null {
	const parsed = parseLibraryDetailResponse(payload);
	if (!parsed) return null;
	return mapBookToAdminItem(parsed);
}

export function getAdminEbookCategories(items: AdminEbookItem[]) {
	const unique = Array.from(new Set(items.map((item) => item.category).filter(Boolean)));
	const merged = Array.from(new Set([...adminEbookDefaultCategories, ...unique]));
	return merged.sort((a, b) => a.localeCompare(b));
}

export function buildAdminEbookPayload(input: AdminEbookFormInput) {
	const payload: LibraryUpsertInput = {
		id: input.id,
		slug: input.slug,
		title: input.title,
		author: input.author,
		category: input.category,
		isbn: input.isbn,
		releaseDate: input.releaseDate,
		cover: input.cover ?? "",
		description: input.description,
		pdfUrl: input.pdfUrl ?? "",
		status: input.status ?? "Published",
	};

	return buildLibraryUpsertPayload(payload);
}

export function buildAdminEbookFormData(
	input: AdminEbookFormInput,
	files: AdminEbookUploadFiles = {}
) {
	const formData = new FormData();

	const releaseDate = input.releaseDate?.trim()
		? `${input.releaseDate.trim()}T00:00:00`
		: "";

	formData.append("Title", input.title.trim());
	formData.append("Author", input.author.trim());
	formData.append("Description", input.description.trim());
	formData.append("Category", input.category.trim());
	formData.append("Isbn", input.isbn.trim());
	formData.append("ReleaseDate", releaseDate);

	if (files.coverFile) {
		formData.append("Cover", files.coverFile);
	}

	if (files.pdfFile) {
		formData.append("File", files.pdfFile);
	}

	return formData;
}

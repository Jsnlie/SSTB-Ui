import { books } from "./perpustakaan";

export type EbookStatus = "Published" | "Draft";

export interface AdminEbookItem {
	id: number;
	title: string;
	author: string;
	category: string;
	isbn: string;
	releaseDate: string;
	cover: string;
	description: string;
	status: EbookStatus;
}

export const adminEbookDummyData: AdminEbookItem[] = books.map((book, index) => ({
	id: book.id,
	title: book.title,
	author: book.author,
	category: book.category,
	isbn: book.isbn,
	releaseDate: book.releaseDate,
	cover: book.cover,
	description: book.description,
	status: index % 3 === 0 ? "Draft" : "Published",
}));

export const adminEbookCategories = Array.from(
	new Set(adminEbookDummyData.map((item) => item.category))
).sort((a, b) => a.localeCompare(b));

export function getAdminEbookById(id: number) {
	return adminEbookDummyData.find((item) => item.id === id) ?? null;
}

export function getTotalAdminEbook() {
	return adminEbookDummyData.length;
}

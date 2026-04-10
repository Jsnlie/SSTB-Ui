export type AdminMediaSection = "article" | "journal" | "bulletin" | "monograph" | "video";
export type AdminMediaStatus = "Published" | "Draft";

export interface AdminMediaSectionConfig {
	section: AdminMediaSection;
	label: string;
	menuLabel: string;
	singularLabel: string;
	pluralLabel: string;
	isVideo: boolean;
}

export interface AdminMediaContentItem {
	id: number;
	title: string;
	author: string;
	category: string;
	referenceCode: string;
	releaseDate: string;
	description: string;
	status: AdminMediaStatus;
	cover: string;
	attachmentName: string;
}

export interface AdminMediaVideoItem {
	id: number;
	title: string;
	youtubeUrl: string;
	description: string;
	status: AdminMediaStatus;
}

export const adminMediaSectionConfigs: AdminMediaSectionConfig[] = [
	{ section: "article", label: "Artikel", menuLabel: "Artikel", singularLabel: "Artikel", pluralLabel: "Artikel", isVideo: false },
	{ section: "journal", label: "Jurnal", menuLabel: "Jurnal", singularLabel: "Jurnal", pluralLabel: "Jurnal", isVideo: false },
	{ section: "bulletin", label: "Bulletin", menuLabel: "Bulletin", singularLabel: "Bulletin", pluralLabel: "Bulletin", isVideo: false },
	{ section: "monograph", label: "Monograf", menuLabel: "Monograf", singularLabel: "Monograf", pluralLabel: "Monograf", isVideo: false },
	{ section: "video", label: "Video", menuLabel: "Video", singularLabel: "Video", pluralLabel: "Video", isVideo: true },
];

const contentCategories: Record<Exclude<AdminMediaSection, "video">, string[]> = {
	article: ["Teologi", "Pendidikan", "Gereja"],
	journal: ["Ilmiah", "Editorial", "Riset"],
	bulletin: ["Pengumuman", "Kegiatan", "Beasiswa"],
	monograph: ["Kajian", "Doktrin", "Sejarah"],
};

function buildContentItem(
	id: number,
	title: string,
	author: string,
	category: string,
	referenceCode: string,
	releaseDate: string,
	description: string,
	status: AdminMediaStatus,
	cover: string,
	attachmentName: string
): AdminMediaContentItem {
	return { id, title, author, category, referenceCode, releaseDate, description, status, cover, attachmentName };
}

export const adminMediaContentDummyData: Record<Exclude<AdminMediaSection, "video">, AdminMediaContentItem[]> = {
	article: [
		buildContentItem(1, "Tradisi Liturgi dalam Ruang Kota", "Admin", "Teologi", "ART-2026-001", "2026-01-12", "Analisis singkat mengenai adaptasi bahasa liturgi dalam konteks pelayanan urban modern.", "Published", "https://images.unsplash.com/photo-1455885666463-047d7c3f1c1b?auto=format&fit=crop&q=80", "Naskah Artikel.pdf"),
		buildContentItem(2, "Pembinaan Iman untuk Generasi Muda", "Tim Redaksi", "Pendidikan", "ART-2026-002", "2026-02-05", "Ringkasan praktis tentang pendekatan pembinaan iman yang relevan untuk gereja lokal.", "Draft", "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80", "Artikel Pembinaan.pdf"),
		buildContentItem(3, "Etika Pelayanan di Era Digital", "Admin", "Gereja", "ART-2026-003", "2026-03-21", "Catatan editorial mengenai etika komunikasi dan pelayanan dalam ruang digital yang terus berkembang.", "Published", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80", "Lampiran Artikel.pdf"),
	],
	journal: [
		buildContentItem(1, "Journal of Applied Theology Vol. 12", "Editor", "Ilmiah", "JRN-2025-012", "2025-11-23", "Edisi jurnal ilmiah yang mengangkat topik hermeneutika dan pelayanan kontekstual.", "Published", "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80", "Jurnal Vol 12.pdf"),
		buildContentItem(2, "Prosiding Studi Alkitab dan Konteks", "Tim Editorial", "Riset", "JRN-2025-013", "2025-12-18", "Kumpulan tulisan riset yang siap diterbitkan pada periode berikutnya.", "Draft", "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80", "Prosiding Jurnal.pdf"),
		buildContentItem(3, "Editorial Notes for Ministry Practice", "Editor", "Editorial", "JRN-2026-001", "2026-01-14", "Catatan redaksi tentang isu-isu yang paling sering muncul dalam pelayanan lapangan.", "Published", "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&q=80", "Editorial Notes.pdf"),
	],
	bulletin: [
		buildContentItem(1, "Bulletin Semester Genap 2026", "Admin", "Pengumuman", "BLT-2026-001", "2026-02-01", "Informasi ringkas seputar agenda kampus, kegiatan, dan pengumuman penting semester ini.", "Published", "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80", "Bulletin Semester Genap.pdf"),
		buildContentItem(2, "Pendaftaran Beasiswa Internal", "Admin", "Beasiswa", "BLT-2026-002", "2026-02-20", "Pengumuman terkait jadwal, alur, dan persyaratan beasiswa internal institusi.", "Draft", "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80", "Beasiswa Internal.pdf"),
		buildContentItem(3, "Agenda Kegiatan Kampus Maret", "Sekretariat", "Kegiatan", "BLT-2026-003", "2026-03-02", "Daftar agenda kegiatan, seminar, dan pertemuan yang dijadwalkan selama Maret.", "Published", "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80", "Agenda Maret.pdf"),
	],
	monograph: [
		buildContentItem(1, "Monograf Sejarah Gereja Lokal", "Dr. Mikael", "Sejarah", "MON-2024-001", "2024-08-19", "Kajian panjang mengenai perkembangan komunitas gereja lokal dalam tiga dekade terakhir.", "Published", "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80", "Monograf Sejarah.pdf"),
		buildContentItem(2, "Kajian Doktrinal tentang Karunia Rohani", "Pdt. Andreas", "Doktrin", "MON-2024-002", "2024-10-07", "Monograf singkat tentang prinsip doktrinal dan penerapannya dalam pembinaan jemaat.", "Draft", "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80", "Kajian Doktrinal.pdf"),
		buildContentItem(3, "Refleksi Teologi Praktis untuk Pelayanan", "Tim Penulis", "Kajian", "MON-2025-001", "2025-01-15", "Refleksi konseptual mengenai hubungan antara teologi praktis dan kebutuhan pelayanan kontemporer.", "Published", "https://images.unsplash.com/photo-1516942271756-2d4a2c8b2f5f?auto=format&fit=crop&q=80", "Refleksi Teologi.pdf"),
	],
};

export const adminMediaVideoDummyData: AdminMediaVideoItem[] = [
	{ id: 1, title: "Klip Pembukaan Seminar Teologi", youtubeUrl: "https://youtu.be/dQw4w9WgXcQ", description: "Cuplikan pembukaan seminar sebagai placeholder konten video.", status: "Published" },
	{ id: 2, title: "Rangkuman Kegiatan Kampus", youtubeUrl: "https://www.youtube.com/watch?v=oHg5SJYRHA0", description: "Video ringkas aktivitas kampus yang dipakai untuk dummy data.", status: "Draft" },
	{ id: 3, title: "Testimoni Layanan Akademik", youtubeUrl: "https://youtu.be/9bZkp7q19f0", description: "Placeholder video untuk materi promosi dan dokumentasi internal.", status: "Published" },
];

export function getAdminMediaSectionConfig(section: string) {
	return adminMediaSectionConfigs.find((item) => item.section === section) ?? null;
}

export function getAdminMediaContentItems(section: Exclude<AdminMediaSection, "video">) {
	return adminMediaContentDummyData[section];
}

export function getAdminMediaVideoItems() {
	return adminMediaVideoDummyData;
}

export function getAdminMediaContentById(section: Exclude<AdminMediaSection, "video">, id: number) {
	return adminMediaContentDummyData[section].find((item) => item.id === id) ?? null;
}

export function getAdminMediaVideoById(id: number) {
	return adminMediaVideoDummyData.find((item) => item.id === id) ?? null;
}

export function getAdminMediaCategories(section: Exclude<AdminMediaSection, "video">) {
	return contentCategories[section];
}

export function getTotalAdminMedia() {
	const contentTotal = Object.values(adminMediaContentDummyData).reduce(
		(total, items) => total + items.length,
		0
	);

	return contentTotal + adminMediaVideoDummyData.length;
}

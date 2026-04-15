import { apiUrlCandidates } from "./api";
import { getErrorMessage, normalizeArray, toNumberSafe, toStringSafe } from "./response";

export type AdminMediaSection = "article" | "video" | "journal" | "bulletin" | "monograph";
export type MediaType = AdminMediaSection;

export interface AdminMediaSectionConfig {
	section: AdminMediaSection;
	label: string;
	menuLabel: string;
	singularLabel: string;
	pluralLabel: string;
	isVideo: boolean;
}

export interface CategoryResponse {
	id: number;
	name: string;
	medias: MediaResponse[];
}

interface MediaCore {
	id: number;
	title: string;
	slug: string;
	type: MediaType;
	categoryId: number;
	category: string;
	coverImage: string;
	publishedAt: string;
	author?: string;
	description?: string;
        shortDescription?: string;
	isbn?: string;
}

export interface ArticleDetail {
	id: number;
	mediaId: number;
	media: string;
	author: string;
	authorImage: string;
	authorDescription: string;
	tagline: string;
	content: string;
	fileUrl?: string;
}

export interface VideoDetail {
	id: number;
	mediaId: number;
	media: string;
	youtubeUrl: string;
	theme: string;
	description: string;
}

export interface JournalDetail {
	id: number;
	mediaId: number;
	media: string;
	fileUrl: string;
}

export interface BulletinDetail {
	id: number;
	mediaId: number;
	media: string;
	author: string;
	fileUrl: string;
	titleDescription: string;
	description: string;
}

export interface MonographDetail {
	id: number;
	mediaId: number;
	media: string;
	author: string;
	image: string;
	descriptionTitle: string;
	writer: string;
	synopsis: string;
	isbn: string;
}

interface MediaWithOptionalDetails {
	article?: ArticleDetail | null;
	video?: VideoDetail | null;
	journal?: JournalDetail | null;
	bulletin?: BulletinDetail | null;
	monograph?: MonographDetail | null;
}

export type ArticleMediaResponse = MediaCore & {
	type: "article";
	article: ArticleDetail | null;
} & MediaWithOptionalDetails;

export type VideoMediaResponse = MediaCore & {
	type: "video";
	video: VideoDetail | null;
} & MediaWithOptionalDetails;

export type JournalMediaResponse = MediaCore & {
	type: "journal";
	journal: JournalDetail | null;
} & MediaWithOptionalDetails;

export type BulletinMediaResponse = MediaCore & {
	type: "bulletin";
	bulletin: BulletinDetail | null;
} & MediaWithOptionalDetails;

export type MonographMediaResponse = MediaCore & {
	type: "monograph";
	monograph: MonographDetail | null;
} & MediaWithOptionalDetails;

export type MediaResponse =
	| ArticleMediaResponse
	| VideoMediaResponse
	| JournalMediaResponse
	| BulletinMediaResponse
	| MonographMediaResponse;

export type MediaRequest = {
	type: MediaType;
	title: string;
	categoryId: number;
	coverImage: string;
	publishedAt: string;
	author: string;
	authorImage: string;
	authorDescription: string;
	tagline: string;
	content: string;
	youtubeUrl: string;
	videoTheme: string;
	videoDescription: string;
	fileUrl: string;
	titleDescription: string;
	description: string;
	image: string;
	descriptionTitle: string;
	writer: string;
	synopsis: string;
	isbn: string;
};

export type MediaTypeFieldMap = {
	article: Pick<MediaRequest, "author" | "authorImage" | "authorDescription" | "tagline" | "content">;
	video: Pick<MediaRequest, "youtubeUrl" | "videoTheme" | "videoDescription">;
	journal: Pick<MediaRequest, "fileUrl">;
	bulletin: Pick<MediaRequest, "author" | "titleDescription" | "description" | "fileUrl">;
	monograph: Pick<MediaRequest, "author" | "image" | "descriptionTitle" | "writer" | "synopsis" | "isbn">;
};

export type MediaDetailByType = {
	article: ArticleDetail;
	video: VideoDetail;
	journal: JournalDetail;
	bulletin: BulletinDetail;
	monograph: MonographDetail;
};

export type MediaFormInput = {
	type: MediaType;
	title: string;
	categoryId: number;
	coverImage: string;
	publishedAt: string;
	author: string;
	authorImage: string;
	authorDescription: string;
	tagline: string;
	content: string;
	youtubeUrl: string;
	videoTheme: string;
	videoDescription: string;
	fileUrl: string;
	titleDescription: string;
	description: string;
	image: string;
	descriptionTitle: string;
	writer: string;
	synopsis: string;
	isbn: string;
};

export const adminMediaSectionConfigs: AdminMediaSectionConfig[] = [
	{ section: "article", label: "Artikel", menuLabel: "Artikel", singularLabel: "Artikel", pluralLabel: "Artikel", isVideo: false },
	{ section: "journal", label: "Jurnal", menuLabel: "Jurnal", singularLabel: "Jurnal", pluralLabel: "Jurnal", isVideo: false },
	{ section: "bulletin", label: "Bulletin", menuLabel: "Bulletin", singularLabel: "Bulletin", pluralLabel: "Bulletin", isVideo: false },
	{ section: "monograph", label: "Monograf", menuLabel: "Monograf", singularLabel: "Monograf", pluralLabel: "Monograf", isVideo: false },
	{ section: "video", label: "Video", menuLabel: "Video", singularLabel: "Video", pluralLabel: "Video", isVideo: true },
];

const RELEVANT_FIELDS_BY_TYPE: Record<MediaType, readonly string[]> = {
	article: ["author", "authorImage", "authorDescription", "tagline", "content"],
	video: ["youtubeUrl", "videoTheme", "videoDescription"],
	journal: ["fileUrl"],
	bulletin: ["author", "titleDescription", "description", "fileUrl"],
	monograph: ["author", "image", "descriptionTitle", "writer", "synopsis", "isbn"],
};

const REQUIRED_FIELDS_BY_TYPE: Record<MediaType, readonly string[]> = {
	article: ["title", "categoryId", "content", "author"],
	video: ["title", "categoryId", "youtubeUrl"],
	journal: ["title", "categoryId", "fileUrl"],
	bulletin: ["title", "categoryId", "author", "fileUrl"],
	monograph: ["title", "categoryId", "author", "image", "descriptionTitle", "writer", "synopsis", "isbn"],
};

function parseNullableObject<T>(value: unknown): T | null {
	if (!value || typeof value !== "object") return null;
	return value as T;
}

function unwrapObject(value: unknown): Record<string, unknown> {
	if (!value || typeof value !== "object") return {};
	const source = value as Record<string, unknown>;

	if (source.data && typeof source.data === "object" && !Array.isArray(source.data)) {
		return source.data as Record<string, unknown>;
	}

	if (source.item && typeof source.item === "object" && !Array.isArray(source.item)) {
		return source.item as Record<string, unknown>;
	}

	return source;
}

function pickUnknown(source: Record<string, unknown>, keys: string[]) {
	for (const key of keys) {
		if (key in source) return source[key];
	}
	return undefined;
}

function pickStringFrom(source: Record<string, unknown>, keys: string[]) {
	const picked = pickUnknown(source, keys);
	if (typeof picked === "string") return picked;
	if (typeof picked === "number" || typeof picked === "boolean") return String(picked);
	return "";
}

function pickNumberFrom(source: Record<string, unknown>, keys: string[]) {
	return toNumberSafe(pickUnknown(source, keys));
}

function pickUrlFrom(source: Record<string, unknown>, keys: string[]) {
	const picked = pickUnknown(source, keys);

	if (typeof picked === "string") return picked;
	if (!picked || typeof picked !== "object") return "";

	const nested = picked as Record<string, unknown>;
	for (const key of [
		"url",
		"Url",
		"path",
		"Path",
		"fileUrl",
		"FileUrl",
		"pdfUrl",
		"PdfUrl",
		"downloadUrl",
		"DownloadUrl",
		"href",
		"Href",
	]) {
		const value = nested[key];
		if (typeof value === "string" && value.trim()) return value;
	}

	return "";
}

function parseArticleDetail(value: unknown): ArticleDetail | null {
	const source = unwrapObject(value);
	if (Object.keys(source).length === 0) return null;

	return {
		id: pickNumberFrom(source, ["id", "Id"]),
		mediaId: pickNumberFrom(source, ["mediaId", "MediaId"]),
		media: pickStringFrom(source, ["media", "Media"]),
		author: pickStringFrom(source, ["author", "Author"]),
		authorImage: pickStringFrom(source, ["authorImage", "AuthorImage"]),
		authorDescription: pickStringFrom(source, ["authorDescription", "AuthorDescription"]),
		tagline: pickStringFrom(source, ["tagline", "Tagline"]),
		content: pickStringFrom(source, ["content", "Content"]),
		fileUrl: pickUrlFrom(source, ["fileUrl", "FileUrl", "pdfUrl", "PdfUrl", "documentUrl", "DocumentUrl", "file", "File", "attachment", "Attachment"]),
	};
}

function parseVideoDetail(value: unknown): VideoDetail | null {
	const source = unwrapObject(value);
	if (Object.keys(source).length === 0) return null;

	return {
		id: pickNumberFrom(source, ["id", "Id"]),
		mediaId: pickNumberFrom(source, ["mediaId", "MediaId"]),
		media: pickStringFrom(source, ["media", "Media"]),
		youtubeUrl: pickUrlFrom(source, ["youtubeUrl", "YoutubeUrl", "youTubeUrl", "YouTubeUrl", "url", "Url", "link", "Link"]),
		theme: pickStringFrom(source, ["theme", "Theme"]),
		description: pickStringFrom(source, ["description", "Description"]),
	};
}

function parseJournalDetail(value: unknown): JournalDetail | null {
	const source = unwrapObject(value);
	if (Object.keys(source).length === 0) return null;

	return {
		id: pickNumberFrom(source, ["id", "Id"]),
		mediaId: pickNumberFrom(source, ["mediaId", "MediaId"]),
		media: pickStringFrom(source, ["media", "Media"]),
		fileUrl: pickUrlFrom(source, ["fileUrl", "FileUrl", "pdfUrl", "PdfUrl", "documentUrl", "DocumentUrl", "attachmentUrl", "AttachmentUrl", "url", "Url", "file", "File", "attachment", "Attachment", "content", "Content", "filePath", "FilePath"]),
	};
}

function parseBulletinDetail(value: unknown): BulletinDetail | null {
	const source = unwrapObject(value);
	if (Object.keys(source).length === 0) return null;

	return {
		id: pickNumberFrom(source, ["id", "Id"]),
		mediaId: pickNumberFrom(source, ["mediaId", "MediaId"]),
		media: pickStringFrom(source, ["media", "Media"]),
		author: pickStringFrom(source, ["author", "Author"]),
		fileUrl: pickUrlFrom(source, ["fileUrl", "FileUrl", "pdfUrl", "PdfUrl", "documentUrl", "DocumentUrl", "attachmentUrl", "AttachmentUrl", "url", "Url", "file", "File", "attachment", "Attachment", "content", "Content", "filePath", "FilePath"]),
		titleDescription: pickStringFrom(source, ["titleDescription", "TitleDescription"]),
		description: pickStringFrom(source, ["description", "Description"]),
	};
}

function parseMonographDetail(value: unknown): MonographDetail | null {
	const source = unwrapObject(value);
	if (Object.keys(source).length === 0) return null;

	return {
		id: pickNumberFrom(source, ["id", "Id"]),
		mediaId: pickNumberFrom(source, ["mediaId", "MediaId"]),
		media: pickStringFrom(source, ["media", "Media"]),
		author: pickStringFrom(source, ["author", "Author"]),
		image: pickStringFrom(source, ["image", "Image"]),
		descriptionTitle: pickStringFrom(source, ["descriptionTitle", "DescriptionTitle"]),
		writer: pickStringFrom(source, ["writer", "Writer"]),
		synopsis: pickStringFrom(source, ["synopsis", "Synopsis"]),
		isbn: pickStringFrom(source, ["isbn", "ISBN", "Isbn"]),
	};
}

function parseMediaType(value: unknown): MediaType {
	const normalized = toStringSafe(value).toLowerCase();
	if (
		normalized === "article" ||
		normalized === "video" ||
		normalized === "journal" ||
		normalized === "bulletin" ||
		normalized === "monograph"
	) {
		return normalized;
	}

	return "article";
}

function parseMediaResponse(item: unknown): MediaResponse {
	const source = unwrapObject(item);
	const type = parseMediaType(
		pickUnknown(source, ["type", "Type", "mediaType", "MediaType"])
	);
	const categorySource = parseNullableObject<Record<string, unknown>>(
		pickUnknown(source, ["category", "Category"])
	);

	const base: MediaCore = {
		id: pickNumberFrom(source, ["id", "Id"]),
		title: pickStringFrom(source, ["title", "Title"]),
		slug: pickStringFrom(source, ["slug", "Slug"]),
		type,
		categoryId:
			pickNumberFrom(source, ["categoryId", "CategoryId"]) ||
			(categorySource ? pickNumberFrom(categorySource, ["id", "Id"]) : 0),
		category:
			pickStringFrom(source, ["categoryName", "CategoryName", "category", "Category"]) ||
			(categorySource ? pickStringFrom(categorySource, ["name", "Name"]) : ""),
		coverImage: pickStringFrom(source, ["coverImage", "CoverImage", "image", "Image"]),
		publishedAt: pickStringFrom(source, ["publishedAt", "PublishedAt", "releaseDate", "ReleaseDate", "createdAt", "CreatedAt"]),
		author: pickStringFrom(source, ["author", "Author", "theme", "Theme", "writer", "Writer"]),
		description: pickStringFrom(source, ["description", "Description", "tagline", "Tagline", "synopsis", "Synopsis"]),
		isbn: pickStringFrom(source, ["isbn", "Isbn", "ISBN"]),
	};

	const article = parseArticleDetail(
		pickUnknown(source, ["article", "Article", "articleDetail", "ArticleDetail"])
	);
	const video = parseVideoDetail(
		pickUnknown(source, ["video", "Video", "videoDetail", "VideoDetail"])
	);
	const journal = parseJournalDetail(
		pickUnknown(source, ["journal", "Journal", "journalDetail", "JournalDetail"])
	);
	const bulletin = parseBulletinDetail(
		pickUnknown(source, ["bulletin", "Bulletin", "bulletinDetail", "BulletinDetail"])
	);
	const monograph = parseMonographDetail(
		pickUnknown(source, ["monograph", "Monograph", "monographDetail", "MonographDetail"])
	);

	return {
		...base,
		article,
		video,
		journal,
		bulletin,
		monograph,
	} as MediaResponse;
}

function parseCategoryResponse(item: unknown): CategoryResponse {
	const source = (item ?? {}) as Record<string, unknown>;
	return {
		id: toNumberSafe(source.id),
		name: toStringSafe(source.name),
		medias: normalizeArray<unknown>(source.medias).map(parseMediaResponse),
	};
}

function getDefaultHeaders(withJson: boolean, includeToken = true): HeadersInit {
	const headers: HeadersInit = withJson
		? { "Content-Type": "application/json" }
		: {};

	if (includeToken && typeof window !== "undefined") {
		const token = window.localStorage.getItem("token");
		if (token) {
			(headers as Record<string, string>).Authorization = `Bearer ${token}`;
		}
	}

	return headers;
}

async function request(path: string, init: RequestInit, fallbackMessage: string) {
	const isProxyPath = path.startsWith("/api/proxy/");
	const candidates = isProxyPath ? [path] : apiUrlCandidates(path);
	let lastNetworkError: unknown = null;

	for (const url of candidates) {
		try {
			const response = await fetch(url, {
				cache: "no-store",
				...init,
			});

			if (!response.ok) {
				if (response.status === 401 || response.status === 403) {
					throw new Error("Sesi login tidak valid atau sudah habis. Silakan login ulang.");
				}
				const text = await response.text().catch(() => "");
				throw new Error(getErrorMessage(text, `${fallbackMessage} (HTTP ${response.status})`));
			}

			if (response.status === 204) {
				return null;
			}

			const text = await response.text().catch(() => "");
			if (!text) return null;

			try {
				return JSON.parse(text);
			} catch {
				return null;
			}
		} catch (error) {
			if (error instanceof Error && error.name !== "TypeError") {
				throw error;
			}
			lastNetworkError = error;
		}
	}

	if (lastNetworkError instanceof Error) {
		throw new Error(
			"Tidak dapat terhubung ke API (network error). Pastikan backend aktif, URL NEXT_PUBLIC_API_BASE_URL benar, CORS mengizinkan origin frontend, dan sertifikat HTTPS localhost sudah trusted."
		);
	}

	throw new Error(fallbackMessage);
}

async function requestWithPathFallback(
	paths: string[],
	init: RequestInit,
	fallbackMessage: string
) {
	let lastError: unknown = null;

	for (const path of paths) {
		try {
			return await request(path, init, fallbackMessage);
		} catch (error) {
			lastError = error;
		}
	}

	if (lastError instanceof Error) {
		throw lastError;
	}

	throw new Error(fallbackMessage);
}

function categoryPaths(base: "list" | "detail", id?: number) {
	if (base === "list") {
		return ["/api/categories", "/api/category"];
	}

	if (!id || id <= 0) {
		return ["/api/categories/0", "/api/category/0"];
	}

	return [`/api/categories/${id}`, `/api/category/${id}`];
}

export function getAdminMediaSectionConfig(section: string) {
	return adminMediaSectionConfigs.find((item) => item.section === section) ?? null;
}

export function getRelevantFieldsByType(type: MediaType) {
	return RELEVANT_FIELDS_BY_TYPE[type];
}

export function getRequiredFieldsByType(type: MediaType) {
	return REQUIRED_FIELDS_BY_TYPE[type];
}

export function getMediaDetail<TType extends MediaType>(
	media: MediaResponse,
	type?: TType
): MediaDetailByType[TType] | MediaDetailByType[MediaType] | null {
	const targetType = type ?? media.type;

	switch (targetType) {
		case "article":
			return media.article ?? null;
		case "video":
			return media.video ?? null;
		case "journal":
			return media.journal ?? null;
		case "bulletin":
			return media.bulletin ?? null;
		case "monograph":
			return media.monograph ?? null;
		default:
			return null;
	}
}

export function createDefaultMediaForm(type: MediaType, categoryId?: number): MediaFormInput {
	return {
		type,
		title: "",
		categoryId: categoryId ?? 0,
		coverImage: "",
		publishedAt: new Date().toISOString(),
		author: "",
		authorImage: "",
		authorDescription: "",
		tagline: "",
		content: "",
		youtubeUrl: "",
		videoTheme: "",
		videoDescription: "",
		fileUrl: "",
		titleDescription: "",
		description: "",
		image: "",
		descriptionTitle: "",
		writer: "",
		synopsis: "",
		isbn: "",
	};
}

export function buildMediaFormFromResponse(media: MediaResponse): MediaFormInput {
	const form = createDefaultMediaForm(media.type, media.categoryId);
	form.title = media.title;
	form.coverImage = media.coverImage;
	form.publishedAt = media.publishedAt || new Date().toISOString();

	const detail = getMediaDetail(media);
	if (!detail) return form;

	if (media.type === "article") {
		form.author = media.article?.author ?? "";
		form.authorImage = media.article?.authorImage ?? "";
		form.authorDescription = media.article?.authorDescription ?? "";
		form.tagline = media.article?.tagline ?? "";
		form.content = media.article?.content ?? "";
	}

	if (media.type === "video") {
		form.youtubeUrl = media.video?.youtubeUrl ?? "";
		form.videoTheme = media.video?.theme ?? "";
		form.videoDescription = media.video?.description ?? "";
	}

	if (media.type === "journal") {
		form.fileUrl = media.journal?.fileUrl ?? "";
	}

	if (media.type === "bulletin") {
		form.author = media.bulletin?.author ?? "";
		form.titleDescription = media.bulletin?.titleDescription ?? "";
		form.description = media.bulletin?.description ?? "";
		form.fileUrl = media.bulletin?.fileUrl ?? "";
	}

	if (media.type === "monograph") {
		form.author = media.monograph?.author ?? "";
		form.image = media.monograph?.image ?? "";
		form.descriptionTitle = media.monograph?.descriptionTitle ?? "";
		form.writer = media.monograph?.writer ?? "";
		form.synopsis = media.monograph?.synopsis ?? "";
		form.isbn = media.monograph?.isbn ?? "";
	}

	return form;
}

export function buildMediaPayload(type: MediaType, formData: MediaFormInput): MediaRequest {
	return {
		type,
		title: formData.title.trim(),
		categoryId: toNumberSafe(formData.categoryId),
		coverImage: formData.coverImage.trim(),
		publishedAt: formData.publishedAt || new Date().toISOString(),
		author: formData.author.trim(),
		authorImage: formData.authorImage.trim(),
		authorDescription: formData.authorDescription.trim(),
		tagline: formData.tagline.trim(),
		content: formData.content.trim(),
		youtubeUrl: formData.youtubeUrl.trim(),
		videoTheme: formData.videoTheme.trim(),
		videoDescription: formData.videoDescription.trim(),
		fileUrl: formData.fileUrl.trim(),
		titleDescription: formData.titleDescription.trim(),
		description: formData.description.trim(),
		image: formData.image.trim(),
		descriptionTitle: formData.descriptionTitle.trim(),
		writer: formData.writer.trim(),
		synopsis: formData.synopsis.trim(),
		isbn: formData.isbn.trim(),
	};
}

export function validateMediaForm(type: MediaType, formData: MediaFormInput) {
	const errors: string[] = [];

	for (const field of REQUIRED_FIELDS_BY_TYPE[type]) {
		const value = formData[field as keyof MediaFormInput];
		const isMissing =
			field === "categoryId"
				? toNumberSafe(value) <= 0
				: !toStringSafe(value).trim();

		if (isMissing) {
			errors.push(`Field ${field} wajib diisi untuk tipe ${type}.`);
		}
	}

	return errors;
}

export function filterCategoryMediasByType(category: CategoryResponse | null, type: MediaType) {
	if (!category) return [];
	return category.medias.filter((media) => media.type === type);
}

export function groupMediaByType(medias: MediaResponse[]) {
	return medias.reduce<Record<MediaType, MediaResponse[]>>(
		(acc, media) => {
			acc[media.type].push(media);
			return acc;
		},
		{ article: [], video: [], journal: [], bulletin: [], monograph: [] }
	);
}

export function groupCategoryMediasByType(category: CategoryResponse | null) {
	if (!category) {
		return { article: [], video: [], journal: [], bulletin: [], monograph: [] };
	}

	return groupMediaByType(category.medias);
}

export function selectMediaByCategoryId(medias: MediaResponse[], categoryId: number) {
	return medias.filter((media) => media.categoryId === categoryId);
}

export function selectMediaByType(medias: MediaResponse[], type: MediaType) {
	return medias.filter((media) => media.type === type);
}

export function parseMediaListResponse(payload: unknown) {
	return normalizeArray<unknown>(payload).map(parseMediaResponse);
}

export function parseCategoryListResponse(payload: unknown) {
	return normalizeArray<unknown>(payload).map(parseCategoryResponse);
}

export async function getCategories() {
	const json = await requestWithPathFallback(
		categoryPaths("list"),
		{ method: "GET", headers: getDefaultHeaders(false) },
		"Gagal memuat data kategori media"
	);
	return parseCategoryListResponse(json);
}

export async function getCategoryById(id: number) {
	const json = await requestWithPathFallback(
		categoryPaths("detail", id),
		{ method: "GET", headers: getDefaultHeaders(false) },
		"Gagal memuat detail kategori"
	);

	if (!json) return null;
	return parseCategoryResponse(json);
}

export async function createCategory(payload: { name: string }, endpointId?: number) {
	const paths = Number.isFinite(endpointId)
		? [`/api/categories/${endpointId}`, `/api/category/${endpointId}`]
		: categoryPaths("list");

	const json = await requestWithPathFallback(
		paths,
		{
			method: "POST",
			headers: getDefaultHeaders(true),
			body: JSON.stringify({ name: payload.name.trim() }),
		},
		"Gagal membuat kategori"
	);

	if (!json) return null;
	return parseCategoryResponse(json);
}

export async function updateCategory(id: number, payload: { name: string }) {
	const json = await requestWithPathFallback(
		categoryPaths("detail", id),
		{
			method: "PUT",
			headers: getDefaultHeaders(true),
			body: JSON.stringify({ name: payload.name.trim() }),
		},
		"Gagal memperbarui kategori"
	);

	if (!json) return null;
	return parseCategoryResponse(json);
}

export async function deleteCategory(id: number) {
	await requestWithPathFallback(
		categoryPaths("detail", id),
		{ method: "DELETE", headers: getDefaultHeaders(false) },
		"Gagal menghapus kategori"
	);
}

export async function getMedias(filters?: { type?: MediaType; categoryId?: number }) {
	const params = new URLSearchParams();
	if (filters?.type) params.set("type", filters.type);
	if (filters?.categoryId && filters.categoryId > 0) {
		params.set("categoryId", String(filters.categoryId));
	}

	const query = params.size > 0 ? `?${params.toString()}` : "";
	const json = await request(
		`/api/media${query}`,
		{ method: "GET", headers: getDefaultHeaders(false) },
		"Gagal memuat data media"
	);

	return parseMediaListResponse(json);
}

export async function getMediaById(id: number | string) {
	const identifier = encodeURIComponent(String(id).trim());
	if (!identifier) {
		throw new Error("ID media tidak valid");
	}

	const json = await request(
		`/api/media/${identifier}`,
		{ method: "GET", headers: getDefaultHeaders(false) },
		"Gagal memuat detail media"
	);

	if (!json) return null;
	return parseMediaResponse(json);
}

export async function createMedia(payload: MediaRequest) {
	const json = await request(
		"/api/media",
		{
			method: "POST",
			headers: getDefaultHeaders(true),
			body: JSON.stringify(payload),
		},
		"Gagal membuat media"
	);

	if (!json) return null;
	return parseMediaResponse(json);
}

export async function updateMedia(id: number | string, payload: MediaRequest) {
	const identifier = encodeURIComponent(String(id).trim());
	if (!identifier) {
		throw new Error("ID media tidak valid");
	}

	const json = await request(
		`/api/media/${identifier}`,
		{
			method: "PUT",
			headers: getDefaultHeaders(true),
			body: JSON.stringify(payload),
		},
		"Gagal memperbarui media"
	);

	if (!json) return null;
	return parseMediaResponse(json);
}

export async function deleteMedia(id: number) {
	await request(
		`/api/media/${id}`,
		{ method: "DELETE", headers: getDefaultHeaders(false) },
		"Gagal menghapus media"
	);
}

export function getTotalAdminMedia() {
	return 0;
}

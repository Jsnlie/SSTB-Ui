import { apiUrlCandidates } from "./api";

function toHeadersObject(headers: HeadersInit | undefined) {
	return new Headers(headers);
}

async function readResponseBody(response: Response) {
	if (response.status === 204) {
		return { body: null, headers: response.headers, status: response.status };
	}

	const text = await response.text().catch(() => "");
	return { body: text, headers: response.headers, status: response.status };
}

export async function proxyBackendRequest(path: string, init: RequestInit) {
	const candidates = apiUrlCandidates(path);
	let lastError: unknown = null;

	for (const url of candidates) {
		try {
			const response = await fetch(url, init);
			return await readResponseBody(response);
		} catch (error) {
			lastError = error;
		}
	}

	if (lastError instanceof Error) {
		throw lastError;
	}

	throw new Error("Tidak dapat terhubung ke backend media.");
}

export function proxyRequestHeaders(request: Request) {
	const headers = new Headers();
	const authorization = request.headers.get("authorization");
	const contentType = request.headers.get("content-type");

	if (authorization) headers.set("authorization", authorization);
	if (contentType) headers.set("content-type", contentType);

	return headers;
}

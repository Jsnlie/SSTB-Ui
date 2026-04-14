import { NextResponse } from "next/server";
import { proxyBackendRequest, proxyRequestHeaders } from "../../../../lib/backend-proxy";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const query = url.search ? url.search : "";
	const path = `/api/media${query}`;

	const { body, headers, status } = await proxyBackendRequest(path, {
		method: "GET",
		headers: proxyRequestHeaders(request),
		cache: "no-store",
	});

	return new NextResponse(body, {
		status,
		headers,
	});
}

export async function POST(request: Request) {
	const body = await request.text();
	const { body: responseBody, headers, status } = await proxyBackendRequest("/api/media", {
		method: "POST",
		headers: proxyRequestHeaders(request),
		body,
	});

	return new NextResponse(responseBody, {
		status,
		headers,
	});
}

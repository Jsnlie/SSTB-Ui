import { NextResponse } from "next/server";
import { proxyBackendRequest, proxyRequestHeaders } from "../../../../../lib/backend-proxy";

type RouteContext = {
	params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
	const { id } = await context.params;
	const { body, headers, status } = await proxyBackendRequest(`/api/media/${id}`, {
		method: "GET",
		headers: proxyRequestHeaders(request),
		cache: "no-store",
	});

	return new NextResponse(body, {
		status,
		headers,
	});
}

export async function PUT(request: Request, context: RouteContext) {
	const { id } = await context.params;
	const body = await request.text();
	const { body: responseBody, headers, status } = await proxyBackendRequest(`/api/media/${id}`, {
		method: "PUT",
		headers: proxyRequestHeaders(request),
		body,
	});

	return new NextResponse(responseBody, {
		status,
		headers,
	});
}

export async function DELETE(request: Request, context: RouteContext) {
	const { id } = await context.params;
	const { body, headers, status } = await proxyBackendRequest(`/api/media/${id}`, {
		method: "DELETE",
		headers: proxyRequestHeaders(request),
	});

	return new NextResponse(body, {
		status,
		headers,
	});
}

const DEFAULT_API_BASE_URL = "https://localhost:7013";

const baseApiUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;

const normalizedBaseApiUrl = baseApiUrl.endsWith("/")
  ? baseApiUrl.slice(0, -1)
  : baseApiUrl;

export function apiUrl(path: string) {
  if (!path) return normalizedBaseApiUrl;
  return path.startsWith("/")
    ? `${normalizedBaseApiUrl}${path}`
    : `${normalizedBaseApiUrl}/${path}`;
}

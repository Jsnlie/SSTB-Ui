const DEFAULT_API_BASE_URL = "https://localhost:7013";

const baseApiUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;

const normalizedBaseApiUrl = baseApiUrl.endsWith("/")
  ? baseApiUrl.slice(0, -1)
  : baseApiUrl;

function normalizePath(path: string) {
  if (!path) return "";
  return path.startsWith("/") ? path : `/${path}`;
}

function shouldProvideLocalhostHttpFallback(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === "localhost";
  } catch {
    return false;
  }
}

export function apiUrl(path: string) {
  const normalizedPath = normalizePath(path);
  if (!normalizedPath) return normalizedBaseApiUrl;
  return `${normalizedBaseApiUrl}${normalizedPath}`;
}

export function apiUrlCandidates(path: string) {
  const normalizedPath = normalizePath(path);
  const primary = normalizedPath
    ? `${normalizedBaseApiUrl}${normalizedPath}`
    : normalizedBaseApiUrl;

  if (!shouldProvideLocalhostHttpFallback(normalizedBaseApiUrl)) {
    return [primary];
  }

  const fallbackBase = normalizedBaseApiUrl.replace("https://", "http://");
  const fallback = normalizedPath ? `${fallbackBase}${normalizedPath}` : fallbackBase;
  return [primary, fallback];
}

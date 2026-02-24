import { appConfig } from "./config";

interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
}

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

function buildUrl(path: string): string {
  const base = appConfig.apiBaseUrl.replace(/\/$/, "");
  const normalizedPath = path.replace(/^\//, "");
  return `${base}/${normalizedPath}`;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  if (!appConfig.apiBaseUrl) {
    throw new Error("Missing VITE_API_BASE_URL for live API requests.");
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), appConfig.timeoutMs);

  try {
    const response = await fetch(buildUrl(path), {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
    });

    const raw = await response.text();
    const data = raw ? (JSON.parse(raw) as unknown) : null;

    if (!response.ok) {
      throw new ApiError(
        `Request failed with status ${response.status}`,
        response.status,
        data
      );
    }

    return data as T;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

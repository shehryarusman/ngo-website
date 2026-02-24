export const appConfig = {
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL ?? "").trim(),
  timeoutMs: Number(import.meta.env.VITE_API_TIMEOUT_MS ?? 12000),
};

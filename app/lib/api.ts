export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ??
  "https://femora-backend-v3hw.onrender.com"
).replace(/\/+$/, "");

export const AUTH_TOKEN_KEY = "femora.auth.token";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
  const responseText = await response.text();
  let payload: unknown;

  if (responseText) {
    try {
      payload = JSON.parse(responseText);
    } catch {
      throw new ApiError(
        response.ok
          ? "استجابة الخادم غير صالحة"
          : `استجابة غير متوقعة من الخادم (HTTP ${response.status}). يرجى مراجعة إعدادات الخادم.`,
        response.status,
      );
    }
  }

  if (!response.ok) {
    const errorPayload =
      typeof payload === "object" && payload !== null
        ? (payload as { message?: unknown; error?: unknown })
        : null;
    const message =
      (typeof errorPayload?.message === "string" && errorPayload.message) ||
      (typeof errorPayload?.error === "string" && errorPayload.error) ||
      "تعذر إكمال الطلب. حاولي مرة أخرى.";

    throw new ApiError(message, response.status);
  }

  return payload as T;
}

// src/services/api.ts - module de communication avec l'API backend

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
    [key: string]: string | boolean | undefined;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getToken = () => localStorage.getItem("token");

//  type propre pour query params
type QueryParams = Record<string, string | number | boolean | null | undefined>;

// Filtre null / undefined / "" pour éviter category=null dans l'URL
const buildUrl = (path: string, params?: QueryParams): string => {
  if (!params) return path;

  const clean = Object.fromEntries(
    Object.entries(params).filter(
      ([, v]) => v !== null && v !== undefined && v !== "",
    ),
  );

  const query = new URLSearchParams(
    Object.entries(clean).map(([k, v]) => [k, String(v)]),
  ).toString();

  return query ? `${path}?${query}` : path;
};

const request = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
      ...options.headers,
    },
  });

  const data: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    // petit safe cast
    const errorMessage =
      typeof data === "object" &&
      data &&
      "message" in data &&
      typeof (data as { message?: unknown }).message === "string"
        ? (data as { message: string }).message
        : `Erreur ${res.status}`;

    throw new Error(errorMessage);
  }

  return data as T;
};

export const api = {
  get: <T>(path: string, params?: QueryParams) =>
    request<T>(buildUrl(path, params)),

  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

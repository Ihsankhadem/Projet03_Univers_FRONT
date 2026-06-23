// src/services/api.ts - module de communication avec le backend

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

type QueryParams = Record<string, string | number | boolean | null | undefined>;

/**
 * Nettoie les query params
 */
const buildUrl = (path: string, params?: QueryParams): string => {
  if (!params) return path;

  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, v]) => v !== null && v !== undefined && v !== "",
    ),
  );

  const query = new URLSearchParams(
    Object.entries(cleanParams).map(([k, v]) => [k, String(v)]),
  ).toString();

  return query ? `${path}?${query}` : path;
};

/**
 * Parse les erreurs backend proprement
 */
const parseError = async (res: Response) => {
  let data: any = null;

  try {
    data = await res.json();
  } catch {
    // ignore JSON error
  }

  // IMPORTANT: ton backend renvoie parfois "error" ou "message"
  const message = data?.message || data?.error || `Erreur ${res.status}`;

  return message;
};

/**
 * Requête générique
 */
const request = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(getToken() && {
        Authorization: `Bearer ${getToken()}`,
      }),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const message = await parseError(res);
    throw new Error(message);
  }

  return res.json() as Promise<T>;
};

/**
 * API wrapper propre
 */
export const api = {
  get: <T>(path: string, params?: QueryParams) =>
    request<T>(buildUrl(path, params)),

  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body ?? {}),
    }),

  put: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

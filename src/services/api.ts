

// src/services/api.ts - module de communication avec l'API backend
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getToken = () => localStorage.getItem("token");

// Filtre null / undefined / "" pour éviter category=null dans l'URL
const buildUrl = (path: string, params?: Record<string, any>): string => {
  if (!params) return path;
  const clean = Object.fromEntries(
    Object.entries(params).filter(
      ([, v]) => v !== null && v !== undefined && v !== ""
    )
  );
  const query = new URLSearchParams(clean).toString();
  return query ? `${path}?${query}` : path;
};

const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || `Erreur ${res.status}`);
  }

  return data as T;
};

export const api = {
  get: <T>(path: string, params?: Record<string, any>) =>
    request<T>(buildUrl(path, params)),

  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),

  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),

  delete: <T>(path: string) =>
    request<T>(path, { method: "DELETE" }),
};
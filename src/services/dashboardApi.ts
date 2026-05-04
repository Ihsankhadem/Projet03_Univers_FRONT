// src/services/dashboardApi.ts
import { api } from "./api";
import type {
  Article,
  Category,
  CategoryDetail,
  DashboardStats,
} from "../types";

export const dashboardApi = {
  // ---------------- STATS ----------------
  getStats: async (): Promise<DashboardStats> => {
    return api.get<DashboardStats>("/api/dashboard/admin/stats");
  },

  // ================= ARTICLES =================
  getArticles: async (search: string): Promise<Article[]> => {
    return api.get<Article[]>("/api/dashboard/admin/articles", { search });
  },

  getArticleById: async (id: number): Promise<Article> => {
    return api.get<Article>(`/api/dashboard/admin/articles/${id}`);
  },

  createArticle: async (data: {
    title: string;
    content: string;
    status: "publié" | "brouillon" | "suspendu";
    author_id: number;
    category_id: number;
  }): Promise<{ success: boolean; articleId: number }> => {
    return api.post("/api/dashboard/admin/articles", data);
  },

  updateArticle: async (
    id: number,
    data: {
      title: string;
      content: string;
      status: "publié" | "brouillon" | "suspendu";
      category_id: number;
    },
  ): Promise<{ success: boolean }> => {
    return api.put(`/api/dashboard/admin/articles/${id}`, data);
  },

  updateStatus: async (
    id: number,
    status: "publié" | "brouillon" | "suspendu",
  ): Promise<{ success: boolean }> => {
    return api.put(`/api/dashboard/admin/articles/${id}/status`, {
      status,
    });
  },

  deleteArticle: async (id: number): Promise<{ success: boolean }> => {
    return api.delete(`/api/dashboard/admin/articles/${id}`);
  },

  // ================= CATEGORIES =================
  getCategories: async (search = ""): Promise<Category[]> => {
    return api.get<Category[]>("/api/categories", { search });
  },

  getCategoryById: async (id: number): Promise<CategoryDetail> => {
    return api.get<CategoryDetail>(`/api/categories/${id}`);
  },

  getArticlesByCategory: async (categoryId: number): Promise<Article[]> => {
    return api.get<Article[]>(`/api/categories/${categoryId}/articles`);
  },

  createCategory: async (
    name: string,
  ): Promise<{ success: boolean; id: number }> => {
    return api.post("/api/categories", { name });
  },

  updateCategory: async (
    id: number,
    name: string,
  ): Promise<{ success: boolean }> => {
    return api.put(`/api/categories/${id}`, { name });
  },

  deleteCategory: async (id: number): Promise<{ success: boolean }> => {
    return api.delete(`/api/categories/${id}`);
  },
};

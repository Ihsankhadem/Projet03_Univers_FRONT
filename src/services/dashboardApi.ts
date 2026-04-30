// src/services/dashboardApi.ts
import { api } from "./api";
import type { Article, Category, CategoryDetail, DashboardStats } from "../types";

export const dashboardApi = {
  // ---------------- STATS ----------------
  getStats: async (): Promise<DashboardStats> => {
    return api.get<DashboardStats>("/api/dashboard/admin/stats");
  },

  // ---------------- ARTICLES ----------------
  getArticles: async (search: string): Promise<Article[]> => {
    return api.get<Article[]>("/api/dashboard/admin/articles", { search });
  },

  getArticleById: async (id: number): Promise<Article> => {
    return api.get<Article>(`/api/dashboard/admin/articles/${id}`);
  },

  updateArticle: async (
    id: number,
    data: {
      title: string;
      content: string;
      status: "publié" | "brouillon" | "suspendu";
      category_id: number;
    }
  ): Promise<{ success: boolean }> => {
    return api.put<{ success: boolean }>(
      `/api/dashboard/admin/articles/${id}`,
      data
    );
  },

  updateStatus: async (
    id: number,
    status: "publié" | "brouillon" | "suspendu"
  ): Promise<{ success: boolean }> => {
    return api.put<{ success: boolean }>(
      `/api/dashboard/admin/articles/${id}/status`,
      { status }
    );
  },

  deleteArticle: async (id: number): Promise<{ success: boolean }> => {
    return api.delete<{ success: boolean }>(
      `/api/dashboard/admin/articles/${id}`
    );
  },

  createArticle: async (data: {
    title: string;
    content: string;
    status: "publié" | "brouillon" | "suspendu";
    author_id: number;
    category_id: number;
  }): Promise<{ success: boolean; articleId: number }> => {
    return api.post<{ success: boolean; articleId: number }>(
      "/api/dashboard/admin/articles",
      data
    );
  },

// ---------------- CATEGORIES ----------------
  getCategories: async (search = ""): Promise<Category[]> => {
    return api.get<Category[]>(`/api/categories?search=${search}`);
  },

  getCategoryById: async (id: number): Promise<CategoryDetail> => {
    return api.get<CategoryDetail>(`/api/categories/${id}`);
  },

  getArticlesByCategory: async (categoryId: number): Promise<Article[]> => {
    return api.get<Article[]>(
      `/api/categories/${categoryId}/articles`
    );
  },
};
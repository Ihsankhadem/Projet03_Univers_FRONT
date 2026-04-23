// src/services/dashboardApi.ts
import { api } from "./api";
import type { Article, Category, DashboardStats } from "../types";

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    return api.get<DashboardStats>("/api/dashboard/admin/stats");
  },

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
      category_id: number 
    }
  ): Promise<{ success: boolean }> => {
    return api.put<{ success: boolean }>(`/api/dashboard/admin/articles/${id}`, data);
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

  getCategories: async (): Promise<Category[]> => {
    return api.get<Category[]>("/api/categories");
  },

  deleteArticle: async (id: number): Promise<{ success: boolean }> => {
  return api.delete<{ success: boolean }>(`/api/dashboard/admin/articles/${id}`);
},

};

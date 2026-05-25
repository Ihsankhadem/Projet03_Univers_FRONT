// src/services/dashboardApi.ts
import { api } from "./api";
import type {
  Article,
  Category,
  CategoryDetail,
  DashboardStats,
  User,
  Evenement,
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
    image: string;
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
      image: string;
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

  getCategoryStats: async (): Promise<{
    total_categories: number;
    total_articles: number;
    empty_categories: number;
  }> => {
    return api.get("/api/categories/stats");
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

  // ================= USERS =================

  getUsers: async (search = ""): Promise<User[]> => {
    return api.get<User[]>("/api/users", { search });
  },

  deleteUser: async (id: number): Promise<{ success: boolean }> => {
    return api.delete(`/api/users/${id}`);
  },

  createUser: async (data: {
    name: string;
    email: string;
    role: "rédacteur" | "administrateur";
  }): Promise<{ success: boolean; userId: number }> => {
    return api.post("/api/users", data);
  },

  updateUser: async (
    id: number,
    data: {
      name: string;
      email: string;
      password?: string;
      role: "rédacteur" | "administrateur";
    },
  ): Promise<{ success: boolean }> => {
    return api.put(`/api/users/${id}`, data);
  },

  getUserStats: async (): Promise<{
    total_users: number;
    total_admins: number;
    total_editors: number;
    total_articles: number;
  }> => {
    return api.get("/api/users/stats");
  },

  // ================= EVENTS =================

  getEvents: async (search = ""): Promise<Evenement[]> => {
    return api.get<Evenement[]>("/api/events", { search });
  },

  createEvent: async (
    data: Omit<Evenement, "id">,
  ): Promise<{ success: boolean; id: number }> => {
    return api.post("/api/events", data);
  },

  updateEvent: async (
    id: number,
    data: Omit<Evenement, "id">,
  ): Promise<{ success: boolean }> => {
    return api.put(`/api/events/${id}`, data);
  },

  deleteEvent: async (id: number): Promise<{ success: boolean }> => {
    return api.delete(`/api/events/${id}`);
  },
};

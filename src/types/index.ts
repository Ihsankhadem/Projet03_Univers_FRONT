// types/index.ts

export interface Article {
  id: number;
  title: string;
  content?: string;
  image?: string;
  author: string;
  category: string;
  category_id?: number;
  views: number;
  status: "brouillon" | "publié";
  created_at: string;
  source?: "bdd" | "space";
  external_url?: string;
}

export interface SpaceArticle {
  id: number;
  title: string;
  summary: string;
  image_url: string;
  news_site: string;
  url: string;
  published_at: string;
}

export interface SpaceflightResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SpaceArticle[];
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image?: string;
  description?: string;
}

export interface Category {
  id: number;
  name: string;
  total_articles: number;

  articles?: CategoryArticle[];
}

// ---------------- CATEGORY DETAIL ----------------

export interface CategoryArticle {
  id: number;
  title: string;
  image?: string;
  created_at: string;
}

export interface CategoryDetail {
  id: number;
  name: string;
  articles: CategoryArticle[];
}

export type Tab = "articles" | "categories" | "utilisateurs";

export type DashboardStats = {
  articles: {
    total: number;
    published: number;
    drafts: number;
  };
  users: number;
  external: {
    nasa: number;
    spaceflight: number;
    spacex: number;
  };
};

export type PaginatedArticles = {
  data: Article[];
  totalPages: number;
};

// ---------------- AUTH ----------------

export type Role = "rédacteur" | "administrateur";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface JwtPayload {
  id: number;
  role: Role;
  exp?: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

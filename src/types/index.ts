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

export interface Evenement {
  id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  image?: string;
  external_url: string;
}

export interface NasaImage {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  copyright?: string;
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

export type Tab = "articles" | "categories" | "utilisateurs" | "événements";

export type DashboardStats = {
  users: number;
  articles: {
    total: number;
    published: number;
    drafts: number;
  };
  utilisateurs: number;
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

export interface CategoryStats {
  total_categories: number;
  total_articles: number;
  empty_categories: number;
}

// ---------------- AUTH ----------------

export type Role = "rédacteur" | "administrateur";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  total_articles?: number;
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

export interface UserStats {
  total_users: number;
  total_admins: number;
  total_editors: number;
  total_articles: number;
}

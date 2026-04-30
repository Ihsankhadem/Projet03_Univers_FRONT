import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Folder, Layers3, FileText } from "lucide-react";

import DashboardHeader from "../../components/DashboardAdmin/DashboardHeader";
import DashboardSearch from "../../components/DashboardAdmin/DashboardSearch";
import DashboardCard from "../../components/DashboardAdmin/DashboardCard";
import DashboardTabs from "../../components/DashboardAdmin/DashboardTabs";
import CategoriesTable from "../../components/DashboardAdmin/AdminCategories/CategoriesTable";
import ArticlesPagination from "../../components/ui/Pagination";

import { dashboardApi } from "../../services/dashboardApi";
import { useDebounce } from "../../Hooks/useDebounce";

import type { Category, Tab } from "../../types";

export default function CategoryPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("categories");

  const debouncedSearch = useDebounce(search, 300);

  const limit = 6;

  // ---------------- FETCH CATEGORIES ----------------
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["categories", debouncedSearch],
    queryFn: () => dashboardApi.getCategories(debouncedSearch),
  });

  const allCategories = categories ?? [];

  // ---------------- PAGINATION ----------------
  const totalPages = Math.ceil(allCategories.length / limit);

  const paginatedCategories = allCategories.slice(
    (page - 1) * limit,
    page * limit
  );

  // ---------------- STATS ----------------
  const totalCategories = allCategories.length;

  const totalArticles = allCategories.reduce(
    (acc, c) => acc + (c.total_articles ?? 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <DashboardHeader />

      {/* STATS */}
      <div className="mt-8 px-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">
          Vue d’ensemble
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Catégories"
            value={totalCategories}
            icon={<Folder className="h-4 w-4" />}
            accent="blue"
          />

          <DashboardCard
            title="Articles liés"
            value={totalArticles}
            icon={<FileText className="h-4 w-4" />}
            accent="green"
          />

          <DashboardCard
            title="Organisation"
            value={totalCategories}
            icon={<Layers3 className="h-4 w-4" />}
            accent="purple"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="mt-10 px-8 pb-20">
        <div className="rounded-2xl border border-[#E2E8F0] bg-[rgba(255,255,255,0.6)] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md">
          {/* TOP BAR */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full max-w-md">
              <DashboardSearch
                value={search}
                onChange={(value) => {
                  setSearch(value);
                  setPage(1);
                }}
              />
            </div>

              <div className="flex justify-left">
                <button 
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-600/90 hover:bg-violet-500 text-white font-medium shadow-lg shadow-violet-500/20 transition-all duration-200 hover:scale-[1.02]"
                >
                  + Ajouter une catégorie
                </button>
              </div>

            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <DashboardTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="mt-6">
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 animate-pulse rounded-xl bg-white"
                  />
                ))}
              </div>
            ) : paginatedCategories.length === 0 ? (
              <div className="py-10 text-center text-slate-500">
                Aucune catégorie trouvée.
              </div>
            ) : (
              <CategoriesTable categories={paginatedCategories} />
            )}
          </div>

          {/* PAGINATION */}
          <div className="mt-10">
            <ArticlesPagination
              page={page}
              totalPages={totalPages}
              onPage={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
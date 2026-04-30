import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FileText, Users, CheckCircle, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "../../components/DashboardAdmin/DashboardHeader";
import DashboardTabs from "../../components/DashboardAdmin/DashboardTabs";
import DashboardSearch from "../../components/DashboardAdmin/DashboardSearch";
import DashboardCard from "../../components/DashboardAdmin/DashboardCard";
import ArticlesTable from "../../components/DashboardAdmin/AdminArticles/ArticlesTable";
import ArticlesPagination from "../../components/ui/Pagination";
import PopConfirm from "../../components/ui/PopConfirming";
import { dashboardApi } from "../../services/dashboardApi";
import { useDebounce } from "../../Hooks/useDebounce";
import type { Article, Tab, DashboardStats } from "../../types";

export default function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState<Tab>("articles");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(search, 300);
  const limit = 5;

  const handleEdit = (article: Article) => {
    navigate(`/dashboard/articles/${article.id}/edit`);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  // ---------------- STATS ----------------
  const { data: stats, isLoading: loadingStats } = useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: dashboardApi.getStats,
    staleTime: 1000 * 60 * 5,
  });

  // ---------------- ARTICLES ----------------
  const { data: articlesData, isLoading: loadingArticles } = useQuery<
    Article[]
  >({
    queryKey: ["articles-admin", debouncedSearch],
    queryFn: () => dashboardApi.getArticles(debouncedSearch),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 2,
  });

  console.log("ARTICLES DASHBOARD:", articlesData);

  // ---------------- PAGINATION ----------------
  const allArticles = articlesData ?? [];
  const totalPages = Math.ceil(allArticles.length / limit);
  const paginatedArticles = allArticles.slice((page - 1) * limit, page * limit);

  // ---------------- STATUS ----------------
  const toggleStatus = async (article: Article) => {
    const cycle = {
      publié: "suspendu",
      suspendu: "brouillon",
      brouillon: "publié",
    } as const;

    const newStatus = cycle[article.status];

    await dashboardApi.updateStatus(article.id, newStatus);

    queryClient.setQueryData(
      ["articles-admin", debouncedSearch],
      (old: Article[] | undefined) => {
        if (!old) return old;

        return old.map((a) =>
          a.id === article.id ? { ...a, status: newStatus } : a,
        );
      },
    );
  };

  const handleDelete = (id: number) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;

    await dashboardApi.deleteArticle(pendingDeleteId);

    queryClient.setQueryData(
      ["articles-admin", debouncedSearch],
      (old: Article[] | undefined) => {
        if (!old) return old;

        return old.filter((a) => a.id !== pendingDeleteId);
      },
    );

    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <DashboardHeader />

      {/* STATS */}
      <div className="px-8 mt-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Vue d’ensemble
        </h2>

        {loadingStats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-white rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          stats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <DashboardCard
                title="Articles"
                value={stats.articles.total}
                delta="+8"
                deltaLabel="ce mois"
                icon={<FileText className="w-4 h-4" />}
                accent="purple"
              />
              <DashboardCard
                title="Publiés"
                value={stats.articles.published}
                icon={<CheckCircle className="w-4 h-4" />}
                accent="green"
              />
              <DashboardCard
                title="Brouillons"
                value={stats.articles.drafts}
                icon={<Pencil className="w-4 h-4" />}
                accent="amber"
              />
              <DashboardCard
                title="Utilisateurs"
                value={stats.users}
                delta="+132"
                deltaLabel="nouveaux"
                icon={<Users className="w-4 h-4" />}
                accent="blue"
              />
            </div>
          )
        )}
      </div>

      <div className="px-8 mt-10 pb-20">
        <div className="px-8 mt-10 pb-20">
          <div className="rounded-2xl p-8 bg-[rgba(255,255,255,0.6)] backdrop-blur-md border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="w-full max-w-md">
                <DashboardSearch value={search} onChange={handleSearch} />
              </div>

              <div className="flex justify-left">
                <button
                  onClick={() => navigate("/dashboard/articles/add")}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-600/90 hover:bg-violet-500 text-white font-medium shadow-lg shadow-violet-500/20 transition-all duration-200 hover:scale-[1.02]"
                >
                  + Ajouter un article
                </button>
              </div>

              <div className="flex-shrink-0">
                <DashboardTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
            </div>

            <div className="mt-6">
              {loadingArticles ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 bg-white rounded-xl animate-pulse"
                    />
                  ))}
                </div>
              ) : paginatedArticles.length === 0 ? (
                <div className="text-center py-10 text-slate-500">
                  Aucun article trouvé.
                </div>
              ) : (
                <>
                  <ArticlesTable
                    articles={paginatedArticles}
                    onEdit={handleEdit}
                    onToggleStatus={toggleStatus}
                    onDelete={handleDelete}
                  />

                  <PopConfirm
                    open={confirmOpen}
                    title="Supprimer l’article"
                    message="Cette action est irréversible."
                    confirmLabel="Supprimer"
                    cancelLabel="Annuler"
                    onConfirm={confirmDelete}
                    onCancel={() => {
                      setConfirmOpen(false);
                      setPendingDeleteId(null);
                    }}
                  />
                </>
              )}
            </div>

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
    </div>
  );
}

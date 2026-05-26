import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FileText, Users, CheckCircle, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "../../../components/DashboardAdmin/DashboardHeader";
import DashboardTabs from "../../../components/DashboardAdmin/DashboardTabs";
import DashboardSearch from "../../../components/DashboardAdmin/DashboardSearch";
import DashboardCard from "../../../components/DashboardAdmin/DashboardCard";
import DashboardSection from "../../../components/DashboardAdmin/DashboardSection";

import ArticlesTable from "../../../components/DashboardAdmin/AdminArticles/ArticlesTable";
import ArticlesPagination from "../../../components/ui/Pagination";
import PopConfirm from "../../../components/ui/PopConfirming";
import { dashboardApi } from "../../../services/dashboardApi";
import { useDebounce } from "../../../Hooks/useDebounce";
import type { Article, Tab, DashboardStats } from "../../../types";

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

  // ---------------- SEARCH ----------------
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

  const allArticles = articlesData ?? [];

  const totalPages = Math.ceil(allArticles.length / limit);

  const paginatedArticles = allArticles.slice((page - 1) * limit, page * limit);

  // ---------------- ACTIONS ----------------
  const handleEdit = (article: Article) => {
    navigate(`/dashboard/articles/${article.id}/edit`);
  };

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
      <div className="mt-8 px-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">
          Vue d’ensemble
        </h2>

        {loadingStats ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-white" />
            ))}
          </div>
        ) : (
          stats && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <DashboardCard
                title="Articles"
                value={stats.articles.total}
                icon={<FileText />}
                accent="purple"
              />

              <DashboardCard
                title="Publiés"
                value={stats.articles.published}
                icon={<CheckCircle />}
                accent="green"
              />

              <DashboardCard
                title="Brouillons"
                value={stats.articles.drafts}
                icon={<Pencil />}
                accent="amber"
              />

              <DashboardCard
                title="Utilisateurs"
                value={stats.users}
                icon={<Users />}
                accent="blue"
              />
            </div>
          )
        )}
      </div>

      {/* SECTION */}
      <DashboardSection
        loading={loadingArticles}
        isEmpty={paginatedArticles.length === 0}
        emptyMessage="Aucun article trouvé."
        search={<DashboardSearch value={search} onChange={handleSearch} />}
        action={
          <button
            onClick={() => navigate("/dashboard/articles/add")}
            className="flex items-center gap-2 rounded-xl bg-violet-600/90 px-3 py-2 font-medium text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:scale-[1.02] hover:bg-violet-500"
          >
            + Ajouter un article
          </button>
        }
        tabs={
          <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        }
        pagination={
          <ArticlesPagination
            page={page}
            totalPages={totalPages}
            onPage={setPage}
          />
        }
      >
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
      </DashboardSection>
    </div>
  );
}

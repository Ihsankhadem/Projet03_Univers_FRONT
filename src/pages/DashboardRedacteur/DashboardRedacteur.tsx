// src/pages/DashboardRedacteurPage/DashboardRedacteur.tsx
// kidep51055@preparmy.com
// femmedemenage

// src/pages/DashboardRedacteurPage/DashboardRedacteur.tsx

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FileText, CheckCircle, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardRedacteurTabs, {
  type RedacteurTab,
} from "../../components/DashboardAdmin/DashboardRedacteurTabs";

import DashboardHeader from "../../components/DashboardAdmin/DashboardHeader";
import DashboardSearch from "../../components/DashboardAdmin/DashboardSearch";
import DashboardSection from "../../components/DashboardAdmin/DashboardSection";
import DashboardCard from "../../components/DashboardAdmin/DashboardCard";
import ArticlesTable from "../../components/DashboardAdmin/AdminArticles/ArticlesTable";
import ArticlesPagination from "../../components/ui/Pagination";
import PopConfirm from "../../components/ui/PopConfirming";

import { dashboardApi } from "../../services/dashboardApi";
import { useDebounce } from "../../Hooks/useDebounce";

import type { Article, DashboardStats } from "../../types";

export default function DashboardRedacteur() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<RedacteurTab>("mes-articles");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const debouncedSearch = useDebounce(search, 300);
  const limit = 5;

  // ================= ARTICLES =================

  const { data: myArticles = [], isLoading: loadingMyArticles } = useQuery<
    Article[]
  >({
    queryKey: ["redacteur-my-articles", debouncedSearch],
    queryFn: () => dashboardApi.getMyArticles(debouncedSearch),
  });

  const { data: allArticles = [], isLoading: loadingAllArticles } = useQuery<
    Article[]
  >({
    queryKey: ["redacteur-all-articles", debouncedSearch],
    queryFn: () => dashboardApi.getAllArticlesForRedacteur(debouncedSearch),
    enabled: activeTab === "tous-les-articles",
  });

  // ================= STATS =================

  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ["redacteur-stats"],
    queryFn: dashboardApi.getRedacteurStats,
  });

  // ================= SOURCE DES DONNÉES =================

  const articles = activeTab === "mes-articles" ? myArticles : allArticles;

  const isLoading =
    activeTab === "mes-articles" ? loadingMyArticles : loadingAllArticles;

  // ================= PAGINATION =================

  const totalPages = Math.max(1, Math.ceil(articles.length / limit));

  const paginatedArticles = articles.slice((page - 1) * limit, page * limit);

  // ================= ACTIONS =================

  const handleEdit = (article: Article) => {
    navigate(`/dashboard/articles/${article.id}/edit`);
  };

  const handleDelete = async () => {
    if (!pendingDeleteId) return;

    try {
      await dashboardApi.deleteMyArticle(pendingDeleteId);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["redacteur-my-articles"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["redacteur-all-articles"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["redacteur-stats"],
        }),
      ]);
    } catch (err) {
      console.error("Erreur suppression article :", err);
    } finally {
      setPendingDeleteId(null);
      setConfirmOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      {/* HEADER */}
      <DashboardHeader />

      {/* STATS */}
      <div className="mt-8 px-8">
        <h2 className="mb-4 text-lg font-semibold">Mes statistiques</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <DashboardCard
            title="Mes articles"
            value={stats?.articles?.total ?? 0}
            icon={<FileText />}
            accent="purple"
          />

          <DashboardCard
            title="Publiés"
            value={stats?.articles?.published ?? 0}
            icon={<CheckCircle />}
            accent="green"
          />

          <DashboardCard
            title="Brouillons"
            value={stats?.articles?.drafts ?? 0}
            icon={<Pencil />}
            accent="amber"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between px-8">
        <button
          onClick={() => navigate("/dashboard/change-password")}
          className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
        >
          Modifier mon mot de passe
        </button>
      </div>

      {/* TABLE */}
      <div className="mt-6 px-8">
        <DashboardSection
          loading={isLoading}
          isEmpty={paginatedArticles.length === 0}
          emptyMessage="Aucun article trouvé."
          search={<DashboardSearch value={search} onChange={setSearch} />}
          action={
            <button
              onClick={() => navigate("/dashboard/articles/new")}
              className="flex items-center gap-2 rounded-xl bg-violet-600/90 px-3 py-2 font-medium text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:scale-[1.02] hover:bg-violet-500"
            >
              + Ajouter un article
            </button>
          }
          tabs={
            <DashboardRedacteurTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
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
              onDelete={(id) => {
                setPendingDeleteId(id);
                setConfirmOpen(true);
              }}
              onToggleStatus={() => {}}
            />
          </>
        </DashboardSection>
      </div>

      {/* CONFIRMATION */}
      <PopConfirm
        open={confirmOpen}
        title="Supprimer l'article"
        message="Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onConfirm={handleDelete}
        onCancel={() => {
          setPendingDeleteId(null);
          setConfirmOpen(false);
        }}
      />
    </div>
  );
}

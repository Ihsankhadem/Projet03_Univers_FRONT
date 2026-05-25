import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Folder, FileText, Archive } from "lucide-react";

import DashboardHeader from "../../components/DashboardAdmin/DashboardHeader";
import DashboardSearch from "../../components/DashboardAdmin/DashboardSearch";
import DashboardCard from "../../components/DashboardAdmin/DashboardCard";
import DashboardTabs from "../../components/DashboardAdmin/DashboardTabs";
import CategoriesTable from "../../components/DashboardAdmin/AdminCategories/CategoryTable";
import DashboardSection from "../../components/DashboardAdmin/DashboardSection";
import CategoryForm from "../../components/DashboardAdmin/AdminCategories/CategoryForm";
import CategoryModal from "../../components/DashboardAdmin/AdminCategories/CategoryModal";
import ArticlesPagination from "../../components/ui/Pagination";
import type { Category, Tab, CategoryStats } from "../../types";

import { dashboardApi } from "../../services/dashboardApi";
import { useDebounce } from "../../Hooks/useDebounce";

export default function CategoryPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("categories");

  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );

  const [openDelete, setOpenDelete] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const queryClient = useQueryClient();
  const limit = 5;

  // ================= DELETE =================
  const deleteMutation = useMutation({
    mutationFn: (id: number) => dashboardApi.deleteCategory(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      setOpenDelete(false);
      setCategoryToDelete(null);
    },
  });

  // ================= CREATE / UPDATE =================
  const saveCategoryMutation = useMutation({
    mutationFn: async () => {
      if (editingCategory) {
        return dashboardApi.updateCategory(editingCategory.id, name);
      }

      return dashboardApi.createCategory(name);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      setOpenForm(false);
      setEditingCategory(null);
      setName("");
    },
  });

  // ================= FETCH CATEGORIES =================
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["categories", debouncedSearch],

    queryFn: () => dashboardApi.getCategories(debouncedSearch),
  });

  const allCategories = categories ?? [];

  // ================= STATS =================
  const { data: stats, isLoading: loadingStats } = useQuery<CategoryStats>({
    queryKey: ["category-stats"],
    queryFn: dashboardApi.getCategoryStats,
    staleTime: 1000 * 60 * 5,
  });

  // ================= PAGINATION =================
  const totalPages = Math.ceil(allCategories.length / limit);

  const paginatedCategories = allCategories.slice(
    (page - 1) * limit,
    page * limit,
  );

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <DashboardHeader />

      {/* ================= STATS ================= */}
      <div className="mt-8 px-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">
          Vue d’ensemble
        </h2>

        {loadingStats ? (
          <div className="flex flex-wrap justify-center gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-24 w-[260px] animate-pulse rounded-xl bg-white"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard
              title="Catégories"
              value={stats?.total_categories ?? 0}
              icon={<Folder />}
              accent="blue"
            />

            <DashboardCard
              title="Articles liés"
              value={stats?.total_articles ?? 0}
              icon={<FileText />}
              accent="green"
            />

            <DashboardCard
              title="Catégories vides"
              value={stats?.empty_categories ?? 0}
              icon={<Archive />}
              accent="amber"
            />
          </div>
        )}
      </div>

      <DashboardSection
        search={
          <DashboardSearch
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />
        }
        action={
          <button
            onClick={() => {
              setEditingCategory(null);
              setName("");
              setOpenForm(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-violet-600/90 px-3 py-2 font-medium text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:scale-[1.02] hover:bg-violet-500"
          >
            + Ajouter une catégorie
          </button>
        }
        tabs={
          <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        }
        loading={isLoading}
        isEmpty={paginatedCategories.length === 0}
        emptyMessage="Aucune catégorie trouvée."
        pagination={
          <ArticlesPagination
            page={page}
            totalPages={totalPages}
            onPage={setPage}
          />
        }
      >
        <CategoriesTable
          categories={paginatedCategories}
          onEdit={(category) => {
            setEditingCategory(category);
            setName(category.name);
            setOpenForm(true);
          }}
          onDelete={(id) => {
            const category = allCategories.find((c) => c.id === id) || null;

            setCategoryToDelete(category);
            setOpenDelete(true);
          }}
        />
      </DashboardSection>

            {/* ================= CREATE / UPDATE MODAL ================= */}
      <CategoryModal
        open={openForm}
        title={
          editingCategory
            ? "Modifier la catégorie"
            : "Créer une catégorie"
        }
        description={
          editingCategory
            ? "Modifiez le nom de la catégorie."
            : "Ajoutez une nouvelle catégorie."
        }
        confirmLabel={editingCategory ? "Mettre à jour" : "Créer"}
        loading={saveCategoryMutation.isPending}
        disabled={!name.trim()}
        onClose={() => {
          setOpenForm(false);
          setEditingCategory(null);
          setName("");
        }}
        onConfirm={() => saveCategoryMutation.mutate()}
      >
        <CategoryForm
          name={name}
          setName={setName}
        />
      </CategoryModal>

      {/* ================= DELETE MODAL ================= */}
      <CategoryModal
        open={openDelete}
        title="Supprimer la catégorie"
        description={`Supprimer "${categoryToDelete?.name}" ?`}
        confirmLabel="Supprimer"
        variant="danger"
        loading={deleteMutation.isPending}
        onClose={() => {
          setOpenDelete(false);
          setCategoryToDelete(null);
        }}
        onConfirm={() => {
          if (categoryToDelete) {
            deleteMutation.mutate(categoryToDelete.id);
          }
        }}
      >
        <p className="text-sm text-slate-500">
          Cette action est irréversible.
        </p>
      </CategoryModal>
    </div>
  );
}

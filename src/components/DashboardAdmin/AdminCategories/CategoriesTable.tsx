// components/DashboardAdmin/AdminCategories/CategoriesTable.tsx
import { Folder, Pencil, Trash2 } from "lucide-react";
import type { Category, Article } from "../../../types";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../../../services/dashboardApi";

interface Props {
  categories: Category[];
  onEdit?: (category: Category) => void;
  onDelete?: (id: number) => void;
}

export default function CategoriesTable({
  categories,
  onEdit,
  onDelete,
}: Props) {
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  if (!categories?.length) {
    return (
      <p className="py-10 text-center text-sm text-slate-400">
        Aucune catégorie trouvée
      </p>
    );
  }

  return (
    <div className="mt-4">
      {/* ─── MOBILE ─── */}
      <div className="flex flex-col gap-3 px-4 sm:hidden">
        {categories.map((c) => (
          <article
            key={c.id}
            className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-semibold leading-snug text-slate-800">
                  {c.name}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {(c.total_articles ?? 0).toLocaleString("fr-FR")} article
                  {(c.total_articles ?? 0) > 1 ? "s" : ""}
                </p>
              </div>

              <div className="rounded-lg bg-slate-100 p-2">
                <Folder className="h-4 w-4 text-slate-500" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                ID #{c.id}
              </span>

              <div className="flex gap-1.5">
                <button
                  onClick={() => onEdit?.(c)}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-violet-50 hover:text-violet-600"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={() => onDelete?.(c.id)}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ─── DESKTOP ─── */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-3.5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                Catégorie
              </th>

              <th className="px-3.5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                Articles
              </th>

              <th className="px-3.5 py-2.5" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {categories.map((c) => (
              <CategoryRow
                key={c.id}
                category={c}
                openCategory={openCategory}
                setOpenCategory={setOpenCategory}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface RowProps {
  category: Category;
  openCategory: number | null;
  setOpenCategory: (id: number | null) => void;
  onDelete?: (id: number) => void;
}

function CategoryRow({
  category,
  openCategory,
  setOpenCategory,
  onDelete,
}: RowProps) {
  const isOpen = openCategory === category.id;

  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["category-articles", category.id],
    queryFn: () => dashboardApi.getArticlesByCategory(category.id),
    enabled: isOpen,
  });

  return (
    <tr className="group transition-colors hover:bg-slate-50/60">
      {/* Category */}
      <td className="max-w-[240px] px-3.5 py-3 font-medium text-slate-800">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-slate-100 p-2">
            <Folder className="h-4 w-4 text-slate-500" />
          </div>

          <span className="block truncate text-sm">
            {category.name}
          </span>
        </div>
      </td>

      {/* Articles */}
      <td className="px-3.5 py-3">
        <div className="relative">
          <button
            onClick={() =>
              setOpenCategory(isOpen ? null : category.id)
            }
            className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-3 py-1.5 text-[15px] font-semibold text-violet-700 shadow-sm transition-all duration-200 hover:border-violet-200 hover:bg-violet-50 hover:shadow"
          >
            <span>
              {(category.total_articles ?? 0).toLocaleString("fr-FR")} article
              {(category.total_articles ?? 0) > 1 ? "s" : ""}
            </span>

            <span
              className={`text-xs transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {isOpen && (
            <div className="absolute left-0 top-8 z-50 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Articles liés
              </p>

              {isLoading ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 animate-pulse rounded-lg bg-slate-100"
                    />
                  ))}
                </div>
              ) : articles && articles.length > 0 ? (
                <div className="space-y-2">
                  {articles.map((article) => (
                    <div
                      key={article.id}
                      className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      {article.title}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400">
                  Aucun article lié
                </p>
              )}
            </div>
          )}
        </div>
      </td>

      {/* Actions */}
      <td className="px-3.5 py-3">
        <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onDelete?.(category.id)}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
            title="Supprimer"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
// components/DashboardAdmin/AdminCategories/CategoriesTable.tsx

import { Folder, Pencil, Trash2, FileText } from "lucide-react";
import type { Category } from "../../../types";

import CategoryArticlesDropdown from "./CategoryArticlesDropdown";

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
  if (!categories.length) {
    return (
      <p className="text-center py-10 text-slate-400 text-sm">
        Aucune catégorie trouvée
      </p>
    );
  }

  return (
    <div className="mt-4">
      {/* ─── MOBILE ─── */}
      <div className="sm:hidden flex flex-col gap-3 px-4">
        {categories.map((c) => (
          <article
            key={c.id}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-slate-100 p-1.5">
                  <Folder className="h-3.5 w-3.5 text-slate-500" />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-800 text-sm leading-snug">
                    {c.name}
                  </h2>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-[#EEF2FF] text-violet-700">
                <FileText className="w-3 h-3" />
                {(c.total_articles ?? 0).toLocaleString("fr-FR")} article
                {(c.total_articles ?? 0) > 1 ? "s" : ""}
              </span>

              <div className="flex gap-1.5">
                <button
                  onClick={() => onEdit?.(c)}
                  className="p-1.5 rounded-lg hover:bg-violet-50 text-slate-400 hover:text-violet-600 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDelete?.(c.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ─── DESKTOP ─── */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                Catégorie
              </th>

              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                Articles
              </th>

              <th className="px-4 py-2.5" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {categories.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-slate-50/60 transition-colors group"
              >
                {/* Category */}
                <td className="px-4 py-3.5 font-medium text-slate-800 max-w-[240px]">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-slate-100 p-1.5">
                      <Folder className="h-3.5 w-3.5 text-slate-500" />
                    </div>

                    <span className="block truncate">{c.name}</span>
                  </div>
                </td>

                {/* Articles */}
                <td className="px-4 py-3.5">
                  <CategoryArticlesDropdown
                    categoryId={c.id}
                    totalArticles={c.total_articles ?? 0}
                  />
                </td>

                {/* Actions */}
                <td className="px-4 py-3.5">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit?.(c)}
                      className="p-1.5 rounded-lg hover:bg-violet-50 text-slate-400 hover:text-violet-600 transition-colors"
                      title="Modifier"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDelete?.(c.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// components/DashboardAdmin/AdminCategories/CategoriesTable.tsx
import { Folder, Pencil, Trash2} from "lucide-react";
import { Link } from "react-router-dom";
import type { Category } from "../../../types";

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
      <p className="py-10 text-center text-sm text-slate-400">
        Aucune catégorie trouvée
      </p>
    );
  }

  return (
    <div className="mt-4">
      {/* MOBILE */}
      <div className="flex flex-col gap-3 px-4 sm:hidden">
        {categories.map((c) => (
          <article
            key={c.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-800">
                  {c.name}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {(c.total_articles ?? 0)} article
                  {(c.total_articles ?? 0) > 1 ? "s" : ""}
                </p>
              </div>

              <div className="rounded-lg bg-slate-100 p-2">
                <Folder className="h-4 w-4 text-slate-500" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <Link
                to={`/categories/${c.id}`}
                className="text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Voir →
              </Link>

              <div className="flex gap-1.5">
                <button
                  onClick={() => onEdit?.(c)}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
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

      {/* DESKTOP */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white sm:block">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                Catégorie
              </th>

              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                Articles
              </th>

              <th className="px-6 py-4" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {categories.map((c) => (
              <tr
                key={c.id}
                className="group transition-colors hover:bg-slate-50"
              >
                {/* Category */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-slate-100 p-2">
                      <Folder className="h-4 w-4 text-slate-500" />
                    </div>

                    <span className="font-medium text-slate-800">
                      {c.name}
                    </span>
                  </div>
                </td>

                {/* Count */}
                <td className="px-6 py-4 text-slate-500">
                  {(c.total_articles ?? 0)} article
                  {(c.total_articles ?? 0) > 1 ? "s" : ""}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => onEdit?.(c)}
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
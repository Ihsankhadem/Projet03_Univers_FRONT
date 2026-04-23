import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Article } from "../../../types";

interface Props {
  articles: Article[];
  onEdit?: (article: Article) => void;
  onDelete?: (id: number) => void;
  onToggleStatus?: (article: Article) => void;
}

const STATUS_STYLES = {
  publié: {
    badge: "bg-[#EAF3DE] text-[#3B6D11]",
    dot: "bg-[#639922]",
  },
  brouillon: {
    badge: "bg-[#FAEEDA] text-[#854F0B]",
    dot: "bg-[#BA7517]",
  },
  suspendu: {
    badge: "bg-[#FCEBEB] text-[#A32D2D]",
    dot: "bg-[#E24B4A]",
  },
} as const;

export default function ArticlesTable({
  articles,
  onEdit,
  onDelete,
  onToggleStatus,
}: Props) {
  if (!articles.length) {
    return (
      <p className="text-center py-10 text-slate-400 text-sm">
        Aucun article trouvé
      </p>
    );
  }

  return (
    <div className="mt-4">

      {/* ─── MOBILE ─── */}
      <div className="sm:hidden flex flex-col gap-3 px-4">
        {articles.map((a) => (
          <article
            key={a.id}
            className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm"
          >
            <h2 className="font-semibold text-slate-800 text-sm leading-snug">
              {a.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1">{a.author}</p>

            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => onToggleStatus?.(a)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
                  STATUS_STYLES[a.status].badge
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_STYLES[a.status].dot}`} />
                {a.status}
              </button>
              <span className="text-xs text-slate-400">
                {new Date(a.created_at).toLocaleDateString("fr-FR")}
              </span>
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {a.views.toLocaleString("fr-FR")} vues
              </span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => onEdit?.(a)}
                  className="p-1.5 rounded-lg hover:bg-violet-50 text-slate-400 hover:text-violet-600 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDelete?.(a.id)}
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
                Titre
              </th>
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                Auteur
              </th>
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                Statut
              </th>
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                Vues
              </th>
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                Date
              </th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {articles.map((a) => (
              <tr
                key={a.id}
                className="hover:bg-slate-50/60 transition-colors group"
              >
                {/* Title */}
                <td className="px-4 py-3.5 font-medium text-slate-800 max-w-[240px]">
                  <span className="block truncate">{a.title}</span>
                </td>

                {/* Author */}
                <td className="px-4 py-3.5 text-slate-500">{a.author}</td>

                {/* Status badge */}
                <td className="px-4 py-3.5">
                  <button
                    onClick={() => onToggleStatus?.(a)}
                    title="Cliquer pour changer le statut"
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full transition-opacity hover:opacity-80 ${
                      STATUS_STYLES[a.status].badge
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATUS_STYLES[a.status].dot}`}
                    />
                    {a.status}
                  </button>
                </td>

                {/* Views */}
                <td className="px-4 py-3.5 text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-slate-300" />
                    {a.views.toLocaleString("fr-FR")}
                  </span>
                </td>

                {/* Date */}
                <td className="px-4 py-3.5 text-slate-400 text-xs tabular-nums">
                  {new Date(a.created_at).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>

                {/* Actions — visible on row hover */}
                <td className="px-4 py-3.5">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit?.(a)}
                      className="p-1.5 rounded-lg hover:bg-violet-50 text-slate-400 hover:text-violet-600 transition-colors"
                      title="Modifier"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete?.(a.id)}
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
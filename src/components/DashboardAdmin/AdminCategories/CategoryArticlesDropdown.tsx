import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Article } from "../../../types";
import { dashboardApi } from "../../../services/dashboardApi";

interface Props {
  categoryId: number;
  totalArticles: number;
}

export default function CategoryArticlesDropdown({
  categoryId,
  totalArticles,
}: Props) {
  const [open, setOpen] = useState(false);

  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["category-articles", categoryId],
    queryFn: () => dashboardApi.getArticlesByCategory(categoryId),
    enabled: open,
  });

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-100 hover:text-slate-800"
      >
        {totalArticles.toLocaleString("fr-FR")} article
        {totalArticles > 1 ? "s" : ""}
        <span
          className={`text-[10px] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-10 z-50 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
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
          ) : articles?.length ? (
            <div className="space-y-2">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  {article.title}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">Aucun article lié</p>
          )}
        </div>
      )}
    </div>
  );
}

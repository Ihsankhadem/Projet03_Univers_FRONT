// Articles/ArticlesPagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
}

export default function ArticlesPagination({
  page,
  totalPages,
  onPage,
}: Props) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page > 3) pages.push("...");

      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      ) {
        pages.push(i);
      }

      if (page < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="flex items-center gap-2 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-3 py-2 shadow-[0_0_30px_rgba(139,92,246,0.08)]">
        {/* Previous */}
        <button
          onClick={() => onPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-transparent text-slate-400 hover:bg-white/5 hover:border-violet-500/40 hover:text-violet-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Pages */}
        {getPages().map((p, index) =>
          p === "..." ? (
            <span key={index} className="px-2 text-slate-500 text-sm">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPage(Number(p))}
              className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 border ${
                page === p
                  ? "bg-violet-600/90 border-violet-400 text-white shadow-[0_0_20px_rgba(139,92,246,0.45)]"
                  : "bg-transparent border-transparent text-slate-400 hover:bg-white/5 hover:border-white/10 hover:text-white"
              }`}
            >
              {p}
            </button>
          ),
        )}

        {/* Next */}
        <button
          onClick={() => onPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-transparent text-slate-400 hover:bg-white/5 hover:border-violet-500/40 hover:text-violet-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

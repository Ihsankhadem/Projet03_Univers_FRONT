import { Search } from "lucide-react";
import type { Category } from "../../types";

interface Props {
  search: string;
  onSearch: (v: string) => void;
  sort: "date" | "views";
  onSort: (v: "date" | "views") => void;
  categories: Category[];
  selectedCat: number | null;
  onCat: (id: number | null) => void;
}

export default function ArticlesFilters({
  search,
  onSearch,
  categories,
  selectedCat,
  onCat,
}: Props) {
  return (
    <div className="mb-10">
      {/* Recherche */}
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-[#1E293B] border border-slate-700 text-slate-200 placeholder-slate-500 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCat(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedCat === null
              ? "bg-violet-600 text-white"
              : "border border-slate-700 text-slate-400 hover:border-violet-500 hover:text-violet-300"
          }`}
        >
          Tous
        </button>
        {categories
          .filter((cat) => cat.id !== 6) // 👈 masque “Actualités Spatiales”
          .map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCat(cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCat === cat.id
                  ? "bg-violet-600 text-white"
                  : "border border-slate-700 text-slate-400 hover:border-violet-500 hover:text-violet-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
      </div>
    </div>
  );
}

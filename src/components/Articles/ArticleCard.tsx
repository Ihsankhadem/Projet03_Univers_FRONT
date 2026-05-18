import { Link } from "react-router-dom";
import { Eye, User } from "lucide-react";
import type { Article } from "../../types";

// on appel l'interface Article pour typer les props de notre composant ArticleCard
interface Props {
  article: Article;
}

export default function ArticleCard({ article }: Props) {
  return (
    <Link
      to={`/articles/${article.id}`}
      className="group block rounded-xl overflow-hidden border border-slate-700 hover:border-violet-500 transition-all bg-[#1E293B] hover:shadow-lg hover:shadow-violet-900/20"
    >
      <div className="relative h-44 bg-slate-800 overflow-hidden">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            // lazy loading pour les images, ça permet de ne pas charger les images qui ne sont pas encore visibles à l'écran = améliore les performances de l'application
            loading="lazy"
            width={400}
            height={176}
            className="w-full h-full object-cover ..."
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-900 to-violet-900 flex items-center justify-center">
            <span className="text-white/20 text-4xl">🌌</span>
          </div>
        )}
        {article.category && (
          <span className="absolute top-3 left-3 bg-[#1E3A8A] text-blue-200 text-xs font-semibold px-2 py-1 rounded-full">
            {article.category}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-slate-100 text-base leading-snug mb-2 group-hover:text-violet-300 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-slate-500 mt-3">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {article.author}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {article.views}
          </span>
        </div>
      </div>
    </Link>
  );
}

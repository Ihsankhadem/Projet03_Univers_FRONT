import { Link } from "react-router-dom";
import { User, Calendar } from "lucide-react";
import type { Article } from "../../types";

interface Props {
  article: Article;
}

export default function SpaceArticleCard({ article }: Props) {
  return (
    <Link
      to={`/nasa/${article.id}`}
      className="group block rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-all bg-[#1E293B] hover:shadow-lg hover:shadow-blue-900/20"
    >
      <div className="relative h-44 bg-slate-800 overflow-hidden">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            width={400}
            height={176}
            className="w-full h-full object-cover ..."
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-900 to-slate-900" />
        )}
        <span className="absolute top-3 left-3 bg-blue-700 text-blue-100 text-xs font-semibold px-2 py-1 rounded-full">
          {article.author}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-slate-100 text-base leading-snug mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
          {article.title}
        </h3>
        {article.content && (
          <p className="text-slate-500 text-xs line-clamp-2 mb-3">
            {article.content}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />{article.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
          {/* Affiche la date de création formatée en français */}
            {new Date(article.created_at).toLocaleDateString("fr-FR")}
          </span>
        </div>
      </div>
    </Link>
  );
}
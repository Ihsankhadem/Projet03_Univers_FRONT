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
      className="group block rounded-xl overflow-hidden border border-white/60 hover:border-white transition-all bg-[#243044] hover:shadow-[0_0_12px_rgba(255,255,255,0.25)]"
    >
      <div className="relative h-44 bg-[#0B0F1A] overflow-hidden">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            width={400}
            height={176}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1E3A8A] to-[#6D28D9]" />
        )}

        <span className="absolute top-3 left-3 bg-[#1E3A8A] text-[#C4B5FD] text-xs font-semibold px-2 py-1 rounded-full shadow-md">
          {article.author}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-[#F1F5F9] text-base leading-snug mb-2 group-hover:text-[#C4B5FD] transition-colors line-clamp-2">
          {article.title}
        </h3>

        {article.content && (
          <p className="text-[#94A3B8] text-xs line-clamp-2 mb-3">
            {article.content}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-[#94A3B8] mt-2">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3 text-[#94A3B8]" />
            {article.author}
          </span>

          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#94A3B8]" />
            {new Date(article.created_at).toLocaleDateString("fr-FR")}
          </span>
        </div>
      </div>
    </Link>
  );
}

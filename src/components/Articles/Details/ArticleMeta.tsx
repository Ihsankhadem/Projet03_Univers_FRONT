import { Eye, User, Calendar, Tag } from "lucide-react";

interface Props {
  author: string;
  category?: string;
  createdAt: string;
  views?: number;
}

export default function ArticleMeta({
  author,
  category,
  createdAt,
  views,
}: Props) {
  return (
    <div className="mb-6">
      {/* Catégorie de l'article */}
      {category && (
        <span className="inline-flex items-center gap-1 bg-[#1E3A8A] text-blue-200 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <Tag className="w-3 h-3" />
          {category}
        </span>
      )}
      {/* User = auteur de l'article */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 pt-4 border-t border-slate-800">
        <span className="flex items-center gap-1.5">
          <User className="w-4 h-4 text-violet-400" />
          <span className="text-slate-300">{author}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-violet-400" />
          {/* Affiche la date de création formatée en français */}
          {new Date(createdAt).toLocaleDateString("fr-FR", {
            // format de date en français : jour en 2 chiffres, mois en toutes lettres, année en 4 chiffres
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
        {views !== undefined && (
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-violet-400" />
            {views} vues
          </span>
        )}
      </div>
    </div>
  );
}

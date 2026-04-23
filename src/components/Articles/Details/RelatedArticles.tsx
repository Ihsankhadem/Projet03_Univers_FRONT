// articles similaires = articles liés à celui en cours de lecture
// Affiche une section avec des articles similaires à celui en cours de lecture, basée sur la catégorie ou les tags de l'article

import ArticleCard from "../ArticleCard";           
import type { Article } from "../../../types"; 

interface Props {
  articles: Article[];
  label?: string;
  title?: string;
}

export default function RelatedArticles({
  articles,
  label = "À lire aussi",
  title = "Articles similaires",
}: Props) {
  if (!articles.length) return null;

  return (
    <div className="border-t border-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-violet-400 uppercase tracking-widest text-xs font-semibold mb-2">
          {label}
        </p>
        <h2 className="text-2xl font-bold text-slate-100 mb-8">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Affiche les cartes des articles similaires */}
        {/* article={a} sert à passer l'article en cours de lecture grace à la props article */}
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </div>
    </div>
  );
}
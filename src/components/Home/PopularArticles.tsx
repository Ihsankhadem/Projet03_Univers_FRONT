import { useEffect, useState } from "react";
import { api } from "../../services/api";
import ArticleCard from "../Articles/ArticleCard";
import Button from "../ui/Buttons";
import type { Article } from "../../types";

export default function PopularArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Article[]>("/api/articles")
      .then(setArticles)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <section className="py-16 bg-[#0B0F1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-blue-400 uppercase tracking-widest text-xs font-semibold mb-2">À la une</p>
        <h2 className="text-3xl font-bold text-slate-100 mb-10">Articles Populaires</h2>
{/* slice = 3 premiers articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button to="/articles">Découvrir les Articles →</Button>
        </div>
      </div>
    </section>
  );
}
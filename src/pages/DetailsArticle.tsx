import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import ArticleHero from "../components/Articles/Details/ArticleHero";
import ArticleMeta from "../components/Articles/Details/ArticleMeta";
import ArticleContent from "../components/Articles/Details/ArticleContent";
import RelatedArticles from "../components/Articles/Details/RelatedArticles";
import type { Article } from "../types";

export default function DetailsArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    api
      .get<Article>(`/api/articles/${id}`)
      .then((art) => {
        setArticle(art);
        return api
          .get<Article[]>("/api/articles")
          .then((all) =>
            setRelated(
              all
                .filter(
                  (a) => a.id !== art.id && a.category_id === art.category_id,
                )
                .slice(0, 3),
            ),
          );
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center text-slate-500">
        Chargement...
      </div>
    );

  if (error || !article)
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex flex-col items-center justify-center gap-4">
        <p className="text-slate-400">Article introuvable.</p>
        <Link
          to="/articles"
          className="text-violet-400 hover:underline text-sm"
        >
          ← Retour
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <ArticleHero image={article.image} title={article.title} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-16 relative z-10 pb-16">
        <ArticleMeta
          author={article.author}
          category={article.category}
          createdAt={article.created_at}
          views={article.views}
        />
        <ArticleContent title={article.title} content={article.content} />
      </div>

      <RelatedArticles articles={related} />
    </div>
  );
}

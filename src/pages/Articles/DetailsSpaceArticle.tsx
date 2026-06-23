// src/pages/Articles/DetailsSpaceArticle.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { api } from "../../services/api";

import ArticleHero from "../../components/Articles/Details/ArticleHero";
import ArticleMeta from "../../components/Articles/Details/ArticleMeta";
import ArticleContent from "../../components/Articles/Details/ArticleContent";
import SpaceArticleCard from "../../components/Articles/SpaceArticleCard";

import type { SpaceArticle, Article } from "../../types";

// =====================
// TRANSFORM (memo-safe)
// =====================
const toArticle = (s: SpaceArticle): Article => ({
  id: s.id,
  title: s.title,
  content: s.summary,
  image: s.image_url,
  author: s.news_site,
  category: "Actualités",
  views: 0,
  status: "publié",
  created_at: s.published_at,
  source: "space",
  external_url: s.url,
});

export default function DetailsSpaceArticle() {
  const { id } = useParams();

  const [article, setArticle] = useState<SpaceArticle | null>(null);
  const [related, setRelated] = useState<SpaceArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // =====================
  // FETCH OPTIMISÉ
  // =====================
  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(false);

        window.scrollTo(0, 0);

        // 🔥 PARALLÈLE (beaucoup plus rapide)
        const [articleData, relatedData] = await Promise.all([
          api.get<SpaceArticle>(`/api/spaceflight/articles/${id}`),
          api.get<{ results: SpaceArticle[] }>(
            "/api/spaceflight/articles?limit=6",
          ),
        ]);

        if (!isMounted) return;

        setArticle(articleData);

        // filtre + trim léger
        const filtered = relatedData.results
          .filter((a) => a.id !== articleData.id)
          .slice(0, 3);

        setRelated(filtered);
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // =====================
  // MEMO RELATED CARDS
  // =====================
  const relatedCards = useMemo(() => related.map(toArticle), [related]);

  // =====================
  // LOADING
  // =====================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center text-slate-500">
        Chargement...
      </div>
    );
  }

  // =====================
  // ERROR
  // =====================
  if (error || !article) {
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
  }

  // =====================
  // UI
  // =====================
  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <ArticleHero image={article.image_url} title={article.title} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-16 relative z-10 pb-16">
        <div className="flex items-center justify-between mb-4">
          <ArticleMeta
            author={article.news_site}
            category={article.news_site}
            createdAt={article.published_at}
          />

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm transition-colors shrink-0"
          >
            <ExternalLink className="w-4 h-4" />
            Voir la source
          </a>
        </div>

        <ArticleContent title={article.title} content={article.summary} />
      </div>

      {/* RELATED */}
      {relatedCards.length > 0 && (
        <div className="border-t border-slate-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-blue-400 uppercase tracking-widest text-xs font-semibold mb-2">
              À lire aussi
            </p>

            <h2 className="text-2xl font-bold text-slate-100 mb-8">
              Actualités similaires
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCards.map((a) => (
                <SpaceArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

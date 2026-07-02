// src/pages/Articles/ArticlesPage.tsx
import { useEffect, useMemo, useState } from "react";
import { api } from "../../services/api";
import ArticleCard from "../../components/Articles/ArticleCard";
import SpaceArticleCard from "../../components/Articles/SpaceArticleCard";
import ArticlesHero from "../../components/Articles/ArticlesHero";
import ArticlesFilters from "../../components/Articles/ArticlesFilters";
import ArticlesPagination from "../../components/ui/Pagination";
import type { Article, Category, SpaceflightResponse } from "../../types";

const ITEMS_PER_PAGE = 9;

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [spaceArticles, setSpaceArticles] = useState<
    SpaceflightResponse["results"]
  >([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [selectedCat, setSelectedCat] = useState<number | null>(null);
  const [source, setSource] = useState<"all" | "bdd" | "space">("all");
  const [sort, setSort] = useState<"date" | "views">("date");
  const [page, setPage] = useState(1);

  /* =========================
     SEARCH DEBOUNCE
  ========================= */
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);

    return () => clearTimeout(t);
  }, [searchInput]);

  /* =========================
     LOAD DATA (FAST)
  ========================= */
  useEffect(() => {
    const load = async () => {
      try {
        const [arts, cats, space] = await Promise.all([
          api.get<Article[]>("/api/articles"),
          api.get<Category[]>("/api/categories"),
          api.get<SpaceflightResponse>("/api/spaceflight/articles?limit=25"),
        ]);

        setArticles(arts || []);
        setCategories(cats || []);
        setSpaceArticles(space?.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  /* =========================
     SPACE NORMALIZATION (MEMO)
  ========================= */
  const normalizedSpace = useMemo(() => {
    return spaceArticles.map((s) => ({
      id: s.id,
      title: s.title,
      content: s.summary,
      image: s.image_url,
      author: s.news_site,
      category: "Actualités Spatiales",
      category_id: 6,
      views: 0,
      status: "publié" as const,
      created_at: s.published_at,
      source: "space" as const,
      external_url: s.url,
    }));
  }, [spaceArticles]);

  /* =========================
     MERGE DATA
  ========================= */
  const merged = useMemo(() => {
    return [
      ...articles.map((a) => ({ ...a, source: "bdd" as const })),
      ...normalizedSpace,
    ];
  }, [articles, normalizedSpace]);

  /* =========================
     FILTER SOURCE
  ========================= */
  const sourceFiltered = useMemo(() => {
    if (source === "bdd") return merged.filter((a) => a.source === "bdd");
    if (source === "space") return merged.filter((a) => a.source === "space");
    return merged;
  }, [merged, source]);

  /* =========================
     FILTER + SEARCH + SORT
  ========================= */
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return sourceFiltered
      .filter((a) => !selectedCat || a.category_id === selectedCat)
      .filter((a) => {
        if (!q) return true;
        return (
          a.title.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q)
        );
      })
      .sort((a, b) =>
        sort === "date"
          ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          : b.views - a.views,
      );
  }, [sourceFiltered, selectedCat, search, sort]);

  /* =========================
     PAGINATION
  ========================= */
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)),
    [filtered.length],
  );

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <ArticlesHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16">
        {/* SOURCES */}
        <div className="flex gap-2 mb-6">
          {[
            ["all", "Tous"],
            ["bdd", "Nos articles"],
            ["space", "Actualités Spatiales"],
          ].map(([val, label]) => (
            <button
              key={val}
              onClick={() => {
                setSource(val as any);
                setSelectedCat(null);
                setPage(1);
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                source === val
                  ? "bg-blue-700 text-white"
                  : "border border-slate-700 text-slate-400 hover:border-blue-500 hover:text-blue-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <ArticlesFilters
          search={searchInput}
          onSearch={setSearchInput}
          sort={sort}
          onSort={setSort}
          categories={categories}
          selectedCat={selectedCat}
          onCat={setSelectedCat}
        />

        {loading ? (
          <div className="text-center py-24 text-slate-500">Chargement...</div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-24 text-slate-500">
            Aucun article trouvé.
          </div>
        ) : (
          <>
            <p className="text-slate-500 text-sm mb-6">
              {filtered.length} article{filtered.length > 1 ? "s" : ""} trouvé
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((article) =>
                article.source === "space" ? (
                  <SpaceArticleCard
                    key={`space-${article.id}`}
                    article={article}
                  />
                ) : (
                  <ArticleCard key={`bdd-${article.id}`} article={article} />
                ),
              )}
            </div>

            <ArticlesPagination
              page={page}
              totalPages={totalPages}
              onPage={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
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

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedCat, setSelectedCat] = useState<number | null>(null);

  // Onglets source
  const [source, setSource] = useState<"all" | "bdd" | "space">("all");
  const [sort, setSort] = useState<"date" | "views">("date");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    Promise.all([
      api.get<Article[]>("/api/articles"),
      api.get<Category[]>("/api/categories"),
      api.get<SpaceflightResponse>("/api/spaceflight/articles?limit=50"),
    ])
      .then(([arts, cats, space]) => {
        setArticles(arts);
        setCategories(cats);
        setSpaceArticles(space.results);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Normalisation Spaceflight → catégorie BDD id=6
  const normalizedSpace: Article[] = spaceArticles.map((s) => ({
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

  // Merge BDD + Spaceflight
  const merged = [
    ...articles.map((a) => ({ ...a, source: "bdd" as const })),
    ...normalizedSpace,
  ];

  // Filtre par onglet
  const sourceFiltered =
    source === "bdd"
      ? merged.filter((a) => a.source === "bdd")
      : source === "space"
        ? merged.filter((a) => a.source === "space")
        : merged;

  // Filtre catégorie + recherche + tri
  const filtered = sourceFiltered
    .filter((a) => (selectedCat ? a.category_id === selectedCat : true))
    .filter((a) =>
      search.trim()
        ? a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.author.toLowerCase().includes(search.toLowerCase())
        : true,
    )
    .sort((a, b) =>
      sort === "date"
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : b.views - a.views,
    );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <ArticlesHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16">
        {/* Onglets source */}
        <div className="flex gap-2 mb-6">
          {[
            ["all", "Tous"],
            ["bdd", "Nos articles"],
            ["space", "Actualités Spatiales"],
          ].map(([val, label]) => (
            <button
              key={val}
              onClick={() => {
                setSource(val as "all" | "bdd" | "space");
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

import { useEffect, useMemo, useState } from "react";
import { Rocket } from "lucide-react";

import { api } from "../services/api";
import type { NasaImage } from "../types";

const PAGE_SIZE = 6;
const INITIAL_LOAD = 6;
const CACHE_KEY = "nasa_gallery_cache";

export default function GalleryPage() {
  const [images, setImages] = useState<NasaImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);

        // ⚡ 1. CACHE SAFE
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
          try {
            const parsed = JSON.parse(cached);

            if (Array.isArray(parsed) && parsed.length > 0) {
              if (isMounted) {
                setImages(parsed);
                setLoading(false);
              }
              return;
            }
          } catch {
            localStorage.removeItem(CACHE_KEY);
          }
        }

        // ⚡ 2. API CALL SAFE
        const data = await api.get<NasaImage[]>("/api/nasa/apod/last?count=15");

        if (!Array.isArray(data)) {
          console.warn("API returned invalid data:", data);
          if (isMounted) setImages([]);
          return;
        }

        // ⚡ 3. FILTER SAFE (moins strict pour éviter 0 résultat)
        const onlyImages = data.filter((img) => img?.url);

        // ⚡ 4. CACHE SAVE
        localStorage.setItem(CACHE_KEY, JSON.stringify(onlyImages));

        if (isMounted) {
          setImages(onlyImages);
        }
      } catch (err) {
        console.error("NASA error:", err);
        if (isMounted) setImages([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const lower = search.toLowerCase();

    return images.filter((img) =>
      (img.title || "").toLowerCase().includes(lower),
    );
  }, [images, search]);

  const visibleImages = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <section className="border-b border-white/10 px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-blue-300 text-sm">
            <Rocket className="h-4 w-4" />
            NASA Gallery
          </div>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Immersion Spatiale
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(INITIAL_LOAD);
          }}
          placeholder="Rechercher..."
          className="mb-8 w-full rounded-xl bg-[#0F172A] px-4 py-3 text-white"
        />

        {loading && images.length === 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[300px] animate-pulse rounded-2xl bg-white/5"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
              {visibleImages.map((img) => (
                <div
                  key={img.date}
                  className="mb-6 break-inside-avoid overflow-hidden rounded-2xl bg-white/5"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover"
                  />

                  <div className="p-4">
                    <h2 className="font-semibold">{img.title}</h2>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                  className="rounded-xl bg-white/10 px-6 py-3 hover:bg-white/20"
                >
                  Charger plus
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

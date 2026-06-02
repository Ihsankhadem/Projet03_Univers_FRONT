import { useEffect, useMemo, useState } from "react";
import { Rocket } from "lucide-react";

import { api } from "../services/api";
import type { NasaImage } from "../types";

const PAGE_SIZE = 6;
const INITIAL_LOAD = 6;

export default function GalleryPage() {
  const [images, setImages] = useState<NasaImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);

  useEffect(() => {
    async function fetchImages() {
      try {
        const data = await api.get<NasaImage[]>("/api/nasa/apod/last", {
          count: 20,
        });

        const onlyImages = data.filter((img) => img.media_type === "image");

        setImages(onlyImages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  const filtered = useMemo(() => {
    return images.filter((img) =>
      img.title.toLowerCase().includes(search.toLowerCase()),
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

        {loading ? (
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

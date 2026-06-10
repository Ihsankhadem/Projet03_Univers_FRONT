// src/components/Home/EventsSection.tsx
import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

import { api } from "../../services/api";
import type { Evenement } from "../../types";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);

  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function EventsSection() {
  const [events, setEvents] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api
      .get<Evenement[]>("/api/events")
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;

    // 👉 largeur visible réelle (ULTRA stable même avec images)
    const scrollAmount = el.clientWidth * 0.85;

    el.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (loading) return null;

  return (
    <section className="py-16 bg-[#F8F7FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <p className="text-violet-500 uppercase tracking-widest text-xs font-semibold mb-2">
          Agenda
        </p>

        <h2 className="text-3xl font-bold text-slate-900 mb-10">
          Évènements à Venir
        </h2>

        {/* CAROUSEL */}
        <div className="relative">
          {/* LEFT */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur shadow-md p-2 rounded-full hover:scale-105 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* SCROLL */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth px-12 no-scrollbar"
          >
            {events.map((event) => {
              const date = formatDate(event.date);
              const time = event.start_time?.slice(0, 5);

              return (
                <a
                  key={event.id}
                  href={event.external_url || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    min-w-[340px]
                    max-w-[340px]
                    bg-white
                    border border-slate-100
                    rounded-2xl
                    overflow-hidden
                    shadow-sm
                    hover:shadow-lg
                    transition
                    block
                  "
                >
                  {/* IMAGE */}
                  <div className="h-52 bg-slate-900 relative">
                    {event.image ? (
                      <img
                        src={event.image}
                        className="w-full h-full object-cover opacity-80"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-900 to-violet-900" />
                    )}

                    {event.external_url && (
                      <div className="absolute top-3 right-3 bg-white/90 p-1 rounded-full">
                        <ExternalLink className="w-4 h-4 text-violet-600" />
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 text-lg mb-3">
                      {event.title}
                    </h3>

                    <div className="space-y-2 text-sm text-slate-500">
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-violet-400" />
                        {date}
                      </p>

                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-violet-400" />
                        {time}
                      </p>

                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-violet-400" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* RIGHT */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur shadow-md p-2 rounded-full hover:scale-105 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* scrollbar hide */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

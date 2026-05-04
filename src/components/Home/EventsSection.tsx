import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { api } from "../../services/api";
import Button from "../ui/Buttons";
import type { Event } from "../../types";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    date: d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Event[]>("/api/events")
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <section className="py-16 bg-[#F8F7FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-violet-500 uppercase tracking-widest text-xs font-semibold mb-2">
          Agenda
        </p>
        <h2 className="text-3xl font-bold text-slate-900 mb-10">
          Évènements à Venir
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event) => {
            const { date, time } = formatDate(event.date);
            return (
              <div
                key={event.id}
                className="rounded-xl overflow-hidden shadow-sm border border-violet-100 bg-white hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-[#1E293B] overflow-hidden">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover opacity-70"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-violet-900" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 text-lg mb-3">
                    {event.title}
                  </h3>
                  <div className="space-y-1 text-sm text-slate-500">
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
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Button to="/events" variant="outline">
            Découvrir les Évènements →
          </Button>
        </div>
      </div>
    </section>
  );
}

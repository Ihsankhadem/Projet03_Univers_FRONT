// src/components/DashboardAdmin/AdminEvents/EventTable.tsx
import { Calendar, MapPin, Pencil, Trash2 } from "lucide-react";
import type { Evenement } from "../../../types";

interface Props {
  events: Evenement[];
  onEdit?: (event: Evenement) => void;
  onDelete?: (id: number) => void;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function EventsTable({ events, onEdit, onDelete }: Props) {
  if (!events.length) {
    return (
      <p className="text-center py-10 text-slate-400 text-sm">
        Aucun événement trouvé
      </p>
    );
  }

  return (
    <div className="mt-4">
      {/* ─── MOBILE ─── */}
      <div className="sm:hidden flex flex-col gap-3 px-4">
        {events.map((event) => (
          <article
            key={event.id}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-slate-100 p-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-800 text-sm leading-snug">
                    {event.title}
                  </h2>

                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-[#EEF2FF] text-violet-700">
                <Calendar className="w-3 h-3" />
                {formatDate(event.date)} • {event.start_time}
              </span>

              <div className="flex gap-1.5">
                <button
                  onClick={() => onEdit?.(event)}
                  className="p-1.5 rounded-lg hover:bg-violet-50 text-slate-400 hover:text-violet-600 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDelete?.(event.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ─── DESKTOP ─── */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                Événement
              </th>

              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                Date
              </th>

              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                Lieu
              </th>

              <th className="px-4 py-2.5" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {events.map((event) => (
              <tr
                key={event.id}
                className="hover:bg-slate-50/60 transition-colors group"
              >
                {/* EVENT */}
                <td className="px-4 py-3.5 font-medium text-slate-800 max-w-[240px]">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-slate-100 p-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-500" />
                    </div>

                    <span className="block truncate">{event.title}</span>
                  </div>
                </td>

                {/* DATE */}
                <td className="px-4 py-3.5 text-slate-500">
                  <div className="flex flex-col">
                    <span>{formatDate(event.date)}</span>

                    <span className="text-xs text-slate-400">
                      {event.start_time} → {event.end_time}
                    </span>
                  </div>
                </td>

                {/* LOCATION */}
                <td className="px-4 py-3.5 text-slate-500">
                  {event.location ? (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {event.location}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3.5">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit?.(event)}
                      className="p-1.5 rounded-lg hover:bg-violet-50 text-slate-400 hover:text-violet-600 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDelete?.(event.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

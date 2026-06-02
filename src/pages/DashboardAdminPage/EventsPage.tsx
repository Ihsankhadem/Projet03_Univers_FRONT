// src/pages/DashboardAdminPage/EventsPage.tsx
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Calendar } from "lucide-react";

import DashboardHeader from "../../components/DashboardAdmin/DashboardHeader";
import DashboardTabs from "../../components/DashboardAdmin/DashboardTabs";
import DashboardSearch from "../../components/DashboardAdmin/DashboardSearch";
import DashboardSection from "../../components/DashboardAdmin/DashboardSection";
import DashboardModal from "../../components/DashboardAdmin/DashboardModal";
import ArticlesPagination from "../../components/ui/Pagination";

import EventsTable from "../../components/DashboardAdmin/AdminEvents/EventTable";
import EventForm from "../../components/DashboardAdmin/AdminEvents/EventForm";
import DashboardCard from "../../components/DashboardAdmin/DashboardCard";

import { dashboardApi } from "../../services/dashboardApi";
import type { Tab, Evenement } from "../../types";

import { toDateInput } from "../../utils/date";
import { EventSchema } from "../../schemas/event.schema";
import { toEventApi } from "../../utils/eventMapper";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("événements");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editingEvent, setEditingEvent] = useState<Evenement | null>(null);
  const [eventToDelete, setEventToDelete] = useState<Evenement | null>(null);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    image?: string;
    externalUrl?: string;
  }>({});
  const queryClient = useQueryClient();
  const limit = 5;

  const { data: events = [], isLoading } = useQuery<Evenement[]>({
    queryKey: ["events", search],
    queryFn: () => dashboardApi.getEvents(search),
  });

  const filtered = events.filter((e) =>
    `${e.title} ${e.location ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / limit);
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  const resetForm = () => {
    setEditingEvent(null);

    setTitle("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setLocation("");
    setImage("");
    setExternalUrl("");

    setErrors({});
  };
  const validateEvent = () => {
    const payload = {
      title,
      date,
      startTime,
      endTime,
      location,
      image,
      externalUrl,
    };

    const parsed = EventSchema.safeParse(payload);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;

      setErrors({
        title: fieldErrors.title?.[0] || "",
        date: fieldErrors.date?.[0] || "",
        startTime: fieldErrors.startTime?.[0] || "",
        endTime: fieldErrors.endTime?.[0] || "",
        location: fieldErrors.location?.[0] || "",
        image: fieldErrors.image?.[0] || "",
        externalUrl: fieldErrors.externalUrl?.[0] || "",
      });

      return false;
    }

    setErrors({});
    return parsed.data;
  };

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingEvent) {
        return dashboardApi.updateEvent(editingEvent.id, data);
      }

      return dashboardApi.createEvent(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setOpenForm(false);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => dashboardApi.deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setOpenDelete(false);
      setEventToDelete(null);
    },
  });

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <DashboardHeader />

      <div className="mt-8 px-8">
        <DashboardCard
          title="Événements"
          value={events.length}
          icon={<Calendar />}
          accent="purple"
        />
      </div>

      <DashboardSection
        search={
          <DashboardSearch
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
          />
        }
        action={
          <button
            onClick={() => {
              resetForm();
              setOpenForm(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-violet-600/90 px-3 py-2 font-medium text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] hover:bg-violet-500"
          >
            + Ajouter un événement
          </button>
        }
        tabs={
          <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        }
        loading={isLoading}
        isEmpty={paginated.length === 0}
        emptyMessage="Aucun événement."
        pagination={
          <ArticlesPagination
            page={page}
            totalPages={totalPages}
            onPage={setPage}
          />
        }
      >
        <EventsTable
          events={paginated}
          onEdit={(event) => {
            const formattedDate = toDateInput(event.date);

            setEditingEvent(event);
            setTitle(event.title ?? "");
            setDate(formattedDate);

            // Correction format HH:mm
            setStartTime(event.start_time?.slice(0, 5) ?? "");
            setEndTime(event.end_time?.slice(0, 5) ?? "");

            setLocation(event.location ?? "");
            setImage(event.image ?? "");
            setExternalUrl(event.external_url ?? "");

            setOpenForm(true);
          }}
          onDelete={(id) => {
            console.log("🗑️ DELETE CLICK", id);
            setEventToDelete(events.find((e) => e.id === id) || null);
            setOpenDelete(true);
          }}
        />
      </DashboardSection>

      <DashboardModal
        open={openForm}
        title={editingEvent ? "Modifier" : "Créer"}
        confirmLabel={editingEvent ? "Modifier" : "Créer"}
        loading={saveMutation.isPending}
        disabled={!title || !date}
        onClose={() => {
          setOpenForm(false);
          resetForm();
        }}
        onConfirm={() => {
          const validated = validateEvent();
          if (!validated) return;

          const data = {
            title,
            date,
            start_time: startTime,
            end_time: endTime,
            location,
            image,
            external_url: externalUrl,
          };

          saveMutation.mutate(data);
        }}
      >
        <EventForm
          title={title}
          setTitle={setTitle}
          date={date}
          setDate={setDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          location={location}
          setLocation={setLocation}
          image={image}
          setImage={setImage}
          externalUrl={externalUrl}
          setExternalUrl={setExternalUrl}
        />
      </DashboardModal>

      <DashboardModal
        open={openDelete}
        title="Supprimer"
        description={`Supprimer "${eventToDelete?.title}" ?`}
        confirmLabel="Supprimer"
        variant="danger"
        loading={deleteMutation.isPending}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          if (eventToDelete) deleteMutation.mutate(eventToDelete.id);
        }}
      />
    </div>
  );
}

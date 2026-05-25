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

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("événements");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editingEvent, setEditingEvent] = useState<Evenement | null>(null);
  const [eventToDelete, setEventToDelete] = useState<Evenement | null>(null);

  // ================= FORM =================
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [externalUrl, setExternalUrl] = useState("");

  const limit = 5;

  const queryClient = useQueryClient();

  // ================= GET EVENTS =================
  const { data: events = [], isLoading } = useQuery<Evenement[]>({
    queryKey: ["events", search],
    queryFn: () => dashboardApi.getEvents(search),
  });

  // ================= FILTER =================
  const filteredEvents = events.filter((e) =>
    `${e.title} ${e.location ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredEvents.length / limit);

  const paginatedEvents = filteredEvents.slice(
    (page - 1) * limit,
    page * limit,
  );

  // ================= RESET FORM =================
  const resetForm = () => {
    setEditingEvent(null);

    setTitle("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setLocation("");
    setImage("");
    setExternalUrl("");
  };

  // ================= CREATE / UPDATE =================
  const saveMutation = useMutation({
    mutationFn: async () => {
      const data = {
        title,
        date,
        start_time: startTime,
        end_time: endTime,
        location,
        image,
        external_url: externalUrl,
      };

      if (editingEvent) {
        return dashboardApi.updateEvent(editingEvent.id, data);
      }

      return dashboardApi.createEvent(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });

      setOpenForm(false);

      resetForm();
    },
  });

  // ================= DELETE =================
  const deleteMutation = useMutation({
    mutationFn: (id: number) => dashboardApi.deleteEvent(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });

      setOpenDelete(false);
      setEventToDelete(null);
    },
  });

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <DashboardHeader />

      {/* ================= STATS ================= */}
      <div className="mt-8 px-8">
        <DashboardCard
          title="Événements"
          value={events.length}
          icon={<Calendar className="h-4 w-4" />}
          accent="purple"
        />
      </div>

      {/* ================= TABLE ================= */}
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
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-3 py-2 text-white"
          >
            + Ajouter un événement
          </button>
        }
        tabs={
          <DashboardTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        }
        loading={isLoading}
        isEmpty={paginatedEvents.length === 0}
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
          events={paginatedEvents}
          onEdit={(event) => {
            setEditingEvent(event);

            setTitle(event.title ?? "");
            setDate(event.date ?? "");
            setStartTime(event.start_time ?? "");
            setEndTime(event.end_time ?? "");
            setLocation(event.location ?? "");
            setImage(event.image ?? "");
            setExternalUrl(event.external_url ?? "");

            setOpenForm(true);
          }}
          onDelete={(id) => {
            const foundEvent =
              events.find((event) => event.id === id) || null;

            setEventToDelete(foundEvent);
            setOpenDelete(true);
          }}
        />
      </DashboardSection>

      {/* ================= FORM MODAL ================= */}
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
        onConfirm={() => saveMutation.mutate()}
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

      {/* ================= DELETE MODAL ================= */}
      <DashboardModal
        open={openDelete}
        title="Supprimer"
        description={`Supprimer "${eventToDelete?.title}" ?`}
        confirmLabel="Supprimer"
        variant="danger"
        loading={deleteMutation.isPending}
        onClose={() => {
          setOpenDelete(false);
          setEventToDelete(null);
        }}
        onConfirm={() => {
          if (eventToDelete) {
            deleteMutation.mutate(eventToDelete.id);
          }
        }}
      />
    </div>
  );
}
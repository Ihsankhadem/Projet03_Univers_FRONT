import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Folder, FileText, Layers3, Users } from "lucide-react";

import UsersTable from "../../components/DashboardAdmin/AdminUsers/UsersTable";
import DashboardTabs from "../../components/DashboardAdmin/DashboardTabs";
import DashboardSearch from "../../components/DashboardAdmin/DashboardSearch";
import DashboardHeader from "../../components/DashboardAdmin/DashboardHeader";
import DashboardCard from "../../components/DashboardAdmin/DashboardCard";
import DashboardModal from "../../components/DashboardAdmin/DashboardModal";
import ArticlesPagination from "../../components/ui/Pagination";
import DashboardSection from "../../components/DashboardAdmin/DashboardSection";
import UserForm from "../../components/DashboardAdmin/AdminUsers/UserForm";

import { dashboardApi } from "../../services/dashboardApi";
import { userSchema } from "../../schemas/user.schema";
import type { Tab, User, UserStats } from "../../types";

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<Tab>("utilisateurs");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"rédacteur" | "administrateur">("rédacteur");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
  }>({});

  const queryClient = useQueryClient();
  const limit = 5;

  // ================= USERS =================
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => dashboardApi.getUsers(),
  });

  const allUsers = users ?? [];

  // ================= VALIDATION =================
  const validateUser = () => {
    const result = userSchema.safeParse({ name, email, role });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
      });

      return false;
    }

    setErrors({});
    return true;
  };

  // ================= SAVE =================
  const saveUserMutation = useMutation({
    mutationFn: async () => {
      if (editingUser) {
        return dashboardApi.updateUser(editingUser.id, {
          name,
          email,
          role,
        });
      }

      return dashboardApi.createUser({ name, email, role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      setOpenForm(false);
      setEditingUser(null);
      setName("");
      setEmail("");
      setRole("rédacteur");
      setErrors({});
    },
  });

  // ================= DELETE =================
  const deleteMutation = useMutation({
    mutationFn: (id: number) => dashboardApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpenDelete(false);
      setUserToDelete(null);
    },
  });

  // ================= FILTER =================
  const filteredUsers = allUsers.filter((u) => {
    const v = `${u.name ?? ""}${u.email ?? ""}`.toLowerCase();
    return v.includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filteredUsers.length / limit);
  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  // ================= STATS =================
  const { data: stats, isLoading: loadingStats } = useQuery<UserStats>({
    queryKey: ["user-stats"],
    queryFn: dashboardApi.getUserStats,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <DashboardHeader />

      {/* ================= STATS ================= */}
      <div className="mt-8 px-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">
          Vue d’ensemble
        </h2>

        {loadingStats ? (
          <div className="flex flex-wrap justify-center gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 w-[260px] animate-pulse rounded-2xl bg-white/60 backdrop-blur-md border border-white/40"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard
              title="Utilisateurs"
              value={stats?.total_users ?? 0}
              icon={<Folder className="h-4 w-4" />}
              accent="blue"
            />
            <DashboardCard
              title="Articles publiés"
              value={stats?.total_articles ?? 0}
              icon={<FileText className="h-4 w-4" />}
              accent="green"
            />
            <DashboardCard
              title="Administrateurs"
              value={stats?.total_admins ?? 0}
              icon={<Layers3 className="h-4 w-4" />}
              accent="purple"
            />
            <DashboardCard
              title="Rédacteurs"
              value={stats?.total_editors ?? 0}
              icon={<Users className="h-4 w-4" />}
              accent="amber"
            />
          </div>
        )}
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
              setEditingUser(null);
              setName("");
              setEmail("");
              setRole("rédacteur");
              setOpenForm(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-violet-600/90 px-3 py-2 font-medium text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] hover:bg-violet-500"
          >
            + Ajouter un utilisateur
          </button>
        }
        tabs={
          <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        }
        loading={isLoading}
        isEmpty={paginatedUsers.length === 0}
        emptyMessage="Aucun utilisateur trouvé."
        pagination={
          <ArticlesPagination
            page={page}
            totalPages={totalPages}
            onPage={setPage}
          />
        }
      >
        <UsersTable
          users={paginatedUsers}
          onEdit={(user) => {
            setEditingUser(user);
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            setOpenForm(true);
          }}
          onDelete={(id) => {
            setUserToDelete(allUsers.find((u) => u.id === id) || null);
            setOpenDelete(true);
          }}
        />
      </DashboardSection>

      {/* ================= FORM MODAL ================= */}
      <DashboardModal
        open={openForm}
        title={editingUser ? "Modifier l'utilisateur" : "Créer un utilisateur"}
        description={
          editingUser
            ? "Modifiez les informations utilisateur."
            : "Ajoutez un nouvel utilisateur."
        }
        confirmLabel={editingUser ? "Mettre à jour" : "Créer"}
        loading={saveUserMutation.isPending}
        disabled={!name.trim() || !email.trim()}
        onClose={() => {
          setOpenForm(false);
          setEditingUser(null);
          setName("");
          setEmail("");
          setRole("rédacteur");
          setErrors({});
        }}
        onConfirm={() => {
          if (!validateUser()) return;
          saveUserMutation.mutate();
        }}
      >
        <UserForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          role={role}
          setRole={setRole}
          errors={errors}
        />
      </DashboardModal>

      {/* ================= DELETE MODAL ================= */}
      <DashboardModal
        open={openDelete}
        title="Supprimer l'utilisateur"
        description={`Supprimer "${userToDelete?.name}" ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        variant="danger"
        loading={deleteMutation.isPending}
        onClose={() => {
          setOpenDelete(false);
          setUserToDelete(null);
        }}
        onConfirm={() => {
          if (userToDelete) {
            deleteMutation.mutate(userToDelete.id);
          }
        }}
      >
        <p className="text-sm text-slate-500">
          Cet utilisateur sera supprimé définitivement.
        </p>
      </DashboardModal>
    </div>
  );
}

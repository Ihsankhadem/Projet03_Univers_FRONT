import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Folder, FileText, Layers3 } from "lucide-react";
import UsersTable from "../../components/DashboardAdmin/AdminUsers/UsersTable";
import DashboardTabs from "../../components/DashboardAdmin/DashboardTabs";
import DashboardSearch from "../../components/DashboardAdmin/DashboardSearch";
import DashboardHeader from "../../components/DashboardAdmin/DashboardHeader";
import DashboardCard from "../../components/DashboardAdmin/DashboardCard";
import DashboardModal from "../../components/DashboardAdmin/DashboardModal";
import ArticlesPagination from "../../components/ui/Pagination";
import { dashboardApi } from "../../services/dashboardApi";
import type { Tab, User } from "../../types";

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<Tab>("users");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"rédacteur" | "administrateur">("rédacteur");

  const limit = 6;
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => dashboardApi.getUsers(),
  });

  const allUsers = users ?? [];

  const saveUserMutation = useMutation({
    mutationFn: async () => {
      if (editingUser) {
        return dashboardApi.updateUser(editingUser.id, { name, email, role });
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
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => dashboardApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpenDelete(false);
      setUserToDelete(null);
    },
  });

  const filteredUsers = allUsers.filter((u) => {
    const v = `${u.name ?? ""}${u.email ?? ""}`.toLowerCase();
    return v.includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filteredUsers.length / limit);
  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  const totalUsers = allUsers.length;
  const totalArticles = allUsers.reduce(
    (a, u) => a + (u.total_articles ?? 0),
    0,
  );

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <DashboardHeader />

      <div className="mt-8 px-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">
          Vue d’ensemble
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Utilisateurs"
            value={totalUsers}
            icon={<Folder className="h-4 w-4" />}
            accent="blue"
          />
          <DashboardCard
            title="Articles publiés"
            value={totalArticles}
            icon={<FileText className="h-4 w-4" />}
            accent="green"
          />
          <DashboardCard
            title="Organisation"
            value={totalUsers}
            icon={<Layers3 className="h-4 w-4" />}
            accent="purple"
          />
        </div>
      </div>

      <div className="mt-10 px-16 pb-20">
        <div className="rounded-2xl border border-[#E2E8F0] bg-[rgba(255,255,255,0.6)] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full max-w-md">
              <DashboardSearch
                value={search}
                onChange={(v) => {
                  setSearch(v);
                  setPage(1);
                }}
              />
            </div>

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

            <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="mt-6">
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 animate-pulse rounded-xl bg-white"
                  />
                ))}
              </div>
            ) : paginatedUsers.length === 0 ? (
              <div className="py-10 text-center text-slate-500">
                Aucun utilisateur trouvé.
              </div>
            ) : (
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
            )}
          </div>

          <div className="mt-10">
            <ArticlesPagination
              page={page}
              totalPages={totalPages}
              onPage={setPage}
            />
          </div>
        </div>
      </div>

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
        }}
        onConfirm={() => saveUserMutation.mutate()}
      >
        <div className="space-y-4">
          <input
            className="w-full rounded-xl border p-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom"
          />
          <input
            className="w-full rounded-xl border p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <select
            className="w-full rounded-xl border p-3"
            value={role}
            onChange={(e) => setRole(e.target.value as "rédacteur" | "administrateur")}
          >
            <option value="rédacteur">Rédacteur</option>
            <option value="administrateur">Administrateur</option>
          </select>
        </div>
      </DashboardModal>

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
        onConfirm={() => userToDelete && deleteMutation.mutate(userToDelete.id)}
      >
        <p className="text-sm text-slate-500">
          Cet utilisateur sera supprimé définitivement.
        </p>
      </DashboardModal>
    </div>
  );
}

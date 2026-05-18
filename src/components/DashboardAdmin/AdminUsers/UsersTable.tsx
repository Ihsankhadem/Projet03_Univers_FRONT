// components/DashboardAdmin/AdminUsers/UsersTable.tsx

import { User as UserIcon, Pencil, Trash2, FileText } from "lucide-react";

import type { User } from "../../../types";

interface Props {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (id: number) => void;
}

export default function UsersTable({ users, onEdit, onDelete }: Props) {
  if (!users.length) {
    return (
      <p className="text-center py-10 text-slate-400 text-sm">
        Aucun utilisateur trouvé
      </p>
    );
  }

  return (
    <div className="mt-4">
      {/* ─── MOBILE ─── */}
      <div className="sm:hidden flex flex-col gap-3 px-4">
        {users.map((user) => (
          <article
            key={user.id}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-slate-100 p-1.5">
                  <UserIcon className="h-3.5 w-3.5 text-slate-500" />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-800 text-sm leading-snug">
                    {user.name}
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-[#EEF2FF] text-violet-700">
                <FileText className="w-3 h-3" />
                {(user.total_articles ?? 0).toLocaleString("fr-FR")} article
                {(user.total_articles ?? 0) > 1 ? "s" : ""}
              </span>

              <div className="flex gap-1.5">
                <button
                  onClick={() => onEdit?.(user)}
                  className="p-1.5 rounded-lg hover:bg-violet-50 text-slate-400 hover:text-violet-600 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDelete?.(user.id)}
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
                Utilisateur
              </th>

              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                Articles
              </th>

              <th className="px-4 py-2.5" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-slate-50/60 transition-colors group"
              >
                {/* User */}
                <td className="px-4 py-3.5 font-medium text-slate-800 max-w-[240px]">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-slate-100 p-1.5">
                      <UserIcon className="h-3.5 w-3.5 text-slate-500" />
                    </div>

                    <div className="flex flex-col">
                      <span className="block truncate">{user.name}</span>

                      <span className="text-xs font-normal text-slate-400">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Articles */}
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-[#EEF2FF] text-violet-700">
                    <FileText className="w-3 h-3" />
                    {(user.total_articles ?? 0).toLocaleString("fr-FR")} article
                    {(user.total_articles ?? 0) > 1 ? "s" : ""}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3.5">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit?.(user)}
                      className="p-1.5 rounded-lg hover:bg-violet-50 text-slate-400 hover:text-violet-600 transition-colors"
                      title="Modifier"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDelete?.(user.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                      title="Supprimer"
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

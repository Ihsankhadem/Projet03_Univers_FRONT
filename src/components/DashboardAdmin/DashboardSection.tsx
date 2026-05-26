// DashbardAdmin/DashboardSection.tsx

// Component réutilisable pour les sections du dashboard (articles, catégories, utilisateurs, événements)
// Gère l'affichage de la barre de recherche, des actions, des onglets, du contenu, et de la pagination
import type { ReactNode } from "react";

type Props = {
  search: ReactNode;
  action?: ReactNode;
  tabs?: ReactNode;

  loading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;

  children: ReactNode;
  pagination?: ReactNode;
};

export default function DashboardSection({
  search,
  action,
  tabs,
  loading = false,
  isEmpty = false,
  emptyMessage = "Aucune donnée.",
  children,
  pagination,
}: Props) {
  return (
    <div className="px-8 mt-10 pb-20">
      <div className="rounded-2xl border border-[#E2E8F0] bg-[rgba(255,255,255,0.6)] p-8 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        {/* TOP BAR */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full max-w-md">{search}</div>

          {action && <div className="flex justify-start">{action}</div>}

          {tabs && <div className="flex-shrink-0">{tabs}</div>}
        </div>

        {/* CONTENT */}
        <div className="mt-6">
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 animate-pulse rounded-xl bg-white"
                />
              ))}
            </div>
          ) : isEmpty ? (
            <div className="py-10 text-center text-slate-500">
              {emptyMessage}
            </div>
          ) : (
            children
          )}
        </div>

        {/* PAGINATION */}
        {pagination && <div className="mt-10">{pagination}</div>}
      </div>
    </div>
  );
}

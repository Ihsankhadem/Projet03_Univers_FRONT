import { ShieldCheck, PenTool } from "lucide-react";
import { useAuth } from "../../Hooks/useAuth";

export default function DashboardHeader() {
  const { user } = useAuth();

  const isAdmin = user?.role === "administrateur";

  return (
    <header className="bg-[#0B1120] border-b border-slate-800 px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
            {isAdmin ? (
              <ShieldCheck className="w-5 h-5 text-violet-400" />
            ) : (
              <PenTool className="w-5 h-5 text-emerald-400" />
            )}
          </div>

          <div>
            <h1 className="text-lg font-semibold text-white">
              {isAdmin ? "Panel Administrateur" : "Espace Rédacteur"}
            </h1>

            <p className="text-xs text-slate-400">
              {isAdmin ? "Gestion globale du site" : "Gestion de vos articles"}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 ${
            isAdmin
              ? "bg-red-500/10 border-red-500/20 text-red-300"
              : "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
          }`}
        >
          {isAdmin ? (
            <ShieldCheck className="w-4 h-4" />
          ) : (
            <PenTool className="w-4 h-4" />
          )}

          <span className="text-xs font-medium">
            {isAdmin ? "Admin" : "Rédacteur"}
          </span>
        </div>
      </div>
    </header>
  );
}

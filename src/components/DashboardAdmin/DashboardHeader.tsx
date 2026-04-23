import { ShieldCheck } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="bg-[#0B1120] border-b border-slate-800 px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-violet-400" />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-white">
              Panel Administrateur
            </h1>
            <p className="text-xs text-slate-400">
              Bienvenue sur votre espace
            </p>
          </div>

        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
          <ShieldCheck className="w-4 h-4 text-red-400" />
          <span className="text-xs text-red-300 font-medium">
            Admin
          </span>
        </div>

      </div>
    </header>
  );
}
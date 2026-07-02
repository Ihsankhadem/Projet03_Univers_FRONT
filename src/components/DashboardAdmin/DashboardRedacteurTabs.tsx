// src/components/DashboardRedacteur/DashboardRedacteurTabs.tsx

export type RedacteurTab = "mes-articles" | "tous-les-articles";

interface Props {
  activeTab: RedacteurTab;
  setActiveTab: (tab: RedacteurTab) => void;
}

const TABS = [
  {
    id: "mes-articles" as const,
    label: "Mes articles",
  },
  {
    id: "tous-les-articles" as const,
    label: "Tous les articles",
  },
];

export default function DashboardRedacteurTabs({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <div
      role="tablist"
      className="flex items-center gap-1 rounded-lg bg-slate-100 p-1"
    >
      {TABS.map(({ id, label }) => (
        <button
          key={id}
          role="tab"
          aria-selected={activeTab === id}
          onClick={() => setActiveTab(id)}
          className={`
            px-3.5 py-1.5 rounded-md text-sm font-medium transition-all
            focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
            ${
              activeTab === id
                ? "bg-white text-slate-800 shadow-sm border border-slate-200/80"
                : "text-slate-500 hover:text-slate-700"
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

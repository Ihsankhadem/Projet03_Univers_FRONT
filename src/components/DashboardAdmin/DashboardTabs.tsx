// components/DashboardAdmin/DashboardTabs.tsx
import { useNavigate } from "react-router-dom";
import type { Tab } from "../../types";

interface Props {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "articles", label: "Articles" },
  { id: "categories", label: "Catégories" },
  { id: "utilisateurs", label: "Utilisateurs" },
];

export default function DashboardTabs({ activeTab, setActiveTab }: Props) {
  const navigate = useNavigate();

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);

    switch (tab) {
      case "articles":
        navigate("/dashboard");
        break;

      case "categories":
        navigate("/categories");
        break;

      case "utilisateurs":
        navigate("/dashboard/users");
        break;

      default:
        break;
    }
  };

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
          onClick={() => handleTabClick(id)}
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

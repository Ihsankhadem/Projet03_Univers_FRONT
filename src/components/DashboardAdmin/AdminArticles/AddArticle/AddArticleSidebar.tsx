
import { useAuth } from "../../../../Hooks/useAuth";
import type { Category } from "../../../../types";

type Status = "publié" | "brouillon" | "suspendu";

interface Props {
  categories: Category[];
  categoryId: number | null;
  setCategoryId: (id: number) => void;
  author: string;
  status: Status;
  setStatus: (status: Status) => void;
}

export default function AddArticleSidebar({
  categories,
  categoryId,
  setCategoryId,
  status,
  setStatus,
  author,
}: Props) {
  useAuth(); // 👈 évite erreur "user unused" sans changer ton design

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Status;
    setStatus(value);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">

      <h3 className="text-lg font-bold text-slate-800">
        Informations
      </h3>

      {/* AUTEUR */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Auteur
        </label>

        <input
          value={author}
          readOnly
          className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-600"
        />
      </div>

      {/* CATÉGORIE */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Catégorie
        </label>

        <select
          value={categoryId ?? ""}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm"
        >
          <option value="">Sélectionner</option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* STATUT */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Statut
        </label>

        <select
          value={status}
          onChange={handleStatusChange}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm"
        >
          <option value="publié">Publié</option>
          <option value="brouillon">Brouillon</option>
          <option value="suspendu">Suspendu</option>
        </select>
      </div>

    </div>
  );
}
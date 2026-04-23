
type Props = {
  authorName: string;
  categoryId: number | null;
  categories: any[];
  status: "publié" | "brouillon" | "suspendu";
  setCategoryId: (value: number) => void;
  setStatus: (
    value: "publié" | "brouillon" | "suspendu"
  ) => void;
};

export default function UpdateArticleSidebar({
  authorName,
  categoryId,
  categories,
  status,
  setCategoryId,
  setStatus,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
      <h3 className="text-lg font-bold text-slate-800">
        Informations
      </h3>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Auteur
        </label>

        <input
          value={authorName}
          readOnly
          className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3 text-sm"
        />
      </div>

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

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Statut
        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as
                | "publié"
                | "brouillon"
                | "suspendu"
            )
          }
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
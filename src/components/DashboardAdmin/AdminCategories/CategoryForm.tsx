// components/DashboardAdmin/AdminCategories/CategoryForm.tsx

type Props = {
  name: string;
  description?: string;
  setName: (value: string) => void;
  setDescription?: (value: string) => void;
};

export default function CategoryForm({
  name,
  description,
  setName,
  setDescription,
}: Props) {
  return (
    <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="space-y-6">
        {/* NOM */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Nom de la catégorie
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex : Astronomie"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white"
          />
        </div>

        {/* DESCRIPTION (OPTIONNELLE) */}
        {setDescription && (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décris rapidement cette catégorie..."
              className="min-h-[180px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white"
            />
          </div>
        )}
      </div>
    </div>
  );
}

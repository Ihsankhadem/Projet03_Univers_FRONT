// src/components/DashboardAdmin/AdminArticles/form/ArticleActions.tsx
interface Props {
  onCancel: () => void;
}
export default function AddArticleActions({ onCancel }: Props) {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 border border-slate-300 rounded-2xl py-3 text-slate-700 hover:bg-slate-100 transition"
      >
        Annuler
      </button>

      <button
        type="submit"
        className="flex-1 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl py-3 font-semibold transition"
      >
        Enregistrer
      </button>
    </div>
  );
}

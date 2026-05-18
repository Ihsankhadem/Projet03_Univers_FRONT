
// DashboardAdmin/UpdateArticle/UpdateArticleForm.tsx
type Props = {
  title: string;
  content: string;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
};

export default function UpdateArticleForm({
  title,
  content,
  setTitle,
  setContent,
}: Props) {
  return (
    <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
      {/* TITRE */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Titre
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm"
          placeholder="Titre de l'article"
        />
      </div>

      {/* CONTENU */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Contenu
        </label>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[350px] bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm"
          placeholder="Écris ton article ici..."
        />
      </div>
    </div>
  );
}

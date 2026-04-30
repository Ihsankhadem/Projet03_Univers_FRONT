type Props = {
  title: string;
  content: string;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
};

export default function AddArticleForm({
  title,
  content,
  setTitle,
  setContent,
}: Props) {
  return (
    <div className="space-y-6">

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Titre
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de l'article"
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Contenu
        </label>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Écris ton article ici..."
          className="w-full min-h-[350px] bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm"
        />
      </div>

    </div>
  );
}
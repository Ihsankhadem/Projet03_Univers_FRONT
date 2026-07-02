type Props = {
  title: string;
  content: string;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;

  errors: {
    title?: string;
    content?: string;
  };
};

export default function AddArticleForm({
  title,
  content,
  setTitle,
  setContent,
  errors,
}: Props) {
  return (
    <div className="space-y-6">
      {/* TITRE */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Titre
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de l'article"
          className={`w-full bg-slate-50 border rounded-2xl px-4 py-3 text-sm outline-none transition ${
            errors.title
              ? "border-red-400 focus:border-red-400"
              : "border-slate-200 focus:border-violet-300"
          }`}
        />

        {errors.title && (
          <p className="mt-2 text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      {/* CONTENU */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Contenu
        </label>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Écris ton article ici..."
          className={`w-full min-h-[350px] bg-slate-50 border rounded-2xl px-4 py-4 text-sm outline-none transition ${
            errors.content
              ? "border-red-400 focus:border-red-400"
              : "border-slate-200 focus:border-violet-300"
          }`}
        />

        {errors.content && (
          <p className="mt-2 text-sm text-red-500">{errors.content}</p>
        )}
      </div>
    </div>
  );
}

import { Pencil } from "lucide-react";

export default function UpdateArticleHeader() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="bg-violet-100 p-3 rounded-2xl">
        <Pencil className="w-6 h-6 text-violet-600" />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Modifier l’article
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Modifiez les informations de votre article.
        </p>
      </div>
    </div>
  );
}

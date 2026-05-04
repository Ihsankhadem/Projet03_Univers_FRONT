import { PlusCircle } from "lucide-react";

export default function AddArticleHeader() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="bg-violet-100 p-3 rounded-2xl">
        <PlusCircle className="w-7 h-7 text-violet-600" />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Ajouter un article
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Ajoutez les informations de votre article.
        </p>
      </div>
    </div>
  );
}

import { PlusCircle, Pencil } from "lucide-react";

type Props = {
  isEditMode: boolean;
};

export default function ArticleHeader({ isEditMode }: Props) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="bg-violet-100 p-3 rounded-2xl">
        {isEditMode ? (
          <Pencil className="w-7 h-7 text-violet-600" />
        ) : (
          <PlusCircle className="w-7 h-7 text-violet-600" />
        )}
      </div>

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          {isEditMode ? "Modifier un article" : "Ajouter un article"}
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          {isEditMode
            ? "Modifiez les informations de votre article."
            : "Ajoutez les informations de votre article."}
        </p>
      </div>
    </div>
  );
}

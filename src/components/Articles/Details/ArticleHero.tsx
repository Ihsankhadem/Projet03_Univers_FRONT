import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Props {
  image?: string; // URL de l'image de couverture de l'article ? = optionnel
  title: string;
  backTo?: string; // URL de la page vers laquelle le lien "Retour" doit rediriger, par défaut "/articles"
}

export default function ArticleHero({
  image,
  title,
  backTo = "/articles",
}: Props) {
  return (
    <div className="relative h-72 md:h-96 overflow-hidden">
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover opacity-50"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-900 to-violet-900" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/40 to-transparent" />
      <Link
        to={backTo}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-300 hover:text-violet-300 transition-colors text-sm bg-[#0B0F1A]/60 px-3 py-1.5 rounded-full"
      >
        <ArrowLeft className="w-4 h-4" /> Retour
      </Link>
    </div>
  );
}

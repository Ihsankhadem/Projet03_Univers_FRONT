import { Mail, Phone, MapPin, type LucideIcon } from "lucide-react";
// icone + titre + lignes d'infos sont regroupés dans un tableau d'objets pour éviter de répéter le même code pour chaque info et ce sont des propriétés de chaque objet qui sont utilisées pour afficher les infos dans le composant ContactInfoCard.
const infos: { icon: LucideIcon; title: string; lines: string[] }[] = [
  {
    icon: Mail,
    title: "Email",
    lines: ["contact@blogunivers.com", "redaction@blogunivers.com"],
  },
  {
    icon: Phone,
    title: "Téléphone",
    lines: ["+33 1 23 45 67 89", "Lun-Ven 9h-18h"],
  },
  {
    icon: MapPin,
    title: "Adresse",
    lines: ["123 Avenue des Étoiles", "75001 Paris, France"],
  },
];

export default function ContactInfoCard() {
  return (
    <div className="flex flex-col gap-4">
      {infos.map(({ icon: Icon, title, lines }) => (
        <div
          key={title}
          className="bg-[#1E293B] border border-slate-700 rounded-xl p-5 flex items-start gap-4"
        >
          <div className="bg-violet-600/20 p-2.5 rounded-lg shrink-0">
            <Icon className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <p className="font-semibold text-slate-100 mb-1">{title}</p>
            {/* .map = parcourir les lignes */}
            {lines.map((l) => (
              <p key={l} className="text-slate-400 text-sm">
                {l}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

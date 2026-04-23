import { FileText, Users, ShieldCheck } from "lucide-react";

const stats = [
  { value: "200+", label: "Articles publiés", icon: FileText },
  { value: "50+", label: "Rédacteurs actifs", icon: Users },
  { value: "100%", label: "Gratuit et ouvert", icon: ShieldCheck },
];

export default function StatsSection() {
  return (
    <section className="bg-[#0B0F1A] py-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="p-10 rounded-2xl bg-[#1E293B] border border-slate-700 shadow-[0_0_20px_rgba(109,40,217,0.15)] hover:shadow-[0_0_25px_rgba(109,40,217,0.25)] transition-all"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-10 h-10 text-violet-400" />
                </div>

                <p className="text-4xl font-extrabold text-violet-300 drop-shadow-sm">
                  {stat.value}
                </p>

                <p className="text-slate-400 mt-3 text-sm font-medium tracking-wide">
                  {stat.label}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

import React from "react";

interface Props {
  title: string;
  value: number;
  delta?: string;
  deltaLabel?: string;
  icon: React.ReactNode;
  accent: "purple" | "green" | "amber" | "blue";
}

const ACCENTS = {
  purple: {
    icon: "bg-[#EEEDFE] text-[#534AB7]",
    delta: "text-[#534AB7]",
    bar: "bg-[#534AB7]",
  },
  green: {
    icon: "bg-[#EAF3DE] text-[#3B6D11]",
    delta: "text-[#3B6D11]",
    bar: "bg-[#639922]",
  },
  amber: {
    icon: "bg-[#FAEEDA] text-[#854F0B]",
    delta: "text-[#854F0B]",
    bar: "bg-[#BA7517]",
  },
  blue: {
    icon: "bg-[#E6F1FB] text-[#185FA5]",
    delta: "text-[#185FA5]",
    bar: "bg-[#185FA5]",
  },
};

export default function DashboardCard({
  title,
  value,
  delta,
  deltaLabel,
  icon,
  accent,
}: Props) {
  const colors = ACCENTS[accent];

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-4 hover:border-slate-200 transition-colors">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
          {title}
        </p>
        <div className={`p-2 rounded-xl ${colors.icon}`}>{icon}</div>
      </div>

      <p className="text-3xl font-semibold text-slate-800 leading-none tabular-nums">
        {value.toLocaleString("fr-FR")}
      </p>

      {delta && (
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-semibold ${colors.delta}`}>
            {delta}
          </span>
          {deltaLabel && (
            <span className="text-xs text-slate-400">{deltaLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { Clock } from "lucide-react";

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

export default function ModernTime({ label, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0"),
  );
  const minutes = ["00", "15", "30", "45"];
  const [h, m] = value.split(":");
  const setTime = (newH: string, newM: string) => {
    onChange(`${newH}:${newM}`);
  };

  return (
    <div className="relative">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-2xl border bg-slate-50 px-4 py-3 text-sm hover:bg-white transition"
      >
        <div className="flex items-center gap-2 text-slate-700">
          <Clock className="h-4 w-4 text-slate-400" />
          {value || "Choisir une heure"}
        </div>

        <span className="text-slate-400">⌄</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl border bg-white p-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {/* HOURS */}
            <div className="max-h-40 overflow-y-auto">
              <p className="mb-2 text-xs text-slate-500">Heure</p>
              {hours.map((hour) => (
                <button
                  key={hour}
                  onClick={() => setTime(hour, m || "00")}
                  className={`w-full rounded-lg px-2 py-1 text-sm hover:bg-violet-50 ${
                    hour === h ? "bg-violet-100 text-violet-700" : ""
                  }`}
                >
                  {hour}
                </button>
              ))}
            </div>

            <div>
              <p className="mb-2 text-xs text-slate-500">Minutes</p>
              {minutes.map((minute) => (
                <button
                  key={minute}
                  onClick={() => setTime(h || "00", minute)}
                  className={`w-full rounded-lg px-2 py-1 text-sm hover:bg-violet-50 ${
                    minute === m ? "bg-violet-100 text-violet-700" : ""
                  }`}
                >
                  {minute}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="mt-3 w-full rounded-xl bg-violet-600 py-2 text-sm text-white"
          >
            Valider
          </button>
        </div>
      )}
    </div>
  );
}

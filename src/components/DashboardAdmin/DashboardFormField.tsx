// src/components/DashboardAdmin/DashboardFormField.tsx
interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;

  placeholder?: string;
  textarea?: boolean;
  type?: string;

  error?: string;
}

export default function DashboardFormField({
  label,
  value,
  onChange,
  textarea = false,
  type = "text",
  error,
}: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      {type === "date" ? (
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:bg-white ${
            error
              ? "border-red-400 focus:border-red-400"
              : "border-slate-200 focus:border-violet-300"
          }`}
        />
      ) : type === "time" ? (
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:bg-white ${
            error
              ? "border-red-400 focus:border-red-400"
              : "border-slate-200 focus:border-violet-300"
          }`}
        />
      ) : textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`min-h-[180px] w-full rounded-2xl border bg-slate-50 px-4 py-4 text-sm text-slate-700 outline-none transition focus:bg-white ${
            error
              ? "border-red-400 focus:border-red-400"
              : "border-slate-200 focus:border-violet-300"
          }`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:bg-white ${
            error
              ? "border-red-400 focus:border-red-400"
              : "border-slate-200 focus:border-violet-300"
          }`}
        />
      )}

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

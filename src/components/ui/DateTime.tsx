// src/components/ui/DateTime.tsx
interface Props {
  date: string;
  setDate: (v: string) => void;
}

export default function DateTime({ date, setDate }: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Date
      </label>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-300"
      />
    </div>
  );
}

import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function DashboardSearch({ value, onChange }: Props) {
  return (
    <div className="relative w-full max-w-md">
      {/* 🔍 Icône */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

      {/* Input */}
      <input
        type="text"
        placeholder="Rechercher..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>
  );
}
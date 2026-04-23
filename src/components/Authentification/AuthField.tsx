// AuthField.tsx
import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

interface Props {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  autoComplete: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthField({ id, label, icon, type, placeholder, autoComplete, value, error, onChange }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType  = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[#F1F5F9]">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">
          {icon}
        </span>
        <input
          id={id} name={id} type={inputType}
          value={value} onChange={onChange}
          placeholder={placeholder} autoComplete={autoComplete}
          className={`w-full bg-[#0B0F1A] rounded-xl py-3 pl-10 text-sm text-[#F1F5F9] placeholder-[#94A3B8] border outline-none transition-all
            focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20
            ${isPassword ? "pr-10" : "pr-4"}
            ${error ? "border-red-500" : "border-white/10 hover:border-white/20"}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            aria-label={showPassword ? "Masquer" : "Afficher"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs text-[#FCA5A5] flex items-center gap-1" role="alert">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}
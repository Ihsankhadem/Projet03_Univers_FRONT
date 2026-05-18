// DashboardAdmin/AdminCategories/CategoryModal.tsx
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: "default" | "danger";
  onClose: () => void;
  onConfirm: () => void;
  children?: ReactNode;
}

export default function CategoryModal({
  open,
  title,
  description,
  confirmLabel,
  loading,
  disabled,
  variant = "default",
  onClose,
  onConfirm,
  children,
}: Props) {
  if (!open) return null;

  const buttonStyle =
    variant === "danger"
      ? "bg-red-500 hover:bg-red-400"
      : "bg-violet-600 hover:bg-violet-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">{title}</h2>

            {description && (
              <p className="mt-1 text-sm leading-relaxed text-slate-400">
                {description}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {children && <div className="mt-6">{children}</div>}

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Annuler
          </button>

          <button
            onClick={onConfirm}
            disabled={disabled || loading}
            className={`rounded-xl px-5 py-2 text-sm font-medium text-white transition disabled:opacity-50 ${buttonStyle}`}
          >
            {loading ? "Chargement..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

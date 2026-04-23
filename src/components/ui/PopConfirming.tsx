
import React from "react";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function PopConfirm({
  open,
  title = "Confirmer l’action",
  message = "Êtes-vous sûr de vouloir continuer ?",
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm animate-fadeIn">
        
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        <p className="text-slate-600 mt-2">{message}</p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            {cancelLabel}
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

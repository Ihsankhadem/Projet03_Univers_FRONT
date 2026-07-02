// src/pages/DashboardRedacteur/ChangePasswordPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dashboardApi } from "../../services/dashboardApi";
import PopConfirm from "../../components/ui/PopConfirming";

export default function ChangePasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setConfirmOpen(true);
  };

  const handleUpdatePassword = async () => {
    try {
      setLoading(true);

      await dashboardApi.changePassword(password);

      setConfirmOpen(false);

      navigate("/dashboard/redacteur");
    } catch (err: any) {
      setError(err?.message || "Erreur lors de la modification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Sécurité du compte
          </h1>
          <p className="text-slate-500 mt-1">
            Modifiez votre mot de passe pour sécuriser votre compte rédacteur.
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* TOP BAR */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-800">
                Changement de mot de passe
              </h2>
              <p className="text-xs text-slate-500">
                Utilisez un mot de passe sécurisé (8+ caractères)
              </p>
            </div>

            <button
              onClick={() => navigate("/dashboard/redacteur")}
              className="text-sm text-slate-500 hover:text-slate-900 transition"
            >
              Retour
            </button>
          </div>

          {/* FORM */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* PASSWORD */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Nouveau mot de passe
                </label>

                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* CONFIRM */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Confirmation
                </label>

                <div className="relative mt-1">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-xl">
                  {error}
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/redacteur")}
                  className="flex-1 rounded-xl border border-slate-200 py-3 text-slate-600 hover:bg-slate-50 transition"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-slate-900 text-white py-3 hover:bg-slate-800 transition disabled:opacity-50"
                >
                  {loading ? "Modification..." : "Mettre à jour"}
                </button>
              </div>
            </form>

            <PopConfirm
              open={confirmOpen}
              title="Mettre à jour le mot de passe"
              message="Voulez-vous vraiment modifier votre mot de passe ?"
              confirmLabel="Mettre à jour"
              cancelLabel="Annuler"
              onConfirm={handleUpdatePassword}
              onCancel={() => setConfirmOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

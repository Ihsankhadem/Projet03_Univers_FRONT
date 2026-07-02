import { useState } from "react";
import { Mail, Lock, User, AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AuthField from "./AuthField";
import Button from "../ui/Buttons";
import { api } from "../../services/api";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
type FormErrors = Partial<FormData & { general: string }>;

const FIELDS = [
  {
    id: "username",
    label: "Nom d'utilisateur",
    icon: <User className="w-4 h-4" />,
    type: "text",
    placeholder: "nom",
    autoComplete: "username",
  },
  {
    id: "email",
    label: "Adresse email",
    icon: <Mail className="w-4 h-4" />,
    type: "email",
    placeholder: "astronaute@univers.com",
    autoComplete: "email",
  },
  {
    id: "password",
    label: "Mot de passe",
    icon: <Lock className="w-4 h-4" />,
    type: "password",
    placeholder: "••••••••",
    autoComplete: "new-password",
  },
  {
    id: "confirmPassword",
    label: "Confirmer",
    icon: <Lock className="w-4 h-4" />,
    type: "password",
    placeholder: "••••••••",
    autoComplete: "new-password",
  },
] as const;

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [form, setForm] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.username.trim()) e.username = "Nom d'utilisateur requis.";
    if (!form.email) e.email = "Email requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email invalide.";
    if (!form.password) e.password = "Mot de passe requis.";
    else if (form.password.length < 6) e.password = "6 caractères minimum.";
    if (form.confirmPassword !== form.password)
      e.confirmPassword = "Les mots de passe ne correspondent pas.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      await api.post("/api/auth/register", {
        name: form.username,
        email: form.email,
        password: form.password,
      });

      // soit tu switches vers login
      onSwitch();
      // soit tu connectes directement l'utilisateur après inscription
      const data = await api.post<{
        token: string;
        user: {
          id: number;
          name: string;
          email: string;
          role: "rédacteur" | "administrateur";
        };
      }>("/auth/login", {
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erreur inconnue";

      setErrors({ general: message });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden 
  bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#020617]"
    >
      {/* Glow */}
      <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-[24rem] h-[24rem] bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />

      {/* Carte */}
      <div className="w-full max-w-md bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl z-10">
        <div className="text-center mb-7">
          <h1 className="text-2xl font-semibold text-white mb-1">
            Inscription
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          {errors.general && (
            <p
              className="flex items-center gap-2 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 shrink-0" /> {errors.general}
            </p>
          )}

          {FIELDS.map((field) => (
            <AuthField
              key={field.id}
              {...field}
              value={form[field.id]}
              error={errors[field.id]}
              onChange={handleChange}
            />
          ))}

          <Button variant="auth" isLoading={isLoading} loadingText="Création…">
            Créer mon compte →
          </Button>
        </form>

        <p className="text-center mt-5 text-sm text-gray-400">
          Déjà un compte ?{" "}
          <button
            onClick={onSwitch}
            className="font-semibold text-purple-300 hover:text-white transition-colors"
          >
            Se connecter
          </button>
        </p>

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

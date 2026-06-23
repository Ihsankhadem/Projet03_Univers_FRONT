// LoginForm.tsx

import { useState } from "react";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AuthField from "./AuthField";
import Button from "../ui/Buttons";
import { api } from "../../services/api";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface FormData {
  email: string;
  password: string;
}
type FormErrors = Partial<FormData & { general: string }>;

const FIELDS = [
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
    autoComplete: "current-password",
  },
] as const;

export default function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const [form, setForm] = useState<FormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.email) e.email = "Email requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email invalide.";
    if (!form.password) e.password = "Mot de passe requis.";
    else if (form.password.length < 6) e.password = "6 caractères minimum.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validate()) return;

  setErrors({});
  setIsLoading(true);

  try {
    const data = await api.post<{
      token: string;
      user: {
        id: number;
        name: string;
        email: string;
        role: "rédacteur" | "administrateur";
        mustChangePassword: boolean;
      };
    }>("/api/auth/login", {
      email: form.email,
      password: form.password,
    });

    login(data.token, data.user);

    if (data.user.role === "administrateur") {
      navigate("/dashboard");
    } else if (data.user.role === "rédacteur") {
      navigate("/dashboard/redacteur");
    } else {
      navigate("/");
    }

  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Erreur de connexion";

    setErrors({ general: message });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden 
  bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#020617]"
    >
      {/* Glow subtil */}
      <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-[24rem] h-[24rem] bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />

      {/* Carte */}
      <div className="w-full max-w-md bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl z-10">
        <h1 className="text-center text-2xl font-semibold text-white mb-7">
          Connexion
        </h1>

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

          <Link
            to="/mot-de-passe-oublie"
            className="text-sm font-medium text-purple-300 hover:text-white transition-colors self-end -mt-2"
          >
            Mot de passe oublié ?
          </Link>

          <Button variant="auth" isLoading={isLoading} loadingText="Connexion…">
            Se connecter →
          </Button>
        </form>

        <p className="text-center mt-5 text-sm text-gray-400">
          Pas encore de compte ?{" "}
          <button
            onClick={onSwitch}
            className="font-semibold text-purple-300 hover:text-white transition-colors"
          >
            Créer un compte
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

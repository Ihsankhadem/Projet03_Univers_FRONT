
// routes/Admin.routes.tsx - composant de protection des routes admin, vérifie la présence d'un token valide et le rôle de l'utilisateur

import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface TokenPayload {
  id: number;
  role: "rédacteur" | "administrateur";
  exp?: number;
}

export default function AdminRoutes({ children }: { children: React.ReactNode }) {
  const { token, user, logout, loading } = useAuth();

  // Pendant le chargement du contexte
  if (loading) {
    return <div className="text-center py-10">Chargement…</div>;
  }

  // Pas de token ou pas d'utilisateur → pas connecté
  if (!token || !user) {
    return <Navigate to="/auth" replace />;
  }

  try {
    const payload = jwtDecode<TokenPayload>(token);

    // Vérification expiration
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      logout();
      return <Navigate to="/auth" replace />;
    }

    // Vérification rôle admin
    if (payload.role !== "administrateur") {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    console.error("AdminRoutes error:", err);
    logout();
    return <Navigate to="/auth" replace />;
  }
}



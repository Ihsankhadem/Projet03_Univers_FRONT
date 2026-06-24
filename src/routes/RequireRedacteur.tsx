// src/routes/RequireRedacteur.tsx

import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

interface TokenPayload {
  id: number;
  role: "rédacteur" | "administrateur";
  exp?: number;
}

export default function RequireRedacteur({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, user, loading } = useAuth();

  if (loading) {
    return <div>Chargement…</div>;
  }

  if (!token || !user) {
    return <Navigate to="/auth" replace />;
  }

  // =========================
  // SAFE TOKEN DECODE
  // =========================
  let payload: TokenPayload;

  try {
    payload = jwtDecode<TokenPayload>(token);
  } catch (error) {
    console.error("Token invalide :", error);
    return <Navigate to="/auth" replace />;
  }

  // =========================
  // EXPIRATION CHECK
  // =========================
  const now = new Date().getTime();

  const isExpired = payload.exp ? payload.exp * 1000 < now : false;

  if (isExpired) {
    return <Navigate to="/auth" replace />;
  }

  // =========================
  // ROLE CHECK
  // =========================
  if (payload.role !== "administrateur" && payload.role !== "rédacteur") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

// src/routes/Admin.routes.tsx
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

interface TokenPayload {
  id: number;
  role: "rédacteur" | "administrateur";
  exp?: number;
}

export default function AdminRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, user, logout, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-10">Chargement…</div>;
  }

  if (!token || !user) {
    return <Navigate to="/auth" replace />;
  }

  let isExpired = false;
  let isAdmin = false;

  try {
    const payload = jwtDecode<TokenPayload>(token);

    const currentTime = new Date().getTime();

    isExpired = payload.exp ? payload.exp * 1000 < currentTime : false;
    isAdmin = payload.role === "administrateur";
  } catch (err) {
    console.error("Token invalide:", err);
    logout();
    return <Navigate to="/auth" replace />;
  }

  if (isExpired) {
    logout();
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

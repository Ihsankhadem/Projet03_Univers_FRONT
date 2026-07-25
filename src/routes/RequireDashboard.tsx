// routes/RequireDashboard.tsx
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export default function RequireDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (user.role !== "administrateur" && user.role !== "rédacteur") {
    return <Navigate to="/" replace />;
  }

  if (
    user.mustChangePassword &&
    location.pathname !== "/dashboard/change-password"
  ) {
    return <Navigate to="/dashboard/change-password" replace />;
  }

  return <>{children}</>;
}

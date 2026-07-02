// routes/RequireDashboard.tsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export default function RequireDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (user.role !== "administrateur" && user.role !== "rédacteur") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

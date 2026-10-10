import { Link, Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks";

export function ProtectedRoute() {
  const { user, isLoading, error } = useAuth();

  if (isLoading) {
    return <p role="status">Recuperando sesión…</p>;
  }

  if (error && !user) {
    return (
      <div role="alert">
        <p>{error}</p>
        <Link to="/login">Ir al login</Link>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

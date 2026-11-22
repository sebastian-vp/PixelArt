import { Link, Navigate, Outlet, useOutletContext } from "react-router-dom";

import { useSessionStore } from "@/hooks";

export function ProtectedRoute() {
  const setToast: (value: React.ReactElement | null) => void = useOutletContext();
  const user = useSessionStore((state) => state.user);
  const isLoading = useSessionStore((state) => state.isLoading);
  const error = useSessionStore((state) => state.error);

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

  return <Outlet context={setToast} />;
}

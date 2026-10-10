import { Navigate, Outlet, useOutletContext } from "react-router-dom";

import { ToggleTheme } from "@/components";
import { useAuth } from "@/hooks";

import styles from "./Auth.module.css";

export function Auth() {
  const setToast: (value: React.ReactElement | null) => void = useOutletContext();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p role="status">Recuperando sesión…</p>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles["page"]}>
      <div className={styles["container-toggle-theme"]}>
        <ToggleTheme />
      </div>
      <div>
        <header>
          <p className={styles["brand"]}>PixelArt</p>
        </header>
        <div className={styles["container"]}>
          <Outlet context={setToast} />
        </div>
      </div>
    </div>
  );
}

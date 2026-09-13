import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { ToggleTheme } from "@/components";

import styles from "./Auth.module.css";

export function Auth() {
  const [toast, setToast] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setToast(null);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [toast]);

  return (
    <div className={styles["page"]}>
      <div className={styles["container-toggle-theme"]}>
        <ToggleTheme />
      </div>
      {toast && <div className={styles["container-toast"]}>{toast}</div>}
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

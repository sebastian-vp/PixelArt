import { Outlet } from "react-router-dom";

import { ToggleTheme } from "@/components";
import { useToast } from "@/hooks";

import styles from "./Auth.module.css";

export function Auth() {
  const [toast, setToast] = useToast();

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

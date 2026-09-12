import { Outlet } from "react-router-dom";

import { ToggleTheme } from "@/components";

import styles from "./Auth.module.css";

export function Auth() {
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
          <Outlet />
        </div>
      </div>
    </div>
  );
}

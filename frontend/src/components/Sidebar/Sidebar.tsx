import { Moon, Sun } from "lucide-react";

import styles from "./Sidebar.module.css";

export function Sidebar() {
  return (
    <aside className={styles["sidebar"]}>
      <header>
        <p className={styles["brand"]}>PixelArt</p>
      </header>

      <nav className={styles["nav"]} aria-label="Main">
        <ul className={styles["nav-list"]}>
          <li className={`${styles["nav-item"]} ${styles["selected"]}`}>Mis dibujos</li>
          <li className={styles["nav-item"]}>Favoritos</li>
        </ul>
      </nav>

      <div className={styles["theme"]}>
        <label className={styles["theme-option"]}>
          <Sun size={12} fill="currentColor" />
          <input className={styles["theme-input"]} name="theme" type="radio" value="light"/>
          Claro
        </label>
        <label className={styles["theme-option"]}>
          <Moon size={12} fill="currentColor" />
          <input className={styles["theme-input"]} name="theme" type="radio" value="light" />
          Oscuro
        </label>
      </div>

      <hr className={styles["divider"]} />

      <footer className={styles["user"]}>
        <div className={styles["avatar"]} aria-hidden="true">
          MR
        </div>
        <div className={styles["user-info"]}>
          <p className={styles["user-name"]}>Maria Rojas</p>
          <p className={styles["user-email"]}>maria@correo.com</p>
        </div>
      </footer>
    </aside>
  );
}
import { NavLink } from "react-router-dom";

import { ToggleTheme } from "@/components/ToggleTheme";

import styles from "./Sidebar.module.css";

export function Sidebar() {
  function getLinkClass({ isActive }: { isActive: boolean }) {
    let classes = styles["nav-item"];

    if (isActive) {
      classes += " " + styles["selected"];
    }

    return classes;
  }

  return (
    <aside className={styles["sidebar"]}>
      <header>
        <p className={styles["brand"]}>PixelArt</p>
      </header>

      <nav className={styles["nav"]} aria-label="Main">
        <ul className={styles["nav-list"]}>
          <NavLink to="/" className={getLinkClass}>
            Mis dibujos
          </NavLink>
          <NavLink to="/favorites" className={getLinkClass}>
            Favoritos
          </NavLink>
        </ul>
      </nav>

      <ToggleTheme />

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

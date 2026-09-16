import { NavLink } from "react-router-dom";

import { ToggleTheme } from "@/components/ToggleTheme";

import { UserMenu } from "../UserMenu";
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

      <UserMenu name="Maria Rojas" email="maria@correo.com" />
    </aside>
  );
}

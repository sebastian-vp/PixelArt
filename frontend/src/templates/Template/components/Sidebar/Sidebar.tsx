import { NavLink } from "react-router-dom";

import { ToggleTheme } from "@/components/ToggleTheme";
import { useAuth } from "@/hooks";

import { UserMenu } from "../UserMenu";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  const { user, isLoading, error } = useAuth();

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

      {isLoading ? (
        <p role="status">Recuperando sesión…</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : user ? (
        <UserMenu name={user.name} email={user.email} />
      ) : (
        <p>Sin sesión iniciada</p>
      )}
    </aside>
  );
}

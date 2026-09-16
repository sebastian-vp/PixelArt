import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/Button";

import styles from "./Header.module.css";

const TITLES: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Mis dibujos", subtitle: "dibujos guardados en tu cuenta" },
  "/favorites": { title: "Favorites", subtitle: "dibujos marcados como favoritos" },
};

export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { title, subtitle } = TITLES[pathname];

  return (
    <header className={styles["header"]}>
      <div className={styles["container"]}>
        <h1 className={styles["title"]}>{title}</h1>
        <p className={styles["subtitle"]}>{subtitle}</p>
      </div>
      <Button text="+ Nuevo dibujo" onClick={() => navigate("/editor")} />
    </header>
  );
}

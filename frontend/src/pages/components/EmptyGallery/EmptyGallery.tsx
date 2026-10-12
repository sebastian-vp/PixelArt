import { useNavigate } from "react-router-dom";

import { Button } from "@/components/Button";

import styles from "./EmptyGallery.module.css";

interface Props {
  favoritesOnly?: boolean;
}

export function EmptyGallery({ favoritesOnly = false }: Props) {
  const navigate = useNavigate();

  return (
    <div className={styles["background"]}>
      <div className={styles["container"]}>
        <div className={styles["square"]}></div>
        <h3 className={styles["title"]}>{favoritesOnly ? "Aún no tienes favoritos" : "Aún no tienes dibujos"}</h3>
        <p className={styles["text"]}>
          {favoritesOnly ? "Marca la estrella de un dibujo para agregarlo a favoritos." : "Abre un lienzo y crea tu primer dibujo."}
        </p>
        <Button text={favoritesOnly ? "Ver mis dibujos" : "Crear mi primer dibujo"} onClick={() => navigate(favoritesOnly ? "/" : "/editor")} />
      </div>
    </div>
  );
}

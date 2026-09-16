import { useNavigate } from "react-router-dom";

import { Button } from "@/components/Button";

import styles from "./EmptyGallery.module.css";

export function EmptyGallery() {
  const navigate = useNavigate();

  return (
    <div className={styles["background"]}>
      <div className={styles["container"]}>
        <div className={styles["square"]}></div>
        <h3 className={styles["title"]}>Aún no tienes dibujos</h3>
        <p className={styles["text"]}>Abre un lienzo y crea tu primer dibujo.</p>
        <Button text="Crear mi primer dibujo" onClick={() => navigate("/editor")} />
      </div>
    </div>
  );
}

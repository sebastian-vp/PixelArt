import { Button } from "@/components";

import styles from "./EmptyGallery.module.css";

export function EmptyGallery() {
  return (
    <div className={styles["background"]}>
      <div className={styles["container"]}>
        <div className={styles["square"]}></div>
        <h3 className={styles["title"]}>Aún no tienes dibujos</h3>
        <p className={styles["text"]}>Abre un lienzo y crea tu primer dibujo.</p>
        <Button text="Crear mi primer dibujo" onClick={() => {}} />
      </div>
    </div>
  );
}

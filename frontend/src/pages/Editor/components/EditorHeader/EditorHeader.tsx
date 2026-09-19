import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Button } from "@/components";

import styles from "./EditorHeader.module.css";

export function EditorHeader() {
  return (
    <header className={styles["header"]}>
      <NavLink to="/" className={styles["back"]}>
        <ArrowLeft size={18} />
      </NavLink>
      <label className={styles["label"]}>
        Titulo
        <input type="text" className={styles["input"]} />
      </label>
      <Button text="Guardar" onClick={() => {}} />
    </header>
  );
}

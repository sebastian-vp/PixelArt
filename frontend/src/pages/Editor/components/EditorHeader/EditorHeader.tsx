import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Button } from "@/components";

import styles from "./EditorHeader.module.css";

interface Props {
  title: string;
  setTitle: (title: string) => void;
  onSave: () => void;
  isSubmitting: boolean;
}

export function EditorHeader({ title, setTitle, onSave, isSubmitting }: Props) {
  return (
    <header className={styles["header"]}>
      <NavLink to="/" className={styles["back"]}>
        <ArrowLeft size={18} />
      </NavLink>
      <label className={styles["label"]}>
        Titulo
        <input type="text" className={styles["input"]} value={title} onChange={(event) => setTitle(event.target.value)} disabled={isSubmitting} />
      </label>
      <Button text={isSubmitting ? "Guardando…" : "Guardar"} onClick={onSave} disabled={isSubmitting} />
    </header>
  );
}

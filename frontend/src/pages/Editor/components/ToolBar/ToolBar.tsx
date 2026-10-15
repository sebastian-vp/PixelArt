import { Eraser, Pencil, PaintBucket } from "lucide-react";

import styles from "./ToolBar.module.css";
type Tool = "pincel" | "eraser" | "bucket";
interface Props {
  selectedTool: Tool;
  setSelectedTool: (tool: Tool) => void;
}
export function ToolBar({ selectedTool, setSelectedTool }: Props) {
  return (
    <aside className={styles["toolbar"]}>
      <p className={styles["label"]}>Herramientas</p>
      <button
        id="tool-pincel"
        className={`${styles["tool"]} ${selectedTool === "pincel" ? styles["tool--active"] : ""}`}
        onClick={() => setSelectedTool("pincel")}
        title="Pincel"
        aria-pressed={selectedTool === "pincel"}
      >
        <Pencil size={20} />
        <span className={styles["tool-label"]}>Pincel</span>
      </button>
      <button
        id="tool-eraser"
        className={`${styles["tool"]} ${selectedTool === "eraser" ? styles["tool--active"] : ""}`}
        onClick={() => setSelectedTool("eraser")}
        title="Borrador"
        aria-pressed={selectedTool === "eraser"}
      >
        <Eraser size={20} />
        <span className={styles["tool-label"]}>Borrador</span>
      </button>
      <button
        id="tool-bucket"
        className={`${styles["tool"]} ${selectedTool === "bucket" ? styles["tool--active"] : ""}`}
        onClick={() => setSelectedTool("bucket")}
        title="Cubo de relleno"
        aria-pressed={selectedTool === "bucket"}
      >
        <PaintBucket size={20} />
        <span className={styles["tool-label"]}>Balde de pintura</span>
      </button>
    </aside>
  );
}

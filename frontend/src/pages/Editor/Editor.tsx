import { ColorPalette, DrawingCanvas, EditorHeader, ToolBar } from "./components";
import styles from "./Editor.module.css";

export function Editor() {
  return (
    <div className={styles["page"]}>
      {/* Sebastián: build the editor header inside this component. */}
      <EditorHeader />

      <div className={styles["workspace"]}>
        {/* Santiago: build the painting and erasing tools inside this component. */}
        <ToolBar />

        {/* Sebastián: build the drawing area and pixel grid inside this component. */}
        <DrawingCanvas />

        {/* Fran: build the active color and palette controls inside this component. */}
        <ColorPalette />
      </div>
    </div>
  );
}
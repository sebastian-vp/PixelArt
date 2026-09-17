import { ColorPalette, DrawingCanvas, EditorHeader, ToolBar } from "./components";
import { COLORS, type Color } from "./components/ColorPalette";
import styles from "./Editor.module.css";
import { useState } from "react";

export function Editor() {
  const [selectedColor, setSelectedColor] = useState<Color>(COLORS[0]);
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
        <ColorPalette selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      </div>
    </div>
  );
}

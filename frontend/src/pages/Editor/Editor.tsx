import { useState } from "react";

import { ColorPalette, DrawingCanvas, EditorHeader, ToolBar } from "./components";
import { type Color, COLORS } from "./components/ColorPalette";
import styles from "./Editor.module.css";

export function Editor() {
  const [selectedColor, setSelectedColor] = useState<Color>(COLORS[0]);
  const [selectedTool, setSelectedTool] = useState<"pincel" | "eraser">("pincel");

  return (
    <div className={styles["page"]}>
      <EditorHeader />

      <div className={styles["workspace"]}>
        {/* Santiago: build the painting and erasing tools inside this component. */}
        <ToolBar />

        <DrawingCanvas selectedColor={selectedColor.code} selectedTool={selectedTool} />

        <ColorPalette selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      </div>
    </div>
  );
}

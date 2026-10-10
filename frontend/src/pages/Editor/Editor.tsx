import axios from "axios";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import { Toast } from "@/components";
import { useAuth } from "@/hooks";
import { saveDrawing } from "@/services/drawings";

import { ColorPalette, DrawingCanvas, EditorHeader, ToolBar } from "./components";
import { type Color, COLORS } from "./components/ColorPalette";
import styles from "./Editor.module.css";

export function Editor() {
  const [selectedColor, setSelectedColor] = useState<Color>(COLORS[0]);
  const [selectedTool, setSelectedTool] = useState<"pincel" | "eraser">("pincel");

  const [title, setTitle] = useState("");
  const [grid, setGrid] = useState(() => Array.from({ length: 16 }, () => Array<string | null>(16).fill(null)));
  const [drawingId, setDrawingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setToast: (value: React.ReactElement | null) => void = useOutletContext();
  const { clearSession } = useAuth();

  function updateColor(row: number, col: number) {
    if (isSubmitting) return;

    setGrid((currentGrid) =>
      currentGrid.map((currentRow, i) =>
        currentRow.map((color, j) => (i === row && j === col ? (selectedTool === "pincel" ? selectedColor.code : null) : color)),
      ),
    );
  }

  async function onSave() {
    if (isSubmitting) return;

    if (title.trim() === "") {
      setToast(<Toast type="error" title="Título requerido" message="Ponle un nombre a tu dibujo antes de guardarlo." />);
      return;
    }

    setToast(null);
    setIsSubmitting(true);

    try {
      const drawing = await saveDrawing({ title: title.trim(), width: grid[0].length, height: grid.length, pixels: grid.flat() }, drawingId);
      setDrawingId(drawing.id);
      setToast(<Toast type="success" title="Dibujo guardado" message="Tu dibujo se guardó correctamente." />);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        clearSession();
        return;
      }

      const message = error instanceof Error ? error.message : "No pudimos guardar tu dibujo. Inténtalo nuevamente.";
      setToast(<Toast type="error" title="No se pudo guardar el dibujo" message={message} />);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles["page"]}>
      <EditorHeader title={title} setTitle={setTitle} onSave={onSave} isSubmitting={isSubmitting} />

      <div className={styles["workspace"]}>
        <ToolBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />

        <DrawingCanvas grid={grid} updateColor={updateColor} disabled={isSubmitting} />

        <ColorPalette selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      </div>
    </div>
  );
}

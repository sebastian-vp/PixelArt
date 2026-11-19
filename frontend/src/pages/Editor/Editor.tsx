import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useOutletContext, useParams } from "react-router-dom";

import { Button, Toast } from "@/components";
import { useAuth } from "@/hooks";
import { getDrawing, saveDrawing } from "@/services/drawings";

import { ColorPalette, DrawingCanvas, EditorHeader, ToolBar } from "./components";
import { type Color, COLORS } from "./components/ColorPalette";
import styles from "./Editor.module.css";

export function Editor() {
  const { id } = useParams();

  return <EditorContent key={id ?? "new"} id={id} />;
}

function EditorContent({ id }: { id: string | undefined }) {
  const [selectedColor, setSelectedColor] = useState<Color>(COLORS[0]);
  const [selectedTool, setSelectedTool] = useState<"pincel" | "eraser" | "bucket">("pincel");
  const [isPainting, setIsPainting] = useState(false);

  const [title, setTitle] = useState("");
  const [grid, setGrid] = useState(() => Array.from({ length: 16 }, () => Array<string | null>(16).fill(null)));
  const [drawingId, setDrawingId] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setToast: (value: React.ReactElement | null) => void = useOutletContext();
  const { clearSession } = useAuth();

  useEffect(() => {
    if (!id) return;
    const requestedId = id;

    const controller = new AbortController();

    async function loadDrawing() {
      try {
        const drawing = await getDrawing(requestedId, controller.signal);
        if (controller.signal.aborted) return;

        setTitle(drawing.title ?? "");
        setGrid(Array.from({ length: drawing.height }, (_, row) => drawing.pixels.slice(row * drawing.width, (row + 1) * drawing.width)));
        setDrawingId(drawing.id);
        setIsFavorite(drawing.isFavorite);
      } catch (error: unknown) {
        if (controller.signal.aborted) return;
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          clearSession();
          return;
        }

        const message = error instanceof Error ? error.message : "No pudimos abrir tu dibujo.";
        setLoadError(message);
        setToast(<Toast type="error" title="No se pudo abrir el dibujo" message={message} />);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadDrawing();
    return () => controller.abort();
  }, [id, clearSession, setToast, retryCount]);

  function retry() {
    setLoadError(null);
    setToast(null);
    setIsLoading(true);
    setRetryCount((count) => count + 1);
  }

  function updateColor(row: number, col: number) {
    if (isSubmitting || isLoading || loadError) return;

    setGrid((currentGrid) =>
      currentGrid.map((currentRow, i) =>
        currentRow.map((color, j) => {
          if (i !== row || j !== col) return color;

          if (selectedTool === "eraser") return null;

          return selectedColor.code;
        }),
      ),
    );
  }

  async function onSave() {
    if (isSubmitting || isLoading || loadError) return;

    if (title.trim() === "") {
      setToast(<Toast type="error" title="Título requerido" message="Ponle un nombre a tu dibujo antes de guardarlo." />);
      return;
    }

    setToast(null);
    setIsSubmitting(true);

    try {
      const drawing = await saveDrawing(
        { title: title.trim(), width: grid[0].length, height: grid.length, pixels: grid.flat(), isFavorite },
        drawingId,
      );
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

  if (isLoading) {
    return <p role="status">Cargando dibujo…</p>;
  }

  if (loadError) {
    return (
      <div role="alert">
        <p>{loadError}</p>
        <Button text="Reintentar" onClick={retry} />
        <NavLink to="/">Volver a Mis dibujos</NavLink>
      </div>
    );
  }

  return (
    <div className={styles["page"]}>
      <EditorHeader title={title} setTitle={setTitle} onSave={onSave} isSubmitting={isSubmitting} />

      <div className={styles["workspace"]}>
        <ToolBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />

        <DrawingCanvas
          grid={grid}
          updateColor={updateColor}
          disabled={isSubmitting || isLoading || Boolean(loadError)}
          selectedTool={selectedTool}
          isPainting={isPainting}
          setIsPainting={setIsPainting}
          selectedColor={selectedColor}
        />

        <ColorPalette selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      </div>
    </div>
  );
}

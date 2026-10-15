import { useEffect } from "react";
import styles from "./DrawingCanvas.module.css";

interface Props {
  grid: (string | null)[][];
  updateColor: (row: number, col: number) => void;
  disabled: boolean;
  selectedTool: "pincel" | "eraser" | "bucket";
  isPainting: boolean;
  setIsPainting: (painting: boolean) => void;
}

export function DrawingCanvas({ grid, updateColor, disabled, selectedTool, isPainting, setIsPainting }: Props) {
  useEffect(() => {
    function stopPainting() {
      setIsPainting(false);
    }

    window.addEventListener("pointerup", stopPainting);
    window.addEventListener("pointercancel", stopPainting);

    return () => {
      window.removeEventListener("pointerup", stopPainting);
      window.removeEventListener("pointercancel", stopPainting);
    };
  }, [setIsPainting]);

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>, row: number, col: number) {
    if (disabled) return;

    event.preventDefault();

    if (selectedTool === "bucket") {
      setIsPainting(true);
      updateColor(row, col);
      return;
    }

    updateColor(row, col);
  }

  function handlePointerEnter(row: number, col: number) {
    if (disabled || selectedTool !== "bucket" || !isPainting) return;

    updateColor(row, col);
  }

  return (
    <section className={styles["editor"]}>
      <div className={styles["container"]} style={{ width: grid[0].length * 32 + 20, height: grid.length * 32 + 20 }}>
        <div className={styles["canva"]} style={{ width: grid[0].length * 32, height: grid.length * 32 }}>
          {grid.map((row, i) => (
            <div key={i} className={styles["row"]}>
              {row.map((color, j) => (
                <button
                  key={j}
                  className={styles["pixel"]}
                  aria-label={`Pixel ${i + 1}, ${j + 1}`}
                  disabled={disabled}
                  style={{ backgroundColor: color ?? "" }}
                  onPointerDown={(event) => handlePointerDown(event, i, j)}
                  onPointerEnter={() => handlePointerEnter(i, j)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

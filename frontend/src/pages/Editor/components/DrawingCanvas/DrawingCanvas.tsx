import { useEffect } from "react";
import styles from "./DrawingCanvas.module.css";

interface Props {
  grid: (string | null)[][];
  updateColor: (row: number, col: number) => void;
  disabled: boolean;
  selectedTool: "pincel" | "eraser" | "bucket";
  isPainting: boolean;
  setIsPainting: (painting: boolean) => void;
  selectedColor: string | null;
}

export function DrawingCanvas({ grid, updateColor, disabled, selectedTool, isPainting, setIsPainting, selectedColor }: Props) {
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

  function floodFill(startRow: number, startCol: number) {
    const oldColor = grid[startRow][startCol];

    // Evitar trabajo innecesario.
    if (oldColor === selectedColor) return;

    const rows = grid.length;
    const cols = grid[0].length;

    const visited = new Set<string>();
    const queue: [number, number][] = [[startRow, startCol]];

    while (queue.length > 0) {
      const [row, col] = queue.shift()!;

      // Comprobar límites.
      if (row < 0 || row >= rows || col < 0 || col >= cols) {
        continue;
      }

      const key = `${row},${col}`;

      if (visited.has(key)) continue;
      visited.add(key);

      // Comprobar que el pixel pertenezca a la región.
      if (grid[row][col] !== oldColor) continue;

      // Pintar pixel.
      updateColor(row, col);

      // Agregar vecinos.
      queue.push([row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]);
    }
  }

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>, row: number, col: number) {
    if (disabled) return;

    event.preventDefault();

    if (selectedTool === "pincel") {
      setIsPainting(true);
      updateColor(row, col);
      return;
    }

    if (selectedTool === "bucket") {
      floodFill(row, col);
      return;
    }

    updateColor(row, col);
  }

  function handlePointerEnter(row: number, col: number) {
    if (disabled || selectedTool !== "pincel" || !isPainting) return;

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

import { useState } from "react";

import styles from "./DrawingCanvas.module.css";

interface Props {
  selectedColor: string;
  selectedTool: "pincel" | "eraser";
}

export function DrawingCanvas({ selectedColor, selectedTool }: Props) {
  const [grid, setGrid] = useState(() => Array.from({ length: 16 }, () => Array<string | null>(16).fill(null)));

  function updateColor(row: number, col: number) {
    setGrid((currentGrid) =>
      currentGrid.map((currentRow, i) =>
        currentRow.map((color, j) => (i === row && j === col ? (selectedTool === "pincel" ? selectedColor : null) : color)),
      ),
    );
  }

  return (
    <section className={styles["editor"]}>
      <div className={styles["container"]}>
        <div className={styles["canva"]}>
          {grid.map((row, i) => (
            <div key={i} className={styles["row"]}>
              {row.map((color, j) => (
                <button
                  className={styles["pixel"]}
                  key={j}
                  style={{ backgroundColor: color !== null ? color : "" }}
                  onClick={() => updateColor(i, j)}
                ></button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import styles from "./DrawingCanvas.module.css";

interface Props {
  grid: (string | null)[][];
  updateColor: (row: number, col: number) => void;
  disabled: boolean;
}

export function DrawingCanvas({ grid, updateColor, disabled }: Props) {
  return (
    <section className={styles["editor"]}>
      <div className={styles["container"]} style={{ width: grid[0].length * 32 + 20, height: grid.length * 32 + 20 }}>
        <div className={styles["canva"]} style={{ width: grid[0].length * 32, height: grid.length * 32 }}>
          {grid.map((row, i) => (
            <div key={i} className={styles["row"]}>
              {row.map((color, j) => (
                <button
                  className={styles["pixel"]}
                  aria-label={`Pixel ${i + 1}, ${j + 1}`}
                  disabled={disabled}
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

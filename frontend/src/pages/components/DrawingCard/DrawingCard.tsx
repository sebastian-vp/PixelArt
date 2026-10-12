import { Star, X } from "lucide-react";

import type { Drawing } from "@/services/drawings";

import styles from "./DrawingCard.module.css";

export type DrawingCardData = Pick<Drawing, "id" | "title" | "width" | "height" | "pixels" | "isFavorite">;

interface Props {
  drawing: DrawingCardData;
  onOpen?: (drawing: DrawingCardData) => void;
  onDelete?: (drawing: DrawingCardData) => void;
  onToggleFavorite?: (drawing: DrawingCardData) => void;
}

export function DrawingCard({ drawing, onOpen, onDelete, onToggleFavorite }: Props) {
  const title = drawing.title?.trim() || "Sin título";

  return (
    <article className={styles["card"]}>
      <div className={styles["preview"]} role="img" aria-label={`Vista previa de ${title}`}>
        <div
          className={styles["pixel-art"]}
          style={{
            width: `${Math.min(60, (50 * drawing.width) / drawing.height)}%`,
            aspectRatio: `${drawing.width} / ${drawing.height}`,
            gridTemplateColumns: `repeat(${drawing.width}, 1fr)`,
            gridTemplateRows: `repeat(${drawing.height}, 1fr)`,
          }}
        >
          {drawing.pixels.map((pixel, index) => (
            <span key={index} style={{ backgroundColor: pixel ?? "transparent" }} />
          ))}
        </div>
      </div>
      <div className={styles["info"]}>
        <div className={styles["title-row"]}>
          <h3 className={styles["title"]} title={title}>
            {title}
          </h3>
          <button
            className={`${styles["favorite"]} ${drawing.isFavorite ? styles["favorite-active"] : ""}`}
            type="button"
            aria-label={`${drawing.isFavorite ? "Quitar" : "Marcar"} favorito: ${title}`}
            aria-pressed={drawing.isFavorite}
            disabled={!onToggleFavorite}
            onClick={() => onToggleFavorite?.(drawing)}
          >
            <Star size={16} fill={drawing.isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        <div className={styles["actions-row"]}>
          <span className={styles["dimensions"]}>
            {drawing.width}×{drawing.height}
          </span>
          <div className={styles["actions"]}>
            <button className={styles["open"]} type="button" disabled={!onOpen} onClick={() => onOpen?.(drawing)}>
              Abrir
            </button>
            <button
              className={styles["delete"]}
              type="button"
              aria-label={`Eliminar ${title}`}
              disabled={!onDelete}
              onClick={() => onDelete?.(drawing)}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

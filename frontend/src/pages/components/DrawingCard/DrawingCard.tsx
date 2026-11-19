import { Star, X } from "lucide-react";

import type { Drawing } from "@/services/drawings";

import styles from "./DrawingCard.module.css";

import { Stack } from "react-bootstrap";

export type DrawingCardData = Pick<Drawing, "id" | "title" | "width" | "height" | "pixels" | "isFavorite">;

interface Props {
  drawing: DrawingCardData;
  isPending?: boolean;
  onOpen?: (drawing: DrawingCardData) => void;
  onDelete?: (drawing: DrawingCardData) => void;
  onToggleFavorite?: (drawing: DrawingCardData) => void;
}

export function DrawingCard({ drawing, onOpen, onDelete, onToggleFavorite, isPending = false }: Props) {
  const title = drawing.title?.trim() || "Sin título";

  return (
    <article className={styles["card"]} aria-busy={isPending}>
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
        <Stack direction="horizontal" gap={2}>
          <button
            className={`${styles["favorite"]} ${drawing.isFavorite ? styles["favorite-active"] : ""}`}
            type="button"
            aria-label={`${drawing.isFavorite ? "Quitar" : "Marcar"} favorito: ${title}`}
            aria-pressed={drawing.isFavorite}
            disabled={!onToggleFavorite || isPending}
            onClick={() => onToggleFavorite?.(drawing)}
          >
            <Star size={20} fill={drawing.isFavorite ? "currentColor" : "none"} />
          </button>
          <h3 className={styles["title"]} title={title}>
            {title}
          </h3>
        </Stack>
        <div className={styles["actions-row"]}>
          <span className={styles["dimensions"]}>
            {drawing.width}×{drawing.height}
          </span>
          <Stack direction="horizontal" gap={3}>
            <button
              className={styles["delete"]}
              type="button"
              aria-label={`Eliminar ${title}`}
              disabled={!onDelete || isPending}
              onClick={() => onDelete?.(drawing)}
            >
              <X className="my-auto mx-auto p-0" size={14} />
            </button>
            <button className={styles["open"]} type="button" disabled={!onOpen || isPending} onClick={() => onOpen?.(drawing)}>
              Abrir
            </button>
          </Stack>
        </div>
      </div>
    </article>
  );
}

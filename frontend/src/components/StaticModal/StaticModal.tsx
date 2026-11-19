import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./StaticModal.module.css";

import { Button } from "@/components/Button";

interface Props {
  show: boolean;
  handleClose: () => void;
  title?: string;
  children?: ReactNode;
  /** Contenido del pie. Por defecto, un botón "Cerrar". */
  footer?: ReactNode;
}

// Debe coincidir con la duración de la animación de salida en el CSS.
const EXIT_MS = 150;

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function StaticModal({ show, handleClose, title = "Título", children = "Contenido", footer }: Props) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  // `mounted` mantiene el modal en el DOM mientras corre la animación de salida.
  const [mounted, setMounted] = useState(show);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (show) {
      setMounted(true);
      setClosing(false);
      return;
    }
    if (!mounted) return;
    setClosing(true);
    const id = window.setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, EXIT_MS);
    return () => window.clearTimeout(id);
  }, [show, mounted]);

  // Mientras está abierto: bloquea el scroll del fondo y maneja el foco.
  useEffect(() => {
    if (!mounted) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [mounted]);

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      handleClose();
      return;
    }
    if (e.key !== "Tab") return;

    // Atrapa el foco dentro del modal.
    const items = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!items || items.length === 0) {
      e.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && (active === first || active === dialogRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`${styles.overlay} ${closing ? styles.closing : ""}`}
      onMouseDown={(e) => {
        // Cierra solo si el clic fue directamente sobre el fondo.
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <button type="button" className={styles.closeButton} onClick={handleClose} aria-label="Cerrar">
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" shapeRendering="crispEdges">
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </button>
        </header>

        <div className={styles.body}>{children}</div>

        <footer className={styles.footer}>{footer ?? <Button text="Cerrar" onClick={handleClose}></Button>}</footer>
      </div>
    </div>,
    document.body,
  );
}

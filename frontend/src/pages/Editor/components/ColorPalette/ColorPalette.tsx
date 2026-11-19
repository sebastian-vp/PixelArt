import type { Color } from "./color.types";
import styles from "./ColorPalette.module.css";
import { COLORS } from "./colors";

import { useState } from "react";
import { Palette } from "lucide-react";

// tipo de props para el componente ColorPalette
type Props = {
  selectedColor: Color;
  setSelectedColor: (color: Color) => void;
};

// componente ColorPalette que muestra la paleta de colores. Permite mostrar y cambiar el color seleccionado
// recibe como props el color seleccionado y una función para actualizarlo
export function ColorPalette({ selectedColor, setSelectedColor }: Props) {
  const [customColor, setCustomColor] = useState<string | null>(null);
  const isCustomSelected = customColor !== null && selectedColor.code === customColor;

  return (
    <div className={styles["background"]}>
      <div className={styles["column"]}>
        {/* Muestra el color actualmente seleccionado */}
        <p className={styles["title"]}>Color activo</p>
        <div className={styles["row"]}>
          <div className={styles["selected-color"]} style={selectedColor ? { backgroundColor: selectedColor.code } : {}} />
          <div className={styles["color-info"]}>
            <p className={styles["accent-title"]}>{selectedColor ? selectedColor.code : "Ninguno"}</p>
            <p className={styles["text"]}>{selectedColor ? selectedColor.name : "Ninguno"}</p>
          </div>
        </div>

        {/* Muestra la paleta de colores disponibles */}
        <p className={styles["title"]}>Paleta</p>
        <div className={styles["grid"]}>
          {COLORS.map((color) => (
            <div
              className={styles["color"]}
              key={color.code}
              style={{
                backgroundColor: color.code,
                border: color.code === selectedColor.code ? "2px solid var(--text-color)" : "none",
              }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
          <label
            className={`${styles["color"]} ${styles["customColor"]}`}
            style={{
              background: customColor ?? undefined,
              border: isCustomSelected ? "2px solid var(--text-color)" : "none",
            }}
            title="Color personalizado"
          >
            <Palette size={20} />
            <input
              type="color"
              className={styles["colorInput"]}
              value={customColor ?? "#000000"}
              aria-label="Color personalizado"
              onChange={(e) => {
                setCustomColor(e.target.value);
                setSelectedColor({ code: e.target.value, name: "Personalizado" });
              }} // ajusta a la forma de tu tipo de color
              onClick={() => {
                // Permite volver a seleccionar el color personalizado ya elegido.
                if (customColor) setSelectedColor({ code: customColor, name: "Personalizado" });
              }}
            />
          </label>{" "}
        </div>
      </div>
    </div>
  );
}

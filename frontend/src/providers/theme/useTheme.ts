import { useContext } from "react";

import { ThemeContext } from "./ThemeContext";
import type { Theme } from "./types";

export function useTheme(): [Theme["theme"], Theme["setTheme"]] {
  const context: Theme | null = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme out of <ThemeProvider>");
  }

  return [context.theme, context.setTheme];
}

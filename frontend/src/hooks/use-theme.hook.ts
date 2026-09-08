import { useContext } from "react";

import type { Theme } from "@/contexts";
import { ThemeContext } from "@/contexts/theme/theme.context";

export function useTheme(): [Theme["theme"], Theme["setTheme"]] {
  const context: Theme | null = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme out of <ThemeProvider>");
  }

  return [context.theme, context.setTheme];
}

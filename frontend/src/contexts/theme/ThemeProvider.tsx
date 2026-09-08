import { useEffect, useState } from "react";

import { ThemeContext } from "./theme.context";
import type { Theme } from "./theme.types";

interface Props {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<Theme["theme"]>(() => {
    let localTheme = localStorage.getItem("theme");

    if (!localTheme) {
      localTheme = "light";
      localStorage.setItem("theme", localTheme);
    }

    return localTheme as Theme["theme"];
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}

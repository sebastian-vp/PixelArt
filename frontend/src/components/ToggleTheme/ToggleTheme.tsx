import { Moon, Sun } from "lucide-react";

import { useEffect } from "react";

import { useTheme } from "@/hooks";

import styles from "./ToggleTheme.module.css";

export function ToggleTheme() {
  const [theme, setTheme] = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className={styles["theme"]}>
      <label className={styles["theme-option"]}>
        <Sun size={12} fill="currentColor" />
        <input className={styles["theme-input"]} name="theme" type="radio" onChange={() => setTheme("light")} checked={theme === "light"} />
        Claro
      </label>
      <label className={styles["theme-option"]}>
        <Moon size={12} fill="currentColor" />
        <input className={styles["theme-input"]} name="theme" type="radio" onChange={() => setTheme("dark")} checked={theme === "dark"} />
        Oscuro
      </label>
    </div>
  );
}

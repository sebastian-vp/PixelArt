export type Theme = {
  theme: "light" | "dark";
  setTheme: (theme: Theme["theme"]) => void;
};

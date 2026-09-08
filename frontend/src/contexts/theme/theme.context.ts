import { createContext } from "react";

import type { Theme } from "./theme.types";

export const ThemeContext = createContext<Theme | null>(null);

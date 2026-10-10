import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AuthProvider, ThemeProvider } from "@/contexts";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);

import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@/contexts";
import { useDrawingsStore, useSessionStore } from "@/hooks";

import App from "./App.tsx";

useSessionStore.subscribe((session, previous) => {
  if (session.user !== previous.user) {
    useDrawingsStore.getState().reset();
  }
});

void useSessionStore.getState().recoverSession();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
